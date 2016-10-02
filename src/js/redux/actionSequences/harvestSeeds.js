import Promise from 'bluebird'
import { makeLazyDispatcher, batch } from '../_thunkHelpers.js'
import * as _ from '../allActions.js'

export default (seedMoves) => (dispatch) => {
  const _dispatch = makeLazyDispatcher(dispatch)

  return Promise
    .resolve()
    .then(batch(dispatch, [
      _.setLeavingTiles, seedMoves,
      _.isUpdating, true,
      _.updateScore, { args: [ 'pod', seedMoves ] }
    ]))
    .delay(1400)
    .then(_dispatch(_.fallTiles, seedMoves))
    .delay(300)
    .then(batch(dispatch, [
      _.shiftTiles, seedMoves,
      _.setEntering,
      _.resetMagnitude,
      _.resetLeaving,
      _.isUpdating, false
    ]))
    .delay(200)
    .then(_dispatch(_.addTiles))
    .delay(700)
    .then(_dispatch(_.resetEntering))
}
