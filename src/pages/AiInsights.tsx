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
  Building2
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
  const [selectedRecommendation, setSelectedRecommendation] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'recommendations' | 'insights' | 'models'>('overview');
  const [filterType, setFilterType] = useState<string>('all');

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
            <Card className="card-hover">
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

            <Card className="card-hover">
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

            <Card className="card-hover">
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
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="w-5 h-5 text-primary" />
                <span>Distribución de Recomendaciones</span>
              </CardTitle>
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
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Buscar
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
                  className={`card-hover cursor-pointer transition-all duration-300 ${
                    selectedRecommendation === recommendation.id ? 'ring-2 ring-purple-500' : ''
                  }`} 
                  onClick={() => setSelectedRecommendation(recommendation.id)}
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
                        <Button size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Ver Detalles
                        </Button>
                        <Button variant="outline" size="sm">
                          <Bookmark className="w-4 h-4" />
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

                      <Button className="w-full mt-4" size="sm">
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
    </div>
  );
}; 