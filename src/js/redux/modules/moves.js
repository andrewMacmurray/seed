import { createAction } from 'redux-actions'
import { validMove } from '../../model/model.js'

// action types
const CHECK_TILE = 'CHECK_TILE'
const RESET_MOVES = 'RESET_MOVES'

// reducer
const defaultState = { moveArray: [], currTile: [] }
export default (state = defaultState, action) => {
  console.log(action.type)
  switch (action.type) {
  case CHECK_TILE:
    return action.payload

  case RESET_MOVES:
    return defaultState

  default:
    return state
  }
}

// actions
export const checkTile = (tile) => (dispatch, getState) => {
  const { board, moves: { currTile, moveArray } } = getState()
  const isValid = validMove(tile, currTile, board)
  let nextMoves = {
    moveArray,
    currTile
  }
  if (moveArray.length === 0) {
    nextMoves = {
      moveArray: moveArray.concat([ tile ]),
      currTile: tile
    }
  }
  if (isValid) {
    nextMoves = {
      moveArray: moveArray.concat([ tile ]),
      currTile: tile
    }
  }
  dispatch({
    type: CHECK_TILE,
    payload: nextMoves
  })
}

export const resetMoves = createAction(RESET_MOVES)
