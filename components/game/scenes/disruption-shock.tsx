'use client'

import { ROLES, type Role } from '@/lib/game-types'
import { TypewriterText } from '../typewriter-text'
import { useState, useEffect } from 'react'

interface DisruptionShockProps {
  role: Role
  onContinue: () => void
}

const DISRUPTION_SCENARIOS: Record<Role, { title: string; description: string }> = {
  emprendedor: {
    title: 'ALERTA: Sistema de pagos comprometido',
    description: 'Un ataque de ransomware paraliza las pasarelas de pago. Tu startup y miles de negocios quedan sin poder operar. Las transacciones se detienen. Los clientes entran en panico.'
  },
  servidor_publico: {
    title: 'EMERGENCIA: Bases de datos gubernamentales vulneradas',
    description: 'Datos sensibles de millones de ciudadanos han sido expuestos. Los sistemas de identificacion fallan. Las filas en las oficinas crecen mientras la desconfianza se propaga.'
  },
  estudiante: {
    title: 'CRISIS: Plataformas educativas colapsadas',
    description: 'Un ataque coordinado tumba las plataformas de educacion virtual. Examenes perdidos, investigaciones borradas. El semestre de miles de estudiantes esta en riesgo.'
  },
  campesino: {
    title: 'DESCONEXION: Red satelital rural saboteada',
    description: 'Los sistemas de riego inteligente y monitoreo de cultivos dejan de funcionar. Sin datos meteorologicos, las cosechas estan en peligro. La brecha digital golpea donde mas duele.'
  }
}

export function DisruptionShock({ role, onContinue }: DisruptionShockProps) {
  const [showContent, setShowContent] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const scenario = DISRUPTION_SCENARIOS[role]
  const roleData = ROLES.find(r => r.id === role)

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
      <div className="max-w-3xl mx-auto text-center">
        {/* Alert header */}
        <div className="animate-pulse mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-full">
            <span className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
            <span className="text-red-400 font-mono text-sm">SISTEMA EN ALERTA</span>
          </div>
        </div>

        {showContent && (
          <>
            <h2 className="text-2xl md:text-4xl font-bold text-red-400 mb-6 animate-glitch">
              {scenario.title}
            </h2>

            <div className="bg-card/90 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-red-500/30 mb-6">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
                <span className="text-2xl">{roleData?.icon}</span>
                <span className="text-muted-foreground">Tu perspectiva como {roleData?.title}</span>
              </div>
              
              <TypewriterText
                text={scenario.description}
                speed={25}
                onComplete={() => setShowButton(true)}
                className="text-lg text-foreground leading-relaxed"
              />
            </div>

            <div className="bg-card/60 backdrop-blur-sm rounded-lg p-4 border border-border mb-8">
              <TypewriterText
                text='"Esto ya esta pasando. No es futuro. Es presente."'
                speed={50}
                className="text-primary italic"
              />
            </div>

            {showButton && (
              <button
                onClick={onContinue}
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-xl
                  hover:from-red-600 hover:to-orange-600 transition-all duration-300
                  hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] animate-fade-in"
              >
                Enfrentar la crisis
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}
