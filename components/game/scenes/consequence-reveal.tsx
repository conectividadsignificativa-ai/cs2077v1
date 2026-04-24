'use client'

import { DECISION_OUTCOMES, type Decision } from '@/lib/game-types'
import { TypewriterText } from '../typewriter-text'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface ConsequenceRevealProps {
  decision: Decision
  onContinue: () => void
}

export function ConsequenceReveal({ decision, onContinue }: ConsequenceRevealProps) {
  const [showHeadline, setShowHeadline] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const outcome = DECISION_OUTCOMES[decision]

  const getVisualStyle = () => {
    switch (outcome.visualState) {
      case 'improved':
        return {
          borderColor: 'border-emerald-500/50',
          bgGlow: 'bg-emerald-500/10',
          textColor: 'text-emerald-400',
          icon: '🌱'
        }
      case 'deteriorated':
        return {
          borderColor: 'border-red-500/50',
          bgGlow: 'bg-red-500/10',
          textColor: 'text-red-400',
          icon: '⚠️'
        }
      default:
        return {
          borderColor: 'border-amber-500/50',
          bgGlow: 'bg-amber-500/10',
          textColor: 'text-amber-400',
          icon: '⚖️'
        }
    }
  }

  const style = getVisualStyle()

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
      <div className="max-w-3xl mx-auto text-center">
        <div className={cn('inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6', style.bgGlow, 'border', style.borderColor)}>
          <span className="text-2xl">{style.icon}</span>
          <span className={cn('font-mono text-sm', style.textColor)}>CONSECUENCIA</span>
        </div>

        <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-border mb-6">
          <TypewriterText
            text={outcome.description}
            speed={30}
            onComplete={() => setShowHeadline(true)}
            className="text-lg md:text-xl text-foreground leading-relaxed mb-6"
          />

          {showHeadline && (
            <div className={cn(
              'mt-6 p-4 rounded-lg border animate-fade-in',
              style.borderColor,
              style.bgGlow
            )}>
              <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
                Titular Real - Colombia
              </p>
              <p className={cn('text-lg font-bold', style.textColor)}>
                {outcome.headline}
              </p>
            </div>
          )}
        </div>

        {showHeadline && (
          <div className="bg-card/60 backdrop-blur-sm rounded-lg p-4 border border-border mb-8 animate-fade-in">
            <TypewriterText
              text='"Esto ya paso. La pregunta es... ¿cuando dejamos de actuar?"'
              speed={40}
              onComplete={() => setShowButton(true)}
              className="text-primary italic"
            />
          </div>
        )}

        {showButton && (
          <button
            onClick={onContinue}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl
              hover:from-purple-600 hover:to-pink-600 transition-all duration-300
              hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] animate-fade-in"
          >
            Explorar futuros posibles
          </button>
        )}
      </div>
    </div>
  )
}
