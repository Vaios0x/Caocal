import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  PieChart, 
  Home, 
  Bell, 
  Settings, 
  Sparkles, 
  ChevronDown,
  LogOut,
  UserCheck,
  Crown,
  Calendar,
  Mail,
  Clock,
  Shield,
  HelpCircle,
  X,
  Check,
  Trash2,
  Eye,
  Edit
} from 'lucide-react';
import { Button } from '@components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card';
import { useUserData } from '@/hooks/useUserData.js';
import { useNotifications } from '@/hooks/useUserData.js';

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUserData();
  const { notifications, unreadCount, markAllAsRead, deleteNotification, isLoading } = useNotifications();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Estados para modales
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showNotificationDetailsModal, setShowNotificationDetailsModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<any>(null);

  const isActive = (path: string) => location.pathname === path;

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowNotifications(false);
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setShowProfileMenu(false);
  };

  // Funciones de manejo para botones del perfil
  const handleViewProfile = () => {
    setShowProfileModal(true);
    setShowProfileMenu(false);
  };

  const handleSettings = () => {
    setShowProfileMenu(false);
    navigate('/settings');
  };

  const handleHelp = () => {
    setShowProfileMenu(false);
    navigate('/help');
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
    setShowProfileMenu(false);
  };

  const handleNotificationDetails = (notification: any) => {
    setSelectedNotification(notification);
    setShowNotificationDetailsModal(true);
    setShowNotifications(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Hace unos minutos';
    } else if (diffInHours < 24) {
      return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    } else {
      return date.toLocaleDateString('es-MX', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-success';
      case 'away': return 'bg-warning';
      case 'offline': return 'bg-muted-foreground';
      default: return 'bg-success';
    }
  };

  const getSubscriptionIcon = (subscription: string) => {
    switch (subscription) {
      case 'premium': return <Crown className="w-3 h-3 text-warning" />;
      case 'enterprise': return <Shield className="w-3 h-3 text-primary" />;
      default: return <UserCheck className="w-3 h-3 text-muted-foreground" />;
    }
  };

  const getNotificationTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'border-l-success bg-success/5';
      case 'warning': return 'border-l-warning bg-warning/5';
      case 'error': return 'border-l-destructive bg-destructive/5';
      case 'info': return 'border-l-info bg-info/5';
      default: return 'border-l-muted-foreground bg-muted/5';
    }
  };

  const getNotificationTypeIcon = (type: string) => {
    switch (type) {
      case 'success': return <Check className="w-4 h-4 text-success" />;
      case 'warning': return <Shield className="w-4 h-4 text-warning" />;
      case 'error': return <X className="w-4 h-4 text-destructive" />;
      case 'info': return <Eye className="w-4 h-4 text-info" />;
      default: return <Bell className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 glass-effect">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo mejorado */}
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200 cursor-pointer">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-info rounded-xl flex items-center justify-center shadow-lg animate-float">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse-slow"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold gradient-text">Caocal</span>
                <span className="text-xs text-muted-foreground">Wealth as a Service</span>
              </div>
            </Link>
          </motion.div>

          {/* Navegación mejorada */}
          <nav className="flex items-center space-x-2">
            <Link to="/">
              <Button
                variant={isActive('/') ? 'default' : 'ghost'}
                size="sm"
                className={`flex items-center space-x-2 transition-all duration-200 ${
                  isActive('/') ? 'shadow-md' : 'hover:bg-muted/50'
                }`}
                aria-label="Ir al Dashboard"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:block">Dashboard</span>
              </Button>
            </Link>

            <Link to="/portfolio">
              <Button
                variant={isActive('/portfolio') ? 'default' : 'ghost'}
                size="sm"
                className={`flex items-center space-x-2 transition-all duration-200 ${
                  isActive('/portfolio') ? 'shadow-md' : 'hover:bg-muted/50'
                }`}
                aria-label="Ver Portafolio"
              >
                <PieChart className="w-4 h-4" />
                <span className="hidden sm:block">Portafolio</span>
              </Button>
            </Link>
          </nav>

          {/* Acciones del usuario mejoradas */}
          <div className="flex items-center space-x-3">
            {/* Notificaciones */}
            <div className="relative">
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative"
                onClick={handleNotificationClick}
                aria-label="Ver notificaciones"
                aria-expanded={showNotifications}
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full animate-pulse-slow"></div>
                )}
              </Button>
              
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-96 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-50 max-h-96 overflow-hidden"
                  >
                    <Card className="border-0 shadow-none">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <span>Notificaciones</span>
                            {unreadCount > 0 && (
                              <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                                {unreadCount}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-1">
                            {unreadCount > 0 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={markAllAsRead}
                                disabled={isLoading}
                                aria-label="Marcar todas como leídas"
                                className="text-xs"
                              >
                                <Check className="w-3 h-3 mr-1" />
                                Marcar todas
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setShowNotifications(false)}
                              aria-label="Cerrar notificaciones"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="max-h-80 overflow-y-auto">
                          {isLoading ? (
                            <div className="text-center py-8">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                              <p className="text-sm text-muted-foreground mt-2">Cargando notificaciones...</p>
                            </div>
                          ) : notifications.length === 0 ? (
                            <div className="text-center py-8">
                              <Bell className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                              <p className="text-sm text-muted-foreground">No hay notificaciones</p>
                            </div>
                          ) : (
                            <div className="space-y-1">
                              {notifications.map((notification) => (
                                <motion.div
                                  key={notification.id}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  className={`p-3 border-l-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                                    !notification.isRead ? 'bg-muted/20' : ''
                                  } ${getNotificationTypeColor(notification.type)}`}
                                  onClick={() => handleNotificationDetails(notification)}
                                >
                                  <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 mt-0.5">
                                      {getNotificationTypeIcon(notification.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-foreground line-clamp-1">
                                          {notification.title}
                                        </p>
                                        <div className="flex items-center space-x-1">
                                          {!notification.isRead && (
                                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                                          )}
                                          <span className="text-xs text-muted-foreground">
                                            {formatDate(notification.createdAt)}
                                          </span>
                                        </div>
                                      </div>
                                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                        {notification.message}
                                      </p>
                                      {notification.icon && (
                                        <span className="text-lg mt-1 block">{notification.icon}</span>
                                      )}
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        deleteNotification(notification.id);
                                      }}
                                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                                      aria-label="Eliminar notificación"
                                    >
                                      <Trash2 className="w-3 h-3 text-muted-foreground" />
                                    </Button>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Configuración */}
            <Button 
              variant="ghost" 
              size="sm"
              aria-label="Configuración"
              onClick={() => navigate('/settings')}
            >
              <Settings className="w-4 h-4" />
            </Button>

            {/* Perfil del usuario */}
            {user && typeof user === 'object' && 'name' in user ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleProfileClick}
                  className="flex items-center space-x-2 p-2 hover:bg-muted/50 rounded-xl transition-all duration-200"
                  aria-label="Menú de perfil"
                  aria-expanded={showProfileMenu}
                >
                  <div className="hidden sm:flex flex-col items-end mr-2">
                    <span className="text-sm font-medium text-foreground line-clamp-1 max-w-32">
                      {user.name}
                    </span>
                    <div className="flex items-center space-x-1">
                      {user.subscription && getSubscriptionIcon(user.subscription)}
                      <span className="text-xs text-muted-foreground">
                        {user.role || 'Usuario'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <img
                      src={user.avatarUrl}
                      alt={`Avatar de ${user.name}`}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-200"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff&size=150`;
                      }}
                    />
                    {user.status && (
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(user.status)} rounded-full border-2 border-background animate-pulse-slow`}></div>
                    )}
                  </div>
                  
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`} />
                </Button>

                {/* Menú de perfil */}
                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-50"
                    >
                      <Card className="border-0 shadow-none">
                        <CardHeader className="pb-4">
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <img
                                src={user.avatarUrl}
                                alt={`Avatar de ${user.name}`}
                                className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff&size=150`;
                                }}
                              />
                              {user.status && (
                                <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(user.status)} rounded-full border-2 border-background`}></div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-foreground line-clamp-1">{user.name}</h3>
                              <div className="flex items-center space-x-1">
                                {user.subscription && getSubscriptionIcon(user.subscription)}
                                <span className="text-xs text-muted-foreground">
                                  {user.role || 'Usuario'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="space-y-4">
                          {/* Información del usuario */}
                          <div className="space-y-2">
                            {user.email && (
                              <div className="flex items-center space-x-2 text-sm">
                                <Mail className="w-4 h-4 text-muted-foreground" />
                                <span className="text-muted-foreground">{user.email}</span>
                              </div>
                            )}
                            {user.memberSince && (
                              <div className="flex items-center space-x-2 text-sm">
                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                <span className="text-muted-foreground">
                                  Miembro desde {formatDate(user.memberSince)}
                                </span>
                              </div>
                            )}
                            {user.lastActive && (
                              <div className="flex items-center space-x-2 text-sm">
                                <Clock className="w-4 h-4 text-muted-foreground" />
                                <span className="text-muted-foreground">
                                  Última actividad: {formatDate(user.lastActive)}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Acciones */}
                          <div className="space-y-1 pt-2 border-t border-slate-200 dark:border-slate-700">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start"
                              aria-label="Ver perfil completo"
                              onClick={handleViewProfile}
                            >
                              <User className="w-4 h-4 mr-2" />
                              Ver Perfil
                            </Button>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start"
                              aria-label="Configuración de cuenta"
                              onClick={handleSettings}
                            >
                              <Settings className="w-4 h-4 mr-2" />
                              Configuración
                            </Button>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start"
                              aria-label="Ayuda y soporte"
                              onClick={handleHelp}
                            >
                              <HelpCircle className="w-4 h-4 mr-2" />
                              Ayuda
                            </Button>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start text-destructive hover:text-destructive"
                              aria-label="Cerrar sesión"
                              onClick={handleLogout}
                            >
                              <LogOut className="w-4 h-4 mr-2" />
                              Cerrar Sesión
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center space-x-2"
                aria-label="Iniciar sesión"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:block">Iniciar Sesión</span>
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Overlay para cerrar menús */}
      <AnimatePresence>
        {(showProfileMenu || showNotifications) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={() => {
              setShowProfileMenu(false);
              setShowNotifications(false);
            }}
          />
        )}
      </AnimatePresence>

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
                  <h3 className="text-2xl font-bold text-white">Perfil de Usuario</h3>
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
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user?.avatarUrl}
                        alt={`Avatar de ${user?.name}`}
                        className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-500/20"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || '')}&background=6366f1&color=fff&size=150`;
                        }}
                      />
                      <div>
                        <h4 className="text-xl font-bold text-white">{user?.name}</h4>
                        <p className="text-slate-400">{user?.email}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          {user?.subscription && getSubscriptionIcon(user.subscription)}
                          <span className="text-sm text-slate-400">{user?.role || 'Usuario'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h5 className="text-lg font-semibold text-white">Información de Cuenta</h5>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Estado:</span>
                        <span className="text-emerald-500 font-medium">Activo</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Miembro desde:</span>
                        <span className="text-slate-400">{user?.memberSince ? formatDate(user.memberSince) : 'N/A'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Última actividad:</span>
                        <span className="text-slate-400">{user?.lastActive ? formatDate(user.lastActive) : 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-end space-x-3 pt-6 border-t border-slate-700">
                  <Button
                    onClick={() => setShowProfileModal(false)}
                    variant="outline"
                    className="border-slate-600 text-slate-300"
                  >
                    Cerrar
                  </Button>
                  <Button
                    onClick={() => {
                      navigate('/settings');
                      setShowProfileModal(false);
                    }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Editar Perfil
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Notification Details Modal */}
        {showNotificationDetailsModal && selectedNotification && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowNotificationDetailsModal(false)}
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
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    {getNotificationTypeIcon(selectedNotification.type)}
                  </div>
                  <h3 className="text-xl font-bold text-white">Detalles de Notificación</h3>
                </div>
                <Button
                  onClick={() => setShowNotificationDetailsModal(false)}
                  variant="ghost"
                  size="sm"
                  className="text-slate-400 hover:text-slate-300"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">{selectedNotification.title}</h4>
                  <p className="text-slate-300">{selectedNotification.message}</p>
                </div>
                
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>{formatDate(selectedNotification.createdAt)}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    selectedNotification.type === 'success' ? 'bg-emerald-500/20 text-emerald-400' :
                    selectedNotification.type === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                    selectedNotification.type === 'error' ? 'bg-red-500/20 text-red-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {selectedNotification.type}
                  </span>
                </div>
                
                {selectedNotification.actionUrl && (
                  <Button
                    onClick={() => {
                      navigate(selectedNotification.actionUrl);
                      setShowNotificationDetailsModal(false);
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    Ver Detalles
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Logout Modal */}
        {showLogoutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowLogoutModal(false)}
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
                  <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
                    <LogOut className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Cerrar Sesión</h3>
                </div>
                <Button
                  onClick={() => setShowLogoutModal(false)}
                  variant="ghost"
                  size="sm"
                  className="text-slate-400 hover:text-slate-300"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <p className="text-slate-300">
                  ¿Estás seguro de que quieres cerrar sesión? Se guardarán tus cambios automáticamente.
                </p>
                
                <div className="flex items-center justify-end space-x-3 pt-6">
                  <Button
                    onClick={() => setShowLogoutModal(false)}
                    variant="outline"
                    className="border-slate-600 text-slate-300"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={() => {
                      console.log('Cerrando sesión...');
                      setShowLogoutModal(false);
                      // Aquí iría la lógica de logout
                    }}
                    className="bg-gradient-to-r from-red-600 to-orange-600"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Cerrar Sesión
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}; 