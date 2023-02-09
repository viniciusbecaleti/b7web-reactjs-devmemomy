import { Container, Label, Value } from "./styles";

interface InfoItemProps {
  label: string
  value: string
}

export function InfoItem({ label, value }: InfoItemProps) {
  return (
    <Container>
      <Label>{label}</Label>
      <Value>{value}</Value>
    </Container>
  )
}