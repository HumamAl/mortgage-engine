"use client";

import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { navItems } from "./app-sidebar";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/applications": "Applications",
  "/rules-engine": "Rules Engine",
  "/risk-scoring": "Risk Scoring",
  "/audit-log": "Audit Log",
};

export function AppHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const title = pageTitles[pathname] || "Dashboard";

  return (
    <>
      <header className="h-14 border-b border-border bg-background flex items-center px-4 md:px-6">
        <button className="md:hidden mr-3" onClick={() => setOpen(true)}>
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center justify-between w-full">
          <h2 className="text-sm font-medium">{title}</h2>
        </div>
      </header>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="p-4 border-b border-border flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
              <span className="text-primary-foreground font-bold text-sm">D</span>
            </div>
            <div>
              <h1 className="font-semibold text-sm leading-tight">Doorly Engine</h1>
              <p className="text-[10px] text-muted-foreground">Underwriting Platform</p>
            </div>
          </div>
          <nav className="p-2 space-y-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary border-l-2 border-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
