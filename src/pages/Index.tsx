import { useState } from "react";
import { Scan, BarChart3, Leaf, Car, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scanner } from "@/components/Scanner";
import { ProductDisplay } from "@/components/ProductDisplay";
import { CarbonJournal } from "@/components/CarbonJournal";

const Index = () => {
  const [activeView, setActiveView] = useState<'home' | 'scan' | 'journal'>('home');
  const [scannedProduct, setScannedProduct] = useState(null);

  const features = [
    {
      icon: <Scan className="h-6 w-6" />,
      title: "Instant Scanning",
      description: "Point your camera at any product barcode for immediate CO₂ impact data"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Impact Breakdown",
      description: "See detailed emissions from manufacturing, shipping, and packaging"
    },
    {
      icon: <Leaf className="h-6 w-6" />,
      title: "Green Alternatives",
      description: "Discover eco-friendly swaps to reduce your carbon footprint"
    }
  ];

  const stats = [
    { value: "2.4M", label: "Products Scanned", icon: <Scan className="h-5 w-5" /> },
    { value: "156k", label: "CO₂ Tons Tracked", icon: <Zap className="h-5 w-5" /> },
    { value: "89%", label: "Users Reduced Impact", icon: <Leaf className="h-5 w-5" /> }
  ];

  if (activeView === 'scan') {
    return <Scanner 
      onBack={() => setActiveView('home')} 
      onProductScanned={(product) => {
        setScannedProduct(product);
        setActiveView('home');
      }} 
    />;
  }

  if (activeView === 'journal') {
    return <CarbonJournal onBack={() => setActiveView('home')} />;
  }

  if (scannedProduct) {
    return <ProductDisplay product={scannedProduct} onBack={() => setScannedProduct(null)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Leaf className="h-4 w-4 text-white" />
              <span className="text-white text-sm font-medium">Track Your Environmental Impact</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Carbon<span className="text-primary-glow">Scan</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Scan any product barcode to instantly see its carbon footprint and discover greener alternatives
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="eco" 
                size="lg" 
                onClick={() => setActiveView('scan')}
                className="text-lg px-8 py-4"
              >
                <Scan className="h-5 w-5" />
                Start Scanning
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-4 border-2 border-white bg-white/10 text-white hover:bg-white hover:text-primary backdrop-blur-sm"
                onClick={() => setActiveView('journal')}
              >
                <BarChart3 className="h-5 w-5" />
                View Journal
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-glow/10 rounded-full mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to understand and reduce your carbon footprint
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gradient-card border-0 shadow-card hover:shadow-eco transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <CardHeader className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-glow/10 rounded-full mb-4 mx-auto">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Reduce Your Impact?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of conscious consumers making informed choices for our planet
          </p>
          <Button 
            variant="scan" 
            size="lg"
            onClick={() => setActiveView('scan')}
            className="text-lg px-8 py-4"
          >
            <Scan className="h-5 w-5" />
            Start Your Journey
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;