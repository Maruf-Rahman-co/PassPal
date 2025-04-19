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
    <Card className="p-4 sm:p-6 animate-slide-up">
      <div className="space-y-4">
        {savedPasswords.length === 0 ? (
          <div className="text-center py-8">
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
                  className="group relative"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                    <div className="flex items-start gap-3 min-w-0 mb-2 sm:mb-0">
                      {item.type === 'passphrase' ? (
                        <FileText className="h-4 w-4 text-muted-foreground mt-1" />
                      ) : (
                        <Key className="h-4 w-4 text-muted-foreground mt-1" />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-mono truncate">{item.value}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(item.value)}
                        className="h-8 hover:bg-background"
                      >
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">Copy password</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(item.value)}
                        className="h-8 hover:bg-background text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete password</span>
                      </Button>
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
                className="w-full mt-2 text-muted-foreground hover:text-foreground"
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
