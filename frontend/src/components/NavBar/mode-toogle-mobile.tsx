import { Laptop, Moon, Sun } from "lucide-react"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { useTheme } from "@/providers/theme-provider"

export function ModeToggleMobile() {
  const { setTheme, theme } = useTheme()

  return (
    <ToggleGroup variant='outline' type="single" defaultChecked defaultValue={theme}>
      <ToggleGroupItem value="dark" aria-label="Toggle bold" onClick={()=>setTheme('dark')}>
        <Moon className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="light" aria-label="Toggle italic" onClick={()=>setTheme('light')}>
        <Sun className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="system" aria-label="Toggle underline" onClick={()=>setTheme('system')}>
        <Laptop className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
