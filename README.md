# College Decisions Calculator

An interactive admissions-chance calculator covering 1,038 U.S. colleges. Enter your
academic profile, coursework, extracurriculars, and essay — get a per-school, per-major
estimated admission chance with a full score breakdown.

**Live demo:** _(add your GitHub Pages URL here once deployed)_

## What it does

- Scores your profile (GPA, SAT/ACT or test-optional, course rigor, extracurricular
  tier, essay quality, recommendation strength, and application factors like legacy or
  demonstrated interest) against each school's own published averages.
- Weights those factors differently per school based on selectivity — highly selective
  schools weight essays/ECs more heavily; less selective schools weight GPA/SAT more
  heavily.
- Lets you pick an intended major per school and adjusts the chance using
  major-specific competitiveness data where available (e.g. CS at UW Seattle is far
  more competitive than the school's overall rate), falling back to a national-average
  estimate — clearly labeled as approximate — when school-specific data isn't available.
- Grades your essay against 11 criteria (theme, voice, specificity, reflection,
  organization, etc.) and gives improvement suggestions.
- Runs entirely client-side. All scoring, essay grading, and feedback generation have
  local, deterministic implementations (`localEvalECs`, `localEssayGrade`,
  `localFeedback` in `src/App.jsx`) so the app is fully functional with zero backend.

## Running locally

```bash
npm install
npm run dev
```

## Deploying to GitHub Pages

This repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that
builds and deploys automatically on every push to `main`.

One-time setup after pushing this repo to GitHub:

1. Go to **Settings → Pages** in your repo.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Push to `main` (or re-run the workflow from the **Actions** tab) — the site will
   build and deploy automatically. The URL will appear in the workflow run summary and
   under Settings → Pages.

No manual build step or `gh-pages` branch needed — the workflow handles it.

## Enabling real AI grading (optional)

By default this app uses only its local scoring logic — no API key, no backend, works
anywhere. If you want the essay grader and feedback generator to use Claude instead of
the local heuristics:

1. Deploy a small serverless function (e.g. a Vercel or Netlify function) that accepts
   a POST request, holds your Anthropic API key **server-side**, and forwards the
   request to `https://api.anthropic.com/v1/messages`.
2. Set `AI_ENDPOINT` near the top of `src/App.jsx` to that function's URL.

**Never put an Anthropic API key directly in this repo or in any client-side code** —
anything in a GitHub Pages site is publicly visible in the browser's network tab and
page source, and a key there can be scraped and used by anyone within minutes.

## Data sources

College averages (SAT, ACT, GPA, public/private status) are derived from the U.S.
Department of Education's College Scorecard dataset. Major-specific competitiveness
multipliers are estimates based on publicly reported program admission rates and
national trends where school-specific data wasn't available — see the in-app
disclaimer on each major selection.

## Disclaimer

This tool produces statistical estimates, not predictions or guarantees. Real
admissions decisions depend on many factors this model can't fully capture, including
essay quality as judged by real readers, recommendation letter content, interviews,
and institutional priorities in a given year.
