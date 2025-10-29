import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Eye, 
  EyeOff, 
  Smartphone, 
  Mail, 
  Lock,
  ArrowRight
} from 'lucide-react';

interface GuestLoginProps {
  onLogin: (userInfo: any) => void;
}

export function GuestLogin({ onLogin }: GuestLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const guestInfo = {
        name: 'Sarah Ahmed',
        email: email,
        room: '2501',
        checkIn: 'Dec 22, 2024',
        checkOut: 'Dec 25, 2024',
        nights: 3,
        type: 'NEOM Royal Suite'
      };
      
      onLogin(guestInfo);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#FAFAFA' }}>
      <div className="w-full max-w-md space-y-6">
        {/* Hotel Branding */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ backgroundColor: '#0A2540' }}
            >
              <span className="text-white text-2xl font-semibold">N</span>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-semibold" style={{ color: '#0A2540' }}>Welcome to NEOM</h1>
            <p className="text-gray-600 mt-1">Sign in to access your stay</p>
          </div>
        </div>

        {/* Hotel Image */}
        <Card className="rounded-2xl overflow-hidden border-0 shadow-lg">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1669407938045-152068ed42e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9tJTIwc2F1ZGklMjBhcmFiaWElMjBmdXR1cmlzdGljJTIwY2l0eXxlbnwxfHx8fDE3NTg1MzMyNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="NEOM Bay Resort"
            className="w-full h-32 object-cover"
          />
        </Card>

        {/* Login Form */}
        <Card className="rounded-2xl border-0 shadow-lg">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium" style={{ color: '#3D3D3D' }}>
                  Email or Phone
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email or phone"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium" style={{ color: '#3D3D3D' }}>
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 rounded-xl border-gray-200 focus:border-blue-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <Button
              onClick={handleLogin}
              disabled={!email || !password || isLoading}
              className="w-full h-12 rounded-xl text-white font-medium transition-all hover:shadow-lg disabled:opacity-50"
              style={{ backgroundColor: '#0A2540' }}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Smartphone className="w-4 h-4" />
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>

            <div className="text-center">
              <button 
                className="text-sm hover:underline transition-colors"
                style={{ color: '#17C3B2' }}
              >
                Forgot Password?
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="rounded-2xl border border-gray-200 bg-gray-50">
          <CardContent className="p-4">
            <div className="text-center space-y-2">
              <p className="text-sm font-medium text-gray-700">Demo Credentials</p>
              <div className="text-xs text-gray-600 space-y-1">
                <p>Email: sarah.ahmed@email.com</p>
                <p>Password: neom2024</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          <p>© 2024 NEOM Bay Resort. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}