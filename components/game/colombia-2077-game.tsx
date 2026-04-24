'use client'

import { useState, useCallback } from 'react'
import { type GameState, type Role, type Decision, type Skill, type Value } from '@/lib/game-types'
import { BackgroundScene } from './background-scene'
import { RoleSelection } from './scenes/role-selection'
import { DisruptionShock } from './scenes/disruption-shock'
import { DecisionMoment } from './scenes/decision-moment'
import { ConsequenceReveal } from './scenes/consequence-reveal'
import { SkillsSelection } from './scenes/skills-selection'
import { FutureReveal } from './scenes/future-reveal'

import { IntroScene } from './scenes/intro-scene'

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

const initialState: GameState = {
  playerName: null,
  level: 1,
  scene: 1,
  role: null,
  decision: null,
  selectedSkills: [],
  selectedValues: [],
  narrativeIndex: 0,
  isTransitioning: false
}

export function Colombia2077Game() {
  const [gameState, setGameState] = useState<GameState>(initialState)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const transition = useCallback((callback: () => void) => {
    setIsTransitioning(true)
    setTimeout(() => {
      callback()
      setTimeout(() => setIsTransitioning(false), 500)
    }, 500)
  }, [])

  const handleNameSubmit = useCallback((playerName: string) => {
    transition(() => {
      setGameState(prev => ({ ...prev, playerName, scene: 2 }))
    })
  }, [transition])

  const handleRoleSelect = useCallback((role: Role) => {
    transition(() => {
      setGameState(prev => ({ ...prev, role, scene: 3 }))
    })
  }, [transition])

  const handleDisruptionContinue = useCallback(() => {
    transition(() => {
      setGameState(prev => ({ ...prev, scene: 4 }))
    })
  }, [transition])

  const handleDecision = useCallback((decision: Decision) => {
    transition(() => {
      setGameState(prev => ({ ...prev, decision, scene: 5 }))
    })
  }, [transition])

  const handleLevel2 = useCallback(() => {
    transition(() => {
      setGameState(prev => ({ ...prev, level: 2, scene: 1 }))
    })
  }, [transition])

  const handleSkillsComplete = useCallback((skills: Skill[], values: Value[]) => {
    transition(() => {
      setGameState(prev => ({ 
        ...prev, 
        selectedSkills: skills, 
        selectedValues: values,
        scene: 2 
      }))
    })
  }, [transition])

  const handleRestart = useCallback(() => {
    transition(() => {
      setGameState(initialState)
    })
  }, [transition])

  const getBackgroundScene = (): SceneType => {
    if (gameState.level === 1) {
      switch (gameState.scene) {
        case 1:
        case 2:
          return 'intro'
        case 3:
          return 'disruption'
        case 4:
          return 'frozen'
        case 5:
          if (gameState.decision === 'colaborar') return 'improved'
          if (gameState.decision === 'no_hacer_nada') return 'deteriorated'
          return 'neutral'
        default:
          return 'intro'
      }
    } else {
      return gameState.scene === 2 ? 'synthwave' : 'intro'
    }
  }

  const renderScene = () => {
    if (gameState.level === 1) {
      switch (gameState.scene) {
        case 1:
          return <IntroScene onStart={handleNameSubmit} />
        case 2:
          return <RoleSelection onSelect={handleRoleSelect} />
        case 3:
          return gameState.role && (
            <DisruptionShock 
              role={gameState.role} 
              onContinue={handleDisruptionContinue} 
            />
          )
        case 4:
          return <DecisionMoment onDecide={handleDecision} />
        case 5:
          return gameState.decision && (
            <ConsequenceReveal 
              decision={gameState.decision} 
              onContinue={handleLevel2} 
            />
          )
        default:
          return null
      }
    } else {
      switch (gameState.scene) {
        case 1:
          return <SkillsSelection onComplete={handleSkillsComplete} />
        case 2:
          return gameState.role && gameState.decision && gameState.playerName && (
            <FutureReveal
              playerName={gameState.playerName}
              role={gameState.role}
              decision={gameState.decision}
              skills={gameState.selectedSkills}
              values={gameState.selectedValues}
              onRestart={handleRestart}
            />
          )
        default:
          return null
      }
    }
  }

  return (
    <div className="min-h-screen overflow-hidden">
      <BackgroundScene scene={getBackgroundScene()} />
      
      {/* Transition overlay */}
      <div 
        className={`fixed inset-0 bg-black z-50 pointer-events-none transition-opacity duration-500 ${
          isTransitioning ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      {/* Progress indicator */}
      <div className="fixed top-4 left-4 z-40">
        <div className="flex items-center gap-2 px-3 py-2 bg-card/80 backdrop-blur-sm rounded-full border border-border">
          <div className={`w-2 h-2 rounded-full ${gameState.level === 1 ? 'bg-primary' : 'bg-muted'}`} />
          <span className="text-xs text-muted-foreground">Nivel {gameState.level}</span>
          <span className="text-xs text-muted-foreground">|</span>
          <span className="text-xs text-muted-foreground">Escena {gameState.scene}</span>
        </div>
      </div>

      {renderScene()}
    </div>
  )
}
