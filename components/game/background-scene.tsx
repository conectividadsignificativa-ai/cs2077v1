'use client'

import { cn } from '@/lib/utils'

type SceneType = 
  | 'intro' 
  | 'coworking' 
  | 'oficina_publica' 
  | 'universidad' 
  | 'rural'
  | 'disruption'
  | 'frozen'
  | 'improved'
  | 'deteriorated'
  | 'neutral'
  | 'synthwave'

interface BackgroundSceneProps {
  scene: SceneType
  className?: string
}

export function BackgroundScene({ scene, className }: BackgroundSceneProps) {
  const getSceneStyles = () => {
    switch (scene) {
      case 'intro':
        return 'bg-gradient-to-b from-slate-900 via-purple-950 to-slate-900'
      case 'coworking':
        return 'bg-gradient-to-br from-slate-800 via-blue-950 to-slate-900'
      case 'oficina_publica':
        return 'bg-gradient-to-br from-slate-800 via-gray-900 to-slate-950'
      case 'universidad':
        return 'bg-gradient-to-br from-slate-800 via-indigo-950 to-slate-900'
      case 'rural':
        return 'bg-gradient-to-br from-slate-800 via-green-950 to-slate-900'
      case 'disruption':
        return 'bg-gradient-to-br from-red-950 via-orange-950 to-slate-900 animate-pulse-slow'
      case 'frozen':
        return 'bg-gradient-to-br from-cyan-950 via-blue-950 to-slate-900'
      case 'improved':
        return 'bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-900'
      case 'deteriorated':
        return 'bg-gradient-to-br from-red-950 via-gray-950 to-slate-900'
      case 'neutral':
        return 'bg-gradient-to-br from-amber-950 via-slate-900 to-slate-950'
      case 'synthwave':
        return 'bg-gradient-to-b from-purple-950 via-pink-950 to-slate-900'
      default:
        return 'bg-slate-900'
    }
  }

  return (
    <div className={cn(
      'fixed inset-0 transition-all duration-1000',
      getSceneStyles(),
      className
    )}>
      {/* Grid overlay for synthwave effect */}
      {(scene === 'synthwave' || scene === 'intro') && (
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: 'perspective(500px) rotateX(60deg)',
            transformOrigin: 'center top'
          }}
        />
      )}

      {/* Glitch effect for disruption */}
      {scene === 'disruption' && (
        <>
          <div className="absolute inset-0 bg-red-500/10 animate-glitch-1" />
          <div className="absolute inset-0 bg-cyan-500/10 animate-glitch-2" />
        </>
      )}

      {/* Stars/particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-50 animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Sun for synthwave */}
      {scene === 'synthwave' && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
          <div className="w-64 h-32 rounded-t-full bg-gradient-to-t from-orange-500 via-pink-500 to-purple-500 opacity-80" />
          <div className="absolute inset-0 w-64 h-32 rounded-t-full bg-gradient-to-t from-orange-500 via-pink-500 to-purple-500 blur-xl opacity-50" />
        </div>
      )}

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/50" />
    </div>
  )
}
