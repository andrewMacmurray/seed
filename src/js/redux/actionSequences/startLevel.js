import Promise from 'bluebird'
import * as _ from '../allActions.js'
import { makeLazyDispatcher, batch } from '../_thunkHelpers.js'
import { getLevelData } from './_levelDataHelpers.js'
import setUpBoard from './setUpBoard.js'

export default (world, levelNumber) => (dispatch, getState, levelSettings) => {
  const _dispatch = makeLazyDispatcher(dispatch)
  const { levelProgress } = getState().level
  const {
    probabilities,
    goal,
    avatars,
    tutorial
  } = getLevelData(world, levelNumber, levelSettings)

  const seedType = avatars[0]
  const loadTutorial = tutorial && levelProgress <= levelNumber

  const setUpView = loadTutorial
    ? _dispatch(_.noop)
    : _dispatch(setUpBoard, goal, probabilities)

  const view = loadTutorial
    ? 'tutorial'
    : 'level'

  if (levelProgress >= levelNumber) {
    return Promise
      .resolve()
      .then(_dispatch(_.setSeedType, seedType))
      .then(_dispatch(_.showLoadingScreen))
      .delay(500)
      .then(setUpView)
      .then(batch(dispatch, [
        _.setCurrentLevel, levelNumber,
        _.setCurrentWorld, world,
        _.resetScore,
        _.resetWeatherPower, 'sun',
        _.resetWeatherPower, 'rain'
      ]))
      .delay(1500)
      .then(_dispatch(_.setView, view))
      .delay(1000)
      .then(_dispatch(_.hideLoadingScreen))
  }
}
