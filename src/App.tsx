import { useEffect, useReducer } from "react";

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

import { items } from './data/items'

import { formatTimeElapsed } from "./utils/formatTimeElapsed";

import { GridItemType } from "./@types/GridItem";

import { gameReducer } from "./reducers/game/reducer";
import {
  CheckGameAction,
  GameOverAction,
  IncreaseShownCountAction,
  IncreaseTimeElapsedAction,
  SetGridItemsAction,
  StartGameAction
} from "./reducers/game/actions";

import { Button } from "./components/Button";
import { InfoItem } from "./components/InfoItem";
import { GridItem } from "./components/GridItem";

export function App() {
  const [gameState, dispatch] = useReducer(gameReducer, {
    isPlaying: false,
    timeElapsed: 0,
    moveCount: 0,
    shownCount: 0,
    gridItems: []
  })

  // const [isPlaying, setIsPlaying] = useState(false)
  // const [timeElapsed, setTimeElapsed] = useState(0)
  // const [moveCount, setMoveCount] = useState(0)
  // const [shownCount, setShownCount] = useState(0)
  // const [gridItems, setGridItems] = useState<GridItemType[]>([])

  function resetAndCreateGrid() {
    // setTimeElapsed(0)
    // setMoveCount(0)
    // setShownCount(0)

    // passo 1 - criar o grid
    // 1.1 - criar o grid vazio
    let tempGrid: GridItemType[] = []

    for (let i = 0; i < (items.length * 2); i++) {
      tempGrid.push({
        item: null,
        isShowing: false,
        isPermanentShowing: false
      })
    }

    // 1.2 - preencher o grid temporário
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < items.length; j++) {
        let pos = -1

        while (pos < 0 || tempGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2))
        }

        tempGrid[pos].item = j
      }
    }

    // passo 2 - resetar o jogo
    dispatch(StartGameAction(tempGrid))
  }

  function handleItemCliked(index: number) {
    if (gameState.isPlaying && index != null && gameState.shownCount < 2) {
      if (!gameState.gridItems[index].isShowing) {
        let newGrid = [...gameState.gridItems]

        if (!newGrid[index].isPermanentShowing || !newGrid[index].isShowing) {
          newGrid[index].isShowing = true
          dispatch(IncreaseShownCountAction())
          // setShownCount(prevState => prevState + 1)
        }

        dispatch(SetGridItemsAction(newGrid))
        // setGridItems(newGrid)
      }
    }
  }

  useEffect(() => resetAndCreateGrid(), [])

  useEffect(() => {
    const timer = setInterval(() => {
      if (gameState.isPlaying) dispatch(IncreaseTimeElapsedAction())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [gameState.timeElapsed, gameState.isPlaying])

  useEffect(() => {
    if (gameState.shownCount === 2) {
      const openGrids = gameState.gridItems.filter((item: any) => item.isShowing)

      // Verificação 1 - Se eles são iguais, manter eles abertos permanentemente
      if (openGrids[0].item === openGrids[1].item) {
        dispatch(CheckGameAction(true))
        // setGridItems(prevState => prevState.map(item => {
        //   if (item.isShowing) {
        //     return {
        //       ...item,
        //       isShowing: false,
        //       isPermanentShowing: true
        //     }
        //   }

        //   return item
        // }))
        // setMoveCount(prevState => prevState + 1)
        // setShownCount(0)
      } else {
        setTimeout(() => {
          dispatch(CheckGameAction(false))
          // setGridItems(prevState => prevState.map(item => {
          //   if (item.isShowing) {
          //     return {
          //       ...item,
          //       isShowing: false
          //     }
          //   }

          //   return item
          // }))
          // setMoveCount(prevState => prevState + 1)
          // setShownCount(0)
        }, 1000)
      }
    }
  }, [gameState.shownCount, gameState.gridItems])

  useEffect(() => {
    if (gameState.isPlaying) {
      if (gameState.gridItems.every((item: any) => item.isPermanentShowing === true)) {
        dispatch(GameOverAction())
        // setIsPlaying(false)
      }
    }
  }, [gameState.gridItems])

  return (
    <Container>
      <Info>
        <LogoLink href="/">
          <img src={logoImg} alt="" width={200} />
        </LogoLink>

        <InfoArea>
          <InfoItem label="Tempo" value={formatTimeElapsed(gameState.timeElapsed)} />
          <InfoItem label="Movimentos" value={String(gameState.moveCount)} />
        </InfoArea>

        <Button
          label="Reiniciar"
          icon={restartIcon}
          handleClick={resetAndCreateGrid}
        />
      </Info>
      <GridArea>
        <Grid>
          {gameState.gridItems.map((grid: any, index: any) => (
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
