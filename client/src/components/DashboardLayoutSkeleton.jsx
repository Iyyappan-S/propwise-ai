import { jsx, jsxs } from "react/jsx-runtime";
import { Skeleton } from "./ui/skeleton";
function DashboardLayoutSkeleton() {
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxs("div", { className: "w-[280px] border-r border-border bg-background p-4 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 px-2", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-8 w-8 rounded-md" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-24" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2 px-2", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full rounded-lg" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full rounded-lg" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full rounded-lg" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 left-4 right-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 px-1", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-9 w-9 rounded-full" }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-2", children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-20" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-2 w-32" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 p-4 space-y-4", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "h-12 w-48 rounded-lg" }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-32 rounded-xl" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-32 rounded-xl" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-32 rounded-xl" })
      ] }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-64 rounded-xl" })
    ] })
  ] });
}
export {
  DashboardLayoutSkeleton
};
