import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { InteractiveHotelMap } from './InteractiveHotelMap';
import {
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
  MessageCircle,
  ConciergeBell,
  Car,
  Calendar,
  ShoppingBag,
  Bed,
  Map,
  ArrowRight,
  MapPin
} from 'lucide-react';

interface ServicesTabProps {
  onNavigateToService?: (service: string) => void;
  onServiceRequest?: (category: string, service: string) => void;
}

export function ServicesTab({ onNavigateToService, onServiceRequest }: ServicesTabProps) {
  const [showInteractiveMap, setShowInteractiveMap] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const serviceCategories = [
    {
      id: 'dining',
      emoji: '🍽️',
      title: 'Dining & Room Service',
      color: 'orange',
      services: [
        { icon: Utensils, name: 'Room Service', description: '24/7 in-room dining', available: true },
        { icon: UtensilsCrossed, name: 'Restaurant Booking', description: 'Reserve tables at our venues', available: true },
        { icon: Wine, name: 'Bar & Lounge', description: 'Cocktails and premium drinks', available: true },
        { icon: Coffee, name: 'Café & Pastries', description: 'Fresh coffee and light bites', available: true }
      ]
    },
    {
      id: 'housekeeping',
      emoji: '🧹',
      title: 'Housekeeping & Maintenance',
      color: 'cyan',
      services: [
        { icon: Settings, name: 'Room Cleaning', description: 'Daily housekeeping service', available: true },
        { icon: Package, name: 'Laundry Service', description: 'Wash, dry, and press', available: true },
        { icon: Bed, name: 'Fresh Linens', description: 'Extra towels and bedding', available: true },
        { icon: Fan, name: 'Room Maintenance', description: 'Repairs and adjustments', available: true }
      ]
    },
    {
      id: 'wellness',
      emoji: '🧘',
      title: 'Wellness & Recreation',
      color: 'emerald',
      services: [
        { icon: Sparkles, name: 'Spa Treatments', description: 'Massage and skincare', available: true },
        { icon: Dumbbell, name: 'Fitness Center', description: '24/7 gym access', available: true },
        { icon: Waves, name: 'Pool & Beach', description: 'Swimming and water sports', available: true },
        { icon: MessageCircle, name: 'Meditation Classes', description: 'Mindfulness sessions', available: true }
      ]
    },
    {
      id: 'concierge',
      emoji: '🎯',
      title: 'Concierge & Travel',
      color: 'purple',
      services: [
        { icon: ConciergeBell, name: 'Local Recommendations', description: 'Best spots to visit', available: true },
        { icon: Car, name: 'Transportation', description: 'Taxi and airport transfers', available: true },
        { icon: Calendar, name: 'Event Booking', description: 'Tours and activities', available: true },
        { icon: ShoppingBag, name: 'Shopping Service', description: 'Personal shopping assistance', available: true }
      ]
    }
  ];

  const handleServiceClick = (category: string, serviceName: string) => {
    if (onServiceRequest) {
      onServiceRequest(category, serviceName);
    }
  };

  const handleMapServiceNavigation = (service: string) => {
    if (onNavigateToService) {
      onNavigateToService(service);
    }
    setShowInteractiveMap(false);
  };

  if (showInteractiveMap) {
    return (
      <div className="p-6 pb-24 space-y-6 neom-responsive-padding">
        {/* Back Button */}
        <div className="flex items-center space-x-4 mb-6">
          <Button 
            onClick={() => setShowInteractiveMap(false)} 
            className="neom-btn-glass neom-shrink-press"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
          </Button>
          <h2 className="neom-heading-neon text-xl">Interactive Hotel Map</h2>
        </div>

        {/* Interactive Map Component */}
        <InteractiveHotelMap onNavigateToService={handleMapServiceNavigation} />
      </div>
    );
  }

  return (
    <div className="p-6 pb-24 space-y-6 neom-responsive-padding">
      {/* Header */}
      <div className="mb-6">
        <h2 className="neom-heading-neon text-2xl mb-2">Hotel Services</h2>
        <p className="neom-body opacity-80">Request services and explore hotel amenities</p>
      </div>

      {/* Interactive Map Card - Featured */}
      <Card 
        className="neom-card-glass neom-card-glass-hover border border-cyan-400/30 cursor-pointer neom-slide-in"
        onClick={() => setShowInteractiveMap(true)}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-purple-400/20 border border-cyan-400/40 flex items-center justify-center neom-glow-cyan">
                <MapPin className="w-8 h-8 text-cyan-400" />
              </div>
              <div className="flex-1">
                <h3 className="neom-heading text-lg mb-1 flex items-center">
                  Interactive Hotel Map
                  <Badge className="ml-3 bg-yellow-400/20 text-yellow-400 border border-yellow-400/40">
                    New Feature
                  </Badge>
                </h3>
                <p className="neom-body text-sm mb-2">Explore hotel facilities, find directions, and navigate with ease</p>
                <div className="flex items-center space-x-4 text-xs">
                  <span className="flex items-center space-x-1">
                    <Map className="w-3 h-3 text-cyan-400" />
                    <span className="neom-body">5 Floors</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    <span className="neom-body">25+ POIs</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Settings className="w-3 h-3 text-orange-400" />
                    <span className="neom-body">Wayfinding</span>
                  </span>
                </div>
              </div>
              <ArrowRight className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Categories */}
      <div className="space-y-4">
        {serviceCategories.map((category, index) => (
          <Card 
            key={category.id}
            className="neom-card-glass neom-card-glass-hover border border-slate-600/30 neom-slide-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <CardHeader>
              <CardTitle 
                className="neom-heading-neon flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{category.emoji}</span>
                  <span>{category.title}</span>
                </div>
                <ArrowRight 
                  className={`w-5 h-5 text-${category.color}-400 transition-transform duration-300 ${
                    expandedCategory === category.id ? 'rotate-90' : ''
                  }`} 
                />
              </CardTitle>
            </CardHeader>
            
            {expandedCategory === category.id && (
              <CardContent className="space-y-3 neom-fade-in">
                {category.services.map((service) => (
                  <div
                    key={service.name}
                    onClick={() => handleServiceClick(category.id, service.name)}
                    className={`
                      p-4 rounded-xl neom-gradient-glass border cursor-pointer
                      neom-transition neom-shrink-press
                      ${service.available 
                        ? `border-${category.color}-400/40 hover:border-${category.color}-400/60 hover:bg-${category.color}-400/10` 
                        : 'border-gray-600/30 opacity-50 cursor-not-allowed'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className={`
                          w-12 h-12 rounded-xl flex items-center justify-center
                          ${service.available 
                            ? `bg-${category.color}-400/20 border border-${category.color}-400/40` 
                            : 'bg-gray-600/20 border border-gray-600/30'
                          }
                        `}>
                          {React.createElement(service.icon, {
                            className: `w-6 h-6 ${service.available ? `text-${category.color}-400` : 'text-gray-400'}`
                          })}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="neom-heading text-sm">{service.name}</h4>
                            {service.available && (
                              <Badge className={`bg-${category.color}-400/20 text-${category.color}-300 border border-${category.color}-400/30 text-xs`}>
                                Available
                              </Badge>
                            )}
                          </div>
                          <p className="neom-body text-xs opacity-80">{service.description}</p>
                        </div>
                      </div>
                      {service.available && (
                        <ArrowRight className={`w-5 h-5 text-${category.color}-400`} />
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="neom-card-glass border border-yellow-400/30">
        <CardHeader>
          <CardTitle className="neom-heading-yellow flex items-center">
            <Sparkles className="w-5 h-5 mr-2" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => onNavigateToService?.('ai-concierge')}
              className="neom-btn-glass neom-shrink-press flex-col h-auto py-4"
            >
              <MessageCircle className="w-6 h-6 mb-2 text-cyan-400" />
              <span className="text-sm">AI Concierge</span>
            </Button>
            <Button
              onClick={() => setShowInteractiveMap(true)}
              className="neom-btn-glass neom-shrink-press flex-col h-auto py-4"
            >
              <Map className="w-6 h-6 mb-2 text-purple-400" />
              <span className="text-sm">Hotel Map</span>
            </Button>
            <Button
              onClick={() => onNavigateToService?.('hotel-directory')}
              className="neom-btn-glass neom-shrink-press flex-col h-auto py-4"
            >
              <ConciergeBell className="w-6 h-6 mb-2 text-orange-400" />
              <span className="text-sm">Directory</span>
            </Button>
            <Button
              onClick={() => onNavigateToService?.('virtual-tour')}
              className="neom-btn-glass neom-shrink-press flex-col h-auto py-4"
            >
              <Calendar className="w-6 h-6 mb-2 text-emerald-400" />
              <span className="text-sm">Virtual Tours</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
