import { useState, useEffect } from "react";
import {
  Home,
  UserPlus,
  LogIn,
  LogOut,
  FileText,
  List,
  TrendingUp,
  Clock,
  Award,
  User,
  Menu,
  X,
} from "lucide-react";

// Import all the view components
import HomeView from "./components/HomeView";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import ProfileView from "./components/ProfileView";
import NewPolicyForm from "./components/NewPolicyForm";
import ListPoliciesView from "./components/ListPoliciesView";
import BehavioralDataSimulation from "./components/BehavioralDataSimulation";
import SubmitClaimForm from "./components/SubmitClaimForm";
import ClaimStatusView from "./components/ClaimStatusView";
import ImpactMetricsView from "./components/ImpactMetricsView";

export default function App() {
  const [currentView, setCurrentView] = useState("home");
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Load token from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("memoryLaneToken");
    const savedUser = localStorage.getItem("memoryLaneUser");
    if (savedToken) {
      setToken(savedToken);
    }
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Show message with auto-hide
  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 4000);
  };

  // Handle logout
  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("memoryLaneToken");
    localStorage.removeItem("memoryLaneUser");
    setCurrentView("home");
    setMobileMenuOpen(false);
    showMessage("Logged out successfully");
  };

  // Navigation items
  const getNavigationItems = () => {
    const baseItems = [
      { id: "home", label: "Home", icon: Home, color: "indigo" }
    ];

    if (!token) {
      return [
        ...baseItems,
        { id: "register", label: "Register", icon: UserPlus, color: "emerald" },
        { id: "login", label: "Login", icon: LogIn, color: "blue" }
      ];
    }

    return [
      ...baseItems,
      { id: "profile", label: "Profile", icon: User, color: "slate" },
      { id: "new-policy", label: "New Policy", icon: FileText, color: "purple" },
      { id: "list-policies", label: "My Policies", icon: List, color: "cyan" },
      { id: "behavioral-data", label: "Health Data", icon: TrendingUp, color: "amber" },
      { id: "submit-claim", label: "Submit Claim", icon: Clock, color: "orange" },
      { id: "impact-metrics", label: "Analytics", icon: Award, color: "rose" }
    ];
  };

  // Render the current view based on state
  const renderView = () => {
    const viewProps = {
      setCurrentView,
      token,
      setToken,
      user,
      setUser,
      showMessage,
    };

    switch (currentView) {
      case "home":
        return <HomeView {...viewProps} />;
      case "register":
        return <RegisterForm {...viewProps} />;
      case "login":
        return <LoginForm {...viewProps} />;
      case "profile":
        return <ProfileView {...viewProps} />;
      case "new-policy":
        return <NewPolicyForm {...viewProps} />;
      case "list-policies":
        return <ListPoliciesView {...viewProps} />;
      case "behavioral-data":
        return <BehavioralDataSimulation {...viewProps} />;
      case "submit-claim":
        return <SubmitClaimForm {...viewProps} />;
      case "claim-status":
        return <ClaimStatusView {...viewProps} />;
      case "impact-metrics":
        return <ImpactMetricsView {...viewProps} />;
      default:
        return <HomeView {...viewProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%236366f1" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40`}></div>
      
      {/* Message Display */}
      {message && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 animate-slideDown">
          <div className="bg-white/95 backdrop-blur-xl border border-white/20 text-gray-800 px-8 py-4 rounded-2xl shadow-2xl text-base font-medium flex items-center space-x-3">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            <span>{message}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="relative z-10 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  MemoryLane
                </h1>
                <p className="text-sm text-gray-600 font-medium">Blockchain Insurance</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {getNavigationItems().map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`flex items-center px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                    currentView === item.id
                      ? `bg-${item.color}-100 text-${item.color}-700 shadow-lg scale-105`
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/80"
                  }`}
                >
                  <item.icon size={18} className="mr-2" />
                  {item.label}
                </button>
              ))}
              
              {token && (
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2.5 rounded-xl font-medium text-sm text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-300 ml-4"
                >
                  <LogOut size={18} className="mr-2" />
                  Logout
                </button>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-white/20">
            <div className="px-4 py-6 space-y-2">
              {getNavigationItems().map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center px-4 py-3 rounded-xl font-medium text-left transition-all duration-300 ${
                    currentView === item.id
                      ? `bg-${item.color}-100 text-${item.color}-700 shadow-lg`
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/80"
                  }`}
                >
                  <item.icon size={20} className="mr-3" />
                  {item.label}
                </button>
              ))}
              
              {token && (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 rounded-xl font-medium text-left text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-300 mt-4 border-t border-gray-200 pt-6"
                >
                  <LogOut size={20} className="mr-3" />
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-fadeIn">
          {renderView()}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-20 bg-white/60 backdrop-blur-xl border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              © 2024 MemoryLane. Securing your future with blockchain technology.
            </p>
            <div className="mt-4 flex justify-center space-x-6 text-xs text-gray-500">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Contact Support</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx global>{`
        .animate-slideDown {
          animation: slideDown 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px) translateX(-50%) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateX(-50%) scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .6; }
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #6366f1, #8b5cf6);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #4f46e5, #7c3aed);
        }
      `}</style>
    </div>
  );
}