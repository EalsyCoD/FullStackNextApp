import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'

enum Themes {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

const themes = [
  {
    value: Themes.LIGHT,
    text: 'light',
  },
  {
    value: Themes.DARK,
    text: 'dark',
  },
  {
    value: Themes.SYSTEM,
    text: 'system',
  },
]

export const ModeToggle = () => {
  const { theme, setTheme } = useTheme()
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    setTheme(savedTheme || Themes.SYSTEM)
  }, [])

  const toggleTheme = () => {
    document.body.classList.add(theme as Themes)
    localStorage.setItem('theme', theme as Themes)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          data-cy="toggle-theme-button"
          variant="outline"
          size="icon"
          onClick={toggleTheme}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map(({ value, text }) => (
          <DropdownMenuItem key={value} onClick={() => setTheme(value)}>
            {text}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
