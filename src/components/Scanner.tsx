import { useState, useEffect } from "react";
import { ArrowLeft, Scan, Zap, CheckCircle, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { toast } from "@/hooks/use-toast";

interface ScannerProps {
  onBack: () => void;
  onProductScanned: (product: any) => void;
}

export const Scanner = ({ onBack, onProductScanned }: ScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [isCameraSupported, setIsCameraSupported] = useState(true);

  const mockProducts = [
    {
      id: "1",
      name: "Organic Banana (1 lb)",
      barcode: "123456789012",
      co2Impact: 0.3,
      category: "Fruit",
      breakdown: {
        manufacturing: 15,
        shipping: 25,
        packaging: 60
      },
      equivalent: "0.2 miles driven",
      alternatives: ["Local Banana", "Seasonal Apple"]
    },
    {
      id: "2", 
      name: "Plastic Water Bottle (500ml)",
      barcode: "987654321098",
      co2Impact: 2.1,
      category: "Beverage",
      breakdown: {
        manufacturing: 70,
        shipping: 20,
        packaging: 10
      },
      equivalent: "1.6 miles driven",
      alternatives: ["Reusable Water Bottle", "Glass Bottle"]
    }
  ];

  useEffect(() => {
    checkCameraSupport();
  }, []);

  const checkCameraSupport = async () => {
    try {
      const { supported } = await BarcodeScanner.isSupported();
      setIsCameraSupported(supported);
      if (supported) {
        await BarcodeScanner.checkPermissions();
      }
    } catch (error) {
      console.log('Camera support check:', error);
      setIsCameraSupported(false);
    }
  };

  const requestCameraPermission = async () => {
    try {
      console.log('Requesting camera permission...');
      const { camera } = await BarcodeScanner.requestPermissions();
      console.log('Permission status:', camera);
      return camera === 'granted' || camera === 'limited';
    } catch (error) {
      console.error('Permission error:', error);
      toast({
        title: "Permission Error",
        description: "Could not request camera permission. Please check app settings.",
        variant: "destructive"
      });
      return false;
    }
  };

  const lookupProduct = (barcode: string) => {
    // Find product by barcode or return random for demo
    const product = mockProducts.find(p => p.barcode === barcode) || 
                   mockProducts[Math.floor(Math.random() * mockProducts.length)];
    return { ...product, barcode };
  };

  const startRealScan = async () => {
    try {
      console.log('Starting real scan...');
      const hasPermission = await requestCameraPermission();
      console.log('Has permission:', hasPermission);
      
      if (!hasPermission) {
        toast({
          title: "Camera Permission Required",
          description: "Please grant camera permission to scan barcodes",
          variant: "destructive"
        });
        return;
      }

      setIsScanning(true);
      setScanComplete(false);

      console.log('Calling BarcodeScanner.scan()...');
      const { barcodes } = await BarcodeScanner.scan();
      console.log('Scan result:', barcodes);
      
      setIsScanning(false);
      
      if (barcodes && barcodes.length > 0) {
        setScanComplete(true);
        const product = lookupProduct(barcodes[0].displayValue);
        console.log('Product found:', product);
        
        setTimeout(() => {
          onProductScanned(product);
        }, 1000);
      } else {
        toast({
          title: "No Barcode Detected",
          description: "Please try scanning again",
          variant: "destructive"
        });
      }
      
    } catch (error) {
      console.error('Scan error:', error);
      setIsScanning(false);
      toast({
        title: "Scan Failed",
        description: `Unable to start camera scanner: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive"
      });
    }
  };

  const simulateScan = () => {
    setIsScanning(true);
    setScanComplete(false);
    
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      
      setTimeout(() => {
        const randomProduct = mockProducts[Math.floor(Math.random() * mockProducts.length)];
        onProductScanned(randomProduct);
      }, 1000);
    }, 3000);
  };

  const handleScan = () => {
    if (isCameraSupported) {
      startRealScan();
    } else {
      simulateScan();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-lg font-semibold">Scanner</h1>
        <div className="w-16"></div>
      </div>

      {/* Scanner Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="relative w-full max-w-sm aspect-square mb-8">
          {/* Camera Viewfinder */}
          <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 rounded-2xl relative overflow-hidden border-2 border-primary/20">
            {/* Scanning Animation */}
            {isScanning && (
              <div className="absolute inset-0">
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary-glow animate-scan-line"></div>
              </div>
            )}
            
            {/* Success State */}
            {scanComplete && (
              <div className="absolute inset-0 flex items-center justify-center bg-primary-glow/20">
                <CheckCircle className="h-16 w-16 text-primary-glow animate-pulse-eco" />
              </div>
            )}

            {/* Corner Guides */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-primary-glow"></div>
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-primary-glow"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-primary-glow"></div>
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-primary-glow"></div>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-primary mb-2">
            {isScanning ? "Scanning..." : scanComplete ? "Scan Complete!" : "Ready to Scan"}
          </h2>
          <p className="text-muted-foreground">
            {isScanning 
              ? "Point camera at barcode..." 
              : scanComplete 
              ? "Calculating environmental impact"
              : isCameraSupported 
                ? "Tap scan to open camera"
                : "Demo mode - tap to simulate scan"
            }
          </p>
        </div>

        {/* Scan Button */}
        <Button 
          variant={isScanning ? "outline" : "scan"} 
          size="lg"
          onClick={handleScan}
          disabled={isScanning || scanComplete}
          className="w-32 h-32 rounded-full text-lg shadow-eco"
        >
          {isScanning ? (
            <Zap className="h-8 w-8 animate-pulse" />
          ) : (
            <Camera className="h-8 w-8" />
          )}
        </Button>

        {/* Tips */}
        <Card className="mt-8 max-w-sm">
          <CardContent className="p-4">
            <h3 className="font-medium mb-2 text-center">
              {isCameraSupported ? "Scanning Tips" : "Demo Mode"}
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              {isCameraSupported ? (
                <>
                  <li>• Point camera at barcode</li>
                  <li>• Ensure good lighting</li>
                  <li>• Hold device steady</li>
                </>
              ) : (
                <>
                  <li>• Camera scanning available on mobile</li>
                  <li>• Currently using demo mode</li>
                  <li>• Export to run as native app</li>
                </>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};