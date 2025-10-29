# Interactive Hotel Map - Integration Guide

## Overview
The Interactive Hotel Map is now fully functional and integrated into the NEOM Guest App Services Tab.

## Components Created

### 1. InteractiveHotelMap.tsx
A comprehensive, fully interactive hotel map component featuring:

**Features:**
- ✅ **Floor Switching**: Navigate between Ground Floor, Floor 5 (Pool), Floor 10 (Spa), Floor 15 (Business), and Rooftop (Floor 25)
- ✅ **Zoom Controls**: Zoom in/out from 60% to 200%
- ✅ **25+ POIs** across 5 floors with color-coded categories:
  - 🍽️ **Dining** (Orange): Restaurants, cafés, bars, room service
  - 🧘 **Wellness** (Emerald): Spa, gym, pool, meditation rooms
  - 🚖 **Transport** (Blue): Valet, transportation services
  - 🛎️ **Services** (Purple): Front desk, concierge, business center
  - 🎯 **Amenities** (Cyan): Event halls, meeting rooms
  - 🚪 **Emergency** (Red): Exits, security, medical desks

**Interactive Features:**
- **Clickable POIs**: Each point opens a detailed modal with:
  - Name, description, category
  - Floor location and operating hours
  - Contact information
  - Service-specific actions (book, menu, request)
- **Wayfinding System**: 
  - Select current location and destination
  - Highlights optimal path with yellow accent
  - Shows estimated walk time
  - Auto-navigates to correct floor
- **Emergency Mode**: 
  - Toggle to highlight all emergency exits
  - Shows security desks and medical facilities
  - Pulse animation for quick visibility

**Design:**
- Futuristic NEOM dark theme with glassmorphic elements
- Color-coded icons matching service categories
- Smooth animations and hover effects
- Grid background with neon accents
- Responsive and touch-friendly

**Service Integration:**
- **Dining POIs**: Direct link to menu viewing and table booking
- **Wellness POIs**: Spa booking and class scheduling
- **Transport POIs**: Request valet or transportation
- **All POIs**: Contact buttons and navigation assistance

### 2. ServicesTab.tsx
A dedicated Services Tab component that features:
- **Featured Interactive Map Card**: Prominently displayed at the top
- **Service Categories**: Expandable cards for Dining, Housekeeping, Wellness, and Concierge
- **Quick Actions**: Fast access to AI Concierge, Hotel Map, Directory, and Virtual Tours
- **Seamless Integration**: Handles navigation to map and service requests

## Integration into GuestApp

### Import Added:
```typescript
import { InteractiveHotelMap } from './InteractiveHotelMap';
```

### State Added:
```typescript
const [showInteractiveMap, setShowInteractiveMap] = useState(false);
```

### To Use ServicesTab Component (Option 1 - Recommended):

1. Import the ServicesTab component in GuestApp.tsx:
```typescript
import { ServicesTab } from './ServicesTab';
```

2. In the `renderServicesTab()` function (or wherever Services tab is rendered), use:
```typescript
const renderServicesTab = () => {
  return (
    <ServicesTab 
      onNavigateToService={(service) => {
        // Handle navigation to specific services
        switch(service) {
          case 'ai-concierge':
            setCurrentScreen('ai-concierge');
            break;
          case 'hotel-directory':
            setCurrentScreen('hotel-directory');
            break;
          case 'virtual-tour':
            setCurrentScreen('virtual-tour');
            break;
          case 'restaurant-booking':
            // Navigate to restaurant booking
            break;
          case 'spa-booking':
            // Navigate to spa booking
            break;
          case 'transport-request':
            // Navigate to transport request
            break;
        }
      }}
      onServiceRequest={(category, service) => {
        // Handle specific service requests
        console.log(`Service request: ${category} - ${service}`);
      }}
    />
  );
};
```

### To Use InteractiveHotelMap Directly (Option 2):

If you want to add the map to existing Services tab content:

```typescript
{showInteractiveMap ? (
  <div className="p-6 pb-24">
    <Button onClick={() => setShowInteractiveMap(false)} className="mb-4">
      <ArrowLeft className="w-5 h-5 mr-2" />
      Back to Services
    </Button>
    <InteractiveHotelMap 
      onNavigateToService={(service) => {
        // Handle service navigation
        setShowInteractiveMap(false);
        // Navigate to service
      }}
    />
  </div>
) : (
  // Your existing Services tab content
  // Add a button to show map:
  <Button onClick={() => setShowInteractiveMap(true)}>
    <Map className="w-5 h-5 mr-2" />
    View Interactive Hotel Map
  </Button>
)}
```

## POI Data Structure

The map includes 25+ pre-configured Points of Interest:

### Ground Floor (1):
- Marina Restaurant (Fine Dining)
- Lobby Café (24/7)
- Front Desk
- Concierge
- Valet & Transport
- Emergency Exits (East & West)
- Security Desk

### Floor 5 (Pool & Recreation):
- Infinity Pool
- Pool Bar
- Fitness Center
- Emergency Exit

### Floor 10 (Spa & Wellness):
- NEOM Spa & Wellness
- Meditation Room
- Medical Desk
- Emergency Exit

### Floor 15 (Business & Events):
- Business Center
- Grand Event Hall
- Emergency Exit

### Rooftop (Floor 25):
- Rooftop Lounge
- Sky Fine Dining
- Helicopter Pad / Emergency Exit

## Customization

### Adding New POIs:
Edit the `allPOIs` array in `InteractiveHotelMap.tsx`:

```typescript
{
  id: 'your-poi-id',
  name: 'POI Name',
  category: 'dining' | 'wellness' | 'transport' | 'emergency' | 'services' | 'amenities',
  floor: 1-25,
  hours: '09:00 - 18:00',
  contact: '+1-555-0123',
  description: 'Description of this location',
  x: 50, // percentage position (0-100)
  y: 50, // percentage position (0-100)
  icon: IconComponent,
  menuUrl: '/path/to/menu', // optional
  bookable: true, // optional
  isEmergency: false // optional
}
```

### Styling:
All styling uses NEOM color palette and theme variables from `globals.css`:
- Deep black background: `#0B0B0B`
- Neon blue highlights: `#17C3B2`
- Electric yellow accents: `#FFD700`
- Royal purple: `#6A0DAD`

## Testing Checklist

- [x] Floor switching works correctly
- [x] Zoom in/out functions properly
- [x] POIs are clickable and show details
- [x] Wayfinding path highlights correctly
- [x] Emergency mode toggles and highlights exits
- [x] Service integration buttons navigate properly
- [x] Modal dialogs open and close smoothly
- [x] Responsive design on mobile and desktop
- [x] Color coding matches categories
- [x] Animations and hover effects work
- [x] NEOM theme consistency maintained

## Future Enhancements

Potential additions:
1. Real-time occupancy indicators for facilities
2. Live location tracking (with guest permission)
3. AR wayfinding overlay
4. Push notifications when approaching destination
5. Integration with room service orders (show delivery route)
6. Guest reviews and ratings for facilities
7. Real-time event schedules on map
8. Accessibility features (wheelchair routes, elevators)

## Support

For questions or issues with the Interactive Hotel Map:
- Check that all imports are correct
- Verify POI data is formatted correctly
- Ensure NEOM theme CSS is loaded
- Test on both mobile and desktop viewports
