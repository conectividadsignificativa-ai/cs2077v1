'use client'

import { SKILLS_DATA, VALUES_DATA, type Skill, type Value } from '@/lib/game-types'
import { TypewriterText } from '../typewriter-text'
import { FloatingOrb } from '../floating-orb'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface SkillsSelectionProps {
  onComplete: (skills: Skill[], values: Value[]) => void
}

type Phase = 'intro' | 'skills' | 'values'

export function SkillsSelection({ onComplete }: SkillsSelectionProps) {
  const [phase, setPhase] = useState<Phase>('intro')
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([])
  const [selectedValues, setSelectedValues] = useState<Value[]>([])
  const [showOrbs, setShowOrbs] = useState(false)

  const handleSkillToggle = (skill: Skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : prev.length < 3 ? [...prev, skill] : prev
    )
  }

  const handleValueToggle = (value: Value) => {
    setSelectedValues(prev => 
      prev.includes(value) 
        ? prev.filter(v => v !== value)
        : prev.length < 2 ? [...prev, value] : prev
    )
  }

  const handleContinue = () => {
    if (phase === 'skills' && selectedSkills.length >= 1) {
      setPhase('values')
      setShowOrbs(false)
    } else if (phase === 'values' && selectedValues.length >= 1) {
      onComplete(selectedSkills, selectedValues)
    }
  }

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-lg md:text-xl text-muted-foreground mb-4">
          Nivel 2: Futuros posibles
        </p>
        
        <h2 className="text-2xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Construye tu vision del futuro
        </h2>

        {phase === 'intro' && (
          <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-border mb-8">
            <TypewriterText
              text="Ahora es momento de mirar hacia adelante. A traves de tus elecciones, construiras implicitamente el futuro que deseas para Colombia. Selecciona los elementos que resuenan contigo."
              speed={30}
              onComplete={() => {
                setTimeout(() => setPhase('skills'), 1000)
              }}
              className="text-lg md:text-xl text-foreground leading-relaxed"
            />
          </div>
        )}

        {phase === 'skills' && (
          <div className="animate-fade-in">
            <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border mb-8">
              <TypewriterText
                text="¿Con que habilidades te identificas para construir el futuro de Colombia? (Selecciona hasta 3)"
                speed={25}
                onComplete={() => setShowOrbs(true)}
                className="text-lg text-foreground"
              />
            </div>

            {showOrbs && (
              <>
                <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8">
                  {SKILLS_DATA.map((skill, index) => (
                    <FloatingOrb
                      key={skill.id}
                      label={skill.label}
                      colorClass={skill.color}
                      isSelected={selectedSkills.includes(skill.id)}
                      onClick={() => handleSkillToggle(skill.id)}
                      delay={index * 100}
                    />
                  ))}
                </div>

                <p className="text-muted-foreground mb-4">
                  {selectedSkills.length}/3 seleccionadas
                </p>

                <button
                  onClick={handleContinue}
                  disabled={selectedSkills.length < 1}
                  className={cn(
                    'px-8 py-4 font-bold rounded-xl transition-all duration-300',
                    selectedSkills.length >= 1
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]'
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  )}
                >
                  Continuar
                </button>
              </>
            )}
          </div>
        )}

        {phase === 'values' && (
          <div className="animate-fade-in">
            <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border mb-8">
              <TypewriterText
                text="¿Que consideras mas importante para el futuro de Colombia? (Selecciona hasta 2)"
                speed={25}
                onComplete={() => setShowOrbs(true)}
                className="text-lg text-foreground"
              />
            </div>

            {showOrbs && (
              <>
                <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8">
                  {VALUES_DATA.map((value, index) => (
                    <FloatingOrb
                      key={value.id}
                      label={value.label}
                      colorClass={value.color}
                      isSelected={selectedValues.includes(value.id)}
                      onClick={() => handleValueToggle(value.id)}
                      delay={index * 100}
                    />
                  ))}
                </div>

                <p className="text-muted-foreground mb-4">
                  {selectedValues.length}/2 seleccionados
                </p>

                <button
                  onClick={handleContinue}
                  disabled={selectedValues.length < 1}
                  className={cn(
                    'px-8 py-4 font-bold rounded-xl transition-all duration-300',
                    selectedValues.length >= 1
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]'
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  )}
                >
                  Revelar mi futuro
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
