import { jsx, jsxs } from "react/jsx-runtime";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, MapPinned, Bookmark, GitCompareArrows, History, UserRound, Info, LogOut, Sparkles, Menu, X, ShieldCheck } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";
import { DashboardLayoutSkeleton } from "./DashboardLayoutSkeleton";
const items = [
  { label: "Overview", path: "/dashboard", icon: LayoutDashboard },
  { label: "Analyze location", path: "/analyze", icon: MapPinned },
  { label: "Saved properties", path: "/saved", icon: Bookmark },
  { label: "Compare", path: "/compare", icon: GitCompareArrows },
  { label: "Analysis history", path: "/history", icon: History },
  { label: "Profile", path: "/profile", icon: UserRound },
  { label: "About", path: "/about", icon: Info }
];
function DashboardLayout({ children }) {
  const { loading, user, logout } = useAuth();
  const [location, setLocation] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  if (loading) return /* @__PURE__ */ jsx(DashboardLayoutSkeleton, {});
  if (!user) return /* @__PURE__ */ jsx("div", { className: "propwise-grid min-h-screen grid place-items-center bg-[#f5f9fd] p-6", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md rounded-[2rem] border border-white bg-white/95 p-10 text-center shadow-2xl shadow-sky-100", children: [
    /* @__PURE__ */ jsx("div", { className: "mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-slate-950 text-sky-300", children: /* @__PURE__ */ jsx(Sparkles, {}) }),
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold text-slate-950", children: "Sign in to PropWise AI" }),
    /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-6 text-slate-500", children: "Create a private workspace for exact map pins, property analysis, and comparisons." }),
    /* @__PURE__ */ jsx(Button, { className: "mt-7 h-11 w-full rounded-xl", onClick: () => startLogin(), children: "Continue with secure sign in" })
  ] }) });
  const nav = /* @__PURE__ */ jsx("nav", { className: "space-y-1", children: items.map(({ label, path, icon: Icon }) => /* @__PURE__ */ jsxs("button", { onClick: () => {
    setLocation(path);
    setMobileOpen(false);
  }, className: `group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${location === path ? "bg-sky-50 font-semibold text-sky-700 shadow-sm" : "text-slate-500 hover:bg-slate-50 hover:text-slate-950"}`, children: [
    /* @__PURE__ */ jsx(Icon, { className: `h-4 w-4 ${location === path ? "text-sky-600" : "text-slate-400 group-hover:text-slate-700"}` }),
    label
  ] }, path)) });
  return /* @__PURE__ */ jsxs("div", { className: "propwise-dashboard-bg min-h-screen text-slate-900", children: [
    /* @__PURE__ */ jsxs("aside", { className: "fixed inset-y-0 left-0 z-30 hidden w-[270px] flex-col border-r border-slate-200/80 bg-white lg:flex", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex h-24 items-center gap-3 border-b border-slate-100 px-7", children: [
        /* @__PURE__ */ jsx("div", { className: "grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-sky-300 shadow-xl shadow-sky-100", children: /* @__PURE__ */ jsx(Sparkles, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-semibold tracking-tight", children: "PropWise AI" }),
          /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase tracking-[.2em] text-slate-400", children: "Location intelligence" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "px-5 pb-3 pt-7", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-3 px-3 text-[10px] font-semibold uppercase tracking-[.2em] text-slate-400", children: "Workspace" }),
        nav
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-auto border-t border-slate-100 p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-2 px-2 text-xs text-emerald-700", children: [
          /* @__PURE__ */ jsx(ShieldCheck, { className: "h-4 w-4" }),
          "Private workspace"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 rounded-2xl bg-slate-50 p-3", children: [
          /* @__PURE__ */ jsx(Avatar, { className: "h-9 w-9", children: /* @__PURE__ */ jsx(AvatarFallback, { className: "bg-sky-100 text-sky-700", children: user.name?.[0]?.toUpperCase() || "P" }) }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsx("div", { className: "truncate text-sm font-medium", children: user.name || "PropWise user" }),
            /* @__PURE__ */ jsx("div", { className: "truncate text-xs text-slate-400", children: user.email || "Signed in" })
          ] }),
          /* @__PURE__ */ jsx("button", { "aria-label": "Sign out", onClick: logout, className: "text-slate-400 hover:text-slate-700", children: /* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("main", { className: "min-h-screen lg:pl-[270px]", children: [
      /* @__PURE__ */ jsxs("header", { className: "sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200/80 bg-[#f5f9fd]/90 px-4 backdrop-blur sm:px-6 lg:hidden", children: [
        /* @__PURE__ */ jsx("button", { "aria-label": "Open navigation", onClick: () => setMobileOpen(true), className: "rounded-xl p-2 text-slate-600 hover:bg-white", children: /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "grid h-8 w-8 place-items-center rounded-xl bg-slate-950 text-sky-300", children: /* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold", children: "PropWise AI" })
        ] }),
        /* @__PURE__ */ jsx("button", { "aria-label": "Sign out", onClick: logout, className: "rounded-xl p-2 text-slate-500 hover:bg-white", children: /* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4" }) })
      ] }),
      mobileOpen && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-40 lg:hidden", children: [
        /* @__PURE__ */ jsx("button", { "aria-label": "Close navigation overlay", className: "absolute inset-0 bg-slate-950/30", onClick: () => setMobileOpen(false) }),
        /* @__PURE__ */ jsxs("div", { className: "relative h-full w-[290px] bg-white p-5 shadow-2xl", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-8 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "grid h-9 w-9 place-items-center rounded-xl bg-slate-950 text-sky-300", children: /* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "PropWise AI" })
            ] }),
            /* @__PURE__ */ jsx("button", { "aria-label": "Close navigation", onClick: () => setMobileOpen(false), children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5 text-slate-500" }) })
          ] }),
          nav
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-[1500px] p-4 sm:p-6 lg:p-10", children })
    ] })
  ] });
}
export {
  DashboardLayout as default
};
