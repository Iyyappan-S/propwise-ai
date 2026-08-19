import { jsx, jsxs } from "react/jsx-runtime";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Streamdown } from "streamdown";
function Home() {
  let { user, loading, error, isAuthenticated, logout } = useAuth();
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex flex-col", children: /* @__PURE__ */ jsxs("main", { children: [
    /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }),
    "Example Page",
    /* @__PURE__ */ jsx(Streamdown, { children: "Any **markdown** content" }),
    /* @__PURE__ */ jsx(Button, { variant: "default", children: "Example Button" })
  ] }) });
}
export {
  Home as default
};
