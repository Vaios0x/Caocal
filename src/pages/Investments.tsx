import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Coins, 
  ArrowUpRight, 
  ArrowDownRight, 
  PieChart, 
  LineChart, 
  AlertTriangle, 
  X, 
  Eye, 
  Bookmark,
  TrendingUp,
  Shield,
  Download,
  Settings,
  CheckCircle,
  Info,
  Clock,
  Plus,
  Share2,
  Edit,
  Target,
  ArrowRight,
  Star,
  Zap,
  BarChart3,
  DollarSign
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card';
import { Button } from '@components/ui/Button';
import { Progress } from '@components/ui/Progress';

// Tipos para las inversiones
interface Investment {
  id: string;
  name: string;
  type: 'stocks' | 'bonds' | 'real-estate' | 'crypto' | 'commodities';
  amount: number;
  percentage: number;
  change: number;
  changePercent: number;
  risk: 'low' | 'medium' | 'high';
  category: string;
  icon: React.ReactNode;
  color: string;
}

interface InvestmentStrategy {
  id: string;
  name: string;
  description: string;
  riskLevel: 'low' | 'medium' | 'high';
  expectedReturn: number;
  minInvestment: number;
  duration: string;
  features: string[];
  icon: React.ReactNode;
  color: string;
}

export const Investments: React.FC = () => {
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'strategies' | 'portfolio'>('overview');
  const navigate = useNavigate();

  // Estados para modales
  const [showInvestmentDetailsModal, setShowInvestmentDetailsModal] = useState<string | null>(null);
  const [showStrategyDetailsModal, setShowStrategyDetailsModal] = useState<string | null>(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showCreateInvestmentModal, setShowCreateInvestmentModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);

  // Datos simulados de inversiones
  const investments: Investment[] = [
    {
      id: '1',
      name: 'S&P 500 ETF',
      type: 'stocks',
      amount: 2500,
      percentage: 35,
      change: 125.50,
      changePercent: 5.3,
      risk: 'medium',
      category: 'Acciones',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-blue-500'
    },
    {
      id: '2',
      name: 'Bonos del Tesoro',
      type: 'bonds',
      amount: 1800,
      percentage: 25,
      change: 45.20,
      changePercent: 2.5,
      risk: 'low',
      category: 'Bonos',
      icon: <Shield className="w-5 h-5" />,
      color: 'text-emerald-500'
    },
    {
      id: '3',
      name: 'REIT Inmobiliario',
      type: 'real-estate',
      amount: 1500,
      percentage: 20,
      change: -25.80,
      changePercent: -1.7,
      risk: 'medium',
      category: 'Inmobiliario',
      icon: <Building2 className="w-5 h-5" />,
      color: 'text-purple-500'
    },
    {
      id: '4',
      name: 'Bitcoin ETF',
      type: 'crypto',
      amount: 800,
      percentage: 12,
      change: 89.30,
      changePercent: 12.6,
      risk: 'high',
      category: 'Criptomonedas',
      icon: <Coins className="w-5 h-5" />,
      color: 'text-orange-500'
    },
    {
      id: '5',
      name: 'Oro Físico',
      type: 'commodities',
      amount: 500,
      percentage: 8,
      change: 12.40,
      changePercent: 2.5,
      risk: 'low',
      category: 'Commodities',
      icon: <Star className="w-5 h-5" />,
      color: 'text-yellow-500'
    }
  ];

  // Estrategias de inversión
  const strategies: InvestmentStrategy[] = [
    {
      id: 'conservative',
      name: 'Estrategia Conservadora',
      description: 'Enfoque en preservación de capital con exposición moderada al riesgo',
      riskLevel: 'low',
      expectedReturn: 4.5,
      minInvestment: 1000,
      duration: '3-5 años',
      features: ['Bonos del gobierno', 'Dividendos estables', 'Protección contra inflación'],
      icon: <Shield className="w-6 h-6" />,
      color: 'text-emerald-500'
    },
    {
      id: 'balanced',
      name: 'Estrategia Balanceada',
      description: 'Equilibrio entre crecimiento y estabilidad con diversificación moderada',
      riskLevel: 'medium',
      expectedReturn: 7.2,
      minInvestment: 2000,
      duration: '5-7 años',
      features: ['Acciones blue-chip', 'Bonos corporativos', 'REITs'],
      icon: <Target className="w-6 h-6" />,
      color: 'text-blue-500'
    },
    {
      id: 'aggressive',
      name: 'Estrategia Agresiva',
      description: 'Máximo potencial de crecimiento con mayor tolerancia al riesgo',
      riskLevel: 'high',
      expectedReturn: 12.5,
      minInvestment: 5000,
      duration: '7-10 años',
      features: ['Acciones de crecimiento', 'Criptomonedas', 'Commodities'],
      icon: <Zap className="w-6 h-6" />,
      color: 'text-orange-500'
    }
  ];

  const totalInvestment = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalChange = investments.reduce((sum, inv) => sum + inv.change, 0);
  const totalChangePercent = (totalChange / (totalInvestment - totalChange)) * 100;

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20';
      case 'medium': return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'high': return 'text-orange-500 bg-orange-50 dark:bg-orange-900/20';
      default: return 'text-slate-500 bg-slate-50 dark:bg-slate-900/20';
    }
  };

  const getRiskLabel = (risk: string) => {
    switch (risk) {
      case 'low': return 'Bajo';
      case 'medium': return 'Medio';
      case 'high': return 'Alto';
      default: return 'N/A';
    }
  };

  // Función para convertir clases de Tailwind a colores hexadecimales
  const getTailwindColor = (tailwindClass: string) => {
    const colorMap: { [key: string]: string } = {
      'text-blue-500': '#3b82f6',
      'text-emerald-500': '#10b981',
      'text-purple-500': '#8b5cf6',
      'text-orange-500': '#f97316',
      'text-yellow-500': '#eab308',
      'text-red-500': '#ef4444',
      'text-green-500': '#22c55e',
      'text-indigo-500': '#6366f1',
      'text-pink-500': '#ec4899',
      'text-cyan-500': '#06b6d4',
      'text-teal-500': '#14b8a6',
      'text-lime-500': '#84cc16',
      'text-amber-500': '#f59e0b',
      'text-violet-500': '#8b5cf6',
      'text-fuchsia-500': '#d946ef',
      'text-rose-500': '#f43f5e',
      'text-slate-500': '#64748b',
      'text-gray-500': '#6b7280',
      'text-zinc-500': '#71717a',
      'text-neutral-500': '#737373',
      'text-stone-500': '#78716c'
    };
    return colorMap[tailwindClass] || '#6b7280'; // color por defecto
  };

  // Nuevas funciones de manejo
  const handleInvestmentClick = (investmentId: string) => {
    setShowInvestmentDetailsModal(investmentId);
  };

  const handleStrategyClick = (strategyId: string) => {
    setShowStrategyDetailsModal(strategyId);
  };

  const handleSettingsClick = () => {
    setShowSettingsModal(true);
  };

  const handleReportClick = () => {
    setShowReportModal(true);
  };

  const handleCreateInvestment = () => {
    setShowCreateInvestmentModal(true);
  };

  const handleInfoClick = () => {
    setShowInfoModal(true);
  };

  const handlePortfolioClick = () => {
    setShowPortfolioModal(true);
  };



  const handleEditInvestment = () => {
    navigate('/settings');
  };

  const handleShareInvestment = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Mi Inversión',
        text: 'Mira mi inversión en Caocal',
        url: window.location.href
      });
    } else {
      alert('Función de compartir no disponible en este navegador');
    }
  };

  const handleDownloadReport = () => {
    alert('Reporte descargado exitosamente!');
    setShowReportModal(false);
  };

  const handleApplyStrategy = () => {
    setShowStrategyDetailsModal(null);
    navigate('/portfolio');
  };

  const handleBookmarkInvestment = (investmentId: string) => {
    console.log('Inversión marcada como favorita:', investmentId);
  };

  const selectedInvestment = showInvestmentDetailsModal
    ? investments.find(i => i.id === showInvestmentDetailsModal)
    : null;

  return (
    <div className="space-y-8 lg:space-y-12">
      {/* Header de la página */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6"
      >
        <div className="flex items-center justify-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg border border-blue-500/20">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Inversiones
          </h1>
        </div>
        <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed">
          Próximamente: Estrategias de inversión avanzadas con IA para maximizar tu patrimonio
        </p>
      </motion.div>

      {/* Tabs de navegación */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex justify-center"
      >
        <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700">
          {[
            { id: 'overview', label: 'Vista General', icon: <BarChart3 className="w-4 h-4" /> },
            { id: 'strategies', label: 'Estrategias', icon: <Target className="w-4 h-4" /> },
            { id: 'portfolio', label: 'Portafolio', icon: <PieChart className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.icon}
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Contenido de las tabs */}
      {activeTab === 'overview' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Resumen de inversiones */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Valor Total</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      ${totalInvestment.toLocaleString()}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center border border-blue-200 dark:border-blue-800">
                    <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Cambio Hoy</p>
                    <div className="flex items-center space-x-2">
                      <p className={`text-2xl font-bold ${totalChange >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {totalChange >= 0 ? '+' : ''}${totalChange.toFixed(2)}
                      </p>
                      <div className={`flex items-center space-x-1 ${totalChange >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {totalChange >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                        <span className="text-sm font-medium">{totalChangePercent.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center border border-emerald-200 dark:border-emerald-800">
                    <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Inversiones Activas</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{investments.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center border border-purple-200 dark:border-purple-800">
                    <PieChart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Gráfico de distribución */}
          <Card className="card-hover">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="w-5 h-5 text-primary" />
                  <span>Distribución del Portafolio</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleReportClick}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Reporte
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleSettingsClick}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Configurar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Gráfico circular simplificado */}
                <div className="flex justify-center">
                  <div className="relative w-48 h-48">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      {investments.map((investment, index) => {
                        const startAngle = investments
                          .slice(0, index)
                          .reduce((sum, inv) => sum + inv.percentage, 0);
                        const endAngle = startAngle + investment.percentage;
                        const startRad = (startAngle * 360) / 100;
                        const endRad = (endAngle * 360) / 100;
                        
                        const x1 = 50 + 40 * Math.cos((startRad * Math.PI) / 180);
                        const y1 = 50 + 40 * Math.sin((startRad * Math.PI) / 180);
                        const x2 = 50 + 40 * Math.cos((endRad * Math.PI) / 180);
                        const y2 = 50 + 40 * Math.sin((endRad * Math.PI) / 180);
                        
                        const largeArcFlag = investment.percentage > 50 ? 1 : 0;
                        
                        return (
                          <path
                            key={investment.id}
                            d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                            fill={getTailwindColor(investment.color)}
                            className="transition-all duration-300 hover:opacity-80"
                          />
                        );
                      })}
                    </svg>
                  </div>
                </div>

                {/* Leyenda */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {investments.map((investment) => (
                    <div
                      key={investment.id}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                    >
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: getTailwindColor(investment.color) }}
                      ></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{investment.name}</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">{investment.percentage}%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          ${investment.amount.toLocaleString()}
                        </p>
                        <p className={`text-xs ${investment.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                          {investment.change >= 0 ? '+' : ''}{investment.changePercent.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {activeTab === 'strategies' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Estrategias de inversión */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {strategies.map((strategy) => (
              <Card 
                key={strategy.id} 
                className={`card-hover cursor-pointer transition-all duration-300 ${
                  selectedStrategy === strategy.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedStrategy(strategy.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${strategy.color.replace('text-', 'bg-')} bg-opacity-10 border border-current border-opacity-20`}>
                        {strategy.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{strategy.name}</CardTitle>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{strategy.description}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Retorno Esperado</p>
                      <p className="text-lg font-bold text-slate-900 dark:text-white">{strategy.expectedReturn}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Riesgo</p>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(strategy.riskLevel)}`}>
                        {getRiskLabel(strategy.riskLevel)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Inversión Mínima</span>
                      <span className="font-medium">${strategy.minInvestment.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Duración</span>
                      <span className="font-medium">{strategy.duration}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-medium text-slate-600 dark:text-slate-400">Características:</p>
                    <ul className="space-y-1">
                      {strategy.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                          <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    className="w-full mt-4"
                    variant={selectedStrategy === strategy.id ? "default" : "outline"}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStrategyClick(strategy.id);
                    }}
                  >
                    {selectedStrategy === strategy.id ? 'Estrategia Seleccionada' : 'Ver Detalles'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Información adicional */}
          <Card className="card-hover">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Info className="w-5 h-5 text-primary" />
                  <span>Información Importante</span>
                </CardTitle>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleInfoClick}
                >
                  <Info className="w-4 h-4 mr-2" />
                  Más Info
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white">Riesgo de Inversión</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Todas las inversiones conllevan riesgo. El valor de tus inversiones puede subir o bajar.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white">Horizonte Temporal</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Las inversiones a largo plazo generalmente ofrecen mejores retornos.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-emerald-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white">Diversificación</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Diversificar tu portafolio ayuda a reducir el riesgo total.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Settings className="w-5 h-5 text-purple-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white">Revisión Periódica</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Revisa y ajusta tu portafolio regularmente según tus objetivos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {activeTab === 'portfolio' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Lista de inversiones */}
          <Card className="card-hover">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <LineChart className="w-5 h-5 text-primary" />
                  <span>Mis Inversiones</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCreateInvestment}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Nueva Inversión
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handlePortfolioClick}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Detalles
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {investments.map((investment, index) => (
                  <motion.div
                    key={investment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200 cursor-pointer"
                    onClick={() => handleInvestmentClick(investment.id)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${investment.color.replace('text-', 'bg-')} bg-opacity-10 border border-current border-opacity-20`}>
                        {investment.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900 dark:text-white">{investment.name}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{investment.category}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="font-medium text-slate-900 dark:text-white">
                          ${investment.amount.toLocaleString()}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{investment.percentage}%</p>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          {investment.change >= 0 ? (
                            <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4 text-red-500" />
                          )}
                          <span className={`font-medium ${investment.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                            {investment.change >= 0 ? '+' : ''}${investment.change.toFixed(2)}
                          </span>
                        </div>
                        <p className={`text-sm ${investment.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                          {investment.change >= 0 ? '+' : ''}{investment.changePercent.toFixed(1)}%
                        </p>
                      </div>
                      
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(investment.risk)}`}>
                        {getRiskLabel(investment.risk)}
                      </span>

                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBookmarkInvestment(investment.id);
                          }}
                        >
                          <Bookmark className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShareInvestment();
                          }}
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditInvestment();
                          }}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Progreso de objetivos */}
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-primary" />
                <span>Progreso de Objetivos</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white">Retiro Anticipado</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Meta: $50,000</p>
                    </div>
                    <span className="text-lg font-bold text-slate-900 dark:text-white">45%</span>
                  </div>
                  <Progress value={45} className="h-3" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white">Fondo de Emergencia</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Meta: $10,000</p>
                    </div>
                    <span className="text-lg font-bold text-slate-900 dark:text-white">78%</span>
                  </div>
                  <Progress value={78} className="h-3" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white">Libertad Financiera</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Meta: $500,000</p>
                    </div>
                    <span className="text-lg font-bold text-slate-900 dark:text-white">12%</span>
                  </div>
                  <Progress value={12} className="h-3" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

    {/* Modal de detalles de inversión */}
    <AnimatePresence>
      {showInvestmentDetailsModal && selectedInvestment && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowInvestmentDetailsModal(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Detalles de Inversión</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowInvestmentDetailsModal(null)}
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${selectedInvestment!.color.replace('text-', 'bg-')} bg-opacity-10 border border-current border-opacity-20`}>
                  {selectedInvestment!.icon}
                </div>
                <div>
                  <h4 className="font-bold text-lg">{selectedInvestment!.name}</h4>
                  <p className="text-sm text-muted-foreground">{selectedInvestment!.category}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Valor</span>
                  <p className="font-medium">${selectedInvestment!.amount.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Porcentaje</span>
                  <p className="font-medium">{selectedInvestment!.percentage}%</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Cambio</span>
                  <p className={`font-medium ${selectedInvestment!.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {selectedInvestment!.change >= 0 ? '+' : ''}${selectedInvestment!.change.toFixed(2)}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Riesgo</span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(selectedInvestment!.risk)}`}>
                    {getRiskLabel(selectedInvestment!.risk)}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowInvestmentDetailsModal(null);
                    handleEditInvestment();
                  }}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Button>
                <Button
                  onClick={() => {
                    setShowInvestmentDetailsModal(null);
                    handleShareInvestment();
                  }}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartir
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Modal de detalles de estrategia */}
    <AnimatePresence>
      {showStrategyDetailsModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowStrategyDetailsModal(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Detalles de Estrategia</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowStrategyDetailsModal(null)}
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            {showStrategyDetailsModal && (() => {
              const strategy = strategies.find(s => s.id === showStrategyDetailsModal);
              if (!strategy) return null;
              
              return (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${strategy.color.replace('text-', 'bg-')} bg-opacity-10 border border-current border-opacity-20`}>
                      {strategy.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{strategy.name}</h4>
                      <p className="text-sm text-muted-foreground">{strategy.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Retorno Esperado</span>
                      <p className="font-medium">{strategy.expectedReturn}%</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Riesgo</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(strategy.riskLevel)}`}>
                        {getRiskLabel(strategy.riskLevel)}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Inversión Mínima</span>
                      <p className="font-medium">${strategy.minInvestment.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Duración</span>
                      <p className="font-medium">{strategy.duration}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">Características:</p>
                    <ul className="space-y-1">
                      {strategy.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                          <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowStrategyDetailsModal(null);
                        handleSettingsClick();
                      }}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Configurar
                    </Button>
                    <Button
                      onClick={() => {
                        handleApplyStrategy();
                      }}
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Aplicar Estrategia
                    </Button>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Modal de configuración */}
    <AnimatePresence>
      {showSettingsModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowSettingsModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Configuración de Inversiones</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettingsModal(false)}
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Configura tus preferencias de inversión y estrategias.
              </p>
              
              <div className="flex items-center justify-end space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowSettingsModal(false)}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => {
                    setShowSettingsModal(false);
                    navigate('/settings');
                  }}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Ir a Configuración
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Modal de reporte */}
    <AnimatePresence>
      {showReportModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowReportModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Descargar Reporte</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowReportModal(false)}
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Selecciona el formato y período para tu reporte de inversiones.
              </p>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Formato</label>
                  <select className="w-full p-2 border rounded-lg mt-1">
                    <option>PDF</option>
                    <option>CSV</option>
                    <option>Excel</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Período</label>
                  <select className="w-full p-2 border rounded-lg mt-1">
                    <option>Últimos 30 días</option>
                    <option>Últimos 90 días</option>
                    <option>Este año</option>
                    <option>Personalizado</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowReportModal(false)}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleDownloadReport}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descargar
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Modal de nueva inversión */}
    <AnimatePresence>
      {showCreateInvestmentModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowCreateInvestmentModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Nueva Inversión</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCreateInvestmentModal(false)}
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Esta funcionalidad estará disponible próximamente.
              </p>
              
              <div className="flex items-center justify-end space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowCreateInvestmentModal(false)}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => {
                    setShowCreateInvestmentModal(false);
                    navigate('/portfolio');
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Ir a Portafolio
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Modal de información */}
    <AnimatePresence>
      {showInfoModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowInfoModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Información de Inversiones</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowInfoModal(false)}
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Riesgo de Inversión</h4>
                    <p className="text-sm text-muted-foreground">
                      Todas las inversiones conllevan riesgo. El valor puede subir o bajar.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Horizonte Temporal</h4>
                    <p className="text-sm text-muted-foreground">
                      Las inversiones a largo plazo ofrecen mejores retornos.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <Shield className="w-5 h-5 text-emerald-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Diversificación</h4>
                    <p className="text-sm text-muted-foreground">
                      Diversificar tu portafolio ayuda a reducir el riesgo total.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowInfoModal(false)}
                >
                  Cerrar
                </Button>
                <Button
                  onClick={() => {
                    setShowInfoModal(false);
                    navigate('/education');
                  }}
                >
                  <Info className="w-4 h-4 mr-2" />
                  Aprender Más
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Modal de detalles del portafolio */}
    <AnimatePresence>
      {showPortfolioModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowPortfolioModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Detalles del Portafolio</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPortfolioModal(false)}
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Valor Total</span>
                  <p className="font-medium">${totalInvestment.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Cambio Hoy</span>
                  <p className={`font-medium ${totalChange >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {totalChange >= 0 ? '+' : ''}${totalChange.toFixed(2)}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Inversiones</span>
                  <p className="font-medium">{investments.length}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Rendimiento</span>
                  <p className={`font-medium ${totalChangePercent >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {totalChangePercent >= 0 ? '+' : ''}{totalChangePercent.toFixed(1)}%
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Distribución por Categoría</h4>
                {investments.map((investment) => (
                  <div key={investment.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${investment.color.replace('text-', 'bg-')}`}></div>
                      <span className="text-sm font-medium">{investment.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{investment.percentage}%</p>
                      <p className="text-xs text-muted-foreground">${investment.amount.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowPortfolioModal(false);
                    navigate('/portfolio');
                  }}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Ver Portafolio Completo
                </Button>
                <Button
                  onClick={() => {
                    setShowPortfolioModal(false);
                    handleReportClick();
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descargar Reporte
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </div>
  );
}; 