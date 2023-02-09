import { useEffect, useState } from "react";

import {
  Container,
  Grid,
  GridArea,
  Info,
  InfoArea,
  LogoLink
} from "./App.styles";

import logoImg from './assets/devmemory_logo.png'
import restartIcon from './assets/restart.svg'

import { Button } from "./components/Button";
import { InfoItem } from "./components/InfoItem";

import { GridItemType } from "./types/GridItem";

import { items } from './data/items'
import { GridItem } from "./components/GridItem";
import { formatTimeElapsed } from "./utils/formatTimeElapsed";

export function App() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [moveCount, setMoveCount] = useState(0)
  const [shownCount, setShownCount] = useState(0)
  const [gridItems, setGridItems] = useState<GridItemType[]>([])

  function resetAndCreateGrid() {
    // passo 1 - resetar o jogo
    setTimeElapsed(0)
    setMoveCount(0)
    setShownCount(0)
    
    // passo 2 - criar o grid
    // 2.1 - criar o grid vazio
    let tempGrid: GridItemType[] = []
    
    for (let i = 0; i < (items.length * 2); i++) {
      tempGrid.push({
        item: null,
        isShowing: false,
        isPermanentShowing: false
      })
    }

    // 2.2 - preencher o grid
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < items.length; j++) {
        let pos = -1
        
        while (pos < 0 || tempGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2))
        }

        tempGrid[pos].item = j
      }
    }

    // 2.3 - jogar no state
    setGridItems(tempGrid)

    // passo 3 - começar o jogo
    setIsPlaying(true)
  }  

  function handleItemCliked(index: number) {
    if (isPlaying && index != null && shownCount < 2) {
      if (!gridItems[index].isShowing) {
        let newGrid = [...gridItems]

        if (!newGrid[index].isPermanentShowing || !newGrid[index].isShowing) {
          newGrid[index].isShowing = true
          setShownCount(prevState => prevState + 1)
        }

        setGridItems(newGrid)
      }
    }
  }

  useEffect(() => resetAndCreateGrid(), [])

  useEffect(() => {
    const timer = setInterval(() => {
      if (isPlaying) setTimeElapsed(prevState => prevState + 1)
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [timeElapsed, isPlaying])

  useEffect(() => {
    if (shownCount === 2) {
      const openGrids = gridItems.filter(item => item.isShowing)

      // Verificação 1 - Se eles são iguais, manter eles abertos permanentemente
      if (openGrids[0].item === openGrids[1].item) {
        setGridItems(prevState => prevState.map(item => {
          if (item.isShowing) {
            return {
              ...item,
              isShowing: false,
              isPermanentShowing: true
            }
          }

          return item
        }))
        setMoveCount(prevState => prevState + 1)
        setShownCount(0)
      } else {
        setTimeout(() => {
          setGridItems(prevState => prevState.map(item => {
            if (item.isShowing) {
              return {
                ...item,
                isShowing: false
              }
            }
  
            return item
          }))
          setMoveCount(prevState => prevState + 1)
          setShownCount(0)
        }, 1000)
      }
    }
  }, [shownCount, gridItems])

  useEffect(() => {
    if (isPlaying) {
      if (gridItems.every(item => item.isPermanentShowing === true)) {
        setIsPlaying(false)
      }
    }
  }, [gridItems])

  return (
    <Container>
      <Info>
        <LogoLink href="/">
          <img src={logoImg} alt="" width={200} />
        </LogoLink>

        <InfoArea>
          <InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)} />
          <InfoItem label="Movimentos" value={String(moveCount)} />
        </InfoArea>

        <Button
          label="Reiniciar"
          icon={restartIcon}
          handleClick={resetAndCreateGrid}
        />
      </Info>
      <GridArea>
        <Grid>
          {gridItems.map((grid, index) => (
            <GridItem
              key={index}
              grid={grid}
              onClick={() => handleItemCliked(index)}
            />
          ))}
        </Grid>
      </GridArea>
    </Container>
  )
}
