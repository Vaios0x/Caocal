import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Quote, 
  Sparkles, 
  Crown, 
  Eye, 
  Lightbulb, 
  Activity, 
  X,
  TrendingUp,
  Shield,
  Zap,
  Target,
  Users,
  DollarSign,
  Clock,
  ArrowRight,
  Play,
  BarChart3,
  AlertCircle,
  Star,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Settings,
  Info,
  Award,
  CheckCircle,
  Lock
} from 'lucide-react';
import { Card, CardContent } from '@components/ui/Card';
import { Button } from '@components/ui/Button';

// Datos de testimonios
const testimonials = [
  {
    id: 1,
    name: "María González",
    role: "Inversionista Retail",
    avatar: "👩‍💼",
    content: "Caocal transformó mi forma de invertir. En solo 6 meses logré diversificar mi portafolio y aumentar mis rendimientos en un 23%.",
    rating: 5,
    priority: "high"
  },
  {
    id: 2,
    name: "Carlos Mendoza",
    role: "Emprendedor",
    avatar: "👨‍💻",
    content: "La plataforma es increíblemente intuitiva. Las herramientas de análisis me ayudaron a tomar decisiones más informadas.",
    rating: 5,
    priority: "medium"
  },
  {
    id: 3,
    name: "Ana Rodríguez",
    role: "Profesional Independiente",
    avatar: "👩‍🎓",
    content: "Finalmente encontré una plataforma que entiende mis necesidades. El soporte es excepcional y los resultados hablan por sí solos.",
    rating: 5,
    priority: "high"
  }
];

// Datos de características principales
const features = [
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Análisis Inteligente",
    description: "IA avanzada que analiza tus patrones de gasto y te sugiere las mejores estrategias de inversión.",
    color: "from-blue-600 to-indigo-600",
    progress: 95,
    priority: "high"
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Seguridad Bancaria",
    description: "Protección de nivel bancario con encriptación de 256 bits y autenticación multifactor.",
    color: "from-purple-600 to-pink-600",
    progress: 88,
    priority: "high"
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Inversiones Automáticas",
    description: "Configura reglas personalizadas y deja que nuestro sistema invierta automáticamente por ti.",
    color: "from-emerald-600 to-teal-600",
    progress: 72,
    priority: "medium"
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "Metas Personalizadas",
    description: "Define tus objetivos financieros y recibe recomendaciones específicas para alcanzarlos.",
    color: "from-orange-600 to-red-600",
    progress: 64,
    priority: "high"
  }
];

// Datos de estadísticas
const stats = [
  { number: "50,000+", label: "Usuarios Activos", icon: <Users className="w-6 h-6" />, progress: 85 },
  { number: "$2.5M+", label: "Capital Gestionado", icon: <DollarSign className="w-6 h-6" />, progress: 92 },
  { number: "23%", label: "Rendimiento Promedio", icon: <TrendingUp className="w-6 h-6" />, progress: 78 },
  { number: "99.9%", label: "Uptime Garantizado", icon: <Shield className="w-6 h-6" />, progress: 99 }
];

// Datos de insights
const insights = [
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "¡Meta Completada!",
    description: "Has completado tu meta de \"Nueva Laptop\" antes de la fecha límite",
    priority: "high",
    type: "success"
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Tendencia Positiva",
    description: "Considera aumentar tu tasa de ahorro al 8%",
    priority: "medium",
    type: "recommendation"
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Optimiza Horarios",
    description: "Los martes y jueves son tus días más productivos",
    priority: "medium",
    type: "insight"
  }
];

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [showInsightModal, setShowInsightModal] = useState<string | null>(null);
  const [showFeatureModal, setShowFeatureModal] = useState<string | null>(null);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'High';
      case 'medium': return 'Medium';
      default: return 'Low';
    }
  };

  const handleStartFree = () => {
    navigate('/dashboard');
  };

  const handleViewDemo = () => {
    setShowDemoModal(true);
  };

  const handleViewSecurity = () => {
    setShowSecurityModal(true);
  };

  const handleInsightClick = (insightTitle: string) => {
    setShowInsightModal(insightTitle);
  };

  const handleFeatureClick = (featureTitle: string) => {
    setShowFeatureModal(featureTitle);
  };

  const handleCreateAccount = () => {
    navigate('/settings');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 sm:space-y-8 order-1"
            >
              <div className="space-y-4 sm:space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex items-center space-x-2"
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <span className="text-blue-400 font-medium text-sm sm:text-base">Wealth as a Service</span>
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                >
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                    Revoluciona
                  </span>
                  <br />
                  <span className="text-white">tu Futuro Financiero</span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed"
                >
                  La primera plataforma que combina inteligencia artificial, seguridad bancaria y automatización para maximizar tus inversiones. Únete a más de 50,000 inversionistas que ya transformaron su patrimonio.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              >
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold"
                  onClick={handleStartFree}
                >
                  <span>Empezar Gratis</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-slate-600 text-slate-300 hover:bg-slate-800 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
                  onClick={handleViewDemo}
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span>Ver Demo</span>
                </Button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="flex flex-wrap items-center gap-4 sm:gap-6 pt-6 sm:pt-8"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-slate-400 text-xs sm:text-sm">Seguridad Bancaria</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-slate-400 text-xs sm:text-sm">IA Avanzada</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-slate-400 text-xs sm:text-sm">Automatización</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Hero Visual - Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative order-2 mb-8 lg:mb-0"
            >
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-slate-700">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Caocal</h3>
                      <p className="text-slate-400 text-sm">Wealth as a Service</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                      <Eye className="w-4 h-4 text-slate-400" />
                    </div>
                    <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-xl p-4 border border-blue-500/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">Ingresos Totales</p>
                        <p className="text-white font-bold text-lg">$***.**</p>
                      </div>
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-blue-400" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-xl p-4 border border-purple-500/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">Portafolio</p>
                        <p className="text-white font-bold text-lg">$***.**</p>
                      </div>
                      <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-purple-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Indicators */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Progreso</span>
                    <span className="text-white font-semibold">64.0%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '64%' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mx-auto mb-3 sm:mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">{stat.number}</h3>
                <p className="text-slate-400 mb-2 sm:mb-3 text-sm sm:text-base">{stat.label}</p>
                <div className="w-full bg-slate-700 rounded-full h-1.5 sm:h-2">
                  <div className="bg-red-500 h-1.5 sm:h-2 rounded-full" style={{ width: `${stat.progress}%` }}></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                Mis Estrategias
              </span>
              <br />
              <span className="text-white">de Inversión</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto px-4">
              Combinamos tecnología de vanguardia con experiencia financiera para ofrecerte la plataforma más avanzada de gestión patrimonial.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card 
                  className="h-full bg-slate-800/50 border-red-500/30 hover:border-red-500/50 transition-all duration-300 hover:shadow-xl relative cursor-pointer"
                  onClick={() => handleFeatureClick(feature.title)}
                >
                  <CardContent className="p-4 sm:p-6">
                    {/* Priority Indicator */}
                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                      <div className={`w-5 h-5 sm:w-6 sm:h-6 ${getPriorityColor(feature.priority)} rounded-full flex items-center justify-center`}>
                        <AlertCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                      </div>
                    </div>
                    
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 sm:mb-6`}>
                      <div className="text-white">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">{feature.title}</h3>
                    <p className="text-slate-300 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">{feature.description}</p>
                    
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-sm">Progreso</span>
                        <span className="text-white font-semibold">{feature.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: `${feature.progress}%` }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                Insights y
              </span>
              <br />
              <span className="text-white">Consejos</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {insights.map((insight, index) => (
              <motion.div
                key={insight.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card 
                  className="bg-slate-800/50 border-slate-700 p-4 sm:p-6 relative cursor-pointer hover:border-slate-600 transition-all duration-300"
                  onClick={() => handleInsightClick(insight.title)}
                >
                  <CardContent className="space-y-3 sm:space-y-4">
                    {/* Priority Tag */}
                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                      <div className={`px-2 py-1 ${getPriorityColor(insight.priority)} rounded-full text-xs text-white font-medium`}>
                        {getPriorityText(insight.priority)}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                        {insight.icon}
                      </div>
                      <h3 className="text-white font-semibold">{insight.title}</h3>
                    </div>
                    
                    <p className="text-slate-300 leading-relaxed">
                      {insight.description}
                    </p>
                    
                    <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                      Ver detalles
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                Lo que dicen
              </span>
              <br />
              <span className="text-white">nuestros usuarios</span>
            </h2>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <Card className="bg-slate-800/50 border-red-500/30 p-8 relative">
                  <CardContent className="space-y-6">
                    {/* Priority Indicator */}
                    <div className="absolute top-4 right-4">
                      <div className={`px-3 py-1 ${getPriorityColor(testimonials[currentTestimonial].priority)} rounded-full text-sm text-white font-medium`}>
                        {getPriorityText(testimonials[currentTestimonial].priority)}
                      </div>
                    </div>
                    
                    <div className="text-4xl mb-4">{testimonials[currentTestimonial].avatar}</div>
                    <Quote className="w-8 h-8 text-slate-400 mx-auto mb-4" />
                    <p className="text-xl text-slate-300 leading-relaxed mb-6">
                      "{testimonials[currentTestimonial].content}"
                    </p>
                    <div className="space-y-2">
                      <h4 className="text-white font-semibold text-lg">{testimonials[currentTestimonial].name}</h4>
                      <p className="text-slate-400">{testimonials[currentTestimonial].role}</p>
                      <div className="flex items-center justify-center space-x-1">
                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center space-x-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="border-slate-600 text-slate-400 hover:bg-slate-800"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-blue-500' : 'bg-slate-600'
                    }`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="border-slate-600 text-slate-400 hover:bg-slate-800"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-red-500/30 p-12">
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                      ¿Listo para
                    </span>
                    <br />
                    <span className="text-white">transformar tu futuro?</span>
                  </h2>
                  <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                    Únete a miles de inversionistas que ya están maximizando sus rendimientos con Caocal. Comienza tu viaje hacia la libertad financiera hoy mismo.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold"
                    onClick={handleCreateAccount}
                  >
                    <Crown className="w-5 h-5 mr-2" />
                    <span>Crear Cuenta Gratis</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-4 text-lg"
                    onClick={handleViewSecurity}
                  >
                    <Lock className="w-5 h-5 mr-2" />
                    <span>Ver Seguridad</span>
                  </Button>
                </div>

                <div className="flex items-center justify-center space-x-6 text-sm text-slate-400">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>Sin comisiones ocultas</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>Configuración en 5 minutos</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>Soporte 24/7</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Demo Modal */}
      <AnimatePresence>
        {showDemoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDemoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 rounded-2xl p-8 max-w-2xl w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowDemoModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
                  <Play className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Demo Interactivo</h3>
                <p className="text-slate-300">
                  Explora todas las funcionalidades de Caocal en nuestro demo interactivo. 
                  Descubre cómo nuestra plataforma puede transformar tu gestión financiera.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    onClick={() => navigate('/dashboard')}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Ir al Dashboard
                  </Button>
                  <Button variant="outline" className="border-slate-600 text-slate-300">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Ver Video
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Security Modal */}
      <AnimatePresence>
        {showSecurityModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSecurityModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 rounded-2xl p-8 max-w-2xl w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowSecurityModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Seguridad de Nivel Bancario</h3>
                  <p className="text-slate-300">
                    Tu seguridad es nuestra prioridad. Implementamos las mejores prácticas de la industria.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <Lock className="w-5 h-5 text-emerald-500" />
                      <h4 className="font-semibold text-white">Encriptación AES-256</h4>
                    </div>
                    <p className="text-sm text-slate-300">
                      Todos los datos están protegidos con encriptación de nivel militar.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <Shield className="w-5 h-5 text-blue-500" />
                      <h4 className="font-semibold text-white">Autenticación MFA</h4>
                    </div>
                    <p className="text-sm text-slate-300">
                      Verificación en dos pasos para máxima seguridad.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <Activity className="w-5 h-5 text-purple-500" />
                      <h4 className="font-semibold text-white">Monitoreo 24/7</h4>
                    </div>
                    <p className="text-sm text-slate-300">
                      Sistemas de detección de fraudes en tiempo real.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <Award className="w-5 h-5 text-orange-500" />
                      <h4 className="font-semibold text-white">Certificaciones</h4>
                    </div>
                    <p className="text-sm text-slate-300">
                      Cumplimiento con estándares internacionales de seguridad.
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button 
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                    onClick={() => setShowSecurityModal(false)}
                  >
                    Entendido
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Insight Modal */}
      <AnimatePresence>
        {showInsightModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowInsightModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 rounded-2xl p-8 max-w-lg w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowInsightModal(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{showInsightModal}</h3>
                  <p className="text-slate-300">
                    {insights.find(i => i.title === showInsightModal)?.description}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    onClick={() => navigate('/dashboard')}
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Aplicar Recomendación
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-slate-600 text-slate-300"
                    onClick={() => navigate('/education')}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Aprender Más
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feature Modal */}
      <AnimatePresence>
        {showFeatureModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowFeatureModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 rounded-2xl p-8 max-w-lg w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowFeatureModal(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    {features.find(f => f.title === showFeatureModal)?.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{showFeatureModal}</h3>
                  <p className="text-slate-300">
                    {features.find(f => f.title === showFeatureModal)?.description}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    onClick={() => navigate('/dashboard')}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Configurar Ahora
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-slate-600 text-slate-300"
                    onClick={() => navigate('/education')}
                  >
                    <Info className="w-4 h-4 mr-2" />
                    Saber Más
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