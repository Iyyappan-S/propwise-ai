import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
const ctx = { user: { id: 991, openId: "comparison-test", name: "Test", email: "test@example.com", loginMethod: "test", role: "user", createdAt: /* @__PURE__ */ new Date(), updatedAt: /* @__PURE__ */ new Date(), lastSignedIn: /* @__PURE__ */ new Date() }, req: {}, res: {} };
describe("comparison validation", () => {
  it("rejects a comparison with fewer than two properties", async () => {
    await expect(appRouter.createCaller(ctx).comparison.analyze({ propertyIds: [1] })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
});
