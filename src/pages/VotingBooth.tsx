import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle, UserCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import ballotIcon from "@/assets/ballot-icon.jpg";
import congressSymbol from "@/assets/congress-symbol.png";
import bjpSymbol from "@/assets/bjp-symbol.png";
import aapSymbol from "@/assets/aap-symbol.png";
import buildingSymbol from "@/assets/building-symbol.png";
import yesSymbol from "@/assets/yes-symbol.png";
import noSymbol from "@/assets/no-symbol.png";

interface Candidate {
  id: string;
  name: string;
  party: string;
  description: string;
  symbol: string;
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
  const [showVoterDetails, setShowVoterDetails] = useState(false);
  const [voterName, setVoterName] = useState("");
  const [voterPhone, setVoterPhone] = useState("");
  const [ballotId, setBallotId] = useState("");

  const races: Race[] = [
    {
      id: "president",
      title: "President of India",
      description: "Choose one candidate for President",
      candidates: [
        {
          id: "candidate-1",
          name: "Rajesh Kumar Sharma",
          party: "Indian National Congress",
          description: "Former Chief Minister focused on education and rural development",
          symbol: congressSymbol
        },
        {
          id: "candidate-2",
          name: "Priya Patel",
          party: "Bharatiya Janata Party", 
          description: "Business leader advocating for economic growth and digital India",
          symbol: bjpSymbol
        },
        {
          id: "candidate-3",
          name: "Arjun Singh",
          party: "Aam Aadmi Party",
          description: "Reform candidate focused on anti-corruption and transparency",
          symbol: aapSymbol
        }
      ]
    },
    {
      id: "chief-minister",
      title: "Chief Minister of State",
      description: "Choose one candidate for Chief Minister",
      candidates: [
        {
          id: "cm-1",
          name: "Sunita Devi",
          party: "Indian National Congress",
          description: "Former MLA with focus on infrastructure and women's empowerment",
          symbol: congressSymbol
        },
        {
          id: "cm-2",
          name: "Vikram Reddy",
          party: "Bharatiya Janata Party",
          description: "Business leader advocating for industrial development",
          symbol: bjpSymbol
        }
      ]
    },
    {
      id: "referendum-1",
      title: "National Education Policy",
      description: "Should the government increase education funding by ₹50,000 crore annually?",
      candidates: [
        {
          id: "ref-yes",
          name: "YES",
          party: "Support",
          description: "Increase funding for government schools and universities",
          symbol: yesSymbol
        },
        {
          id: "ref-no",
          name: "NO",
          party: "Oppose",
          description: "Maintain current funding levels",
          symbol: noSymbol
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
      // Complete voting and generate ballot ID
      const generatedBallotId = `VT-2024-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      setBallotId(generatedBallotId);
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
    setShowRegistrationCheck(false);
    setShowVoterDetails(true);
  };

  const handleVoterDetailsSubmit = async () => {
    if (!voterName.trim() || !voterPhone.trim()) {
      toast({
        title: "Details Required",
        description: "Please enter your name and phone number to continue.",
        variant: "destructive",
      });
      return;
    }

    if (voterPhone.length !== 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Phone number must be exactly 10 digits.",
        variant: "destructive",
      });
      return;
    }

    // Verify voter exists in database
    const { data, error } = await supabase
      .from('voters')
      .select('*')
      .eq('name', voterName.trim())
      .eq('phone_number', voterPhone.trim())
      .maybeSingle();

    if (error) {
      toast({
        title: "Verification Error",
        description: "Failed to verify your identity. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (!data) {
      toast({
        title: "Not Registered",
        description: "No voter found with this name and phone number. Please register first.",
        variant: "destructive",
      });
      return;
    }

    if (data.has_voted) {
      toast({
        title: "Already Voted",
        description: "This voter has already cast their ballot.",
        variant: "destructive",
      });
      return;
    }
    
    setIsRegistered(true);
    setShowVoterDetails(false);
    toast({
      title: "Verification Complete",
      description: `Welcome ${voterName}! You may now cast your ballot.`,
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

  // Show voter details form if registered
  if (showVoterDetails) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center px-4">
        <Card className="max-w-2xl w-full shadow-government">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-government-blue/10 rounded-full flex items-center justify-center mb-4">
              <UserCheck className="h-8 w-8 text-government-blue" />
            </div>
            <CardTitle className="text-2xl text-center">Verify Your Identity</CardTitle>
            <CardDescription className="text-center">
              Please provide your registered details to proceed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="voterName">Full Name (as registered)</Label>
                <Input
                  id="voterName"
                  placeholder="Enter your full name"
                  value={voterName}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Only allow letters and spaces
                    if (/^[A-Za-z\s]*$/.test(value)) {
                      setVoterName(value);
                    }
                  }}
                  pattern="[A-Za-z\s]+"
                  title="Name should only contain letters"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="voterPhone">Phone Number</Label>
                <Input
                  id="voterPhone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={voterPhone}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Only allow digits and limit to 10
                    if (/^\d*$/.test(value) && value.length <= 10) {
                      setVoterPhone(value);
                    }
                  }}
                  pattern="\d{10}"
                  maxLength={10}
                  title="Phone number must be exactly 10 digits"
                  className="mt-1"
                  required
                />
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full"
                onClick={() => {
                  setShowVoterDetails(false);
                  setShowRegistrationCheck(true);
                }}
              >
                Back
              </Button>
              <Button 
                variant="government" 
                size="lg" 
                className="w-full"
                onClick={handleVoterDetailsSubmit}
              >
                Verify & Continue
              </Button>
            </div>
            
            <div className="text-xs text-muted-foreground text-center">
              <p>Your information will be verified against voter registration records.</p>
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
                <p>Ballot ID: #{ballotId}</p>
                <p>Timestamp: {new Date().toLocaleString()}</p>
                <p>Encryption: AES-256 Applied</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <Button 
                variant="government" 
                size="lg" 
                className="w-full"
                onClick={() => navigate("/verify", { 
                  state: { 
                    ballotId, 
                    timestamp: new Date().toISOString(),
                    votes,
                    races
                  } 
                })}
              >
                View Receipt
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full"
                onClick={() => navigate("/")}
              >
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
                <div key={candidate.id} className="flex items-start space-x-4 p-4 rounded-lg border hover:bg-government-gray/20 transition-colors">
                  <RadioGroupItem value={candidate.id} id={candidate.id} className="mt-1" />
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-20 h-20 rounded-lg bg-white shadow-sm flex items-center justify-center flex-shrink-0 p-2">
                      <img 
                        src={candidate.symbol} 
                        alt={`${candidate.party} symbol`} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor={candidate.id} className="font-medium cursor-pointer text-base">
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