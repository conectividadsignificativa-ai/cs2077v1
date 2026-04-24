'use client'

import { ROLES, type Role } from '@/lib/game-types'
import { TypewriterText } from '../typewriter-text'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface RoleSelectionProps {
  onSelect: (role: Role) => void
}

export function RoleSelection({ onSelect }: RoleSelectionProps) {
  const [showOptions, setShowOptions] = useState(false)
  const [hoveredRole, setHoveredRole] = useState<Role | null>(null)

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
          COLOMBIA 2077
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8">
          Nivel 1: Jaque a la disrupcion
        </p>
        
        <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-border mb-8">
          <TypewriterText
            text="Tu rol define como ves el futuro... pero no lo determina. Elige quien seras en esta historia."
            speed={40}
            onComplete={() => setShowOptions(true)}
            className="text-lg md:text-xl text-foreground leading-relaxed"
          />
        </div>

        {showOptions && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
            {ROLES.map((role, index) => (
              <button
                key={role.id}
                onClick={() => onSelect(role.id)}
                onMouseEnter={() => setHoveredRole(role.id)}
                onMouseLeave={() => setHoveredRole(null)}
                className={cn(
                  'group relative overflow-hidden rounded-xl p-6',
                  'bg-gradient-to-br from-card to-card/50',
                  'border-2 border-border hover:border-primary',
                  'transition-all duration-300',
                  'hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]',
                  'hover:scale-[1.02]',
                  'text-left'
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{role.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {role.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {role.description}
                    </p>
                  </div>
                </div>
                
                {hoveredRole === role.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent pointer-events-none" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
