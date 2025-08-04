import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  GraduationCap, 
  Target, 
  TrendingUp, 
  Shield, 
  Calculator,
  Clock,
  Star,
  Play,
  Download,
  Share2,
  Bookmark,
  Users,
  BarChart3,
  PieChart,
  DollarSign,
  Building2,
  ArrowRight,
  Video,
  FileText,
  Headphones
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card';
import { Button } from '@components/ui/Button';

// Tipos para los cursos y recursos
interface Course {
  id: string;
  title: string;
  description: string;
  category: 'básico' | 'intermedio' | 'avanzado';
  duration: string;
  lessons: number;
  rating: number;
  students: number;
  image: string;
  tags: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  progress?: number;
}

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'artículo' | 'calculadora' | 'infografía' | 'podcast';
  duration: string;
  author: string;
  date: string;
  views: number;
  icon: React.ReactNode;
  color: string;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  courses: number;
  duration: string;
  level: 'principiante' | 'intermedio' | 'avanzado';
  icon: React.ReactNode;
  color: string;
  progress?: number;
}

export const Education: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'courses' | 'paths' | 'resources' | 'tools'>('courses');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Cursos de educación financiera
  const courses: Course[] = [
    {
      id: '1',
      title: 'Fundamentos de Inversión',
      description: 'Aprende los conceptos básicos de inversión, tipos de activos y estrategias de diversificación',
      category: 'básico',
      duration: '4 horas',
      lessons: 12,
      rating: 4.8,
      students: 1247,
      image: '/api/placeholder/300/200',
      tags: ['inversión', 'diversificación', 'activos'],
      isNew: true,
      isFeatured: true,
      progress: 0
    },
    {
      id: '2',
      title: 'Micro-Ahorro Inteligente',
      description: 'Estrategias para ahorrar dinero de forma automática y construir riqueza gradualmente',
      category: 'básico',
      duration: '3 horas',
      lessons: 8,
      rating: 4.9,
      students: 892,
      image: '/api/placeholder/300/200',
      tags: ['ahorro', 'automatización', 'presupuesto'],
      isFeatured: true,
      progress: 0
    },
    {
      id: '3',
      title: 'RWA Tokens: El Futuro de las Inversiones',
      description: 'Descubre cómo los tokens de activos reales están revolucionando las inversiones',
      category: 'avanzado',
      duration: '6 horas',
      lessons: 15,
      rating: 4.7,
      students: 567,
      image: '/api/placeholder/300/200',
      tags: ['RWA', 'blockchain', 'tokens'],
      isNew: true,
      progress: 0
    },
    {
      id: '4',
      title: 'Gestión de Riesgos Financieros',
      description: 'Aprende a identificar, evaluar y mitigar riesgos en tus inversiones',
      category: 'intermedio',
      duration: '5 horas',
      lessons: 10,
      rating: 4.6,
      students: 734,
      image: '/api/placeholder/300/200',
      tags: ['riesgo', 'protección', 'análisis'],
      progress: 0
    },
    {
      id: '5',
      title: 'Planificación Financiera Personal',
      description: 'Crea un plan financiero completo para alcanzar tus metas de vida',
      category: 'intermedio',
      duration: '4.5 horas',
      lessons: 11,
      rating: 4.8,
      students: 1023,
      image: '/api/placeholder/300/200',
      tags: ['planificación', 'metas', 'presupuesto'],
      progress: 0
    },
    {
      id: '6',
      title: 'Análisis Técnico para Principiantes',
      description: 'Introducción a los gráficos y patrones para tomar decisiones de inversión',
      category: 'intermedio',
      duration: '7 horas',
      lessons: 18,
      rating: 4.5,
      students: 445,
      image: '/api/placeholder/300/200',
      tags: ['análisis', 'gráficos', 'patrones'],
      progress: 0
    }
  ];

  // Rutas de aprendizaje
  const learningPaths: LearningPath[] = [
    {
      id: '1',
      title: 'De Principiante a Inversor',
      description: 'Ruta completa para comenzar tu viaje en el mundo de las inversiones',
      courses: 5,
      duration: '20 horas',
      level: 'principiante',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'text-blue-500',
      progress: 0
    },
    {
      id: '2',
      title: 'Especialista en RWA',
      description: 'Domina el mundo de los tokens de activos reales y DeFi',
      courses: 4,
      duration: '16 horas',
      level: 'avanzado',
      icon: <Building2 className="w-6 h-6" />,
      color: 'text-purple-500',
      progress: 0
    },
    {
      id: '3',
      title: 'Gestor de Riqueza',
      description: 'Aprende a gestionar y hacer crecer tu patrimonio de forma profesional',
      courses: 6,
      duration: '25 horas',
      level: 'intermedio',
      icon: <Target className="w-6 h-6" />,
      color: 'text-emerald-500',
      progress: 0
    }
  ];

  // Recursos educativos
  const resources: Resource[] = [
    {
      id: '1',
      title: 'Guía Completa de Micro-Ahorro',
      description: 'Todo lo que necesitas saber para automatizar tus ahorros',
      type: 'artículo',
      duration: '15 min',
      author: 'Equipo Caocal',
      date: 'Hace 2 días',
      views: 2341,
      icon: <FileText className="w-5 h-5" />,
      color: 'text-blue-500'
    },
    {
      id: '2',
      title: 'Webinar: El Futuro de las Inversiones',
      description: 'Sesión en vivo sobre las últimas tendencias en inversiones',
      type: 'video',
      duration: '45 min',
      author: 'Dr. Ana Martínez',
      date: 'Hace 1 semana',
      views: 1892,
      icon: <Video className="w-5 h-5" />,
      color: 'text-red-500'
    },
    {
      id: '3',
      title: 'Calculadora de Interés Compuesto',
      description: 'Herramienta interactiva para calcular el crecimiento de tus inversiones',
      type: 'calculadora',
      duration: '5 min',
      author: 'Equipo Caocal',
      date: 'Hace 3 días',
      views: 3456,
      icon: <Calculator className="w-5 h-5" />,
      color: 'text-green-500'
    },
    {
      id: '4',
      title: 'Podcast: Finanzas Personales',
      description: 'Episodio sobre cómo construir riqueza desde cero',
      type: 'podcast',
      duration: '30 min',
      author: 'Carlos Rodríguez',
      date: 'Hace 5 días',
      views: 1234,
      icon: <Headphones className="w-5 h-5" />,
      color: 'text-purple-500'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'básico': return 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20';
      case 'intermedio': return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'avanzado': return 'text-purple-500 bg-purple-50 dark:bg-purple-900/20';
      default: return 'text-slate-500 bg-slate-50 dark:bg-slate-900/20';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'principiante': return 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20';
      case 'intermedio': return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'avanzado': return 'text-purple-500 bg-purple-50 dark:bg-purple-900/20';
      default: return 'text-slate-500 bg-slate-50 dark:bg-slate-900/20';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'text-red-500 bg-red-50 dark:bg-red-900/20';
      case 'artículo': return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'calculadora': return 'text-green-500 bg-green-50 dark:bg-green-900/20';
      case 'podcast': return 'text-purple-500 bg-purple-50 dark:bg-purple-900/20';
      default: return 'text-slate-500 bg-slate-50 dark:bg-slate-900/20';
    }
  };

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

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
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Educación Financiera
          </h1>
        </div>
        <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed">
          Desarrolla las habilidades financieras que necesitas para construir riqueza y alcanzar la libertad económica
        </p>
      </motion.div>

      {/* Estadísticas rápidas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Cursos Disponibles</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {courses.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center border border-blue-200 dark:border-blue-800">
                <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Estudiantes Activos</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {courses.reduce((sum, course) => sum + course.students, 0).toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center border border-emerald-200 dark:border-emerald-800">
                <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Horas de Contenido</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {courses.reduce((sum, course) => sum + parseInt(course.duration), 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center border border-purple-200 dark:border-purple-800">
                <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Calificación Promedio</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {Math.round(courses.reduce((sum, course) => sum + course.rating, 0) / courses.length * 10) / 10}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-xl flex items-center justify-center border border-yellow-200 dark:border-yellow-800">
                <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tabs de navegación */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex justify-center"
      >
        <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700">
          {[
            { id: 'courses', label: 'Cursos', icon: <BookOpen className="w-4 h-4" /> },
            { id: 'paths', label: 'Rutas de Aprendizaje', icon: <Target className="w-4 h-4" /> },
            { id: 'resources', label: 'Recursos', icon: <FileText className="w-4 h-4" /> },
            { id: 'tools', label: 'Herramientas', icon: <Calculator className="w-4 h-4" /> }
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
      {activeTab === 'courses' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-8"
        >
          {/* Filtros */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
              >
                Todos
              </Button>
              <Button
                variant={selectedCategory === 'básico' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('básico')}
              >
                Principiantes
              </Button>
              <Button
                variant={selectedCategory === 'intermedio' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('intermedio')}
              >
                Intermedios
              </Button>
              <Button
                variant={selectedCategory === 'avanzado' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('avanzado')}
              >
                Avanzados
              </Button>
            </div>
          </div>

          {/* Grid de cursos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="card-hover h-full">
                  <CardHeader className="relative">
                    <div className="absolute top-4 right-4 flex items-center space-x-2">
                      {course.isNew && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300">
                          Nuevo
                        </span>
                      )}
                      {course.isFeatured && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
                          Destacado
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(course.category)}`}>
                            {course.category.charAt(0).toUpperCase() + course.category.slice(1)}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{course.rating}</span>
                          </div>
                        </div>
                        
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {course.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Duración</p>
                        <p className="font-medium">{course.duration}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Lecciones</p>
                        <p className="font-medium">{course.lessons}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {course.students.toLocaleString()} estudiantes
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button size="sm">
                          <Play className="w-4 h-4 mr-2" />
                          Comenzar
                        </Button>
                        <Button variant="outline" size="sm">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'paths' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {learningPaths.map((path, index) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="card-hover h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${path.color.replace('text-', 'bg-')} bg-opacity-10 border border-current border-opacity-20`}>
                        {path.icon}
                      </div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(path.level)}`}>
                        {path.level.charAt(0).toUpperCase() + path.level.slice(1)}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <CardTitle className="text-xl">{path.title}</CardTitle>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {path.description}
                      </p>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Cursos</p>
                        <p className="font-medium">{path.courses}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Duración</p>
                        <p className="font-medium">{path.duration}</p>
                      </div>
                    </div>
                    
                    <Button className="w-full">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Comenzar Ruta
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'resources' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="card-hover">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${resource.color.replace('text-', 'bg-')} bg-opacity-10 border border-current border-opacity-20`}>
                        {resource.icon}
                      </div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                        {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {resource.description}
                      </p>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-slate-600 dark:text-slate-400">Duración</p>
                          <p className="font-medium">{resource.duration}</p>
                        </div>
                        <div>
                          <p className="text-slate-600 dark:text-slate-400">Vistas</p>
                          <p className="font-medium">{resource.views.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">
                          Por {resource.author} • {resource.date}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button size="sm">
                          <Play className="w-4 h-4 mr-2" />
                          Ver
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'tools' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Calculadora de Interés Compuesto',
                description: 'Calcula el crecimiento de tus inversiones a lo largo del tiempo',
                icon: <Calculator className="w-6 h-6" />,
                color: 'text-green-500',
                bgColor: 'bg-green-100 dark:bg-green-900/20'
              },
              {
                title: 'Simulador de Portafolio',
                description: 'Prueba diferentes combinaciones de activos y ve los resultados',
                icon: <PieChart className="w-6 h-6" />,
                color: 'text-blue-500',
                bgColor: 'bg-blue-100 dark:bg-blue-900/20'
              },
              {
                title: 'Calculadora de Presupuesto',
                description: 'Organiza tus gastos e identifica oportunidades de ahorro',
                icon: <DollarSign className="w-6 h-6" />,
                color: 'text-purple-500',
                bgColor: 'bg-purple-100 dark:bg-purple-900/20'
              },
              {
                title: 'Analizador de Riesgo',
                description: 'Evalúa el nivel de riesgo de tus inversiones',
                icon: <Shield className="w-6 h-6" />,
                color: 'text-orange-500',
                bgColor: 'bg-orange-100 dark:bg-orange-900/20'
              },
              {
                title: 'Planificador de Metas',
                description: 'Define y alcanza tus objetivos financieros',
                icon: <Target className="w-6 h-6" />,
                color: 'text-emerald-500',
                bgColor: 'bg-emerald-100 dark:bg-emerald-900/20'
              },
              {
                title: 'Comparador de Inversiones',
                description: 'Compara diferentes opciones de inversión',
                icon: <BarChart3 className="w-6 h-6" />,
                color: 'text-indigo-500',
                bgColor: 'bg-indigo-100 dark:bg-indigo-900/20'
              }
            ].map((tool, index) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="card-hover h-full">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${tool.bgColor} border border-current border-opacity-20`}>
                        <div className={tool.color}>
                          {tool.icon}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-semibold text-slate-900 dark:text-white">
                          {tool.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {tool.description}
                        </p>
                      </div>
                      
                      <Button className="w-full" size="sm">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Usar Herramienta
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}; 