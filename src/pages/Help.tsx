import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Video, 
  FileText, 
  Headphones, 
  Bot,
  BookOpen,
  TrendingUp,
  Shield,
  HelpCircle,
  MessageCircle,
  Mail,
  Phone,
  LifeBuoy,
  AlertCircle,
  ChevronUp,
  ChevronDown,
  Download,
  Clock,
  Award,
  DollarSign,
  Zap,
  X,
  Settings,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Share2,
  Info,
  Bookmark
} from 'lucide-react';
import { Card, CardContent } from '@components/ui/Card';
import { Button } from '@components/ui/Button';

// Datos de FAQs
const faqs = [
  {
    id: 1,
    question: "¿Cómo funciona la inversión automática en Caocal?",
    answer: "La inversión automática analiza tus patrones de gasto y automáticamente invierte un porcentaje de tus ingresos en portafolios diversificados. Puedes configurar reglas personalizadas y el sistema se encarga del resto.",
    category: "inversiones",
    priority: "high"
  },
  {
    id: 2,
    question: "¿Es seguro invertir mi dinero en Caocal?",
    answer: "Absolutamente. Utilizamos encriptación bancaria de 256 bits, autenticación multifactor y cumplimos con todas las regulaciones financieras mexicanas. Tu dinero está protegido con los más altos estándares de seguridad.",
    category: "seguridad",
    priority: "high"
  },
  {
    id: 3,
    question: "¿Cuáles son las comisiones de la plataforma?",
    answer: "Caocal opera con transparencia total. No hay comisiones ocultas. Solo cobramos una pequeña comisión del 0.5% anual sobre los rendimientos generados, que es una de las más bajas del mercado.",
    category: "comisiones",
    priority: "medium"
  },
  {
    id: 4,
    question: "¿Cómo puedo retirar mis inversiones?",
    answer: "Los retiros están disponibles 24/7 desde tu dashboard. El dinero llega a tu cuenta bancaria en 1-3 días hábiles. No hay penalizaciones por retiros tempranos.",
    category: "retiros",
    priority: "medium"
  },
  {
    id: 5,
    question: "¿Qué tipos de inversiones ofrece Caocal?",
    answer: "Ofrecemos una amplia gama: ETFs diversificados, bonos gubernamentales, RWA tokens, y portafolios personalizados según tu perfil de riesgo y objetivos financieros.",
    category: "inversiones",
    priority: "medium"
  },
  {
    id: 6,
    question: "¿Cómo funciona la IA para recomendaciones?",
    answer: "Nuestra IA analiza tus patrones de gasto, ingresos y objetivos para sugerir estrategias personalizadas. Aprende de tus decisiones y mejora continuamente sus recomendaciones.",
    category: "tecnologia",
    priority: "high"
  }
];

// Datos de categorías
const categories = [
  { id: "todos", name: "Todas", icon: <HelpCircle className="w-5 h-5" />, count: faqs.length },
  { id: "inversiones", name: "Inversiones", icon: <TrendingUp className="w-5 h-5" />, count: 2 },
  { id: "seguridad", name: "Seguridad", icon: <Shield className="w-5 h-5" />, count: 1 },
  { id: "comisiones", name: "Comisiones", icon: <DollarSign className="w-5 h-5" />, count: 1 },
  { id: "retiros", name: "Retiros", icon: <Zap className="w-5 h-5" />, count: 1 },
  { id: "tecnologia", name: "Tecnología", icon: <Bot className="w-5 h-5" />, count: 1 }
];

// Datos de recursos
const resources = [
  {
    title: "Guía de Inicio Rápido",
    description: "Aprende a configurar tu cuenta en 5 minutos",
    icon: <BookOpen className="w-6 h-6" />,
    type: "pdf",
    priority: "high"
  },
  {
    title: "Manual de Inversiones",
    description: "Todo sobre estrategias y portafolios",
    icon: <TrendingUp className="w-6 h-6" />,
    type: "video",
    priority: "high"
  },
  {
    title: "Seguridad y Privacidad",
    description: "Cómo protegemos tu información",
    icon: <Shield className="w-6 h-6" />,
    type: "pdf",
    priority: "medium"
  },
  {
    title: "FAQ Completo",
    description: "Preguntas frecuentes detalladas",
    icon: <HelpCircle className="w-6 h-6" />,
    type: "pdf",
    priority: "medium"
  }
];

// Datos de soporte
const supportChannels = [
  {
    title: "Chat en Vivo",
    description: "Soporte 24/7 con agentes especializados",
    icon: <MessageCircle className="w-8 h-8" />,
    status: "online",
    responseTime: "< 2 min",
    priority: "high"
  },
  {
    title: "Email",
    description: "soporte@caocal.mx",
    icon: <Mail className="w-8 h-8" />,
    status: "online",
    responseTime: "< 24h",
    priority: "medium"
  },
  {
    title: "Teléfono",
    description: "+52 55 1234 5678",
    icon: <Phone className="w-8 h-8" />,
    status: "online",
    responseTime: "Inmediato",
    priority: "high"
  },
  {
    title: "Centro de Ayuda",
    description: "Documentación completa",
    icon: <BookOpen className="w-8 h-8" />,
    status: "online",
    responseTime: "Siempre disponible",
    priority: "medium"
  }
];

export const Help: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Estados para modales
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showCreateFaqModal, setShowCreateFaqModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  
  // Estados para datos seleccionados
  const [selectedFaq, setSelectedFaq] = useState<any>(null);
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const [selectedSupport, setSelectedSupport] = useState<any>(null);

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === "todos" || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

  // Funciones de manejo para botones interactivos
  const handleFaqClick = (faq: any) => {
    setSelectedFaq(faq);
    setShowFaqModal(true);
  };

  const handleResourceClick = (resource: any) => {
    setSelectedResource(resource);
    setShowResourceModal(true);
  };

  const handleSupportClick = (support: any) => {
    setSelectedSupport(support);
    setShowSupportModal(true);
  };

  const handleSettingsClick = () => {
    setShowSettingsModal(true);
  };

  const handleCreateFaq = () => {
    setShowCreateFaqModal(true);
  };

  const handleAnalyticsClick = () => {
    setShowAnalyticsModal(true);
  };

  const handleDownloadReport = () => {
    setShowReportModal(true);
  };

  const handleInfoClick = () => {
    setShowInfoModal(true);
  };

  const handleBookmarkFaq = (faq: any) => {
    console.log('FAQ guardada:', faq.title);
  };

  const handleShareFaq = (faq: any) => {
    console.log('Compartir FAQ:', faq.title);
  };

  const handleEditFaq = (faq: any) => {
    console.log('Editar FAQ:', faq.title);
  };

  const handleDeleteFaq = (faq: any) => {
    console.log('Eliminar FAQ:', faq.title);
  };

  const handleDownloadResource = (resource: any) => {
    console.log('Descargar recurso:', resource.title);
  };

  const handleShareResource = (resource: any) => {
    console.log('Compartir recurso:', resource.title);
  };

  const handleEditResource = (resource: any) => {
    console.log('Editar recurso:', resource.title);
  };

  const handleDeleteResource = (resource: any) => {
    console.log('Eliminar recurso:', resource.title);
  };

  const handleStartChat = () => {
    console.log('Iniciar chat de soporte');
  };

  const handleSendEmail = () => {
    console.log('Enviar email de soporte');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mr-4">
                <LifeBuoy className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                Centro de Ayuda
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Encuentra respuestas rápidas, documentación completa y soporte especializado para maximizar tu experiencia con Caocal.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar en ayuda y documentación..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-600 rounded-xl px-12 py-4 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Support Channels */}
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
                Canales de
              </span>
              <br />
              <span className="text-white">Soporte</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportChannels.map((channel, index) => (
              <motion.div
                key={channel.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card 
                  className="h-full bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 hover:shadow-xl relative cursor-pointer"
                  onClick={() => handleSupportClick(channel)}
                >
                  <CardContent className="p-6 text-center">
                    {/* Priority Indicator */}
                    <div className="absolute top-3 right-3">
                      <div className={`w-4 h-4 ${getPriorityColor(channel.priority)} rounded-full flex items-center justify-center`}>
                        <AlertCircle className="w-2 h-2 text-white" />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mx-auto mb-4">
                      <div className="text-white">
                        {channel.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{channel.title}</h3>
                    <p className="text-slate-400 mb-3">{channel.description}</p>
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-emerald-400 text-sm font-medium">{channel.status}</span>
                    </div>
                    <p className="text-slate-400 text-sm mt-2">{channel.responseTime}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories and FAQs */}
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
                Preguntas
              </span>
              <br />
              <span className="text-white">Frecuentes</span>
            </h2>
          </motion.div>

          {/* Header con botones de acción */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            <Button
              variant="outline"
              size="sm"
              onClick={handleSettingsClick}
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              <Settings className="w-4 h-4 mr-2" />
              Configuración
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleAnalyticsClick}
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Análisis
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadReport}
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              <Download className="w-4 h-4 mr-2" />
              Reporte
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleInfoClick}
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              <Info className="w-4 h-4 mr-2" />
              Información
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCreateFaq}
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nueva FAQ
            </Button>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "border-slate-600 text-slate-300 hover:bg-slate-800"
                }`}
              >
                {category.icon}
                <span>{category.name}</span>
                <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded-full text-xs">
                  {category.count}
                </span>
              </Button>
            ))}
          </motion.div>

          {/* FAQs */}
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 relative">
                  <CardContent className="p-6">
                    {/* Priority Indicator */}
                    <div className="absolute top-4 right-4">
                      <div className={`px-2 py-1 ${getPriorityColor(faq.priority)} rounded-full text-xs text-white font-medium`}>
                        {getPriorityText(faq.priority)}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div 
                        className="flex-1 cursor-pointer" 
                        onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                      >
                        <h3 className="text-lg font-semibold text-white pr-8">{faq.question}</h3>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-slate-400 text-sm bg-slate-700 px-2 py-1 rounded-full">
                          {categories.find(c => c.id === faq.category)?.name}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFaqClick(faq)}
                          className="text-slate-400 hover:text-white"
                        >
                          <Info className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleBookmarkFaq(faq)}
                          className="text-slate-400 hover:text-white"
                        >
                          <Bookmark className="w-4 h-4" />
                        </Button>
                        {expandedFaq === faq.id ? (
                          <ChevronUp className="w-5 h-5 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                    </div>
                    
                    <AnimatePresence>
                      {expandedFaq === faq.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 pt-4 border-t border-slate-700"
                        >
                          <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
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
                Recursos y
              </span>
              <br />
              <span className="text-white">Documentación</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 hover:shadow-xl relative">
                  <CardContent className="p-6">
                    {/* Priority Indicator */}
                    <div className="absolute top-3 right-3">
                      <div className={`w-4 h-4 ${getPriorityColor(resource.priority)} rounded-full flex items-center justify-center`}>
                        <AlertCircle className="w-2 h-2 text-white" />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <div className="text-white">
                          {resource.icon}
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {resource.type === 'pdf' && <FileText className="w-4 h-4 text-slate-400" />}
                        {resource.type === 'video' && <Video className="w-4 h-4 text-slate-400" />}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-white mb-2">{resource.title}</h3>
                    <p className="text-slate-300 leading-relaxed mb-4">{resource.description}</p>
                    
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-800"
                        onClick={() => handleResourceClick(resource)}
                      >
                        <Info className="w-4 h-4 mr-2" />
                        Ver
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-800"
                        onClick={() => handleDownloadResource(resource)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Descargar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
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
                      ¿Necesitas ayuda
                    </span>
                    <br />
                    <span className="text-white">personalizada?</span>
                  </h2>
                  <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                    Nuestro equipo de expertos está disponible 24/7 para resolver cualquier duda o problema que tengas con la plataforma.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold"
                    onClick={handleStartChat}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    <span>Iniciar Chat</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-4 text-lg"
                    onClick={handleSendEmail}
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    <span>Enviar Email</span>
                  </Button>
                </div>

                <div className="flex items-center justify-center space-x-6 text-sm text-slate-400">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-emerald-500" />
                    <span>Soporte 24/7</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Headphones className="w-4 h-4 text-emerald-500" />
                    <span>Respuesta &lt; 2 min</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-emerald-500" />
                    <span>Expertos certificados</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Modales */}
      
      {/* FAQ Modal */}
      <AnimatePresence>
        {showFaqModal && selectedFaq && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowFaqModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Detalles de FAQ</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFaqModal(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{selectedFaq.question}</h3>
                  <p className="text-slate-300 leading-relaxed">{selectedFaq.answer}</p>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-slate-400">
                  <span>Categoría: {categories.find(c => c.id === selectedFaq.category)?.name}</span>
                  <span>Prioridad: {getPriorityText(selectedFaq.priority)}</span>
                </div>
                
                <div className="flex space-x-2 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBookmarkFaq(selectedFaq)}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    <Bookmark className="w-4 h-4 mr-2" />
                    Guardar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShareFaq(selectedFaq)}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Compartir
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditFaq(selectedFaq)}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteFaq(selectedFaq)}
                    className="border-red-600 text-red-400 hover:bg-red-900/20"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Eliminar
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resource Modal */}
      <AnimatePresence>
        {showResourceModal && selectedResource && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowResourceModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Detalles del Recurso</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowResourceModal(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <div className="text-white">
                      {selectedResource.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{selectedResource.title}</h3>
                    <p className="text-slate-400">{selectedResource.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-slate-400">
                  <span>Tipo: {selectedResource.type.toUpperCase()}</span>
                  <span>Prioridad: {getPriorityText(selectedResource.priority)}</span>
                </div>
                
                <div className="flex space-x-2 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownloadResource(selectedResource)}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Descargar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShareResource(selectedResource)}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Compartir
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditResource(selectedResource)}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteResource(selectedResource)}
                    className="border-red-600 text-red-400 hover:bg-red-900/20"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Eliminar
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Support Modal */}
      <AnimatePresence>
        {showSupportModal && selectedSupport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSupportModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Canal de Soporte</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSupportModal(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <div className="text-white">
                      {selectedSupport.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{selectedSupport.title}</h3>
                    <p className="text-slate-400">{selectedSupport.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-slate-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span>{selectedSupport.status}</span>
                  </div>
                  <span>Tiempo de respuesta: {selectedSupport.responseTime}</span>
                </div>
                
                <div className="flex space-x-2 pt-4">
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contactar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    <Info className="w-4 h-4 mr-2" />
                    Más Info
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Configuración de Ayuda</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSettingsModal(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Idioma preferido</label>
                  <select className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white">
                    <option>Español</option>
                    <option>English</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Notificaciones</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-slate-300">Nuevas FAQs</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-slate-300">Actualizaciones de recursos</span>
                    </label>
                  </div>
                </div>
                
                <div className="flex space-x-2 pt-4">
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Guardar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSettingsModal(false)}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create FAQ Modal */}
      <AnimatePresence>
        {showCreateFaqModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreateFaqModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Nueva FAQ</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCreateFaqModal(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Pregunta</label>
                  <input
                    type="text"
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                    placeholder="Escribe la pregunta..."
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Respuesta</label>
                  <textarea
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white h-32"
                    placeholder="Escribe la respuesta..."
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Categoría</label>
                  <select className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white">
                    <option>Inversiones</option>
                    <option>Seguridad</option>
                    <option>Comisiones</option>
                    <option>Retiros</option>
                    <option>Tecnología</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Prioridad</label>
                  <select className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white">
                    <option>Alta</option>
                    <option>Media</option>
                    <option>Baja</option>
                  </select>
                </div>
                
                <div className="flex space-x-2 pt-4">
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Crear FAQ
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowCreateFaqModal(false)}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analytics Modal */}
      <AnimatePresence>
        {showAnalyticsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAnalyticsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Análisis de Ayuda</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAnalyticsModal(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-slate-700/50 border-slate-600">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Estadísticas Generales</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-300">Total FAQs</span>
                        <span className="text-white font-semibold">6</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Recursos descargados</span>
                        <span className="text-white font-semibold">1,247</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Chats iniciados</span>
                        <span className="text-white font-semibold">892</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Tiempo promedio de respuesta</span>
                        <span className="text-white font-semibold">1.8 min</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-slate-700/50 border-slate-600">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">FAQs Más Populares</h3>
                    <div className="space-y-3">
                      {faqs.slice(0, 3).map((faq, index) => (
                        <div key={faq.id} className="flex justify-between items-center">
                          <span className="text-slate-300 text-sm">{index + 1}. {faq.question.substring(0, 40)}...</span>
                          <span className="text-white font-semibold text-sm">{Math.floor(Math.random() * 100) + 50} vistas</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Report Modal */}
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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Descargar Reporte</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowReportModal(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Formato</label>
                  <select className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white">
                    <option>PDF</option>
                    <option>Excel</option>
                    <option>CSV</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Período</label>
                  <select className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white">
                    <option>Último mes</option>
                    <option>Último trimestre</option>
                    <option>Último año</option>
                    <option>Personalizado</option>
                  </select>
                </div>
                
                <div className="flex space-x-2 pt-4">
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Descargar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowReportModal(false)}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Modal */}
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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Acerca del Centro de Ayuda</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowInfoModal(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Nuestra Misión</h3>
                  <p className="text-slate-300 leading-relaxed">
                    Proporcionar soporte excepcional y recursos educativos para que nuestros usuarios 
                    maximicen su experiencia con Caocal y alcancen sus objetivos financieros.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Características</h3>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span>Soporte 24/7 disponible</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span>Respuesta en menos de 2 minutos</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span>Expertos certificados en finanzas</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span>Recursos actualizados regularmente</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Contacto</h3>
                  <div className="space-y-2 text-slate-300">
                    <p>Email: soporte@caocal.mx</p>
                    <p>Teléfono: +52 55 1234 5678</p>
                    <p>Horario: 24/7</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}; 