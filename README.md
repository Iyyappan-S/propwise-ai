# PropWise AI

PropWise AI is a full-stack real-estate location intelligence workspace for early-stage land and property research. Users can pin a location, enter site details, review an indicative valuation and scorecard, save the result, compare shortlisted properties, and open a cautious AI-generated research brief. A Manifest V3 Chrome Extension extracts visible listing details from supported pages and hands them back to the workspace.

## Product boundaries

> PropWise outputs are model-based estimates, not professional property valuations, financial advice, title searches, or government-record verification. Users must independently verify title, ownership, approvals, zoning, taxes, utilities, road rights, inspections, and current market evidence.

The current valuation engine is a transparent JavaScript development model. It is deliberately labeled as indicative until calibrated against a representative, licensed dataset. The application never claims to have verified legal status or live comparable transactions.

## Stack and structure

The project uses React, Vite, Tailwind CSS, tRPC, Express, Drizzle ORM, MySQL/TiDB-compatible persistence, Manus OAuth, server-side built-in LLM access, Recharts, and the scaffold’s proxied Google Maps component. The Chrome Extension is a separate Manifest V3 package under `chrome-extension/`.

| Area | Location |
| --- | --- |
| Web UI | `client/src/App.tsx`, `client/src/components/` |
| Typed backend | `server/routers.ts`, `server/db.ts` |
| Schema and migration | `drizzle/schema.ts`, `drizzle/0001_volatile_orphan.sql` |
| Extension | `chrome-extension/` |
| Data notes | `dataset/README.md` |
| Technical docs | `docs/` |
| Tests | `server/*.test.ts`, `tests/` |

## Local setup

Install dependencies with `pnpm install`. The managed project provides the database URL, OAuth, session, built-in API, and frontend map proxy variables. Run `pnpm dev` for development, `pnpm check` for TypeScript validation, `pnpm test` for Vitest, and `pnpm build` for the production build.

Copy `server/.env.example` only when running outside the managed environment. Never commit real credentials. The web application uses the scaffold’s secure authentication flow; users do not provide a Gemini key to the browser or extension.

## Core flow

Open `/analyze`, click the map to pin a location, enter area/category/access details, and submit the analysis. The server creates a location, property, and analysis record, computes the scorecard, and calls the server-side LLM with structured inputs. The result includes estimated total value, estimated price per square foot, an indicative range, area classification, weighted factors, nearby-facility signals, investment score, future projection, risks, and AI research guidance.

## Extension installation

Open `chrome://extensions`, enable Developer mode, choose “Load unpacked,” and select the `chrome-extension/` directory. The extractor reads only visible page text and common semantic elements. Website-specific adapters can be added under `chrome-extension/services/` without changing the popup contract. The default dashboard handoff points at the local development URL and should be changed to the published workspace URL before store submission.

## Testing and limitations

The repository includes the scaffold auth test and analysis engine tests. Add browser-level coverage in the project’s preferred test runner when a CI browser is available. The model metrics requested in the brief should only be reported after a real, licensed labeled dataset is supplied; this repository intentionally does not fabricate accuracy claims or historical property prices.

## Deployment

The WebDev project is configured for managed hosting. The frontend and backend ship as one application, with environment variables injected by the platform. For an external deployment, use the generated production build, set the database URL, session secret, OAuth values, frontend URL, and built-in API values, then configure CORS and the extension’s dashboard URL. The Chrome Extension package remains store-ready subject to Chrome Web Store review and final production URLs.

## License

MIT for the source code unless a third-party data or map provider imposes additional terms. Review each data source license before adding it to `dataset/raw/`.
