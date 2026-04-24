'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface IntroSceneProps {
  onStart: (name: string) => void
}

export function IntroScene({ onStart }: IntroSceneProps) {
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onStart(name.trim())
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 z-10 relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full p-8 rounded-2xl bg-card/90 backdrop-blur-md border border-border shadow-2xl"
      >
        <h1 className="text-4xl font-bold text-center mb-6 text-foreground italic uppercase tracking-tighter">
          COLOMBIA 2077
        </h1>
        <p className="text-muted-foreground text-center mb-8">
          Bienvenido al futuro. Antes de comenzar tu viaje por esta Colombia transformada por la tecnología, identifica tu señal.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              ¿Cómo te conocen en la red?
            </label>
            <Input
              id="name"
              placeholder="Ingresa tu nombre o ID"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-background/50"
              autoFocus
            />
          </div>
          <Button 
            type="submit" 
            disabled={!name.trim()}
            className="w-full font-bold uppercase tracking-widest bg-primary hover:bg-primary/90 text-primary-foreground transform transition-all active:scale-95"
          >
            Sincronizar Datos
          </Button>
        </form>
      </motion.div>
    </div>
  )
}
