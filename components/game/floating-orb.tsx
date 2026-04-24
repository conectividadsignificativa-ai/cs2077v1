'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface FloatingOrbProps {
  label: string
  colorClass: string
  isSelected: boolean
  onClick: () => void
  delay?: number
}

export function FloatingOrb({
  label,
  colorClass,
  isSelected,
  onClick,
  delay = 0
}: FloatingOrbProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'relative group cursor-pointer transition-all duration-500',
        'animate-float'
      )}
      style={{ 
        animationDelay: `${delay}ms`,
        transform: isHovered ? 'scale(1.1)' : 'scale(1)'
      }}
    >
      <div
        className={cn(
          'w-24 h-24 md:w-28 md:h-28 rounded-full',
          'bg-gradient-to-br',
          colorClass,
          'flex items-center justify-center',
          'shadow-lg transition-all duration-300',
          'border-2',
          isSelected 
            ? 'border-white shadow-[0_0_30px_rgba(255,255,255,0.5)] scale-110' 
            : 'border-transparent hover:border-white/50',
          isHovered && !isSelected && 'shadow-[0_0_20px_rgba(255,255,255,0.3)]'
        )}
      >
        <span className={cn(
          'text-white font-medium text-xs md:text-sm text-center px-2',
          'drop-shadow-lg'
        )}>
          {label}
        </span>
      </div>
      
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </button>
  )
}
