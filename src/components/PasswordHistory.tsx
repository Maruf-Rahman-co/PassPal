import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Trash2, ChevronDown, ChevronUp, Key, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { formatDistanceToNow } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

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
      title: "Copied! 📋",
      description: "Password copied to clipboard",
    });
  };

  const handleDelete = (value: string) => {
    onDelete(value);
    toast({
      title: "Deleted! 🗑️",
      description: "Password removed from history",
    });
  };

  const displayedPasswords = isExpanded ? savedPasswords : savedPasswords.slice(0, 3);

  return (
    <Card className="p-3 sm:p-4 animate-slide-up">
      <div className="space-y-3">
        {savedPasswords.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-sm text-muted-foreground">
              No passwords in history yet
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Generated passwords will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {displayedPasswords.map((item, index) => (
                <motion.div
                  key={item.value}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                    <div className="p-3">
                      {/* Top row with icon and actions */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <div className="p-1.5 rounded-md bg-background/50 shrink-0">
                            {item.type === 'passphrase' ? (
                              <FileText className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Key className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground truncate">
                            {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                          </p>
                        </div>
                        <div className="flex gap-1 shrink-0">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopy(item.value)}
                            className="h-7 w-7 p-0"
                          >
                            <Copy className="h-4 w-4" />
                            <span className="sr-only">Copy password</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(item.value)}
                            className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete password</span>
                          </Button>
                        </div>
                      </div>

                      {/* Password content */}
                      <div className="w-full bg-background/50 rounded-md">
                        <div className="max-w-full overflow-hidden">
                          <div className="p-2 font-mono text-xs sm:text-sm break-all">
                            {item.value}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {savedPasswords.length > 3 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full text-muted-foreground hover:text-foreground"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-2" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-2" />
                    Show More ({savedPasswords.length - 3} more)
                  </>
                )}
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
