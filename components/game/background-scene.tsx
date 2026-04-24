'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import introCityImg from '@/public/intro_city.jpeg'

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
        return 'bg-black'
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

  const [mounted, setMounted] = useState(false);
  const [stars, setStars] = useState<{ left: string, top: string, delay: string, duration: string }[]>([]);

  useEffect(() => {
    setMounted(true);
    const newStars = Array.from({ length: 50 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${2 + Math.random() * 3}s`
    }));
    setStars(newStars);
  }, []);

  return (
    <div className={cn(
      'fixed inset-0 transition-all duration-1000',
      getSceneStyles(),
      className
    )}>
      {/* 1. Base Image Layer */}
      {scene === 'intro' && (
        <div className="absolute inset-0 overflow-hidden">
          <Image 
            src={introCityImg} 
            alt="Cyberpunk Colombia Intro"
            fill
            className="object-cover animate-pan-horizontal"
            style={{ minWidth: '110%', minHeight: '110%', left: '-5%', top: '-5%' }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        </div>
      )}

      {/* 2. Grid overlay */}
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
        {mounted && stars.map((star, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-50 animate-twinkle"
            style={{
              left: star.left,
              top: star.top,
              animationDelay: star.delay,
              animationDuration: star.duration
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
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/50 z-10 pointer-events-none" />
    </div>
  )
}
