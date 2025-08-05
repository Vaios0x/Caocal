import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Eye,
  UserCheck, 
  FileText, 
  Calendar,
  Download,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  AlertCircle,
  Info,
  Mail,
  ExternalLink,
  Lock
} from 'lucide-react';
import { Button } from '@components/ui/Button';

export const Privacy: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['general']);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const privacyData = {
    lastUpdated: '15 de Agosto, 2025',
    version: 'v2.1',
    contactEmail: 'privacidad@caocal.mx',
    dataController: 'Caocal Technologies S.A. de C.V.',
    address: 'México'
  };

  const sections = [
    {
      id: 'general',
      title: 'Información General',
      icon: Info,
      content: `
        <h4 className="text-lg font-semibold mb-3">Acerca de esta Política</h4>
        <p className="mb-4">Esta Política de Privacidad describe cómo Caocal ("nosotros", "nuestro", "la Compañía") recopila, utiliza y protege su información personal cuando utiliza nuestra plataforma de Wealth-as-a-Service.</p>
        
        <h4 className="text-lg font-semibold mb-3">Alcance</h4>
        <p className="mb-4">Esta política se aplica a todos los usuarios de la plataforma Caocal, incluyendo visitantes, usuarios registrados y clientes.</p>
        
        <h4 className="text-lg font-semibold mb-3">Consentimiento</h4>
        <p className="mb-4">Al utilizar nuestros servicios, usted acepta la recopilación y uso de información de acuerdo con esta política.</p>
      `
    },
    {
      id: 'collection',
      title: 'Información que Recopilamos',
      icon: Eye,
      content: `
        <h4 className="text-lg font-semibold mb-3">Información Personal</h4>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Nombre completo y apellidos</li>
          <li>Dirección de correo electrónico</li>
          <li>Número de teléfono</li>
          <li>Información de identificación oficial</li>
          <li>Dirección física</li>
        </ul>
        
        <h4 className="text-lg font-semibold mb-3">Información Financiera</h4>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Información de ingresos y gastos</li>
          <li>Historial de transacciones</li>
          <li>Metas financieras y preferencias de inversión</li>
          <li>Información bancaria (encriptada)</li>
        </ul>
        
        <h4 className="text-lg font-semibold mb-3">Información Técnica</h4>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Dirección IP y ubicación geográfica</li>
          <li>Información del dispositivo y navegador</li>
          <li>Cookies y tecnologías de seguimiento</li>
          <li>Logs de actividad y uso</li>
        </ul>
      `
    },
    {
      id: 'usage',
      title: 'Cómo Utilizamos su Información',
      icon: UserCheck,
      content: `
        <h4 className="text-lg font-semibold mb-3">Propósitos Principales</h4>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Proporcionar y mejorar nuestros servicios</li>
          <li>Procesar transacciones y pagos</li>
          <li>Personalizar la experiencia del usuario</li>
          <li>Comunicarnos con usted sobre su cuenta</li>
          <li>Cumplir con obligaciones legales y regulatorias</li>
        </ul>
        
        <h4 className="text-lg font-semibold mb-3">Análisis y Mejoras</h4>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Analizar patrones de uso para mejorar la plataforma</li>
          <li>Desarrollar nuevas características y funcionalidades</li>
          <li>Optimizar el rendimiento y la seguridad</li>
          <li>Realizar investigaciones de mercado</li>
        </ul>
        
        <h4 className="text-lg font-semibold mb-3">Marketing</h4>
        <p className="mb-4">Podemos utilizar su información para enviar comunicaciones sobre nuevos productos, servicios y ofertas especiales, siempre con su consentimiento previo.</p>
      `
    },
    {
      id: 'sharing',
      title: 'Compartir Información',
      icon: ExternalLink,
      content: `
        <h4 className="text-lg font-semibold mb-3">Cuándo Compartimos</h4>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Con su consentimiento explícito</li>
          <li>Para cumplir con obligaciones legales</li>
          <li>Con proveedores de servicios autorizados</li>
          <li>Para proteger nuestros derechos y seguridad</li>
          <li>En caso de fusión o adquisición empresarial</li>
        </ul>
        
        <h4 className="text-lg font-semibold mb-3">Proveedores de Servicios</h4>
        <p className="mb-4">Trabajamos con proveedores de servicios de confianza que nos ayudan a operar nuestra plataforma. Estos incluyen:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Proveedores de infraestructura en la nube</li>
          <li>Servicios de procesamiento de pagos</li>
          <li>Herramientas de análisis y marketing</li>
          <li>Servicios de soporte al cliente</li>
        </ul>
        
        <h4 className="text-lg font-semibold mb-3">Transferencias Internacionales</h4>
        <p className="mb-4">Su información puede ser transferida y procesada en países fuera de México. Garantizamos que estas transferencias cumplan con las leyes de protección de datos aplicables.</p>
      `
    },
    {
      id: 'security',
      title: 'Seguridad de Datos',
      icon: Lock,
      content: `
        <h4 className="text-lg font-semibold mb-3">Medidas de Seguridad</h4>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Encriptación de datos en tránsito y en reposo</li>
          <li>Autenticación de múltiples factores</li>
          <li>Monitoreo continuo de seguridad</li>
          <li>Acceso restringido a información personal</li>
          <li>Auditorías regulares de seguridad</li>
        </ul>
        
        <h4 className="text-lg font-semibold mb-3">Protección de Datos</h4>
        <p className="mb-4">Implementamos medidas técnicas y organizativas apropiadas para proteger su información personal contra acceso no autorizado, alteración, divulgación o destrucción.</p>
        
        <h4 className="text-lg font-semibold mb-3">Notificación de Incidentes</h4>
        <p className="mb-4">En caso de una violación de seguridad que afecte su información personal, lo notificaremos sin demora indebida y tomaremos medidas para mitigar cualquier daño potencial.</p>
      `
    },
    {
      id: 'rights',
      title: 'Sus Derechos',
      icon: CheckCircle,
      content: `
        <h4 className="text-lg font-semibold mb-3">Derechos ARCO</h4>
        <p className="mb-4">Usted tiene los siguientes derechos respecto a su información personal:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Acceso:</strong> Solicitar información sobre qué datos tenemos sobre usted</li>
          <li><strong>Rectificación:</strong> Corregir datos inexactos o incompletos</li>
          <li><strong>Cancelación:</strong> Eliminar su información personal</li>
          <li><strong>Oposición:</strong> Oponerse al procesamiento de sus datos</li>
        </ul>
        
        <h4 className="text-lg font-semibold mb-3">Ejercer sus Derechos</h4>
        <p className="mb-4">Para ejercer cualquiera de estos derechos, puede contactarnos a través de:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Email: ${privacyData.contactEmail}</li>
          <li>Portal de privacidad en nuestra aplicación</li>
          <li>Formulario de solicitud en nuestro sitio web</li>
        </ul>
        
        <h4 className="text-lg font-semibold mb-3">Tiempo de Respuesta</h4>
        <p className="mb-4">Responderemos a su solicitud dentro de los 20 días hábiles siguientes a su recepción.</p>
      `
    },
    {
      id: 'cookies',
      title: 'Cookies y Tecnologías Similares',
      icon: FileText,
      content: `
        <h4 className="text-lg font-semibold mb-3">¿Qué son las Cookies?</h4>
        <p className="mb-4">Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestro sitio web.</p>
        
        <h4 className="text-lg font-semibold mb-3">Tipos de Cookies que Utilizamos</h4>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Cookies Esenciales:</strong> Necesarias para el funcionamiento básico del sitio</li>
          <li><strong>Cookies de Rendimiento:</strong> Nos ayudan a entender cómo se utiliza el sitio</li>
          <li><strong>Cookies de Funcionalidad:</strong> Mejoran su experiencia recordando sus preferencias</li>
          <li><strong>Cookies de Marketing:</strong> Utilizadas para mostrar contenido relevante</li>
        </ul>
        
        <h4 className="text-lg font-semibold mb-3">Gestión de Cookies</h4>
        <p className="mb-4">Puede controlar y gestionar las cookies a través de la configuración de su navegador o utilizando nuestras herramientas de gestión de cookies.</p>
      `
    },
    {
      id: 'retention',
      title: 'Retención de Datos',
      icon: Calendar,
      content: `
        <h4 className="text-lg font-semibold mb-3">Períodos de Retención</h4>
        <p className="mb-4">Conservamos su información personal solo durante el tiempo necesario para los fines descritos en esta política:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Datos de la cuenta:</strong> Mientras su cuenta esté activa</li>
          <li><strong>Información financiera:</strong> 7 años (requisito legal)</li>
          <li><strong>Logs de actividad:</strong> 2 años</li>
          <li><strong>Datos de marketing:</strong> Hasta que revoque su consentimiento</li>
        </ul>
        
        <h4 className="text-lg font-semibold mb-3">Eliminación de Datos</h4>
        <p className="mb-4">Cuando ya no necesitemos su información personal, la eliminaremos de forma segura o la anonimizaremos para fines estadísticos.</p>
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
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
              Política de Privacidad
            </h1>
          </div>
          
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Protegemos su privacidad y garantizamos la seguridad de su información personal
          </p>
          
          <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Última actualización: {privacyData.lastUpdated}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Versión: {privacyData.version}</span>
            </div>
          </div>
        </motion.div>

        {/* Información del Controlador */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 mb-8 border border-slate-200 dark:border-slate-700"
        >
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
            Información del Controlador de Datos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Responsable del tratamiento:</p>
              <p className="font-medium text-slate-900 dark:text-white">{privacyData.dataController}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Contacto:</p>
              <p className="font-medium text-slate-900 dark:text-white">{privacyData.contactEmail}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Dirección:</p>
              <p className="font-medium text-slate-900 dark:text-white">{privacyData.address}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Vigencia:</p>
              <p className="font-medium text-slate-900 dark:text-white">{privacyData.lastUpdated}</p>
            </div>
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
            <AlertCircle className="w-4 h-4" />
            <span>Contactar sobre Privacidad</span>
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
              Descargar Política de Privacidad
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Descargue una copia de nuestra Política de Privacidad en formato PDF para su archivo.
            </p>
            <div className="flex space-x-3">
              <Button
                onClick={() => {
                  // Simular descarga
                  const link = document.createElement('a');
                  link.href = '#';
                  link.download = 'politica-privacidad-caocal.pdf';
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
              Contactar sobre Privacidad
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Si tiene preguntas sobre nuestra Política de Privacidad, puede contactarnos:
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-500" />
                <span className="text-slate-700 dark:text-slate-300">{privacyData.contactEmail}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-4 h-4 text-blue-500" />
                <span className="text-slate-700 dark:text-slate-300">Portal de Privacidad en la App</span>
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