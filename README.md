# AKHILESH — THE SERIES · ROUND 1

Netflix-inspired personal portfolio (original design) for Akhilesh Bhagat.

## Run
1. Extract the entire ZIP archive.
2. Open `Akhilesh_The_Series/index.html` in Chrome, Edge or Firefox.
3. Click **PLAY THE SERIES**, then choose a viewing profile.

No build tools or server are required for the main website. Online internet access is required for Google Fonts, GitHub/LinkedIn external links and original certificate images hosted on GitHub.

## Round 1 upgrades
- Reframed and softened intro portrait to keep the face visible; removed the red dot after the name from intro and home hero.
- Related cinematic artwork in profile selector, Continue Exploring, Originals, Top Picks and Journey episodes.
- Five unique animated outline icons in Top Moments.
- Three separate project modules under Project Library: SQL (5), Advanced Excel (3), Power BI (3), plus reserved future module tags for Python, Tableau, Machine Learning, Data Science, Gen AI and Agentic AI.
- In-page resume PDF viewer with zoom, reset and download controls.
- In-page original certificate image viewer with next/previous, zoom and original-file links.
- Hidden scrollbars while keeping scroll/swipe active.
- Responsive desktop/tablet/mobile layouts including 320px, 390px and 430px.

## Resume and certificates
- Resume file is bundled at `assets/docs/Akhilesh_Bhagat_Resume.pdf` and opens without leaving the portfolio on supported browsers. On phones where embedded PDF is unsupported, use **DOWNLOAD PDF**.
- Original certificate images were published on the user's existing portfolio GitHub repository. Their **image bytes were not bundled** in this ZIP; the viewer requests the actual image from `raw.githubusercontent.com` and shows a source link if remote loading fails. Preview therefore requires internet access. Names in the archive reflect old portfolio assets and are not independently verified credentials.

## Updating projects
All entries reside in `assets/js/app.js`:
- `projects`: six featured projects for Originals / Top Picks.
- `moduleProjects`: the three separately displayed SQL, Excel and Power BI module collections (currently 5, 3 and 3 entries).
- `seasons`: Journey timeline with five seasons.

Add an entry to the corresponding module array to extend its cards. If a project has no published GitHub documentation, a neutral summary is used rather than an invented feature list.

## Assets and design
Generated related card artwork is **illustrative design imagery**, not authentic project/dashboard screenshots. The user's cinematic black-suit portrait is used for the opening. Images are optimized WebP files stored locally.

## Important
The original Round 0 ZIP has not been modified. This Round 1 package is a separate version.
