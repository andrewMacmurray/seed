import { combineReducers } from 'redux'
import isDragging from './reducer_setDrag.js'
import weather from './reducer_weatherPower.js'
import score from './reducer_score.js'
import view from './reducer_view.js'

const rootReducer = combineReducers({
  isDragging,
  weather,
  score,
  view
})

export default rootReducer
