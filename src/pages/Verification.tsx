import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, AlertCircle, Search, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "react-router-dom";

interface VerificationResult {
  ballotId: string;
  timestamp: string;
  status: "verified" | "pending" | "error";
  races: Array<{
    title: string;
    selection: string;
    verified: boolean;
  }>;
}

interface Race {
  id: string;
  title: string;
  description: string;
  candidates: Array<{
    id: string;
    name: string;
    party: string;
    description: string;
    symbol: string;
  }>;
}

const Verification = () => {
  const { toast } = useToast();
  const location = useLocation();
  const receiptData = location.state as { 
    ballotId?: string; 
    timestamp?: string;
    votes?: Record<string, string>;
    races?: Race[];
  } | null;
  const [showReceipt, setShowReceipt] = useState(!!receiptData?.ballotId);
  const [ballotId, setBallotId] = useState("");
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleVerify = async () => {
    if (!ballotId.trim()) {
      toast({
        title: "Ballot ID Required",
        description: "Please enter your ballot ID to verify your vote.",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      // Check if ballot ID matches the receipt data
      const isMatchingBallot = receiptData?.ballotId === ballotId.toUpperCase();
      
      let verificationRaces = [];
      
      if (isMatchingBallot && receiptData?.votes && receiptData?.races) {
        // Use actual vote data
        verificationRaces = receiptData.races.map(race => {
          const selectedCandidateId = receiptData.votes![race.id];
          const selectedCandidate = race.candidates.find(c => c.id === selectedCandidateId);
          
          return {
            title: race.title,
            selection: selectedCandidate 
              ? `${selectedCandidate.name} (${selectedCandidate.party})`
              : "No selection",
            verified: true
          };
        });
      } else {
        // Fallback mock data for other ballot IDs
        verificationRaces = [
          {
            title: "President of India",
            selection: "Sample Candidate (Sample Party)",
            verified: true
          }
        ];
      }
      
      const result: VerificationResult = {
        ballotId: ballotId.toUpperCase(),
        timestamp: receiptData?.timestamp || "2024-11-05T14:30:25Z",
        status: "verified",
        races: verificationRaces
      };
      
      setVerificationResult(result);
      setIsSearching(false);
      
      toast({
        title: "Verification Complete",
        description: "Your ballot has been successfully verified in the blockchain.",
        variant: "default",
      });
    }, 2000);
  };

  const handleDownloadCertificate = () => {
    if (!verificationResult) return;

    // Create certificate content
    const certificateContent = `
OFFICIAL VOTE VERIFICATION CERTIFICATE
======================================

Ballot ID: ${verificationResult.ballotId}
Timestamp: ${new Date(verificationResult.timestamp).toLocaleString()}
Status: ${verificationResult.status.toUpperCase()}

Block Hash: 0x4f3c2b1a9e8d7c6b5a4f3e2d1c0b9a8e7d6c5b4a
Transaction ID: tx_789abc456def123ghi
Confirmations: 24/24

RECORDED VOTES:
${verificationResult.races.map((race, i) => `
${i + 1}. ${race.title}
   Selection: ${race.selection}
   Verified: ${race.verified ? 'YES' : 'NO'}
`).join('')}

This certificate confirms that your vote was securely recorded 
on the blockchain and cannot be altered.

Generated: ${new Date().toLocaleString()}
    `.trim();

    // Create blob and download
    const blob = new Blob([certificateContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Vote-Certificate-${verificationResult.ballotId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Certificate Downloaded",
      description: "Your verification certificate has been saved.",
      variant: "default",
    });
  };

  const handleShareVerification = async () => {
    if (!verificationResult) return;

    const shareText = `My vote has been verified on the blockchain!\n\nBallot ID: ${verificationResult.ballotId}\nTimestamp: ${new Date(verificationResult.timestamp).toLocaleString()}\nStatus: Verified ✓\n\nSecure E-Voting System`;
    const shareUrl = window.location.href;

    // Try to use native share API if available (mobile devices)
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Vote Verification',
          text: shareText,
          url: shareUrl,
        });
        toast({
          title: "Shared Successfully",
          description: "Your verification has been shared.",
          variant: "default",
        });
      } catch (err) {
        // User cancelled share or error occurred
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error('Share failed:', err);
        }
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
        toast({
          title: "Link Copied",
          description: "Verification details copied to clipboard.",
          variant: "default",
        });
      } catch (err) {
        toast({
          title: "Copy Failed",
          description: "Please copy the URL manually.",
          variant: "destructive",
        });
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge variant="default" className="bg-success text-success-foreground">Verified</Badge>;
      case "pending":
        return <Badge variant="outline" className="text-warning border-warning">Pending</Badge>;
      case "error":
        return <Badge variant="destructive">Error</Badge>;
      default:
        return null;
    }
  };

  // Show receipt first if coming from voting
  if (showReceipt && receiptData) {
    return (
      <div className="min-h-screen bg-gradient-subtle py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-success/10 p-3 rounded-full">
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Vote Receipt</h1>
            <p className="text-lg text-muted-foreground">
              Your ballot has been successfully recorded
            </p>
          </div>

          <Card className="shadow-government max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Official Voting Receipt</CardTitle>
              <CardDescription className="text-center">
                Please save this information for verification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-government-gray/30 rounded-lg p-6 space-y-4">
                <div className="text-center border-b border-border pb-4">
                  <p className="text-sm text-muted-foreground mb-2">Ballot ID</p>
                  <p className="text-2xl font-mono font-bold text-government-blue">
                    {receiptData.ballotId}
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Timestamp:</span>
                    <div className="font-mono">
                      {new Date(receiptData.timestamp || new Date()).toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Encryption:</span>
                    <div className="font-semibold">AES-256 Applied</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <div className="font-semibold text-success">Recorded</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Blockchain:</span>
                    <div className="font-semibold text-success">Confirmed</div>
                  </div>
                </div>
              </div>

              <div className="bg-government-blue/5 rounded-lg p-4 text-sm">
                <h3 className="font-semibold mb-2 flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-government-blue" />
                  Important Information
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Keep this Ballot ID safe for verification</li>
                  <li>• You can verify your vote at any time using this ID</li>
                  <li>• Your vote is encrypted and anonymous</li>
                  <li>• Results will be available after election closes</li>
                </ul>
              </div>

              <div className="space-y-3">
                <Button 
                  variant="government" 
                  size="lg" 
                  className="w-full"
                  onClick={() => {
                    setShowReceipt(false);
                    setBallotId(receiptData.ballotId || "");
                  }}
                >
                  Proceed to Verify Vote
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full"
                  onClick={() => window.location.href = "/"}
                >
                  Return to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-government-blue/10 p-3 rounded-full">
              <Shield className="h-8 w-8 text-government-blue" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Vote Verification</h1>
          <p className="text-lg text-muted-foreground">
            Verify your ballot was recorded correctly and securely
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Verification Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-card mb-6">
              <CardHeader>
                <CardTitle>Enter Ballot ID</CardTitle>
                <CardDescription>
                  Use the ballot ID from your voting receipt to verify your votes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="ballotId">Ballot ID</Label>
                    <Input
                      id="ballotId"
                      placeholder="e.g., VT-2024-ABC123XYZ"
                      value={ballotId}
                      onChange={(e) => setBallotId(e.target.value)}
                      className="font-mono"
                    />
                  </div>
                  <Button 
                    onClick={handleVerify}
                    variant="government"
                    size="lg"
                    className="w-full"
                    disabled={isSearching}
                  >
                    {isSearching ? (
                      "Searching Blockchain..."
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Verify Vote
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Verification Results */}
            {verificationResult && (
              <Card className="shadow-government">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-success" />
                        <span>Verification Results</span>
                      </CardTitle>
                      <CardDescription>
                        Ballot ID: {verificationResult.ballotId}
                      </CardDescription>
                    </div>
                    {getStatusBadge(verificationResult.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Metadata */}
                    <div className="bg-government-gray/30 rounded-lg p-4">
                      <h3 className="font-semibold mb-3">Verification Details</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Timestamp:</span>
                          <div className="font-mono">
                            {new Date(verificationResult.timestamp).toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Block Hash:</span>
                          <div className="font-mono text-xs">
                            0x4f3c2b1a9e8d7c6b5a4f3e2d1c0b9a8e7d6c5b4a
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Transaction ID:</span>
                          <div className="font-mono text-xs">
                            tx_789abc456def123ghi
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Confirmations:</span>
                          <div className="font-semibold text-success">24/24</div>
                        </div>
                      </div>
                    </div>

                    {/* Vote Details */}
                    <div>
                      <h3 className="font-semibold mb-3">Your Recorded Votes</h3>
                      <div className="space-y-3">
                        {verificationResult.races.map((race, index) => (
                          <div key={index} className="flex items-start justify-between p-3 bg-background rounded-lg border">
                            <div className="flex-1">
                              <div className="font-medium">{race.title}</div>
                              <div className="text-sm text-government-blue">{race.selection}</div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {race.verified ? (
                                <CheckCircle className="h-5 w-5 text-success" />
                              ) : (
                                <AlertCircle className="h-5 w-5 text-warning" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={handleDownloadCertificate}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Download Certificate
                      </Button>
                      <Button 
                        variant="government" 
                        className="flex-1"
                        onClick={handleShareVerification}
                      >
                        Share Verification
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Information Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-government-blue" />
                  <CardTitle className="text-lg">How It Works</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ol className="space-y-2">
                  <li>1. Each vote is encrypted and stored on blockchain</li>
                  <li>2. Ballot ID links to your anonymous voting record</li>
                  <li>3. Cryptographic proof ensures vote integrity</li>
                  <li>4. No personal information is stored with votes</li>
                </ol>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-government-red" />
                  <CardTitle className="text-lg">Receipt Information</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li>• Ballot ID is on your voting receipt</li>
                  <li>• Format: VT-YYYY-XXXXXXXXX</li>
                  <li>• Keep receipt for verification</li>
                  <li>• Results available 24/7</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-government-blue/5 shadow-card">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="font-semibold text-government-blue mb-2">
                    Lost Your Receipt?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Contact support for assistance with ballot lookup
                  </p>
                  <Button variant="outline" size="sm">
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-success/5 border-success/20 shadow-card">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-success mb-1">Tamper-Proof</p>
                    <p className="text-muted-foreground">
                      Blockchain technology ensures votes cannot be altered 
                      after submission.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;