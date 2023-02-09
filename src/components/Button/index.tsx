import { Container, Icon, IconArea, Label } from "./styles";

interface ButtonProps {
  icon?: string
  label: string
  handleClick: () => void
}

export function Button({ icon, label, handleClick }: ButtonProps) {
  return (
    <Container onClick={handleClick}>
      {icon && (
        <IconArea>
          <Icon src={icon} alt="" />
        </IconArea>
      )}

      <Label>{label}</Label>
    </Container>
  )
}