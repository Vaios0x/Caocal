import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Target, 
  PiggyBank, 
  TrendingUp, 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  Plus, 
  Eye,
  DollarSign,
  Clock,
  Zap,
  Star,
  ChevronRight,
  Info,
  X,
  Home,
  Car,
  Briefcase,
  Award,
  Lightbulb,
  AlertTriangle,
  BarChart3,
  Settings,
  Download,
  Share2,
  ArrowRight,
  Edit,
  Trash2,
  Play,
  Pause,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card';
import { Progress } from '@components/ui/Progress';
import { Button } from '@components/ui/Button';

interface SavingsGoal {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
  category: 'emergency' | 'vacation' | 'investment' | 'purchase' | 'education' | 'retirement' | 'home' | 'vehicle' | 'business';
  priority: 'high' | 'medium' | 'low';
  description?: string;
  monthlyContribution?: number;
  isActive: boolean;
  createdAt: string;
  lastUpdated: string;
  color?: string;
  icon?: string;
  milestones?: Array<{
    id: string;
    amount: number;
    description: string;
    achieved: boolean;
  }>;
  insights?: {
    projectedCompletion?: string;
    recommendedContribution?: number;
    riskLevel?: 'low' | 'medium' | 'high';
    suggestions?: string[];
  };
}

interface SavingsStrategy {
  id: string;
  name: string;
  type: 'automatic' | 'manual' | 'rounding' | 'percentage' | 'smart';
  amount: number;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  isActive: boolean;
  description: string;
  icon: React.ReactNode;
  successRate: number;
  totalSaved: number;
  lastUsed: string;
}

interface SavingsInsight {
  id: string;
  type: 'tip' | 'warning' | 'achievement' | 'suggestion';
  title: string;
  message: string;
  icon: React.ReactNode;
  priority: 'high' | 'medium' | 'low';
  actionable: boolean;
  actionLabel?: string;
  actionUrl?: string;
}

const mockGoals: SavingsGoal[] = [
  {
    id: '1',
    name: 'Fondo de Emergencia',
    target: 5000,
    current: 3200,
    deadline: '2024-12-31',
    category: 'emergency',
    priority: 'high',
    description: 'Ahorro para gastos inesperados y emergencias',
    monthlyContribution: 300,
    isActive: true,
    createdAt: '2024-01-15',
    lastUpdated: '2024-03-15',
    color: '#ef4444',
    icon: 'shield',
    milestones: [
      { id: '1-1', amount: 1000, description: 'Primer hito', achieved: true },
      { id: '1-2', amount: 2500, description: 'Mitad del camino', achieved: true },
      { id: '1-3', amount: 4000, description: 'Casi listo', achieved: false }
    ],
    insights: {
      projectedCompletion: '2024-11-15',
      recommendedContribution: 350,
      riskLevel: 'low',
      suggestions: ['Aumentar contribución mensual', 'Considerar inversiones de bajo riesgo']
    }
  },
  {
    id: '2',
    name: 'Vacaciones de Verano',
    target: 3000,
    current: 1800,
    deadline: '2024-06-15',
    category: 'vacation',
    priority: 'medium',
    description: 'Viaje familiar a la playa',
    monthlyContribution: 200,
    isActive: true,
    createdAt: '2024-02-01',
    lastUpdated: '2024-03-10',
    color: '#3b82f6',
    icon: 'plane',
    milestones: [
      { id: '2-1', amount: 1000, description: 'Depósito inicial', achieved: true },
      { id: '2-2', amount: 2000, description: 'Reserva de hotel', achieved: false }
    ],
    insights: {
      projectedCompletion: '2024-07-15',
      recommendedContribution: 250,
      riskLevel: 'medium',
      suggestions: ['Acelerar ahorro para evitar retrasos']
    }
  },
  {
    id: '3',
    name: 'Inversión en RWA',
    target: 2000,
    current: 950,
    deadline: '2024-08-30',
    category: 'investment',
    priority: 'high',
    description: 'Diversificación en activos reales',
    monthlyContribution: 150,
    isActive: true,
    createdAt: '2024-01-20',
    lastUpdated: '2024-03-12',
    color: '#10b981',
    icon: 'trending-up',
    milestones: [
      { id: '3-1', amount: 500, description: 'Entrada inicial', achieved: true },
      { id: '3-2', amount: 1500, description: 'Posición completa', achieved: false }
    ],
    insights: {
      projectedCompletion: '2024-09-30',
      recommendedContribution: 200,
      riskLevel: 'high',
      suggestions: ['Considerar diversificar en múltiples activos']
    }
  },
  {
    id: '4',
    name: 'Nueva Laptop',
    target: 1500,
    current: 1200,
    deadline: '2024-05-20',
    category: 'purchase',
    priority: 'low',
    description: 'Actualización de equipo de trabajo',
    monthlyContribution: 100,
    isActive: true,
    createdAt: '2024-03-01',
    lastUpdated: '2024-03-14',
    color: '#8b5cf6',
    icon: 'laptop',
    milestones: [
      { id: '4-1', amount: 750, description: 'Mitad del precio', achieved: true },
      { id: '4-2', amount: 1200, description: 'Casi listo', achieved: true }
    ],
    insights: {
      projectedCompletion: '2024-04-15',
      recommendedContribution: 150,
      riskLevel: 'low',
      suggestions: ['Completar antes de la fecha límite']
    }
  },
  {
    id: '5',
    name: 'Educación Continua',
    target: 800,
    current: 450,
    deadline: '2024-09-30',
    category: 'education',
    priority: 'medium',
    description: 'Cursos y certificaciones profesionales',
    monthlyContribution: 80,
    isActive: true,
    createdAt: '2024-02-15',
    lastUpdated: '2024-03-08',
    color: '#f59e0b',
    icon: 'graduation-cap',
    milestones: [
      { id: '5-1', amount: 400, description: 'Primer curso', achieved: true },
      { id: '5-2', amount: 600, description: 'Certificación', achieved: false }
    ],
    insights: {
      projectedCompletion: '2024-10-15',
      recommendedContribution: 100,
      riskLevel: 'medium',
      suggestions: ['Buscar descuentos por volumen', 'Considerar cursos online']
    }
  }
];

const mockStrategies: SavingsStrategy[] = [
  {
    id: '1',
    name: 'Ahorro Automático',
    type: 'automatic',
    amount: 5,
    frequency: 'monthly',
    isActive: true,
    description: '5% de cada ingreso se transfiere automáticamente',
    icon: <Zap className="w-4 h-4" />,
    successRate: 95,
    totalSaved: 2400,
    lastUsed: '2024-03-15'
  },
  {
    id: '2',
    name: 'Redondeo Inteligente',
    type: 'rounding',
    amount: 0,
    frequency: 'daily',
    isActive: true,
    description: 'Redondea tus gastos al peso más cercano',
    icon: <Target className="w-4 h-4" />,
    successRate: 88,
    totalSaved: 850,
    lastUsed: '2024-03-14'
  },
  {
    id: '3',
    name: 'Meta Semanal',
    type: 'manual',
    amount: 150,
    frequency: 'weekly',
    isActive: true,
    description: 'Ahorro fijo de $150 cada semana',
    icon: <Calendar className="w-4 h-4" />,
    successRate: 72,
    totalSaved: 1200,
    lastUsed: '2024-03-10'
  }
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'emergency': return <AlertCircle className="w-4 h-4 text-destructive" />;
    case 'vacation': return <Calendar className="w-4 h-4 text-info" />;
    case 'investment': return <TrendingUp className="w-4 h-4 text-success" />;
    case 'purchase': return <PiggyBank className="w-4 h-4 text-primary" />;
    case 'education': return <Star className="w-4 h-4 text-warning" />;
    case 'retirement': return <Target className="w-4 h-4 text-muted-foreground" />;
    case 'home': return <Home className="w-4 h-4 text-orange-500" />;
    case 'vehicle': return <Car className="w-4 h-4 text-blue-500" />;
    case 'business': return <Briefcase className="w-4 h-4 text-purple-500" />;
    default: return <Target className="w-4 h-4" />;
  }
};



const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-destructive/10 text-destructive border-destructive/20';
    case 'medium': return 'bg-warning/10 text-warning border-warning/20';
    case 'low': return 'bg-success/10 text-success border-success/20';
    default: return 'bg-muted/10 text-muted-foreground border-muted/20';
  }
};

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case 'high': return <AlertCircle className="w-3 h-3" />;
    case 'medium': return <Clock className="w-3 h-3" />;
    case 'low': return <CheckCircle className="w-3 h-3" />;
    default: return <Info className="w-3 h-3" />;
  }
};

const mockInsights: SavingsInsight[] = [
  {
    id: '1',
    type: 'achievement',
    title: '¡Meta Completada!',
    message: 'Has completado tu meta de "Nueva Laptop" antes de la fecha límite',
    icon: <Award className="w-5 h-5 text-success" />,
    priority: 'high',
    actionable: true,
    actionLabel: 'Ver detalles',
    actionUrl: '#'
  },
  {
    id: '2',
    type: 'tip',
    title: 'Consejo de Ahorro',
    message: 'Aumentar tu contribución mensual en $50 podría completar tu fondo de emergencia 2 meses antes',
    icon: <Lightbulb className="w-5 h-5 text-warning" />,
    priority: 'medium',
    actionable: true,
    actionLabel: 'Aplicar sugerencia',
    actionUrl: '#'
  },
  {
    id: '3',
    type: 'warning',
    title: 'Meta en Riesgo',
    message: 'Tu meta de "Vacaciones de Verano" podría no completarse a tiempo. Considera aumentar el ahorro mensual',
    icon: <AlertTriangle className="w-5 h-5 text-destructive" />,
    priority: 'high',
    actionable: true,
    actionLabel: 'Revisar meta',
    actionUrl: '#'
  },
  {
    id: '4',
    type: 'suggestion',
    title: 'Nueva Estrategia Disponible',
    message: 'Prueba el "Ahorro Inteligente" que ajusta automáticamente tus contribuciones según tus ingresos',
    icon: <TrendingUp className="w-5 h-5 text-primary" />,
    priority: 'medium',
    actionable: true,
    actionLabel: 'Activar',
    actionUrl: '#'
  }
];

export const Savings: React.FC = () => {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState<'goals' | 'strategies' | 'insights'>('goals');
  const navigate = useNavigate();

  // Estados para modales
  const [showGoalDetailsModal, setShowGoalDetailsModal] = useState<string | null>(null);
  const [showStrategyDetailsModal, setShowStrategyDetailsModal] = useState<string | null>(null);
  const [showInsightDetailsModal, setShowInsightDetailsModal] = useState<string | null>(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showTutorialModal, setShowTutorialModal] = useState(false);

  const totalTarget = mockGoals.reduce((sum, goal) => sum + goal.target, 0);
  const totalCurrent = mockGoals.reduce((sum, goal) => sum + goal.current, 0);
  const overallProgress = (totalTarget > 0) ? (totalCurrent / totalTarget) * 100 : 0;
  const totalRemaining = totalTarget - totalCurrent;

  const activeGoals = mockGoals.filter(goal => goal.isActive);
  const completedGoals = mockGoals.filter(goal => goal.current >= goal.target);

  const totalSavedByStrategies = mockStrategies.reduce((sum, strategy) => sum + strategy.totalSaved, 0);
  const averageSuccessRate = mockStrategies.reduce((sum, strategy) => sum + strategy.successRate, 0) / mockStrategies.length;

  const handleGoalClick = (goalId: string) => {
    setShowGoalDetailsModal(goalId);
  };

  const handleCreateGoal = () => {
    setIsLoading(true);
    // Simular creación de meta
    setTimeout(() => {
      setIsLoading(false);
      setShowCreateModal(false);
    }, 2000);
  };

  const handleInsightAction = (insightId: string) => {
    setShowInsightDetailsModal(insightId);
  };

  // Nuevas funciones de manejo
  const handleStrategyClick = (strategyId: string) => {
    setShowStrategyDetailsModal(strategyId);
  };

  const handleSettingsClick = () => {
    setShowSettingsModal(true);
  };

  const handleReportClick = () => {
    setShowReportModal(true);
  };

  const handleTutorialClick = () => {
    setShowTutorialModal(true);
  };

  const handleEditGoal = (goalId: string) => {
    // Navegar a configuración o abrir modal de edición
    navigate('/settings');
  };

  const handleDeleteGoal = (goalId: string) => {
    // Confirmar eliminación
    if (confirm('¿Estás seguro de que quieres eliminar esta meta?')) {
      console.log('Meta eliminada:', goalId);
    }
  };

  const handleToggleStrategy = (strategyId: string) => {
    // Toggle activar/desactivar estrategia
    console.log('Estrategia toggleada:', strategyId);
  };

  const handleDownloadReport = () => {
    alert('Reporte descargado exitosamente!');
    setShowReportModal(false);
  };

  const handleShareGoal = (goalId: string) => {
    // Compartir meta
    if (navigator.share) {
      navigator.share({
        title: 'Mi Meta de Ahorro',
        text: 'Mira mi progreso en esta meta de ahorro',
        url: window.location.href
      });
    } else {
      alert('Función de compartir no disponible en este navegador');
    }
  };

  return (
    <div className="flex flex-col space-y-8 lg:space-y-12">
      {/* Header mejorado */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        {/* Header principal */}
        <div className="text-center space-y-6 lg:space-y-8">
          <div className="relative inline-block">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 leading-tight">
              Mis Ahorros
            </h1>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full animate-pulse-slow border-2 border-white dark:border-slate-900"></div>
          </div>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Analiza tus patrones de ahorro, identifica oportunidades y optimiza tu estrategia financiera para construir riqueza de manera inteligente.
          </p>
        </div>

        {/* Navegación por pestañas moderna */}
        <div className="flex justify-center">
          <div className="flex bg-white dark:bg-slate-800 rounded-2xl p-2 space-x-2 border border-slate-200 dark:border-slate-700 shadow-lg">
            <Button
              variant={activeTab === 'goals' ? 'default' : 'ghost'}
              size="lg"
              onClick={() => setActiveTab('goals')}
              className={`rounded-xl transition-all duration-300 ${
                activeTab === 'goals' 
                  ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg shadow-emerald-500/25' 
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
              aria-label="Ver metas de ahorro"
            >
              <Target className="w-5 h-5 mr-3" />
              Metas ({activeGoals.length})
            </Button>
            <Button
              variant={activeTab === 'strategies' ? 'default' : 'ghost'}
              size="lg"
              onClick={() => setActiveTab('strategies')}
              className={`rounded-xl transition-all duration-300 ${
                activeTab === 'strategies' 
                  ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg shadow-emerald-500/25' 
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
              aria-label="Ver estrategias de ahorro"
            >
              <Zap className="w-5 h-5 mr-3" />
              Estrategias ({mockStrategies.length})
            </Button>
            <Button
              variant={activeTab === 'insights' ? 'default' : 'ghost'}
              size="lg"
              onClick={() => setActiveTab('insights')}
              className={`rounded-xl transition-all duration-300 ${
                activeTab === 'insights' 
                  ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg shadow-emerald-500/25' 
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
              aria-label="Ver insights y consejos"
            >
              <Lightbulb className="w-5 h-5 mr-3" />
              Insights ({mockInsights.length})
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Contenido condicional basado en pestañas */}
      <AnimatePresence mode="wait">
        {activeTab === 'goals' && (
          <motion.div
            key="goals"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
                        {/* Métricas principales con diseño moderno */}
                        {/* Métricas principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <PiggyBank className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Total Ahorrado</span>
                      </div>
                      <Eye className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mb-2">${totalCurrent.toLocaleString()}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      De ${totalTarget.toLocaleString()} meta
                    </p>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${overallProgress}%` }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Meta Restante</span>
                    </div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mb-2">${totalRemaining.toLocaleString()}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Para completar todas las metas
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Metas Completadas</span>
                    </div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{completedGoals.length}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      De {activeGoals.length} metas activas
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Progreso General</span>
                    </div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{overallProgress.toFixed(1)}%</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Promedio de todas las metas
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Controles de vista */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Vista:</span>
                <div className="flex bg-white dark:bg-slate-800 rounded-xl p-1 space-x-1 border border-slate-200 dark:border-slate-700">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                    aria-label="Vista de barras"
                  >
                    <BarChart3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
                    aria-label="Vista de líneas"
                  >
                    <TrendingUp className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
                    aria-label="Vista de calendario"
                  >
                    <Calendar className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Período:</span>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
                    onClick={() => console.log('Filtro: 7 días')}
                  >
                    7 días
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
                    onClick={() => console.log('Filtro: 14 días')}
                  >
                    14 días
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-lg bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30"
                    onClick={() => console.log('Filtro: 30 días')}
                  >
                    30 días
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
                    onClick={() => console.log('Filtro: 90 días')}
                  >
                    90 días
                  </Button>
                </div>
              </div>
            </div>

                {/* Sección de Estrategias Activas y Próximas Metas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Estrategias Activas */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500/20 to-emerald-400/20 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Estrategias Activas ({mockStrategies.length})</h3>
            </div>
            
            <div className="space-y-4">
              {mockStrategies.map((strategy, index) => (
                <motion.div
                  key={strategy.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group cursor-pointer"
                  onClick={() => handleStrategyClick(strategy.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-emerald-400/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        {strategy.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-900 dark:text-white text-lg truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {strategy.name}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 truncate">{strategy.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-slate-900 dark:text-white">
                        ${strategy.amount > 0 ? strategy.amount : '0'}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{strategy.frequency}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleStrategy(strategy.id);
                        }}
                        className="text-xs"
                      >
                        {strategy.isActive ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                        {strategy.isActive ? 'Pausar' : 'Activar'}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSettingsClick();
                        }}
                        className="text-xs"
                      >
                        <Settings className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-emerald-600">{strategy.successRate}% éxito</p>
                      <p className="text-xs text-slate-500">${strategy.totalSaved} ahorrado</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Próximas Metas */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-blue-400/20 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Próximas Metas</h3>
            </div>
            
            <div className="space-y-4">
              {mockGoals.slice(0, 3).map((goal, index) => {
                const progress = (goal.current / goal.target) * 100;
                const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                
                return (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group cursor-pointer"
                    onClick={() => handleGoalClick(goal.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-400/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          {getCategoryIcon(goal.category)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-slate-900 dark:text-white text-lg truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {goal.name}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{progress.toFixed(1)}% completado</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-300 capitalize">{goal.priority} prioridad</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {daysLeft > 0 ? `${daysLeft} días` : 'Vencida'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditGoal(goal.id);
                          }}
                          className="text-xs"
                        >
                          <Edit className="w-3 h-3" />
                          Editar
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShareGoal(goal.id);
                          }}
                          className="text-xs"
                        >
                          <Share2 className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-blue-600">${goal.current.toLocaleString()}</p>
                        <p className="text-xs text-slate-500">de ${goal.target.toLocaleString()}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Metas de ahorro completas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Target className="w-6 h-6 text-emerald-400" />
                <h3 className="text-xl font-bold text-white">Mis Metas de Ahorro</h3>
                <span className="text-sm text-slate-300">
                  ({activeGoals.length} activas)
                </span>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowCreateModal(true)}
                className="flex items-center space-x-2 bg-slate-700/50 border-slate-600/50 text-white hover:bg-slate-600/50"
                aria-label="Crear nueva meta de ahorro"
              >
                <Plus className="w-4 h-4" />
                <span>Nueva Meta</span>
              </Button>
            </div>
          <CardContent>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockGoals.map((goal, index) => {
                  const progress = (goal.current / goal.target) * 100;
                  const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                  const isOverdue = daysLeft < 0;
                  const isCompleted = progress >= 100;
                  
                  return (
                    <motion.div
                      key={goal.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                      className={`relative group cursor-pointer transition-all duration-300 ${
                        isCompleted ? 'ring-2 ring-success/50' : ''
                      } ${isOverdue ? 'ring-2 ring-destructive/50' : ''}`}
                      onClick={() => handleGoalClick(goal.id)}
                      tabIndex={0}
                      role="button"
                      aria-label={`Ver detalles de ${goal.name}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleGoalClick(goal.id);
                        }
                      }}
                    >
                      <Card className={`h-full transition-all duration-300 hover:shadow-xl group ${
                        selectedGoal === goal.id ? 'ring-2 ring-primary' : ''
                      }`}>
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                {getCategoryIcon(goal.category)}
                              </div>
                              <div className="flex-1">
                                <h3 className="font-bold text-slate-900 dark:text-white text-lg line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                  {goal.name}
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mt-1">
                                  {goal.description}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition-all duration-300 ${
                                goal.priority === 'high' 
                                  ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300' 
                                  : goal.priority === 'medium'
                                  ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-300'
                                  : 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300'
                              }`}>
                                {getPriorityIcon(goal.priority)}
                                <span className="ml-1 capitalize">{goal.priority}</span>
                              </span>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Progreso</span>
                              <span className="text-lg font-bold text-slate-900 dark:text-white">{progress.toFixed(1)}%</span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                              <div 
                                className={`h-3 rounded-full transition-all duration-500 ${
                                  isCompleted 
                                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' 
                                    : isOverdue 
                                    ? 'bg-gradient-to-r from-red-500 to-red-400'
                                    : 'bg-gradient-to-r from-blue-500 to-purple-500'
                                }`}
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl p-3 border border-emerald-200 dark:border-emerald-800">
                              <p className="text-xs font-medium text-emerald-700 dark:text-emerald-300 mb-1">Ahorrado</p>
                              <p className="text-lg font-bold text-emerald-900 dark:text-emerald-100">${goal.current.toLocaleString()}</p>
                            </div>
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-3 border border-blue-200 dark:border-blue-800">
                              <p className="text-xs font-medium text-blue-700 dark:text-blue-300 mb-1">Meta</p>
                              <p className="text-lg font-bold text-blue-900 dark:text-blue-100">${goal.target.toLocaleString()}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                isOverdue 
                                  ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' 
                                  : isCompleted 
                                  ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                                  : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                              }`}>
                                {isOverdue ? 'Vencida' : isCompleted ? 'Completada' : `${daysLeft} días`}
                              </span>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                ${(goal.target - goal.current).toLocaleString()} faltan
                              </p>
                            </div>
                          </div>
                          
                          {goal.monthlyContribution && (
                            <div className="flex items-center space-x-2 p-3 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-700">
                              <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                ${goal.monthlyContribution}/mes
                              </span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                      
                      {/* Indicadores de estado */}
                      {isCompleted && (
                        <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-400 rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-900">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      )}
                      {isOverdue && (
                        <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-red-500 to-red-400 rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-900">
                          <AlertCircle className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-4">
              {mockGoals.map((goal, index) => {
                const progress = (goal.current / goal.target) * 100;
                const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                  const isOverdue = daysLeft < 0;
                  const isCompleted = progress >= 100;
                
                return (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                      className={`border rounded-xl p-4 hover:shadow-lg transition-all duration-300 cursor-pointer ${
                        selectedGoal === goal.id ? 'ring-2 ring-primary bg-primary/5' : ''
                      } ${isCompleted ? 'border-success/50 bg-success/5' : ''} ${
                        isOverdue ? 'border-destructive/50 bg-destructive/5' : ''
                      }`}
                      onClick={() => handleGoalClick(goal.id)}
                      tabIndex={0}
                      role="button"
                      aria-label={`Ver detalles de ${goal.name}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleGoalClick(goal.id);
                        }
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 flex-1">
                        {getCategoryIcon(goal.category)}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-foreground truncate">{goal.name}</h3>
                              {isCompleted && <CheckCircle className="w-4 h-4 text-success" />}
                              {isOverdue && <AlertCircle className="w-4 h-4 text-destructive" />}
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{goal.description}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                      <div className="text-right">
                            <p className="text-sm font-medium">
                              ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                            </p>
                        <p className="text-xs text-muted-foreground">
                              {progress.toFixed(1)}% completado
                            </p>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(goal.priority)}`}>
                              {goal.priority}
                            </span>
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          </div>
                        </div>
                    </div>
                    
                      <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progreso</span>
                        <span className="font-medium">{progress.toFixed(1)}%</span>
                      </div>
                        <Progress 
                          value={progress} 
                          className={`h-2 ${isCompleted ? 'bg-success' : isOverdue ? 'bg-destructive' : ''}`}
                        />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Faltan ${(goal.target - goal.current).toLocaleString()}</span>
                          <span>{isOverdue ? 'Vencida' : isCompleted ? 'Completada' : `${daysLeft} días`}</span>
                        </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            )}
          </CardContent>
        </div>
      </motion.div>

            {/* Call to action mejorado */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="relative overflow-hidden bg-gradient-to-r from-success/10 via-primary/10 to-success/10 rounded-2xl p-8 border border-success/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-success/5 to-primary/5" />
              <div className="relative z-10 text-center space-y-6">
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-success to-primary rounded-xl flex items-center justify-center shadow-lg">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    ¿Listo para crear tu próxima meta?
                  </h3>
                </div>
                
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                  Define tus objetivos financieros y deja que Caocal te ayude a alcanzarlos 
                  con estrategias personalizadas y automatización inteligente.
                </p>
                
                <div className="flex items-center justify-center space-x-4">
                  <Button 
                    size="lg" 
                    onClick={() => setShowCreateModal(true)}
                    className="bg-gradient-to-r from-success to-primary hover:from-success/90 hover:to-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                    aria-label="Crear nueva meta de ahorro"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Crear Nueva Meta
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-success/20 text-success hover:bg-success/10"
                    aria-label="Ver tutorial de ahorro"
                    onClick={handleTutorialClick}
                  >
                    <Info className="w-5 h-5 mr-2" />
                    Aprender Más
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeTab === 'strategies' && (
          <motion.div
            key="strategies"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Resumen de estrategias */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="card-hover">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-2 text-sm">
                      <Zap className="w-4 h-4 text-warning" />
                      <span>Total Ahorrado</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-success">${totalSavedByStrategies.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Por estrategias activas
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="card-hover">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-2 text-sm">
                      <TrendingUp className="w-4 h-4 text-success" />
                      <span>Tasa de Éxito</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-success">{averageSuccessRate.toFixed(0)}%</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Promedio de estrategias
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="card-hover">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-2 text-sm">
                      <Target className="w-4 h-4 text-primary" />
                      <span>Estrategias Activas</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-primary">{mockStrategies.length}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Funcionando actualmente
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Lista de estrategias */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <span>Mis Estrategias de Ahorro</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockStrategies.map((strategy, index) => (
                    <motion.div
                      key={strategy.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                      className="group cursor-pointer"
                    >
                      <Card className="h-full transition-all duration-300 hover:shadow-xl">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              {strategy.icon}
                              <div className="flex-1">
                                <h3 className="font-semibold text-foreground">{strategy.name}</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {strategy.description}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                strategy.successRate >= 90 ? 'bg-success/10 text-success border border-success/20' :
                                strategy.successRate >= 70 ? 'bg-warning/10 text-warning border border-warning/20' :
                                'bg-destructive/10 text-destructive border border-destructive/20'
                              }`}>
                                {strategy.successRate}%
                              </span>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Ahorrado</p>
                              <p className="font-semibold text-success">${strategy.totalSaved.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Frecuencia</p>
                              <p className="font-semibold capitalize">{strategy.frequency}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">
                              Último uso: {new Date(strategy.lastUsed).toLocaleDateString()}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              strategy.isActive ? 'bg-success/10 text-success' : 'bg-muted/10 text-muted-foreground'
                            }`}>
                              {strategy.isActive ? 'Activa' : 'Inactiva'}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === 'insights' && (
          <motion.div
            key="insights"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Lista de insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5 text-warning" />
                  <span>Insights y Consejos</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockInsights.map((insight, index) => (
                    <motion.div
                      key={insight.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                      className={`p-4 rounded-xl border transition-all duration-300 hover:shadow-lg cursor-pointer ${
                        insight.type === 'achievement' ? 'border-success/20 bg-success/5' :
                        insight.type === 'warning' ? 'border-destructive/20 bg-destructive/5' :
                        insight.type === 'tip' ? 'border-warning/20 bg-warning/5' :
                        'border-primary/20 bg-primary/5'
                      }`}
                      onClick={() => handleInsightAction(insight.id)}
                      tabIndex={0}
                      role="button"
                      aria-label={`Ver detalles de ${insight.title}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleInsightAction(insight.id);
                        }
                      }}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 mt-1">
                          {insight.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-foreground">{insight.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              insight.priority === 'high' ? 'bg-destructive/10 text-destructive' :
                              insight.priority === 'medium' ? 'bg-warning/10 text-warning' :
                              'bg-success/10 text-success'
                            }`}>
                              {insight.priority}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">{insight.message}</p>
                          {insight.actionable && insight.actionLabel && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-3"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleInsightAction(insight.id);
                              }}
                            >
                              {insight.actionLabel}
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de creación de meta */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Crear Nueva Meta</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCreateModal(false)}
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
                    onClick={() => setShowCreateModal(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleCreateGoal}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-success to-primary"
                  >
                    {isLoading ? 'Creando...' : 'Crear Meta'}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de detalles de meta */}
      <AnimatePresence>
        {showGoalDetailsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowGoalDetailsModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Detalles de Meta</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowGoalDetailsModal(null)}
                  aria-label="Cerrar modal"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              {showGoalDetailsModal && (() => {
                const goal = mockGoals.find(g => g.id === showGoalDetailsModal);
                if (!goal) return null;
                
                const progress = (goal.current / goal.target) * 100;
                const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                
                return (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      {getCategoryIcon(goal.category)}
                      <div>
                        <h4 className="font-bold text-lg">{goal.name}</h4>
                        <p className="text-sm text-muted-foreground">{goal.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Progreso</span>
                        <span className="font-medium">{progress.toFixed(1)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span>${goal.current.toLocaleString()} de ${goal.target.toLocaleString()}</span>
                        <span>Faltan ${(goal.target - goal.current).toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Prioridad</span>
                        <p className="font-medium capitalize">{goal.priority}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Fecha límite</span>
                        <p className="font-medium">{new Date(goal.deadline).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Días restantes</span>
                        <p className="font-medium">{daysLeft > 0 ? daysLeft : 'Vencida'}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Contribución mensual</span>
                        <p className="font-medium">${goal.monthlyContribution?.toLocaleString() || '0'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowGoalDetailsModal(null);
                          handleEditGoal(goal.id);
                        }}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </Button>
                      <Button
                        onClick={() => {
                          setShowGoalDetailsModal(null);
                          handleShareGoal(goal.id);
                        }}
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Compartir
                      </Button>
                    </div>
                  </div>
                );
              })()}
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
                const strategy = mockStrategies.find(s => s.id === showStrategyDetailsModal);
                if (!strategy) return null;
                
                return (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      {strategy.icon}
                      <div>
                        <h4 className="font-bold text-lg">{strategy.name}</h4>
                        <p className="text-sm text-muted-foreground">{strategy.description}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Tipo</span>
                        <p className="font-medium capitalize">{strategy.type}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Frecuencia</span>
                        <p className="font-medium capitalize">{strategy.frequency}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Cantidad</span>
                        <p className="font-medium">${strategy.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Tasa de éxito</span>
                        <p className="font-medium">{strategy.successRate}%</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Total ahorrado</span>
                        <p className="font-medium">${strategy.totalSaved.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Estado</span>
                        <p className="font-medium">{strategy.isActive ? 'Activa' : 'Inactiva'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowStrategyDetailsModal(null);
                          handleToggleStrategy(strategy.id);
                        }}
                      >
                        {strategy.isActive ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                        {strategy.isActive ? 'Pausar' : 'Activar'}
                      </Button>
                      <Button
                        onClick={() => {
                          setShowStrategyDetailsModal(null);
                          handleSettingsClick();
                        }}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Configurar
                      </Button>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de detalles de insight */}
      <AnimatePresence>
        {showInsightDetailsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowInsightDetailsModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Detalles de Insight</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowInsightDetailsModal(null)}
                  aria-label="Cerrar modal"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              {showInsightDetailsModal && (() => {
                const insight = mockInsights.find(i => i.id === showInsightDetailsModal);
                if (!insight) return null;
                
                return (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      {insight.icon}
                      <div>
                        <h4 className="font-bold text-lg">{insight.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          insight.priority === 'high' ? 'bg-destructive/10 text-destructive' :
                          insight.priority === 'medium' ? 'bg-warning/10 text-warning' :
                          'bg-success/10 text-success'
                        }`}>
                          {insight.priority}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground">{insight.message}</p>
                    
                    {insight.actionable && insight.actionLabel && (
                      <Button
                        className="w-full"
                        onClick={() => {
                          setShowInsightDetailsModal(null);
                          navigate('/dashboard');
                        }}
                      >
                        {insight.actionLabel}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
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
                <h3 className="text-xl font-semibold">Configuración de Ahorros</h3>
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
                  Configura tus preferencias de ahorro y automatización.
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
                  Selecciona el formato y período para tu reporte de ahorros.
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

      {/* Modal de tutorial */}
      <AnimatePresence>
        {showTutorialModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowTutorialModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Tutorial de Ahorros</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTutorialModal(false)}
                  aria-label="Cerrar modal"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Aprende cómo maximizar tus ahorros con estrategias inteligentes.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <Target className="w-5 h-5 text-blue-500" />
                    <div>
                      <h4 className="font-medium">Crear Metas</h4>
                      <p className="text-sm text-muted-foreground">Define objetivos claros y medibles</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <Zap className="w-5 h-5 text-emerald-500" />
                    <div>
                      <h4 className="font-medium">Estrategias Automáticas</h4>
                      <p className="text-sm text-muted-foreground">Configura ahorros automáticos</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-purple-500" />
                    <div>
                      <h4 className="font-medium">Seguimiento</h4>
                      <p className="text-sm text-muted-foreground">Monitorea tu progreso</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-end space-x-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowTutorialModal(false)}
                  >
                    Cerrar
                  </Button>
                  <Button
                    onClick={() => {
                      setShowTutorialModal(false);
                      navigate('/education');
                    }}
                  >
                    <Info className="w-4 h-4 mr-2" />
                    Ver Más Tutoriales
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