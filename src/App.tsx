import { CircleUserRound } from "lucide-react";

import { PlaceholderTab } from "@/components/PlaceholderTab";
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
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground">
        <header className="border-b">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <h1 className="text-lg font-semibold">User Management</h1>
            <CircleUserRound
              className="size-8 text-muted-foreground"
              role="img"
              aria-label="Current user"
            />
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-6">
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
      </div>
    </TooltipProvider>
  );
}

export default App;
