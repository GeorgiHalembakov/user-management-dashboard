import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Team } from "@/types/user";

const VISIBLE_COUNT = 2;

export function TeamBadges({ teams }: { teams: Team[] }) {
  const visible = teams.slice(0, VISIBLE_COUNT);
  const hidden = teams.slice(VISIBLE_COUNT);

  return (
    <div className="flex items-center gap-1">
      {visible.map((team) => (
        <Badge key={team} variant="outline">
          {team}
        </Badge>
      ))}
      {hidden.length > 0 && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="secondary" tabIndex={0}>
              +{hidden.length}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>{hidden.join(", ")}</TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
