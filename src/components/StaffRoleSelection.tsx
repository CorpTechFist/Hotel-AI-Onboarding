import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Users, 
  Settings, 
  BarChart3, 
  Wrench, 
  UtensilsCrossed, 
  Bed,
  ArrowRight,
  Shield,
  Building2,
  Clock,
  Target
} from 'lucide-react';

interface StaffRoleSelectionProps {
  staffInfo: any;
  onRoleSelect: (role: string, updatedInfo: any) => void;
}

export function StaffRoleSelection({ staffInfo, onRoleSelect }: StaffRoleSelectionProps) {
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    {
      id: 'housekeeping',
      title: 'Housekeeping',
      icon: Bed,
      description: 'Room maintenance, cleaning schedules, and guest services',
      features: ['Task Management', 'Room Status', 'Inventory Tracking', 'Guest Requests'],
      color: 'bg-blue-500',
      access: 'Staff Co-Pilot & Task Board'
    },
    {
      id: 'fnb',
      title: 'Food & Beverage',
      icon: UtensilsCrossed,
      description: 'Restaurant operations, kitchen coordination, and service management',
      features: ['Order Management', 'Kitchen Display', 'Service Tracking', 'Inventory'],
      color: 'bg-green-500',
      access: 'Staff Co-Pilot & Task Board'
    },
    {
      id: 'maintenance',
      title: 'Maintenance',
      icon: Wrench,
      description: 'Technical support, facility maintenance, and equipment management',
      features: ['Work Orders', 'Equipment Status', 'Safety Protocols', 'Technical Support'],
      color: 'bg-orange-500',
      access: 'Staff Co-Pilot & Task Board'
    },
    {
      id: 'manager',
      title: 'Manager',
      icon: BarChart3,
      description: 'Department oversight, analytics, and operational reporting',
      features: ['Analytics Dashboard', 'Team Performance', 'Revenue Reports', 'KPI Tracking'],
      color: 'bg-purple-500',
      access: 'Manager Reports & Analytics'
    },
    {
      id: 'admin',
      title: 'Administrator',
      icon: Settings,
      description: 'System administration, integrations, and AI agent management',
      features: ['System Config', 'User Management', 'Integrations', 'AI Agents'],
      color: 'bg-red-500',
      access: 'Admin Console & Full System'
    }
  ];

  const handleRoleSelect = (roleId: string) => {
    if (selectedRole === roleId) {
      setIsLoading(true);
      
      // Simulate API call to update user role
      setTimeout(() => {
        const updatedInfo = {
          ...staffInfo,
          role: roleId,
          department: roles.find(r => r.id === roleId)?.title || roleId,
          permissions: getRolePermissions(roleId),
          dashboards: getRoleDashboards(roleId)
        };
        
        onRoleSelect(roleId, updatedInfo);
        setIsLoading(false);
      }, 1000);
    } else {
      setSelectedRole(roleId);
    }
  };

  const getRolePermissions = (roleId: string) => {
    const permissions = {
      housekeeping: ['tasks', 'rooms', 'inventory', 'guest-requests'],
      fnb: ['tasks', 'orders', 'kitchen', 'inventory'],
      maintenance: ['tasks', 'work-orders', 'equipment', 'safety'],
      manager: ['analytics', 'reports', 'team-management', 'kpis'],
      admin: ['all-access', 'system-config', 'user-management', 'integrations', 'ai-agents']
    };
    return permissions[roleId as keyof typeof permissions] || [];
  };

  const getRoleDashboards = (roleId: string) => {
    const dashboards = {
      housekeeping: ['task-board', 'room-status', 'shift-planning'],
      fnb: ['task-board', 'order-management', 'shift-planning'],
      maintenance: ['task-board', 'work-orders', 'equipment-status'],
      manager: ['analytics', 'reports', 'team-dashboard', 'kpis'],
      admin: ['admin-console', 'system-config', 'ai-agents', 'integrations']
    };
    return dashboards[roleId as keyof typeof dashboards] || [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/80 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-neom-midnight flex items-center justify-center">
                <span className="text-white font-semibold">N</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">NEOM Hospitality OS</h1>
                <p className="text-sm text-slate-400">Staff Access Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-slate-700 text-slate-200 border-slate-600">
                Staff Mode
              </Badge>
              <div className="text-right">
                <p className="text-sm text-slate-200">Welcome, {staffInfo.name}</p>
                <p className="text-xs text-slate-400">{staffInfo.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-700 flex items-center justify-center">
              <Shield className="w-8 h-8 text-slate-300" />
            </div>
          </div>
          <h2 className="text-3xl font-semibold text-white mb-2">Select Your Role</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Choose your department role to access the appropriate tools and dashboards. 
            Your access level will be configured based on your selection.
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {roles.map((role) => (
            <Card
              key={role.id}
              onClick={() => handleRoleSelect(role.id)}
              className={`p-6 cursor-pointer transition-all duration-300 bg-slate-800 border-slate-700 hover:border-slate-600 neom-hover-lift ${
                selectedRole === role.id 
                  ? 'ring-2 ring-slate-400 bg-slate-750' 
                  : ''
              }`}
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-xl ${role.color} flex items-center justify-center`}>
                    <role.icon className="w-6 h-6 text-white" />
                  </div>
                  {selectedRole === role.id && (
                    <Badge variant="secondary" className="bg-slate-600 text-slate-200">
                      Selected
                    </Badge>
                  )}
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{role.title}</h3>
                  <p className="text-sm text-slate-400 mb-4">{role.description}</p>
                  
                  {/* Features */}
                  <div className="space-y-2 mb-4">
                    <h4 className="text-xs font-medium text-slate-300 uppercase tracking-wide">
                      Key Features
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {role.features.map((feature, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs bg-slate-700 text-slate-300 border-slate-600"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Access Level */}
                  <div className="pt-2 border-t border-slate-700">
                    <div className="flex items-center space-x-2">
                      <Building2 className="w-4 h-4 text-slate-400" />
                      <span className="text-xs text-slate-400">Access: {role.access}</span>
                    </div>
                  </div>
                </div>

                {/* Action */}
                <div className="pt-2">
                  {selectedRole === role.id ? (
                    <Button
                      disabled={isLoading}
                      className="w-full bg-slate-600 hover:bg-slate-500 text-white neom-shrink-press"
                    >
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Configuring Access...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span>Continue as {role.title}</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      )}
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full border-slate-600 text-[rgba(0,0,0,1)] hover:bg-slate-700 hover:text-white"
                    >
                      Select Role
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Role Comparison */}
        {selectedRole && (
          <Card className="p-6 bg-slate-800 border-slate-700 neom-fade-in">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <Target className="w-5 h-5 text-slate-400" />
                <h3 className="text-lg font-semibold text-white">Access Summary</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-slate-700 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="font-medium text-slate-200">Shift Access</span>
                  </div>
                  <p className="text-slate-400">24/7 system access with role-based permissions</p>
                </div>
                
                <div className="bg-slate-700 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-4 h-4 text-slate-400" />
                    <span className="font-medium text-slate-200">Security Level</span>
                  </div>
                  <p className="text-slate-400">
                    {selectedRole === 'admin' ? 'Full System Access' : 
                     selectedRole === 'manager' ? 'Management Level' : 'Operational Level'}
                  </p>
                </div>
                
                <div className="bg-slate-700 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Building2 className="w-4 h-4 text-slate-400" />
                    <span className="font-medium text-slate-200">Department</span>
                  </div>
                  <p className="text-slate-400">
                    {roles.find(r => r.id === selectedRole)?.title} Operations
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}