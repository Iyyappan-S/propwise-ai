import { jsx, jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { useLocation } from "wouter";
function NotFound() {
  const [, setLocation] = useLocation();
  const handleGoHome = () => {
    setLocation("/");
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100", children: /* @__PURE__ */ jsx(Card, { className: "w-full max-w-lg mx-4 shadow-lg border-0 bg-white/80 backdrop-blur-sm", children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-8 pb-8 text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-red-100 rounded-full animate-pulse" }),
      /* @__PURE__ */ jsx(AlertCircle, { className: "relative h-16 w-16 text-red-500" })
    ] }) }),
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-slate-900 mb-2", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-slate-700 mb-4", children: "Page Not Found" }),
    /* @__PURE__ */ jsxs("p", { className: "text-slate-600 mb-8 leading-relaxed", children: [
      "Sorry, the page you are looking for doesn't exist.",
      /* @__PURE__ */ jsx("br", {}),
      "It may have been moved or deleted."
    ] }),
    /* @__PURE__ */ jsx(
      "div",
      {
        id: "not-found-button-group",
        className: "flex flex-col sm:flex-row gap-3 justify-center",
        children: /* @__PURE__ */ jsxs(
          Button,
          {
            onClick: handleGoHome,
            className: "bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg",
            children: [
              /* @__PURE__ */ jsx(Home, { className: "w-4 h-4 mr-2" }),
              "Go Home"
            ]
          }
        )
      }
    )
  ] }) }) });
}
export {
  NotFound as default
};
