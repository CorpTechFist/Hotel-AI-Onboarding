import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Checkbox } from './ui/checkbox';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { 
  Users, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Filter,
  Calendar,
  MapPin,
  User,
  ClipboardList,
  RotateCcw,
  UserCheck,
  Utensils,
  Bed,
  Wrench,
  Timer,
  LogOut,
  Bot,
  TrendingUp,
  Columns3,
  Lightbulb,
  Building2,
  MessageSquare,
  Bell,
  Search,
  Package,
  Star,
  Archive,
  FileText,
  Send,
  ThumbsUp,
  DollarSign,
  Eye,
  BookOpen,
  Share2,
  Target,
  Award,
  Zap,
  Coffee,
  ArrowRight,
  ArrowLeft,
  Activity,
  BarChart3,
  Shuffle,
  GitBranch,
  AlertCircle,
  Shield,
  Siren,
  Radio,
  FileCheck,
  Megaphone,
  Users2,
  UserCog,
  Navigation,
  TrendingDown,
  RefreshCw,
  Gauge,
  Settings,
  CircleDot,
  Heart,
  Wind,
  Home,
  Play,
  Pause,
  Square,
  Mic,
  MicOff,
  HelpCircle,
  Glasses,
  Smartphone,
  Route,
  Crosshair,
  Volume2,
  PhoneCall,
  Save
} from 'lucide-react';

interface StaffAppProps {
  staffInfo?: any;
  onLogout?: () => void;
}

type TabType = 'tasks' | 'details' | 'schedule' | 'kanban' | 'checklists' | 'communications' | 'lost-found' | 'staff-allocation' | 'crisis-management' | 'ar-assist' | 'quick-assist';

export function StaffApp({ staffInfo, onLogout }: StaffAppProps = {}) {
  const [activeTab, setActiveTab] = useState<TabType>('tasks');
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [checklistProgress, setChecklistProgress] = useState<{ [key: string]: boolean }>({});
  const [commFilter, setCommFilter] = useState<'all' | 'urgent' | 'department'>('all');
  const [selectedLostItem, setSelectedLostItem] = useState<any>(null);
  
  // Staff Allocation state
  const [allocationData, setAllocationData] = useState<any[]>([]);
  const [reallocationAlerts, setReallocationAlerts] = useState<any[]>([]);
  const [selectedStaffMember, setSelectedStaffMember] = useState<any>(null);
  
  // Crisis Management state
  const [crisisAlerts, setCrisisAlerts] = useState<any[]>([]);
  const [incidentLogs, setIncidentLogs] = useState<any[]>([]);
  const [evacuationStatus, setEvacuationStatus] = useState('normal');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [selectedIncident, setSelectedIncident] = useState<any>(null);
  
  // Schedule state
  const [scheduleView, setScheduleView] = useState<'calendar' | 'list'>('calendar');
  const [selectedDay, setSelectedDay] = useState<string>('today');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');

  // New Features State
  // 1. Break Timer
  const [breakTimer, setBreakTimer] = useState({
    isOnBreak: false,
    startTime: null as Date | null,
    elapsedTime: 0,
    totalBreakToday: 0
  });

  // 2. AR Assist
  const [arMode, setArMode] = useState<'off' | 'cleaning' | 'maintenance' | 'emergency'>('off');
  const [arOverlays, setArOverlays] = useState<any[]>([]);

  // 3. Quick Assist
  const [assistRequest, setAssistRequest] = useState<{
    type: 'technical' | 'security' | 'heavy-luggage' | null;
    isRequesting: boolean;
    requestTime: Date | null;
  }>({
    type: null,
    isRequesting: false,
    requestTime: null
  });

  // 4. Voice to Task
  const [voiceInput, setVoiceInput] = useState({
    isListening: false,
    transcript: '',
    isProcessing: false
  });

  // 5. Completed Tasks Tracking
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());
  const [completingTaskId, setCompletingTaskId] = useState<number | null>(null);

  // 6. AI Allocation Alert Management
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<number>>(new Set());
  const [appliedAlerts, setAppliedAlerts] = useState<Set<number>>(new Set());
  const [processingAlertId, setProcessingAlertId] = useState<number | null>(null);
  const [staffAllocations, setStaffAllocations] = useState([
    { department: 'Front Desk', staff: 3, capacity: 85, trend: 'up' as const, tasks: 12, efficiency: 87 },
    { department: 'Housekeeping', staff: 8, capacity: 78, trend: 'stable' as const, tasks: 22, efficiency: 91 },
    { department: 'F&B Service', staff: 5, capacity: 92, trend: 'up' as const, tasks: 18, efficiency: 89 },
    { department: 'Maintenance', staff: 4, capacity: 95, trend: 'down' as const, tasks: 6, efficiency: 96 },
    { department: 'Concierge', staff: 2, capacity: 65, trend: 'stable' as const, tasks: 8, efficiency: 88 }
  ]);

  // 7. Staff Reallocation Management
  const [dismissedReallocations, setDismissedReallocations] = useState<Set<number>>(new Set());
  const [executedReallocations, setExecutedReallocations] = useState<Set<number>>(new Set());
  const [processingReallocationId, setProcessingReallocationId] = useState<number | null>(null);

  // 8. Shift Swap Management
  const [swapRequests, setSwapRequests] = useState<any[]>([
    {
      id: 201,
      requestedShift: { id: 3, day: 'Wednesday', date: 'Oct 8', time: '2:00 PM - 10:00 PM' },
      requestedStaff: { name: 'Maria Santos', role: 'Housekeeping' },
      status: 'pending',
      requestDate: 'Oct 2, 2025'
    }
  ]);
  const [selectedShift, setSelectedShift] = useState<any>(null);
  const [selectedStaffForSwap, setSelectedStaffForSwap] = useState<any>(null);
  const [showSwapDialog, setShowSwapDialog] = useState(false);
  const [showMySchedule, setShowMySchedule] = useState(true);
  const [showSwapRequests, setShowSwapRequests] = useState(false);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);
  const [dismissedAiSuggestions, setDismissedAiSuggestions] = useState<Set<number>>(new Set());
  const [showShiftDetailsDialog, setShowShiftDetailsDialog] = useState(false);
  const [selectedShiftForDetails, setSelectedShiftForDetails] = useState<any>(null);

  // 9. Time Off Request Management
  const [timeOffRequests, setTimeOffRequests] = useState<any[]>([]);
  const [showTimeOffDialog, setShowTimeOffDialog] = useState(false);
  const [timeOffFormData, setTimeOffFormData] = useState({
    startDate: '',
    endDate: '',
    reason: '',
    replacement: ''
  });
  const [showTimeOffConfirmation, setShowTimeOffConfirmation] = useState(false);

  // 10. Report Found Item Management
  const [reportFoundItemData, setReportFoundItemData] = useState({
    itemDescription: '',
    roomNumber: '',
    dateTime: new Date().toISOString().slice(0, 16), // Current date/time in YYYY-MM-DDTHH:mm format
    photo: null as File | null,
    photoPreview: '' as string
  });
  const [showReportConfirmation, setShowReportConfirmation] = useState(false);
  const [myReports, setMyReports] = useState([
    {
      id: 1,
      itemDescription: 'iPhone 14 Pro with blue case',
      roomNumber: '2501',
      dateReported: '2025-10-01 14:30',
      status: 'returned_to_guest'
    },
    {
      id: 2,
      itemDescription: 'Black leather wallet with credit cards',
      roomNumber: '1805',
      dateReported: '2025-10-02 09:15',
      status: 'assigned_to_team'
    },
    {
      id: 3,
      itemDescription: 'Gold wedding ring',
      roomNumber: '3210',
      dateReported: '2025-10-03 11:45',
      status: 'submitted'
    }
  ]);

  // 11. Crisis & Safety Management
  const [showReportIncidentDialog, setShowReportIncidentDialog] = useState(false);
  const [showQuickLogDialog, setShowQuickLogDialog] = useState(false);
  const [showEmergencyAlertDialog, setShowEmergencyAlertDialog] = useState(false);
  const [showBroadcastDialog, setShowBroadcastDialog] = useState(false);
  const [reportIncidentData, setReportIncidentData] = useState({
    incidentType: '',
    location: '',
    time: new Date().toISOString().slice(0, 16),
    severity: '',
    description: '',
    photo: null as File | null,
    photoPreview: '' as string
  });
  const [quickLogData, setQuickLogData] = useState({
    title: '',
    location: '',
    time: new Date().toISOString().slice(0, 16)
  });
  const [broadcastData, setBroadcastData] = useState({
    subject: '',
    message: '',
    priority: 'normal'
  });
  const [showIncidentConfirmation, setShowIncidentConfirmation] = useState(false);
  const [showQuickLogConfirmation, setShowQuickLogConfirmation] = useState(false);
  const [showEmergencyAlertConfirmation, setShowEmergencyAlertConfirmation] = useState(false);
  const [showBroadcastConfirmation, setShowBroadcastConfirmation] = useState(false);

  // Break Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (breakTimer.isOnBreak && breakTimer.startTime) {
      interval = setInterval(() => {
        setBreakTimer(prev => ({
          ...prev,
          elapsedTime: Math.floor((Date.now() - prev.startTime!.getTime()) / 1000)
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [breakTimer.isOnBreak, breakTimer.startTime]);

  // All tasks in the system
  const allTasks = [
    // Housekeeping Tasks
    {
      id: 1,
      name: 'Room Cleaning',
      room: '2501',
      department: 'housekeeping',
      priority: 'high',
      slaMinutes: 30,
      elapsed: 15,
      description: 'Standard checkout cleaning for Royal Suite',
      guestNotes: 'Guest requested extra towels for next arrival',
      status: 'assigned',
      floor: 25,
      assignedTo: 'Ahmed Malik',
      checklistId: 'housekeeping-standard'
    },
    {
      id: 4,
      name: 'Welcome Amenities',
      room: '2801',
      department: 'housekeeping',
      priority: 'low',
      slaMinutes: 120,
      elapsed: 30,
      description: 'VIP welcome setup for arriving guest',
      guestNotes: 'Celebrating wedding anniversary',
      status: 'pending',
      floor: 28,
      assignedTo: 'Sarah Ahmed',
      checklistId: 'housekeeping-vip'
    },
    {
      id: 7,
      name: 'Linen Replacement',
      room: '2503',
      department: 'housekeeping',
      priority: 'medium',
      slaMinutes: 45,
      elapsed: 10,
      description: 'Replace stained bedding reported by guest',
      guestNotes: 'Guest mentioned coffee spill on duvet cover',
      status: 'pending',
      floor: 25,
      assignedTo: 'Ahmed Malik',
      checklistId: 'housekeeping-linen'
    },
    
    // F&B Tasks
    {
      id: 2,
      name: 'Room Service Order',
      room: '2304',
      department: 'fnb',
      priority: 'high',
      slaMinutes: 30,
      elapsed: 20,
      description: 'Dinner delivery for 2 guests',
      guestNotes: 'Guest has dietary restrictions - vegetarian',
      status: 'pending',
      deliveryTime: '19:30',
      assignedTo: 'Omar Hassan',
      checklistId: 'fnb-room-service'
    },
    {
      id: 5,
      name: 'Minibar Restocking',
      room: '2607',
      department: 'fnb',
      priority: 'medium',
      slaMinutes: 60,
      elapsed: 15,
      description: 'Restock minibar after checkout',
      guestNotes: 'Standard restocking protocol',
      status: 'assigned',
      deliveryTime: '20:00',
      assignedTo: 'Layla Al-Rashid',
      checklistId: 'fnb-minibar'
    },
    
    // Maintenance Tasks
    {
      id: 3,
      name: 'AC Maintenance',
      room: '2607',
      department: 'maintenance',
      priority: 'high',
      slaMinutes: 60,
      elapsed: 45,
      description: 'Guest reported AC not cooling effectively',
      guestNotes: 'Temperature showing 26°C despite setting to 20°C',
      status: 'in_progress',
      issueType: 'HVAC',
      assignedTo: 'Khalid bin Salman',
      checklistId: 'maintenance-hvac'
    }
  ];

  // SOPs and Checklists
  const checklists = {
    'housekeeping-standard': {
      name: 'Standard Room Cleaning',
      department: 'housekeeping',
      estimatedTime: 30,
      steps: [
        { id: 'h1', task: 'Check room status and guest departure', required: true },
        { id: 'h2', task: 'Remove all linens and towels', required: true },
        { id: 'h3', task: 'Clean and disinfect bathroom thoroughly', required: true },
        { id: 'h4', task: 'Vacuum carpets and mop hard floors', required: true },
        { id: 'h5', task: 'Dust all surfaces and furniture', required: true },
        { id: 'h6', task: 'Replace linens with fresh bedding', required: true },
        { id: 'h7', task: 'Restock bathroom amenities', required: true },
        { id: 'h8', task: 'Check and replace tea/coffee supplies', required: false },
        { id: 'h9', task: 'Final inspection and room photo', required: true }
      ]
    },
    'fnb-room-service': {
      name: 'Room Service Delivery',
      department: 'fnb',
      estimatedTime: 20,
      steps: [
        { id: 'f1', task: 'Verify order details and dietary restrictions', required: true },
        { id: 'f2', task: 'Prepare and package food items', required: true },
        { id: 'f3', task: 'Check presentation and temperature', required: true },
        { id: 'f4', task: 'Load delivery trolley with utensils', required: true },
        { id: 'f5', task: 'Call guest to confirm delivery time', required: false },
        { id: 'f6', task: 'Deliver to room and set up', required: true },
        { id: 'f7', task: 'Collect payment if required', required: false },
        { id: 'f8', task: 'Update order status in system', required: true }
      ]
    },
    'maintenance-hvac': {
      name: 'HVAC System Check',
      department: 'maintenance',
      estimatedTime: 45,
      steps: [
        { id: 'm1', task: 'Check thermostat settings and display', required: true },
        { id: 'm2', task: 'Inspect air filters for blockages', required: true },
        { id: 'm3', task: 'Test cooling function and airflow', required: true },
        { id: 'm4', task: 'Check refrigerant levels if needed', required: false },
        { id: 'm5', task: 'Clean air vents and ducts', required: true },
        { id: 'm6', task: 'Test all control functions', required: true },
        { id: 'm7', task: 'Document issue and resolution', required: true },
        { id: 'm8', task: 'Update maintenance log', required: true }
      ]
    }
  };

  // Communications data
  const communications = [
    {
      id: 1,
      type: 'urgent',
      title: 'VIP Guest Arrival - Presidential Suite',
      message: 'Mr. & Mrs. Al-Saud arriving at 15:30. Ensure premium welcome setup and personal butler service.',
      department: 'all',
      author: 'Guest Relations Manager',
      timestamp: '2 min ago',
      priority: 'urgent'
    },
    {
      id: 2,
      type: 'announcement',
      title: 'New Eco-Initiative Launch',
      message: 'Starting Monday: New recycling protocols for all departments. Training sessions scheduled for this week.',
      department: 'all',
      author: 'Sustainability Manager',
      timestamp: '1 hour ago',
      priority: 'normal'
    },
    {
      id: 3,
      type: 'department',
      title: 'Housekeeping: New Cleaning Supplies',
      message: 'Eco-friendly cleaning products arrived. Please use new protocols for guest rooms starting today.',
      department: 'housekeeping',
      author: 'Housekeeping Manager',
      timestamp: '3 hours ago',
      priority: 'normal'
    },
    {
      id: 4,
      type: 'urgent',
      title: 'System Maintenance Tonight',
      message: 'Hotel management system will be offline from 02:00-04:00 for updates. Plan accordingly.',
      department: 'all',
      author: 'IT Manager',
      timestamp: '5 hours ago',
      priority: 'urgent'
    }
  ];

  // Lost & Found items
  const lostFoundItems = [
    {
      id: 1,
      item: 'iPhone 14 Pro',
      description: 'Gold iPhone with NEOM logo case',
      room: '2501',
      foundBy: 'Ahmed Malik',
      foundDate: '2024-12-22',
      status: 'found',
      guestContact: 'sarah.ahmed@email.com',
      category: 'electronics',
      value: 'high'
    },
    {
      id: 2,
      item: 'Diamond Earrings',
      description: 'Pair of diamond stud earrings in jewelry box',
      room: '2304',
      foundBy: 'Layla Al-Rashid',
      foundDate: '2024-12-21',
      status: 'in_progress',
      guestContact: 'guest.services@neom.sa',
      category: 'jewelry',
      value: 'high'
    },
    {
      id: 3,
      item: 'Leather Wallet',
      description: 'Black leather wallet with business cards',
      room: '2607',
      foundBy: 'Omar Hassan',
      foundDate: '2024-12-21',
      status: 'returned',
      guestContact: 'contacted',
      category: 'personal',
      value: 'medium'
    },
    {
      id: 4,
      item: 'Reading Glasses',
      description: 'Prescription glasses in brown case',
      room: '2801',
      foundBy: 'Sarah Ahmed',
      foundDate: '2024-12-20',
      status: 'found',
      guestContact: 'pending',
      category: 'personal',
      value: 'low'
    }
  ];

  // Filter tasks based on logged-in staff role
  const userRole = staffInfo?.role;
  const roleTasks = allTasks.filter(task => {
    if (userRole === 'housekeeping') return task.department === 'housekeeping';
    if (userRole === 'fnb') return task.department === 'fnb';
    if (userRole === 'maintenance') return task.department === 'maintenance';
    return true; // For supervisors or other roles, show all tasks
  });

  // Department-specific colors
  const getDepartmentColor = (dept: string) => {
    switch (dept) {
      case 'housekeeping': return '#00A676'; // Emerald Green
      case 'fnb': return '#17C3B2'; // Sky Cyan
      case 'maintenance': return '#FF6B35'; // Sunset Orange
      default: return '#6B7280';
    }
  };

  const getDepartmentIcon = (dept: string) => {
    switch (dept) {
      case 'housekeeping': return Bed;
      case 'fnb': return Utensils;
      case 'maintenance': return Wrench;
      default: return ClipboardList;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getSLAColor = (elapsed: number, total: number) => {
    const percentage = (elapsed / total) * 100;
    if (percentage > 80) return '#EF4444';
    if (percentage > 60) return '#F59E0B';
    return '#10B981';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'found': return '#F59E0B';
      case 'in_progress': return '#17C3B2';
      case 'returned': return '#00A676';
      default: return '#6B7280';
    }
  };

  const handleChecklistItem = (checklistId: string, stepId: string, checked: boolean) => {
    setChecklistProgress(prev => ({
      ...prev,
      [`${checklistId}-${stepId}`]: checked
    }));
  };

  const getChecklistProgress = (checklistId: string) => {
    const checklist = checklists[checklistId as keyof typeof checklists];
    if (!checklist) return { completed: 0, total: 0, percentage: 0 };
    
    const completedSteps = checklist.steps.filter(step => 
      checklistProgress[`${checklistId}-${step.id}`]
    ).length;
    
    return {
      completed: completedSteps,
      total: checklist.steps.length,
      percentage: Math.round((completedSteps / checklist.steps.length) * 100)
    };
  };

  // New Feature Handlers
  
  // 1. Break Timer Functions
  const handleBreakStart = () => {
    setBreakTimer({
      isOnBreak: true,
      startTime: new Date(),
      elapsedTime: 0,
      totalBreakToday: breakTimer.totalBreakToday
    });
  };

  const handleBreakEnd = () => {
    if (breakTimer.startTime) {
      const breakDuration = Math.floor((Date.now() - breakTimer.startTime.getTime()) / 1000);
      setBreakTimer({
        isOnBreak: false,
        startTime: null,
        elapsedTime: 0,
        totalBreakToday: breakTimer.totalBreakToday + breakDuration
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 2. AR Assist Functions
  const handleArModeChange = (mode: 'off' | 'cleaning' | 'maintenance' | 'emergency') => {
    setArMode(mode);
    if (mode !== 'off') {
      // Generate mock AR overlays based on mode
      const mockOverlays = {
        cleaning: [
          { id: 1, type: 'cleaning-sequence', position: { x: 50, y: 30 }, message: 'Start here: Bathroom cleaning' },
          { id: 2, type: 'cleaning-sequence', position: { x: 75, y: 60 }, message: 'Next: Vacuum carpet area' }
        ],
        maintenance: [
          { id: 1, type: 'equipment-fault', position: { x: 60, y: 40 }, message: 'HVAC filter needs replacement' },
          { id: 2, type: 'safety-warning', position: { x: 40, y: 70 }, message: 'Electrical panel - Caution' }
        ],
        emergency: [
          { id: 1, type: 'evacuation-path', position: { x: 45, y: 20 }, message: 'Emergency Exit Route' },
          { id: 2, type: 'assembly-point', position: { x: 80, y: 50 }, message: 'Assembly Point' }
        ]
      };
      setArOverlays(mockOverlays[mode] || []);
    } else {
      setArOverlays([]);
    }
  };

  // 3. Quick Assist Functions
  const handleQuickAssist = (type: 'technical' | 'security' | 'heavy-luggage') => {
    setAssistRequest({
      type,
      isRequesting: true,
      requestTime: new Date()
    });
    
    // Simulate finding nearby staff
    setTimeout(() => {
      setAssistRequest(prev => ({
        ...prev,
        isRequesting: false
      }));
    }, 3000);
  };

  const cancelAssistRequest = () => {
    setAssistRequest({
      type: null,
      isRequesting: false,
      requestTime: null
    });
  };

  // 4. Voice to Task Functions
  const handleVoiceStart = () => {
    setVoiceInput({ isListening: true, transcript: '', isProcessing: false });
    
    // Mock voice recognition
    setTimeout(() => {
      const mockTranscripts = [
        "Check minibar in room 2304",
        "Clean bathroom in presidential suite",
        "Fix air conditioning in room 2607",
        "Deliver extra towels to room 2501"
      ];
      const randomTranscript = mockTranscripts[Math.floor(Math.random() * mockTranscripts.length)];
      
      setVoiceInput(prev => ({
        ...prev,
        isListening: false,
        transcript: randomTranscript,
        isProcessing: true
      }));
      
      // Process the voice input into a task
      setTimeout(() => {
        setVoiceInput(prev => ({
          ...prev,
          isProcessing: false
        }));
        // Here you would normally add the task to the system
      }, 2000);
    }, 3000);
  };

  const handleVoiceStop = () => {
    setVoiceInput({ isListening: false, transcript: '', isProcessing: false });
  };

  // 5. Complete Task Handler
  const handleCompleteTask = (taskId: number) => {
    setCompletingTaskId(taskId);
    
    // Simulate completion with animation
    setTimeout(() => {
      setCompletedTasks(prev => new Set([...prev, taskId]));
      setCompletingTaskId(null);
      
      // Optionally navigate back to tasks view
      setTimeout(() => {
        setActiveTab('tasks');
        setSelectedTask(null);
      }, 1000);
    }, 800);
  };

  // 6. AI Allocation Alert Handlers
  const handleApplyAlert = (alertId: number, fromDept: string, toDept: string, staffCount: number) => {
    setProcessingAlertId(alertId);
    
    // Simulate processing with animation
    setTimeout(() => {
      // Update staff allocations
      setStaffAllocations(prev => prev.map(dept => {
        if (dept.department === fromDept) {
          const newStaff = Math.max(0, dept.staff - staffCount);
          const newCapacity = Math.max(50, dept.capacity - 10);
          return { ...dept, staff: newStaff, capacity: newCapacity };
        }
        if (dept.department === toDept) {
          const newStaff = dept.staff + staffCount;
          const newCapacity = Math.min(100, dept.capacity + 15);
          return { ...dept, staff: newStaff, capacity: newCapacity };
        }
        return dept;
      }));
      
      // Mark alert as applied
      setAppliedAlerts(prev => new Set([...prev, alertId]));
      setProcessingAlertId(null);
      
      // Auto-remove after showing confirmation
      setTimeout(() => {
        setAppliedAlerts(prev => {
          const newSet = new Set(prev);
          newSet.delete(alertId);
          return newSet;
        });
        setDismissedAlerts(prev => new Set([...prev, alertId]));
      }, 3000);
    }, 800);
  };

  const handleDismissAlert = (alertId: number) => {
    setProcessingAlertId(alertId);
    
    setTimeout(() => {
      setDismissedAlerts(prev => new Set([...prev, alertId]));
      setProcessingAlertId(null);
    }, 400);
  };

  // 7. Staff Reallocation Handlers
  const handleExecuteReallocation = (reallocationId: number, fromDept: string, toDept: string) => {
    setProcessingReallocationId(reallocationId);
    
    // Simulate processing with animation
    setTimeout(() => {
      // Update staff allocations
      setStaffAllocations(prev => prev.map(dept => {
        // Extract base department name for matching
        const fromBase = fromDept.split(' ')[0];
        const toBase = toDept.split(' ')[0];
        const deptBase = dept.department.split(' ')[0];
        
        if (deptBase === fromBase || dept.department === fromDept) {
          const newStaff = Math.max(0, dept.staff - 1);
          const newCapacity = Math.max(50, dept.capacity - 8);
          return { ...dept, staff: newStaff, capacity: newCapacity };
        }
        if (deptBase === toBase || dept.department === toDept) {
          const newStaff = dept.staff + 1;
          const newCapacity = Math.min(100, dept.capacity + 12);
          return { ...dept, staff: newStaff, capacity: newCapacity };
        }
        return dept;
      }));
      
      // Mark reallocation as executed
      setExecutedReallocations(prev => new Set([...prev, reallocationId]));
      setProcessingReallocationId(null);
      
      // Auto-remove after showing confirmation
      setTimeout(() => {
        setExecutedReallocations(prev => {
          const newSet = new Set(prev);
          newSet.delete(reallocationId);
          return newSet;
        });
        setDismissedReallocations(prev => new Set([...prev, reallocationId]));
      }, 3000);
    }, 800);
  };

  const handleDismissReallocation = (reallocationId: number) => {
    setProcessingReallocationId(reallocationId);
    
    setTimeout(() => {
      setDismissedReallocations(prev => new Set([...prev, reallocationId]));
      setProcessingReallocationId(null);
    }, 400);
  };

  // 10. Report Found Item Handlers
  const handleReportFoundItemChange = (field: string, value: any) => {
    setReportFoundItemData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReportFoundItemData(prev => ({
        ...prev,
        photo: file,
        photoPreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmitFoundItemReport = () => {
    // Validate form
    if (!reportFoundItemData.itemDescription || !reportFoundItemData.roomNumber) {
      return;
    }

    // Create new report entry
    const newReport = {
      id: myReports.length + 1,
      itemDescription: reportFoundItemData.itemDescription,
      roomNumber: reportFoundItemData.roomNumber,
      dateReported: new Date(reportFoundItemData.dateTime).toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).replace(',', ''),
      status: 'submitted'
    };

    // Add to my reports
    setMyReports(prev => [newReport, ...prev]);

    // Show confirmation
    setShowReportConfirmation(true);

    // Reset form after showing confirmation
    setTimeout(() => {
      setReportFoundItemData({
        itemDescription: '',
        roomNumber: '',
        dateTime: new Date().toISOString().slice(0, 16),
        photo: null,
        photoPreview: ''
      });
      setShowReportConfirmation(false);
    }, 3000);
  };

  // 11. Crisis & Safety Handlers
  const handleReportIncidentChange = (field: string, value: any) => {
    setReportIncidentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleIncidentPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReportIncidentData(prev => ({
        ...prev,
        photo: file,
        photoPreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmitReportIncident = () => {
    if (!reportIncidentData.incidentType || !reportIncidentData.location || !reportIncidentData.severity) {
      return;
    }

    setShowReportIncidentDialog(false);
    setShowIncidentConfirmation(true);

    setTimeout(() => {
      setReportIncidentData({
        incidentType: '',
        location: '',
        time: new Date().toISOString().slice(0, 16),
        severity: '',
        description: '',
        photo: null,
        photoPreview: ''
      });
      setShowIncidentConfirmation(false);
    }, 3000);
  };

  const handleQuickLogChange = (field: string, value: any) => {
    setQuickLogData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitQuickLog = () => {
    if (!quickLogData.title || !quickLogData.location) {
      return;
    }

    setShowQuickLogDialog(false);
    setShowQuickLogConfirmation(true);

    setTimeout(() => {
      setQuickLogData({
        title: '',
        location: '',
        time: new Date().toISOString().slice(0, 16)
      });
      setShowQuickLogConfirmation(false);
    }, 3000);
  };

  const handleSendEmergencyAlert = () => {
    setShowEmergencyAlertDialog(false);
    setShowEmergencyAlertConfirmation(true);

    setTimeout(() => {
      setShowEmergencyAlertConfirmation(false);
    }, 3000);
  };

  const handleBroadcastChange = (field: string, value: any) => {
    setBroadcastData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSendBroadcast = () => {
    if (!broadcastData.subject || !broadcastData.message) {
      return;
    }

    setShowBroadcastDialog(false);
    setShowBroadcastConfirmation(true);

    setTimeout(() => {
      setBroadcastData({
        subject: '',
        message: '',
        priority: 'normal'
      });
      setShowBroadcastConfirmation(false);
    }, 3000);
  };

  const renderTaskDashboard = () => {
    const stats = {
      pending: roleTasks.filter(t => t.status === 'pending').length,
      inProgress: roleTasks.filter(t => t.status === 'in_progress' || t.status === 'assigned').length,
      atRisk: roleTasks.filter(t => (t.elapsed / t.slaMinutes) > 0.8).length
    };
    
    const departmentColor = getDepartmentColor(userRole);
    const departmentName = userRole?.charAt(0).toUpperCase() + userRole?.slice(1) || 'Staff';
    
    // AI Suggestions for task reallocation
    const aiSuggestions = [
      {
        taskId: 1,
        type: 'delay_prediction',
        message: 'Room 210 cleaning delayed – suggest reassign to Maria Santos',
        confidence: 85,
        action: 'reassign',
        urgency: 'high'
      },
      {
        taskId: 3,
        type: 'efficiency',
        message: 'David Chen available for additional tasks in your area',
        confidence: 78,
        action: 'optimize',
        urgency: 'low'
      }
    ];
    
    return (
      <div className="p-6 space-y-6">
        {/* AI Suggestions Alert Bar */}
        {aiSuggestions.length > 0 && (
          <Card className="rounded-2xl bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-500/30 neom-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white neom-heading">AI Assistant Active</h4>
                    <p className="text-sm text-slate-300">{aiSuggestions.length} optimization suggestions available</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-900/20">
                  <Eye className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white neom-heading">{departmentName} Co-Pilot</h2>
            <p className="text-slate-400 neom-body">Task management & operations</p>
          </div>
          <div className="flex items-center space-x-3">
            {/* Break Timer */}
            <Card className="rounded-xl bg-slate-800 border-slate-700 p-3">
              <div className="flex items-center space-x-3">
                <div className="text-center">
                  <p className="text-xs text-slate-400 neom-body">Break Time</p>
                  <p className="text-sm font-mono text-white">{formatTime(breakTimer.elapsedTime)}</p>
                </div>
                <Button 
                  onClick={breakTimer.isOnBreak ? handleBreakEnd : handleBreakStart}
                  size="sm"
                  className={`w-10 h-10 p-0 rounded-full ${
                    breakTimer.isOnBreak 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'bg-emerald-600 hover:bg-emerald-700'
                  }`}
                >
                  {breakTimer.isOnBreak ? (
                    <Square className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </Card>

            {/* Quick Assist Button */}
            <Card className="rounded-xl bg-gradient-to-r from-orange-600 to-red-600 border-orange-500 p-3">
              <div className="flex items-center space-x-2">
                <Button 
                  onClick={() => setActiveTab('quick-assist')}
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-0 rounded-lg"
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  SOS
                </Button>
                {assistRequest.isRequesting && (
                  <div className="flex items-center space-x-1 text-white">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-xs">Finding help...</span>
                  </div>
                )}
              </div>
            </Card>

            <Badge 
              variant="secondary" 
              className="text-white border-0"
              style={{ backgroundColor: departmentColor }}
            >
              {departmentName} Tasks
            </Badge>
            <Avatar>
              <AvatarFallback style={{ backgroundColor: departmentColor, color: 'white' }}>
                {staffInfo?.name?.split(' ').map((n: string) => n[0]).join('') || 'ST'}
              </AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-medium text-slate-200 neom-heading">{staffInfo?.name || 'Staff Member'}</p>
              <p className="text-slate-400 neom-body">{departmentName} Department</p>
            </div>
            {onLogout && (
              <Button 
                onClick={onLogout}
                variant="ghost" 
                size="sm"
                className="text-slate-400 hover:text-slate-200 hover:bg-slate-700 neom-transition"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="rounded-2xl bg-slate-800 border-slate-700 neom-card neom-hover-lift">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400 neom-body">Pending</p>
                  <p className="text-2xl font-semibold text-orange-400 neom-mono">{stats.pending}</p>
                </div>
                <Clock className="w-8 h-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl bg-slate-800 border-slate-700 neom-card neom-hover-lift">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400 neom-body">In Progress</p>
                  <p className="text-2xl font-semibold text-cyan-400 neom-mono">{stats.inProgress}</p>
                </div>
                <Timer className="w-8 h-8 text-cyan-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl bg-slate-800 border-slate-700 neom-card neom-hover-lift">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400 neom-body">At Risk</p>
                  <p className="text-2xl font-semibold text-red-400 neom-mono">{stats.atRisk}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl bg-slate-800 border-slate-700 neom-card neom-hover-lift">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400 neom-body">Efficiency</p>
                  <p className="text-2xl font-semibold text-emerald-400 neom-mono">87%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-emerald-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights */}
        <Card className="rounded-2xl bg-slate-800 border-slate-700 border-2 neom-card" style={{ borderColor: departmentColor }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-white neom-heading">
              <Bot className="w-5 h-5" style={{ color: departmentColor }} />
              <span>{departmentName} AI Co-Pilot</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 rounded-xl bg-slate-700 neom-fade-in">
                <Target className="w-5 h-5 mb-2" style={{ color: departmentColor }} />
                <p className="text-sm font-medium text-slate-200 neom-heading">Priority Focus</p>
                <p className="text-xs text-slate-400 neom-body">2 high-priority tasks need attention</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-700 neom-fade-in">
                <TrendingUp className="w-5 h-5 mb-2" style={{ color: departmentColor }} />
                <p className="text-sm font-medium text-slate-200 neom-heading">Efficiency Up</p>
                <p className="text-xs text-slate-400 neom-body">15% improvement this week</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-700 neom-fade-in">
                <Award className="w-5 h-5 mb-2" style={{ color: departmentColor }} />
                <p className="text-sm font-medium text-slate-200 neom-heading">Team Rating</p>
                <p className="text-xs text-slate-400 neom-body">4.8/5 guest satisfaction</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tasks List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white neom-heading">Your {departmentName} Tasks</h3>
            <Button 
              onClick={() => setActiveTab('checklists')}
              variant="outline" 
              size="sm" 
              className="border-slate-600 text-slate-300 hover:bg-slate-700 neom-transition bg-[rgba(62,60,60,1)]"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              View SOPs
            </Button>
          </div>
          
          {roleTasks.map((task) => {
            const DeptIcon = getDepartmentIcon(task.department);
            const slaPercentage = (task.elapsed / task.slaMinutes) * 100;
            const taskDeptColor = getDepartmentColor(task.department);
            const aiSuggestion = aiSuggestions.find(s => s.taskId === task.id);
            const hasDelay = slaPercentage > 80;
            const isCompleted = completedTasks.has(task.id);
            
            return (
              <Card 
                key={task.id} 
                className={`rounded-2xl cursor-pointer bg-slate-800 border-slate-700 neom-card neom-hover-lift neom-transition ${
                  aiSuggestion ? 'ring-2 ring-purple-500/30' : ''
                } ${isCompleted ? 'opacity-70 border-emerald-500/50' : ''}`}
                onClick={() => {
                  if (!isCompleted) {
                    setSelectedTask(task);
                    setActiveTab('details');
                  }
                }}
              >
                <CardContent className="p-4">
                  {/* AI Suggestion Alert */}
                  {aiSuggestion && (
                    <div className="mb-3 p-3 rounded-lg bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Bot className="w-4 h-4 text-purple-400" />
                          <span className="text-sm font-medium text-purple-300">AI Suggestion</span>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              aiSuggestion.urgency === 'high' ? 'border-red-400 text-red-400' :
                              aiSuggestion.urgency === 'medium' ? 'border-yellow-400 text-yellow-400' :
                              'border-blue-400 text-blue-400'
                            }`}
                          >
                            {aiSuggestion.confidence}% confidence
                          </Badge>
                        </div>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline" className="h-6 w-6 p-0 border-slate-600">
                            <ArrowRight className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-slate-300 mt-1">{aiSuggestion.message}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center relative"
                        style={{ backgroundColor: `${taskDeptColor}20` }}
                      >
                        <DeptIcon className="w-6 h-6" style={{ color: taskDeptColor }} />
                        {hasDelay && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                            <AlertTriangle className="w-2 h-2 text-white" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <h3 className={`font-semibold neom-heading ${isCompleted ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                            {task.name}
                          </h3>
                          <Badge variant="outline" className="border-slate-600 text-slate-300">
                            Room {task.room}
                          </Badge>
                          {isCompleted ? (
                            <Badge className="bg-emerald-600 text-white flex items-center space-x-1">
                              <CheckCircle className="w-3 h-3" />
                              <span>Completed</span>
                            </Badge>
                          ) : (
                            <Badge style={{ backgroundColor: getPriorityColor(task.priority), color: 'white' }}>
                              {task.priority}
                            </Badge>
                          )}
                          {!isCompleted && hasDelay && (
                            <Badge variant="outline" className="border-red-400 text-red-400 text-xs">
                              Delayed
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-400 mb-2 neom-body">{task.description}</p>
                        
                        {/* SLA Timer */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 flex-1">
                            <div className="flex-1 bg-slate-700 rounded-full h-2 max-w-32">
                              <div 
                                className="h-2 rounded-full neom-transition"
                                style={{ 
                                  width: `${Math.min(slaPercentage, 100)}%`,
                                  backgroundColor: getSLAColor(task.elapsed, task.slaMinutes)
                                }}
                              />
                            </div>
                            <span className="text-xs text-slate-400 neom-mono">
                              {task.slaMinutes - task.elapsed}m left
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className="ml-4" style={{ backgroundColor: taskDeptColor, color: 'white' }}>
                              {task.assignedTo}
                            </Badge>
                            {aiSuggestion && (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="h-6 border-purple-400 text-purple-400 hover:bg-purple-900/20"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Handle AI suggestion action
                                }}
                              >
                                <Bot className="w-3 h-3 mr-1" />
                                Apply
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  const renderChecklistsScreen = () => {
    const departmentColor = getDepartmentColor(userRole);
    const departmentName = userRole?.charAt(0).toUpperCase() + userRole?.slice(1) || 'Staff';
    
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white neom-heading">SOPs & Checklists</h2>
            <p className="text-slate-400 neom-body">Standard operating procedures for {departmentName}</p>
          </div>
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 neom-transition bg-[rgba(47,41,41,1)]">
            <Share2 className="w-4 h-4 mr-2" />
            Share SOP
          </Button>
        </div>

        {/* Checklist Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(checklists)
            .filter(([_, checklist]) => checklist.department === userRole)
            .map(([checklistId, checklist]) => {
              const progress = getChecklistProgress(checklistId);
              
              return (
                <Card key={checklistId} className="rounded-2xl bg-slate-800 border-slate-700 neom-card neom-hover-lift">
                  <CardHeader>
                    <CardTitle className="text-white neom-heading">{checklist.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400 neom-body">Progress</span>
                      <span className="text-sm text-slate-300 neom-mono">{progress.completed}/{progress.total}</span>
                    </div>
                    <Progress value={progress.percentage} className="h-2" />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400 neom-body">Est. Time</span>
                      <span className="text-sm text-slate-300 neom-mono">{checklist.estimatedTime}m</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
        </div>

        {/* Active Checklist */}
        {selectedTask && selectedTask.checklistId && (
          <Card className="rounded-2xl bg-slate-800 border-slate-700 neom-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-white neom-heading">
                <span>Current Task: {selectedTask.name}</span>
                <Badge style={{ backgroundColor: departmentColor, color: 'white' }}>
                  Room {selectedTask.room}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {checklists[selectedTask.checklistId as keyof typeof checklists]?.steps.map((step, index) => {
                const isChecked = checklistProgress[`${selectedTask.checklistId}-${step.id}`] || false;
                
                return (
                  <div key={step.id} className="flex items-start space-x-3 p-3 rounded-xl border border-slate-700">
                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={(checked) => handleChecklistItem(selectedTask.checklistId, step.id, checked as boolean)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm ${isChecked ? 'line-through text-slate-500' : 'text-slate-200'} neom-body`}>
                          {step.task}
                        </span>
                        {step.required && (
                          <Badge variant="outline" className="text-xs border-red-400 text-red-400">
                            Required
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-slate-500 neom-mono">Step {index + 1}</span>
                    </div>
                    {isChecked && (
                      <CheckCircle className="w-5 h-5 text-emerald-400 neom-fade-in" />
                    )}
                  </div>
                );
              })}
              
              <div className="flex justify-between pt-4">
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 neom-transition">
                  Save Progress
                </Button>
                <Button 
                  onClick={() => handleCompleteTask(selectedTask.id)}
                  className="text-white neom-transition neom-shrink-press relative overflow-hidden"
                  style={{ backgroundColor: departmentColor }}
                  disabled={getChecklistProgress(selectedTask.checklistId).percentage < 100 || completingTaskId === selectedTask.id}
                >
                  {completingTaskId === selectedTask.id ? (
                    <>
                      <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                      <CheckCircle className="w-4 h-4 mr-2 animate-spin" />
                      <span>Completing...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      <span>Complete Task</span>
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  const renderCommunicationsScreen = () => {
    const filteredComms = communications.filter(comm => {
      if (commFilter === 'urgent') return comm.priority === 'urgent';
      if (commFilter === 'department') return comm.department === userRole || comm.department === 'all';
      return true;
    });

    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white neom-heading">Team Communications</h2>
            <p className="text-slate-400 neom-body">Internal messages and announcements</p>
          </div>
          <div className="flex items-center space-x-3">
            <Select value={commFilter} onValueChange={(value) => setCommFilter(value as any)}>
              <SelectTrigger className="w-40 bg-slate-800 border-slate-600 text-slate-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Messages</SelectItem>
                <SelectItem value="urgent">Urgent Only</SelectItem>
                <SelectItem value="department">My Department</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 neom-transition bg-[rgba(53,53,53,1)]">
              <Send className="w-4 h-4 mr-2" />
              New Message
            </Button>
          </div>
        </div>

        {/* Urgent Alerts */}
        <Card className="rounded-2xl bg-red-900/20 border-red-500/30 neom-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-400 neom-heading">
              <AlertTriangle className="w-5 h-5" />
              <span>Urgent Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredComms.filter(c => c.priority === 'urgent').map((alert) => (
                <div key={alert.id} className="p-3 rounded-xl bg-red-900/30 border border-red-500/30 neom-fade-in">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-red-300 neom-heading">{alert.title}</h4>
                      <p className="text-sm text-red-200 mt-1 neom-body">{alert.message}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-red-400">
                        <span>From: {alert.author}</span>
                        <span>{alert.timestamp}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="border-red-400 text-red-400 hover:bg-red-900/50 neom-transition">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Regular Communications */}
        <div className="space-y-4">
          {filteredComms.filter(c => c.priority !== 'urgent').map((comm) => {
            const isUrgent = comm.priority === 'urgent';
            
            return (
              <Card key={comm.id} className="rounded-2xl bg-slate-800 border-slate-700 neom-card neom-hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                        {comm.type === 'announcement' ? (
                          <Bell className="w-5 h-5 text-cyan-400" />
                        ) : (
                          <MessageSquare className="w-5 h-5 text-emerald-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-slate-200 neom-heading">{comm.title}</h4>
                          {comm.department !== 'all' && (
                            <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
                              {comm.department}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-400 mb-2 neom-body">{comm.message}</p>
                        <div className="flex items-center space-x-4 text-xs text-slate-500">
                          <span>From: {comm.author}</span>
                          <span>{comm.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost" className="text-slate-400 hover:text-slate-200 neom-transition">
                        <ThumbsUp className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-slate-400 hover:text-slate-200 neom-transition">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  const renderLostFoundScreen = () => {
    // For housekeeping, fnb, and maintenance roles, show Report Found Item form
    if (['housekeeping', 'fnb', 'maintenance'].includes(userRole)) {
      return (
        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-white neom-heading">Report Found Item</h2>
            <p className="text-slate-400 neom-body">Submit found items to management</p>
          </div>

          {/* Success Confirmation */}
          {showReportConfirmation && (
            <Card className="rounded-2xl border-emerald-500 bg-emerald-900/30 neom-card neom-fade-in">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-600/20 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white neom-heading">Report Submitted Successfully</h3>
                    <p className="text-sm text-emerald-300 neom-body">The manager has been notified about the found item</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Report Form */}
          <Card className="bg-[rgba(9,6,26,1)] border-slate-700 neom-card">
            <CardHeader>
              <CardTitle className="text-white neom-heading">Item Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Item Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 neom-heading">
                  Item Description *
                </label>
                <Textarea
                  placeholder="Describe the found item (e.g., iPhone 14 Pro with blue case, Diamond ring, Black leather wallet)"
                  value={reportFoundItemData.itemDescription}
                  onChange={(e) => handleReportFoundItemChange('itemDescription', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 min-h-[100px] neom-input-focus"
                />
              </div>

              {/* Room Number */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 neom-heading">
                  Room Number *
                </label>
                <Input
                  type="text"
                  placeholder="e.g., 2501"
                  value={reportFoundItemData.roomNumber}
                  onChange={(e) => handleReportFoundItemChange('roomNumber', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 neom-input-focus"
                />
              </div>

              {/* Date & Time */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 neom-heading">
                  Date & Time Found
                </label>
                <Input
                  type="datetime-local"
                  value={reportFoundItemData.dateTime}
                  onChange={(e) => handleReportFoundItemChange('dateTime', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white neom-input-focus"
                />
                <p className="text-xs text-slate-500 neom-body">Auto-filled with current time, edit if needed</p>
              </div>

              {/* Photo Upload */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 neom-heading">
                  Photo (Optional)
                </label>
                <div className="space-y-3">
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-600 border-dashed rounded-xl cursor-pointer bg-slate-700/50 hover:bg-slate-700 neom-transition">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Package className="w-10 h-10 mb-3 text-slate-400" />
                        <p className="mb-2 text-sm text-slate-400 neom-body">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-slate-500 neom-body">PNG, JPG (MAX. 5MB)</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                      />
                    </label>
                  </div>
                  
                  {/* Photo Preview */}
                  {reportFoundItemData.photoPreview && (
                    <div className="relative rounded-xl overflow-hidden border border-slate-600">
                      <img
                        src={reportFoundItemData.photoPreview}
                        alt="Item preview"
                        className="w-full h-48 object-cover"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReportFoundItemChange('photo', null) || handleReportFoundItemChange('photoPreview', '')}
                        className="absolute top-2 right-2 bg-slate-900/80 border-slate-600 text-white hover:bg-red-900/80 hover:border-red-500"
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  onClick={handleSubmitFoundItemReport}
                  disabled={!reportFoundItemData.itemDescription || !reportFoundItemData.roomNumber}
                  className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white border-0 neom-shrink-press"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Report to Manager
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="rounded-2xl bg-blue-900/20 border-blue-500/30 neom-card">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Bell className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-300 neom-heading mb-1">What happens next?</h4>
                  <p className="text-sm text-slate-400 neom-body">
                    Your report will be sent directly to the Lost & Found manager who will contact the guest 
                    and coordinate the item's return. You'll receive a notification once the item is processed.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* My Reports Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white neom-heading">My Reports</h3>
                <p className="text-sm text-slate-400 neom-body">Items you've reported to Lost & Found</p>
              </div>
              <Badge variant="outline" className="border-slate-600 text-slate-300">
                {myReports.length} {myReports.length === 1 ? 'Report' : 'Reports'}
              </Badge>
            </div>

            {/* Reports List */}
            {myReports.length === 0 ? (
              <Card className="rounded-2xl bg-slate-800 border-slate-700 neom-card">
                <CardContent className="p-8 text-center">
                  <Package className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 neom-body">No reports yet</p>
                  <p className="text-sm text-slate-500 neom-body mt-1">
                    Items you report will appear here
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {myReports.map((report) => {
                  const getStatusInfo = (status: string) => {
                    switch (status) {
                      case 'submitted':
                        return {
                          label: 'Submitted',
                          color: 'text-yellow-400',
                          bgColor: 'bg-yellow-900/20',
                          borderColor: 'border-yellow-400/30',
                          icon: FileCheck
                        };
                      case 'assigned_to_team':
                        return {
                          label: 'Assigned to Lost & Found Team',
                          color: 'text-cyan-400',
                          bgColor: 'bg-cyan-900/20',
                          borderColor: 'border-cyan-400/30',
                          icon: UserCheck
                        };
                      case 'returned_to_guest':
                        return {
                          label: 'Returned to Guest',
                          color: 'text-emerald-400',
                          bgColor: 'bg-emerald-900/20',
                          borderColor: 'border-emerald-400/30',
                          icon: CheckCircle
                        };
                      default:
                        return {
                          label: 'Unknown',
                          color: 'text-slate-400',
                          bgColor: 'bg-slate-900/20',
                          borderColor: 'border-slate-400/30',
                          icon: Clock
                        };
                    }
                  };

                  const statusInfo = getStatusInfo(report.status);
                  const StatusIcon = statusInfo.icon;

                  return (
                    <Card 
                      key={report.id} 
                      className="rounded-2xl bg-slate-800 border-slate-700 neom-card neom-transition hover:border-slate-600"
                    >
                      <CardContent className="p-4 bg-[rgba(0,0,0,0)]">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start space-x-3 flex-1">
                            <div className="w-10 h-10 rounded-xl bg-slate-700/50 flex items-center justify-center flex-shrink-0">
                              <Package className="w-5 h-5 text-slate-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-slate-200 neom-heading mb-1">
                                {report.itemDescription}
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                <div className="flex items-center space-x-2 text-slate-400">
                                  <MapPin className="w-4 h-4 flex-shrink-0" />
                                  <span className="neom-body truncate">Room {report.roomNumber}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-slate-400">
                                  <Calendar className="w-4 h-4 flex-shrink-0" />
                                  <span className="neom-body">{report.dateReported}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${statusInfo.bgColor} border ${statusInfo.borderColor}`}>
                              <StatusIcon className={`w-4 h-4 ${statusInfo.color}`} />
                              <span className={`text-sm font-medium ${statusInfo.color} neom-body whitespace-nowrap`}>
                                {statusInfo.label}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      );
    }

    // For other roles (managers, admins, etc.), show the full Lost & Found management screen
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white neom-heading">Lost & Found</h2>
            <p className="text-slate-400 neom-body">Guest items and property management</p>
          </div>
          <Button 
            variant="outline" 
            className="border-slate-600 text-slate-300 hover:bg-slate-700 neom-transition"
            onClick={() => setSelectedLostItem(null)}
          >
            <Package className="w-4 h-4 mr-2" />
            Log New Item
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="rounded-2xl bg-slate-800 border-slate-700 neom-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400 neom-body">Found Items</p>
                  <p className="text-2xl font-semibold text-yellow-400 neom-mono">
                    {lostFoundItems.filter(i => i.status === 'found').length}
                  </p>
                </div>
                <Package className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl bg-slate-800 border-slate-700 neom-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400 neom-body">In Progress</p>
                  <p className="text-2xl font-semibold text-cyan-400 neom-mono">
                    {lostFoundItems.filter(i => i.status === 'in_progress').length}
                  </p>
                </div>
                <Search className="w-8 h-8 text-cyan-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl bg-slate-800 border-slate-700 neom-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400 neom-body">Returned</p>
                  <p className="text-2xl font-semibold text-emerald-400 neom-mono">
                    {lostFoundItems.filter(i => i.status === 'returned').length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl bg-slate-800 border-slate-700 neom-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400 neom-body">High Value</p>
                  <p className="text-2xl font-semibold text-orange-400 neom-mono">
                    {lostFoundItems.filter(i => i.value === 'high').length}
                  </p>
                </div>
                <Star className="w-8 h-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Items List */}
        <div className="space-y-4">
          {lostFoundItems.map((item) => (
            <Card key={item.id} className="rounded-2xl bg-slate-800 border-slate-700 neom-card neom-hover-lift">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center">
                      <Package className="w-6 h-6 text-slate-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-slate-200 neom-heading">{item.item}</h3>
                        <Badge 
                          style={{ backgroundColor: getStatusColor(item.status), color: 'white' }}
                          className="capitalize"
                        >
                          {item.status.replace('_', ' ')}
                        </Badge>
                        {item.value === 'high' && (
                          <Badge variant="outline" className="border-orange-400 text-orange-400">
                            High Value
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-400 mb-2 neom-body">{item.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-slate-500">
                        <div>
                          <span className="text-slate-400">Room:</span> {item.room}
                        </div>
                        <div>
                          <span className="text-slate-400">Found by:</span> {item.foundBy}
                        </div>
                        <div>
                          <span className="text-slate-400">Date:</span> {item.foundDate}
                        </div>
                        <div>
                          <span className="text-slate-400">Contact:</span> {item.guestContact}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {item.status === 'found' && (
                      <>
                        <Button size="sm" variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-900/30 neom-transition">
                          <User className="w-4 h-4 mr-1" />
                          Assign
                        </Button>
                        <Button size="sm" variant="outline" className="border-emerald-400 text-emerald-400 hover:bg-emerald-900/30 neom-transition">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Return
                        </Button>
                      </>
                    )}
                    {item.status === 'in_progress' && (
                      <Button size="sm" variant="outline" className="border-emerald-400 text-emerald-400 hover:bg-emerald-900/30 neom-transition">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Mark Returned
                      </Button>
                    )}
                    {item.status === 'returned' && (
                      <Button size="sm" variant="outline" className="border-slate-600 text-slate-400 hover:bg-slate-700 neom-transition">
                        <Archive className="w-4 h-4 mr-1" />
                        Archive
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderTaskDetails = () => {
    if (!selectedTask) {
      return (
        <div className="p-6">
          <Card className="rounded-2xl bg-slate-800 border-slate-700">
            <CardContent className="p-12 text-center">
              <p className="text-slate-400">No task selected</p>
            </CardContent>
          </Card>
        </div>
      );
    }

    const isCompleted = completedTasks.has(selectedTask.id);
    const checklist = selectedTask.checklistId ? checklists[selectedTask.checklistId as keyof typeof checklists] : null;
    const progress = checklist ? getChecklistProgress(selectedTask.checklistId) : { completed: 0, total: 0, percentage: 0 };

    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => setActiveTab('tasks')}
            className="p-0 h-auto hover:bg-transparent text-slate-300 hover:text-white neom-transition"
          >
            ← Back to Tasks
          </Button>
          <h2 className="text-xl font-semibold text-white neom-heading">Task Details</h2>
          {isCompleted && (
            <Badge className="bg-emerald-600 text-white flex items-center space-x-2 px-3 py-1">
              <CheckCircle className="w-4 h-4" />
              <span>Completed</span>
            </Badge>
          )}
          {!isCompleted && <div></div>}
        </div>

        <div className="space-y-6">
          {/* Task Header */}
          <Card className="rounded-2xl bg-slate-800 border-slate-700 neom-card">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className={`text-xl font-semibold mb-2 neom-heading ${isCompleted ? 'line-through text-slate-500' : 'text-white'}`}>{selectedTask.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-slate-400">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>Room {selectedTask.room}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{selectedTask.assignedTo}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{selectedTask.slaMinutes - selectedTask.elapsed}m left</span>
                    </div>
                  </div>
                </div>
                <Badge 
                  style={{ backgroundColor: getDepartmentColor(selectedTask.department), color: 'white' }}
                >
                  {selectedTask.department}
                </Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2 text-slate-200 neom-heading">Description</h4>
                  <p className="text-slate-400 neom-body">{selectedTask.description}</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 text-slate-200 neom-heading">Guest Notes</h4>
                  <div className="bg-slate-700 p-3 rounded-xl">
                    <p className="text-sm text-slate-300 neom-body">{selectedTask.guestNotes}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SOP Checklist Button */}
          {selectedTask.checklistId && !isCompleted && (
            <Card className="rounded-2xl bg-slate-800 border-slate-700 neom-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-slate-200 neom-heading">Standard Operating Procedure</h4>
                    <p className="text-sm text-slate-400 neom-body">Follow the SOP checklist for this task �� {progress.completed}/{progress.total} steps completed</p>
                  </div>
                  <Button 
                    onClick={() => setActiveTab('checklists')}
                    className="text-white neom-transition"
                    style={{ backgroundColor: getDepartmentColor(selectedTask.department) }}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Open SOP
                  </Button>
                </div>
                
                {/* Complete Task Button */}
                {progress.percentage === 100 && (
                  <div className="mt-4 pt-4 border-t border-slate-700">
                    <Button 
                      onClick={() => handleCompleteTask(selectedTask.id)}
                      className="w-full text-white neom-shrink-press relative overflow-hidden h-12"
                      style={{ backgroundColor: getDepartmentColor(selectedTask.department) }}
                      disabled={completingTaskId === selectedTask.id}
                    >
                      {completingTaskId === selectedTask.id ? (
                        <>
                          <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                          <CheckCircle className="w-5 h-5 mr-2 animate-spin" />
                          <span>Completing...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5 mr-2" />
                          <span>Complete Task</span>
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          {!isCompleted && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-14 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white neom-transition">
                <UserCheck className="w-5 h-5 mr-2" />
                Accept Task
              </Button>
              
              <Button variant="outline" className="h-14 rounded-xl border-2 border-slate-600 text-slate-300 hover:bg-slate-700 neom-transition">
                <RotateCcw className="w-5 h-5 mr-2" />
                Reassign
              </Button>
              
              <Button className="h-14 rounded-xl bg-slate-600 hover:bg-slate-500 text-white neom-transition">
                <CheckCircle className="w-5 h-5 mr-2" />
                Mark Complete
              </Button>
            </div>
          )}
          
          {/* Completed Task Confirmation */}
          {isCompleted && (
            <Card className="rounded-2xl bg-emerald-900/20 border-emerald-500/30">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">Task Completed!</h3>
                <p className="text-slate-300 mb-6">
                  Great job! This task has been marked as complete.
                </p>
                <Button
                  onClick={() => setActiveTab('tasks')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Back to Task List
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Notes Section */}
          {!isCompleted && (
            <Card className="rounded-2xl bg-slate-800 border-slate-700 neom-card">
              <CardHeader>
                <CardTitle className="text-white neom-heading">Task Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Add notes about task progress, issues, or completion details..."
                  className="rounded-xl min-h-24 bg-slate-700 border-slate-600 text-white neom-body"
                />
                <Button 
                  className="mt-3 rounded-xl neom-transition"
                  style={{ backgroundColor: getDepartmentColor(selectedTask.department) }}
                >
                  Save Notes
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  };

  const renderStaffAllocationScreen = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white neom-heading">AI-Driven Staff Allocation</h2>
          <p className="text-slate-400 neom-body">Real-time workforce optimization and task distribution</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Badge className="bg-emerald-600 text-white">
            <CircleDot className="w-3 h-3 mr-1" />
            AI Active
          </Badge>
        </div>
      </div>

      {/* Predictive Alerts */}
      <Card className="rounded-2xl bg-slate-800 border-slate-700 neom-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white neom-heading">
            <AlertCircle className="w-5 h-5 text-yellow-400" />
            <span>Predictive Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            {
              id: 1,
              type: 'bottleneck',
              area: 'Front Desk',
              severity: 'high',
              message: 'Front desk high alert – expected wait 8–10 minutes → recommend deploy one staff from concierge.',
              fromDept: 'Concierge',
              toDept: 'Front Desk',
              staffCount: 1,
              color: 'border-red-400 bg-red-900/20'
            },
            {
              id: 2,
              type: 'overload',
              area: 'Housekeeping Floor 15-20',
              severity: 'medium',
              message: 'Housekeeping overload – task completion delay 45 minutes → recommend deploy 2 staff from floors 10-14.',
              fromDept: 'Housekeeping',
              toDept: 'Housekeeping',
              staffCount: 2,
              color: 'border-yellow-400 bg-yellow-900/20'
            },
            {
              id: 3,
              type: 'optimization',
              area: 'F&B Service',
              severity: 'low',
              message: 'Restaurant service alert – peak dinner rush in 2 hours → recommend pre-position 1 additional server.',
              fromDept: 'Maintenance',
              toDept: 'F&B Service',
              staffCount: 1,
              color: 'border-blue-400 bg-blue-900/20'
            }
          ]
            .filter(alert => !dismissedAlerts.has(alert.id))
            .map((alert) => {
              const isApplied = appliedAlerts.has(alert.id);
              const isProcessing = processingAlertId === alert.id;
              
              return (
                <div 
                  key={alert.id} 
                  className={`p-4 rounded-xl border ${alert.color} neom-transition relative overflow-hidden ${
                    isApplied ? 'ring-2 ring-emerald-500/50' : ''
                  }`}
                >
                  {/* Applied/Dismissed Overlay */}
                  {isApplied && (
                    <div className="absolute inset-0 bg-emerald-900/30 backdrop-blur-sm flex items-center justify-center z-10 neom-fade-in">
                      <div className="flex items-center space-x-2 text-emerald-400">
                        <CheckCircle className="w-6 h-6" />
                        <span className="font-semibold">Applied Successfully</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-3">
                        <AlertTriangle className="w-4 h-4 text-yellow-400" />
                        <h4 className="font-medium text-white neom-heading">{alert.area}</h4>
                        <Badge 
                          variant="outline"
                          className={`text-xs ${
                            alert.severity === 'high' ? 'border-red-400 text-red-400' :
                            alert.severity === 'medium' ? 'border-yellow-400 text-yellow-400' :
                            'border-blue-400 text-blue-400'
                          }`}
                        >
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed">{alert.message}</p>
                    </div>
                    
                    {!isApplied && (
                      <div className="flex flex-col gap-2 min-w-[100px]">
                        <Button 
                          size="sm" 
                          onClick={() => handleApplyAlert(alert.id, alert.fromDept, alert.toDept, alert.staffCount)}
                          disabled={isProcessing}
                          className="h-9 bg-emerald-600 text-white hover:bg-emerald-700 neom-shrink-press relative overflow-hidden"
                        >
                          {isProcessing ? (
                            <>
                              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                              <span>Applying...</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4 mr-1" />
                              <span>Apply</span>
                            </>
                          )}
                        </Button>
                        <Button 
                          size="sm"
                          variant="outline"
                          onClick={() => handleDismissAlert(alert.id)}
                          disabled={isProcessing}
                          className="h-9 border-slate-600 text-slate-300 hover:bg-red-900/20 hover:border-red-500 hover:text-red-400 neom-transition"
                        >
                          Dismiss
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          
          {[1, 2, 3].filter(id => !dismissedAlerts.has(id)).length === 0 && (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 mx-auto mb-4 text-emerald-400" />
              <p className="text-slate-400">No active alerts</p>
              <p className="text-sm text-slate-500 mt-1">All recommendations have been addressed</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Live Allocation Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Allocations */}
        <Card className="rounded-2xl bg-slate-800 border-slate-700 neom-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-white neom-heading">
              <Users2 className="w-5 h-5 text-blue-400" />
              <span>Current Allocations</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {staffAllocations.map((dept, index) => (
              <div key={index} className="p-4 rounded-xl bg-slate-700 border border-slate-600">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-white neom-heading">{dept.department}</h4>
                  <div className="flex items-center space-x-2">
                    {dept.trend === 'up' && <TrendingUp className="w-4 h-4 text-emerald-400" />}
                    {dept.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-400" />}
                    {dept.trend === 'stable' && <Activity className="w-4 h-4 text-blue-400" />}
                    <span className="text-sm text-slate-300">{dept.efficiency}%</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-slate-400">Staff</p>
                    <p className="text-white font-medium neom-mono">{dept.staff}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Tasks</p>
                    <p className="text-white font-medium neom-mono">{dept.tasks}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Capacity</p>
                    <p className="text-white font-medium neom-mono">{dept.capacity}%</p>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Workload</span>
                    <span>{dept.capacity}%</span>
                  </div>
                  <Progress 
                    value={dept.capacity} 
                    className="h-2"
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Staff Reallocation Recommendations */}
        <Card className="rounded-2xl bg-slate-800 border-slate-700 neom-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-white neom-heading">
              <Shuffle className="w-5 h-5 text-emerald-400" />
              <span>Staff Reallocation</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                id: 101,
                from: 'Maintenance',
                to: 'Front Desk',
                staff: 'Ahmed Hassan',
                reason: 'Guest queue forming',
                impact: '+15% efficiency',
                priority: 'high'
              },
              {
                id: 102,
                from: 'Housekeeping',
                to: 'Housekeeping',
                staff: 'Maria Santos',
                reason: 'Check-out rush floor 12',
                impact: '+8% efficiency',
                priority: 'medium'
              },
              {
                id: 103,
                from: 'Concierge',
                to: 'F&B Service',
                staff: 'John Mitchell',
                reason: 'Lunch service peak',
                impact: '+10% efficiency',
                priority: 'medium'
              }
            ]
              .filter(reallocation => !dismissedReallocations.has(reallocation.id))
              .map((reallocation) => {
                const isExecuted = executedReallocations.has(reallocation.id);
                const isProcessing = processingReallocationId === reallocation.id;
                
                return (
                  <div 
                    key={reallocation.id} 
                    className={`p-4 rounded-xl border neom-transition relative overflow-hidden ${
                      isExecuted 
                        ? 'border-emerald-500 bg-emerald-900/30 ring-2 ring-emerald-500/50' 
                        : 'border-slate-600 bg-slate-700/50'
                    }`}
                  >
                    {/* Executed Overlay */}
                    {isExecuted && (
                      <div className="absolute inset-0 bg-emerald-900/30 backdrop-blur-sm flex items-center justify-center z-10 neom-fade-in">
                        <div className="flex items-center space-x-2 text-emerald-400">
                          <CheckCircle className="w-6 h-6" />
                          <span className="font-semibold">Executed Successfully</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <UserCog className="w-4 h-4 text-emerald-400" />
                        <span className="font-medium text-white neom-heading">{reallocation.staff}</span>
                        <Badge 
                          variant="outline"
                          className={`text-xs ${
                            reallocation.priority === 'high' ? 'border-red-400 text-red-400' :
                            'border-yellow-400 text-yellow-400'
                          }`}
                        >
                          {reallocation.priority}
                        </Badge>
                      </div>
                      <span className="text-xs text-emerald-400">{reallocation.impact}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm text-slate-300">{reallocation.from}</span>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-white font-medium">{reallocation.to}</span>
                    </div>
                    
                    <p className="text-xs text-slate-400 mb-3">{reallocation.reason}</p>
                    
                    {!isExecuted && (
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleDismissReallocation(reallocation.id)}
                          disabled={isProcessing}
                          className="h-8 border-slate-600 text-slate-300 hover:bg-red-900/20 hover:border-red-500 hover:text-red-400 flex-1 neom-transition"
                        >
                          Dismiss
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => handleExecuteReallocation(reallocation.id, reallocation.from, reallocation.to)}
                          disabled={isProcessing}
                          className="h-8 bg-emerald-600 text-white hover:bg-emerald-700 flex-1 neom-shrink-press relative overflow-hidden"
                        >
                          {isProcessing ? (
                            <>
                              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                              <span>Executing...</span>
                            </>
                          ) : (
                            <>
                              <GitBranch className="w-3 h-3 mr-1" />
                              <span>Execute</span>
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            
            {[101, 102, 103].filter(id => !dismissedReallocations.has(id)).length === 0 && (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 mx-auto mb-4 text-emerald-400" />
                <p className="text-slate-400">No pending reallocations</p>
                <p className="text-sm text-slate-500 mt-1">All staff movements have been processed</p>
              </div>
            )}
            
            <div className="text-center py-4">
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Full Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card className="rounded-2xl bg-slate-800 border-slate-700 neom-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white neom-heading">
            <Gauge className="w-5 h-5 text-blue-400" />
            <span>System Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-6">
            {[
              { label: 'Average Response Time', value: '2.3', unit: 'min', trend: 'down', color: 'text-emerald-400' },
              { label: 'Task Completion Rate', value: '94.2', unit: '%', trend: 'up', color: 'text-emerald-400' },
              { label: 'Staff Utilization', value: '82.7', unit: '%', trend: 'stable', color: 'text-blue-400' },
              { label: 'Guest Satisfaction', value: '4.8', unit: '/5', trend: 'up', color: 'text-emerald-400' }
            ].map((metric, index) => (
              <div key={index} className="text-center">
                <p className="text-slate-400 text-sm mb-1">{metric.label}</p>
                <div className="flex items-center justify-center space-x-1">
                  <span className={`text-2xl font-bold neom-mono ${metric.color}`}>
                    {metric.value}
                  </span>
                  <span className="text-slate-400 text-sm">{metric.unit}</span>
                </div>
                <div className="flex items-center justify-center mt-1">
                  {metric.trend === 'up' && <TrendingUp className="w-3 h-3 text-emerald-400" />}
                  {metric.trend === 'down' && <TrendingDown className="w-3 h-3 text-red-400" />}
                  {metric.trend === 'stable' && <Activity className="w-3 h-3 text-blue-400" />}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCrisisManagementScreen = () => {
    // Mock incidents data with more staff-relevant scenarios
    const currentIncidents = [
      {
        id: 'INC-001',
        type: 'Guest Medical Emergency',
        location: 'Pool Deck Area',
        severity: 'high',
        timeAgo: '5 min ago',
        status: 'responding',
        assignedTo: 'First Aid Team',
        checklist: [
          { step: 'Secure the area', completed: true },
          { step: 'Contact medical services', completed: true },
          { step: 'Notify management', completed: false },
          { step: 'Complete incident report', completed: false }
        ]
      },
      {
        id: 'INC-002',
        type: 'Water Leak',
        location: 'Room 1247 Bathroom',
        severity: 'medium',
        timeAgo: '12 min ago',
        status: 'assigned',
        assignedTo: 'Maintenance Team',
        checklist: [
          { step: 'Isolate water supply', completed: true },
          { step: 'Assess damage', completed: false },
          { step: 'Begin repairs', completed: false },
          { step: 'Guest relocation if needed', completed: false }
        ]
      },
      {
        id: 'INC-003',
        type: 'Fire Alarm - False',
        location: 'Kitchen Area',
        severity: 'low',
        timeAgo: '25 min ago',
        status: 'resolved',
        assignedTo: 'F&B Team',
        checklist: [
          { step: 'Evacuate immediate area', completed: true },
          { step: 'Check alarm source', completed: true },
          { step: 'Reset alarm system', completed: true },
          { step: 'Resume operations', completed: true }
        ]
      }
    ];

    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white neom-heading">Crisis & Safety</h2>
            <p className="text-slate-400 neom-body">Incident response and safety management for staff</p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge className="bg-emerald-600 text-white">
              <Shield className="w-3 h-3 mr-1" />
              All Clear
            </Badge>
          </div>
        </div>

        {/* Crisis Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Incidents */}
          <Card className="rounded-2xl bg-slate-800 border-slate-700 neom-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-white neom-heading">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              <span>Active Incidents ({currentIncidents.filter(i => i.status !== 'resolved').length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentIncidents.filter(incident => incident.status !== 'resolved').map((incident) => (
              <div 
                key={incident.id} 
                className={`p-4 rounded-xl border cursor-pointer hover:bg-slate-700/50 neom-transition ${
                  incident.severity === 'high' ? 'border-red-400 bg-red-900/20' :
                  incident.severity === 'medium' ? 'border-yellow-400 bg-yellow-900/20' :
                  'border-blue-400 bg-blue-900/20'
                }`}
                onClick={() => setSelectedIncident(incident)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant="outline"
                      className={`text-xs ${
                        incident.severity === 'high' ? 'border-red-400 text-red-400' :
                        incident.severity === 'medium' ? 'border-yellow-400 text-yellow-400' :
                        'border-blue-400 text-blue-400'
                      }`}
                    >
                      {incident.severity}
                    </Badge>
                    <span className="text-xs text-slate-400">{incident.timeAgo}</span>
                  </div>
                  <Badge 
                    variant="outline"
                    className={`text-xs ${
                      incident.status === 'responding' ? 'border-orange-400 text-orange-400' :
                      'border-cyan-400 text-cyan-400'
                    }`}
                  >
                    {incident.status}
                  </Badge>
                </div>
                <h4 className="font-medium text-white neom-heading mb-1">{incident.type}</h4>
                <p className="text-sm text-slate-300 mb-2">{incident.location}</p>
                <p className="text-xs text-slate-400">Assigned: {incident.assignedTo}</p>
                
                <div className="flex justify-between items-center mt-3">
                  <div className="text-xs text-slate-400">
                    Progress: {incident.checklist.filter(c => c.completed).length}/{incident.checklist.length} steps
                  </div>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="outline" className="h-6 text-xs border-slate-600">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Acknowledge
                    </Button>
                    <Button size="sm" className="h-6 text-xs bg-slate-700 hover:bg-slate-600">
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {currentIncidents.filter(i => i.status !== 'resolved').length === 0 && (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 mx-auto mb-4 text-emerald-400" />
                <p className="text-slate-400">No active incidents</p>
              </div>
            )}
          </CardContent>
        </Card>

          {/* Quick Actions */}
        <Card className="rounded-2xl bg-slate-800 border-slate-700 neom-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-white neom-heading">
              <Zap className="w-5 h-5 text-red-400" />
              <span>Incident Reporting</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              onClick={() => setShowReportIncidentDialog(true)}
              className="w-full h-12 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white border-0 neom-transition neom-shrink-press"
            >
              <Siren className="w-4 h-4 mr-2" />
              Report Incident
            </Button>
            
            <Button 
              onClick={() => setShowQuickLogDialog(true)}
              variant="outline"
              className="w-full h-10 border-slate-600 text-slate-300 hover:bg-slate-700 neom-transition bg-[rgba(60,57,57,1)]"
            >
              <FileText className="w-4 h-4 mr-2" />
              Quick Log
            </Button>
            
            <div className="pt-3 border-t border-slate-600">
              <p className="text-xs text-slate-500 neom-body mb-3">Emergency Response</p>
              <Button 
                onClick={() => setShowEmergencyAlertDialog(true)}
                className="w-full h-12 bg-red-600 text-white hover:bg-red-700 neom-transition neom-pulse-glow"
              >
                <Siren className="w-4 h-4 mr-2" />
                Emergency Alert (Immediate)
              </Button>
            </div>
            
            <div className="pt-3 border-t border-slate-600">
              <p className="text-xs text-slate-500 neom-body mb-3">Communications</p>
              <Button 
                onClick={() => setShowBroadcastDialog(true)}
                variant="outline"
                className="w-full h-10 border-yellow-500 text-[rgba(0,0,0,1)] hover:bg-yellow-900/20 neom-transition"
              >
                <Megaphone className="w-4 h-4 mr-2" />
                Send Broadcast
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Incident Log */}
      <Card className="rounded-2xl bg-slate-800 border-slate-700 neom-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white neom-heading">
            <FileText className="w-5 h-5 text-slate-400" />
            <span>Recent Incident Log</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                time: '14:23',
                type: 'Security Check',
                location: 'Main Entrance',
                officer: 'Security Team',
                status: 'completed',
                notes: 'Routine perimeter check completed, all clear'
              },
              {
                time: '13:45',
                type: 'Fire Drill',
                location: 'All Floors',
                officer: 'Safety Coordinator',
                status: 'completed',
                notes: 'Monthly fire drill executed, evacuation time: 8m 32s'
              },
              {
                time: '12:10',
                type: 'Medical Response',
                location: 'Pool Area',
                officer: 'First Aid Team',
                status: 'resolved',
                notes: 'Minor slip incident, guest treated and released'
              }
            ].map((log, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-slate-700 border border-slate-600">
                <div className="text-center">
                  <div className="text-white font-medium neom-mono">{log.time}</div>
                  <div className="text-xs text-slate-400">Today</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-white neom-heading">{log.type}</h4>
                    <Badge 
                      variant="outline"
                      className="text-xs border-emerald-400 text-emerald-400"
                    >
                      {log.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-300">{log.location} • {log.officer}</p>
                  <p className="text-sm text-slate-400 mt-1">{log.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Incident Details Modal */}
      {selectedIncident && (
        <Card className="rounded-2xl bg-slate-800 border-slate-700 neom-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-white neom-heading">
              <span>Incident Details - {selectedIncident.id}</span>
              <Button 
                variant="ghost" 
                onClick={() => setSelectedIncident(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-slate-200 mb-2 neom-heading">Incident Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Type:</span>
                    <span className="text-white">{selectedIncident.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Location:</span>
                    <span className="text-white">{selectedIncident.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Severity:</span>
                    <Badge 
                      variant="outline"
                      className={`text-xs ${
                        selectedIncident.severity === 'high' ? 'border-red-400 text-red-400' :
                        selectedIncident.severity === 'medium' ? 'border-yellow-400 text-yellow-400' :
                        'border-blue-400 text-blue-400'
                      }`}
                    >
                      {selectedIncident.severity}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Assigned To:</span>
                    <span className="text-white">{selectedIncident.assignedTo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Time:</span>
                    <span className="text-white">{selectedIncident.timeAgo}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-slate-200 mb-2 neom-heading">Response Checklist</h4>
                <div className="space-y-2">
                  {selectedIncident.checklist.map((item: any, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox 
                        checked={item.completed}
                        className="border-slate-600"
                      />
                      <span className={`text-sm ${item.completed ? 'text-slate-400 line-through' : 'text-slate-200'}`}>
                        {item.step}
                      </span>
                      {item.completed && (
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <div className="text-xs text-slate-400 mb-2">
                    Progress: {selectedIncident.checklist.filter((c: any) => c.completed).length}/{selectedIncident.checklist.length} completed
                  </div>
                  <Progress 
                    value={(selectedIncident.checklist.filter((c: any) => c.completed).length / selectedIncident.checklist.length) * 100}
                    className="h-2"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-700">
              <div className="flex space-x-2">
                <Button 
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Add Notes
                </Button>
                <Button 
                  variant="outline"
                  className="border-blue-500 text-blue-400 hover:bg-blue-900/20"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Escalate
                </Button>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline"
                  className="border-yellow-500 text-yellow-400 hover:bg-yellow-900/20"
                >
                  <UserCheck className="w-4 h-4 mr-2" />
                  Respond
                </Button>
                <Button 
                  className="bg-emerald-600 text-white hover:bg-emerald-700"
                  disabled={selectedIncident.checklist.some((c: any) => !c.completed)}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark Resolved
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Success Confirmations */}
      {showIncidentConfirmation && (
        <Card className="rounded-2xl border-emerald-500 bg-emerald-900/30 neom-card neom-fade-in">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-emerald-600/20 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white neom-heading">Incident Report Submitted</h3>
                <p className="text-sm text-emerald-300 neom-body">Safety team has been notified and will respond immediately</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {showQuickLogConfirmation && (
        <Card className="rounded-2xl border-emerald-500 bg-emerald-900/30 neom-card neom-fade-in">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-emerald-600/20 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white neom-heading">Quick Log Saved</h3>
                <p className="text-sm text-emerald-300 neom-body">Entry added to incident log</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {showEmergencyAlertConfirmation && (
        <Card className="rounded-2xl border-red-500 bg-red-900/30 neom-card neom-fade-in">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center neom-heartbeat">
                <Siren className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white neom-heading">Emergency Alert Sent</h3>
                <p className="text-sm text-red-300 neom-body">All staff and safety teams have been notified immediately</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {showBroadcastConfirmation && (
        <Card className="rounded-2xl border-emerald-500 bg-emerald-900/30 neom-card neom-fade-in">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-emerald-600/20 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white neom-heading">Broadcast Sent</h3>
                <p className="text-sm text-emerald-300 neom-body">Message delivered to all staff members</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Report Incident Dialog */}
      <Dialog open={showReportIncidentDialog} onOpenChange={setShowReportIncidentDialog}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl neom-heading">Report Incident</DialogTitle>
            <DialogDescription className="text-slate-400 neom-body">
              Provide detailed information about the incident
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 neom-heading">Incident Type *</label>
              <Select value={reportIncidentData.incidentType} onValueChange={(value) => handleReportIncidentChange('incidentType', value)}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Select incident type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600 text-white">
                  <SelectItem value="medical">Medical Emergency</SelectItem>
                  <SelectItem value="fire">Fire</SelectItem>
                  <SelectItem value="security">Security Breach</SelectItem>
                  <SelectItem value="evacuation">Evacuation</SelectItem>
                  <SelectItem value="hazard">Safety Hazard</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 neom-heading">Location *</label>
              <Input
                placeholder="e.g., Lobby, Pool Area, Room 2501"
                value={reportIncidentData.location}
                onChange={(e) => handleReportIncidentChange('location', e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 neom-input-focus"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 neom-heading">Time</label>
              <Input
                type="datetime-local"
                value={reportIncidentData.time}
                onChange={(e) => handleReportIncidentChange('time', e.target.value)}
                className="bg-slate-700 border-slate-600 text-white neom-input-focus"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 neom-heading">Severity *</label>
              <Select value={reportIncidentData.severity} onValueChange={(value) => handleReportIncidentChange('severity', value)}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Select severity level" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600 text-white">
                  <SelectItem value="low">Low - Minor issue</SelectItem>
                  <SelectItem value="medium">Medium - Needs attention</SelectItem>
                  <SelectItem value="high">High - Critical/Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 neom-heading">Description</label>
              <Textarea
                placeholder="Provide detailed information about the incident..."
                value={reportIncidentData.description}
                onChange={(e) => handleReportIncidentChange('description', e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 min-h-[100px] neom-input-focus"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 neom-heading">Photo (Optional)</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-600 border-dashed rounded-xl cursor-pointer bg-slate-700/50 hover:bg-slate-700 neom-transition">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Siren className="w-10 h-10 mb-3 text-slate-400" />
                    <p className="mb-2 text-sm text-slate-400 neom-body">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-slate-500 neom-body">PNG, JPG (MAX. 5MB)</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleIncidentPhotoUpload}
                  />
                </label>
              </div>
              {reportIncidentData.photoPreview && (
                <div className="relative rounded-xl overflow-hidden border border-slate-600">
                  <img
                    src={reportIncidentData.photoPreview}
                    alt="Incident preview"
                    className="w-full h-48 object-cover"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleReportIncidentChange('photo', null) || handleReportIncidentChange('photoPreview', '')}
                    className="absolute top-2 right-2 bg-slate-900/80 border-slate-600 text-white hover:bg-red-900/80 hover:border-red-500"
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowReportIncidentDialog(false)}
                className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitReportIncident}
                disabled={!reportIncidentData.incidentType || !reportIncidentData.location || !reportIncidentData.severity}
                className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white border-0"
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Report
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Quick Log Dialog */}
      <Dialog open={showQuickLogDialog} onOpenChange={setShowQuickLogDialog}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl neom-heading">Quick Log</DialogTitle>
            <DialogDescription className="text-slate-400 neom-body">
              Fast-entry incident logging
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 neom-heading">Title *</label>
              <Input
                placeholder="Brief incident title"
                value={quickLogData.title}
                onChange={(e) => handleQuickLogChange('title', e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 neom-input-focus"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 neom-heading">Location *</label>
              <Input
                placeholder="Where did this occur?"
                value={quickLogData.location}
                onChange={(e) => handleQuickLogChange('location', e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 neom-input-focus"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 neom-heading">Time</label>
              <Input
                type="datetime-local"
                value={quickLogData.time}
                onChange={(e) => handleQuickLogChange('time', e.target.value)}
                className="bg-slate-700 border-slate-600 text-white neom-input-focus"
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowQuickLogDialog(false)}
                className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitQuickLog}
                disabled={!quickLogData.title || !quickLogData.location}
                className="flex-1 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white border-0"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Log
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Emergency Alert Confirmation Dialog */}
      <Dialog open={showEmergencyAlertDialog} onOpenChange={setShowEmergencyAlertDialog}>
        <DialogContent className="bg-slate-800 border-red-500 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl neom-heading flex items-center space-x-2 text-red-400">
              <Siren className="w-6 h-6" />
              <span>Confirm Emergency Alert</span>
            </DialogTitle>
            <DialogDescription className="text-slate-400 neom-body">
              This action will notify all staff immediately
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 mb-6">
              <p className="text-white neom-body">
                Are you sure you want to trigger an emergency alert? This will notify all staff and safety teams immediately.
              </p>
            </div>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowEmergencyAlertDialog(false)}
                className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSendEmergencyAlert}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white border-0 neom-shrink-press"
              >
                <Siren className="w-4 h-4 mr-2" />
                Send Alert
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Broadcast Dialog */}
      <Dialog open={showBroadcastDialog} onOpenChange={setShowBroadcastDialog}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl neom-heading">Send Broadcast</DialogTitle>
            <DialogDescription className="text-slate-400 neom-body">
              Send non-emergency announcements to staff
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 neom-heading">Subject *</label>
              <Input
                placeholder="e.g., Scheduled Maintenance, Shift Update"
                value={broadcastData.subject}
                onChange={(e) => handleBroadcastChange('subject', e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 neom-input-focus"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 neom-heading">Priority</label>
              <Select value={broadcastData.priority} onValueChange={(value) => handleBroadcastChange('priority', value)}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600 text-white">
                  <SelectItem value="low">Low - General information</SelectItem>
                  <SelectItem value="normal">Normal - Standard announcement</SelectItem>
                  <SelectItem value="high">High - Important update</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 neom-heading">Message *</label>
              <Textarea
                placeholder="Type your announcement message here..."
                value={broadcastData.message}
                onChange={(e) => handleBroadcastChange('message', e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 min-h-[120px] neom-input-focus"
              />
            </div>

            <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4">
              <p className="text-sm text-blue-300 neom-body flex items-start space-x-2">
                <Bell className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>This broadcast will be sent to all staff members. Use for non-emergency communications only.</span>
              </p>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowBroadcastDialog(false)}
                className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSendBroadcast}
                disabled={!broadcastData.subject || !broadcastData.message}
                className="flex-1 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white border-0"
              >
                <Megaphone className="w-4 h-4 mr-2" />
                Send Broadcast
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
  };

  // NEW FEATURE RENDER FUNCTIONS
  
  // Schedule Screen with Shift Swap
  const renderScheduleScreen = () => {
    // Enhanced shift data for the current user with full details
    // Today is Thursday, Oct 2, 2025
    const getDepartmentName = (role: string) => {
      switch(role) {
        case 'housekeeping': return 'Housekeeping';
        case 'fnb': return 'F&B Service';
        case 'maintenance': return 'Maintenance';
        default: return 'Operations';
      }
    };
    
    const baseShifts = [
      { 
        id: 1, 
        day: 'Thursday', 
        date: 'Oct 2', 
        fullDate: '2025-10-02',
        time: '2:00 PM - 10:00 PM', 
        location: 'Main Building - Floor 20-25', 
        area: 'Rooms 2001-2525',
        department: getDepartmentName(userRole),
        role: userRole?.charAt(0).toUpperCase() + userRole?.slice(1) || 'Staff',
        status: 'confirmed',
        isToday: true,
        notes: 'Evening shift - Peak guest service hours'
      },
      { 
        id: 2, 
        day: 'Friday', 
        date: 'Oct 3', 
        fullDate: '2025-10-03',
        time: '8:00 AM - 4:00 PM', 
        location: 'Main Building - Floor 15-20', 
        area: 'Rooms 1501-2025',
        department: getDepartmentName(userRole),
        role: userRole?.charAt(0).toUpperCase() + userRole?.slice(1) || 'Staff',
        status: 'confirmed',
        isToday: false,
        notes: 'Morning shift - Checkout preparations'
      },
      { 
        id: 3, 
        day: 'Saturday', 
        date: 'Oct 4', 
        fullDate: '2025-10-04',
        time: '8:00 AM - 4:00 PM', 
        location: 'Pool & Wellness Area', 
        area: 'Spa, Gym, Pool Deck',
        department: getDepartmentName(userRole),
        role: userRole?.charAt(0).toUpperCase() + userRole?.slice(1) || 'Staff',
        status: 'swap_requested',
        isToday: false,
        notes: 'Weekend shift - High traffic expected',
        swapRequestedWith: 'Maria Santos'
      },
      { 
        id: 4, 
        day: 'Monday', 
        date: 'Oct 6', 
        fullDate: '2025-10-06',
        time: '2:00 PM - 10:00 PM', 
        location: 'Main Building - Floor 25-30', 
        area: 'Rooms 2501-3025',
        department: getDepartmentName(userRole),
        role: userRole?.charAt(0).toUpperCase() + userRole?.slice(1) || 'Staff',
        status: 'confirmed',
        isToday: false,
        notes: 'Evening shift - VIP floor coverage'
      },
      { 
        id: 5, 
        day: 'Tuesday', 
        date: 'Oct 7', 
        fullDate: '2025-10-07',
        time: '8:00 AM - 4:00 PM', 
        location: 'Main Building - All Floors', 
        area: 'Full property coverage',
        department: getDepartmentName(userRole),
        role: userRole?.charAt(0).toUpperCase() + userRole?.slice(1) || 'Staff',
        status: 'pending',
        isToday: false,
        notes: 'Pending manager approval'
      },
      { 
        id: 6, 
        day: 'Wednesday', 
        date: 'Oct 8', 
        fullDate: '2025-10-08',
        time: '8:00 AM - 4:00 PM', 
        location: 'Conference & Events Area', 
        area: 'Meeting rooms, Ballroom',
        department: getDepartmentName(userRole),
        role: userRole?.charAt(0).toUpperCase() + userRole?.slice(1) || 'Staff',
        status: 'confirmed',
        isToday: false,
        notes: 'Special event coverage'
      }
    ];

    // Convert time-off requests into blocked-out shift entries
    const timeOffShifts = timeOffRequests.map(request => ({
      id: `timeoff-${request.id}`,
      day: new Date(request.startDate).toLocaleDateString('en-US', { weekday: 'long' }),
      date: new Date(request.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).replace(',', ''),
      fullDate: request.startDate,
      time: 'Time Off',
      location: 'N/A',
      area: request.endDate !== request.startDate ? `${new Date(request.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(request.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` : 'Single day',
      department: 'Time Off Request',
      role: 'Time Off',
      status: request.status || 'pending',
      isToday: false,
      notes: request.reason || 'No reason provided',
      isTimeOff: true,
      timeOffDetails: request
    }));

    // Merge shifts with time-off requests and sort by date
    const myShifts = [...baseShifts, ...timeOffShifts].sort((a, b) => 
      new Date(a.fullDate).getTime() - new Date(b.fullDate).getTime()
    );

    // Available staff members for swapping
    const availableStaff = [
      { id: 101, name: 'Ahmed Hassan', role: userRole || 'Maintenance', availability: 'Full-time', shifts: 12 },
      { id: 102, name: 'Maria Santos', role: userRole || 'Housekeeping', availability: 'Part-time', shifts: 8 },
      { id: 103, name: 'John Mitchell', role: userRole || 'F&B', availability: 'Full-time', shifts: 15 },
      { id: 104, name: 'Sarah Chen', role: userRole || 'Housekeeping', availability: 'Full-time', shifts: 14 },
      { id: 105, name: 'David Park', role: userRole || 'Maintenance', availability: 'Part-time', shifts: 10 }
    ];

    // AI Suggestions for swaps
    const aiSuggestions = [
      {
        id: 301,
        yourShift: { id: 2, day: 'Tuesday', date: 'Oct 7', time: '8:00 AM - 4:00 PM' },
        theirShift: { id: 204, day: 'Thursday', date: 'Oct 9', time: '2:00 PM - 10:00 PM' },
        suggestedStaff: { id: 102, name: 'Maria Santos', role: 'Housekeeping' },
        benefit: 'Improves evening coverage',
        confidence: 85
      },
      {
        id: 302,
        yourShift: { id: 3, day: 'Wednesday', date: 'Oct 8', time: '2:00 PM - 10:00 PM' },
        theirShift: { id: 105, day: 'Friday', date: 'Oct 10', time: '8:00 AM - 4:00 PM' },
        suggestedStaff: { id: 101, name: 'Ahmed Hassan', role: 'Maintenance' },
        benefit: 'Balances workload distribution',
        confidence: 78
      }
    ];

    const handleRequestSwap = (shift: any) => {
      setSelectedShift(shift);
      setShowSwapDialog(true);
      setSelectedStaffForSwap(null);
    };

    const handleApplyAiSuggestion = (suggestion: any) => {
      // Auto-populate the swap dialog with AI suggestion
      const yourShift = myShifts.find(s => s.id === suggestion.yourShift.id);
      const suggestedStaff = availableStaff.find(s => s.id === suggestion.suggestedStaff.id);
      
      if (yourShift && suggestedStaff) {
        setSelectedShift(yourShift);
        setSelectedStaffForSwap(suggestedStaff);
        setShowSwapDialog(true);
        setShowMySchedule(true);
      }
    };

    const handleDismissAiSuggestion = (suggestionId: number) => {
      setDismissedAiSuggestions(prev => new Set([...prev, suggestionId]));
    };

    const handleConfirmSwap = () => {
      if (selectedShift && selectedStaffForSwap) {
        // Add new swap request
        const newRequest = {
          id: Date.now(),
          requestedShift: selectedShift,
          requestedStaff: selectedStaffForSwap,
          status: 'pending',
          requestDate: 'Oct 2, 2025'
        };
        setSwapRequests(prev => [...prev, newRequest]);
        
        // Reset and close dialog
        setShowSwapDialog(false);
        setSelectedShift(null);
        setSelectedStaffForSwap(null);
        setShowSwapRequests(true);
      }
    };

    const handleApproveSwap = (requestId: number) => {
      setSwapRequests(prev =>
        prev.map(req => req.id === requestId ? { ...req, status: 'approved' } : req)
      );
    };

    const handleDeclineSwap = (requestId: number) => {
      setSwapRequests(prev =>
        prev.map(req => req.id === requestId ? { ...req, status: 'declined' } : req)
      );
    };

    // Time Off Request Handlers
    const handleTimeOffSubmit = () => {
      if (!timeOffFormData.startDate || !timeOffFormData.endDate) {
        return; // Validation - both dates required
      }

      // Create new time off request
      const newRequest = {
        id: Date.now(),
        startDate: timeOffFormData.startDate,
        endDate: timeOffFormData.endDate,
        reason: timeOffFormData.reason || 'No reason provided',
        replacement: timeOffFormData.replacement || 'None',
        status: 'pending',
        requestDate: 'Oct 2, 2025',
        staffName: staffInfo?.name || 'Staff Member'
      };

      setTimeOffRequests(prev => [...prev, newRequest]);

      // Reset form and close dialog
      setTimeOffFormData({
        startDate: '',
        endDate: '',
        reason: '',
        replacement: ''
      });
      setShowTimeOffDialog(false);
      setShowTimeOffConfirmation(true);

      // Auto-dismiss confirmation after 4 seconds
      setTimeout(() => {
        setShowTimeOffConfirmation(false);
      }, 4000);
    };

    const handleTimeOffCancel = () => {
      setTimeOffFormData({
        startDate: '',
        endDate: '',
        reason: '',
        replacement: ''
      });
      setShowTimeOffDialog(false);
    };

    const departmentColor = getDepartmentColor(userRole);
    const activeSuggestions = aiSuggestions.filter(s => !dismissedAiSuggestions.has(s.id));

    return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white neom-heading">Schedule & Shift Swaps</h2>
            <p className="text-slate-400 neom-body">Manage your shifts and request swaps</p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            className="border-slate-600 text-[rgba(1,24,53,1)] hover:bg-slate-700"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            onClick={() => {
              setShowMySchedule(true);
              setShowSwapRequests(false);
            }}
            className={`h-16 flex items-center justify-start space-x-3 px-6 ${
              showMySchedule 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Calendar className="w-6 h-6" />
            <span>View My Schedule</span>
          </Button>
          
          <Button 
            onClick={() => {
              setShowMySchedule(false);
              setShowSwapRequests(true);
            }}
            className={`h-16 flex items-center justify-start space-x-3 px-6 ${
              showSwapRequests 
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                : 'bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <RotateCcw className="w-6 h-6" />
            <div className="flex items-center space-x-2">
              <span>Swap Requests</span>
              {swapRequests.filter(r => r.status === 'pending').length > 0 && (
                <Badge className="bg-orange-600">
                  {swapRequests.filter(r => r.status === 'pending').length}
                </Badge>
              )}
            </div>
          </Button>
          
          <Button 
            onClick={() => setShowTimeOffDialog(true)}
            variant="outline"
            className="h-16 flex items-center justify-start space-x-3 px-6 bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700"
          >
            <Clock className="w-6 h-6" />
            <span>Request Time Off</span>
          </Button>
        </div>

        {/* My Schedule View - Enhanced with Full Interactivity */}
        {showMySchedule && (
          <div className="space-y-4">
            <Card className="rounded-2xl bg-slate-800 border-slate-700 neom-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2 text-white neom-heading">
                    <Calendar className="w-5 h-5 text-blue-400" />
                    <span>My Upcoming Shifts</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="border-blue-400 text-blue-400">
                      {myShifts.length} shifts
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-slate-400 mb-4">Click on any shift to view details, request swap, or manage availability</p>
                {myShifts.map((shift) => {
                  const getStatusColor = (status: string) => {
                    switch(status) {
                      case 'confirmed': return 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400';
                      case 'pending': return 'bg-yellow-500/20 border-yellow-500/40 text-yellow-400';
                      case 'swap_requested': return 'bg-orange-500/20 border-orange-500/40 text-orange-400';
                      default: return 'bg-slate-500/20 border-slate-500/40 text-slate-400';
                    }
                  };
                  
                  const getStatusLabel = (status: string) => {
                    switch(status) {
                      case 'confirmed': return 'Confirmed';
                      case 'pending': return 'Pending';
                      case 'swap_requested': return 'Swap Requested';
                      default: return 'Scheduled';
                    }
                  };
                  
                  // Special rendering for time-off requests
                  if (shift.isTimeOff) {
                    return (
                      <div 
                        key={shift.id} 
                        className="p-4 rounded-xl border bg-slate-700/40 border-slate-600 opacity-70"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start space-x-4 flex-1">
                            {/* Date Section */}
                            <div className="text-center min-w-[80px] p-3 rounded-lg bg-slate-800/50">
                              <p className="text-sm text-slate-300">{shift.day}</p>
                              <p className="font-semibold text-white neom-mono">{shift.date}</p>
                            </div>
                            
                            <div className="h-auto w-px bg-slate-600"></div>
                            
                            {/* Time Off Details */}
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4 text-yellow-400" />
                                <p className="font-medium text-slate-300">Time Off Request</p>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-slate-400" />
                                <p className="text-sm text-slate-400">{shift.area}</p>
                              </div>
                              
                              {shift.notes && shift.notes !== 'No reason provided' && (
                                <div className="flex items-center space-x-2">
                                  <FileText className="w-4 h-4 text-slate-500" />
                                  <p className="text-sm text-slate-500 italic">{shift.notes}</p>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Status Badge - Pending */}
                          <div className="flex flex-col items-end space-y-2">
                            <Badge className="text-xs px-3 py-1 bg-yellow-500/20 border-yellow-500/40 text-yellow-400">
                              Pending Approval
                            </Badge>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  
                  // Normal shift rendering
                  return (
                    <div 
                      key={shift.id} 
                      onClick={() => {
                        setSelectedShiftForDetails(shift);
                        setShowShiftDetailsDialog(true);
                      }}
                      className={`p-4 rounded-xl border neom-transition cursor-pointer ${
                        shift.isToday 
                          ? 'bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border-blue-500/50 shadow-lg shadow-blue-500/20 neom-glow-cyan' 
                          : 'bg-slate-700/80 border-slate-600 hover:border-blue-500/50 hover:bg-slate-700'
                      }`}
                    >
                      {shift.isToday && (
                        <div className="mb-2">
                          <Badge className="bg-blue-500 text-white text-xs px-2 py-0.5">
                            ⚡ Today's Shift
                          </Badge>
                        </div>
                      )}
                      
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start space-x-4 flex-1">
                          {/* Date Section */}
                          <div className={`text-center min-w-[80px] p-3 rounded-lg ${
                            shift.isToday ? 'bg-blue-600/30' : 'bg-slate-800/50'
                          }`}>
                            <p className="text-sm text-slate-300">{shift.day}</p>
                            <p className="font-semibold text-white neom-mono">{shift.date}</p>
                          </div>
                          
                          <div className="h-auto w-px bg-slate-600"></div>
                          
                          {/* Shift Details */}
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-blue-400" />
                              <p className="font-medium text-white">{shift.time}</p>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Building2 className="w-4 h-4 text-purple-400" />
                              <p className="text-sm text-slate-300">{shift.department}</p>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-slate-400" />
                              <p className="text-sm text-slate-400">{shift.location}</p>
                            </div>
                            
                            {shift.area && (
                              <div className="flex items-center space-x-2">
                                <Navigation className="w-3 h-3 text-slate-500" />
                                <p className="text-xs text-slate-500">{shift.area}</p>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Status Badge */}
                        <div className="flex flex-col items-end space-y-2">
                          <Badge className={`text-xs px-3 py-1 ${getStatusColor(shift.status)}`}>
                            {getStatusLabel(shift.status)}
                          </Badge>
                          {shift.swapRequestedWith && (
                            <p className="text-xs text-orange-400">
                              with {shift.swapRequestedWith}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Optional AI Swap Suggestions - Collapsible */}
            <Card className="rounded-2xl bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/20 neom-card">
              <CardHeader className="cursor-pointer" onClick={() => setShowAiSuggestions(!showAiSuggestions)}>
                <CardTitle className="flex items-center justify-between text-white neom-heading">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-5 h-5 text-purple-400" />
                    <span>AI Swap Suggestions</span>
                    <Badge variant="outline" className="text-xs border-purple-400 text-purple-400">Optional</Badge>
                    {activeSuggestions.length > 0 && (
                      <Badge className="bg-purple-600 text-xs">
                        {activeSuggestions.length}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {showAiSuggestions ? (
                      <ArrowLeft className="w-4 h-4 text-slate-400 rotate-90" />
                    ) : (
                      <ArrowRight className="w-4 h-4 text-slate-400 rotate-90" />
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              
              {showAiSuggestions && (
                <CardContent className="space-y-3 neom-fade-in">
                  {activeSuggestions.length === 0 ? (
                    <div className="text-center py-6">
                      <CheckCircle className="w-10 h-10 mx-auto mb-3 text-emerald-400" />
                      <p className="text-slate-400 text-sm">No AI suggestions at the moment</p>
                      <p className="text-xs text-slate-500 mt-1">Your schedule is well optimized</p>
                    </div>
                  ) : (
                    activeSuggestions.map((suggestion) => (
                      <div 
                        key={suggestion.id} 
                        className="p-4 rounded-xl bg-slate-700/50 border border-purple-500/30 neom-transition"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Shuffle className="w-4 h-4 text-purple-400" />
                              <p className="text-sm text-white font-medium">
                                Suggested swap: {suggestion.suggestedStaff.name} ({suggestion.yourShift.day} ↔ {suggestion.theirShift.day})
                              </p>
                            </div>
                            <div className="space-y-1 text-xs text-slate-400 ml-6">
                              <p>• Your shift: {suggestion.yourShift.day}, {suggestion.yourShift.time}</p>
                              <p>• Their shift: {suggestion.theirShift.day}, {suggestion.theirShift.time}</p>
                              <p className="text-emerald-400 mt-2">→ {suggestion.benefit}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between ml-6">
                          <div className="flex items-center space-x-2">
                            <div className="h-1.5 w-20 bg-slate-600 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-purple-500 rounded-full"
                                style={{ width: `${suggestion.confidence}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-slate-500">{suggestion.confidence}% confidence</span>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button 
                              onClick={() => handleDismissAiSuggestion(suggestion.id)}
                              size="sm"
                              variant="outline"
                              className="h-8 text-xs border-slate-600 text-slate-400 hover:bg-slate-700"
                            >
                              Dismiss
                            </Button>
                            <Button 
                              onClick={() => handleApplyAiSuggestion(suggestion)}
                              size="sm"
                              className="h-8 text-xs bg-emerald-600 hover:bg-emerald-700"
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Apply
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  
                  <div className="pt-2 border-t border-slate-700">
                    <p className="text-xs text-slate-500 text-center">
                      <Lightbulb className="w-3 h-3 inline mr-1" />
                      AI suggestions are optional. You always have final approval before any swap request is sent.
                    </p>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        )}

        {/* Swap Requests View */}
        {showSwapRequests && (
          <Card className="rounded-2xl bg-slate-800 border-slate-700 neom-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white neom-heading">
                <RotateCcw className="w-5 h-5 text-emerald-400" />
                <span>Shift Swap Requests</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {swapRequests.length === 0 ? (
                <div className="text-center py-8">
                  <RotateCcw className="w-12 h-12 mx-auto mb-4 text-slate-600" />
                  <p className="text-slate-400">No swap requests</p>
                  <p className="text-sm text-slate-500 mt-1">Request a shift swap to get started</p>
                </div>
              ) : (
                swapRequests.map((request) => (
                  <div 
                    key={request.id} 
                    className={`p-4 rounded-xl border neom-transition ${
                      request.status === 'approved' 
                        ? 'bg-emerald-900/20 border-emerald-500/50' 
                        : request.status === 'declined'
                        ? 'bg-red-900/20 border-red-500/50'
                        : 'bg-slate-700 border-slate-600'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <User className="w-4 h-4 text-blue-400" />
                          <span className="font-medium text-white">{request.requestedStaff.name}</span>
                          <Badge variant="outline" className="text-xs border-slate-500 text-slate-400">
                            {request.requestedStaff.role}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-slate-300">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span>{request.requestedShift.day}, {request.requestedShift.date}</span>
                          <span className="text-slate-500">•</span>
                          <Clock className="w-4 h-4 text-slate-400" />
                          <span>{request.requestedShift.time}</span>
                        </div>
                      </div>
                      <Badge 
                        className={
                          request.status === 'approved' 
                            ? 'bg-emerald-600' 
                            : request.status === 'declined'
                            ? 'bg-red-600'
                            : 'bg-orange-600'
                        }
                      >
                        {request.status}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-400">Requested on {request.requestDate}</p>
                      
                      {request.status === 'pending' && (
                        <div className="flex space-x-2">
                          <Button 
                            onClick={() => handleDeclineSwap(request.id)}
                            size="sm"
                            variant="outline"
                            className="h-8 border-red-600 text-red-400 hover:bg-red-900/20"
                          >
                            Decline
                          </Button>
                          <Button 
                            onClick={() => handleApproveSwap(request.id)}
                            size="sm"
                            className="h-8 bg-emerald-600 hover:bg-emerald-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                        </div>
                      )}

                      {request.status === 'approved' && (
                        <div className="flex items-center space-x-2 text-emerald-400">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Approved by Manager</span>
                        </div>
                      )}

                      {request.status === 'declined' && (
                        <div className="flex items-center space-x-2 text-red-400">
                          <AlertCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Declined</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        )}

        {/* Shift Details Dialog */}
        {showShiftDetailsDialog && selectedShiftForDetails && (
          <Dialog open={showShiftDetailsDialog} onOpenChange={setShowShiftDetailsDialog}>
            <DialogContent className="max-w-2xl bg-slate-800 border-slate-700 text-white neom-card">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2 text-white neom-heading">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <span>Shift Details</span>
                </DialogTitle>
                <DialogDescription className="text-slate-400">
                  View shift information and manage your availability
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 mt-4">
                {/* Today's Shift Indicator */}
                {selectedShiftForDetails.isToday && (
                  <div className="p-3 rounded-lg bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-blue-500/50">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                      <p className="text-sm text-blue-400 font-medium">This is your shift today</p>
                    </div>
                  </div>
                )}
                
                {/* Shift Overview */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-700/80 border border-slate-600">
                    <p className="text-xs text-slate-400 mb-2">DATE & TIME</p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-blue-400" />
                        <p className="text-white">{selectedShiftForDetails.day}, {selectedShiftForDetails.date}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <p className="text-white">{selectedShiftForDetails.time}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-slate-700/80 border border-slate-600">
                    <p className="text-xs text-slate-400 mb-2">ROLE & DEPARTMENT</p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Building2 className="w-4 h-4 text-purple-400" />
                        <p className="text-white">{selectedShiftForDetails.department}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-purple-400" />
                        <p className="text-white">{selectedShiftForDetails.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Location & Area */}
                <div className="p-4 rounded-xl bg-slate-700/80 border border-slate-600">
                  <p className="text-xs text-slate-400 mb-2">LOCATION & ASSIGNED AREA</p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-emerald-400" />
                      <p className="text-white">{selectedShiftForDetails.location}</p>
                    </div>
                    {selectedShiftForDetails.area && (
                      <div className="flex items-center space-x-2">
                        <Navigation className="w-4 h-4 text-emerald-400" />
                        <p className="text-slate-300">{selectedShiftForDetails.area}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Status */}
                <div className="p-4 rounded-xl bg-slate-700/80 border border-slate-600">
                  <p className="text-xs text-slate-400 mb-2">STATUS</p>
                  <div className="flex items-center justify-between">
                    <Badge className={
                      selectedShiftForDetails.status === 'confirmed' 
                        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' 
                        : selectedShiftForDetails.status === 'pending'
                        ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-400'
                        : 'bg-orange-500/20 border-orange-500/40 text-orange-400'
                    }>
                      {selectedShiftForDetails.status === 'confirmed' ? 'Confirmed' 
                       : selectedShiftForDetails.status === 'pending' ? 'Pending Approval'
                       : 'Swap Requested'}
                    </Badge>
                    {selectedShiftForDetails.swapRequestedWith && (
                      <p className="text-sm text-orange-400">
                        Swap requested with {selectedShiftForDetails.swapRequestedWith}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Notes */}
                {selectedShiftForDetails.notes && (
                  <div className="p-4 rounded-xl bg-blue-900/20 border border-blue-500/30">
                    <div className="flex items-start space-x-3">
                      <Bell className="w-5 h-5 text-blue-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-slate-400 mb-1">SHIFT NOTES</p>
                        <p className="text-sm text-slate-300">{selectedShiftForDetails.notes}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-slate-700">
                  <Button 
                    onClick={() => {
                      setShowShiftDetailsDialog(false);
                      handleRequestSwap(selectedShiftForDetails);
                    }}
                    disabled={selectedShiftForDetails.status === 'swap_requested'}
                    className="flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Request Swap</span>
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="flex items-center justify-center space-x-2 border-blue-600 text-blue-400 hover:bg-blue-900/20"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="flex items-center justify-center space-x-2 border-purple-600 text-purple-400 hover:bg-purple-900/20"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Mark Available</span>
                  </Button>
                </div>
                
                {/* Help Text */}
                <div className="p-3 rounded-lg bg-slate-700/50 border border-slate-600">
                  <div className="flex items-start space-x-2">
                    <HelpCircle className="w-4 h-4 text-slate-400 mt-0.5" />
                    <p className="text-xs text-slate-400">
                      <strong className="text-slate-300">Note:</strong> Requesting a swap will notify available staff members. 
                      Marking yourself as available allows other staff to swap with you. All changes require manager approval.
                    </p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
        
        {/* Swap Request Dialog */}
        {showSwapDialog && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="rounded-2xl bg-slate-800 border-slate-700 neom-card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white neom-heading">
                  <div className="flex items-center space-x-2">
                    <RotateCcw className="w-5 h-5 text-emerald-400" />
                    <span>Request Shift Swap</span>
                  </div>
                  <Button 
                    onClick={() => {
                      setShowSwapDialog(false);
                      setSelectedShift(null);
                      setSelectedStaffForSwap(null);
                    }}
                    size="sm"
                    variant="ghost"
                    className="text-slate-400 hover:text-white"
                  >
                    ✕
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Selected Shift */}
                <div className="p-4 rounded-xl bg-blue-900/20 border border-blue-500/30">
                  <p className="text-xs text-slate-400 mb-2">YOUR SHIFT TO SWAP</p>
                  <div className="flex items-center space-x-4">
                    <div className="text-center min-w-[80px]">
                      <p className="text-sm text-slate-300">{selectedShift?.day}</p>
                      <p className="font-medium text-white neom-mono">{selectedShift?.date}</p>
                    </div>
                    <div className="h-12 w-px bg-slate-600"></div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <p className="font-medium text-white">{selectedShift?.time}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <p className="text-sm text-slate-400">{selectedShift?.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Staff Selection */}
                <div>
                  <p className="text-sm text-slate-300 font-medium mb-3">Select staff member to request swap with:</p>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {availableStaff.map((staff) => (
                      <div
                        key={staff.id}
                        onClick={() => setSelectedStaffForSwap(staff)}
                        className={`p-4 rounded-xl border cursor-pointer neom-transition ${
                          selectedStaffForSwap?.id === staff.id
                            ? 'bg-emerald-900/20 border-emerald-500'
                            : 'bg-slate-700 border-slate-600 hover:border-slate-500'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600">
                              <AvatarFallback className="text-white">
                                {staff.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-white">{staff.name}</p>
                              <div className="flex items-center space-x-2 text-xs text-slate-400">
                                <span>{staff.role}</span>
                                <span>•</span>
                                <span>{staff.availability}</span>
                                <span>•</span>
                                <span>{staff.shifts} shifts/month</span>
                              </div>
                            </div>
                          </div>
                          {selectedStaffForSwap?.id === staff.id && (
                            <CheckCircle className="w-5 h-5 text-emerald-400" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Info Box */}
                <div className="p-4 rounded-lg bg-slate-700/50 border border-slate-600">
                  <div className="flex items-start space-x-3">
                    <Bell className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div className="text-sm text-slate-300">
                      <p className="font-medium mb-1">Swap Request Process</p>
                      <ul className="text-xs text-slate-400 space-y-1">
                        <li>• Notification will be sent to selected staff member</li>
                        <li>• Manager approval required for all swaps</li>
                        <li>• Both parties will be notified of the decision</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3 pt-4">
                  <Button 
                    onClick={() => {
                      setShowSwapDialog(false);
                      setSelectedShift(null);
                      setSelectedStaffForSwap(null);
                    }}
                    variant="outline"
                    className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleConfirmSwap}
                    disabled={!selectedStaffForSwap}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Swap Request
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Time Off Request Dialog */}
        {showTimeOffDialog && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="rounded-2xl bg-slate-800 border-slate-700 neom-card max-w-2xl w-full max-h-[90vh] overflow-y-auto neom-fade-in">
              <CardHeader className="border-b border-slate-700">
                <CardTitle className="flex items-center space-x-3 text-white neom-heading">
                  <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-400" />
                  </div>
                  <span>Request Time Off</span>
                </CardTitle>
                <p className="text-slate-400 mt-2 text-sm">
                  Submit your time-off request. All requests require manager approval.
                </p>
              </CardHeader>
              <CardContent className="p-6 space-y-5">
                {/* Date Range Selector */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-slate-300 font-medium flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-blue-400" />
                        <span>Start Date <span className="text-red-400">*</span></span>
                      </label>
                      <Input
                        type="date"
                        value={timeOffFormData.startDate}
                        onChange={(e) => setTimeOffFormData(prev => ({ ...prev, startDate: e.target.value }))}
                        className="bg-slate-700/50 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500/20"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm text-slate-300 font-medium flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-blue-400" />
                        <span>End Date <span className="text-red-400">*</span></span>
                      </label>
                      <Input
                        type="date"
                        value={timeOffFormData.endDate}
                        onChange={(e) => setTimeOffFormData(prev => ({ ...prev, endDate: e.target.value }))}
                        className="bg-slate-700/50 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500/20"
                        min={timeOffFormData.startDate || new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>
                  
                  {/* Date Preview */}
                  {timeOffFormData.startDate && timeOffFormData.endDate && (
                    <div className="p-3 rounded-lg bg-blue-900/20 border border-blue-500/30">
                      <div className="flex items-center space-x-2 text-sm text-blue-300">
                        <AlertCircle className="w-4 h-4" />
                        <span>
                          Requesting time off from {new Date(timeOffFormData.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} to {new Date(timeOffFormData.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          {' '}({Math.ceil((new Date(timeOffFormData.endDate).getTime() - new Date(timeOffFormData.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1} days)
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Reason (Optional) */}
                <div className="space-y-2">
                  <label className="text-sm text-slate-300 font-medium flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-purple-400" />
                    <span>Reason <span className="text-slate-500">(Optional)</span></span>
                  </label>
                  <Textarea
                    value={timeOffFormData.reason}
                    onChange={(e) => setTimeOffFormData(prev => ({ ...prev, reason: e.target.value }))}
                    placeholder="e.g., Family vacation, Medical appointment, Personal day..."
                    className="bg-slate-700/50 border-slate-600 text-white focus:border-purple-500 focus:ring-purple-500/20 resize-none"
                    rows={3}
                  />
                </div>

                {/* Select Replacement (Optional) */}
                <div className="space-y-2">
                  <label className="text-sm text-slate-300 font-medium flex items-center space-x-2">
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span>Suggested Replacement <span className="text-slate-500">(Optional)</span></span>
                  </label>
                  <Select 
                    value={timeOffFormData.replacement} 
                    onValueChange={(value) => setTimeOffFormData(prev => ({ ...prev, replacement: value }))}
                  >
                    <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white focus:border-emerald-500 focus:ring-emerald-500/20">
                      <SelectValue placeholder="Select a staff member (optional)" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {availableStaff.map((staff) => (
                        <SelectItem key={staff.id} value={staff.name} className="text-white hover:bg-slate-700">
                          <div className="flex items-center space-x-2">
                            <span>{staff.name}</span>
                            <span className="text-xs text-slate-400">({staff.availability})</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-slate-500 flex items-start space-x-1">
                    <HelpCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <span>Suggest a colleague to cover your shifts. Manager will review and assign coverage.</span>
                  </p>
                </div>

                {/* Important Note */}
                <div className="p-4 rounded-lg bg-yellow-900/20 border border-yellow-500/30">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-yellow-300">Important Information</p>
                      <ul className="text-xs text-yellow-200/80 space-y-1 list-disc list-inside">
                        <li>Your time-off request will be marked as "Pending Approval" until reviewed by your manager</li>
                        <li>Dates will be blocked out in your schedule with a pending status</li>
                        <li>You'll receive a notification once your request is approved or denied</li>
                        <li>Please submit requests at least 48 hours in advance when possible</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <Button 
                    onClick={handleTimeOffCancel}
                    variant="outline"
                    className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleTimeOffSubmit}
                    disabled={!timeOffFormData.startDate || !timeOffFormData.endDate}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit Request
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Time Off Confirmation Toast */}
        {showTimeOffConfirmation && (
          <div className="fixed bottom-6 right-6 z-50 neom-notification-in">
            <Card className="rounded-xl bg-gradient-to-r from-emerald-900/90 to-blue-900/90 border-emerald-500/50 shadow-2xl shadow-emerald-500/20 max-w-md">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white neom-heading mb-1">Time-Off Request Submitted!</h4>
                    <p className="text-sm text-emerald-100/80">
                      Your request has been sent to your manager for approval. You'll be notified once it's reviewed.
                    </p>
                    <div className="mt-3 p-2 rounded bg-slate-800/50 border border-slate-700">
                      <p className="text-xs text-slate-300">
                        <strong>Status:</strong> <span className="text-yellow-400">Pending Approval</span>
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => setShowTimeOffConfirmation(false)}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10 p-1 h-auto"
                  >
                    ×
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  };
  
  // AR Assist Screen
  const renderArAssistScreen = () => {
    const departmentColor = getDepartmentColor(userRole);
    
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white neom-heading">AR Assist</h2>
            <p className="text-slate-400 neom-body">Augmented reality guidance and overlays</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              onClick={() => handleArModeChange('off')}
              variant={arMode === 'off' ? 'default' : 'outline'}
              size="sm"
              className="border-slate-600"
            >
              <Smartphone className="w-4 h-4 mr-2" />
              Phone View
            </Button>
            <Button 
              variant="outline"
              size="sm"
              className="border-slate-600 text-[rgba(0,0,0,1)] hover:bg-slate-700"
            >
              <Glasses className="w-4 h-4 mr-2" />
              Smart Glasses
            </Button>
          </div>
        </div>

        {/* AR Mode Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card 
            className={`rounded-2xl cursor-pointer border-2 neom-card neom-hover-lift ${
              arMode === 'cleaning' ? 'border-emerald-500 bg-emerald-500/10' : 'bg-slate-800 border-slate-700'
            }`}
            onClick={() => handleArModeChange(arMode === 'cleaning' ? 'off' : 'cleaning')}
          >
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                <Bed className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="font-semibold text-white neom-heading mb-2">Cleaning Sequence</h3>
              <p className="text-sm text-slate-400 neom-body">Step-by-step cleaning guidance with AR overlays</p>
              {arMode === 'cleaning' && (
                <Badge className="mt-3 bg-emerald-600">Active</Badge>
              )}
            </CardContent>
          </Card>

          <Card 
            className={`rounded-2xl cursor-pointer border-2 neom-card neom-hover-lift ${
              arMode === 'maintenance' ? 'border-orange-500 bg-orange-500/10' : 'bg-slate-800 border-slate-700'
            }`}
            onClick={() => handleArModeChange(arMode === 'maintenance' ? 'off' : 'maintenance')}
          >
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-4">
                <Wrench className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="font-semibold text-white neom-heading mb-2">Equipment Faults</h3>
              <p className="text-sm text-slate-400 neom-body">Identify faulty equipment and repair guidance</p>
              {arMode === 'maintenance' && (
                <Badge className="mt-3 bg-orange-600">Active</Badge>
              )}
            </CardContent>
          </Card>

          <Card 
            className={`rounded-2xl cursor-pointer border-2 neom-card neom-hover-lift ${
              arMode === 'emergency' ? 'border-red-500 bg-red-500/10' : 'bg-slate-800 border-slate-700'
            }`}
            onClick={() => handleArModeChange(arMode === 'emergency' ? 'off' : 'emergency')}
          >
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                <Route className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="font-semibold text-white neom-heading mb-2">Emergency Paths</h3>
              <p className="text-sm text-slate-400 neom-body">Evacuation routes and emergency procedures</p>
              {arMode === 'emergency' && (
                <Badge className="mt-3 bg-red-600">Active</Badge>
              )}
            </CardContent>
          </Card>
        </div>

        {/* AR View Simulation */}
        {arMode !== 'off' && (
          <Card className="rounded-2xl bg-slate-800 border-slate-700 neom-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white neom-heading">
                <Crosshair className="w-5 h-5" style={{ color: departmentColor }} />
                <span>AR Overlay Simulation</span>
                <Badge style={{ backgroundColor: departmentColor, color: 'white' }}>
                  {arMode.charAt(0).toUpperCase() + arMode.slice(1)} Mode
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl h-64 overflow-hidden">
                {/* Simulated Camera View */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
                  <div className="absolute top-4 left-4 right-4 flex justify-between text-white text-sm">
                    <span>Room 2501 - {arMode} mode</span>
                    <span>Live AR View</span>
                  </div>
                </div>
                
                {/* AR Overlays */}
                {arOverlays.map((overlay) => (
                  <div 
                    key={overlay.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{ 
                      left: `${overlay.position.x}%`, 
                      top: `${overlay.position.y}%` 
                    }}
                  >
                    <div className="bg-black/80 backdrop-blur-sm rounded-lg p-2 border border-cyan-500 shadow-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                        <span className="text-cyan-300 text-xs font-medium">{overlay.message}</span>
                      </div>
                    </div>
                    <div className="w-1 h-8 bg-cyan-400 mx-auto"></div>
                    <div className="w-4 h-4 bg-cyan-400 rounded-full mx-auto animate-pulse"></div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-slate-400">
                  <span>Tracking: Active</span>
                  <span>Overlays: {arOverlays.length}</span>
                  <span>GPS: Locked</span>
                </div>
                <Button 
                  onClick={() => handleArModeChange('off')}
                  variant="outline"
                  size="sm"
                  className="border-red-500 text-red-400 hover:bg-red-900/20"
                >
                  Stop AR
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  // Quick Assist Screen
  const renderQuickAssistScreen = () => {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white neom-heading">Quick Assist</h2>
            <p className="text-slate-400 neom-body">One-tap SOS for immediate help</p>
          </div>
          {assistRequest.requestTime && (
            <div className="text-right">
              <p className="text-sm text-slate-400">Last request:</p>
              <p className="text-white neom-mono">{assistRequest.requestTime.toLocaleTimeString()}</p>
            </div>
          )}
        </div>

        {/* Active Request Status */}
        {assistRequest.type && (
          <Card className="rounded-2xl bg-gradient-to-r from-orange-900/50 to-red-900/50 border-orange-500/30 neom-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                    {assistRequest.isRequesting ? (
                      <div className="w-6 h-6 border-2 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <CheckCircle className="w-6 h-6 text-emerald-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white neom-heading">
                      {assistRequest.type?.replace('-', ' ').toUpperCase()} Request
                    </h3>
                    <p className="text-slate-300">
                      {assistRequest.isRequesting 
                        ? 'Finding nearest available staff member...' 
                        : 'Help is on the way!'
                      }
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={cancelAssistRequest}
                  variant="outline"
                  size="sm"
                  className="border-red-500 text-red-400 hover:bg-red-900/20"
                >
                  Cancel
                </Button>
              </div>
              {!assistRequest.isRequesting && (
                <div className="mt-4 p-3 bg-emerald-900/20 border border-emerald-500/30 rounded-lg">
                  <p className="text-emerald-300 text-sm">
                    <strong>Ahmed Malik</strong> (Maintenance) is heading to your location. ETA: 3 minutes.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Quick Assist Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card 
            className="rounded-2xl cursor-pointer bg-slate-800 border-slate-700 neom-card neom-hover-lift"
            onClick={() => handleQuickAssist('technical')}
          >
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                <Wrench className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="font-semibold text-white neom-heading mb-2">Technical Support</h3>
              <p className="text-sm text-slate-400 neom-body mb-4">
                Equipment issues, system problems, or technical assistance
              </p>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={assistRequest.isRequesting}
              >
                <Wrench className="w-4 h-4 mr-2" />
                Request Tech Help
              </Button>
            </CardContent>
          </Card>

          <Card 
            className="rounded-2xl cursor-pointer bg-slate-800 border-slate-700 neom-card neom-hover-lift"
            onClick={() => handleQuickAssist('security')}
          >
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="font-semibold text-white neom-heading mb-2">Security Alert</h3>
              <p className="text-sm text-slate-400 neom-body mb-4">
                Safety concerns, suspicious activity, or emergency situations
              </p>
              <Button 
                className="w-full bg-red-600 hover:bg-red-700"
                disabled={assistRequest.isRequesting}
              >
                <Shield className="w-4 h-4 mr-2" />
                Alert Security
              </Button>
            </CardContent>
          </Card>

          <Card 
            className="rounded-2xl cursor-pointer bg-slate-800 border-slate-700 neom-card neom-hover-lift"
            onClick={() => handleQuickAssist('heavy-luggage')}
          >
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="font-semibold text-white neom-heading mb-2">Heavy Lifting</h3>
              <p className="text-sm text-slate-400 neom-body mb-4">
                Heavy luggage, furniture moving, or physical assistance needed
              </p>
              <Button 
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                disabled={assistRequest.isRequesting}
              >
                <Package className="w-4 h-4 mr-2" />
                Request Help
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Requests */}
        <Card className="rounded-2xl bg-slate-800 border-slate-700 neom-card">
          <CardHeader>
            <CardTitle className="text-white neom-heading">Recent Assist Requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { type: 'Technical', time: '14:30', helper: 'Omar Hassan', status: 'completed' },
              { type: 'Heavy Lifting', time: '12:15', helper: 'Sarah Ahmed', status: 'completed' },
              { type: 'Security', time: '09:45', helper: 'Security Team', status: 'completed' }
            ].map((request, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center">
                    {request.type === 'Technical' && <Wrench className="w-4 h-4 text-blue-400" />}
                    {request.type === 'Heavy Lifting' && <Package className="w-4 h-4 text-emerald-400" />}
                    {request.type === 'Security' && <Shield className="w-4 h-4 text-red-400" />}
                  </div>
                  <div>
                    <p className="text-white font-medium neom-heading">{request.type}</p>
                    <p className="text-sm text-slate-400">Helped by {request.helper}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-300 neom-mono">{request.time}</p>
                  <Badge className="bg-emerald-600">Completed</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  };

  // Filter tabs based on user role - remove AI Allocation for housekeeping, fnb, and maintenance
  const allTabs = [
    { id: 'tasks', name: 'Tasks', icon: ClipboardList },
    { id: 'checklists', name: 'SOPs', icon: BookOpen },
    { id: 'communications', name: 'Messages', icon: MessageSquare },
    { id: 'lost-found', name: 'Lost & Found', icon: Package },
    { id: 'staff-allocation', name: 'AI Allocation', icon: Users2 },
    { id: 'crisis-management', name: 'Crisis & Safety', icon: Shield },
    { id: 'schedule', name: 'Schedule', icon: Calendar },
    { id: 'ar-assist', name: 'AR Assist', icon: Glasses },
    { id: 'quick-assist', name: 'Quick Assist', icon: HelpCircle }
  ];

  // Remove AI Allocation for housekeeping, maintenance, and F&B departments
  const tabs = allTabs.filter(tab => {
    if (tab.id === 'staff-allocation') {
      return !['housekeeping', 'maintenance', 'fnb'].includes(userRole);
    }
    return true;
  });

  return (
    <div className="bg-slate-900 text-white min-h-screen">
      {/* Header */}
      <div className="bg-slate-800/80 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center">
                <span className="text-white font-semibold neom-heading">N</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white neom-heading">NEOM Staff Operations</h1>
                <p className="text-sm text-slate-400 neom-body">{userRole?.charAt(0).toUpperCase() + userRole?.slice(1)} Department</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge 
                variant="secondary" 
                className="text-white border-0"
                style={{ backgroundColor: getDepartmentColor(userRole) }}
              >
                {userRole?.charAt(0).toUpperCase() + userRole?.slice(1)} Mode
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-slate-700 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm neom-transition ${
                    activeTab === tab.id
                      ? 'text-white border-slate-400'
                      : 'text-slate-400 border-transparent hover:text-slate-200 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <IconComponent className="w-4 h-4" />
                    <span>{tab.name}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        {activeTab === 'tasks' && renderTaskDashboard()}
        {activeTab === 'details' && renderTaskDetails()}
        {activeTab === 'checklists' && renderChecklistsScreen()}
        {activeTab === 'communications' && renderCommunicationsScreen()}
        {activeTab === 'lost-found' && renderLostFoundScreen()}
        {activeTab === 'schedule' && renderScheduleScreen()}
        {activeTab === 'staff-allocation' && !['housekeeping', 'maintenance', 'fnb'].includes(userRole) && renderStaffAllocationScreen()}
        {activeTab === 'crisis-management' && renderCrisisManagementScreen()}
        {activeTab === 'ar-assist' && renderArAssistScreen()}
        {activeTab === 'quick-assist' && renderQuickAssistScreen()}
      </div>

      {/* Floating Voice-to-Task Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {voiceInput.isListening || voiceInput.isProcessing ? (
          <Card className="mb-4 bg-slate-800 border-slate-700 shadow-2xl max-w-sm">
            <CardContent className="p-4">
              {voiceInput.isListening && (
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <p className="text-white font-medium neom-heading">Listening...</p>
                    <p className="text-sm text-slate-400">Speak your task</p>
                  </div>
                  <Button 
                    onClick={handleVoiceStop}
                    size="sm"
                    variant="outline"
                    className="border-red-500 text-red-400"
                  >
                    Stop
                  </Button>
                </div>
              )}
              {voiceInput.isProcessing && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-white font-medium neom-heading">Processing...</span>
                  </div>
                  <div className="p-3 bg-slate-700 rounded-lg">
                    <p className="text-slate-300 italic">"{voiceInput.transcript}"</p>
                  </div>
                  <p className="text-sm text-slate-400">Converting to task...</p>
                </div>
              )}
            </CardContent>
          </Card>
        ) : null}
        
        <Button 
          onClick={handleVoiceStart}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-2xl neom-hover-lift"
          disabled={voiceInput.isListening || voiceInput.isProcessing}
        >
          {voiceInput.isListening ? (
            <MicOff className="w-6 h-6" />
          ) : (
            <Mic className="w-6 h-6" />
          )}
        </Button>
      </div>
    </div>
  );
}