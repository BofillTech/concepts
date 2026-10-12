# White Bay Villas — Social Media Performance dashboard

Live: https://bofilltech.github.io/concepts/clients/wbv-social-dashboard/

- `index.html` — the dashboard (reads `data.json`; month picker, Instagram/Facebook toggle, `?p=ig|fb&m=YYYY-MM` deep links)
- `data.json` — all numbers, built by `build/build.py` from Windsor.ai pulls
- `thumbs/<post id>.jpg` — saved post thumbnails (Meta image links expire after a few weeks)
- `build/build.py` — merges fresh Windsor.ai exports into the existing `data.json`

## Refresh
Pull from Windsor.ai (Instagram account 17841409429113176, Facebook Page 54087522420) into a folder as `{"result":[...]}` files:

| File | Connector | Fields | Range |
|---|---|---|---|
| ig_daily.json | instagram | date, reach, total_interactions, views, accounts_engaged, profile_links_taps, likes, comments, shares, saves | 2026-03-01 → yesterday |
| ig_media.json | instagram | date, timestamp, media_id, media_type, media_product_type, media_caption, media_permalink, media_thumbnail_url, media_url, media_reach, media_engagement, media_like_count, media_comments_count, media_shares, media_saved, media_views | 2026-06-01 → yesterday |
| ig_followers.json | instagram | date, follower_count_1d | last_30d (Instagram keeps only 30 days — refresh at least every 4 weeks or days are lost) |
| ig_account.json | instagram | followers_count, media_count | — |
| fb_daily.json | facebook_organic | date, page_daily_follows_unique, page_daily_unfollows_unique, page_follows, page_impressions_unique, page_impressions, page_post_engagements, page_views_total, page_total_actions, page_video_views, page_total_media_view_unique, page_actions_post_reactions_total | 2026-03-01 → yesterday |
| fb_posts.json | facebook_organic | post_id, post_created_time, type, post_message, permalink_url, full_picture, post_impressions_unique, post_reactions_total, post_comments_total, post_activity_by_action_type_share, post_clicks_by_type_link_clicks, post_engagements, post_video_views | 2026-06-01 → yesterday |
| fb_reels.json | facebook_organic | video_post_id, date, post_video_total_reactions, post_video_social_actions_comment, post_video_social_actions_share, reels_post_impressions_unique, reels_post_type, post_video_followers, reel_picture_url | 2026-06-01 → yesterday |

Then: `python3 build/build.py <folder> data.json data.json`

Manual figures (Instagram link taps, profile visits — not in Windsor.ai) and monthly agency notes live under `manual` and `notes` in `data.json` and are preserved on rebuild.
