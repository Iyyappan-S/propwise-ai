# Environment and deployment configuration

Managed WebDev supplies the database, session, OAuth, analytics, and built-in API variables. The application reads those values through `server/_core/env.ts`. No secret values belong in source control, the frontend bundle, or the Chrome Extension.

For an external deployment, configure the following server-side values in the hosting provider’s secret manager: `DATABASE_URL` for the MySQL/TiDB-compatible database, `JWT_SECRET` for signed sessions, `FRONTEND_URL` for CORS, the OAuth variables required by the scaffold, and the built-in Forge API URL/key used by server-side AI and map proxies. If a direct Gemini provider is substituted, use a server-only `GEMINI_API_KEY`; the current implementation prefers the managed server-side LLM helper.

The extension’s `DASHBOARD_URL` in `chrome-extension/background/service-worker.js` should point to the published `/analyze` route before store submission. Test the extension against the production domain and review the Chrome Web Store privacy disclosures for the visible-page extraction behavior.
