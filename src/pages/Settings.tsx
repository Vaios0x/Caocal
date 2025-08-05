import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Eye, 
  EyeOff, 
  Palette, 
  Save,
  Shield,
  Bell,
  TrendingUp,
  Target,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Settings,
  Download,
  RefreshCw,
  Trash2,
  CheckCircle,
  X,
  Edit,
  Info,
  Zap,
  Lock,
  Key,
  Smartphone,
  Database,
  FileText,
  Archive
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card';
import { Button } from '@components/ui/Button';

// Datos de configuración de perfil
const profileSettings = [
  {
    id: 'personal',
    title: 'Información Personal',
    icon: <User className="w-6 h-6" />,
    items: [
      { label: 'Nombre completo', value: 'Giovanny Amador', type: 'text', priority: 'high' },
      { label: 'Email', value: 'giovanny@caocal.mx', type: 'email', priority: 'high' },
      { label: 'Teléfono', value: '+52 55 1234 5678', type: 'tel', priority: 'medium' },
      { label: 'Fecha de nacimiento', value: '15/03/1990', type: 'date', priority: 'medium' },
      { label: 'Dirección', value: 'Ciudad de México, CDMX', type: 'text', priority: 'low' }
    ]
  },
  {
    id: 'security',
    title: 'Seguridad',
    icon: <Shield className="w-6 h-6" />,
    items: [
      { label: 'Autenticación de dos factores', value: 'Activado', type: 'toggle', priority: 'high' },
      { label: 'Contraseña', value: 'Última actualización: hace 30 días', type: 'password', priority: 'high' },
      { label: 'Sesiones activas', value: '3 dispositivos', type: 'sessions', priority: 'medium' },
      { label: 'Notificaciones de seguridad', value: 'Activadas', type: 'toggle', priority: 'medium' }
    ]
  },
  {
    id: 'notifications',
    title: 'Notificaciones',
    icon: <Bell className="w-6 h-6" />,
    items: [
      { label: 'Notificaciones push', value: 'Activadas', type: 'toggle', priority: 'high' },
      { label: 'Notificaciones por email', value: 'Activadas', type: 'toggle', priority: 'medium' },
      { label: 'Notificaciones SMS', value: 'Desactivadas', type: 'toggle', priority: 'low' },
      { label: 'Alertas de mercado', value: 'Activadas', type: 'toggle', priority: 'high' }
    ]
  }
];

// Datos de configuración de inversiones
const investmentSettings = [
  {
    id: 'portfolio',
    title: 'Configuración de Portafolio',
    icon: <TrendingUp className="w-6 h-6" />,
    items: [
      { label: 'Perfil de riesgo', value: 'Moderado', type: 'select', priority: 'high' },
      { label: 'Inversión automática', value: 'Activada', type: 'toggle', priority: 'high' },
      { label: 'Porcentaje de ahorro', value: '15%', type: 'percentage', priority: 'high' },
      { label: 'Rebalanceo automático', value: 'Mensual', type: 'select', priority: 'medium' }
    ]
  },
  {
    id: 'goals',
    title: 'Metas Financieras',
    icon: <Target className="w-6 h-6" />,
    items: [
      { label: 'Meta de ahorro mensual', value: '$5,000', type: 'currency', priority: 'high' },
      { label: 'Meta de retiro anual', value: '8%', type: 'percentage', priority: 'high' },
      { label: 'Horizonte de inversión', value: '10 años', type: 'select', priority: 'medium' },
      { label: 'Tolerancia al riesgo', value: 'Media', type: 'select', priority: 'medium' }
    ]
  }
];

// Datos de configuración de la aplicación
const appSettings = [
  {
    id: 'appearance',
    title: 'Apariencia',
    icon: <Palette className="w-6 h-6" />,
    items: [
      { label: 'Tema', value: 'Oscuro', type: 'theme', priority: 'medium' },
      { label: 'Idioma', value: 'Español', type: 'select', priority: 'medium' },
      { label: 'Moneda', value: 'MXN (Peso Mexicano)', type: 'select', priority: 'high' },
      { label: 'Zona horaria', value: 'America/Mexico_City', type: 'select', priority: 'low' }
    ]
  },
  {
    id: 'privacy',
    title: 'Privacidad',
    icon: <Eye className="w-6 h-6" />,
    items: [
      { label: 'Datos de uso', value: 'Compartidos', type: 'toggle', priority: 'medium' },
      { label: 'Análisis de rendimiento', value: 'Activado', type: 'toggle', priority: 'low' },
      { label: 'Cookies', value: 'Necesarias', type: 'select', priority: 'medium' },
      { label: 'Historial de actividad', value: '30 días', type: 'select', priority: 'low' }
    ]
  }
];

export const SettingsPage: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>('personal');
  const [showSensitiveData, setShowSensitiveData] = useState(false);
  
  // Estados para modales
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  
  // Estados para datos seleccionados
  const [selectedSetting, setSelectedSetting] = useState<any>(null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  // Funciones de manejo para modales
  const handleProfileClick = (section: any) => {
    setSelectedSetting(section);
    setShowProfileModal(true);
  };

  const handleSecurityClick = (section: any) => {
    setSelectedSetting(section);
    setShowSecurityModal(true);
  };

  const handleExportClick = () => {
    setShowExportModal(true);
  };

  const handleSyncClick = () => {
    console.log('Sincronizando configuración...');
  };

  const handleDeleteAccountClick = () => {
    console.log('Eliminando cuenta...');
  };

  const handleBackupClick = () => {
    console.log('Creando respaldo...');
  };

  const handleAdvancedClick = () => {
    console.log('Configuración avanzada...');
  };

  const handleInfoClick = () => {
    setShowInfoModal(true);
  };

  const handleSaveSetting = (setting: any) => {
    console.log('Guardando configuración:', setting);
  };



  const renderSettingItem = (item: any) => {
    const isSensitive = item.type === 'password' || item.type === 'email';
    
    return (
      <div key={item.label} className="flex items-center justify-between py-3 border-b border-slate-700 last:border-b-0">
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="text-white font-medium">{item.label}</span>
              <div className={`w-2 h-2 ${getPriorityColor(item.priority)} rounded-full`}></div>
            </div>
            <div className="flex items-center space-x-2 mt-1">
              {isSensitive && !showSensitiveData ? (
                <span className="text-slate-400">••••••••</span>
              ) : (
                <span className="text-slate-300">{item.value}</span>
              )}
              {isSensitive && (
                <button
                  onClick={() => setShowSensitiveData(!showSensitiveData)}
                  className="text-slate-400 hover:text-slate-300"
                >
                  {showSensitiveData ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {item.type === 'toggle' && (
            <div className={`w-10 h-6 rounded-full transition-colors ${
              item.value === 'Activado' || item.value === 'Activadas' 
                ? 'bg-emerald-500' 
                : 'bg-slate-600'
            }`}>
              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                item.value === 'Activado' || item.value === 'Activadas' 
                  ? 'translate-x-4' 
                  : 'translate-x-0'
              }`}></div>
            </div>
          )}
          {item.type !== 'toggle' && (
            <ChevronRight className="w-4 h-4 text-slate-400" />
          )}
        </div>
      </div>
    );
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
                <Settings className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                Configuración
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Gestiona tu perfil, seguridad, notificaciones y preferencias de inversión para personalizar tu experiencia en Caocal.
            </p>
            
            {/* Botones de acción */}
            <div className="flex items-center justify-center space-x-4 mt-8">
              <Button 
                onClick={handleInfoClick}
                variant="outline" 
                size="sm" 
                className="border-slate-600 text-slate-300 hover:bg-slate-800"
              >
                <Info className="w-4 h-4 mr-2" />
                Información
              </Button>
              <Button 
                onClick={handleExportClick}
                variant="outline" 
                size="sm" 
                className="border-slate-600 text-slate-300 hover:bg-slate-800"
              >
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
              <Button 
                onClick={handleBackupClick}
                variant="outline" 
                size="sm" 
                className="border-slate-600 text-slate-300 hover:bg-slate-800"
              >
                <Archive className="w-4 h-4 mr-2" />
                Respaldo
              </Button>
              <Button 
                onClick={handleAdvancedClick}
                variant="outline" 
                size="sm" 
                className="border-slate-600 text-slate-300 hover:bg-slate-800"
              >
                <Zap className="w-4 h-4 mr-2" />
                Avanzado
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Settings Sections */}
      <section className="py-20">
        <div className="container-responsive">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Profile Settings */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-white mb-8">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                    Configuración
                  </span>
                  <br />
                  <span className="text-white">de Perfil</span>
                </h2>
              </motion.div>

              {profileSettings.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300">
                    <div className="cursor-pointer" onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                              {section.icon}
                            </div>
                            <CardTitle className="text-white">{section.title}</CardTitle>
                          </div>
                          <div className="flex items-center space-x-2">
                                                          <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (section.id === 'personal') handleProfileClick(section);
                                  else if (section.id === 'security') handleSecurityClick(section);
                                }}
                                variant="ghost"
                                size="sm"
                                className="text-slate-400 hover:text-slate-300"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            {expandedSection === section.id ? (
                              <ChevronUp className="w-5 h-5 text-slate-400" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-slate-400" />
                            )}
                          </div>
                        </div>
                      </CardHeader>
                    </div>
                    
                    <AnimatePresence>
                      {expandedSection === section.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <CardContent className="pt-0">
                            {section.items.map(renderSettingItem)}
                          </CardContent>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Investment Settings */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-white mb-8">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                    Configuración
                  </span>
                  <br />
                  <span className="text-white">de Inversiones</span>
                </h2>
              </motion.div>

              {investmentSettings.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: (index + 0.2) * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300">
                    <div className="cursor-pointer" onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                              {section.icon}
                            </div>
                            <CardTitle className="text-white">{section.title}</CardTitle>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log('Configuración de inversión:', section);
                              }}
                              variant="ghost"
                              size="sm"
                              className="text-slate-400 hover:text-slate-300"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            {expandedSection === section.id ? (
                              <ChevronUp className="w-5 h-5 text-slate-400" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-slate-400" />
                            )}
                          </div>
                        </div>
                      </CardHeader>
                    </div>
                    
                    <AnimatePresence>
                      {expandedSection === section.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <CardContent className="pt-0">
                            {section.items.map(renderSettingItem)}
                          </CardContent>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* App Settings */}
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
                Configuración
              </span>
              <br />
              <span className="text-white">de la Aplicación</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {appSettings.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300">
                  <div className="cursor-pointer" onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            {section.icon}
                          </div>
                          <CardTitle className="text-white">{section.title}</CardTitle>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log('Configuración de aplicación:', section);
                            }}
                            variant="ghost"
                            size="sm"
                            className="text-slate-400 hover:text-slate-300"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          {expandedSection === section.id ? (
                            <ChevronUp className="w-5 h-5 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                  </div>
                  
                  <AnimatePresence>
                    {expandedSection === section.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CardContent className="pt-0">
                          {section.items.map(renderSettingItem)}
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Actions Section */}
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
                      Acciones
                    </span>
                    <br />
                    <span className="text-white">Avanzadas</span>
                  </h2>
                  <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                    Gestiona tu cuenta, exporta datos y configura opciones avanzadas de seguridad.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <Button 
                    onClick={handleExportClick}
                    variant="outline" 
                    size="lg" 
                    className="border-slate-600 text-slate-300 hover:bg-slate-800 p-6 h-auto flex-col space-y-2"
                  >
                    <Download className="w-6 h-6" />
                    <span>Exportar Datos</span>
                  </Button>
                  <Button 
                    onClick={handleSyncClick}
                    variant="outline" 
                    size="lg" 
                    className="border-slate-600 text-slate-300 hover:bg-slate-800 p-6 h-auto flex-col space-y-2"
                  >
                    <RefreshCw className="w-6 h-6" />
                    <span>Sincronizar</span>
                  </Button>
                  <Button 
                    onClick={handleDeleteAccountClick}
                    variant="outline" 
                    size="lg" 
                    className="border-red-500 text-red-400 hover:bg-red-500/10 p-6 h-auto flex-col space-y-2"
                  >
                    <Trash2 className="w-6 h-6" />
                    <span>Eliminar Cuenta</span>
                  </Button>
                </div>

                <div className="flex items-center justify-center space-x-6 text-sm text-slate-400">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>Configuración guardada</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-emerald-500" />
                    <span>Datos encriptados</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Save className="w-4 h-4 text-emerald-500" />
                    <span>Auto-guardado</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Modales */}
      <AnimatePresence>
        {/* Profile Modal */}
        {showProfileModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowProfileModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Configuración de Perfil</h3>
                </div>
                <Button
                  onClick={() => setShowProfileModal(false)}
                  variant="ghost"
                  size="sm"
                  className="text-slate-400 hover:text-slate-300"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Nombre completo</label>
                    <input
                      type="text"
                      defaultValue="Giovanny Amador"
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Email</label>
                    <input
                      type="email"
                      defaultValue="giovanny@caocal.mx"
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Teléfono</label>
                    <input
                      type="tel"
                      defaultValue="+52 55 1234 5678"
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Fecha de nacimiento</label>
                    <input
                      type="date"
                      defaultValue="1990-03-15"
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-end space-x-3 pt-6 border-t border-slate-700">
                  <Button
                    onClick={() => setShowProfileModal(false)}
                    variant="outline"
                    className="border-slate-600 text-slate-300"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={() => {
                      handleSaveSetting(selectedSetting);
                      setShowProfileModal(false);
                    }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Guardar Cambios
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Security Modal */}
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
              className="bg-slate-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Configuración de Seguridad</h3>
                </div>
                <Button
                  onClick={() => setShowSecurityModal(false)}
                  variant="ghost"
                  size="sm"
                  className="text-slate-400 hover:text-slate-300"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Key className="w-5 h-5 text-emerald-500" />
                      <div>
                        <h4 className="text-white font-medium">Autenticación de dos factores</h4>
                        <p className="text-slate-400 text-sm">Protege tu cuenta con 2FA</p>
                      </div>
                    </div>
                    <div className="w-10 h-6 bg-emerald-500 rounded-full">
                      <div className="w-4 h-4 bg-white rounded-full translate-x-4"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Lock className="w-5 h-5 text-blue-500" />
                      <div>
                        <h4 className="text-white font-medium">Cambiar contraseña</h4>
                        <p className="text-slate-400 text-sm">Última actualización: hace 30 días</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                      <Edit className="w-4 h-4 mr-2" />
                      Cambiar
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="w-5 h-5 text-purple-500" />
                      <div>
                        <h4 className="text-white font-medium">Sesiones activas</h4>
                        <p className="text-slate-400 text-sm">3 dispositivos conectados</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                      <Eye className="w-4 h-4 mr-2" />
                      Ver
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-end space-x-3 pt-6 border-t border-slate-700">
                  <Button
                    onClick={() => setShowSecurityModal(false)}
                    variant="outline"
                    className="border-slate-600 text-slate-300"
                  >
                    Cerrar
                  </Button>
                  <Button
                    onClick={() => {
                      handleSaveSetting(selectedSetting);
                      setShowSecurityModal(false);
                    }}
                    className="bg-gradient-to-r from-red-600 to-orange-600"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Aplicar Seguridad
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Export Modal */}
        {showExportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowExportModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 rounded-2xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                    <Download className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Exportar Datos</h3>
                </div>
                <Button
                  onClick={() => setShowExportModal(false)}
                  variant="ghost"
                  size="sm"
                  className="text-slate-400 hover:text-slate-300"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  <Button variant="outline" className="w-full border-slate-600 text-slate-300 justify-start">
                    <FileText className="w-4 h-4 mr-3" />
                    Exportar como PDF
                  </Button>
                  <Button variant="outline" className="w-full border-slate-600 text-slate-300 justify-start">
                    <Database className="w-4 h-4 mr-3" />
                    Exportar como JSON
                  </Button>
                  <Button variant="outline" className="w-full border-slate-600 text-slate-300 justify-start">
                    <Archive className="w-4 h-4 mr-3" />
                    Exportar como ZIP
                  </Button>
                </div>
                
                <div className="flex items-center justify-end space-x-3 pt-6 border-t border-slate-700">
                  <Button
                    onClick={() => setShowExportModal(false)}
                    variant="outline"
                    className="border-slate-600 text-slate-300"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={() => {
                      console.log('Exportando datos...');
                      setShowExportModal(false);
                    }}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Info Modal */}
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
              className="bg-slate-800 rounded-2xl p-6 w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Info className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Información de Configuración</h3>
                </div>
                <Button
                  onClick={() => setShowInfoModal(false)}
                  variant="ghost"
                  size="sm"
                  className="text-slate-400 hover:text-slate-300"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">Características</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span className="text-slate-300">Configuración de perfil personalizada</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span className="text-slate-300">Seguridad avanzada con 2FA</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span className="text-slate-300">Notificaciones personalizables</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span className="text-slate-300">Configuración de inversiones</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">Versión</h4>
                    <div className="space-y-2 text-slate-300">
                      <p>Caocal v1.0.0</p>
                      <p>Última actualización: 2024</p>
                      <p>Compatibilidad: Web, iOS, Android</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-end pt-6 border-t border-slate-700">
                  <Button
                    onClick={() => setShowInfoModal(false)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    Entendido
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