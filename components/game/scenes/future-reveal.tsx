'use client'

import { SKILLS_DATA, VALUES_DATA, type Skill, type Value, type Decision, type Role } from '@/lib/game-types'
import { TypewriterText } from '../typewriter-text'
import { cn } from '@/lib/utils'
import { useState, useMemo } from 'react'

interface FutureRevealProps {
  role: Role
  decision: Decision
  skills: Skill[]
  values: Value[]
  onRestart: () => void
}

const generateFutureMessage = (
  role: Role,
  decision: Decision,
  skills: Skill[],
  values: Value[]
): { title: string; message: string; archetype: string } => {
  const skillLabels = skills.map(s => SKILLS_DATA.find(sd => sd.id === s)?.label || s)
  const valueLabels = values.map(v => VALUES_DATA.find(vd => vd.id === v)?.label || v)

  // Determine archetype based on combinations
  let archetype = ''
  let title = ''
  let message = ''

  const hasCreativity = skills.includes('creatividad')
  const hasProgramming = skills.includes('programacion')
  const hasLeadership = skills.includes('liderazgo')
  const hasEmpathy = skills.includes('empatia')
  const hasCommunication = skills.includes('comunicacion')
  const hasCriticalThinking = skills.includes('pensamiento_critico')

  const valuesInnovation = values.includes('innovacion')
  const valuesCommunity = values.includes('comunidad')
  const valuesEquity = values.includes('equidad')
  const valuesSustainability = values.includes('sostenibilidad')
  const valuesEducation = values.includes('educacion')
  const valuesTransparency = values.includes('transparencia')

  if (hasProgramming && valuesInnovation) {
    archetype = 'Arquitecto Digital'
    title = 'El Futuro que Construyes'
    message = `Ves la tecnologia como herramienta de transformacion. Con tu capacidad de ${skillLabels.join(' y ')}, y tu compromiso con la ${valueLabels.join(' y ')}, estas destinado/a a construir los puentes digitales que conectaran a Colombia con el mundo. Tu vision: una nacion donde la innovacion sirve a todos.`
  } else if (hasLeadership && valuesCommunity) {
    archetype = 'Tejedor Social'
    title = 'El Futuro que Lideras'
    message = `Tu fuerza esta en unir a las personas. Con habilidades en ${skillLabels.join(' y ')} y valores de ${valueLabels.join(' y ')}, tienes el poder de crear movimientos que transformen comunidades enteras. Tu futuro: ser el puente entre la tecnologia y las necesidades humanas reales.`
  } else if (hasCreativity && valuesEducation) {
    archetype = 'Innovador Educativo'
    title = 'El Futuro que Imaginas'
    message = `La creatividad y la educacion son tu combustible. Tus habilidades en ${skillLabels.join(' y ')} combinadas con tu pasion por ${valueLabels.join(' y ')} te posicionan para reinventar como Colombia aprende y crece en la era digital.`
  } else if (hasEmpathy && valuesEquity) {
    archetype = 'Guardian de la Inclusion'
    title = 'El Futuro que Proteges'
    message = `Tu sensibilidad hacia los demas te distingue. Con ${skillLabels.join(' y ')} y un corazon comprometido con ${valueLabels.join(' y ')}, seras quien asegure que nadie quede atras en la transformacion digital de Colombia.`
  } else if (hasCriticalThinking && valuesTransparency) {
    archetype = 'Vigilante Digital'
    title = 'El Futuro que Cuestionas'
    message = `Tu mente analitica es un escudo contra la desinformacion. Con ${skillLabels.join(' y ')} y compromiso con ${valueLabels.join(' y ')}, estas llamado/a a ser la voz critica que Colombia necesita en un mundo de algoritmos.`
  } else if (hasCommunication && valuesSustainability) {
    archetype = 'Narrador del Cambio'
    title = 'El Futuro que Comunicas'
    message = `Las palabras son tu poder. Tus habilidades en ${skillLabels.join(' y ')} junto con tu vision de ${valueLabels.join(' y ')} te convierten en el mensajero que puede inspirar a millones hacia un futuro mas consciente.`
  } else {
    archetype = 'Pionero del Manana'
    title = 'El Futuro que Defines'
    message = `Tu combinacion unica de ${skillLabels.join(' y ')} con valores de ${valueLabels.join(' y ')} te hace un agente de cambio indispensable. No hay una sola formula para el futuro de Colombia, y tu perspectiva singular es exactamente lo que necesitamos.`
  }

  // Add decision context
  const decisionContext = decision === 'colaborar' 
    ? 'Tu instinto de colaborar demuestra que entiendes que el futuro se construye en comunidad.'
    : decision === 'protegerse'
    ? 'Tu decision de proteger lo tuyo refleja la importancia del autocuidado en tiempos de crisis.'
    : 'Incluso la inaccion es una eleccion, y reconocer esto es el primer paso hacia la corresponsabilidad.'

  message += ' ' + decisionContext

  return { title, message, archetype }
}

export function FutureReveal({ role, decision, skills, values, onRestart }: FutureRevealProps) {
  const [showMessage, setShowMessage] = useState(false)
  const [showButton, setShowButton] = useState(false)

  const future = useMemo(() => 
    generateFutureMessage(role, decision, skills, values),
    [role, decision, skills, values]
  )

  const selectedSkillLabels = skills.map(s => SKILLS_DATA.find(sd => sd.id === s))
  const selectedValueLabels = values.map(v => VALUES_DATA.find(vd => vd.id === v))

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
      {/* Synthwave sun in background */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="w-96 h-48 rounded-t-full bg-gradient-to-t from-orange-500 via-pink-500 to-purple-600 opacity-30 blur-2xl" />
      </div>

      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 border border-pink-500/30 rounded-full mb-6 animate-pulse">
          <span className="text-pink-400 font-mono text-sm">VISION DEL FUTURO</span>
        </div>

        <div className="bg-card/80 backdrop-blur-md rounded-2xl p-6 md:p-10 border border-primary/30 mb-8 shadow-[0_0_60px_rgba(168,85,247,0.2)]">
          <div className="mb-6 pb-6 border-b border-border">
            <span className="text-5xl mb-4 block animate-bounce-slow">
              {future.archetype === 'Arquitecto Digital' && '🏗️'}
              {future.archetype === 'Tejedor Social' && '🕸️'}
              {future.archetype === 'Innovador Educativo' && '💡'}
              {future.archetype === 'Guardian de la Inclusion' && '🛡️'}
              {future.archetype === 'Vigilante Digital' && '👁️'}
              {future.archetype === 'Narrador del Cambio' && '📣'}
              {future.archetype === 'Pionero del Manana' && '🚀'}
            </span>
            <h3 className="text-xl text-muted-foreground mb-2">Tu arquetipo</h3>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {future.archetype}
            </h2>
          </div>

          <h3 className="text-2xl font-bold text-foreground mb-6">{future.title}</h3>

          <TypewriterText
            text={future.message}
            speed={25}
            onComplete={() => {
              setShowMessage(true)
              setTimeout(() => setShowButton(true), 500)
            }}
            className="text-lg text-foreground/90 leading-relaxed"
          />

          {showMessage && (
            <div className="mt-8 pt-6 border-t border-border animate-fade-in">
              <p className="text-sm text-muted-foreground mb-4">Tus elecciones</p>
              <div className="flex flex-wrap justify-center gap-2">
                {selectedSkillLabels.map(skill => skill && (
                  <span 
                    key={skill.id}
                    className={cn(
                      'px-3 py-1 rounded-full text-sm text-white bg-gradient-to-r',
                      skill.color
                    )}
                  >
                    {skill.label}
                  </span>
                ))}
                {selectedValueLabels.map(value => value && (
                  <span 
                    key={value.id}
                    className={cn(
                      'px-3 py-1 rounded-full text-sm text-white bg-gradient-to-r',
                      value.color
                    )}
                  >
                    {value.label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {showButton && (
          <div className="space-y-4 animate-fade-in">
            <p className="text-muted-foreground italic">
              "El futuro de Colombia esta en tus manos. La corresponsabilidad digital comienza hoy."
            </p>
            <button
              onClick={onRestart}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-bold rounded-xl
                hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] transition-all duration-300 hover:scale-105"
            >
              Explorar otro futuro
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
