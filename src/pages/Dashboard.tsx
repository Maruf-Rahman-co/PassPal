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
  darkBgColor: string;
}

const features: FeatureCard[] = [
  {
    title: "Password Generator",
    description: "Create ultra-secure passwords with customizable options",
    icon: <Key className="w-5 h-5 sm:w-6 sm:h-6 text-white dark:text-black" />,
    link: "/password-generator",
    bgColor: "bg-passpal-purple",
    darkBgColor: "dark:bg-passpal-purple/90"
  },
  {
    title: "Passphrase Generator",
    description: "Generate memorable and secure passphrases using dictionary words",
    icon: <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white dark:text-black" />,
    link: "/passphrase",
    bgColor: "bg-passpal-blue",
    darkBgColor: "dark:bg-passpal-blue/90"
  },
  {
    title: "Password Tester",
    description: "Test password strength with detailed security analysis",
    icon: <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white dark:text-black" />,
    link: "/password-tester",
    bgColor: "bg-passpal-green",
    darkBgColor: "dark:bg-passpal-green/90"
  },
  {
    title: "Text Encoder",
    description: "Encode and decode text with various algorithms",
    icon: <FileCode className="w-5 h-5 sm:w-6 sm:h-6 text-white dark:text-black" />,
    link: "/encoder",
    bgColor: "bg-passpal-blue",
    darkBgColor: "dark:bg-passpal-blue/90"
  },
  {
    title: "Caesar Cipher",
    description: "Classic shift cipher for text encryption",
    icon: <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-white dark:text-black" />,
    link: "/caesar",
    bgColor: "bg-passpal-orange",
    darkBgColor: "dark:bg-passpal-orange/90"
  },
  {
    title: "Vigenère Cipher",
    description: "Advanced polyalphabetic substitution cipher",
    icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white dark:text-black" />,
    link: "/vigenere",
    bgColor: "bg-passpal-pink",
    darkBgColor: "dark:bg-passpal-pink/90"
  },
  {
    title: "Steganography",
    description: "Hide secret messages within images",
    icon: <Image className="w-5 h-5 sm:w-6 sm:h-6 text-white dark:text-black" />,
    link: "/steganography",
    bgColor: "bg-passpal-purple",
    darkBgColor: "dark:bg-passpal-purple/90"
  },
  {
    title: "Morse Code",
    description: "Convert text to Morse code with audio playback",
    icon: <Radio className="w-5 h-5 sm:w-6 sm:h-6 text-white dark:text-black" />,
    link: "/morse-code",
    bgColor: "bg-passpal-orange",
    darkBgColor: "dark:bg-passpal-orange/90"
  },
  {
    title: "Pwned Password Checker",
    description: "Check if your password has been exposed in data breaches",
    icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white dark:text-black" />,
    link: "/pwned-checker",
    bgColor: "bg-passpal-pink",
    darkBgColor: "dark:bg-passpal-pink/90"
  }
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl px-2 sm:px-4">
        <main className="py-8 sm:py-12">
          <div className="mb-8 sm:mb-12 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-foreground flex items-center justify-center gap-2">
              Security Tools <Shield className="text-passpal-purple dark:text-passpal-purple/90 w-7 h-7 sm:w-8 sm:h-8" />
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Your all-in-one security toolkit for passwords and encryption
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Link 
                key={index}
                to={feature.link}
                className="group block p-3 sm:p-6 rounded-xl sm:rounded-2xl bg-card hover:bg-accent transition-all duration-300"
              >
                <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-start sm:gap-4">
                  <div className={`w-8 h-8 sm:w-12 sm:h-12 ${feature.bgColor} ${feature.darkBgColor} rounded-lg sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-sm sm:text-lg font-semibold mb-0.5 sm:mb-2 text-card-foreground group-hover:text-accent-foreground transition-colors line-clamp-1">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2 hidden sm:block">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
        
        <footer className="text-center py-4 sm:py-6 text-xs sm:text-sm text-muted-foreground">
          <p>PassPal - Your Security Companion 🛡️</p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard; 