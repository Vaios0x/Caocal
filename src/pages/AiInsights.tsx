import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Shield, 
  Globe, 
  BarChart3, 
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Info,
  AlertTriangle,
  Eye,
  Filter,
  Search,
  Bookmark,
  Lightbulb,
  Activity,
  Cpu,
  Database,
  Building2,
  X,
  Download,
  Settings,
  Plus,
  Share2,
  Edit,
  Trash2,
  CheckCircle,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card';
import { Button } from '@components/ui/Button';

// Tipos para las recomendaciones de IA
interface AiRecommendation {
  id: string;
  title: string;
  description: string;
  type: 'investment' | 'savings' | 'risk' | 'opportunity' | 'alert';
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  category: string;
  icon: React.ReactNode;
  color: string;
  action: string;
  timeframe: string;
  potentialReturn?: number;
  riskLevel?: 'low' | 'medium' | 'high';
  tags: string[];
  isNew?: boolean;
  priority: number;
}

interface AiInsight {
  id: string;
  title: string;
  description: string;
  type: 'market' | 'personal' | 'behavioral' | 'predictive';
  accuracy: number;
  dataPoints: number;
  lastUpdated: string;
  icon: React.ReactNode;
  color: string;
  trend: 'up' | 'down' | 'stable';
  value: string;
  change: number;
}

interface AiModel {
  id: string;
  name: string;
  description: string;
  accuracy: number;
  lastTrained: string;
  predictions: number;
  successRate: number;
  icon: React.ReactNode;
  color: string;
  status: 'active' | 'training' | 'updating';
}

export const AiInsights: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'recommendations' | 'insights' | 'models'>('overview');
  const [filterType, setFilterType] = useState<string>('all');
  
  // Estados para modales
  const [showRecommendationModal, setShowRecommendationModal] = useState(false);
  const [showInsightModal, setShowInsightModal] = useState(false);
  const [showModelModal, setShowModelModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showCreateRecommendationModal, setShowCreateRecommendationModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  
  // Estados para datos seleccionados
  const [selectedRecommendationData, setSelectedRecommendationData] = useState<AiRecommendation | null>(null);
  const [selectedInsightData, setSelectedInsightData] = useState<AiInsight | null>(null);
  const [selectedModelData, setSelectedModelData] = useState<AiModel | null>(null);

  // Datos simulados de recomendaciones de IA
  const recommendations: AiRecommendation[] = [
    {
      id: '1',
      title: 'Optimizar Portafolio de Inversiones',
      description: 'Basado en tu perfil de riesgo y tendencias del mercado, recomendamos rebalancear tu portafolio hacia activos más defensivos',
      type: 'investment',
      confidence: 94,
      impact: 'high',
      category: 'Portafolio',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-blue-500',
      action: 'Rebalancear 15% hacia bonos del gobierno',
      timeframe: '1-2 semanas',
      potentialReturn: 6.5,
      riskLevel: 'low',
      tags: ['rebalanceo', 'defensivo', 'bonos'],
      isNew: true,
      priority: 1
    },
    {
      id: '2',
      title: 'Aumentar Ahorro Automático',
      description: 'Tu patrón de gastos sugiere que puedes aumentar el ahorro automático en un 20% sin afectar tu estilo de vida',
      type: 'savings',
      confidence: 87,
      impact: 'medium',
      category: 'Ahorros',
      icon: <Target className="w-5 h-5" />,
      color: 'text-emerald-500',
      action: 'Incrementar ahorro automático a $2,500/mes',
      timeframe: 'Próximo mes',
      tags: ['ahorro', 'automático', 'gastos'],
      priority: 2
    },
    {
      id: '3',
      title: 'Alerta de Riesgo de Mercado',
      description: 'Detectamos señales de volatilidad creciente en el mercado. Considera reducir exposición a acciones de alto riesgo',
      type: 'alert',
      confidence: 92,
      impact: 'high',
      category: 'Riesgo',
      icon: <AlertTriangle className="w-5 h-5" />,
      color: 'text-orange-500',
      action: 'Reducir exposición a acciones de alto riesgo en 25%',
      timeframe: 'Esta semana',
      riskLevel: 'high',
      tags: ['volatilidad', 'protección', 'riesgo'],
      isNew: true,
      priority: 1
    },
    {
      id: '4',
      title: 'Oportunidad en RWA Tokens',
      description: 'Nuestro modelo detecta una oportunidad única en tokens inmobiliarios con yield superior al 8%',
      type: 'opportunity',
      confidence: 78,
      impact: 'medium',
      category: 'Inversiones',
      icon: <Building2 className="w-5 h-5" />,
      color: 'text-purple-500',
      action: 'Considerar inversión en TCDMX y PVER tokens',
      timeframe: '2-4 semanas',
      potentialReturn: 8.5,
      riskLevel: 'medium',
      tags: ['RWA', 'inmobiliario', 'yield'],
      priority: 3
    },
    {
      id: '5',
      title: 'Optimizar Gastos Recurrentes',
      description: 'Identificamos $450/mes en gastos que podrían optimizarse sin afectar tu calidad de vida',
      type: 'savings',
      confidence: 85,
      impact: 'medium',
      category: 'Gastos',
      icon: <DollarSign className="w-5 h-5" />,
      color: 'text-green-500',
      action: 'Revisar suscripciones y servicios duplicados',
      timeframe: 'Este mes',
      tags: ['optimización', 'gastos', 'suscripciones'],
      priority: 2
    }
  ];

  // Insights de IA
  const insights: AiInsight[] = [
    {
      id: '1',
      title: 'Patrón de Gastos Estacional',
      description: 'Detectamos que tus gastos aumentan 15% en diciembre. Considera ajustar tu presupuesto',
      type: 'behavioral',
      accuracy: 89,
      dataPoints: 1247,
      lastUpdated: 'Hace 2 horas',
      icon: <Activity className="w-5 h-5" />,
      color: 'text-blue-500',
      trend: 'up',
      value: '+15%',
      change: 15
    },
    {
      id: '2',
      title: 'Correlación con Mercado Emergente',
      description: 'Tu portafolio muestra alta correlación con mercados emergentes. Considera diversificación',
      type: 'market',
      accuracy: 92,
      dataPoints: 892,
      lastUpdated: 'Hace 4 horas',
      icon: <Globe className="w-5 h-5" />,
      color: 'text-emerald-500',
      trend: 'down',
      value: '0.78',
      change: -0.12
    },
    {
      id: '3',
      title: 'Predicción de Ingresos',
      description: 'Basado en tu historial, se proyecta un aumento del 8% en ingresos para Q2 2024',
      type: 'predictive',
      accuracy: 76,
      dataPoints: 567,
      lastUpdated: 'Hace 1 día',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-purple-500',
      trend: 'up',
      value: '+8%',
      change: 8
    },
    {
      id: '4',
      title: 'Optimización de Impuestos',
      description: 'Identificamos oportunidades para reducir carga fiscal en $2,400 anuales',
      type: 'personal',
      accuracy: 94,
      dataPoints: 334,
      lastUpdated: 'Hace 6 horas',
      icon: <Shield className="w-5 h-5" />,
      color: 'text-orange-500',
      trend: 'stable',
      value: '$2,400',
      change: 0
    }
  ];

  // Modelos de IA
  const models: AiModel[] = [
    {
      id: '1',
      name: 'Predictor de Mercado',
      description: 'Modelo de machine learning para predecir tendencias del mercado',
      accuracy: 87,
      lastTrained: 'Hace 3 días',
      predictions: 1247,
      successRate: 82,
      icon: <Cpu className="w-6 h-6" />,
      color: 'text-blue-500',
      status: 'active'
    },
    {
      id: '2',
      name: 'Analizador de Comportamiento',
      description: 'IA para analizar patrones de gastos y ahorro',
      accuracy: 94,
      lastTrained: 'Hace 1 día',
      predictions: 892,
      successRate: 89,
      icon: <Brain className="w-6 h-6" />,
      color: 'text-emerald-500',
      status: 'active'
    },
    {
      id: '3',
      name: 'Optimizador de Portafolio',
      description: 'Algoritmo para optimización automática de portafolios',
      accuracy: 91,
      lastTrained: 'Hace 5 días',
      predictions: 567,
      successRate: 85,
      icon: <PieChart className="w-6 h-6" />,
      color: 'text-purple-500',
      status: 'training'
    },
    {
      id: '4',
      name: 'Detector de Riesgos',
      description: 'Sistema de alerta temprana para riesgos financieros',
      accuracy: 89,
      lastTrained: 'Hace 2 días',
      predictions: 334,
      successRate: 87,
      icon: <AlertTriangle className="w-6 h-6" />,
      color: 'text-orange-500',
      status: 'updating'
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'text-orange-500 bg-orange-50 dark:bg-orange-900/20';
      case 'low': return 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20';
      default: return 'text-slate-500 bg-slate-50 dark:bg-slate-900/20';
    }
  };

  const getImpactLabel = (impact: string) => {
    switch (impact) {
      case 'high': return 'Alto';
      case 'medium': return 'Medio';
      case 'low': return 'Bajo';
      default: return 'N/A';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20';
      case 'training': return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'updating': return 'text-orange-500 bg-orange-50 dark:bg-orange-900/20';
      default: return 'text-slate-500 bg-slate-50 dark:bg-slate-900/20';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'training': return 'Entrenando';
      case 'updating': return 'Actualizando';
      default: return 'N/A';
    }
  };

  // Funciones de manejo
  const handleRecommendationClick = (recommendation: AiRecommendation) => {
    setSelectedRecommendationData(recommendation);
    setShowRecommendationModal(true);
  };

  const handleInsightClick = (insight: AiInsight) => {
    setSelectedInsightData(insight);
    setShowInsightModal(true);
  };

  const handleModelClick = (model: AiModel) => {
    setSelectedModelData(model);
    setShowModelModal(true);
  };

  const handleSettingsClick = () => {
    setShowSettingsModal(true);
  };

  const handleCreateRecommendation = () => {
    setShowCreateRecommendationModal(true);
  };

  const handleAnalyticsClick = () => {
    setShowAnalyticsModal(true);
  };

  const handleDownloadReport = () => {
    setShowReportModal(true);
  };

  const handleBookmarkRecommendation = (recommendation: AiRecommendation) => {
    console.log('Recomendación marcada:', recommendation.title);
  };

  const handleApplyRecommendation = (recommendation: AiRecommendation) => {
    console.log('Aplicando recomendación:', recommendation.title);
  };

  const handleShareRecommendation = (recommendation: AiRecommendation) => {
    console.log('Compartiendo recomendación:', recommendation.title);
  };

  const handleEditRecommendation = (recommendation: AiRecommendation) => {
    console.log('Editando recomendación:', recommendation.title);
  };

  const handleDeleteRecommendation = (recommendation: AiRecommendation) => {
    console.log('Eliminando recomendación:', recommendation.title);
  };

  const filteredRecommendations = filterType === 'all' 
    ? recommendations 
    : recommendations.filter(rec => rec.type === filterType);

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
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg border border-purple-500/20">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            IA Insights
          </h1>
        </div>
        <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed">
          Recomendaciones inteligentes personalizadas basadas en IA para optimizar tus decisiones financieras
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
            { id: 'recommendations', label: 'Recomendaciones', icon: <Lightbulb className="w-4 h-4" /> },
            { id: 'insights', label: 'Insights', icon: <Brain className="w-4 h-4" /> },
            { id: 'models', label: 'Modelos IA', icon: <Cpu className="w-4 h-4" /> }
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
          {/* Resumen de IA Insights */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="card-hover cursor-pointer" onClick={() => setActiveTab('recommendations')}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Recomendaciones</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {recommendations.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center border border-purple-200 dark:border-purple-800">
                    <Lightbulb className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Precisión Promedio</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {Math.round(recommendations.reduce((sum, rec) => sum + rec.confidence, 0) / recommendations.length)}%
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center border border-emerald-200 dark:border-emerald-800">
                    <Target className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover cursor-pointer" onClick={() => setActiveTab('models')}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Modelos Activos</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {models.filter(m => m.status === 'active').length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center border border-blue-200 dark:border-blue-800">
                    <Cpu className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover cursor-pointer" onClick={() => setActiveTab('insights')}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Insights Generados</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {insights.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-xl flex items-center justify-center border border-pink-200 dark:border-pink-800">
                    <Brain className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Gráfico de distribución por tipo */}
          <Card className="card-hover">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="w-5 h-5 text-primary" />
                  <span>Distribución de Recomendaciones</span>
                </CardTitle>
                <Button variant="outline" size="sm" onClick={handleDownloadReport}>
                  <Download className="w-4 h-4 mr-2" />
                  Descargar Reporte
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Gráfico circular simplificado */}
                <div className="flex justify-center">
                  <div className="relative w-48 h-48">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      {['investment', 'savings', 'risk', 'opportunity', 'alert'].map((type, index) => {
                        const typeCount = recommendations.filter(rec => rec.type === type).length;
                        const percentage = (typeCount / recommendations.length) * 100;
                        const startAngle = ['investment', 'savings', 'risk', 'opportunity', 'alert']
                          .slice(0, index)
                          .reduce((sum, t) => sum + (recommendations.filter(rec => rec.type === t).length / recommendations.length) * 100, 0);
                        const endAngle = startAngle + percentage;
                        const startRad = (startAngle * 360) / 100;
                        const endRad = (endAngle * 360) / 100;
                        
                        const x1 = 50 + 40 * Math.cos((startRad * Math.PI) / 180);
                        const y1 = 50 + 40 * Math.sin((startRad * Math.PI) / 180);
                        const x2 = 50 + 40 * Math.cos((endRad * Math.PI) / 180);
                        const y2 = 50 + 40 * Math.sin((endRad * Math.PI) / 180);
                        
                        const largeArcFlag = percentage > 50 ? 1 : 0;
                        
                        const colors = {
                          investment: '#3B82F6',
                          savings: '#10B981',
                          risk: '#F59E0B',
                          opportunity: '#8B5CF6',
                          alert: '#EF4444'
                        };
                        
                        return (
                          <path
                            key={type}
                            d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                            fill={colors[type as keyof typeof colors]}
                            className="transition-all duration-300 hover:opacity-80"
                          />
                        );
                      })}
                    </svg>
                  </div>
                </div>

                {/* Leyenda */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {[
                    { type: 'investment', label: 'Inversiones', color: '#3B82F6' },
                    { type: 'savings', label: 'Ahorros', color: '#10B981' },
                    { type: 'risk', label: 'Riesgo', color: '#F59E0B' },
                    { type: 'opportunity', label: 'Oportunidades', color: '#8B5CF6' },
                    { type: 'alert', label: 'Alertas', color: '#EF4444' }
                  ].map((item) => {
                    const count = recommendations.filter(rec => rec.type === item.type).length;
                    return (
                      <div
                        key={item.type}
                        className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                      >
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900 dark:text-white">{item.label}</p>
                          <p className="text-xs text-slate-600 dark:text-slate-400">{count} recomendaciones</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {activeTab === 'recommendations' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Filtros */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant={filterType === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('all')}
              >
                Todas
              </Button>
              <Button
                variant={filterType === 'investment' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('investment')}
              >
                Inversiones
              </Button>
              <Button
                variant={filterType === 'savings' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('savings')}
              >
                Ahorros
              </Button>
              <Button
                variant={filterType === 'alert' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('alert')}
              >
                Alertas
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleSettingsClick}>
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Buscar
              </Button>
              <Button variant="outline" size="sm" onClick={handleCreateRecommendation}>
                <Plus className="w-4 h-4 mr-2" />
                Nueva Recomendación
              </Button>
            </div>
          </div>

          {/* Lista de recomendaciones */}
          <div className="space-y-6">
            {filteredRecommendations.map((recommendation, index) => (
              <motion.div
                key={recommendation.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div 
                  className="card-hover cursor-pointer transition-all duration-300"
                  onClick={() => handleRecommendationClick(recommendation)}
                >
                  <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${recommendation.color.replace('text-', 'bg-')} bg-opacity-10 border border-current border-opacity-20`}>
                          {recommendation.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <CardTitle className="text-lg">{recommendation.title}</CardTitle>
                            {recommendation.isNew && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300">
                                Nuevo
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                            {recommendation.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(recommendation.impact)}`}>
                          {getImpactLabel(recommendation.impact)}
                        </span>
                        <div className="text-right">
                          <p className="text-sm font-medium text-slate-900 dark:text-white">
                            {recommendation.confidence}%
                          </p>
                          <p className="text-xs text-slate-600 dark:text-slate-400">Confianza</p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Acción Recomendada</p>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{recommendation.action}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Timeframe</p>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{recommendation.timeframe}</p>
                      </div>
                      {recommendation.potentialReturn && (
                        <div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Retorno Potencial</p>
                          <p className="text-sm font-medium text-emerald-600">{recommendation.potentialReturn}%</p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {recommendation.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" onClick={() => handleRecommendationClick(recommendation)}>
                          <Eye className="w-4 h-4 mr-2" />
                          Ver Detalles
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleBookmarkRecommendation(recommendation)}>
                          <Bookmark className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleApplyRecommendation(recommendation)}>
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'insights' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Insights de IA */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {insights.map((insight, index) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="card-hover h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${insight.color.replace('text-', 'bg-')} bg-opacity-10 border border-current border-opacity-20`}>
                          {insight.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{insight.title}</CardTitle>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{insight.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`flex items-center space-x-1 ${insight.trend === 'up' ? 'text-emerald-600' : insight.trend === 'down' ? 'text-red-600' : 'text-slate-600'}`}>
                          {insight.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : insight.trend === 'down' ? <ArrowDownRight className="w-4 h-4" /> : <span className="w-4 h-4">—</span>}
                          <span className="font-medium">{insight.value}</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          {insight.change > 0 ? '+' : ''}{insight.change}%
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Precisión</p>
                          <p className="text-lg font-bold text-slate-900 dark:text-white">{insight.accuracy}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Datos Analizados</p>
                          <p className="text-lg font-bold text-slate-900 dark:text-white">{insight.dataPoints.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600 dark:text-slate-400">Última actualización</span>
                          <span className="font-medium">{insight.lastUpdated}</span>
                        </div>
                      </div>

                      <Button className="w-full mt-4" size="sm" onClick={() => handleInsightClick(insight)}>
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Análisis Completo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'models' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Modelos de IA */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {models.map((model) => (
              <Card 
                key={model.id} 
                className="card-hover"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${model.color.replace('text-', 'bg-')} bg-opacity-10 border border-current border-opacity-20`}>
                        {model.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{model.name}</CardTitle>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{model.description}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(model.status)}`}>
                      {getStatusLabel(model.status)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Precisión</p>
                      <p className="text-lg font-bold text-slate-900 dark:text-white">{model.accuracy}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Tasa de Éxito</p>
                      <p className="text-lg font-bold text-emerald-600">{model.successRate}%</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Predicciones</span>
                      <span className="font-medium">{model.predictions.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Último entrenamiento</span>
                      <span className="font-medium">{model.lastTrained}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full mt-4"
                    variant="outline"
                    onClick={() => handleModelClick(model)}
                  >
                    Ver Detalles del Modelo
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Información adicional */}
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Info className="w-5 h-5 text-primary" />
                <span>Información sobre los Modelos de IA</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Cpu className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white">Machine Learning</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Nuestros modelos utilizan algoritmos de machine learning avanzados para generar predicciones precisas.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Database className="w-5 h-5 text-emerald-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white">Datos en Tiempo Real</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Los modelos se actualizan constantemente con datos del mercado en tiempo real.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-purple-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white">Privacidad Garantizada</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Todos los datos se procesan de forma segura y anónima para proteger tu privacidad.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="w-5 h-5 text-orange-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white">Mejora Continua</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Los modelos se entrenan continuamente para mejorar su precisión y rendimiento.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Modales */}
      
      {/* Modal de Detalles de Recomendación */}
      {showRecommendationModal && selectedRecommendationData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Detalles de Recomendación
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowRecommendationModal(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedRecommendationData.color.replace('text-', 'bg-')} bg-opacity-10 border border-current border-opacity-20`}>
                  {selectedRecommendationData.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {selectedRecommendationData.title}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    {selectedRecommendationData.description}
                  </p>
                  <div className="flex items-center space-x-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getImpactColor(selectedRecommendationData.impact)}`}>
                      {getImpactLabel(selectedRecommendationData.impact)}
                    </span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {selectedRecommendationData.confidence}% confianza
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-slate-900 dark:text-white mb-2">Acción Recomendada</h5>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{selectedRecommendationData.action}</p>
                </div>
                <div>
                  <h5 className="font-medium text-slate-900 dark:text-white mb-2">Timeframe</h5>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{selectedRecommendationData.timeframe}</p>
                </div>
                {selectedRecommendationData.potentialReturn && (
                  <div>
                    <h5 className="font-medium text-slate-900 dark:text-white mb-2">Retorno Potencial</h5>
                    <p className="text-sm text-emerald-600 font-medium">{selectedRecommendationData.potentialReturn}%</p>
                  </div>
                )}
                {selectedRecommendationData.riskLevel && (
                  <div>
                    <h5 className="font-medium text-slate-900 dark:text-white mb-2">Nivel de Riesgo</h5>
                    <p className="text-sm text-slate-600 dark:text-slate-400 capitalize">{selectedRecommendationData.riskLevel}</p>
                  </div>
                )}
              </div>

              <div>
                <h5 className="font-medium text-slate-900 dark:text-white mb-2">Tags</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedRecommendationData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-2">
                  <Button onClick={() => handleApplyRecommendation(selectedRecommendationData)}>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Aplicar Recomendación
                  </Button>
                  <Button variant="outline" onClick={() => handleBookmarkRecommendation(selectedRecommendationData)}>
                    <Bookmark className="w-4 h-4 mr-2" />
                    Guardar
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleShareRecommendation(selectedRecommendationData)}>
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEditRecommendation(selectedRecommendationData)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteRecommendation(selectedRecommendationData)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Detalles de Insight */}
      {showInsightModal && selectedInsightData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Análisis Completo
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowInsightModal(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedInsightData.color.replace('text-', 'bg-')} bg-opacity-10 border border-current border-opacity-20`}>
                  {selectedInsightData.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {selectedInsightData.title}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    {selectedInsightData.description}
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center space-x-1 ${selectedInsightData.trend === 'up' ? 'text-emerald-600' : selectedInsightData.trend === 'down' ? 'text-red-600' : 'text-slate-600'}`}>
                      {selectedInsightData.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : selectedInsightData.trend === 'down' ? <ArrowDownRight className="w-4 h-4" /> : <span className="w-4 h-4">—</span>}
                      <span className="font-medium">{selectedInsightData.value}</span>
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {selectedInsightData.accuracy}% precisión
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-slate-900 dark:text-white mb-2">Datos Analizados</h5>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{selectedInsightData.dataPoints.toLocaleString()}</p>
                </div>
                <div>
                  <h5 className="font-medium text-slate-900 dark:text-white mb-2">Última Actualización</h5>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{selectedInsightData.lastUpdated}</p>
                </div>
                <div>
                  <h5 className="font-medium text-slate-900 dark:text-white mb-2">Cambio</h5>
                  <p className={`text-lg font-bold ${selectedInsightData.change > 0 ? 'text-emerald-600' : selectedInsightData.change < 0 ? 'text-red-600' : 'text-slate-600'}`}>
                    {selectedInsightData.change > 0 ? '+' : ''}{selectedInsightData.change}%
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-slate-900 dark:text-white mb-2">Tipo de Insight</h5>
                  <p className="text-sm text-slate-600 dark:text-slate-400 capitalize">{selectedInsightData.type}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                <Button onClick={() => handleAnalyticsClick()}>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Ver Análisis Avanzado
                </Button>
                <Button variant="outline" onClick={() => handleDownloadReport()}>
                  <Download className="w-4 h-4 mr-2" />
                  Descargar Reporte
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Detalles del Modelo */}
      {showModelModal && selectedModelData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Detalles del Modelo
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowModelModal(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedModelData.color.replace('text-', 'bg-')} bg-opacity-10 border border-current border-opacity-20`}>
                  {selectedModelData.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {selectedModelData.name}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    {selectedModelData.description}
                  </p>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedModelData.status)}`}>
                    {getStatusLabel(selectedModelData.status)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-slate-900 dark:text-white mb-2">Precisión</h5>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{selectedModelData.accuracy}%</p>
                </div>
                <div>
                  <h5 className="font-medium text-slate-900 dark:text-white mb-2">Tasa de Éxito</h5>
                  <p className="text-lg font-bold text-emerald-600">{selectedModelData.successRate}%</p>
                </div>
                <div>
                  <h5 className="font-medium text-slate-900 dark:text-white mb-2">Predicciones</h5>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{selectedModelData.predictions.toLocaleString()}</p>
                </div>
                <div>
                  <h5 className="font-medium text-slate-900 dark:text-white mb-2">Último Entrenamiento</h5>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{selectedModelData.lastTrained}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                <Button onClick={() => handleAnalyticsClick()}>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Ver Métricas Detalladas
                </Button>
                <Button variant="outline" onClick={() => handleSettingsClick()}>
                  <Settings className="w-4 h-4 mr-2" />
                  Configurar Modelo
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Configuración */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Configuración de IA
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSettingsModal(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white mb-2">Filtros de Recomendaciones</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm text-slate-600 dark:text-slate-400">Inversiones</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm text-slate-600 dark:text-slate-400">Ahorros</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm text-slate-600 dark:text-slate-400">Alertas</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm text-slate-600 dark:text-slate-400">Oportunidades</span>
                    </label>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white mb-2">Notificaciones</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm text-slate-600 dark:text-slate-400">Nuevas recomendaciones</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm text-slate-600 dark:text-slate-400">Alertas de riesgo</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm text-slate-600 dark:text-slate-400">Actualizaciones de modelos</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                <Button variant="outline" onClick={() => setShowSettingsModal(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => setShowSettingsModal(false)}>
                  Guardar Configuración
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Nueva Recomendación */}
      {showCreateRecommendationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Nueva Recomendación
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCreateRecommendationModal(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                  Título
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  placeholder="Ingresa el título de la recomendación"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                  Descripción
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  rows={3}
                  placeholder="Describe la recomendación"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                  Tipo
                </label>
                <select className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white">
                  <option value="investment">Inversión</option>
                  <option value="savings">Ahorro</option>
                  <option value="risk">Riesgo</option>
                  <option value="opportunity">Oportunidad</option>
                  <option value="alert">Alerta</option>
                </select>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                <Button variant="outline" onClick={() => setShowCreateRecommendationModal(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => setShowCreateRecommendationModal(false)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Crear Recomendación
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Analytics */}
      {showAnalyticsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Análisis Avanzado
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAnalyticsModal(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-slate-600 dark:text-slate-400">Precisión Promedio</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">87%</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-slate-600 dark:text-slate-400">Recomendaciones Aplicadas</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">24</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-slate-600 dark:text-slate-400">ROI Promedio</p>
                      <p className="text-2xl font-bold text-emerald-600">+12.5%</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-slate-900 dark:text-white">Métricas de Rendimiento</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Tasa de Aceptación</span>
                    <span className="font-medium text-slate-900 dark:text-white">78%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Tiempo de Respuesta</span>
                    <span className="font-medium text-slate-900 dark:text-white">2.3s</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Uptime del Sistema</span>
                    <span className="font-medium text-slate-900 dark:text-white">99.9%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Reporte */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Descargar Reporte
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowReportModal(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white mb-2">Tipo de Reporte</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="reportType" className="rounded" defaultChecked />
                      <span className="text-sm text-slate-600 dark:text-slate-400">Reporte Completo</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="reportType" className="rounded" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">Solo Recomendaciones</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="reportType" className="rounded" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">Solo Insights</span>
                    </label>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white mb-2">Formato</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="format" className="rounded" defaultChecked />
                      <span className="text-sm text-slate-600 dark:text-slate-400">PDF</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="format" className="rounded" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">Excel</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="format" className="rounded" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">CSV</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                <Button variant="outline" onClick={() => setShowReportModal(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => setShowReportModal(false)}>
                  <Download className="w-4 h-4 mr-2" />
                  Descargar Reporte
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Información */}
      {showInfoModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Información sobre IA Insights
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowInfoModal(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Brain className="w-5 h-5 text-purple-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white">Inteligencia Artificial</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Nuestros modelos de IA analizan tus datos financieros para generar recomendaciones personalizadas.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-emerald-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white">Privacidad Garantizada</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Todos los datos se procesan de forma segura y anónima para proteger tu privacidad.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-orange-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white">Tiempo Real</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Los insights se actualizan constantemente con datos del mercado en tiempo real.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Target className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white">Precisión Alta</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Nuestros modelos tienen una precisión promedio del 87% en sus predicciones.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 