"""Build data.json for the WBV social dashboard from Windsor.ai exports.
Usage: python3 build.py <data_dir> <existing_data.json or -> <out.json>
Inputs in data_dir: ig_daily.json, ig_media.json, ig_followers.json, fb_daily.json, fb_posts.json, fb_reels.json, ig_account.json(optional)
Existing data.json is merged so history that Windsor no longer serves (IG daily follows >30d, manual figures, notes, thumbnails) is kept.
"""
import json, sys, collections, datetime, os
D, prev_path, out = sys.argv[1], sys.argv[2], sys.argv[3]
L = lambda f: json.load(open(os.path.join(D, f)))['result'] if os.path.exists(os.path.join(D, f)) else []
prev = json.load(open(prev_path)) if prev_path != '-' and os.path.exists(prev_path) else {}

def clean(s, n=140):
    s = (s or '').replace('\n', ' ').strip()
    return s if len(s) <= n else s[:n].rsplit(' ', 1)[0] + '…'

# ---------- Instagram ----------
igd = sorted(L('ig_daily.json'), key=lambda r: r['date'])
ig_daily = {r['date']: {'reach': r['reach'] or 0, 'interactions': r['total_interactions'] or 0, 'views': r['views'] or 0,
                        'likes': r['likes'] or 0, 'comments': r['comments'] or 0, 'shares': r['shares'] or 0, 'saves': max(r['saves'] or 0, 0)} for r in igd}
# follower history: merge previous (kept forever) + fresh 30-day pull
fol = dict((prev.get('ig', {}).get('follows_daily') or {}))
for r in L('ig_followers.json'):
    fol[r['date']] = {'v': r['follower_count_1d'], 'src': 'windsor'}
TYPE = {'REELS': 'Reel', 'VIDEO': 'Reel', 'CAROUSEL_ALBUM': 'Carousel', 'IMAGE': 'Image'}
counts = {r['media_id']: r for r in L('ig_counts.json')}
prev_thumbs = {p['id']: p.get('thumb') for p in prev.get('ig', {}).get('posts', []) if p.get('thumb')}
ig_posts = []
for r in L('ig_media.json'):
    if r.get('media_product_type') == 'STORY': continue
    reach = r['media_reach'] or 0; eng = r['media_engagement'] or 0
    ig_posts.append({'id': r['media_id'], 'date': r['date'], 'type': TYPE.get(r['media_type'], r['media_type'].title()),
        'caption': clean(r['media_caption']), 'url': r['media_permalink'],
        'img': r['media_thumbnail_url'] or r['media_url'], 'thumb': prev_thumbs.get(r['media_id']),
        'reach': reach, 'eng': eng,
        'likes': r.get('media_like_count', counts.get(r['media_id'], {}).get('media_like_count')),
        'comments': r.get('media_comments_count', counts.get(r['media_id'], {}).get('media_comments_count')), 'shares': r['media_shares'] or 0, 'saves': r['media_saved'] or 0,
        'views': r['media_views'] or 0, 'rate': round(100 * eng / reach, 1) if reach else None})
# likes/comments fallback = engagement - shares - saves split unknown; derive likes+comments when totals missing
for p in ig_posts:
    if p['likes'] is None:
        lc = p['eng'] - p['shares'] - p['saves']; p['likes'] = lc; p['comments'] = p['comments'] or 0
        p['likes'] = max(lc - p['comments'], 0)
ig_posts.sort(key=lambda p: p['date'])

# ---------- Facebook ----------
fbd = sorted(L('fb_daily.json'), key=lambda r: r['date'])
reels = {r['video_post_id']: r for r in L('fb_reels.json')}
prev_fb_thumbs = {p['id']: p.get('thumb') for p in prev.get('fb', {}).get('posts', []) if p.get('thumb')}
fb_posts = []
for r in L('fb_posts.json'):
    vid = r['post_id'].split('_')[-1]
    is_video = (r['type'] or '').startswith('video')
    rv = reels.get(vid)
    if is_video and rv:
        react, com, sh = rv['post_video_total_reactions'] or 0, rv['post_video_social_actions_comment'] or 0, rv['post_video_social_actions_share'] or 0
    else:
        react, com, sh = r['post_reactions_total'] or 0, r['post_comments_total'] or 0, r['post_activity_by_action_type_share'] or 0
    reach = r['post_impressions_unique'] or 0; inter = react + com + sh
    fb_posts.append({'id': r['post_id'], 'date': r['post_created_time'][:10], 'type': 'Video' if is_video else ('Album' if r['type'] == 'album' else 'Photo'),
        'caption': clean(r['post_message']), 'url': r['permalink_url'], 'img': r['full_picture'], 'thumb': prev_fb_thumbs.get(r['post_id']),
        'reach': reach, 'eng': inter, 'likes': react, 'comments': com, 'shares': sh,
        'link_clicks': r['post_clicks_by_type_link_clicks'] or 0, 'views': r['post_video_views'] or 0,
        'rate': round(100 * inter / reach, 1) if reach else None})
fb_posts.sort(key=lambda p: p['date'])
fb_daily = {r['date']: {'follows': r['page_daily_follows_unique'] or 0, 'unfollows': r['page_daily_unfollows_unique'] or 0,
    'followers': r['page_follows'] or 0, 'reach': r['page_impressions_unique'] or 0, 'engagements': r['page_post_engagements'] or 0,
    'page_views': r['page_views_total'] or 0, 'video_views': r['page_video_views'] or 0} for r in fbd}
lc_by_day = collections.Counter()
for p in fb_posts: lc_by_day[p['date']] += p['link_clicks']
for d in fb_daily: fb_daily[d]['link_clicks'] = lc_by_day.get(d, 0)

# ---------- monthly rollups ----------
manual = prev.get('manual', {})
def mix(posts):
    c = collections.Counter(p['type'] for p in posts); return dict(c)
def avg(xs): xs = [x for x in xs if x is not None]; return round(sum(xs) / len(xs), 1) if xs else None
months = sorted(set(d[:7] for d in list(ig_daily) + list(fb_daily)))
ig_m, fb_m = {}, {}
for m in months:
    ip = [p for p in ig_posts if p['date'][:7] == m]; dd = [v for d, v in ig_daily.items() if d[:7] == m]
    fm = {d: v for d, v in fol.items() if d[:7] == m}
    man = manual.get('ig', {}).get(m, {})
    ig_m[m] = {'posts': len(ip) if ip or m >= '2026-06' else None, 'mix': mix(ip),
        'reach': sum(p['reach'] for p in ip) if ip else None, 'reach_account': sum(v['reach'] for v in dd),
        'interactions': sum(v['interactions'] for v in dd), 'views': sum(v['views'] for v in dd),
        'eng_rate': avg([p['rate'] for p in ip]),
        'new_followers': man.get('new_followers', sum(v['v'] for v in fm.values()) if fm else None),
        'link_taps': man.get('link_taps'), 'profile_visits': man.get('profile_visits'),
        'days': len(dd)}
    fp = [p for p in fb_posts if p['date'][:7] == m]; fd = [v for d, v in fb_daily.items() if d[:7] == m]
    fb_m[m] = {'posts': len(fp) if fp or m >= '2026-06' else None, 'mix': mix(fp),
        'reach': sum(p['reach'] for p in fp) if fp else None, 'reach_page': sum(v['reach'] for v in fd),
        'interactions': sum(p['eng'] for p in fp) if fp else None, 'engagements_page': sum(v['engagements'] for v in fd),
        'eng_rate': avg([p['rate'] for p in fp]),
        'new_followers': sum(v['follows'] for v in fd), 'unfollows': sum(v['unfollows'] for v in fd),
        'link_clicks': sum(p['link_clicks'] for p in fp) if fp else None, 'profile_visits': sum(v['page_views'] for v in fd),
        'video_views': sum(v['video_views'] for v in fd), 'days': len(fd)}

acct = L('ig_account.json')
data = {
    'generated': datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%MZ'),
    'through': max(list(ig_daily) + list(fb_daily)),
    'accounts': {'ig': {'handle': '@whitebayvillasjvd', 'followers': (acct[0]['followers_count'] if acct else prev.get('accounts', {}).get('ig', {}).get('followers'))},
                 'fb': {'name': 'White Bay Villas & Beach Club', 'followers': fbd[-1]['page_follows'] if fbd else None}},
    'months': months,
    'ig': {'monthly': ig_m, 'daily': ig_daily, 'follows_daily': dict(sorted(fol.items())), 'posts': ig_posts},
    'fb': {'monthly': fb_m, 'daily': fb_daily, 'posts': fb_posts},
    'manual': manual, 'notes': prev.get('notes', {}),
}
json.dump(data, open(out, 'w'), separators=(',', ':'), ensure_ascii=False)
print('wrote', out, os.path.getsize(out), 'bytes; months', months[0], '→', months[-1])
