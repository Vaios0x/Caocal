import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Home, 
  Car, 
  Plane, 
  Ship, 
  Factory, 
  Warehouse,
  BarChart3,
  TrendingUp,
  Shield,
  Zap,
  Globe,
  Coins,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  DollarSign,
  PieChart,
  LineChart,
  Settings,
  Info,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  MapPin,
  Users,
  Award,
  Lock,
  Eye,
  EyeOff,
  Filter,
  Search,
  Download,
  Share2,
  Bookmark,
  Heart
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card';
import { Button } from '@components/ui/Button';
import { Progress } from '@components/ui/Progress';

// Tipos para los RWA Tokens
interface RwaToken {
  id: string;
  name: string;
  symbol: string;
  type: 'real-estate' | 'infrastructure' | 'commodities' | 'art' | 'vehicles' | 'energy';
  value: number;
  percentage: number;
  change: number;
  changePercent: number;
  risk: 'low' | 'medium' | 'high';
  category: string;
  location: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  marketCap: number;
  volume24h: number;
  holders: number;
  yield: number;
  maturity: string;
  minInvestment: number;
  status: 'active' | 'coming-soon' | 'closed';
}

interface TokenCategory {
  id: string;
  name: string;
  description: string;
  totalValue: number;
  tokenCount: number;
  avgYield: number;
  icon: React.ReactNode;
  color: string;
}

export const RwaTokens: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'tokens' | 'categories' | 'analytics'>('overview');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Datos simulados de RWA Tokens
  const rwaTokens: RwaToken[] = [
    {
      id: '1',
      name: 'Torre Corporativa CDMX',
      symbol: 'TCDMX',
      type: 'real-estate',
      value: 2500000,
      percentage: 35,
      change: 125000,
      changePercent: 5.3,
      risk: 'medium',
      category: 'Inmobiliario',
      location: 'CDMX, México',
      description: 'Edificio corporativo clase A en el centro financiero de la Ciudad de México',
      icon: <Building2 className="w-5 h-5" />,
      color: 'text-blue-500',
      marketCap: 25000000,
      volume24h: 1250000,
      holders: 1250,
      yield: 8.5,
      maturity: '10 años',
      minInvestment: 1000,
      status: 'active'
    },
    {
      id: '2',
      name: 'Puerto de Veracruz',
      symbol: 'PVER',
      type: 'infrastructure',
      value: 1800000,
      percentage: 25,
      change: 45000,
      changePercent: 2.5,
      risk: 'low',
      category: 'Infraestructura',
      location: 'Veracruz, México',
      description: 'Operaciones portuarias y logísticas en el Golfo de México',
      icon: <Ship className="w-5 h-5" />,
      color: 'text-emerald-500',
      marketCap: 18000000,
      volume24h: 850000,
      holders: 980,
      yield: 6.2,
      maturity: '15 años',
      minInvestment: 2000,
      status: 'active'
    },
    {
      id: '3',
      name: 'Planta Solar Sonora',
      symbol: 'PSON',
      type: 'energy',
      value: 1500000,
      percentage: 20,
      change: -25000,
      changePercent: -1.7,
      risk: 'medium',
      category: 'Energía',
      location: 'Sonora, México',
      description: 'Parque solar de 100MW con tecnología de última generación',
      icon: <Zap className="w-5 h-5" />,
      color: 'text-yellow-500',
      marketCap: 15000000,
      volume24h: 650000,
      holders: 750,
      yield: 9.8,
      maturity: '20 años',
      minInvestment: 1500,
      status: 'active'
    },
    {
      id: '4',
      name: 'Flota de Camiones Logísticos',
      symbol: 'FCLOG',
      type: 'vehicles',
      value: 800000,
      percentage: 12,
      change: 89300,
      changePercent: 12.6,
      risk: 'high',
      category: 'Transporte',
      location: 'Nacional',
      description: 'Flota de 50 camiones para logística y distribución',
      icon: <Car className="w-5 h-5" />,
      color: 'text-orange-500',
      marketCap: 8000000,
      volume24h: 450000,
      holders: 420,
      yield: 12.5,
      maturity: '8 años',
      minInvestment: 500,
      status: 'active'
    },
    {
      id: '5',
      name: 'Almacén Industrial Monterrey',
      symbol: 'AIMTY',
      type: 'real-estate',
      value: 500000,
      percentage: 8,
      change: 12400,
      changePercent: 2.5,
      risk: 'low',
      category: 'Inmobiliario',
      location: 'Monterrey, México',
      description: 'Almacén industrial de 10,000 m² en zona logística',
      icon: <Warehouse className="w-5 h-5" />,
      color: 'text-purple-500',
      marketCap: 5000000,
      volume24h: 250000,
      holders: 320,
      yield: 7.2,
      maturity: '12 años',
      minInvestment: 800,
      status: 'coming-soon'
    }
  ];

  // Categorías de tokens
  const categories: TokenCategory[] = [
    {
      id: 'real-estate',
      name: 'Inmobiliario',
      description: 'Propiedades comerciales y residenciales',
      totalValue: 3000000,
      tokenCount: 2,
      avgYield: 7.85,
      icon: <Building2 className="w-6 h-6" />,
      color: 'text-blue-500'
    },
    {
      id: 'infrastructure',
      name: 'Infraestructura',
      description: 'Proyectos de infraestructura pública y privada',
      totalValue: 1800000,
      tokenCount: 1,
      avgYield: 6.2,
      icon: <Ship className="w-6 h-6" />,
      color: 'text-emerald-500'
    },
    {
      id: 'energy',
      name: 'Energía',
      description: 'Proyectos de energía renovable y convencional',
      totalValue: 1500000,
      tokenCount: 1,
      avgYield: 9.8,
      icon: <Zap className="w-6 h-6" />,
      color: 'text-yellow-500'
    },
    {
      id: 'vehicles',
      name: 'Transporte',
      description: 'Flotas de vehículos y equipos de transporte',
      totalValue: 800000,
      tokenCount: 1,
      avgYield: 12.5,
      icon: <Car className="w-6 h-6" />,
      color: 'text-orange-500'
    }
  ];

  const totalValue = rwaTokens.reduce((sum, token) => sum + token.value, 0);
  const totalChange = rwaTokens.reduce((sum, token) => sum + token.change, 0);
  const totalChangePercent = (totalChange / (totalValue - totalChange)) * 100;
  const totalYield = rwaTokens.reduce((sum, token) => sum + token.yield, 0) / rwaTokens.length;

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20';
      case 'coming-soon': return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'closed': return 'text-slate-500 bg-slate-50 dark:bg-slate-900/20';
      default: return 'text-slate-500 bg-slate-50 dark:bg-slate-900/20';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'coming-soon': return 'Próximamente';
      case 'closed': return 'Cerrado';
      default: return 'N/A';
    }
  };

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
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg border border-purple-500/20">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            RWA Tokens
          </h1>
        </div>
        <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed">
          Activos del mundo real tokenizados: Invierte en propiedades, infraestructura y bienes físicos a través de blockchain
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
            { id: 'tokens', label: 'Tokens', icon: <Coins className="w-4 h-4" /> },
            { id: 'categories', label: 'Categorías', icon: <PieChart className="w-4 h-4" /> },
            { id: 'analytics', label: 'Análisis', icon: <LineChart className="w-4 h-4" /> }
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
          {/* Resumen de RWA Tokens */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Valor Total</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      ${(totalValue / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center border border-purple-200 dark:border-purple-800">
                    <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
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
                        {totalChange >= 0 ? '+' : ''}${(totalChange / 1000).toFixed(0)}K
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
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Yield Promedio</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalYield.toFixed(1)}%</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-xl flex items-center justify-center border border-yellow-200 dark:border-yellow-800">
                    <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Tokens Activos</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{rwaTokens.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center border border-blue-200 dark:border-blue-800">
                    <Coins className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Gráfico de distribución por categoría */}
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="w-5 h-5 text-primary" />
                <span>Distribución por Categoría</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Gráfico circular simplificado */}
                <div className="flex justify-center">
                  <div className="relative w-48 h-48">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      {categories.map((category, index) => {
                        const startAngle = categories
                          .slice(0, index)
                          .reduce((sum, cat) => sum + (cat.totalValue / totalValue) * 100, 0);
                        const endAngle = startAngle + (category.totalValue / totalValue) * 100;
                        const startRad = (startAngle * 360) / 100;
                        const endRad = (endAngle * 360) / 100;
                        
                        const x1 = 50 + 40 * Math.cos((startRad * Math.PI) / 180);
                        const y1 = 50 + 40 * Math.sin((startRad * Math.PI) / 180);
                        const x2 = 50 + 40 * Math.cos((endRad * Math.PI) / 180);
                        const y2 = 50 + 40 * Math.sin((endRad * Math.PI) / 180);
                        
                        const largeArcFlag = (category.totalValue / totalValue) * 100 > 50 ? 1 : 0;
                        
                        return (
                          <path
                            key={category.id}
                            d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                            fill={category.color.replace('text-', '')}
                            className="transition-all duration-300 hover:opacity-80"
                          />
                        );
                      })}
                    </svg>
                  </div>
                </div>

                {/* Leyenda */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                    >
                      <div className={`w-4 h-4 rounded-full ${category.color.replace('text-', 'bg-')}`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{category.name}</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          ${(category.totalValue / 1000000).toFixed(1)}M
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {category.tokenCount} tokens
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          {category.avgYield.toFixed(1)}% yield
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

      {activeTab === 'tokens' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Controles de vista */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Grid
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <LineChart className="w-4 h-4 mr-2" />
                Lista
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

          {/* Lista de tokens */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rwaTokens.map((token, index) => (
                <motion.div
                  key={token.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="card-hover h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${token.color.replace('text-', 'bg-')} bg-opacity-10 border border-current border-opacity-20`}>
                            {token.icon}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{token.name}</CardTitle>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{token.symbol}</p>
                          </div>
                        </div>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(token.status)}`}>
                          {getStatusLabel(token.status)}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600 dark:text-slate-400">Valor</span>
                          <span className="font-medium">${(token.value / 1000000).toFixed(1)}M</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600 dark:text-slate-400">Yield</span>
                          <span className="font-medium text-emerald-600">{token.yield}%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600 dark:text-slate-400">Riesgo</span>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(token.risk)}`}>
                            {getRiskLabel(token.risk)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600 dark:text-slate-400">Inversión Mín.</span>
                          <span className="font-medium">${token.minInvestment.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-600 dark:text-slate-400">{token.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Users className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-600 dark:text-slate-400">{token.holders} holders</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 pt-4">
                        <Button className="flex-1" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Ver Detalles
                        </Button>
                        <Button variant="outline" size="sm">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <LineChart className="w-5 h-5 text-primary" />
                  <span>Lista de RWA Tokens</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rwaTokens.map((token, index) => (
                    <motion.div
                      key={token.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${token.color.replace('text-', 'bg-')} bg-opacity-10 border border-current border-opacity-20`}>
                          {token.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-white">{token.name}</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{token.symbol} • {token.category}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-medium text-slate-900 dark:text-white">
                            ${(token.value / 1000000).toFixed(1)}M
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{token.yield}% yield</p>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center space-x-1">
                            {token.change >= 0 ? (
                              <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <ArrowDownRight className="w-4 h-4 text-red-500" />
                            )}
                            <span className={`font-medium ${token.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                              {token.change >= 0 ? '+' : ''}{token.changePercent.toFixed(1)}%
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{token.location}</p>
                        </div>
                        
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(token.risk)}`}>
                          {getRiskLabel(token.risk)}
                        </span>

                        <div className="flex items-center space-x-2">
                          <Button size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Ver
                          </Button>
                          <Button variant="outline" size="sm">
                            <Bookmark className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      )}

      {activeTab === 'categories' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Categorías de tokens */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {categories.map((category) => (
              <Card 
                key={category.id} 
                className={`card-hover cursor-pointer transition-all duration-300 ${
                  selectedCategory === category.id ? 'ring-2 ring-purple-500' : ''
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${category.color.replace('text-', 'bg-')} bg-opacity-10 border border-current border-opacity-20`}>
                        {category.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{category.description}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Valor Total</p>
                      <p className="text-lg font-bold text-slate-900 dark:text-white">
                        ${(category.totalValue / 1000000).toFixed(1)}M
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Yield Promedio</p>
                      <p className="text-lg font-bold text-emerald-600">{category.avgYield}%</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Tokens Activos</span>
                      <span className="font-medium">{category.tokenCount}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Volumen 24h</span>
                      <span className="font-medium">${(category.totalValue * 0.05 / 1000000).toFixed(1)}M</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full mt-4"
                    variant={selectedCategory === category.id ? "default" : "outline"}
                  >
                    {selectedCategory === category.id ? 'Categoría Seleccionada' : 'Explorar Categoría'}
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
                <span>Información sobre RWA Tokens</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Lock className="w-5 h-5 text-emerald-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white">Seguridad Regulatoria</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Todos los tokens cumplen con regulaciones financieras y están respaldados por activos reales.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white">Custodia Segura</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Los activos físicos están custodiados por instituciones financieras autorizadas.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Globe className="w-5 h-5 text-purple-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white">Liquidez Global</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Acceso a mercados globales con liquidez 24/7 a través de blockchain.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Award className="w-5 h-5 text-orange-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white">Transparencia Total</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Toda la información de los activos está disponible en la blockchain.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {activeTab === 'analytics' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Métricas de rendimiento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Market Cap Total</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      ${(rwaTokens.reduce((sum, token) => sum + token.marketCap, 0) / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center border border-blue-200 dark:border-blue-800">
                    <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Volumen 24h</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      ${(rwaTokens.reduce((sum, token) => sum + token.volume24h, 0) / 1000000).toFixed(1)}M
                    </p>
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
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Total Holders</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {rwaTokens.reduce((sum, token) => sum + token.holders, 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center border border-purple-200 dark:border-purple-800">
                    <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Análisis de rendimiento */}
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <LineChart className="w-5 h-5 text-primary" />
                <span>Análisis de Rendimiento</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {rwaTokens.map((token) => (
                  <div key={token.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${token.color.replace('text-', 'bg-')} bg-opacity-10 border border-current border-opacity-20`}>
                          {token.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-white">{token.name}</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{token.symbol}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-slate-900 dark:text-white">{token.yield}%</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Yield anual</p>
                      </div>
                    </div>
                    <Progress value={token.yield} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}; 