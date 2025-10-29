import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  ArrowRight, 
  ArrowLeft,
  Share2, 
  X, 
  Play, 
  Pause,
  RotateCcw,
  Smartphone,
  Video,
  Camera,
  Navigation,
  Info,
  Volume2,
  VolumeX,
  Maximize,
  Eye,
  Bed,
  Utensils,
  Waves,
  Coffee,
  Car,
  MapPin,
  Clock,
  Users,
  Star,
  Heart,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface VRTourProps {
  onBack: () => void;
  onVRFromBooking?: (roomType: string) => void;
  isFromBooking?: boolean;
  initialCategory?: 'rooms' | 'facilities' | 'event-spaces' | 'dining';
  guestInfo?: any;
}

interface VRSpace {
  id: string;
  name: string;
  category: 'rooms' | 'facilities' | 'event-spaces' | 'dining';
  thumbnail: string;
  vrImage: string;
  description: string;
  features: string[];
  hotspots: VRHotspot[];
  duration: string;
  rating: number;
  popularity: 'high' | 'medium' | 'low';
}

interface VRHotspot {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  type: 'info' | 'feature' | 'navigation';
  title: string;
  description: string;
  image?: string;
  details?: string[];
}

export const VRTour: React.FC<VRTourProps> = ({ 
  onBack, 
  onVRFromBooking, 
  isFromBooking = false, 
  initialCategory = 'rooms',
  guestInfo 
}) => {
  const [currentView, setCurrentView] = useState<'landing' | 'vr-experience'>('landing');
  const [activeCategory, setActiveCategory] = useState<'rooms' | 'facilities' | 'event-spaces' | 'dining'>(initialCategory);
  const [selectedSpace, setSelectedSpace] = useState<VRSpace | null>(null);
  const [isVRMode, setIsVRMode] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<VRHotspot | null>(null);
  const [isAutoTour, setIsAutoTour] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showARNavigation, setShowARNavigation] = useState(false);
  const [vrRotation, setVrRotation] = useState(0);
  const vrContainerRef = useRef<HTMLDivElement>(null);

  // VR Spaces Data
  const vrSpaces: VRSpace[] = [
    // Rooms
    {
      id: 'deluxe-suite',
      name: 'Deluxe Ocean Suite',
      category: 'rooms',
      thumbnail: '/vr/thumbnails/deluxe-suite.jpg',
      vrImage: '/vr/panoramas/deluxe-suite-360.jpg',
      description: 'Luxurious suite with panoramic ocean views and premium amenities',
      features: ['Ocean View', 'King Bed', 'Premium Amenities', 'Private Balcony'],
      duration: '3-5 min',
      rating: 4.8,
      popularity: 'high',
      hotspots: [
        {
          id: 'bed',
          x: 45,
          y: 60,
          type: 'feature',
          title: 'Premium King Bed',
          description: 'Luxury memory foam mattress with Egyptian cotton sheets',
          details: ['Memory foam mattress', 'Thread count: 1000', 'Hypoallergenic pillows', 'Blackout curtains']
        },
        {
          id: 'minibar',
          x: 75,
          y: 45,
          type: 'feature',
          title: 'Premium Minibar',
          description: 'Curated selection of beverages and snacks',
          details: ['Local NEOM water', 'Artisan chocolates', 'Premium spirits', 'Healthy snacks']
        },
        {
          id: 'bathroom',
          x: 25,
          y: 55,
          type: 'navigation',
          title: 'Luxury Bathroom',
          description: 'Marble bathroom with rainfall shower and premium amenities',
          details: ['Rainfall shower', 'Heated floors', 'Premium toiletries', 'Smart mirror']
        },
        {
          id: 'balcony',
          x: 85,
          y: 30,
          type: 'navigation',
          title: 'Private Balcony',
          description: 'Stunning ocean views with outdoor seating',
          details: ['180° ocean view', 'Outdoor furniture', 'Privacy glass', 'Sunset views']
        }
      ]
    },
    {
      id: 'presidential-suite',
      name: 'Presidential Suite',
      category: 'rooms',
      thumbnail: '/vr/thumbnails/presidential-suite.jpg',
      vrImage: '/vr/panoramas/presidential-suite-360.jpg',
      description: 'Ultimate luxury with personal butler service and exclusive amenities',
      features: ['Butler Service', 'Private Elevator', 'Panoramic Views', 'Smart Home'],
      duration: '5-7 min',
      rating: 5.0,
      popularity: 'high',
      hotspots: [
        {
          id: 'living-area',
          x: 50,
          y: 40,
          type: 'info',
          title: 'Grand Living Area',
          description: 'Spacious living room with premium furniture and entertainment system',
          details: ['85" OLED TV', 'Premium sound system', 'Italian leather furniture', 'Smart lighting']
        },
        {
          id: 'dining',
          x: 70,
          y: 50,
          type: 'feature',
          title: 'Private Dining',
          description: 'Elegant dining area for intimate meals',
          details: ['Seats 8 guests', 'Crystal chandelier', 'Fine china service', 'Wine storage']
        }
      ]
    },
    // Facilities
    {
      id: 'infinity-pool',
      name: 'Infinity Pool & Deck',
      category: 'facilities',
      thumbnail: '/vr/thumbnails/infinity-pool.jpg',
      vrImage: '/vr/panoramas/infinity-pool-360.jpg',
      description: 'Stunning infinity pool with panoramic ocean views',
      features: ['Infinity Edge', 'Ocean Views', 'Pool Bar', 'Luxury Cabanas'],
      duration: '4-6 min',
      rating: 4.9,
      popularity: 'high',
      hotspots: [
        {
          id: 'pool-bar',
          x: 20,
          y: 40,
          type: 'feature',
          title: 'Aqua Pool Bar',
          description: 'Swim-up bar with tropical cocktails and light bites',
          details: ['Premium cocktails', 'Fresh fruit smoothies', 'Light Mediterranean fare', 'Underwater seating']
        },
        {
          id: 'cabanas',
          x: 80,
          y: 35,
          type: 'feature',
          title: 'VIP Cabanas',
          description: 'Private cabanas with dedicated service',
          details: ['Private seating for 6', 'Dedicated service', 'Premium linens', 'Champagne service']
        }
      ]
    },
    {
      id: 'wellness-spa',
      name: 'NEOM Wellness Spa',
      category: 'facilities',
      thumbnail: '/vr/thumbnails/wellness-spa.jpg',
      vrImage: '/vr/panoramas/wellness-spa-360.jpg',
      description: 'World-class spa with holistic wellness treatments',
      features: ['Treatment Rooms', 'Relaxation Pools', 'Meditation Garden', 'Fitness Center'],
      duration: '6-8 min',
      rating: 4.7,
      popularity: 'medium',
      hotspots: [
        {
          id: 'treatment-room',
          x: 40,
          y: 60,
          type: 'feature',
          title: 'Signature Treatment Room',
          description: 'Luxurious treatment room with ocean views',
          details: ['Ocean view windows', 'Heated massage tables', 'Premium aromatherapy', 'Sound therapy']
        },
        {
          id: 'relaxation-pool',
          x: 75,
          y: 45,
          type: 'feature',
          title: 'Mineral Relaxation Pool',
          description: 'Therapeutic mineral pool for ultimate relaxation',
          details: ['Dead Sea minerals', 'Controlled temperature', 'Underwater music', 'Chromotherapy lighting']
        }
      ]
    },
    // Event Spaces
    {
      id: 'grand-ballroom',
      name: 'NEOM Grand Ballroom',
      category: 'event-spaces',
      thumbnail: '/vr/thumbnails/grand-ballroom.jpg',
      vrImage: '/vr/panoramas/grand-ballroom-360.jpg',
      description: 'Elegant ballroom perfect for weddings and large events',
      features: ['500 Guests', 'Crystal Chandeliers', 'Dance Floor', 'Premium AV'],
      duration: '4-5 min',
      rating: 4.8,
      popularity: 'high',
      hotspots: [
        {
          id: 'stage',
          x: 50,
          y: 25,
          type: 'feature',
          title: 'Grand Stage',
          description: 'Professional stage with state-of-the-art lighting and sound',
          details: ['Professional lighting rig', '32-channel sound system', 'LED backdrop', 'Wireless microphones']
        },
        {
          id: 'dance-floor',
          x: 50,
          y: 70,
          type: 'feature',
          title: 'Crystal Dance Floor',
          description: 'Elegant dance floor with LED lighting underneath',
          details: ['LED underglow', 'Polished marble', 'Sound-responsive lighting', 'Professional DJ booth']
        }
      ]
    },
    // Dining
    {
      id: 'marina-restaurant',
      name: 'Marina Fine Dining',
      category: 'dining',
      thumbnail: '/vr/thumbnails/marina-restaurant.jpg',
      vrImage: '/vr/panoramas/marina-restaurant-360.jpg',
      description: 'Michelin-starred restaurant with ocean views and innovative cuisine',
      features: ['Michelin Star', 'Ocean Views', 'Chef\'s Table', 'Wine Cellar'],
      duration: '5-7 min',
      rating: 4.9,
      popularity: 'high',
      hotspots: [
        {
          id: 'chefs-table',
          x: 30,
          y: 50,
          type: 'feature',
          title: 'Chef\'s Table Experience',
          description: 'Intimate dining experience with the chef',
          details: ['8-course tasting menu', 'Wine pairings', 'Interactive cooking', 'Private chef consultation']
        },
        {
          id: 'wine-cellar',
          x: 80,
          y: 40,
          type: 'navigation',
          title: 'Premium Wine Cellar',
          description: 'Extensive collection of world-class wines',
          details: ['5000+ bottles', 'Rare vintages', 'Climate controlled', 'Sommelier service']
        }
      ]
    }
  ];

  const categories = [
    { id: 'rooms', label: 'Rooms', icon: Bed, color: 'yellow' },
    { id: 'facilities', label: 'Facilities', icon: Waves, color: 'cyan' },
    { id: 'event-spaces', label: 'Event Spaces', icon: Users, color: 'purple' },
    { id: 'dining', label: 'Dining', icon: Utensils, color: 'orange' }
  ];

  const filteredSpaces = vrSpaces.filter(space => space.category === activeCategory);

  const handleSpaceSelect = (space: VRSpace) => {
    setSelectedSpace(space);
    setCurrentView('vr-experience');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    setSelectedSpace(null);
    setIsVRMode(false);
    setActiveHotspot(null);
  };

  const handleShare = () => {
    if (selectedSpace) {
      // In a real app, this would share the VR experience
      console.log(`Sharing VR tour of ${selectedSpace.name}`);
      // Could integrate with native sharing API
      if (navigator.share) {
        navigator.share({
          title: `VR Tour: ${selectedSpace.name}`,
          text: `Check out this amazing VR tour of ${selectedSpace.name} at NEOM Hotel`,
          url: window.location.href
        });
      }
    }
  };

  const toggleVRMode = () => {
    setIsVRMode(!isVRMode);
    // In a real app, this would switch to cardboard/VR view
    if (!isVRMode) {
      console.log('Switching to VR cardboard mode');
    }
  };

  const toggleAutoTour = () => {
    setIsAutoTour(!isAutoTour);
    if (!isAutoTour) {
      console.log('Starting auto tour mode');
      // Auto-rotate the view
      const interval = setInterval(() => {
        setVrRotation(prev => (prev + 1) % 360);
      }, 50);
      return () => clearInterval(interval);
    }
  };

  const openARNavigation = () => {
    setShowARNavigation(true);
    // In a real app, this would open camera with AR overlay
    console.log('Opening AR navigation');
  };

  // Render Landing Screen
  const renderLandingScreen = () => (
    <div className="p-6 pb-24 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button onClick={onBack} className="neom-btn-glass neom-shrink-press">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="neom-heading-neon text-2xl">Explore in 360°</h1>
            <p className="neom-body text-sm opacity-80">Immersive virtual tours of NEOM spaces</p>
          </div>
        </div>
        {isFromBooking && (
          <Badge className="neom-status-warning">Room Preview</Badge>
        )}
      </div>

      {/* Category Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Button
              key={category.id}
              onClick={() => setActiveCategory(category.id as any)}
              className={`neom-btn-glass neom-shrink-press p-6 h-auto flex flex-col space-y-3 ${
                activeCategory === category.id
                  ? `border-${category.color}-400/60 bg-${category.color}-400/10`
                  : 'border-gray-400/20'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                activeCategory === category.id
                  ? `neom-gradient-glass-${category.color} border border-${category.color}-400/50`
                  : 'neom-gradient-glass border border-gray-400/30'
              }`}>
                <Icon className={`w-6 h-6 ${
                  activeCategory === category.id ? `text-${category.color}-400` : 'text-gray-400'
                }`} />
              </div>
              <span className={`neom-body text-sm font-medium ${
                activeCategory === category.id ? `text-${category.color}-300` : 'text-gray-300'
              }`}>
                {category.label}
              </span>
            </Button>
          );
        })}
      </div>

      {/* Space Thumbnails Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="neom-heading-neon text-lg">
            {categories.find(c => c.id === activeCategory)?.label} Collection
          </h3>
          <span className="neom-body text-sm opacity-60">
            {filteredSpaces.length} spaces available
          </span>
        </div>

        <div className="grid gap-6">
          {filteredSpaces.map((space) => (
            <Card 
              key={space.id}
              className="neom-card-glass neom-card-glass-hover border border-cyan-400/30 cursor-pointer group overflow-hidden"
              onClick={() => handleSpaceSelect(space)}
            >
              <CardContent className="p-0">
                <div className="relative">
                  {/* Thumbnail Image */}
                  <div className="aspect-video relative overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                      <Camera className="w-16 h-16 text-cyan-400 opacity-50" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-yellow-400/20 backdrop-blur-md border-2 border-yellow-400/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-yellow-400/30 transition-all duration-300">
                        <Video className="w-10 h-10 text-yellow-400" />
                      </div>
                    </div>

                    {/* Popularity Badge */}
                    {space.popularity === 'high' && (
                      <div className="absolute top-4 right-4">
                        <Badge className="neom-status-warning text-xs">Popular</Badge>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="neom-heading-neon text-lg">{space.name}</h4>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="neom-mono text-sm text-yellow-400">{space.rating}</span>
                          </div>
                        </div>
                        <p className="neom-body text-sm opacity-80">{space.description}</p>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2">
                        {space.features.slice(0, 3).map((feature, index) => (
                          <Badge key={index} className="neom-gradient-glass border border-cyan-400/30 text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {space.features.length > 3 && (
                          <Badge className="neom-gradient-glass border border-gray-400/30 text-xs">
                            +{space.features.length - 3} more
                          </Badge>
                        )}
                      </div>

                      {/* Duration and Action */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-400/20">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="neom-body text-sm">{space.duration}</span>
                        </div>
                        <Button className="neom-btn-primary neom-shrink-press text-sm px-4 py-2">
                          <Eye className="w-4 h-4 mr-2" />
                          Start Tour
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  // Render VR Experience
  const renderVRExperience = () => {
    if (!selectedSpace) return null;

    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col">
        {/* Top Controls */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-6">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <Button 
              onClick={handleBackToLanding} 
              className="neom-btn-glass neom-shrink-press border border-gray-400/30"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>

            {/* Title */}
            <div className="text-center">
              <h2 className="neom-heading-neon text-lg">{selectedSpace.name}</h2>
              <p className="neom-body text-sm opacity-60">360° Virtual Tour</p>
            </div>

            {/* Share Button */}
            <Button 
              onClick={handleShare} 
              className="neom-btn-glass neom-shrink-press border border-cyan-400/30"
            >
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* VR Container */}
        <div 
          ref={vrContainerRef}
          className="flex-1 relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900"
          style={{
            transform: isVRMode ? 'none' : `perspective(1000px) rotateY(${vrRotation}deg)`,
            transition: 'transform 0.1s ease'
          }}
        >
          {/* 360° Background Image Simulation */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
            <div className="text-center">
              <Eye className="w-24 h-24 text-cyan-400 mx-auto mb-4 animate-pulse" />
              <p className="neom-heading-neon text-xl mb-2">360° View</p>
              <p className="neom-body">Swipe or drag to explore</p>
            </div>
          </div>

          {/* Interactive Hotspots */}
          {selectedSpace.hotspots.map((hotspot) => (
            <button
              key={hotspot.id}
              onClick={() => setActiveHotspot(hotspot)}
              className="absolute w-8 h-8 rounded-full bg-yellow-400/30 backdrop-blur-md border-2 border-yellow-400/60 flex items-center justify-center hover:scale-125 transition-all duration-300 animate-pulse"
              style={{
                left: `${hotspot.x}%`,
                top: `${hotspot.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            </button>
          ))}

          {/* VR Mode Split Screen */}
          {isVRMode && (
            <div className="absolute inset-0 flex">
              <div className="w-1/2 border-r border-gray-400/30 bg-gradient-to-br from-cyan-500/20 to-purple-500/20"></div>
              <div className="w-1/2 bg-gradient-to-br from-cyan-500/20 to-purple-500/20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Smartphone className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                  <p className="neom-heading-neon text-lg">VR Mode Active</p>
                  <p className="neom-body text-sm">Insert phone into VR headset</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent p-6">
          <div className="flex items-center justify-between">
            {/* Navigation Pills */}
            <div className="flex items-center space-x-2">
              <Button className="neom-btn-glass neom-shrink-press text-sm px-4 py-2">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <Button className="neom-btn-glass neom-shrink-press text-sm px-4 py-2">
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center space-x-2">
              <Button 
                onClick={toggleVRMode}
                className={`neom-btn-glass neom-shrink-press ${isVRMode ? 'border-yellow-400/50 bg-yellow-400/10' : ''}`}
              >
                <Smartphone className="w-4 h-4" />
              </Button>
              
              <Button 
                onClick={toggleAutoTour}
                className={`neom-btn-glass neom-shrink-press ${isAutoTour ? 'border-cyan-400/50 bg-cyan-400/10' : ''}`}
              >
                <RotateCcw className="w-4 h-4" />
              </Button>

              <Button 
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="neom-btn-glass neom-shrink-press"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>

              {guestInfo?.status === 'checked-in' && (
                <Button 
                  onClick={openARNavigation}
                  className="neom-btn-glass neom-shrink-press border border-purple-400/30"
                >
                  <Navigation className="w-4 h-4" />
                </Button>
              )}

              <Button 
                onClick={() => setCurrentView('landing')}
                className="neom-btn-primary neom-shrink-press text-sm px-4 py-2"
              >
                Exit Tour
              </Button>
            </div>
          </div>
        </div>

        {/* Hotspot Detail Modal */}
        {activeHotspot && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-20 p-6">
            <Card className="neom-card-glass neom-card-glass-hover border border-yellow-400/50 max-w-md w-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="neom-heading-neon text-lg">{activeHotspot.title}</CardTitle>
                  <Button 
                    onClick={() => setActiveHotspot(null)}
                    className="neom-btn-glass neom-shrink-press w-8 h-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="neom-body">{activeHotspot.description}</p>
                
                {activeHotspot.details && (
                  <div className="space-y-2">
                    <h4 className="neom-heading text-sm">Features:</h4>
                    <ul className="space-y-1">
                      {activeHotspot.details.map((detail, index) => (
                        <li key={index} className="neom-body text-sm opacity-80 flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-3"></div>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button 
                  onClick={() => setActiveHotspot(null)}
                  className="w-full neom-btn-primary neom-shrink-press"
                >
                  Continue Tour
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Subtitles (when enabled) */}
        {showSubtitles && (
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-md rounded-xl px-4 py-2 max-w-md">
            <p className="neom-body text-sm text-center">
              Welcome to {selectedSpace.name}. Use hotspots to explore interactive features.
            </p>
          </div>
        )}

        {/* AR Navigation Overlay */}
        {showARNavigation && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-20">
            <Card className="neom-card-glass neom-card-glass-hover border border-purple-400/50 max-w-md w-full m-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="neom-heading-neon text-lg">AR Navigation</CardTitle>
                  <Button 
                    onClick={() => setShowARNavigation(false)}
                    className="neom-btn-glass neom-shrink-press w-8 h-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-purple-400/20 border border-purple-400/50 flex items-center justify-center mx-auto">
                  <Camera className="w-10 h-10 text-purple-400" />
                </div>
                <div>
                  <h3 className="neom-heading-neon text-lg mb-2">Camera Access Required</h3>
                  <p className="neom-body text-sm">
                    Allow camera access to enable AR navigation to this location within the hotel.
                  </p>
                </div>
                <div className="space-y-2">
                  <Button className="w-full neom-btn-primary neom-shrink-press">
                    <Camera className="w-4 h-4 mr-2" />
                    Enable AR Navigation
                  </Button>
                  <Button 
                    onClick={() => setShowARNavigation(false)}
                    className="w-full neom-btn-glass neom-shrink-press"
                  >
                    Maybe Later
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {currentView === 'landing' ? renderLandingScreen() : renderVRExperience()}
    </div>
  );
};