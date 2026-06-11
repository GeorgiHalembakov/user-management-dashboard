import { useState } from "react";

import { AppHeader } from "@/components/AppHeader";
import { AppSidebar } from "@/components/AppSidebar";
import { PlaceholderTab } from "@/components/PlaceholderTab";
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UsersTab } from "@/features/users/UsersTab";

const USERS_TAB = "All Users";

const PLACEHOLDER_TABS = [
  "Roles & Permissions",
  "Security",
  "Activity Logs",
  "Invitations",
  "Teams",
  "Workplace Policies",
  "Who's In",
];

function App() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <TooltipProvider>
      <div className="flex min-h-screen bg-background text-foreground">
        <AppSidebar
          mobileOpen={mobileNavOpen}
          onMobileOpenChange={setMobileNavOpen}
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <AppHeader onOpenMobileNav={() => setMobileNavOpen(true)} />

          <main className="mx-auto w-full max-w-6xl px-4 py-6">
            <Tabs defaultValue={USERS_TAB}>
              <div className="overflow-x-auto">
                <TabsList className="w-max">
                  {[USERS_TAB, ...PLACEHOLDER_TABS].map((tab) => (
                    <TabsTrigger key={tab} value={tab}>
                      {tab}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <TabsContent value={USERS_TAB}>
                <UsersTab />
              </TabsContent>
              {PLACEHOLDER_TABS.map((tab) => (
                <TabsContent key={tab} value={tab}>
                  <PlaceholderTab name={tab} />
                </TabsContent>
              ))}
            </Tabs>
          </main>
          <Toaster />
        </div>
      </div>
    </TooltipProvider>
  );
}

export default App;
