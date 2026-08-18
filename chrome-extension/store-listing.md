# Chrome Web Store submission package

## Suggested listing title

**PropWise AI — Property Intelligence**

## Short description

Analyze visible property listings with indicative value, location signals, and due-diligence prompts from PropWise AI.

## Detailed description

PropWise AI helps property researchers move from a listing page to a structured location review. Open the extension on a visible property listing to extract common details such as title, price, area, location, bedrooms, bathrooms, property type, and listing URL. Review the extracted fields, request an indicative PropWise analysis, save the latest listing locally, or open the full PropWise workspace for map-based analysis and comparison.

PropWise AI is an early-research tool. Its value and appreciation outputs are model-based estimates, not professional valuations, financial advice, legal advice, title verification, ownership verification, approval verification, tax verification, or a guarantee of market performance. Users should independently verify all material facts with qualified professionals and authoritative sources.

The extension reads visible page content only. It does not bypass login walls, anti-bot systems, paywalls, technical protections, or website access controls. Website support may vary because listing pages use different layouts.

## Single purpose

The single purpose is to help users transfer visible property-listing details into PropWise AI for early-stage location and property research.

## Permission justifications

| Permission | Justification |
| --- | --- |
| `activeTab` | Read the currently active visible listing page only after the user opens the extension. |
| `scripting` | Support the content-script extraction workflow on the active tab. |
| `storage` | Store the latest extracted listing and an explicitly saved local copy. |
| `contextMenus` | Provide “Analyze with PropWise AI” for user-selected address text. |
| Host access | Allow the content extractor to operate on user-selected property pages; it reads visible text and does not bypass protections. |

## Privacy disclosure

The extension may process visible listing information supplied by the user’s active tab, including listing title, displayed price, area, address/location text, bedrooms, bathrooms, property type, URL, and the resulting analysis payload. The data is used to provide the requested property-analysis function. The extension stores the latest listing and locally saved listing in Chrome storage. The extension does not intentionally collect passwords, payment information, health information, or browsing history. The full PropWise web workspace may require authenticated access and may process submitted information according to its separate privacy policy.

Before publishing, replace this document’s development URLs with the production dashboard and backend URLs, publish a public privacy-policy page, add support contact details, upload store screenshots, and complete the Chrome Web Store data-use declarations.

## Submission workflow

Create or use a Chrome Web Store developer account, accept the developer agreement, and pay Google’s one-time registration fee. In the Developer Dashboard, select **Add new item**, upload the standalone ZIP, complete Store Listing, Privacy, Distribution, and Test instructions fields, and submit for review. Choose immediate or deferred publication. The extension becomes searchable only after Google approves it and it is published publicly.

## Official references

[1]: https://developer.chrome.com/docs/webstore/register "Register your developer account — Chrome for Developers"
[2]: https://developer.chrome.com/docs/webstore/publish "Publish in the Chrome Web Store — Chrome for Developers"
[3]: https://developer.chrome.com/docs/webstore/program-policies "Chrome Web Store Program Policies — Chrome for Developers"
