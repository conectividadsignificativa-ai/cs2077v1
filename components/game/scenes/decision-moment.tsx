'use client'

import { type Decision } from '@/lib/game-types'
import { TypewriterText } from '../typewriter-text'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface DecisionMomentProps {
  onDecide: (decision: Decision) => void
}

const DECISIONS = [
  {
    id: 'colaborar' as Decision,
    title: 'Colaborar',
    description: 'Unir fuerzas con otros. Compartir conocimiento y recursos para enfrentar la crisis juntos.',
    icon: '🤝',
    color: 'from-emerald-500 to-teal-500',
    hoverColor: 'hover:border-emerald-400'
  },
  {
    id: 'protegerse' as Decision,
    title: 'Protegerse',
    description: 'Asegurar primero lo tuyo. Blindar tus sistemas y datos antes de pensar en los demas.',
    icon: '🛡️',
    color: 'from-amber-500 to-orange-500',
    hoverColor: 'hover:border-amber-400'
  },
  {
    id: 'no_hacer_nada' as Decision,
    title: 'No hacer nada',
    description: 'Esperar a que otros resuelvan. Quiza esto no es tu responsabilidad.',
    icon: '⏸️',
    color: 'from-gray-500 to-slate-500',
    hoverColor: 'hover:border-gray-400'
  }
]

export function DecisionMoment({ onDecide }: DecisionMomentProps) {
  const [showOptions, setShowOptions] = useState(false)
  const [selectedDecision, setSelectedDecision] = useState<Decision | null>(null)

  const handleSelect = (decision: Decision) => {
    setSelectedDecision(decision)
    setTimeout(() => onDecide(decision), 800)
  }

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
      {/* Frozen effect overlay */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent" />
        {/* Frozen particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-300/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-full mb-6">
          <span className="text-cyan-400 font-mono text-sm">TIEMPO CONGELADO</span>
        </div>

        <h2 className="text-2xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
          Momento de decision
        </h2>

        <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-cyan-500/30 mb-8">
          <TypewriterText
            text="El mundo se detiene. En este instante, tu decision importa. Recuerda: tu eleccion no es individual. Es parte de algo mas grande."
            speed={35}
            onComplete={() => setShowOptions(true)}
            className="text-lg md:text-xl text-foreground leading-relaxed"
          />
        </div>

        {showOptions && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
            {DECISIONS.map((decision, index) => (
              <button
                key={decision.id}
                onClick={() => handleSelect(decision.id)}
                disabled={selectedDecision !== null}
                className={cn(
                  'group relative overflow-hidden rounded-xl p-6',
                  'bg-card/80 backdrop-blur-sm',
                  'border-2 border-border',
                  decision.hoverColor,
                  'transition-all duration-300',
                  'hover:scale-[1.03]',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  selectedDecision === decision.id && 'ring-4 ring-white scale-105'
                )}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={cn(
                  'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity',
                  decision.color
                )} />
                
                <span className="text-4xl mb-4 block">{decision.icon}</span>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {decision.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {decision.description}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
