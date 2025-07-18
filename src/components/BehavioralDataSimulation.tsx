import { useState } from "react";
import { TrendingUp, Activity, Heart, Target, Zap, RefreshCw, Smartphone } from "lucide-react";

interface BehavioralDataSimulationProps {
  showMessage: (message: string) => void;
}

export default function BehavioralDataSimulation({ showMessage }: BehavioralDataSimulationProps) {
  const [data, setData] = useState({
    steps: 8500,
    heartRate: 72,
    sleepHours: 7.5,
    exerciseMinutes: 45,
    stressLevel: 3,
    hydration: 85
  });

  const [discount, setDiscount] = useState(18);
  const [isUpdating, setIsUpdating] = useState(false);

  const updateData = async () => {
    setIsUpdating(true);
    
    // Simulate data fetching
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setData({
      steps: Math.floor(Math.random() * 5000) + 7000,
      heartRate: Math.floor(Math.random() * 20) + 65,
      sleepHours: Math.round((Math.random() * 2 + 6.5) * 10) / 10,
      exerciseMinutes: Math.floor(Math.random() * 40) + 30,
      stressLevel: Math.floor(Math.random() * 5) + 1,
      hydration: Math.floor(Math.random() * 30) + 70
    });
    
    const newDiscount = Math.floor(Math.random() * 20) + 10;
    setDiscount(newDiscount);
    setIsUpdating(false);
    showMessage(`🎯 Health data updated! Your new premium discount: ${newDiscount}%`);
  };

  const metrics = [
    {
      icon: Activity,
      label: "Daily Steps",
      value: data.steps.toLocaleString(),
      target: "10,000",
      color: "from-blue-500 to-cyan-500",
      progress: Math.min((data.steps / 10000) * 100, 100)
    },
    {
      icon: Heart,
      label: "Resting Heart Rate",
      value: `${data.heartRate} bpm`,
      target: "60-100 bpm",
      color: "from-red-500 to-pink-500",
      progress: data.heartRate <= 80 ? 85 : 60
    },
    {
      icon: Target,
      label: "Sleep Duration",
      value: `${data.sleepHours} hours`,
      target: "7-9 hours",
      color: "from-purple-500 to-indigo-500",
      progress: data.sleepHours >= 7 && data.sleepHours <= 9 ? 90 : 70
    },
    {
      icon: TrendingUp,
      label: "Exercise Time",
      value: `${data.exerciseMinutes} min`,
      target: "30+ min",
      color: "from-green-500 to-emerald-500",
      progress: Math.min((data.exerciseMinutes / 60) * 100, 100)
    },
    {
      icon: Zap,
      label: "Stress Level",
      value: `${data.stressLevel}/10`,
      target: "< 4/10",
      color: "from-amber-500 to-orange-500",
      progress: data.stressLevel <= 3 ? 85 : 50
    },
    {
      icon: Activity,
      label: "Hydration",
      value: `${data.hydration}%`,
      target: "80%+",
      color: "from-cyan-500 to-blue-500",
      progress: data.hydration
    }
  ];

  const getDiscountTier = (discount: number) => {
    if (discount >= 25) return { tier: "Platinum", color: "from-purple-600 to-indigo-600" };
    if (discount >= 20) return { tier: "Gold", color: "from-yellow-500 to-orange-500" };
    if (discount >= 15) return { tier: "Silver", color: "from-gray-400 to-gray-600" };
    return { tier: "Bronze", color: "from-amber-600 to-orange-600" };
  };

  const discountTier = getDiscountTier(discount);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-white via-amber-50/50 to-orange-100/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <TrendingUp size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Health & Behavioral Data
          </h1>
          <p className="text-xl text-gray-600">Track your wellness metrics for premium discounts</p>
        </div>
      </div>

      {/* Current Discount Display */}
      <div className={`bg-gradient-to-r ${discountTier.color} rounded-3xl shadow-2xl p-8 text-white overflow-hidden relative`}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-2xl text-lg font-semibold mb-6">
            {discountTier.tier} Member
          </div>
          <h2 className="text-3xl font-bold mb-4">Current Premium Discount</h2>
          <div className="text-7xl font-bold mb-6">{discount}%</div>
          <p className="text-xl mb-8 opacity-90">
            You're saving <span className="font-bold">${Math.round(650 * (discount / 100))}/month</span> on your premium!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
              <p className="text-lg font-semibold mb-2">Monthly Savings</p>
              <p className="text-3xl font-bold">${Math.round(650 * (discount / 100))}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
              <p className="text-lg font-semibold mb-2">Annual Savings</p>
              <p className="text-3xl font-bold">${Math.round(650 * 12 * (discount / 100))}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Health Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-14 h-14 bg-gradient-to-r ${metric.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                <metric.icon className="text-white" size={28} />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                <div className="text-sm text-gray-600">Target: {metric.target}</div>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{metric.label}</h3>
            
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div 
                className={`bg-gradient-to-r ${metric.color} h-3 rounded-full transition-all duration-500`}
                style={{ width: `${metric.progress}%` }}
              ></div>
            </div>
            <div className="text-sm text-gray-600">{Math.round(metric.progress)}% of target</div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          onClick={updateData}
          disabled={isUpdating}
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
        >
          {isUpdating ? (
            <>
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
              Updating...
            </>
          ) : (
            <>
              <RefreshCw className="mr-3" size={24} />
              Refresh Data
            </>
          )}
        </button>
        
        <button
          onClick={() => showMessage("🔗 Wearable device sync coming soon!")}
          className="border-2 border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white py-4 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center justify-center"
        >
          <Smartphone className="mr-3" size={24} />
          Sync Devices
        </button>

        <button
          onClick={() => showMessage("📊 Detailed analytics dashboard coming soon!")}
          className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center"
        >
          <TrendingUp className="mr-3" size={24} />
          View Analytics
        </button>
      </div>

      {/* How It Works */}
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">How Health Rewards Work</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: "1", title: "Connect Devices", description: "Link your fitness trackers and health apps" },
            { step: "2", title: "Track Metrics", description: "Monitor daily activities and health data" },
            { step: "3", title: "Earn Rewards", description: "Achieve health goals to unlock discounts" },
            { step: "4", title: "Save Money", description: "Enjoy reduced premiums automatically" }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-lg mx-auto mb-4 shadow-lg">
                {item.step}
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}