import { ArrowLeft, Car, Leaf, Package, Truck, Factory } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface ProductDisplayProps {
  product: {
    id: string;
    name: string;
    barcode: string;
    co2Impact: number;
    category: string;
    breakdown: {
      manufacturing: number;
      shipping: number;
      packaging: number;
    };
    equivalent: string;
    alternatives: string[];
  };
  onBack: () => void;
}

export const ProductDisplay = ({ product, onBack }: ProductDisplayProps) => {
  const getImpactColor = (impact: number) => {
    if (impact < 1) return "co2-low";
    if (impact < 3) return "co2-medium";
    return "co2-high";
  };

  const getImpactLabel = (impact: number) => {
    if (impact < 1) return "Low Impact";
    if (impact < 3) return "Medium Impact";
    return "High Impact";
  };

  const breakdownData = [
    {
      label: "Manufacturing",
      value: product.breakdown.manufacturing,
      icon: <Factory className="h-4 w-4" />,
      color: "bg-red-500"
    },
    {
      label: "Shipping",
      value: product.breakdown.shipping,
      icon: <Truck className="h-4 w-4" />,
      color: "bg-yellow-500"
    },
    {
      label: "Packaging",
      value: product.breakdown.packaging,
      icon: <Package className="h-4 w-4" />,
      color: "bg-blue-500"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white sticky top-0 z-10">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-lg font-semibold">Product Impact</h1>
        <div className="w-16"></div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Product Info */}
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
              <Package className="h-10 w-10 text-muted-foreground" />
            </div>
            <CardTitle className="text-xl">{product.name}</CardTitle>
            <CardDescription>Barcode: {product.barcode}</CardDescription>
            <Badge variant="secondary" className="w-fit mx-auto">
              {product.category}
            </Badge>
          </CardHeader>
        </Card>

        {/* CO2 Impact */}
        <Card className="border-0 shadow-card">
          <CardHeader className="text-center">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 bg-${getImpactColor(product.co2Impact)}/10`}>
              <span className={`text-3xl font-bold text-${getImpactColor(product.co2Impact)}`}>
                {product.co2Impact}
              </span>
            </div>
            <CardTitle className="text-2xl">kg CO₂e</CardTitle>
            <CardDescription>Carbon footprint per item</CardDescription>
            <Badge 
              variant="outline" 
              className={`border-${getImpactColor(product.co2Impact)} text-${getImpactColor(product.co2Impact)}`}
            >
              {getImpactLabel(product.co2Impact)}
            </Badge>
          </CardHeader>
        </Card>

        {/* Real-world Equivalent */}
        <Card className="border-0 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-glow/10 rounded-full flex items-center justify-center">
                <Car className="h-6 w-6 text-primary-glow" />
              </div>
              <div>
                <h3 className="font-semibold">Real-world Impact</h3>
                <p className="text-muted-foreground">Equivalent to {product.equivalent}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Breakdown */}
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Impact Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {breakdownData.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{item.value}%</span>
                </div>
                <Progress value={item.value} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Green Alternatives */}
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary-glow">
              <Leaf className="h-5 w-5" />
              Green Alternatives
            </CardTitle>
            <CardDescription>
              Lower-impact options you might consider
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {product.alternatives.map((alternative, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-primary-glow/5 rounded-lg">
                  <Leaf className="h-4 w-4 text-primary-glow" />
                  <span className="font-medium">{alternative}</span>
                  <Badge variant="outline" className="ml-auto border-primary-glow text-primary-glow">
                    Lower CO₂
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button variant="eco" className="flex-1">
            Save to Journal
          </Button>
          <Button variant="outline" className="flex-1">
            Share Impact
          </Button>
        </div>
      </div>
    </div>
  );
};