import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { 
  Settings, 
  Building, 
  Users, 
  Plug, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Activity,
  Bot,
  MessageCircle,
  ShoppingCart,
  UserCheck,
  Leaf,
  Brain,
  LogOut,
  Hotel,
  Calendar,
  Key,
  CreditCard,
  Wifi,
  Monitor,
  Smartphone,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Users as UsersIcon,
  Star,
  Phone,
  Mail,
  Utensils,
  PartyPopper,
  Bed,
  Table,
  ChefHat,
  Music,
  Camera,
  Mic,
  WifiOff,
  CreditCard as CardIcon,
  Receipt,
  QrCode,
  Search,
  Filter,
  ChevronRight,
  Plus,
  Minus,
  Edit,
  Download,
  Upload,
  RotateCcw,
  Save,
  X,
  Check,
  Pencil,
  Eye,
  EyeOff,
  Home,
  Building2,
  MapPinned,
  Globe,
  Zap,
  Award,
  Target,
  Percent
} from 'lucide-react';

interface AdminConsoleProps {
  userInfo?: any;
  onLogout?: () => void;
}

export function AdminConsole({ userInfo, onLogout }: AdminConsoleProps) {
  const [activeTab, setActiveTab] = useState<'property' | 'integrations' | 'ai-agents' | 'management'>('property');
  
  // Hotel Management state
  const [selectedProperty, setSelectedProperty] = useState('neom-bay');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [managementView, setManagementView] = useState<'kiosk' | 'offline' | 'pms' | 'multi-property'>('kiosk');
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [bookingStep, setBookingStep] = useState<'calendar' | 'rooms' | 'confirmation'>('calendar');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  
  // Reservation Edit Modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingReservation, setEditingReservation] = useState<any>(null);
  const [reservations, setReservations] = useState<any[]>([]);

  const integrations = [
    {
      name: 'Opera PMS',
      type: 'PMS',
      status: 'connected',
      description: 'Property Management System integration',
      lastSync: '2 minutes ago',
      events: 156
    },
    {
      name: 'Salto Lock System',
      type: 'Locks',
      status: 'connected',
      description: 'Digital key and room access management',
      lastSync: '5 minutes ago',
      events: 23
    },
    {
      name: 'Stripe Payments',
      type: 'Payment',
      status: 'connected',
      description: 'Payment processing and pre-authorization',
      lastSync: '1 minute ago',
      events: 8
    },
    {
      name: 'Booking.com',
      type: 'OTA',
      status: 'warning',
      description: 'Online travel agency integration',
      lastSync: '2 hours ago',
      events: 45
    },
    {
      name: 'Expedia API',
      type: 'OTA',
      status: 'error',
      description: 'Channel manager connection',
      lastSync: '6 hours ago',
      events: 0
    },
    {
      name: 'IoT Controller',
      type: 'IoT',
      status: 'connected',
      description: 'Room automation and controls',
      lastSync: '30 seconds ago',
      events: 342
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-orange-400" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-400" />;
      default: return <XCircle className="w-5 h-5 text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return '#00A676';
      case 'warning': return '#FF6B35';
      case 'error': return '#EF4444';
      default: return '#6B7280';
    }
  };

  // Hotel Management Data
  const hotelProperties = [
    {
      id: 'neom-bay',
      name: 'NEOM Bay Resort',
      location: 'NEOM Bay, Tabuk',
      rooms: 450,
      occupancy: 87,
      revenue: 2847000,
      rating: 4.8,
      status: 'operational'
    },
    {
      id: 'neom-desert',
      name: 'NEOM Desert Lodge',
      location: 'Desert Valley, NEOM',
      rooms: 120,
      occupancy: 72,
      revenue: 890000,
      rating: 4.6,
      status: 'operational'
    },
    {
      id: 'neom-mountain',
      name: 'NEOM Mountain Retreat',
      location: 'Mountain Region, NEOM',
      rooms: 80,
      occupancy: 94,
      revenue: 650000,
      rating: 4.9,
      status: 'maintenance'
    }
  ];

  const roomTypes = [
    { id: 'standard', name: 'Standard Room', price: 350, available: 12, total: 100 },
    { id: 'deluxe', name: 'Deluxe Suite', price: 550, available: 8, total: 80 },
    { id: 'premium', name: 'Premium Ocean View', price: 750, available: 3, total: 50 },
    { id: 'presidential', name: 'Presidential Suite', price: 1200, available: 2, total: 10 }
  ];

  // Initialize reservations state if empty
  if (reservations.length === 0) {
    const initialReservations = [
      {
        id: 'RES001',
        guest: 'Ahmed Al-Rashid',
        room: '401',
        checkIn: '2024-12-28',
        checkOut: '2024-12-31',
        status: 'confirmed',
        paymentStatus: 'paid',
        amount: 1050,
        type: 'Deluxe Suite'
      },
      {
        id: 'RES002',
        guest: 'Sarah Johnson',
        room: '205',
        checkIn: '2024-12-29',
        checkOut: '2025-01-02',
        status: 'checked-in',
        paymentStatus: 'paid',
        amount: 1400,
        type: 'Premium Ocean View'
      },
      {
        id: 'RES003',
        guest: 'Mohammed bin Salman',
        room: 'P01',
        checkIn: '2024-12-30',
        checkOut: '2025-01-05',
        status: 'pending-payment',
        paymentStatus: 'unpaid',
        amount: 7200,
        type: 'Presidential Suite'
      },
      {
        id: 'RES004',
        guest: 'Fatima Al-Nahyan',
        room: '302',
        checkIn: '2024-12-27',
        checkOut: '2024-12-29',
        status: 'checked-out',
        paymentStatus: 'paid',
        amount: 700,
        type: 'Standard Room'
      },
      {
        id: 'RES005',
        guest: 'David Chen',
        room: '156',
        checkIn: '2024-12-28',
        checkOut: '2025-01-03',
        status: 'checked-in',
        paymentStatus: 'partially-paid',
        amount: 2100,
        type: 'Premium Ocean View'
      }
    ];
    setReservations(initialReservations);
  }

  const reservationsList = reservations;

  // Handlers for Reservation Edit Modal
  const handleOpenEditModal = (reservation: any) => {
    setEditingReservation({ ...reservation });
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingReservation(null);
  };

  const handleSaveReservation = () => {
    if (editingReservation) {
      setReservations(reservations.map(res => 
        res.id === editingReservation.id ? editingReservation : res
      ));
      handleCloseEditModal();
    }
  };

  const handleEditFieldChange = (field: string, value: any) => {
    if (editingReservation) {
      setEditingReservation({
        ...editingReservation,
        [field]: value
      });
    }
  };

  const eventTypes = [
    { id: 'wedding', name: 'Wedding', icon: PartyPopper, color: 'neom-emerald' },
    { id: 'conference', name: 'Conference', icon: Users, color: 'neom-cyan' },
    { id: 'gala', name: 'Gala Dinner', icon: Utensils, color: 'neom-orange' },
    { id: 'concert', name: 'Concert', icon: Music, color: 'neom-sand' }
  ];

  const renderKioskInterface = () => (
    <Card className="rounded-2xl bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-white">
          <Monitor className="w-5 h-5" />
          <span>Self Check-in Kiosk Interface</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Kiosk Screen Mockup */}
        <div className="bg-slate-900 rounded-2xl p-8 border-4 border-slate-600">
          <div className="bg-[rgba(18,14,80,1)] rounded-xl p-6 text-center space-y-6">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-neom-midnight flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <h2 className="text-2xl font-bold text-neom-midnight neom-heading">Welcome to NEOM Bay Resort</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6 border-2 border-neom-cyan hover:shadow-lg neom-transition cursor-pointer">
                <div className="text-center space-y-4">
                  <QrCode className="w-12 h-12 text-neom-cyan mx-auto" />
                  <h3 className="text-lg font-semibold text-neom-midnight neom-heading">Scan QR Code</h3>
                  <p className="text-sm neom-body text-[rgba(0,0,0,1)]">Scan your reservation QR code to check in</p>
                </div>
              </Card>
              
              <Card className="p-6 border-2 border-neom-emerald hover:shadow-lg neom-transition cursor-pointer">
                <div className="text-center space-y-4">
                  <Search className="w-12 h-12 text-neom-emerald mx-auto" />
                  <h3 className="text-lg font-semibold text-neom-midnight neom-heading">Find Reservation</h3>
                  <p className="text-sm text-gray-600 neom-body">Enter your confirmation number</p>
                </div>
              </Card>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-semibold text-neom-midnight mb-3 neom-heading">Digital Key Options</h4>
              <div className="flex space-x-4 justify-center">
                <Button className="bg-neom-cyan hover:bg-neom-cyan/90 text-white neom-transition">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Mobile Key
                </Button>
                <Button variant="outline" className="border-neom-orange text-neom-orange hover:bg-neom-orange hover:text-white neom-transition">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Physical Card
                </Button>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Need help? Press the assistance button</span>
              <Button size="sm" variant="outline" className="border-neom-midnight text-neom-midnight">
                <Phone className="w-4 h-4 mr-1" />
                Help
              </Button>
            </div>
          </div>
        </div>
        
        {/* Kiosk Settings */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-200 neom-heading">Kiosk Configuration</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">Auto Check-in</span>
                <Switch checked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">Digital Key Issuance</span>
                <Switch checked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">Upsell Offers</span>
                <Switch checked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">Language Selection</span>
                <Switch checked />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-200 neom-heading">System Status</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">Network Connection</span>
                <Badge className="bg-green-500 text-white">Online</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">PMS Integration</span>
                <Badge className="bg-green-500 text-white">Connected</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">Key System</span>
                <Badge className="bg-green-500 text-white">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">Payment Gateway</span>
                <Badge className="bg-green-500 text-white">Ready</Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderOfflineMode = () => (
    <Card className="rounded-2xl bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-white">
          <WifiOff className="w-5 h-5" />
          <span>Offline Mode - Manual Operations</span>
          <Badge className="bg-orange-500 text-white ml-2">Offline Mode Active</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Manual Key Issuance */}
        <Card className="bg-slate-900 border-slate-600">
          <CardHeader>
            <CardTitle className="text-slate-200 text-lg neom-heading">Manual Key Issuance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">Guest Name</label>
                <Input 
                  placeholder="Enter guest name" 
                  className="bg-slate-700 border-slate-600 text-white rounded-xl"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">Room Number</label>
                <Input 
                  placeholder="e.g., 401" 
                  className="bg-slate-700 border-slate-600 text-white rounded-xl"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">Confirmation #</label>
                <Input 
                  placeholder="Reservation confirmation" 
                  className="bg-slate-700 border-slate-600 text-white rounded-xl"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">Key Type</label>
                <Select>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white rounded-xl">
                    <SelectValue placeholder="Select key type" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="physical">Physical Card</SelectItem>
                    <SelectItem value="mobile">Mobile Key</SelectItem>
                    <SelectItem value="master">Master Key</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button className="flex-1 bg-neom-emerald hover:bg-neom-emerald/90 text-white neom-transition">
                <Key className="w-4 h-4 mr-2" />
                Issue Key
              </Button>
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-600">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Manual Payment Entry */}
        <Card className="bg-slate-900 border-slate-600">
          <CardHeader>
            <CardTitle className="text-slate-200 text-lg neom-heading">Manual Payment Entry</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">Amount</label>
                <Input 
                  placeholder="0.00" 
                  type="number"
                  className="bg-slate-700 border-slate-600 text-white rounded-xl"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">Currency</label>
                <Select defaultValue="SAR">
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="SAR">SAR - Saudi Riyal</SelectItem>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">Payment Method</label>
                <Select>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white rounded-xl">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="card">Credit Card</SelectItem>
                    <SelectItem value="transfer">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">Transaction Notes</label>
              <Input 
                placeholder="Optional notes about this transaction" 
                className="bg-slate-700 border-slate-600 text-white rounded-xl"
              />
            </div>
            
            <div className="flex space-x-3">
              <Button className="flex-1 bg-neom-cyan hover:bg-neom-cyan/90 text-white neom-transition">
                <Receipt className="w-4 h-4 mr-2" />
                Record Payment
              </Button>
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-600">
                <Download className="w-4 h-4 mr-2" />
                Print Receipt
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sync Status */}
        <Card className="bg-orange-900/20 border-orange-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <WifiOff className="w-6 h-6 text-orange-400" />
                <div>
                  <h4 className="font-semibold text-orange-200">Offline Mode Active</h4>
                  <p className="text-sm text-orange-300">Data will sync when connection is restored</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-orange-200">5 transactions pending</p>
                <Button size="sm" variant="outline" className="mt-2 border-orange-400 text-orange-300 hover:bg-orange-400 hover:text-white">
                  View Queue
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );

  const renderRoomBookingInterface = () => (
    <Card className="rounded-2xl bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-white">
          <Calendar className="w-5 h-5" />
          <span>Room Booking System</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Booking Steps */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          {[
            { id: 'calendar', name: 'Select Dates', icon: Calendar },
            { id: 'rooms', name: 'Choose Room', icon: Bed },
            { id: 'confirmation', name: 'Confirm Booking', icon: Check }
          ].map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                bookingStep === step.id 
                  ? 'bg-neom-cyan text-white border-neom-cyan' 
                  : 'border-slate-600 text-slate-400'
              }`}>
                <step.icon className="w-5 h-5" />
              </div>
              <span className={`ml-2 font-medium ${
                bookingStep === step.id ? 'text-white' : 'text-slate-400'
              }`}>
                {step.name}
              </span>
              {index < 2 && <ChevronRight className="w-4 h-4 text-slate-500 mx-4" />}
            </div>
          ))}
        </div>

        {/* Calendar Step */}
        {bookingStep === 'calendar' && (
          <div className="space-y-4">
            <Card className="bg-slate-900 border-slate-600">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4 neom-heading">Select Your Stay Dates</h3>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-sm font-medium text-slate-400 p-2">{day}</div>
                  ))}
                  {Array.from({length: 31}, (_, i) => i + 1).map(date => (
                    <Button
                      key={date}
                      variant="ghost"
                      size="sm"
                      className={`h-10 rounded-lg ${
                        date === 15 || date === 18 
                          ? 'bg-neom-cyan text-white' 
                          : 'text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {date}
                    </Button>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-400">
                    Check-in: Dec 15, 2024 • Check-out: Dec 18, 2024 • 3 nights
                  </div>
                  <Button 
                    onClick={() => setBookingStep('rooms')}
                    className="bg-neom-emerald hover:bg-neom-emerald/90 text-white neom-transition"
                  >
                    Continue to Rooms
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Room Selection Step */}
        {bookingStep === 'rooms' && (
          <div className="space-y-4">
            <Card className="bg-slate-900 border-slate-600">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4 neom-heading">Choose Your Room</h3>
                <div className="space-y-4">
                  {roomTypes.map((room) => (
                    <div key={room.id} className={`p-4 rounded-xl border-2 cursor-pointer neom-transition ${
                      selectedRoom?.id === room.id 
                        ? 'border-neom-cyan bg-neom-cyan/10' 
                        : 'border-slate-600 bg-slate-800 hover:border-slate-500'
                    }`} onClick={() => setSelectedRoom(room)}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Bed className="w-8 h-8 text-neom-cyan" />
                          <div>
                            <h4 className="font-semibold text-white neom-heading">{room.name}</h4>
                            <p className="text-sm text-slate-400">{room.available} of {room.total} available</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-white neom-mono">${room.price}</p>
                          <p className="text-sm text-slate-400">per night</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-6">
                  <Button 
                    variant="outline"
                    onClick={() => setBookingStep('calendar')}
                    className="border-slate-600 text-slate-300 hover:bg-slate-600"
                  >
                    Back to Calendar
                  </Button>
                  <Button 
                    onClick={() => setBookingStep('confirmation')}
                    disabled={!selectedRoom}
                    className="bg-neom-emerald hover:bg-neom-emerald/90 text-white neom-transition"
                  >
                    Continue to Confirmation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Confirmation Step */}
        {bookingStep === 'confirmation' && selectedRoom && (
          <div className="space-y-4">
            <Card className="bg-slate-900 border-slate-600">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4 neom-heading">Booking Confirmation</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-300 mb-2">Booking Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Check-in:</span>
                          <span className="text-white">Dec 15, 2024</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Check-out:</span>
                          <span className="text-white">Dec 18, 2024</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Nights:</span>
                          <span className="text-white">3</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Room Type:</span>
                          <span className="text-white">{selectedRoom.name}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-300 mb-2">Price Breakdown</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Room Rate (3 nights):</span>
                          <span className="text-white neom-mono">${selectedRoom.price * 3}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Taxes & Fees:</span>
                          <span className="text-white neom-mono">${Math.round(selectedRoom.price * 3 * 0.15)}</span>
                        </div>
                        <div className="border-t border-slate-600 pt-2 flex justify-between font-semibold">
                          <span className="text-white">Total:</span>
                          <span className="text-neom-emerald neom-mono">${Math.round(selectedRoom.price * 3 * 1.15)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between mt-6">
                  <Button 
                    variant="outline"
                    onClick={() => setBookingStep('rooms')}
                    className="border-slate-600 text-slate-300 hover:bg-slate-600"
                  >
                    Back to Rooms
                  </Button>
                  <Button className="bg-neom-emerald hover:bg-neom-emerald/90 text-white neom-transition">
                    <Check className="w-4 h-4 mr-2" />
                    Confirm Booking
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderEventManagement = () => (
    <Card className="rounded-2xl bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-white">
          <PartyPopper className="w-5 h-5" />
          <span>Event Management</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Event Types */}
        <div className="grid grid-cols-4 gap-4">
          {eventTypes.map((eventType) => {
            const IconComponent = eventType.icon;
            return (
              <Card 
                key={eventType.id}
                className={`bg-slate-900 border-slate-600 cursor-pointer neom-transition hover:border-${eventType.color}`}
                onClick={() => setSelectedEvent(eventType)}
              >
                <CardContent className="p-4 text-center">
                  <IconComponent className={`w-8 h-8 text-${eventType.color} mx-auto mb-2`} />
                  <h3 className="font-semibold text-white text-sm neom-heading">{eventType.name}</h3>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Event Details */}
        {selectedEvent && (
          <Card className="bg-slate-900 border-slate-600">
            <CardHeader>
              <CardTitle className="text-white neom-heading">{selectedEvent.name} Event Planning</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                {/* Event Information */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-200 neom-heading">Event Details</h4>
                  <div className="space-y-3">
                    <Input 
                      placeholder="Event name" 
                      className="bg-slate-700 border-slate-600 text-white rounded-xl"
                    />
                    <Input 
                      type="date" 
                      className="bg-slate-700 border-slate-600 text-white rounded-xl"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <Input 
                        type="time" 
                        placeholder="Start time"
                        className="bg-slate-700 border-slate-600 text-white rounded-xl"
                      />
                      <Input 
                        type="time" 
                        placeholder="End time"
                        className="bg-slate-700 border-slate-600 text-white rounded-xl"
                      />
                    </div>
                    <Input 
                      type="number" 
                      placeholder="Expected guests"
                      className="bg-slate-700 border-slate-600 text-white rounded-xl"
                    />
                  </div>
                </div>

                {/* Room Allocation */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-200 neom-heading">Venue Selection</h4>
                  <div className="space-y-3">
                    {[
                      { name: 'Grand Ballroom', capacity: 500, price: 2000 },
                      { name: 'Ocean View Hall', capacity: 200, price: 1200 },
                      { name: 'Garden Pavilion', capacity: 150, price: 800 },
                      { name: 'Executive Conference', capacity: 50, price: 500 }
                    ].map((venue) => (
                      <div key={venue.name} className="p-3 rounded-xl border border-slate-600 bg-slate-800 hover:bg-slate-750 neom-transition">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium text-white neom-heading">{venue.name}</h5>
                            <p className="text-sm text-slate-400">Capacity: {venue.capacity} guests</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-neom-emerald neom-mono">${venue.price}</p>
                            <p className="text-xs text-slate-400">per day</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Catering Options */}
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-200 neom-heading">Catering Packages</h4>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { 
                      name: 'Premium Package', 
                      price: 150, 
                      includes: ['5-course meal', 'Premium beverages', 'Chef service'],
                      color: 'neom-emerald'
                    },
                    { 
                      name: 'Standard Package', 
                      price: 100, 
                      includes: ['3-course meal', 'Standard beverages', 'Buffet service'],
                      color: 'neom-cyan'
                    },
                    { 
                      name: 'Basic Package', 
                      price: 75, 
                      includes: ['2-course meal', 'Soft drinks', 'Self-service'],
                      color: 'neom-orange'
                    }
                  ].map((pkg) => (
                    <Card key={pkg.name} className="bg-slate-800 border-slate-600 hover:border-slate-500 neom-transition cursor-pointer">
                      <CardContent className="p-4">
                        <h5 className="font-semibold text-white mb-2 neom-heading">{pkg.name}</h5>
                        <p className={`text-2xl font-bold text-${pkg.color} mb-3 neom-mono`}>${pkg.price}</p>
                        <p className="text-xs text-slate-400 mb-3">per person</p>
                        <ul className="space-y-1">
                          {pkg.includes.map((item, idx) => (
                            <li key={idx} className="text-xs text-slate-300 flex items-center">
                              <Check className="w-3 h-3 mr-1 text-green-400" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-600">
                  Save Draft
                </Button>
                <Button className="bg-neom-emerald hover:bg-neom-emerald/90 text-white neom-transition">
                  <Save className="w-4 h-4 mr-2" />
                  Create Event
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );

  const renderPMSScreen = () => (
    <Card className="rounded-2xl bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-white">
          <Building className="w-5 h-5" />
          <span>Property Management System</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="bg-slate-900 border-slate-600">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Occupancy Rate</p>
                  <p className="text-2xl font-bold text-neom-emerald neom-mono">87%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-neom-emerald" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900 border-slate-600">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Available Rooms</p>
                  <p className="text-2xl font-bold text-neom-cyan neom-mono">58</p>
                </div>
                <Bed className="w-8 h-8 text-neom-cyan" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900 border-slate-600">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Check-ins Today</p>
                  <p className="text-2xl font-bold text-neom-orange neom-mono">23</p>
                </div>
                <Users className="w-8 h-8 text-neom-orange" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900 border-slate-600">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Revenue Today</p>
                  <p className="text-2xl font-bold text-neom-sand neom-mono">$24.5K</p>
                </div>
                <DollarSign className="w-8 h-8 text-neom-sand" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reservations List */}
        <Card className="bg-slate-900 border-slate-600">
          <CardHeader>
            <CardTitle className="text-white neom-heading">Reservations Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-slate-700 hover:bg-slate-800/50 border-b transition-colors">
                    <th className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-slate-300 font-semibold">Guest Name</th>
                    <th className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-slate-300 font-semibold">Room/Suite</th>
                    <th className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-slate-300 font-semibold">Room #</th>
                    <th className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-slate-300 font-semibold">Check-in</th>
                    <th className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-slate-300 font-semibold">Check-out</th>
                    <th className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-slate-300 font-semibold">Status</th>
                    <th className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-slate-300 font-semibold">Payment</th>
                    <th className="text-foreground h-10 px-2 text-right align-middle font-medium whitespace-nowrap text-slate-300 font-semibold">Rate</th>
                    <th className="text-foreground h-10 px-2 text-center align-middle font-medium whitespace-nowrap text-slate-300 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {reservationsList.map((reservation) => (
                    <tr 
                      key={reservation.id} 
                      className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors border-slate-700 hover:bg-slate-800/70 neom-transition cursor-pointer"
                    >
                      <td className="p-2 align-middle whitespace-nowrap font-medium text-white">{reservation.guest}</td>
                      <td className="p-2 align-middle whitespace-nowrap text-slate-300">{reservation.type}</td>
                      <td className="p-2 align-middle whitespace-nowrap text-slate-300 neom-mono">{reservation.room}</td>
                      <td className="p-2 align-middle whitespace-nowrap text-slate-300 text-sm">{reservation.checkIn}</td>
                      <td className="p-2 align-middle whitespace-nowrap text-slate-300 text-sm">{reservation.checkOut}</td>
                      <td className="p-2 align-middle whitespace-nowrap">
                        <Badge className={`${
                          reservation.status === 'checked-in' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                          reservation.status === 'pending-payment' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                          reservation.status === 'confirmed' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                          'bg-slate-500/20 text-slate-400 border-slate-500/30'
                        } border backdrop-blur-sm`}>
                          {reservation.status === 'checked-in' ? 'Checked-in' :
                           reservation.status === 'pending-payment' ? 'Pending Payment' :
                           reservation.status === 'confirmed' ? 'Confirmed' :
                           'Checked-out'}
                        </Badge>
                      </td>
                      <td className="p-2 align-middle whitespace-nowrap">
                        <Badge className={`${
                          reservation.paymentStatus === 'paid' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                          reservation.paymentStatus === 'unpaid' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                          'bg-orange-500/20 text-orange-400 border-orange-500/30'
                        } border backdrop-blur-sm`}>
                          {reservation.paymentStatus === 'paid' ? 'Paid' :
                           reservation.paymentStatus === 'unpaid' ? 'Unpaid' :
                           'Partially Paid'}
                        </Badge>
                      </td>
                      <td className="p-2 align-middle whitespace-nowrap text-right text-neom-emerald font-semibold neom-mono">
                        ${reservation.amount.toLocaleString()}
                      </td>
                      <td className="p-2 align-middle whitespace-nowrap text-center">
                        <Button 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenEditModal(reservation);
                          }}
                          className="bg-black border-none text-white hover:bg-slate-700 neom-transition px-3 py-1.5"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Room Inventory */}
        <Card className="bg-slate-900 border-slate-600">
          <CardHeader>
            <CardTitle className="text-white neom-heading">Room Inventory & Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              {roomTypes.map((room) => (
                <div key={room.id} className="p-4 rounded-xl border border-slate-600 bg-slate-800">
                  <h4 className="font-semibold text-white mb-2 neom-heading">{room.name}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Available:</span>
                      <span className="text-neom-emerald font-semibold">{room.available}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Occupied:</span>
                      <span className="text-neom-cyan font-semibold">{room.total - room.available}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total:</span>
                      <span className="text-white font-semibold">{room.total}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-600">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Rate:</span>
                        <span className="text-neom-sand font-semibold neom-mono">${room.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reservation Edit Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-white neom-heading flex items-center space-x-2">
                <Pencil className="w-6 h-6 text-neom-cyan" />
                <span>Edit Reservation</span>
              </DialogTitle>
            </DialogHeader>
            
            {editingReservation && (
              <div className="space-y-4 py-4">
                {/* Guest Name */}
                <div className="space-y-2">
                  <Label htmlFor="guest" className="text-slate-300 font-medium">Guest Name</Label>
                  <Input
                    id="guest"
                    value={editingReservation.guest}
                    onChange={(e) => handleEditFieldChange('guest', e.target.value)}
                    className="bg-slate-800 border-slate-600 text-white rounded-xl focus:border-neom-cyan neom-transition"
                  />
                </div>

                {/* Room/Suite and Room Number */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type" className="text-slate-300 font-medium">Room/Suite</Label>
                    <Select 
                      value={editingReservation.type} 
                      onValueChange={(value) => handleEditFieldChange('type', value)}
                    >
                      <SelectTrigger className="bg-slate-800 border-slate-600 text-white rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        <SelectItem value="Standard Room">Standard Room</SelectItem>
                        <SelectItem value="Deluxe Suite">Deluxe Suite</SelectItem>
                        <SelectItem value="Premium Ocean View">Premium Ocean View</SelectItem>
                        <SelectItem value="Presidential Suite">Presidential Suite</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="room" className="text-slate-300 font-medium">Room Number</Label>
                    <Input
                      id="room"
                      value={editingReservation.room}
                      onChange={(e) => handleEditFieldChange('room', e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white rounded-xl focus:border-neom-cyan neom-transition neom-mono"
                    />
                  </div>
                </div>

                {/* Check-in and Check-out Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="checkIn" className="text-slate-300 font-medium">Check-in Date</Label>
                    <Input
                      id="checkIn"
                      type="date"
                      value={editingReservation.checkIn}
                      onChange={(e) => handleEditFieldChange('checkIn', e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white rounded-xl focus:border-neom-cyan neom-transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="checkOut" className="text-slate-300 font-medium">Check-out Date</Label>
                    <Input
                      id="checkOut"
                      type="date"
                      value={editingReservation.checkOut}
                      onChange={(e) => handleEditFieldChange('checkOut', e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white rounded-xl focus:border-neom-cyan neom-transition"
                    />
                  </div>
                </div>

                {/* Status and Payment Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status" className="text-slate-300 font-medium">Reservation Status</Label>
                    <Select 
                      value={editingReservation.status} 
                      onValueChange={(value) => handleEditFieldChange('status', value)}
                    >
                      <SelectTrigger className="bg-slate-800 border-slate-600 text-white rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        <SelectItem value="pending-payment">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                            <span>Pending Payment</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="confirmed">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                            <span>Confirmed</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="checked-in">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                            <span>Checked-in</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="checked-out">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                            <span>Checked-out</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="paymentStatus" className="text-slate-300 font-medium">Payment Status</Label>
                    <Select 
                      value={editingReservation.paymentStatus} 
                      onValueChange={(value) => handleEditFieldChange('paymentStatus', value)}
                    >
                      <SelectTrigger className="bg-slate-800 border-slate-600 text-white rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        <SelectItem value="unpaid">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-red-400"></div>
                            <span>Unpaid</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="partially-paid">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                            <span>Partially Paid</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="paid">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                            <span>Paid</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Rate */}
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-slate-300 font-medium">Total Rate ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={editingReservation.amount}
                    onChange={(e) => handleEditFieldChange('amount', parseFloat(e.target.value) || 0)}
                    className="bg-slate-800 border-slate-600 text-white rounded-xl focus:border-neom-cyan neom-transition neom-mono"
                  />
                </div>
              </div>
            )}

            <DialogFooter className="space-x-3">
              <Button 
                variant="outline" 
                onClick={handleCloseEditModal}
                className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white rounded-xl neom-transition"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSaveReservation}
                className="bg-neom-cyan hover:bg-neom-cyan/90 text-white rounded-xl neom-transition"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );

  const renderMultiPropertyDashboard = () => (
    <Card className="rounded-2xl bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-white">
          <Building2 className="w-5 h-5" />
          <span>Multi-Property Management Dashboard</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Property Overview */}
        <div className="grid grid-cols-3 gap-6">
          {hotelProperties.map((property) => (
            <Card key={property.id} className={`bg-slate-900 border-slate-600 cursor-pointer neom-transition hover:border-slate-500 ${
              selectedProperty === property.id ? 'border-neom-cyan' : ''
            }`} onClick={() => setSelectedProperty(property.id)}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-white neom-heading">{property.name}</h3>
                    <p className="text-sm text-slate-400 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {property.location}
                    </p>
                  </div>
                  <Badge className={`${
                    property.status === 'operational' ? 'bg-green-500' : 'bg-orange-500'
                  } text-white`}>
                    {property.status}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Occupancy Rate</span>
                    <span className={`font-semibold neom-mono ${
                      property.occupancy >= 90 ? 'text-neom-emerald' :
                      property.occupancy >= 75 ? 'text-neom-cyan' :
                      'text-neom-orange'
                    }`}>
                      {property.occupancy}%
                    </span>
                  </div>
                  
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        property.occupancy >= 90 ? 'bg-neom-emerald' :
                        property.occupancy >= 75 ? 'bg-neom-cyan' :
                        'bg-neom-orange'
                      }`}
                      style={{ width: `${property.occupancy}%` }}
                    ></div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-slate-400">Total Rooms</p>
                      <p className="font-semibold text-white neom-mono">{property.rooms}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Monthly Revenue</p>
                      <p className="font-semibold text-neom-emerald neom-mono">${property.revenue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Guest Rating</p>
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-neom-sand mr-1" />
                        <span className="font-semibold text-white neom-mono">{property.rating}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Available</p>
                      <p className="font-semibold text-neom-cyan neom-mono">{Math.round(property.rooms * (100 - property.occupancy) / 100)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Performance Metrics */}
        <Card className="bg-slate-900 border-slate-600">
          <CardHeader>
            <CardTitle className="text-white neom-heading">Portfolio Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-neom-emerald/20 flex items-center justify-center mx-auto mb-2">
                  <Building2 className="w-8 h-8 text-neom-emerald" />
                </div>
                <p className="text-2xl font-bold text-white neom-mono">3</p>
                <p className="text-sm text-slate-400">Properties</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-neom-cyan/20 flex items-center justify-center mx-auto mb-2">
                  <Bed className="w-8 h-8 text-neom-cyan" />
                </div>
                <p className="text-2xl font-bold text-white neom-mono">650</p>
                <p className="text-sm text-slate-400">Total Rooms</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-neom-orange/20 flex items-center justify-center mx-auto mb-2">
                  <Percent className="w-8 h-8 text-neom-orange" />
                </div>
                <p className="text-2xl font-bold text-white neom-mono">84%</p>
                <p className="text-sm text-slate-400">Avg Occupancy</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-neom-sand/20 flex items-center justify-center mx-auto mb-2">
                  <DollarSign className="w-8 h-8 text-neom-sand" />
                </div>
                <p className="text-2xl font-bold text-white neom-mono">$4.39M</p>
                <p className="text-sm text-slate-400">Monthly Revenue</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-2">
                  <Star className="w-8 h-8 text-yellow-400" />
                </div>
                <p className="text-2xl font-bold text-white neom-mono">4.77</p>
                <p className="text-sm text-slate-400">Avg Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comparative Analytics */}
        <div className="grid grid-cols-2 gap-6">
          <Card className="bg-slate-900 border-slate-600">
            <CardHeader>
              <CardTitle className="text-white neom-heading">Revenue Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {hotelProperties.map((property) => (
                  <div key={property.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        property.id === 'neom-bay' ? 'bg-neom-emerald' :
                        property.id === 'neom-desert' ? 'bg-neom-cyan' :
                        'bg-neom-orange'
                      }`}></div>
                      <span className="text-sm text-slate-300">{property.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-slate-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            property.id === 'neom-bay' ? 'bg-neom-emerald' :
                            property.id === 'neom-desert' ? 'bg-neom-cyan' :
                            'bg-neom-orange'
                          }`}
                          style={{ width: `${(property.revenue / 2847000) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-white neom-mono">${(property.revenue / 1000).toFixed(0)}K</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-600">
            <CardHeader>
              <CardTitle className="text-white neom-heading">Occupancy Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {hotelProperties.map((property) => (
                  <div key={property.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        property.id === 'neom-bay' ? 'bg-neom-emerald' :
                        property.id === 'neom-desert' ? 'bg-neom-cyan' :
                        'bg-neom-orange'
                      }`}></div>
                      <span className="text-sm text-slate-300">{property.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-slate-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            property.occupancy >= 90 ? 'bg-neom-emerald' :
                            property.occupancy >= 75 ? 'bg-neom-cyan' :
                            'bg-neom-orange'
                          }`}
                          style={{ width: `${property.occupancy}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-white neom-mono">{property.occupancy}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );

  const renderHotelManagement = () => (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-white neom-heading">Hotel Management & Property Tools</h2>
          <p className="text-slate-400">Comprehensive property management and operational tools</p>
        </div>
        <Button className="rounded-xl bg-slate-600 hover:bg-slate-500 text-white">
          <Plus className="w-4 h-4 mr-2" />
          New Property
        </Button>
      </div>

      {/* Management Tool Selector */}
      <Card className="rounded-2xl bg-slate-800 border-slate-700">
        <CardContent className="p-6">
          <div className="grid grid-cols-4 gap-4">
            {[
              { id: 'kiosk', name: 'Kiosk Interface', icon: Monitor, description: 'Guest self check-in system' },
              { id: 'offline', name: 'Offline Mode', icon: WifiOff, description: 'Manual operations & sync' },
              { id: 'pms', name: 'PMS Dashboard', icon: Building, description: 'Property management system' },
              { id: 'multi-property', name: 'Multi-Property', icon: Building2, description: 'Portfolio overview' }
            ].map((tool) => (
              <Card 
                key={tool.id}
                className={`cursor-pointer neom-transition ${
                  managementView === tool.id 
                    ? 'bg-neom-cyan/20 border-neom-cyan' 
                    : 'bg-slate-900 border-slate-600 hover:border-slate-500'
                }`}
                onClick={() => setManagementView(tool.id as any)}
              >
                <CardContent className="p-4 text-center">
                  <tool.icon className={`w-8 h-8 mx-auto mb-3 ${
                    managementView === tool.id ? 'text-neom-cyan' : 'text-slate-400'
                  }`} />
                  <h3 className={`font-semibold text-sm mb-1 neom-heading ${
                    managementView === tool.id ? 'text-white' : 'text-slate-300'
                  }`}>
                    {tool.name}
                  </h3>
                  <p className="text-xs text-slate-400">{tool.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Render Selected Management Tool */}
      {managementView === 'kiosk' && renderKioskInterface()}
      {managementView === 'offline' && renderOfflineMode()}
      {managementView === 'pms' && renderPMSScreen()}
      {managementView === 'multi-property' && renderMultiPropertyDashboard()}
    </div>
  );

  const renderPropertySetup = () => (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2 text-white">Property Setup</h2>
        <p className="text-slate-400">Configure your hotel profile and operational settings</p>
      </div>

      <Card className="rounded-2xl bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <Building className="w-5 h-5" />
            <span>Hotel Profile</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block text-slate-200">Hotel Name</label>
                <Input 
                  defaultValue="NEOM Bay Resort" 
                  className="rounded-xl bg-slate-700 border-slate-600 text-white" 
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block text-slate-200">Address</label>
                <Input 
                  defaultValue="NEOM Bay, Tabuk Province, Saudi Arabia" 
                  className="rounded-xl bg-slate-700 border-slate-600 text-white" 
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block text-slate-200">Contact Phone</label>
                <Input 
                  defaultValue="+966 123 456 789" 
                  className="rounded-xl bg-slate-700 border-slate-600 text-white" 
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block text-slate-200">Property Type</label>
                <Select defaultValue="luxury-resort">
                  <SelectTrigger className="rounded-xl bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="luxury-resort">Luxury Resort</SelectItem>
                    <SelectItem value="business-hotel">Business Hotel</SelectItem>
                    <SelectItem value="boutique">Boutique Hotel</SelectItem>
                    <SelectItem value="aparthotel">Aparthotel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block text-slate-200">Total Rooms</label>
                <Input 
                  defaultValue="450" 
                  type="number"
                  className="rounded-xl bg-slate-700 border-slate-600 text-white" 
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block text-slate-200">Email</label>
                <Input 
                  defaultValue="info@neombay.sa" 
                  type="email"
                  className="rounded-xl bg-slate-700 border-slate-600 text-white" 
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Amenities & Services</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: 'WiFi', enabled: true },
              { name: 'Pool', enabled: true },
              { name: 'Spa', enabled: true },
              { name: 'Fitness Center', enabled: true },
              { name: 'Room Service', enabled: true },
              { name: 'Concierge', enabled: true },
              { name: 'Valet Parking', enabled: true },
              { name: 'Business Center', enabled: false },
              { name: 'Pet Friendly', enabled: false },
              { name: 'Airport Shuttle', enabled: true },
              { name: 'Restaurant', enabled: true },
              { name: 'Bar/Lounge', enabled: true }
            ].map((amenity) => (
              <div key={amenity.name} className="flex items-center justify-between p-3 rounded-xl border border-slate-600 bg-slate-700">
                <span className="text-sm font-medium text-slate-200">{amenity.name}</span>
                <Switch checked={amenity.enabled} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button 
          size="lg"
          className="rounded-xl px-8 bg-slate-600 hover:bg-slate-500 text-white"
        >
          Save Configuration
        </Button>
      </div>
    </div>
  );

  const renderIntegrations = () => (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-white">Integration Layer</h2>
          <p className="text-slate-400">Manage connections to external systems and services</p>
        </div>
        <Button className="rounded-xl bg-slate-600 hover:bg-slate-500 text-white">
          <Plug className="w-4 h-4 mr-2" />
          Add Integration
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="rounded-2xl bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Connected</p>
                <p className="text-2xl font-semibold text-green-400">4</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Warnings</p>
                <p className="text-2xl font-semibold text-orange-400">1</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Errors</p>
                <p className="text-2xl font-semibold text-red-400">1</p>
              </div>
              <XCircle className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Events/Hour</p>
                <p className="text-2xl font-semibold text-cyan-400">574</p>
              </div>
              <Activity className="w-8 h-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Active Connectors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {integrations.map((integration, index) => (
              <div key={index} className="p-4 rounded-xl border border-slate-600 bg-slate-700 hover:bg-slate-650 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(integration.status)}
                      <div>
                        <h4 className="font-semibold text-slate-200">{integration.name}</h4>
                        <p className="text-sm text-slate-400">{integration.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right text-sm">
                      <p className="font-medium text-slate-200">{integration.events} events</p>
                      <p className="text-slate-400">Last sync: {integration.lastSync}</p>
                    </div>
                    
                    <Badge 
                      className="bg-slate-600 text-slate-200 border-slate-500"
                    >
                      {integration.type}
                    </Badge>
                    
                    <Button variant="outline" size="sm" className="rounded-xl border-slate-600 text-slate-300 hover:bg-slate-600">
                      Configure
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAIAgents = () => (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-white">AI Agents Panel</h2>
          <p className="text-slate-400">Manage intelligent automation and AI-powered services</p>
        </div>
        <Button className="rounded-xl bg-slate-600 hover:bg-slate-500 text-white">
          <Brain className="w-4 h-4 mr-2" />
          Deploy New Agent
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            name: 'Concierge AI',
            icon: MessageCircle,
            status: 'active',
            description: 'Multilingual guest assistance',
            requests: '1,247',
            accuracy: '94%',
            color: '#00A676'
          },
          {
            name: 'Upsell Assistant',
            icon: ShoppingCart,
            status: 'active',
            description: 'Revenue optimization',
            requests: '342',
            accuracy: '78%',
            color: '#17C3B2'
          },
          {
            name: 'Staff Co-Pilot',
            icon: UserCheck,
            status: 'active',
            description: 'Task optimization & routing',
            requests: '856',
            accuracy: '89%',
            color: '#FF6B35'
          },
          {
            name: 'Sustainability AI',
            icon: Leaf,
            status: 'inactive',
            description: 'Energy & resource optimization',
            requests: '0',
            accuracy: 'N/A',
            color: '#6B7280'
          }
        ].map((agent, index) => (
          <Card key={index} className="rounded-2xl bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${agent.color}20` }}
                  >
                    <agent.icon className="w-4 h-4" style={{ color: agent.color }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-slate-200">{agent.name}</h3>
                    <p className="text-xs text-slate-400">{agent.description}</p>
                  </div>
                </div>
                <Switch checked={agent.status === 'active'} />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Requests Today</span>
                  <span className="font-medium text-slate-200">{agent.requests}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Accuracy</span>
                  <span className="font-medium text-slate-200">{agent.accuracy}</span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-3 rounded-xl text-xs border-slate-600 text-slate-300 hover:bg-slate-600"
              >
                Configure
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-2xl bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <Bot className="w-5 h-5" />
            <span>AI Performance Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-200">Response Times</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Concierge AI</span>
                  <span className="font-medium text-slate-200">1.2s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Upsell Assistant</span>
                  <span className="font-medium text-slate-200">0.8s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Staff Co-Pilot</span>
                  <span className="font-medium text-slate-200">0.5s</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-200">Success Rates</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Guest Satisfaction</span>
                  <span className="font-medium text-slate-200">96%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Upsell Conversion</span>
                  <span className="font-medium text-slate-200">23%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Task Optimization</span>
                  <span className="font-medium text-slate-200">89%</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-200">Resource Usage</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">CPU Usage</span>
                  <span className="font-medium text-slate-200">34%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Memory</span>
                  <span className="font-medium text-slate-200">2.1 GB</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">API Calls/min</span>
                  <span className="font-medium text-slate-200">127</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

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
                <h1 className="text-xl font-semibold text-white">NEOM Admin Console</h1>
                <p className="text-sm text-slate-400">System Administration Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-slate-700 text-slate-200 border-slate-600">
                Admin Mode
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
            {[
              { id: 'property', name: 'Property Setup', icon: Building },
              { id: 'integrations', name: 'Integrations', icon: Plug },
              { id: 'ai-agents', name: 'AI Agents', icon: Bot },
              { id: 'management', name: 'Hotel Management', icon: Hotel }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'text-white border-slate-400'
                    : 'text-slate-400 border-transparent hover:text-slate-200 hover:border-slate-600'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto">
        {activeTab === 'property' && renderPropertySetup()}
        {activeTab === 'integrations' && renderIntegrations()}
        {activeTab === 'ai-agents' && renderAIAgents()}
        {activeTab === 'management' && renderHotelManagement()}
      </div>
    </div>
  );
}