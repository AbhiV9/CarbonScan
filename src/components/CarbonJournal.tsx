import { ArrowLeft, Calendar, TrendingDown, TrendingUp, Leaf, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface CarbonJournalProps {
  onBack: () => void;
}

export const CarbonJournal = ({ onBack }: CarbonJournalProps) => {
  const mockJournalData = {
    totalScanned: 23,
    totalCO2: 12.7,
    weeklyReduction: 15,
    streak: 7,
    recentScans: [
      {
        id: "1",
        name: "Organic Banana",
        co2: 0.3,
        date: "Today",
        time: "2:30 PM",
        category: "Fruit"
      },
      {
        id: "2", 
        name: "Plastic Water Bottle",
        co2: 2.1,
        date: "Today",
        time: "1:15 PM",
        category: "Beverage"
      },
      {
        id: "3",
        name: "Local Apples",
        co2: 0.2,
        date: "Yesterday",
        time: "4:45 PM",
        category: "Fruit"
      },
      {
        id: "4",
        name: "Imported Avocado",
        co2: 1.8,
        date: "Yesterday",
        time: "12:20 PM",
        category: "Fruit"
      }
    ],
    weeklyData: [
      { day: "Mon", co2: 3.2 },
      { day: "Tue", co2: 2.1 },
      { day: "Wed", co2: 1.8 },
      { day: "Thu", co2: 2.5 },
      { day: "Fri", co2: 1.4 },
      { day: "Sat", co2: 1.2 },
      { day: "Today", co2: 0.5 }
    ]
  };

  const getImpactColor = (impact: number) => {
    if (impact < 1) return "text-co2-low";
    if (impact < 2) return "text-co2-medium";
    return "text-co2-high";
  };

  const maxWeeklyCO2 = Math.max(...mockJournalData.weeklyData.map(d => d.co2));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white sticky top-0 z-10">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-lg font-semibold">Carbon Journal</h1>
        <div className="w-16"></div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {mockJournalData.totalScanned}
              </div>
              <div className="text-sm text-muted-foreground">Products Scanned</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {mockJournalData.totalCO2}kg
              </div>
              <div className="text-sm text-muted-foreground">Total CO₂ Tracked</div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Card */}
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-primary-glow" />
              Weekly Progress
            </CardTitle>
            <CardDescription>
              You've reduced your carbon footprint by {mockJournalData.weeklyReduction}% this week!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-primary-glow" />
                <span className="text-sm font-medium">{mockJournalData.streak} day streak</span>
              </div>
              <Badge variant="outline" className="border-primary-glow text-primary-glow">
                Eco Champion
              </Badge>
            </div>
            <Progress value={75} className="h-2" />
            <div className="text-xs text-muted-foreground mt-2">
              3 more days to reach your goal
            </div>
          </CardContent>
        </Card>

        {/* Weekly Chart */}
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Daily CO₂ Impact
            </CardTitle>
            <CardDescription>Last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between h-32 gap-2">
              {mockJournalData.weeklyData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-primary-glow/20 rounded-t min-h-[4px] flex items-end"
                    style={{ height: `${(data.co2 / maxWeeklyCO2) * 100}%` }}
                  >
                    <div 
                      className="w-full bg-primary-glow rounded-t"
                      style={{ height: '100%' }}
                    ></div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">{data.day}</div>
                  <div className="text-xs font-medium">{data.co2}kg</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Scans */}
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Scans
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockJournalData.recentScans.map((scan) => (
              <div key={scan.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">{scan.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {scan.date} at {scan.time}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${getImpactColor(scan.co2)}`}>
                    {scan.co2}kg CO₂
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {scan.category}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Goals */}
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary-glow">
              <Leaf className="h-5 w-5" />
              This Week's Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Scan 5 eco-friendly products</span>
              <Badge variant="outline" className="border-primary-glow text-primary-glow">
                3/5
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Reduce weekly CO₂ by 20%</span>
              <Badge variant="outline" className="border-primary-glow text-primary-glow">
                15/20%
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Try 2 green alternatives</span>
              <Badge variant="outline" className="border-primary-glow text-primary-glow">
                1/2
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};