import { Award, Users, DollarSign, TrendingUp, Zap, Shield } from "lucide-react";

interface ImpactMetricsViewProps {
  showMessage: (message: string) => void;
}

export default function ImpactMetricsView({ showMessage }: ImpactMetricsViewProps) {
  const metrics = [
    {
      icon: Users,
      title: "Active Policyholders",
      value: "2,847",
      change: "+12.3%",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: DollarSign,
      title: "Total Coverage",
      value: "$12.4M",
      change: "+8.7%",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Shield,
      title: "Claims Processed",
      value: "1,234",
      change: "+15.2%",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: TrendingUp,
      title: "Avg. Premium Discount",
      value: "14.2%",
      change: "+2.1%",
      color: "from-orange-500 to-red-500"
    }
  ];

  const blockchainMetrics = [
    {
      label: "Smart Contracts Executed",
      value: "45,892",
      icon: Zap
    },
    {
      label: "Blockchain Transactions",
      value: "189,234",
      icon: Award
    },
    {
      label: "Data Verification Rate",
      value: "99.97%",
      icon: Shield
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Award className="text-white" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Impact Metrics</h2>
          <p className="text-gray-600">Platform performance and blockchain transparency</p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-gray-50/50 rounded-2xl p-6">
              <div className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                <metric.icon className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{metric.title}</h3>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold text-gray-800">{metric.value}</span>
                <span className="text-sm font-medium text-green-600">{metric.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Blockchain Transparency Section */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Blockchain Transparency</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blockchainMetrics.map((metric, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <metric.icon className="text-white" size={24} />
                </div>
                <p className="text-sm text-gray-600 mb-2">{metric.label}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Community Impact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-green-50/50 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Community Benefits</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                $2.3M saved through behavioral incentives
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                98.7% customer satisfaction rate
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                24-hour average claim processing time
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Zero fraudulent claims detected
              </li>
            </ul>
          </div>

          <div className="bg-blue-50/50 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Technology Impact</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                100% immutable policy records
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Real-time premium adjustments
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Automated claim verification
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Decentralized data storage
              </li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => showMessage("Detailed analytics dashboard coming soon!")}
            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            View Detailed Analytics
          </button>
          <button
            onClick={() => showMessage("Blockchain explorer integration coming soon!")}
            className="border-2 border-gray-600 text-gray-700 hover:bg-gray-600 hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300"
          >
            Explore Blockchain
          </button>
        </div>
      </div>
    </div>
  );
}