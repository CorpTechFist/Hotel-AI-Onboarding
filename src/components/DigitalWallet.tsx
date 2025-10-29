import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Wallet, 
  Plus, 
  CreditCard, 
  Smartphone, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Receipt, 
  Coffee, 
  Utensils, 
  Sparkles, 
  Car, 
  ConciergeBell, 
  X,
  ArrowLeft,
  Eye,
  EyeOff,
  Gift,
  Repeat,
  Users,
  CalendarDays,
  Award
} from 'lucide-react';

interface DigitalWalletProps {
  onClose: () => void;
  guestInfo?: {
    name: string;
    email: string;
    [key: string]: any;
  };
  onPayForService?: (serviceType: string, amount: number) => void;
  onTipStaff?: (staffName: string, amount: number) => void;
}

export function DigitalWallet({ onClose, guestInfo, onPayForService, onTipStaff }: DigitalWalletProps) {
  const [currentView, setCurrentView] = useState<'overview' | 'add-funds' | 'transactions' | 'pay-service'>('overview');
  const [walletBalance, setWalletBalance] = useState(2847.50);
  const [showBalance, setShowBalance] = useState(true);
  const [selectedTopUpMethod, setSelectedTopUpMethod] = useState<string>('');
  const [topUpAmount, setTopUpAmount] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('');
  const [paymentAmount, setPaymentAmount] = useState<string>('');
  const [processingPayment, setProcessingPayment] = useState(false);
  
  // Mock transaction history
  const [transactions] = useState([
    {
      id: 'txn_001',
      type: 'payment',
      category: 'dining',
      title: 'Room Service Order',
      description: 'Caesar Salad, Grilled Salmon',
      amount: -45.50,
      status: 'completed',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      icon: Utensils,
      color: 'orange'
    },
    {
      id: 'txn_002',
      type: 'tip',
      category: 'staff',
      title: 'Staff Tip - Omar Hassan',
      description: 'Concierge Service',
      amount: -20.00,
      status: 'completed',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      icon: Award,
      color: 'emerald'
    },
    {
      id: 'txn_003',
      type: 'payment',
      category: 'wellness',
      title: 'Spa Treatment',
      description: 'Deep Tissue Massage',
      amount: -85.00,
      status: 'completed',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      icon: Sparkles,
      color: 'purple'
    },
    {
      id: 'txn_004',
      type: 'refund',
      category: 'events',
      title: 'Event Booking Refund',
      description: 'Wine Tasting Experience',
      amount: +35.00,
      status: 'completed',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      icon: CalendarDays,
      color: 'cyan'
    },
    {
      id: 'txn_005',
      type: 'add-funds',
      category: 'topup',
      title: 'Wallet Top-up',
      description: 'Credit Card •••• 1234',
      amount: +500.00,
      status: 'completed',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      icon: Plus,
      color: 'green'
    },
    {
      id: 'txn_006',
      type: 'payment',
      category: 'transport',
      title: 'Airport Transfer',
      description: 'Premium Vehicle Service',
      amount: -75.00,
      status: 'pending',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      icon: Car,
      color: 'yellow'
    },
    {
      id: 'txn_007',
      type: 'payment',
      category: 'dining',
      title: 'Restaurant Dining',
      description: 'Marina Restaurant - Table 12',
      amount: -127.50,
      status: 'completed',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      icon: Coffee,
      color: 'orange'
    }
  ]);

  // Quick service payment options
  const quickPayServices = [
    { id: 'room-service', name: 'Room Service', icon: Utensils, color: 'orange' },
    { id: 'spa', name: 'Spa & Wellness', icon: Sparkles, color: 'purple' },
    { id: 'dining', name: 'Restaurant', icon: Coffee, color: 'orange' },
    { id: 'transport', name: 'Transportation', icon: Car, color: 'cyan' },
    { id: 'concierge', name: 'Concierge', icon: ConciergeBell, color: 'emerald' },
    { id: 'events', name: 'Events', icon: CalendarDays, color: 'purple' }
  ];

  const handleTopUp = () => {
    if (!selectedTopUpMethod || !topUpAmount) return;
    
    setProcessingPayment(true);
    setTimeout(() => {
      const amount = parseFloat(topUpAmount);
      setWalletBalance(prev => prev + amount);
      setProcessingPayment(false);
      setCurrentView('overview');
      setTopUpAmount('');
      setSelectedTopUpMethod('');
    }, 2000);
  };

  const handlePayForService = () => {
    if (!selectedService || !paymentAmount) return;
    
    setProcessingPayment(true);
    setTimeout(() => {
      const amount = parseFloat(paymentAmount);
      setWalletBalance(prev => prev - amount);
      setProcessingPayment(false);
      setCurrentView('overview');
      setPaymentAmount('');
      setSelectedService('');
      
      // Callback to parent if provided
      if (onPayForService) {
        onPayForService(selectedService, amount);
      }
    }, 2000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(amount));
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours}h ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days}d ago`;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-emerald-400/20 text-emerald-300 border-emerald-400/30">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-400/20 text-yellow-300 border-yellow-400/30">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-400/20 text-red-300 border-red-400/30">Failed</Badge>;
      default:
        return <Badge className="bg-gray-400/20 text-gray-300 border-gray-400/30">{status}</Badge>;
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Balance Card */}
      <Card className="neom-gradient-glass border border-yellow-400/30 neom-glow-yellow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl neom-gradient-glass-yellow border border-yellow-400/50 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-yellow-300" />
              </div>
              <div>
                <h3 className="neom-heading-neon text-lg">Digital Wallet</h3>
                <p className="neom-body text-sm">Available Balance</p>
              </div>
            </div>
            <Button
              onClick={() => setShowBalance(!showBalance)}
              className="neom-btn-glass neom-shrink-press w-8 h-8 p-0"
            >
              {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
          
          <div className="text-center">
            <div className="neom-heading text-3xl mb-2">
              {showBalance ? formatCurrency(walletBalance) : '••••••'}
            </div>
            <p className="neom-body text-sm">Guest: {guestInfo?.name || 'Premium Guest'}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-6">
            <Button 
              onClick={() => setCurrentView('add-funds')}
              className="neom-btn-primary neom-shrink-press"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Funds
            </Button>
            <Button 
              onClick={() => setCurrentView('pay-service')}
              className="neom-btn-secondary neom-shrink-press"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Quick Pay
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="neom-card-glass border border-cyan-400/30">
        <CardHeader>
          <CardTitle className="neom-heading-neon flex items-center">
            <Receipt className="w-5 h-5 mr-2 text-cyan-300" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {quickPayServices.slice(0, 4).map((service) => (
              <Button
                key={service.id}
                onClick={() => {
                  setSelectedService(service.id);
                  setCurrentView('pay-service');
                }}
                className="neom-btn-glass neom-shrink-press p-4 h-auto flex-col space-y-2"
              >
                <service.icon className={`w-6 h-6 text-${service.color}-300`} />
                <span className="text-xs">{service.name}</span>
              </Button>
            ))}
          </div>
          
          <Button 
            onClick={() => setCurrentView('transactions')}
            className="w-full neom-btn-glass neom-shrink-press"
          >
            <Clock className="w-4 h-4 mr-2" />
            View All Transactions
          </Button>
        </CardContent>
      </Card>

      {/* Recent Transactions Preview */}
      <Card className="neom-card-glass border border-purple-400/30">
        <CardHeader>
          <CardTitle className="neom-heading-neon flex items-center">
            <Clock className="w-5 h-5 mr-2 text-purple-300" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {transactions.slice(0, 3).map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 rounded-xl neom-gradient-glass border border-gray-400/20">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-xl neom-gradient-glass-${transaction.color} border border-${transaction.color}-400/50 flex items-center justify-center`}>
                  <transaction.icon className={`w-5 h-5 text-${transaction.color}-300`} />
                </div>
                <div>
                  <h4 className="neom-heading text-sm">{transaction.title}</h4>
                  <p className="neom-body text-xs">{transaction.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`neom-mono ${transaction.amount > 0 ? 'text-emerald-300' : 'text-white'}`}>
                  {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                </div>
                <p className="neom-body text-xs">{formatTimestamp(transaction.timestamp)}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  const renderAddFunds = () => (
    <div className="space-y-6">
      <Card className="neom-card-glass border border-emerald-400/30">
        <CardHeader>
          <CardTitle className="neom-heading-neon flex items-center">
            <Plus className="w-5 h-5 mr-2 text-emerald-300" />
            Add Funds to Wallet
          </CardTitle>
          <p className="neom-body text-sm">Choose your preferred payment method</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Amount Selection */}
          <div className="space-y-4">
            <label className="neom-body">Amount to Add</label>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[50, 100, 200].map((amount) => (
                <Button
                  key={amount}
                  onClick={() => setTopUpAmount(amount.toString())}
                  className={`neom-btn-glass neom-shrink-press ${
                    topUpAmount === amount.toString() ? 'border-yellow-400/50 bg-yellow-400/10' : ''
                  }`}
                >
                  ${amount}
                </Button>
              ))}
            </div>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="number"
                value={topUpAmount}
                onChange={(e) => setTopUpAmount(e.target.value)}
                placeholder="Custom amount"
                className="neom-gradient-glass border border-emerald-400/30 text-white placeholder-gray-400 pl-12 py-3 rounded-2xl"
              />
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-4">
            <label className="neom-body">Payment Method</label>
            <div className="space-y-3">
              {[
                { id: 'credit-card', name: 'Credit/Debit Card', icon: CreditCard, desc: 'Visa, Mastercard, Amex' },
                { id: 'mobile-wallet', name: 'Mobile Wallet', icon: Smartphone, desc: 'Apple Pay, Google Pay' },
                { id: 'hotel-credits', name: 'Hotel Credits', icon: Gift, desc: 'Use loyalty points' }
              ].map((method) => (
                <div
                  key={method.id}
                  onClick={() => setSelectedTopUpMethod(method.id)}
                  className={`p-4 rounded-xl neom-gradient-glass border cursor-pointer neom-transition ${
                    selectedTopUpMethod === method.id 
                      ? 'border-emerald-400/50 bg-emerald-400/10' 
                      : 'border-gray-400/20 hover:border-emerald-400/30'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl neom-gradient-glass-emerald border border-emerald-400/50 flex items-center justify-center">
                      <method.icon className="w-6 h-6 text-emerald-300" />
                    </div>
                    <div>
                      <h4 className="neom-heading text-sm">{method.name}</h4>
                      <p className="neom-body text-xs">{method.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button 
            onClick={handleTopUp}
            disabled={!selectedTopUpMethod || !topUpAmount || processingPayment}
            className="w-full neom-btn-primary neom-shrink-press py-3"
          >
            {processingPayment ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              <>
                <Plus className="w-5 h-5 mr-2" />
                Add {topUpAmount ? formatCurrency(parseFloat(topUpAmount)) : 'Funds'}
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderTransactions = () => (
    <div className="space-y-6">
      <Card className="neom-card-glass border border-purple-400/30">
        <CardHeader>
          <CardTitle className="neom-heading-neon flex items-center">
            <Receipt className="w-5 h-5 mr-2 text-purple-300" />
            Transaction History
          </CardTitle>
          <p className="neom-body text-sm">Complete record of all wallet activity</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="p-4 rounded-xl neom-gradient-glass border border-gray-400/20">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl neom-gradient-glass-${transaction.color} border border-${transaction.color}-400/50 flex items-center justify-center`}>
                    <transaction.icon className={`w-6 h-6 text-${transaction.color}-300`} />
                  </div>
                  <div>
                    <h4 className="neom-heading">{transaction.title}</h4>
                    <p className="neom-body text-sm">{transaction.description}</p>
                    <div className="flex items-center space-x-3 mt-2">
                      {getStatusBadge(transaction.status)}
                      <span className="neom-body text-xs">{formatTimestamp(transaction.timestamp)}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`neom-mono text-lg ${transaction.amount > 0 ? 'text-emerald-300' : 'text-white'}`}>
                    {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                  </div>
                  {transaction.type === 'payment' && (
                    <Button className="neom-btn-glass neom-shrink-press text-xs mt-2">
                      <Repeat className="w-3 h-3 mr-1" />
                      Reorder
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  const renderPayService = () => (
    <div className="space-y-6">
      <Card className="neom-card-glass border border-orange-400/30">
        <CardHeader>
          <CardTitle className="neom-heading-neon flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-orange-300" />
            Quick Pay Service
          </CardTitle>
          <p className="neom-body text-sm">Pay for services directly from your wallet</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Service Selection */}
          <div className="space-y-4">
            <label className="neom-body">Select Service</label>
            <div className="grid grid-cols-2 gap-3">
              {quickPayServices.map((service) => (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`p-4 rounded-xl neom-gradient-glass border cursor-pointer neom-transition ${
                    selectedService === service.id 
                      ? 'border-orange-400/50 bg-orange-400/10' 
                      : 'border-gray-400/20 hover:border-orange-400/30'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2 text-center">
                    <div className={`w-12 h-12 rounded-xl neom-gradient-glass-${service.color} border border-${service.color}-400/50 flex items-center justify-center`}>
                      <service.icon className={`w-6 h-6 text-${service.color}-300`} />
                    </div>
                    <span className="neom-heading text-sm">{service.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-4">
            <label className="neom-body">Payment Amount</label>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[25, 50, 100].map((amount) => (
                <Button
                  key={amount}
                  onClick={() => setPaymentAmount(amount.toString())}
                  className={`neom-btn-glass neom-shrink-press ${
                    paymentAmount === amount.toString() ? 'border-orange-400/50 bg-orange-400/10' : ''
                  }`}
                >
                  ${amount}
                </Button>
              ))}
            </div>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                placeholder="Enter amount"
                className="neom-gradient-glass border border-orange-400/30 text-white placeholder-gray-400 pl-12 py-3 rounded-2xl"
              />
            </div>
          </div>

          <Button 
            onClick={handlePayForService}
            disabled={!selectedService || !paymentAmount || processingPayment}
            className="w-full neom-btn-primary neom-shrink-press py-3"
          >
            {processingPayment ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>Processing Payment...</span>
              </div>
            ) : (
              <>
                <DollarSign className="w-5 h-5 mr-2" />
                Pay {paymentAmount ? formatCurrency(parseFloat(paymentAmount)) : 'Amount'}
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-neom-deep-black/95 backdrop-blur-md flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-800/50">
        <div className="flex items-center space-x-4">
          <Button 
            onClick={currentView === 'overview' ? onClose : () => setCurrentView('overview')}
            className="neom-btn-glass neom-shrink-press w-10 h-10 p-0"
          >
            {currentView === 'overview' ? <X className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
          </Button>
          <div>
            <h1 className="neom-heading text-xl">Digital Wallet</h1>
            <p className="neom-body text-sm">
              {currentView === 'overview' && 'Manage your payments and tips'}
              {currentView === 'add-funds' && 'Add funds to your wallet'}
              {currentView === 'transactions' && 'View transaction history'}
              {currentView === 'pay-service' && 'Pay for services instantly'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-emerald-400/20 text-emerald-300 border-emerald-400/30">
            Active
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {currentView === 'overview' && renderOverview()}
        {currentView === 'add-funds' && renderAddFunds()}
        {currentView === 'transactions' && renderTransactions()}
        {currentView === 'pay-service' && renderPayService()}
      </div>
    </div>
  );
}