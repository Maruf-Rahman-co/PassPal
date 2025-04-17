import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import PasswordGeneratorPage from "@/pages/PasswordGenerator";
import EncoderPage from "@/pages/EncoderPage";
import SteganographyPage from "@/pages/SteganographyPage";
import PasswordTesterPage from "@/pages/PasswordTesterPage";
import MorseCodePage from "@/pages/MorseCodePage";
import CaesarCipherPage from "@/pages/CaesarCipherPage";
import VigenereCipherPage from "@/pages/VigenereCipherPage";
import PassphraseGeneratorPage from "@/pages/PassphraseGeneratorPage";
import PwnedPasswordCheckerPage from "@/pages/PwnedPasswordCheckerPage";
import Header from "@/components/Header";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/password-generator" element={<PasswordGeneratorPage />} />
              <Route path="/password-tester" element={<PasswordTesterPage />} />
              <Route path="/encoder" element={<EncoderPage />} />
              <Route path="/steganography" element={<SteganographyPage />} />
              <Route path="/morse-code" element={<MorseCodePage />} />
              <Route path="/caesar" element={<CaesarCipherPage />} />
              <Route path="/vigenere" element={<VigenereCipherPage />} />
              <Route path="/passphrase" element={<PassphraseGeneratorPage />} />
              <Route path="/pwned-checker" element={<PwnedPasswordCheckerPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
