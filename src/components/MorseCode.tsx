import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Volume2, 
  VolumeX, 
  ArrowRightLeft, 
  Copy, 
  Info,
  Play,
  Pause
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  textToMorse, 
  morseToText, 
  generateMorseAudio, 
  playMorseAudio,
  morseCodeMap 
} from "@/lib/morseCode";

const MorseCode = () => {
  const { toast } = useToast();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);

  const handleConvert = () => {
    try {
      const result = mode === "encode" ? textToMorse(input) : morseToText(input);
      setOutput(result);
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid input for conversion",
        variant: "destructive",
      });
    }
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Text copied to clipboard",
    });
  };

  const handleSwapMode = () => {
    setMode(mode === "encode" ? "decode" : "encode");
    setInput(output);
    setOutput("");
  };

  const handlePlayAudio = async () => {
    if (isPlaying) {
      audioSourceRef.current?.stop();
      setIsPlaying(false);
      return;
    }

    try {
      const morseText = mode === "encode" ? textToMorse(input) : input;
      const audioBuffer = await generateMorseAudio(morseText);
      const source = playMorseAudio(audioBuffer);
      audioSourceRef.current = source;
      setIsPlaying(true);

      source.onended = () => {
        setIsPlaying(false);
        audioSourceRef.current = null;
      };
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to play Morse code audio",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Main Converter Section */}
      <div className="glass p-6 rounded-xl animate-slide-up dark:glass-dark">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Volume2 className="text-passpal-purple" size={20} />
            Morse Code Converter
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowTable(!showTable)}
          >
            <Info size={20} />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">
              {mode === "encode" ? "Text to Encode" : "Morse Code to Decode"}:
            </label>
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === "encode" ? "Enter text..." : "Enter Morse code..."}
                className="min-h-[100px]"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-2">
            <Button
              onClick={handleConvert}
              className="w-full sm:w-auto bg-passpal-purple hover:bg-passpal-purple/80"
            >
              {mode === "encode" ? "Encode" : "Decode"}
            </Button>
            <Button
              onClick={handleSwapMode}
              variant="outline"
              className="w-full sm:w-auto"
            >
              <ArrowRightLeft className="mr-2" size={16} />
              Swap Mode
            </Button>
            <Button
              onClick={handlePlayAudio}
              variant="outline"
              className="w-full sm:w-auto"
              disabled={!input}
            >
              {isPlaying ? (
                <Pause className="mr-2" size={16} />
              ) : (
                <Play className="mr-2" size={16} />
              )}
              {isPlaying ? "Stop" : "Play"}
            </Button>
          </div>

          {output && (
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">Result:</label>
              <div className="relative">
                <Textarea
                  value={output}
                  readOnly
                  className="min-h-[100px] pr-10"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => handleCopy(output)}
                >
                  <Copy size={16} />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Morse Code Table */}
      {showTable && (
        <div className="glass p-6 rounded-xl animate-slide-up dark:glass-dark">
          <h3 className="text-lg font-semibold mb-4">Morse Code Table</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Object.entries(morseCodeMap).map(([char, morse]) => (
              <div 
                key={char} 
                className="flex items-center justify-between p-2 rounded-lg bg-black/5 dark:bg-white/5"
              >
                <span className="font-mono">{char}</span>
                <span className="font-mono text-passpal-purple">{morse}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MorseCode; 