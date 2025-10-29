import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar as CalendarComponent } from './ui/calendar';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Clock, 
  Leaf, 
  Droplets, 
  Zap, 
  Award,
  Star,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Download,
  LogOut,
  MessageSquare,
  Send,
  User,
  Sparkles,
  MapPin,
  UserPlus,
  ArrowRight,
  Activity,
  Utensils,
  Home,
  Wrench,
  CircleDot
} from 'lucide-react';

interface ManagerReportsProps {
  userInfo?: any;
  onLogout?: () => void;
}

interface Message {
  id: string;
  sender: string;
  recipients: string[];
  content: string;
  timestamp: Date;
}

interface StaffMember {
  id: string;
  name: string;
  department: string;
  role: string;
  status: 'online' | 'offline' | 'busy';
}

export function ManagerReports({ userInfo, onLogout }: ManagerReportsProps) {
  const [activeTab, setActiveTab] = useState<'executive' | 'financial' | 'sustainability' | 'messaging' | 'ai-allocation'>('executive');
  const [timeRange, setTimeRange] = useState('7d');
  
  // Date range picker state
  const [dateRangeStart, setDateRangeStart] = useState<Date | undefined>(undefined);
  const [dateRangeEnd, setDateRangeEnd] = useState<Date | undefined>(undefined);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  
  // Messaging state
  const [selectedStaff, setSelectedStaff] = useState<string[]>([]);
  const [messageText, setMessageText] = useState('');
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Manager',
      recipients: ['John Smith', 'Maria Garcia'],
      content: 'Please prioritize room 412 cleaning - VIP guest arriving early.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
    },
    {
      id: '2',
      sender: 'Manager',
      recipients: ['All Staff'],
      content: 'Team meeting scheduled for 3 PM in Conference Room A.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000) // 4 hours ago
    }
  ]);

  // Mock staff data
  const staffMembers: StaffMember[] = [
    { id: '1', name: 'John Smith', department: 'Housekeeping', role: 'Supervisor', status: 'online' },
    { id: '2', name: 'Maria Garcia', department: 'Housekeeping', role: 'Staff', status: 'online' },
    { id: '3', name: 'Ahmed Hassan', department: 'F&B', role: 'Supervisor', status: 'busy' },
    { id: '4', name: 'Sarah Johnson', department: 'F&B', role: 'Staff', status: 'online' },
    { id: '5', name: 'David Chen', department: 'Maintenance', role: 'Technician', status: 'offline' },
    { id: '6', name: 'Lisa Wong', department: 'Maintenance', role: 'Supervisor', status: 'online' },
    { id: '7', name: 'Mohammed Al-Rashid', department: 'Concierge', role: 'Staff', status: 'online' },
    { id: '8', name: 'Elena Rodriguez', department: 'Housekeeping', role: 'Staff', status: 'busy' }
  ];

  const handleStaffSelection = (staffId: string, checked: boolean) => {
    if (checked) {
      setSelectedStaff(prev => [...prev, staffId]);
    } else {
      setSelectedStaff(prev => prev.filter(id => id !== staffId));
    }
  };

  const handleSendMessage = () => {
    if (messageText.trim() && selectedStaff.length > 0) {
      const recipients = selectedStaff.map(id => 
        staffMembers.find(staff => staff.id === id)?.name || ''
      ).filter(name => name);

      const newMessage: Message = {
        id: Date.now().toString(),
        sender: userInfo?.name || 'Manager',
        recipients,
        content: messageText.trim(),
        timestamp: new Date()
      };

      setMessages(prev => [newMessage, ...prev]);
      setMessageText('');
      setSelectedStaff([]);
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
      return `${diffInMinutes} min ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      return timestamp.toLocaleDateString();
    }
  };

  // Format date range for display
  const formatDateRange = () => {
    if (dateRangeStart && dateRangeEnd) {
      return `${dateRangeStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${dateRangeEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    }
    return 'Custom Date Range';
  };

  // Apply date range filter to financial data
  const applyDateRangeFilter = () => {
    if (dateRangeStart && dateRangeEnd) {
      // In real implementation, this would trigger API call with date range
      console.log('Filtering financial data from', dateRangeStart, 'to', dateRangeEnd);
      setIsDatePickerOpen(false);
    }
  };

  // Get sorted and filtered staff list for messaging
  const getFilteredAndSortedStaff = () => {
    // First, filter based on toggle
    let filteredStaff = showOnlyAvailable 
      ? staffMembers.filter(staff => staff.status === 'online')
      : staffMembers;

    // Then, sort: available (online) first, then busy/offline
    return filteredStaff.sort((a, b) => {
      if (a.status === 'online' && b.status !== 'online') return -1;
      if (a.status !== 'online' && b.status === 'online') return 1;
      return 0;
    });
  };

  // AI Allocation state and data
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  
  interface AreaAllocation {
    id: string;
    name: string;
    icon: any;
    currentStaff: number;
    requiredStaff: number;
    status: 'urgent' | 'moderate' | 'sufficient';
    condition: string;
    priority: 'high' | 'medium' | 'low';
    tasks: number;
    guestCount: number;
  }

  interface StaffAllocation {
    id: string;
    staffName: string;
    areaName: string;
    timestamp: Date;
    type: 'success' | 'warning' | 'info';
  }

  const [recentAllocations, setRecentAllocations] = useState<StaffAllocation[]>([
    {
      id: '1',
      staffName: 'Maria Garcia',
      areaName: 'Housekeeping Floor 4',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      type: 'success'
    },
    {
      id: '2',
      staffName: 'John Smith',
      areaName: 'VIP Suite cleaning (Priority: High)',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      type: 'success'
    }
  ]);

  const areaAllocations: AreaAllocation[] = [
    {
      id: 'housekeeping',
      name: 'Housekeeping',
      icon: Home,
      currentStaff: 3,
      requiredStaff: 6,
      status: 'urgent',
      condition: 'High guest rush - 12 checkouts pending',
      priority: 'high',
      tasks: 28,
      guestCount: 45
    },
    {
      id: 'fnb',
      name: 'F&B Service',
      icon: Utensils,
      currentStaff: 4,
      requiredStaff: 5,
      status: 'moderate',
      condition: 'Breakfast rush - skilled waiters needed',
      priority: 'medium',
      tasks: 18,
      guestCount: 62
    },
    {
      id: 'maintenance',
      name: 'Maintenance',
      icon: Wrench,
      currentStaff: 2,
      requiredStaff: 2,
      status: 'sufficient',
      condition: 'Normal operations',
      priority: 'low',
      tasks: 5,
      guestCount: 0
    },
    {
      id: 'concierge',
      name: 'Concierge',
      icon: Users,
      currentStaff: 2,
      requiredStaff: 3,
      status: 'moderate',
      condition: 'Shift overlap - extra coverage needed',
      priority: 'medium',
      tasks: 12,
      guestCount: 28
    }
  ];

  const handleQuickAssign = (staffId: string, areaId: string) => {
    // Find staff and area information
    const staff = staffMembers.find(s => s.id === staffId);
    const area = areaAllocations.find(a => a.id === areaId);
    
    if (staff && area) {
      // Create new allocation entry
      const newAllocation: StaffAllocation = {
        id: Date.now().toString(),
        staffName: staff.name,
        areaName: area.name,
        timestamp: new Date(),
        type: 'success'
      };
      
      // Add to beginning of allocations list (most recent first)
      setRecentAllocations(prev => [newAllocation, ...prev]);
      
      console.log(`Assigned ${staff.name} to ${area.name}`);
      // In real implementation, this would update the backend
    }
  };

  const renderExecutiveDashboard = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-white">Executive Dashboard</h2>
          <p className="text-slate-400">Key performance indicators and business metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32 rounded-xl bg-slate-700 border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600">
              <SelectItem value="24h">24 Hours</SelectItem>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
              <SelectItem value="90d">90 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="rounded-xl border-slate-600 text-[rgba(0,0,0,1)] hover:bg-slate-700">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-2xl bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Revenue (7D)</p>
                <p className="text-2xl font-semibold text-green-400">$127,450</p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  <span className="text-xs text-green-400">+12.3%</span>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Occupancy Rate</p>
                <p className="text-2xl font-semibold text-cyan-400">87.3%</p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  <span className="text-xs text-green-400">+5.2%</span>
                </div>
              </div>
              <Users className="w-8 h-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Guest Satisfaction</p>
                <p className="text-2xl font-semibold text-orange-400">9.2/10</p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  <span className="text-xs text-green-400">+0.3</span>
                </div>
              </div>
              <Star className="w-8 h-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Avg Check-in Time</p>
                <p className="text-2xl font-semibold text-slate-200">2.3 min</p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingDown className="w-3 h-3 text-green-400" />
                  <span className="text-xs text-green-400">-0.8 min</span>
                </div>
              </div>
              <Clock className="w-8 h-8 text-slate-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <Card className="rounded-2xl bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Priority Alerts & Anomalies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                type: 'success',
                title: 'Digital Check-in Adoption',
                message: 'Digital check-in usage reached 94% - exceeding target by 14%',
                time: '2 hours ago'
              },
              {
                type: 'warning',
                title: 'Energy Consumption',
                message: 'Energy usage 15% above average for this time period',
                time: '4 hours ago'
              },
              {
                type: 'info',
                title: 'Staff Efficiency',
                message: 'Housekeeping task completion time improved by 18%',
                time: '6 hours ago'
              }
            ].map((alert, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-xl bg-slate-700">
                <div className="mt-0.5">
                  {alert.type === 'success' && <CheckCircle className="w-4 h-4 text-green-400" />}
                  {alert.type === 'warning' && <AlertTriangle className="w-4 h-4 text-orange-400" />}
                  {alert.type === 'info' && <BarChart3 className="w-4 h-4 text-blue-400" />}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-slate-200">{alert.title}</h4>
                  <p className="text-sm text-slate-400">{alert.message}</p>
                  <span className="text-xs text-slate-500">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="rounded-2xl bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-lg text-white">Today's Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Revenue</span>
              <span className="font-semibold text-slate-200">$18,240</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Check-ins</span>
              <span className="font-semibold text-slate-200">23</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Check-outs</span>
              <span className="font-semibold text-slate-200">19</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Occupied Rooms</span>
              <span className="font-semibold text-slate-200">393/450</span>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-lg text-white">Guest Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Concierge Requests</span>
              <span className="font-semibold text-slate-200">47</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Room Service Orders</span>
              <span className="font-semibold text-slate-200">28</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Maintenance Requests</span>
              <span className="font-semibold text-slate-200">6</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Eco Mode Adoption</span>
              <span className="font-semibold text-slate-200">78%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-lg text-white">Operational Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Staff On Duty</span>
              <span className="font-semibold text-slate-200">34/38</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Task Completion</span>
              <span className="font-semibold text-slate-200">94%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Avg Response Time</span>
              <span className="font-semibold text-slate-200">3.2 min</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">System Uptime</span>
              <span className="font-semibold text-slate-200">99.9%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderSustainabilityDashboard = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-white">Sustainability Dashboard</h2>
          <p className="text-slate-400">Environmental impact and eco-friendly initiatives</p>
        </div>
        <Button className="rounded-xl bg-slate-600 hover:bg-slate-500 text-white">
          <Leaf className="w-4 h-4 mr-2" />
          Sustainability Report
        </Button>
      </div>

      {/* Environmental KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="rounded-2xl bg-slate-800 border-slate-700 border-2 border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">CO₂ per Stay</p>
                <p className="text-2xl font-semibold text-green-400">12.3 kg</p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingDown className="w-3 h-3 text-green-400" />
                  <span className="text-xs text-green-400">-23% vs target</span>
                </div>
              </div>
              <Leaf className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl bg-slate-800 border-slate-700 border-2 border-cyan-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Energy (kWh/night)</p>
                <p className="text-2xl font-semibold text-cyan-400">47.2</p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingDown className="w-3 h-3 text-green-400" />
                  <span className="text-xs text-green-400">-18% this month</span>
                </div>
              </div>
              <Zap className="w-8 h-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl bg-slate-800 border-slate-700 border-2 border-orange-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Water (L/night)</p>
                <p className="text-2xl font-semibold text-orange-400">285</p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingDown className="w-3 h-3 text-green-400" />
                  <span className="text-xs text-green-400">-12% this month</span>
                </div>
              </div>
              <Droplets className="w-8 h-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Guest Engagement */}
      <Card className="rounded-2xl bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <Users className="w-5 h-5" />
            <span>Guest Eco Engagement</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-200">Eco Mode Adoption</span>
                  <span className="font-semibold text-slate-200">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-200">Towel Reuse Program</span>
                  <span className="font-semibold text-slate-200">64%</span>
                </div>
                <Progress value={64} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-200">Digital Receipts</span>
                  <span className="font-semibold text-slate-200">91%</span>
                </div>
                <Progress value={91} className="h-2" />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-700">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-200">Eco Badges Earned</span>
                  <Badge className="bg-green-600 text-white">247 this month</Badge>
                </div>
              </div>
              
              <div className="p-3 rounded-xl bg-slate-700">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-200">Social Media Shares</span>
                  <Badge className="bg-green-600 text-white">156 shares</Badge>
                </div>
              </div>
              
              <div className="p-3 rounded-xl bg-slate-700">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-200">Sustainability Tours</span>
                  <Badge className="bg-green-600 text-white">89 bookings</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderFinancialReports = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-white">Financial Reports</h2>
          <p className="text-slate-400">Revenue analysis and financial performance</p>
        </div>
        <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
          <PopoverTrigger asChild>
            <Button 
              className={`rounded-xl transition-colors ${
                dateRangeStart && dateRangeEnd 
                  ? 'bg-green-600 hover:bg-green-700 text-white border-green-500' 
                  : 'bg-slate-600 text-white border-slate-500 hover:bg-slate-700'
              }`}
            >
              <Calendar className="w-4 h-4 mr-2" />
              {formatDateRange()}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700" align="end">
            <div className="p-4 space-y-4">
              <div className="space-y-2 bg-[rgba(174,158,158,0.49)]">
                <label className="text-sm font-medium text-white">Start Date</label>
                <CalendarComponent
                  mode="single"
                  selected={dateRangeStart}
                  onSelect={setDateRangeStart}
                  className="rounded-md border border-slate-600 bg-slate-900"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">End Date</label>
                <CalendarComponent
                  mode="single"
                  selected={dateRangeEnd}
                  onSelect={setDateRangeEnd}
                  disabled={(date) => dateRangeStart ? date < dateRangeStart : false}
                  className="rounded-md border border-slate-600 bg-slate-900"
                />
              </div>
              <div className="flex space-x-2 pt-2 border-t border-slate-600">
                <Button
                  variant="outline"
                  onClick={() => {
                    setDateRangeStart(undefined);
                    setDateRangeEnd(undefined);
                    setIsDatePickerOpen(false);
                  }}
                  className="flex-1 bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                >
                  Clear
                </Button>
                <Button
                  onClick={applyDateRangeFilter}
                  disabled={!dateRangeStart || !dateRangeEnd}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  Apply
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Active Filter Indicator */}
      {dateRangeStart && dateRangeEnd && (
        <div className="flex items-center justify-center p-3 rounded-xl bg-green-600/20 border border-green-500/30">
          <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
          <span className="text-sm text-green-300">
            Custom date range applied: {formatDateRange()}
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-2xl bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span>Revenue Breakdown {dateRangeStart && dateRangeEnd ? `(${formatDateRange()})` : '(Last 30 Days)'}</span>
              {dateRangeStart && dateRangeEnd && (
                <Badge className="bg-green-600 text-white text-xs">Custom Range</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-200">Room Revenue</span>
                <span className="font-semibold text-slate-200">$342,150</span>
              </div>
              <Progress value={75} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-200">F&B Revenue</span>
                <span className="font-semibold text-slate-200">$89,420</span>
              </div>
              <Progress value={20} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-200">Spa & Wellness</span>
                <span className="font-semibold text-slate-200">$23,180</span>
              </div>
              <Progress value={5} className="h-2" />
            </div>
            
            <div className="pt-3 border-t border-slate-600">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-200">Total Revenue</span>
                <span className="text-xl font-semibold text-green-400">$454,750</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Top Revenue Generators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { item: 'Royal Suite Bookings', revenue: '$125,400', change: '+15.2%' },
                { item: 'Marina Restaurant', revenue: '$45,200', change: '+8.7%' },
                { item: 'Spa Treatments', revenue: '$23,180', change: '+12.1%' },
                { item: 'Room Service', revenue: '$18,900', change: '+5.3%' },
                { item: 'Concierge Services', revenue: '$12,450', change: '+18.9%' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-slate-700">
                  <div>
                    <h4 className="font-medium text-sm text-slate-200">{item.item}</h4>
                    <span className="text-lg font-semibold text-slate-200">{item.revenue}</span>
                  </div>
                  <Badge className="bg-green-600 text-white">
                    {item.change}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderMessagingPanel = () => {
    const filteredStaff = getFilteredAndSortedStaff();
    const allSelected = selectedStaff.length === filteredStaff.length && filteredStaff.length > 0;
    const someSelected = selectedStaff.length > 0 && selectedStaff.length < filteredStaff.length;

    const handleSelectAll = () => {
      if (allSelected) {
        setSelectedStaff([]);
      } else {
        setSelectedStaff(filteredStaff.map(staff => staff.id));
      }
    };

    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-white">Staff Messaging</h2>
            <p className="text-slate-400">Send messages and communicate with your team</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Compose Message */}
          <Card className="rounded-2xl bg-slate-800 border-slate-700 lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Send className="w-5 h-5 text-cyan-400" />
                <span>Compose Message</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Staff Selection */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="font-medium text-slate-200">Select Recipients</label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSelectAll}
                    className="h-8 text-xs border-slate-600 text-[rgba(0,0,0,1)] hover:bg-slate-700"
                  >
                    {allSelected ? 'Deselect All' : 'Select All'}
                  </Button>
                </div>

                {/* Filter Toggle */}
                <div className="flex items-center justify-between p-3 mb-3 rounded-xl bg-slate-700/50 border border-slate-600">
                  <label htmlFor="available-filter" className="text-sm text-slate-300 cursor-pointer flex-1">
                    Show only available staff
                  </label>
                  <Checkbox
                    id="available-filter"
                    checked={showOnlyAvailable}
                    onCheckedChange={(checked) => setShowOnlyAvailable(checked as boolean)}
                    className="border-slate-500 data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600"
                  />
                </div>
                
                <Card className="rounded-xl bg-slate-700 border-slate-600 max-h-64 overflow-y-auto">
                  <CardContent className="p-4 space-y-3">
                    {filteredStaff.map((staff) => (
                      <div 
                        key={staff.id} 
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-600/50 transition-colors"
                      >
                        <Checkbox
                          id={`staff-${staff.id}`}
                          checked={selectedStaff.includes(staff.id)}
                          onCheckedChange={(checked) => handleStaffSelection(staff.id, checked as boolean)}
                          className="border-slate-500 data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600"
                        />
                        <label 
                          htmlFor={`staff-${staff.id}`} 
                          className="flex items-center justify-between flex-1 cursor-pointer"
                        >
                          <div className="flex items-center space-x-3">
                            <User className="w-4 h-4 text-slate-400" />
                            <div>
                              <p className="font-medium text-slate-200">{staff.name}</p>
                              <p className="text-xs text-slate-400">{staff.department} - {staff.role}</p>
                            </div>
                          </div>
                          <div className={`w-2 h-2 rounded-full ${
                            staff.status === 'online' ? 'bg-green-400' : 
                            staff.status === 'busy' ? 'bg-orange-400' : 'bg-slate-500'
                          }`}></div>
                        </label>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {selectedStaff.length > 0 && (
                  <div className="mt-2 flex items-center space-x-2">
                    <Badge className="bg-cyan-600 text-white">
                      {selectedStaff.length} recipient{selectedStaff.length > 1 ? 's' : ''} selected
                    </Badge>
                  </div>
                )}
              </div>

              {/* Message Input */}
              <div>
                <label className="font-medium text-slate-200 mb-2 block">Message</label>
                <Textarea
                  placeholder="Type your message here..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 min-h-[150px] resize-none rounded-xl"
                />
                <p className="text-xs text-slate-400 mt-1">
                  {messageText.length} characters
                </p>
              </div>

              {/* Send Button */}
              <Button
                onClick={handleSendMessage}
                disabled={!messageText.trim() || selectedStaff.length === 0}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl h-11"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message to {selectedStaff.length} recipient{selectedStaff.length !== 1 ? 's' : ''}
              </Button>
            </CardContent>
          </Card>

          {/* Quick Send Panel */}
          <Card className="rounded-2xl bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <p className="text-sm text-slate-400 mb-2">Message Templates</p>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left bg-black text-white border-slate-600 hover:bg-slate-900 rounded-xl h-auto py-2"
                  onClick={() => setMessageText('Team meeting scheduled for today at 3 PM in Conference Room A.')}
                >
                  <MessageSquare className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="text-xs">Team Meeting</span>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left bg-black text-white border-slate-600 hover:bg-slate-900 rounded-xl h-auto py-2"
                  onClick={() => setMessageText('Please prioritize VIP guest requests. Thank you for your attention to detail.')}
                >
                  <Award className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="text-xs">VIP Priority</span>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left bg-black text-white border-slate-600 hover:bg-slate-900 rounded-xl h-auto py-2"
                  onClick={() => setMessageText('Reminder: Please complete all pending tasks before end of shift.')}
                >
                  <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="text-xs">Shift Reminder</span>
                </Button>
              </div>

              <div className="pt-3 border-t border-slate-600 space-y-2">
                <p className="text-sm text-slate-400 mb-2">Quick Select by Department</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs bg-black text-white border-slate-600 hover:bg-slate-900 rounded-lg"
                  onClick={() => setSelectedStaff(staffMembers.filter(s => s.department === 'Housekeeping').map(s => s.id))}
                >
                  Housekeeping Team
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs bg-black text-white border-slate-600 hover:bg-slate-900 rounded-lg"
                  onClick={() => setSelectedStaff(staffMembers.filter(s => s.department === 'F&B').map(s => s.id))}
                >
                  F&B Team
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs bg-black text-white border-slate-600 hover:bg-slate-900 rounded-lg"
                  onClick={() => setSelectedStaff(staffMembers.filter(s => s.department === 'Maintenance').map(s => s.id))}
                >
                  Maintenance Team
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Message History */}
        <Card className="rounded-2xl bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-white">
              <MessageSquare className="w-5 h-5 text-cyan-400" />
              <span>Message History</span>
              <Badge className="ml-auto bg-slate-700 text-slate-200">{messages.length} messages</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-96 overflow-y-auto space-y-3">
              {messages.length > 0 ? (
                messages.map((message) => (
                  <div 
                    key={message.id} 
                    className="p-4 rounded-xl bg-slate-700 border-l-4 border-cyan-500 hover:bg-slate-600/80 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-200">{message.sender}</p>
                          <div className="flex items-center space-x-2 text-xs text-slate-400">
                            <span>To:</span>
                            <span className="font-medium">
                              {message.recipients.length > 3 
                                ? `${message.recipients.slice(0, 3).join(', ')} +${message.recipients.length - 3} more`
                                : message.recipients.join(', ')
                              }
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-slate-500">{formatTimestamp(message.timestamp)}</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{message.content}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-slate-400">
                  <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No messages sent yet</p>
                  <p className="text-xs mt-1">Compose and send your first message to your team</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderAIAllocationPanel = () => {
    const getStatusColor = (status: 'urgent' | 'moderate' | 'sufficient') => {
      switch (status) {
        case 'urgent':
          return { bg: 'bg-red-500/20', border: 'border-red-500/50', text: 'text-red-400', indicator: 'bg-red-500' };
        case 'moderate':
          return { bg: 'bg-yellow-500/20', border: 'border-yellow-500/50', text: 'text-yellow-400', indicator: 'bg-yellow-500' };
        case 'sufficient':
          return { bg: 'bg-green-500/20', border: 'border-green-500/50', text: 'text-green-400', indicator: 'bg-green-500' };
      }
    };

    const availableStaff = staffMembers.filter(s => s.status === 'online');

    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-white flex items-center space-x-2">
              <Sparkles className="w-7 h-7 text-purple-400" />
              <span>AI Allocation</span>
            </h2>
            <p className="text-slate-400">Real-time intelligent staff allocation and resource management</p>
          </div>
          <Badge className="bg-purple-600/20 text-purple-300 border border-purple-500/30 px-4 py-2">
            <Activity className="w-4 h-4 mr-2" />
            AI Active
          </Badge>
        </div>

        {/* Status Overview Heatmap */}
        <Card className="rounded-2xl bg-gradient-to-br from-purple-900/20 via-slate-800 to-slate-800 border-purple-500/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-white">
              <MapPin className="w-5 h-5 text-purple-400" />
              <span>Area Status Heatmap</span>
              <Badge className="ml-auto bg-slate-700 text-slate-200">Real-time</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {areaAllocations.map((area) => {
                const colors = getStatusColor(area.status);
                const staffPercentage = (area.currentStaff / area.requiredStaff) * 100;
                
                return (
                  <Card 
                    key={area.id}
                    className={`rounded-xl border-2 ${colors.border} ${colors.bg} backdrop-blur-sm hover:scale-105 transition-all cursor-pointer`}
                    onClick={() => setSelectedArea(selectedArea === area.id ? null : area.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <div className={`p-2 rounded-lg ${colors.indicator} bg-opacity-20`}>
                            <area.icon className={`w-5 h-5 ${colors.text}`} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{area.name}</h3>
                            <p className="text-xs text-slate-400">{area.tasks} active tasks</p>
                          </div>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${colors.indicator} animate-pulse`}></div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-400">Staff Coverage</span>
                          <span className={`font-semibold ${colors.text}`}>
                            {area.currentStaff}/{area.requiredStaff}
                          </span>
                        </div>
                        <Progress value={staffPercentage} className="h-2" />
                        
                        <div className={`text-xs ${colors.text} mt-2 flex items-start space-x-1`}>
                          <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                          <span>{area.condition}</span>
                        </div>

                        {area.priority === 'high' && (
                          <Badge className="bg-red-600 text-white w-full justify-center text-xs">
                            HIGH PRIORITY
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Staff Assignment Panel */}
          <Card className="rounded-2xl bg-slate-800 border-slate-700 lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <UserPlus className="w-5 h-5 text-cyan-400" />
                <span>Quick Assignment</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-slate-400 mb-3">
                {selectedArea 
                  ? `Assign staff to: ${areaAllocations.find(a => a.id === selectedArea)?.name || 'Selected Area'}`
                  : 'Select an area above to assign staff'
                }
              </div>

              {selectedArea && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-slate-200">Available Staff ({availableStaff.length})</span>
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs"
                      onClick={() => console.log('AI auto-assign')}
                    >
                      <Sparkles className="w-3 h-3 mr-1" />
                      AI Auto-Assign
                    </Button>
                  </div>

                  <div className="max-h-96 overflow-y-auto space-y-2">
                    {availableStaff.map((staff) => (
                      <div 
                        key={staff.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-700 hover:bg-slate-600 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-200">{staff.name}</p>
                            <div className="flex items-center space-x-2 text-xs text-slate-400">
                              <span>{staff.department}</span>
                              <span>•</span>
                              <span>{staff.role}</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleQuickAssign(staff.id, selectedArea)}
                          className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg h-8 px-3 text-xs"
                        >
                          Assign
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!selectedArea && (
                <div className="text-center py-12 text-slate-400">
                  <CircleDot className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Select an area from the heatmap above</p>
                  <p className="text-xs mt-1">Click on any area card to view assignment options</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Real-time Activity Log */}
        <Card className="rounded-2xl bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-white">
              <Activity className="w-5 h-5 text-cyan-400" />
              <span>Recent AI Allocations</span>
              <Badge className="ml-auto bg-slate-700 text-slate-200">{recentAllocations.length} allocation{recentAllocations.length !== 1 ? 's' : ''}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {recentAllocations.length > 0 ? (
                recentAllocations.map((allocation) => (
                  <div key={allocation.id} className="flex items-start space-x-3 p-3 rounded-xl bg-slate-700 hover:bg-slate-600/80 transition-colors">
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${
                      allocation.type === 'success' ? 'bg-green-400' :
                      allocation.type === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-200">
                        Assigned <span className="font-semibold text-cyan-400">{allocation.staffName}</span> to {allocation.areaName}
                      </p>
                      <span className="text-xs text-slate-500">{formatTimestamp(allocation.timestamp)}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-slate-400">
                  <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No allocations yet</p>
                  <p className="text-xs mt-1">Start assigning staff from the Quick Assignment panel</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const tabs = [
    { id: 'executive', name: 'Executive Dashboard', component: renderExecutiveDashboard },
    { id: 'financial', name: 'Financial Reports', component: renderFinancialReports },
    { id: 'sustainability', name: 'Sustainability', component: renderSustainabilityDashboard },
    { id: 'messaging', name: 'Messaging', component: renderMessagingPanel },
    { id: 'ai-allocation', name: 'AI Allocation', component: renderAIAllocationPanel }
  ];

  return (
    <div className="bg-slate-900 text-white min-h-screen">
      {/* Header */}
      <div className="bg-slate-800/80 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-neom-midnight flex items-center justify-center">
                <span className="text-white font-semibold">N</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">NEOM Manager Reports</h1>
                <p className="text-sm text-slate-400">Analytics & Business Intelligence</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-slate-700 text-slate-200 border-slate-600">
                Manager Mode
              </Badge>
              {userInfo && (
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <p className="text-sm text-slate-200">{userInfo.name}</p>
                    <p className="text-xs text-slate-400">{userInfo.department}</p>
                  </div>
                  {onLogout && (
                    <Button 
                      onClick={onLogout}
                      variant="ghost" 
                      size="sm"
                      className="text-slate-400 hover:text-slate-200 hover:bg-slate-700"
                    >
                      <LogOut className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-slate-700 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'text-white border-slate-400'
                    : 'text-slate-400 border-transparent hover:text-slate-200 hover:border-slate-600'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto">
        {tabs.find(tab => tab.id === activeTab)?.component()}
      </div>
    </div>
  );
}