import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Trash2, ChevronDown, ChevronUp, Key, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { formatDistanceToNow } from "date-fns";

interface SavedPassword {
  value: string;
  timestamp: number;
  type: 'password' | 'passphrase';
}

interface PasswordHistoryProps {
  savedPasswords: SavedPassword[];
  onDelete: (value: string) => void;
}

export default function PasswordHistory({ savedPasswords, onDelete }: PasswordHistoryProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();

  const handleCopy = async (value: string) => {
    await navigator.clipboard.writeText(value);
    toast({
      title: "Copied",
      description: "Value copied to clipboard",
    });
  };

  const handleDelete = (value: string) => {
    onDelete(value);
    toast({
      title: "Deleted",
      description: "Item removed from history",
    });
  };

  const displayedPasswords = isExpanded ? savedPasswords : savedPasswords.slice(0, 3);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">History</h3>
        {savedPasswords.length > 3 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-2" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-2" />
                Show More
              </>
            )}
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {savedPasswords.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No items in history yet
          </p>
        ) : (
          displayedPasswords.map((item) => (
            <div
              key={item.value}
              className="flex items-center justify-between p-3 bg-muted rounded-lg group hover:bg-muted/80"
            >
              <div className="flex items-center space-x-3 min-w-0">
                {item.type === 'passphrase' ? (
                  <FileText className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Key className="h-4 w-4 text-muted-foreground" />
                )}
                <div className="min-w-0">
                  <p className="text-sm truncate">{item.value}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCopy(item.value)}
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(item.value)}
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
