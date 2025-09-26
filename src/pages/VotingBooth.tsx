import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Vote, CheckCircle, AlertCircle, Clock, UserCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import ballotIcon from "@/assets/ballot-icon.jpg";

interface Candidate {
  id: string;
  name: string;
  party: string;
  description: string;
}

interface Race {
  id: string;
  title: string;
  description: string;
  candidates: Candidate[];
}

const VotingBooth = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentRaceIndex, setCurrentRaceIndex] = useState(0);
  const [votes, setVotes] = useState<Record<string, string>>({});
  const [isVotingComplete, setIsVotingComplete] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showRegistrationCheck, setShowRegistrationCheck] = useState(true);

  const races: Race[] = [
    {
      id: "president",
      title: "President of the United States",
      description: "Choose one candidate for President",
      candidates: [
        {
          id: "candidate-1",
          name: "John Anderson",
          party: "Democratic Party",
          description: "Experienced leader focused on healthcare and education reform"
        },
        {
          id: "candidate-2",
          name: "Sarah Mitchell",
          party: "Republican Party", 
          description: "Business leader advocating for economic growth and security"
        },
        {
          id: "candidate-3",
          name: "Robert Chen",
          party: "Independent",
          description: "Reform candidate focused on government transparency"
        }
      ]
    },
    {
      id: "governor",
      title: "Governor",
      description: "Choose one candidate for Governor",
      candidates: [
        {
          id: "gov-1",
          name: "Maria Rodriguez",
          party: "Democratic Party",
          description: "Former senator with focus on infrastructure and environment"
        },
        {
          id: "gov-2",
          name: "David Thompson",
          party: "Republican Party",
          description: "Former businessman advocating for lower taxes"
        }
      ]
    },
    {
      id: "proposition-1",
      title: "Proposition 1: Education Funding",
      description: "Shall the state increase education funding by $2 billion annually?",
      candidates: [
        {
          id: "prop-yes",
          name: "YES",
          party: "Support",
          description: "Increase funding for schools and teacher salaries"
        },
        {
          id: "prop-no",
          name: "NO",
          party: "Oppose",
          description: "Maintain current funding levels"
        }
      ]
    }
  ];

  const currentRace = races[currentRaceIndex];
  const progress = ((currentRaceIndex + 1) / races.length) * 100;

  const handleVoteChange = (raceId: string, candidateId: string) => {
    setVotes(prev => ({ ...prev, [raceId]: candidateId }));
  };

  const handleNext = () => {
    if (!votes[currentRace.id]) {
      toast({
        title: "Selection Required",
        description: "Please make a selection before continuing.",
        variant: "destructive",
      });
      return;
    }

    if (currentRaceIndex < races.length - 1) {
      setCurrentRaceIndex(prev => prev + 1);
    } else {
      // Complete voting
      setIsVotingComplete(true);
      toast({
        title: "Ballot Cast Successfully",
        description: "Your vote has been recorded and encrypted. Thank you for participating!",
        variant: "default",
      });
    }
  };

  const handlePrevious = () => {
    if (currentRaceIndex > 0) {
      setCurrentRaceIndex(prev => prev - 1);
    }
  };

  const handleRegistrationConfirm = () => {
    // In a real app, this would check against a database
    setIsRegistered(true);
    setShowRegistrationCheck(false);
    toast({
      title: "Registration Verified",
      description: "Welcome to the voting booth. You may now cast your ballot.",
      variant: "default",
    });
  };

  const handleGoToRegistration = () => {
    navigate("/register");
  };

  // Show registration check first
  if (showRegistrationCheck) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center px-4">
        <Card className="max-w-2xl w-full shadow-government text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-government-blue/10 rounded-full flex items-center justify-center mb-4">
              <UserCheck className="h-8 w-8 text-government-blue" />
            </div>
            <CardTitle className="text-2xl">Voter Registration Required</CardTitle>
            <CardDescription>
              You must be registered to vote before accessing the voting booth
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-government-gray/30 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Registration Status Check</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Are you already registered to vote in this jurisdiction?
              </p>
              <div className="space-y-3">
                <Button 
                  variant="government" 
                  size="lg" 
                  className="w-full"
                  onClick={handleRegistrationConfirm}
                >
                  Yes, I'm Registered - Proceed to Vote
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full"
                  onClick={handleGoToRegistration}
                >
                  No, I Need to Register First
                </Button>
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground">
              <p>Registration is required by law to participate in elections.</p>
              <p>If you're unsure of your status, please register to ensure your eligibility.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isVotingComplete) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center px-4">
        <Card className="max-w-2xl w-full shadow-government text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <CardTitle className="text-2xl">Voting Complete!</CardTitle>
            <CardDescription>
              Your ballot has been successfully cast and recorded
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-government-gray/30 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Confirmation Details</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Ballot ID: #VT-2024-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                <p>Timestamp: {new Date().toLocaleString()}</p>
                <p>Encryption: AES-256 Applied</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <Button variant="government" size="lg" className="w-full">
                View Receipt
              </Button>
              <Button variant="outline" size="lg" className="w-full">
                Return to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img src={ballotIcon} alt="Ballot" className="w-12 h-12 rounded-lg" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Digital Voting Booth</h1>
          <p className="text-lg text-muted-foreground">
            Secure • Private • Verified
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">
              Question {currentRaceIndex + 1} of {races.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Current Race */}
        <Card className="shadow-government mb-8">
          <CardHeader>
            <CardTitle className="text-xl">{currentRace.title}</CardTitle>
            <CardDescription>{currentRace.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={votes[currentRace.id] || ""}
              onValueChange={(value) => handleVoteChange(currentRace.id, value)}
              className="space-y-4"
            >
              {currentRace.candidates.map((candidate) => (
                <div key={candidate.id} className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-government-gray/20 transition-colors">
                  <RadioGroupItem value={candidate.id} id={candidate.id} className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor={candidate.id} className="font-medium cursor-pointer">
                      {candidate.name}
                    </Label>
                    <div className="text-sm text-government-blue font-medium">
                      {candidate.party}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {candidate.description}
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentRaceIndex === 0}
          >
            Previous
          </Button>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Session expires in 45:00</span>
          </div>
          
          <Button
            variant="government"
            onClick={handleNext}
          >
            {currentRaceIndex === races.length - 1 ? "Cast Ballot" : "Next"}
          </Button>
        </div>

        {/* Security Notice */}
        <Card className="mt-8 bg-government-blue/5 border-government-blue/20">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-government-blue mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-government-blue mb-1">Security Notice</p>
                <p className="text-muted-foreground">
                  Your votes are encrypted immediately and stored securely. 
                  No personal information is connected to your ballot choices.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VotingBooth;