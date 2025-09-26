import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Phone, Mail, MessageCircle, Book, Shield, Vote } from "lucide-react";

const Help = () => {
  const faqItems = [
    {
      question: "How do I register to vote?",
      answer: "Click 'Register to Vote' in the navigation menu and fill out the registration form with your personal information. You'll need a valid Social Security number, current address, and email. Registration is processed within 48 hours."
    },
    {
      question: "Is online voting secure?",
      answer: "Yes, our system uses bank-level encryption (AES-256), blockchain technology for vote integrity, and multi-factor authentication. Your vote is encrypted immediately and stored securely with no connection to your personal identity."
    },
    {
      question: "Can I change my vote after submitting?",
      answer: "No, once your ballot is cast and confirmed, it cannot be changed. This ensures the integrity of the voting process. Please review your choices carefully before submitting."
    },
    {
      question: "How do I verify my vote was counted?",
      answer: "Use your ballot ID (provided after voting) on the Verification page. This will show you exactly how your votes were recorded on the blockchain and confirm they were counted correctly."
    },
    {
      question: "What if I lose my ballot ID?",
      answer: "Contact our support team with your voter registration information. We can help you locate your ballot ID for verification purposes."
    },
    {
      question: "When are results available?",
      answer: "Preliminary results are available in real-time as votes are counted. Final, certified results are typically available within 24-48 hours after polls close."
    },
    {
      question: "What browsers are supported?",
      answer: "Our system works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using an updated browser for the best experience."
    },
    {
      question: "Can I vote on mobile devices?",
      answer: "Yes, our voting platform is fully responsive and works on smartphones and tablets. The interface is optimized for touch screens and mobile browsers."
    }
  ];

  const supportChannels = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "24/7 voting assistance",
      contact: "1-800-VOTE-NOW",
      action: "Call Now"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Response within 2 hours",
      contact: "support@securevote.gov",
      action: "Send Email"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Instant help available",
      contact: "Available 24/7",
      action: "Start Chat"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-government-blue/10 p-3 rounded-full">
              <HelpCircle className="h-8 w-8 text-government-blue" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Help & Support</h1>
          <p className="text-lg text-muted-foreground">
            Get answers to common questions and find support resources
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <Card className="shadow-card mb-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Book className="h-5 w-5 text-government-blue" />
                  <span>Frequently Asked Questions</span>
                </CardTitle>
                <CardDescription>
                  Find answers to the most common voting questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* Quick Start Guide */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Vote className="h-5 w-5 text-government-red" />
                  <span>Quick Start Guide</span>
                </CardTitle>
                <CardDescription>
                  Step-by-step instructions for first-time voters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <div className="bg-government-blue text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                      1
                    </div>
                    <div>
                      <h3 className="font-medium">Register to Vote</h3>
                      <p className="text-sm text-muted-foreground">
                        Complete the voter registration form with your personal information
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="bg-government-blue text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                      2
                    </div>
                    <div>
                      <h3 className="font-medium">Verify Your Identity</h3>
                      <p className="text-sm text-muted-foreground">
                        Check your email for verification instructions and follow the link
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="bg-government-blue text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                      3
                    </div>
                    <div>
                      <h3 className="font-medium">Access the Voting Booth</h3>
                      <p className="text-sm text-muted-foreground">
                        Navigate to the Vote page and log in with your credentials
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="bg-government-blue text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                      4
                    </div>
                    <div>
                      <h3 className="font-medium">Cast Your Ballot</h3>
                      <p className="text-sm text-muted-foreground">
                        Make your selections and submit your ballot securely
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="bg-success text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                      5
                    </div>
                    <div>
                      <h3 className="font-medium">Verify Your Vote</h3>
                      <p className="text-sm text-muted-foreground">
                        Use your ballot ID to verify your vote was recorded correctly
                      </p>
                    </div>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>

          {/* Support Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Contact Support</CardTitle>
                <CardDescription>
                  Multiple ways to get help when you need it
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {supportChannels.map((channel, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg border">
                    <div className="bg-government-blue/10 p-2 rounded">
                      <channel.icon className="h-4 w-4 text-government-blue" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{channel.title}</h3>
                      <p className="text-sm text-muted-foreground">{channel.description}</p>
                      <p className="text-sm font-medium text-government-blue">{channel.contact}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-government-blue" />
                  <CardTitle className="text-lg">Security Resources</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Security Whitepaper
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Privacy Policy
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Audit Reports
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Accessibility Guide
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-government-blue/5 shadow-card">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="font-semibold text-government-blue mb-2">
                    Emergency Voting Issues?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Report technical problems or security concerns immediately
                  </p>
                  <Button variant="destructive" size="sm" className="w-full">
                    Report Issue
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-government-gray/30 shadow-card">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="font-semibold mb-2">System Status</h3>
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <div className="w-3 h-3 bg-success rounded-full"></div>
                    <span className="text-sm font-medium text-success">All Systems Operational</span>
                  </div>
                  <Button variant="outline" size="sm">
                    View Status Page
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;