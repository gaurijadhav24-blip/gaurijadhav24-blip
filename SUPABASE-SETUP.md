# LearnAble Supabase setup

## 1. Create the tables
1. Open your Supabase project dashboard.
2. Go to **SQL Editor** and create a new query.
3. Open `supabase-setup.sql` from this project, copy its full contents into the SQL Editor, and click **Run**.

## 2. Add your public client details
1. In Supabase, open **Connect** or **Project Settings → API Keys**.
2. Copy the **Project URL** and the **publishable key** (usually starts with `sb_publishable_`).
3. Open `js/supabase.js` and replace the two placeholder strings with those values.
4. Do not use a `service_role` or `sb_secret_` key in browser JavaScript.

## 3. Test locally
- Open `feedback.html`, submit a test feedback entry, then check **Table Editor → feedback**.
- Open `activities.html`, finish the quiz, and check **Table Editor → activity_scores**.
- The activity page shows whether the score was saved. The feedback form only shows its success message after the database insert succeeds.

## 4. Deploy
Commit and push the changed files to the GitHub branch connected to Vercel. Vercel will deploy the update.

## Data and security notes
- The website stores feedback and quiz score summaries only. It does not save names with quiz scores or store individual answers.
- RLS allows public INSERT only and does not allow public SELECT. This is suitable for a basic class-project demo, but public forms can be abused; consider CAPTCHA/rate limiting before a production launch.
- A browser publishable key is not a secret. Security depends on RLS policies and table constraints.
