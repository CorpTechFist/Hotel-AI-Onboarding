import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import {
  ZoomIn,
  ZoomOut,
  MapPin,
  Navigation,
  AlertTriangle,
  Utensils,
  UtensilsCrossed,
  Sparkles,
  Dumbbell,
  Waves,
  Building,
  Car,
  Phone,
  Clock,
  Users,
  Briefcase,
  DoorOpen,
  ShieldAlert,
  Heart,
  Coffee,
  Wine,
  ChefHat,
  ConciergeBell,
  Package,
  ShoppingBag,
  X,
  ArrowRight,
  Calendar,
  MessageCircle,
  Navigation2,
  MapPinned,
  Layers,
  Download
} from 'lucide-react';

interface POI {
  id: string;
  name: string;
  category: 'dining' | 'wellness' | 'transport' | 'emergency' | 'services' | 'amenities';
  floor: number;
  hours: string;
  contact?: string;
  description: string;
  x: number; // percentage position on map
  y: number; // percentage position on map
  icon: any;
  menuUrl?: string;
  bookable?: boolean;
  isEmergency?: boolean;
}

interface InteractiveHotelMapProps {
  onNavigateToService?: (service: string) => void;
}

export function InteractiveHotelMap({ onNavigateToService }: InteractiveHotelMapProps) {
  const [currentFloor, setCurrentFloor] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [showWayfinding, setShowWayfinding] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [pathHighlighted, setPathHighlighted] = useState(false);

  // Points of Interest data
  const allPOIs: POI[] = [
    // Ground Floor
    {
      id: 'main-restaurant',
      name: 'Marina Restaurant',
      category: 'dining',
      floor: 1,
      hours: '06:00 - 23:00',
      contact: '+1-555-0200',
      description: 'Fine dining with ocean views featuring international cuisine',
      x: 30,
      y: 40,
      icon: UtensilsCrossed,
      menuUrl: '/menu/marina',
      bookable: true
    },
    {
      id: 'lobby-cafe',
      name: 'Lobby Café',
      category: 'dining',
      floor: 1,
      hours: '24/7',
      contact: '+1-555-0201',
      description: 'Fresh coffee, pastries, and light snacks',
      x: 60,
      y: 30,
      icon: Coffee,
      menuUrl: '/menu/cafe',
      bookable: false
    },
    {
      id: 'front-desk',
      name: 'Front Desk',
      category: 'services',
      floor: 1,
      hours: '24/7',
      contact: '+1-555-0100',
      description: 'Guest services and check-in/out',
      x: 50,
      y: 20,
      icon: ConciergeBell,
      bookable: false
    },
    {
      id: 'concierge',
      name: 'Concierge',
      category: 'services',
      floor: 1,
      hours: '06:00 - 22:00',
      contact: '+1-555-0101',
      description: 'Travel assistance and local recommendations',
      x: 55,
      y: 25,
      icon: Building,
      bookable: false
    },
    {
      id: 'valet',
      name: 'Valet & Transport',
      category: 'transport',
      floor: 1,
      hours: '24/7',
      contact: '+1-555-0300',
      description: 'Car valet and transportation services',
      x: 70,
      y: 60,
      icon: Car,
      bookable: true
    },
    {
      id: 'ground-exit-1',
      name: 'Main Exit - East',
      category: 'emergency',
      floor: 1,
      hours: '24/7',
      description: 'Emergency exit to main parking area',
      x: 85,
      y: 50,
      icon: DoorOpen,
      isEmergency: true
    },
    {
      id: 'ground-exit-2',
      name: 'Service Exit - West',
      category: 'emergency',
      floor: 1,
      hours: '24/7',
      description: 'Emergency exit to service area',
      x: 15,
      y: 70,
      icon: DoorOpen,
      isEmergency: true
    },
    {
      id: 'security-desk',
      name: 'Security Desk',
      category: 'emergency',
      floor: 1,
      hours: '24/7',
      contact: '+1-555-9911',
      description: 'Hotel security and emergency assistance',
      x: 45,
      y: 15,
      icon: ShieldAlert,
      isEmergency: true
    },

    // 5th Floor - Pool & Recreation
    {
      id: 'infinity-pool',
      name: 'Infinity Pool',
      category: 'wellness',
      floor: 5,
      hours: '06:00 - 22:00',
      contact: '+1-555-0401',
      description: 'Stunning infinity pool with city views',
      x: 50,
      y: 60,
      icon: Waves,
      bookable: false
    },
    {
      id: 'pool-bar',
      name: 'Pool Bar',
      category: 'dining',
      floor: 5,
      hours: '10:00 - 20:00',
      contact: '+1-555-0202',
      description: 'Refreshing drinks and light bites',
      x: 35,
      y: 55,
      icon: Wine,
      menuUrl: '/menu/poolbar',
      bookable: false
    },
    {
      id: 'gym',
      name: 'Fitness Center',
      category: 'wellness',
      floor: 5,
      hours: '24/7',
      contact: '+1-555-0402',
      description: 'State-of-the-art fitness equipment',
      x: 70,
      y: 40,
      icon: Dumbbell,
      bookable: true
    },
    {
      id: 'floor-5-exit',
      name: 'Emergency Exit',
      category: 'emergency',
      floor: 5,
      hours: '24/7',
      description: 'Emergency stairwell access',
      x: 90,
      y: 30,
      icon: DoorOpen,
      isEmergency: true
    },

    // 10th Floor - Spa & Wellness
    {
      id: 'spa-wellness',
      name: 'NEOM Spa & Wellness',
      category: 'wellness',
      floor: 10,
      hours: '08:00 - 22:00',
      contact: '+1-555-0500',
      description: 'Luxury spa treatments and therapies',
      x: 40,
      y: 50,
      icon: Sparkles,
      bookable: true
    },
    {
      id: 'meditation-room',
      name: 'Meditation Room',
      category: 'wellness',
      floor: 10,
      hours: '06:00 - 23:00',
      description: 'Quiet space for meditation and relaxation',
      x: 60,
      y: 45,
      icon: Heart,
      bookable: true
    },
    {
      id: 'floor-10-exit',
      name: 'Emergency Exit',
      category: 'emergency',
      floor: 10,
      hours: '24/7',
      description: 'Emergency stairwell access',
      x: 85,
      y: 35,
      icon: DoorOpen,
      isEmergency: true
    },
    {
      id: 'medical-desk',
      name: 'Medical Desk',
      category: 'emergency',
      floor: 10,
      hours: '24/7',
      contact: '+1-555-9999',
      description: 'First aid and medical assistance',
      x: 25,
      y: 30,
      icon: Heart,
      isEmergency: true
    },

    // 15th Floor - Business & Events
    {
      id: 'business-center',
      name: 'Business Center',
      category: 'services',
      floor: 15,
      hours: '06:00 - 22:00',
      contact: '+1-555-0601',
      description: 'Workstations, printing, and meeting rooms',
      x: 50,
      y: 40,
      icon: Briefcase,
      bookable: true
    },
    {
      id: 'event-hall',
      name: 'Grand Event Hall',
      category: 'amenities',
      floor: 15,
      hours: 'By reservation',
      contact: '+1-555-0602',
      description: 'Large event space for conferences and celebrations',
      x: 35,
      y: 60,
      icon: Users,
      bookable: true
    },
    {
      id: 'floor-15-exit',
      name: 'Emergency Exit',
      category: 'emergency',
      floor: 15,
      hours: '24/7',
      description: 'Emergency stairwell access',
      x: 88,
      y: 40,
      icon: DoorOpen,
      isEmergency: true
    },

    // Rooftop (25th Floor)
    {
      id: 'rooftop-lounge',
      name: 'Rooftop Lounge',
      category: 'dining',
      floor: 25,
      hours: '17:00 - 02:00',
      contact: '+1-555-0203',
      description: 'Premium cocktails with panoramic views',
      x: 50,
      y: 50,
      icon: Wine,
      menuUrl: '/menu/rooftop',
      bookable: true
    },
    {
      id: 'sky-restaurant',
      name: 'Sky Fine Dining',
      category: 'dining',
      floor: 25,
      hours: '18:00 - 23:00',
      contact: '+1-555-0204',
      description: 'Michelin-star fine dining experience',
      x: 40,
      y: 40,
      icon: ChefHat,
      menuUrl: '/menu/sky',
      bookable: true
    },
    {
      id: 'rooftop-exit',
      name: 'Rooftop Emergency Exit',
      category: 'emergency',
      floor: 25,
      hours: '24/7',
      description: 'Helicopter pad and emergency access',
      x: 75,
      y: 30,
      icon: DoorOpen,
      isEmergency: true
    }
  ];

  // Filter POIs by current floor
  const currentFloorPOIs = allPOIs.filter(poi => poi.floor === currentFloor);

  // Get floor label
  const getFloorLabel = (floor: number) => {
    if (floor === 1) return 'Ground Floor';
    if (floor === 25) return 'Rooftop';
    return `Floor ${floor}`;
  };

  // Get POI color by category
  const getCategoryColor = (category: string) => {
    const colors = {
      dining: 'orange',
      wellness: 'emerald',
      transport: 'blue',
      emergency: 'red',
      services: 'purple',
      amenities: 'cyan'
    };
    return colors[category as keyof typeof colors] || 'gray';
  };

  // Get category icon
  const getCategoryIcon = (category: string) => {
    const icons = {
      dining: '🍽️',
      wellness: '🧘',
      transport: '🚖',
      emergency: '🚪',
      services: '🛎️',
      amenities: '🎯'
    };
    return icons[category as keyof typeof icons] || '📍';
  };

  // Handle POI click
  const handlePOIClick = (poi: POI) => {
    setSelectedPOI(poi);
  };

  // Handle zoom
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 20, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 20, 60));
  };

  // Handle wayfinding
  const handleFindPath = () => {
    if (currentLocation && destination) {
      setPathHighlighted(true);
      setTimeout(() => {
        // Simulate path calculation
        const destPOI = allPOIs.find(poi => poi.id === destination);
        if (destPOI) {
          setCurrentFloor(destPOI.floor);
        }
      }, 500);
    }
  };

  // Handle map download
  const handleDownloadMap = () => {
    const mapElement = document.getElementById('hotel-map-container');
    if (!mapElement) return;

    // Create a canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 1200;
    canvas.height = 800;

    // Fill background
    ctx.fillStyle = '#0B0B0B';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add map title
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 32px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`NEOM Hotel - ${getFloorLabel(currentFloor)}`, canvas.width / 2, 50);

    // Add floor outline
    ctx.strokeStyle = '#17C3B2';
    ctx.lineWidth = 3;
    ctx.strokeRect(100, 100, canvas.width - 200, canvas.height - 200);

    // Add POIs
    currentFloorPOIs.forEach(poi => {
      const x = 100 + (poi.x / 100) * (canvas.width - 200);
      const y = 100 + (poi.y / 100) * (canvas.height - 200);
      
      // Draw POI circle
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, 2 * Math.PI);
      ctx.fillStyle = getCategoryColor(poi.category) === 'orange' ? '#FF6B35' : 
                     getCategoryColor(poi.category) === 'emerald' ? '#00A676' : 
                     getCategoryColor(poi.category) === 'blue' ? '#17C3B2' : 
                     getCategoryColor(poi.category) === 'red' ? '#EF4444' : 
                     getCategoryColor(poi.category) === 'purple' ? '#6A0DAD' : '#17C3B2';
      ctx.fill();
      
      // Draw POI label
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '14px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(poi.name, x, y + 25);
    });

    // Add legend
    ctx.fillStyle = '#CCCCCC';
    ctx.font = '16px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Legend:', 50, canvas.height - 150);
    
    const categories = [
      { name: 'Dining', color: '#FF6B35' },
      { name: 'Wellness', color: '#00A676' },
      { name: 'Transport', color: '#17C3B2' },
      { name: 'Emergency', color: '#EF4444' },
      { name: 'Services', color: '#6A0DAD' }
    ];
    
    categories.forEach((cat, index) => {
      const y = canvas.height - 120 + (index * 20);
      ctx.fillStyle = cat.color;
      ctx.beginPath();
      ctx.arc(60, y, 6, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = '#CCCCCC';
      ctx.fillText(cat.name, 75, y + 5);
    });

    // Convert to blob and download
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `NEOM-Hotel-Map-${getFloorLabel(currentFloor).replace(' ', '-')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  };

  // Handle service navigation
  const handleNavigate = (poi: POI) => {
    // Integration with other services
    if (poi.category === 'dining' && poi.bookable) {
      if (onNavigateToService) {
        onNavigateToService('restaurant-booking');
      }
    } else if (poi.category === 'wellness' && poi.bookable) {
      if (onNavigateToService) {
        onNavigateToService('spa-booking');
      }
    } else if (poi.category === 'transport') {
      if (onNavigateToService) {
        onNavigateToService('transport-request');
      }
    }
    setSelectedPOI(null);
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <Card className="neom-card-glass border border-cyan-400/30">
        <CardHeader>
          <CardTitle className="neom-heading-neon flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MapPinned className="w-6 h-6 text-cyan-400" />
              <span>Interactive Hotel Map</span>
            </div>
            <Badge className="bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
              {getFloorLabel(currentFloor)}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Floor Selector */}
          <div className="flex items-center space-x-3">
            <Layers className="w-5 h-5 text-cyan-400" />
            <Select value={currentFloor.toString()} onValueChange={(val) => setCurrentFloor(parseInt(val))}>
              <SelectTrigger className="bg-slate-800/50 border-cyan-400/30 text-white rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-cyan-400/30">
                <SelectItem value="1">Ground Floor - Lobby & Dining</SelectItem>
                <SelectItem value="5">Floor 5 - Pool & Recreation</SelectItem>
                <SelectItem value="10">Floor 10 - Spa & Wellness</SelectItem>
                <SelectItem value="15">Floor 15 - Business & Events</SelectItem>
                <SelectItem value="25">Rooftop - Fine Dining & Lounge</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                onClick={handleZoomOut}
                className="neom-btn-glass neom-shrink-press"
                size="sm"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="neom-mono text-sm text-cyan-400">{zoomLevel}%</span>
              <Button
                onClick={handleZoomIn}
                className="neom-btn-glass neom-shrink-press"
                size="sm"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setShowWayfinding(!showWayfinding)}
                className={`neom-btn-glass neom-shrink-press ${showWayfinding ? 'border-yellow-400/50 bg-yellow-400/10' : ''}`}
                size="sm"
              >
                <Navigation2 className={`w-4 h-4 ${showWayfinding ? 'text-yellow-400' : ''}`} />
                <span className="ml-2">Find Path</span>
              </Button>
              
              <Button
                onClick={() => setEmergencyMode(!emergencyMode)}
                className={`neom-btn-glass neom-shrink-press ${emergencyMode ? 'border-red-400/50 bg-red-400/10' : ''}`}
                size="sm"
              >
                <AlertTriangle className={`w-4 h-4 ${emergencyMode ? 'text-red-400 animate-pulse' : ''}`} />
                <span className="ml-2">Emergency</span>
              </Button>

              <Button
                onClick={handleDownloadMap}
                className="neom-btn-glass neom-shrink-press border-green-400/50 hover:bg-green-400/10"
                size="sm"
              >
                <Download className="w-4 h-4 text-green-400" />
                <span className="ml-2 text-green-400">Download Map</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wayfinding Panel */}
      {showWayfinding && (
        <Card className="neom-card-glass border border-yellow-400/30 neom-slide-in">
          <CardHeader>
            <CardTitle className="neom-heading text-yellow-400 flex items-center">
              <Navigation className="w-5 h-5 mr-2" />
              Wayfinding
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="neom-body text-sm">Current Location</label>
              <Select value={currentLocation} onValueChange={setCurrentLocation}>
                <SelectTrigger className="bg-slate-800/50 border-yellow-400/30 text-white rounded-xl">
                  <SelectValue placeholder="Select your location..." />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-yellow-400/30">
                  {allPOIs.filter(poi => !poi.isEmergency).map(poi => (
                    <SelectItem key={poi.id} value={poi.id}>
                      {getCategoryIcon(poi.category)} {poi.name} - {getFloorLabel(poi.floor)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="neom-body text-sm">Destination</label>
              <Select value={destination} onValueChange={setDestination}>
                <SelectTrigger className="bg-slate-800/50 border-yellow-400/30 text-white rounded-xl">
                  <SelectValue placeholder="Select destination..." />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-yellow-400/30">
                  {allPOIs.filter(poi => !poi.isEmergency).map(poi => (
                    <SelectItem key={poi.id} value={poi.id}>
                      {getCategoryIcon(poi.category)} {poi.name} - {getFloorLabel(poi.floor)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleFindPath}
              disabled={!currentLocation || !destination}
              className="w-full neom-btn-primary"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Show Path
            </Button>

            {pathHighlighted && (
              <div className="p-4 rounded-xl neom-gradient-glass-yellow border border-yellow-400/30 neom-fade-in">
                <div className="flex items-start space-x-3">
                  <Navigation className="w-5 h-5 text-yellow-400 mt-1" />
                  <div>
                    <p className="neom-heading text-sm text-yellow-400 mb-1">Route Highlighted</p>
                    <p className="neom-body text-xs">Follow the yellow path on the map. Estimated walk time: 3 minutes.</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Map Display */}
      <Card className="neom-card-glass border border-cyan-400/30 overflow-hidden">
        <CardContent className="p-0">
          <div
            id="hotel-map-container"
            className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden"
            style={{
              height: '500px',
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: 'center',
              transition: 'transform 0.3s ease-out'
            }}
          >
            {/* Background Grid */}
            <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#17C3B2" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Floor Plan Outline */}
            <div className="absolute inset-0 m-12 border-2 border-cyan-400/20 rounded-2xl backdrop-blur-sm">
              <div className="absolute top-4 left-4 neom-heading text-sm text-cyan-400/60">
                {getFloorLabel(currentFloor)}
              </div>
            </div>

            {/* POI Markers */}
            {currentFloorPOIs.map((poi) => {
              const color = getCategoryColor(poi.category);
              const isEmergencyVisible = emergencyMode || !poi.isEmergency;
              const isHighlighted = pathHighlighted && (poi.id === currentLocation || poi.id === destination);

              if (!isEmergencyVisible && poi.isEmergency) return null;

              return (
                <div
                  key={poi.id}
                  className={`absolute cursor-pointer neom-transition group ${
                    isHighlighted ? 'neom-pulse-yellow z-20' : 'z-10'
                  }`}
                  style={{
                    left: `${poi.x}%`,
                    top: `${poi.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onClick={() => handlePOIClick(poi)}
                >
                  {/* POI Icon Container */}
                  <div className={`
                    relative w-12 h-12 rounded-xl flex items-center justify-center
                    neom-gradient-glass border-2 transition-all duration-300
                    ${poi.isEmergency && emergencyMode
                      ? 'border-red-400 bg-red-400/20 animate-pulse shadow-lg shadow-red-400/50'
                      : `border-${color}-400/60 bg-${color}-400/10 hover:bg-${color}-400/20`
                    }
                    ${isHighlighted ? 'border-yellow-400 bg-yellow-400/20 shadow-lg shadow-yellow-400/50' : ''}
                    group-hover:scale-110 group-hover:shadow-xl
                  `}>
                    {React.createElement(poi.icon, {
                      className: `w-6 h-6 ${
                        poi.isEmergency && emergencyMode
                          ? 'text-red-400'
                          : `text-${color}-400`
                      } ${isHighlighted ? 'text-yellow-400' : ''}`
                    })}
                  </div>

                  {/* POI Label */}
                  <div className={`
                    absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap
                    px-3 py-1 rounded-lg backdrop-blur-md
                    neom-gradient-glass border
                    ${poi.isEmergency && emergencyMode
                      ? 'border-red-400/30'
                      : `border-${color}-400/30`
                    }
                    ${isHighlighted ? 'border-yellow-400/50' : ''}
                    opacity-0 group-hover:opacity-100 transition-opacity duration-200
                  `}>
                    <p className={`neom-body text-xs ${
                      poi.isEmergency && emergencyMode
                        ? 'text-red-300'
                        : `text-${color}-300`
                    }`}>
                      {poi.name}
                    </p>
                  </div>

                  {/* Path Indicator */}
                  {isHighlighted && (
                    <div className="absolute -inset-2 border-2 border-dashed border-yellow-400/60 rounded-2xl animate-pulse"></div>
                  )}
                </div>
              );
            })}

            {/* Path Line (if wayfinding is active) */}
            {pathHighlighted && currentLocation && destination && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-5">
                <defs>
                  <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#FFD700" stopOpacity="0.4" />
                  </linearGradient>
                </defs>
                {(() => {
                  const start = allPOIs.find(p => p.id === currentLocation);
                  const end = allPOIs.find(p => p.id === destination);
                  if (start && end && start.floor === currentFloor) {
                    return (
                      <line
                        x1={`${start.x}%`}
                        y1={`${start.y}%`}
                        x2={`${end.floor === currentFloor ? end.x : start.x}%`}
                        y2={`${end.floor === currentFloor ? end.y : start.y}%`}
                        stroke="url(#pathGradient)"
                        strokeWidth="4"
                        strokeDasharray="10 5"
                        className="animate-pulse"
                      />
                    );
                  }
                  return null;
                })()}
              </svg>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card className="neom-card-glass border border-slate-600/30">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-orange-400"></div>
              <span className="neom-body text-xs">Dining</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              <span className="neom-body text-xs">Wellness</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-blue-400"></div>
              <span className="neom-body text-xs">Transport</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-purple-400"></div>
              <span className="neom-body text-xs">Services</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
              <span className="neom-body text-xs">Amenities</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <span className="neom-body text-xs">Emergency</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* POI Detail Modal */}
      <Dialog open={!!selectedPOI} onOpenChange={(open) => !open && setSelectedPOI(null)}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-md">
          {selectedPOI && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 border-${getCategoryColor(selectedPOI.category)}-400/60 bg-${getCategoryColor(selectedPOI.category)}-400/10`}>
                    {React.createElement(selectedPOI.icon, {
                      className: `w-6 h-6 text-${getCategoryColor(selectedPOI.category)}-400`
                    })}
                  </div>
                  <div>
                    <h3 className="neom-heading text-xl">{selectedPOI.name}</h3>
                    <Badge className={`bg-${getCategoryColor(selectedPOI.category)}-400/20 text-${getCategoryColor(selectedPOI.category)}-300 border border-${getCategoryColor(selectedPOI.category)}-400/30 mt-1`}>
                      {getCategoryIcon(selectedPOI.category)} {selectedPOI.category}
                    </Badge>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4 py-4">
                {/* Description */}
                <p className="neom-body text-sm opacity-90">{selectedPOI.description}</p>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl neom-gradient-glass border border-slate-600/30">
                    <div className="flex items-center space-x-2 mb-1">
                      <Layers className="w-4 h-4 text-cyan-400" />
                      <span className="neom-body text-xs opacity-60">Floor</span>
                    </div>
                    <p className="neom-heading text-sm">{getFloorLabel(selectedPOI.floor)}</p>
                  </div>

                  <div className="p-3 rounded-xl neom-gradient-glass border border-slate-600/30">
                    <div className="flex items-center space-x-2 mb-1">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      <span className="neom-body text-xs opacity-60">Hours</span>
                    </div>
                    <p className="neom-heading text-sm">{selectedPOI.hours}</p>
                  </div>

                  {selectedPOI.contact && (
                    <div className="col-span-2 p-3 rounded-xl neom-gradient-glass border border-slate-600/30">
                      <div className="flex items-center space-x-2 mb-1">
                        <Phone className="w-4 h-4 text-cyan-400" />
                        <span className="neom-body text-xs opacity-60">Contact</span>
                      </div>
                      <p className="neom-mono text-sm">{selectedPOI.contact}</p>
                    </div>
                  )}
                </div>

                {/* Service-Specific Actions */}
                {selectedPOI.category === 'dining' && selectedPOI.menuUrl && (
                  <div className="p-4 rounded-xl neom-gradient-glass-orange border border-orange-400/30">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <UtensilsCrossed className="w-4 h-4 text-orange-400" />
                        <span className="neom-heading text-sm">Menu Available</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-orange-400" />
                    </div>
                    <p className="neom-body text-xs opacity-80">View menu and place orders</p>
                  </div>
                )}

                {selectedPOI.category === 'wellness' && selectedPOI.bookable && (
                  <div className="p-4 rounded-xl neom-gradient-glass-emerald border border-emerald-400/30">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-emerald-400" />
                        <span className="neom-heading text-sm">Book Appointment</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-emerald-400" />
                    </div>
                    <p className="neom-body text-xs opacity-80">Schedule spa treatments and classes</p>
                  </div>
                )}

                {selectedPOI.category === 'transport' && (
                  <div className="p-4 rounded-xl neom-gradient-glass border border-blue-400/30">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Car className="w-4 h-4 text-blue-400" />
                        <span className="neom-heading text-sm">Request Service</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-blue-400" />
                    </div>
                    <p className="neom-body text-xs opacity-80">Book valet or transportation</p>
                  </div>
                )}
              </div>

              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={() => setSelectedPOI(null)}
                  className="neom-btn-glass flex-1"
                >
                  Close
                </Button>
                <Button
                  onClick={() => handleNavigate(selectedPOI)}
                  className="neom-btn-primary flex-1"
                  disabled={!selectedPOI.bookable && selectedPOI.category !== 'transport'}
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  {selectedPOI.category === 'dining' && 'View Menu'}
                  {selectedPOI.category === 'wellness' && 'Book Now'}
                  {selectedPOI.category === 'transport' && 'Request'}
                  {selectedPOI.category === 'services' && 'Contact'}
                  {selectedPOI.category === 'amenities' && 'Reserve'}
                  {selectedPOI.category === 'emergency' && 'Call'}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
