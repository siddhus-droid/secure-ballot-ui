import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Users, Clock, Download, RefreshCw } from "lucide-react";

interface CandidateResult {
  name: string;
  party: string;
  votes: number;
  percentage: number;
  color: string;
}

interface RaceResult {
  title: string;
  totalVotes: number;
  candidates: CandidateResult[];
  status: "open" | "closed" | "projected";
}

const Results = () => {
  const lastUpdated = new Date().toLocaleTimeString();

  const handleExportData = () => {
    // Create CSV content
    let csvContent = "Race,Candidate,Party,Votes,Percentage\n";
    
    raceResults.forEach(race => {
      race.candidates.forEach(candidate => {
        csvContent += `"${race.title}","${candidate.name}","${candidate.party}",${candidate.votes},${candidate.percentage}\n`;
      });
    });

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `election_results_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const raceResults: RaceResult[] = [
    {
      title: "President of India",
      totalVotes: 2847329,
      status: "open",
      candidates: [
        { name: "Rajesh Kumar Sharma", party: "Indian National Congress", votes: 1423665, percentage: 52.1, color: "bg-government-blue" },
        { name: "Priya Patel", party: "Bharatiya Janata Party", votes: 1281234, percentage: 44.2, color: "bg-government-red" },
        { name: "Arjun Singh", party: "Aam Aadmi Party", votes: 142430, percentage: 3.7, color: "bg-muted" }
      ]
    },
    {
      title: "Chief Minister of State",
      totalVotes: 2654891,
      status: "projected",
      candidates: [
        { name: "Sunita Devi", party: "Indian National Congress", votes: 1487623, percentage: 56.0, color: "bg-government-blue" },
        { name: "Vikram Reddy", party: "Bharatiya Janata Party", votes: 1167268, percentage: 44.0, color: "bg-government-red" }
      ]
    },
    {
      title: "National Education Policy",
      totalVotes: 2789156,
      status: "open",
      candidates: [
        { name: "YES", party: "Support", votes: 1672894, percentage: 60.0, color: "bg-success" },
        { name: "NO", party: "Oppose", votes: 1116262, percentage: 40.0, color: "bg-destructive" }
      ]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge variant="outline" className="text-government-blue border-government-blue">Live</Badge>;
      case "projected":
        return <Badge variant="secondary" className="text-warning bg-warning/10">Projected</Badge>;
      case "closed":
        return <Badge variant="default" className="bg-success text-success-foreground">Final</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-government-blue/10 p-3 rounded-full">
              <BarChart3 className="h-8 w-8 text-government-blue" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Election Results</h1>
          <p className="text-lg text-muted-foreground">
            Real-time results with live updates every 30 seconds
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Votes Cast</p>
                  <p className="text-2xl font-bold text-foreground">2,847,329</p>
                </div>
                <Users className="h-8 w-8 text-government-blue" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Turnout Rate</p>
                  <p className="text-2xl font-bold text-foreground">73.4%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Precincts</p>
                  <p className="text-2xl font-bold text-foreground">3,247 / 3,892</p>
                </div>
                <div className="text-government-blue text-sm font-medium">83.4%</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                  <p className="text-lg font-semibold text-foreground">{lastUpdated}</p>
                </div>
                <Clock className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportData}>
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">
            Auto-refresh: ON • Next update in 15s
          </div>
        </div>

        {/* Race Results */}
        <div className="space-y-6">
          {raceResults.map((race, index) => (
            <Card key={index} className="shadow-government">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{race.title}</CardTitle>
                    <CardDescription>
                      {race.totalVotes.toLocaleString()} total votes
                    </CardDescription>
                  </div>
                  {getStatusBadge(race.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {race.candidates.map((candidate, candidateIndex) => (
                    <div key={candidateIndex} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded ${candidate.color}`} />
                          <div>
                            <span className="font-medium">{candidate.name}</span>
                            <span className="text-sm text-muted-foreground ml-2">
                              ({candidate.party})
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{candidate.percentage}%</div>
                          <div className="text-sm text-muted-foreground">
                            {candidate.votes.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <Progress value={candidate.percentage} className="h-3" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Disclaimer */}
        <Card className="mt-8 bg-government-gray/30 border-0">
          <CardContent className="pt-6">
            <div className="text-center text-sm text-muted-foreground">
              <p className="mb-2">
                <strong>Disclaimer:</strong> Results are preliminary and subject to change. 
                Official results will be certified after all votes are counted and verified.
              </p>
              <p>
                Data is updated in real-time from certified polling locations and early voting centers.
                All results are subject to audit and verification procedures.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Results;