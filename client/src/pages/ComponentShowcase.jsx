import { jsx, jsxs } from "react/jsx-runtime";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger
} from "@/components/ui/menubar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { useTheme } from "@/contexts/ThemeContext";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import {
  AlertCircle,
  CalendarIcon,
  Check,
  Clock,
  Moon,
  Sun,
  X
} from "lucide-react";
import { useState } from "react";
import { toast as sonnerToast } from "sonner";
import { AIChatBox } from "@/components/AIChatBox";
function ComponentsShowcase() {
  const { theme, toggleTheme } = useTheme();
  const [date, setDate] = useState(/* @__PURE__ */ new Date());
  const [datePickerDate, setDatePickerDate] = useState();
  const [selectedFruits, setSelectedFruits] = useState([]);
  const [progress, setProgress] = useState(33);
  const [currentPage, setCurrentPage] = useState(2);
  const [openCombobox, setOpenCombobox] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [dialogInput, setDialogInput] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: "system", content: "You are a helpful assistant." }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const handleDialogSubmit = () => {
    console.log("Dialog submitted with value:", dialogInput);
    sonnerToast.success("Submitted successfully", {
      description: `Input: ${dialogInput}`
    });
    setDialogInput("");
    setDialogOpen(false);
  };
  const handleDialogKeyDown = (e) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleDialogSubmit();
    }
  };
  const handleChatSend = (content) => {
    const newMessages = [...chatMessages, { role: "user", content }];
    setChatMessages(newMessages);
    setIsChatLoading(true);
    setTimeout(() => {
      const aiResponse = {
        role: "assistant",
        content: `This is a **demo response**. In a real app, you would call a tRPC mutation here:

\`\`\`typescript
const chatMutation = trpc.ai.chat.useMutation({
  onSuccess: (response) => {
    setChatMessages(prev => [...prev, {
      role: "assistant",
      content: response.choices[0].message.content
    }]);
  }
});

chatMutation.mutate({ messages: newMessages });
\`\`\`

Your message was: "${content}"`
      };
      setChatMessages([...newMessages, aiResponse]);
      setIsChatLoading(false);
    }, 1500);
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxs("main", { className: "container max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2 justify-between flex", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight mb-6", children: "Shadcn/ui Component Library" }),
        /* @__PURE__ */ jsx(Button, { variant: "outline", size: "icon", onClick: toggleTheme, children: theme === "light" ? /* @__PURE__ */ jsx(Moon, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(Sun, { className: "h-5 w-5" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-12", children: [
        /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold", children: "Text Colors" }),
          /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-1", children: "Foreground (Default)" }),
                /* @__PURE__ */ jsx("p", { className: "text-foreground text-lg", children: "Default text color for main content" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-1", children: "Muted Foreground" }),
                /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-lg", children: "Muted text for secondary information" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-1", children: "Primary" }),
                /* @__PURE__ */ jsx("p", { className: "text-primary text-lg font-medium", children: "Primary brand color text" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-1", children: "Secondary Foreground" }),
                /* @__PURE__ */ jsx("p", { className: "text-secondary-foreground text-lg", children: "Secondary action text color" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-1", children: "Accent Foreground" }),
                /* @__PURE__ */ jsx("p", { className: "text-accent-foreground text-lg", children: "Accent text for emphasis" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-1", children: "Destructive" }),
                /* @__PURE__ */ jsx("p", { className: "text-destructive text-lg font-medium", children: "Error or destructive action text" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-1", children: "Card Foreground" }),
                /* @__PURE__ */ jsx("p", { className: "text-card-foreground text-lg", children: "Text color on card backgrounds" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-1", children: "Popover Foreground" }),
                /* @__PURE__ */ jsx("p", { className: "text-popover-foreground text-lg", children: "Text color in popovers" })
              ] })
            ] })
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold", children: "Color Combinations" }),
          /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-primary text-primary-foreground rounded-lg p-4", children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium mb-1", children: "Primary" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm opacity-90", children: "Primary background with foreground text" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-secondary text-secondary-foreground rounded-lg p-4", children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium mb-1", children: "Secondary" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm opacity-90", children: "Secondary background with foreground text" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-muted text-muted-foreground rounded-lg p-4", children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium mb-1", children: "Muted" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm opacity-90", children: "Muted background with foreground text" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-accent text-accent-foreground rounded-lg p-4", children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium mb-1", children: "Accent" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm opacity-90", children: "Accent background with foreground text" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-destructive text-destructive-foreground rounded-lg p-4", children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium mb-1", children: "Destructive" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm opacity-90", children: "Destructive background with foreground text" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-card text-card-foreground rounded-lg p-4 border", children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium mb-1", children: "Card" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm opacity-90", children: "Card background with foreground text" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-popover text-popover-foreground rounded-lg p-4 border", children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium mb-1", children: "Popover" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm opacity-90", children: "Popover background with foreground text" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-background text-foreground rounded-lg p-4 border", children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium mb-1", children: "Background" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm opacity-90", children: "Default background with foreground text" })
            ] })
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold", children: "Buttons" }),
          /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4", children: [
            /* @__PURE__ */ jsx(Button, { children: "Default" }),
            /* @__PURE__ */ jsx(Button, { variant: "secondary", children: "Secondary" }),
            /* @__PURE__ */ jsx(Button, { variant: "destructive", children: "Destructive" }),
            /* @__PURE__ */ jsx(Button, { variant: "outline", children: "Outline" }),
            /* @__PURE__ */ jsx(Button, { variant: "ghost", children: "Ghost" }),
            /* @__PURE__ */ jsx(Button, { variant: "link", children: "Link" }),
            /* @__PURE__ */ jsx(Button, { size: "sm", children: "Small" }),
            /* @__PURE__ */ jsx(Button, { size: "lg", children: "Large" }),
            /* @__PURE__ */ jsx(Button, { size: "icon", children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) })
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold", children: "Form Inputs" }),
          /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-6 space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
              /* @__PURE__ */ jsx(Input, { id: "email", type: "email", placeholder: "Email" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "message", children: "Message" }),
              /* @__PURE__ */ jsx(
                Textarea,
                {
                  id: "message",
                  placeholder: "Type your message here."
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { children: "Select" }),
              /* @__PURE__ */ jsxs(Select, { children: [
                /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select a fruit" }) }),
                /* @__PURE__ */ jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsx(SelectItem, { value: "apple", children: "Apple" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "banana", children: "Banana" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "orange", children: "Orange" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsx(Checkbox, { id: "terms" }),
              /* @__PURE__ */ jsx(Label, { htmlFor: "terms", children: "Accept terms and conditions" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsx(Switch, { id: "airplane-mode" }),
              /* @__PURE__ */ jsx(Label, { htmlFor: "airplane-mode", children: "Airplane Mode" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { children: "Radio Group" }),
              /* @__PURE__ */ jsxs(RadioGroup, { defaultValue: "option-one", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsx(RadioGroupItem, { value: "option-one", id: "option-one" }),
                  /* @__PURE__ */ jsx(Label, { htmlFor: "option-one", children: "Option One" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsx(RadioGroupItem, { value: "option-two", id: "option-two" }),
                  /* @__PURE__ */ jsx(Label, { htmlFor: "option-two", children: "Option Two" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { children: "Slider" }),
              /* @__PURE__ */ jsx(Slider, { defaultValue: [50], max: 100, step: 1 })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { children: "Input OTP" }),
              /* @__PURE__ */ jsx(InputOTP, { maxLength: 6, children: /* @__PURE__ */ jsxs(InputOTPGroup, { children: [
                /* @__PURE__ */ jsx(InputOTPSlot, { index: 0 }),
                /* @__PURE__ */ jsx(InputOTPSlot, { index: 1 }),
                /* @__PURE__ */ jsx(InputOTPSlot, { index: 2 }),
                /* @__PURE__ */ jsx(InputOTPSlot, { index: 3 }),
                /* @__PURE__ */ jsx(InputOTPSlot, { index: 4 }),
                /* @__PURE__ */ jsx(InputOTPSlot, { index: 5 })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { children: "Date Time Picker" }),
              /* @__PURE__ */ jsxs(Popover, { children: [
                /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
                  Button,
                  {
                    variant: "outline",
                    className: `w-full justify-start text-left font-normal ${!datePickerDate && "text-muted-foreground"}`,
                    children: [
                      /* @__PURE__ */ jsx(CalendarIcon, { className: "mr-2 h-4 w-4" }),
                      datePickerDate ? format(datePickerDate, "PPP HH:mm", { locale: zhCN }) : /* @__PURE__ */ jsx("span", { children: "Select date and time" })
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: /* @__PURE__ */ jsxs("div", { className: "p-3 space-y-3", children: [
                  /* @__PURE__ */ jsx(
                    Calendar,
                    {
                      mode: "single",
                      selected: datePickerDate,
                      onSelect: setDatePickerDate
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "border-t pt-3 space-y-2", children: [
                    /* @__PURE__ */ jsxs(Label, { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4" }),
                      "Time"
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsx(
                      Input,
                      {
                        type: "time",
                        value: datePickerDate ? format(datePickerDate, "HH:mm") : "00:00",
                        onChange: (e) => {
                          const [hours, minutes] = e.target.value.split(":");
                          const newDate = datePickerDate ? new Date(datePickerDate) : /* @__PURE__ */ new Date();
                          newDate.setHours(parseInt(hours));
                          newDate.setMinutes(parseInt(minutes));
                          setDatePickerDate(newDate);
                        }
                      }
                    ) })
                  ] })
                ] }) })
              ] }),
              datePickerDate && /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
                "Selected:",
                " ",
                format(datePickerDate, "yyyy/MM/dd  HH:mm", {
                  locale: zhCN
                })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { children: "Searchable Dropdown" }),
              /* @__PURE__ */ jsxs(Popover, { open: openCombobox, onOpenChange: setOpenCombobox, children: [
                /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
                  Button,
                  {
                    variant: "outline",
                    role: "combobox",
                    "aria-expanded": openCombobox,
                    className: "w-full justify-between",
                    children: [
                      selectedFramework ? [
                        { value: "react", label: "React" },
                        { value: "vue", label: "Vue" },
                        { value: "angular", label: "Angular" },
                        { value: "svelte", label: "Svelte" },
                        { value: "nextjs", label: "Next.js" },
                        { value: "nuxt", label: "Nuxt" },
                        { value: "remix", label: "Remix" }
                      ].find((fw) => fw.value === selectedFramework)?.label : "Select framework...",
                      /* @__PURE__ */ jsx(CalendarIcon, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsx(PopoverContent, { className: "w-full p-0", children: /* @__PURE__ */ jsxs(Command, { children: [
                  /* @__PURE__ */ jsx(CommandInput, { placeholder: "Search frameworks..." }),
                  /* @__PURE__ */ jsxs(CommandList, { children: [
                    /* @__PURE__ */ jsx(CommandEmpty, { children: "No framework found" }),
                    /* @__PURE__ */ jsx(CommandGroup, { children: [
                      { value: "react", label: "React" },
                      { value: "vue", label: "Vue" },
                      { value: "angular", label: "Angular" },
                      { value: "svelte", label: "Svelte" },
                      { value: "nextjs", label: "Next.js" },
                      { value: "nuxt", label: "Nuxt" },
                      { value: "remix", label: "Remix" }
                    ].map((framework) => /* @__PURE__ */ jsxs(
                      CommandItem,
                      {
                        value: framework.value,
                        onSelect: (currentValue) => {
                          setSelectedFramework(
                            currentValue === selectedFramework ? "" : currentValue
                          );
                          setOpenCombobox(false);
                        },
                        children: [
                          /* @__PURE__ */ jsx(
                            Check,
                            {
                              className: `mr-2 h-4 w-4 ${selectedFramework === framework.value ? "opacity-100" : "opacity-0"}`
                            }
                          ),
                          framework.label
                        ]
                      },
                      framework.value
                    )) })
                  ] })
                ] }) })
              ] }),
              selectedFramework && /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
                "Selected:",
                " ",
                [
                  { value: "react", label: "React" },
                  { value: "vue", label: "Vue" },
                  { value: "angular", label: "Angular" },
                  { value: "svelte", label: "Svelte" },
                  { value: "nextjs", label: "Next.js" },
                  { value: "nuxt", label: "Nuxt" },
                  { value: "remix", label: "Remix" }
                ].find((fw) => fw.value === selectedFramework)?.label
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "month", className: "text-sm font-medium", children: "Month" }),
                  /* @__PURE__ */ jsxs(
                    Select,
                    {
                      value: selectedMonth,
                      onValueChange: setSelectedMonth,
                      children: [
                        /* @__PURE__ */ jsx(SelectTrigger, { id: "month", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "MM" }) }),
                        /* @__PURE__ */ jsx(SelectContent, { children: Array.from({ length: 12 }, (_, i) => i + 1).map(
                          (month) => /* @__PURE__ */ jsx(
                            SelectItem,
                            {
                              value: month.toString().padStart(2, "0"),
                              children: month.toString().padStart(2, "0")
                            },
                            month
                          )
                        ) })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "year", className: "text-sm font-medium", children: "Year" }),
                  /* @__PURE__ */ jsxs(
                    Select,
                    {
                      value: selectedYear,
                      onValueChange: setSelectedYear,
                      children: [
                        /* @__PURE__ */ jsx(SelectTrigger, { id: "year", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "YYYY" }) }),
                        /* @__PURE__ */ jsx(SelectContent, { children: Array.from(
                          { length: 10 },
                          (_, i) => (/* @__PURE__ */ new Date()).getFullYear() - 5 + i
                        ).map((year) => /* @__PURE__ */ jsx(SelectItem, { value: year.toString(), children: year }, year)) })
                      ]
                    }
                  )
                ] })
              ] }),
              selectedMonth && selectedYear && /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
                "Selected: ",
                selectedYear,
                "/",
                selectedMonth,
                "/"
              ] })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold", children: "Data Display" }),
          /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-6 space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { children: "Badges" }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
                /* @__PURE__ */ jsx(Badge, { children: "Default" }),
                /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: "Secondary" }),
                /* @__PURE__ */ jsx(Badge, { variant: "destructive", children: "Destructive" }),
                /* @__PURE__ */ jsx(Badge, { variant: "outline", children: "Outline" })
              ] })
            ] }),
            /* @__PURE__ */ jsx(Separator, {}),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { children: "Avatar" }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
                /* @__PURE__ */ jsxs(Avatar, { children: [
                  /* @__PURE__ */ jsx(AvatarImage, { src: "https://github.com/shadcn.png" }),
                  /* @__PURE__ */ jsx(AvatarFallback, { children: "CN" })
                ] }),
                /* @__PURE__ */ jsx(Avatar, { children: /* @__PURE__ */ jsx(AvatarFallback, { children: "AB" }) })
              ] })
            ] }),
            /* @__PURE__ */ jsx(Separator, {}),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { children: "Progress" }),
              /* @__PURE__ */ jsx(Progress, { value: progress }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    size: "sm",
                    onClick: () => setProgress(Math.max(0, progress - 10)),
                    children: "-10"
                  }
                ),
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    size: "sm",
                    onClick: () => setProgress(Math.min(100, progress + 10)),
                    children: "+10"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsx(Separator, {}),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { children: "Skeleton" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-full" }),
                /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-3/4" }),
                /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-1/2" })
              ] })
            ] }),
            /* @__PURE__ */ jsx(Separator, {}),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { children: "Pagination" }),
              /* @__PURE__ */ jsx(Pagination, { children: /* @__PURE__ */ jsxs(PaginationContent, { children: [
                /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(
                  PaginationPrevious,
                  {
                    href: "#",
                    onClick: (e) => {
                      e.preventDefault();
                      setCurrentPage(Math.max(1, currentPage - 1));
                    }
                  }
                ) }),
                [1, 2, 3, 4, 5].map((page) => /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(
                  PaginationLink,
                  {
                    href: "#",
                    isActive: currentPage === page,
                    onClick: (e) => {
                      e.preventDefault();
                      setCurrentPage(page);
                    },
                    children: page
                  }
                ) }, page)),
                /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(
                  PaginationNext,
                  {
                    href: "#",
                    onClick: (e) => {
                      e.preventDefault();
                      setCurrentPage(Math.min(5, currentPage + 1));
                    }
                  }
                ) })
              ] }) }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground text-center", children: [
                "Current page: ",
                currentPage
              ] })
            ] }),
            /* @__PURE__ */ jsx(Separator, {}),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { children: "Table" }),
              /* @__PURE__ */ jsxs(Table, { children: [
                /* @__PURE__ */ jsx(TableCaption, { children: "A list of your recent invoices." }),
                /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
                  /* @__PURE__ */ jsx(TableHead, { className: "w-[100px]", children: "Invoice" }),
                  /* @__PURE__ */ jsx(TableHead, { children: "Status" }),
                  /* @__PURE__ */ jsx(TableHead, { children: "Method" }),
                  /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Amount" })
                ] }) }),
                /* @__PURE__ */ jsxs(TableBody, { children: [
                  /* @__PURE__ */ jsxs(TableRow, { children: [
                    /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: "INV001" }),
                    /* @__PURE__ */ jsx(TableCell, { children: "Paid" }),
                    /* @__PURE__ */ jsx(TableCell, { children: "Credit Card" }),
                    /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: "$250.00" })
                  ] }),
                  /* @__PURE__ */ jsxs(TableRow, { children: [
                    /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: "INV002" }),
                    /* @__PURE__ */ jsx(TableCell, { children: "Pending" }),
                    /* @__PURE__ */ jsx(TableCell, { children: "PayPal" }),
                    /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: "$150.00" })
                  ] }),
                  /* @__PURE__ */ jsxs(TableRow, { children: [
                    /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: "INV003" }),
                    /* @__PURE__ */ jsx(TableCell, { children: "Unpaid" }),
                    /* @__PURE__ */ jsx(TableCell, { children: "Bank Transfer" }),
                    /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: "$350.00" })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx(Separator, {}),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { children: "Menubar" }),
              /* @__PURE__ */ jsxs(Menubar, { children: [
                /* @__PURE__ */ jsxs(MenubarMenu, { children: [
                  /* @__PURE__ */ jsx(MenubarTrigger, { children: "File" }),
                  /* @__PURE__ */ jsxs(MenubarContent, { children: [
                    /* @__PURE__ */ jsx(MenubarItem, { children: "New Tab" }),
                    /* @__PURE__ */ jsx(MenubarItem, { children: "New Window" }),
                    /* @__PURE__ */ jsx(MenubarSeparator, {}),
                    /* @__PURE__ */ jsx(MenubarItem, { children: "Share" }),
                    /* @__PURE__ */ jsx(MenubarSeparator, {}),
                    /* @__PURE__ */ jsx(MenubarItem, { children: "Print" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs(MenubarMenu, { children: [
                  /* @__PURE__ */ jsx(MenubarTrigger, { children: "Edit" }),
                  /* @__PURE__ */ jsxs(MenubarContent, { children: [
                    /* @__PURE__ */ jsx(MenubarItem, { children: "Undo" }),
                    /* @__PURE__ */ jsx(MenubarItem, { children: "Redo" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs(MenubarMenu, { children: [
                  /* @__PURE__ */ jsx(MenubarTrigger, { children: "View" }),
                  /* @__PURE__ */ jsxs(MenubarContent, { children: [
                    /* @__PURE__ */ jsx(MenubarItem, { children: "Reload" }),
                    /* @__PURE__ */ jsx(MenubarItem, { children: "Force Reload" })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx(Separator, {}),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { children: "Breadcrumb" }),
              /* @__PURE__ */ jsx(Breadcrumb, { children: /* @__PURE__ */ jsxs(BreadcrumbList, { children: [
                /* @__PURE__ */ jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsx(BreadcrumbLink, { href: "/", children: "Home" }) }),
                /* @__PURE__ */ jsx(BreadcrumbSeparator, {}),
                /* @__PURE__ */ jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsx(BreadcrumbLink, { href: "/components", children: "Components" }) }),
                /* @__PURE__ */ jsx(BreadcrumbSeparator, {}),
                /* @__PURE__ */ jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsx(BreadcrumbPage, { children: "Breadcrumb" }) })
              ] }) })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold", children: "Alerts" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs(Alert, { children: [
              /* @__PURE__ */ jsx(AlertCircle, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx(AlertTitle, { children: "Heads up!" }),
              /* @__PURE__ */ jsx(AlertDescription, { children: "You can add components to your app using the cli." })
            ] }),
            /* @__PURE__ */ jsxs(Alert, { variant: "destructive", children: [
              /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx(AlertTitle, { children: "Error" }),
              /* @__PURE__ */ jsx(AlertDescription, { children: "Your session has expired. Please log in again." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold", children: "Tabs" }),
          /* @__PURE__ */ jsxs(Tabs, { defaultValue: "account", className: "w-full", children: [
            /* @__PURE__ */ jsxs(TabsList, { className: "grid w-full grid-cols-3", children: [
              /* @__PURE__ */ jsx(TabsTrigger, { value: "account", children: "Account" }),
              /* @__PURE__ */ jsx(TabsTrigger, { value: "password", children: "Password" }),
              /* @__PURE__ */ jsx(TabsTrigger, { value: "settings", children: "Settings" })
            ] }),
            /* @__PURE__ */ jsx(TabsContent, { value: "account", children: /* @__PURE__ */ jsxs(Card, { children: [
              /* @__PURE__ */ jsxs(CardHeader, { children: [
                /* @__PURE__ */ jsx(CardTitle, { children: "Account" }),
                /* @__PURE__ */ jsx(CardDescription, { children: "Make changes to your account here." })
              ] }),
              /* @__PURE__ */ jsx(CardContent, { className: "space-y-2", children: /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Name" }),
                /* @__PURE__ */ jsx(Input, { id: "name", defaultValue: "Pedro Duarte" })
              ] }) }),
              /* @__PURE__ */ jsx(CardFooter, { children: /* @__PURE__ */ jsx(Button, { children: "Save changes" }) })
            ] }) }),
            /* @__PURE__ */ jsx(TabsContent, { value: "password", children: /* @__PURE__ */ jsxs(Card, { children: [
              /* @__PURE__ */ jsxs(CardHeader, { children: [
                /* @__PURE__ */ jsx(CardTitle, { children: "Password" }),
                /* @__PURE__ */ jsx(CardDescription, { children: "Change your password here." })
              ] }),
              /* @__PURE__ */ jsxs(CardContent, { className: "space-y-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "current", children: "Current password" }),
                  /* @__PURE__ */ jsx(Input, { id: "current", type: "password" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "new", children: "New password" }),
                  /* @__PURE__ */ jsx(Input, { id: "new", type: "password" })
                ] })
              ] }),
              /* @__PURE__ */ jsx(CardFooter, { children: /* @__PURE__ */ jsx(Button, { children: "Save password" }) })
            ] }) }),
            /* @__PURE__ */ jsx(TabsContent, { value: "settings", children: /* @__PURE__ */ jsxs(Card, { children: [
              /* @__PURE__ */ jsxs(CardHeader, { children: [
                /* @__PURE__ */ jsx(CardTitle, { children: "Settings" }),
                /* @__PURE__ */ jsx(CardDescription, { children: "Manage your settings here." })
              ] }),
              /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Settings content goes here." }) })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold", children: "Accordion" }),
          /* @__PURE__ */ jsxs(Accordion, { type: "single", collapsible: true, className: "w-full", children: [
            /* @__PURE__ */ jsxs(AccordionItem, { value: "item-1", children: [
              /* @__PURE__ */ jsx(AccordionTrigger, { children: "Is it accessible?" }),
              /* @__PURE__ */ jsx(AccordionContent, { children: "Yes. It adheres to the WAI-ARIA design pattern." })
            ] }),
            /* @__PURE__ */ jsxs(AccordionItem, { value: "item-2", children: [
              /* @__PURE__ */ jsx(AccordionTrigger, { children: "Is it styled?" }),
              /* @__PURE__ */ jsx(AccordionContent, { children: "Yes. It comes with default styles that matches the other components' aesthetic." })
            ] }),
            /* @__PURE__ */ jsxs(AccordionItem, { value: "item-3", children: [
              /* @__PURE__ */ jsx(AccordionTrigger, { children: "Is it animated?" }),
              /* @__PURE__ */ jsx(AccordionContent, { children: "Yes. It's animated by default, but you can disable it if you prefer." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold", children: "Collapsible" }),
          /* @__PURE__ */ jsx(Collapsible, { children: /* @__PURE__ */ jsxs(Card, { children: [
            /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CollapsibleTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "ghost", className: "w-full justify-between", children: /* @__PURE__ */ jsx(CardTitle, { children: "@peduarte starred 3 repositories" }) }) }) }),
            /* @__PURE__ */ jsx(CollapsibleContent, { children: /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("div", { className: "rounded-md border px-4 py-3 font-mono text-sm", children: "@radix-ui/primitives" }),
              /* @__PURE__ */ jsx("div", { className: "rounded-md border px-4 py-3 font-mono text-sm", children: "@radix-ui/colors" }),
              /* @__PURE__ */ jsx("div", { className: "rounded-md border px-4 py-3 font-mono text-sm", children: "@stitches/react" })
            ] }) }) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold", children: "Overlays" }),
          /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4", children: [
            /* @__PURE__ */ jsxs(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: [
              /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "outline", children: "Open Dialog" }) }),
              /* @__PURE__ */ jsxs(DialogContent, { children: [
                /* @__PURE__ */ jsxs(DialogHeader, { children: [
                  /* @__PURE__ */ jsx(DialogTitle, { children: "Test Input" }),
                  /* @__PURE__ */ jsx(DialogDescription, { children: "Enter some text below. Press Enter to submit (IME composition supported)." })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "space-y-4 py-4", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "dialog-input", children: "Input" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "dialog-input",
                      placeholder: "Type something...",
                      value: dialogInput,
                      onChange: (e) => setDialogInput(e.target.value),
                      onKeyDown: handleDialogKeyDown,
                      autoFocus: true
                    }
                  )
                ] }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      variant: "outline",
                      onClick: () => setDialogOpen(false),
                      children: "Cancel"
                    }
                  ),
                  /* @__PURE__ */ jsx(Button, { onClick: handleDialogSubmit, children: "Submit" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(Sheet, { children: [
              /* @__PURE__ */ jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "outline", children: "Open Sheet" }) }),
              /* @__PURE__ */ jsx(SheetContent, { children: /* @__PURE__ */ jsxs(SheetHeader, { children: [
                /* @__PURE__ */ jsx(SheetTitle, { children: "Edit profile" }),
                /* @__PURE__ */ jsx(SheetDescription, { children: "Make changes to your profile here. Click save when you're done." })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs(Drawer, { children: [
              /* @__PURE__ */ jsx(DrawerTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "outline", children: "Open Drawer" }) }),
              /* @__PURE__ */ jsxs(DrawerContent, { children: [
                /* @__PURE__ */ jsxs(DrawerHeader, { children: [
                  /* @__PURE__ */ jsx(DrawerTitle, { children: "Are you absolutely sure?" }),
                  /* @__PURE__ */ jsx(DrawerDescription, { children: "This action cannot be undone." })
                ] }),
                /* @__PURE__ */ jsxs(DrawerFooter, { children: [
                  /* @__PURE__ */ jsx(Button, { children: "Submit" }),
                  /* @__PURE__ */ jsx(DrawerClose, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "outline", children: "Cancel" }) })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(Popover, { children: [
              /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "outline", children: "Open Popover" }) }),
              /* @__PURE__ */ jsx(PopoverContent, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("h4", { className: "font-medium leading-none", children: "Dimensions" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Set the dimensions for the layer." })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs(Tooltip, { children: [
              /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "outline", children: "Hover me" }) }),
              /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", { children: "Add to library" }) })
            ] })
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold", children: "Menus" }),
          /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4", children: [
            /* @__PURE__ */ jsxs(DropdownMenu, { children: [
              /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "outline", children: "Dropdown Menu" }) }),
              /* @__PURE__ */ jsxs(DropdownMenuContent, { children: [
                /* @__PURE__ */ jsx(DropdownMenuLabel, { children: "My Account" }),
                /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
                /* @__PURE__ */ jsx(DropdownMenuItem, { children: "Profile" }),
                /* @__PURE__ */ jsx(DropdownMenuItem, { children: "Billing" }),
                /* @__PURE__ */ jsx(DropdownMenuItem, { children: "Team" }),
                /* @__PURE__ */ jsx(DropdownMenuItem, { children: "Subscription" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(ContextMenu, { children: [
              /* @__PURE__ */ jsx(ContextMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "outline", children: "Right Click Me" }) }),
              /* @__PURE__ */ jsxs(ContextMenuContent, { children: [
                /* @__PURE__ */ jsx(ContextMenuItem, { children: "Profile" }),
                /* @__PURE__ */ jsx(ContextMenuItem, { children: "Billing" }),
                /* @__PURE__ */ jsx(ContextMenuItem, { children: "Team" }),
                /* @__PURE__ */ jsx(ContextMenuItem, { children: "Subscription" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(HoverCard, { children: [
              /* @__PURE__ */ jsx(HoverCardTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "outline", children: "Hover Card" }) }),
              /* @__PURE__ */ jsx(HoverCardContent, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold", children: "@nextjs" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm", children: "The React Framework \u2013 created and maintained by @vercel." })
              ] }) })
            ] })
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold", children: "Calendar" }),
          /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6 flex justify-center", children: /* @__PURE__ */ jsx(
            Calendar,
            {
              mode: "single",
              selected: date,
              onSelect: setDate,
              className: "rounded-md border"
            }
          ) }) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold", children: "Carousel" }),
          /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs(Carousel, { className: "w-full max-w-xs mx-auto", children: [
            /* @__PURE__ */ jsx(CarouselContent, { children: Array.from({ length: 5 }).map((_, index) => /* @__PURE__ */ jsx(CarouselItem, { children: /* @__PURE__ */ jsx("div", { className: "p-1", children: /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "flex aspect-square items-center justify-center p-6", children: /* @__PURE__ */ jsx("span", { className: "text-4xl font-semibold", children: index + 1 }) }) }) }) }, index)) }),
            /* @__PURE__ */ jsx(CarouselPrevious, {}),
            /* @__PURE__ */ jsx(CarouselNext, {})
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold", children: "Toggle" }),
          /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-6 space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { children: "Toggle" }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx(Toggle, { "aria-label": "Toggle italic", children: /* @__PURE__ */ jsx("span", { className: "font-bold", children: "B" }) }),
                /* @__PURE__ */ jsx(Toggle, { "aria-label": "Toggle italic", children: /* @__PURE__ */ jsx("span", { className: "italic", children: "I" }) }),
                /* @__PURE__ */ jsx(Toggle, { "aria-label": "Toggle underline", children: /* @__PURE__ */ jsx("span", { className: "underline", children: "U" }) })
              ] })
            ] }),
            /* @__PURE__ */ jsx(Separator, {}),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { children: "Toggle Group" }),
              /* @__PURE__ */ jsxs(ToggleGroup, { type: "multiple", children: [
                /* @__PURE__ */ jsx(ToggleGroupItem, { value: "bold", "aria-label": "Toggle bold", children: /* @__PURE__ */ jsx("span", { className: "font-bold", children: "B" }) }),
                /* @__PURE__ */ jsx(ToggleGroupItem, { value: "italic", "aria-label": "Toggle italic", children: /* @__PURE__ */ jsx("span", { className: "italic", children: "I" }) }),
                /* @__PURE__ */ jsx(
                  ToggleGroupItem,
                  {
                    value: "underline",
                    "aria-label": "Toggle underline",
                    children: /* @__PURE__ */ jsx("span", { className: "underline", children: "U" })
                  }
                )
              ] })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold", children: "Layout Components" }),
          /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-6 space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { children: "Aspect Ratio (16/9)" }),
              /* @__PURE__ */ jsx(AspectRatio, { ratio: 16 / 9, className: "bg-muted", children: /* @__PURE__ */ jsx("div", { className: "flex h-full items-center justify-center", children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "16:9 Aspect Ratio" }) }) })
            ] }),
            /* @__PURE__ */ jsx(Separator, {}),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { children: "Scroll Area" }),
              /* @__PURE__ */ jsx(ScrollArea, { className: "h-[200px] w-full rounded-md border overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "p-4", children: /* @__PURE__ */ jsx("div", { className: "space-y-4", children: Array.from({ length: 20 }).map((_, i) => /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
                "Item ",
                i + 1,
                ": This is a scrollable content area"
              ] }, i)) }) }) })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold", children: "Resizable Panels" }),
          /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs(
            ResizablePanelGroup,
            {
              direction: "horizontal",
              className: "min-h-[200px] rounded-lg border",
              children: [
                /* @__PURE__ */ jsx(ResizablePanel, { defaultSize: 50, children: /* @__PURE__ */ jsx("div", { className: "flex h-full items-center justify-center p-6", children: /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Panel One" }) }) }),
                /* @__PURE__ */ jsx(ResizableHandle, {}),
                /* @__PURE__ */ jsx(ResizablePanel, { defaultSize: 50, children: /* @__PURE__ */ jsx("div", { className: "flex h-full items-center justify-center p-6", children: /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Panel Two" }) }) })
              ]
            }
          ) }) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold", children: "Toast" }),
          /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6 space-y-4", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { children: "Sonner Toast" }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "outline",
                  onClick: () => {
                    sonnerToast.success("Operation successful", {
                      description: "Your changes have been saved"
                    });
                  },
                  children: "Success"
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "outline",
                  onClick: () => {
                    sonnerToast.error("Operation failed", {
                      description: "Cannot complete operation, please try again"
                    });
                  },
                  children: "Error"
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "outline",
                  onClick: () => {
                    sonnerToast.info("Information", {
                      description: "This is an information message"
                    });
                  },
                  children: "Info"
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "outline",
                  onClick: () => {
                    sonnerToast.warning("Warning", {
                      description: "Please note the impact of this operation"
                    });
                  },
                  children: "Warning"
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "outline",
                  onClick: () => {
                    sonnerToast.loading("Loading", {
                      description: "Please wait"
                    });
                  },
                  children: "Loading"
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "outline",
                  onClick: () => {
                    const promise = new Promise(
                      (resolve) => setTimeout(resolve, 2e3)
                    );
                    sonnerToast.promise(promise, {
                      loading: "Processing...",
                      success: "Processing complete!",
                      error: "Processing failed"
                    });
                  },
                  children: "Promise"
                }
              )
            ] })
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold", children: "AI ChatBox" }),
          /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsx("p", { children: "A ready-to-use chat interface component that integrates with the LLM system. Features markdown rendering, auto-scrolling, and loading states." }),
              /* @__PURE__ */ jsx("p", { className: "mt-2", children: "This is a demo with simulated responses. In a real app, you'd connect it to a tRPC mutation." })
            ] }),
            /* @__PURE__ */ jsx(
              AIChatBox,
              {
                messages: chatMessages,
                onSendMessage: handleChatSend,
                isLoading: isChatLoading,
                placeholder: "Try sending a message...",
                height: "500px",
                emptyStateMessage: "How can I help you today?",
                suggestedPrompts: [
                  "What is React?",
                  "Explain TypeScript",
                  "How to use tRPC?",
                  "Best practices for web development"
                ]
              }
            )
          ] }) }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "border-t py-6 mt-12", children: /* @__PURE__ */ jsx("div", { className: "container text-center text-sm text-muted-foreground", children: /* @__PURE__ */ jsx("p", { children: "Shadcn/ui Component Showcase" }) }) })
  ] });
}
export {
  ComponentsShowcase as default
};
