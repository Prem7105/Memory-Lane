import { useState } from "react";
import { Clock, FileText, Upload, Calendar, AlertCircle, CheckCircle } from "lucide-react";

interface SubmitClaimFormProps {
  showMessage: (message: string) => void;
  setCurrentView: (view: string) => void;
}

export default function SubmitClaimForm({ showMessage, setCurrentView }: SubmitClaimFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    policyId: "POL-001",
    claimType: "death-benefit",
    incidentDate: "",
    description: "",
    amount: "",
    contactInfo: {
      name: "",
      phone: "",
      email: "",
      relationship: ""
    }
  });
  const [loading, setLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const steps = [
    { number: 1, title: "Claim Details", icon: FileText },
    { number: 2, title: "Documentation", icon: Upload },
    { number: 3, title: "Contact Info", icon: Clock },
    { number: 4, title: "Review & Submit", icon: CheckCircle }
  ];

  const claimTypes = [
    { value: "death-benefit", label: "Death Benefit", description: "Primary beneficiary claim" },
    { value: "disability", label: "Disability Benefit", description: "Permanent or temporary disability" },
    { value: "critical-illness", label: "Critical Illness", description: "Covered critical illness diagnosis" },
    { value: "accidental-death", label: "Accidental Death", description: "Accidental death benefit" }
  ];

  const requiredDocuments = {
    "death-benefit": [
      "Death certificate (certified copy)",
      "Policy documents",
      "Beneficiary identification",
      "Medical records (if applicable)"
    ],
    "disability": [
      "Medical records and diagnosis",
      "Physician's statement",
      "Employment records",
      "Disability assessment report"
    ],
    "critical-illness": [
      "Medical diagnosis report",
      "Physician's statement",
      "Hospital records",
      "Treatment documentation"
    ],
    "accidental-death": [
      "Death certificate",
      "Police report",
      "Accident report",
      "Medical examiner's report"
    ]
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      showMessage("🎉 Claim submitted successfully! You'll receive updates via email and SMS.");
      setCurrentView("claim-status");
    } catch (error) {
      showMessage("Failed to submit claim. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Claim Information</h3>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Select Policy</label>
              <select
                value={formData.policyId}
                onChange={(e) => setFormData(prev => ({ ...prev, policyId: e.target.value }))}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 bg-gray-50/50"
              >
                <option value="POL-001">POL-001 - Term Life Insurance ($250,000)</option>
                <option value="POL-002">POL-002 - Whole Life Insurance ($100,000)</option>
                <option value="POL-003">POL-003 - Universal Life Insurance ($500,000)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Claim Type</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {claimTypes.map((type) => (
                  <div
                    key={type.value}
                    onClick={() => setFormData(prev => ({ ...prev, claimType: type.value }))}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                      formData.claimType === type.value
                        ? 'border-orange-500 bg-orange-50/50 shadow-lg'
                        : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50/20'
                    }`}
                  >
                    <h4 className="font-semibold text-gray-900 mb-1">{type.label}</h4>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Incident Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="date"
                  value={formData.incidentDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, incidentDate: e.target.value }))}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 bg-gray-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Claim Amount</label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 bg-gray-50/50"
                placeholder="Enter claim amount"
                min="100"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Description of Incident</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 bg-gray-50/50 h-32 resize-none"
                placeholder="Please provide detailed information about the incident..."
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Required Documentation</h3>
            
            <div className="bg-blue-50/50 rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <AlertCircle className="text-blue-600 mr-3" size={24} />
                <h4 className="text-lg font-semibold text-gray-900">Documents Required for {claimTypes.find(t => t.value === formData.claimType)?.label}</h4>
              </div>
              <ul className="space-y-2">
                {requiredDocuments[formData.claimType as keyof typeof requiredDocuments]?.map((doc, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    {doc}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-orange-400 transition-colors duration-300">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Upload Documents</h4>
              <p className="text-gray-600 mb-4">Drag and drop files here, or click to browse</p>
              <button
                onClick={() => {
                  const newFile = `document_${Date.now()}.pdf`;
                  setUploadedFiles(prev => [...prev, newFile]);
                  showMessage("Document uploaded successfully!");
                }}
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-300"
              >
                Choose Files
              </button>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="bg-green-50/50 rounded-2xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Uploaded Documents</h4>
                <div className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-white rounded-xl p-3">
                      <div className="flex items-center">
                        <FileText className="text-green-600 mr-3" size={20} />
                        <span className="text-gray-700">{file}</span>
                      </div>
                      <CheckCircle className="text-green-600" size={20} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Full Name</label>
                <input
                  type="text"
                  value={formData.contactInfo.name}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    contactInfo: { ...prev.contactInfo, name: e.target.value }
                  }))}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 bg-gray-50/50"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Phone Number</label>
                <input
                  type="tel"
                  value={formData.contactInfo.phone}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    contactInfo: { ...prev.contactInfo, phone: e.target.value }
                  }))}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 bg-gray-50/50"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Email Address</label>
                <input
                  type="email"
                  value={formData.contactInfo.email}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    contactInfo: { ...prev.contactInfo, email: e.target.value }
                  }))}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 bg-gray-50/50"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Relationship to Insured</label>
                <select
                  value={formData.contactInfo.relationship}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    contactInfo: { ...prev.contactInfo, relationship: e.target.value }
                  }))}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 bg-gray-50/50"
                >
                  <option value="">Select relationship</option>
                  <option value="self">Self</option>
                  <option value="spouse">Spouse</option>
                  <option value="child">Child</option>
                  <option value="parent">Parent</option>
                  <option value="beneficiary">Beneficiary</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Review Your Claim</h3>
            
            <div className="bg-gray-50/50 rounded-2xl p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Policy ID</p>
                  <p className="text-lg font-semibold text-gray-900">{formData.policyId}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Claim Type</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {claimTypes.find(t => t.value === formData.claimType)?.label}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Incident Date</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {formData.incidentDate ? new Date(formData.incidentDate).toLocaleDateString() : 'Not specified'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Claim Amount</p>
                  <p className="text-lg font-semibold text-gray-900">${formData.amount || 'Not specified'}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-600">Contact Person</p>
                <p className="text-lg font-semibold text-gray-900">{formData.contactInfo.name || 'Not specified'}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-600">Documents Uploaded</p>
                <p className="text-lg font-semibold text-gray-900">{uploadedFiles.length} files</p>
              </div>
            </div>

            <div className="bg-blue-50/50 rounded-2xl p-6">
              <h4 className="font-semibold text-gray-900 mb-3">What happens next?</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Your claim will be reviewed within 24-48 hours</li>
                <li>• You'll receive email and SMS updates on progress</li>
                <li>• Additional documentation may be requested if needed</li>
                <li>• Approved claims are processed via smart contract</li>
              </ul>
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
        <div className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 p-8 text-white">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Clock size={40} />
            </div>
            <h1 className="text-3xl font-bold mb-2">Submit Insurance Claim</h1>
            <p className="text-orange-100">Fast, transparent claim processing with blockchain verification</p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center">
            <div className="flex items-center space-x-4">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-semibold transition-all duration-300 ${
                    currentStep >= step.number
                      ? 'bg-white text-orange-600'
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
                className="px-8 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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
                    Submitting Claim...
                  </div>
                ) : (
                  "Submit Claim"
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}