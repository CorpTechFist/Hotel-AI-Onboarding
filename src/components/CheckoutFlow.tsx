import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  ArrowRight,
  ArrowLeft,
  X,
  CreditCard,
  Receipt,
  CheckCircle,
  DollarSign,
  FileText,
  Star,
  Gift,
  Sparkles,
  Clock,
  Calendar,
  MessageCircle
} from 'lucide-react';

interface CheckoutFlowProps {
  onClose: () => void;
  checkoutData: {
    roomCharges: number;
    foodAndBeverage: number;
    spa: number;
    incidentals: number;
    tax: number;
    total: number;
  };
  staffMembers: any[];
  favoriteStaff: string[];
  onFavoriteToggle: (staffName: string) => void;
  onPayTipFromWallet?: (staffName: string, amount: number) => void;
  walletBalance?: number;
  guestInfo?: any;
}

export function CheckoutFlow({
  onClose,
  checkoutData,
  staffMembers,
  favoriteStaff,
  onFavoriteToggle,
  onPayTipFromWallet,
  walletBalance = 0,
  guestInfo
}: CheckoutFlowProps) {
  const [currentStep, setCurrentStep] = useState<'bill-review' | 'rate-tip' | 'payment' | 'complete'>('bill-review');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  
  // Rate & Tip State - Two Step Flow
  const [selectedStaff, setSelectedStaff] = useState<any | null>(null);
  const [staffRatings, setStaffRatings] = useState<Record<string, number>>({});
  const [staffFeedback, setStaffFeedback] = useState<Record<string, string>>({});
  const [staffTips, setStaffTips] = useState<Record<string, number>>({});
  const [hoverRating, setHoverRating] = useState(0);

  const steps = [
    { id: 'bill-review', label: 'Review Bill', icon: Receipt },
    { id: 'rate-tip', label: 'Rate & Tip', icon: Star },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'complete', label: 'Complete', icon: CheckCircle }
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);
  const progressPercentage = ((currentStepIndex + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep === 'bill-review') {
      setCurrentStep('rate-tip');
    } else if (currentStep === 'rate-tip') {
      setCurrentStep('payment');
    } else if (currentStep === 'payment') {
      // Process payment
      setPaymentProcessing(true);
      setTimeout(() => {
        setPaymentProcessing(false);
        setCurrentStep('complete');
      }, 2000);
    }
  };

  const handleBack = () => {
    if (currentStep === 'rate-tip') {
      setCurrentStep('bill-review');
    } else if (currentStep === 'payment') {
      setCurrentStep('rate-tip');
    } else if (currentStep === 'complete') {
      onClose();
    } else if (currentStep === 'bill-review') {
      onClose();
    }
  };

  const handleSkipRateTip = () => {
    setCurrentStep('payment');
  };

  const renderBillReview = () => (
    <div className="space-y-6">
      {/* Guest Info */}
      <Card className="neom-card-glass border border-yellow-400/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="neom-heading text-lg">{guestInfo?.name || 'Guest'}</h3>
              <p className="neom-body text-sm opacity-70">Room {guestInfo?.room || '1205'}</p>
            </div>
            <div className="text-right">
              <p className="neom-body text-sm opacity-70">Check-out</p>
              <p className="neom-mono text-sm">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bill Summary */}
      <Card className="neom-card-glass border border-purple-400/30">
        <CardHeader>
          <CardTitle className="neom-heading-neon flex items-center">
            <Receipt className="w-5 h-5 mr-2 text-purple-400" />
            Bill Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between p-3 rounded-xl neom-gradient-glass border border-gray-700/30">
              <span className="neom-body">Room Charges</span>
              <span className="neom-mono-yellow">${checkoutData.roomCharges.toFixed(2)}</span>
            </div>
            <div className="flex justify-between p-3 rounded-xl neom-gradient-glass border border-gray-700/30">
              <span className="neom-body">Food & Beverage</span>
              <span className="neom-mono-yellow">${checkoutData.foodAndBeverage.toFixed(2)}</span>
            </div>
            <div className="flex justify-between p-3 rounded-xl neom-gradient-glass border border-gray-700/30">
              <span className="neom-body">Spa & Wellness</span>
              <span className="neom-mono-yellow">${checkoutData.spa.toFixed(2)}</span>
            </div>
            <div className="flex justify-between p-3 rounded-xl neom-gradient-glass border border-gray-700/30">
              <span className="neom-body">Incidentals</span>
              <span className="neom-mono-yellow">${checkoutData.incidentals.toFixed(2)}</span>
            </div>
            <div className="flex justify-between p-3 rounded-xl neom-gradient-glass border border-gray-700/30">
              <span className="neom-body">Tax & Service</span>
              <span className="neom-mono-yellow">${checkoutData.tax.toFixed(2)}</span>
            </div>
          </div>

          <div className="border-t border-yellow-400/30 pt-3 mt-4">
            <div className="flex justify-between items-center p-4 rounded-xl neom-gradient-glass-yellow border border-yellow-400/40">
              <span className="neom-heading text-xl">Total Amount</span>
              <span className="neom-mono-yellow text-2xl font-bold">${checkoutData.total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="neom-card-glass border border-cyan-400/30">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Sparkles className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
            <div>
              <h4 className="neom-heading text-sm mb-2">AI Insights</h4>
              <p className="neom-body text-sm opacity-80">You saved $127 compared to standard rates with your Platinum membership benefits. Thank you for being a valued member!</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Button */}
      <Button 
        onClick={handleNext}
        className="w-full neom-btn-primary neom-shrink-press py-4 text-lg"
      >
        Continue to Rate & Tip
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </div>
  );

  const renderRateTip = () => {
    // If a staff member is selected, show their detail panel
    if (selectedStaff) {
      return renderStaffDetailPanel(selectedStaff);
    }

    // Otherwise, show the staff list
    return renderStaffList();
  };

  const renderStaffList = () => {
    const totalRated = Object.keys(staffRatings).length;

    return (
      <div className="space-y-6 neom-fade-in">
        {/* Header Card */}
        <Card className="neom-card-glass border border-cyan-400/30">
          <CardContent className="p-6 text-center">
            <Sparkles className="w-10 h-10 mx-auto mb-3 text-cyan-400" />
            <h3 className="neom-heading text-xl mb-2">Rate & Tip Our Staff</h3>
            <p className="neom-body text-sm opacity-80">
              Select a staff member to rate their service and leave a tip
            </p>
            {totalRated > 0 && (
              <div className="mt-4">
                <Badge className="bg-emerald-400/20 text-emerald-300 border-emerald-400/30">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {totalRated} of {staffMembers.length} Rated
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Staff List */}
        <div className="space-y-3">
          {staffMembers.map((staff) => {
            const hasRating = staffRatings[staff.id] !== undefined;
            const hasTip = staffTips[staff.id] !== undefined;
            
            return (
              <button
                key={staff.id}
                onClick={() => setSelectedStaff(staff)}
                className="w-full bg-neom-electric-yellow hover:bg-yellow-300 text-black rounded-2xl p-5 shadow-lg hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] neom-transition group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-full bg-black/10 flex items-center justify-center">
                      <span className="text-2xl font-bold">
                        {staff.name.split(' ').map((n: string) => n[0]).join('')}
                      </span>
                    </div>
                    <div className="text-left">
                      <h4 className="text-lg font-bold">{staff.name}</h4>
                      <p className="text-sm opacity-80">{staff.department || 'Hospitality Team'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {hasRating && (
                      <div className="flex items-center space-x-1 bg-black/10 px-3 py-1.5 rounded-full">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-bold">{staffRatings[staff.id]}</span>
                      </div>
                    )}
                    {hasTip && (
                      <div className="flex items-center space-x-1 bg-black/10 px-3 py-1.5 rounded-full">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-bold">{staffTips[staff.id]}</span>
                      </div>
                    )}
                    <ArrowRight className="w-5 h-5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 neom-transition" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <Button
            onClick={handleNext}
            className="w-full neom-btn-primary neom-shrink-press py-4 text-lg"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Continue to Payment
          </Button>

          <Button
            onClick={handleSkipRateTip}
            className="w-full neom-btn-glass neom-shrink-press"
          >
            Skip to Payment
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  };

  const renderStaffDetailPanel = (staff: any) => {
    const currentRating = staffRatings[staff.id] || 0;
    const currentFeedback = staffFeedback[staff.id] || '';
    const currentTip = staffTips[staff.id] || 0;

    // Mock recent feedback data for this staff member
    const recentFeedback = [
      { guest: "Sarah M.", comment: "Outstanding service! Very attentive and professional.", rating: 5 },
      { guest: "John D.", comment: "Made our stay exceptional with great recommendations.", rating: 5 },
      { guest: "Emma R.", comment: "Friendly and helpful throughout our visit.", rating: 4 },
      { guest: "Michael P.", comment: "Went above and beyond to ensure comfort.", rating: 5 }
    ];

    const handleSaveRating = () => {
      setSelectedStaff(null);
    };

    return (
      <div className="space-y-6 neom-fade-in">
        {/* Staff Header with Back Button */}
        <Card className="neom-card-glass border border-yellow-400/30">
          <CardContent className="p-5">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setSelectedStaff(null)}
                className="neom-btn-glass neom-shrink-press w-10 h-10 p-0 flex-shrink-0"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="w-16 h-16 rounded-full bg-neom-electric-yellow flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-black">
                  {staff.name.split(' ').map((n: string) => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="neom-heading text-xl">{staff.name}</h3>
                <p className="neom-body text-sm opacity-70">{staff.department || 'Hospitality Team'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Star Rating Section */}
        <Card className="neom-card-glass border border-yellow-400/30">
          <CardContent className="p-6 sm:p-8">
            <div className="text-center space-y-6">
              <div>
                <h3 className="neom-heading text-2xl mb-2">Rate This Service</h3>
                <p className="neom-body text-sm opacity-70">How would you rate {staff.name.split(' ')[0]}'s service?</p>
              </div>
              
              {/* Star Rating with Animation */}
              <div className="flex items-center justify-center space-x-2 sm:space-x-3 py-4">
                {[1, 2, 3, 4, 5].map((rating) => {
                  const isActive = rating <= (hoverRating || currentRating);
                  return (
                    <button
                      key={rating}
                      onClick={() => {
                        setStaffRatings({ ...staffRatings, [staff.id]: rating });
                      }}
                      onMouseEnter={() => setHoverRating(rating)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="neom-transition transform hover:scale-125 active:scale-110 p-1 sm:p-2"
                      style={{
                        animation: isActive ? 'neom-shrink 0.3s ease-out' : 'none'
                      }}
                    >
                      <Star
                        className={`w-10 h-10 sm:w-12 sm:h-12 neom-transition ${
                          isActive
                            ? 'text-yellow-400 fill-current neom-glow-yellow'
                            : 'text-gray-600 hover:text-gray-500'
                        }`}
                        style={{
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          filter: isActive ? 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))' : 'none'
                        }}
                      />
                    </button>
                  );
                })}
              </div>
              
              {/* Rating Label */}
              <p className="neom-body text-lg">
                {currentRating === 5 && '⭐ Exceptional Service!'}
                {currentRating === 4 && '⭐ Great Service'}
                {currentRating === 3 && '⭐ Good Service'}
                {currentRating === 2 && '⭐ Fair Service'}
                {currentRating === 1 && '⭐ Needs Improvement'}
                {currentRating === 0 && 'Tap a star to rate'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Feedback Section */}
        <Card className="neom-card-glass border border-purple-400/30">
          <CardHeader>
            <CardTitle className="neom-heading-neon flex items-center">
              <MessageCircle className="w-5 h-5 mr-2 text-purple-400" />
              Recent Guest Feedback
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
              {recentFeedback.map((feedback, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl neom-gradient-glass border border-gray-700/30 neom-transition hover:border-purple-400/30"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full neom-gradient-glass-purple border border-purple-400/30 flex items-center justify-center">
                        <span className="neom-body text-xs">{feedback.guest[0]}</span>
                      </div>
                      <span className="neom-body text-sm">{feedback.guest}</span>
                    </div>
                    <div className="flex items-center space-x-0.5">
                      {[...Array(feedback.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="neom-body text-sm opacity-80 italic">"{feedback.comment}"</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Guest Feedback Input */}
        <Card className="neom-card-glass border border-cyan-400/30">
          <CardHeader>
            <CardTitle className="neom-heading-neon flex items-center">
              <FileText className="w-5 h-5 mr-2 text-cyan-400" />
              Share Your Experience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              value={currentFeedback}
              onChange={(e) => {
                setStaffFeedback({ ...staffFeedback, [staff.id]: e.target.value });
              }}
              onFocus={(e) => {
                e.target.style.height = '160px';
              }}
              onBlur={(e) => {
                if (!e.target.value) {
                  e.target.style.height = '128px';
                }
              }}
              placeholder="Write your feedback here…"
              maxLength={300}
              className="w-full p-4 rounded-xl neom-gradient-glass border border-cyan-400/30 text-white placeholder-gray-400 bg-transparent resize-none h-32 focus:border-cyan-400/50 focus:outline-none neom-transition"
              style={{ transition: 'height 0.3s ease-out' }}
            />
            <p className="neom-body text-xs opacity-60 mt-2">{currentFeedback.length}/300 characters</p>
          </CardContent>
        </Card>

        {/* Tipping Section */}
        <Card className="neom-card-glass border border-emerald-400/30">
          <CardHeader>
            <CardTitle className="neom-heading-neon flex items-center">
              <Gift className="w-5 h-5 mr-2 text-emerald-400" />
              Add a Tip (Optional)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Quick Select Buttons with Bounce Animation */}
            <div className="grid grid-cols-4 gap-3">
              {[5, 10, 15, 20].map((amount) => {
                const isSelected = currentTip === amount;
                return (
                  <Button
                    key={amount}
                    onClick={() => {
                      setStaffTips({ ...staffTips, [staff.id]: amount });
                    }}
                    className={`neom-btn-glass neom-shrink-press py-3 ${
                      isSelected ? 'border-emerald-400/70 bg-emerald-400/15 scale-105' : ''
                    }`}
                    style={{
                      animation: isSelected ? 'neom-shrink 0.2s ease-out' : 'none'
                    }}
                  >
                    <DollarSign className="w-4 h-4 mr-1" />
                    {amount}
                  </Button>
                );
              })}
            </div>

            {/* Custom Tip Input */}
            <div className="space-y-2">
              <label className="neom-body text-sm">Custom Amount</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={currentTip > 20 ? currentTip : ''}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value) || 0;
                    setStaffTips({ ...staffTips, [staff.id]: value });
                  }}
                  placeholder="Enter custom amount"
                  className="w-full pl-12 pr-4 py-3 rounded-xl neom-gradient-glass border border-emerald-400/30 text-white placeholder-gray-400 bg-transparent focus:border-emerald-400/50 focus:outline-none neom-transition"
                />
              </div>
            </div>

            {/* Tip Preview */}
            {currentTip > 0 && (
              <div className="p-4 rounded-xl neom-gradient-glass-emerald border border-emerald-400/40 neom-fade-in">
                <div className="flex items-center justify-between">
                  <span className="neom-body">Tip Amount:</span>
                  <span className="neom-mono-yellow text-xl">
                    ${currentTip.toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Save & Back Button */}
        <Button
          onClick={handleSaveRating}
          className="w-full neom-btn-primary neom-shrink-press py-4 text-lg"
        >
          <CheckCircle className="w-5 h-5 mr-2" />
          Save & Back to Staff List
        </Button>
      </div>
    );
  };

  const renderPayment = () => (
    <div className="space-y-6">
      {/* Total Summary */}
      <Card className="neom-card-glass border border-yellow-400/30">
        <CardContent className="p-6 text-center">
          <p className="neom-body text-sm mb-2 opacity-70">Total Amount Due</p>
          <h2 className="neom-mono-yellow text-4xl font-bold mb-4">${checkoutData.total.toFixed(2)}</h2>
          <Badge className="bg-emerald-400/20 text-emerald-300 border-emerald-400/30">
            <CheckCircle className="w-3 h-3 mr-1" />
            Payment Secured
          </Badge>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card className="neom-card-glass border border-purple-400/30">
        <CardHeader>
          <CardTitle className="neom-heading-neon flex items-center">
            <CreditCard className="w-5 h-5 mr-2 text-purple-400" />
            Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-xl neom-gradient-glass-purple border border-purple-400/30">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-indigo-400 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="neom-heading text-base">•••• •••• •••• 4242</p>
                <p className="neom-body text-sm opacity-70">Visa - Expires 12/27</p>
              </div>
              <Badge className="bg-emerald-400/20 text-emerald-300 border-emerald-400/30">
                Primary
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email Receipt */}
      <Card className="neom-card-glass border border-cyan-400/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Receipt className="w-5 h-5 text-cyan-300" />
              <div>
                <p className="neom-body text-sm">Email receipt to</p>
                <p className="neom-mono text-sm">{guestInfo?.email || 'guest@example.com'}</p>
              </div>
            </div>
            <CheckCircle className="w-5 h-5 text-emerald-400" />
          </div>
        </CardContent>
      </Card>

      {/* Process Payment Button */}
      <Button 
        onClick={handleNext}
        disabled={paymentProcessing}
        className="w-full neom-btn-primary neom-shrink-press py-4 text-lg"
      >
        {paymentProcessing ? (
          <>
            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
            Processing Payment...
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5 mr-2" />
            Complete Checkout
          </>
        )}
      </Button>
    </div>
  );

  const renderComplete = () => (
    <div className="space-y-6">
      {/* Success Animation */}
      <div className="text-center py-8">
        <div className="w-32 h-32 mx-auto mb-6 rounded-full neom-gradient-glass-emerald border-4 border-emerald-400/50 flex items-center justify-center neom-glow-success animate-pulse">
          <CheckCircle className="w-16 h-16 text-emerald-300" />
        </div>
        <h2 className="neom-heading-neon text-3xl mb-2">Checkout Complete!</h2>
        <p className="neom-body text-lg opacity-80">Thank you for staying with us</p>
      </div>

      {/* Summary */}
      <Card className="neom-card-glass border border-yellow-400/30">
        <CardContent className="p-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="neom-body">Payment Processed</span>
              <span className="neom-mono-yellow">${checkoutData.total.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="neom-body">Confirmation</span>
              <span className="neom-mono">#CHK-{Date.now().toString().slice(-6)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="neom-body">Receipt Sent To</span>
              <span className="neom-mono text-sm">{guestInfo?.email || 'email@example.com'}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Membership Points Earned */}
      <Card className="neom-card-glass border border-purple-400/30">
        <CardContent className="p-6 text-center">
          <Sparkles className="w-8 h-8 mx-auto mb-3 text-purple-300" />
          <h4 className="neom-heading text-lg mb-2">Rewards Earned</h4>
          <p className="neom-mono-yellow text-2xl font-bold mb-1">+{Math.round(checkoutData.total * 1.5)} Points</p>
          <p className="neom-body text-sm opacity-70">Added to your Platinum membership</p>
        </CardContent>
      </Card>

      {/* Feedback Reminder */}
      <Card className="neom-card-glass border border-cyan-400/30">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Star className="w-5 h-5 text-cyan-300" />
            <div>
              <h4 className="neom-heading text-sm">Share Your Experience</h4>
              <p className="neom-body text-xs opacity-70">We'd love to hear about your stay</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Close Button */}
      <Button 
        onClick={onClose}
        className="w-full neom-btn-primary neom-shrink-press py-4 text-lg"
      >
        <CheckCircle className="w-5 h-5 mr-2" />
        Done
      </Button>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-neom-deep-black/95 backdrop-blur-md flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-800/50">
        <div className="flex items-center space-x-4">
          <Button 
            onClick={handleBack}
            className="neom-btn-glass neom-shrink-press w-10 h-10 p-0"
          >
            {currentStep === 'bill-review' ? <X className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
          </Button>
          <div>
            <h1 className="neom-heading text-xl">
              {currentStep === 'bill-review' && 'Review Your Bill'}
              {currentStep === 'rate-tip' && 'Rate & Tip Staff'}
              {currentStep === 'payment' && 'Complete Payment'}
              {currentStep === 'complete' && 'Checkout Complete'}
            </h1>
            <p className="neom-body text-sm opacity-70">
              Step {currentStepIndex + 1} of {steps.length}
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-6 py-4 border-b border-gray-800/50">
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStepIndex;
            const isCompleted = index < currentStepIndex;
            
            return (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center space-x-2 ${index > 0 ? 'ml-2' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                    isActive ? 'border-yellow-400 bg-yellow-400/20' :
                    isCompleted ? 'border-emerald-400 bg-emerald-400/20' :
                    'border-gray-600 bg-gray-700/20'
                  }`}>
                    <Icon className={`w-4 h-4 ${
                      isActive ? 'text-yellow-400' :
                      isCompleted ? 'text-emerald-400' :
                      'text-gray-500'
                    }`} />
                  </div>
                  <span className={`neom-body text-xs hidden sm:inline ${
                    isActive || isCompleted ? 'opacity-100' : 'opacity-50'
                  }`}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 sm:w-16 h-0.5 mx-2 ${
                    isCompleted ? 'bg-emerald-400' : 'bg-gray-700'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto">
          {currentStep === 'bill-review' && renderBillReview()}
          {currentStep === 'rate-tip' && renderRateTip()}
          {currentStep === 'payment' && renderPayment()}
          {currentStep === 'complete' && renderComplete()}
        </div>
      </div>
    </div>
  );
}
