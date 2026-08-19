import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Route, Switch, Link, useLocation } from "wouter";
import { startLogin } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "./components/DashboardLayout";
import { MapView } from "./components/Map";
import { Toaster, toast } from "sonner";
import { trpc } from "./lib/trpc";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Progress } from "./components/ui/progress";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowRight, BarChart3, Bookmark, CheckCircle2, ChevronRight, Compass, FileCheck2, Globe2, Loader2, LogIn, MapPinned, ShieldCheck, Sparkles, TrendingUp, Upload, WandSparkles } from "lucide-react";
const money = (n) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
const shortMoney = (n) => n >= 1e7 ? `\u20B9${(n / 1e7).toFixed(1)}Cr` : n >= 1e5 ? `\u20B9${(n / 1e5).toFixed(1)}L` : `\u20B9${Math.round(n).toLocaleString("en-IN")}`;
function Landing() {
  const [, setLocation] = useLocation();
  return /* @__PURE__ */ jsxs("div", { className: "propwise-landing-bg min-h-screen overflow-hidden text-slate-900", children: [
    /* @__PURE__ */ jsxs("header", { className: "mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10", children: [
      /* @__PURE__ */ jsxs(Link, { href: "/", className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "grid h-10 w-10 place-items-center rounded-xl bg-sky-600 text-white", children: /* @__PURE__ */ jsx(Sparkles, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-semibold tracking-tight", children: "PropWise AI" }),
          /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase tracking-[.2em] text-slate-400", children: "Location intelligence" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "hidden items-center gap-8 text-sm text-slate-500 md:flex", children: [
        /* @__PURE__ */ jsx("a", { href: "#how", children: "How it works" }),
        /* @__PURE__ */ jsx("a", { href: "#signals", children: "Signals" }),
        /* @__PURE__ */ jsx("a", { href: "#extension", children: "Extension" })
      ] }),
      /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setLocation("/login"), children: "Sign in" })
    ] }),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs("section", { className: "mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-10 lg:pt-20", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Badge, { className: "border-sky-200 bg-sky-50 text-sky-700", children: "AI-assisted land intelligence" }),
          /* @__PURE__ */ jsxs("h1", { className: "mt-6 max-w-2xl text-5xl font-semibold leading-[1.06] tracking-[-.045em] text-slate-950 sm:text-6xl", children: [
            "Know the ",
            /* @__PURE__ */ jsx("span", { className: "text-sky-600", children: "place" }),
            " before you buy the property."
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-xl text-lg leading-8 text-slate-500", children: "Pin a location, add the site details, and get a transparent estimate of value, connectivity, growth signals, and the questions worth asking next." }),
          /* @__PURE__ */ jsxs("div", { className: "mt-9 flex flex-wrap gap-3", children: [
            /* @__PURE__ */ jsxs(Button, { size: "lg", className: "gap-2", onClick: () => setLocation("/analyze"), children: [
              "Analyze a location ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
            ] }),
            /* @__PURE__ */ jsx(Button, { size: "lg", variant: "outline", onClick: () => setLocation("/login"), children: "Create workspace" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500", children: [
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(ShieldCheck, { className: "h-4 w-4 text-emerald-600" }),
              "Private workspace"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(FileCheck2, { className: "h-4 w-4 text-emerald-600" }),
              "Explainable signals"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Globe2, { className: "h-4 w-4 text-emerald-600" }),
              "Map-first workflow"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -inset-5 rounded-[2.5rem] bg-sky-100/60 blur-2xl" }),
          /* @__PURE__ */ jsxs(Card, { className: "relative overflow-hidden rounded-[2rem] border-0 bg-slate-950 text-white shadow-2xl shadow-sky-200/70", children: [
            /* @__PURE__ */ jsx("div", { className: "border-b border-white/10 px-6 py-5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "text-sm text-white/55", children: "Location snapshot" }),
                /* @__PURE__ */ jsx("div", { className: "mt-1 text-lg font-medium", children: "Sarjapur Road, Bengaluru" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-medium text-emerald-300", children: "Indicative" })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-px bg-white/10", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-slate-950 p-6", children: [
                /* @__PURE__ */ jsx("div", { className: "text-xs text-white/45", children: "Estimated value" }),
                /* @__PURE__ */ jsx("div", { className: "mt-2 text-2xl font-semibold", children: "\u20B976.5L" }),
                /* @__PURE__ */ jsx("div", { className: "mt-1 text-xs text-emerald-300", children: "\u20B96,120 / sq.ft" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-slate-950 p-6", children: [
                /* @__PURE__ */ jsx("div", { className: "text-xs text-white/45", children: "Location score" }),
                /* @__PURE__ */ jsxs("div", { className: "mt-2 text-2xl font-semibold", children: [
                  "86",
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-white/40", children: "/100" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "mt-1 text-xs text-sky-300", children: "Suburban \xB7 88% confidence" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs text-white/50", children: [
                /* @__PURE__ */ jsx("span", { children: "5-year projection" }),
                /* @__PURE__ */ jsx("span", { children: "Model-based estimate" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-4 h-28", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(AreaChart, { data: [{ x: "Now", v: 72 }, { x: "1Y", v: 80 }, { x: "3Y", v: 95 }, { x: "5Y", v: 118 }], children: [
                /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "g", x1: "0", x2: "0", y1: "0", y2: "1", children: [
                  /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#38bdf8", stopOpacity: ".55" }),
                  /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#38bdf8", stopOpacity: "0" })
                ] }) }),
                /* @__PURE__ */ jsx(XAxis, { dataKey: "x", hide: true }),
                /* @__PURE__ */ jsx(YAxis, { hide: true }),
                /* @__PURE__ */ jsx(Tooltip, { contentStyle: { background: "#0f172a", border: "1px solid #334155", borderRadius: 12, color: "white" } }),
                /* @__PURE__ */ jsx(Area, { type: "monotone", dataKey: "v", stroke: "#38bdf8", fill: "url(#g)", strokeWidth: 3 })
              ] }) }) })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { id: "signals", className: "border-y border-[#caa77a]/70 bg-[#d8c2a0]/92 backdrop-blur-sm", children: /* @__PURE__ */ jsx("div", { className: "mx-auto grid max-w-7xl gap-5 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-10", children: [[MapPinned, "Pin any place", "Search, click, and capture coordinates."], [BarChart3, "Read the signals", "See value, access, demand, and growth."], [WandSparkles, "Ask better questions", "Get cautious AI explanations and due diligence prompts."], [Compass, "Compare options", "Bring your shortlist into one decision view."]].map(([Icon, title, body]) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-[#ead8b8]/85 p-5 shadow-sm", children: [
        /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5 text-sky-600" }),
        /* @__PURE__ */ jsx("h3", { className: "mt-4 font-medium", children: title }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm leading-6 text-slate-500", children: body })
      ] }, title)) }) }),
      /* @__PURE__ */ jsxs("section", { id: "how", className: "mx-auto max-w-7xl px-6 py-20 lg:px-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "max-w-2xl", children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-sky-600", children: "A calmer research loop" }),
          /* @__PURE__ */ jsx("h2", { className: "mt-3 text-3xl font-semibold tracking-tight", children: "From a map pin to a next-step plan." }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 text-slate-500", children: "PropWise keeps the math visible and the uncertainty explicit. It is an intelligence layer for early research, not a substitute for legal, financial, or technical due diligence." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-10 grid gap-5 md:grid-cols-3", children: [["01", "Select", "Search a neighborhood or pin a location directly on the map."], ["02", "Analyze", "Add area, category, access, and amenity inputs for a tailored estimate."], ["03", "Decide", "Save, compare, and turn the output into a verification checklist."]].map(([n, t, b]) => /* @__PURE__ */ jsxs("div", { className: "rounded-3xl border border-slate-200 p-6", children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-sky-600", children: n }),
          /* @__PURE__ */ jsx("div", { className: "mt-12 text-xl font-semibold", children: t }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-6 text-slate-500", children: b })
        ] }, n)) })
      ] }),
      /* @__PURE__ */ jsx("section", { id: "extension", className: "bg-slate-950 px-6 py-16 text-white lg:px-10", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sky-300", children: [
            /* @__PURE__ */ jsx(Upload, { className: "h-4 w-4" }),
            "Chrome extension ready"
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "mt-3 text-3xl font-semibold", children: "Analyze supported listing pages without losing context." }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 max-w-2xl text-white/55", children: "The bundled Manifest V3 extension extracts visible listing details, sends them to your workspace, and links back to the full analysis. It never bypasses site protections." })
        ] }),
        /* @__PURE__ */ jsxs(Button, { variant: "secondary", className: "shrink-0", onClick: () => setLocation("/login"), children: [
          "Open workspace ",
          /* @__PURE__ */ jsx(ChevronRight, { className: "ml-1 h-4 w-4" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("footer", { className: "mx-auto flex max-w-7xl justify-between px-6 py-8 text-xs text-slate-400 lg:px-10", children: [
      /* @__PURE__ */ jsx("span", { children: "PropWise AI \xB7 research with context" }),
      /* @__PURE__ */ jsx("span", { children: "Estimates are indicative, not financial advice." })
    ] })
  ] });
}
function Login() {
  const { user, loading, error } = useAuth();
  const [, setLocation] = useLocation();
  useEffect(() => {
    if (user) setLocation("/dashboard");
  }, [user, setLocation]);
  return /* @__PURE__ */ jsxs("div", { className: "propwise-login-bg min-h-screen px-6 py-8 text-slate-950", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-6xl items-center justify-between", children: [
      /* @__PURE__ */ jsxs(Link, { href: "/", className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-sky-300 shadow-xl shadow-sky-200", children: /* @__PURE__ */ jsx(Sparkles, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-semibold tracking-tight", children: "PropWise AI" }),
          /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase tracking-[.2em] text-slate-400", children: "Location intelligence" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Link, { href: "/", className: "text-sm text-slate-500 hover:text-slate-950", children: "Back to home" })
    ] }),
    /* @__PURE__ */ jsxs("main", { className: "mx-auto grid max-w-6xl gap-10 py-16 lg:grid-cols-[.9fr_1.1fr] lg:items-center", children: [
      /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold uppercase tracking-[.2em] text-sky-600", children: "Private research workspace" }),
        /* @__PURE__ */ jsx("h1", { className: "mt-5 max-w-xl text-5xl font-semibold leading-[1.05] tracking-[-.05em]", children: "Sign in to keep every location decision together." }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-lg text-lg leading-8 text-slate-500", children: "Save exact map pins, compare properties, and return to your analysis history from any device." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 grid gap-3 text-sm text-slate-600", children: [
          /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-[#d2b58a] bg-[#dcc5a0]/80 p-4 shadow-sm", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-slate-950", children: "Exact pins." }),
            " Your selected coordinates become the analysis input."
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-[#d2b58a] bg-[#dcc5a0]/80 p-4 shadow-sm", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-slate-950", children: "Explainable outputs." }),
            " Review the factors before acting."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Card, { className: "rounded-[2rem] border-[#dbc39f] bg-[#ead8b8]/92 p-2 shadow-2xl shadow-sky-200/60 backdrop-blur", children: /* @__PURE__ */ jsx(CardContent, { className: "p-8 sm:p-10", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "grid h-14 w-14 place-items-center rounded-2xl bg-sky-50 text-sky-700", children: /* @__PURE__ */ jsx(LogIn, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsx("h2", { className: "mt-7 text-2xl font-semibold", children: "Welcome back" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm leading-6 text-slate-500", children: "Use secure sign-in to open your PropWise workspace." }),
        error && /* @__PURE__ */ jsx("div", { className: "mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700", children: "Sign-in status could not be loaded. Please try again." }),
        /* @__PURE__ */ jsxs(Button, { className: "mt-8 h-12 w-full gap-2 rounded-xl", onClick: () => startLogin(), disabled: loading, children: [
          loading ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(LogIn, { className: "h-4 w-4" }),
          loading ? "Checking session\u2026" : "Continue with secure sign-in"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-5 text-center text-xs leading-5 text-slate-400", children: "By continuing, you agree to use PropWise AI for research support and to verify important property facts independently." })
      ] }) }) })
    ] })
  ] });
}
function Header({ title, kicker }) {
  return /* @__PURE__ */ jsxs("div", { className: "mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "text-xs font-semibold uppercase tracking-[.18em] text-sky-600", children: kicker }),
      /* @__PURE__ */ jsx("h1", { className: "mt-2 text-3xl font-semibold tracking-tight text-slate-950", children: title })
    ] }),
    /* @__PURE__ */ jsx(Link, { href: "/analyze", children: /* @__PURE__ */ jsxs(Button, { className: "gap-2", children: [
      /* @__PURE__ */ jsx(MapPinned, { className: "h-4 w-4" }),
      "New analysis"
    ] }) })
  ] });
}
function Dashboard() {
  const { data: props = [] } = trpc.properties.list.useQuery();
  const { data: history = [] } = trpc.analysis.history.useQuery();
  const avg = props.length ? props.reduce((s, p) => s + (p.areaSqft || 0), 0) / props.length : 0;
  return /* @__PURE__ */ jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsx(Header, { kicker: "Workspace overview", title: "Your property intelligence desk" }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4", children: [
      /* @__PURE__ */ jsx(Metric, { label: "Saved properties", value: String(props.length), detail: "Across your workspace", icon: /* @__PURE__ */ jsx(Bookmark, {}) }),
      /* @__PURE__ */ jsx(Metric, { label: "Avg. site area", value: avg ? `${Math.round(avg).toLocaleString("en-IN")} sq.ft` : "\u2014", detail: "From saved inputs", icon: /* @__PURE__ */ jsx(Globe2, {}) }),
      /* @__PURE__ */ jsx(Metric, { label: "Analyses run", value: String(history.length), detail: "Your research trail", icon: /* @__PURE__ */ jsx(BarChart3, {}) }),
      /* @__PURE__ */ jsx(Metric, { label: "Decision mode", value: "Indicative", detail: "Verify before acting", icon: /* @__PURE__ */ jsx(ShieldCheck, {}) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 grid gap-6 xl:grid-cols-[1.35fr_.65fr]", children: [
      /* @__PURE__ */ jsxs(Card, { className: "rounded-3xl border-0 shadow-sm", children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { children: "Research activity" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs font-normal text-slate-400", children: "Saved analysis history" })
        ] }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "h-72", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(AreaChart, { data: (history.length ? history.slice(0, 7).reverse() : [{ createdAt: Date.now(), result: { estimatedValue: 0 } }]).map((h, i) => ({ name: `${i + 1}`, value: h.result?.estimatedValue || 0 })), children: [
          /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "dash", x1: "0", x2: "0", y1: "0", y2: "1", children: [
            /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#0284c7", stopOpacity: ".3" }),
            /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#0284c7", stopOpacity: "0" })
          ] }) }),
          /* @__PURE__ */ jsx(XAxis, { dataKey: "name", stroke: "#94a3b8" }),
          /* @__PURE__ */ jsx(YAxis, { tickFormatter: (v) => shortMoney(v), stroke: "#94a3b8" }),
          /* @__PURE__ */ jsx(Tooltip, { formatter: (v) => money(v), contentStyle: { borderRadius: 14, border: "1px solid #e2e8f0" } }),
          /* @__PURE__ */ jsx(Area, { type: "monotone", dataKey: "value", stroke: "#0284c7", fill: "url(#dash)", strokeWidth: 3 })
        ] }) }) }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "rounded-3xl border-0 bg-slate-950 text-white shadow-sm", children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-white", children: "A useful reminder" }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "grid h-full content-center", children: [
          /* @__PURE__ */ jsx(CheckCircle2, { className: "h-8 w-8 text-emerald-300" }),
          /* @__PURE__ */ jsx("p", { className: "mt-5 text-lg leading-8 text-white/85", children: "A confident score is not a title search. Use the AI notes to decide what to verify next." }),
          /* @__PURE__ */ jsxs(Link, { href: "/about", className: "mt-6 text-sm text-sky-300", children: [
            "Read methodology ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "ml-1 inline h-4 w-4" })
          ] })
        ] }) })
      ] })
    ] })
  ] });
}
function Metric({ label, value, detail, icon }) {
  return /* @__PURE__ */ jsx(Card, { className: "rounded-3xl border-0 shadow-sm", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsx("div", { className: "text-sm text-slate-500", children: label }),
      /* @__PURE__ */ jsx("div", { className: "rounded-xl bg-sky-50 p-2 text-sky-600", children: icon })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-5 text-2xl font-semibold", children: value }),
    /* @__PURE__ */ jsx("div", { className: "mt-1 text-xs text-slate-400", children: detail })
  ] }) });
}
function Analyze() {
  const [, setLocation] = useLocation();
  const [coords, setCoords] = useState({ latitude: 12.9716, longitude: 77.5946 });
  const [hasPin, setHasPin] = useState(false);
  const [mapObj, setMapObj] = useState();
  const [search, setSearch] = useState("");
  const [mapError, setMapError] = useState("");
  const [mapLoading, setMapLoading] = useState(true);
  const save = trpc.saved.add.useMutation();
  const [form, setForm] = useState({ title: "", address: "Bengaluru, Karnataka", areaSqft: 1200, propertyType: "Residential plot", category: "residential", roadAccess: "Paved road", amenities: ["School"] });
  const [result, setResult] = useState();
  const mutation = trpc.analysis.analyze.useMutation({ onSuccess: (r) => {
    setResult(r);
    toast.success("Location analyzed");
  }, onError: (e) => toast.error(e.message) });
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const locate = () => {
    if (!mapObj || !search.trim()) return;
    setMapError("");
    new google.maps.Geocoder().geocode({ address: search }, (res, status) => {
      if (status !== "OK" || !res?.[0]) {
        setMapError("Location could not be found. Try a more specific address.");
        return;
      }
      const p = res[0].geometry.location;
      const next = { latitude: p.lat(), longitude: p.lng() };
      setCoords(next);
      setHasPin(false);
      update("address", res[0].formatted_address || search);
      mapObj.setCenter(p);
      mapObj.setZoom(15);
      new google.maps.Marker({ map: mapObj, position: p, title: "Search result \u2014 click the exact site to confirm" });
    });
  };
  const analyze = () => mutation.mutate({ ...form, latitude: coords.latitude, longitude: coords.longitude, areaSqft: Number(form.areaSqft), title: form.title || "Untitled Bengaluru property", amenities: form.amenities || [] });
  const keep = () => {
    if (result?.propertyId) {
      save.mutate({ propertyId: result.propertyId, tags: [result.areaType] }, { onSuccess: () => {
        toast.success("Property saved to your shortlist");
        setLocation("/saved");
      }, onError: (e) => toast.error(e.message) });
    }
  };
  return /* @__PURE__ */ jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsx(Header, { kicker: "Map intelligence", title: "Analyze a location" }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-6 xl:grid-cols-[1.1fr_.9fr]", children: [
      /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden rounded-3xl border-0 shadow-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative h-[430px] bg-slate-100", children: [
          /* @__PURE__ */ jsx(MapView, { className: "h-full", initialCenter: { lat: coords.latitude, lng: coords.longitude }, initialZoom: 12, onMapReady: (map) => {
            setMapObj(map);
            setMapLoading(false);
            map.addListener("click", (e) => {
              const next = { latitude: e.latLng.lat(), longitude: e.latLng.lng() };
              setCoords(next);
              setHasPin(true);
              new google.maps.Marker({ map, position: { lat: next.latitude, lng: next.longitude }, title: "Exact price pin" });
              new google.maps.Geocoder().geocode({ location: e.latLng }, (res) => {
                if (res?.[0]) {
                  update("address", res[0].formatted_address);
                }
              });
            });
          } }),
          /* @__PURE__ */ jsxs("div", { className: "absolute left-4 right-4 top-4 z-10 flex gap-2", children: [
            /* @__PURE__ */ jsx(Input, { value: search, onChange: (e) => setSearch(e.target.value), onKeyDown: (e) => {
              if (e.key === "Enter") locate();
            }, placeholder: "Search a place or address", className: "bg-white/95 shadow-lg" }),
            /* @__PURE__ */ jsx(Button, { variant: "secondary", onClick: locate, children: "Search" })
          ] }),
          mapLoading && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 grid place-items-center bg-slate-100/80 text-sm text-slate-500", children: "Loading map\u2026" }),
          mapError && /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 left-4 right-4 rounded-xl bg-red-50 p-3 text-xs text-red-700", children: mapError }),
          /* @__PURE__ */ jsxs("div", { className: "absolute left-4 top-20 rounded-2xl bg-white/95 p-3 shadow-lg backdrop-blur", children: [
            /* @__PURE__ */ jsx("div", { className: "text-xs font-semibold uppercase tracking-wider text-slate-400", children: hasPin ? "Exact price pin selected" : "Pin required for price" }),
            /* @__PURE__ */ jsxs("div", { className: "mt-1 font-mono text-sm text-slate-800", children: [
              coords.latitude.toFixed(5),
              ", ",
              coords.longitude.toFixed(5)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 p-5", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-sm font-medium", children: "Pin the site on the map" }),
            /* @__PURE__ */ jsx("div", { className: "mt-1 text-xs text-slate-400", children: "Search only centers the map. Click the exact site to confirm the authoritative price pin." })
          ] }),
          /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => {
            setCoords({ latitude: 12.9716, longitude: 77.5946 });
            setHasPin(false);
          }, children: "Reset view" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "rounded-3xl border-0 shadow-sm", children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Site details" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500", children: "Add only what you know. Unavailable fields stay optional." })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsx(Field, { label: "Property label", children: /* @__PURE__ */ jsx(Input, { value: form.title, onChange: (e) => update("title", e.target.value), placeholder: "e.g. Sarjapur corner plot" }) }),
          /* @__PURE__ */ jsx(Field, { label: "Location / address", children: /* @__PURE__ */ jsx(Input, { value: form.address, onChange: (e) => update("address", e.target.value) }) }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsx(Field, { label: "Site area (sq.ft)", children: /* @__PURE__ */ jsx(Input, { type: "number", value: form.areaSqft, onChange: (e) => update("areaSqft", e.target.value) }) }),
            /* @__PURE__ */ jsx(Field, { label: "Property type", children: /* @__PURE__ */ jsxs("select", { className: "h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm", value: form.propertyType, onChange: (e) => update("propertyType", e.target.value), children: [
              /* @__PURE__ */ jsx("option", { children: "Residential plot" }),
              /* @__PURE__ */ jsx("option", { children: "Apartment" }),
              /* @__PURE__ */ jsx("option", { children: "Commercial site" }),
              /* @__PURE__ */ jsx("option", { children: "Agricultural land" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsx(Field, { label: "Category", children: /* @__PURE__ */ jsxs("select", { className: "h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm", value: form.category, onChange: (e) => update("category", e.target.value), children: [
              /* @__PURE__ */ jsx("option", { value: "residential", children: "Residential" }),
              /* @__PURE__ */ jsx("option", { value: "commercial", children: "Commercial" }),
              /* @__PURE__ */ jsx("option", { value: "agricultural", children: "Agricultural" })
            ] }) }),
            /* @__PURE__ */ jsx(Field, { label: "Road access", children: /* @__PURE__ */ jsxs("select", { className: "h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm", value: form.roadAccess, onChange: (e) => update("roadAccess", e.target.value), children: [
              /* @__PURE__ */ jsx("option", { children: "Main road" }),
              /* @__PURE__ */ jsx("option", { children: "Paved road" }),
              /* @__PURE__ */ jsx("option", { children: "Narrow road" }),
              /* @__PURE__ */ jsx("option", { children: "Unpaved" }),
              /* @__PURE__ */ jsx("option", { children: "Unknown" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsx(Field, { label: "Known nearby amenities", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: ["School", "Hospital", "Transit", "Retail", "Bank"].map((a) => /* @__PURE__ */ jsx("button", { type: "button", onClick: () => update("amenities", (form.amenities || []).includes(a) ? form.amenities.filter((x) => x !== a) : [...form.amenities || [], a]), className: `rounded-full border px-3 py-1.5 text-xs ${form.amenities?.includes(a) ? "border-sky-200 bg-sky-50 text-sky-700" : "border-slate-200 text-slate-500"}`, children: a }, a)) }) }),
          /* @__PURE__ */ jsxs(Button, { className: "mt-2 w-full gap-2", size: "lg", onClick: analyze, disabled: mutation.isPending || !hasPin, children: [
            mutation.isPending ? "Calculating exact location\u2026" : hasPin ? "Calculate price from this pin" : "Pin the exact place to calculate price",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-center text-[11px] leading-5 text-slate-400", children: "Estimates are model predictions and should not be treated as guaranteed market values or financial advice." })
        ] })
      ] })
    ] }),
    result && /* @__PURE__ */ jsx(ResultPanel, { result, onSave: keep })
  ] });
}
function Field({ label, children }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Label, { className: "mb-2 block text-xs font-medium text-slate-500", children: label }),
    children
  ] });
}
function ResultPanel({ result, onSave }) {
  return /* @__PURE__ */ jsxs("div", { className: "mt-6 space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4", children: [
      /* @__PURE__ */ jsx(Metric, { label: "Estimated value", value: shortMoney(result.estimatedValue), detail: `Indicative range ${shortMoney(result.marketRange[0])} \u2013 ${shortMoney(result.marketRange[1])}`, icon: /* @__PURE__ */ jsx(TrendingUp, {}) }),
      /* @__PURE__ */ jsx(Metric, { label: "Price / sq.ft", value: money(result.pricePerSqft), detail: "Model prediction", icon: /* @__PURE__ */ jsx(BarChart3, {}) }),
      /* @__PURE__ */ jsx(Metric, { label: "Location score", value: `${result.locationScore}/100`, detail: `${result.areaType} \xB7 ${result.classificationConfidence}% confidence`, icon: /* @__PURE__ */ jsx(Compass, {}) }),
      /* @__PURE__ */ jsx(Metric, { label: "Investment score", value: `${result.investmentScore}/100`, detail: `Indicative ${result.annualAppreciation}% annual growth`, icon: /* @__PURE__ */ jsx(Sparkles, {}) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-6 xl:grid-cols-[1.1fr_.9fr]", children: [
      /* @__PURE__ */ jsxs(Card, { className: "rounded-3xl border-0 shadow-sm", children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Transparent scorecard" }) }),
        /* @__PURE__ */ jsx(CardContent, { className: "space-y-4", children: result.factors.map((f) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-2 flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              f.name,
              " ",
              /* @__PURE__ */ jsxs("span", { className: "text-xs text-slate-400", children: [
                "\xB7 ",
                f.weight,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: f.score })
          ] }),
          /* @__PURE__ */ jsx(Progress, { value: f.score }),
          /* @__PURE__ */ jsx("div", { className: "mt-1 text-xs text-slate-400", children: f.note })
        ] }, f.name)) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "rounded-3xl border-0 bg-slate-950 text-white shadow-sm", children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-white", children: "AI research brief" }) }),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsx("p", { className: "leading-7 text-white/75", children: result.aiExplanation?.summary }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5 grid gap-4 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-wider text-emerald-300", children: "Signals in favor" }),
              /* @__PURE__ */ jsx("ul", { className: "mt-2 space-y-2 text-sm text-white/70", children: result.aiExplanation?.advantages?.map((x) => /* @__PURE__ */ jsxs("li", { children: [
                "+ ",
                x
              ] }, x)) })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-wider text-amber-300", children: "Check next" }),
              /* @__PURE__ */ jsx("ul", { className: "mt-2 space-y-2 text-sm text-white/70", children: result.aiExplanation?.concerns?.map((x) => /* @__PURE__ */ jsxs("li", { children: [
                "! ",
                x
              ] }, x)) })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-6 border-t border-white/10 pt-4 text-xs leading-5 text-white/45", children: result.methodology })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { className: "rounded-3xl border-0 shadow-sm", children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Future value projection" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500", children: "Indicative projection, not a guarantee of appreciation." })
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { children: [
        /* @__PURE__ */ jsx("div", { className: "grid gap-4 sm:grid-cols-3", children: result.futureValues.map((v) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-slate-50 p-4", children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-400", children: v.horizon }),
          /* @__PURE__ */ jsx("div", { className: "mt-2 text-xl font-semibold", children: shortMoney(v.value) })
        ] }, v.horizon)) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-5 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxs(Button, { onClick: onSave, className: "gap-2", children: [
            /* @__PURE__ */ jsx(Bookmark, { className: "h-4 w-4" }),
            "Keep in history"
          ] }),
          /* @__PURE__ */ jsx(Link, { href: "/saved", children: /* @__PURE__ */ jsx(Button, { variant: "outline", children: "View saved properties" }) })
        ] })
      ] })
    ] })
  ] });
}
function Saved() {
  const { data = [], isLoading } = trpc.saved.list.useQuery();
  const remove = trpc.saved.remove.useMutation({ onSuccess: () => toast.success("Removed from saved") });
  return /* @__PURE__ */ jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsx(Header, { kicker: "Your shortlist", title: "Saved properties" }),
    /* @__PURE__ */ jsx(Card, { className: "rounded-3xl border-0 shadow-sm", children: /* @__PURE__ */ jsx(CardContent, { className: "p-0", children: isLoading ? /* @__PURE__ */ jsx("div", { className: "p-8 text-sm text-slate-500", children: "Loading saved properties\u2026" }) : !data.length ? /* @__PURE__ */ jsxs("div", { className: "grid place-items-center px-6 py-20 text-center", children: [
      /* @__PURE__ */ jsx(Bookmark, { className: "h-8 w-8 text-slate-300" }),
      /* @__PURE__ */ jsx("h3", { className: "mt-4 font-medium", children: "Your shortlist is empty" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 max-w-sm text-sm text-slate-500", children: "Run an analysis first, then save the locations that deserve a closer look." }),
      /* @__PURE__ */ jsx(Link, { href: "/analyze", className: "mt-5", children: /* @__PURE__ */ jsx(Button, { children: "Start an analysis" }) })
    ] }) : /* @__PURE__ */ jsx("div", { className: "divide-y divide-slate-100", children: data.map((item) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "font-medium", children: item.property?.title || "Saved property" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-1 text-sm text-slate-500", children: [
          item.property?.category,
          " \xB7 ",
          item.property?.areaSqft?.toLocaleString("en-IN"),
          " sq.ft"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: "Needs analysis review" }),
        /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", onClick: () => remove.mutate({ id: item.id }), children: "Remove" })
      ] })
    ] }, item.id)) }) }) })
  ] });
}
function Compare() {
  const { data = [] } = trpc.properties.list.useQuery();
  const [selected, setSelected] = useState([]);
  const compare = trpc.comparison.analyze.useMutation({ onSuccess: (r) => toast.success(r.recommendation) });
  return /* @__PURE__ */ jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsx(Header, { kicker: "Decision support", title: "Compare your shortlist" }),
    /* @__PURE__ */ jsxs(Card, { className: "rounded-3xl border-0 shadow-sm", children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Select 2\u20134 properties" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500", children: "Recommendations are score-based and never override due diligence." })
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { children: [
        /* @__PURE__ */ jsx("div", { className: "grid gap-3 md:grid-cols-2", children: data.map((p) => /* @__PURE__ */ jsxs("button", { onClick: () => setSelected((s) => s.includes(p.id) ? s.filter((x) => x !== p.id) : s.length < 4 ? [...s, p.id] : s), className: `rounded-2xl border p-4 text-left transition ${selected.includes(p.id) ? "border-sky-300 bg-sky-50" : "border-slate-200 hover:border-sky-200"}`, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: p.title }),
            selected.includes(p.id) && /* @__PURE__ */ jsx(CheckCircle2, { className: "h-5 w-5 text-sky-600" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-2 text-sm text-slate-500", children: [
            p.propertyType,
            " \xB7 ",
            p.areaSqft?.toLocaleString("en-IN"),
            " sq.ft"
          ] })
        ] }, p.id)) }),
        /* @__PURE__ */ jsx(Button, { className: "mt-6", disabled: selected.length < 2 || compare.isPending, onClick: () => compare.mutate({ propertyIds: selected }), children: "Compare selected properties" }),
        compare.data && /* @__PURE__ */ jsx("div", { className: "mt-6 rounded-2xl bg-slate-950 p-5 text-sm leading-7 text-white/75", children: compare.data.recommendation })
      ] })
    ] })
  ] });
}
function History() {
  const { data = [], isLoading } = trpc.analysis.history.useQuery();
  return /* @__PURE__ */ jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsx(Header, { kicker: "Research trail", title: "Analysis history" }),
    /* @__PURE__ */ jsx(Card, { className: "rounded-3xl border-0 shadow-sm", children: /* @__PURE__ */ jsx(CardContent, { className: "p-0", children: isLoading ? /* @__PURE__ */ jsx("div", { className: "p-8 text-sm text-slate-500", children: "Loading history\u2026" }) : !data.length ? /* @__PURE__ */ jsx("div", { className: "p-10 text-center text-sm text-slate-500", children: "No analyses yet. Your next location study will appear here." }) : /* @__PURE__ */ jsx("div", { className: "divide-y divide-slate-100", children: data.map((a) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between gap-3 p-6 sm:flex-row sm:items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "font-medium", children: [
          "Analysis #",
          a.id
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-1 text-sm text-slate-500", children: new Date(a.createdAt).toLocaleString() })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsx("div", { className: "font-semibold", children: shortMoney(a.result?.estimatedValue || 0) }),
          /* @__PURE__ */ jsxs("div", { className: "text-xs text-slate-400", children: [
            a.result?.areaType,
            " \xB7 ",
            a.result?.locationScore,
            "/100"
          ] })
        ] }),
        /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4 text-slate-300" })
      ] })
    ] }, a.id)) }) }) })
  ] });
}
function Profile() {
  const { user } = useAuth();
  return /* @__PURE__ */ jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsx(Header, { kicker: "Workspace", title: "Profile" }),
    /* @__PURE__ */ jsx(Card, { className: "max-w-2xl rounded-3xl border-0 shadow-sm", children: /* @__PURE__ */ jsxs(CardContent, { className: "space-y-5 p-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-wider text-slate-400", children: "Name" }),
        /* @__PURE__ */ jsx("div", { className: "mt-1 text-lg font-medium", children: user?.name || "PropWise user" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-wider text-slate-400", children: "Email" }),
        /* @__PURE__ */ jsx("div", { className: "mt-1 text-lg font-medium", children: user?.email || "Managed by secure sign-in" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-500", children: "Your workspace data is scoped to your authenticated account. Use the profile area to confirm your identity before saving sensitive research notes." })
    ] }) })
  ] });
}
function About() {
  return /* @__PURE__ */ jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsx(Header, { kicker: "Methodology", title: "About PropWise AI" }),
    /* @__PURE__ */ jsxs("div", { className: "grid max-w-5xl gap-6 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxs(Card, { className: "rounded-3xl border-0 shadow-sm", children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "What the model does" }) }),
        /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4 text-sm leading-7 text-slate-500", children: [
          /* @__PURE__ */ jsx("p", { children: "PropWise combines the coordinates, site area, category, road-access signal, and user-supplied amenities into an indicative scorecard." }),
          /* @__PURE__ */ jsx("p", { children: "The valuation engine is intentionally transparent and JavaScript-native. It is a development model until it is calibrated against a licensed, representative dataset." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "rounded-3xl border-0 shadow-sm", children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "What it does not do" }) }),
        /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4 text-sm leading-7 text-slate-500", children: [
          /* @__PURE__ */ jsx("p", { children: "It does not verify title, ownership, approvals, taxes, zoning, utilities, legal status, or live market comparables." }),
          /* @__PURE__ */ jsx("p", { children: "Future appreciation and investment scores are uncertain, model-based projections and are not financial advice." })
        ] })
      ] })
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Toaster, {}),
    /* @__PURE__ */ jsxs(Switch, { children: [
      /* @__PURE__ */ jsx(Route, { path: "/", component: Landing }),
      /* @__PURE__ */ jsx(Route, { path: "/login", component: Login }),
      /* @__PURE__ */ jsx(Route, { path: "/dashboard", component: Dashboard }),
      /* @__PURE__ */ jsx(Route, { path: "/analyze", component: Analyze }),
      /* @__PURE__ */ jsx(Route, { path: "/saved", component: Saved }),
      /* @__PURE__ */ jsx(Route, { path: "/compare", component: Compare }),
      /* @__PURE__ */ jsx(Route, { path: "/history", component: History }),
      /* @__PURE__ */ jsx(Route, { path: "/profile", component: Profile }),
      /* @__PURE__ */ jsx(Route, { path: "/about", component: About }),
      /* @__PURE__ */ jsx(Route, { children: /* @__PURE__ */ jsx(Landing, {}) })
    ] })
  ] });
}
var App_default = App;
export {
  App_default as default
};
