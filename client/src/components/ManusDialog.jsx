import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle
} from "@/components/ui/dialog";
function ManusDialog({
  title,
  logo,
  open = false,
  onLogin,
  onOpenChange,
  onClose
}) {
  const [internalOpen, setInternalOpen] = useState(open);
  useEffect(() => {
    if (!onOpenChange) {
      setInternalOpen(open);
    }
  }, [open, onOpenChange]);
  const handleOpenChange = (nextOpen) => {
    if (onOpenChange) {
      onOpenChange(nextOpen);
    } else {
      setInternalOpen(nextOpen);
    }
    if (!nextOpen) {
      onClose?.();
    }
  };
  return /* @__PURE__ */ jsx(
    Dialog,
    {
      open: onOpenChange ? open : internalOpen,
      onOpenChange: handleOpenChange,
      children: /* @__PURE__ */ jsxs(DialogContent, { className: "py-5 bg-[#f8f8f7] rounded-[20px] w-[400px] shadow-[0px_4px_11px_0px_rgba(0,0,0,0.08)] border border-[rgba(0,0,0,0.08)] backdrop-blur-2xl p-0 gap-0 text-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2 p-5 pt-12", children: [
          logo ? /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-white rounded-xl border border-[rgba(0,0,0,0.08)] flex items-center justify-center", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: logo,
              alt: "Dialog graphic",
              className: "w-10 h-10 rounded-md"
            }
          ) }) : null,
          title ? /* @__PURE__ */ jsx(DialogTitle, { className: "text-xl font-semibold text-[#34322d] leading-[26px] tracking-[-0.44px]", children: title }) : null,
          /* @__PURE__ */ jsx(DialogDescription, { className: "text-sm text-[#858481] leading-5 tracking-[-0.154px]", children: "Please login with Manus to continue" })
        ] }),
        /* @__PURE__ */ jsx(DialogFooter, { className: "px-5 py-5", children: /* @__PURE__ */ jsx(
          Button,
          {
            onClick: onLogin,
            className: "w-full h-10 bg-[#1a1a19] hover:bg-[#1a1a19]/90 text-white rounded-[10px] text-sm font-medium leading-5 tracking-[-0.154px]",
            children: "Login with Manus"
          }
        ) })
      ] })
    }
  );
}
export {
  ManusDialog
};
