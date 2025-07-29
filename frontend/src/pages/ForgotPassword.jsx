import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate API call for password reset
      // In a real app, this would call your backend API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success
      setSuccess(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  if (success) {
    return (
      <div className="flex">
        {/* Left Side - Image */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=1200&fit=crop&crop=center')`
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0A400C]/80 to-[#B0DB9C]/60"></div>
            
            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center items-start p-12 text-white h-full">
              <div className="max-w-md">
                <h1 className="text-4xl font-bold mb-6">
                  Check Your Email
                  <span className="text-[#B0DB9C] block">DailyGrocer</span>
                </h1>
                <p className="text-lg text-gray-200 mb-8">
                  We've sent you a password reset link. Please check your email and follow the instructions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Success Message */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#ECFAE5] min-h-[calc(100vh-64px-100px)]">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
              <div className="mb-6">
                <div className="bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-[#0A400C] mb-2">Email Sent!</h2>
                <p className="text-gray-600 mb-6">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
                <p className="text-sm text-gray-500 mb-8">
                  Please check your email and click the link to reset your password. 
                  The link will expire in 1 hour.
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleBackToLogin}
                  className="w-full bg-[#B0DB9C] text-[#0A400C] hover:bg-[#0A400C] hover:text-white py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Back to Login
                </button>
                
                <div className="text-sm text-gray-500">
                  Didn't receive the email?{' '}
                  <button
                    onClick={() => setSuccess(false)}
                    className="text-[#B0DB9C] hover:text-[#0A400C] font-semibold transition-colors"
                  >
                    Try again
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=1200&fit=crop&crop=center')`
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A400C]/80 to-[#B0DB9C]/60"></div>
          
          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center items-start p-12 text-white h-full">
            <div className="max-w-md">
              <h1 className="text-4xl font-bold mb-6">
                Forgot Your
                <span className="text-[#B0DB9C] block">Password?</span>
              </h1>
              <p className="text-lg text-gray-200 mb-8">
                No worries! Enter your email address and we'll send you a link to reset your password.
              </p>
              
              {/* Features */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#B0DB9C] rounded-full"></div>
                  <span>Quick and secure password reset</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#B0DB9C] rounded-full"></div>
                  <span>Link expires in 1 hour</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#B0DB9C] rounded-full"></div>
                  <span>Check your spam folder if needed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Forgot Password Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#ECFAE5] min-h-[calc(100vh-64px-100px)]">
        <div className="max-w-md w-full">
          {/* Forgot Password Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#0A400C] mb-2">Reset Password</h2>
              <p className="text-gray-600">Enter your email to receive a password reset link</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#0A400C] mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B0DB9C] focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !email}
                className="w-full bg-[#B0DB9C] text-[#0A400C] hover:bg-[#0A400C] hover:text-white py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{loading ? 'Sending...' : 'Send Reset Link'}</span>
              </button>
            </form>

            {/* Back to Login Link */}
            <div className="text-center mt-8">
              <button
                onClick={handleBackToLogin}
                className="flex items-center justify-center space-x-2 text-[#B0DB9C] hover:text-[#0A400C] font-semibold transition-colors mx-auto"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Login</span>
              </button>
            </div>

            {/* Additional Help */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-semibold text-[#0A400C] mb-2">Need Help?</h4>
              <p className="text-xs text-gray-600">
                If you're still having trouble, contact our support team at{' '}
                <a href="mailto:support@dailygrocer.com" className="text-[#B0DB9C] hover:text-[#0A400C]">
                  support@dailygrocer.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 