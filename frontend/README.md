# Real Estate AI Calling Agent — Frontend

React (Vite) dashboard for the existing FastAPI backend. **No backend files were
modified.** This is frontend-only.

## Setup

```bash
npm install
cp .env.example .env   # then fill in the Vapi values, see below
npm run dev
```

Make sure your backend is running separately on `http://localhost:8000`
(e.g. `uvicorn app.main:app --reload`).

## How it talks to the backend

`vite.config.js` proxies `/api/*` to `http://localhost:8000/*` in dev.
The backend has **no CORS middleware**, so the browser cannot call it
directly cross-origin — the proxy avoids that without touching backend code.
`src/services/api.js` is the only place that calls the network; it only
hits endpoints that already exist:

- `GET /leads`
- `DELETE /leads`
- `POST /chat` (defined, not currently used by the dashboard UI)

If you deploy the frontend and backend on different origins (not localhost),
the proxy trick won't apply — you'll need to add
`fastapi.middleware.cors.CORSMiddleware` to `backend/app/main.py` yourself,
or serve both from the same origin.

## Voice calling (Vapi)

`VITE_VAPI_PUBLIC_KEY` and `VITE_VAPI_ASSISTANT_ID` go in `real-estate-frontend/.env`
(see `.env.example`). The public key should match `VITE_VAPI_PUBLIC_KEY` in
`backend/.env`. **There is no Assistant ID anywhere in your project yet** —
create one in the Vapi dashboard and paste it in.

The Vapi Web SDK (`@vapi-ai/web`) talks directly from the browser to Vapi's
servers using the public key — it does **not** go through the FastAPI
backend. Whatever you configure in Vapi (e.g. a post-call webhook to your
`POST /webhook`) is what would eventually populate real leads from a voice
call. Right now `POST /webhook` only logs the incoming payload to the
console — it doesn't call `extract_lead` / `save_lead` — so leads placed by
an actual voice call will not show up in `GET /leads` until that's wired up
backend-side (not something this frontend can do).

## Known backend gaps this frontend works around

- **No timestamp column** on `Lead` — cards show the time this browser tab
  first saw the lead (`lead.seenAt`), not a real "call happened at" time.
- **No per-lead endpoints** — "View Details" expands the existing card
  in place rather than fetching more data; "Delete" is bulk-only
  (`DELETE /leads` removes everything, there's no way to remove one lead).

## Project structure

```
src/
  components/
    Header.jsx / .css
    Hero.jsx / .css
    VoiceCallButton.jsx / .css
    LeadCard.jsx / .css
    LeadList.jsx / .css
    DeleteAllButton.jsx / .css
    StateMessage.jsx / .css   (loading / empty / error)
  hooks/
    useLeads.js       polling fetch + delete-all + client timestamps
    useVapiCall.js     Vapi Web SDK wrapper for the call button
  services/
    api.js             fetch wrapper for GET/DELETE /leads, POST /chat
  App.jsx
  main.jsx
```
