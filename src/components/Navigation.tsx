import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Vote, Shield, BarChart3, UserCheck, Home, HelpCircle } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-background border-b shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Vote className="h-8 w-8 text-government-blue" />
            <span className="text-xl font-bold text-foreground">SecureVote</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/">
              <Button 
                variant={isActive("/") ? "government" : "ghost"} 
                size="sm" 
                className="flex items-center space-x-1"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Button>
            </Link>
            
            <Link to="/register">
              <Button 
                variant={isActive("/register") ? "government" : "ghost"} 
                size="sm"
                className="flex items-center space-x-1"
              >
                <UserCheck className="h-4 w-4" />
                <span>Register</span>
              </Button>
            </Link>
            
            <Link to="/vote">
              <Button 
                variant={isActive("/vote") ? "government" : "ghost"} 
                size="sm"
                className="flex items-center space-x-1"
              >
                <Vote className="h-4 w-4" />
                <span>Vote</span>
              </Button>
            </Link>
            
            <Link to="/results">
              <Button 
                variant={isActive("/results") ? "government" : "ghost"} 
                size="sm"
                className="flex items-center space-x-1"
              >
                <BarChart3 className="h-4 w-4" />
                <span>Results</span>
              </Button>
            </Link>
            
            <Link to="/verify">
              <Button 
                variant={isActive("/verify") ? "government" : "ghost"} 
                size="sm"
                className="flex items-center space-x-1"
              >
                <Shield className="h-4 w-4" />
                <span>Verify</span>
              </Button>
            </Link>
            
            <Link to="/help">
              <Button 
                variant={isActive("/help") ? "government" : "ghost"} 
                size="sm"
                className="flex items-center space-x-1"
              >
                <HelpCircle className="h-4 w-4" />
                <span>Help</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;