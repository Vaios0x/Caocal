import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Scale, 
  Shield, 
  AlertTriangle, 
  XCircle,
  Download,
  ChevronDown,
  ChevronUp,
  Info,
  Calendar,
  User,
  Lock,
  Mail
} from 'lucide-react';
import { Button } from '@components/ui/Button';

export const Terms: React.FC = () => {
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

  const termsData = {
    lastUpdated: '15 de Agosto, 2025',
    version: 'v2.1',
    contactEmail: 'legal@caocal.mx',
    company: 'Caocal Technologies S.A. de C.V.',
    address: 'México'
  };

  const sections = [
    {
      id: 'general',
      title: 'Información General',
      icon: Info,
      content: `
        <h4 className="text-lg font-semibold mb-3">Acerca de estos Términos</h4>
        <p className="mb-4">Estos Términos y Condiciones ("Términos") rigen el uso de la plataforma Caocal, un servicio de Wealth-as-a-Service que automatiza el micro-ahorro y la micro-inversión.</p>
        
        <h4 className="text-lg font-semibold mb-3">Aceptación de Términos</h4>
        <p className="mb-4">Al acceder y utilizar nuestros servicios, usted acepta estar sujeto a estos Términos. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestros servicios.</p>
        
        <h4 className="text-lg font-semibold mb-3">Modificaciones</h4>
        <p className="mb-4">Nos reservamos el derecho de modificar estos Términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en la plataforma.</p>
      `
    },
    {
      id: 'services',
      title: 'Descripción de Servicios',
      icon: FileText,
      content: `
        <h4 className="text-lg font-semibold mb-3">Servicios Ofrecidos</h4>
        <p className="mb-4">Caocal proporciona una plataforma de Wealth-as-a-Service que incluye:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Automatización de micro-ahorro</li>
          <li>Micro-inversiones automatizadas</li>
          <li>Análisis financiero y reportes</li>
          <li>Herramientas de educación financiera</li>
          <li>Calculadoras financieras</li>
          <li>Insights de inteligencia artificial</li>
        </ul>
        
        <h4 className="text-lg font-semibold mb-3">Naturaleza Experimental</h4>
        <p className="mb-4"><strong>IMPORTANTE:</strong> Caocal es un proyecto experimental en desarrollo. No procesamos transacciones reales y todos los datos mostrados son simulados para fines educativos y de demostración.</p>
        
        <h4 className="text-lg font-semibold mb-3">Disponibilidad</h4>
        <p className="mb-4">Nos esforzamos por mantener la plataforma disponible 24/7, pero no garantizamos la disponibilidad ininterrumpida. Podemos realizar mantenimiento programado con previo aviso.</p>
      `
    },
    {
      id: 'eligibility',
      title: 'Elegibilidad y Registro',
      icon: User,
      content: `
        <h4 className="text-lg font-semibold mb-3">Requisitos de Elegibilidad</h4>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Tener al menos 18 años de edad</li>
          <li>Ser residente legal de México</li>
          <li>Proporcionar información veraz y completa</li>
          <li>No estar en listas de exclusión financiera</li>
          <li>Aceptar estos términos y condiciones</li>
        </ul>
        
        <h4 className="text-lg font-semibold mb-3">Proceso de Registro</h4>
        <p className="mb-4">Para registrarse en Caocal, debe:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Completar el formulario de registro con información precisa</li>
          <li>Verificar su dirección de correo electrónico</li>
          <li>Proporcionar documentación de identificación válida</li>
          <li>Completar el proceso de verificación de identidad</li>
        </ul>
        
        <h4 className="text-lg font-semibold mb-3">Responsabilidad de la Cuenta</h4>
        <p className="mb-4">Usted es responsable de mantener la confidencialidad de sus credenciales de acceso y de todas las actividades que ocurran bajo su cuenta.</p>
      `
    },
    {
      id: 'prohibited',
      title: 'Usos Prohibidos',
      icon: XCircle,
      content: `
        <h4 className="text-lg font-semibold mb-3">Actividades Prohibidas</h4>
        <p className="mb-4">Está prohibido utilizar nuestros servicios para:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Actividades ilegales o fraudulentas</li>
          <li>Lavado de dinero o financiamiento del terrorismo</li>
          <li>Violación de derechos de propiedad intelectual</li>
          <li>Spam o actividades de marketing no autorizadas</li>
          <li>Intentos de hackeo o comprometer la seguridad</li>
          <li>Uso comercial no autorizado</li>
        </ul>
        
        <h4 className="text-lg font-semibold mb-3">Consecuencias</h4>
        <p className="mb-4">La violación de estas prohibiciones puede resultar en la suspensión o terminación inmediata de su cuenta, así como en acciones legales correspondientes.</p>
        
        <h4 className="text-lg font-semibold mb-3">Reportes</h4>
        <p className="mb-4">Si detecta actividades sospechosas o violaciones de estos términos, por favor repórtelas inmediatamente a nuestro equipo de seguridad.</p>
      `
    },
    {
      id: 'intellectual',
      title: 'Propiedad Intelectual',
      icon: Shield,
      content: `
        <h4 className="text-lg font-semibold mb-3">Derechos de Caocal</h4>
        <p className="mb-4">Caocal y su contenido, incluyendo pero no limitado a software, diseño, texto, gráficos, logos y marcas comerciales, son propiedad de Caocal Technologies S.A. de C.V. y están protegidos por las leyes de propiedad intelectual.</p>
        
        <h4 className="text-lg font-semibold mb-3">Licencia de Uso</h4>
        <p className="mb-4">Le otorgamos una licencia limitada, no exclusiva, no transferible y revocable para utilizar nuestros servicios únicamente para fines personales y de acuerdo con estos términos.</p>
        
        <h4 className="text-lg font-semibold mb-3">Restricciones</h4>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>No puede copiar, modificar o distribuir nuestro contenido</li>
          <li>No puede realizar ingeniería inversa de nuestro software</li>
          <li>No puede crear trabajos derivados</li>
          <li>No puede usar nuestras marcas comerciales sin autorización</li>
        </ul>
        
        <h4 className="text-lg font-semibold mb-3">Contenido del Usuario</h4>
        <p className="mb-4">Usted conserva los derechos sobre el contenido que proporcione, pero nos otorga una licencia para utilizarlo en la prestación de nuestros servicios.</p>
      `
    },
    {
      id: 'privacy',
      title: 'Privacidad y Datos',
      icon: Lock,
      content: `
        <h4 className="text-lg font-semibold mb-3">Protección de Datos</h4>
        <p className="mb-4">Su privacidad es importante para nosotros. El procesamiento de sus datos personales se rige por nuestra Política de Privacidad, que forma parte integral de estos términos.</p>
        
        <h4 className="text-lg font-semibold mb-3">Recopilación de Datos</h4>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Información personal de identificación</li>
          <li>Datos financieros y de transacciones</li>
          <li>Información de uso de la plataforma</li>
          <li>Datos técnicos y de dispositivos</li>
        </ul>
        
        <h4 className="text-lg font-semibold mb-3">Uso de Datos</h4>
        <p className="mb-4">Utilizamos sus datos para:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Proporcionar y mejorar nuestros servicios</li>
          <li>Procesar transacciones y pagos</li>
          <li>Cumplir con obligaciones legales</li>
          <li>Comunicarnos con usted</li>
        </ul>
        
        <h4 className="text-lg font-semibold mb-3">Seguridad</h4>
        <p className="mb-4">Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger sus datos personales contra acceso no autorizado, alteración, divulgación o destrucción.</p>
      `
    },
    {
      id: 'limitations',
      title: 'Limitaciones de Responsabilidad',
      icon: AlertTriangle,
      content: `
        <h4 className="text-lg font-semibold mb-3">Exclusión de Garantías</h4>
        <p className="mb-4">Nuestros servicios se proporcionan "tal como están" y "según disponibilidad". No garantizamos que los servicios sean ininterrumpidos, libres de errores o seguros.</p>
        
        <h4 className="text-lg font-semibold mb-3">Limitación de Daños</h4>
        <p className="mb-4">En ningún caso Caocal será responsable por daños indirectos, incidentales, especiales, consecuentes o punitivos, incluyendo pérdida de beneficios, datos o uso.</p>
        
        <h4 className="text-lg font-semibold mb-3">Límite de Responsabilidad</h4>
        <p className="mb-4">La responsabilidad total de Caocal por cualquier daño no excederá el monto pagado por usted por nuestros servicios en los 12 meses anteriores al evento que dio lugar a la reclamación.</p>
        
        <h4 className="text-lg font-semibold mb-3">Excepciones</h4>
        <p className="mb-4">Estas limitaciones no se aplican en casos de negligencia grave, fraude o violación de derechos de propiedad intelectual.</p>
      `
    },
    {
      id: 'indemnification',
      title: 'Indemnización',
      icon: Scale,
      content: `
        <h4 className="text-lg font-semibold mb-3">Su Responsabilidad</h4>
        <p className="mb-4">Usted acepta indemnizar y eximir de responsabilidad a Caocal, sus directores, empleados y agentes de cualquier reclamación, daño, pérdida o gasto (incluyendo honorarios legales) que surja de:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Su uso de nuestros servicios</li>
          <li>Violación de estos términos</li>
          <li>Violación de derechos de terceros</li>
          <li>Actividades fraudulentas o ilegales</li>
        </ul>
        
        <h4 className="text-lg font-semibold mb-3">Cooperación</h4>
        <p className="mb-4">Usted se compromete a cooperar plenamente en la defensa de cualquier reclamación cubierta por esta indemnización.</p>
        
        <h4 className="text-lg font-semibold mb-3">Control de Defensa</h4>
        <p className="mb-4">Caocal tendrá el derecho de controlar la defensa y liquidación de cualquier reclamación cubierta por esta indemnización, a su propia discreción.</p>
      `
    },
    {
      id: 'termination',
      title: 'Terminación',
      icon: XCircle,
      content: `
        <h4 className="text-lg font-semibold mb-3">Terminación por Usted</h4>
        <p className="mb-4">Puede cancelar su cuenta en cualquier momento a través de la configuración de su perfil o contactando a nuestro servicio al cliente.</p>
        
        <h4 className="text-lg font-semibold mb-3">Terminación por Caocal</h4>
        <p className="mb-4">Podemos suspender o terminar su cuenta inmediatamente si:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Violan estos términos</li>
          <li>Participan en actividades fraudulentas</li>
          <li>Proporcionan información falsa</li>
          <li>No pagan las tarifas aplicables</li>
          <li>Comprometen la seguridad de la plataforma</li>
        </ul>
        
        <h4 className="text-lg font-semibold mb-3">Efectos de la Terminación</h4>
        <p className="mb-4">Al terminar su cuenta:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Perderá acceso inmediato a nuestros servicios</li>
          <li>Conservaremos ciertos datos según nuestra política de retención</li>
          <li>Las disposiciones de estos términos que por su naturaleza deban sobrevivir permanecerán en vigor</li>
        </ul>
      `
    },
    {
      id: 'governing',
      title: 'Ley Aplicable y Jurisdicción',
      icon: Scale,
      content: `
        <h4 className="text-lg font-semibold mb-3">Ley Aplicable</h4>
        <p className="mb-4">Estos términos se rigen e interpretan de acuerdo con las leyes de los Estados Unidos Mexicanos, sin considerar sus principios de conflicto de leyes.</p>
        
        <h4 className="text-lg font-semibold mb-3">Jurisdicción</h4>
        <p className="mb-4">Cualquier disputa que surja de estos términos o del uso de nuestros servicios será resuelta en los tribunales competentes de México, y usted acepta someterse a la jurisdicción personal de dichos tribunales.</p>
        
        <h4 className="text-lg font-semibold mb-3">Resolución de Disputas</h4>
        <p className="mb-4">Antes de iniciar cualquier procedimiento legal, las partes se comprometen a intentar resolver cualquier disputa mediante negociación directa o mediación.</p>
        
        <h4 className="text-lg font-semibold mb-3">Renuncia a Juicio por Jurado</h4>
        <p className="mb-4">Usted renuncia expresamente a cualquier derecho a un juicio por jurado en cualquier acción legal que surja de estos términos.</p>
      `
    },
    {
      id: 'miscellaneous',
      title: 'Disposiciones Varias',
      icon: FileText,
      content: `
        <h4 className="text-lg font-semibold mb-3">Acuerdo Completo</h4>
        <p className="mb-4">Estos términos, junto con nuestra Política de Privacidad, constituyen el acuerdo completo entre usted y Caocal con respecto a nuestros servicios.</p>
        
        <h4 className="text-lg font-semibold mb-3">Divisibilidad</h4>
        <p className="mb-4">Si alguna disposición de estos términos se considera inválida o inaplicable, las disposiciones restantes permanecerán en pleno vigor y efecto.</p>
        
        <h4 className="text-lg font-semibold mb-3">Renuncia</h4>
        <p className="mb-4">La falta de ejercicio de cualquier derecho o disposición de estos términos no constituirá una renuncia a dicho derecho o disposición.</p>
        
        <h4 className="text-lg font-semibold mb-3">Cesión</h4>
        <p className="mb-4">Usted no puede ceder o transferir estos términos sin nuestro consentimiento previo por escrito. Podemos ceder estos términos sin restricción.</p>
        
        <h4 className="text-lg font-semibold mb-3">Notificaciones</h4>
        <p className="mb-4">Las notificaciones relacionadas con estos términos se enviarán por correo electrónico a la dirección registrada en su cuenta o mediante publicación en la plataforma.</p>
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
              <Scale className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
              Términos y Condiciones
            </h1>
          </div>
          
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Lea cuidadosamente estos términos antes de utilizar nuestros servicios
          </p>
          
          <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Última actualización: {termsData.lastUpdated}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Versión: {termsData.version}</span>
            </div>
          </div>
        </motion.div>

        {/* Información de la Empresa */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 mb-8 border border-slate-200 dark:border-slate-700"
        >
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
            Información de la Empresa
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Empresa:</p>
              <p className="font-medium text-slate-900 dark:text-white">{termsData.company}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Contacto legal:</p>
              <p className="font-medium text-slate-900 dark:text-white">{termsData.contactEmail}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Dirección:</p>
              <p className="font-medium text-slate-900 dark:text-white">{termsData.address}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Vigencia:</p>
              <p className="font-medium text-slate-900 dark:text-white">{termsData.lastUpdated}</p>
            </div>
          </div>
        </motion.div>

        {/* Secciones de los Términos */}
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
            <span>Contactar sobre Términos</span>
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
              Descargar Términos y Condiciones
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Descargue una copia de nuestros Términos y Condiciones en formato PDF para su archivo.
            </p>
            <div className="flex space-x-3">
              <Button
                onClick={() => {
                  // Simular descarga
                  const link = document.createElement('a');
                  link.href = '#';
                  link.download = 'terminos-condiciones-caocal.pdf';
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
              Contactar sobre Términos
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Si tiene preguntas sobre nuestros Términos y Condiciones, puede contactarnos:
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-500" />
                <span className="text-slate-700 dark:text-slate-300">{termsData.contactEmail}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Scale className="w-4 h-4 text-blue-500" />
                <span className="text-slate-700 dark:text-slate-300">Departamento Legal</span>
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