import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Shield, 
  Zap, 
  Star, 
  ArrowRight, 
  CheckCircle, 
  Users, 
  DollarSign,
  BarChart3,
  Target,
  Play,
  ChevronRight,
  ChevronLeft,
  Quote,
  Sparkles,
  Crown,
  Lock,
  Eye,
  AlertCircle,
  Calendar,
  Lightbulb,
  PieChart,
  Activity,
  Award,
  Globe,
  Clock,
  Settings
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
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container-responsive py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex items-center space-x-2"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-blue-400 font-medium">Wealth as a Service</span>
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-5xl lg:text-6xl font-bold leading-tight"
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
                  className="text-xl text-slate-300 leading-relaxed"
                >
                  La primera plataforma que combina inteligencia artificial, seguridad bancaria y automatización para maximizar tus inversiones. Únete a más de 50,000 inversionistas que ya transformaron su patrimonio.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold">
                  <span>Empezar Gratis</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" size="lg" className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-4 text-lg">
                  <Play className="w-5 h-5 mr-2" />
                  <span>Ver Demo</span>
                </Button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="flex items-center space-x-6 pt-8"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-slate-400 text-sm">Seguridad Bancaria</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-slate-400 text-sm">IA Avanzada</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-slate-400 text-sm">Automatización</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Hero Visual - Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-700">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
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
      <section className="py-20 bg-slate-900/50">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
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
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mx-auto mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">{stat.number}</h3>
                <p className="text-slate-400 mb-3">{stat.label}</p>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: `${stat.progress}%` }}></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
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
                Mis Estrategias
              </span>
              <br />
              <span className="text-white">de Inversión</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Combinamos tecnología de vanguardia con experiencia financiera para ofrecerte la plataforma más avanzada de gestión patrimonial.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-slate-800/50 border-red-500/30 hover:border-red-500/50 transition-all duration-300 hover:shadow-xl relative">
                  <CardContent className="p-6">
                    {/* Priority Indicator */}
                    <div className="absolute top-3 right-3">
                      <div className={`w-6 h-6 ${getPriorityColor(feature.priority)} rounded-full flex items-center justify-center`}>
                        <AlertCircle className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                      <div className="text-white">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                    <p className="text-slate-300 leading-relaxed mb-4">{feature.description}</p>
                    
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
      <section className="py-20 bg-slate-900/50">
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
                Insights y
              </span>
              <br />
              <span className="text-white">Consejos</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {insights.map((insight, index) => (
              <motion.div
                key={insight.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-slate-800/50 border-slate-700 p-6 relative">
                  <CardContent className="space-y-4">
                    {/* Priority Tag */}
                    <div className="absolute top-3 right-3">
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
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold">
                    <Crown className="w-5 h-5 mr-2" />
                    <span>Crear Cuenta Gratis</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button variant="outline" size="lg" className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-4 text-lg">
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
    </div>
  );
}; 