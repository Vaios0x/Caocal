import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cookie, 
  Settings, 
  Shield, 
  Clock, 
  Download,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Info,
  Calendar,
  User,
  Mail,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@components/ui/Button';

export const Cookies: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['general']);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true,
    performance: false,
    functionality: false,
    marketing: false
  });

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleCookiePreference = (type: string, value: boolean) => {
    setCookiePreferences(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const cookiesData = {
    lastUpdated: '15 de Agosto, 2025',
    version: 'v2.1',
    contactEmail: 'cookies@caocal.mx',
    company: 'Caocal Technologies S.A. de C.V.',
    address: 'México'
  };

  const cookieTypes = [
    {
      id: 'essential',
      name: 'Cookies Esenciales',
      description: 'Necesarias para el funcionamiento básico del sitio web',
      examples: ['Sesión de usuario', 'Autenticación', 'Seguridad'],
      duration: 'Sesión',
      required: true
    },
    {
      id: 'performance',
      name: 'Cookies de Rendimiento',
      description: 'Nos ayudan a entender cómo se utiliza el sitio web',
      examples: ['Análisis de tráfico', 'Métricas de rendimiento', 'Errores del sitio'],
      duration: '2 años',
      required: false
    },
    {
      id: 'functionality',
      name: 'Cookies de Funcionalidad',
      description: 'Mejoran su experiencia recordando sus preferencias',
      examples: ['Idioma preferido', 'Configuraciones', 'Personalización'],
      duration: '1 año',
      required: false
    },
    {
      id: 'marketing',
      name: 'Cookies de Marketing',
      description: 'Utilizadas para mostrar contenido relevante y publicidad',
      examples: ['Publicidad personalizada', 'Redes sociales', 'Análisis de marketing'],
      duration: '1 año',
      required: false
    }
  ];

  const sections = [
    {
      id: 'general',
      title: 'Información General',
      icon: Info,
      content: `
        <h4 className="text-lg font-semibold mb-3">¿Qué son las Cookies?</h4>
        <p className="mb-4">Las cookies son pequeños archivos de texto que se almacenan en su dispositivo (computadora, tablet o teléfono móvil) cuando visita nuestro sitio web. Estas cookies nos permiten recordar sus preferencias y proporcionar una mejor experiencia de navegación.</p>
        
        <h4 className="text-lg font-semibold mb-3">¿Cómo Utilizamos las Cookies?</h4>
        <p className="mb-4">Utilizamos cookies para:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Recordar sus preferencias y configuraciones</li>
          <li>Analizar cómo utiliza nuestro sitio web</li>
          <li>Mejorar la funcionalidad y rendimiento</li>
          <li>Proporcionar contenido personalizado</li>
          <li>Garantizar la seguridad de su cuenta</li>
        </ul>
        
        <h4 className="text-lg font-semibold mb-3">Su Consentimiento</h4>
        <p className="mb-4">Al continuar utilizando nuestro sitio web, usted acepta el uso de cookies de acuerdo con esta política. Puede cambiar sus preferencias en cualquier momento.</p>
      `
    },
    {
      id: 'types',
      title: 'Tipos de Cookies',
      icon: Cookie,
      content: `
        <h4 className="text-lg font-semibold mb-3">Clasificación por Propósito</h4>
        <p className="mb-4">Utilizamos diferentes tipos de cookies según su función:</p>
        
        <h4 className="text-lg font-semibold mb-3">Cookies Esenciales</h4>
        <p className="mb-4">Estas cookies son necesarias para el funcionamiento básico del sitio web. No se pueden desactivar y no almacenan información personal identificable.</p>
        
        <h4 className="text-lg font-semibold mb-3">Cookies de Rendimiento</h4>
        <p className="mb-4">Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web, recopilando información de forma anónima.</p>
        
        <h4 className="text-lg font-semibold mb-3">Cookies de Funcionalidad</h4>
        <p className="mb-4">Permiten que el sitio web recuerde las elecciones que usted hace y proporcione funcionalidades mejoradas y más personalizadas.</p>
        
        <h4 className="text-lg font-semibold mb-3">Cookies de Marketing</h4>
        <p className="mb-4">Se utilizan para rastrear visitantes en sitios web. La intención es mostrar anuncios relevantes y atractivos para el usuario individual.</p>
      `
    },
    {
      id: 'third-party',
      title: 'Cookies de Terceros',
      icon: ExternalLink,
      content: `
        <h4 className="text-lg font-semibold mb-3">Proveedores de Terceros</h4>
        <p className="mb-4">Algunas cookies en nuestro sitio web son establecidas por servicios de terceros que aparecen en nuestras páginas. Estos incluyen:</p>
        
        <h4 className="text-lg font-semibold mb-3">Google Analytics</h4>
        <p className="mb-4">Utilizamos Google Analytics para analizar el uso del sitio web. Google Analytics utiliza cookies para recopilar información sobre cómo los visitantes utilizan nuestro sitio.</p>
        
        <h4 className="text-lg font-semibold mb-3">Redes Sociales</h4>
        <p className="mb-4">Los botones de redes sociales pueden establecer cookies para rastrear su actividad en línea y personalizar el contenido que ve.</p>
        
        <h4 className="text-lg font-semibold mb-3">Servicios de Publicidad</h4>
        <p className="mb-4">Algunos de nuestros socios publicitarios pueden establecer cookies para mostrar anuncios relevantes basados en sus intereses.</p>
        
        <h4 className="text-lg font-semibold mb-3">Políticas de Terceros</h4>
        <p className="mb-4">Le recomendamos revisar las políticas de privacidad de estos proveedores de terceros para obtener más información sobre cómo utilizan las cookies.</p>
      `
    },
    {
      id: 'management',
      title: 'Gestión de Cookies',
      icon: Settings,
      content: `
        <h4 className="text-lg font-semibold mb-3">Configuración del Navegador</h4>
        <p className="mb-4">La mayoría de los navegadores web le permiten controlar las cookies a través de su configuración. Puede:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Ver qué cookies están almacenadas</li>
          <li>Eliminar cookies existentes</li>
          <li>Bloquear cookies futuras</li>
          <li>Configurar alertas cuando se establezcan cookies</li>
        </ul>
        
        <h4 className="text-lg font-semibold mb-3">Configuración por Navegador</h4>
        <p className="mb-4">Para obtener instrucciones específicas sobre cómo gestionar cookies en su navegador, visite:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Chrome:</strong> Configuración > Privacidad y seguridad > Cookies</li>
          <li><strong>Firefox:</strong> Opciones > Privacidad y seguridad > Cookies</li>
          <li><strong>Safari:</strong> Preferencias > Privacidad > Cookies</li>
          <li><strong>Edge:</strong> Configuración > Cookies y permisos del sitio</li>
        </ul>
        
        <h4 className="text-lg font-semibold mb-3">Herramientas de Gestión</h4>
        <p className="mb-4">También proporcionamos herramientas integradas en nuestro sitio web para gestionar sus preferencias de cookies de manera fácil y transparente.</p>
      `
    },
    {
      id: 'retention',
      title: 'Retención de Cookies',
      icon: Clock,
      content: `
        <h4 className="text-lg font-semibold mb-3">Períodos de Retención</h4>
        <p className="mb-4">Las cookies se almacenan en su dispositivo durante diferentes períodos de tiempo:</p>
        
        <h4 className="text-lg font-semibold mb-3">Cookies de Sesión</h4>
        <p className="mb-4">Se eliminan automáticamente cuando cierra su navegador. Estas cookies son esenciales para el funcionamiento básico del sitio web.</p>
        
        <h4 className="text-lg font-semibold mb-3">Cookies Persistentes</h4>
        <p className="mb-4">Permanecen en su dispositivo durante un período específico o hasta que las elimine manualmente. Los períodos típicos incluyen:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Cookies de rendimiento:</strong> Hasta 2 años</li>
          <li><strong>Cookies de funcionalidad:</strong> Hasta 1 año</li>
          <li><strong>Cookies de marketing:</strong> Hasta 1 año</li>
        </ul>
        
        <h4 className="text-lg font-semibold mb-3">Eliminación Automática</h4>
        <p className="mb-4">Algunas cookies se eliminan automáticamente después de un período específico, mientras que otras permanecen hasta que las elimine manualmente.</p>
      `
    },
    {
      id: 'security',
      title: 'Seguridad de Cookies',
      icon: Shield,
      content: `
        <h4 className="text-lg font-semibold mb-3">Protección de Datos</h4>
        <p className="mb-4">Implementamos medidas de seguridad para proteger la información recopilada a través de cookies:</p>
        
        <h4 className="text-lg font-semibold mb-3">Encriptación</h4>
        <p className="mb-4">Utilizamos encriptación para proteger los datos sensibles que se transmiten a través de cookies.</p>
        
        <h4 className="text-lg font-semibold mb-3">Configuración Segura</h4>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Cookies marcadas como "HttpOnly" cuando es apropiado</li>
          <li>Uso de HTTPS para transmisión segura</li>
          <li>Configuración de flags de seguridad apropiados</li>
          <li>Monitoreo regular de seguridad</li>
        </ul>
        
        <h4 className="text-lg font-semibold mb-3">Acceso Limitado</h4>
        <p className="mb-4">Solo el personal autorizado tiene acceso a la información recopilada a través de cookies, y solo para los propósitos especificados en esta política.</p>
        
        <h4 className="text-lg font-semibold mb-3">Auditorías Regulares</h4>
        <p className="mb-4">Realizamos auditorías regulares de nuestras prácticas de cookies para asegurar el cumplimiento con las mejores prácticas de seguridad.</p>
      `
    },
    {
      id: 'rights',
      title: 'Sus Derechos',
      icon: User,
      content: `
        <h4 className="text-lg font-semibold mb-3">Control de Cookies</h4>
        <p className="mb-4">Usted tiene derecho a:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Rechazar cookies no esenciales</li>
          <li>Eliminar cookies existentes</li>
          <li>Configurar preferencias de cookies</li>
          <li>Solicitar información sobre las cookies que utilizamos</li>
          <li>Retirar su consentimiento en cualquier momento</li>
        </ul>
        
        <h4 className="text-lg font-semibold mb-3">Ejercer sus Derechos</h4>
        <p className="mb-4">Para ejercer estos derechos, puede:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Utilizar nuestras herramientas de gestión de cookies</li>
          <li>Configurar su navegador web</li>
          <li>Contactarnos directamente</li>
          <li>Utilizar herramientas de terceros</li>
        </ul>
        
        <h4 className="text-lg font-semibold mb-3">Impacto de la Desactivación</h4>
        <p className="mb-4">Tenga en cuenta que desactivar ciertas cookies puede afectar la funcionalidad de nuestro sitio web y su experiencia de usuario.</p>
      `
    },
    {
      id: 'updates',
      title: 'Actualizaciones de la Política',
      icon: Calendar,
      content: `
        <h4 className="text-lg font-semibold mb-3">Cambios en la Política</h4>
        <p className="mb-4">Podemos actualizar esta Política de Cookies de vez en cuando para reflejar cambios en nuestras prácticas o por otras razones operativas, legales o regulatorias.</p>
        
        <h4 className="text-lg font-semibold mb-3">Notificación de Cambios</h4>
        <p className="mb-4">Cuando realicemos cambios significativos en esta política, le notificaremos a través de:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Notificaciones en nuestro sitio web</li>
          <li>Comunicaciones por correo electrónico</li>
          <li>Actualizaciones en nuestra aplicación</li>
        </ul>
        
        <h4 className="text-lg font-semibold mb-3">Fecha de Vigencia</h4>
        <p className="mb-4">Esta política está vigente desde ${cookiesData.lastUpdated}. Le recomendamos revisar esta política periódicamente para mantenerse informado sobre nuestras prácticas de cookies.</p>
        
        <h4 className="text-lg font-semibold mb-3">Contacto</h4>
        <p className="mb-4">Si tiene preguntas sobre esta Política de Cookies, puede contactarnos en ${cookiesData.contactEmail}.</p>
      `
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Cookie className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
              Política de Cookies
            </h1>
          </div>
          
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Información sobre cómo utilizamos las cookies para mejorar su experiencia
          </p>
          
          <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Última actualización: {cookiesData.lastUpdated}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Cookie className="w-4 h-4" />
              <span>Versión: {cookiesData.version}</span>
            </div>
          </div>
        </motion.div>

        {/* Gestor de Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 mb-8 border border-slate-200 dark:border-slate-700"
        >
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
            Gestor de Preferencias de Cookies
          </h3>
          
          <div className="space-y-4">
            {cookieTypes.map((cookieType) => (
              <div key={cookieType.id} className="border border-slate-200 dark:border-slate-600 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {cookieType.required ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <Settings className="w-5 h-5 text-blue-500" />
                    )}
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">
                        {cookieType.name}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {cookieType.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {cookieType.required ? (
                      <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded">
                        Siempre activo
                      </span>
                    ) : (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={cookiePreferences[cookieType.id as keyof typeof cookiePreferences]}
                          onChange={(e) => handleCookiePreference(cookieType.id, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
                      </label>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-slate-700 dark:text-slate-300">Ejemplos:</p>
                    <ul className="list-disc pl-4 text-slate-600 dark:text-slate-400">
                      {cookieType.examples.map((example, index) => (
                        <li key={index}>{example}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-slate-700 dark:text-slate-300">Duración:</p>
                    <p className="text-slate-600 dark:text-slate-400">{cookieType.duration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setCookiePreferences({
                  essential: true,
                  performance: false,
                  functionality: false,
                  marketing: false
                });
              }}
              className="border-slate-300 dark:border-slate-600"
            >
              Rechazar Todo
            </Button>
            <Button
              onClick={() => {
                setCookiePreferences({
                  essential: true,
                  performance: true,
                  functionality: true,
                  marketing: true
                });
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Aceptar Todo
            </Button>
          </div>
        </motion.div>

        {/* Secciones de la Política */}
        <div className="space-y-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            const isExpanded = expandedSections.includes(section.id);
            
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 text-blue-500" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {section.title}
                    </h3>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-500" />
                  )}
                </button>
                
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6"
                  >
                    <div 
                      className="prose prose-slate dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Acciones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-12"
        >
          <Button
            onClick={() => setShowDownloadModal(true)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg"
          >
            <Download className="w-4 h-4" />
            <span>Descargar PDF</span>
          </Button>
          
          <Button
            onClick={() => setShowContactModal(true)}
            variant="outline"
            className="flex items-center space-x-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 px-6 py-3 rounded-xl"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Contactar sobre Cookies</span>
          </Button>
        </motion.div>
      </div>

      {/* Modal de Descarga */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              Descargar Política de Cookies
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Descargue una copia de nuestra Política de Cookies en formato PDF para su archivo.
            </p>
            <div className="flex space-x-3">
              <Button
                onClick={() => {
                  // Simular descarga
                  const link = document.createElement('a');
                  link.href = '#';
                  link.download = 'politica-cookies-caocal.pdf';
                  link.click();
                  setShowDownloadModal(false);
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Descargar
              </Button>
              <Button
                onClick={() => setShowDownloadModal(false)}
                variant="outline"
                className="flex-1"
              >
                Cancelar
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Modal de Contacto */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              Contactar sobre Cookies
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Si tiene preguntas sobre nuestra Política de Cookies, puede contactarnos:
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-500" />
                <span className="text-slate-700 dark:text-slate-300">{cookiesData.contactEmail}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Cookie className="w-4 h-4 text-blue-500" />
                <span className="text-slate-700 dark:text-slate-300">Gestor de Cookies en la App</span>
              </div>
            </div>
            <Button
              onClick={() => setShowContactModal(false)}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Cerrar
            </Button>
          </motion.div>
        </div>
      )}
    </div>
  );
}; 