import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Vote, Shield, BarChart3, Users, CheckCircle, Lock } from "lucide-react";
import heroImage from "@/assets/voting-hero.jpg";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
                Digital India Voting
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Experience the future of democracy in India. Secure, transparent, and 
                accessible voting for every citizen, powered by blockchain technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button variant="patriotic" size="lg" className="w-full sm:w-auto">
                    Register to Vote
                  </Button>
                </Link>
                <Link to="/vote">
                  <Button variant="government" size="lg" className="w-full sm:w-auto">
                    Cast Your Vote
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Secure Digital Voting System" 
                className="w-full h-auto rounded-lg shadow-government"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose Digital India Voting?
            </h2>
            <p className="text-lg text-muted-foreground">
              Built with cutting-edge technology for India's democratic future
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center shadow-card">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-india-saffron/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-india-saffron" />
                </div>
                <CardTitle>Bank-Level Security</CardTitle>
                <CardDescription>
                  Advanced encryption and multi-layer security protocols protect every vote
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center shadow-card">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-india-green/10 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-india-green" />
                </div>
                <CardTitle>Transparent Process</CardTitle>
                <CardDescription>
                  Blockchain-verified voting with real-time audit trails
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center shadow-card">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-success" />
                </div>
                <CardTitle>Accessible for All</CardTitle>
                <CardDescription>
                  Designed for universal accessibility and ease of use
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-government-gray/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-india-saffron mb-2">95M+</div>
              <div className="text-lg text-muted-foreground">Eligible Voters</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-government-blue mb-2">99.9%</div>
              <div className="text-lg text-muted-foreground">System Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-india-green mb-2">100%</div>
              <div className="text-lg text-muted-foreground">Vote Accuracy</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Exercise Your Democratic Right?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join millions of Indian citizens participating in secure digital democracy
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button variant="patriotic" size="lg">
                Get Started Today
              </Button>
            </Link>
            <Link to="/help">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;