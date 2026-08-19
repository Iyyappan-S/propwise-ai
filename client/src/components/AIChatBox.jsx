import { jsx, jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Loader2, Send, User, Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Streamdown } from "streamdown";
function AIChatBox({
  messages,
  onSendMessage,
  isLoading = false,
  placeholder = "Type your message...",
  className,
  height = "600px",
  emptyStateMessage = "Start a conversation with AI",
  suggestedPrompts
}) {
  const [input, setInput] = useState("");
  const scrollAreaRef = useRef(null);
  const containerRef = useRef(null);
  const inputAreaRef = useRef(null);
  const textareaRef = useRef(null);
  const displayMessages = messages.filter((msg) => msg.role !== "system");
  const [minHeightForLastMessage, setMinHeightForLastMessage] = useState(0);
  useEffect(() => {
    if (containerRef.current && inputAreaRef.current) {
      const containerHeight = containerRef.current.offsetHeight;
      const inputHeight = inputAreaRef.current.offsetHeight;
      const scrollAreaHeight = containerHeight - inputHeight;
      const userMessageReservedHeight = 56;
      const calculatedHeight = scrollAreaHeight - 32 - userMessageReservedHeight;
      setMinHeightForLastMessage(Math.max(0, calculatedHeight));
    }
  }, []);
  const scrollToBottom = () => {
    const viewport = scrollAreaRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]"
    );
    if (viewport) {
      requestAnimationFrame(() => {
        viewport.scrollTo({
          top: viewport.scrollHeight,
          behavior: "smooth"
        });
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;
    onSendMessage(trimmedInput);
    setInput("");
    scrollToBottom();
    textareaRef.current?.focus();
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: containerRef,
      className: cn(
        "flex flex-col bg-card text-card-foreground rounded-lg border shadow-sm",
        className
      ),
      style: { height },
      children: [
        /* @__PURE__ */ jsx("div", { ref: scrollAreaRef, className: "flex-1 overflow-hidden", children: displayMessages.length === 0 ? /* @__PURE__ */ jsx("div", { className: "flex h-full flex-col p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col items-center justify-center gap-6 text-muted-foreground", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-3", children: [
            /* @__PURE__ */ jsx(Sparkles, { className: "size-12 opacity-20" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm", children: emptyStateMessage })
          ] }),
          suggestedPrompts && suggestedPrompts.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex max-w-2xl flex-wrap justify-center gap-2", children: suggestedPrompts.map((prompt, index) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onSendMessage(prompt),
              disabled: isLoading,
              className: "rounded-lg border border-border bg-card px-4 py-2 text-sm transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50",
              children: prompt
            },
            index
          )) })
        ] }) }) : /* @__PURE__ */ jsx(ScrollArea, { className: "h-full", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-4 p-4", children: [
          displayMessages.map((message, index) => {
            const isLastMessage = index === displayMessages.length - 1;
            const shouldApplyMinHeight = isLastMessage && !isLoading && minHeightForLastMessage > 0;
            return /* @__PURE__ */ jsxs(
              "div",
              {
                className: cn(
                  "flex gap-3",
                  message.role === "user" ? "justify-end items-start" : "justify-start items-start"
                ),
                style: shouldApplyMinHeight ? { minHeight: `${minHeightForLastMessage}px` } : void 0,
                children: [
                  message.role === "assistant" && /* @__PURE__ */ jsx("div", { className: "size-8 shrink-0 mt-1 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsx(Sparkles, { className: "size-4 text-primary" }) }),
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: cn(
                        "max-w-[80%] rounded-lg px-4 py-2.5",
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                      ),
                      children: message.role === "assistant" ? /* @__PURE__ */ jsx("div", { className: "prose prose-sm dark:prose-invert max-w-none", children: /* @__PURE__ */ jsx(Streamdown, { children: message.content }) }) : /* @__PURE__ */ jsx("p", { className: "whitespace-pre-wrap text-sm", children: message.content })
                    }
                  ),
                  message.role === "user" && /* @__PURE__ */ jsx("div", { className: "size-8 shrink-0 mt-1 rounded-full bg-secondary flex items-center justify-center", children: /* @__PURE__ */ jsx(User, { className: "size-4 text-secondary-foreground" }) })
                ]
              },
              index
            );
          }),
          isLoading && /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex items-start gap-3",
              style: minHeightForLastMessage > 0 ? { minHeight: `${minHeightForLastMessage}px` } : void 0,
              children: [
                /* @__PURE__ */ jsx("div", { className: "size-8 shrink-0 mt-1 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsx(Sparkles, { className: "size-4 text-primary" }) }),
                /* @__PURE__ */ jsx("div", { className: "rounded-lg bg-muted px-4 py-2.5", children: /* @__PURE__ */ jsx(Loader2, { className: "size-4 animate-spin text-muted-foreground" }) })
              ]
            }
          )
        ] }) }) }),
        /* @__PURE__ */ jsxs(
          "form",
          {
            ref: inputAreaRef,
            onSubmit: handleSubmit,
            className: "flex gap-2 p-4 border-t bg-background/50 items-end",
            children: [
              /* @__PURE__ */ jsx(
                Textarea,
                {
                  ref: textareaRef,
                  value: input,
                  onChange: (e) => setInput(e.target.value),
                  onKeyDown: handleKeyDown,
                  placeholder,
                  className: "flex-1 max-h-32 resize-none min-h-9",
                  rows: 1
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  type: "submit",
                  size: "icon",
                  disabled: !input.trim() || isLoading,
                  className: "shrink-0 h-[38px] w-[38px]",
                  children: isLoading ? /* @__PURE__ */ jsx(Loader2, { className: "size-4 animate-spin" }) : /* @__PURE__ */ jsx(Send, { className: "size-4" })
                }
              )
            ]
          }
        )
      ]
    }
  );
}
export {
  AIChatBox
};
