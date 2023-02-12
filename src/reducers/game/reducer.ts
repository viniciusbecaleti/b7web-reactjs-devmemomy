import { GridItemType } from "../../@types/GridItem"

import { ActionTypes, GameActions } from "./actions"

interface GameState {
  isPlaying: boolean,
  timeElapsed: number,
  moveCount: number,
  shownCount: number,
  gridItems: GridItemType[]
}

export function gameReducer(state: GameState, action: GameActions) {
  switch (action.type) {
    case ActionTypes.START_GAME:
      return {
        timeElapsed: 0,
        moveCount: 0,
        shownCount: 0,
        gridItems: action.payload.tempGrid,
        isPlaying: true
      }
    case ActionTypes.CHECK_PLAY:
      return {
        ...state,
        gridItems: state.gridItems.map(item => {
          if (item.isShowing) {
            if (action.payload.isEquals) {
              return {
                ...item,
                isShowing: false,
                isPermanentShowing: true
              }
            }

            return {
              ...item,
              isShowing: false
            }
          }

          return item
        }),
        moveCount: state.moveCount + 1,
        shownCount: 0
      }
    case ActionTypes.GAME_OVER:
      return {
        ...state,
        isPlaying: false
      }
    case ActionTypes.INCREASE_SHOWN_COUNT:
      return {
        ...state,
        shownCount: state.shownCount + 1
      }
    case ActionTypes.INCREASE_TIME_ELAPSED:
      return {
        ...state,
        timeElapsed: state.timeElapsed + 1
      }
    case ActionTypes.SET_GRID_ITEMS:
      return {
        ...state,
        gridItems: action.payload.gridItems
      }
    default:
      return state
  }
}
