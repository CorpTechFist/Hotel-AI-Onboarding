import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Calendar } from './ui/calendar';
import { Progress } from './ui/progress';
import { Switch } from './ui/switch';
import { 
  Calendar as CalendarIcon,
  Clock,
  Users,
  MapPin,
  UtensilsCrossed,
  Music,
  Lightbulb,
  Bot,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Wine,
  Coffee,
  Mic,
  Video,
  Speakers,
  Camera,
  Crown,
  Heart,
  Star,
  Palette,
  TreePine,
  Building,
  Waves,
  Sun,
  Mountain,
  Send,
  MessageCircle,
  ChefHat,
  Leaf,
  Award,
  Gift,
  PartyPopper,
  Briefcase,
  GlassWater
} from 'lucide-react';

interface EventsBookingProps {
  onBack: () => void;
  onBookingComplete?: () => void;
  guestInfo?: any;
}

interface EventFormData {
  eventType: string;
  eventDate: Date | null;
  eventTime: string;
  guestCount: number;
  venue: string;
  dietaryPreferences: string[];
  mealStyle: string;
  specialInstructions: string;
  lighting: string;
  musicStyle: string;
  tableSetup: string;
  theme: string;
  avSupport: string[];
  staffAssistance: number[];
  entertainment: string;
  customRequests: string;
}

interface GuestInfoData {
  fullName: string;
  address: string;
  age: string;
  idNumber: string;
}

type BookingStep = 'event-type' | 'date-guests' | 'guest-info' | 'venue' | 'food-decor' | 'ai-concierge' | 'summary';

const eventTypes = [
  { id: 'dinner', name: 'Dinner', icon: UtensilsCrossed, color: 'orange', description: 'Intimate dining experience' },
  { id: 'gala', name: 'Gala', icon: Crown, color: 'purple', description: 'Formal celebration event' },
  { id: 'party', name: 'Party', icon: PartyPopper, color: 'pink', description: 'Fun celebration gathering' },
  { id: 'conference', name: 'Conference', icon: Briefcase, color: 'blue', description: 'Business meeting event' },
  { id: 'wedding', name: 'Wedding', icon: Heart, color: 'red', description: 'Special matrimonial celebration' },
  { id: 'meeting', name: 'Meeting', icon: Users, color: 'gray', description: 'Professional business meeting' },
  { id: 'poolside', name: 'Poolside Lounge', icon: Waves, color: 'cyan', description: 'Relaxed poolside gathering' },
  { id: 'celebration', name: 'Private Celebration', icon: Gift, color: 'yellow', description: 'Personal milestone event' }
];

const venues = [
  { id: 'pool', name: 'Pool Area', icon: Waves, capacity: 150, features: ['Outdoor', 'Water Views', 'Sunset Views'] },
  { id: 'lounge', name: 'Sky Lounge', icon: Building, capacity: 80, features: ['City Views', 'Indoor/Outdoor', 'Climate Controlled'] },
  { id: 'ballroom', name: 'Grand Ballroom', icon: Crown, capacity: 300, features: ['Elegant', 'Dance Floor', 'Premium Audio'] },
  { id: 'rooftop', name: 'Rooftop Terrace', icon: Mountain, capacity: 120, features: ['360° Views', 'Open Air', 'Stargazing'] },
  { id: 'suite', name: 'Private Suites', icon: Star, capacity: 50, features: ['Intimate', 'Luxury', 'Exclusive'] },
  { id: 'garden', name: 'Garden Pavilion', icon: TreePine, capacity: 100, features: ['Natural Setting', 'Scenic', 'Fresh Air'] }
];

const dietaryOptions = [
  { id: 'vegan', name: 'Vegan', icon: Leaf },
  { id: 'vegetarian', name: 'Vegetarian', icon: Leaf },
  { id: 'non-vegetarian', name: 'Non-Vegetarian', icon: ChefHat },
  { id: 'gluten-free', name: 'Gluten-Free', icon: Award },
  { id: 'dairy-free', name: 'Dairy-Free', icon: GlassWater },
  { id: 'halal', name: 'Halal', icon: Star }
];

const mealStyles = [
  { id: 'buffet', name: 'Buffet Style', description: 'Self-service variety' },
  { id: 'plated', name: 'Plated Service', description: 'Formal served meals' },
  { id: 'cocktail', name: 'Cocktail Style', description: 'Finger foods & drinks' },
  { id: 'custom', name: 'Custom Menu', description: 'Chef-curated experience' }
];

const themes = [
  { id: 'elegant', name: 'Elegant', color: 'purple', description: 'Sophisticated and refined' },
  { id: 'casual', name: 'Casual', color: 'blue', description: 'Relaxed and comfortable' },
  { id: 'corporate', name: 'Corporate', color: 'gray', description: 'Professional and modern' },
  { id: 'romantic', name: 'Romantic', color: 'red', description: 'Intimate and special' },
  { id: 'tropical', name: 'Tropical', color: 'green', description: 'Vibrant and natural' },
  { id: 'futuristic', name: 'Futuristic', color: 'cyan', description: 'Modern and innovative' }
];

export function EventsBooking({ onBack, onBookingComplete, guestInfo }: EventsBookingProps) {
  const [currentStep, setCurrentStep] = useState<BookingStep>('event-type');
  const [formData, setFormData] = useState<EventFormData>({
    eventType: '',
    eventDate: null,
    eventTime: '',
    guestCount: 50,
    venue: '',
    dietaryPreferences: [],
    mealStyle: '',
    specialInstructions: '',
    lighting: 'ambient',
    musicStyle: 'background',
    tableSetup: 'round',
    theme: '',
    avSupport: [],
    staffAssistance: [3, 2, 1], // waitstaff, security, bartenders
    entertainment: '',
    customRequests: ''
  });

  const [guestInfoData, setGuestInfoData] = useState<GuestInfoData>({
    fullName: '',
    address: '',
    age: '',
    idNumber: ''
  });

  const [aiChatMessages, setAiChatMessages] = useState([
    {
      role: 'assistant' as const,
      content: "Hello! I'm ARIA, your AI Event Planner. I'm here to help you create the perfect event. What kind of experience are you looking for?"
    }
  ]);
  const [aiChatInput, setAiChatInput] = useState('');
  const [showAiChat, setShowAiChat] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [isBooking, setIsBooking] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  const steps: BookingStep[] = ['event-type', 'date-guests', 'guest-info', 'venue', 'food-decor', 'ai-concierge', 'summary'];
  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const updateFormData = (field: keyof EventFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const handleAiChat = () => {
    if (!aiChatInput.trim()) return;

    const userMessage = { role: 'user' as const, content: aiChatInput };
    setAiChatMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      let aiResponse = '';
      const input = aiChatInput.toLowerCase();
      
      if (input.includes('romantic') || input.includes('dinner') || input.includes('50')) {
        aiResponse = "Perfect! I've detected you want a romantic dinner for 50 people. I'll suggest the Garden Pavilion with elegant lighting, plated service, and live acoustic music. Would you like me to pre-fill these preferences?";
        
        // Auto-fill form based on AI understanding
        setTimeout(() => {
          updateFormData('eventType', 'dinner');
          updateFormData('guestCount', 50);
          updateFormData('venue', 'garden');
          updateFormData('theme', 'romantic');
          updateFormData('mealStyle', 'plated');
          updateFormData('lighting', 'romantic');
          updateFormData('musicStyle', 'live-acoustic');
        }, 1000);
      } else if (input.includes('pool') || input.includes('party')) {
        aiResponse = "Excellent choice! A poolside party sounds amazing. I recommend the Pool Area venue with cocktail-style service, tropical theme, and upbeat music. The sunset views will be spectacular!";
      } else if (input.includes('corporate') || input.includes('business') || input.includes('meeting')) {
        aiResponse = "I understand you need a corporate event. The Sky Lounge would be ideal with its professional atmosphere, AV equipment, and city views. I'll suggest buffet service and ambient lighting.";
      } else {
        aiResponse = "I can help you plan the perfect event! Could you tell me more about the occasion, number of guests, or preferred style? I can suggest venues, catering, and ambiance based on your needs.";
      }

      setAiChatMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    }, 1500);

    setAiChatInput('');
  };

  const handleBooking = async () => {
    setIsBooking(true);
    
    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsBooking(false);
    setBookingComplete(true);
    
    // Call the completion callback to unlock access
    if (onBookingComplete) {
      onBookingComplete();
    }
  };

  const renderEventTypeStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="neom-heading-neon text-xl mb-2">Choose Event Type</h3>
        <p className="neom-body text-sm opacity-80">What type of event are you planning?</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {eventTypes.map((type) => (
          <Card
            key={type.id}
            className={`neom-card-glass neom-card-glass-hover border cursor-pointer transition-all ${
              formData.eventType === type.id 
                ? `border-${type.color}-400 neom-glow-${type.color}` 
                : `border-${type.color}-400/30 hover:border-${type.color}-400/60`
            }`}
            onClick={() => updateFormData('eventType', type.id)}
          >
            <CardContent className="p-4 text-center">
              <div className={`w-12 h-12 mx-auto mb-3 rounded-xl neom-gradient-glass-${type.color} border border-${type.color}-400/50 flex items-center justify-center`}>
                <type.icon className={`w-6 h-6 text-${type.color}-300`} />
              </div>
              <h4 className="neom-heading text-sm mb-1">{type.name}</h4>
              <p className="neom-body text-xs opacity-70">{type.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderDateGuestsStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="neom-heading-neon text-xl mb-2">Date & Guest Details</h3>
        <p className="neom-body text-sm opacity-80">When and how many guests?</p>
      </div>

      <Card className="neom-card-glass border border-cyan-400/30">
        <CardHeader>
          <CardTitle className="neom-heading-neon flex items-center text-lg">
            <CalendarIcon className="w-5 h-5 mr-2 text-cyan-400" />
            Event Date
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              setSelectedDate(date);
              updateFormData('eventDate', date);
            }}
            disabled={(date) => date < new Date()}
            className="rounded-xl border border-yellow-400/30 bg-yellow-400/20"
          />
        </CardContent>
      </Card>

      <Card className="neom-card-glass border border-yellow-400/30">
        <CardHeader>
          <CardTitle className="neom-heading-neon flex items-center text-lg">
            <Clock className="w-5 h-5 mr-2 text-yellow-400" />
            Event Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={formData.eventTime} onValueChange={(value) => updateFormData('eventTime', value)}>
            <SelectTrigger className="neom-gradient-glass border border-yellow-400/30">
              <SelectValue placeholder="Select event time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">Morning (9:00 AM - 12:00 PM)</SelectItem>
              <SelectItem value="afternoon">Afternoon (12:00 PM - 5:00 PM)</SelectItem>
              <SelectItem value="evening">Evening (5:00 PM - 10:00 PM)</SelectItem>
              <SelectItem value="night">Night (10:00 PM - 2:00 AM)</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card className="neom-card-glass border border-purple-400/30">
        <CardHeader>
          <CardTitle className="neom-heading-neon flex items-center text-lg">
            <Users className="w-5 h-5 mr-2 text-purple-400" />
            Number of Guests: {formData.guestCount}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Slider
            value={[formData.guestCount]}
            onValueChange={(value) => updateFormData('guestCount', value[0])}
            max={300}
            min={10}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-xs neom-body opacity-70 mt-2">
            <span>10 guests</span>
            <span>300 guests</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderGuestInfoStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="neom-heading-neon text-xl mb-2">Guest Information</h3>
        <p className="neom-body text-sm opacity-80">Please provide your contact details</p>
      </div>

      <Card className="neom-card-glass border border-yellow-400/30">
        <CardHeader>
          <CardTitle className="neom-heading-neon flex items-center text-lg">
            <Users className="w-5 h-5 mr-2 text-yellow-400" />
            Your Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="neom-body text-sm mb-2 block">Full Name</label>
            <Input
              type="text"
              placeholder="Enter your full name"
              value={guestInfoData.fullName}
              onChange={(e) => setGuestInfoData(prev => ({ ...prev, fullName: e.target.value }))}
              className="neom-gradient-glass border border-yellow-400/30 text-white placeholder:text-gray-500"
            />
          </div>
          
          <div>
            <label className="neom-body text-sm mb-2 block">Address</label>
            <Textarea
              placeholder="Enter your address"
              value={guestInfoData.address}
              onChange={(e) => setGuestInfoData(prev => ({ ...prev, address: e.target.value }))}
              className="neom-gradient-glass border border-yellow-400/30 text-white placeholder:text-gray-500 min-h-[80px]"
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
                value={guestInfoData.age}
                onChange={(e) => setGuestInfoData(prev => ({ ...prev, age: e.target.value }))}
                className="neom-gradient-glass border border-yellow-400/30 text-white placeholder:text-gray-500"
              />
            </div>
            <div>
              <label className="neom-body text-sm mb-2 block">ID Number</label>
              <Input
                type="text"
                placeholder="ID Number"
                value={guestInfoData.idNumber}
                onChange={(e) => setGuestInfoData(prev => ({ ...prev, idNumber: e.target.value }))}
                className="neom-gradient-glass border border-yellow-400/30 text-white placeholder:text-gray-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderVenueStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="neom-heading-neon text-xl mb-2">Choose Venue</h3>
        <p className="neom-body text-sm opacity-80">Select the perfect location for your event</p>
      </div>

      <div className="space-y-4">
        {venues.map((venue) => (
          <Card
            key={venue.id}
            className={`neom-card-glass neom-card-glass-hover border cursor-pointer transition-all ${
              formData.venue === venue.id 
                ? 'border-cyan-400 neom-glow-cyan' 
                : 'border-cyan-400/30 hover:border-cyan-400/60'
            }`}
            onClick={() => updateFormData('venue', venue.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl neom-gradient-glass-cyan border border-cyan-400/50 flex items-center justify-center">
                  <venue.icon className="w-6 h-6 text-cyan-300" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="neom-heading text-lg">{venue.name}</h4>
                    <Badge className="neom-status-success">
                      Up to {venue.capacity} guests
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {venue.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-cyan-400/30 text-cyan-300">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                {formData.venue === venue.id && (
                  <CheckCircle2 className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderFoodDecorStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="neom-heading-neon text-xl mb-2">Food & Ambience</h3>
        <p className="neom-body text-sm opacity-80">Customize your dining and atmosphere preferences</p>
      </div>

      {/* Dietary Preferences */}
      <Card className="neom-card-glass border border-green-400/30">
        <CardHeader>
          <CardTitle className="neom-heading-neon flex items-center text-lg">
            <ChefHat className="w-5 h-5 mr-2 text-green-400" />
            Dietary Preferences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {dietaryOptions.map((option) => (
              <Button
                key={option.id}
                variant={formData.dietaryPreferences.includes(option.id) ? "default" : "outline"}
                onClick={() => {
                  const current = formData.dietaryPreferences;
                  const updated = current.includes(option.id)
                    ? current.filter(p => p !== option.id)
                    : [...current, option.id];
                  updateFormData('dietaryPreferences', updated);
                }}
                className={`neom-btn-glass neom-shrink-press flex items-center space-x-2 ${
                  formData.dietaryPreferences.includes(option.id) 
                    ? 'border-green-400 bg-green-400/10' 
                    : 'border-green-400/30'
                }`}
              >
                <option.icon className="w-4 h-4" />
                <span className="text-xs">{option.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Meal Style */}
      <Card className="neom-card-glass border border-orange-400/30">
        <CardHeader>
          <CardTitle className="neom-heading-neon flex items-center text-lg">
            <UtensilsCrossed className="w-5 h-5 mr-2 text-orange-400" />
            Meal Style
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mealStyles.map((style) => (
              <div
                key={style.id}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  formData.mealStyle === style.id
                    ? 'border-orange-400 bg-orange-400/10'
                    : 'border-orange-400/30 hover:border-orange-400/60'
                }`}
                onClick={() => updateFormData('mealStyle', style.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="neom-heading text-sm">{style.name}</h4>
                    <p className="neom-body text-xs opacity-70">{style.description}</p>
                  </div>
                  {formData.mealStyle === style.id && (
                    <CheckCircle2 className="w-5 h-5 text-orange-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Theme Selection */}
      <Card className="neom-card-glass border border-purple-400/30">
        <CardHeader>
          <CardTitle className="neom-heading-neon flex items-center text-lg">
            <Palette className="w-5 h-5 mr-2 text-purple-400" />
            Event Theme
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  formData.theme === theme.id
                    ? `border-${theme.color}-400 bg-${theme.color}-400/10`
                    : `border-${theme.color}-400/30 hover:border-${theme.color}-400/60`
                }`}
                onClick={() => updateFormData('theme', theme.id)}
              >
                <div className="text-center">
                  <h4 className="neom-heading text-sm mb-1">{theme.name}</h4>
                  <p className="neom-body text-xs opacity-70">{theme.description}</p>
                  {formData.theme === theme.id && (
                    <CheckCircle2 className={`w-4 h-4 text-${theme.color}-400 mx-auto mt-2`} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Special Instructions */}
      <Card className="neom-card-glass border border-yellow-400/30">
        <CardHeader>
          <CardTitle className="neom-heading-neon flex items-center text-lg">
            <Sparkles className="w-5 h-5 mr-2 text-yellow-400" />
            Special Instructions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.specialInstructions}
            onChange={(e) => updateFormData('specialInstructions', e.target.value)}
            placeholder="Any special requests for the chef or specific arrangements..."
            className="neom-gradient-glass border border-yellow-400/30 text-white placeholder-gray-400 resize-none"
            rows={3}
          />
        </CardContent>
      </Card>
    </div>
  );

  const renderAiConciergeStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="neom-heading-neon text-xl mb-2">AI Event Assistant</h3>
        <p className="neom-body text-sm opacity-80">Let ARIA help perfect your event details</p>
      </div>

      <Card className="neom-card-glass border border-cyan-400/30">
        <CardHeader>
          <CardTitle className="neom-heading-neon flex items-center text-lg">
            <Bot className="w-5 h-5 mr-2 text-cyan-400" />
            ARIA - Your Event Planner
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 overflow-y-auto mb-4 space-y-3 p-3 rounded-xl bg-black/20">
            {aiChatMessages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-xl ${
                    message.role === 'user'
                      ? 'bg-yellow-400/20 border border-yellow-400/30 text-yellow-100'
                      : 'bg-cyan-400/20 border border-cyan-400/30 text-cyan-100'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex space-x-2">
            <Input
              value={aiChatInput}
              onChange={(e) => setAiChatInput(e.target.value)}
              placeholder="Describe your ideal event..."
              className="neom-gradient-glass border border-cyan-400/30 text-white placeholder-gray-400"
              onKeyPress={(e) => e.key === 'Enter' && handleAiChat()}
            />
            <Button
              onClick={handleAiChat}
              className="neom-btn-primary neom-shrink-press"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick AI Suggestions */}
      <div className="grid grid-cols-1 gap-3">
        <Button
          onClick={() => {
            setAiChatInput("I want a romantic dinner for 50 people by the pool with live music and vegan options");
            handleAiChat();
          }}
          className="neom-btn-glass neom-shrink-press text-left p-4 h-auto"
        >
          <div>
            <p className="neom-body text-sm">💝 Romantic poolside dinner for 50 with live music</p>
          </div>
        </Button>
        <Button
          onClick={() => {
            setAiChatInput("Corporate conference for 100 people with AV setup and buffet lunch");
            handleAiChat();
          }}
          className="neom-btn-glass neom-shrink-press text-left p-4 h-auto"
        >
          <div>
            <p className="neom-body text-sm">💼 Corporate conference with full AV and catering</p>
          </div>
        </Button>
        <Button
          onClick={() => {
            setAiChatInput("Wedding celebration for 200 guests in the garden with elegant decor");
            handleAiChat();
          }}
          className="neom-btn-glass neom-shrink-press text-left p-4 h-auto"
        >
          <div>
            <p className="neom-body text-sm">💒 Garden wedding with elegant atmosphere</p>
          </div>
        </Button>
      </div>
    </div>
  );

  const renderSummaryStep = () => {
    const selectedEventType = eventTypes.find(t => t.id === formData.eventType);
    const selectedVenue = venues.find(v => v.id === formData.venue);
    const selectedTheme = themes.find(t => t.id === formData.theme);
    const selectedMealStyle = mealStyles.find(m => m.id === formData.mealStyle);

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="neom-heading-neon text-xl mb-2">Event Summary</h3>
          <p className="neom-body text-sm opacity-80">Review your event details before booking</p>
        </div>

        <Card className="neom-card-glass border border-yellow-400/30">
          <CardHeader>
            <CardTitle className="neom-heading-neon flex items-center text-lg">
              <Sparkles className="w-5 h-5 mr-2 text-yellow-400" />
              Event Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-yellow-400/20">
              <span className="neom-body">Event Type:</span>
              <span className="neom-heading-yellow">{selectedEventType?.name}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-yellow-400/20">
              <span className="neom-body">Date:</span>
              <span className="neom-mono-yellow">
                {formData.eventDate ? formData.eventDate.toLocaleDateString() : 'Not selected'}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-yellow-400/20">
              <span className="neom-body">Time:</span>
              <span className="neom-mono-yellow capitalize">{formData.eventTime || 'Not selected'}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-yellow-400/20">
              <span className="neom-body">Guests:</span>
              <span className="neom-mono-yellow">{formData.guestCount} people</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-yellow-400/20">
              <span className="neom-body">Venue:</span>
              <span className="neom-heading-yellow">{selectedVenue?.name}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-yellow-400/20">
              <span className="neom-body">Theme:</span>
              <span className="neom-heading-yellow">{selectedTheme?.name}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="neom-body">Meal Style:</span>
              <span className="neom-heading-yellow">{selectedMealStyle?.name}</span>
            </div>
          </CardContent>
        </Card>

        {formData.dietaryPreferences.length > 0 && (
          <Card className="neom-card-glass border border-green-400/30">
            <CardHeader>
              <CardTitle className="neom-heading-neon flex items-center text-lg">
                <ChefHat className="w-5 h-5 mr-2 text-green-400" />
                Dietary Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {formData.dietaryPreferences.map((pref) => {
                  const option = dietaryOptions.find(o => o.id === pref);
                  return (
                    <Badge key={pref} className="neom-status-success">
                      {option?.name}
                    </Badge>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {formData.specialInstructions && (
          <Card className="neom-card-glass border border-purple-400/30">
            <CardHeader>
              <CardTitle className="neom-heading-neon flex items-center text-lg">
                <MessageCircle className="w-5 h-5 mr-2 text-purple-400" />
                Special Instructions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="neom-body">{formData.specialInstructions}</p>
            </CardContent>
          </Card>
        )}

        <Card className="neom-card-glass border border-cyan-400/30">
          <CardHeader>
            <CardTitle className="neom-heading-neon flex items-center text-lg">
              <Award className="w-5 h-5 mr-2 text-cyan-400" />
              Estimated Investment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="neom-body">Base Event Package:</span>
                <span className="neom-mono">$2,500</span>
              </div>
              <div className="flex justify-between">
                <span className="neom-body">Venue Premium:</span>
                <span className="neom-mono">$800</span>
              </div>
              <div className="flex justify-between">
                <span className="neom-body">Catering ({formData.guestCount} guests):</span>
                <span className="neom-mono">${formData.guestCount * 45}</span>
              </div>
              <div className="border-t border-cyan-400/30 pt-2 mt-3">
                <div className="flex justify-between">
                  <span className="neom-heading">Total Estimate:</span>
                  <span className="neom-heading-yellow text-xl">${3300 + (formData.guestCount * 45)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button
          onClick={handleBooking}
          disabled={isBooking}
          className="neom-btn-primary w-full neom-shrink-press py-4"
        >
          {isBooking ? 'Processing Booking...' : 'Confirm & Book Event'}
        </Button>
      </div>
    );
  };

  if (bookingComplete) {
    return (
      <div className="neom-bg-futuristic min-h-screen p-6">
        <div className="max-w-md mx-auto">
          <div className="text-center space-y-6 py-12">
            <div className="w-24 h-24 mx-auto rounded-full neom-gradient-glass-yellow border border-yellow-400/50 flex items-center justify-center neom-glow-yellow">
              <CheckCircle2 className="w-12 h-12 text-yellow-400" />
            </div>
            <div>
              <h2 className="neom-heading-neon text-2xl mb-3">Event Booked Successfully!</h2>
              <p className="neom-body">Your event has been confirmed. You'll receive a detailed confirmation email shortly.</p>
            </div>
            <div className="space-y-3">
              <Button
                onClick={onBack}
                className="neom-btn-primary w-full neom-shrink-press"
              >
                Return to Services
              </Button>
              <Button
                onClick={() => setCurrentStep('summary')}
                className="neom-btn-glass w-full neom-shrink-press"
              >
                View Event Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="neom-bg-futuristic min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 neom-gradient-glass backdrop-blur-md border-b border-yellow-400/20 p-4">
        <div className="flex items-center justify-between mb-4">
          <Button
            onClick={onBack}
            className="neom-btn-glass neom-shrink-press"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="neom-heading-neon text-xl">Events Booking</h1>
          <div className="w-16"></div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs neom-body">
            <span>Step {currentStepIndex + 1} of {steps.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 neom-gradient-glass" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 pb-24">
        <div className="max-w-md mx-auto">
          {currentStep === 'event-type' && renderEventTypeStep()}
          {currentStep === 'date-guests' && renderDateGuestsStep()}
          {currentStep === 'guest-info' && renderGuestInfoStep()}
          {currentStep === 'venue' && renderVenueStep()}
          {currentStep === 'food-decor' && renderFoodDecorStep()}
          {currentStep === 'ai-concierge' && renderAiConciergeStep()}
          {currentStep === 'summary' && renderSummaryStep()}
        </div>
      </div>

      {/* Navigation Footer */}
      {currentStep !== 'summary' && (
        <div className="fixed bottom-0 left-0 right-0 neom-gradient-glass backdrop-blur-md border-t border-yellow-400/20 p-4">
          <div className="flex justify-between max-w-md mx-auto">
            <Button
              onClick={prevStep}
              disabled={currentStepIndex === 0}
              className="neom-btn-glass neom-shrink-press"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              onClick={nextStep}
              disabled={
                (currentStep === 'event-type' && !formData.eventType) ||
                (currentStep === 'date-guests' && (!formData.eventDate || !formData.eventTime)) ||
                (currentStep === 'guest-info' && (!guestInfoData.fullName || !guestInfoData.address || !guestInfoData.age || !guestInfoData.idNumber)) ||
                (currentStep === 'venue' && !formData.venue) ||
                (currentStep === 'food-decor' && (!formData.mealStyle || !formData.theme))
              }
              className="neom-btn-primary neom-shrink-press"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}