import { useIsMobile } from "@/hooks"
import type { LucideIcon } from "lucide-react"
import { Button, Tooltip, TooltipContent, TooltipTrigger } from "./ui"

interface Props extends React.ComponentProps<typeof Button> {
  icon: LucideIcon
  label: string
  disabledTooltip?: string
}

export const CompactButton = ({
  icon: Icon,
  label,
  disabledTooltip,
  ...props
}: Props) => {
  const isMobile = useIsMobile()
  const tooltip = props.disabled
    ? disabledTooltip
    : isMobile
      ? label
      : undefined

  const button = (
    <Button {...props} size={isMobile ? "icon" : "default"}>
      <Icon />
      <span className="hidden md:inline">{label}</span>
    </Button>
  )

  if (tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger render={button} />
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    )
  }

  return button
}
