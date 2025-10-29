import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { 
  Eye, 
  EyeOff, 
  User, 
  Lock,
  Shield,
  ArrowRight,
  Smartphone
} from 'lucide-react';

interface StaffLoginProps {
  onLogin: (userInfo: any) => void;
}

export function StaffLogin({ onLogin }: StaffLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const staffRoles = [
    { value: 'manager', label: 'General Manager', color: '#0A2540' },
    { value: 'admin', label: 'System Administrator', color: '#FF6B35' },
    { value: 'front-desk', label: 'Front Desk Manager', color: '#17C3B2' },
    { value: 'housekeeping', label: 'Housekeeping Supervisor', color: '#00A676' },
    { value: 'maintenance', label: 'Maintenance Staff', color: '#FF6B35' },
    { value: 'fnb', label: 'F&B Coordinator', color: '#17C3B2' }
  ];

  const handleLogin = async () => {
    if (!showTwoFactor) {
      setShowTwoFactor(true);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const staffInfo = {
        name: getStaffName(role),
        username: username,
        role: role,
        department: getDepartment(role),
        permissions: getPermissions(role),
        shift: 'Day Shift (6:00 AM - 2:00 PM)'
      };
      
      onLogin(staffInfo);
      setIsLoading(false);
    }, 1500);
  };

  const getStaffName = (role: string) => {
    const names = {
      'manager': 'Ahmed Al-Rashid',
      'admin': 'Sarah Tech',
      'front-desk': 'Omar Hassan',
      'housekeeping': 'Fatima Ahmed',
      'maintenance': 'Khalid Malik',
      'fnb': 'Layla Restaurant'
    };
    return names[role as keyof typeof names] || 'Staff Member';
  };

  const getDepartment = (role: string) => {
    const departments = {
      'manager': 'Executive',
      'admin': 'IT Systems',
      'front-desk': 'Guest Services',
      'housekeeping': 'Housekeeping',
      'maintenance': 'Facilities',
      'fnb': 'Food & Beverage'
    };
    return departments[role as keyof typeof departments] || 'General';
  };

  const getPermissions = (role: string) => {
    const permissions = {
      'manager': ['Full Access', 'Reports', 'Staff Management', 'Financial'],
      'admin': ['System Config', 'Integrations', 'User Management', 'Reports'],
      'front-desk': ['Guest Services', 'Reservations', 'Check-in/out'],
      'housekeeping': ['Room Status', 'Tasks', 'Staff Scheduling'],
      'maintenance': ['Maintenance Tasks', 'IoT Controls', 'Issue Reporting'],
      'fnb': ['Restaurant Orders', 'Room Service', 'Inventory']
    };
    return permissions[role as keyof typeof permissions] || ['Basic Access'];
  };

  const selectedRole = staffRoles.find(r => r.value === role);

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#1C1C1C' }}>
      <div className="w-full max-w-md space-y-6">
        {/* Staff Portal Branding */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ backgroundColor: '#17C3B2' }}
            >
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-white">NEOM Staff Portal</h1>
            <p className="text-gray-400 mt-1">Secure access for team members</p>
          </div>
        </div>

        {/* System Status */}
        <Card className="rounded-2xl bg-gray-900 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-300">All Systems Operational</span>
              </div>
              <Badge variant="outline" className="border-green-500 text-green-400">
                Online
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Login Form */}
        <Card className="rounded-2xl bg-gray-900 border-gray-700">
          <CardContent className="p-6 space-y-6">
            {!showTwoFactor ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-sm font-medium text-gray-300">
                    Staff Role
                  </Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger className="h-12 rounded-xl bg-gray-800 border-gray-600 text-white">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      {staffRoles.map((roleOption) => (
                        <SelectItem 
                          key={roleOption.value} 
                          value={roleOption.value}
                          className="text-white hover:bg-gray-700"
                        >
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: roleOption.color }}
                            ></div>
                            <span>{roleOption.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium text-gray-300">
                    Username / Employee ID
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter username or employee ID"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-10 h-12 rounded-xl bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-300">
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
                      className="pl-10 pr-10 h-12 rounded-xl bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center space-y-2">
                  <Shield className="w-12 h-12 mx-auto text-cyan-500" />
                  <h3 className="text-lg font-semibold text-white">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-400">
                    Enter the 6-digit code from your authenticator app
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twoFactor" className="text-sm font-medium text-gray-300">
                    Verification Code
                  </Label>
                  <Input
                    id="twoFactor"
                    type="text"
                    placeholder="000000"
                    value={twoFactorCode}
                    onChange={(e) => setTwoFactorCode(e.target.value)}
                    className="h-12 rounded-xl bg-gray-800 border-gray-600 text-white text-center text-lg tracking-widest placeholder-gray-400 focus:border-cyan-500"
                    maxLength={6}
                  />
                </div>
              </div>
            )}

            <Button
              onClick={handleLogin}
              disabled={(!role || !username || !password) || (showTwoFactor && !twoFactorCode) || isLoading}
              className="w-full h-12 rounded-xl text-white font-medium transition-all hover:shadow-lg disabled:opacity-50"
              style={{ backgroundColor: '#17C3B2' }}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Authenticating...</span>
                </div>
              ) : showTwoFactor ? (
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Verify & Login</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>

            {!showTwoFactor && (
              <div className="text-center">
                <button 
                  className="text-sm hover:underline transition-colors text-cyan-400"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {showTwoFactor && (
              <div className="text-center">
                <button 
                  onClick={() => setShowTwoFactor(false)}
                  className="text-sm hover:underline transition-colors text-cyan-400"
                >
                  ← Back to Login
                </button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Role Preview */}
        {selectedRole && !showTwoFactor && (
          <Card className="rounded-2xl bg-gray-900 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: selectedRole.color }}
                ></div>
                <div>
                  <p className="text-sm font-medium text-white">{selectedRole.label}</p>
                  <p className="text-xs text-gray-400">Access Level: {getDepartment(role)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Demo Credentials */}
        <Card className="rounded-2xl bg-gray-800 border-gray-600">
          <CardContent className="p-4">
            <div className="text-center space-y-2">
              <p className="text-sm font-medium text-gray-300">Demo Access</p>
              <div className="text-xs text-gray-400 space-y-1">
                <p>Any role • Username: demo • Password: neom2024</p>
                <p>2FA Code: 123456</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          <p>© 2024 NEOM Hospitality OS. Secure Staff Portal.</p>
        </div>
      </div>
    </div>
  );
}