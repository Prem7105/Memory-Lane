import { useState } from "react";
import { FileText, DollarSign, Calendar, Shield, Users, Calculator } from "lucide-react";

interface NewPolicyFormProps {
  showMessage: (message: string) => void;
  setCurrentView: (view: string) => void;
}

export default function NewPolicyForm({ showMessage, setCurrentView }: NewPolicyFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    policyType: "term-life",
    coverageAmount: "",
    term: "20",
    beneficiary: "",
    beneficiaryRelation: "",
    medicalHistory: "",
    lifestyle: {
      smoking: "no",
      drinking: "occasional",
      exercise: "regular"
    }
  });
  const [loading, setLoading] = useState(false);

  const steps = [
    { number: 1, title: "Policy Type", icon: Shield },
    { number: 2, title: "Coverage Details", icon: DollarSign },
    { number: 3, title: "Beneficiary Info", icon: Users },
    { number: 4, title: "Health & Lifestyle", icon: FileText }
  ];

  const calculatePremium = () => {
    if (!formData.coverageAmount) return 0;
    const baseRate = parseInt(formData.coverageAmount) * 0.0012;
    const termMultiplier = parseInt(formData.term) <= 20 ? 1 : 1.3;
    const lifestyleDiscount = formData.lifestyle.smoking === "no" ? 0.85 : 1;
    return Math.round(baseRate * termMultiplier * lifestyleDiscount);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2500));
      showMessage("🎉 Policy application submitted successfully! We'll review it within 24 hours.");
      setCurrentView("list-policies");
    } catch (error) {
      showMessage("Failed to submit policy application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Policy Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { value: "term-life", title: "Term Life", description: "Affordable coverage for a specific period", recommended: true },
                { value: "whole-life", title: "Whole Life", description: "Lifetime coverage with cash value" },
                { value: "universal-life", title: "Universal Life", description: "Flexible premiums and death benefits" }
              ].map((option) => (
                <div
                  key={option.value}
                  onClick={() => setFormData(prev => ({ ...prev, policyType: option.value }))}
                  className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                    formData.policyType === option.value
                      ? 'border-purple-500 bg-purple-50/50 shadow-lg'
                      : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/20'
                  }`}
                >
                  {option.recommended && (
                    <div className="absolute -top-3 left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Recommended
                    </div>
                  )}
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{option.title}</h4>
                  <p className="text-gray-600 text-sm">{option.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Coverage Details</h3>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Coverage Amount</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="number"
                  value={formData.coverageAmount}
                  onChange={(e) => setFormData(prev => ({ ...prev, coverageAmount: e.target.value }))}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 bg-gray-50/50"
                  placeholder="Enter coverage amount"
                  min="50000"
                  step="10000"
                />
              </div>
              <p className="mt-2 text-sm text-gray-600">Minimum coverage: $50,000</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Term Length</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["10", "15", "20", "30"].map((term) => (
                  <button
                    key={term}
                    onClick={() => setFormData(prev => ({ ...prev, term }))}
                    className={`p-4 rounded-2xl border-2 font-medium transition-all duration-300 ${
                      formData.term === term
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-purple-300 text-gray-700'
                    }`}
                  >
                    {term} Years
                  </button>
                ))}
              </div>
            </div>

            {formData.coverageAmount && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <Calculator className="text-purple-600 mr-3" size={24} />
                  <h4 className="text-lg font-semibold text-gray-900">Estimated Premium</h4>
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  ${calculatePremium()}/month
                </div>
                <p className="text-sm text-gray-600">
                  *Estimate based on coverage amount and term. Final premium determined after underwriting.
                </p>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Beneficiary Information</h3>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Primary Beneficiary Name</label>
              <input
                type="text"
                value={formData.beneficiary}
                onChange={(e) => setFormData(prev => ({ ...prev, beneficiary: e.target.value }))}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 bg-gray-50/50"
                placeholder="Enter beneficiary full name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Relationship to You</label>
              <select
                value={formData.beneficiaryRelation}
                onChange={(e) => setFormData(prev => ({ ...prev, beneficiaryRelation: e.target.value }))}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 bg-gray-50/50"
              >
                <option value="">Select relationship</option>
                <option value="spouse">Spouse</option>
                <option value="child">Child</option>
                <option value="parent">Parent</option>
                <option value="sibling">Sibling</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="bg-amber-50/50 rounded-2xl p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Important Notes</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• You can add multiple beneficiaries after policy approval</li>
                <li>• Beneficiary information is stored securely on blockchain</li>
                <li>• Changes to beneficiaries require identity verification</li>
              </ul>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Health & Lifestyle</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Smoking Status</label>
                <select
                  value={formData.lifestyle.smoking}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    lifestyle: { ...prev.lifestyle, smoking: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 bg-gray-50/50"
                >
                  <option value="no">Non-smoker</option>
                  <option value="former">Former smoker</option>
                  <option value="yes">Current smoker</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Alcohol Consumption</label>
                <select
                  value={formData.lifestyle.drinking}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    lifestyle: { ...prev.lifestyle, drinking: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 bg-gray-50/50"
                >
                  <option value="none">None</option>
                  <option value="occasional">Occasional</option>
                  <option value="moderate">Moderate</option>
                  <option value="heavy">Heavy</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Exercise Frequency</label>
                <select
                  value={formData.lifestyle.exercise}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    lifestyle: { ...prev.lifestyle, exercise: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 bg-gray-50/50"
                >
                  <option value="none">None</option>
                  <option value="light">Light (1-2 times/week)</option>
                  <option value="regular">Regular (3-4 times/week)</option>
                  <option value="intense">Intense (5+ times/week)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Medical History Summary</label>
              <textarea
                value={formData.medicalHistory}
                onChange={(e) => setFormData(prev => ({ ...prev, medicalHistory: e.target.value }))}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 bg-gray-50/50 h-32 resize-none"
                placeholder="Please provide a brief summary of your medical history, current medications, and any chronic conditions..."
              />
            </div>

            <div className="bg-green-50/50 rounded-2xl p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Health Data Integration</h4>
              <p className="text-sm text-gray-600 mb-4">
                Connect your fitness trackers and health apps to get better premium rates based on your healthy lifestyle.
              </p>
              <button
                onClick={() => showMessage("Health data integration coming soon!")}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-medium transition-colors duration-300"
              >
                Connect Health Apps
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 p-8 text-white">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText size={40} />
            </div>
            <h1 className="text-3xl font-bold mb-2">New Policy Application</h1>
            <p className="text-purple-100">Create your personalized life insurance policy</p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center">
            <div className="flex items-center space-x-4">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-semibold transition-all duration-300 ${
                    currentStep >= step.number
                      ? 'bg-white text-purple-600'
                      : 'bg-white/20 text-white'
                  }`}>
                    {currentStep > step.number ? '✓' : step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-1 mx-2 rounded transition-all duration-300 ${
                      currentStep > step.number ? 'bg-white' : 'bg-white/20'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8">
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-12">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold transition-all duration-300 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {currentStep < 4 ? (
              <button
                onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Next Step
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    Submitting...
                  </div>
                ) : (
                  "Submit Application"
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}