import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { appRouter, buildAnalysis } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

function isPortAvailable(port: number): Promise<boolean> { return new Promise(resolve => { const server = net.createServer(); server.listen(port, () => server.close(() => resolve(true))); server.on("error", () => resolve(false)); }); }
async function findAvailablePort(startPort = 3000): Promise<number> { for (let port = startPort; port < startPort + 20; port++) if (await isPortAvailable(port)) return port; throw new Error(`No available port found starting from ${startPort}`); }

async function startServer() {
  const app = express();
  const server = createServer(app);
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  registerStorageProxy(app);
  registerOAuthRoutes(app);
  app.post("/api/extension/analyze", (req, res) => {
    try {
      const body = req.body || {};
      const input = { title: body.title || "Extension listing", address: body.location || "", latitude: Number(body.latitude || 12.9716), longitude: Number(body.longitude || 77.5946), areaSqft: Number(body.areaSqft || 1000), propertyType: body.propertyType || "Property listing", category: "residential" as const, bedrooms: body.bedrooms || undefined, bathrooms: body.bathrooms || undefined, roadAccess: "Unknown" as const, amenities: [] as string[] };
      res.json({ ok: true, result: buildAnalysis(input) });
    } catch { res.status(400).json({ ok: false, error: "Listing payload could not be analyzed" }); }
  });
  app.use("/api/trpc", createExpressMiddleware({ router: appRouter, createContext }));
  if (process.env.NODE_ENV === "development") await setupVite(app, server); else serveStatic(app);
  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);
  if (port !== preferredPort) console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  server.listen(port, () => console.log(`Server running on http://localhost:${port}/`));
}
startServer().catch(console.error);
