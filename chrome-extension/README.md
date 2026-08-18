# PropWise AI Chrome Extension

This is the standalone Google Chrome Manifest V3 extension for PropWise AI. It adds an **Analyze with PropWise AI** popup to visible property pages, extracts common listing fields, sends the extracted payload to the PropWise analysis endpoint, stores the latest listing locally, and opens the full workspace. A context-menu action is available for selected address text.

## Install locally

1. Extract the overall project ZIP or the standalone extension ZIP.
2. Open `chrome://extensions` in Google Chrome.
3. Enable **Developer mode**.
4. Choose **Load unpacked**.
5. Select this `chrome-extension` folder.
6. Open a supported listing page, click the PropWise icon, and choose **Analyze**.

The development handoff currently targets `http://localhost:3000`. Before production use, update `DASHBOARD_URL` and the backend endpoint in `background/service-worker.js` and `popup/popup.js` to the published PropWise URL.

## Privacy and limitations

The extractor reads visible page text and common semantic elements only. It does not bypass protections, defeat authentication, or claim universal support for every listing website. Extracted values are suggestions for analysis and should be reviewed before submission. The extension does not verify title, ownership, approvals, taxes, zoning, or legal status.

## Store preparation

Add final production URLs, a privacy policy, store screenshots, extension icons, support contact details, and a reviewed permissions justification before submitting to the Chrome Web Store.
