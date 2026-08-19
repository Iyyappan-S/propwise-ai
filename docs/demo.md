# PropWise AI Website Demo

## Live preview

Open the live website preview at:

https://3000-it4adxo49jd8n32233dwt-e2d1ec02.us4.manus.computer/

The preview is currently protected by the project’s secure sign-in flow for workspace routes. The landing page is publicly viewable; analysis and workspace routes require signing in.

## Recommended walkthrough

Start on the landing page at `/`. The hero section explains the product promise: pin a place, add site details, review a transparent indicative estimate, and decide what to verify next. The main actions are **Analyze a location** and **Create workspace**. The page also introduces the map-first workflow, explainable signals, shortlist comparison, and the Chrome Extension handoff.

Select **Sign in** or open `/login`. The dedicated login page presents the secure sign-in action and explains that the workspace is private. Complete the existing authentication flow, then return to the workspace.

Open `/analyze` or select **Analyze location** from the workspace navigation. First search for an address or neighborhood if helpful. Search is provisional: it can center the map and update the displayed address, but it does not authorize calculation. The authoritative price location comes only from an explicit click on the map. The interface displays **PIN REQUIRED FOR PRICE** until the user clicks the exact site location.

After clicking the exact site on the map, review the latitude and longitude shown in the pin status. Enter the property label, address, site area, property type, category, road access, and known nearby amenities. Select **Pin the exact place to calculate price** only after the manual map click has set the authoritative coordinates. The resulting view presents indicative value, price per square foot, valuation range, area classification, location score, investment score, future projection, risks, nearby-facility signals, and cautious AI research guidance.

Use **Save property** to add a result to the private shortlist. Open `/saved` or choose **Saved properties** in the sidebar to review saved locations. The empty state explains how to start a new analysis when no properties have been saved.

Open `/compare` to select two to four properties and run a score-based comparison. Comparison recommendations are decision support only and do not replace title, zoning, approval, utility, tax, or inspection due diligence.

Open `/history` to review the research trail. Each saved analysis shows its indicative value, classification, score, and timestamp, allowing the user to revisit earlier decisions.

The remaining workspace routes are `/profile` for account information and `/about` for methodology, limitations, and product boundaries. The dashboard overview is the authenticated workspace home and shows saved-property count, average site area, analyses run, decision mode, research activity, and due-diligence reminders.

## Demo limitations

The live preview may show the map loading state when the map proxy or browser session is not available. In that case, the required interaction remains explicit in the interface: search may center the map, but only a manual map click authorizes the calculation. PropWise outputs are model-based estimates for early research and are not professional valuations, financial advice, title verification, or government-record confirmation.

## Captured demo views

The project contains verified captures for the landing page, login route, analysis route, authenticated dashboard, saved properties, comparison, and analysis history. These demonstrate the redesigned terracotta, sand, olive, and forest visual system and the map-first product flow.
