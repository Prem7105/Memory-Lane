import { Shield, Users, TrendingUp, Award, ChevronRight, Sparkles, Lock, Zap } from "lucide-react";

interface HomeViewProps {
  setCurrentView: (view: string) => void;
  token: string | null;
  showMessage: (message: string) => void;
}

export default function HomeView({ setCurrentView, token, showMessage }: HomeViewProps) {
  const features = [
    {
      icon: Shield,
      title: "Blockchain Security",
      description: "Your policies are secured by immutable blockchain technology with military-grade encryption",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50"
    },
    {
      icon: Users,
      title: "Community-Driven",
      description: "Join a transparent community where every member contributes to fair insurance practices",
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50"
    },
    {
      icon: TrendingUp,
      title: "Smart Rewards",
      description: "Earn premium discounts through verified healthy lifestyle choices and behavioral data",
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50"
    },
    {
      icon: Award,
      title: "Instant Claims",
      description: "Experience lightning-fast claim processing with automated smart contract verification",
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-50 to-red-50"
    }
  ];

  const stats = [
    { label: "Active Policies", value: "12,847", change: "+23%" },
    { label: "Total Coverage", value: "$2.4B", change: "+18%" },
    { label: "Claims Processed", value: "99.8%", change: "+0.2%" },
    { label: "Avg. Savings", value: "34%", change: "+12%" }
  ];

  const benefits = [
    { icon: Lock, text: "Zero fraud with blockchain verification" },
    { icon: Zap, text: "Claims processed in under 24 hours" },
    { icon: Sparkles, text: "Up to 40% savings on premiums" },
    { icon: Shield, text: "Fully decentralized and transparent" }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative">
        <div className="bg-gradient-to-br from-white via-blue-50/50 to-indigo-100/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-indigo-600/5"></div>
          
          <div className="relative px-8 sm:px-12 py-16 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-blue-800 mb-8">
              <Sparkles className="mr-2" size={16} />
              Revolutionizing Insurance with Blockchain
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                The Future of
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Life Insurance
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Experience transparent, secure, and community-driven life insurance powered by cutting-edge blockchain technology. 
              Join thousands who are already saving up to 40% on their premiums.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {!token ? (
                <>
                  <button
                    onClick={() => setCurrentView("register")}
                    className="group bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white px-10 py-5 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 hover:scale-105 flex items-center"
                  >
                    Start Your Journey
                    <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={24} />
                  </button>
                  <button
                    onClick={() => setCurrentView("login")}
                    className="border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 px-10 py-5 rounded-2xl font-semibold text-lg transition-all duration-300 hover:bg-blue-50 backdrop-blur-sm"
                  >
                    Sign In
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setCurrentView("new-policy")}
                  className="group bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white px-10 py-5 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 hover:scale-105 flex items-center"
                >
                  Create New Policy
                  <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={24} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              {stat.value}
            </div>
            <div className="text-gray-600 font-medium text-sm lg:text-base mb-2">{stat.label}</div>
            <div className="text-green-600 font-semibold text-sm">{stat.change}</div>
          </div>
        ))}
      </section>

      {/* Features Grid */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
            Why Choose MemoryLane?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the next generation of insurance with features designed for the modern world
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-3xl shadow-2xl border border-white/10 p-8 sm:p-12 text-white overflow-hidden relative">
        <div className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50`}></div>
        
        <div className="relative z-10">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold mb-6">
              Join the Insurance Revolution
            </h3>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Experience benefits that traditional insurance simply cannot offer
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="text-white" size={24} />
                </div>
                <span className="text-lg font-medium">{benefit.text}</span>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <button
              onClick={() => showMessage("Learn more about our blockchain technology!")}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105"
            >
              Learn More About Our Technology
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}