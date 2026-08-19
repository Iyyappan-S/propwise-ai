import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import { COOKIE_NAME } from "../shared/const";
function createAuthContext() {
  const clearedCookies = [];
  const user = {
    id: 1,
    openId: "sample-user",
    email: "sample@example.com",
    name: "Sample User",
    loginMethod: "manus",
    role: "user",
    createdAt: /* @__PURE__ */ new Date(),
    updatedAt: /* @__PURE__ */ new Date(),
    lastSignedIn: /* @__PURE__ */ new Date()
  };
  const ctx = {
    user,
    req: {
      protocol: "https",
      headers: {}
    },
    res: {
      clearCookie: (name, options) => {
        clearedCookies.push({ name, options });
      }
    }
  };
  return { ctx, clearedCookies };
}
describe("auth.logout", () => {
  it("clears the session cookie and reports success", async () => {
    const { ctx, clearedCookies } = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.logout();
    expect(result).toEqual({ success: true });
    expect(clearedCookies).toHaveLength(1);
    expect(clearedCookies[0]?.name).toBe(COOKIE_NAME);
    expect(clearedCookies[0]?.options).toMatchObject({
      maxAge: -1,
      secure: true,
      sameSite: "none",
      httpOnly: true,
      path: "/"
    });
  });
});
