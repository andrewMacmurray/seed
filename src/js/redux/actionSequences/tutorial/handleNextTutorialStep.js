import Promise from 'bluebird'
import { makeLazyDispatcher } from '../../_thunkHelpers.js'
import handleSubStep from './handleSubStep.js'
import { getTutorialData } from './_helpers.js'

export default () => (dispatch, getState) => {
  const _dispatch = makeLazyDispatcher(dispatch)
  const state = getState()
  const { subStep, updating, data, step } = state.tutorial

  const { total } = getTutorialData(step, data)

  if (subStep <= total && total > 0 && !updating) {
    return Promise
      .resolve()
      .then(_dispatch(handleSubStep))
  }
}
