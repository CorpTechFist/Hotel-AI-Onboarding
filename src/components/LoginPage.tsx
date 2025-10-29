import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Smartphone, Users, Eye, EyeOff, ArrowRight, Shield, Hotel, Sparkles, Chrome } from 'lucide-react';

interface LoginPageProps {
  onLogin: (userInfo: any, userType: 'guest' | 'staff') => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [selectedRole, setSelectedRole] = useState<'guest' | 'staff'>('guest');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (selectedRole === 'guest') {
        onLogin({
          id: 'guest-001',
          name: 'Sarah Johnson',
          email: formData.email,
          room: '1205',
          checkIn: '2024-03-15',
          checkOut: '2024-03-18',
          preferences: {
            language: 'en',
            temperature: 22,
            lighting: 'warm'
          }
        }, 'guest');
      } else {
        // For staff, we'll need role selection next
        onLogin({
          id: 'staff-001',
          name: 'Ahmed Al-Hassan',
          email: formData.email,
          department: 'pending-selection', // Will be updated after role selection
          shift: 'morning'
        }, 'staff');
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleDemoLogin = () => {
    if (selectedRole === 'guest') {
      setFormData({
        email: 'sarah.johnson@email.com',
        password: 'demo123'
      });
    } else {
      setFormData({
        email: 'ahmed.hassan@neom.com',
        password: 'staff123'
      });
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    setIsLoading(true);
    
    // Simulate social login API call
    setTimeout(() => {
      if (selectedRole === 'guest') {
        onLogin({
          id: 'guest-social-001',
          name: provider === 'google' ? 'Emma Thompson' : 'Michael Chen',
          email: provider === 'google' ? 'emma.thompson@gmail.com' : 'michael.chen@icloud.com',
          room: '1208',
          checkIn: '2024-03-15',
          checkOut: '2024-03-18',
          preferences: {
            language: 'en',
            temperature: 22,
            lighting: 'warm'
          },
          authProvider: provider
        }, 'guest');
      } else {
        onLogin({
          id: 'staff-social-001',
          name: provider === 'google' ? 'Lisa Park' : 'David Kim',
          email: provider === 'google' ? 'lisa.park@neom.com' : 'david.kim@neom.com',
          department: 'pending-selection',
          shift: 'morning',
          authProvider: provider
        }, 'staff');
      }
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      selectedRole === 'guest' 
        ? 'bg-gradient-to-br from-white via-gray-50 to-emerald-50' 
        : 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
    }`}>
      {/* Header */}
      <div className={`border-b shadow-sm transition-colors duration-500 ${
        selectedRole === 'guest' 
          ? 'bg-white/80 backdrop-blur-sm border-gray-200' 
          : 'bg-slate-800/80 backdrop-blur-sm border-slate-700'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-neom-midnight flex items-center justify-center">
                <span className="text-white font-semibold">N</span>
              </div>
              <div>
                <h1 className={`text-xl font-semibold transition-colors duration-500 ${
                  selectedRole === 'guest' ? 'text-neom-midnight' : 'text-white'
                }`}>
                  NEOM Hospitality OS
                </h1>
                <p className={`text-sm transition-colors duration-500 ${
                  selectedRole === 'guest' ? 'text-gray-500' : 'text-slate-400'
                }`}>
                  Next-Generation Hotel Management System
                </p>
              </div>
            </div>
            <Badge 
              variant="secondary" 
              className={`transition-colors duration-500 ${
                selectedRole === 'guest' 
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-200' 
                  : 'bg-slate-700 text-slate-200 border-slate-600'
              }`}
            >
              Live Demo
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <div className="w-full max-w-md space-y-6">
          
          {/* Role Selection */}
          <div className="text-center space-y-4">
            <div className={`transition-colors duration-500 ${
              selectedRole === 'guest' ? 'text-neom-midnight' : 'text-white'
            }`}>
              <Hotel className="w-12 h-12 mx-auto mb-3" />
              <h2 className="text-2xl font-semibold">Welcome to NEOM</h2>
              <p className={`text-sm ${
                selectedRole === 'guest' ? 'text-gray-600' : 'text-slate-300'
              }`}>
                Please select your access type to continue
              </p>
            </div>

            {/* Role Toggle */}
            <div className="flex space-x-2 p-1 bg-gray-100 dark:bg-slate-700 rounded-xl">
              <button
                onClick={() => setSelectedRole('guest')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-300 ${
                  selectedRole === 'guest'
                    ? 'bg-white text-neom-midnight shadow-md'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span className="font-medium">Guest</span>
              </button>
              <button
                onClick={() => setSelectedRole('staff')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-300 ${
                  selectedRole === 'staff'
                    ? 'bg-slate-700 text-white shadow-md'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Users className="w-4 h-4" />
                <span className="font-medium">Staff</span>
              </button>
            </div>
          </div>

          {/* Login Form */}
          <Card className={`p-6 neom-fade-in transition-all duration-500 ${
            selectedRole === 'guest' 
              ? 'bg-white shadow-xl border-gray-200' 
              : 'bg-slate-800 shadow-2xl border-slate-700'
          }`}>
            
            {/* Demo Login Helper */}
            <div className={`mb-6 p-3 rounded-lg border-2 border-dashed transition-colors duration-500 ${
              selectedRole === 'guest'
                ? 'bg-emerald-50 border-emerald-300'
                : 'bg-slate-700 border-slate-500'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sparkles className={`w-4 h-4 ${
                    selectedRole === 'guest' ? 'text-emerald-600' : 'text-slate-300'
                  }`} />
                  <span className={`text-sm font-medium ${
                    selectedRole === 'guest' ? 'text-emerald-800' : 'text-slate-200'
                  }`}>
                    Demo Login
                  </span>
                </div>
                <Button
                  onClick={handleDemoLogin}
                  variant="ghost"
                  size="sm"
                  className={`text-xs ${
                    selectedRole === 'guest'
                      ? 'text-emerald-700 hover:text-emerald-800 hover:bg-emerald-100'
                      : 'text-slate-300 hover:text-slate-200 hover:bg-slate-600'
                  }`}
                >
                  Fill Demo Data
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label 
                  htmlFor="email" 
                  className={`transition-colors duration-500 ${
                    selectedRole === 'guest' ? 'text-gray-700' : 'text-slate-200'
                  }`}
                >
                  Email / Username
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={selectedRole === 'guest' ? 'guest@example.com' : 'staff@neom.com'}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`mt-1 transition-colors duration-500 ${
                    selectedRole === 'guest'
                      ? 'bg-gray-50 border-gray-300 focus:border-neom-emerald focus:ring-neom-emerald/20'
                      : 'bg-slate-700 border-slate-600 text-white focus:border-slate-400 focus:ring-slate-400/20'
                  }`}
                />
              </div>

              <div>
                <Label 
                  htmlFor="password" 
                  className={`transition-colors duration-500 ${
                    selectedRole === 'guest' ? 'text-gray-700' : 'text-slate-200'
                  }`}
                >
                  Password
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`pr-10 transition-colors duration-500 ${
                      selectedRole === 'guest'
                        ? 'bg-gray-50 border-gray-300 focus:border-neom-emerald focus:ring-neom-emerald/20'
                        : 'bg-slate-700 border-slate-600 text-white focus:border-slate-400 focus:ring-slate-400/20'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-500 ${
                      selectedRole === 'guest' ? 'text-gray-400 hover:text-gray-600' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                onClick={handleLogin}
                disabled={!formData.email || !formData.password || isLoading}
                className={`w-full group transition-all duration-300 ${
                  selectedRole === 'guest'
                    ? 'bg-neom-midnight hover:bg-neom-midnight/90 text-white'
                    : 'bg-slate-600 hover:bg-slate-500 text-white'
                } disabled:opacity-50 disabled:cursor-not-allowed neom-shrink-press`}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>
                      {selectedRole === 'guest' ? 'Access Guest Portal' : 'Access Staff System'}
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </Button>

              {/* Divider */}
              <div className="relative my-6">
                <div className={`absolute inset-0 flex items-center transition-colors duration-500`}>
                  <div className={`w-full border-t ${
                    selectedRole === 'guest' ? 'border-gray-300' : 'border-slate-600'
                  }`} />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className={`px-3 transition-colors duration-500 ${
                    selectedRole === 'guest' 
                      ? 'bg-white text-gray-500' 
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    or continue with
                  </span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-3">
                {/* Google Login */}
                <Button
                  onClick={() => handleSocialLogin('google')}
                  disabled={isLoading}
                  variant="outline"
                  className={`w-full group transition-all duration-300 ${
                    selectedRole === 'guest'
                      ? 'bg-white hover:bg-gray-50 border-gray-300 text-gray-700 hover:border-gray-400'
                      : 'bg-slate-700 hover:bg-slate-600 border-slate-600 text-slate-200 hover:border-slate-500'
                  } disabled:opacity-50 disabled:cursor-not-allowed neom-shrink-press`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-5 h-5">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    </div>
                    <span className="font-medium">Continue with Google</span>
                  </div>
                </Button>

                {/* Apple Login */}
                <Button
                  onClick={() => handleSocialLogin('apple')}
                  disabled={isLoading}
                  variant="outline"
                  className={`w-full group transition-all duration-300 ${
                    selectedRole === 'guest'
                      ? 'bg-black hover:bg-gray-900 border-black text-white'
                      : 'bg-gray-900 hover:bg-black border-gray-800 text-white hover:border-gray-900'
                  } disabled:opacity-50 disabled:cursor-not-allowed neom-shrink-press`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                      </svg>
                    </div>
                    <span className="font-medium">Continue with Apple</span>
                  </div>
                </Button>
              </div>
            </div>

            {/* Role-specific Information */}
            <div className={`mt-6 p-4 rounded-lg transition-colors duration-500 ${
              selectedRole === 'guest'
                ? 'bg-gray-50 border border-gray-200'
                : 'bg-slate-700 border border-slate-600'
            }`}>
              <div className="flex items-start space-x-3">
                {selectedRole === 'guest' ? (
                  <Smartphone className="w-5 h-5 text-neom-emerald mt-0.5" />
                ) : (
                  <Shield className="w-5 h-5 text-slate-400 mt-0.5" />
                )}
                <div>
                  <h4 className={`font-medium ${
                    selectedRole === 'guest' ? 'text-gray-900' : 'text-white'
                  }`}>
                    {selectedRole === 'guest' ? 'Guest Access' : 'Staff Access'}
                  </h4>
                  <p className={`text-sm mt-1 ${
                    selectedRole === 'guest' ? 'text-gray-600' : 'text-slate-300'
                  }`}>
                    {selectedRole === 'guest'
                      ? 'Access your personalized stay experience, room controls, and hotel services.'
                      : 'Access operational tools, task management, and system administration based on your role.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Footer */}
          <div className="text-center">
            <p className={`text-xs transition-colors duration-500 ${
              selectedRole === 'guest' ? 'text-gray-500' : 'text-slate-400'
            }`}>
              Powered by NEOM Technology • Secure & Encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}