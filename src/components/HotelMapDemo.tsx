import React from 'react';
import { InteractiveHotelMap } from './InteractiveHotelMap';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, Sparkles } from 'lucide-react';

/**
 * Demo component to showcase the Interactive Hotel Map
 * This can be used for testing or as a standalone page
 */
export function HotelMapDemo() {
  const handleServiceNavigation = (service: string) => {
    console.log(`Navigation requested to: ${service}`);
    alert(`Navigation to ${service} would happen here.\n\nIn the full app, this would navigate to:\n- Restaurant booking for dining POIs\n- Spa booking for wellness POIs\n- Transportation request for transport POIs`);
  };

  return (
    <div className="neom-bg-futuristic min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="neom-card-glass border border-cyan-400/30">
          <CardHeader>
            <CardTitle className="neom-heading-neon flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-400/20 border border-cyan-400/40 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h1 className="text-2xl">Interactive Hotel Map</h1>
                  <p className="neom-body text-sm opacity-80 mt-1">NEOM Hospitality OS Demo</p>
                </div>
              </div>
              <Badge className="bg-yellow-400/20 text-yellow-400 border border-yellow-400/40">
                <Sparkles className="w-3 h-3 mr-1" />
                New Feature
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="neom-body">
                Explore hotel facilities across 5 floors with interactive wayfinding, emergency mode, 
                and seamless service booking integration.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl neom-gradient-glass border border-orange-400/30">
                  <div className="neom-mono-yellow text-xl mb-1">25+</div>
                  <div className="neom-body text-xs">Points of Interest</div>
                </div>
                <div className="p-3 rounded-xl neom-gradient-glass border border-cyan-400/30">
                  <div className="neom-mono-yellow text-xl mb-1">5</div>
                  <div className="neom-body text-xs">Floors Mapped</div>
                </div>
                <div className="p-3 rounded-xl neom-gradient-glass border border-emerald-400/30">
                  <div className="neom-mono-yellow text-xl mb-1">6</div>
                  <div className="neom-body text-xs">Categories</div>
                </div>
                <div className="p-3 rounded-xl neom-gradient-glass border border-purple-400/30">
                  <div className="neom-mono-yellow text-xl mb-1">24/7</div>
                  <div className="neom-body text-xs">Emergency Info</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-yellow-400/10 border border-yellow-400/30">
                <h4 className="neom-heading text-yellow-400 text-sm mb-2 flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Key Features
                </h4>
                <ul className="space-y-1 neom-body text-xs">
                  <li className="flex items-center space-x-2">
                    <span className="text-yellow-400">✓</span>
                    <span>Multi-floor navigation with zoom controls</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-yellow-400">✓</span>
                    <span>Wayfinding system with path highlighting</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-yellow-400">✓</span>
                    <span>Emergency mode for safety information</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-yellow-400">✓</span>
                    <span>Service booking integration (dining, spa, transport)</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Map */}
        <InteractiveHotelMap onNavigateToService={handleServiceNavigation} />

        {/* Instructions */}
        <Card className="neom-card-glass border border-slate-600/30">
          <CardHeader>
            <CardTitle className="neom-heading">How to Use</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center neom-mono-yellow mb-2">
                  1
                </div>
                <h4 className="neom-heading text-sm text-cyan-400">Explore Floors</h4>
                <p className="neom-body text-xs">
                  Select different floors from the dropdown to discover facilities on each level.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-purple-400/20 border border-purple-400/40 flex items-center justify-center neom-mono-yellow mb-2">
                  2
                </div>
                <h4 className="neom-heading text-sm text-purple-400">Click POIs</h4>
                <p className="neom-body text-xs">
                  Click any point of interest on the map to view details, hours, and book services.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-yellow-400/20 border border-yellow-400/40 flex items-center justify-center neom-mono-yellow mb-2">
                  3
                </div>
                <h4 className="neom-heading text-sm text-yellow-400">Find Your Way</h4>
                <p className="neom-body text-xs">
                  Use the "Find Path" feature to get directions from your location to any destination.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
