import { createAction } from 'redux-actions'
import { identity } from 'ramda'

// action types
const GROW_SEEDS = 'GROW_SEEDS'
const RESET_GROW_SEEDS = 'RESET_GROW_SEEDS'

// reducer
const defaultState = []
export default (state = defaultState, action) => {
  switch (action.type) {
  case GROW_SEEDS:
    return action.payload

  case RESET_GROW_SEEDS:
    return defaultState

  default:
    return state
  }
}

// actions
export const resetGrowSeeds = createAction(RESET_GROW_SEEDS)
export const setGrowingSeeds = createAction(GROW_SEEDS, identity)
