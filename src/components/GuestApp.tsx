import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { EventsBooking } from './EventsBooking';
import { RateTipStaff } from './RateTipStaff';
import { InteractiveHotelMap } from './InteractiveHotelMap';
import { 
  Home, 
  MessageCircle, 
  Calendar, 
  Smartphone, 
  Camera, 
  CreditCard, 
  CheckCircle,
  Lightbulb,
  AirVent,
  Music,
  Bed,
  Utensils,
  UtensilsCrossed,
  Coffee,
  Wine,
  Package,
  Fan,
  Settings,
  Sparkles,
  Dumbbell,
  Waves,
  ConciergeBell,
  Car,
  ShoppingBag,
  Bot,
  ArrowRight,
  QrCode,
  Receipt,
  Bell,
  Globe,
  Shield,
  HelpCircle,
  Users,
  UserCog,
  MessageSquare,
  User,
  Heart,
  UserPlus,
  Plus,
  Minus,
  Clock,
  Video,
  Eye,
  Phone,
  Send,
  Mic,
  MicOff,
  Mail,
  Scan,
  Hand,
  Play,
  Pause,
  RotateCcw,
  Sun,
  Volume2,
  Thermometer,
  Leaf,
  Lock,
  Unlock,
  Fingerprint,
  Circle,
  ChefHat,
  Wheat,
  Apple,
  Users2,
  UserCheck,
  UserX,
  VolumeOff,
  PawPrint,
  CheckCircle2,
  X,
  Sunrise,
  AlarmClock,
  Search,
  MapPin,
  Building,
  Briefcase,
  Plane,
  PhoneCall,
  Map,
  AlertTriangle,
  GlassWater,
  Trees,
  Star,
  Award,
  DollarSign,
  ThumbsUp,
  Gift,
  Crown,
  ShieldCheck,
  AlertCircle,
  Radio,
  FileText,
  Zap,
  CloudRain,
  Languages,
  Flag,
  PartyPopper,
  Wallet,
  Info,
  Headphones,
  MousePointer,
  ChevronDown,
  Download
} from 'lucide-react';
import { DigitalWallet } from './DigitalWallet';
import { VRTour } from './VRTour';
import { CheckoutFlow } from './CheckoutFlow';

type TabType = 'home' | 'services' | 'tracking' | 'profile' | 'digital-key';
type ScreenType = 'tabs' | 'digital-key' | 'ai-concierge' | 'checkout' | 'checkout-flow' | 'preferences' | 'notifications' | 'language-region' | 'privacy-security' | 'help-support' | 'guest-community' | 'virtual-tour' | 'account-settings' | 'biometric-checkin' | 'checkin-payment' | 'checkin-complete' | 'hotel-directory' | 'events-booking' | 'digital-wallet' | 'rate-tip-staff' | 'room-booking' | 'room-details' | 'booking-confirmation' | 'ar-vr-preview' | 'vr-room-preview' | 'feedback' | 'membership-rewards' | 'stay-history' | 'digital-twin' | 'wellness-dashboard' | 'checkin-preferences';

interface GuestAppProps {
  guestInfo?: {
    id: string;
    name: string;
    email: string;
    room?: string;
    checkIn?: string;
    checkOut?: string;
    preferences?: any;
    [key: string]: any;
  };
  onLogout?: () => void;
}

export function GuestApp({ guestInfo, onLogout }: GuestAppProps = {}) {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('tabs');
  const [expandedService, setExpandedService] = useState<string | null>(null);
  
  // Core app state
  const [ecoMode, setEcoMode] = useState(false);
  const [lights, setLights] = useState(false);
  const [ac, setAc] = useState(false);
  const [blinds, setBlinds] = useState(false);
  
  // Enhanced room controls state
  const [roomTemp, setRoomTemp] = useState([22]);
  const [lightBrightness, setLightBrightness] = useState([80]);
  const [musicVolume, setMusicVolume] = useState([45]);
  const [musicPlaying, setMusicPlaying] = useState(false);
  
  // Check-in flow state
  const [checkinStep, setCheckinStep] = useState(0);
  const [biometricType, setBiometricType] = useState<'face' | 'palm' | null>(null);
  const [isCheckedIn, setIsCheckedIn] = useState(false); // Always show check-in initially
  const [biometricScanning, setBiometricScanning] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  
  // Additional state for new screens
  const [digitalKeyActive, setDigitalKeyActive] = useState(false);
  
  // Access control state - determines if user has unlocked full app access
  const [hasDigitalKey, setHasDigitalKey] = useState(false);
  const [showAccessTooltip, setShowAccessTooltip] = useState(false);
  
  // QR Code / Booking ID check-in state
  const [showQROptions, setShowQROptions] = useState(false);
  const [bookingIdInput, setBookingIdInput] = useState('');
  const [isProcessingBookingId, setIsProcessingBookingId] = useState(false);
  const [isQRScanning, setIsQRScanning] = useState(false);
  
  // Hotel Directory state
  const [directorySearch, setDirectorySearch] = useState('');
  const [activeDirectoryCategory, setActiveDirectoryCategory] = useState<string | null>(null);
  const [showHotelMap, setShowHotelMap] = useState(false);
  const [favoriteServices, setFavoriteServices] = useState<string[]>(['Room Service', 'Front Desk', 'Spa & Wellness Center']);
  
  // Interactive Hotel Map state
  const [showInteractiveMap, setShowInteractiveMap] = useState(false);
  
  // Rate & Tip Staff state (simplified - most state now managed in component)
  const [favoriteStaff, setFavoriteStaff] = useState<string[]>(['Omar Hassan']);
  
  // Digital Wallet state
  const [walletBalance, setWalletBalance] = useState(2847.50);
  
  // Profile Section - Account Settings Expansion State
  const [accountSettingsExpanded, setAccountSettingsExpanded] = useState(false);
  
  // Room Booking state
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [bookingDates, setBookingDates] = useState({
    checkIn: '',
    checkOut: ''
  });
  const [bookingGuests, setBookingGuests] = useState({
    adults: 2,
    children: 0
  });
  const [roomFilters, setRoomFilters] = useState({
    priceRange: [0, 5000],
    roomType: 'all',
    amenities: [],
    quietZone: false,
    petFriendly: false,
    oceanView: false,
    balcony: false
  });
  const [showArVr, setShowArVr] = useState(false);
  const [arVrMode, setArVrMode] = useState<'ar' | 'vr' | null>(null);
  const [bookingStep, setBookingStep] = useState(0);
  
  // Help & Safety state
  const [showEvacuationMap, setShowEvacuationMap] = useState(false);
  const [selectedSafetyResource, setSelectedSafetyResource] = useState<string | null>(null);
  const [guestFloor] = useState(12); // Current guest floor - would be dynamic in real app
  const [isMultilingual, setIsMultilingual] = useState(false);
  
  // Community state
  const [joinedActivities, setJoinedActivities] = useState<string[]>(['activity_001', 'activity_003']);
  const [rsvpedEvents, setRsvpedEvents] = useState<string[]>(['event_001']);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: '',
    location: '',
    date: '',
    time: '',
    maxParticipants: '',
    description: ''
  });

  // Enhanced Notifications state
  const [notificationChannels, setNotificationChannels] = useState({
    whatsapp: true,
    email: true,
    sms: false,
    push: true
  });
  const [notificationCategories, setNotificationCategories] = useState({
    events: true,
    upsells: true,
    checkout: true,
    services: true,
    emergency: true
  });

  // Enhanced Tracking state
  const [elevatorArrival, setElevatorArrival] = useState(90); // seconds
  const [trackingFilters, setTrackingFilters] = useState({
    orders: true,
    appointments: true,
    services: true,
    transport: true
  });
  const [notifyWhenElevator, setNotifyWhenElevator] = useState(true);

  // Stay History state
  const [selectedStayForPreferences, setSelectedStayForPreferences] = useState<any>(null);
  const [selectedStayForReceipt, setSelectedStayForReceipt] = useState<any>(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  // Wellness Dashboard state
  const [wellnessData, setWellnessData] = useState({
    overallScore: 87,
    heartRate: 72,
    sleepHours: 8.2,
    steps: 8743,
    stepGoal: 10000,
    isAppleWatchConnected: true,
    lastSyncTime: new Date()
  });

  // Feedback state
  const [feedbackData, setFeedbackData] = useState({
    facilities: { rating: 0, comment: '' },
    roomService: { rating: 0, comment: '' },
    staff: { rating: 0, comment: '' },
    dining: { rating: 0, comment: '' },
    cleanliness: { rating: 0, comment: '' }
  });
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // AI Crisis Copilot state
  const [crisisMessages, setCrisisMessages] = useState([
    {
      id: 1,
      type: 'ai',
      message: "Hello! I'm your AI Crisis Copilot. I'm here to help with any emergency or safety concerns. You can type or speak your question.",
      timestamp: new Date()
    }
  ]);
  const [crisisInput, setCrisisInput] = useState('');
  const [isProcessingVoice, setIsProcessingVoice] = useState(false);

  // Membership & Rewards state
  const [membershipData, setMembershipData] = useState({
    currentTier: 'Platinum Elite',
    currentPoints: 24750,
    nextTier: 'Diamond',
    pointsForNextTier: 30000,
    pointsNeeded: 5250,
    progressPercentage: 82.5,
    tierBenefits: [
      "Complimentary room upgrades",
      "Priority spa bookings", 
      "Late checkout until 3PM",
      "Premium WiFi access",
      "Personal concierge service"
    ],
    availableRewards: [
      { id: 1, name: "Spa Voucher", points: 5000, category: "wellness", icon: "Sparkles" },
      { id: 2, name: "Suite Upgrade", points: 8000, category: "room", icon: "Bed" },
      { id: 3, name: "Dining Credit", points: 3500, category: "food", icon: "UtensilsCrossed" },
      { id: 4, name: "Free Night", points: 12000, category: "stay", icon: "Plane" },
      { id: 5, name: "Airport Transfer", points: 2500, category: "transport", icon: "Car" },
      { id: 6, name: "Butler Service", points: 15000, category: "service", icon: "ConciergeBell" }
    ],
    redeemHistory: [
      { id: 1, item: "Spa Voucher", points: 5000, date: "2024-09-20", status: "Redeemed" },
      { id: 2, item: "Dining Credit", points: 3500, date: "2024-08-15", status: "Used" },
      { id: 3, item: "Room Upgrade", points: 8000, date: "2024-07-30", status: "Used" }
    ],
    earnHistory: [
      { id: 1, activity: "Stay at NEOM Bay Resort", points: 4500, date: "2024-09-26" },
      { id: 2, activity: "Spa Services", points: 850, date: "2024-09-27" },
      { id: 3, activity: "Dining at Rooftop Restaurant", points: 320, date: "2024-09-28" },
      { id: 4, activity: "Referral Bonus", points: 2000, date: "2024-08-10" }
    ]
  });

  // Membership & Rewards screen state
  const [activeSection, setActiveSection] = useState<'overview' | 'rewards' | 'history'>('overview');
  const [selectedReward, setSelectedReward] = useState<any>(null);
  const [isRedeeming, setIsRedeeming] = useState(false);
  
  // Check-In Preferences Screen state
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [aiChatInput, setAiChatInput] = useState('');
  const [aiPreferenceMessages, setAiPreferenceMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      message: "Hi! I'm here to help you set up your stay preferences. What's most important to you during your stay?",
      timestamp: new Date()
    }
  ]);
  const [stayPreferences, setStayPreferences] = useState({
    roomType: 'double', // 'single', 'double', 'suite'
    bedType: 'king', // 'king', 'queen', 'twin'
    floorPreference: 'middle', // 'low', 'middle', 'high'
    viewPreference: [] as string[], // 'pool', 'garden', 'city', 'sea'
    amenities: [] as string[], // 'mini-bar', 'workspace', 'baby-crib', 'extra-towels', 'iron'
    diningPreferences: [] as string[], // 'veg', 'non-veg', 'vegan', 'gluten-free'
    temperaturePreference: 'moderate', // 'cooler', 'moderate', 'warmer'
    pillowType: 'medium', // 'soft', 'medium', 'firm'
    housekeepingFrequency: 'daily', // 'daily', 'on-request', 'no-service'
    quietRoom: false // quiet room zone preference
  });
  
  // Enhanced Notifications Data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      category: 'events',
      title: 'Gala Dinner Tonight',
      message: 'Your RSVP is confirmed for tonight at 7:00 PM in Wellness Hall',
      timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      type: 'event',
      icon: Calendar,
      priority: 'high',
      actions: ['View Details', 'Directions'],
      channels: ['push', 'email']
    },
    {
      id: 2,
      category: 'upsells',
      title: 'AI Spa Recommendation',
      message: 'Based on your preferences, enjoy 25% off aromatherapy massage today',
      timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
      type: 'upsell',
      icon: Sparkles,
      priority: 'medium',
      actions: ['Book Now', 'Learn More'],
      channels: ['push'],
      aiGenerated: true,
      discount: '25%'
    },
    {
      id: 3,
      category: 'checkout',
      title: 'Check-out Tomorrow',
      message: 'Check-out is at 11:00 AM. Late check-out available until 3:00 PM (+$50)',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      type: 'checkout',
      icon: Clock,
      priority: 'high',
      actions: ['Extend Stay', 'View Bill'],
      channels: ['push', 'email', 'sms']
    },
    {
      id: 4,
      category: 'services',
      title: 'Room Service Delivered',
      message: 'Your Caesar Salad and Grilled Salmon have been delivered to your room',
      timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      type: 'service',
      icon: CheckCircle,
      priority: 'medium',
      actions: ['Rate Experience'],
      channels: ['push']
    },
    {
      id: 5,
      category: 'upsells',
      title: 'Transport Suggestion',
      message: 'AI suggests pre-booking airport transfer for tomorrow. Save 15% with advance booking',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      type: 'upsell',
      icon: Car,
      priority: 'low',
      actions: ['Book Transfer', 'Dismiss'],
      channels: ['push'],
      aiGenerated: true,
      discount: '15%'
    },
    {
      id: 6,
      category: 'events',
      title: 'Photography Walk Tomorrow',
      message: 'Reminder: You\'re registered for the NEOM Marina photography walk at 10:00 AM',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      type: 'event',
      icon: Camera,
      priority: 'medium',
      actions: ['View Details', 'Cancel'],
      channels: ['push', 'email']
    }
  ]);

  // Wellness functions
  const updateWellnessData = () => {
    // Simulate real-time wellness data updates
    setWellnessData(prev => ({
      ...prev,
      heartRate: Math.floor(Math.random() * 20) + 65, // 65-85 range
      lastSyncTime: new Date()
    }));
  };

  // Update wellness data every 30 seconds
  useEffect(() => {
    const interval = setInterval(updateWellnessData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Enhanced Tracking Data
  const [trackingItems, setTrackingItems] = useState([
    {
      id: 'order_001',
      type: 'food',
      title: 'Room Service Order',
      description: 'Caesar Salad, Grilled Salmon',
      status: 'delivered',
      statusText: 'Delivered',
      progress: 100,
      estimatedTime: null,
      lastUpdate: new Date(Date.now() - 10 * 60 * 1000),
      icon: Utensils,
      color: 'emerald',
      actions: ['Rate Order', 'Reorder'],
      timeline: [
        { status: 'Order Placed', time: new Date(Date.now() - 45 * 60 * 1000), completed: true },
        { status: 'Kitchen Preparing', time: new Date(Date.now() - 30 * 60 * 1000), completed: true },
        { status: 'Out for Delivery', time: new Date(Date.now() - 15 * 60 * 1000), completed: true },
        { status: 'Delivered', time: new Date(Date.now() - 10 * 60 * 1000), completed: true }
      ]
    },
    {
      id: 'appointment_001',
      type: 'spa',
      title: 'Spa Appointment',
      description: 'Deep Tissue Massage with Sarah',
      status: 'upcoming',
      statusText: 'Upcoming',
      progress: 25,
      estimatedTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
      lastUpdate: new Date(),
      icon: Sparkles,
      color: 'purple',
      actions: ['View Details', 'Reschedule', 'Cancel'],
      timeline: [
        { status: 'Booked', time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), completed: true },
        { status: 'Confirmed', time: new Date(Date.now() - 24 * 60 * 60 * 1000), completed: true },
        { status: 'Reminder Sent', time: new Date(), completed: true },
        { status: 'Treatment Begins', time: new Date(Date.now() + 2 * 60 * 60 * 1000), completed: false }
      ]
    },
    {
      id: 'luggage_001',
      type: 'luggage',
      title: 'Luggage Service',
      description: '2 bags from airport',
      status: 'in_transit',
      statusText: 'In Transit',
      progress: 75,
      estimatedTime: new Date(Date.now() + 15 * 60 * 1000),
      lastUpdate: new Date(Date.now() - 5 * 60 * 1000),
      icon: Package,
      color: 'cyan',
      actions: ['Track Location', 'Call Porter'],
      timeline: [
        { status: 'Collected from Airport', time: new Date(Date.now() - 45 * 60 * 1000), completed: true },
        { status: 'In Transit to Hotel', time: new Date(Date.now() - 20 * 60 * 1000), completed: true },
        { status: 'Arrived at Hotel', time: new Date(Date.now() - 5 * 60 * 1000), completed: true },
        { status: 'Delivered to Room', time: new Date(Date.now() + 15 * 60 * 1000), completed: false }
      ]
    },
    {
      id: 'transport_001',
      type: 'transport',
      title: 'Airport Transfer',
      description: 'Tomorrow 9:00 AM pickup',
      status: 'confirmed',
      statusText: 'Confirmed',
      progress: 20,
      estimatedTime: new Date(Date.now() + 21 * 60 * 60 * 1000),
      lastUpdate: new Date(Date.now() - 60 * 60 * 1000),
      icon: Car,
      color: 'orange',
      actions: ['View Details', 'Modify Booking', 'Cancel'],
      timeline: [
        { status: 'Booking Confirmed', time: new Date(Date.now() - 60 * 60 * 1000), completed: true },
        { status: 'Driver Assigned', time: new Date(Date.now() + 20 * 60 * 60 * 1000), completed: false },
        { status: 'Vehicle Dispatched', time: new Date(Date.now() + 20.75 * 60 * 60 * 1000), completed: false },
        { status: 'Arrived at Hotel', time: new Date(Date.now() + 21 * 60 * 60 * 1000), completed: false }
      ]
    }
  ]);
  const [aiChatMessages, setAiChatMessages] = useState([
    { id: 1, sender: 'ai', message: "Hello! I'm ARIA, your AI concierge. How can I assist you today?", timestamp: new Date().toISOString() }
  ]);
  const [aiInputMessage, setAiInputMessage] = useState('');
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [expandedRoomService, setExpandedRoomService] = useState(false);
  const [activeServiceAI, setActiveServiceAI] = useState<string | null>(null);
  const [serviceAIChatMessages, setServiceAIChatMessages] = useState<{[key: string]: any[]}>({});
  const [arvrPreview, setArvrPreview] = useState<{active: boolean, type: string, service: string}>({
    active: false,
    type: '',
    service: ''
  });
  const [checkoutData, setCheckoutData] = useState({
    roomCharges: 450.00,
    foodAndBeverage: 127.50,
    spa: 85.00,
    incidentals: 23.45,
    tax: 69.60,
    total: 755.55
  });
  const [guestPreferences, setGuestPreferences] = useState({
    roomTemperature: 22,
    wakeUpTime: '07:00',
    pillowType: 'firm',
    minibarPrefs: ['sparkling-water', 'green-tea'],
    musicGenre: 'ambient',
    lightingMode: 'warm',
    housekeepingTime: 'morning',
    language: 'en',
    currency: 'USD',
    notifications: true,
    doNotDisturb: false,
    // Enhanced preferences
    dietaryPreference: 'vegetarian', // 'vegan', 'vegetarian', 'non-vegetarian'
    allergies: [], // Array of allergies: 'peanut', 'gluten', 'lactose', 'shellfish', 'nuts'
    generalDietaryRestrictions: '',
    pillowPreferences: ['firm'], // Array: 'soft', 'firm', 'hard'
    staffPreference: 'no-preference', // 'male', 'female', 'no-preference'
    silentMode: false,
    musicStyle: 'classical', // 'classical', 'jazz', 'lofi', 'nature'
    wakeUpStyle: 'gentle-alarm', // 'gentle-alarm', 'natural-light', 'music'
    travelingWithPets: false,
    petDetails: '',
    quietRoom: false,
    roomType: 'deluxe', // 'standard', 'deluxe', 'suite', 'presidential'
    // Food Preferences
    foodPreferences: [], // Array: 'Chinese', 'Mexican', 'Spanish', 'Italian', 'Other'
    otherFoodPreference: '' // Free text for 'Other' option
  });
  const [communityPosts, setCommunityPosts] = useState([
    { id: 1, user: 'Sarah M.', content: 'The sunset yoga session was amazing! Highly recommend.', likes: 12, time: '2h ago' },
    { id: 2, user: 'John D.', content: 'Anyone up for tennis tomorrow morning?', likes: 5, time: '4h ago' },
    { id: 3, user: 'Maria L.', content: 'The rooftop restaurant has the best view in the city!', likes: 18, time: '6h ago' }
  ]);
  const [virtualTours, setVirtualTours] = useState([
    { id: 1, name: 'Spa & Wellness Center', duration: '5 min', image: '/api/placeholder/300/200' },
    { id: 2, name: 'Rooftop Infinity Pool', duration: '3 min', image: '/api/placeholder/300/200' },
    { id: 3, name: 'Fine Dining Restaurant', duration: '7 min', image: '/api/placeholder/300/200' },
    { id: 4, name: 'Executive Lounge', duration: '4 min', image: '/api/placeholder/300/200' }
  ]);

  // Community Activities Data
  const communityActivities = [
    {
      id: 'activity_001',
      name: 'Morning Beach Volleyball',
      location: 'Beach Court',
      date: 'Tomorrow',
      time: '8:00 AM',
      participants: 8,
      maxParticipants: 12,
      description: 'Start your day with an energizing volleyball match on our private beach court',
      category: 'Sports',
      icon: '🏐',
      organizer: 'Recreation Team'
    },
    {
      id: 'activity_002',
      name: 'Coffee & Networking',
      location: 'Arena Café',
      date: 'Today',
      time: '4:00 PM',
      participants: 15,
      maxParticipants: 20,
      description: 'Meet fellow guests over premium coffee and light refreshments',
      category: 'Social',
      icon: '☕',
      organizer: 'Guest Services'
    },
    {
      id: 'activity_003',
      name: 'Sunset Yoga Session',
      location: 'Rooftop Terrace',
      date: 'Today',
      time: '6:30 PM',
      participants: 6,
      maxParticipants: 10,
      description: 'Relax and unwind with guided yoga as the sun sets over NEOM',
      category: 'Wellness',
      icon: '🧘',
      organizer: 'Wellness Team'
    },
    {
      id: 'activity_004',
      name: 'Wine Tasting Experience',
      location: 'Executive Lounge',
      date: 'Tonight',
      time: '8:00 PM',
      participants: 12,
      maxParticipants: 16,
      description: 'Discover premium wines from around the world with our sommelier',
      category: 'Culinary',
      icon: '🍷',
      organizer: 'F&B Team'
    },
    {
      id: 'activity_005',
      name: 'Photography Walk',
      location: 'NEOM Marina',
      date: 'Tomorrow',
      time: '10:00 AM',
      participants: 5,
      maxParticipants: 8,
      description: 'Capture the beauty of NEOM with professional photography tips',
      category: 'Creative',
      icon: '📸',
      organizer: 'Concierge Team'
    }
  ];

  // Community Events Data
  const communityEvents = [
    {
      id: 'event_001',
      name: 'Gala Dinner Experience',
      venue: 'Wellness Retreat Hall',
      date: 'December 28, 2024',
      time: '7:00 PM',
      description: 'An elegant evening of fine dining, live music, and cultural performances celebrating NEOM\'s vision',
      dresscode: 'Formal Attire',
      price: 'Complimentary for Platinum Members',
      capacity: 150,
      rsvped: 87,
      category: 'Entertainment',
      image: '/events/gala-dinner.jpg',
      organizer: 'Hotel Management'
    },
    {
      id: 'event_002',
      name: 'Tech Innovation Symposium',
      venue: 'Convention Center',
      date: 'December 29, 2024', 
      time: '2:00 PM',
      description: 'Join industry leaders discussing the future of sustainable technology and smart city innovations',
      dresscode: 'Business Casual',
      price: 'Open to all guests',
      capacity: 200,
      rsvped: 143,
      category: 'Business',
      image: '/events/tech-symposium.jpg',
      organizer: 'NEOM Innovation Hub'
    },
    {
      id: 'event_003',
      name: 'Cultural Heritage Night',
      venue: 'Rooftop Amphitheater',
      date: 'December 30, 2024',
      time: '8:30 PM',
      description: 'Experience traditional music, dance, and storytelling under the stars',
      dresscode: 'Traditional or Smart Casual',
      price: 'Complimentary',
      capacity: 120,
      rsvped: 68,
      category: 'Cultural',
      image: '/events/cultural-night.jpg',
      organizer: 'Cultural Affairs'
    }
  ];

  const serviceCategories = [
    {
      id: 'dining',
      emoji: '🍴',
      title: 'Dining & Room Service',
      color: 'orange',
      services: [
        { icon: Utensils, name: 'Room Service', description: '24/7 in-room dining' },
        { icon: UtensilsCrossed, name: 'Restaurant Booking', description: 'Reserve tables at our venues' },
        { icon: Wine, name: 'Bar & Lounge', description: 'Cocktails and premium drinks' },
        { icon: Coffee, name: 'Café & Pastries', description: 'Fresh coffee and light bites' }
      ]
    },
    {
      id: 'housekeeping',
      emoji: '🧹',
      title: 'Housekeeping & Maintenance',
      color: 'cyan',
      services: [
        { icon: Settings, name: 'Room Cleaning', description: 'Daily housekeeping service' },
        { icon: Package, name: 'Laundry Service', description: 'Wash, dry, and press' },
        { icon: Bed, name: 'Fresh Linens', description: 'Extra towels and bedding' },
        { icon: Fan, name: 'Room Maintenance', description: 'Repairs and adjustments' }
      ]
    },
    {
      id: 'wellness',
      emoji: '🧘',
      title: 'Wellness & Recreation',
      color: 'emerald',
      services: [
        { icon: Sparkles, name: 'Spa Treatments', description: 'Massage and skincare' },
        { icon: Dumbbell, name: 'Fitness Center', description: '24/7 gym access' },
        { icon: Waves, name: 'Pool & Beach', description: 'Swimming and water sports' },
        { icon: MessageCircle, name: 'Meditation Classes', description: 'Mindfulness sessions' }
      ]
    },
    {
      id: 'concierge',
      emoji: '🎯',
      title: 'Concierge & Travel',
      color: 'purple',
      services: [
        { icon: ConciergeBell, name: 'Local Recommendations', description: 'Best spots to visit' },
        { icon: Car, name: 'Transportation', description: 'Taxi and airport transfers' },
        { icon: Calendar, name: 'Event Booking', description: 'Tours and activities' },
        { icon: ShoppingBag, name: 'Shopping Service', description: 'Personal shopping assistance' }
      ]
    }
  ];

  // Hotel Directory Data
  const hotelDirectoryData = {
    dining: {
      title: "Dining",
      icon: UtensilsCrossed,
      color: "orange",
      items: [
        {
          name: "Hotel Marina Restaurant",
          hours: "06:00 – 23:00",
          location: "Ground Floor",
          contact: "+1-555-0200",
          description: "Fine dining with ocean views",
          type: "restaurant"
        },
        {
          name: "Rooftop Lounge",
          hours: "17:00 – 02:00",
          location: "25th Floor",
          contact: "+1-555-0201",
          description: "Cocktails with panoramic city views",
          type: "lounge"
        },
        {
          name: "Pool Bar",
          hours: "10:00 – 20:00",
          location: "Pool Deck - 5th Floor",
          contact: "+1-555-0202",
          description: "Refreshing drinks by the infinity pool",
          type: "bar"
        },
        {
          name: "Room Service",
          hours: "24/7",
          location: "Available to your room",
          contact: "+1-555-0203",
          description: "24-hour in-room dining service",
          type: "service"
        }
      ]
    },
    wellness: {
      title: "Wellness & Recreation",
      icon: Sparkles,
      color: "emerald",
      items: [
        {
          name: "Spa & Wellness Center",
          hours: "08:00 – 22:00",
          location: "2nd Floor",
          contact: "+1-555-0300",
          description: "Full-service spa with massage and treatments",
          type: "spa"
        },
        {
          name: "Fitness Center",
          hours: "24/7",
          location: "3rd Floor",
          contact: "+1-555-0301",
          description: "State-of-the-art gym equipment",
          type: "fitness"
        },
        {
          name: "Infinity Pool",
          hours: "06:00 – 23:00",
          location: "5th Floor Pool Deck",
          contact: "+1-555-0302",
          description: "Heated infinity pool with city views",
          type: "pool"
        },
        {
          name: "Tennis Court",
          hours: "07:00 – 21:00",
          location: "Rooftop - 26th Floor",
          contact: "+1-555-0303",
          description: "Professional tennis court with equipment rental",
          type: "sports"
        }
      ]
    },
    business: {
      title: "Business & Services",
      icon: Briefcase,
      color: "purple",
      items: [
        {
          name: "Business Center",
          hours: "24/7",
          location: "Lobby Level",
          contact: "+1-555-0400",
          description: "Computers, printing, and office services",
          type: "business"
        },
        {
          name: "Conference Rooms",
          hours: "08:00 – 20:00",
          location: "4th Floor",
          contact: "+1-555-0401",
          description: "Meeting rooms with AV equipment",
          type: "meeting"
        },
        {
          name: "Concierge Services",
          hours: "24/7",
          location: "Lobby",
          contact: "+1-555-0402",
          description: "Local recommendations and bookings",
          type: "concierge"
        }
      ]
    },
    transportation: {
      title: "Transportation",
      icon: Car,
      color: "cyan",
      items: [
        {
          name: "Airport Shuttle",
          hours: "05:00 – 23:00",
          location: "Hotel Main Entrance",
          contact: "+1-555-0500",
          description: "Complimentary shuttle service every 30 minutes",
          type: "shuttle"
        },
        {
          name: "City Transfer Service",
          hours: "24/7",
          location: "Hotel Main Entrance",
          contact: "+1-555-0501",
          description: "Private car service to city destinations",
          type: "transfer"
        }
      ]
    }
  };

  // Staff Data for Rating & Tipping
  const staffMembers = [
    {
      id: 'staff_001',
      name: 'Ahmed Malik',
      role: 'Housekeeping Supervisor',
      department: 'Housekeeping',
      profileImage: '/staff/ahmed.jpg', // Optional
      yearsOfService: 5,
      averageRating: 4.8,
      reviewCount: 142,
      recentFeedback: [
        'Very thorough and professional cleaning',
        'Always greets with a smile',
        'Room was spotless, exceeded expectations'
      ],
      ratingDistribution: {
        5: 85,
        4: 12,
        3: 2,
        2: 1,
        1: 0
      },
      servicesProvided: ['Room Cleaning', 'Turndown Service', 'Laundry'],
      lastService: '2024-01-15'
    },
    {
      id: 'staff_002',
      name: 'Danis Al Rashid',
      role: 'F&B Coordinator',
      department: 'Food & Beverage',
      profileImage: '/staff/danis.jpg',
      yearsOfService: 3,
      averageRating: 4.7,
      reviewCount: 98,
      recentFeedback: [
        'Excellent knowledge of menu and wine pairings',
        'Very attentive to dietary requirements',
        'Made our dining experience memorable'
      ],
      ratingDistribution: {
        5: 75,
        4: 20,
        3: 4,
        2: 1,
        1: 0
      },
      servicesProvided: ['Restaurant Service', 'Room Service', 'Event Catering'],
      lastService: '2024-01-14'
    },
    {
      id: 'staff_003',
      name: 'Omar Hassan',
      role: 'Concierge',
      department: 'Guest Services',
      profileImage: '/staff/omar.jpg',
      yearsOfService: 7,
      averageRating: 4.9,
      reviewCount: 203,
      recentFeedback: [
        'Went above and beyond to help with reservations',
        'Incredible local knowledge and recommendations',
        'Made our trip planning effortless'
      ],
      ratingDistribution: {
        5: 92,
        4: 6,
        3: 1,
        2: 1,
        1: 0
      },
      servicesProvided: ['Travel Planning', 'Reservations', 'Local Recommendations'],
      lastService: '2024-01-16'
    },
    {
      id: 'staff_004',
      name: 'Sarah Mitchell',
      role: 'Spa Therapist',
      department: 'Wellness',
      profileImage: '/staff/sarah.jpg',
      yearsOfService: 4,
      averageRating: 4.8,
      reviewCount: 167,
      recentFeedback: [
        'Amazing massage technique, felt completely relaxed',
        'Professional and knowledgeable about treatments',
        'Created a perfect spa atmosphere'
      ],
      ratingDistribution: {
        5: 88,
        4: 10,
        3: 1,
        2: 1,
        1: 0
      },
      servicesProvided: ['Massage Therapy', 'Facial Treatments', 'Wellness Consultation'],
      lastService: '2024-01-13'
    },
    {
      id: 'staff_005',
      name: 'Carlos Rodriguez',
      role: 'Maintenance Engineer',
      department: 'Engineering',
      profileImage: '/staff/carlos.jpg',
      yearsOfService: 6,
      averageRating: 4.6,
      reviewCount: 89,
      recentFeedback: [
        'Fixed the AC issue quickly and efficiently',
        'Very polite and explained the problem clearly',
        'Minimal disruption during repairs'
      ],
      ratingDistribution: {
        5: 70,
        4: 25,
        3: 4,
        2: 1,
        1: 0
      },
      servicesProvided: ['Room Maintenance', 'Technical Support', 'Emergency Repairs'],
      lastService: '2024-01-12'
    }
  ];

  // Safety & Emergency Data
  const safetyStatus = {
    overall: 'safe', // 'safe', 'caution', 'alert'
    systems: {
      fire: { status: 'ok', label: 'Fire Safety', icon: Shield },
      security: { status: 'normal', label: 'Security', icon: ShieldCheck },
      weather: { status: 'clear', label: 'Weather', icon: CloudRain },
      medical: { status: 'standby', label: 'Medical', icon: Heart }
    }
  };



  const safetyResources = [
    {
      id: 'emergency-procedures',
      title: 'Emergency Procedures',
      icon: AlertCircle,
      color: 'red',
      description: 'Step-by-step evacuation instructions',
      content: [
        'Stay calm and follow staff instructions',
        'Use stairs, never elevators during emergencies',
        'Proceed to nearest marked exit',
        'Gather at designated assembly point',
        'Wait for further instructions from emergency personnel'
      ]
    },
    {
      id: 'first-aid',
      title: 'First Aid Guide',
      icon: Heart,
      color: 'emerald',
      description: 'Quick reference for common situations',
      content: [
        'For minor cuts: Clean wound and apply bandage',
        'For burns: Cool with running water for 10 minutes',
        'For choking: Perform Heimlich maneuver',
        'For chest pain: Call emergency services immediately',
        'For allergic reactions: Use EpiPen if available, call 911'
      ]
    },
    {
      id: 'weather-alerts',
      title: 'Weather Alerts',
      icon: CloudRain,
      color: 'cyan',
      description: 'Real-time safety and weather updates',
      content: [
        'Current weather: Clear skies, 24°C',
        'Wind speed: 12 km/h from northwest',
        'No severe weather warnings in effect',
        'UV index: Moderate (5/10)',
        'Next update: 2 hours'
      ]
    },
    {
      id: 'safety-checklist',
      title: 'Safety Checklist',
      icon: FileText,
      color: 'purple',
      description: 'Safety measures for guests to follow',
      content: [
        '✓ Locate nearest emergency exits',
        '✓ Familiarize yourself with evacuation routes',
        '✓ Keep emergency contact numbers handy',
        '✓ Report any safety hazards to staff',
        '✓ Follow all posted safety guidelines'
      ]
    }
  ];

  // Room types data for booking
  const roomTypes = [
    {
      id: 'deluxe',
      name: 'Deluxe Room',
      price: 299,
      originalPrice: 399,
      size: '42 m²',
      maxGuests: 2,
      bedType: 'King Bed',
      description: 'Elegant room with modern amenities and city views',
      images: [
        'https://images.unsplash.com/photo-1758448755969-8791367cf5c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb20lMjBkZWx1eGUlMjBtb2Rlcm58ZW58MXx8fHwxNzU4ODg4NTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      ],
      amenities: ['Free WiFi', 'Minibar', 'Smart TV', 'Coffee Machine', 'Safe', 'Air Conditioning'],
      features: ['City View', 'Marble Bathroom', 'Blackout Curtains'],
      available: true,
      rating: 4.8,
      reviews: 234
    },
    {
      id: 'suite',
      name: 'Executive Suite',
      price: 549,
      originalPrice: 699,
      size: '75 m²',
      maxGuests: 4,
      bedType: 'King Bed + Sofa Bed',
      description: 'Spacious suite with separate living area and premium amenities',
      images: [
        'https://images.unsplash.com/photo-1632385396727-4e377de9836e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHN1aXRlJTIwZXhlY3V0aXZlJTIwbHV4dXJ5fGVufDF8fHx8MTc1ODg4ODU1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      ],
      amenities: ['Free WiFi', 'Premium Minibar', 'Smart TV', 'Nespresso Machine', 'Safe', 'Climate Control', 'Bathrobe & Slippers'],
      features: ['Ocean View', 'Private Balcony', 'Separate Living Area', 'Walk-in Shower'],
      available: true,
      rating: 4.9,
      reviews: 156,
      popular: true
    },
    {
      id: 'presidential',
      name: 'Presidential Suite',
      price: 1299,
      originalPrice: 1599,
      size: '150 m²',
      maxGuests: 6,
      bedType: '2 King Beds',
      description: 'Ultimate luxury with panoramic views and exclusive amenities',
      images: [
        'https://images.unsplash.com/photo-1664780476492-fbb9fd277ce8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVzaWRlbnRpYWwlMjBzdWl0ZSUyMGhvdGVsJTIwbHV4dXJ5fGVufDF8fHx8MTc1ODg4ODU1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      ],
      amenities: ['Free WiFi', 'Full Minibar', 'Entertainment System', 'Espresso Bar', 'Safe', 'Climate Control', 'Premium Amenities', 'Butler Service'],
      features: ['Panoramic Ocean View', 'Private Terrace', 'Master Suite', 'Guest Bedroom', 'Dining Area', 'Jacuzzi'],
      available: true,
      rating: 5.0,
      reviews: 89,
      exclusive: true
    },
    {
      id: 'family',
      name: 'Family Room',
      price: 399,
      originalPrice: 499,
      size: '55 m²',
      maxGuests: 4,
      bedType: '2 Queen Beds',
      description: 'Perfect for families with connecting areas and kid-friendly amenities',
      images: [
        'https://images.unsplash.com/photo-1590567425133-06094e5dca6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBob3RlbCUyMHJvb20lMjB0d28lMjBiZWRzfGVufDF8fHx8MTc1ODg4ODU2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      ],
      amenities: ['Free WiFi', 'Minibar', 'Smart TV', 'Coffee Machine', 'Safe', 'Air Conditioning', 'Kids Welcome Kit'],
      features: ['Garden View', 'Connecting Rooms Available', 'Child-Safe Features', 'Play Area'],
      available: true,
      rating: 4.7,
      reviews: 198,
      familyFriendly: true
    },
    {
      id: 'eco',
      name: 'Eco Wellness Room',
      price: 379,
      originalPrice: 479,
      size: '48 m²',
      maxGuests: 2,
      bedType: 'Queen Bed',
      description: 'Sustainable luxury with organic amenities and wellness features',
      images: [
        'https://images.unsplash.com/photo-1565330502637-963b256876c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjB3ZWxsbmVzcyUyMGhvdGVsJTIwcm9vbSUyMG5hdHVyYWx8ZW58MXx8fHwxNzU4ODg4NTY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      ],
      amenities: ['Free WiFi', 'Organic Minibar', 'Smart TV', 'Yoga Mat', 'Air Purifier', 'Sustainable Amenities'],
      features: ['Quiet Zone', 'Natural Light', 'Wellness Corner', 'Eco-Friendly Design'],
      available: true,
      rating: 4.8,
      reviews: 167,
      ecoFriendly: true,
      quietZone: true
    },
    {
      id: 'pet',
      name: 'Pet-Friendly Deluxe',
      price: 349,
      originalPrice: 449,
      size: '45 m²',
      maxGuests: 2,
      bedType: 'King Bed',
      description: 'Specially designed for guests traveling with their furry companions',
      images: [
        'https://images.unsplash.com/photo-1626228600502-6915c7ba4bf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBmcmllbmRseSUyMGhvdGVsJTIwcm9vbSUyMG1vZGVybnxlbnwxfHx8fDE3NTg4ODg1Njl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      ],
      amenities: ['Free WiFi', 'Minibar', 'Smart TV', 'Coffee Machine', 'Safe', 'Pet Bed & Bowls', 'Pet Treats'],
      features: ['Garden Access', 'Pet Relief Area', 'Easy-Clean Flooring', 'Pet-Safe Design'],
      available: true,
      rating: 4.6,
      reviews: 142,
      petFriendly: true
    }
  ];

  // Helper function to filter rooms based on current filters
  const filteredRooms = roomTypes.filter(room => {
    if (roomFilters.roomType !== 'all' && room.id !== roomFilters.roomType) return false;
    if (room.price < roomFilters.priceRange[0] || room.price > roomFilters.priceRange[1]) return false;
    if (roomFilters.quietZone && !room.quietZone) return false;
    if (roomFilters.petFriendly && !room.petFriendly) return false;
    if (roomFilters.oceanView && !room.features.some(f => f.includes('Ocean View'))) return false;
    if (roomFilters.balcony && !room.features.some(f => f.includes('Balcony') || f.includes('Terrace'))) return false;
    return true;
  });

  // Room Booking Screen
  const renderRoomBookingScreen = () => (
    <div className="p-6 pb-24 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <Button onClick={navigateBack} className="neom-btn-glass neom-shrink-press">
          <ArrowRight className="w-5 h-5 rotate-180" />
        </Button>
        <div>
          <h2 className="neom-heading-neon text-xl">Book a Room</h2>
          <p className="neom-body text-sm">Find your perfect stay at NEOM</p>
        </div>
      </div>

      {/* Booking Search */}
      <Card className="neom-card-glass border border-cyan-400/30">
        <CardContent className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="neom-body text-sm mb-2 block">Check-in</label>
              <Input
                type="date"
                value={bookingDates.checkIn}
                onChange={(e) => setBookingDates(prev => ({...prev, checkIn: e.target.value}))}
                className="neom-gradient-glass border border-cyan-400/30 text-black"
              />
            </div>
            <div>
              <label className="neom-body text-sm mb-2 block">Check-out</label>
              <Input
                type="date"
                value={bookingDates.checkOut}
                onChange={(e) => setBookingDates(prev => ({...prev, checkOut: e.target.value}))}
                className="neom-gradient-glass border border-cyan-400/30 text-black"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="neom-body text-sm mb-2 block">Adults</label>
              <div className="flex items-center space-x-3">
                <Button
                  onClick={() => setBookingGuests(prev => ({...prev, adults: Math.max(1, prev.adults - 1)}))}
                  className="neom-btn-glass neom-shrink-press w-8 h-8 p-0"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="neom-mono text-lg w-8 text-center">{bookingGuests.adults}</span>
                <Button
                  onClick={() => setBookingGuests(prev => ({...prev, adults: Math.min(6, prev.adults + 1)}))}
                  className="neom-btn-glass neom-shrink-press w-8 h-8 p-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div>
              <label className="neom-body text-sm mb-2 block">Children</label>
              <div className="flex items-center space-x-3">
                <Button
                  onClick={() => setBookingGuests(prev => ({...prev, children: Math.max(0, prev.children - 1)}))}
                  className="neom-btn-glass neom-shrink-press w-8 h-8 p-0"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="neom-mono text-lg w-8 text-center">{bookingGuests.children}</span>
                <Button
                  onClick={() => setBookingGuests(prev => ({...prev, children: Math.min(4, prev.children + 1)}))}
                  className="neom-btn-glass neom-shrink-press w-8 h-8 p-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guest Information */}
      <Card className="neom-card-glass border border-yellow-400/30">
        <CardHeader>
          <CardTitle className="neom-heading-neon flex items-center">
            <User className="w-5 h-5 mr-2 text-yellow-300" />
            Guest Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="neom-body text-sm mb-2 block">Full Name</label>
            <Input
              type="text"
              placeholder="Enter your full name"
              className="neom-gradient-glass border border-yellow-400/30 text-black placeholder:text-gray-500"
            />
          </div>
          
          <div>
            <label className="neom-body text-sm mb-2 block">Address</label>
            <Textarea
              placeholder="Enter your address"
              className="neom-gradient-glass border border-yellow-400/30 text-black placeholder:text-gray-500 min-h-[80px]"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="neom-body text-sm mb-2 block">Age</label>
              <Input
                type="number"
                placeholder="Age"
                min="18"
                max="120"
                className="neom-gradient-glass border border-yellow-400/30 text-black placeholder:text-gray-500"
              />
            </div>
            <div>
              <label className="neom-body text-sm mb-2 block">ID Number</label>
              <Input
                type="text"
                placeholder="ID Number"
                className="neom-gradient-glass border border-yellow-400/30 text-black placeholder:text-gray-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="neom-card-glass border border-purple-400/30">
        <CardHeader>
          <CardTitle className="neom-heading-neon flex items-center">
            <Settings className="w-5 h-5 mr-2 text-purple-300" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Price Range */}
          <div>
            <label className="neom-body text-sm mb-3 block">Price Range (per night)</label>
            <Slider
              value={roomFilters.priceRange}
              onValueChange={(value) => setRoomFilters(prev => ({...prev, priceRange: value}))}
              max={2000}
              min={100}
              step={50}
              className="w-full"
            />
            <div className="flex justify-between mt-2">
              <span className="neom-mono text-sm">${roomFilters.priceRange[0]}</span>
              <span className="neom-mono text-sm">${roomFilters.priceRange[1]}</span>
            </div>
          </div>
          
          {/* Room Type */}
          <div>
            <label className="neom-body text-sm mb-2 block">Room Type</label>
            <Select 
              value={roomFilters.roomType} 
              onValueChange={(value) => setRoomFilters(prev => ({...prev, roomType: value}))}
            >
              <SelectTrigger className="neom-gradient-glass border border-purple-400/30 text-black">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-purple-400/30">
                <SelectItem value="all">All Room Types</SelectItem>
                <SelectItem value="deluxe">Deluxe Room</SelectItem>
                <SelectItem value="suite">Executive Suite</SelectItem>
                <SelectItem value="presidential">Presidential Suite</SelectItem>
                <SelectItem value="family">Family Room</SelectItem>
                <SelectItem value="eco">Eco Wellness Room</SelectItem>
                <SelectItem value="pet">Pet-Friendly Deluxe</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Feature Toggles */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { key: 'quietZone', label: 'Quiet Zone', icon: VolumeOff },
              { key: 'petFriendly', label: 'Pet-Friendly', icon: PawPrint },
              { key: 'oceanView', label: 'Ocean View', icon: Waves },
              { key: 'balcony', label: 'Balcony/Terrace', icon: Building }
            ].map(filter => (
              <div 
                key={filter.key}
                className="flex items-center justify-between p-3 rounded-xl neom-gradient-glass border border-gray-400/20"
              >
                <div className="flex items-center space-x-2">
                  <filter.icon className="w-4 h-4 text-purple-400" />
                  <span className="neom-body text-sm">{filter.label}</span>
                </div>
                <Switch 
                  checked={roomFilters[filter.key as keyof typeof roomFilters] as boolean}
                  onCheckedChange={(checked) => setRoomFilters(prev => ({...prev, [filter.key]: checked}))}
                  size="sm"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Available Rooms */}
      <Card className="neom-card-glass border border-emerald-400/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="neom-heading-neon flex items-center">
              <Bed className="w-5 h-5 mr-2 text-emerald-300" />
              Available Rooms
            </CardTitle>
            <Badge className="bg-emerald-400/20 text-emerald-300 border-emerald-400/30">
              {filteredRooms.length} Available
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredRooms.map((room) => (
            <Card 
              key={room.id}
              className="neom-card-glass-hover border border-yellow-400/20 hover:border-yellow-400/40 cursor-pointer neom-transition"
              onClick={() => {
                setSelectedRoom(room);
                setCurrentScreen('room-details');
              }}
            >
              <CardContent className="p-4 bg-[rgba(0,0,0,0.03)]">
                <div className="flex space-x-4">
                  {/* Room Image */}
                  <div className="w-24 h-24 rounded-xl overflow-hidden">
                    <ImageWithFallback
                      src={room.images[0]}
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Room Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="neom-heading text-lg mb-1 flex items-center">
                          {room.name}
                          {room.popular && <Badge className="ml-2 bg-orange-400/20 text-orange-300 text-xs">Popular</Badge>}
                          {room.exclusive && <Badge className="ml-2 bg-purple-400/20 text-purple-300 text-xs">Exclusive</Badge>}
                        </h3>
                        <p className="neom-body text-sm mb-2">{room.description}</p>
                        <div className="flex items-center space-x-4 text-xs">
                          <span className="neom-mono">{room.size}</span>
                          <span className="neom-mono">{room.bedType}</span>
                          <span className="neom-mono">{room.maxGuests} guests</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="neom-mono text-sm">{room.rating}</span>
                          <span className="neom-body text-xs">({room.reviews})</span>
                        </div>
                        <div className="text-right">
                          {room.originalPrice > room.price && (
                            <span className="neom-mono text-xs line-through opacity-60">${room.originalPrice}</span>
                          )}
                          <div className="neom-mono-yellow text-xl">${room.price}</div>
                          <span className="neom-body text-xs">per night</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Quick Features */}
                    <div className="flex flex-wrap gap-1 mt-2 mb-3">
                      {room.features.slice(0, 3).map((feature) => (
                        <Badge key={feature} className="bg-cyan-400/20 text-cyan-300 border-cyan-400/30 text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {room.features.length > 3 && (
                        <Badge className="bg-gray-400/20 text-gray-300 text-xs">
                          +{room.features.length - 3} more
                        </Badge>
                      )}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRoom(room);
                          setCurrentScreen('vr-room-preview');
                        }}
                        className="flex-1 neom-btn-glass neom-shrink-press text-xs py-2"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        360° Tour
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRoom(room);
                          setCurrentScreen('room-details');
                        }}
                        className="flex-1 neom-btn-primary neom-shrink-press text-xs py-2"
                      >
                        <Info className="w-3 h-3 mr-1" />
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {filteredRooms.length === 0 && (
            <div className="text-center py-8">
              <Bed className="w-12 h-12 mx-auto mb-4 text-gray-400 opacity-50" />
              <p className="neom-body text-sm opacity-70">No rooms match your filters</p>
              <Button 
                onClick={() => setRoomFilters({
                  priceRange: [0, 5000],
                  roomType: 'all',
                  amenities: [],
                  quietZone: false,
                  petFriendly: false,
                  oceanView: false,
                  balcony: false
                })}
                className="neom-btn-glass neom-shrink-press mt-3"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  // Room Details Screen with AR/VR Preview
  const renderRoomDetailsScreen = () => {
    if (!selectedRoom) return null;
    
    return (
      <div className="p-6 pb-24 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Button onClick={() => setCurrentScreen('room-booking')} className="neom-btn-glass neom-shrink-press">
            <ArrowRight className="w-5 h-5 rotate-180" />
          </Button>
          <div>
            <h2 className="neom-heading-neon text-xl">{selectedRoom.name}</h2>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="neom-mono text-sm">{selectedRoom.rating}</span>
              <span className="neom-body text-xs">({selectedRoom.reviews} reviews)</span>
            </div>
          </div>
        </div>

        {/* Room Image with AR/VR Options */}
        <Card className="neom-card-glass border border-cyan-400/30 overflow-hidden">
          <div className="relative">
            <ImageWithFallback
              src={selectedRoom.images[0]}
              alt={selectedRoom.name}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            {/* AR/VR Buttons */}
            <div className="absolute bottom-4 left-4 right-4 flex space-x-3">
              <Button 
                onClick={() => {
                  setArVrMode('ar');
                  setCurrentScreen('ar-vr-preview');
                }}
                className="flex-1 neom-btn-glass neom-shrink-press backdrop-blur-md"
              >
                <Camera className="w-4 h-4 mr-2" />
                View in AR
              </Button>
              <Button 
                onClick={() => {
                  setCurrentScreen('vr-room-preview');
                }}
                className="flex-1 neom-btn-glass neom-shrink-press backdrop-blur-md"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview in 360°
              </Button>
            </div>
          </div>
        </Card>

        {/* Room Info */}
        <Card className="neom-card-glass border border-purple-400/30">
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <Building className="w-6 h-6 mx-auto mb-2 text-purple-300" />
                <div className="neom-mono text-lg">{selectedRoom.size}</div>
                <div className="neom-body text-xs">Room Size</div>
              </div>
              <div className="text-center">
                <Users className="w-6 h-6 mx-auto mb-2 text-purple-300" />
                <div className="neom-mono text-lg">{selectedRoom.maxGuests}</div>
                <div className="neom-body text-xs">Max Guests</div>
              </div>
              <div className="text-center">
                <Bed className="w-6 h-6 mx-auto mb-2 text-purple-300" />
                <div className="neom-mono text-sm">{selectedRoom.bedType}</div>
                <div className="neom-body text-xs">Bed Type</div>
              </div>
            </div>
            
            <p className="neom-body mb-4">{selectedRoom.description}</p>
            
            {/* Features */}
            <div className="mb-4">
              <h4 className="neom-heading text-sm mb-3">Room Features</h4>
              <div className="flex flex-wrap gap-2">
                {selectedRoom.features.map((feature, index) => (
                  <Badge key={index} className="bg-purple-400/20 text-purple-300 border-purple-400/30">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Amenities */}
            <div>
              <h4 className="neom-heading text-sm mb-3">Amenities</h4>
              <div className="grid grid-cols-2 gap-2">
                {selectedRoom.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span className="neom-body text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing & Book */}
        <Card className="neom-card-glass border border-yellow-400/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center space-x-2">
                  {selectedRoom.originalPrice > selectedRoom.price && (
                    <span className="neom-mono text-lg line-through opacity-60">${selectedRoom.originalPrice}</span>
                  )}
                  <span className="neom-mono-yellow text-3xl">${selectedRoom.price}</span>
                </div>
                <span className="neom-body text-sm">per night</span>
              </div>
              <div className="text-right">
                {bookingDates.checkIn && bookingDates.checkOut && (
                  <>
                    <div className="neom-mono text-lg">
                      Total: ${selectedRoom.price * 
                        Math.ceil((new Date(bookingDates.checkOut).getTime() - new Date(bookingDates.checkIn).getTime()) / (1000 * 60 * 60 * 24))
                      }
                    </div>
                    <span className="neom-body text-xs">
                      {Math.ceil((new Date(bookingDates.checkOut).getTime() - new Date(bookingDates.checkIn).getTime()) / (1000 * 60 * 60 * 24))} nights
                    </span>
                  </>
                )}
              </div>
            </div>
            
            <Button 
              onClick={() => setCurrentScreen('booking-confirmation')}
              disabled={!bookingDates.checkIn || !bookingDates.checkOut}
              className="w-full neom-btn-primary neom-shrink-press"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book This Room
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  };

  // AR/VR Preview Screen
  const renderArVrPreviewScreen = () => (
    <div className="relative min-h-screen bg-black">
      {/* Mock AR/VR Interface */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-cyan-900/20">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Button 
              onClick={() => setCurrentScreen('room-details')} 
              className="neom-btn-glass neom-shrink-press"
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
            </Button>
            <div className="text-center">
              <h2 className="neom-heading-neon text-xl">
                {arVrMode === 'ar' ? 'AR Room Preview' : 'VR Room Tour'}
              </h2>
              <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">
                {arVrMode?.toUpperCase()} Mode
              </Badge>
            </div>
            <div className="w-10" />
          </div>

          {/* AR/VR Content Area */}
          <div className="relative">
            <Card className="neom-card-glass border border-cyan-400/30 overflow-hidden">
              <div className="aspect-video relative bg-gradient-to-br from-purple-900/30 to-cyan-900/30 flex items-center justify-center">
                {arVrMode === 'ar' ? (
                  <div className="text-center">
                    <Camera className="w-16 h-16 mx-auto mb-4 text-cyan-300 animate-pulse" />
                    <h3 className="neom-heading-neon text-lg mb-2">Point Your Camera</h3>
                    <p className="neom-body text-sm">Position the room in your space</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Eye className="w-16 h-16 mx-auto mb-4 text-purple-300 animate-pulse" />
                    <h3 className="neom-heading-neon text-lg mb-2">Immersive Room Tour</h3>
                    <p className="neom-body text-sm">Look around to explore</p>
                  </div>
                )}
                
                {/* Mock 3D Room Overlay */}
                <div className="absolute inset-4 border-2 border-dashed border-yellow-400/50 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Bed className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                    <span className="neom-body text-xs text-yellow-400">{selectedRoom?.name}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* AR/VR Controls */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <Card className="neom-card-glass border border-emerald-400/30">
                <CardContent className="p-4 text-center">
                  <RotateCcw className="w-8 h-8 mx-auto mb-2 text-emerald-300" />
                  <Button className="neom-btn-glass neom-shrink-press w-full">
                    Reset View
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="neom-card-glass border border-orange-400/30">
                <CardContent className="p-4 text-center">
                  <Settings className="w-8 h-8 mx-auto mb-2 text-orange-300" />
                  <Button className="neom-btn-glass neom-shrink-press w-full">
                    Settings
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Continue Booking Button */}
            <Button 
              onClick={() => setCurrentScreen('booking-confirmation')}
              className="w-full neom-btn-primary neom-shrink-press mt-6"
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              Continue to Booking
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  // Booking Confirmation Screen
  const renderBookingConfirmationScreen = () => {
    if (!selectedRoom) return null;
    
    const nights = bookingDates.checkIn && bookingDates.checkOut 
      ? Math.ceil((new Date(bookingDates.checkOut).getTime() - new Date(bookingDates.checkIn).getTime()) / (1000 * 60 * 60 * 24))
      : 1;
    const totalPrice = selectedRoom.price * nights;
    const taxes = Math.round(totalPrice * 0.15);
    const finalTotal = totalPrice + taxes;

    return (
      <div className="p-6 pb-24 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Button onClick={() => setCurrentScreen('room-details')} className="neom-btn-glass neom-shrink-press">
            <ArrowRight className="w-5 h-5 rotate-180" />
          </Button>
          <div>
            <h2 className="neom-heading-neon text-xl">Confirm Booking</h2>
            <p className="neom-body text-sm">Review your reservation details</p>
          </div>
        </div>

        {/* Booking Summary */}
        <Card className="neom-card-glass border border-emerald-400/30">
          <CardHeader>
            <CardTitle className="neom-heading-neon flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-emerald-300" />
              Booking Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden">
                <ImageWithFallback
                  src={selectedRoom.images[0]}
                  alt={selectedRoom.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="neom-heading text-lg">{selectedRoom.name}</h3>
                <p className="neom-body text-sm">{selectedRoom.size} • {selectedRoom.bedType}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="neom-mono text-sm">{selectedRoom.rating}</span>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-600 pt-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="neom-body text-sm">Check-in</span>
                <span className="neom-mono">{bookingDates.checkIn ? new Date(bookingDates.checkIn).toLocaleDateString() : 'Not set'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="neom-body text-sm">Check-out</span>
                <span className="neom-mono">{bookingDates.checkOut ? new Date(bookingDates.checkOut).toLocaleDateString() : 'Not set'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="neom-body text-sm">Guests</span>
                <span className="neom-mono">{bookingGuests.adults} adults, {bookingGuests.children} children</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="neom-body text-sm">Nights</span>
                <span className="neom-mono">{nights} nights</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Price Breakdown */}
        <Card className="neom-card-glass border border-yellow-400/30">
          <CardHeader>
            <CardTitle className="neom-heading-neon flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-yellow-400" />
              Price Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="neom-body">${selectedRoom.price} × {nights} nights</span>
              <span className="neom-mono">${totalPrice}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="neom-body">Taxes & Fees</span>
              <span className="neom-mono">${taxes}</span>
            </div>
            <div className="border-t border-gray-600 pt-3 flex justify-between items-center">
              <span className="neom-heading text-lg">Total</span>
              <span className="neom-mono-yellow text-2xl">${finalTotal}</span>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card className="neom-card-glass border border-purple-400/30">
          <CardHeader>
            <CardTitle className="neom-heading-neon flex items-center">
              <Wallet className="w-5 h-5 mr-2 text-purple-300" />
              Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl neom-gradient-glass border border-yellow-400/30 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <Wallet className="w-6 h-6 text-yellow-400" />
                  <div>
                    <span className="neom-body">Digital Wallet</span>
                    <div className="neom-mono text-sm">Balance: ${walletBalance.toFixed(2)}</div>
                  </div>
                </div>
                <div className="w-4 h-4 border-2 border-yellow-400 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-xl neom-gradient-glass border border-gray-400/20 cursor-pointer opacity-60">
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-6 h-6 text-gray-400" />
                  <span className="neom-body">Credit Card</span>
                </div>
                <div className="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Confirm Booking */}
        <div className="space-y-3">
          <Button 
            onClick={() => {
              // Process booking and show confirmation
              setWalletBalance(prev => prev - finalTotal);
              setHasDigitalKey(true); // Unlock full app access
              setDigitalKeyActive(true); // Activate digital key
              setIsCheckedIn(true); // Mark as checked in
              setCurrentScreen('checkin-complete'); // Show booking confirmed screen
              // Would show success notification in real app
            }}
            className="w-full neom-btn-primary neom-shrink-press py-4"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Confirm Booking - ${finalTotal}
          </Button>
        </div>
      </div>
    );
  };

  // Navigation functions
  const navigateToScreen = (screen: ScreenType) => {
    setCurrentScreen(screen);
  };

  const navigateBack = () => {
    setCurrentScreen('tabs');
  };

  // Emergency call handlers
  const makeEmergencyCall = (contactType: string, number: string) => {
    console.log(`Emergency call to ${contactType}: ${number}`);
    
    // In a real app, this would initiate a phone call
    // For now, we'll show a visual feedback
    alert(`${contactType}: ${number}\n\nConnecting to ${contactType.toLowerCase()}...`);
    
    // Could also integrate with device's phone capabilities:
    // window.location.href = `tel:${number}`;
  };

  // Community helper functions
  const toggleActivityJoin = (activityId: string) => {
    if (joinedActivities.includes(activityId)) {
      setJoinedActivities(prev => prev.filter(id => id !== activityId));
    } else {
      setJoinedActivities(prev => [...prev, activityId]);
    }
  };

  const toggleEventRSVP = (eventId: string) => {
    if (rsvpedEvents.includes(eventId)) {
      setRsvpedEvents(prev => prev.filter(id => id !== eventId));
    } else {
      setRsvpedEvents(prev => [...prev, eventId]);
    }
  };

  const openActivityChat = (activityId: string) => {
    console.log(`Opening chat for activity: ${activityId}`);
    // Would open chat interface in real app
  };

  const handleCreateEvent = () => {
    console.log('Creating event:', newEvent);
    setShowCreateEvent(false);
    setNewEvent({
      name: '',
      location: '',
      date: '',
      time: '',
      maxParticipants: '',
      description: ''
    });
    // Would create event in real app
  };

  // Notification helper functions
  const toggleNotificationChannel = (channel: keyof typeof notificationChannels) => {
    setNotificationChannels(prev => ({
      ...prev,
      [channel]: !prev[channel]
    }));
  };

  const toggleNotificationCategory = (category: keyof typeof notificationCategories) => {
    setNotificationCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const dismissNotification = (notificationId: number) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const handleNotificationAction = (notificationId: number, action: string) => {
    console.log(`Notification ${notificationId} action: ${action}`);
    // Would handle specific notification actions in real app
  };

  // Tracking helper functions
  const toggleTrackingFilter = (filter: keyof typeof trackingFilters) => {
    setTrackingFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };

  const handleTrackingAction = (itemId: string, action: string) => {
    console.log(`Tracking item ${itemId} action: ${action}`);
    // Would handle specific tracking actions in real app
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
      case 'completed':
      case 'confirmed':
        return 'emerald';
      case 'in_transit':
      case 'preparing':
      case 'upcoming':
        return 'yellow';
      case 'delayed':
      case 'cancelled':
        return 'red';
      default:
        return 'gray';
    }
  };

  const formatTimeRemaining = (targetTime: Date) => {
    const now = new Date();
    const diff = targetTime.getTime() - now.getTime();
    
    if (diff <= 0) return 'Now';
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    }
    return `${minutes}m`;
  };

  // Elevator countdown effect - must be at top level to follow Rules of Hooks
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    // Only run the countdown when on tracking tab
    if (activeTab === 'tracking' && currentScreen === 'tabs') {
      interval = setInterval(() => {
        setElevatorArrival(prev => Math.max(0, prev - 1));
      }, 1000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [activeTab, currentScreen]);

  // Check-in flow functions
  const startBiometricCheckin = (type: 'face' | 'palm') => {
    setBiometricType(type);
    setBiometricScanning(true);
    setCheckinStep(1);
    
    // Simulate biometric scanning
    setTimeout(() => {
      setBiometricScanning(false);
      setCheckinStep(3); // Skip payment step
      setIsCheckedIn(true);
      setDigitalKeyActive(true);
      setHasDigitalKey(true); // Unlock full app access
      navigateToScreen('checkin-complete');
    }, 3000);
  };

  // QR Code camera simulation
  const startQRCodeScan = () => {
    setIsQRScanning(true);
    // In a real app, this would open the camera for QR scanning
    console.log('Opening camera for QR code scanning...');
    
    // Simulate QR code scan
    setTimeout(() => {
      setIsQRScanning(false);
      setShowQROptions(false);
      // Simulate successful scan - skip payment and issue digital key
      setCheckinStep(3); // Skip payment step
      setIsCheckedIn(true);
      setDigitalKeyActive(true);
      setHasDigitalKey(true); // Unlock full app access
      navigateToScreen('checkin-complete');
    }, 3000);
  };

  // Manual Booking ID entry
  const processBookingId = () => {
    if (!bookingIdInput.trim()) return;
    
    setIsProcessingBookingId(true);
    
    // Simulate booking ID verification
    setTimeout(() => {
      setIsProcessingBookingId(false);
      setBookingIdInput('');
      setShowQROptions(false);
      // Skip payment and issue digital key directly
      setCheckinStep(3); // Skip payment step
      setIsCheckedIn(true);
      setDigitalKeyActive(true);
      setHasDigitalKey(true); // Unlock full app access
      navigateToScreen('checkin-complete');
    }, 2000);
  };

  const processPayment = () => {
    setPaymentProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentProcessing(false);
      setCheckinStep(3);
      setIsCheckedIn(true);
      setDigitalKeyActive(true);
      setHasDigitalKey(true); // Unlock full app access
      navigateToScreen('checkin-complete');
    }, 2500);
  };

  // Digital Wallet helper functions
  const handlePayForService = (serviceType: string, amount: number) => {
    setWalletBalance(prev => prev - amount);
    console.log(`Paid ${amount} for ${serviceType} from wallet`);
  };

  const handleTipStaffFromWallet = (staffName: string, amount: number) => {
    setWalletBalance(prev => prev - amount);
    console.log(`Tipped ${amount} to ${staffName} from wallet`);
  };

  // Staff rating helper functions
  const handleFavoriteStaffToggle = (staffName: string) => {
    const newFavorites = favoriteStaff.includes(staffName)
      ? favoriteStaff.filter(f => f !== staffName)
      : [...favoriteStaff, staffName];
    setFavoriteStaff(newFavorites);
  };

  // Check-In Preferences Screen (appears before biometric check-in)
  const renderCheckinPreferencesScreen = () => {
    const handleViewPreferenceToggle = (view: string) => {
      setStayPreferences(prev => ({
        ...prev,
        viewPreference: prev.viewPreference.includes(view)
          ? prev.viewPreference.filter(v => v !== view)
          : [...prev.viewPreference, view]
      }));
    };

    const handleAmenityToggle = (amenity: string) => {
      setStayPreferences(prev => ({
        ...prev,
        amenities: prev.amenities.includes(amenity)
          ? prev.amenities.filter(a => a !== amenity)
          : [...prev.amenities, amenity]
      }));
    };

    const handleDiningPreferenceToggle = (pref: string) => {
      setStayPreferences(prev => ({
        ...prev,
        diningPreferences: prev.diningPreferences.includes(pref)
          ? prev.diningPreferences.filter(p => p !== pref)
          : [...prev.diningPreferences, pref]
      }));
    };

    const handleAiMessageSend = () => {
      if (!aiChatInput.trim()) return;

      // Add user message
      const userMessage = {
        id: aiPreferenceMessages.length + 1,
        sender: 'user' as const,
        message: aiChatInput,
        timestamp: new Date()
      };

      setAiPreferenceMessages(prev => [...prev, userMessage]);
      setAiChatInput('');

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: aiPreferenceMessages.length + 2,
          sender: 'ai' as const,
          message: "I understand! Based on your preferences, I'd recommend a suite with a sea view on a higher floor. Would you like me to set that up for you?",
          timestamp: new Date()
        };
        setAiPreferenceMessages(prev => [...prev, aiResponse]);
      }, 1000);
    };

    const proceedToCheckin = () => {
      // Save all preferences and navigate to check-in
      setCurrentScreen('biometric-checkin');
    };

    const skipPreferences = () => {
      // Skip preferences and go directly to check-in
      setCurrentScreen('biometric-checkin');
    };

    return (
      <div className="p-6 pb-24 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Button onClick={navigateBack} className="neom-btn-glass neom-shrink-press">
            <ArrowRight className="w-5 h-5 rotate-180" />
          </Button>
          <h2 className="neom-heading-neon text-xl">Your Stay Preferences</h2>
        </div>

        {/* Welcome Message */}
        <div className="text-center mb-6">
          <h3 className="neom-heading text-2xl mb-2">Personalize Your Stay</h3>
          <p className="neom-body opacity-80">
            Help us customize your experience by sharing your preferences
          </p>
        </div>

        {/* Room & Bed Configuration */}
        <Card className="neom-card-glass neom-card-glass-hover border border-purple-400/30 neom-slide-in">
          <CardHeader>
            <CardTitle className="neom-heading-neon flex items-center">
              <Bed className="w-5 h-5 mr-2 text-purple-300" />
              Room & Bed Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Room Type */}
            <div>
              <p className="neom-body text-sm mb-3">Room Type</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'single', label: 'Single', icon: Bed },
                  { value: 'double', label: 'Double', icon: Bed },
                  { value: 'suite', label: 'Suite', icon: Crown }
                ].map((room) => (
                  <Button
                    key={room.value}
                    onClick={() => setStayPreferences(prev => ({...prev, roomType: room.value}))}
                    className={`neom-btn-glass neom-shrink-press text-xs py-3 px-3 ${
                      stayPreferences.roomType === room.value 
                        ? 'neom-gradient-glass-purple border-purple-400/50' 
                        : ''
                    }`}
                  >
                    <room.icon className="w-4 h-4 mr-1" />
                    {room.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Bed Type */}
            <div>
              <p className="neom-body text-sm mb-3">Bed Type</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'king', label: 'King' },
                  { value: 'queen', label: 'Queen' },
                  { value: 'twin', label: 'Twin' }
                ].map((bed) => (
                  <Button
                    key={bed.value}
                    onClick={() => setStayPreferences(prev => ({...prev, bedType: bed.value}))}
                    className={`neom-btn-glass neom-shrink-press text-xs py-3 px-3 ${
                      stayPreferences.bedType === bed.value 
                        ? 'neom-gradient-glass-purple border-purple-400/50' 
                        : ''
                    }`}
                  >
                    {bed.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Pillow Type */}
            <div>
              <p className="neom-body text-sm mb-3">Pillow Type</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'soft', label: 'Soft' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'firm', label: 'Firm' }
                ].map((pillow) => (
                  <Button
                    key={pillow.value}
                    onClick={() => setStayPreferences(prev => ({...prev, pillowType: pillow.value}))}
                    className={`neom-btn-glass neom-shrink-press text-xs py-3 px-3 ${
                      stayPreferences.pillowType === pillow.value 
                        ? 'neom-gradient-glass-purple border-purple-400/50' 
                        : ''
                    }`}
                  >
                    {pillow.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Floor & View Preferences */}
        <Card className="neom-card-glass neom-card-glass-hover border border-cyan-400/30 neom-slide-in" style={{ animationDelay: '100ms' }}>
          <CardHeader>
            <CardTitle className="neom-heading-neon flex items-center">
              <Building className="w-5 h-5 mr-2 text-cyan-300" />
              Floor & View Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Floor Preference */}
            <div>
              <p className="neom-body text-sm mb-3">Floor Preference</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'low', label: 'Low Floor', desc: '1-5' },
                  { value: 'middle', label: 'Middle', desc: '6-10' },
                  { value: 'high', label: 'High Floor', desc: '11+' }
                ].map((floor) => (
                  <Button
                    key={floor.value}
                    onClick={() => setStayPreferences(prev => ({...prev, floorPreference: floor.value}))}
                    className={`neom-btn-glass neom-shrink-press text-xs py-3 px-2 flex flex-col h-auto ${
                      stayPreferences.floorPreference === floor.value 
                        ? 'neom-gradient-glass-cyan border-cyan-400/50' 
                        : ''
                    }`}
                  >
                    <span className="font-medium">{floor.label}</span>
                    <span className="text-xs opacity-60">{floor.desc}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* View Preference */}
            <div>
              <p className="neom-body text-sm mb-3">View Preference (Select all that apply)</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'pool', label: 'Pool', icon: Waves },
                  { value: 'garden', label: 'Garden', icon: Trees },
                  { value: 'city', label: 'City', icon: Building },
                  { value: 'sea', label: 'Sea', icon: GlassWater }
                ].map((view) => (
                  <Button
                    key={view.value}
                    onClick={() => handleViewPreferenceToggle(view.value)}
                    className={`neom-btn-glass neom-shrink-press text-xs py-3 px-3 justify-start ${
                      stayPreferences.viewPreference.includes(view.value)
                        ? 'neom-gradient-glass-cyan border-cyan-400/50' 
                        : ''
                    }`}
                  >
                    {stayPreferences.viewPreference.includes(view.value) ? (
                      <CheckCircle2 className="w-4 h-4 mr-2 text-cyan-300" />
                    ) : (
                      <view.icon className="w-4 h-4 mr-2" />
                    )}
                    {view.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quiet Room Zone */}
            <div className="pt-3 border-t border-cyan-400/20">
              <div className="flex items-start justify-between p-4 neom-gradient-glass-cyan rounded-xl">
                <div className="flex items-start space-x-3 flex-1">
                  <VolumeOff className="w-5 h-5 text-cyan-300 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="neom-body text-sm font-medium mb-1">Quiet Room Zone</p>
                    <p className="neom-body text-xs opacity-70 leading-relaxed">
                      Rooms located away from elevators, ice machines, vending areas, and high-traffic zones for minimal noise and maximum tranquility
                    </p>
                  </div>
                </div>
                <Switch
                  checked={stayPreferences.quietRoom}
                  onCheckedChange={(checked) => setStayPreferences(prev => ({...prev, quietRoom: checked}))}
                  className="ml-3 flex-shrink-0"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Amenities */}
        <Card className="neom-card-glass neom-card-glass-hover border border-yellow-400/30 neom-slide-in" style={{ animationDelay: '200ms' }}>
          <CardHeader>
            <CardTitle className="neom-heading-neon flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-yellow-300" />
              Room Amenities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="neom-body text-sm mb-3">Select amenities you'd like in your room</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'mini-bar', label: 'Mini-Bar', icon: Wine },
                { value: 'workspace', label: 'Workspace', icon: Briefcase },
                { value: 'baby-crib', label: 'Baby Crib', icon: Heart },
                { value: 'extra-towels', label: 'Extra Towels', icon: Package },
                { value: 'iron', label: 'Iron', icon: Settings }
              ].map((amenity) => (
                <Button
                  key={amenity.value}
                  onClick={() => handleAmenityToggle(amenity.value)}
                  className={`neom-btn-glass neom-shrink-press text-xs py-3 px-3 justify-start ${
                    stayPreferences.amenities.includes(amenity.value)
                      ? 'neom-gradient-glass-yellow border-yellow-400/50' 
                      : ''
                  }`}
                >
                  {stayPreferences.amenities.includes(amenity.value) ? (
                    <CheckCircle2 className="w-4 h-4 mr-2 text-yellow-300" />
                  ) : (
                    <amenity.icon className="w-4 h-4 mr-2" />
                  )}
                  {amenity.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Dining Preferences */}
        <Card className="neom-card-glass neom-card-glass-hover border border-emerald-400/30 neom-slide-in" style={{ animationDelay: '300ms' }}>
          <CardHeader>
            <CardTitle className="neom-heading-neon flex items-center">
              <UtensilsCrossed className="w-5 h-5 mr-2 text-emerald-300" />
              Dining Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="neom-body text-sm mb-3">Select all dietary preferences that apply</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'veg', label: 'Vegetarian', icon: Wheat },
                { value: 'non-veg', label: 'Non-Veg', icon: ChefHat },
                { value: 'vegan', label: 'Vegan', icon: Apple },
                { value: 'gluten-free', label: 'Gluten-Free', icon: Wheat }
              ].map((dining) => (
                <Button
                  key={dining.value}
                  onClick={() => handleDiningPreferenceToggle(dining.value)}
                  className={`neom-btn-glass neom-shrink-press text-xs py-3 px-3 justify-start ${
                    stayPreferences.diningPreferences.includes(dining.value)
                      ? 'neom-gradient-glass-emerald border-emerald-400/50' 
                      : ''
                  }`}
                >
                  {stayPreferences.diningPreferences.includes(dining.value) ? (
                    <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-300" />
                  ) : (
                    <dining.icon className="w-4 h-4 mr-2" />
                  )}
                  {dining.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Temperature & Housekeeping */}
        <Card className="neom-card-glass neom-card-glass-hover border border-orange-400/30 neom-slide-in" style={{ animationDelay: '400ms' }}>
          <CardHeader>
            <CardTitle className="neom-heading-neon flex items-center">
              <Settings className="w-5 h-5 mr-2 text-orange-300" />
              Temperature & Housekeeping
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Temperature Preference */}
            <div>
              <p className="neom-body text-sm mb-3">Temperature Preference</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'cooler', label: 'Cooler', icon: Thermometer, desc: '18-20°C' },
                  { value: 'moderate', label: 'Moderate', icon: Thermometer, desc: '21-23°C' },
                  { value: 'warmer', label: 'Warmer', icon: Thermometer, desc: '24-26°C' }
                ].map((temp) => (
                  <Button
                    key={temp.value}
                    onClick={() => setStayPreferences(prev => ({...prev, temperaturePreference: temp.value}))}
                    className={`neom-btn-glass neom-shrink-press text-xs py-3 px-2 flex flex-col h-auto ${
                      stayPreferences.temperaturePreference === temp.value 
                        ? 'neom-gradient-glass-orange border-orange-400/50' 
                        : ''
                    }`}
                  >
                    <temp.icon className="w-4 h-4 mb-1" />
                    <span className="font-medium">{temp.label}</span>
                    <span className="text-xs opacity-60">{temp.desc}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Housekeeping Frequency */}
            <div>
              <p className="neom-body text-sm mb-3">Housekeeping Frequency</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'daily', label: 'Daily' },
                  { value: 'on-request', label: 'On Request' },
                  { value: 'no-service', label: 'No Service' }
                ].map((service) => (
                  <Button
                    key={service.value}
                    onClick={() => setStayPreferences(prev => ({...prev, housekeepingFrequency: service.value}))}
                    className={`neom-btn-glass neom-shrink-press text-xs py-3 px-2 ${
                      stayPreferences.housekeepingFrequency === service.value 
                        ? 'neom-gradient-glass-orange border-orange-400/50' 
                        : ''
                    }`}
                  >
                    {service.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Assistant Help Section */}
        <Card 
          className="neom-card-glass neom-card-glass-hover border border-purple-400/30 cursor-pointer neom-slide-in" 
          style={{ animationDelay: '500ms' }}
          onClick={() => setShowAiAssistant(true)}
        >
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl neom-gradient-glass-purple border border-purple-400/50 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-purple-300" />
                </div>
                <div>
                  <p className="neom-heading text-sm font-medium">Need help choosing? 🤖</p>
                  <p className="neom-body text-xs opacity-70">Ask our AI Assistant</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-purple-300" />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3 mt-8">
          <Button 
            onClick={proceedToCheckin}
            className="w-full neom-btn-primary py-6 text-lg"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Continue to Check-In
          </Button>
          
          <Button 
            onClick={skipPreferences}
            className="w-full neom-btn-glass py-4"
          >
            Skip to Check-In
          </Button>
        </div>

        {/* AI Assistant Chat Overlay */}
        {showAiAssistant && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-0 md:p-6">
            <div className="w-full md:max-w-lg bg-white/95 backdrop-blur-xl rounded-t-3xl md:rounded-3xl shadow-2xl flex flex-col max-h-[85vh] md:max-h-[600px] neom-slide-in border border-purple-400/30">
              {/* Header */}
              <div className="p-5 border-b border-gray-200/50 flex items-center justify-between neom-gradient-glass-purple">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl neom-gradient-glass-purple border border-purple-400/50 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <h3 className="neom-heading text-base">AI Preference Assistant</h3>
                    <p className="neom-body text-xs opacity-70">Here to help you choose</p>
                  </div>
                </div>
                <Button 
                  onClick={() => setShowAiAssistant(false)}
                  className="neom-btn-glass neom-shrink-press p-2"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {aiPreferenceMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 ${
                        msg.sender === 'user'
                          ? 'neom-gradient-glass-purple border border-purple-400/30 ml-auto'
                          : 'neom-gradient-glass-cyan border border-cyan-400/30'
                      }`}
                    >
                      <p className="neom-body text-sm">{msg.message}</p>
                      <p className="neom-body text-xs opacity-50 mt-1">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200/50 neom-gradient-glass">
                <div className="flex items-center space-x-2">
                  <Input
                    value={aiChatInput}
                    onChange={(e) => setAiChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAiMessageSend()}
                    placeholder="Ask about preferences..."
                    className="flex-1 neom-gradient-glass border border-cyan-400/30 text-black"
                  />
                  <Button 
                    onClick={handleAiMessageSend}
                    className="neom-btn-primary neom-shrink-press p-3"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Biometric Check-in Screen
  const renderBiometricCheckinScreen = () => (
    <div className="p-6 pb-24 space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button onClick={navigateBack} className="neom-btn-glass neom-shrink-press">
          <ArrowRight className="w-5 h-5 rotate-180" />
        </Button>
        <h2 className="neom-heading-neon text-xl">Check-In</h2>
      </div>

      <div className="text-center mb-8">
        <h3 className="neom-heading text-2xl mb-2">Welcome to NEOM</h3>
        <p className="neom-body">Choose your preferred check-in method</p>
      </div>

      <div className="space-y-4">
        {/* QR Code / Booking ID - First & Most Prominent */}
        <Card 
          className="neom-card-glass neom-card-glass-hover border border-yellow-400/30 cursor-pointer relative overflow-hidden"
          onClick={() => setShowQROptions(!showQROptions)}
        >
          <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400/40 rounded-full blur-sm neom-float"></div>
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full neom-gradient-glass-yellow border-2 border-yellow-400/50 flex items-center justify-center shadow-lg shadow-yellow-400/20">
                <QrCode className="w-12 h-12 text-yellow-400" />
              </div>
              <h4 className="neom-heading-neon text-xl mb-2">QR Code / Booking ID</h4>
              <p className="neom-body text-sm opacity-90">Scan your QR code or enter booking ID manually</p>
            </div>

            {/* QR/Booking ID Options */}
            {showQROptions && (
              <div className="space-y-3 border-t border-yellow-400/20 pt-4 mt-4">
                {/* Scan QR Code Option */}
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    startQRCodeScan();
                  }}
                  className="w-full neom-btn-glass neom-shrink-press p-4 justify-start space-x-3"
                >
                  <Camera className="w-5 h-5 text-yellow-400" />
                  <span className="neom-body text-sm">Scan QR Code</span>
                </Button>

                {/* Manual Booking ID Entry */}
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <Input
                      value={bookingIdInput}
                      onChange={(e) => setBookingIdInput(e.target.value)}
                      placeholder="Enter Booking ID"
                      className="neom-gradient-glass border border-cyan-400/30 text-black placeholder-gray-400"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        processBookingId();
                      }}
                      disabled={!bookingIdInput.trim() || isProcessingBookingId}
                      className="neom-btn-primary neom-shrink-press px-6"
                    >
                      {isProcessingBookingId ? (
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      ) : (
                        'Confirm'
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Face Recognition */}
        <Card 
          className="neom-card-glass neom-card-glass-hover border border-cyan-400/30 cursor-pointer"
          onClick={() => startBiometricCheckin('face')}
        >
          <CardContent className="p-6 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full neom-gradient-glass-cyan border border-cyan-400/50 flex items-center justify-center">
              <Scan className="w-10 h-10 text-cyan-300" />
            </div>
            <h4 className="neom-heading-neon text-lg mb-2">Face Recognition</h4>
            <p className="neom-body text-sm">Quick and secure check-in using your face</p>
          </CardContent>
        </Card>

        {/* Palm Recognition */}
        <Card 
          className="neom-card-glass neom-card-glass-hover border border-purple-400/30 cursor-pointer"
          onClick={() => startBiometricCheckin('palm')}
        >
          <CardContent className="p-6 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full neom-gradient-glass-purple border border-purple-400/50 flex items-center justify-center">
              <Hand className="w-10 h-10 text-purple-300" />
            </div>
            <h4 className="neom-heading-neon text-lg mb-2">Palm Recognition</h4>
            <p className="neom-body text-sm">Touch-free palm scanning technology</p>
          </CardContent>
        </Card>
      </div>

      {/* Biometric Scanning Modal */}
      {biometricScanning && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
          <Card className="neom-card-glass border border-cyan-400/50 max-w-sm mx-4">
            <CardContent className="p-8 text-center">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full neom-gradient-glass-cyan border-4 border-cyan-400/50 flex items-center justify-center relative">
                {biometricType === 'face' ? (
                  <Scan className="w-16 h-16 text-cyan-300 animate-pulse" />
                ) : (
                  <Hand className="w-16 h-16 text-purple-300 animate-pulse" />
                )}
                <div className="absolute inset-0 rounded-full animate-ping border-2 border-cyan-400/30"></div>
              </div>
              <h3 className="neom-heading-neon text-xl mb-2">Scanning...</h3>
              <p className="neom-body">
                {biometricType === 'face' 
                  ? 'Please look directly at the camera' 
                  : 'Please hold your palm steady'
                }
              </p>
              <Progress value={66} className="mt-4" />
            </CardContent>
          </Card>
        </div>
      )}

      {/* QR Code Scanning Modal */}
      {isQRScanning && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
          <Card className="neom-card-glass border border-yellow-400/50 max-w-sm mx-4">
            <CardContent className="p-8 text-center">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full neom-gradient-glass-yellow border-4 border-yellow-400/50 flex items-center justify-center relative">
                <Camera className="w-16 h-16 text-yellow-400 animate-pulse" />
                <div className="absolute inset-0 rounded-full animate-ping border-2 border-yellow-400/30"></div>
              </div>
              <h3 className="neom-heading-neon text-xl mb-2">Scanning QR Code...</h3>
              <p className="neom-body">
                Please point your camera at the QR code
              </p>
              <Progress value={45} className="mt-4" />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );

  // Check-in Payment Screen
  const renderCheckinPaymentScreen = () => (
    <div className="p-6 pb-24 space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button onClick={() => navigateToScreen('biometric-checkin')} className="neom-btn-glass neom-shrink-press">
          <ArrowRight className="w-5 h-5 rotate-180" />
        </Button>
        <h2 className="neom-heading-neon text-xl">Payment & Confirmation</h2>
      </div>

      <div className="text-center mb-6">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full neom-gradient-glass-emerald border border-emerald-400/50 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-emerald-300" />
        </div>
        <h3 className="neom-heading text-xl mb-2">Identity Verified</h3>
        <p className="neom-body">Biometric authentication successful</p>
      </div>

      <Card className="neom-card-glass border border-yellow-400/30">
        <CardHeader>
          <CardTitle className="neom-heading-neon">Booking Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="neom-body">Room</span>
            <span className="neom-mono-yellow">2501 - Executive Suite</span>
          </div>
          <div className="flex justify-between">
            <span className="neom-body">Dates</span>
            <span className="neom-mono-yellow">Dec 26 - Dec 30, 2024</span>
          </div>
          <div className="flex justify-between">
            <span className="neom-body">Guests</span>
            <span className="neom-mono-yellow">2 Adults</span>
          </div>
          <div className="border-t border-yellow-400/30 pt-3">
            <div className="flex justify-between">
              <span className="neom-heading">Total Amount</span>
              <span className="neom-mono-yellow text-xl font-bold">$1,850.00</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="neom-card-glass border border-purple-400/30">
        <CardHeader>
          <CardTitle className="neom-heading-neon">Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-3 p-3 rounded-xl neom-gradient-glass-purple border border-purple-400/30">
            <CreditCard className="w-6 h-6 text-purple-300" />
            <div>
              <p className="neom-heading text-sm">•••• •••• •••• 4242</p>
              <p className="neom-body text-xs">Expires 12/27</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button 
        onClick={processPayment} 
        disabled={paymentProcessing}
        className="w-full neom-btn-primary neom-shrink-press text-lg py-4"
      >
        {paymentProcessing ? (
          <>
            <Circle className="w-5 h-5 mr-2 animate-spin" />
            Processing Payment...
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5 mr-2" />
            Complete Check-In
          </>
        )}
      </Button>
    </div>
  );

  // Check-in Complete Screen
  const renderCheckinCompleteScreen = () => (
    <div className="p-6 pb-24 space-y-6">
      <div className="text-center mb-8">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full neom-gradient-glass-emerald border-4 border-emerald-400/50 flex items-center justify-center neom-glow-success">
          <CheckCircle className="w-12 h-12 text-emerald-300" />
        </div>
        <h2 className="neom-heading-neon text-2xl mb-2">Booking Confirmed!</h2>
        <p className="neom-body">Digital Key issued successfully</p>
      </div>

      <Card className="neom-card-glass border border-yellow-400/30">
        <CardContent className="p-6 text-center">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full neom-gradient-glass-yellow border border-yellow-400/50 flex items-center justify-center neom-glow-yellow">
            <QrCode className="w-16 h-16 text-yellow-400" />
          </div>
          <h3 className="neom-heading-neon text-xl mb-2">Digital Key Ready</h3>
          <p className="neom-body mb-4">Room 1205 · Floor 12</p>
          <Button 
            onClick={() => navigateToScreen('digital-key')}
            className="neom-btn-primary neom-shrink-press"
          >
            <Lock className="w-4 h-4 mr-2" />
            Access Room Controls
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h4 className="neom-heading-neon">Quick Setup</h4>
        <Card className="neom-card-glass border border-cyan-400/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Thermometer className="w-5 h-5 text-cyan-300" />
                <span className="neom-body">Set room temperature</span>
              </div>
              <span className="neom-mono-yellow">{roomTemp[0]}°C</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="neom-card-glass border border-purple-400/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Lightbulb className="w-5 h-5 text-purple-300" />
                <span className="neom-body">Configure lighting</span>
              </div>
              <Switch checked={lights} onCheckedChange={setLights} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Button 
        onClick={navigateBack}
        className="w-full neom-btn-glass neom-shrink-press"
      >
        <Home className="w-5 h-5 mr-2" />
        Go to Dashboard
      </Button>
    </div>
  );

  // Digital Key Screen
  const renderDigitalKeyScreen = () => (
    <div className="p-6 pb-24 space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button onClick={navigateBack} className="neom-btn-glass neom-shrink-press">
          <ArrowRight className="w-5 h-5 rotate-180" />
        </Button>
        <h2 className="neom-heading-neon text-xl">Digital Key</h2>
      </div>

      {/* Digital Key Status */}
      <Card className="neom-card-glass neom-card-glass-hover border border-yellow-400/30 overflow-hidden relative">
        {/* Floating decorative elements */}
        <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-yellow-400/20 to-purple-600/20 rounded-full blur-lg neom-float"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 bg-gradient-to-br from-cyan-400/20 to-emerald-400/20 rounded-full blur-md neom-float" style={{ animationDelay: '1s' }}></div>
        
        <CardContent className="p-8 text-center relative z-10">
          {/* Enhanced Digital Key Visual */}
          <div className="relative mx-auto w-32 h-32 mb-6">
            {/* Outer orbital rings */}
            <div className="absolute inset-0 rounded-full border-2 border-yellow-400/30 animate-spin" style={{ animationDuration: '15s' }}></div>
            <div className="absolute inset-2 rounded-full border border-cyan-400/30 animate-spin" style={{ animationDuration: '10s', animationDirection: 'reverse' }}></div>
            
            {/* Main key circle */}
            <div className={`absolute inset-4 rounded-full flex items-center justify-center transition-all duration-500 ${
              digitalKeyActive 
                ? 'neom-gradient-glass-emerald neom-glow-success border-2 border-emerald-400/50' 
                : 'neom-gradient-glass-yellow neom-glow-yellow border-2 border-yellow-400/50'
            }`}>
              <div className="relative">
                {digitalKeyActive ? (
                  <Unlock className="w-16 h-16 text-emerald-300 animate-pulse" />
                ) : (
                  <Lock className="w-16 h-16 text-yellow-400 animate-pulse" />
                )}
                {/* Key animation effect */}
                <div className={`absolute -inset-2 rounded-full border-2 animate-ping ${
                  digitalKeyActive ? 'border-emerald-400/30' : 'border-yellow-400/30'
                }`}></div>
              </div>
            </div>
            
            {/* Status indicator dots */}
            <div className={`absolute top-0 left-1/2 w-3 h-3 rounded-full -translate-x-1/2 animate-pulse ${
              digitalKeyActive ? 'bg-emerald-400' : 'bg-yellow-400'
            }`}></div>
            <div className={`absolute bottom-0 left-1/2 w-3 h-3 rounded-full -translate-x-1/2 animate-pulse ${
              digitalKeyActive ? 'bg-emerald-400' : 'bg-yellow-400'
            }`} style={{ animationDelay: '0.5s' }}></div>
          </div>
          
          <h3 className="neom-heading-neon text-2xl mb-2 bg-gradient-to-r from-yellow-400 to-cyan-400 bg-clip-text text-transparent">
            Room 1205 · Floor 12
          </h3>
          
          {/* Key Status */}
          <div className="mb-6">
            <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-2 transition-all duration-300 ${
              digitalKeyActive 
                ? 'bg-emerald-400/20 border border-emerald-400/40' 
                : 'bg-yellow-400/20 border border-yellow-400/40'
            }`}>
              <div className={`w-2 h-2 rounded-full animate-pulse ${
                digitalKeyActive ? 'bg-emerald-400' : 'bg-yellow-400'
              }`}></div>
              <span className={`neom-body text-sm font-medium ${
                digitalKeyActive ? 'text-emerald-300' : 'text-yellow-300'
              }`}>
                {digitalKeyActive ? 'Key Active • Unlocked' : 'Key Inactive • Locked'}
              </span>
            </div>
            <p className="neom-body text-sm opacity-80">
              {digitalKeyActive 
                ? 'Your room is unlocked and ready to access' 
                : 'Tap to unlock your room with digital key'
              }
            </p>
          </div>
          
          {/* Enhanced Action Button */}
          <Button 
            onClick={() => setDigitalKeyActive(!digitalKeyActive)}
            className={`w-full py-4 text-lg relative overflow-hidden group transition-all duration-300 ${
              digitalKeyActive 
                ? 'neom-btn-glass hover:bg-red-400/10 hover:border-red-400/50' 
                : 'neom-btn-primary neom-glow-yellow'
            } neom-shrink-press`}
          >
            {/* Button background animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            
            <div className="relative z-10 flex items-center justify-center space-x-3">
              {digitalKeyActive ? (
                <>
                  <Lock className="w-6 h-6 text-red-300 group-hover:scale-110 transition-transform duration-200" />
                  <span className="group-hover:text-red-300 transition-colors duration-200">Lock Room</span>
                </>
              ) : (
                <>
                  <Unlock className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                  <span>Unlock Room</span>
                </>
              )}
            </div>
          </Button>
        </CardContent>
      </Card>

      {/* Room Controls - Only show when key is active */}
      {digitalKeyActive && (
        <>
          {/* Temperature Control */}
          <Card className="neom-card-glass border border-cyan-400/30">
            <CardHeader>
              <CardTitle className="neom-heading-neon flex items-center">
                <Thermometer className="w-5 h-5 mr-2 text-cyan-300" />
                Temperature
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="neom-body">Room Temperature</span>
                <div className="flex items-center space-x-2">
                  <Button 
                    size="sm" 
                    onClick={() => setRoomTemp([Math.max(16, roomTemp[0] - 1)])}
                    className="neom-btn-glass w-8 h-8 p-0"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="neom-mono-yellow text-lg w-16 text-center">{roomTemp[0]}°C</span>
                  <Button 
                    size="sm" 
                    onClick={() => setRoomTemp([Math.min(30, roomTemp[0] + 1)])}
                    className="neom-btn-glass w-8 h-8 p-0"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <Slider
                value={roomTemp}
                onValueChange={setRoomTemp}
                max={30}
                min={16}
                step={1}
                className="w-full"
              />
              <div className="flex items-center justify-between">
                <span className="neom-body">AC Mode</span>
                <Switch checked={ac} onCheckedChange={setAc} />
              </div>
            </CardContent>
          </Card>

          {/* Lighting Control */}
          <Card className="neom-card-glass border border-purple-400/30">
            <CardHeader>
              <CardTitle className="neom-heading-neon flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-purple-300" />
                Lighting
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="neom-body">Main Lights</span>
                <Switch checked={lights} onCheckedChange={setLights} />
              </div>
              {lights && (
                <>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="neom-body text-sm">Brightness</span>
                      <span className="neom-mono-yellow text-sm">{lightBrightness[0]}%</span>
                    </div>
                    <Slider
                      value={lightBrightness}
                      onValueChange={setLightBrightness}
                      max={100}
                      min={0}
                      step={5}
                      className="w-full"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Button size="sm" className="neom-btn-glass text-xs">
                      <Sun className="w-3 h-3 mr-1" />
                      Bright
                    </Button>
                    <Button size="sm" className="neom-btn-glass text-xs">
                      Warm
                    </Button>
                    <Button size="sm" className="neom-btn-glass text-xs">
                      Cool
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Blinds & Privacy */}
          <Card className="neom-card-glass border border-emerald-400/30">
            <CardHeader>
              <CardTitle className="neom-heading-neon flex items-center">
                <Home className="w-5 h-5 mr-2 text-emerald-300" />
                Privacy & Blinds
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="neom-body">Automated Blinds</span>
                <Switch checked={blinds} onCheckedChange={setBlinds} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button className="neom-btn-glass neom-shrink-press">
                  <Eye className="w-4 h-4 mr-2" />
                  Open
                </Button>
                <Button className="neom-btn-glass neom-shrink-press">
                  <Shield className="w-4 h-4 mr-2" />
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Music Control */}
          <Card className="neom-card-glass border border-orange-400/30">
            <CardHeader>
              <CardTitle className="neom-heading-neon flex items-center">
                <Music className="w-5 h-5 mr-2 text-orange-300" />
                Music & Audio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="neom-body">Background Music</span>
                <Button 
                  size="sm"
                  onClick={() => setMusicPlaying(!musicPlaying)}
                  className={musicPlaying ? 'neom-btn-primary' : 'neom-btn-glass'}
                >
                  {musicPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
              </div>
              {musicPlaying && (
                <>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="neom-body text-sm">Volume</span>
                      <span className="neom-mono-yellow text-sm">{musicVolume[0]}%</span>
                    </div>
                    <Slider
                      value={musicVolume}
                      onValueChange={setMusicVolume}
                      max={100}
                      min={0}
                      step={5}
                      className="w-full"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Button size="sm" className="neom-btn-glass text-xs">
                      Ambient
                    </Button>
                    <Button size="sm" className="neom-btn-glass text-xs">
                      Jazz
                    </Button>
                    <Button size="sm" className="neom-btn-glass text-xs">
                      Classical
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Eco Mode */}
          <Card className="neom-card-glass border border-yellow-400/30">
            <CardHeader>
              <CardTitle className="neom-heading-neon flex items-center">
                <Leaf className="w-5 h-5 mr-2 text-yellow-400" />
                Eco Mode
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="neom-body">Energy Optimization</p>
                  <p className="neom-body text-xs opacity-70">Automatically optimize energy usage</p>
                  <p className="neom-body text-xs opacity-80 mt-1 text-yellow-300">
                    💎 Enable ECO Mode to earn loyalty points
                  </p>
                </div>
                <Switch checked={ecoMode} onCheckedChange={setEcoMode} />
              </div>
              {ecoMode && (
                <div className="mt-4 p-3 rounded-xl neom-gradient-glass-emerald border border-emerald-400/30">
                  <p className="neom-body text-sm text-emerald-300">
                    ✓ Eco mode active - Saving 23% energy
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );

  // Service AI Helper Functions
  const sendServiceAiMessage = async (serviceKey: string, serviceType: string, message: string) => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user' as const,
      message: message.trim(),
      timestamp: new Date().toISOString()
    };
    
    setServiceAIChatMessages(prev => ({
      ...prev,
      [serviceKey]: [...(prev[serviceKey] || []), userMessage]
    }));

    // Simulate AI processing delay
    setTimeout(() => {
      const aiResponse = generateServiceAiResponse(serviceType, message.trim());
      const aiMessage = {
        id: Date.now() + 1,
        sender: 'ai' as const,
        message: aiResponse,
        timestamp: new Date().toISOString()
      };
      
      setServiceAIChatMessages(prev => ({
        ...prev,
        [serviceKey]: [...(prev[serviceKey] || [userMessage]), aiMessage]
      }));
    }, 1000 + Math.random() * 500);
  };

  const generateServiceAiResponse = (serviceType: string, userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    switch (serviceType) {
      case 'dining':
        if (message.includes('menu') || message.includes('what') && message.includes('food')) {
          return "Today's menu features:\n\n🍽️ **Appetizers:**\n• Mediterranean Mezze Platter - $18\n• Fresh Oysters (6 pieces) - $24\n• Truffle Arancini - $16\n\n🥩 **Main Courses:**\n• Wagyu Beef Tenderloin - $85\n• Pan-Seared Halibut - $42\n• Vegetarian Risotto - $28\n\n🍰 **Desserts:**\n• Chocolate Lava Cake - $14\n• Tiramisu - $12\n\nWould you like me to make a reservation or tell you more about any dish?";
        }
        if (message.includes('book') || message.includes('table') || message.includes('reservation')) {
          return "Perfect! I can help you book a table.\n\n📅 **Available times today:**\n• 7:00 PM - Terrace seating\n• 8:30 PM - Main dining room\n• 9:15 PM - Private booth\n\n👥 **For how many guests?**\n• Table for 2: Romantic window seating available\n• Table for 4+: Round table with city view\n\nShall I reserve the 8:00 PM slot for 2 guests? I'll need to know any dietary preferences.";
        }
        if (message.includes('chef') || message.includes('special')) {
          return "Tonight's Chef Specials:\n\n⭐ **Chef's Signature:**\n• NEOM Seafood Tower - Fresh lobster, prawns, and local catch ($95)\n• Desert Spiced Lamb - Traditional Bedouin preparation ($78)\n\n🌟 **Today's Features:**\n• Catch of the Day - Red Sea Grouper with saffron sauce\n• Vegetarian Tasting Menu - 5 courses showcasing local ingredients\n\nOur head chef, Maria Santos, has 15 years of experience and specializes in fusion Mediterranean-Middle Eastern cuisine. Would you like me to arrange a chef's table experience?";
        }
        break;

      case 'wellness':
        if (message.includes('spa') || message.includes('treatment') || message.includes('massage')) {
          return "Available spa treatments today:\n\n💆‍♀️ **Massages:**\n• Deep Tissue Massage (60 min) - $120\n• Hot Stone Therapy (90 min) - $180\n• Couples Massage Suite - $350\n\n🧖‍♀️ **Facials:**\n• Hydrating Facial (45 min) - $95\n• Anti-aging Treatment (75 min) - $140\n\n🛁 **Spa Packages:**\n• Full Day Wellness (4 hours) - $295\n• Detox & Renewal (3 hours) - $220\n\nWe have availability at 2:00 PM and 4:30 PM today. Which treatment interests you?";
        }
        if (message.includes('yoga') || message.includes('fitness') || message.includes('gym')) {
          return "Fitness & Wellness Schedule:\n\n🧘‍♀️ **Today's Classes:**\n• 6:00 AM - Sunrise Yoga (Rooftop)\n• 8:00 AM - HIIT Training (Gym)\n• 6:00 PM - Sunset Meditation (Pool Deck)\n• 7:30 PM - Aqua Fitness (Pool)\n\n🏋️‍♂️ **Gym Access:**\n• 24/7 access with room key\n• Personal trainer available 6 AM - 10 PM\n• Equipment: Cardio, weights, functional training\n\n📍 **Locations:**\n• Gym: 3rd Floor\n• Yoga Studio: 2nd Floor\n• Pool Classes: 5th Floor Pool Deck\n\nWould you like me to book you a spot in any class or schedule a personal training session?";
        }
        if (message.includes('gym') || message.includes('where') || message.includes('location')) {
          return "Gym & Wellness Locations:\n\n🏋️‍♂️ **Fitness Center** - 3rd Floor\n• 24/7 access with room key\n• Cardio machines with ocean view\n• Free weights & resistance equipment\n• Changing rooms with lockers\n\n🧘‍♀��� **Yoga Studio** - 2nd Floor  \n• Daily classes from 6 AM\n• Meditation corner\n• Equipment provided\n\n💆‍♀️ **Spa & Wellness** - 2nd Floor\n• 5 treatment rooms\n• Relaxation lounge\n• Steam room & sauna\n\n🏊‍♂️ **Pool Area** - 5th Floor\n• Infinity pool with city views\n• Pool bar and loungers\n• Aqua fitness classes\n\nTake the main elevator to any floor. Need directions to a specific area?";
        }
        break;

      case 'transportation':
        if (message.includes('airport') || message.includes('shuttle')) {
          return "Airport Transportation Options:\n\n🚌 **Hotel Shuttle** (Complimentary)\n• Departure times: Every 30 minutes\n• Journey time: 45 minutes\n• Next departures: 2:30 PM, 3:00 PM, 3:30 PM\n• Pickup: Main entrance\n\n🚗 **Private Transfer** ($65)\n• Available 24/7\n• Luxury sedan with WiFi\n• Journey time: 35 minutes\n• Can be ready in 15 minutes\n\n✈️ **Express Service** ($95)\n• Premium vehicle\n• Meet & greet at airport\n• Journey time: 30 minutes\n\nWhich option would you prefer? I can book any of these for you right now.";
        }
        if (message.includes('city') || message.includes('downtown') || message.includes('transport')) {
          return "City Transportation Services:\n\n🚖 **Taxi Service**\n• Available 24/7 at main entrance\n• Metered rates to city center (~$25)\n• Average wait time: 5-10 minutes\n\n🚗 **Hotel Car Service**\n• Premium vehicles with driver\n• Hourly rates: $45/hour (3-hour minimum)\n• Popular destinations: Old Town, Marina, Shopping District\n\n🚌 **Public Transport**\n• Metro station: 8-minute walk\n• Bus stop: 3-minute walk\n• Day pass available at concierge\n\n🏃‍♂️ **Walking Distance:**\n• Marina Walk: 10 minutes\n• Shopping Mall: 15 minutes\n• City Beach: 12 minutes\n\nWhere would you like to go? I can arrange the best transport option for you.";
        }
        break;

      case 'business':
        if (message.includes('conference') || message.includes('meeting') || message.includes('room')) {
          return "Conference Room Availability:\n\n🏢 **Today's Available Rooms:**\n\n**Meeting Room A** (4th Floor)\n• Capacity: 8 people\n• Equipment: 55\" display, video conferencing\n• Available: 2:00 PM - 6:00 PM\n• Rate: $75/hour\n\n**Boardroom Executive** (4th Floor)\n• Capacity: 12 people\n• Equipment: Projection system, whiteboard\n• Available: 10:00 AM - 2:00 PM\n• Rate: $120/hour\n\n**Conference Hall** (4th Floor)\n• Capacity: 25 people\n• Equipment: Full AV setup, catering option\n• Available: 6:00 PM - 9:00 PM\n• Rate: $200/hour\n\n📋 **Included Services:**\n• WiFi, stationery, water service\n�� Technical support available\n\nWhich room would work best for your meeting? I can book it immediately.";
        }
        break;

      case 'events':
        if (message.includes('space') || message.includes('available') || message.includes('venue')) {
          return "Event Spaces Available Tomorrow:\n\n🎉 **Ballroom Grande** (2nd Floor)\n• Capacity: 200 guests\n• Features: Dance floor, stage, premium AV\n• Available: 6:00 PM - 12:00 AM\n• Rate: $2,500 (includes basic setup)\n\n🌅 **Rooftop Terrace** (25th Floor)\n• Capacity: 80 guests\n• Features: City views, outdoor kitchen, bar\n• Available: 4:00 PM - 11:00 PM\n• Rate: $1,800 (weather permitting)\n\n🏛️ **Garden Pavilion** (Ground Floor)\n• Capacity: 120 guests\n• Features: Garden setting, covered area\n• Available: All day\n• Rate: $1,200\n\n📋 **Event Services Included:**\n• Event coordinator, basic lighting, sound system\n• Tables, chairs, linens\n• Security and valet parking\n\nWhat type of event are you planning? I can provide a detailed quote.";
        }
        break;

      default:
        return "I'm here to help with your service needs! Ask me about availability, bookings, recommendations, or any specific requirements you might have.";
    }

    return "I'd be happy to help! Could you be more specific about what you're looking for?";
  };

  const openArVrPreview = (type: 'ar' | 'vr', service: string) => {
    setArvrPreview({ active: true, type, service });
    // Simulate AR/VR preview loading
    setTimeout(() => {
      console.log(`Opening ${type.toUpperCase()} preview for ${service}`);
    }, 1000);
  };

  // AI Chat Helper Functions
  const sendAiMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      sender: 'user' as const,
      message: message.trim(),
      timestamp: new Date().toISOString()
    };
    
    setAiChatMessages(prev => [...prev, userMessage]);
    setAiInputMessage('');
    setIsTyping(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const aiResponse = generateAiResponse(message.trim());
      const aiMessage = {
        id: Date.now() + 1,
        sender: 'ai' as const,
        message: aiResponse,
        timestamp: new Date().toISOString()
      };
      
      setAiChatMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // Random delay 1.5-2.5s
  };

  const generateAiResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Movie use case
    if (message.includes('movie') || message.includes('watch') || message.includes('film')) {
      return "Sure! Here are today's available movies:\n\n🎬 **Premium Selection:**\n• Avatar: The Way of Water (2022)\n• Top Gun: Maverick (2022) \n• Black Panther: Wakanda Forever (2022)\n• Dune (2021)\n• Spider-Man: No Way Home (2021)\n\n💰 All movies are $15.99 and will be added to your room bill. Would you like me to start one of these for you?";
    }
    
    // Transportation use case
    if (message.includes('taxi') || message.includes('airport') || message.includes('transport') || message.includes('ride') || message.includes('car')) {
      return "No problem! I can help you with transportation to the airport:\n\n🚗 **Hotel Premium Taxi**\n• Luxury vehicle with WiFi\n• 45 minutes to airport\n• $75 USD - charged to room\n\n🚕 **Local Partner (Uber)**\n• Standard ride\n• 40-50 minutes to airport  \n• $45-65 USD - pay directly\n\nWhich option would you prefer? I can book either one for you right now.";
    }
    
    // Pillows use case
    if (message.includes('pillow') || message.includes('extra pillow') || message.includes('more pillow')) {
      return `Perfect! I've noted your request for extra pillows.\n\n✅ **Request Confirmed:**\n• 2 additional pillows\n• Delivery to Room 1205 · Floor 12\n• Estimated arrival: 15-20 minutes\n\nHousekeeping will deliver them shortly. Is there anything else you'd like for your room comfort?`;
    }
    
    // Default responses for other queries
    const responses = [
      "I'm here to help with your NEOM experience! You can ask me about room service, transportation, hotel amenities, or any special requests.",
      "How can I make your stay more comfortable? I can assist with dining reservations, spa bookings, transportation, or room preferences.",
      "I'd be happy to help! Try asking me about movies, transportation to the airport, or room amenities like extra pillows.",
      "As your AI concierge, I can help with various services. What would you like assistance with today?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const startVoiceRecording = () => {
    setIsVoiceRecording(true);
    // Simulate voice recording
    setTimeout(() => {
      setIsVoiceRecording(false);
      // Simulate voice-to-text result
      const voiceMessages = [
        "I want to watch a movie",
        "I need a taxi to the airport", 
        "Can I get extra pillows?"
      ];
      const randomMessage = voiceMessages[Math.floor(Math.random() * voiceMessages.length)];
      sendAiMessage(randomMessage);
    }, 3000);
  };

  // Service AR/VR Preview Screen
  const renderServiceArVrPreviewScreen = () => (
    <div className="flex flex-col h-screen bg-black">
      {/* Header */}
      <div className="flex items-center space-x-4 p-6 border-b border-yellow-400/20">
        <Button onClick={() => setArvrPreview({active: false, type: '', service: ''})} className="neom-btn-glass neom-shrink-press">
          <ArrowRight className="w-5 h-5 rotate-180" />
        </Button>
        <div className="flex items-center space-x-3">
          {arvrPreview.type === 'ar' ? (
            <Camera className="w-8 h-8 text-cyan-400 animate-pulse" />
          ) : (
            <Headphones className="w-8 h-8 text-purple-400 animate-pulse" />
          )}
          <div>
            <h2 className="neom-heading-neon text-xl">
              {arvrPreview.type.toUpperCase()} Preview
            </h2>
            <p className="neom-body text-sm">{arvrPreview.service}</p>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 relative overflow-hidden">
        {/* Simulated AR/VR Environment */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-yellow-900/20">
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-6">
              {/* Loading Animation */}
              <div className="relative mx-auto w-32 h-32">
                <div className="absolute inset-0 border-4 border-cyan-400/30 rounded-full animate-spin"></div>
                <div className="absolute inset-4 border-4 border-purple-400/50 rounded-full animate-spin animation-delay-75"></div>
                <div className="absolute inset-8 border-4 border-yellow-400/70 rounded-full animate-spin animation-delay-150"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  {arvrPreview.type === 'ar' ? (
                    <Camera className="w-12 h-12 text-cyan-400" />
                  ) : (
                    <Headphones className="w-12 h-12 text-purple-400" />
                  )}
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="neom-heading-neon text-2xl">
                  {arvrPreview.type === 'ar' ? 'Augmented Reality' : 'Virtual Reality'} Preview
                </h3>
                <p className="neom-body text-lg">
                  Immersive {arvrPreview.service} Experience
                </p>
                <div className="flex items-center justify-center space-x-2 mt-4">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <p className="neom-body text-sm opacity-70">
                  {arvrPreview.type === 'ar' 
                    ? 'Point your device camera to explore the space in augmented reality'
                    : 'Put on VR headset for immersive 360° virtual tour'
                  }
                </p>
              </div>

              {/* Mock Features */}
              <div className="grid grid-cols-2 gap-4 mt-8 max-w-md mx-auto">
                <div className="p-4 rounded-xl neom-gradient-glass-cyan border border-cyan-400/30">
                  <Eye className="w-6 h-6 text-cyan-300 mx-auto mb-2" />
                  <p className="neom-body text-xs">360° View</p>
                </div>
                <div className="p-4 rounded-xl neom-gradient-glass-purple border border-purple-400/30">
                  <MousePointer className="w-6 h-6 text-purple-300 mx-auto mb-2" />
                  <p className="neom-body text-xs">Interactive</p>
                </div>
                <div className="p-4 rounded-xl neom-gradient-glass-yellow border border-yellow-400/30">
                  <MapPin className="w-6 h-6 text-yellow-300 mx-auto mb-2" />
                  <p className="neom-body text-xs">Navigation</p>
                </div>
                <div className="p-4 rounded-xl neom-gradient-glass-emerald border border-emerald-400/30">
                  <Info className="w-6 h-6 text-emerald-300 mx-auto mb-2" />
                  <p className="neom-body text-xs">Details</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Overlay */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex justify-center space-x-4">
            <Button className="neom-btn-glass neom-shrink-press">
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset View
            </Button>
            <Button className="neom-btn-primary neom-shrink-press">
              <Heart className="w-5 h-5 mr-2" />
              Save Tour
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  // Service AI Chat Screen
  const renderServiceAiChatScreen = () => {
    const serviceKey = activeServiceAI || '';
    const messages = serviceAIChatMessages[serviceKey] || [];
    
    return (
      <div className="flex flex-col h-screen bg-black/95">
        {/* Header */}
        <div className="flex items-center space-x-4 p-6 border-b border-yellow-400/20">
          <Button onClick={() => setActiveServiceAI(null)} className="neom-btn-glass neom-shrink-press">
            <ArrowRight className="w-5 h-5 rotate-180" />
          </Button>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full neom-gradient-glass-cyan border border-cyan-400/50 flex items-center justify-center">
              <MessageCircle className="w-7 h-7 text-cyan-300 animate-pulse" />
            </div>
            <div>
              <h2 className="neom-heading-neon text-xl">Service Assistant</h2>
              <p className="neom-body text-sm">{serviceKey.charAt(0).toUpperCase() + serviceKey.slice(1)} Support</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto pb-24">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <MessageCircle className="w-12 h-12 text-cyan-300 mx-auto mb-4 opacity-50" />
              <p className="neom-body">Ask me anything about {serviceKey} services!</p>
            </div>
          )}
          
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} neom-fade-in`}>
              <div className={`max-w-[85%] p-4 rounded-2xl relative ${
                msg.sender === 'user' 
                  ? 'neom-gradient-glass-yellow border border-yellow-400/30 bg-yellow-400/5' 
                  : 'neom-gradient-glass-cyan border border-cyan-400/30 bg-cyan-400/5'
              }`}>
                {msg.sender === 'ai' && (
                  <div className="absolute -left-3 top-4 w-8 h-8 rounded-full neom-gradient-glass-cyan border border-cyan-400/50 flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-cyan-300" />
                  </div>
                )}
                
                <div className="whitespace-pre-line">
                  <p className="neom-body text-sm leading-relaxed">{msg.message}</p>
                </div>
                <p className="neom-mono text-xs mt-3 opacity-60">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Section */}
        <div className="p-4 border-t border-yellow-400/20">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <Input
                placeholder={`Ask about ${serviceKey} services...`}
                className="neom-gradient-glass border border-cyan-400/30 text-black placeholder-gray-400 py-3"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const message = (e.target as HTMLInputElement).value;
                    if (message.trim()) {
                      sendServiceAiMessage(serviceKey, serviceKey, message);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // AI Concierge Screen
  const renderAiConciergeScreen = () => (
    <div className="flex flex-col h-screen bg-black/95">
      {/* Enhanced Header with ARIA Avatar */}
      <div className="flex items-center space-x-4 p-6 border-b border-yellow-400/20">
        <Button onClick={navigateBack} className="neom-btn-glass neom-shrink-press">
          <ArrowRight className="w-5 h-5 rotate-180" />
        </Button>
        <div className="flex items-center space-x-4">
          {/* Enhanced ARIA Avatar */}
          <div className="relative">
            <div className="w-12 h-12 rounded-full neom-gradient-glass-purple border border-purple-400/50 flex items-center justify-center">
              <Bot className="w-7 h-7 text-purple-300 animate-pulse" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-black animate-pulse"></div>
          </div>
          <div>
            <h2 className="neom-heading-neon text-xl">ARIA</h2>
            <p className="neom-body text-sm">AI Concierge • Online</p>
          </div>
        </div>
      </div>

      {/* Enhanced Chat Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto pb-24">
        {aiChatMessages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} neom-fade-in`}>
            <div className={`max-w-[85%] p-4 rounded-2xl relative ${
              msg.sender === 'user' 
                ? 'neom-gradient-glass-yellow border border-yellow-400/30 bg-yellow-400/5' 
                : 'neom-gradient-glass-purple border border-purple-400/30 bg-purple-400/5'
            }`}>
              {/* Avatar for AI messages */}
              {msg.sender === 'ai' && (
                <div className="absolute -left-3 top-4 w-8 h-8 rounded-full neom-gradient-glass-purple border border-purple-400/50 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-purple-300" />
                </div>
              )}
              
              <div className="whitespace-pre-line">
                <p className="neom-body text-sm leading-relaxed">{msg.message}</p>
              </div>
              <p className="neom-mono text-xs mt-3 opacity-60">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start neom-fade-in">
            <div className="max-w-[85%] p-4 rounded-2xl neom-gradient-glass-purple border border-purple-400/30 bg-purple-400/5 relative">
              <div className="absolute -left-3 top-4 w-8 h-8 rounded-full neom-gradient-glass-purple border border-purple-400/50 flex items-center justify-center">
                <Bot className="w-4 h-4 text-purple-300 animate-pulse" />
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <span className="neom-body text-sm text-purple-300">ARIA is typing...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Input Section with Voice Support */}
      <div className="p-4 border-t border-yellow-400/20">
        <div className="flex items-center space-x-3">
          {/* Voice Recording Button */}
          <Button 
            onClick={startVoiceRecording}
            disabled={isVoiceRecording}
            className={`p-3 rounded-full neom-btn-glass neom-shrink-press ${
              isVoiceRecording ? 'bg-red-500/20 border-red-400/50' : ''
            }`}
          >
            {isVoiceRecording ? (
              <MicOff className="w-5 h-5 text-red-400 animate-pulse" />
            ) : (
              <Mic className="w-5 h-5 text-purple-300" />
            )}
          </Button>
          
          {/* Text Input */}
          <div className="flex-1 relative">
            <Input
              value={aiInputMessage}
              onChange={(e) => setAiInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendAiMessage(aiInputMessage)}
              placeholder={isVoiceRecording ? "Listening..." : "Ask ARIA anything..."}
              disabled={isVoiceRecording}
              className="neom-gradient-glass border border-cyan-400/30 text-black placeholder-gray-400 pr-12 py-3"
            />
          </div>
          
          {/* Send Button */}
          <Button 
            onClick={() => sendAiMessage(aiInputMessage)}
            disabled={!aiInputMessage.trim() || isVoiceRecording}
            className="neom-btn-primary neom-shrink-press p-3"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Voice Recording Indicator */}
        {isVoiceRecording && (
          <div className="mt-3 flex items-center justify-center space-x-2 neom-fade-in">
            <div className="flex space-x-1">
              <div key="bar-0" className="w-2 h-6 bg-red-400 rounded animate-pulse"></div>
              <div key="bar-1" className="w-2 h-8 bg-red-400 rounded animate-pulse" style={{ animationDelay: '0.1s' }}></div>
              <div key="bar-2" className="w-2 h-4 bg-red-400 rounded animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div key="bar-3" className="w-2 h-7 bg-red-400 rounded animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              <div key="bar-4" className="w-2 h-5 bg-red-400 rounded animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <span className="neom-body text-sm text-red-300 ml-3">Recording... Tap mic to stop</span>
          </div>
        )}
      </div>
    </div>
  );

  // Checkout Screen
  const renderCheckoutScreen = () => (
    <div className="p-6 pb-24 space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button onClick={navigateBack} className="neom-btn-glass neom-shrink-press">
          <ArrowRight className="w-5 h-5 rotate-180" />
        </Button>
        <h2 className="neom-heading-neon text-xl">Express Checkout</h2>
      </div>

      <Card className="neom-card-glass neom-card-glass-hover border border-emerald-400/30">
        <CardHeader>
          <CardTitle className="neom-heading-neon">Bill Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="neom-body">Room Charges</span>
            <span className="neom-mono-yellow">${checkoutData.roomCharges.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="neom-body">Food & Beverage</span>
            <span className="neom-mono-yellow">${checkoutData.foodAndBeverage.toFixed(2)}</span>
          </div>
          <div className="border-t border-yellow-400/30 pt-3">
            <div className="flex justify-between">
              <span className="neom-heading">Total</span>
              <span className="neom-mono-yellow text-xl font-bold">${checkoutData.total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button className="w-full neom-btn-primary neom-shrink-press text-lg py-4">
        <Receipt className="w-5 h-5 mr-2" />
        Complete Checkout
      </Button>
    </div>
  );

  // Enhanced Preferences Screen
  const renderPreferencesScreen = () => {
    const handleAllergyToggle = (allergy: string) => {
      setGuestPreferences(prev => ({
        ...prev,
        allergies: prev.allergies.includes(allergy)
          ? prev.allergies.filter(a => a !== allergy)
          : [...prev.allergies, allergy]
      }));
    };

    const handlePillowToggle = (pillow: string) => {
      setGuestPreferences(prev => ({
        ...prev,
        pillowPreferences: prev.pillowPreferences.includes(pillow)
          ? prev.pillowPreferences.filter(p => p !== pillow)
          : [...prev.pillowPreferences, pillow]
      }));
    };

    const getSelectedPreferenceSummary = () => {
      const summary = [];
      
      if (guestPreferences.allergies.length > 0) {
        guestPreferences.allergies.forEach(allergy => {
          summary.push({ id: `allergy-${allergy}`, label: `${allergy.charAt(0).toUpperCase() + allergy.slice(1)} Allergy`, type: 'allergy' });
        });
      }
      
      if (guestPreferences.pillowPreferences.length > 0) {
        guestPreferences.pillowPreferences.forEach(pillow => {
          summary.push({ id: `pillow-${pillow}`, label: `${pillow.charAt(0).toUpperCase() + pillow.slice(1)} Pillow`, type: 'pillow' });
        });
      }
      
      if (guestPreferences.staffPreference !== 'no-preference') {
        summary.push({ 
          id: 'staff-pref', 
          label: `${guestPreferences.staffPreference === 'male' ? 'Male' : 'Female'} Staff Preferred`, 
          type: 'staff' 
        });
      }
      
      if (guestPreferences.silentMode) {
        summary.push({ id: 'silent-mode', label: 'Silent Mode', type: 'silent' });
      }
      
      if (guestPreferences.travelingWithPets) {
        summary.push({ id: 'pets', label: 'Traveling with Pets', type: 'pets' });
      }
      
      if (guestPreferences.quietRoom) {
        summary.push({ id: 'quiet-room', label: 'Quiet Room Preference', type: 'room' });
      }
      
      if (guestPreferences.roomType !== 'deluxe') {
        const roomTypeLabels = {
          'standard': 'Standard Room',
          'suite': 'Suite',
          'presidential': 'Presidential Suite'
        };
        summary.push({ 
          id: 'room-type', 
          label: roomTypeLabels[guestPreferences.roomType] || 'Custom Room Type', 
          type: 'room' 
        });
      }
      
      return summary;
    };

    return (
      <div className="p-6 pb-24 space-y-6">
        <div className="flex items-center space-x-4 mb-6">
          <Button onClick={navigateBack} className="neom-btn-glass neom-shrink-press">
            <ArrowRight className="w-5 h-5 rotate-180" />
          </Button>
          <h2 className="neom-heading-neon text-xl">Preferences</h2>
        </div>

        {/* Room Environment Settings */}
        <Card className="neom-card-glass neom-card-glass-hover border border-cyan-400/30 neom-slide-in">
          <CardHeader>
            <CardTitle className="neom-heading-neon flex items-center">
              <Thermometer className="w-5 h-5 mr-2 text-cyan-300" />
              Room Environment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Room Temperature */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="neom-body text-sm">Room Temperature</p>
                <span className="neom-mono-yellow text-lg font-bold">{guestPreferences.roomTemperature}°C</span>
              </div>
              <Slider
                value={[guestPreferences.roomTemperature]}
                onValueChange={(value) => setGuestPreferences(prev => ({...prev, roomTemperature: value[0]}))}
                max={28}
                min={16}
                step={1}
                className="neom-slider"
              />
              <div className="flex justify-between text-xs opacity-60 mt-1">
                <span className="neom-body">16°C</span>
                <span className="neom-body">28°C</span>
              </div>
            </div>

            {/* Wake-up Time */}
            <div>
              <p className="neom-body text-sm mb-2">Wake-up Time</p>
              <Input
                type="time"
                value={guestPreferences.wakeUpTime}
                onChange={(e) => setGuestPreferences(prev => ({...prev, wakeUpTime: e.target.value}))}
                className="neom-gradient-glass border border-cyan-400/30 text-black"
              />
            </div>
          </CardContent>
        </Card>

        {/* Food & Dietary Preferences - Merged Section */}
        <Card className="neom-card-glass neom-card-glass-hover border border-emerald-400/30 neom-slide-in" style={{ animationDelay: '100ms' }}>
          <CardHeader>
            <CardTitle className="neom-heading-neon flex items-center">
              <ChefHat className="w-5 h-5 mr-2 text-emerald-300" />
              Food & Dietary Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Dietary Preference Section */}
            <div>
              <p className="neom-body text-sm mb-3">Dietary Preference</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'vegan', label: 'Vegan', icon: Apple },
                  { value: 'vegetarian', label: 'Vegetarian', icon: Wheat },
                  { value: 'non-vegetarian', label: 'Non-Veg', icon: ChefHat }
                ].map((diet) => (
                  <Button
                    key={diet.value}
                    onClick={() => setGuestPreferences(prev => ({...prev, dietaryPreference: diet.value}))}
                    className={`neom-btn-glass neom-shrink-press text-xs py-2 px-3 ${
                      guestPreferences.dietaryPreference === diet.value 
                        ? 'neom-gradient-glass-emerald border-emerald-400/50' 
                        : ''
                    }`}
                  >
                    <diet.icon className="w-4 h-4 mr-1" />
                    {diet.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Allergies Section */}
            <div>
              <p className="neom-body text-sm mb-3">Allergies (Select all that apply)</p>
              <div className="grid grid-cols-2 gap-2">
                {['peanut', 'gluten', 'lactose', 'shellfish', 'nuts', 'soy'].map((allergy) => (
                  <Button
                    key={allergy}
                    onClick={() => handleAllergyToggle(allergy)}
                    className={`neom-btn-glass neom-shrink-press text-xs py-2 px-3 justify-start ${
                      guestPreferences.allergies.includes(allergy)
                        ? 'neom-gradient-glass-orange border-orange-400/50' 
                        : ''
                    }`}
                  >
                    {guestPreferences.allergies.includes(allergy) ? (
                      <CheckCircle2 className="w-4 h-4 mr-2 text-orange-300" />
                    ) : (
                      <Circle className="w-4 h-4 mr-2" />
                    )}
                    {allergy.charAt(0).toUpperCase() + allergy.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Cuisine Preferences Section */}
            <div>
              <p className="neom-body text-sm mb-3">Preferred Cuisines</p>
              <p className="neom-body text-xs opacity-70 mb-3">
                Select your preferred cuisines to personalize your dining recommendations
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                {['Chinese', 'Mexican', 'Spanish', 'Italian', 'Other'].map((cuisine) => {
                  const isSelected = guestPreferences.foodPreferences.includes(cuisine);
                  
                  return (
                    <div
                      key={cuisine}
                      onClick={() => {
                        setGuestPreferences(prev => ({
                          ...prev,
                          foodPreferences: isSelected
                            ? prev.foodPreferences.filter(c => c !== cuisine)
                            : [...prev.foodPreferences, cuisine]
                        }));
                      }}
                      className={`p-3 rounded-xl neom-gradient-glass border cursor-pointer neom-transition neom-shrink-press ${
                        isSelected
                          ? 'border-emerald-400/60 bg-emerald-400/10 shadow-lg shadow-emerald-400/20'
                          : 'border-gray-600/30 hover:border-emerald-400/40'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            isSelected
                              ? 'bg-emerald-400/20 border border-emerald-400/50'
                              : 'bg-gray-600/20 border border-gray-600/30'
                          }`}>
                            <UtensilsCrossed className={`w-4 h-4 ${
                              isSelected ? 'text-emerald-400' : 'text-gray-400'
                            }`} />
                          </div>
                          <span className={`neom-body text-sm font-medium ${
                            isSelected ? 'text-emerald-300' : 'text-gray-300'
                          }`}>
                            {cuisine}
                          </span>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected
                            ? 'border-emerald-400 bg-emerald-400'
                            : 'border-gray-600'
                        }`}>
                          {isSelected && (
                            <CheckCircle2 className="w-3 h-3 text-black" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Other Food Preference Input */}
              {guestPreferences.foodPreferences.includes('Other') && (
                <div className="mt-3 neom-fade-in">
                  <label className="neom-body text-xs font-medium mb-2 block">
                    Specify Other Cuisines
                  </label>
                  <Input
                    value={guestPreferences.otherFoodPreference}
                    onChange={(e) => setGuestPreferences(prev => ({
                      ...prev,
                      otherFoodPreference: e.target.value
                    }))}
                    placeholder="E.g., Thai, Indian, Japanese..."
                    className="neom-gradient-glass border border-emerald-400/30 text-white placeholder-gray-400 focus:border-emerald-400/60 focus:ring-1 focus:ring-emerald-400/30 transition-all duration-200"
                  />
                </div>
              )}

              {/* Selected Cuisine Summary */}
              {guestPreferences.foodPreferences.length > 0 && (
                <div className="mt-3 p-3 rounded-xl neom-gradient-glass-emerald border border-emerald-400/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="neom-body text-xs font-medium text-emerald-300">
                      Selected Cuisines ({guestPreferences.foodPreferences.length})
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {guestPreferences.foodPreferences.map((cuisine) => (
                      <Badge 
                        key={cuisine}
                        className="bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 text-xs"
                      >
                        {cuisine}
                        {cuisine === 'Other' && guestPreferences.otherFoodPreference && `: ${guestPreferences.otherFoodPreference}`}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Additional Dietary Restrictions */}
            <div>
              <p className="neom-body text-sm mb-2">Additional Dietary Restrictions</p>
              <Textarea
                value={guestPreferences.generalDietaryRestrictions}
                onChange={(e) => setGuestPreferences(prev => ({...prev, generalDietaryRestrictions: e.target.value}))}
                placeholder="Any other dietary needs..."
                className="neom-gradient-glass border border-emerald-400/30 text-black placeholder-gray-400"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Pillow Preferences */}
        <Card className="neom-card-glass neom-card-glass-hover border border-purple-400/30 neom-slide-in" style={{ animationDelay: '200ms' }}>
          <CardHeader>
            <CardTitle className="neom-heading-neon flex items-center">
              <Bed className="w-5 h-5 mr-2 text-purple-300" />
              Pillow Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="neom-body text-sm mb-3">Select your preferred pillow type(s)</p>
            <div className="grid grid-cols-3 gap-3">
              {['soft', 'firm', 'hard'].map((pillow) => (
                <Button
                  key={pillow}
                  onClick={() => handlePillowToggle(pillow)}
                  className={`neom-btn-glass neom-shrink-press text-sm py-3 ${
                    guestPreferences.pillowPreferences.includes(pillow)
                      ? 'neom-gradient-glass-purple border-purple-400/50' 
                      : ''
                  }`}
                >
                  {guestPreferences.pillowPreferences.includes(pillow) ? (
                    <CheckCircle2 className="w-4 h-4 mr-2 text-purple-300" />
                  ) : (
                    <Circle className="w-4 h-4 mr-2" />
                  )}
                  {pillow.charAt(0).toUpperCase() + pillow.slice(1)}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Staff Preferences */}
        <Card className="neom-card-glass neom-card-glass-hover border border-cyan-400/30 neom-slide-in" style={{ animationDelay: '300ms' }}>
          <CardHeader>
            <CardTitle className="neom-heading-neon flex items-center">
              <Users2 className="w-5 h-5 mr-2 text-cyan-300" />
              Staff Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="neom-body text-sm mb-3">Preferred staff gender for room service</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'male', label: 'Male Staff', icon: UserCheck },
                { value: 'female', label: 'Female Staff', icon: UserCheck },
                { value: 'no-preference', label: 'No Preference', icon: Users2 }
              ].map((staff) => (
                <Button
                  key={staff.value}
                  onClick={() => setGuestPreferences(prev => ({...prev, staffPreference: staff.value}))}
                  className={`neom-btn-glass neom-shrink-press text-xs py-3 ${
                    guestPreferences.staffPreference === staff.value
                      ? 'neom-gradient-glass-cyan border-cyan-400/50' 
                      : ''
                  }`}
                >
                  <staff.icon className="w-4 h-4 mb-1" />
                  {staff.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Silent Mode */}
        <Card className="neom-card-glass neom-card-glass-hover border border-yellow-400/30 neom-slide-in" style={{ animationDelay: '400ms' }}>
          <CardHeader>
            <CardTitle className="neom-heading-neon flex items-center">
              <VolumeOff className="w-5 h-5 mr-2 text-yellow-400" />
              Silent Mode
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="neom-body">Do Not Disturb</p>
                <p className="neom-body text-xs opacity-70">No staff will disturb you when enabled</p>
              </div>
              <Switch 
                checked={guestPreferences.silentMode} 
                onCheckedChange={(checked) => setGuestPreferences(prev => ({...prev, silentMode: checked}))}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-yellow-400 data-[state=checked]:to-yellow-500 transition-all duration-300"
              />
            </div>
            {guestPreferences.silentMode && (
              <div className="mt-3 p-3 rounded-xl neom-gradient-glass-yellow border border-yellow-400/30">
                <p className="neom-body text-sm text-yellow-400">
                  ✓ Silent mode active - All notifications suppressed
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Music & Ambience */}
        <Card className="neom-card-glass neom-card-glass-hover border border-orange-400/30 neom-slide-in" style={{ animationDelay: '500ms' }}>
          <CardHeader>
            <CardTitle className="neom-heading-neon flex items-center">
              <Music className="w-5 h-5 mr-2 text-orange-300" />
              Music & Ambience
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="neom-body text-sm mb-3">Preferred Music Style</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'classical', label: 'Classical' },
                  { value: 'jazz', label: 'Jazz' },
                  { value: 'lofi', label: 'Lo-fi' },
                  { value: 'nature', label: 'Nature Sounds' }
                ].map((music) => (
                  <Button
                    key={music.value}
                    onClick={() => setGuestPreferences(prev => ({...prev, musicStyle: music.value}))}
                    className={`neom-btn-glass neom-shrink-press text-xs py-2 ${
                      guestPreferences.musicStyle === music.value
                        ? 'neom-gradient-glass-orange border-orange-400/50' 
                        : ''
                    }`}
                  >
                    {music.label}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <p className="neom-body text-sm mb-3">Wake-up Style</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'gentle-alarm', label: 'Gentle Alarm', icon: AlarmClock },
                  { value: 'natural-light', label: 'Natural Light', icon: Sunrise },
                  { value: 'music', label: 'Music', icon: Music }
                ].map((wake) => (
                  <Button
                    key={wake.value}
                    onClick={() => setGuestPreferences(prev => ({...prev, wakeUpStyle: wake.value}))}
                    className={`neom-btn-glass neom-shrink-press text-xs py-2 ${
                      guestPreferences.wakeUpStyle === wake.value
                        ? 'neom-gradient-glass-orange border-orange-400/50' 
                        : ''
                    }`}
                  >
                    <wake.icon className="w-3 h-3 mb-1" />
                    {wake.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Concierge Integration */}
        <Card 
          className="neom-card-glass neom-card-glass-hover border border-purple-400/30 cursor-pointer neom-slide-in"
          style={{ animationDelay: '700ms' }}
          onClick={() => navigateToScreen('ai-concierge')}
        >
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full neom-gradient-glass-purple border border-purple-400/50 flex items-center justify-center">
                <Bot className="w-6 h-6 text-purple-300 animate-pulse" />
              </div>
              <div className="flex-1">
                <h4 className="neom-heading-neon text-sm">Can't find your preference?</h4>
                <p className="neom-body text-xs">Chat with our AI Concierge for personalized requests</p>
              </div>
              <ArrowRight className="w-5 h-5 text-purple-300" />
            </div>
          </CardContent>
        </Card>

        {/* Summary of Selected Preferences */}
        {getSelectedPreferenceSummary().length > 0 && (
          <Card className="neom-card-glass neom-card-glass-hover border border-yellow-400/30 neom-slide-in" style={{ animationDelay: '800ms' }}>
            <CardHeader>
              <CardTitle className="neom-heading-neon">Active Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {getSelectedPreferenceSummary().map((pref) => (
                  <div 
                    key={pref.id} 
                    className="flex items-center space-x-2 px-3 py-1 rounded-full neom-gradient-glass-emerald border border-emerald-400/50 text-xs"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-300" />
                    <span className="neom-body-white text-xs">{pref.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Button 
          onClick={navigateBack}
          className="w-full neom-btn-primary neom-shrink-press mt-6"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Save Preferences
        </Button>
      </div>
    );
  };

  // Enhanced Notifications Screen
  const renderNotificationsScreen = () => {
    const getCategoryIcon = (category: string) => {
      switch (category) {
        case 'events': return Calendar;
        case 'upsells': return Sparkles;
        case 'checkout': return Clock;
        case 'services': return CheckCircle;
        default: return Bell;
      }
    };

    const getCategoryColor = (category: string) => {
      switch (category) {
        case 'events': return 'purple';
        case 'upsells': return 'yellow';
        case 'checkout': return 'orange';
        case 'services': return 'emerald';
        default: return 'cyan';
      }
    };

    const getPriorityColor = (priority: string) => {
      switch (priority) {
        case 'high': return 'border-red-400/50 bg-red-400/10';
        case 'medium': return 'border-yellow-400/50 bg-yellow-400/10';
        case 'low': return 'border-gray-400/50 bg-gray-400/10';
        default: return 'border-cyan-400/50 bg-cyan-400/10';
      }
    };

    const formatNotificationTime = (timestamp: string) => {
      const now = new Date();
      const notificationTime = new Date(timestamp);
      const diffMs = now.getTime() - notificationTime.getTime();
      const diffMins = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      return `${diffDays}d ago`;
    };

    const activeNotifications = notifications.filter(n => 
      notificationCategories[n.category as keyof typeof notificationCategories]
    );

    return (
      <div className="p-6 pb-24 space-y-6">
        <div className="flex items-center space-x-4 mb-6">
          <Button onClick={navigateBack} className="neom-btn-glass neom-shrink-press">
            <ArrowRight className="w-5 h-5 rotate-180" />
          </Button>
          <h2 className="neom-heading-neon text-xl">Notifications</h2>
        </div>

        {/* Notification Channels */}
        <Card className="neom-card-glass border border-cyan-400/30">
          <CardHeader>
            <CardTitle className="neom-heading-neon flex items-center text-lg">
              <MessageCircle className="w-5 h-5 mr-2 text-cyan-400" />
              Notification Channels
            </CardTitle>
            <p className="neom-body text-sm opacity-80">Choose where you want to receive alerts</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 rounded-xl neom-gradient-glass border border-emerald-400/20">
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-5 h-5 text-emerald-400" />
                  <span className="neom-body text-sm">WhatsApp</span>
                </div>
                <Switch 
                  checked={notificationChannels.whatsapp}
                  onCheckedChange={() => toggleNotificationChannel('whatsapp')}
                />
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-xl neom-gradient-glass border border-blue-400/20">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span className="neom-body text-sm">Email</span>
                </div>
                <Switch 
                  checked={notificationChannels.email}
                  onCheckedChange={() => toggleNotificationChannel('email')}
                />
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-xl neom-gradient-glass border border-orange-400/20">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-orange-400" />
                  <span className="neom-body text-sm">SMS</span>
                </div>
                <Switch 
                  checked={notificationChannels.sms}
                  onCheckedChange={() => toggleNotificationChannel('sms')}
                />
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-xl neom-gradient-glass border border-purple-400/20">
                <div className="flex items-center space-x-3">
                  <Bell className="w-5 h-5 text-purple-400" />
                  <span className="neom-body text-sm">Push</span>
                </div>
                <Switch 
                  checked={notificationChannels.push}
                  onCheckedChange={() => toggleNotificationChannel('push')}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Categories */}
        <Card className="neom-card-glass border border-yellow-400/30">
          <CardHeader>
            <CardTitle className="neom-heading-neon flex items-center text-lg">
              <Settings className="w-5 h-5 mr-2 text-yellow-400" />
              Notification Categories
            </CardTitle>
            <p className="neom-body text-sm opacity-80">Control what types of notifications you receive</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { key: 'events', label: 'Upcoming Events', icon: Calendar, color: 'purple' },
              { key: 'upsells', label: 'AI Service Recommendations', icon: Sparkles, color: 'yellow' },
              { key: 'checkout', label: 'Check-out Reminders', icon: Clock, color: 'orange' },
              { key: 'services', label: 'Service Updates', icon: CheckCircle, color: 'emerald' },
              { key: 'emergency', label: 'Emergency Alerts', icon: AlertTriangle, color: 'red' }
            ].map((category) => (
              <div 
                key={category.key}
                className={`flex items-center justify-between p-3 rounded-xl neom-gradient-glass border border-${category.color}-400/20`}
              >
                <div className="flex items-center space-x-3">
                  <category.icon className={`w-5 h-5 text-${category.color}-400`} />
                  <span className="neom-body">{category.label}</span>
                </div>
                <Switch 
                  checked={notificationCategories[category.key as keyof typeof notificationCategories]}
                  onCheckedChange={() => toggleNotificationCategory(category.key as keyof typeof notificationCategories)}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Active Notifications */}
        <Card className="neom-card-glass border border-purple-400/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="neom-heading-neon flex items-center text-lg">
                <Bell className="w-5 h-5 mr-2 text-purple-400" />
                Recent Notifications
              </CardTitle>
              <Badge className="bg-purple-400/20 text-purple-300">
                {activeNotifications.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeNotifications.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="w-12 h-12 mx-auto mb-4 text-gray-400 opacity-50" />
                <p className="neom-body text-sm opacity-70">No notifications to display</p>
              </div>
            ) : (
              activeNotifications.map((notification) => {
                const IconComponent = notification.icon;
                const categoryColor = getCategoryColor(notification.category);
                
                return (
                  <Card 
                    key={notification.id}
                    className={`neom-card-glass neom-card-glass-hover border overflow-hidden ${getPriorityColor(notification.priority)}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start space-x-3">
                          <div className={`w-10 h-10 rounded-xl neom-gradient-glass-${categoryColor} border border-${categoryColor}-400/30 flex items-center justify-center`}>
                            <IconComponent className={`w-5 h-5 text-${categoryColor}-400`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="neom-heading text-sm">{notification.title}</h4>
                              {notification.aiGenerated && (
                                <Badge className="bg-purple-400/20 text-purple-300 text-xs">
                                  AI
                                </Badge>
                              )}
                              {notification.discount && (
                                <Badge className="bg-yellow-400/20 text-yellow-300 text-xs">
                                  {notification.discount} OFF
                                </Badge>
                              )}
                            </div>
                            <p className="neom-body text-sm mb-2">{notification.message}</p>
                          </div>
                        </div>
                        <Button
                          onClick={() => dismissNotification(notification.id)}
                          className="neom-btn-glass neom-shrink-press w-6 h-6 p-0"
                          size="sm"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                      
                      {/* Notification Channels */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          {notification.channels.map((channel) => {
                            const ChannelIcon = channel === 'whatsapp' ? MessageCircle :
                                              channel === 'email' ? Mail :
                                              channel === 'sms' ? Phone : Bell;
                            return (
                              <ChannelIcon 
                                key={channel}
                                className="w-3 h-3 text-gray-400" 
                              />
                            );
                          })}
                        </div>
                        <span className="neom-mono text-xs opacity-60">
                          {formatNotificationTime(notification.timestamp)}
                        </span>
                      </div>
                      
                      {/* Action Buttons */}
                      {notification.actions && notification.actions.length > 0 && (
                        <div className="flex items-center space-x-2">
                          {notification.actions.map((action, index) => (
                            <Button
                              key={index}
                              onClick={() => handleNotificationAction(notification.id, action)}
                              className={`neom-shrink-press text-xs py-1 px-3 ${
                                index === 0 
                                  ? 'neom-btn-primary' 
                                  : 'neom-btn-glass'
                              }`}
                              size="sm"
                            >
                              {action}
                            </Button>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  // Feedback Screen
  const renderFeedbackScreen = () => (
    <div className="p-6 pb-24 space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button onClick={navigateBack} className="neom-btn-glass neom-shrink-press">
          <ArrowRight className="w-5 h-5 rotate-180" />
        </Button>
        <h2 className="neom-heading-neon text-xl">Share Your Feedback</h2>
      </div>

      {feedbackSubmitted ? (
        // Thank you message
        <div className="text-center py-12 neom-fade-in">
          <div className="relative mx-auto w-24 h-24 mb-6">
            <div className="absolute inset-0 rounded-full border-2 border-emerald-400/30 animate-pulse"></div>
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 animate-pulse neom-glow-cyan"></div>
            <div className="absolute inset-3 rounded-full bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h3 className="neom-heading text-2xl mb-3 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Thank You!
          </h3>
          <p className="neom-body opacity-80 mb-6">Your feedback helps us create exceptional experiences for all guests</p>
          
          <div className="space-y-3">
            <Button 
              onClick={() => {
                setFeedbackSubmitted(false);
                setFeedbackData({
                  facilities: { rating: 0, comment: '' },
                  roomService: { rating: 0, comment: '' },
                  staff: { rating: 0, comment: '' },
                  dining: { rating: 0, comment: '' },
                  cleanliness: { rating: 0, comment: '' }
                });
              }}
              className="neom-btn-primary neom-shrink-press"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Submit New Feedback
            </Button>
            <Button 
              onClick={navigateBack}
              className="neom-btn-glass neom-shrink-press w-full"
            >
              Return to Profile
            </Button>
          </div>
        </div>
      ) : (
        <>
          {/* Feedback Categories */}
          <div className="space-y-4">
            {[
              { 
                key: 'facilities', 
                title: 'Hotel Facilities', 
                icon: Building, 
                color: 'cyan',
                description: 'Pool, gym, spa, common areas'
              },
              { 
                key: 'roomService', 
                title: 'Room Service', 
                icon: ConciergeBell, 
                color: 'emerald',
                description: 'Speed, quality, staff courtesy'
              },
              { 
                key: 'staff', 
                title: 'Staff Service', 
                icon: Users, 
                color: 'yellow',
                description: 'Friendliness, professionalism, helpfulness'
              },
              { 
                key: 'dining', 
                title: 'Dining Experience', 
                icon: UtensilsCrossed, 
                color: 'orange',
                description: 'Food quality, variety, presentation'
              },
              { 
                key: 'cleanliness', 
                title: 'Cleanliness', 
                icon: Sparkles, 
                color: 'purple',
                description: 'Room, bathroom, public areas'
              }
            ].map((category, index) => {
              const IconComponent = category.icon;
              const currentFeedback = feedbackData[category.key as keyof typeof feedbackData];
              
              return (
                <Card 
                  key={category.key}
                  className={`neom-card-glass border border-${category.color}-400/30 overflow-hidden group hover:border-${category.color}-400/50 transition-all duration-300 neom-slide-in`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-5">
                    {/* Category Header */}
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`w-12 h-12 neom-gradient-glass-${category.color} border border-${category.color}-400/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                        <IconComponent className={`w-6 h-6 text-${category.color}-400`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="neom-heading text-base text-white">{category.title}</h4>
                        <p className="neom-body text-xs opacity-70">{category.description}</p>
                      </div>
                    </div>

                    {/* Star Rating */}
                    <div className="mb-4">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setFeedbackData(prev => ({
                              ...prev,
                              [category.key]: { ...prev[category.key as keyof typeof prev], rating: star }
                            }))}
                            className={`w-8 h-8 rounded-full transition-all duration-200 neom-shrink-press ${
                              star <= currentFeedback.rating
                                ? `bg-gradient-to-r from-${category.color}-400 to-${category.color}-500 neom-glow-${category.color} scale-110`
                                : 'bg-gray-600/30 hover:bg-gray-600/50'
                            }`}
                          >
                            <Star 
                              className={`w-5 h-5 mx-auto transition-all duration-200 ${
                                star <= currentFeedback.rating 
                                  ? 'text-white fill-current' 
                                  : 'text-gray-400'
                              }`} 
                            />
                          </button>
                        ))}
                      </div>
                      
                      {/* Rating Labels */}
                      <div className="flex justify-between text-xs opacity-60 px-2">
                        <span className="neom-body">Poor</span>
                        <span className="neom-body">Excellent</span>
                      </div>
                    </div>

                    {/* Comment Box */}
                    <div className="space-y-2">
                      <label className="neom-body text-sm font-medium">Additional Comments (Optional)</label>
                      <Textarea
                        value={currentFeedback.comment}
                        onChange={(e) => setFeedbackData(prev => ({
                          ...prev,
                          [category.key]: { ...prev[category.key as keyof typeof prev], comment: e.target.value }
                        }))}
                        placeholder="Share specific details about your experience..."
                        className={`neom-gradient-glass border border-${category.color}-400/20 text-white placeholder-gray-400 resize-none h-20 focus:border-${category.color}-400/60 focus:ring-1 focus:ring-${category.color}-400/30 transition-all duration-200`}
                      />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Submit Feedback Button */}
          <div className="pt-4">
            <Button 
              onClick={async () => {
                const hasRatings = Object.values(feedbackData).some(feedback => feedback.rating > 0);
                if (!hasRatings) return;
                
                setFeedbackSubmitting(true);
                
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                setFeedbackSubmitting(false);
                setFeedbackSubmitted(true);
              }}
              disabled={feedbackSubmitting || !Object.values(feedbackData).some(feedback => feedback.rating > 0)}
              className="w-full neom-btn-primary neom-shrink-press group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed py-4"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 flex items-center justify-center space-x-2">
                {feedbackSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                    <span>Submitting Feedback...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Submit Feedback</span>
                  </>
                )}
              </div>
            </Button>
            
            {/* Submit Instructions */}
            <p className="neom-body text-xs opacity-60 text-center mt-3">
              Rate at least one category to submit your feedback
            </p>
          </div>
        </>
      )}
    </div>
  );

  // Virtual Tour Screen
  const renderVirtualTourScreen = () => (
    <div className="p-6 pb-24 space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button onClick={navigateBack} className="neom-btn-glass neom-shrink-press">
          <ArrowRight className="w-5 h-5 rotate-180" />
        </Button>
        <h2 className="neom-heading-neon text-xl">Virtual Tours</h2>
      </div>

      <div className="grid gap-4">
        {virtualTours.map((tour) => (
          <Card key={tour.id} className="neom-card-glass neom-card-glass-hover border border-purple-400/30 cursor-pointer">
            <CardContent className="p-0">
              <div className="aspect-video relative overflow-hidden rounded-t-xl">
                <ImageWithFallback 
                  src={tour.image} 
                  alt={tour.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="neom-heading text-lg">{tour.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <Clock className="w-4 h-4 text-cyan-300" />
                    <span className="neom-mono text-sm">{tour.duration}</span>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-yellow-400/20 backdrop-blur-md border border-yellow-400/50 flex items-center justify-center">
                    <Video className="w-8 h-8 text-yellow-400" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // Hotel Directory Screen
  const renderHotelDirectoryScreen = () => {
    const filteredCategories = Object.entries(hotelDirectoryData).filter(([key, category]) => {
      if (!directorySearch) return true;
      const searchLower = directorySearch.toLowerCase();
      return (
        category.title.toLowerCase().includes(searchLower) ||
        category.items.some(item => 
          item.name.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower) ||
          item.location.toLowerCase().includes(searchLower)
        )
      );
    });

    const makePhoneCall = (number: string) => {
      // In a real app, this would initiate a phone call
      console.log(`Calling ${number}`);
    };

    const openMap = (location: string) => {
      // In a real app, this would open location in maps
      console.log(`Opening map for ${location}`);
    };

    return (
      <div className="p-6 pb-24 space-y-6">
        <div className="flex items-center space-x-4 mb-6">
          <Button onClick={navigateBack} className="neom-btn-glass neom-shrink-press">
            <ArrowRight className="w-5 h-5 rotate-180" />
          </Button>
          <h2 className="neom-heading-neon text-xl">Hotel Directory</h2>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            value={directorySearch}
            onChange={(e) => setDirectorySearch(e.target.value)}
            placeholder="Search for amenities and services..."
            className="neom-gradient-glass border border-cyan-400/30 text-white placeholder-gray-400 pl-12 py-3"
          />
        </div>



        {/* Service Categories */}
        <div className="space-y-4">
          {filteredCategories.map(([key, category]) => (
            <Card 
              key={key}
              className={`neom-card-glass neom-card-glass-hover border border-${category.color}-400/30 cursor-pointer neom-transition overflow-hidden`}
            >
              <CardContent className="p-0">
                {/* Category Header */}
                <div 
                  className={`p-5 neom-gradient-glass-${category.color} border-b border-${category.color}-400/30`}
                  onClick={() => setActiveDirectoryCategory(activeDirectoryCategory === key ? null : key)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl neom-gradient-glass-${category.color} border border-${category.color}-400/50 flex items-center justify-center`}>
                        <category.icon className={`w-6 h-6 text-${category.color}-300`} />
                      </div>
                      <div>
                        <h3 className="neom-heading-neon text-lg">{category.title}</h3>
                        <p className="neom-body text-sm opacity-80">
                          {category.items.length} services available
                        </p>
                      </div>
                    </div>
                    <div className={`transform transition-transform duration-300 ${
                      activeDirectoryCategory === key ? 'rotate-90' : ''
                    }`}>
                      <ArrowRight className={`w-6 h-6 text-${category.color}-300`} />
                    </div>
                  </div>
                </div>

                {/* Expanded Services */}
                {activeDirectoryCategory === key && (
                  <div className="p-4 space-y-3 neom-fade-in">
                    {category.items.map((service, index) => (
                      <div 
                        key={index}
                        className={`p-4 rounded-xl neom-gradient-glass border border-${category.color}-400/20 neom-transition`}
                      >
                        <div className="space-y-3">
                          <div>
                            <h4 className="neom-heading text-lg">{service.name}</h4>
                            <p className="neom-body text-sm">{service.description}</p>
                          </div>
                          
                          <div className="grid grid-cols-1 gap-2 text-sm">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="neom-body text-sm">{service.hours}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="neom-body text-sm">{service.location}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <PhoneCall className="w-4 h-4 text-gray-400" />
                              <span className="neom-mono text-sm">{service.contact}</span>
                            </div>
                          </div>

                          <div className="flex space-x-3 pt-2">
                            <Button 
                              onClick={() => makePhoneCall(service.contact)}
                              className="flex-1 neom-btn-primary neom-shrink-press text-sm py-2"
                            >
                              <PhoneCall className="w-4 h-4 mr-2" />
                              Call
                            </Button>
                            <Button 
                              onClick={() => openMap(service.location)}
                              className="flex-1 neom-btn-glass neom-shrink-press text-sm py-2"
                            >
                              <Map className="w-4 h-4 mr-2" />
                              Map
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Interactive Hotel Map */}
        <Card 
          className="neom-card-glass neom-card-glass-hover border border-yellow-400/30 cursor-pointer"
          onClick={() => setShowHotelMap(true)}
        >
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl neom-gradient-glass-yellow border border-yellow-400/50 flex items-center justify-center">
                <Building className="w-8 h-8 text-yellow-400 neom-glow-yellow" />
              </div>
              <div className="flex-1">
                <h3 className="neom-heading-neon text-lg mb-1">Interactive Hotel Map</h3>
                <p className="neom-body text-sm">Tap to view detailed floor plans and navigation</p>
              </div>
              <ArrowRight className="w-6 h-6 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        {/* Hotel Map Modal */}
        {showHotelMap && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <Card className="neom-card-glass border border-yellow-400/50 max-w-lg w-full max-h-[80vh] overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="neom-heading-neon">Hotel Floor Plans</CardTitle>
                <Button 
                  onClick={() => setShowHotelMap(false)}
                  className="neom-btn-glass neom-shrink-press w-8 h-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video neom-gradient-glass-yellow border border-yellow-400/30 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Building className="w-16 h-16 mx-auto mb-4 text-yellow-400 animate-pulse" />
                    <p className="neom-body">Interactive floor plan coming soon</p>
                    <p className="neom-body text-sm opacity-70">Navigate through hotel levels</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="neom-heading-neon text-sm">Quick Navigation</h4>
                  {[
                    "Ground Floor - Lobby & Restaurants",
                    "2nd Floor - Spa & Wellness",
                    "3rd Floor - Fitness Center",
                    "4th Floor - Conference Rooms",
                    "5th Floor - Pool Deck",
                    "25th Floor - Rooftop Lounge"
                  ].map((floor, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 rounded neom-gradient-glass border border-gray-400/20">
                      <MapPin className="w-4 h-4 text-cyan-300" />
                      <span className="neom-body text-sm">{floor}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  };

  // Guest Community Screen
  const renderGuestCommunityScreen = () => (
    <div className="p-6 pb-24 space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button onClick={navigateBack} className="neom-btn-glass neom-shrink-press">
          <ArrowRight className="w-5 h-5 rotate-180" />
        </Button>
        <h2 className="neom-heading-neon text-xl">Community</h2>
      </div>

      {/* Activities Section */}
      <Card className="neom-card-glass border border-emerald-400/30">
        <CardHeader>
          <CardTitle className="neom-heading-neon flex items-center text-lg">
            <Users className="w-5 h-5 mr-2 text-emerald-400" />
            Activities
          </CardTitle>
          <p className="neom-body text-sm opacity-80">Join group activities and connect with fellow guests</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {communityActivities.map((activity) => {
            const isJoined = joinedActivities.includes(activity.id);
            const availableSpots = activity.maxParticipants - activity.participants;
            
            return (
              <Card 
                key={activity.id} 
                className="neom-card-glass neom-card-glass-hover border border-cyan-400/20 overflow-hidden"
              >
                <CardContent className="p-4">
                  {/* Activity Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 rounded-xl neom-gradient-glass-cyan border border-cyan-400/30 flex items-center justify-center text-xl">
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="neom-heading text-base mb-1">{activity.name}</h4>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1 neom-body">
                            <MapPin className="w-3 h-3 text-cyan-300" />
                            <span>{activity.location}</span>
                          </div>
                          <div className="flex items-center space-x-1 neom-body">
                            <Clock className="w-3 h-3 text-cyan-300" />
                            <span>{activity.date} at {activity.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Badge 
                      className={`text-xs ${activity.category === 'Sports' ? 'bg-orange-400/20 text-orange-300 border-orange-400/30' : 
                        activity.category === 'Social' ? 'bg-purple-400/20 text-purple-300 border-purple-400/30' :
                        activity.category === 'Wellness' ? 'bg-emerald-400/20 text-emerald-300 border-emerald-400/30' :
                        activity.category === 'Culinary' ? 'bg-yellow-400/20 text-yellow-300 border-yellow-400/30' :
                        'bg-cyan-400/20 text-cyan-300 border-cyan-400/30'}`}
                    >
                      {activity.category}
                    </Badge>
                  </div>

                  {/* Participation Status */}
                  <div className="flex items-center justify-between mb-3 p-3 rounded-xl neom-gradient-glass border border-gray-400/20">
                    <div className="flex items-center space-x-2">
                      <Users2 className="w-4 h-4 text-cyan-300" />
                      <span className="neom-body text-sm">
                        <span className="neom-mono-yellow font-semibold">{activity.participants}/{activity.maxParticipants}</span> joined
                      </span>
                    </div>
                    <div className="text-xs neom-body opacity-70">
                      {availableSpots > 0 ? `${availableSpots} spots left` : 'Full'}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="neom-body text-sm mb-4 opacity-90">{activity.description}</p>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => toggleActivityJoin(activity.id)}
                      disabled={!isJoined && availableSpots === 0}
                      className={`flex-1 neom-shrink-press ${
                        isJoined 
                          ? 'neom-btn-primary' 
                          : availableSpots === 0 
                            ? 'neom-btn-glass opacity-50 cursor-not-allowed'
                            : 'neom-btn-glass hover:bg-emerald-400/10 hover:border-emerald-400/50'
                      }`}
                    >
                      {isJoined ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Joined
                        </>
                      ) : availableSpots === 0 ? (
                        <>
                          <UserX className="w-4 h-4 mr-2" />
                          Full
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4 mr-2" />
                          Join
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={() => openActivityChat(activity.id)}
                      className="neom-btn-secondary neom-shrink-press px-4"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </CardContent>
      </Card>

      {/* Events Section */}
      <Card className="neom-card-glass border border-purple-400/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="neom-heading-neon flex items-center text-lg">
                <Calendar className="w-5 h-5 mr-2 text-purple-300" />
                Events
              </CardTitle>
              <p className="neom-body text-sm opacity-80">Hotel-organized events and experiences</p>
            </div>
            <Button
              onClick={() => setShowCreateEvent(true)}
              className="neom-btn-glass neom-shrink-press"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {communityEvents.map((event) => {
            const isRSVPed = rsvpedEvents.includes(event.id);
            const availableSpots = event.capacity - event.rsvped;
            
            return (
              <Card 
                key={event.id} 
                className="neom-card-glass neom-card-glass-hover border border-purple-400/20 overflow-hidden"
              >
                <CardContent className="p-4">
                  {/* Event Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="neom-heading text-base mb-1">{event.name}</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center space-x-1 neom-body">
                          <Building className="w-3 h-3 text-purple-300" />
                          <span>{event.venue}</span>
                        </div>
                        <div className="flex items-center space-x-1 neom-body">
                          <Calendar className="w-3 h-3 text-purple-300" />
                          <span>{event.date} • {event.time}</span>
                        </div>
                      </div>
                    </div>
                    <Badge 
                      className={`text-xs ${event.category === 'Entertainment' ? 'bg-pink-400/20 text-pink-300 border-pink-400/30' : 
                        event.category === 'Business' ? 'bg-blue-400/20 text-blue-300 border-blue-400/30' :
                        'bg-orange-400/20 text-orange-300 border-orange-400/30'}`}
                    >
                      {event.category}
                    </Badge>
                  </div>

                  {/* Event Description */}
                  <p className="neom-body text-sm mb-3 opacity-90">{event.description}</p>

                  {/* Event Details */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 rounded-xl neom-gradient-glass border border-gray-400/20">
                      <div className="flex items-center space-x-2 mb-1">
                        <Crown className="w-4 h-4 text-yellow-400" />
                        <span className="neom-body text-xs">Dress Code</span>
                      </div>
                      <p className="neom-mono text-xs">{event.dresscode}</p>
                    </div>
                    <div className="p-3 rounded-xl neom-gradient-glass border border-gray-400/20">
                      <div className="flex items-center space-x-2 mb-1">
                        <DollarSign className="w-4 h-4 text-emerald-400" />
                        <span className="neom-body text-xs">Price</span>
                      </div>
                      <p className="neom-mono text-xs">{event.price}</p>
                    </div>
                  </div>

                  {/* RSVP Status */}
                  <div className="flex items-center justify-between mb-4 p-3 rounded-xl neom-gradient-glass border border-gray-400/20">
                    <div className="flex items-center space-x-2">
                      <UserCheck className="w-4 h-4 text-purple-300" />
                      <span className="neom-body text-sm">
                        <span className="neom-mono-yellow font-semibold">{event.rsvped}/{event.capacity}</span> attending
                      </span>
                    </div>
                    <div className="text-xs neom-body opacity-70">
                      {availableSpots > 0 ? `${availableSpots} spots available` : 'Event Full'}
                    </div>
                  </div>

                  {/* RSVP Button */}
                  <Button
                    onClick={() => toggleEventRSVP(event.id)}
                    disabled={!isRSVPed && availableSpots === 0}
                    className={`w-full neom-shrink-press ${
                      isRSVPed 
                        ? 'neom-btn-primary' 
                        : availableSpots === 0 
                          ? 'neom-btn-glass opacity-50 cursor-not-allowed'
                          : 'neom-btn-glass hover:bg-purple-400/10 hover:border-purple-400/50'
                    }`}
                  >
                    {isRSVPed ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        RSVP Confirmed
                      </>
                    ) : availableSpots === 0 ? (
                      <>
                        <X className="w-4 h-4 mr-2" />
                        Event Full
                      </>
                    ) : (
                      <>
                        <Calendar className="w-4 h-4 mr-2" />
                        RSVP Now
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </CardContent>
      </Card>

      {/* Create Event Modal */}
      {showCreateEvent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <Card className="neom-card-glass border border-yellow-400/50 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="neom-heading-neon text-xl">Create Event</CardTitle>
              <Button 
                onClick={() => setShowCreateEvent(false)}
                className="neom-btn-glass neom-shrink-press w-8 h-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="neom-body text-sm mb-2 block">Event Name</label>
                <Input
                  value={newEvent.name}
                  onChange={(e) => setNewEvent(prev => ({...prev, name: e.target.value}))}
                  placeholder="Enter event name"
                  className="neom-gradient-glass border border-yellow-400/30 text-white placeholder-gray-400"
                />
              </div>
              
              <div>
                <label className="neom-body text-sm mb-2 block">Location</label>
                <Select 
                  value={newEvent.location} 
                  onValueChange={(value) => setNewEvent(prev => ({...prev, location: value}))}
                >
                  <SelectTrigger className="neom-gradient-glass border border-yellow-400/30 text-white">
                    <SelectValue placeholder="Select venue" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-yellow-400/30">
                    <SelectItem value="rooftop-terrace">Rooftop Terrace</SelectItem>
                    <SelectItem value="pool-deck">Pool Deck</SelectItem>
                    <SelectItem value="executive-lounge">Executive Lounge</SelectItem>
                    <SelectItem value="beach-area">Beach Area</SelectItem>
                    <SelectItem value="wellness-center">Wellness Center</SelectItem>
                    <SelectItem value="conference-room">Conference Room</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="neom-body text-sm mb-2 block">Date</label>
                  <Input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent(prev => ({...prev, date: e.target.value}))}
                    className="neom-gradient-glass border border-yellow-400/30 text-white"
                  />
                </div>
                <div>
                  <label className="neom-body text-sm mb-2 block">Time</label>
                  <Input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent(prev => ({...prev, time: e.target.value}))}
                    className="neom-gradient-glass border border-yellow-400/30 text-white"
                  />
                </div>
              </div>
              
              <div>
                <label className="neom-body text-sm mb-2 block">Max Participants (Optional)</label>
                <Input
                  type="number"
                  value={newEvent.maxParticipants}
                  onChange={(e) => setNewEvent(prev => ({...prev, maxParticipants: e.target.value}))}
                  placeholder="Leave blank for unlimited"
                  className="neom-gradient-glass border border-yellow-400/30 text-white placeholder-gray-400"
                />
              </div>
              
              <div>
                <label className="neom-body text-sm mb-2 block">Description</label>
                <Textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent(prev => ({...prev, description: e.target.value}))}
                  placeholder="Describe your event..."
                  className="neom-gradient-glass border border-yellow-400/30 text-white placeholder-gray-400"
                  rows={3}
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <Button 
                  onClick={() => setShowCreateEvent(false)}
                  className="flex-1 neom-btn-glass neom-shrink-press"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreateEvent}
                  disabled={!newEvent.name || !newEvent.location || !newEvent.date || !newEvent.time}
                  className="flex-1 neom-btn-primary neom-shrink-press"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Event
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );

  // Language & Region Screen
  const renderLanguageRegionScreen = () => (
    <div className="p-6 pb-24 space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button onClick={navigateBack} className="neom-btn-glass neom-shrink-press">
          <ArrowRight className="w-5 h-5 rotate-180" />
        </Button>
        <h2 className="neom-heading-neon text-xl">Language & Region</h2>
      </div>

      <Card className="neom-card-glass border border-purple-400/30">
        <CardHeader>
          <CardTitle className="neom-heading">Language</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { code: 'en', name: 'English', flag: '🇺🇸' },
            { code: 'ar', name: 'العربية', flag: '🇸🇦' },
            { code: 'fr', name: 'Français', flag: '🇫🇷' }
          ].map((lang) => (
            <div 
              key={lang.code}
              className={`flex items-center justify-between p-3 rounded-xl cursor-pointer neom-transition ${
                guestPreferences.language === lang.code 
                  ? 'neom-gradient-glass-purple border border-purple-400/50' 
                  : 'neom-gradient-glass border border-gray-400/20 hover:border-purple-400/30'
              }`}
              onClick={() => setGuestPreferences(prev => ({...prev, language: lang.code}))}
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">{lang.flag}</span>
                <span className="neom-body">{lang.name}</span>
              </div>
              {guestPreferences.language === lang.code && (
                <CheckCircle className="w-5 h-5 text-purple-300" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  // AI Crisis Copilot Functions
  const handleCrisisMessage = (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: message.trim(),
      timestamp: new Date()
    };

    setCrisisMessages(prev => [...prev, userMessage]);
    setCrisisInput('');

    // Generate AI response based on message content
    setTimeout(() => {
      const aiResponse = generateCrisisResponse(message.toLowerCase());
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        message: aiResponse,
        timestamp: new Date()
      };
      setCrisisMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const generateCrisisResponse = (message: string): string => {
    // Emergency keywords and responses
    if (message.includes('smoke') || message.includes('fire')) {
      return "🚨 FIRE EMERGENCY DETECTED\n\n1. Stay calm and exit immediately\n2. Use nearest stairwell (NO elevators)\n3. Call +966-800-NEOM (6366)\n4. Alert others around you\n5. Meet at assembly point: North Parking Lot A\n\nI'm automatically alerting emergency services. Help is on the way!";
    }
    
    if (message.includes('medical') || message.includes('hurt') || message.includes('injured') || message.includes('help')) {
      return "🏥 MEDICAL EMERGENCY\n\n1. Stay calm and don't move if injured\n2. Call +966-800-MEDIC (63342) immediately\n3. Medical team is on Floor 1 - arriving in 2-3 minutes\n4. If conscious, apply pressure to any bleeding\n5. AED unit available on your floor near elevator bank\n\nEmergency medical response has been activated. Someone is coming to help you right now.";
    }
    
    if (message.includes('exit') || message.includes('evacuation') || message.includes('way out')) {
      const exitInfo = guestFloor <= 5 ? 'East Wing Stairwell' : 
                      guestFloor <= 15 ? 'Central Stairwell' : 'West Wing Stairwell';
      return `🚪 NEAREST EXIT DIRECTIONS\n\nFrom Room ${guestInfo?.room || '2501'} (Floor ${guestFloor}):\n\n1. Exit room and turn RIGHT\n2. Walk 50 meters to ${exitInfo}\n3. Take stairs DOWN (not elevator)\n4. Exit at ground level\n5. Assembly point: North Parking Lot A\n\nDistance: ~120 meters | Time: 2-3 minutes\n\nWould you like me to send these directions to your phone?`;
    }
    
    if (message.includes('security') || message.includes('suspicious') || message.includes('threat')) {
      return "🛡️ SECURITY ALERT\n\n1. Move to a safe location immediately\n2. Lock your door if in your room\n3. Call Security: +966-800-SECURE (732873)\n4. Do not confront any threats\n5. Security team dispatching to your location\n\nYour safety is our priority. Security officers are responding now and will be with you shortly.";
    }
    
    if (message.includes('elevator') || message.includes('stuck') || message.includes('trapped')) {
      return "🛗 ELEVATOR EMERGENCY\n\n1. Press the emergency button inside elevator\n2. Use emergency phone if available\n3. Stay calm - you have air circulation\n4. Call +966-800-NEOM (6366)\n5. Maintenance team is being notified\n\nElevator rescue team is responding. Average response time: 5-10 minutes. You are safe.";
    }
    
    if (message.includes('power') || message.includes('electricity') || message.includes('dark')) {
      return "⚡ POWER OUTAGE RESPONSE\n\n1. Emergency lighting should activate automatically\n2. Stay where you are until eyes adjust\n3. Use phone flashlight carefully\n4. Backup generators activating (1-2 minutes)\n5. Elevators temporarily disabled\n\nThis appears to be a temporary outage. Power restoration estimated: 3-5 minutes.";
    }
    
    if (message.includes('flood') || message.includes('water') || message.includes('leak')) {
      return "💧 WATER EMERGENCY\n\n1. Move to higher ground immediately\n2. Avoid electrical outlets and equipment\n3. Call Maintenance: Extension 300\n4. If severe, evacuate to upper floors\n5. Use stairs only - avoid elevators\n\nFacilities team has been notified and is responding to address the water issue.";
    }
    
    // Default helpful response
    return `I'm here to help with your safety concern. For immediate emergency assistance:\n\n🚨 Emergency: +966-800-NEOM (6366)\n🏥 Medical: +966-800-MEDIC (63342)\n🛡️ Security: +966-800-SECURE (732873)\n\nCan you provide more details about your situation? Keywords like "fire", "medical", "security", or "evacuation" help me give you specific guidance.`;
  };

  const handleVoiceRecording = () => {
    if (!isVoiceRecording) {
      setIsVoiceRecording(true);
      // Simulate voice recording
      setTimeout(() => {
        setIsVoiceRecording(false);
        setIsProcessingVoice(true);
        // Simulate voice processing
        setTimeout(() => {
          setIsProcessingVoice(false);
          // Add a sample voice-to-text result
          handleCrisisMessage("Where is the nearest exit?");
        }, 2000);
      }, 3000);
    }
  };

  // Help & Safety Screen
  const renderHelpSafetyScreen = () => {
    const getStatusColor = (status: string) => {
      switch (status) {
        case 'ok':
        case 'normal':
        case 'clear':
        case 'standby':
          return 'emerald';
        case 'caution':
        case 'warning':
          return 'yellow';
        case 'alert':
        case 'danger':
          return 'red';
        default:
          return 'gray';
      }
    };

    const getStatusIcon = (status: string) => {
      switch (status) {
        case 'ok':
        case 'normal':
        case 'clear':
        case 'standby':
          return '✅';
        case 'caution':
        case 'warning':
          return '⚠️';
        case 'alert':
        case 'danger':
          return '❌';
        default:
          return '⚪';
      }
    };

    const makeEmergencyCall = (number: string) => {
      console.log(`Emergency call to ${number}`);
    };

    const getEvacuationInfo = () => {
      const exitDirection = guestFloor <= 5 ? 'East Wing' : 
                           guestFloor <= 15 ? 'Central Stairwell' : 'West Wing';
      const assemblyPoint = guestFloor <= 10 ? 'Marina Parking' : 'Main Lobby';
      
      return {
        floor: `Floor ${guestFloor}`,
        exit: exitDirection,
        assembly: assemblyPoint
      };
    };

    const evacInfo = getEvacuationInfo();

    return (
      <div className="p-6 pb-24 space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button onClick={navigateBack} className="neom-btn-glass neom-shrink-press">
              <ArrowRight className="w-5 h-5 rotate-180" />
            </Button>
            <h2 className="neom-heading-neon text-xl">Help & Safety</h2>
          </div>
          
          {/* Multilingual Toggle */}
          <Button
            onClick={() => setIsMultilingual(!isMultilingual)}
            className={`neom-btn-glass neom-shrink-press ${isMultilingual ? 'border-yellow-400/50 bg-yellow-400/10' : ''}`}
          >
            <Languages className={`w-4 h-4 ${isMultilingual ? 'text-yellow-400' : ''}`} />
          </Button>
        </div>

        {/* AI Crisis Copilot */}
        <Card className="bg-white/60 backdrop-blur-sm border border-gray-200/50 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-lg font-semibold text-gray-800">
              <Bot className="w-5 h-5 mr-2 text-blue-600/80" />
              AI Crisis Copilot
            </CardTitle>
            <p className="text-sm text-gray-600">24/7 Emergency assistance and safety guidance</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Chat Messages Container */}
            <div className="h-64 overflow-y-auto space-y-3 p-4 rounded-xl bg-gradient-to-br from-gray-50/50 to-blue-50/50 border border-gray-200/50">
              {crisisMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-xl ${
                    msg.type === 'user' 
                      ? 'bg-blue-100/50 border border-blue-200/50 text-blue-800' 
                      : 'bg-gray-100/50 border border-gray-200/50 text-gray-800'
                  }`}>
                    {msg.type === 'ai' && (
                      <div className="flex items-center space-x-2 mb-2">
                        <Bot className="w-4 h-4 text-blue-600/80" />
                        <span className="text-xs text-blue-600/80 font-medium">AI Assistant</span>
                      </div>
                    )}
                    <div className="whitespace-pre-line text-sm">
                      {msg.message}
                    </div>
                    <div className="text-xs opacity-60 mt-1">
                      {msg.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              
              {isProcessingVoice && (
                <div className="flex justify-start">
                  <div className="bg-gray-100/50 border border-gray-200/50 text-gray-800 p-3 rounded-xl">
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin">⚡</div>
                      <span className="text-sm">Processing voice message...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="space-y-3">
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <Input
                    value={crisisInput}
                    onChange={(e) => setCrisisInput(e.target.value)}
                    placeholder="Type your emergency or safety question..."
                    className="pr-12 bg-white/60 backdrop-blur-sm border-gray-300/50 text-gray-800 placeholder-gray-500 focus:border-blue-500/70 focus:ring-blue-500/30"
                    onKeyPress={(e) => e.key === 'Enter' && handleCrisisMessage(crisisInput)}
                  />
                  <Button
                    onClick={() => handleCrisisMessage(crisisInput)}
                    className="absolute right-1 top-1 h-8 w-8 p-0 bg-blue-600/80 hover:bg-blue-700/80 border-blue-600/80"
                    disabled={!crisisInput.trim()}
                  >
                    <Send className="w-4 h-4 text-white" />
                  </Button>
                </div>
                
                <Button
                  onClick={handleVoiceRecording}
                  className={`border-gray-300/50 hover:bg-gray-50/50 ${
                    isVoiceRecording ? 'bg-red-50/50 border-red-300/50' : 'bg-white/60 backdrop-blur-sm'
                  }`}
                  disabled={isProcessingVoice}
                >
                  {isVoiceRecording ? (
                    <MicOff className="w-4 h-4 text-red-600" />
                  ) : (
                    <Mic className="w-4 h-4 text-gray-600" />
                  )}
                </Button>
              </div>
              
              {isVoiceRecording && (
                <div className="flex items-center justify-center space-x-2 text-red-600">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">Recording... (tap mic to stop)</span>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                </div>
              )}
              
              {/* Quick Emergency Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={() => handleCrisisMessage("There's smoke in my hallway")}
                  className="bg-red-50/40 backdrop-blur-sm border-red-200/50 text-red-700 hover:bg-red-100/50 hover:border-red-300/50"
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Fire Emergency
                </Button>
                <Button
                  onClick={() => handleCrisisMessage("I need medical help")}
                  className="bg-green-50/40 backdrop-blur-sm border-green-200/50 text-green-700 hover:bg-green-100/50 hover:border-green-300/50"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Medical Help
                </Button>
                <Button
                  onClick={() => handleCrisisMessage("Where is the nearest exit?")}
                  className="bg-blue-50/40 backdrop-blur-sm border-blue-200/50 text-blue-700 hover:bg-blue-100/50 hover:border-blue-300/50"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Find Exit
                </Button>
                <Button
                  onClick={() => handleCrisisMessage("Security concern")}
                  className="bg-purple-50/40 backdrop-blur-sm border-purple-200/50 text-purple-700 hover:bg-purple-100/50 hover:border-purple-300/50"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Security
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Safety Status Overview */}
        <Card className="neom-card-glass neom-card-glass-hover border border-emerald-400/30">
          <CardHeader>
            <CardTitle className="neom-heading-neon flex items-center text-lg">
              <ShieldCheck className="w-5 h-5 mr-2 text-emerald-400" />
              Safety Status Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Overall Status */}
            <div className="text-center p-4 rounded-xl neom-gradient-glass-emerald border border-emerald-400/30">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-2xl">✅</span>
                <h3 className="neom-heading-neon text-xl">All Systems Normal</h3>
              </div>
              <p className="neom-body text-sm">Hotel is operating safely</p>
            </div>

            {/* System Status Indicators */}
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(safetyStatus.systems).map(([key, system]) => (
                <div key={key} className="p-3 rounded-xl neom-gradient-glass border border-emerald-400/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <system.icon className={`w-4 h-4 text-${getStatusColor(system.status)}-400`} />
                      <span className="neom-body text-sm">{system.label}</span>
                    </div>
                    <span className="text-sm">{getStatusIcon(system.status)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Floor-Based Evacuation Info */}
        <Card className="neom-card-glass neom-card-glass-hover border border-orange-400/30">
          <CardHeader>
            <CardTitle className="neom-heading-neon flex items-center text-lg">
              <MapPin className="w-5 h-5 mr-2 text-orange-400" />
              Your Evacuation Route
            </CardTitle>
            <p className="neom-body text-sm">Smart guidance for {evacInfo.floor}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl neom-gradient-glass border border-orange-400/20">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-orange-400" />
                  <div>
                    <p className="neom-heading text-sm">Nearest Exit</p>
                    <p className="neom-body text-xs">{evacInfo.exit}</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-orange-400" />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl neom-gradient-glass border border-orange-400/20">
                <div className="flex items-center space-x-3">
                  <Flag className="w-5 h-5 text-orange-400" />
                  <div>
                    <p className="neom-heading text-sm">Assembly Point</p>
                    <p className="neom-body text-xs">{evacInfo.assembly}</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-orange-400" />
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={() => setShowEvacuationMap(true)}
                className="w-full neom-btn-primary neom-shrink-press"
              >
                <Building className="w-4 h-4 mr-2" />
                View Interactive Evacuation Map
              </Button>
              
              <Button 
                onClick={() => {
                  // Generate and download evacuation route map
                  const canvas = document.createElement('canvas');
                  const ctx = canvas.getContext('2d');
                  if (!ctx) return;

                  // Set canvas size
                  canvas.width = 1200;
                  canvas.height = 900;

                  // Fill background
                  ctx.fillStyle = '#0B0B0B';
                  ctx.fillRect(0, 0, canvas.width, canvas.height);

                  // Add header
                  ctx.fillStyle = '#FF6B35';
                  ctx.font = 'bold 36px Inter, sans-serif';
                  ctx.textAlign = 'center';
                  ctx.fillText('EMERGENCY EVACUATION ROUTE', canvas.width / 2, 60);

                  // Add floor information
                  ctx.fillStyle = '#FFD700';
                  ctx.font = '24px Inter, sans-serif';
                  ctx.fillText(`Floor ${guestFloor} - Room ${guestInfo?.room || '2501'}`, canvas.width / 2, 100);

                  // Draw floor outline
                  ctx.strokeStyle = '#FF6B35';
                  ctx.lineWidth = 4;
                  ctx.strokeRect(150, 150, canvas.width - 300, canvas.height - 300);

                  // Add "YOU ARE HERE" marker
                  const yourLocation = { x: 300, y: 250 };
                  ctx.fillStyle = '#FFD700';
                  ctx.beginPath();
                  ctx.arc(yourLocation.x, yourLocation.y, 15, 0, 2 * Math.PI);
                  ctx.fill();
                  ctx.fillStyle = '#0B0B0B';
                  ctx.font = 'bold 12px Inter, sans-serif';
                  ctx.textAlign = 'center';
                  ctx.fillText('YOU', yourLocation.x, yourLocation.y - 2);
                  ctx.fillText('HERE', yourLocation.x, yourLocation.y + 10);

                  // Add evacuation path
                  const exitLocation = { x: 950, y: 400 };
                  ctx.strokeStyle = '#FFD700';
                  ctx.lineWidth = 8;
                  ctx.setLineDash([10, 5]);
                  ctx.beginPath();
                  ctx.moveTo(yourLocation.x, yourLocation.y);
                  ctx.lineTo(yourLocation.x + 200, yourLocation.y);
                  ctx.lineTo(yourLocation.x + 200, exitLocation.y);
                  ctx.lineTo(exitLocation.x, exitLocation.y);
                  ctx.stroke();
                  ctx.setLineDash([]);

                  // Add exit marker
                  ctx.fillStyle = '#00FF00';
                  ctx.fillRect(exitLocation.x - 20, exitLocation.y - 20, 40, 40);
                  ctx.fillStyle = '#0B0B0B';
                  ctx.font = 'bold 14px Inter, sans-serif';
                  ctx.textAlign = 'center';
                  ctx.fillText('EXIT', exitLocation.x, exitLocation.y + 5);

                  // Add assembly point
                  const assemblyLocation = { x: 1050, y: 500 };
                  ctx.fillStyle = '#17C3B2';
                  ctx.beginPath();
                  ctx.arc(assemblyLocation.x, assemblyLocation.y, 20, 0, 2 * Math.PI);
                  ctx.fill();
                  ctx.fillStyle = '#0B0B0B';
                  ctx.font = 'bold 10px Inter, sans-serif';
                  ctx.textAlign = 'center';
                  ctx.fillText('ASSEMBLY', assemblyLocation.x, assemblyLocation.y - 5);
                  ctx.fillText('POINT', assemblyLocation.x, assemblyLocation.y + 8);

                  // Add evacuation information
                  ctx.fillStyle = '#FFFFFF';
                  ctx.font = '18px Inter, sans-serif';
                  ctx.textAlign = 'left';
                  let yPos = canvas.height - 200;
                  
                  const evacInfo = {
                    exit: "Stairwell B - East Wing",
                    assembly: "North Parking Lot A",
                    floor: `Floor ${guestFloor}`,
                    distance: "120 meters",
                    time: "2-3 minutes"
                  };

                  const instructions = [
                    'EVACUATION INSTRUCTIONS:',
                    `• Your Location: ${evacInfo.floor} - Room ${guestInfo?.room || '2501'}`,
                    `• Nearest Exit: ${evacInfo.exit}`,
                    `• Assembly Point: ${evacInfo.assembly}`,
                    `• Distance to Exit: ${evacInfo.distance}`,
                    `• Estimated Time: ${evacInfo.time}`,
                    '',
                    'EMERGENCY PROCEDURES:',
                    '• Stay calm and move quickly but safely',
                    '• Do not use elevators',
                    '• Follow lighted exit signs',
                    '• Assist others if possible',
                    '• Report to assembly point for headcount'
                  ];

                  instructions.forEach(line => {
                    if (line.startsWith('EVACUATION INSTRUCTIONS:') || line.startsWith('EMERGENCY PROCEDURES:')) {
                      ctx.fillStyle = '#FF6B35';
                      ctx.font = 'bold 18px Inter, sans-serif';
                    } else if (line.startsWith('•')) {
                      ctx.fillStyle = '#CCCCCC';
                      ctx.font = '16px Inter, sans-serif';
                    } else {
                      ctx.fillStyle = '#CCCCCC';
                      ctx.font = '16px Inter, sans-serif';
                    }
                    
                    if (line.trim()) {
                      ctx.fillText(line, 150, yPos);
                    }
                    yPos += 25;
                  });

                  // Add emergency contact
                  ctx.fillStyle = '#FFD700';
                  ctx.font = 'bold 20px Inter, sans-serif';
                  ctx.textAlign = 'center';
                  ctx.fillText('EMERGENCY: +966-800-NEOM (6366)', canvas.width / 2, canvas.height - 30);

                  // Convert to blob and download
                  canvas.toBlob((blob) => {
                    if (!blob) return;
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `NEOM-Evacuation-Route-Floor-${guestFloor}.png`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                  });
                }}
                className="w-full neom-btn-glass neom-shrink-press border-orange-400/50 hover:bg-orange-400/10 flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4 text-orange-400" />
                <span className="text-orange-400">Download Evacuation Route</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Safety Resources Section */}
        <Card className="neom-card-glass neom-card-glass-hover border border-purple-400/30">
          <CardHeader>
            <CardTitle className="neom-heading-neon flex items-center text-lg">
              <FileText className="w-5 h-5 mr-2 text-purple-400" />
              Safety Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {safetyResources.map((resource) => (
              <div key={resource.id}>
                <div 
                  className={`p-4 rounded-xl neom-gradient-glass border border-${resource.color}-400/20 hover:border-${resource.color}-400/40 neom-transition cursor-pointer`}
                  onClick={() => setSelectedSafetyResource(selectedSafetyResource === resource.id ? null : resource.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <resource.icon className={`w-5 h-5 text-${resource.color}-400`} />
                      <div>
                        <h4 className="neom-heading text-sm">{resource.title}</h4>
                        <p className="neom-body text-xs">{resource.description}</p>
                      </div>
                    </div>
                    <div className={`transform transition-transform duration-300 ${
                      selectedSafetyResource === resource.id ? 'rotate-90' : ''
                    }`}>
                      <ArrowRight className={`w-5 h-5 text-${resource.color}-400`} />
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {selectedSafetyResource === resource.id && (
                  <div className="mt-3 p-4 rounded-xl neom-gradient-glass border border-gray-400/20 neom-fade-in">
                    <div className="space-y-2">
                      {resource.content.map((item, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className={`w-2 h-2 rounded-full bg-${resource.color}-400 mt-2 flex-shrink-0`} />
                          <p className="neom-body text-sm">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Download Guidelines Button */}
            <Button 
              onClick={() => {
                // Generate and download comprehensive safety guidelines
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (!ctx) return;

                // Set canvas size for comprehensive document
                canvas.width = 1200;
                canvas.height = 1600;

                // Fill background
                ctx.fillStyle = '#0B0B0B';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Add header
                ctx.fillStyle = '#6A0DAD';
                ctx.font = 'bold 36px Inter, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('NEOM HOSPITALITY', canvas.width / 2, 60);
                
                ctx.fillStyle = '#FFD700';
                ctx.font = 'bold 28px Inter, sans-serif';
                ctx.fillText('SAFETY GUIDELINES & RESOURCES', canvas.width / 2, 100);

                // Add property information
                ctx.fillStyle = '#CCCCCC';
                ctx.font = '18px Inter, sans-serif';
                ctx.fillText(`Guest Safety Guidelines - Floor ${guestFloor}`, canvas.width / 2, 140);

                let yPos = 200;
                ctx.textAlign = 'left';

                // Define all safety resources with their content
                const safetyResourcesData = [
                  {
                    title: "Emergency Procedures",
                    icon: "⚠️",
                    color: "red",
                    content: [
                      "Call +966-800-NEOM (6366) for emergencies",
                      "Follow illuminated exit signs to nearest stairwell",
                      "Do not use elevators during fire emergencies",
                      "Report to designated assembly points",
                      "Assist others if safely possible",
                      "Wait for further instructions from staff"
                    ]
                  },
                  {
                    title: "Fire Safety",
                    icon: "🔥",
                    color: "orange",
                    content: [
                      "Fire extinguishers located every 30 meters",
                      "Smoke detectors in all rooms and corridors",
                      "Automatic sprinkler system throughout building",
                      "Fire exits clearly marked with green signs",
                      "Emergency lighting activates automatically",
                      "Pull fire alarm if you discover a fire"
                    ]
                  },
                  {
                    title: "Medical Emergency",
                    icon: "🏥",
                    color: "green",
                    content: [
                      "24/7 medical center on ground floor",
                      "AED units available on each floor",
                      "First aid kits in all public areas",
                      "Trained medical staff on-site",
                      "Direct line to local hospital: +966-800-MEDIC",
                      "Emergency helicopter pad for critical cases"
                    ]
                  },
                  {
                    title: "Security Protocols",
                    icon: "🛡️",
                    color: "blue",
                    content: [
                      "24/7 security monitoring and patrols",
                      "CCTV coverage in all public areas",
                      "Secure keycard access to all rooms",
                      "Report suspicious activity immediately",
                      "Security escort service available",
                      "Safe deposit boxes in guest rooms"
                    ]
                  },
                  {
                    title: "Natural Disaster Response",
                    icon: "🌪️",
                    color: "yellow",
                    content: [
                      "Earthquake: Drop, Cover, Hold protocol",
                      "Severe weather shelter locations identified",
                      "Emergency supply kits on each floor",
                      "Communication systems with backup power",
                      "Evacuation routes clearly marked",
                      "Regular safety drills conducted"
                    ]
                  }
                ];

                // Render each safety resource section
                safetyResourcesData.forEach((resource, index) => {
                  // Section header
                  ctx.fillStyle = '#6A0DAD';
                  ctx.font = 'bold 22px Inter, sans-serif';
                  ctx.fillText(`${resource.icon} ${resource.title}`, 80, yPos);
                  yPos += 35;

                  // Section content
                  ctx.fillStyle = '#FFFFFF';
                  ctx.font = '16px Inter, sans-serif';
                  resource.content.forEach(item => {
                    // Wrap long text
                    const maxWidth = canvas.width - 160;
                    const words = item.split(' ');
                    let line = '';
                    
                    for (let i = 0; i < words.length; i++) {
                      const testLine = line + words[i] + ' ';
                      const metrics = ctx.measureText(testLine);
                      if (metrics.width > maxWidth && i > 0) {
                        ctx.fillText(`• ${line}`, 100, yPos);
                        line = words[i] + ' ';
                        yPos += 22;
                      } else {
                        line = testLine;
                      }
                    }
                    ctx.fillText(`• ${line}`, 100, yPos);
                    yPos += 22;
                  });
                  
                  yPos += 25; // Space between sections
                });

                // Add important contact information
                yPos += 30;
                ctx.fillStyle = '#FFD700';
                ctx.font = 'bold 24px Inter, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('EMERGENCY CONTACTS', canvas.width / 2, yPos);
                yPos += 40;

                ctx.fillStyle = '#FFFFFF';
                ctx.font = '18px Inter, sans-serif';
                ctx.textAlign = 'left';
                const contacts = [
                  'Emergency Services: +966-800-NEOM (6366)',
                  'Medical Emergency: +966-800-MEDIC (63342)',
                  'Security: +966-800-SECURE (732873)',
                  'Front Desk: Extension 100',
                  'Concierge: Extension 200',
                  'Housekeeping: Extension 300'
                ];

                contacts.forEach(contact => {
                  ctx.fillText(contact, 80, yPos);
                  yPos += 30;
                });

                // Add footer
                yPos += 40;
                ctx.fillStyle = '#17C3B2';
                ctx.font = 'bold 16px Inter, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('For your safety and security, please familiarize yourself with these guidelines', canvas.width / 2, yPos);
                yPos += 25;
                ctx.fillText('Visit neom.com/safety for digital versions and updates', canvas.width / 2, yPos);

                // Add generation timestamp
                yPos += 40;
                ctx.fillStyle = '#CCCCCC';
                ctx.font = '12px Inter, sans-serif';
                ctx.fillText(`Generated: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, canvas.width / 2, yPos);

                // Convert to blob and download
                canvas.toBlob((blob) => {
                  if (!blob) return;
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = `NEOM-Safety-Guidelines-${new Date().toISOString().split('T')[0]}.png`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  URL.revokeObjectURL(url);
                });
              }}
              className="w-full mt-4 neom-btn-glass neom-shrink-press border-purple-400/50 hover:bg-purple-400/10 flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400">Download Guidelines</span>
            </Button>
          </CardContent>
        </Card>

        {/* Report Safety Issue Button */}
        <Button 
          onClick={() => console.log('Report safety issue')}
          className="w-full neom-btn-glass neom-shrink-press border-red-400/30 hover:border-red-400/50 hover:bg-red-400/10"
        >
          <AlertTriangle className="w-4 h-4 mr-2 text-red-400" />
          Report Safety Issue
        </Button>

        {/* Evacuation Map Modal */}
        {showEvacuationMap && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <Card className="neom-card-glass border border-orange-400/50 max-w-lg w-full max-h-[80vh] overflow-y-auto">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="neom-heading-neon text-xl">Evacuation Map</CardTitle>
                <Button 
                  onClick={() => setShowEvacuationMap(false)}
                  className="neom-btn-glass neom-shrink-press w-8 h-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video neom-gradient-glass-orange border border-orange-400/30 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 mx-auto mb-4 text-orange-400 animate-pulse" />
                    <p className="neom-body">Interactive evacuation routes</p>
                    <p className="neom-body text-sm opacity-70">Floor {guestFloor} highlighted</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="neom-heading-neon text-lg">Evacuation Steps</h4>
                  {[
                    `Exit room and turn toward ${evacInfo.exit}`,
                    'Follow lit EXIT signs and emergency lighting',
                    'Use stairs - never elevators during emergencies',
                    'Stay low if smoke is present',
                    `Proceed to ${evacInfo.assembly} assembly point`,
                    'Wait for emergency personnel instructions'
                  ].map((step, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-xl neom-gradient-glass border border-orange-400/20">
                      <div className="w-6 h-6 rounded-full bg-orange-400 text-black flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <p className="neom-body text-sm">{step}</p>
                    </div>
                  ))}
                </div>

                <Button 
                  onClick={() => setShowEvacuationMap(false)}
                  className="w-full neom-btn-primary neom-shrink-press mt-4"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Got It
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  };

  // Post-Login Access Page - Shows only Book Room/Event and Check-in options
  const renderPostLoginAccessPage = () => (
    <div className="p-6 pb-24 space-y-8">
      {/* Header */}
      <div className="text-center mb-12 relative">
        <div className="absolute top-0 left-8 w-3 h-3 bg-yellow-400/40 rounded-full blur-sm neom-float"></div>
        <div className="absolute top-4 right-12 w-2 h-2 bg-purple-400/30 rounded-full blur-sm neom-float" style={{ animationDelay: '1s' }}></div>
        
        <h1 className="neom-heading-neon text-4xl mb-3 bg-gradient-to-r from-yellow-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent relative z-10">
          Welcome to NEOM
        </h1>
        <p className="neom-body text-lg opacity-90 mb-6 max-w-sm mx-auto">
          Complete your booking or check-in to unlock full access
        </p>
        
        {/* Status indicator */}
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/30">
          <Lock className="w-4 h-4 text-yellow-400" />
          <span className="neom-body text-sm text-yellow-400">Limited Access Mode</span>
        </div>
      </div>

      {/* Main Action Cards - Centered and Prominent */}
      <div className="space-y-6 max-w-sm mx-auto">
        {/* Check-In */}
        <Card 
          className="neom-card-glass neom-card-glass-hover border border-emerald-400/30 cursor-pointer group overflow-hidden relative transform transition-all duration-300 hover:scale-[1.02]"
          onClick={() => navigateToScreen('checkin-preferences')}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          <div className="absolute top-2 right-2 w-2 h-2 bg-emerald-400/30 rounded-full blur-sm neom-float"></div>
          <CardContent className="p-8 text-center relative z-10">
            <div className="w-20 h-20 mx-auto mb-6 rounded-3xl neom-gradient-glass-emerald border border-emerald-400/50 flex items-center justify-center group-hover:scale-110 transition-all duration-400 shadow-lg shadow-emerald-400/20">
              <CheckCircle className="w-10 h-10 text-emerald-300" />
            </div>
            <h3 className="neom-heading-neon text-2xl mb-3 group-hover:text-emerald-300 transition-colors duration-300">Set Your Preferences & Check-In</h3>
            <p className="neom-body text-base opacity-90 leading-relaxed mb-4">Customize your stay preferences before check-in</p>
            <div className="flex items-center justify-center space-x-2 text-sm text-emerald-400">
              <ArrowRight className="w-4 h-4" />
              <span>Get started</span>
            </div>
          </CardContent>
        </Card>

        {/* Book a Room */}
        <Card 
          className="neom-card-glass neom-card-glass-hover border border-purple-400/30 cursor-pointer group overflow-hidden relative transform transition-all duration-300 hover:scale-[1.02]"
          onClick={() => navigateToScreen('room-booking')}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-pink-400/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          <div className="absolute top-2 left-2 w-2 h-2 bg-purple-400/30 rounded-full blur-sm neom-float" style={{ animationDelay: '0.5s' }}></div>
          <CardContent className="p-8 text-center relative z-10">
            <div className="w-20 h-20 mx-auto mb-6 rounded-3xl neom-gradient-glass-purple border border-purple-400/50 flex items-center justify-center group-hover:scale-110 transition-all duration-400 shadow-lg shadow-purple-400/20">
              <Bed className="w-10 h-10 text-purple-300" />
            </div>
            <h3 className="neom-heading-neon text-2xl mb-3 group-hover:text-purple-300 transition-colors duration-300">Book a Room</h3>
            <p className="neom-body text-base opacity-90 leading-relaxed mb-4">Find and reserve your perfect stay</p>
            <div className="flex items-center justify-center space-x-2 text-sm text-purple-400">
              <ArrowRight className="w-4 h-4" />
              <span>Get started</span>
            </div>
          </CardContent>
        </Card>

        {/* Book an Event */}
        <Card 
          className="neom-card-glass neom-card-glass-hover border border-orange-400/30 cursor-pointer group overflow-hidden relative transform transition-all duration-300 hover:scale-[1.02]"
          onClick={() => navigateToScreen('events-booking')}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-yellow-400/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400/30 rounded-full blur-sm neom-float"></div>
          <CardContent className="p-8 text-center relative z-10">
            <div className="w-20 h-20 mx-auto mb-6 rounded-3xl neom-gradient-glass-orange border border-orange-400/50 flex items-center justify-center group-hover:scale-110 transition-all duration-400 shadow-lg shadow-orange-400/20">
              <Calendar className="w-10 h-10 text-orange-300" />
            </div>
            <h3 className="neom-heading-neon text-2xl mb-3 group-hover:text-orange-300 transition-colors duration-300">Book an Event</h3>
            <p className="neom-body text-base opacity-90 leading-relaxed mb-4">Plan custom hotel events with AI assistance</p>
            <div className="flex items-center justify-center space-x-2 text-sm text-orange-400">
              <ArrowRight className="w-4 h-4" />
              <span>Plan event</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Information Panel */}
      <div className="mx-auto max-w-sm mt-8">
        <Card className="neom-card-glass border border-cyan-400/20">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Shield className="w-5 h-5 text-cyan-400" />
              <span className="neom-heading-neon text-sm">Secure Access</span>
            </div>
            <p className="neom-body text-sm opacity-80 leading-relaxed">
              Complete your booking or check-in to receive your Digital Key and unlock the full NEOM hospitality experience.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Home Tab - Enhanced with Digital Key Integration
  const renderHomeTab = () => {
    // Show restricted access page if user doesn't have digital key
    if (!hasDigitalKey) {
      return renderPostLoginAccessPage();
    }

    return (
      <div className="p-6 pb-24 space-y-8">
        {/* Enhanced Header with Floating Elements */}
        <div className="text-center mb-10 relative">
          {/* Floating decorative elements */}
          <div className="absolute top-0 left-8 w-3 h-3 bg-yellow-400/40 rounded-full blur-sm neom-float"></div>
          <div className="absolute top-4 right-12 w-2 h-2 bg-purple-400/30 rounded-full blur-sm neom-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -top-2 right-6 w-1 h-1 bg-cyan-400/50 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          <h1 className="neom-heading-neon text-4xl mb-3 bg-gradient-to-r from-yellow-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent relative z-10">
            Welcome to NEOM
          </h1>
          <p className="neom-body text-lg opacity-90 mb-4 max-w-sm mx-auto">
            Your smart hospitality experience awaits
          </p>
          
          {/* Enhanced decorative line with glow */}
          <div className="relative mx-auto mt-4 w-32">
            <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
            <div className="absolute inset-0 w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent blur-sm opacity-50"></div>
          </div>
        </div>

      {/* Enhanced Primary Action Cards */}
      <div className="grid grid-cols-2 gap-6 mb-10">
        {/* Check-In / Book Room */}
        {!isCheckedIn ? (
          <>
            <Card 
              className="neom-card-glass neom-card-glass-hover border border-emerald-400/30 cursor-pointer group overflow-hidden relative transform transition-all duration-300 hover:scale-[1.02]"
              onClick={() => navigateToScreen('checkin-preferences')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="absolute top-2 right-2 w-2 h-2 bg-emerald-400/30 rounded-full blur-sm neom-float"></div>
              <CardContent className="p-7 text-center relative z-10">
                <div className="w-18 h-18 mx-auto mb-5 rounded-3xl neom-gradient-glass-emerald border border-emerald-400/50 flex items-center justify-center group-hover:scale-110 transition-all duration-400 shadow-lg shadow-emerald-400/20">
                  <CheckCircle className="w-9 h-9 text-emerald-300" />
                </div>
                <h3 className="neom-heading-neon text-xl mb-3 group-hover:text-emerald-300 transition-colors duration-300">Set Your Preferences & Check-In</h3>
                <p className="neom-body text-sm opacity-90 leading-relaxed">Customize your stay preferences before check-in</p>
              </CardContent>
            </Card>

            <Card 
              className="neom-card-glass neom-card-glass-hover border border-purple-400/30 cursor-pointer group overflow-hidden relative transform transition-all duration-300 hover:scale-[1.02]"
              onClick={() => navigateToScreen('room-booking')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-pink-400/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="absolute top-2 left-2 w-2 h-2 bg-purple-400/30 rounded-full blur-sm neom-float" style={{ animationDelay: '0.5s' }}></div>
              <CardContent className="p-7 text-center relative z-10">
                <div className="w-18 h-18 mx-auto mb-5 rounded-3xl neom-gradient-glass-purple border border-purple-400/50 flex items-center justify-center group-hover:scale-110 transition-all duration-400 shadow-lg shadow-purple-400/20">
                  <Bed className="w-9 h-9 text-purple-300" />
                </div>
                <h3 className="neom-heading-neon text-xl mb-3 group-hover:text-purple-300 transition-colors duration-300">Book a Room</h3>
                <p className="neom-body text-sm opacity-90 leading-relaxed">Find and reserve your perfect stay</p>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {/* Digital Key Card - Stylish Yellow Design */}
            <Card 
              className="neom-card-glass neom-card-glass-hover border cursor-pointer group overflow-hidden relative col-span-2 transform transition-all duration-300 hover:scale-[1.02] neom-glow-yellow"
              onClick={() => navigateToScreen('digital-key')}
              style={{
                background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.18) 0%, rgba(255, 215, 0, 0.12) 50%, rgba(106, 13, 173, 0.08) 100%)',
                backdropFilter: 'blur(12px)',
                borderColor: 'rgba(255, 215, 0, 0.4)',
                boxShadow: digitalKeyActive 
                  ? '0 8px 30px rgba(255, 215, 0, 0.3), 0 0 25px rgba(0, 208, 132, 0.2)' 
                  : '0 8px 30px rgba(255, 215, 0, 0.25)'
              }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              
              {/* Floating decorative elements */}
              <div className="absolute top-4 right-6 w-3 h-3 rounded-full bg-white/20 blur-sm neom-float"></div>
              <div className="absolute bottom-4 left-8 w-2 h-2 rounded-full bg-white/15 blur-sm neom-float" style={{ animationDelay: '1.5s' }}></div>
              
              <CardContent className="p-8 relative z-10">
                <div className="flex items-center space-x-8">
                  {/* Digital Key Visual */}
                  <div className="relative">
                    <div className={`w-24 h-24 rounded-3xl flex items-center justify-center transition-all duration-500 border-2 shadow-xl ${
                      digitalKeyActive 
                        ? 'neom-gradient-glass-emerald border-emerald-400/60 shadow-emerald-400/30' 
                        : 'neom-gradient-glass-yellow border-yellow-400/60 shadow-yellow-400/30'
                    } group-hover:scale-110 group-hover:rotate-3`}>
                      {digitalKeyActive ? (
                        <Unlock className="w-12 h-12 text-emerald-400 animate-pulse" />
                      ) : (
                        <Lock className="w-12 h-12 text-yellow-400 animate-pulse" />
                      )}
                    </div>
                    {/* Status indicator */}
                    <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full animate-pulse flex items-center justify-center ${
                      digitalKeyActive ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50' : 'bg-yellow-400 shadow-lg shadow-yellow-400/50'
                    }`}>
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Key Info */}
                  <div className="flex-1">
                    <h3 className={`neom-heading text-3xl mb-3 transition-colors duration-300 ${
                      digitalKeyActive ? 'text-emerald-400' : 'text-yellow-400'
                    }`}>
                      Digital Key
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full animate-pulse ${
                          digitalKeyActive ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50' : 'bg-yellow-400 shadow-lg shadow-yellow-400/50'
                        }`}></div>
                        <span className="neom-mono text-base text-[rgba(12,12,12,1)]">
                          Room 1205 · Floor 12
                        </span>
                      </div>
                      <p className="neom-body text-base leading-relaxed">
                        {digitalKeyActive ? 'Tap to lock your room' : 'Tap to unlock your room'}
                      </p>
                    </div>
                  </div>
                  
                  {/* Quick Toggle */}
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setDigitalKeyActive(!digitalKeyActive);
                    }}
                    className={`px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 neom-shrink-press ${
                      digitalKeyActive 
                        ? 'neom-btn-glass hover:bg-emerald-400/10 hover:border-emerald-400/50' 
                        : 'neom-btn-glass hover:bg-yellow-400/10 hover:border-yellow-400/50'
                    }`}
                  >
                    {digitalKeyActive ? (
                      <>
                        <Lock className="w-6 h-6 mr-3 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">Lock</span>
                      </>
                    ) : (
                      <>
                        <Unlock className="w-6 h-6 mr-3 text-yellow-400" />
                        <span className="text-yellow-400 font-semibold">Unlock</span>
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Prominent Checkout Button - Only show for checked-in guests */}
      {isCheckedIn && (
        <Card 
          className="neom-card-glass neom-card-glass-hover border border-yellow-400/40 cursor-pointer group overflow-hidden relative transform transition-all duration-300 hover:scale-[1.02] neom-glow-yellow"
          onClick={() => navigateToScreen('checkout-flow')}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/15 to-orange-400/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-yellow-400/20 to-orange-400/10 rounded-full blur-2xl neom-float"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-orange-400/15 to-yellow-400/10 rounded-full blur-xl neom-float" style={{ animationDelay: '1s' }}></div>
          
          <CardContent className="p-8 relative z-10">
            <div className="flex items-center space-x-6">
              {/* Icon with enhanced glow */}
              <div className="relative">
                <div className="w-20 h-20 rounded-3xl neom-gradient-glass-yellow border-2 border-yellow-400/60 flex items-center justify-center shadow-2xl shadow-yellow-400/40 group-hover:scale-110 group-hover:rotate-3 transition-all duration-400">
                  <Receipt className="w-10 h-10 text-yellow-400 neom-pulse-yellow" />
                </div>
                {/* Pulsing indicator */}
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 shadow-lg shadow-yellow-400/60 animate-pulse flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <h3 className="neom-heading-neon text-2xl mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                  Checkout Now
                </h3>
                <p className="neom-body text-base opacity-90 leading-relaxed mb-3">
                  Review your bill, rate staff, and complete payment
                </p>
                <div className="flex items-center space-x-4">
                  <Badge className="bg-yellow-400/20 text-yellow-300 border border-yellow-400/40 px-3 py-1">
                    <DollarSign className="w-3 h-3 mr-1 inline" />
                    ${checkoutData.total.toFixed(2)}
                  </Badge>
                  <Badge className="bg-purple-400/20 text-purple-300 border border-purple-400/40 px-3 py-1">
                    <Star className="w-3 h-3 mr-1 inline" />
                    Rate & Tip
                  </Badge>
                </div>
              </div>
              
              {/* Arrow */}
              <div className="relative">
                <ArrowRight className="w-8 h-8 text-yellow-400 group-hover:translate-x-2 group-hover:scale-125 transition-all duration-300" />
                <div className="absolute inset-0 w-8 h-8 border-2 border-yellow-400/30 rounded-full group-hover:border-yellow-400/60 transition-colors duration-300"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Signature Experiences */}
      <Card className="neom-card-glass neom-card-glass-hover border border-purple-400/50 overflow-hidden relative bg-gradient-to-br from-purple-400/15 via-yellow-400/10 to-cyan-400/15 backdrop-blur-xl shadow-lg shadow-purple-400/20">
        <div className="absolute top-2 left-8 w-3 h-3 bg-purple-400/30 rounded-full blur-lg neom-float"></div>
        <div className="absolute bottom-6 right-6 w-2 h-2 bg-cyan-400/40 rounded-full blur-md neom-float" style={{ animationDelay: '2s' }}></div>
        
        <CardHeader className="relative z-10 pb-5">
          <CardTitle className="neom-heading-neon flex items-center text-2xl mb-2">
            <div className="relative mr-4">
              <Crown className="w-7 h-7 text-purple-300" />
              <div className="absolute inset-0 w-7 h-7 border border-purple-400/30 rounded-full animate-pulse"></div>
            </div>
            Signature Experiences
          </CardTitle>
          <p className="neom-body text-base opacity-90 leading-relaxed">Exclusive NEOM hospitality features</p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-purple-400 to-transparent mt-3"></div>
        </CardHeader>
        <CardContent className="space-y-5 relative z-10">
          {[
            {
              icon: Bot,
              title: 'ARIA AI Concierge',
              description: 'Personalized assistance powered by AI',
              color: 'purple',
              action: () => navigateToScreen('ai-concierge')
            },
            {
              icon: Eye,
              title: 'Explore in 360°',
              description: 'Virtual tours of rooms, facilities & dining',
              color: 'cyan',
              action: () => navigateToScreen('virtual-tour')
            },
            {
              icon: Users,
              title: 'Guest Community',
              description: 'Connect with fellow travelers',
              color: 'pink',
              action: () => navigateToScreen('guest-community')
            }
          ].map((experience) => (
            <div
              key={experience.title}
              onClick={experience.action}
              className={`p-5 rounded-2xl neom-gradient-glass border border-${experience.color}-400/20 hover:border-${experience.color}-400/40 cursor-pointer neom-transition group transform hover:scale-[1.02] hover:shadow-lg hover:shadow-${experience.color}-400/20`}
            >
              <div className="flex items-center space-x-5">
                <div className={`w-14 h-14 rounded-2xl neom-gradient-glass-${experience.color} border border-${experience.color}-400/40 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-${experience.color}-400/20`}>
                  <experience.icon className={`w-7 h-7 text-${experience.color}-400`} />
                </div>
                <div className="flex-1">
                  <h4 className="neom-heading text-lg mb-2 group-hover:text-${experience.color}-300 transition-colors duration-300">{experience.title}</h4>
                  <p className="neom-body text-sm opacity-90 leading-relaxed">{experience.description}</p>
                </div>
                <div className="relative">
                  <ArrowRight className={`w-6 h-6 text-${experience.color}-400 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300`} />
                  <div className="absolute inset-0 w-6 h-6 border border-${experience.color}-400/20 rounded-full group-hover:border-${experience.color}-400/40 transition-colors duration-300"></div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card className="neom-card-glass neom-card-glass-hover border border-red-400/30 overflow-hidden relative">
        <div className="absolute top-2 right-4 w-2 h-2 bg-red-400/40 rounded-full blur-sm neom-float"></div>
        <div className="absolute bottom-3 left-3 w-1 h-1 bg-red-400/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <CardContent className="p-6 relative z-10">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <div className="w-12 h-12 rounded-2xl neom-gradient-glass border border-red-400/50 flex items-center justify-center">
                <Phone className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="neom-heading-neon text-xl">Emergency Contacts</h3>
            </div>
            <p className="neom-body text-sm opacity-90">24/7 emergency assistance and support</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Emergency Services */}
            <Button
              onClick={() => {
                console.log('Emergency call to 911');
                alert('Emergency Services: 911\n\nConnecting to local emergency services...');
              }}
              className="neom-btn-glass neom-shrink-press hover:bg-red-500/20 hover:border-red-400/60 bg-red-500/10 border-red-400/40 p-4 rounded-2xl transform hover:scale-105 hover:shadow-lg hover:shadow-red-400/30 transition-all duration-300 group h-auto flex-col space-y-2"
            >
              <AlertTriangle className="w-8 h-8 text-red-400 group-hover:animate-bounce" />
              <div className="text-center">
                <div className="neom-heading text-sm text-red-300 font-bold">Emergency</div>
                <div className="neom-mono text-xs text-red-400">911</div>
              </div>
            </Button>

            {/* Front Desk */}
            <Button
              onClick={() => {
                console.log('Calling Front Desk: +966-11-234-5679');
                alert('Front Desk: +966-11-234-5679\n\nConnecting to hotel front desk...');
              }}
              className="neom-btn-glass neom-shrink-press hover:bg-blue-500/20 hover:border-blue-400/60 bg-blue-500/10 border-blue-400/40 p-4 rounded-2xl transform hover:scale-105 hover:shadow-lg hover:shadow-blue-400/30 transition-all duration-300 group h-auto flex-col space-y-2"
            >
              <Building className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform duration-200" />
              <div className="text-center">
                <div className="neom-heading text-sm text-blue-300 font-bold">Front Desk</div>
                <div className="neom-mono text-xs text-blue-400">+966-11-234-5679</div>
              </div>
            </Button>

            {/* Security */}
            <Button
              onClick={() => {
                console.log('Calling Security: +966-11-234-5678');
                alert('Security: +966-11-234-5678\n\nConnecting to hotel security...');
              }}
              className="neom-btn-glass neom-shrink-press hover:bg-orange-500/20 hover:border-orange-400/60 bg-orange-500/10 border-orange-400/40 p-4 rounded-2xl transform hover:scale-105 hover:shadow-lg hover:shadow-orange-400/30 transition-all duration-300 group h-auto flex-col space-y-2"
            >
              <Shield className="w-8 h-8 text-orange-400 group-hover:rotate-12 transition-transform duration-200" />
              <div className="text-center">
                <div className="neom-heading text-sm text-orange-300 font-bold">Security</div>
                <div className="neom-mono text-xs text-orange-400">+966-11-234-5678</div>
              </div>
            </Button>

            {/* Medical Services */}
            <Button
              onClick={() => {
                console.log('Calling Medical: +966-11-234-5680');
                alert('Medical Services: +966-11-234-5680\n\nConnecting to medical emergency...');
              }}
              className="neom-btn-glass neom-shrink-press hover:bg-emerald-500/20 hover:border-emerald-400/60 bg-emerald-500/10 border-emerald-400/40 p-4 rounded-2xl transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-400/30 transition-all duration-300 group h-auto flex-col space-y-2"
            >
              <Heart className="w-8 h-8 text-emerald-400 group-hover:animate-pulse" />
              <div className="text-center">
                <div className="neom-heading text-sm text-emerald-300 font-bold">Medical</div>
                <div className="neom-mono text-xs text-emerald-400">+966-11-234-5680</div>
              </div>
            </Button>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-red-500/5 border border-red-400/20">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <p className="neom-body text-xs text-red-300">For immediate emergencies, tap Emergency (911) or use your device's emergency features</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
  };

  // Services Tab with Integrated Hotel Directory
  // Services Tab - Restructured with AI Assistants and AR/VR Previews
  const renderServicesTab = () => {
    const makePhoneCall = (number: string) => {
      console.log(`Calling ${number}`);
    };

    const openMap = (location: string) => {
      console.log(`Opening map for ${location}`);
    };

    const renderServiceWithAI = (service: any, serviceType: string, categoryColor: string, showArVr = false) => (
      <div className={`p-4 rounded-xl neom-gradient-glass border border-${categoryColor}-400/20 neom-transition`}>
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="neom-heading text-lg mb-1 text-[rgba(0,0,0,1)]">{service.name}</h4>
              <p className="neom-body text-sm mb-2">{service.description}</p>
            </div>
            <div className="flex items-center space-x-2">
              {/* AI Assistant Button */}
              <Button
                size="sm"
                onClick={() => {
                  setActiveServiceAI(`${serviceType}-${service.name.toLowerCase().replace(/\s+/g, '-')}`);
                  setServiceAIChatMessages(prev => ({
                    ...prev,
                    [`${serviceType}-${service.name.toLowerCase().replace(/\s+/g, '-')}`]: [{
                      id: Date.now(),
                      sender: 'ai',
                      message: `Hello! I'm your ${service.name} assistant. How can I help you today?`,
                      timestamp: new Date().toISOString()
                    }]
                  }));
                }}
                className="neom-btn-glass neom-shrink-press w-8 h-8 p-0"
              >
                <Bot className="w-4 h-4 text-cyan-300" />
              </Button>
              
              {/* Favorite Button */}
              <Button
                size="sm"
                onClick={() => {
                  const newFavorites = favoriteServices.includes(service.name)
                    ? favoriteServices.filter(f => f !== service.name)
                    : [...favoriteServices, service.name];
                  setFavoriteServices(newFavorites);
                }}
                className="neom-btn-glass neom-shrink-press w-8 h-8 p-0"
              >
                {favoriteServices.includes(service.name) ? (
                  <Heart className="w-4 h-4 text-yellow-400 fill-current" />
                ) : (
                  <Heart className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="neom-body text-sm">{service.hours}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="neom-body text-sm">{service.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <PhoneCall className="w-4 h-4 text-gray-400" />
              <span className="neom-mono text-sm">{service.contact}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <Button 
              onClick={() => makePhoneCall(service.contact)}
              className="neom-btn-primary neom-shrink-press text-sm py-2"
            >
              <PhoneCall className="w-4 h-4 mr-2" />
              Call
            </Button>
            <Button 
              onClick={() => openMap(service.location)}
              className="neom-btn-glass neom-shrink-press text-sm py-2"
            >
              <Map className="w-4 h-4 mr-2" />
              Map
            </Button>
          </div>

          {/* AR/VR Preview Buttons for Dining & Wellness */}
          {showArVr && (
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-600/30">
              <Button 
                onClick={() => openArVrPreview('ar', service.name)}
                className="neom-btn-glass neom-shrink-press text-sm py-2"
              >
                <Camera className="w-4 h-4 mr-2" />
                AR Preview
              </Button>
              <Button 
                onClick={() => openArVrPreview('vr', service.name)}
                className="neom-btn-glass neom-shrink-press text-sm py-2"
              >
                <Headphones className="w-4 h-4 mr-2" />
                VR Tour
              </Button>
            </div>
          )}
        </div>
      </div>
    );

    return (
      <div className="p-6 pb-24 space-y-6">
        <div className="text-center mb-6">
          <h2 className="neom-heading-neon text-2xl mb-2">Hotel Services</h2>
          <p className="neom-body text-sm">Your complete guide to NEOM amenities with AI assistance</p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            value={directorySearch}
            onChange={(e) => setDirectorySearch(e.target.value)}
            placeholder="Search services, restaurants, spa, gym..."
            className="neom-gradient-glass border border-cyan-400/30 text-white placeholder-gray-400 pl-12 py-3 rounded-2xl"
          />
        </div>

        {/* 1. ROOM SERVICE - Expandable Card */}
        <Card className="neom-card-glass neom-card-glass-hover border border-orange-400/30 overflow-hidden">
          <CardContent className="p-0">
            <div 
              className="p-5 neom-gradient-glass-orange border-b border-orange-400/30 cursor-pointer"
              onClick={() => setExpandedRoomService(!expandedRoomService)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl neom-gradient-glass-orange border border-orange-400/50 flex items-center justify-center">
                    <ConciergeBell className="w-6 h-6 text-orange-300" />
                  </div>
                  <div>
                    <h3 className="neom-heading-neon text-lg">Room Service</h3>
                    <p className="neom-body text-sm opacity-80">24/7 in-room dining service</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveServiceAI('room-service');
                      setServiceAIChatMessages(prev => ({
                        ...prev,
                        'room-service': [{
                          id: Date.now(),
                          sender: 'ai',
                          message: `Hello! I'm your Room Service assistant. I can help you order food, check our menu, or answer any questions about in-room dining. What would you like today?`,
                          timestamp: new Date().toISOString()
                        }]
                      }));
                    }}
                    className="neom-btn-glass neom-shrink-press px-3 py-2 h-auto w-auto"
                  >
                    <Bot className="w-4 h-4 text-orange-300 mr-2" />
                    Talk to AI
                  </Button>
                  <div className={`transform transition-transform duration-300 ${
                    expandedRoomService ? 'rotate-90' : ''
                  }`}>
                    <ArrowRight className="w-6 h-6 text-orange-300" />
                  </div>
                </div>
              </div>
            </div>

            {expandedRoomService && (
              <div className="p-4 neom-fade-in">
                <div className="p-4 rounded-xl neom-gradient-glass border border-orange-400/20">
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="neom-body text-sm">24/7 Available</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="neom-body text-sm">Direct to your room</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <PhoneCall className="w-4 h-4 text-gray-400" />
                        <span className="neom-mono text-sm">+1-555-0203</span>
                      </div>
                    </div>
                    <Button 
                      onClick={() => makePhoneCall("+1-555-0203")}
                      className="w-full neom-btn-primary neom-shrink-press text-sm py-3"
                    >
                      <PhoneCall className="w-4 h-4 mr-2" />
                      Call the Room Service
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 2. DINING SERVICES */}
        <Card className="neom-card-glass neom-card-glass-hover border border-orange-400/30 overflow-hidden">
          <CardContent className="p-0">
            <div 
              className="p-5 neom-gradient-glass-orange border-b border-orange-400/30 cursor-pointer"
              onClick={() => setActiveDirectoryCategory(activeDirectoryCategory === 'dining' ? null : 'dining')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl neom-gradient-glass-orange border border-orange-400/50 flex items-center justify-center">
                    <UtensilsCrossed className="w-6 h-6 text-orange-300" />
                  </div>
                  <div>
                    <h3 className="neom-heading-neon text-lg">Dining Services</h3>
                    <p className="neom-body text-sm opacity-80">3 restaurants and bars available</p>
                  </div>
                </div>
                <div className={`transform transition-transform duration-300 ${
                  activeDirectoryCategory === 'dining' ? 'rotate-90' : ''
                }`}>
                  <ArrowRight className="w-6 h-6 text-orange-300" />
                </div>
              </div>
            </div>

            {activeDirectoryCategory === 'dining' && (
              <div className="p-4 space-y-3 neom-fade-in">
                {hotelDirectoryData.dining.items.filter(item => item.name !== 'Room Service').map((service) => 
                  <div key={service.name}>{renderServiceWithAI(service, 'dining', 'orange', true)}</div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* 3. TRANSPORTATION SERVICES */}
        <Card className="neom-card-glass neom-card-glass-hover border border-cyan-400/30 overflow-hidden">
          <CardContent className="p-0">
            <div 
              className="p-5 neom-gradient-glass-cyan border-b border-cyan-400/30 cursor-pointer"
              onClick={() => setActiveDirectoryCategory(activeDirectoryCategory === 'transportation' ? null : 'transportation')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl neom-gradient-glass-cyan border border-cyan-400/50 flex items-center justify-center">
                    <Car className="w-6 h-6 text-cyan-300" />
                  </div>
                  <div>
                    <h3 className="neom-heading-neon text-lg">Transportation Services</h3>
                    <p className="neom-body text-sm opacity-80">{hotelDirectoryData.transportation.items.length} transport options available</p>
                  </div>
                </div>
                <div className={`transform transition-transform duration-300 ${
                  activeDirectoryCategory === 'transportation' ? 'rotate-90' : ''
                }`}>
                  <ArrowRight className="w-6 h-6 text-cyan-300" />
                </div>
              </div>
            </div>

            {activeDirectoryCategory === 'transportation' && (
              <div className="p-4 space-y-3 neom-fade-in">
                {hotelDirectoryData.transportation.items.map((service) => 
                  <div key={service.name}>{renderServiceWithAI(service, 'transportation', 'cyan', false)}</div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* 4. WELLNESS & RECREATION */}
        <Card className="neom-card-glass neom-card-glass-hover border border-emerald-400/30 overflow-hidden">
          <CardContent className="p-0">
            <div 
              className="p-5 neom-gradient-glass-emerald border-b border-emerald-400/30 cursor-pointer"
              onClick={() => setActiveDirectoryCategory(activeDirectoryCategory === 'wellness' ? null : 'wellness')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl neom-gradient-glass-emerald border border-emerald-400/50 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-emerald-300" />
                  </div>
                  <div>
                    <h3 className="neom-heading-neon text-lg">Wellness & Recreation</h3>
                    <p className="neom-body text-sm opacity-80">{hotelDirectoryData.wellness.items.length} wellness services available</p>
                  </div>
                </div>
                <div className={`transform transition-transform duration-300 ${
                  activeDirectoryCategory === 'wellness' ? 'rotate-90' : ''
                }`}>
                  <ArrowRight className="w-6 h-6 text-emerald-300" />
                </div>
              </div>
            </div>

            {activeDirectoryCategory === 'wellness' && (
              <div className="p-4 space-y-3 neom-fade-in">
                {hotelDirectoryData.wellness.items.map((service) => 
                  <div key={service.name}>{renderServiceWithAI(service, 'wellness', 'emerald', true)}</div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* 5. OTHER SERVICES */}
        <Card className="neom-card-glass neom-card-glass-hover border border-purple-400/30 overflow-hidden">
          <CardContent className="p-0">
            <div 
              className="p-5 neom-gradient-glass-purple border-b border-purple-400/30 cursor-pointer"
              onClick={() => setActiveDirectoryCategory(activeDirectoryCategory === 'other' ? null : 'other')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl neom-gradient-glass-purple border border-purple-400/50 flex items-center justify-center">
                    <Settings className="w-6 h-6 text-purple-300" />
                  </div>
                  <div>
                    <h3 className="neom-heading-neon text-lg">Other Services</h3>
                    <p className="neom-body text-sm opacity-80">Business services and event planning</p>
                  </div>
                </div>
                <div className={`transform transition-transform duration-300 ${
                  activeDirectoryCategory === 'other' ? 'rotate-90' : ''
                }`}>
                  <ArrowRight className="w-6 h-6 text-purple-300" />
                </div>
              </div>
            </div>

            {activeDirectoryCategory === 'other' && (
              <div className="p-4 space-y-4 neom-fade-in">
                {/* Business & Services */}
                <div className="space-y-3">
                  <h4 className="neom-heading text-base text-purple-300">Business & Services</h4>
                  {hotelDirectoryData.business.items.map((service) => 
                    <div key={service.name}>{renderServiceWithAI(service, 'business', 'purple', false)}</div>
                  )}
                </div>

                {/* Event Booking */}
                <div className="space-y-3 pt-4 border-t border-purple-400/20">
                  <h4 className="neom-heading text-base text-purple-300">Event Booking</h4>
                  <Card 
                    className="neom-card-glass neom-card-glass-hover border border-purple-400/30 cursor-pointer overflow-hidden relative"
                    onClick={() => setCurrentScreen('events-booking')}
                  >
                    <CardContent className="p-4 relative z-10">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl neom-gradient-glass-purple border border-purple-400/50 flex items-center justify-center">
                          <PartyPopper className="w-6 h-6 text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="neom-heading text-lg mb-1">Events Booking</h4>
                          <p className="neom-body text-sm mb-2">Plan and book custom hotel events with AI assistance</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveServiceAI('events');
                              setServiceAIChatMessages(prev => ({
                                ...prev,
                                'events': [{
                                  id: Date.now(),
                                  sender: 'ai',
                                  message: `Hello! I'm your Events Planning assistant. I can help you find venues, plan celebrations, or answer questions about our event spaces. What kind of event are you organizing?`,
                                  timestamp: new Date().toISOString()
                                }]
                              }));
                            }}
                            className="neom-btn-glass neom-shrink-press w-8 h-8 p-0"
                          >
                            <Bot className="w-4 h-4 text-purple-300" />
                          </Button>
                          <ArrowRight className="w-6 h-6 text-purple-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Interactive Hotel Map - Bottom Section (unchanged) */}
        <Card 
          className="neom-card-glass neom-card-glass-hover border border-yellow-400/30 cursor-pointer mt-8"
          onClick={() => setShowHotelMap(true)}
        >
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl neom-gradient-glass-yellow border border-yellow-400/50 flex items-center justify-center">
                <Building className="w-8 h-8 text-yellow-400 neom-glow-yellow" />
              </div>
              <div className="flex-1">
                <h3 className="neom-heading-neon text-xl mb-1">Interactive Hotel Map</h3>
                <p className="neom-body text-sm">Tap to view detailed floor plans and navigation</p>
                <div className="flex items-center space-x-4 mt-2 text-xs">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-cyan-300" />
                    <span className="neom-body text-xs">Navigation</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Building className="w-3 h-3 text-emerald-300" />
                    <span className="neom-body text-xs">Floor Plans</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Search className="w-3 h-3 text-purple-300" />
                    <span className="neom-body text-xs">Search</span>
                  </div>
                </div>
              </div>
              <ArrowRight className="w-6 h-6 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Enhanced Real-Time Tracking Tab
  const renderTrackingTab = () => {
    const filteredTrackingItems = trackingItems.filter(item => {
      switch (item.type) {
        case 'food': return trackingFilters.orders;
        case 'spa': return trackingFilters.appointments;
        case 'luggage': return trackingFilters.services;
        case 'transport': return trackingFilters.transport;
        default: return true;
      }
    });



    const formatElevatorTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      if (mins > 0) return `${mins}:${secs.toString().padStart(2, '0')}`;
      return `${secs}s`;
    };

    return (
      <div className="p-6 pb-24 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="neom-heading mb-2">Live Tracking</h2>
            <p className="neom-body text-sm">Real-time status of all your services</p>
          </div>
          <Badge className="bg-emerald-400/20 text-emerald-300">
            {filteredTrackingItems.length} Active
          </Badge>
        </div>

        {/* Elevator Status - Special Feature */}
        <Card className="neom-card-glass border border-cyan-400/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl neom-gradient-glass-cyan border border-cyan-400/30 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-cyan-400 rounded animate-spin"></div>
                </div>
                <div>
                  <h4 className="neom-heading text-base">Elevator Arrival</h4>
                  <p className="neom-body text-sm">Floor 25 → Your Floor (12)</p>
                </div>
              </div>
              <div className="text-right">
                <div className="neom-mono-yellow text-lg font-bold">{formatElevatorTime(elevatorArrival)}</div>
                <div className="flex items-center space-x-1 mt-1">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <span className="neom-body text-xs">Live</span>
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="w-4 h-4 text-gray-400" />
                <span className="neom-body text-xs">Notify when elevator is 10s away</span>
              </div>
              <Switch 
                checked={notifyWhenElevator}
                onCheckedChange={setNotifyWhenElevator}
                size="sm"
              />
            </div>
          </CardContent>
        </Card>

        {/* Tracking Filters */}
        <Card className="neom-card-glass border border-yellow-400/30">
          <CardHeader>
            <CardTitle className="neom-heading-neon flex items-center text-lg">
              <Settings className="w-5 h-5 mr-2 text-yellow-400" />
              Tracking Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: 'orders', label: 'Food Orders', icon: Utensils, color: 'emerald' },
                { key: 'appointments', label: 'Appointments', icon: Calendar, color: 'purple' },
                { key: 'services', label: 'Room Services', icon: Package, color: 'cyan' },
                { key: 'transport', label: 'Transportation', icon: Car, color: 'orange' }
              ].map((filter) => (
                <div 
                  key={filter.key}
                  className={`flex items-center justify-between p-3 rounded-xl neom-gradient-glass border border-${filter.color}-400/20`}
                >
                  <div className="flex items-center space-x-2">
                    <filter.icon className={`w-4 h-4 text-${filter.color}-400`} />
                    <span className="neom-body text-sm">{filter.label}</span>
                  </div>
                  <Switch 
                    checked={trackingFilters[filter.key as keyof typeof trackingFilters]}
                    onCheckedChange={() => toggleTrackingFilter(filter.key as keyof typeof trackingFilters)}
                    size="sm"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Tracking Items */}
        <Card className="neom-card-glass border border-purple-400/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="neom-heading-neon flex items-center text-lg">
                <Eye className="w-5 h-5 mr-2 text-purple-400" />
                Active Tracking
              </CardTitle>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="neom-body text-xs">Live Updates</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredTrackingItems.length === 0 ? (
              <div className="text-center py-8">
                <Package className="w-12 h-12 mx-auto mb-4 text-gray-400 opacity-50" />
                <p className="neom-body text-sm opacity-70">No active items to track</p>
              </div>
            ) : (
              filteredTrackingItems.map((item) => {
                const IconComponent = item.icon;
                const statusColor = getStatusColor(item.status);
                
                return (
                  <Card 
                    key={item.id}
                    className={`neom-card-glass neom-card-glass-hover border border-${statusColor}-400/30 overflow-hidden`}
                  >
                    <CardContent className="p-4">
                      {/* Item Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start space-x-3">
                          <div className={`w-12 h-12 rounded-xl neom-gradient-glass-${item.color} border border-${item.color}-400/30 flex items-center justify-center`}>
                            <IconComponent className={`w-6 h-6 text-${item.color}-400`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="neom-heading text-base mb-1">{item.title}</h4>
                            <p className="neom-body text-sm mb-2">{item.description}</p>
                            <div className="flex items-center space-x-2">
                              <Badge className={`bg-${statusColor}-400/20 text-${statusColor}-300 text-xs`}>
                                {item.statusText}
                              </Badge>
                              {item.estimatedTime && (
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-3 h-3 text-gray-400" />
                                  <span className="neom-mono text-xs">
                                    {formatTimeRemaining(item.estimatedTime)}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="neom-mono-yellow text-lg font-bold">{item.progress}%</div>
                          {item.status === 'in_transit' && (
                            <div className="flex items-center space-x-1 mt-1">
                              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                              <span className="neom-body text-xs">Moving</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <Progress 
                          value={item.progress} 
                          className="h-2"
                          // className={`progress-${statusColor}`}
                        />
                      </div>

                      {/* Timeline */}
                      <div className="space-y-2 mb-4">
                        {item.timeline.map((step, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                              step.completed 
                                ? `bg-${statusColor}-400 text-black` 
                                : 'bg-gray-600 text-gray-400'
                            }`}>
                              {step.completed ? (
                                <CheckCircle className="w-3 h-3" />
                              ) : (
                                <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                              )}
                            </div>
                            <div className="flex-1 flex items-center justify-between">
                              <span className={`neom-body text-sm ${
                                step.completed ? 'text-white' : 'text-gray-400'
                              }`}>{step.status}</span>
                              <span className="neom-mono text-xs opacity-60">
                                {new Date(step.time).toLocaleTimeString('en-US', { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      {item.actions && item.actions.length > 0 && (
                        <div className="flex items-center space-x-2">
                          {item.actions.map((action, index) => (
                            <Button
                              key={index}
                              onClick={() => handleTrackingAction(item.id, action)}
                              className={`neom-shrink-press text-xs py-1 px-3 ${
                                action.includes('Call') || action.includes('Track')
                                  ? 'neom-btn-primary' 
                                  : 'neom-btn-glass'
                              }`}
                              size="sm"
                            >
                              {action.includes('Call') && <Phone className="w-3 h-3 mr-1" />}
                              {action.includes('Track') && <MapPin className="w-3 h-3 mr-1" />}
                              {action.includes('Rate') && <Star className="w-3 h-3 mr-1" />}
                              {action}
                            </Button>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  // Helper function to calculate stay duration
  const calculateStayDuration = () => {
    const checkIn = new Date('2024-09-26');
    const checkOut = new Date('2024-09-29');
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Helper function for heartbeat animation
  const HeartbeatIcon = () => (
    <div className="relative">
      <Heart className="w-5 h-5 text-red-400 animate-pulse" style={{ animationDuration: '1s' }} />
      <div className="absolute inset-0 w-5 h-5 border-2 border-red-400/30 rounded-full animate-ping" style={{ animationDuration: '1.5s' }}></div>
    </div>
  );

  // Profile Tab
  const renderProfileTab = () => (
    <div className="p-6 pb-24 lg:pb-12 lg:pt-6 space-y-6">
      {/* Top Section – Guest Info - Enhanced Stylish Version */}
      <Card className="neom-card-glass neom-card-glass-hover border border-yellow-400/30 overflow-hidden relative">
        {/* Floating decorative elements */}
        <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-yellow-400/10 to-purple-600/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-cyan-400/10 to-emerald-400/10 rounded-full blur-lg"></div>
        
        <CardContent className="p-8 relative z-10 bg-gradient-to-br from-yellow-400/15 via-purple-400/10 to-cyan-400/15 backdrop-blur-md border-t border-yellow-400/20">
          {/* Guest Avatar with enhanced glow */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 via-purple-500 to-cyan-400 p-1 neom-wellness-glow">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-400 to-cyan-400 flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
              </div>
              {/* Platinum member indicator */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center neom-pulse-yellow">
                <Crown className="w-4 h-4 text-black" />
              </div>
            </div>
          </div>
          
          {/* Guest Name - Enhanced typography */}
          <h2 className="neom-heading text-3xl mb-2 text-center bg-gradient-to-r from-white via-yellow-200 to-cyan-200 bg-clip-text text-transparent">
            {guestInfo?.name || 'Sarah Johnson'}
          </h2>
          
          {/* Hotel Name with glow effect */}
          <div className="text-center mb-6">
            <p className="neom-heading-neon text-xl mb-2 neom-glow-cyan">NEOM Royal Suite</p>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"></div>
          </div>
          
          {/* Room and Stay Info - Redesigned layout */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Room Number */}
            <div className="neom-gradient-glass-yellow p-4 rounded-2xl border border-yellow-400/40 text-center neom-transition hover:scale-105">
              <div className="text-xs neom-body mb-1">Room</div>
              <div className="neom-mono-yellow text-xl font-bold">1205</div>
            </div>
            
            {/* Stay Duration */}
            <div className="neom-gradient-glass-purple p-4 rounded-2xl border border-purple-400/40 text-center neom-transition hover:scale-105">
              <div className="text-xs neom-body mb-1">Stay</div>
              <div className="neom-mono text-xl font-bold text-purple-300">{calculateStayDuration()}</div>
              <div className="text-xs text-purple-400">Nights</div>
            </div>
          </div>
          
          {/* Check-in / Check-out Dates - Stylish timeline */}
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <div className="text-center flex-1">
                <div className="neom-body text-xs mb-1">Check-in</div>
                <div className="neom-mono-yellow text-sm font-bold">Sept 26</div>
              </div>
              
              {/* Timeline connector */}
              <div className="flex-1 flex items-center px-4">
                <div className="w-full h-0.5 bg-gradient-to-r from-yellow-400 via-purple-400 to-cyan-400 relative">
                  <div className="absolute left-0 w-2 h-2 bg-yellow-400 rounded-full -top-0.75 animate-pulse"></div>
                  <div className="absolute right-0 w-2 h-2 bg-cyan-400 rounded-full -top-0.75 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                </div>
              </div>
              
              <div className="text-center flex-1">
                <div className="neom-body text-xs mb-1">Check-out</div>
                <div className="neom-mono text-sm font-bold text-cyan-300">Sept 29</div>
              </div>
            </div>
          </div>
          
          {/* Platinum Status Badge */}
          <div className="text-center mt-6">
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-4 py-2 text-sm font-bold rounded-full neom-glow-yellow">
              ✨ Platinum Member
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Profile Cards Grid - Responsive Layout */}
      <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
        {/* Account Settings Accordion Card */}
        <Card className="neom-card-glass border border-cyan-400/30 overflow-hidden lg:col-span-2">
          <Accordion 
            type="single" 
            collapsible 
            value={accountSettingsExpanded ? "account-settings" : ""}
            onValueChange={(value) => setAccountSettingsExpanded(value === "account-settings")}
          >
            <AccordionItem value="account-settings" className="border-none">
              <AccordionTrigger className="hover:no-underline p-4 group">
                <div className="flex items-center space-x-4 w-full">
                  <div className="w-10 h-10 neom-gradient-glass-cyan rounded-xl border border-cyan-400/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <Settings className="w-5 h-5 text-cyan-300 group-hover:rotate-90 transition-transform duration-300" />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="neom-body font-medium">Account Settings</span>
                    <div className="neom-body text-xs opacity-60 mt-0.5">Manage your account & preferences</div>
                  </div>
                </div>
              </AccordionTrigger>
              
              <AccordionContent className="pt-0 pb-3 neom-slide-in">
                <div className="space-y-2 px-4">
                  {/* Personal Info & Security */}
                  <div
                    onClick={() => navigateToScreen('account-settings')}
                    className="flex items-center space-x-3 p-3 rounded-xl neom-gradient-glass border border-cyan-400/20 cursor-pointer neom-transition hover:border-cyan-400/40 hover:bg-cyan-400/5 group"
                  >
                    <div className="w-8 h-8 neom-gradient-glass-cyan rounded-lg border border-cyan-400/20 flex items-center justify-center">
                      <UserCog className="w-4 h-4 text-cyan-300" />
                    </div>
                    <div className="flex-1">
                      <span className="neom-body text-sm font-medium">Preferences</span>
                      <div className="neom-body text-xs opacity-60">Choose your preferences</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:translate-x-1 group-hover:text-cyan-300 transition-all duration-200" />
                  </div>

                  {/* Notifications */}
                  <div
                    onClick={() => navigateToScreen('notifications')}
                    className="flex items-center space-x-3 p-3 rounded-xl neom-gradient-glass border border-orange-400/20 cursor-pointer neom-transition hover:border-orange-400/40 hover:bg-orange-400/5 group"
                  >
                    <div className="w-8 h-8 neom-gradient-glass-orange rounded-lg border border-orange-400/20 flex items-center justify-center relative">
                      <Bell className="w-4 h-4 text-orange-300" />
                      <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex-1">
                      <span className="neom-body text-sm font-medium">Notifications</span>
                      <div className="neom-body text-xs opacity-60">Alerts & communication</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:translate-x-1 group-hover:text-orange-300 transition-all duration-200" />
                  </div>

                  {/* Language & Region */}
                  <div
                    onClick={() => navigateToScreen('language-region')}
                    className="flex items-center space-x-3 p-3 rounded-xl neom-gradient-glass border border-purple-400/20 cursor-pointer neom-transition hover:border-purple-400/40 hover:bg-purple-400/5 group"
                  >
                    <div className="w-8 h-8 neom-gradient-glass-purple rounded-lg border border-purple-400/20 flex items-center justify-center">
                      <Globe className="w-4 h-4 text-purple-300" />
                    </div>
                    <div className="flex-1">
                      <span className="neom-body text-sm font-medium">Language & Region</span>
                      <div className="neom-body text-xs opacity-60">Localization & preferences</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:translate-x-1 group-hover:text-purple-300 transition-all duration-200" />
                  </div>

                  {/* Help & Safety */}
                  <div
                    onClick={() => navigateToScreen('help-safety')}
                    className="flex items-center space-x-3 p-3 rounded-xl neom-gradient-glass border border-emerald-400/20 cursor-pointer neom-transition hover:border-emerald-400/40 hover:bg-emerald-400/5 group"
                  >
                    <div className="w-8 h-8 neom-gradient-glass-emerald rounded-lg border border-emerald-400/20 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-emerald-300" />
                    </div>
                    <div className="flex-1">
                      <span className="neom-body text-sm font-medium">Help & Safety</span>
                      <div className="neom-body text-xs opacity-60">Support & emergency</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:translate-x-1 group-hover:text-emerald-300 transition-all duration-200" />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>

      {/* Membership & Rewards Card */}
      <Card 
        className="neom-card-glass neom-card-glass-hover border border-yellow-400/30 cursor-pointer neom-transition group overflow-hidden relative"
        onClick={() => navigateToScreen('membership-rewards')}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <CardContent className="p-4 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 neom-gradient-glass-yellow rounded-xl border border-yellow-400/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <Crown className="w-5 h-5 text-yellow-300" />
            </div>
            <div className="flex-1">
              <span className="neom-body font-medium">Membership & Rewards</span>
              <div className="neom-body text-xs opacity-60 mt-0.5">Platinum Elite • 24,750 points</div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 group-hover:text-yellow-300 transition-all duration-200" />
          </div>
        </CardContent>
      </Card>

      {/* Wellness Dashboard Card */}
      <Card 
        className="neom-card-glass neom-card-glass-hover border border-emerald-400/30 cursor-pointer neom-transition group overflow-hidden relative"
        onClick={() => navigateToScreen('wellness-dashboard')}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <CardContent className="p-4 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 neom-gradient-glass-emerald rounded-xl border border-emerald-400/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <Heart className="w-5 h-5 text-emerald-300 neom-heartbeat" />
            </div>
            <div className="flex-1">
              <span className="neom-body font-medium">Wellness Dashboard</span>
              <div className="neom-body text-xs opacity-60 mt-0.5">Health metrics & Apple Watch sync</div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-right">
                <div className="neom-mono text-sm text-emerald-300">{wellnessData.overallScore}</div>
                <div className="neom-body text-xs opacity-60">Score</div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 group-hover:text-emerald-300 transition-all duration-200" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stay History Card - Merged with Digital Twin functionality */}
      <Card 
        className="neom-card-glass neom-card-glass-hover border border-blue-400/30 cursor-pointer neom-transition group overflow-hidden relative"
        onClick={() => navigateToScreen('stay-history')}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <CardContent className="p-4 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 neom-gradient-glass-cyan rounded-xl border border-blue-400/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <Clock className="w-5 h-5 text-blue-300" />
            </div>
            <div className="flex-1">
              <span className="neom-body font-medium">Stay History</span>
              <div className="neom-body text-xs opacity-60 mt-0.5">Past visits, bookings & AI personalization</div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 group-hover:text-blue-300 transition-all duration-200" />
          </div>
        </CardContent>
      </Card>

      {/* Feedback Card */}
      <Card 
        className="neom-card-glass neom-card-glass-hover border border-purple-400/30 cursor-pointer neom-transition group overflow-hidden relative"
        onClick={() => navigateToScreen('feedback')}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <CardContent className="p-4 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 neom-gradient-glass-purple rounded-xl border border-purple-400/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <MessageSquare className="w-5 h-5 text-purple-300" />
            </div>
            <div className="flex-1">
              <span className="neom-body font-medium">Share Your Feedback</span>
              <div className="neom-body text-xs opacity-60 mt-0.5">Rate your stay experience</div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 group-hover:text-purple-300 transition-all duration-200" />
          </div>
        </CardContent>
      </Card>
      </div>

      {/* Enhanced Log Out Button */}
      <div className="pt-6 lg:max-w-md lg:mx-auto">
        <Button 
          onClick={onLogout} 
          className="w-full neom-btn-glass neom-shrink-press group relative overflow-hidden border border-red-400/30 hover:border-red-400/60 transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-400/10 to-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10 flex items-center justify-center space-x-2">
            <div className="w-5 h-5 neom-gradient-glass rounded-lg border border-red-400/30 flex items-center justify-center group-hover:rotate-180 transition-transform duration-300">
              <ArrowRight className="w-3 h-3 text-red-300 rotate-180" />
            </div>
            <span className="group-hover:text-red-300 transition-colors duration-300">Log Out</span>
          </div>
        </Button>
      </div>
    </div>
  );

  // Bottom Navigation
  const renderBottomNav = () => {
    const navItems = isCheckedIn ? [
      { tab: 'home', icon: Home, label: 'Home' },
      { tab: 'digital-key', icon: digitalKeyActive ? Unlock : Lock, label: 'Key' },
      { tab: 'services', icon: ConciergeBell, label: 'Services' },
      { tab: 'profile', icon: User, label: 'Profile' }
    ] : [
      { tab: 'home', icon: Home, label: 'Home' },
      { tab: 'services', icon: ConciergeBell, label: 'Services' },
      { tab: 'tracking', icon: Package, label: 'Tracking' },
      { tab: 'profile', icon: User, label: 'Profile' }
    ];

    return (
      <TooltipProvider>
        <div className="fixed bottom-0 left-0 right-0">
          <div className="max-w-md mx-auto bg-white/70 backdrop-blur-xl border-t border-gray-200/50 shadow-sm">
            <div className="grid grid-cols-4 px-4 py-2">
              {navItems.map(({ tab, icon: Icon, label }) => {
                const isLocked = !hasDigitalKey && tab !== 'home';
                
                if (isLocked) {
                  return (
                    <Tooltip key={tab}>
                      <TooltipTrigger asChild>
                        <Button
                          className="flex flex-col items-center space-y-1 py-3 px-2 text-gray-400 bg-transparent hover:bg-transparent cursor-not-allowed opacity-50"
                        >
                          <Icon className="w-5 h-5" />
                          <span className="text-xs">{label}</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm">Unlock after Check-in or Room Booking</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                }

                return (
                  <Button
                    key={tab}
                    onClick={() => {
                      if (tab === 'digital-key') {
                        navigateToScreen('digital-key');
                      } else {
                        setActiveTab(tab as TabType);
                        setCurrentScreen('tabs');
                      }
                    }}
                    className={`flex flex-col items-center space-y-1 py-3 px-2 ${
                      (activeTab === tab || (tab === 'digital-key' && currentScreen === 'digital-key'))
                        ? 'text-blue-600' 
                        : 'text-gray-600 hover:text-blue-600'
                    } bg-transparent hover:bg-transparent transition-colors duration-200`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs">{label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </TooltipProvider>
    );
  };

  // Membership & Rewards Screen
  const renderMembershipRewardsScreen = () => {

    const handleRedemption = async (reward: any) => {
      if (membershipData.currentPoints >= reward.points) {
        setIsRedeeming(true);
        // Simulate API call
        setTimeout(() => {
          setMembershipData(prev => ({
            ...prev,
            currentPoints: prev.currentPoints - reward.points,
            redeemHistory: [
              { id: Date.now(), item: reward.name, points: reward.points, date: new Date().toISOString().split('T')[0], status: 'Redeemed' },
              ...prev.redeemHistory
            ]
          }));
          setSelectedReward(null);
          setIsRedeeming(false);
        }, 2000);
      }
    };

    const getIconComponent = (iconName: string) => {
      const iconMap = {
        'Sparkles': Sparkles,
        'Bed': Bed,
        'UtensilsCrossed': UtensilsCrossed,
        'Plane': Plane,
        'Car': Car,
        'ConciergeBell': ConciergeBell
      };
      return iconMap[iconName] || Star;
    };

    return (
      <div className="p-6 pb-24 space-y-6">
        <div className="flex items-center space-x-4 mb-6">
          <Button onClick={navigateBack} className="neom-btn-glass neom-shrink-press">
            <ArrowRight className="w-5 h-5 rotate-180" />
          </Button>
          <h2 className="neom-heading-neon text-xl">Membership & Rewards</h2>
        </div>

        {/* Section Tabs */}
        <div className="flex space-x-2 p-1 neom-gradient-glass-yellow rounded-2xl border border-yellow-400/30">
          {[
            { id: 'overview', label: 'Overview', icon: Crown },
            { id: 'rewards', label: 'Rewards', icon: Gift },
            { id: 'history', label: 'History', icon: Clock }
          ].map((section) => (
            <Button
              key={section.id}
              onClick={() => setActiveSection(section.id as any)}
              className={`flex-1 neom-transition ${
                activeSection === section.id
                  ? 'neom-btn-primary'
                  : 'neom-btn-glass border-none bg-transparent hover:bg-yellow-400/10'
              }`}
            >
              <section.icon className="w-4 h-4 mr-2" />
              {section.label}
            </Button>
          ))}
        </div>

        {/* Overview Section */}
        {activeSection === 'overview' && (
          <div className="space-y-6 neom-slide-in">
            {/* Current Tier Status */}
            <Card className="neom-card-glass neom-card-glass-hover border border-yellow-400/30 overflow-hidden relative">
              <div className="absolute top-6 right-4 w-12 h-12 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 rounded-full blur-lg neom-float"></div>
              
              <CardContent className="p-6 relative z-10 text-center">
                <div className="relative mx-auto w-32 h-32 mb-6">
                  {/* Outer tier rings */}
                  <div className="absolute inset-0 rounded-full border-2 border-yellow-400/30 animate-spin" style={{ animationDuration: '20s' }}></div>
                  <div className="absolute inset-2 rounded-full border border-orange-400/40 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
                  
                  {/* Main tier badge */}
                  <div className="absolute inset-4 rounded-full bg-gradient-to-br from-yellow-400/20 to-orange-400/20 animate-pulse neom-glow-yellow"></div>
                  <div className="absolute inset-6 rounded-full bg-gradient-to-br from-yellow-400 via-orange-400 to-yellow-500 flex items-center justify-center backdrop-blur-sm">
                    <Crown className="w-12 h-12 text-black" />
                  </div>
                </div>
                
                <h3 className="neom-heading text-3xl mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  {membershipData.currentTier}
                </h3>
                <p className="neom-body opacity-80 mb-6">The highest tier of luxury</p>
                
                {/* Points Display */}
                <div className="neom-gradient-glass-yellow p-6 rounded-2xl border border-yellow-400/40">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="neom-mono-yellow text-3xl font-bold">{membershipData.currentPoints.toLocaleString()}</div>
                      <div className="neom-body text-sm text-yellow-300">Current Points</div>
                    </div>
                    <div className="text-center">
                      <div className="neom-mono text-2xl font-bold text-orange-300">{membershipData.pointsNeeded.toLocaleString()}</div>
                      <div className="neom-body text-sm text-orange-400">Points to {membershipData.nextTier}</div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="relative">
                    <div className="w-full h-4 bg-gradient-to-r from-black/20 to-black/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all duration-2000 ease-out neom-glow-yellow neom-step-progress"
                        style={{ 
                          width: `${membershipData.progressPercentage}%`,
                          '--target-width': `${membershipData.progressPercentage}%`
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span className="neom-body text-yellow-300">{membershipData.progressPercentage}% to {membershipData.nextTier}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tier Benefits */}
            <Card className="neom-card-glass neom-card-glass-hover border border-yellow-400/30">
              <CardHeader>
                <CardTitle className="neom-heading-neon flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-yellow-400" />
                  {membershipData.currentTier} Benefits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {membershipData.tierBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 neom-gradient-glass rounded-xl border border-yellow-400/20 neom-slide-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                    <span className="neom-body">{benefit}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Rewards Section */}
        {activeSection === 'rewards' && (
          <div className="space-y-6 neom-slide-in">
            <Card className="neom-card-glass neom-card-glass-hover border border-purple-400/30">
              <CardHeader>
                <CardTitle className="neom-heading-neon flex items-center">
                  <Gift className="w-5 h-5 mr-2 text-purple-400" />
                  Available Rewards
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  {membershipData.availableRewards.map((reward, index) => {
                    const IconComponent = getIconComponent(reward.icon);
                    const canAfford = membershipData.currentPoints >= reward.points;
                    
                    return (
                      <Card 
                        key={reward.id} 
                        className={`neom-card-glass neom-card-glass-hover border cursor-pointer group overflow-hidden ${
                          canAfford ? 'border-emerald-400/30 hover:border-emerald-400/50' : 'border-gray-600/30 opacity-60'
                        }`}
                        onClick={() => canAfford && setSelectedReward(reward)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-4">
                            <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${
                              canAfford 
                                ? 'neom-gradient-glass-emerald border-emerald-400/30 group-hover:scale-110' 
                                : 'neom-gradient-glass border-gray-600/30'
                            } transition-transform duration-200`}>
                              <IconComponent className={`w-6 h-6 ${canAfford ? 'text-emerald-400' : 'text-gray-500'}`} />
                            </div>
                            <div className="flex-1">
                              <h4 className="neom-heading text-lg">{reward.name}</h4>
                              <p className="neom-body text-sm opacity-70 capitalize">{reward.category} reward</p>
                            </div>
                            <div className="text-right">
                              <div className={`neom-mono text-lg font-bold ${canAfford ? 'text-emerald-400' : 'text-gray-500'}`}>
                                {reward.points.toLocaleString()}
                              </div>
                              <div className="neom-body text-xs opacity-60">points</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* History Section */}
        {activeSection === 'history' && (
          <div className="space-y-6 neom-slide-in">
            {/* Redemption History */}
            <Card className="neom-card-glass neom-card-glass-hover border border-orange-400/30">
              <CardHeader>
                <CardTitle className="neom-heading-neon flex items-center">
                  <Award className="w-5 h-5 mr-2 text-orange-400" />
                  Redemption History
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {membershipData.redeemHistory.map((item, index) => (
                  <div key={item.id} className="flex items-center justify-between p-3 neom-gradient-glass rounded-xl border border-orange-400/20">
                    <div className="flex-1">
                      <div className="neom-heading text-sm">{item.item}</div>
                      <div className="neom-body text-xs opacity-60">{item.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="neom-mono text-orange-400">-{item.points.toLocaleString()}</div>
                      <Badge className="bg-orange-400/20 text-orange-300 text-xs">{item.status}</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Earning History */}
            <Card className="neom-card-glass neom-card-glass-hover border border-cyan-400/30">
              <CardHeader>
                <CardTitle className="neom-heading-neon flex items-center">
                  <Plus className="w-5 h-5 mr-2 text-cyan-400" />
                  Points Earned
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {membershipData.earnHistory.map((item, index) => (
                  <div key={item.id} className="flex items-center justify-between p-3 neom-gradient-glass rounded-xl border border-cyan-400/20">
                    <div className="flex-1">
                      <div className="neom-heading text-sm">{item.activity}</div>
                      <div className="neom-body text-xs opacity-60">{item.date}</div>
                    </div>
                    <div className="neom-mono text-cyan-400">+{item.points.toLocaleString()}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Reward Redemption Modal */}
        {selectedReward && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-6">
            <Card className="neom-card-glass neom-card-glass-hover border border-emerald-400/30 w-full max-w-md neom-slide-in">
              <CardHeader>
                <CardTitle className="neom-heading-neon flex items-center justify-center">
                  <Gift className="w-6 h-6 mr-2 text-emerald-400" />
                  Redeem Reward
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-center">
                <div className="w-20 h-20 mx-auto neom-gradient-glass-emerald border border-emerald-400/30 rounded-2xl flex items-center justify-center">
                  {React.createElement(getIconComponent(selectedReward.icon), { className: 'w-10 h-10 text-emerald-400' })}
                </div>
                
                <div>
                  <h3 className="neom-heading text-2xl mb-2">{selectedReward.name}</h3>
                  <p className="neom-body opacity-70 mb-4">Are you sure you want to redeem this reward?</p>
                  <div className="neom-mono-yellow text-xl font-bold">
                    {selectedReward.points.toLocaleString()} Points
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    onClick={() => setSelectedReward(null)}
                    className="neom-btn-glass"
                    disabled={isRedeeming}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={() => handleRedemption(selectedReward)}
                    className="neom-btn-primary"
                    disabled={isRedeeming}
                  >
                    {isRedeeming ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                        <span>Redeeming...</span>
                      </div>
                    ) : (
                      'Redeem Now'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  };

  // Stay History Screen
  const renderStayHistoryScreen = () => {
    const staysData = [
      {
        property: "NEOM Bay Resort",
        location: "Dubai, UAE",
        dates: "Dec 15-18, 2024",
        roomType: "Oceanview Suite",
        roomNumber: "1205",
        totalCost: "$2,847.50",
        rating: 5,
        insights: ["Preferred 68°F temperature", "Late checkout requests", "Spa services"],
        bookingRef: "NBR-2024-1205",
        paymentMethod: "Digital Wallet",
        preferenceHistory: {
          roomPreferences: {
            temperature: "68°F (20°C)",
            lighting: "Warm lighting (3200K)",
            pillowType: "Memory foam",
            bedConfiguration: "King size",
            quietRoom: true
          },
          dietaryPreferences: {
            dietType: "Vegetarian",
            allergies: ["Peanut", "Shellfish"],
            cuisines: ["Italian", "Mexican"],
            restrictions: "No spicy food"
          },
          servicePreferences: {
            housekeeping: "Morning (10:00 AM)",
            doNotDisturb: ["2:00 PM - 4:00 PM"],
            wakeUpCall: "7:00 AM",
            checkout: "Late (2:00 PM)"
          },
          amenitiesUsed: ["Spa & Wellness", "Infinity Pool", "Fitness Center", "Room Service"],
          digitalTwinInsights: ["Preferred 68°F temperature during entire stay", "Requested late checkout twice", "Booked spa services 3 times"]
        }
      },
      {
        property: "NEOM City Center",
        location: "Riyadh, SA",
        dates: "Nov 10-12, 2024",
        roomType: "Executive Room",
        roomNumber: "820",
        totalCost: "$1,234.00",
        rating: 4,
        insights: ["Vegetarian meals", "7 AM wake-up calls", "Pool access"],
        bookingRef: "NCC-2024-0820",
        paymentMethod: "Credit Card",
        preferenceHistory: {
          roomPreferences: {
            temperature: "70°F (21°C)",
            lighting: "Bright lighting (5000K)",
            pillowType: "Feather",
            bedConfiguration: "Queen size",
            quietRoom: false
          },
          dietaryPreferences: {
            dietType: "Vegetarian",
            allergies: ["Gluten"],
            cuisines: ["Chinese", "Spanish"],
            restrictions: "Low sodium"
          },
          servicePreferences: {
            housekeeping: "Afternoon (2:00 PM)",
            doNotDisturb: ["12:00 PM - 1:00 PM"],
            wakeUpCall: "7:00 AM",
            checkout: "Standard (12:00 PM)"
          },
          amenitiesUsed: ["Swimming Pool", "Business Center", "Gym"],
          digitalTwinInsights: ["Consistent 7 AM wake-up calls", "Used pool facilities daily", "Preferred vegetarian dining options"]
        }
      },
      {
        property: "NEOM Royal Suite",
        location: "NEOM, SA",
        dates: "Sept 26-29, 2024",
        roomType: "Presidential Suite",
        roomNumber: "2501",
        totalCost: "$4,567.89",
        rating: 5,
        insights: ["Current stay", "Enhanced wellness tracking", "Premium amenities"],
        bookingRef: "NRS-2024-2501",
        paymentMethod: "Digital Wallet",
        preferenceHistory: {
          roomPreferences: {
            temperature: "68°F (20°C)",
            lighting: "Dynamic (Auto-adjust)",
            pillowType: "Memory foam",
            bedConfiguration: "King size with extra pillows",
            quietRoom: true
          },
          dietaryPreferences: {
            dietType: "Vegan",
            allergies: ["Lactose", "Nuts"],
            cuisines: ["Italian", "Other: Japanese"],
            restrictions: "Organic ingredients preferred"
          },
          servicePreferences: {
            housekeeping: "Morning (9:00 AM)",
            doNotDisturb: ["3:00 PM - 5:00 PM"],
            wakeUpCall: "6:30 AM",
            checkout: "Late (3:00 PM)"
          },
          amenitiesUsed: ["Spa & Wellness", "Infinity Pool", "Private Chef", "Personal Trainer", "VR Experience"],
          digitalTwinInsights: ["Premium wellness tracking enabled", "Used all available premium amenities", "Maintained consistent sleep schedule"]
        }
      }
    ];

    return (
      <div className="p-6 pb-24 space-y-6">
        <div className="flex items-center space-x-4 mb-6">
          <Button onClick={navigateBack} className="neom-btn-glass neom-shrink-press">
            <ArrowRight className="w-5 h-5 rotate-180" />
          </Button>
          <h2 className="neom-heading-neon text-xl">Stay History</h2>
        </div>

        {/* Past Stays Timeline */}
        <div className="space-y-4">
          <h4 className="neom-heading-neon text-base mb-4 flex items-center">
            <Building className="w-5 h-5 mr-3 text-blue-400" />
            Your Previous Stays
          </h4>
          
          {staysData.map((stay, index) => (
            <Card key={index} className="neom-card-glass neom-card-glass-hover border border-blue-400/30 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h5 className="neom-heading text-lg text-blue-300 mb-1">{stay.property}</h5>
                    <p className="neom-body text-sm opacity-80">{stay.location}</p>
                  </div>
                  <Badge className="bg-blue-400/20 text-blue-300 border border-blue-400/30">
                    {stay.dates}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Bed className="w-4 h-4 text-purple-400" />
                    <span className="neom-body text-sm">{stay.roomType}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building className="w-4 h-4 text-cyan-400" />
                    <span className="neom-body text-sm">Room {stay.roomNumber}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    <span className="neom-body text-sm">{stay.totalCost}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Receipt className="w-4 h-4 text-orange-400" />
                    <span className="neom-body text-sm">{stay.bookingRef}</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="neom-body text-sm font-medium">Your Rating:</span>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < stay.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                      />
                    ))}
                  </div>
                </div>
                
                {/* AI Insights */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 mb-3">
                    <Bot className="w-4 h-4 text-cyan-400" />
                    <span className="neom-body text-sm font-medium text-cyan-300">Remembered Preferences</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {stay.insights.map((insight, i) => (
                      <Badge key={i} className="bg-purple-400/10 text-purple-300 text-xs border border-purple-400/20">
                        {insight}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-700/30">
                  <Button 
                    onClick={() => {
                      setSelectedStayForReceipt(stay);
                      setShowReceiptModal(true);
                    }}
                    className="neom-btn-glass text-xs flex items-center space-x-2 border-orange-400/30 hover:border-orange-400/50 hover:bg-orange-400/10"
                  >
                    <Receipt className="w-3 h-3 text-orange-400" />
                    <span>View Receipt</span>
                  </Button>
                  <Button className="neom-btn-glass text-xs flex items-center space-x-2">
                    <RotateCcw className="w-3 h-3" />
                    <span>Book Again</span>
                  </Button>
                  <Button 
                    onClick={() => setSelectedStayForPreferences(stay)}
                    className="neom-btn-glass text-xs flex items-center space-x-2 border-emerald-400/30 hover:border-emerald-400/50 hover:bg-emerald-400/10"
                  >
                    <Eye className="w-3 h-3 text-emerald-400" />
                    <span>View Preferences</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Preference History Modal */}
        {selectedStayForPreferences && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <Card className="neom-card-glass border border-emerald-400/30 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <CardHeader className="sticky top-0 bg-black/90 backdrop-blur-md z-10 border-b border-emerald-400/20">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="neom-heading-neon text-xl flex items-center">
                      <Eye className="w-5 h-5 mr-2 text-emerald-400" />
                      Preference History
                    </CardTitle>
                    <p className="neom-body text-sm opacity-70 mt-1">
                      {selectedStayForPreferences.property} • {selectedStayForPreferences.dates}
                    </p>
                  </div>
                  <Button 
                    onClick={() => setSelectedStayForPreferences(null)}
                    className="neom-btn-glass neom-shrink-press"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="p-6 space-y-6">
                {/* Room Preferences */}
                <div>
                  <h4 className="neom-heading-neon text-base mb-3 flex items-center">
                    <Bed className="w-4 h-4 mr-2 text-purple-400" />
                    Room Preferences
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(selectedStayForPreferences.preferenceHistory.roomPreferences).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-3 neom-gradient-glass rounded-xl border border-purple-400/20">
                        <span className="neom-body text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                        <span className="neom-mono text-sm text-purple-300">{typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dietary Preferences */}
                <div>
                  <h4 className="neom-heading-neon text-base mb-3 flex items-center">
                    <ChefHat className="w-4 h-4 mr-2 text-emerald-400" />
                    Dietary Preferences
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 neom-gradient-glass rounded-xl border border-emerald-400/20">
                      <span className="neom-body text-sm">Diet Type:</span>
                      <span className="neom-mono text-sm text-emerald-300">{selectedStayForPreferences.preferenceHistory.dietaryPreferences.dietType}</span>
                    </div>
                    <div className="p-3 neom-gradient-glass rounded-xl border border-emerald-400/20">
                      <span className="neom-body text-sm block mb-2">Allergies:</span>
                      <div className="flex flex-wrap gap-2">
                        {selectedStayForPreferences.preferenceHistory.dietaryPreferences.allergies.map((allergy: string) => (
                          <Badge key={allergy} className="bg-orange-400/20 text-orange-300 border border-orange-400/30 text-xs">
                            {allergy}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="p-3 neom-gradient-glass rounded-xl border border-emerald-400/20">
                      <span className="neom-body text-sm block mb-2">Preferred Cuisines:</span>
                      <div className="flex flex-wrap gap-2">
                        {selectedStayForPreferences.preferenceHistory.dietaryPreferences.cuisines.map((cuisine: string) => (
                          <Badge key={cuisine} className="bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 text-xs">
                            {cuisine}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {selectedStayForPreferences.preferenceHistory.dietaryPreferences.restrictions && (
                      <div className="flex items-center justify-between p-3 neom-gradient-glass rounded-xl border border-emerald-400/20">
                        <span className="neom-body text-sm">Restrictions:</span>
                        <span className="neom-mono text-sm text-emerald-300">{selectedStayForPreferences.preferenceHistory.dietaryPreferences.restrictions}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Service Preferences */}
                <div>
                  <h4 className="neom-heading-neon text-base mb-3 flex items-center">
                    <ConciergeBell className="w-4 h-4 mr-2 text-cyan-400" />
                    Service Preferences
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(selectedStayForPreferences.preferenceHistory.servicePreferences).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-3 neom-gradient-glass rounded-xl border border-cyan-400/20">
                        <span className="neom-body text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                        <span className="neom-mono text-sm text-cyan-300">{Array.isArray(value) ? value.join(', ') : value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amenities Used */}
                <div>
                  <h4 className="neom-heading-neon text-base mb-3 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
                    Amenities Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedStayForPreferences.preferenceHistory.amenitiesUsed.map((amenity: string) => (
                      <Badge key={amenity} className="bg-yellow-400/20 text-yellow-300 border border-yellow-400/30">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Digital Twin Insights */}
                <div>
                  <h4 className="neom-heading-neon text-base mb-3 flex items-center">
                    <Bot className="w-4 h-4 mr-2 text-blue-400" />
                    AI Insights
                  </h4>
                  <div className="space-y-2">
                    {selectedStayForPreferences.preferenceHistory.digitalTwinInsights.map((insight: string, i: number) => (
                      <div key={i} className="flex items-start space-x-3 p-3 neom-gradient-glass rounded-xl border border-blue-400/20">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span className="neom-body text-sm">{insight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Close Button */}
                <Button 
                  onClick={() => setSelectedStayForPreferences(null)}
                  className="w-full neom-btn-primary neom-shrink-press"
                >
                  Close
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Receipt Modal */}
        {showReceiptModal && selectedStayForReceipt && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <Card className="neom-card-glass border border-orange-400/30 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <CardHeader className="sticky top-0 bg-black/90 backdrop-blur-md z-10 border-b border-orange-400/20">
                <div className="flex items-center justify-between">
                  <CardTitle className="neom-heading-neon flex items-center text-orange-400">
                    <Receipt className="w-5 h-5 mr-2" />
                    Receipt - Stay #{selectedStayForReceipt.bookingRef}
                  </CardTitle>
                  <Button 
                    onClick={() => {
                      setShowReceiptModal(false);
                      setSelectedStayForReceipt(null);
                    }}
                    className="neom-btn-glass neom-shrink-press text-orange-400 hover:bg-orange-400/10"
                    size="sm"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="p-6 space-y-6">
                {/* Receipt Header */}
                <div className="text-center border-b border-orange-400/20 pb-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center">
                    <span className="text-black font-bold text-2xl">N</span>
                  </div>
                  <h3 className="neom-heading text-xl text-orange-400 mb-2">NEOM Hospitality</h3>
                  <p className="neom-body text-sm opacity-80">{selectedStayForReceipt.property}</p>
                  <p className="neom-body text-sm opacity-80">{selectedStayForReceipt.location}</p>
                </div>

                {/* Receipt Details */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="neom-body text-sm opacity-80">Date:</span>
                      <span className="neom-mono text-sm">{selectedStayForReceipt.dates}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="neom-body text-sm opacity-80">Transaction ID:</span>
                      <span className="neom-mono text-sm">TXN-{Date.now().toString().slice(-8)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="neom-body text-sm opacity-80">Booking Ref:</span>
                      <span className="neom-mono text-sm">{selectedStayForReceipt.bookingRef}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="neom-body text-sm opacity-80">Room:</span>
                      <span className="neom-mono text-sm">{selectedStayForReceipt.roomNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="neom-body text-sm opacity-80">Room Type:</span>
                      <span className="neom-mono text-sm">{selectedStayForReceipt.roomType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="neom-body text-sm opacity-80">Payment:</span>
                      <span className="neom-mono text-sm">{selectedStayForReceipt.paymentMethod}</span>
                    </div>
                  </div>
                </div>

                {/* Items & Services */}
                <div className="space-y-4">
                  <h4 className="neom-heading-neon text-base border-b border-orange-400/20 pb-2">
                    Items & Services Billed
                  </h4>
                  
                  <div className="space-y-3">
                    {/* Room Charges */}
                    <div className="flex justify-between items-center p-3 neom-gradient-glass rounded-xl border border-orange-400/20">
                      <div>
                        <span className="neom-body font-medium">Room Charges</span>
                        <p className="neom-body text-xs opacity-70">{selectedStayForReceipt.roomType} - 3 nights</p>
                      </div>
                      <span className="neom-mono text-sm">$3,450.00</span>
                    </div>

                    {/* Additional Services */}
                    <div className="flex justify-between items-center p-3 neom-gradient-glass rounded-xl border border-orange-400/20">
                      <div>
                        <span className="neom-body font-medium">Spa & Wellness Services</span>
                        <p className="neom-body text-xs opacity-70">Massage therapy, Sauna access</p>
                      </div>
                      <span className="neom-mono text-sm">$450.00</span>
                    </div>

                    <div className="flex justify-between items-center p-3 neom-gradient-glass rounded-xl border border-orange-400/20">
                      <div>
                        <span className="neom-body font-medium">Dining Services</span>
                        <p className="neom-body text-xs opacity-70">Room service, Restaurant meals</p>
                      </div>
                      <span className="neom-mono text-sm">$320.00</span>
                    </div>

                    <div className="flex justify-between items-center p-3 neom-gradient-glass rounded-xl border border-orange-400/20">
                      <div>
                        <span className="neom-body font-medium">Resort Fees & Amenities</span>
                        <p className="neom-body text-xs opacity-70">Pool access, Wi-Fi, Gym</p>
                      </div>
                      <span className="neom-mono text-sm">$180.00</span>
                    </div>
                  </div>
                </div>

                {/* Billing Summary */}
                <div className="space-y-3 border-t border-orange-400/20 pt-4">
                  <div className="flex justify-between">
                    <span className="neom-body">Subtotal:</span>
                    <span className="neom-mono">$4,400.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="neom-body">Service Charge (5%):</span>
                    <span className="neom-mono">$220.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="neom-body">VAT (15%):</span>
                    <span className="neom-mono">$693.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="neom-body">Tourism Tax:</span>
                    <span className="neom-mono">$45.00</span>
                  </div>
                  <div className="border-t border-orange-400/20 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="neom-heading text-lg text-orange-400">Total Amount:</span>
                      <span className="neom-mono text-xl font-bold text-orange-400">{selectedStayForReceipt.totalCost}</span>
                    </div>
                  </div>
                </div>

                {/* Staff Information */}
                <div className="p-4 neom-gradient-glass rounded-xl border border-orange-400/20">
                  <h4 className="neom-heading-neon text-sm mb-3 flex items-center">
                    <Users className="w-4 h-4 mr-2 text-orange-400" />
                    Staff on Duty
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="neom-body opacity-70">Front Desk Manager:</span>
                      <p className="neom-mono">Sarah Al-Rashid</p>
                    </div>
                    <div>
                      <span className="neom-body opacity-70">Housekeeping Supervisor:</span>
                      <p className="neom-mono">Ahmed Hassan</p>
                    </div>
                    <div>
                      <span className="neom-body opacity-70">Spa Manager:</span>
                      <p className="neom-mono">Layla Al-Zahra</p>
                    </div>
                    <div>
                      <span className="neom-body opacity-70">Concierge:</span>
                      <p className="neom-mono">Omar Al-Fayed</p>
                    </div>
                  </div>
                </div>

                {/* Download Receipt Button */}
                <Button 
                  onClick={() => {
                    // Generate and download PDF receipt
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    if (!ctx) return;

                    // Set canvas size for A4-like dimensions
                    canvas.width = 794;
                    canvas.height = 1123;

                    // Fill background
                    ctx.fillStyle = '#0B0B0B';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);

                    // Add NEOM header
                    ctx.fillStyle = '#FFD700';
                    ctx.font = 'bold 32px Inter, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText('NEOM HOSPITALITY', canvas.width / 2, 80);

                    // Add property name
                    ctx.fillStyle = '#CCCCCC';
                    ctx.font = '18px Inter, sans-serif';
                    ctx.fillText(selectedStayForReceipt.property, canvas.width / 2, 110);
                    ctx.fillText(selectedStayForReceipt.location, canvas.width / 2, 135);

                    // Add receipt details
                    ctx.fillStyle = '#FFFFFF';
                    ctx.font = '16px Inter, sans-serif';
                    ctx.textAlign = 'left';
                    let yPos = 200;
                    
                    const receiptData = [
                      `Date: ${selectedStayForReceipt.dates}`,
                      `Transaction ID: TXN-${Date.now().toString().slice(-8)}`,
                      `Booking Ref: ${selectedStayForReceipt.bookingRef}`,
                      `Room: ${selectedStayForReceipt.roomNumber} (${selectedStayForReceipt.roomType})`,
                      `Payment Method: ${selectedStayForReceipt.paymentMethod}`,
                      '',
                      'ITEMS & SERVICES:',
                      'Room Charges (3 nights) ........................ $3,450.00',
                      'Spa & Wellness Services ........................ $450.00',
                      'Dining Services ................................ $320.00',
                      'Resort Fees & Amenities ....................... $180.00',
                      '',
                      'Subtotal: $4,400.00',
                      'Service Charge (5%): $220.00',
                      'VAT (15%): $693.00',
                      'Tourism Tax: $45.00',
                      '',
                      `TOTAL AMOUNT: ${selectedStayForReceipt.totalCost}`,
                      '',
                      'STAFF ON DUTY:',
                      'Front Desk Manager: Sarah Al-Rashid',
                      'Housekeeping Supervisor: Ahmed Hassan',
                      'Spa Manager: Layla Al-Zahra',
                      'Concierge: Omar Al-Fayed'
                    ];

                    receiptData.forEach(line => {
                      if (line.startsWith('TOTAL AMOUNT:')) {
                        ctx.fillStyle = '#FFD700';
                        ctx.font = 'bold 18px Inter, sans-serif';
                      } else if (line === 'ITEMS & SERVICES:' || line === 'STAFF ON DUTY:') {
                        ctx.fillStyle = '#17C3B2';
                        ctx.font = 'bold 16px Inter, sans-serif';
                      } else {
                        ctx.fillStyle = '#CCCCCC';
                        ctx.font = '14px Inter, sans-serif';
                      }
                      
                      if (line.trim()) {
                        ctx.fillText(line, 80, yPos);
                      }
                      yPos += 25;
                    });

                    // Convert to blob and download
                    canvas.toBlob((blob) => {
                      if (!blob) return;
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = `NEOM-Receipt-${selectedStayForReceipt.bookingRef}.png`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      URL.revokeObjectURL(url);
                    });
                  }}
                  className="w-full neom-btn-primary neom-shrink-press flex items-center justify-center space-x-2"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Receipt (PDF)</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  };

  // Digital Twin Screen
  const renderDigitalTwinScreen = () => {
    return (
      <div className="p-6 pb-24 space-y-6">
        <div className="flex items-center space-x-4 mb-6">
          <Button onClick={navigateBack} className="neom-btn-glass neom-shrink-press">
            <ArrowRight className="w-5 h-5 rotate-180" />
          </Button>
          <h2 className="neom-heading-neon text-xl">Digital Twin</h2>
        </div>

        {/* Digital Twin Overview */}
        <Card className="neom-card-glass border border-purple-400/30 overflow-hidden relative">
          <div className="absolute top-4 right-6 w-10 h-10 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-lg neom-float"></div>
          <div className="absolute bottom-6 left-8 w-8 h-8 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-md neom-float" style={{ animationDelay: '1.5s' }}></div>
          
          <CardContent className="p-6 relative z-10">
            <div className="text-center mb-6">
              <div className="relative mx-auto w-24 h-24 mb-4">
                {/* Outer orbital rings */}
                <div className="absolute inset-0 rounded-full border-2 border-blue-400/20 animate-spin" style={{ animationDuration: '25s' }}></div>
                <div className="absolute inset-1 rounded-full border border-purple-400/30 animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }}></div>
                
                {/* Main digital twin icon */}
                <div className="absolute inset-3 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 animate-pulse"></div>
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400 flex items-center justify-center backdrop-blur-sm">
                  <User className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h3 className="neom-heading text-lg mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Your Digital Twin
              </h3>
              <p className="neom-body text-sm opacity-80 mb-4">AI-powered personalization across all NEOM properties</p>
            </div>

            {/* Cross-Property Sync Status */}
            <div className="text-center p-4 neom-gradient-glass-blue rounded-xl border border-blue-400/30 mb-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="neom-body font-medium">Global Preferences Synced</span>
              </div>
              <p className="neom-body text-xs opacity-70">
                Your preferences are automatically applied across all NEOM properties worldwide
              </p>
            </div>

            {/* Preference Categories */}
            <div className="space-y-4">
              <h4 className="neom-heading-neon text-base mb-3 flex items-center">
                <Settings className="w-4 h-4 mr-2 text-purple-400" />
                Learned Preferences
              </h4>

              {[
                {
                  category: "Room Environment",
                  icon: Thermometer,
                  color: "blue",
                  preferences: ["Temperature: 68°F", "Lighting: Warm", "Humidity: 45%"]
                },
                {
                  category: "Service Preferences",
                  icon: ConciergeBell,
                  color: "emerald",
                  preferences: ["Housekeeping: Morning", "Late Checkout", "Quiet Floor"]
                },
                {
                  category: "Dining & Lifestyle",
                  icon: UtensilsCrossed,
                  color: "orange",
                  preferences: ["Vegetarian meals", "Early wake-up calls", "Spa treatments"]
                },
                {
                  category: "Technology & Access",
                  icon: Smartphone,
                  color: "cyan",
                  preferences: ["Premium WiFi", "Smart room controls", "Digital key preferred"]
                }
              ].map((category, index) => (
                <Card key={index} className="neom-card-glass border border-gray-700/30">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`w-8 h-8 rounded-lg neom-gradient-glass-${category.color} border border-${category.color}-400/30 flex items-center justify-center`}>
                        <category.icon className={`w-4 h-4 text-${category.color}-300`} />
                      </div>
                      <h5 className="neom-heading text-sm">{category.category}</h5>
                    </div>
                    <div className="space-y-2">
                      {category.preferences.map((pref, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <CheckCircle2 className="w-3 h-3 text-green-400" />
                          <span className="neom-body text-xs">{pref}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* AI Learning Status */}
            <Card className="neom-card-glass border border-yellow-400/30 mt-6">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Bot className="w-5 h-5 text-yellow-400 animate-pulse" />
                  <h5 className="neom-heading text-sm">AI Learning Progress</h5>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="neom-body">Profile Completeness</span>
                      <span className="neom-mono text-yellow-400">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="neom-body">Prediction Accuracy</span>
                      <span className="neom-mono text-cyan-400">94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Wellness Dashboard Screen
  const renderWellnessDashboardScreen = () => {
    return (
      <div className="p-6 pb-24 space-y-6">
        <div className="flex items-center space-x-4 mb-6">
          <Button onClick={navigateBack} className="neom-btn-glass neom-shrink-press">
            <ArrowRight className="w-5 h-5 rotate-180" />
          </Button>
          <h2 className="neom-heading-neon text-xl">Wellness Dashboard</h2>
        </div>

        {/* Overall Wellness Score - Enhanced with orbital rings */}
        <Card className="neom-card-glass border border-emerald-400/30 overflow-hidden relative">
          {/* Floating particles effect */}
          <div className="absolute top-2 right-8 w-8 h-8 bg-emerald-400/20 rounded-full blur-lg neom-float"></div>
          <div className="absolute bottom-6 left-6 w-6 h-6 bg-cyan-400/20 rounded-full blur-md neom-float" style={{ animationDelay: '1s' }}></div>
          
          <CardContent className="p-6 relative z-10">
            <div className="text-center mb-6">
              <div className="relative mx-auto w-32 h-32 mb-4">
                {/* Outer orbital rings */}
                <div className="absolute inset-0 rounded-full border-2 border-emerald-400/20 animate-spin" style={{ animationDuration: '20s' }}></div>
                <div className="absolute inset-2 rounded-full border border-cyan-400/30 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
                
                {/* Main score circle */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 animate-pulse neom-wellness-glow"></div>
                <div className="absolute inset-6 rounded-full bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 flex items-center justify-center backdrop-blur-sm">
                  <span className="neom-mono text-3xl font-bold text-black">{wellnessData.overallScore}</span>
                </div>
                
                {/* Score indicator dots */}
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-emerald-400 rounded-full -translate-x-1/2 animate-pulse"></div>
                <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-cyan-400 rounded-full -translate-x-1/2 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              </div>
              
              <h3 className="neom-heading text-2xl mb-2 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Wellness Score
              </h3>
              
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="relative">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-emerald-400 rounded-full animate-ping opacity-30"></div>
                </div>
                <span className="neom-body text-sm text-emerald-300 font-medium">Apple Watch connected</span>
                <div className="px-2 py-1 bg-emerald-400/20 rounded-full">
                  <span className="neom-body text-xs text-emerald-300">Live</span>
                </div>
              </div>
            </div>

            {/* Health Metrics - Enhanced cards with better styling */}
            <div className="grid grid-cols-1 gap-4 mb-6">
              {/* Heart Rate - Enhanced */}
              <Card className="neom-card-glass border border-red-400/30">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <HeartbeatIcon />
                      <div className="absolute -inset-2 border border-red-400/20 rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex-1">
                      <div className="neom-mono-yellow text-2xl font-bold">{wellnessData.heartRate} BPM</div>
                      <div className="neom-body text-sm text-red-300">Heart Rate</div>
                    </div>
                    <div className="w-20">
                      <div className="h-2 bg-gradient-to-r from-red-400/20 to-emerald-400/20 rounded-full">
                        <div className="h-full w-3/4 bg-gradient-to-r from-red-400 to-emerald-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sleep - Enhanced */}
              <Card className="neom-card-glass border border-purple-400/30">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full opacity-80 relative">
                        <div className="absolute top-1 left-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
                        <div className="absolute top-0 right-1 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                        <div className="absolute bottom-1 right-0 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="neom-mono-yellow text-2xl font-bold">{wellnessData.sleepHours} Hours</div>
                      <div className="neom-body text-sm text-purple-300">Sleep Quality</div>
                    </div>
                    <div className="w-20">
                      <div className="h-2 bg-gradient-to-r from-purple-400/20 to-indigo-400/20 rounded-full">
                        <div className="h-full w-4/5 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Steps - Enhanced with circular progress */}
              <Card className="neom-card-glass border border-cyan-400/30">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-10 h-10">
                      {/* Circular progress background */}
                      <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="16" fill="transparent" stroke="rgba(34, 197, 94, 0.2)" strokeWidth="2"></circle>
                        <circle 
                          cx="18" 
                          cy="18" 
                          r="16" 
                          fill="transparent" 
                          stroke="rgb(34, 197, 94)" 
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeDasharray={`${(wellnessData.steps / wellnessData.stepGoal) * 100} 100`}
                          className="transition-all duration-1000 ease-out"
                        ></circle>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="neom-mono-yellow text-2xl font-bold">{(wellnessData.steps / 1000).toFixed(1)}k Steps</div>
                      <div className="neom-body text-sm text-cyan-300">{Math.round((wellnessData.steps / wellnessData.stepGoal) * 100)}% of {(wellnessData.stepGoal / 1000).toFixed(0)}k goal</div>
                    </div>
                    <div className="text-right">
                      <div className="neom-mono text-lg text-cyan-400">{wellnessData.steps.toLocaleString()}</div>
                      <div className="neom-body text-xs opacity-60">Total</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Device Connection Status */}
            <Card className="neom-card-glass border border-emerald-400/30">
              <CardContent className="p-4">
                <h4 className="neom-heading text-base mb-4 flex items-center">
                  <Smartphone className="w-4 h-4 mr-2 text-emerald-400" />
                  Connected Devices
                </h4>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 neom-gradient-glass-emerald rounded-xl border border-emerald-400/20">
                    <div className="relative">
                      <div className="w-8 h-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-emerald-400/30 flex items-center justify-center">
                        <div className="w-4 h-4 bg-emerald-400 rounded-sm"></div>
                      </div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex-1">
                      <div className="neom-body font-medium">Apple Watch Series 9</div>
                      <div className="neom-body text-xs opacity-60">Connected • Real-time sync</div>
                    </div>
                    <div className="text-right">
                      <div className="neom-body text-xs text-emerald-300">100%</div>
                      <div className="neom-body text-xs opacity-60">Battery</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 neom-gradient-glass rounded-xl border border-gray-600/30 opacity-60">
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg border border-gray-600/30 flex items-center justify-center">
                      <Smartphone className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <div className="neom-body font-medium">Fitness Tracker</div>
                      <div className="neom-body text-xs opacity-60">Available to connect</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced sync info with status indicators */}
            <div className="text-center mt-6 p-4 neom-gradient-glass rounded-xl border border-emerald-400/30">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="neom-body text-sm font-medium">Real-time Monitoring Active</span>
              </div>
              <span className="neom-body text-xs opacity-70">
                Last sync: {wellnessData.lastSyncTime.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Main render function with screen routing
  const renderCurrentTab = () => {
    // Handle AR/VR Preview screen
    if (arvrPreview.active) {
      return renderServiceArVrPreviewScreen();
    }
    
    // Handle Service AI Chat screen
    if (activeServiceAI) {
      return renderServiceAiChatScreen();
    }
    
    if (currentScreen !== 'tabs') {
      switch (currentScreen) {
        case 'digital-key':
          return renderDigitalKeyScreen();
        case 'ai-concierge':
          return renderAiConciergeScreen();
        case 'checkout':
          return renderCheckoutScreen();
        case 'checkout-flow':
          return (
            <CheckoutFlow
              onClose={() => setCurrentScreen('tabs')}
              checkoutData={checkoutData}
              staffMembers={staffMembers}
              favoriteStaff={favoriteStaff}
              onFavoriteToggle={(staffName) => {
                const newFavorites = favoriteStaff.includes(staffName)
                  ? favoriteStaff.filter(f => f !== staffName)
                  : [...favoriteStaff, staffName];
                setFavoriteStaff(newFavorites);
              }}
              onPayTipFromWallet={(staffName, amount) => {
                if (walletBalance >= amount) {
                  setWalletBalance(prev => prev - amount);
                }
              }}
              walletBalance={walletBalance}
              guestInfo={guestInfo}
            />
          );
        case 'preferences':
          return renderPreferencesScreen();
        case 'notifications':
          return renderNotificationsScreen();
        case 'virtual-tour':
          return (
            <VRTour 
              onBack={() => setCurrentScreen('tabs')}
              guestInfo={guestInfo}
            />
          );
        case 'guest-community':
          return renderGuestCommunityScreen();
        case 'language-region':
          return renderLanguageRegionScreen();
        case 'help-safety':
          return renderHelpSafetyScreen();
        case 'account-settings':
          return renderPreferencesScreen(); // Reuse preferences for now
        case 'checkin-preferences':
          return renderCheckinPreferencesScreen();
        case 'biometric-checkin':
          return renderBiometricCheckinScreen();
        case 'checkin-payment':
          return renderCheckinPaymentScreen();
        case 'checkin-complete':
          return renderCheckinCompleteScreen();
        case 'hotel-directory':
          return renderHotelDirectoryScreen();
        case 'events-booking':
          return (
            <EventsBooking
              onBack={() => setCurrentScreen('tabs')}
              onBookingComplete={() => {
                setHasDigitalKey(true); // Unlock full app access
                setDigitalKeyActive(true); // Activate digital key
                setCurrentScreen('tabs');
                setActiveTab('home');
              }}
              guestInfo={guestInfo}
            />
          );
        case 'rate-tip-staff':
          return (
            <RateTipStaff
              collapsed={false}
              onClose={() => setCurrentScreen('tabs')}
              staffMembers={staffMembers}
              favoriteStaff={favoriteStaff}
              onFavoriteToggle={(staffName) => {
                const newFavorites = favoriteStaff.includes(staffName)
                  ? favoriteStaff.filter(f => f !== staffName)
                  : [...favoriteStaff, staffName];
                setFavoriteStaff(newFavorites);
              }}
              onPayTipFromWallet={(staffName, amount) => {
                // Handle tip payment from wallet
                if (walletBalance >= amount) {
                  setWalletBalance(prev => prev - amount);
                  // Show confirmation toast or notification
                }
              }}
              walletBalance={walletBalance}
            />
          );
        case 'room-booking':
          return renderRoomBookingScreen();
        case 'room-details':
          return renderRoomDetailsScreen();
        case 'ar-vr-preview':
          return renderArVrPreviewScreen();
        case 'vr-room-preview':
          return (
            <VRTour 
              onBack={() => setCurrentScreen('room-details')}
              isFromBooking={true}
              initialCategory="rooms"
              guestInfo={guestInfo}
            />
          );
        case 'booking-confirmation':
          return renderBookingConfirmationScreen();
        case 'feedback':
          return renderFeedbackScreen();
        case 'membership-rewards':
          return renderMembershipRewardsScreen();
        case 'stay-history':
          return renderStayHistoryScreen();
        case 'digital-twin':
          return renderDigitalTwinScreen();
        case 'wellness-dashboard':
          return renderWellnessDashboardScreen();
        default:
          return renderHomeTab();
      }
    }

    // If user doesn't have digital key, only allow home tab
    if (!hasDigitalKey && activeTab !== 'home') {
      return renderHomeTab();
    }

    switch (activeTab) {
      case 'home':
        return renderHomeTab();
      case 'services':
        return renderServicesTab();
      case 'tracking':
        return renderTrackingTab();
      case 'profile':
        return renderProfileTab();
      case 'digital-key':
        return renderDigitalKeyScreen();
      default:
        return renderHomeTab();
    }
  };

  // Render top navigation bar for desktop
  const renderTopNav = () => {
    const navItems = isCheckedIn ? [
      { tab: 'home', icon: Home, label: 'Home' },
      { tab: 'digital-key', icon: digitalKeyActive ? Unlock : Lock, label: 'Digital Key' },
      { tab: 'services', icon: ConciergeBell, label: 'Services' },
      { tab: 'profile', icon: User, label: 'Profile' }
    ] : [
      { tab: 'home', icon: Home, label: 'Home' },
      { tab: 'services', icon: ConciergeBell, label: 'Services' },
      { tab: 'tracking', icon: Package, label: 'Tracking' },
      { tab: 'profile', icon: User, label: 'Profile' }
    ];

    return (
      <div className="hidden lg:block fixed top-0 inset-x-0 z-50 bg-white/60 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-10">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/80 to-indigo-600/80 flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-800">NEOM Guest</h1>
                <p className="text-xs text-gray-500 -mt-0.5">Hospitality OS</p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex items-center space-x-1">
              <TooltipProvider>
                {navItems.map(({ tab, icon: Icon, label }) => {
                  const isLocked = !hasDigitalKey && tab !== 'home';
                  const isActive = (activeTab === tab || (tab === 'digital-key' && currentScreen === 'digital-key'));

                  if (isLocked) {
                    return (
                      <Tooltip key={tab}>
                        <TooltipTrigger asChild>
                          <button
                            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-400 cursor-not-allowed opacity-50 relative"
                          >
                            <Icon className="w-4 h-4" />
                            <span className="text-sm">{label}</span>
                            <Lock className="w-3 h-3" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-sm">Unlock after Check-in or Room Booking</p>
                        </TooltipContent>
                      </Tooltip>
                    );
                  }

                  return (
                    <button
                      key={tab}
                      onClick={() => {
                        if (tab === 'digital-key') {
                          navigateToScreen('digital-key');
                        } else {
                          setActiveTab(tab as TabType);
                          setCurrentScreen('tabs');
                        }
                      }}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 relative ${
                        isActive
                          ? 'text-blue-600 bg-blue-50/50 border border-blue-200/50' 
                          : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50/50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{label}</span>
                      {isActive && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                      )}
                    </button>
                  );
                })}
              </TooltipProvider>
            </nav>

            {/* User Info */}
            {guestInfo && (
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">{guestInfo.name}</p>
                  <p className="text-xs text-gray-500">Room 1205</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500/80 to-indigo-600/80 flex items-center justify-center shadow-sm">
                  <User className="w-5 h-5 text-white" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white/70 backdrop-blur-sm">
      {/* Top navigation bar for desktop - Fixed at top */}
      {renderTopNav()}
      
      {/* Main content area with proper top spacing */}
      <div className="min-h-screen">
        <div className="pt-0 lg:pt-16">
          {/* Light decorative elements */}
          <div className="absolute top-24 right-20 w-8 h-8 bg-gradient-to-br from-blue-100/30 to-indigo-100/30 rounded-full opacity-30 hidden lg:block pointer-events-none" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-40 right-12 w-10 h-10 bg-gradient-to-br from-purple-100/30 to-blue-100/30 rounded-full opacity-30 hidden lg:block pointer-events-none" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-32 left-16 w-12 h-12 bg-gradient-to-br from-green-100/30 to-blue-100/30 rounded-full opacity-30 hidden lg:block pointer-events-none" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-60 left-32 w-6 h-6 bg-gradient-to-br from-indigo-100/30 to-purple-100/30 rounded-full opacity-30 hidden lg:block pointer-events-none" style={{ animationDelay: '1.5s' }}></div>
          
          <div className="max-w-md lg:max-w-7xl mx-auto lg:px-6 relative">
            {renderCurrentTab()}
          </div>
        </div>
      </div>
      
      {/* Bottom navigation for mobile/tablet */}
      <div className="lg:hidden">
        {currentScreen === 'tabs' && renderBottomNav()}
      </div>

      {/* Interactive Hotel Map Modal */}
      <Dialog open={showHotelMap} onOpenChange={setShowHotelMap}>
        <DialogContent className="bg-white/80 backdrop-blur-xl border-gray-200/50 text-gray-800 max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold flex items-center space-x-3 text-gray-800">
              <Building className="w-7 h-7 text-blue-600/80" />
              <span>Interactive Hotel Map</span>
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              Explore hotel facilities, navigate between floors, and find points of interest
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <InteractiveHotelMap />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}