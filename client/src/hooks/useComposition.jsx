import { useRef } from "react";
import { usePersistFn } from "./usePersistFn";
function useComposition(options = {}) {
  const {
    onKeyDown: originalOnKeyDown,
    onCompositionStart: originalOnCompositionStart,
    onCompositionEnd: originalOnCompositionEnd
  } = options;
  const c = useRef(false);
  const timer = useRef(null);
  const timer2 = useRef(null);
  const onCompositionStart = usePersistFn((e) => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    if (timer2.current) {
      clearTimeout(timer2.current);
      timer2.current = null;
    }
    c.current = true;
    originalOnCompositionStart?.(e);
  });
  const onCompositionEnd = usePersistFn((e) => {
    timer.current = setTimeout(() => {
      timer2.current = setTimeout(() => {
        c.current = false;
      });
    });
    originalOnCompositionEnd?.(e);
  });
  const onKeyDown = usePersistFn((e) => {
    if (c.current && (e.key === "Escape" || e.key === "Enter" && !e.shiftKey)) {
      e.stopPropagation();
      return;
    }
    originalOnKeyDown?.(e);
  });
  const isComposing = usePersistFn(() => {
    return c.current;
  });
  return {
    onCompositionStart,
    onCompositionEnd,
    onKeyDown,
    isComposing
  };
}
export {
  useComposition
};
