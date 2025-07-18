import { User, Mail, Phone, Calendar, Edit, Shield, Award, TrendingUp } from "lucide-react";

interface ProfileViewProps {
  user: any;
  showMessage: (message: string) => void;
}

export default function ProfileView({ user, showMessage }: ProfileViewProps) {
  if (!user) return null;

  const membershipDays = Math.floor((Date.now() - new Date(user.joinDate).getTime()) / (1000 * 60 * 60 * 24));
  
  const stats = [
    { label: "Active Policies", value: "3", icon: Shield, color: "from-blue-500 to-cyan-500" },
    { label: "Total Coverage", value: "$450K", icon: Award, color: "from-purple-500 to-pink-500" },
    { label: "Premium Savings", value: "18%", icon: TrendingUp, color: "from-green-500 to-emerald-500" }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-white via-blue-50/50 to-indigo-100/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 text-white">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center">
              <User size={64} />
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
              <p className="text-blue-100 text-lg mb-4">Premium Member</p>
              <div className="flex flex-col sm:flex-row gap-4 text-sm">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                  <span className="text-blue-100">Member for</span>
                  <span className="font-semibold ml-2">{membershipDays} days</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                  <span className="text-blue-100">Status</span>
                  <span className="font-semibold ml-2 text-green-300">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <stat.icon className="text-white" size={32} />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => showMessage("Profile editing functionality coming soon!")}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center"
          >
            <Edit className="mr-3" size={24} />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Personal Information */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <User className="mr-3 text-blue-600" size={28} />
            Personal Information
          </h2>
          
          <div className="space-y-6">
            <div className="bg-gray-50/50 rounded-2xl p-6">
              <div className="flex items-center mb-3">
                <User className="text-blue-600 mr-3" size={20} />
                <h3 className="font-semibold text-gray-900">Full Name</h3>
              </div>
              <p className="text-gray-700 text-lg">{user.name}</p>
            </div>

            <div className="bg-gray-50/50 rounded-2xl p-6">
              <div className="flex items-center mb-3">
                <Mail className="text-blue-600 mr-3" size={20} />
                <h3 className="font-semibold text-gray-900">Email Address</h3>
              </div>
              <p className="text-gray-700 text-lg">{user.email}</p>
            </div>

            <div className="bg-gray-50/50 rounded-2xl p-6">
              <div className="flex items-center mb-3">
                <Phone className="text-blue-600 mr-3" size={20} />
                <h3 className="font-semibold text-gray-900">Phone Number</h3>
              </div>
              <p className="text-gray-700 text-lg">{user.phone}</p>
            </div>

            <div className="bg-gray-50/50 rounded-2xl p-6">
              <div className="flex items-center mb-3">
                <Calendar className="text-blue-600 mr-3" size={20} />
                <h3 className="font-semibold text-gray-900">Member Since</h3>
              </div>
              <p className="text-gray-700 text-lg">
                {new Date(user.joinDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Account Security */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Shield className="mr-3 text-green-600" size={28} />
            Account Security
          </h2>
          
          <div className="space-y-6">
            <div className="bg-green-50/50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Two-Factor Authentication</h3>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Enabled</span>
              </div>
              <p className="text-gray-600 text-sm">Your account is protected with 2FA</p>
            </div>

            <div className="bg-blue-50/50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Password</h3>
                <button
                  onClick={() => showMessage("Password change functionality coming soon!")}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-300"
                >
                  Change
                </button>
              </div>
              <p className="text-gray-600 text-sm">Last updated 30 days ago</p>
            </div>

            <div className="bg-purple-50/50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Blockchain Wallet</h3>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">Connected</span>
              </div>
              <p className="text-gray-600 text-sm">0x1234...5678</p>
            </div>

            <div className="bg-amber-50/50 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Recent Activity</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Logged in from Chrome on Windows</p>
                <p>• Policy premium payment processed</p>
                <p>• Behavioral data sync completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}