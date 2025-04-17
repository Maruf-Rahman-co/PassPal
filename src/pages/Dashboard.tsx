import { Link } from "react-router-dom";
import { 
  Key, 
  CheckCircle, 
  FileCode,
  Code2,
  Shield,
  Image,
  Radio,
  FileText
} from "lucide-react";

interface FeatureCard {
  title: string;
  description: string;
  icon: JSX.Element;
  link: string;
  bgColor: string;
  iconColor: string;
}

const features: FeatureCard[] = [
  {
    title: "Password Generator",
    description: "Create ultra-secure passwords with customizable options",
    icon: <Key className="w-6 h-6" />,
    link: "/password-generator",
    bgColor: "bg-[#7C3AED]",
    iconColor: "text-white"
  },
  {
    title: "Passphrase Generator",
    description: "Generate memorable and secure passphrases using dictionary words",
    icon: <FileText className="w-6 h-6" />,
    link: "/passphrase",
    bgColor: "bg-[#0EA5E9]",
    iconColor: "text-white"
  },
  {
    title: "Password Tester",
    description: "Test password strength with detailed security analysis",
    icon: <CheckCircle className="w-6 h-6" />,
    link: "/password-tester",
    bgColor: "bg-[#10B981]",
    iconColor: "text-white"
  },
  {
    title: "Text Encoder",
    description: "Encode and decode text with various algorithms",
    icon: <FileCode className="w-6 h-6" />,
    link: "/encoder",
    bgColor: "bg-[#3B82F6]",
    iconColor: "text-white"
  },
  {
    title: "Caesar Cipher",
    description: "Classic shift cipher for text encryption",
    icon: <Code2 className="w-6 h-6" />,
    link: "/caesar",
    bgColor: "bg-[#F59E0B]",
    iconColor: "text-white"
  },
  {
    title: "Vigenère Cipher",
    description: "Advanced polyalphabetic substitution cipher",
    icon: <Shield className="w-6 h-6" />,
    link: "/vigenere",
    bgColor: "bg-[#EC4899]",
    iconColor: "text-white"
  },
  {
    title: "Steganography",
    description: "Hide secret messages within images",
    icon: <Image className="w-6 h-6" />,
    link: "/steganography",
    bgColor: "bg-[#6366F1]",
    iconColor: "text-white"
  },
  {
    title: "Morse Code",
    description: "Convert text to Morse code with audio playback",
    icon: <Radio className="w-6 h-6" />,
    link: "/morse-code",
    bgColor: "bg-[#F97316]",
    iconColor: "text-white"
  },
  {
    title: "Pwned Password Checker",
    description: "Check if your password has been exposed in data breaches",
    icon: <Shield className="w-6 h-6" />,
    link: "/pwned-checker",
    bgColor: "bg-[#EF4444]",
    iconColor: "text-white"
  }
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#120C1D]">
      <div className="container mx-auto max-w-7xl px-4">
        <main className="py-12">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-2 text-white flex items-center justify-center gap-2">
              Security Tools <Shield className="text-[#7C3AED]" size={32} />
            </h1>
            <p className="text-xl text-gray-400">
              Your all-in-one security toolkit for passwords and encryption
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <Link 
                key={index}
                to={feature.link}
                className="group block p-4 sm:p-6 rounded-2xl bg-[#1E1B2E] hover:bg-[#252131] transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${feature.bgColor} rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-white group-hover:text-[#7C3AED] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm line-clamp-2">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
        
        <footer className="text-center py-6 text-sm text-gray-400">
          <p>PassPal - Your Security Companion 🛡️</p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard; 