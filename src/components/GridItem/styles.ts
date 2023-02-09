import styled from "styled-components";

interface ContainerProps {
  showing: boolean
}

export const Container = styled.button<ContainerProps>`
  height: 100px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 6px;

  background: ${({ showing }) => showing ? '#1550ff' : '#e2e3e3'};
`

interface IconProps {
  opacity?: number
}

export const Icon = styled.img<IconProps>`
  width: 40px;
  height: 40px;

  opacity: ${({ opacity }) => opacity ?? 1};
`