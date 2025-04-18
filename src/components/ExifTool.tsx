import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Camera, Upload, Download, Trash2, Plus, Eye, AlertTriangle, FileImage } from "lucide-react";
import { toast } from "sonner";

interface ExifData {
  [key: string]: string | number | undefined;
}

const ExifTool = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [exifData, setExifData] = useState<ExifData | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [newMetadata, setNewMetadata] = useState<{ key: string; value: string }>({ key: "", value: "" });
  const [activeTab, setActiveTab] = useState("view");

  // Reset states when changing tabs
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Reset file and related data when switching to a more sensitive operation
    if (value !== "view") {
      setSelectedFile(null);
      setExifData(null);
      setImagePreview(null);
      setNewMetadata({ key: "", value: "" });
    }
  };

  const handleFileSelect = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error("Please select an image file");
      return;
    }

    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));

    try {
      // Initialize WASM module for EXIF reading
      const exif = await import('@/lib/wasm/exif');
      const metadata = await exif.readMetadata(file);
      setExifData(metadata);
      toast.success("Image metadata loaded successfully");
    } catch (error) {
      toast.error("Failed to read image metadata");
      console.error(error);
    }
  }, []);

  const handleAddMetadata = useCallback(async () => {
    if (!selectedFile || !newMetadata.key || !newMetadata.value) {
      toast.error("Please fill in both key and value fields");
      return;
    }

    try {
      // Initialize WASM module for EXIF writing
      const exif = await import('@/lib/wasm/exif');
      const updatedMetadata = await exif.addMetadata(selectedFile, newMetadata.key, newMetadata.value);
      setExifData(updatedMetadata);
      setNewMetadata({ key: "", value: "" });
      toast.success("Metadata added successfully");
    } catch (error) {
      toast.error("Failed to add metadata");
      console.error(error);
    }
  }, [selectedFile, newMetadata]);

  const handleRemoveAllMetadata = useCallback(async () => {
    if (!selectedFile) {
      toast.error("No image selected");
      return;
    }

    try {
      // Initialize WASM module for EXIF removal
      const exif = await import('@/lib/wasm/exif');
      const cleanedImage = await exif.removeAllMetadata(selectedFile);
      
      // Create download link for cleaned image
      const url = URL.createObjectURL(cleanedImage);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cleaned_${selectedFile.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setExifData({});
      toast.success("All metadata removed successfully");
    } catch (error) {
      toast.error("Failed to remove metadata");
      console.error(error);
    }
  }, [selectedFile]);

  const handleDownloadMetadata = useCallback(() => {
    if (!exifData) {
      toast.error("No metadata to download");
      return;
    }

    const jsonString = JSON.stringify(exifData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `metadata_${selectedFile?.name || 'image'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Metadata downloaded successfully");
  }, [exifData, selectedFile]);

  // Cleanup function for image preview URL
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div className="glass p-4 rounded-xl dark:glass-dark">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="view" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            View
          </TabsTrigger>
          <TabsTrigger value="add" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add
          </TabsTrigger>
          <TabsTrigger value="remove" className="flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            Remove
          </TabsTrigger>
        </TabsList>

        <div className="mb-6">
          <Label htmlFor="image-upload" className="block mb-2 flex items-center gap-2">
            <FileImage className="w-4 h-4" />
            Select Image
          </Label>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="file:bg-transparent file:border-0 file:text-sm file:font-medium hover:file:bg-accent/50 cursor-pointer"
              />
            </div>
            {imagePreview && (
              <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-border">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <TabsContent value="view" className="space-y-4">
          {exifData && Object.keys(exifData).length > 0 ? (
            <>
              <ScrollArea className="h-[400px] rounded-md border p-4">
                <div className="space-y-2">
                  {Object.entries(exifData).map(([key, value]) => (
                    <Card key={key} className="p-3 hover:bg-accent/50 transition-colors">
                      <div className="font-medium text-sm">{key}</div>
                      <div className="text-sm text-muted-foreground font-mono">{String(value)}</div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
              <Button
                onClick={handleDownloadMetadata}
                className="w-full flex items-center justify-center gap-2"
                variant="outline"
              >
                <Download className="w-4 h-4" />
                Download Metadata as JSON
              </Button>
            </>
          ) : (
            <div className="text-center text-muted-foreground py-8 space-y-2">
              <FileImage className="w-8 h-8 mx-auto opacity-50" />
              <p>{selectedFile ? "No metadata found" : "Select an image to view its metadata"}</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="add" className="space-y-4">
          <div className="p-3 bg-yellow-500/10 rounded-lg flex items-start gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
            <p className="text-sm">
              Adding metadata will create a new copy of your image. The original file will remain unchanged.
            </p>
          </div>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="metadata-key">Metadata Key</Label>
              <Input
                id="metadata-key"
                value={newMetadata.key}
                onChange={(e) => setNewMetadata(prev => ({ ...prev, key: e.target.value }))}
                placeholder="e.g., Copyright"
                className="font-mono"
              />
            </div>
            <div>
              <Label htmlFor="metadata-value">Metadata Value</Label>
              <Input
                id="metadata-value"
                value={newMetadata.value}
                onChange={(e) => setNewMetadata(prev => ({ ...prev, value: e.target.value }))}
                placeholder="e.g., © 2024 Your Name"
                className="font-mono"
              />
            </div>
            <Button
              onClick={handleAddMetadata}
              disabled={!selectedFile}
              className="w-full flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Metadata
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="remove" className="space-y-4">
          <div className="space-y-4">
            <div className="p-3 bg-red-500/10 rounded-lg flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="text-sm font-medium text-red-500">Warning</p>
                <p className="text-sm">
                  This action will create a new copy of your image with all metadata removed. 
                  This process cannot be undone. The original file will remain unchanged.
                </p>
              </div>
            </div>
            <Button
              onClick={handleRemoveAllMetadata}
              disabled={!selectedFile}
              variant="destructive"
              className="w-full flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Remove All Metadata
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExifTool; 