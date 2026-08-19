import { jsx, jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Component } from "react";
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center min-h-screen p-8 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center w-full max-w-2xl p-8", children: [
        /* @__PURE__ */ jsx(
          AlertTriangle,
          {
            size: 48,
            className: "text-destructive mb-6 flex-shrink-0"
          }
        ),
        /* @__PURE__ */ jsx("h2", { className: "text-xl mb-4", children: "An unexpected error occurred." }),
        /* @__PURE__ */ jsx("div", { className: "p-4 w-full rounded bg-muted overflow-auto mb-6", children: /* @__PURE__ */ jsx("pre", { className: "text-sm text-muted-foreground whitespace-break-spaces", children: this.state.error?.stack }) }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => window.location.reload(),
            className: cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg",
              "bg-primary text-primary-foreground",
              "hover:opacity-90 cursor-pointer"
            ),
            children: [
              /* @__PURE__ */ jsx(RotateCcw, { size: 16 }),
              "Reload Page"
            ]
          }
        )
      ] }) });
    }
    return this.props.children;
  }
}
var ErrorBoundary_default = ErrorBoundary;
export {
  ErrorBoundary_default as default
};
