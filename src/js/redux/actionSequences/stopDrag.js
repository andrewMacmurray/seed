import Promise from 'bluebird'
import * as _ from '../allActions.js'
import { makeLazyDispatcher, batch } from '../_thunkHelpers.js'

export default (moveType) => (dispatch, getState) => {
  const _dispatch = makeLazyDispatcher(dispatch)
  const { updating, isDragging, moves: { moveArray } } = getState()

  const isLeaving =
       moveType === 'rain'
    || moveType === 'sun'
    || moveType === 'pod'
  const isSeedling = moveType === 'seedling'
  const boardReady = !updating && isDragging

  if (boardReady && isLeaving) {
    Promise
      .resolve()
      .then(batch(dispatch, [
        _.setDrag, false,
        _.addPowerToWeather, moveType,
        _.updateScore, moveType, moveArray,
        _.isUpdating, true,
        _.setLeavingTiles, moveArray
      ]))
      .delay(400)
      .then(_dispatch(_.fallTiles, moveArray))
      .delay(400)
      .then(batch(dispatch, [
        _.shiftTiles, moveArray,
        _.setEntering,
        _.resetMagnitude,
        _.resetLeaving,
        _.resetMoves,
        _.addTiles,
        _.isUpdating, false
      ]))
      .delay(700)
      .then(_dispatch(_.resetEntering))
  }

  if (boardReady && isSeedling) {
    Promise
      .resolve()
      .then(batch(dispatch, [
        _.setDrag, false,
        _.isUpdating, true,
        _.setGrowingSeeds, moveArray,
        _.resetMoves
      ]))
      .delay(500)
      .then(_dispatch(_.growSeedsFromMoves, moveArray))
      .delay(300)
      .then(_dispatch(_.isUpdating, false))
      .delay(200)
      .then(batch(dispatch, [
        _.resetGrowSeeds
      ]))
  }
}