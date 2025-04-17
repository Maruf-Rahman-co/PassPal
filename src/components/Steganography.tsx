import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Image, Upload, Download, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { hideMessage as hideMessageInImage, extractMessage as extractMessageFromImage, getImageData, createImageUrl } from "@/lib/steganography";

const Steganography = () => {
  const { toast } = useToast();
  const [mode, setMode] = useState<"hide" | "extract">("hide");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [extractedMessage, setExtractedMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Function to handle image selection
  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Function to hide message in image
  const hideMessage = async () => {
    if (!imagePreview || !message || !password) {
      toast({
        title: "Missing information",
        description: "Please provide an image, message, and password",
        variant: "destructive",
      });
      return;
    }

    try {
      // Get image data from the preview
      const imageData = await getImageData(imagePreview);
      
      // Hide the message in the image
      const processedImageData = await hideMessageInImage(imageData, message, password);
      
      // Create a URL for the processed image
      const processedImageUrl = createImageUrl(processedImageData);
      
      // Create a download link
      const link = document.createElement('a');
      link.href = processedImageUrl;
      link.download = 'hidden-message.png';
      link.click();

      toast({
        title: "Success! 🎉",
        description: "Message hidden in image successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to hide message in image",
        variant: "destructive",
      });
    }
  };

  // Function to extract message from image
  const extractMessage = async () => {
    if (!imagePreview || !password) {
      toast({
        title: "Missing information",
        description: "Please provide an image and password",
        variant: "destructive",
      });
      return;
    }

    try {
      // Get image data from the preview
      const imageData = await getImageData(imagePreview);
      
      // Extract the message from the image
      const message = await extractMessageFromImage(imageData, password);
      setExtractedMessage(message);

      toast({
        title: "Success! 🔍",
        description: "Message extracted successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to extract message from image",
        variant: "destructive",
      });
      setExtractedMessage("");
    }
  };

  // Function to handle mode change
  const handleModeChange = (newMode: "hide" | "extract") => {
    // Clear all sensitive data when switching modes
    setImagePreview(null);
    setMessage("");
    setPassword("");
    setExtractedMessage("");
    setMode(newMode);
  };

  return (
    <div className="glass p-6 rounded-xl animate-slide-up dark:glass-dark">
      <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
        <Image className="text-passpal-purple" size={20} />
        Image Steganography
      </h2>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant={mode === "hide" ? "default" : "outline"}
            className={`w-full sm:w-auto ${mode === "hide" ? "bg-passpal-purple hover:bg-passpal-purple/80" : ""}`}
            onClick={() => handleModeChange("hide")}
          >
            <Eye className="mr-2" size={16} /> Hide Message
          </Button>
          <Button
            variant={mode === "extract" ? "default" : "outline"}
            className={`w-full sm:w-auto ${mode === "extract" ? "bg-passpal-purple hover:bg-passpal-purple/80" : ""}`}
            onClick={() => handleModeChange("extract")}
          >
            <EyeOff className="mr-2" size={16} /> Extract Message
          </Button>
        </div>

        <div className="space-y-4">
          <div 
            className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-passpal-purple/50 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            {imagePreview ? (
              <img 
                src={imagePreview} 
                alt="Selected" 
                className="max-h-48 mx-auto rounded-lg"
              />
            ) : (
              <div className="py-8">
                <Upload className="mx-auto mb-2 text-muted-foreground" size={24} />
                <p className="text-sm text-muted-foreground">
                  Click to select an image or drag and drop
                </p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
          </div>

          {mode === "hide" && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Message to Hide:
              </label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your secret message..."
                className="min-h-[100px]"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">
              Password:
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password to secure your message"
            />
          </div>

          <Button
            onClick={mode === "hide" ? hideMessage : extractMessage}
            className="w-full bg-passpal-purple hover:bg-passpal-purple/80"
          >
            {mode === "hide" ? (
              <>
                <Eye className="mr-2" size={16} /> Hide Message
              </>
            ) : (
              <>
                <EyeOff className="mr-2" size={16} /> Extract Message
              </>
            )}
          </Button>
        </div>

        {mode === "extract" && extractedMessage && (
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Extracted Message:
            </label>
            <Textarea
              value={extractedMessage}
              readOnly
              className="min-h-[100px]"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Steganography; 