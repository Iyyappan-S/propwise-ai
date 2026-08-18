const text = document.body?.innerText || "";
const pick = (patterns) => { for (const p of patterns) { const m = text.match(p); if (m?.[1]) return m[1].trim(); } return ""; };
const parseArea = (v) => { const m = String(v||"").replace(/,/g, "").match(/([\d.]+)\s*(?:sq\.?\s*ft|sqft|square feet)/i); return m ? Number(m[1]) : null; };
function extractVisibleListing() {
  const title = document.querySelector("h1")?.textContent?.trim() || document.title;
  const price = pick([/(?:₹|Rs\.?|INR)\s?[\d,.]+\s*(?:L|Cr|lac|crore)?/i, /(?:price|asking price)\s*[:\-]?\s*([^\n]+)/i]);
  const areaText = pick([/([\d,.]+\s*(?:sq\.?\s*ft|sqft|square feet))/i]);
  const location = pick([/(?:location|address)\s*[:\-]\s*([^\n]+)/i]);
  const bedrooms = pick([/(\d+)\s*(?:BHK|bed(?:room)?s?)/i]);
  const bathrooms = pick([/(\d+)\s*(?:bath(?:room)?s?)/i]);
  return { title, price, areaSqft: parseArea(areaText), location, bedrooms: bedrooms ? Number(bedrooms) : null, bathrooms: bathrooms ? Number(bathrooms) : null, propertyType: /villa/i.test(text)?"Villa":/apartment|flat/i.test(text)?"Apartment":"Property listing", listingUrl: window.location.href, source: "visible-page-extractor" };
}
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => { if (message?.type === "EXTRACT_PROPERTY") { sendResponse(extractVisibleListing()); } });
