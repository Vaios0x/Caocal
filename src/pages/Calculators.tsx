import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator,
  TrendingUp,
  Target,
  Shield,
  BarChart3,
  PieChart,
  Calendar,
  ArrowRight,
  RefreshCw,
  Download,
  Share2,
  CreditCard,
  Activity,
  Users,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card';
import { Button } from '@components/ui/Button';

// Tipos para las calculadoras
interface CalculatorTool {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  category: 'inversión' | 'ahorro' | 'préstamo' | 'planificación' | 'análisis';
}

interface CalculationResult {
  label: string;
  value: string;
  unit?: string;
  color?: string;
}

export const Calculators: React.FC = () => {
  const [activeCalculator, setActiveCalculator] = useState<string>('compound-interest');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Herramientas de calculadoras disponibles
  const calculatorTools: CalculatorTool[] = [
    {
      id: 'compound-interest',
      title: 'Interés Compuesto',
      description: 'Calcula el crecimiento de tus inversiones a lo largo del tiempo',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-100 dark:bg-emerald-900/20',
      category: 'inversión'
    },
    {
      id: 'loan-calculator',
      title: 'Calculadora de Préstamos',
      description: 'Calcula cuotas mensuales y total a pagar en préstamos',
      icon: <CreditCard className="w-6 h-6" />,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
      category: 'préstamo'
    },
    {
      id: 'savings-goal',
      title: 'Meta de Ahorro',
      description: 'Planifica cuánto ahorrar para alcanzar tus objetivos',
      icon: <Target className="w-6 h-6" />,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
      category: 'ahorro'
    },
    {
      id: 'retirement-planning',
      title: 'Planificación de Jubilación',
      description: 'Calcula cuánto necesitas ahorrar para tu jubilación',
      icon: <Calendar className="w-6 h-6" />,
      color: 'text-orange-500',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20',
      category: 'planificación'
    },
    {
      id: 'investment-return',
      title: 'Retorno de Inversión',
      description: 'Calcula el ROI y rendimiento de tus inversiones',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/20',
      category: 'inversión'
    },
    {
      id: 'debt-payoff',
      title: 'Plan de Pago de Deudas',
      description: 'Estrategias para pagar deudas de forma eficiente',
      icon: <Shield className="w-6 h-6" />,
      color: 'text-red-500',
      bgColor: 'bg-red-100 dark:bg-red-900/20',
      category: 'préstamo'
    },
    {
      id: 'budget-calculator',
      title: 'Calculadora de Presupuesto',
      description: 'Organiza tus ingresos y gastos mensuales',
      icon: <PieChart className="w-6 h-6" />,
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
      category: 'planificación'
    },
    {
      id: 'risk-assessment',
      title: 'Evaluación de Riesgo',
      description: 'Analiza el nivel de riesgo de tus inversiones',
      icon: <Activity className="w-6 h-6" />,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
      category: 'análisis'
    }
  ];

  // Estados para las calculadoras
  const [compoundInterest, setCompoundInterest] = useState({
    principal: 10000,
    rate: 8,
    time: 10,
    frequency: 12
  });

  const [loanCalculator, setLoanCalculator] = useState({
    amount: 50000,
    rate: 6,
    term: 60
  });

  const [savingsGoal, setSavingsGoal] = useState({
    target: 50000,
    current: 10000,
    monthly: 500,
    rate: 5
  });

  const [retirementPlanning, setRetirementPlanning] = useState({
    currentAge: 30,
    retirementAge: 65,
    currentSavings: 50000,
    monthlyContribution: 1000,
    expectedReturn: 7
  });

  // Funciones de cálculo
  const calculateCompoundInterest = (): CalculationResult[] => {
    const { principal, rate, time, frequency } = compoundInterest;
    const r = rate / 100;
    const n = frequency;
    const t = time;
    
    const amount = principal * Math.pow(1 + r/n, n*t);
    const interest = amount - principal;
    
    return [
      { label: 'Monto Final', value: amount.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' }), color: 'text-emerald-600' },
      { label: 'Interés Ganado', value: interest.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' }), color: 'text-blue-600' },
      { label: 'Capital Inicial', value: principal.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' }), color: 'text-slate-600' }
    ];
  };

  const calculateLoan = (): CalculationResult[] => {
    const { amount, rate, term } = loanCalculator;
    const monthlyRate = rate / 100 / 12;
    const monthlyPayment = amount * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
    const totalPayment = monthlyPayment * term;
    const totalInterest = totalPayment - amount;
    
    return [
      { label: 'Pago Mensual', value: monthlyPayment.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' }), color: 'text-emerald-600' },
      { label: 'Total a Pagar', value: totalPayment.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' }), color: 'text-blue-600' },
      { label: 'Interés Total', value: totalInterest.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' }), color: 'text-red-600' }
    ];
  };

  const calculateSavingsGoal = () => {
    const { target, current, monthly, rate } = savingsGoal;
    const monthlyRate = rate / 100 / 12;
    const remaining = target - current;
    
    if (monthlyRate === 0) {
      const months = Math.ceil(remaining / monthly);
      return [
        { label: 'Meses Necesarios', value: months.toString(), unit: 'meses', color: 'text-emerald-600' },
        { label: 'Ahorro Total', value: (months * monthly).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' }), color: 'text-blue-600' },
        { label: 'Faltante', value: remaining.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' }), color: 'text-orange-600' }
      ];
    }
    
    const months = Math.log(1 + (remaining * monthlyRate) / monthly) / Math.log(1 + monthlyRate);
    const totalSaved = current + (monthly * months);
    
    return [
      { label: 'Meses Necesarios', value: Math.ceil(months).toString(), unit: 'meses', color: 'text-emerald-600' },
      { label: 'Ahorro Total', value: totalSaved.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' }), color: 'text-blue-600' },
      { label: 'Interés Ganado', value: (totalSaved - target).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' }), color: 'text-green-600' }
    ];
  };

  const calculateRetirement = () => {
    const { currentAge, retirementAge, currentSavings, monthlyContribution, expectedReturn } = retirementPlanning;
    const years = retirementAge - currentAge;
    const monthlyRate = expectedReturn / 100 / 12;
    const months = years * 12;
    
    const futureValue = currentSavings * Math.pow(1 + expectedReturn/100, years) + 
                       monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    
    return [
      { label: 'Ahorro Total', value: futureValue.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' }), color: 'text-emerald-600' },
      { label: 'Años de Ahorro', value: years.toString(), unit: 'años', color: 'text-blue-600' },
      { label: 'Contribución Total', value: (monthlyContribution * months).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' }), color: 'text-purple-600' }
    ];
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'inversión': return 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20';
      case 'ahorro': return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'préstamo': return 'text-purple-500 bg-purple-50 dark:bg-purple-900/20';
      case 'planificación': return 'text-orange-500 bg-orange-50 dark:bg-orange-900/20';
      case 'análisis': return 'text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20';
      default: return 'text-slate-500 bg-slate-50 dark:bg-slate-900/20';
    }
  };

  const filteredCalculators = selectedCategory === 'all' 
    ? calculatorTools 
    : calculatorTools.filter(tool => tool.category === selectedCategory);

  const renderCalculator = () => {
    switch (activeCalculator) {
      case 'compound-interest':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Capital Inicial (MXN)
                </label>
                <input
                  type="number"
                  value={compoundInterest.principal}
                  onChange={(e) => setCompoundInterest({...compoundInterest, principal: Number(e.target.value)})}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Tasa de Interés Anual (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={compoundInterest.rate}
                  onChange={(e) => setCompoundInterest({...compoundInterest, rate: Number(e.target.value)})}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Tiempo (Años)
                </label>
                <input
                  type="number"
                  value={compoundInterest.time}
                  onChange={(e) => setCompoundInterest({...compoundInterest, time: Number(e.target.value)})}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Frecuencia de Capitalización
                </label>
                <select
                  value={compoundInterest.frequency}
                  onChange={(e) => setCompoundInterest({...compoundInterest, frequency: Number(e.target.value)})}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={1}>Anual</option>
                  <option value={2}>Semestral</option>
                  <option value={4}>Trimestral</option>
                  <option value={12}>Mensual</option>
                  <option value={365}>Diario</option>
                </select>
              </div>
            </div>
            
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                  <span>Resultados del Interés Compuesto</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {calculateCompoundInterest().map((result, index) => (
                    <div key={index} className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                      <p className="text-sm text-slate-600 dark:text-slate-400">{result.label}</p>
                      <p className={`text-xl font-bold ${result.color}`}>
                        {result.value}
                        {result.unit && <span className="text-sm ml-1">{result.unit}</span>}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'loan-calculator':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Monto del Préstamo (MXN)
                </label>
                <input
                  type="number"
                  value={loanCalculator.amount}
                  onChange={(e) => setLoanCalculator({...loanCalculator, amount: Number(e.target.value)})}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Tasa de Interés Anual (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={loanCalculator.rate}
                  onChange={(e) => setLoanCalculator({...loanCalculator, rate: Number(e.target.value)})}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Plazo (Meses)
                </label>
                <input
                  type="number"
                  value={loanCalculator.term}
                  onChange={(e) => setLoanCalculator({...loanCalculator, term: Number(e.target.value)})}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5 text-blue-500" />
                  <span>Resultados del Préstamo</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {calculateLoan().map((result, index) => (
                    <div key={index} className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                      <p className="text-sm text-slate-600 dark:text-slate-400">{result.label}</p>
                      <p className={`text-xl font-bold ${result.color}`}>
                        {result.value}
                        {result.unit && <span className="text-sm ml-1">{result.unit}</span>}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'savings-goal':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Meta de Ahorro (MXN)
                </label>
                <input
                  type="number"
                  value={savingsGoal.target}
                  onChange={(e) => setSavingsGoal({...savingsGoal, target: Number(e.target.value)})}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Ahorro Actual (MXN)
                </label>
                <input
                  type="number"
                  value={savingsGoal.current}
                  onChange={(e) => setSavingsGoal({...savingsGoal, current: Number(e.target.value)})}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Ahorro Mensual (MXN)
                </label>
                <input
                  type="number"
                  value={savingsGoal.monthly}
                  onChange={(e) => setSavingsGoal({...savingsGoal, monthly: Number(e.target.value)})}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Tasa de Interés Anual (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={savingsGoal.rate}
                  onChange={(e) => setSavingsGoal({...savingsGoal, rate: Number(e.target.value)})}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-purple-500" />
                  <span>Plan de Ahorro</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {calculateSavingsGoal().map((result, index) => (
                    <div key={index} className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                      <p className="text-sm text-slate-600 dark:text-slate-400">{result.label}</p>
                      <p className={`text-xl font-bold ${result.color}`}>
                        {result.value}
                        {result.unit && <span className="text-sm ml-1">{result.unit}</span>}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'retirement-planning':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Edad Actual
                </label>
                <input
                  type="number"
                  value={retirementPlanning.currentAge}
                  onChange={(e) => setRetirementPlanning({...retirementPlanning, currentAge: Number(e.target.value)})}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Edad de Jubilación
                </label>
                <input
                  type="number"
                  value={retirementPlanning.retirementAge}
                  onChange={(e) => setRetirementPlanning({...retirementPlanning, retirementAge: Number(e.target.value)})}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Ahorro Actual (MXN)
                </label>
                <input
                  type="number"
                  value={retirementPlanning.currentSavings}
                  onChange={(e) => setRetirementPlanning({...retirementPlanning, currentSavings: Number(e.target.value)})}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Contribución Mensual (MXN)
                </label>
                <input
                  type="number"
                  value={retirementPlanning.monthlyContribution}
                  onChange={(e) => setRetirementPlanning({...retirementPlanning, monthlyContribution: Number(e.target.value)})}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Retorno Esperado Anual (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={retirementPlanning.expectedReturn}
                  onChange={(e) => setRetirementPlanning({...retirementPlanning, expectedReturn: Number(e.target.value)})}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-orange-500" />
                  <span>Plan de Jubilación</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {calculateRetirement().map((result, index) => (
                    <div key={index} className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                      <p className="text-sm text-slate-600 dark:text-slate-400">{result.label}</p>
                      <p className={`text-xl font-bold ${result.color}`}>
                        {result.value}
                        {result.unit && <span className="text-sm ml-1">{result.unit}</span>}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <div className="text-center space-y-4 py-20">
            <Calculator className="w-16 h-16 text-slate-400 mx-auto" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
              Selecciona una Calculadora
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Elige una herramienta de la lista para comenzar a calcular
            </p>
          </div>
        );
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
          <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg border border-green-500/20">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Calculadoras Financieras
          </h1>
        </div>
        <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed">
          Herramientas avanzadas para planificar tus finanzas, calcular inversiones y alcanzar tus metas financieras
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
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Herramientas Disponibles</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {calculatorTools.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center border border-green-200 dark:border-green-800">
                <Calculator className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Cálculos Realizados</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  1,247
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
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Usuarios Activos</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  892
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center border border-purple-200 dark:border-purple-800">
                <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Precisión</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  99.9%
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center border border-emerald-200 dark:border-emerald-800">
                <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filtros de categorías */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex justify-center"
      >
        <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700">
          {[
            { id: 'all', label: 'Todas' },
            { id: 'inversión', label: 'Inversión' },
            { id: 'ahorro', label: 'Ahorro' },
            { id: 'préstamo', label: 'Préstamos' },
            { id: 'planificación', label: 'Planificación' },
            { id: 'análisis', label: 'Análisis' }
          ].map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span className="font-medium">{category.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Grid de calculadoras */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {filteredCalculators.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card 
              className={`card-hover h-full cursor-pointer transition-all duration-300 ${
                activeCalculator === tool.id ? 'ring-2 ring-green-500' : ''
              }`}
              onClick={() => setActiveCalculator(tool.id)}
            >
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
                  
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(tool.category)}`}>
                      {tool.category.charAt(0).toUpperCase() + tool.category.slice(1)}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Calculadora activa */}
      {activeCalculator && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {calculatorTools.find(tool => tool.id === activeCalculator)?.title}
            </h2>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Reiniciar
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <Card className="card-hover">
            <CardContent className="p-6">
              {renderCalculator()}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}; 