import { Shield, DollarSign, Calendar, Eye, Download, MoreVertical } from "lucide-react";

interface ListPoliciesViewProps {
  showMessage: (message: string) => void;
}

export default function ListPoliciesView({ showMessage }: ListPoliciesViewProps) {
  const policies = [
    {
      id: "POL-001",
      type: "Term Life Insurance",
      coverage: 250000,
      premium: 375,
      status: "Active",
      startDate: "2024-01-15",
      endDate: "2044-01-15",
      beneficiary: "Jane Doe",
      nextPayment: "2024-12-15",
      healthDiscount: 18
    },
    {
      id: "POL-002",
      type: "Whole Life Insurance",
      coverage: 100000,
      premium: 180,
      status: "Pending",
      startDate: "2024-12-01",
      endDate: "Lifetime",
      beneficiary: "John Smith",
      nextPayment: "2024-12-01",
      healthDiscount: 12
    },
    {
      id: "POL-003",
      type: "Universal Life Insurance",
      coverage: 500000,
      premium: 650,
      status: "Under Review",
      startDate: "2024-12-20",
      endDate: "2054-12-20",
      beneficiary: "Sarah Johnson",
      nextPayment: "2024-12-20",
      healthDiscount: 22
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Under Review":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Expired":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return "🟢";
      case "Pending":
        return "🟡";
      case "Under Review":
        return "🔵";
      case "Expired":
        return "🔴";
      default:
        return "⚪";
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-white via-cyan-50/50 to-blue-100/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Shield size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            My Insurance Policies
          </h1>
          <p className="text-xl text-gray-600">Manage and monitor your life insurance coverage</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-cyan-600 mb-2">3</div>
            <div className="text-gray-600 font-medium">Active Policies</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">$850K</div>
            <div className="text-gray-600 font-medium">Total Coverage</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">17%</div>
            <div className="text-gray-600 font-medium">Avg. Savings</div>
          </div>
        </div>
      </div>

      {/* Policies List */}
      <div className="space-y-6">
        {policies.map((policy) => (
          <div key={policy.id} className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-8">
              {/* Policy Header */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Shield className="text-white" size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{policy.type}</h3>
                    <p className="text-gray-600 font-medium">Policy ID: {policy.id}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className={`px-4 py-2 rounded-xl text-sm font-semibold border ${getStatusColor(policy.status)}`}>
                    {getStatusIcon(policy.status)} {policy.status}
                  </span>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>

              {/* Policy Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-gray-50/50 rounded-2xl p-4">
                  <div className="flex items-center text-gray-600 mb-2">
                    <DollarSign size={18} className="mr-2" />
                    <span className="text-sm font-medium">Coverage Amount</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">${policy.coverage.toLocaleString()}</p>
                </div>
                
                <div className="bg-gray-50/50 rounded-2xl p-4">
                  <div className="flex items-center text-gray-600 mb-2">
                    <DollarSign size={18} className="mr-2" />
                    <span className="text-sm font-medium">Monthly Premium</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">${policy.premium}</p>
                  <p className="text-sm text-green-600 font-medium">{policy.healthDiscount}% health discount</p>
                </div>
                
                <div className="bg-gray-50/50 rounded-2xl p-4">
                  <div className="flex items-center text-gray-600 mb-2">
                    <Calendar size={18} className="mr-2" />
                    <span className="text-sm font-medium">Policy Term</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">
                    {new Date(policy.startDate).getFullYear()} - {policy.endDate === "Lifetime" ? "Lifetime" : new Date(policy.endDate).getFullYear()}
                  </p>
                </div>
                
                <div className="bg-gray-50/50 rounded-2xl p-4">
                  <div className="text-gray-600 mb-2">
                    <span className="text-sm font-medium">Primary Beneficiary</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{policy.beneficiary}</p>
                </div>
              </div>

              {/* Next Payment Info */}
              {policy.status === "Active" && (
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Next Payment Due</p>
                      <p className="text-lg font-bold text-blue-600">
                        {new Date(policy.nextPayment).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <button
                      onClick={() => showMessage("Payment functionality coming soon!")}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium transition-colors duration-300"
                    >
                      Pay Now
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => showMessage(`Viewing details for policy ${policy.id}`)}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
                >
                  <Eye className="mr-2" size={20} />
                  View Details
                </button>
                
                <button
                  onClick={() => showMessage("Document download coming soon!")}
                  className="flex-1 border-2 border-cyan-500 text-cyan-600 hover:bg-cyan-500 hover:text-white py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center"
                >
                  <Download className="mr-2" size={20} />
                  Download Policy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {policies.length === 0 && (
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-12 text-center">
          <Shield className="mx-auto h-16 w-16 text-gray-400 mb-6" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">No policies yet</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Create your first policy to get started with MemoryLane's blockchain-powered insurance.
          </p>
          <button
            onClick={() => showMessage("Redirecting to new policy form...")}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Create Your First Policy
          </button>
        </div>
      )}
    </div>
  );
}