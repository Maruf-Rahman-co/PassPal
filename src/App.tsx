import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from '@/pages/Dashboard';
import PasswordGeneratorPage from '@/pages/PasswordGeneratorPage';
import PasswordValidatorPage from '@/pages/PasswordValidatorPage';
import PasswordTesterPage from '@/pages/PasswordTesterPage';
import EncoderPage from '@/pages/EncoderPage';
import SteganographyPage from '@/pages/SteganographyPage';
import MorseCodePage from '@/pages/MorseCodePage';
import CaesarCipherPage from '@/pages/CaesarCipherPage';
import VigenereCipherPage from '@/pages/VigenereCipherPage';
import PassphraseGeneratorPage from '@/pages/PassphraseGeneratorPage';
import PwnedPasswordCheckerPage from '@/pages/PwnedPasswordCheckerPage';
import RedirectCheckerPage from '@/pages/RedirectCheckerPage';
import ZeroWidthEncoderPage from '@/pages/ZeroWidthEncoderPage';
import PayloadGeneratorPage from '@/pages/PayloadGeneratorPage';
import ExifToolPage from '@/pages/ExifToolPage';
import ConfusableDetectorPage from '@/pages/ConfusableDetectorPage';
import AboutPage from '@/pages/AboutPage';
import NotFound from '@/pages/NotFound';
import Header from "@/components/Header";

const queryClient = new QueryClient();

// Get the base URL from the environment or use an empty string
const basename = import.meta.env.BASE_URL || '';

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router basename={basename}>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/password-generator" element={<PasswordGeneratorPage />} />
              <Route path="/password-validator" element={<PasswordValidatorPage />} />
              <Route path="/password-tester" element={<PasswordTesterPage />} />
              <Route path="/payload-generator" element={<PayloadGeneratorPage />} />
              <Route path="/exif-tool" element={<ExifToolPage />} />
              <Route path="/confusable-detector" element={<ConfusableDetectorPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/encoder" element={<EncoderPage />} />
              <Route path="/steganography" element={<SteganographyPage />} />
              <Route path="/morse-code" element={<MorseCodePage />} />
              <Route path="/caesar-cipher" element={<CaesarCipherPage />} />
              <Route path="/vigenere-cipher" element={<VigenereCipherPage />} />
              <Route path="/passphrase-generator" element={<PassphraseGeneratorPage />} />
              <Route path="/pwned-password-checker" element={<PwnedPasswordCheckerPage />} />
              <Route path="/redirect-checker" element={<RedirectCheckerPage />} />
              <Route path="/zero-width-encoder" element={<ZeroWidthEncoderPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
