import { motion } from "framer-motion";
import { 
  Code2, 
  Shield, 
  Lock, 
  Heart, 
  Coffee, 
  Bug, 
  Brain, 
  Rocket, 
  Terminal, 
  Laptop, 
  Smartphone, 
  Globe, 
  Zap, 
  Sparkles,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const AboutPage = () => {
  const [showContact, setShowContact] = useState(false);
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const techStack = [
    { name: "React", icon: <Code2 className="w-5 h-5" />, color: "text-blue-500" },
    { name: "TypeScript", icon: <Terminal className="w-5 h-5" />, color: "text-blue-600" },
    { name: "Tailwind CSS", icon: <Sparkles className="w-5 h-5" />, color: "text-cyan-500" },
    { name: "Vite", icon: <Zap className="w-5 h-5" />, color: "text-yellow-500" },
    { name: "Framer Motion", icon: <Rocket className="w-5 h-5" />, color: "text-purple-500" },
    { name: "Lucide Icons", icon: <Heart className="w-5 h-5" />, color: "text-pink-500" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.section 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About Me
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Where security meets fun!
          </p>
        </motion.section>

        {/* Developer Section */}
        <motion.section 
          className="grid md:grid-cols-2 gap-8 mb-16"
          {...fadeInUp}
        >
          <Card className="p-8 bg-gradient-to-br from-background to-accent/20">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-passpal-purple to-passpal-pink flex items-center justify-center">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Maruf Rahman Tangin</h2>
                  <p className="text-muted-foreground">Security Enthusiast & Developer</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-lg">
                  I'm based in the UAE, a CS graduate with a passion for both cracking and securing systems. 
                  When I'm not busy protecting the digital world, you might find me pulling off harmless 
                  online pranks (all in good fun, of course!).
                </p>
                <p className="text-lg">
                  With a brain that thinks like both a hacker and a defender, I've created PassPal to 
                  make security tools accessible and fun for everyone. Because let's face it, security 
                  doesn't have to be boring!
                </p>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" size="sm" className="gap-2">
                  <Github className="w-4 h-4" />
                  GitHub
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Twitter className="w-4 h-4" />
                  Twitter
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Phone className="w-4 h-4" />
                      Contact
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Contact Me</DialogTitle>
                    </DialogHeader>
                    <div className="flex items-center gap-2 text-lg">
                      <Phone className="w-5 h-5" />
                      <span>+971 55 213 4063</span>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-br from-background to-accent/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-passpal-purple" />
                Fun Facts About Me
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Coffee className="w-5 h-5 text-amber-500 mt-1" />
                  <span>I can debug code while sleep-deprived (not recommended)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Bug className="w-5 h-5 text-green-500 mt-1" />
                  <span>I find more bugs in code than in my garden</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-blue-500 mt-1" />
                  <span>I believe in security through transparency</span>
                </li>
                <li className="flex items-start gap-2">
                  <Heart className="w-5 h-5 text-pink-500 mt-1" />
                  <span>I love making complex security concepts simple</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-background to-accent/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Laptop className="w-5 h-5 text-passpal-purple" />
                My Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, index) => (
                  <Badge key={index} variant="outline" className={`gap-1 ${tech.color}`}>
                    {tech.icon}
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        </motion.section>

        {/* Mission Section */}
        <motion.section 
          className="text-center mb-16"
          {...fadeInUp}
        >
          <Card className="p-8 bg-gradient-to-br from-background to-accent/20">
            <h2 className="text-2xl font-bold mb-4">My Mission</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              I aim to make security tools accessible, fun, and easy to use for everyone. 
              Because in a world where security is crucial, it shouldn't be complicated 
              or boring. I believe in empowering users with the knowledge and tools 
              they need to stay safe online.
            </p>
          </Card>
        </motion.section>

        {/* Features Section */}
        <motion.section 
          className="grid md:grid-cols-3 gap-6"
          {...fadeInUp}
        >
          <Card className="p-6 bg-gradient-to-br from-background to-accent/20">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-passpal-purple" />
              <h3 className="text-xl font-semibold">My Security First Approach</h3>
            </div>
            <p className="text-muted-foreground">
              I build all tools with security in mind, ensuring your data stays safe and private.
            </p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-background to-accent/20">
            <div className="flex items-center gap-3 mb-4">
              <Smartphone className="w-6 h-6 text-passpal-purple" />
              <h3 className="text-xl font-semibold">My User-Friendly Philosophy</h3>
            </div>
            <p className="text-muted-foreground">
              I make complex security tools simple and accessible for everyone.
            </p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-background to-accent/20">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-6 h-6 text-passpal-purple" />
              <h3 className="text-xl font-semibold">My Open Source Commitment</h3>
            </div>
            <p className="text-muted-foreground">
              I build with transparency in mind, making my code open for everyone to see and contribute.
            </p>
          </Card>
        </motion.section>
      </main>
    </div>
  );
};

export default AboutPage; 