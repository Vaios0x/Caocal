import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserData } from '@/hooks/useUserData.js';
import { IncomeVolatilityChart } from '@components/dashboard/IncomeVolatilityChart';
import { RecentEarnings } from '@components/dashboard/RecentEarnings';
import { SavingsGoalMeter } from '@components/dashboard/SavingsGoalMeter';
import { useNavigate } from 'react-router-dom';
import { Button } from '@components/ui/Button';
import { Card, CardContent } from '@components/ui/Card';
import { 
  Sparkles, 
  Eye, 
  EyeOff, 
  PieChart, 
  X,
  Settings,
  Star,
  Calculator,
  DollarSign,
  Target,
  ChevronUp,
  ChevronDown,
  CheckCircle,
  Info,
  AlertCircle,
  ChevronRight,
  ArrowRight,
  Minus,
  Plus,
  Bell
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { isLoading, error, earnings, portfolio } = useUserData();
  const [showSensitiveData, setShowSensitiveData] = useState(false);
  const [showRateModal, setShowRateModal] = useState(false);
  const [showInsightModal, setShowInsightModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState<string | null>(null);
  const [expandedInsights, setExpandedInsights] = useState<string[]>([]);
  const [newSavingsRate, setNewSavingsRate] = useState(5);
  
  const [quickActions] = useState([
    { id: 1, title: 'Ajustar Tasa', icon: Settings, action: 'adjust-rate', color: 'blue' },
    { id: 2, title: 'Ver Portafolio', icon: PieChart, action: 'view-portfolio', color: 'purple' },
    { id: 3, title: 'Educación', icon: Star, action: 'education', color: 'emerald' },
    { id: 4, title: 'Calculadoras', icon: Calculator, action: 'calculators', color: 'orange' }
  ]);

  // Calcular estadísticas dinámicas
  const earningsData = Array.isArray(earnings) ? earnings : [];
  const totalEarnings = earningsData.reduce((sum: number, earning: any) => sum + earning.amount, 0);
  const portfolioValue = (portfolio as any)?.totalValue || 0;
  const savingsRate = 5; // Valor por defecto ya que user no tiene savingsRate
  const monthlyGoal = 200;

  // Simular datos de notificaciones
  const notifications = [
    { id: 1, type: 'success', message: 'Meta de ahorro alcanzada', time: '2h', details: 'Has completado tu meta mensual de ahorro antes de la fecha límite.' },
    { id: 2, type: 'info', message: 'Nueva recomendación disponible', time: '4h', details: 'Nuestro sistema de IA ha generado una nueva recomendación personalizada para optimizar tus inversiones.' },
    { id: 3, type: 'warning', message: 'Tasa de ahorro baja', time: '1d', details: 'Tu tasa de ahorro actual está por debajo del promedio recomendado. Considera aumentarla para alcanzar tus metas más rápido.' }
  ];

  // Datos de insights de IA
  const aiInsights = [
    {
      id: 'savings-rate',
      title: 'Aumenta tu tasa de ahorro',
      description: 'Considera subir al 8% para alcanzar tu meta más rápido',
      action: 'Aplicar',
      impact: 'high',
      category: 'savings'
    },
    {
      id: 'diversify-income',
      title: 'Diversifica tus ingresos',
      description: 'Explora nuevas oportunidades en la gig economy',
      action: 'Explorar',
      impact: 'medium',
      category: 'income'
    },
    {
      id: 'optimize-schedule',
      title: 'Optimiza tus horarios',
      description: 'Los martes y jueves son tus días más productivos',
      action: 'Ver Análisis',
      impact: 'medium',
      category: 'productivity'
    }
  ];

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'adjust-rate':
        setShowRateModal(true);
        break;
      case 'view-portfolio':
        navigate('/portfolio');
        break;
      case 'education':
        navigate('/education');
        break;
      case 'calculators':
        navigate('/calculators');
        break;
      default:
        break;
    }
  };

  const handleInsightClick = (insightId: string) => {
    if (expandedInsights.includes(insightId)) {
      setExpandedInsights(expandedInsights.filter(id => id !== insightId));
    } else {
      setExpandedInsights([...expandedInsights, insightId]);
    }
  };

  const handleNotificationClick = (notificationId: string) => {
    setShowNotificationModal(notificationId);
  };

  const handleApplyInsight = (insightId: string) => {
    switch (insightId) {
      case 'savings-rate':
        setShowRateModal(true);
        break;
      case 'diversify-income':
        navigate('/earnings');
        break;
      case 'optimize-schedule':
        navigate('/ai-insights');
        break;
      default:
        break;
    }
  };

  const handleSaveRate = () => {
    // Aquí se implementaría la lógica para guardar la nueva tasa
    console.log('Nueva tasa de ahorro:', newSavingsRate);
    setShowRateModal(false);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      default: return 'text-green-500 bg-green-50 dark:bg-green-900/20';
    }
  };

  const getImpactLabel = (impact: string) => {
    switch (impact) {
      case 'high': return 'Alto Impacto';
      case 'medium': return 'Impacto Medio';
      default: return 'Bajo Impacto';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-blue-600 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-blue-600 rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-400 animate-pulse text-lg font-medium">Cargando tu dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto border border-red-200 dark:border-red-800">
            <span className="text-red-600 dark:text-red-400 text-3xl">⚠️</span>
          </div>
          <div className="space-y-2">
            <p className="text-red-600 dark:text-red-400 text-lg font-semibold">Error al cargar el dashboard</p>
            <p className="text-slate-600 dark:text-slate-400 font-medium">Intenta recargar la página</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

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
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent mb-4 leading-tight">
              Tu Dashboard Financiero
            </h1>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full animate-pulse-slow border-2 border-white dark:border-slate-900"></div>
          </div>
          <p className="text-slate-600 dark:text-slate-400 max-w-4xl mx-auto text-lg sm:text-xl leading-relaxed font-normal">
            Bienvenido a tu centro de control financiero. Aquí puedes ver el estado de tus ingresos, 
            ahorros y portafolio de inversiones en tiempo real.
          </p>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-8">
            <div className="flex items-center space-x-3 text-sm text-slate-600 dark:text-slate-400">
              <div className="w-3 h-3 bg-blue-500 rounded-full border border-blue-300 dark:border-blue-700"></div>
              <span className="font-medium">Inteligente</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-slate-600 dark:text-slate-400">
              <div className="w-3 h-3 bg-purple-500 rounded-full border border-purple-300 dark:border-purple-700"></div>
              <span className="font-medium">Seguro</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-slate-600 dark:text-slate-400">
              <div className="w-3 h-3 bg-emerald-500 rounded-full border border-emerald-300 dark:border-emerald-700"></div>
              <span className="font-medium">Creciente</span>
            </div>
          </div>
        </div>

        {/* Estadísticas rápidas mejoradas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Card className="card-hover bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Ingresos Totales</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">
                      ${showSensitiveData ? totalEarnings.toFixed(2) : '***.**'}
                    </span>
                    <button
                      onClick={() => setShowSensitiveData(!showSensitiveData)}
                      className="p-1 hover:bg-blue-100 dark:hover:bg-blue-800 rounded transition-colors"
                    >
                      {showSensitiveData ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Portafolio</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    ${showSensitiveData ? portfolioValue.toFixed(2) : '***.**'}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                  <PieChart className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-200 dark:border-emerald-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Tasa de Ahorro</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {savingsRate}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Meta Mensual</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    ${monthlyGoal}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Acciones rápidas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Acciones Rápidas</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => handleQuickAction(action.action)}
              >
                <div className="flex flex-col items-center space-y-3 text-center">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    action.color === 'blue' ? 'bg-blue-600' :
                    action.color === 'purple' ? 'bg-purple-600' :
                    action.color === 'emerald' ? 'bg-emerald-600' :
                    'bg-orange-600'
                  }`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{action.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Grid principal */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 lg:gap-12">
        {/* Columna izquierda - Análisis de Ingresos */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="xl:col-span-2 flex flex-col space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex-1"
          >
            <IncomeVolatilityChart />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="flex-1"
          >
            <RecentEarnings />
          </motion.div>
        </motion.div>

        {/* Columna derecha - Plan de Ahorro y Widgets */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="flex-1"
          >
            <SavingsGoalMeter />
          </motion.div>

          {/* Widget de IA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">💡 Insights de IA</h3>
            <Card className="card-hover bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-700">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">Recomendación Inteligente</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Basada en tus patrones</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowInsightModal(true)}
                      className="border-purple-300 text-purple-600 hover:bg-purple-50"
                    >
                      Ver Todas
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {aiInsights.map((insight, index) => (
                      <motion.div
                        key={insight.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 1.4 + index * 0.1 }}
                        className="border border-purple-200 dark:border-purple-700 rounded-lg p-3 bg-white/50 dark:bg-slate-800/50"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              insight.impact === 'high' ? 'bg-emerald-500' :
                              insight.impact === 'medium' ? 'bg-blue-500' :
                              'bg-purple-500'
                            }`}></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-slate-900 dark:text-white">{insight.title}</p>
                              <p className="text-xs text-slate-600 dark:text-slate-400">{insight.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleApplyInsight(insight.id)}
                              className="text-xs"
                            >
                              {insight.action}
                            </Button>
                            <button
                              onClick={() => handleInsightClick(insight.id)}
                              className="p-1 hover:bg-purple-100 dark:hover:bg-purple-800 rounded"
                            >
                              {expandedInsights.includes(insight.id) ? (
                                <ChevronUp className="w-4 h-4 text-purple-600" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-purple-600" />
                              )}
                            </button>
                          </div>
                        </div>
                        <AnimatePresence>
                          {expandedInsights.includes(insight.id) && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-3 pt-3 border-t border-purple-200 dark:border-purple-700"
                            >
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-slate-600 dark:text-slate-400">Impacto:</span>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(insight.impact)}`}>
                                    {getImpactLabel(insight.impact)}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-slate-600 dark:text-slate-400">Categoría:</span>
                                  <span className="text-xs font-medium text-slate-900 dark:text-white capitalize">
                                    {insight.category}
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notificaciones */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Notificaciones</h3>
            <div className="space-y-3">
              {notifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 1.6 + index * 0.1 }}
                  className={`p-4 rounded-lg border cursor-pointer hover:shadow-md transition-all duration-200 ${
                    notification.type === 'success' 
                      ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-700'
                      : notification.type === 'info'
                      ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700'
                      : 'bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-700'
                  }`}
                  onClick={() => handleNotificationClick(notification.id.toString())}
                >
                  <div className="flex items-start space-x-3">
                    {notification.type === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                    ) : notification.type === 'info' ? (
                      <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{notification.message}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{notification.time}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Call to action mejorado */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.6 }}
        className="bg-gradient-to-r from-blue-50 via-purple-50 to-emerald-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-emerald-900/20 rounded-3xl p-8 sm:p-10 border border-blue-200/50 dark:border-blue-700/50 text-center shadow-xl"
      >
        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
          ¿Quieres optimizar tu estrategia financiera?
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
          Descubre herramientas avanzadas para maximizar tus ahorros y construir riqueza 
          de manera inteligente y sostenible.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/portfolio">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 hover:from-blue-700 hover:via-purple-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-4 rounded-xl">
              <span>Ver Portafolio</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link to="/education">
            <Button variant="outline" size="lg" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 text-lg px-8 py-4 rounded-xl">
              <span>Educación Financiera</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Rate Adjustment Modal */}
      <AnimatePresence>
        {showRateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowRateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 rounded-2xl p-8 max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowRateModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Ajustar Tasa de Ahorro</h3>
                  <p className="text-slate-300">
                    Modifica tu tasa de ahorro para optimizar tus metas financieras.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Tasa Actual:</span>
                    <span className="text-white font-semibold">{savingsRate}%</span>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-slate-300">Nueva Tasa:</label>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setNewSavingsRate(Math.max(1, newSavingsRate - 1))}
                        className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-slate-600"
                      >
                        <Minus className="w-4 h-4 text-white" />
                      </button>
                      <div className="flex-1 text-center">
                        <span className="text-2xl font-bold text-white">{newSavingsRate}%</span>
                      </div>
                      <button
                        onClick={() => setNewSavingsRate(Math.min(50, newSavingsRate + 1))}
                        className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-slate-600"
                      >
                        <Plus className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${(newSavingsRate / 50) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-slate-600 text-slate-300"
                    onClick={() => setShowRateModal(false)}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                    onClick={handleSaveRate}
                  >
                    Guardar
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Insights Modal */}
      <AnimatePresence>
        {showInsightModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowInsightModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 rounded-2xl p-8 max-w-2xl w-full relative max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowInsightModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Insights de IA</h3>
                  <p className="text-slate-300">
                    Recomendaciones personalizadas basadas en tu comportamiento financiero.
                  </p>
                </div>
                
                <div className="space-y-4">
                  {aiInsights.map((insight) => (
                    <div key={insight.id} className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-white">{insight.title}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(insight.impact)}`}>
                              {getImpactLabel(insight.impact)}
                            </span>
                          </div>
                          <p className="text-slate-300 text-sm mb-3">{insight.description}</p>
                          <div className="flex items-center space-x-2">
                            <Button 
                              size="sm"
                              onClick={() => handleApplyInsight(insight.id)}
                              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                            >
                              {insight.action}
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => navigate('/ai-insights')}
                              className="border-slate-600 text-slate-300"
                            >
                              Ver Más
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification Modal */}
      <AnimatePresence>
        {showNotificationModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowNotificationModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 rounded-2xl p-8 max-w-lg w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowNotificationModal(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Bell className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Detalles de Notificación</h3>
                </div>
                
                <div className="space-y-4">
                  {notifications
                    .filter(n => n.id.toString() === showNotificationModal)
                    .map((notification) => (
                      <div key={notification.id} className="space-y-3">
                        <div className={`p-4 rounded-lg border ${
                          notification.type === 'success' 
                            ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-700'
                            : notification.type === 'info'
                            ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700'
                            : 'bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-700'
                        }`}>
                          <div className="flex items-start space-x-3">
                            {notification.type === 'success' ? (
                              <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                            ) : notification.type === 'info' ? (
                              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                            ) : (
                              <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5" />
                            )}
                            <div className="flex-1">
                              <p className="font-medium text-slate-900 dark:text-white">{notification.message}</p>
                              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{notification.details}</p>
                              <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-3">
                          <Button 
                            variant="outline" 
                            className="flex-1 border-slate-600 text-slate-300"
                            onClick={() => setShowNotificationModal(null)}
                          >
                            Cerrar
                          </Button>
                          <Button 
                            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                            onClick={() => navigate('/settings')}
                          >
                            Configurar
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}; 