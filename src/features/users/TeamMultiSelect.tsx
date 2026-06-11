import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ALL_TEAMS, type Team } from "@/types/user";

interface TeamMultiSelectProps {
  selected: Team[];
  onChange: (teams: Team[]) => void;
  triggerLabel: string;
  id?: string;
  className?: string;
  onBlur?: () => void;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
}

export function TeamMultiSelect({
  selected,
  onChange,
  triggerLabel,
  id,
  className,
  onBlur,
  ...aria
}: TeamMultiSelectProps) {
  const toggleTeam = (team: Team) => {
    onChange(
      selected.includes(team)
        ? selected.filter((t) => t !== team)
        : [...selected, team]
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          onBlur={onBlur}
          className={cn("justify-between", className)}
          {...aria}
        >
          {triggerLabel}
          <ChevronDown className="text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-0" align="start">
        <Command>
          <CommandList>
            <CommandGroup>
              {ALL_TEAMS.map((team) => (
                <CommandItem key={team} onSelect={() => toggleTeam(team)}>
                  <Checkbox
                    checked={selected.includes(team)}
                    tabIndex={-1}
                    className="pointer-events-none"
                  />
                  {team}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
