import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  Award, 
  Search, 
  ArrowLeft, 
  X, 
  Star, 
  UserCheck, 
  Crown, 
  MessageCircle, 
  DollarSign, 
  Gift, 
  Shield, 
  CheckCircle2,
  Heart,
  ArrowRight,
  Users,
  Filter,
  Wallet
} from 'lucide-react';

interface RateTipStaffProps {
  onClose: () => void;
  staffMembers: any[];
  favoriteStaff: string[];
  onFavoriteToggle: (staffName: string) => void;
  onPayTipFromWallet?: (staffName: string, amount: number) => void;
  walletBalance?: number;
  collapsed?: boolean;
  onExpand?: () => void;
}

export function RateTipStaff({ 
  onClose, 
  staffMembers, 
  favoriteStaff, 
  onFavoriteToggle,
  onPayTipFromWallet,
  walletBalance = 0,
  collapsed = false,
  onExpand
}: RateTipStaffProps) {
  const [currentView, setCurrentView] = useState<'staff-list' | 'staff-profile' | 'rate-tip' | 'thank-you'>('staff-list');
  const [staffSearch, setStaffSearch] = useState('');
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [currentRating, setCurrentRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [ratingComment, setRatingComment] = useState('');
  const [tipAmount, setTipAmount] = useState<number | null>(null);
  const [customTipAmount, setCustomTipAmount] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'recent'>('rating');

  // Get unique departments for filtering
  const departments = ['all', ...new Set(staffMembers.map(staff => staff.department))];

  // Filter and sort staff members
  const filteredStaff = staffMembers
    .filter(staff => {
      const matchesSearch = !staffSearch || 
        staff.name.toLowerCase().includes(staffSearch.toLowerCase()) ||
        staff.role.toLowerCase().includes(staffSearch.toLowerCase()) ||
        staff.department.toLowerCase().includes(staffSearch.toLowerCase());
      
      const matchesDepartment = departmentFilter === 'all' || staff.department === departmentFilter;
      
      return matchesSearch && matchesDepartment;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.averageRating - a.averageRating;
        case 'recent':
          return new Date(b.lastService).getTime() - new Date(a.lastService).getTime();
        default:
          return 0;
      }
    });

  const handleStaffSelect = (staff: any) => {
    setSelectedStaff(staff);
    setCurrentView('staff-profile');
  };

  const handleRateAndTip = () => {
    setCurrentView('rate-tip');
  };

  const handleSubmitRatingAndTip = () => {
    // Handle the rating and tip submission
    if (tipAmount || customTipAmount) {
      const finalTipAmount = tipAmount || parseFloat(customTipAmount);
      if (onPayTipFromWallet && finalTipAmount > 0) {
        onPayTipFromWallet(selectedStaff.name, finalTipAmount);
      }
    }
    
    setCurrentView('thank-you');
    
    // Auto-close after showing thank you
    setTimeout(() => {
      handleClose();
    }, 3000);
  };

  const handleClose = () => {
    // Reset all state
    setCurrentView('staff-list');
    setSelectedStaff(null);
    setCurrentRating(0);
    setHoverRating(0);
    setRatingComment('');
    setTipAmount(null);
    setCustomTipAmount('');
    setIsAnonymous(false);
    setStaffSearch('');
    setDepartmentFilter('all');
    setSortBy('rating');
    onClose();
  };

  const getDepartmentColor = (department: string) => {
    const colors: { [key: string]: string } = {
      'Housekeeping': 'cyan',
      'Food & Beverage': 'orange', 
      'Guest Services': 'emerald',
      'Wellness': 'purple',
      'Engineering': 'yellow'
    };
    return colors[department] || 'gray';
  };

  const renderStaffList = () => (
    <div className="h-full flex flex-col">
      {/* Search and Filters */}
      <div className="flex-shrink-0 p-6 pb-4">
        <div className="max-w-5xl mx-auto">
          <Card className="neom-card-glass border border-emerald-400/30">
            <CardContent className="p-5 space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  value={staffSearch}
                  onChange={(e) => setStaffSearch(e.target.value)}
                  placeholder="Search staff by name, role, or department..."
                  className="neom-gradient-glass border border-emerald-400/30 text-white placeholder-gray-400 pl-12 py-3 rounded-xl h-12"
                />
              </div>
              
              {/* Filters */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="neom-body text-xs font-medium mb-2 block opacity-70">Department</label>
                  <select
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    className="w-full neom-gradient-glass border border-emerald-400/30 text-white bg-transparent rounded-xl px-4 py-2.5 text-sm"
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept} className="bg-gray-800 text-white">
                        {dept === 'all' ? 'All Departments' : dept}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="neom-body text-xs font-medium mb-2 block opacity-70">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'name' | 'rating' | 'recent')}
                    className="w-full neom-gradient-glass border border-emerald-400/30 text-white bg-transparent rounded-xl px-4 py-2.5 text-sm"
                  >
                    <option value="rating" className="bg-gray-800 text-white">Highest Rated</option>
                    <option value="name" className="bg-gray-800 text-white">Name (A-Z)</option>
                    <option value="recent" className="bg-gray-800 text-white">Most Recent</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Header */}
      <div className="flex-shrink-0 px-6 pb-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h3 className="neom-heading-neon text-xl">Staff Who Served You</h3>
          <Badge className="bg-emerald-400/20 text-emerald-300 border-emerald-400/30">
            <Users className="w-4 h-4 mr-1" />
            {filteredStaff.length} Members
          </Badge>
        </div>
      </div>

      {/* Staff Grid - Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-8">
        <div className="max-w-5xl mx-auto space-y-3 sm:space-y-4 pb-4">
          {filteredStaff.map((staff) => (
            <div 
              key={staff.id}
              className="p-5 rounded-2xl neom-gradient-glass border border-emerald-400/20 hover:border-emerald-400/40 neom-transition cursor-pointer neom-card-glass-hover"
              onClick={() => handleStaffSelect(staff)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-2xl neom-gradient-glass-emerald border border-emerald-400/50 flex items-center justify-center flex-shrink-0">
                    <UserCheck className="w-8 h-8 text-emerald-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="neom-heading text-lg">{staff.name}</h4>
                      {favoriteStaff.includes(staff.name) && (
                        <Crown className="w-4 h-4 text-yellow-400 animate-pulse" />
                      )}
                    </div>
                    <p className="neom-body mb-2">{staff.role}</p>
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-emerald-400/20 text-emerald-300 border-emerald-400/30">
                        {staff.department}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="neom-mono">{staff.averageRating}</span>
                        <span className="neom-body text-sm text-gray-400">({staff.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-6 h-6 text-emerald-300 flex-shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStaffProfile = () => {
    if (!selectedStaff) return null;
    
    return (
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-8">
          <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6 pb-4">
            {/* Staff Header */}
            <Card className="neom-card-glass border border-emerald-400/30">
              <CardContent className="p-6">
                <div className="flex items-start space-x-5">
                  <div className="w-20 h-20 rounded-2xl neom-gradient-glass-emerald border border-emerald-400/50 flex items-center justify-center flex-shrink-0">
                    <UserCheck className="w-10 h-10 text-emerald-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h2 className="neom-heading text-2xl">{selectedStaff.name}</h2>
                      {favoriteStaff.includes(selectedStaff.name) && (
                        <Crown className="w-5 h-5 text-yellow-400 animate-pulse" />
                      )}
                    </div>
                    <p className="neom-body text-lg mb-3">{selectedStaff.role}</p>
                    <div className="flex items-center space-x-4 mb-4">
                      <Badge className="bg-emerald-400/20 text-emerald-300 border-emerald-400/30">
                        {selectedStaff.department}
                      </Badge>
                      <span className="neom-body">{selectedStaff.yearsOfService} years of service</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Star className="w-6 h-6 text-yellow-400 fill-current" />
                        <span className="neom-heading text-xl">{selectedStaff.averageRating}</span>
                        <span className="neom-body">({selectedStaff.reviewCount} reviews)</span>
                      </div>
                      
                      <Button
                        onClick={() => onFavoriteToggle(selectedStaff.name)}
                        className="neom-btn-glass neom-shrink-press px-5 py-2"
                      >
                        {favoriteStaff.includes(selectedStaff.name) ? (
                          <Crown className="w-4 h-4 text-yellow-400 fill-current mr-2" />
                        ) : (
                          <Crown className="w-4 h-4 mr-2" />
                        )}
                        Favorite
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Two Column Layout for Profile Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Rating Distribution */}
                <Card className="neom-card-glass border border-purple-400/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="neom-heading-neon flex items-center">
                      <Star className="w-5 h-5 mr-2 text-purple-300" />
                      Rating Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 w-10">
                          <span className="neom-mono w-3">{rating}</span>
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        </div>
                        <div className="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-yellow-400 to-emerald-400 rounded-full neom-transition"
                            style={{ width: `${selectedStaff.ratingDistribution[rating]}%` }}
                          />
                        </div>
                        <span className="neom-mono w-12 text-right">{selectedStaff.ratingDistribution[rating]}%</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Services Provided */}
                <Card className="neom-card-glass border border-cyan-400/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="neom-heading-neon flex items-center">
                      <Award className="w-5 h-5 mr-2 text-cyan-300" />
                      Services Provided
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedStaff.servicesProvided.map((service: string, index: number) => (
                        <Badge key={index} className="bg-cyan-400/20 text-cyan-300 border-cyan-400/30 px-3 py-1">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column */}
              <div>
                {/* Recent Feedback */}
                <Card className="neom-card-glass border border-emerald-400/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="neom-heading-neon flex items-center">
                      <MessageCircle className="w-5 h-5 mr-2 text-emerald-300" />
                      Recent Guest Feedback
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedStaff.recentFeedback.slice(0, 3).map((feedback: string, index: number) => (
                      <div key={index} className="p-4 rounded-xl neom-gradient-glass border border-gray-400/20">
                        <div className="flex items-start space-x-3">
                          <div className="flex items-center space-x-0.5 flex-shrink-0">
                            {[...Array(5)].map((_, starIndex) => (
                              <Star key={starIndex} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <p className="neom-body italic">"{feedback.substring(0, 100)}..."</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Rate & Tip Button - Fixed at Bottom */}
        <div className="flex-shrink-0 p-4 sm:p-6 border-t border-gray-800/50 bg-neom-deep-black/90 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
          <div className="max-w-5xl mx-auto">
            <Button 
              onClick={handleRateAndTip}
              className="w-full neom-btn-primary neom-shrink-press py-4 sm:py-5 text-base sm:text-lg"
            >
              <Star className="w-6 h-6 mr-2" />
              Continue to Rate & Tip {selectedStaff.name}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderRateTip = () => {
    if (!selectedStaff) return null;
    
    return (
      <div className="h-full flex flex-col relative" style={{ background: '#FFD700' }}>
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-8">
          <div className="max-w-4xl mx-auto space-y-6 pb-4">
            
            {/* Star Rating Section - White Card */}
            <div className="p-8 rounded-3xl bg-white"
              style={{
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)'
              }}>
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Rate Your Experience</h3>
                <p className="text-gray-600 text-lg">How was {selectedStaff.name}'s service?</p>
              </div>
              
              {/* Star Rating - Large & Centered */}
              <div className="flex items-center justify-center space-x-4 mb-6">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setCurrentRating(rating)}
                    onMouseEnter={() => setHoverRating(rating)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="neom-transition transform hover:scale-125 active:scale-110 active:animate-bounce p-2 rounded-full"
                    style={{
                      filter: rating <= (hoverRating || currentRating) 
                        ? 'drop-shadow(0 4px 8px rgba(255, 215, 0, 0.6))' 
                        : 'none'
                    }}
                  >
                    <Star 
                      className={`w-16 h-16 neom-transition ${
                        rating <= (hoverRating || currentRating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300 hover:text-gray-400'
                      }`}
                    />
                  </button>
                ))}
              </div>
              
              {/* Rating Label */}
              <div className="text-center">
                <p className="text-xl font-semibold text-gray-700">
                  {currentRating === 5 && "⭐ Exceptional!"}
                  {currentRating === 4 && "⭐ Great Service"}
                  {currentRating === 3 && "⭐ Good"}
                  {currentRating === 2 && "⭐ Fair"}
                  {currentRating === 1 && "⭐ Needs Improvement"}
                  {currentRating === 0 && "Tap a star to rate"}
                </p>
              </div>
            </div>

            {/* Recent Feedback - White Card with Scrollable */}
            <div className="p-6 rounded-3xl bg-white"
              style={{
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)'
              }}>
              <div className="flex items-center mb-5">
                <MessageCircle className="w-6 h-6 mr-3 text-gray-700" />
                <h3 className="text-2xl font-bold text-gray-900">Recent Guest Feedback</h3>
              </div>
              
              <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                {selectedStaff.recentFeedback.slice(0, 4).map((feedback: string, index: number) => (
                  <div key={index} 
                    className="p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 neom-transition border border-gray-200 hover:border-gray-300"
                    style={{
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                    }}>
                    <div className="flex items-start space-x-3">
                      <div className="flex items-center space-x-0.5 flex-shrink-0 pt-0.5">
                        {[...Array(5)].map((_, starIndex) => (
                          <Star key={starIndex} className="w-4 h-4 text-yellow-500 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed italic">"{feedback}"</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-center space-x-2 pt-4 mt-4 border-t border-gray-200">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="neom-mono text-lg text-gray-900 font-bold">{selectedStaff.averageRating}</span>
                <span className="text-sm text-gray-500">({selectedStaff.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Your Feedback Input - White Card */}
            <div className="p-6 rounded-3xl bg-white"
              style={{
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)'
              }}>
              <div className="flex items-center mb-4">
                <MessageCircle className="w-6 h-6 mr-3 text-gray-700" />
                <h3 className="text-2xl font-bold text-gray-900">Share Your Feedback</h3>
              </div>
              
              <textarea
                value={ratingComment}
                onChange={(e) => setRatingComment(e.target.value)}
                placeholder="Share your feedback…"
                className="w-full p-5 rounded-2xl bg-gray-50 border-2 border-gray-200 text-gray-800 placeholder-gray-400 resize-none h-36 focus:border-yellow-400 focus:bg-white focus:outline-none neom-transition"
                style={{
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                }}
                rows={4}
                maxLength={200}
              />
              
              <div className="flex items-center justify-between mt-3">
                <p className="text-sm text-gray-500">{ratingComment.length}/200</p>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-400"
                  />
                  <label htmlFor="anonymous" className="text-sm text-gray-700 flex items-center cursor-pointer">
                    <Shield className="w-4 h-4 mr-1 text-gray-600" />
                    Anonymous
                  </label>
                </div>
              </div>
            </div>

            {/* Tipping Section - White Card */}
            <div className="p-6 rounded-3xl bg-white"
              style={{
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)'
              }}>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center">
                  <Gift className="w-6 h-6 mr-3 text-gray-700" />
                  <h3 className="text-2xl font-bold text-gray-900">Add a Tip</h3>
                </div>
                {walletBalance > 0 && (
                  <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gray-100 border border-gray-300">
                    <Wallet className="w-4 h-4 text-gray-600" />
                    <span className="neom-mono text-sm text-gray-700 font-semibold">Balance: ${walletBalance.toFixed(2)}</span>
                  </div>
                )}
              </div>
              
              {/* Pre-set Tip Amounts - Bright Yellow Buttons */}
              <div className="grid grid-cols-4 gap-3 mb-5">
                {[5, 10, 15, 20].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setTipAmount(amount);
                      setCustomTipAmount('');
                    }}
                    className={`px-6 py-5 rounded-2xl font-bold text-xl neom-transition transform hover:scale-105 active:scale-95 bg-yellow-400 text-black hover:bg-yellow-500 ${
                      tipAmount === amount ? 'ring-4 ring-yellow-300' : ''
                    }`}
                    style={{
                      boxShadow: tipAmount === amount 
                        ? '0 8px 25px rgba(255, 215, 0, 0.6), 0 0 20px rgba(255, 215, 0, 0.4)' 
                        : '0 4px 15px rgba(255, 215, 0, 0.4)'
                    }}
                  >
                    ${amount}
                  </button>
                ))}
              </div>

              {/* Custom Tip Amount */}
              <div className="space-y-2 mb-5">
                <label className="text-sm font-semibold text-gray-700">Custom Amount</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    type="number"
                    value={customTipAmount}
                    onChange={(e) => {
                      setCustomTipAmount(e.target.value);
                      setTipAmount(null);
                    }}
                    placeholder="Enter custom amount"
                    className="w-full pl-12 py-3 rounded-2xl bg-gray-50 border-2 border-gray-200 text-gray-800 placeholder-gray-400 focus:border-yellow-400 focus:bg-white focus:outline-none neom-transition h-14 text-lg"
                    style={{
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                    }}
                  />
                </div>
              </div>

              {/* Tip Preview */}
              {(tipAmount !== null || customTipAmount) && (
                <div className="p-5 rounded-2xl bg-gray-100 border-2 border-gray-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700 font-semibold text-lg">Tip Amount:</span>
                    <span className="neom-mono text-3xl font-bold text-gray-900">
                      ${tipAmount !== null ? tipAmount.toFixed(2) : parseFloat(customTipAmount || '0').toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">100% goes directly to {selectedStaff.name}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button - Fixed at Bottom on Yellow Background */}
        <div className="flex-shrink-0 p-4 sm:p-6" style={{ background: '#FFD700' }}>
          <div className="max-w-4xl mx-auto">
            <button 
              onClick={handleSubmitRatingAndTip}
              disabled={currentRating === 0}
              className={`w-full px-8 py-6 rounded-2xl font-bold text-2xl neom-transition transform ${
                currentRating === 0 
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                  : 'bg-black text-white hover:scale-[1.02] active:scale-[0.98]'
              }`}
              style={{
                boxShadow: currentRating === 0 
                  ? '0 4px 15px rgba(0, 0, 0, 0.2)' 
                  : '0 10px 30px rgba(0, 0, 0, 0.4)'
              }}
              onMouseEnter={(e) => {
                if (currentRating > 0) {
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.5)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentRating > 0) {
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
                  e.currentTarget.style.background = '#000000';
                }
              }}
            >
              <div className="flex items-center justify-center">
                <Gift className="w-7 h-7 mr-3" />
                <span>Submit Rating & Tip</span>
                {(tipAmount !== null || customTipAmount) && (
                  <span className="ml-4 px-5 py-2 bg-white text-black rounded-full text-xl font-bold">
                    ${tipAmount !== null ? tipAmount.toFixed(2) : parseFloat(customTipAmount || '0').toFixed(2)}
                  </span>
                )}
              </div>
            </button>
            
            {currentRating === 0 && (
              <p className="text-center text-gray-800 font-semibold text-sm mt-3">
                ⭐ Please rate your experience to continue
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderThankYou = () => (
    <div className="h-full flex items-center justify-center p-4">
      <Card className="neom-card-glass border border-emerald-400/50 max-w-md w-full">
        <CardContent className="p-6 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full neom-gradient-glass-emerald border border-emerald-400/50 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-300 animate-pulse" />
            </div>
            <div className="space-y-2">
              <h3 className="neom-heading-neon text-xl">Thank You!</h3>
              <p className="neom-body text-sm">Your rating and tip for {selectedStaff?.name} have been submitted</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-center space-x-1 text-yellow-400">
                {[...Array(currentRating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
              {ratingComment && (
                <div className="p-3 rounded-xl neom-gradient-glass-cyan border border-cyan-400/30">
                  <p className="neom-body text-xs italic">&ldquo;{ratingComment}&rdquo;</p>
                </div>
              )}
            </div>
            {(tipAmount !== null || customTipAmount) && (
              <div className="p-3 rounded-xl neom-gradient-glass-yellow border border-yellow-400/30">
                <p className="neom-mono text-yellow-300 text-base">
                  Tip: ${tipAmount !== null ? tipAmount.toFixed(2) : parseFloat(customTipAmount || '0').toFixed(2)}
                </p>
                {walletBalance > 0 && (
                  <p className="neom-body text-xs mt-1 opacity-70">Paid via Digital Wallet</p>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Collapsed view for inline usage
  const renderCollapsedView = () => (
    <Card 
      className="neom-card-glass neom-card-glass-hover border border-orange-400/30 cursor-pointer neom-transition"
      onClick={onExpand}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl neom-gradient-glass-orange border border-orange-400/50 flex items-center justify-center">
              <Star className="w-6 h-6 text-orange-300" />
            </div>
            <div className="flex-1">
              <h3 className="neom-heading-neon text-base mb-1">Rate & Tip Staff</h3>
              <p className="neom-body text-sm opacity-80">Share feedback and show appreciation</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge className="bg-orange-400/20 text-orange-300 border-orange-400/30 text-xs">
              {staffMembers.length} Staff
            </Badge>
            <ArrowRight className="w-5 h-5 text-orange-300" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (collapsed) {
    return renderCollapsedView();
  }

  return (
    <div className="fixed inset-0 bg-neom-deep-black/95 backdrop-blur-md flex flex-col z-50">
      {/* Compact Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800/50 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <Button 
            onClick={currentView === 'staff-list' ? handleClose : () => {
              if (currentView === 'staff-profile') setCurrentView('staff-list');
              else if (currentView === 'rate-tip') setCurrentView('staff-profile');
              else if (currentView === 'thank-you') handleClose();
            }}
            className="neom-btn-glass neom-shrink-press w-10 h-10 p-0"
          >
            {currentView === 'staff-list' ? <X className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
          </Button>
          <div>
            <h1 className="neom-heading text-lg">Rate & Tip Staff</h1>
            <p className="neom-body text-xs opacity-70">
              {currentView === 'staff-list' && 'Select staff member'}
              {currentView === 'staff-profile' && `${selectedStaff?.name} - ${selectedStaff?.role}`}
              {currentView === 'rate-tip' && 'Rate & tip experience'}
              {currentView === 'thank-you' && 'Thank you!'}
            </p>
          </div>
        </div>
        <Badge className="bg-emerald-400/20 text-emerald-300 border-emerald-400/30 text-xs">
          <Heart className="w-3 h-3 mr-1" />
          Appreciation
        </Badge>
      </div>

      {/* Content - Full Height with Proper Scrolling */}
      <div className="flex-1 overflow-hidden">
        {currentView === 'staff-list' && renderStaffList()}
        {currentView === 'staff-profile' && renderStaffProfile()}
        {currentView === 'rate-tip' && renderRateTip()}
        {currentView === 'thank-you' && renderThankYou()}
      </div>
    </div>
  );
}