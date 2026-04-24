'use client'

import { useState, useEffect } from 'react'
import { collection, query, getDocs, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie,
  Legend
} from 'recharts'
import { ROLES, DECISION_OUTCOMES, SKILLS_DATA, VALUES_DATA } from '@/lib/game-types'
import { motion } from 'motion/react'
import Link from 'next/link'
import { ArrowLeft, Loader2, Users, Target, Zap, ShieldCheck } from 'lucide-react'

interface StatsData {
  roleCounts: { name: string; value: number; color: string }[]
  decisionCounts: { name: string; value: number; color: string }[]
  skillCounts: { name: string; value: number; color: string }[]
  valueCounts: { name: string; value: number; color: string }[]
  totalPlayers: number
}

const COLORS = ['#F472B6', '#38BDF8', '#FB923C', '#A855F7', '#4ADE80', '#2DD4BF']

export default function StatsPage() {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const q = query(collection(db, 'sessions'), orderBy('timestamp', 'desc'))
        const snapshot = await getDocs(q)
        
        const roles: Record<string, number> = {}
        const decisions: Record<string, number> = {}
        const skills: Record<string, number> = {}
        const values: Record<string, number> = {}
        let total = 0

        snapshot.forEach((doc) => {
          const data = doc.data()
          total++
          
          // Count Roles
          const roleLabel = ROLES.find(r => r.id === data.role)?.title || data.role
          roles[roleLabel] = (roles[roleLabel] || 0) + 1
          
          // Count Decisions
          const decisionLabel = data.decision === 'colaborar' ? 'Colaborar' : 
                               data.decision === 'protegerse' ? 'Protegerse' : 'No hacer nada'
          decisions[decisionLabel] = (decisions[decisionLabel] || 0) + 1
          
          // Count Skills
          if (data.skills && Array.isArray(data.skills)) {
            data.skills.forEach((s: string) => {
              const skillLabel = SKILLS_DATA.find(sd => sd.id === s)?.label || s
              skills[skillLabel] = (skills[skillLabel] || 0) + 1
            })
          }
          
          // Count Values
          if (data.values && Array.isArray(data.values)) {
            data.values.forEach((v: string) => {
              const valueLabel = VALUES_DATA.find(vd => vd.id === v)?.label || v
              values[valueLabel] = (values[valueLabel] || 0) + 1
            })
          }
        })

        setStats({
          totalPlayers: total,
          roleCounts: Object.entries(roles).map(([name, value], i) => ({ 
            name, 
            value, 
            color: COLORS[i % COLORS.length] 
          })),
          decisionCounts: Object.entries(decisions).map(([name, value], i) => ({ 
            name, 
            value, 
            color: COLORS[i % COLORS.length] 
          })),
          skillCounts: Object.entries(skills).map(([name, value], i) => ({ 
            name, 
            value, 
            color: COLORS[i % COLORS.length] 
          })).sort((a, b) => b.value - a.value),
          valueCounts: Object.entries(values).map(([name, value], i) => ({ 
            name, 
            value, 
            color: COLORS[i % COLORS.length] 
          })).sort((a, b) => b.value - a.value),
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0c] text-white">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="font-mono animate-pulse">CARGANDO ESTADISTICAS DEL FUTURO...</p>
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0c] text-white">
        <p>No hay datos suficientes para mostrar estadísticas.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white p-4 md:p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent mb-2">
              DASHBOARD COLOMBIA 2077
            </h1>
            <p className="text-muted-foreground font-mono">ESTADISTICAS DE CORRESPONSABILIDAD DIGITAL</p>
          </div>
          
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all font-bold group w-fit"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver al Juego
          </Link>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard 
            icon={<Users className="text-cyan-400" />} 
            label="Total Jugadores" 
            value={stats.totalPlayers.toString()} 
          />
          <StatCard 
            icon={<Target className="text-pink-400" />} 
            label="Decision mas común" 
            value={stats.decisionCounts[0]?.name || "N/A"} 
          />
          <StatCard 
            icon={<Zap className="text-yellow-400" />} 
            label="Habilidad Prioritaria" 
            value={stats.skillCounts[0]?.name || "N/A"} 
          />
          <StatCard 
            icon={<ShieldCheck className="text-green-400" />} 
            label="Valor mas votado" 
            value={stats.valueCounts[0]?.name || "N/A"} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Roles Selection */}
          <ChartContainer title="Distribución de Roles">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.roleCounts}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2e" />
                <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1e', border: '1px solid #333', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {stats.roleCounts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Decisions */}
          <ChartContainer title="Decisiones de Respuesta">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.decisionCounts}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stats.decisionCounts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1e', border: '1px solid #333', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Top Skills */}
          <ChartContainer title="Habilidades Seleccionadas">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.skillCounts.slice(0, 6)} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2e" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#666" fontSize={10} width={100} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1e', border: '1px solid #333', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Top Values */}
          <ChartContainer title="Valores Éticos">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.valueCounts.slice(0, 6)} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2e" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#666" fontSize={10} width={100} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1e', border: '1px solid #333', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="value" fill="#ec4899" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10 text-center">
          <p className="text-muted-foreground italic max-w-2xl mx-auto">
            "Este estudio busca entender como las juventudes colombianas proyectan su rol en un futuro digital incierto. Cada eleccion en Colombia 2077 cuenta una historia de liderazgo y corresponsabilidad."
          </p>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-card/40 backdrop-blur-sm border border-white/10 rounded-2xl"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-white/5 rounded-xl">
          {icon}
        </div>
        <span className="text-sm font-mono text-muted-foreground uppercase tracking-widest">{label}</span>
      </div>
      <div className="text-3xl font-bold">{value}</div>
    </motion.div>
  )
}

function ChartContainer({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 bg-card/40 backdrop-blur-sm border border-white/10 rounded-2xl"
    >
      <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
        <div className="w-1 h-4 bg-primary rounded-full" />
        {title}
      </h3>
      {children}
    </motion.div>
  )
}
