import { useState } from "react";
import {
  Layers,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  Server,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  icon: LucideIcon;
  active?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Users", icon: Users, active: true },
  { label: "System", icon: Server },
  { label: "Settings", icon: Settings },
];

function SidebarBrand({ collapsed }: { collapsed: boolean }) {
  return (
    <div
      className={cn(
        "flex h-14 shrink-0 items-center gap-2 border-b px-3",
        collapsed && "justify-center px-0"
      )}
    >
      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Layers className="size-4" aria-hidden="true" />
      </span>
      {!collapsed && <span className="truncate font-semibold">Acme Admin</span>}
    </div>
  );
}

function SidebarNav({ collapsed }: { collapsed: boolean }) {
  return (
    <nav aria-label="Main" className="flex flex-col gap-1 p-2">
      {NAV_ITEMS.map(({ label, icon: Icon, active }) => {
        const item = (
          <button
            type="button"
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex h-9 items-center gap-2 rounded-lg px-2.5 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
              active
                ? "bg-muted font-medium text-foreground"
                : "cursor-default text-muted-foreground/70",
              collapsed && "justify-center px-0"
            )}
          >
            <Icon className="size-4 shrink-0" aria-hidden="true" />
            {!collapsed && <span className="truncate">{label}</span>}
            {!collapsed && !active && (
              <span className="ml-auto text-[10px] tracking-wide text-muted-foreground/60 uppercase">
                Soon
              </span>
            )}
          </button>
        );

        if (active) return <span key={label}>{item}</span>;

        return (
          <Tooltip key={label}>
            <TooltipTrigger asChild>{item}</TooltipTrigger>
            <TooltipContent side="right">
              Out of scope for this prototype
            </TooltipContent>
          </Tooltip>
        );
      })}
    </nav>
  );
}

interface AppSidebarProps {
  mobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
}

export function AppSidebar({ mobileOpen, onMobileOpenChange }: AppSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <aside
        className={cn(
          "sticky top-0 hidden h-screen shrink-0 flex-col border-r transition-[width] duration-200 md:flex",
          collapsed ? "w-14" : "w-56"
        )}
      >
        <SidebarBrand collapsed={collapsed} />
        <SidebarNav collapsed={collapsed} />
        <div className="mt-auto border-t p-2">
          <Button
            variant="ghost"
            size="sm"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={cn("w-full", collapsed ? "justify-center px-0" : "justify-start")}
            onClick={() => setCollapsed((c) => !c)}
          >
            {collapsed ? (
              <PanelLeftOpen />
            ) : (
              <>
                <PanelLeftClose />
                Collapse
              </>
            )}
          </Button>
        </div>
      </aside>

      <Sheet open={mobileOpen} onOpenChange={onMobileOpenChange}>
        <SheetContent
          side="left"
          className="w-64"
          onOpenAutoFocus={(event) => {
            // Default autofocus lands on the first nav item, a "soon"
            // placeholder, which instantly opens its tooltip (and Esc then
            // closes the tooltip, not the drawer). Focus the active item.
            event.preventDefault();
            (event.target as HTMLElement | null)
              ?.querySelector<HTMLElement>('[aria-current="page"]')
              ?.focus();
          }}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation</SheetTitle>
            <SheetDescription>Main navigation</SheetDescription>
          </SheetHeader>
          <SidebarBrand collapsed={false} />
          <SidebarNav collapsed={false} />
        </SheetContent>
      </Sheet>
    </>
  );
}
