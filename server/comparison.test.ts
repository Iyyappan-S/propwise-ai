import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

const ctx = { user: { id: 991, openId: "comparison-test", name: "Test", email: "test@example.com", loginMethod: "test", role: "user", createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() }, req: {} as TrpcContext["req"], res: {} as TrpcContext["res"] } as TrpcContext;

describe("comparison validation", () => {
  it("rejects a comparison with fewer than two properties", async () => {
    await expect(appRouter.createCaller(ctx).comparison.analyze({ propertyIds: [1] })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
});
