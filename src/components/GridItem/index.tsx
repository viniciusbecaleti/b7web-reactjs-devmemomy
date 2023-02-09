import { GridItemType } from "../../types/GridItem";
import { Container, Icon } from "./styles";

import b7Img from '../../assets/b7.svg'

import { items } from '../../data/items'

interface GridItemProps {
  grid: GridItemType
  onClick: () => void
}

export function GridItem({ grid, onClick }: GridItemProps) {
  return (
    <Container
      type="button"
      onClick={onClick}
      showing={grid.isPermanentShowing || grid.isShowing}
    >
      {!grid.isPermanentShowing && !grid.isShowing && (
        <Icon src={b7Img} alt="" opacity={0.1} />
      )}

      {grid.item !== null && (grid.isPermanentShowing || grid.isShowing) && (
        <Icon src={items[grid.item].icon} alt="" />
      )}
    </Container>
  )
}