import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const manifest = JSON.parse(readFileSync("chrome-extension/manifest.json", "utf8"));
const app = readFileSync("client/src/App.tsx", "utf8");
const extractor = readFileSync("chrome-extension/content/extractor.js", "utf8");
const appSource = readFileSync("client/src/App.tsx", "utf8");

describe("PropWise repository contracts", () => {
  it("keeps the extension Manifest V3-ready and extracts safe visible-page fields", () => {
    expect(manifest.manifest_version).toBe(3);
    expect(manifest.background.service_worker).toContain("service-worker.js");
    expect(extractor).toContain("window.location.href");
    expect(extractor).toContain("extractVisibleListing");
  });
  it("keeps the primary product routes in the frontend shell", () => {
    for (const route of ["/dashboard", "/analyze", "/saved", "/compare", "/history", "/profile", "/about"]) expect(app).toContain(`path=\"${route}\"`);
  });
  it("requires a confirmed map pin before calculation", () => {
    expect(appSource).toContain('path="/login"');
    expect(appSource).toContain('disabled={mutation.isPending||!hasPin}');
    expect(appSource).toContain('setHasPin(false)');
    expect(appSource).toContain('title:"Exact price pin"');
  });
});
