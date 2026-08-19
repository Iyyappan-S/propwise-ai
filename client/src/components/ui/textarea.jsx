import { jsx } from "react/jsx-runtime";
import { useDialogComposition } from "@/components/ui/dialog";
import { useComposition } from "@/hooks/useComposition";
import { cn } from "@/lib/utils";
function Textarea({
  className,
  onKeyDown,
  onCompositionStart,
  onCompositionEnd,
  ...props
}) {
  const dialogComposition = useDialogComposition();
  const {
    onCompositionStart: handleCompositionStart,
    onCompositionEnd: handleCompositionEnd,
    onKeyDown: handleKeyDown
  } = useComposition({
    onKeyDown: (e) => {
      const isComposing = e.nativeEvent.isComposing || dialogComposition.justEndedComposing();
      if (e.key === "Enter" && !e.shiftKey && isComposing) {
        return;
      }
      onKeyDown?.(e);
    },
    onCompositionStart: (e) => {
      dialogComposition.setComposing(true);
      onCompositionStart?.(e);
    },
    onCompositionEnd: (e) => {
      dialogComposition.markCompositionEnd();
      setTimeout(() => {
        dialogComposition.setComposing(false);
      }, 100);
      onCompositionEnd?.(e);
    }
  });
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      onCompositionStart: handleCompositionStart,
      onCompositionEnd: handleCompositionEnd,
      onKeyDown: handleKeyDown,
      ...props
    }
  );
}
export {
  Textarea
};
