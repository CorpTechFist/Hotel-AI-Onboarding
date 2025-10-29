import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { StaffRoleSelection } from './components/StaffRoleSelection';
import { GuestApp } from './components/GuestApp';
import { StaffApp } from './components/StaffApp';
import { AdminConsole } from './components/AdminConsole';
import { ManagerReports } from './components/ManagerReports';

type AppState = 'login' | 'staff-role-selection' | 'authenticated';
type UserType = 'guest' | 'staff';
type StaffRole = 'housekeeping' | 'fnb' | 'maintenance' | 'manager' | 'admin';

interface UserInfo {
  id: string;
  name: string;
  email: string;
  role?: StaffRole;
  department?: string;
  permissions?: string[];
  dashboards?: string[];
  [key: string]: any;
}

export default function App() {
  const [appState, setAppState] = useState<AppState>('login');
  const [userType, setUserType] = useState<UserType | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  // Handle initial login (Guest or Staff selection)
  const handleLogin = (userData: UserInfo, type: UserType) => {
    setUserInfo(userData);
    setUserType(type);
    
    if (type === 'guest') {
      // Guests go directly to authenticated state
      setAppState('authenticated');
    } else {
      // Staff need to select their role first
      setAppState('staff-role-selection');
    }
  };

  // Handle staff role selection
  const handleStaffRoleSelect = (role: StaffRole, updatedUserInfo: UserInfo) => {
    setUserInfo(updatedUserInfo);
    setAppState('authenticated');
  };

  // Handle logout
  const handleLogout = () => {
    setAppState('login');
    setUserType(null);
    setUserInfo(null);
  };

  // Check role-based access permissions
  const canAccessView = (view: string): boolean => {
    if (!userInfo || !userType) return false;
    
    if (userType === 'guest') {
      // Guests can only access guest app
      return view === 'guest';
    }
    
    if (userType === 'staff') {
      const role = userInfo.role;
      
      switch (view) {
        case 'staff':
          // Task board and operational tools
          return ['housekeeping', 'fnb', 'maintenance'].includes(role || '');
        case 'manager':
          // Manager reports and analytics
          return role === 'manager';
        case 'admin':
          // Admin console and system management
          return role === 'admin';
        default:
          return false;
      }
    }
    
    return false;
  };

  // Render the appropriate component based on app state
  const renderContent = () => {
    switch (appState) {
      case 'login':
        return <LoginPage onLogin={handleLogin} />;
      
      case 'staff-role-selection':
        return (
          <StaffRoleSelection 
            staffInfo={userInfo!} 
            onRoleSelect={handleStaffRoleSelect} 
          />
        );
      
      case 'authenticated':
        if (!userInfo || !userType) {
          // Fallback to login if no user info
          setAppState('login');
          return <LoginPage onLogin={handleLogin} />;
        }
        
        return renderAuthenticatedView();
      
      default:
        return <LoginPage onLogin={handleLogin} />;
    }
  };

  // Render the appropriate authenticated view based on user role
  const renderAuthenticatedView = () => {
    if (userType === 'guest') {
      return <GuestApp guestInfo={userInfo!} onLogout={handleLogout} />;
    }
    
    if (userType === 'staff') {
      const role = userInfo!.role;
      
      // Apply light theme for all staff interfaces
      const lightThemeWrapper = (children: React.ReactNode) => (
        <div className="min-h-screen bg-gradient-to-br from-white/60 via-white/80 to-gray-50/60 backdrop-blur-sm">
          {children}
        </div>
      );
      
      switch (role) {
        case 'housekeeping':
        case 'fnb':
        case 'maintenance':
          return lightThemeWrapper(
            <StaffApp staffInfo={userInfo!} onLogout={handleLogout} />
          );
        
        case 'manager':
          return lightThemeWrapper(
            <ManagerReports userInfo={userInfo!} onLogout={handleLogout} />
          );
        
        case 'admin':
          return lightThemeWrapper(
            <AdminConsole userInfo={userInfo!} onLogout={handleLogout} />
          );
        
        default:
          // Fallback to staff app for unknown roles
          return lightThemeWrapper(
            <StaffApp staffInfo={userInfo!} onLogout={handleLogout} />
          );
      }
    }
    
    // Fallback to login
    setAppState('login');
    return <LoginPage onLogin={handleLogin} />;
  };

  return (
    <div className="min-h-screen bg-white/70 backdrop-blur-sm m-0 p-0">
      {renderContent()}
    </div>
  );
}