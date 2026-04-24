export type Role = 'emprendedor' | 'servidor_publico' | 'estudiante' | 'campesino'

export type Decision = 'colaborar' | 'protegerse' | 'no_hacer_nada'

export type Skill = 
  | 'programacion' 
  | 'creatividad' 
  | 'liderazgo' 
  | 'comunicacion' 
  | 'pensamiento_critico'
  | 'empatia'

export type Value = 
  | 'equidad' 
  | 'innovacion' 
  | 'sostenibilidad' 
  | 'comunidad' 
  | 'educacion'
  | 'transparencia'

export interface GameState {
  level: 1 | 2
  scene: number
  role: Role | null
  decision: Decision | null
  selectedSkills: Skill[]
  selectedValues: Value[]
  narrativeIndex: number
  isTransitioning: boolean
}

export interface RoleData {
  id: Role
  title: string
  description: string
  environment: string
  icon: string
}

export interface DecisionOutcome {
  decision: Decision
  headline: string
  description: string
  visualState: 'improved' | 'deteriorated' | 'neutral'
}

export const ROLES: RoleData[] = [
  {
    id: 'emprendedor',
    title: 'Emprendedor Tech',
    description: 'Coworking en Bogota, rodeado de pantallas y startups',
    environment: 'coworking',
    icon: '💻'
  },
  {
    id: 'servidor_publico',
    title: 'Servidor Publico',
    description: 'Oficina gubernamental con sistemas criticos',
    environment: 'oficina_publica',
    icon: '🏛️'
  },
  {
    id: 'estudiante',
    title: 'Estudiante Universitario',
    description: 'Campus conectado, entre clases virtuales y presenciales',
    environment: 'universidad',
    icon: '📚'
  },
  {
    id: 'campesino',
    title: 'Campesino Digital',
    description: 'Zona rural con conectividad satelital emergente',
    environment: 'rural',
    icon: '🌾'
  }
]

export const SKILLS_DATA: { id: Skill; label: string; color: string }[] = [
  { id: 'programacion', label: 'Programacion', color: 'from-cyan-400 to-blue-500' },
  { id: 'creatividad', label: 'Creatividad', color: 'from-pink-400 to-purple-500' },
  { id: 'liderazgo', label: 'Liderazgo', color: 'from-orange-400 to-red-500' },
  { id: 'comunicacion', label: 'Comunicacion', color: 'from-green-400 to-teal-500' },
  { id: 'pensamiento_critico', label: 'Pensamiento Critico', color: 'from-yellow-400 to-orange-500' },
  { id: 'empatia', label: 'Empatia', color: 'from-purple-400 to-pink-500' }
]

export const VALUES_DATA: { id: Value; label: string; color: string }[] = [
  { id: 'equidad', label: 'Equidad', color: 'from-blue-400 to-indigo-500' },
  { id: 'innovacion', label: 'Innovacion', color: 'from-cyan-400 to-teal-500' },
  { id: 'sostenibilidad', label: 'Sostenibilidad', color: 'from-green-400 to-emerald-500' },
  { id: 'comunidad', label: 'Comunidad', color: 'from-orange-400 to-amber-500' },
  { id: 'educacion', label: 'Educacion', color: 'from-purple-400 to-violet-500' },
  { id: 'transparencia', label: 'Transparencia', color: 'from-sky-400 to-blue-500' }
]

export const DECISION_OUTCOMES: Record<Decision, DecisionOutcome> = {
  colaborar: {
    decision: 'colaborar',
    headline: '2024: Comunidades digitales colombianas crean red de respuesta colaborativa ante ciberataques',
    description: 'Tu decision de colaborar fortalecio el tejido social digital. La corresponsabilidad colectiva demostro ser el mejor escudo.',
    visualState: 'improved'
  },
  protegerse: {
    decision: 'protegerse',
    headline: '2024: Aumentan brechas digitales mientras sectores priorizan proteccion individual',
    description: 'La proteccion individual tiene su lugar, pero sin colaboracion, las vulnerabilidades se multiplican.',
    visualState: 'neutral'
  },
  no_hacer_nada: {
    decision: 'no_hacer_nada',
    headline: '2024: Colapso de servicios digitales afecta a millones por falta de respuesta ciudadana',
    description: 'La inaccion tiene consecuencias. Cada momento sin actuar es una oportunidad perdida.',
    visualState: 'deteriorated'
  }
}
