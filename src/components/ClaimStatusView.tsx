import { CheckCircle, Clock, AlertCircle, FileText } from "lucide-react";

interface ClaimStatusViewProps {
  showMessage: (message: string) => void;
}

export default function ClaimStatusView({ showMessage }: ClaimStatusViewProps) {
  const claims = [
    {
      id: "CLM-001",
      policyId: "POL-001",
      type: "Death Benefit",
      amount: 250000,
      status: "Under Review",
      submittedDate: "2024-12-15",
      estimatedCompletion: "2024-12-22",
      progress: 60
    },
    {
      id: "CLM-002",
      policyId: "POL-001",
      type: "Disability Benefit",
      amount: 5000,
      status: "Approved",
      submittedDate: "2024-11-28",
      completedDate: "2024-12-05",
      progress: 100
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="text-green-500" size={24} />;
      case "Under Review":
        return <Clock className="text-yellow-500" size={24} />;
      case "Rejected":
        return <AlertCircle className="text-red-500" size={24} />;
      default:
        return <FileText className="text-gray-500" size={24} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Under Review":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <FileText className="text-white" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Claim Status</h2>
          <p className="text-gray-600">Track your insurance claims</p>
        </div>

        <div className="space-y-6">
          {claims.map((claim) => (
            <div key={claim.id} className="bg-gray-50/50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  {getStatusIcon(claim.status)}
                  <div className="ml-3">
                    <h3 className="text-xl font-bold text-gray-900">{claim.type}</h3>
                    <p className="text-gray-600">Claim ID: {claim.id}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(claim.status)}`}>
                  {claim.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600">Policy ID</p>
                  <p className="font-semibold text-gray-900">{claim.policyId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Claim Amount</p>
                  <p className="font-semibold text-gray-900">${claim.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Submitted Date</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(claim.submittedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {claim.status === "Under Review" && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{claim.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${claim.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Estimated completion: {new Date(claim.estimatedCompletion).toLocaleDateString()}
                  </p>
                </div>
              )}

              {claim.status === "Approved" && claim.completedDate && (
                <div className="bg-green-50/50 rounded-xl p-4">
                  <p className="text-green-800 font-medium">
                    ✓ Claim approved and processed on {new Date(claim.completedDate).toLocaleDateString()}
                  </p>
                </div>
              )}

              <button
                onClick={() => showMessage(`Viewing details for claim ${claim.id}`)}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-2 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                View Details
              </button>
            </div>
          ))}
        </div>

        {claims.length === 0 && (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No claims submitted</h3>
            <p className="text-gray-600">When you submit a claim, you'll be able to track its progress here.</p>
          </div>
        )}
      </div>
    </div>
  );
}