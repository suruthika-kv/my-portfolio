# 🚀 Portfolio Setup Guide — Zane Mercer Dev Portfolio

## Stack
- React + Vite (frontend)
- Firebase Firestore (stores contact messages)
- Claude API (chatbot)
- Vercel (free hosting)

---

## Step 1 — Install dependencies

```bash
cd portfolio
npm install
```

---

## Step 2 — Firebase Setup (FREE)

1. Go to https://console.firebase.google.com
2. Click "Add Project" → name it (e.g. "zane-portfolio")
3. Skip Google Analytics → Create Project
4. Click "Web" icon (</>) → Register app → name it "portfolio"
5. Copy the firebaseConfig values shown

6. Go to Firestore Database → Create Database → Start in TEST MODE → Choose region → Done

7. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

8. Paste your Firebase values into `.env`:
```
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123...
```

---

## Step 3 — Claude API Key

1. Go to https://console.anthropic.com
2. API Keys → Create Key → Copy it
3. Add to `.env`:
```
VITE_CLAUDE_API_KEY=sk-ant-...
```

⚠️ NOTE: For production, move the Claude API call to a Vercel serverless function
so your key is never exposed in the browser. Instructions below.

---

## Step 4 — Customize for yourself

Open these files and replace Zane's info with yours:

- `src/components/Hero.jsx` — name, tagline, stats
- `src/components/Projects.jsx` — your actual projects
- `src/components/Contact.jsx` — your email, city
- `src/lib/claude.js` — update SYSTEM_PROMPT with your real info
- `index.html` — update title and meta description

---

## Step 5 — Run locally

```bash
npm run dev
```

Open http://localhost:5173 — your portfolio is live locally!

---

## Step 6 — Deploy to Vercel (FREE hosting)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: zane-portfolio
# - Root directory: ./
# - Build command: npm run build
# - Output dir: dist
```

After first deploy, add env variables in Vercel dashboard:
Settings → Environment Variables → add all your VITE_ keys

Then redeploy:
```bash
vercel --prod
```

Your site is live at: https://your-project.vercel.app 🎉

---

## Step 7 — View Messages from Firebase

1. Go to Firebase Console → Firestore Database
2. You'll see a "messages" collection
3. Each document = one contact form submission with: name, email, message, createdAt, read

---

## Securing Claude API (Production)

Create `api/chat.js` in your project root:

```js
export default async function handler(req, res) {
  const { messages } = req.body;
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.CLAUDE_API_KEY, // server-side only
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({ model: "claude-haiku-4-5-20251001", max_tokens: 300, messages }),
  });
  const data = await response.json();
  res.json(data);
}
```

Then in `src/lib/claude.js`, change the fetch URL to `/api/chat`.

---

## Folder Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Projects.jsx
│   │   ├── Contact.jsx
│   │   ├── Chatbot.jsx
│   │   └── Footer.jsx
│   ├── lib/
│   │   ├── firebase.js
│   │   └── claude.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
├── package.json
├── .env          ← your secrets (never commit this)
└── .env.example  ← template (safe to commit)
```
