import React from 'react'
import { connect } from 'react-redux'
import Step1 from './Step1.js'
import Step2 from './Step2.js'
import Step3 from './Step3.js'
import Step4 from './Step4.js'
import Step5 from './Step5.js'
import handleNextTutorialStep from '../../redux/actionSequences/tutorial/handleNextTutorialStep.js'

class Tutorial extends React.PureComponent {

  componentDidMount () {
    setTimeout(this.props.handleNextTutorialStep, 500)
  }

  render () {
    return (
      <div>
        <div className='tutorial-container'>
          <Step1 {...this.props} renderStep={1} />
          <Step2 {...this.props} renderStep={2} />
          <Step3 {...this.props} renderStep={3} />
          <Step4 {...this.props} renderStep={4} />
          <Step5 {...this.props} renderStep={5} />
        </div>
      </div>
    )
  }

}

import {
  podBoardComplete,
  seedlingBoardComplete
} from '../../redux/selectors/tutorial/selector_tutorialBoardComplete.js'

const mapStateToProps = (state) => ({
  ...state.tutorial,
  seedlingBoardComplete: seedlingBoardComplete(state),
  podBoardComplete: podBoardComplete(state)
})

export default connect(mapStateToProps, { handleNextTutorialStep })(Tutorial)
