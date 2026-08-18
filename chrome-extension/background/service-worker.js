const DASHBOARD_URL = "http://localhost:3000/analyze";
chrome.runtime.onInstalled.addListener(() => { chrome.contextMenus.create({ id: "propwise-analyze-selection", title: "Analyze with PropWise AI", contexts: ["selection"] }); });
chrome.contextMenus.onClicked.addListener((info, tab) => { if (info.menuItemId === "propwise-analyze-selection") { const params = new URLSearchParams({ address: info.selectionText || "" }); chrome.tabs.create({ url: `${DASHBOARD_URL}?${params}` }); } });
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => { if (message?.type === "OPEN_DASHBOARD") { chrome.tabs.create({url: message.url || DASHBOARD_URL}); sendResponse({ok:true}); } });
