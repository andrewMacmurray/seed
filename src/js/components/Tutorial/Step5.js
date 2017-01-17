import React from 'react'
import TutorialBoard from './components/TutorialBoard.js'
import TextContainer from './components/TextContainer.js'
import Next from './components/Next.js'
import Lines from './components/Lines.js'
import { auto, delay } from '../../constants/tutorialDefaults.js'

const textContent = [
  { text: 'Now connect seeds to fill the seed bank',
    visibleAt: [ 1, 2 ]
  },
  { text: 'Connect as many as you can in one move',
    visibleAt: [ 4 ]
  },
  { text: 'Marvellous!',
    visibleAt: [ 5 ]
  },
  { text: 'The more seeds you connect,\n the faster the seed bank will fill up',
    className: 'minus-1-half',
    visibleAt: [ 7 ]
  },
  { text: 'Your first journey awaits...',
    className: 'minus-1-half',
    visibleAt: [ 9, 10, 11 ]
  },
  { text: 'quickly, grow and collect the seeds\n whilst it\'s still raining',
    className: 'plus-1-half',
    visibleAt: [ 10, 11 ]
  }
]

export const sequence5 = {
  subSteps: [
    { delay, auto },
    { delay, auto },
    { delay },
    { delay: 2000, auto },
    { delay, auto },
    { delay: 3000, auto },
    { delay, auto },
    { delay, auto },
    { delay, auto },
    { delay },
    { delay: 100, auto },
    { delay }
  ]
}

export default class Step5 extends React.PureComponent {

  componentDidMount () {
    const { renderStep, checkBoardComplete } = this.props
    checkBoardComplete({
      boardType: 'seedBoardComplete',
      renderStep,
      completeStep: 4
    })
  }

  render () {
    return (
      <TextContainer {...this.props}>
        <Lines
          textContent={textContent}
          sameLine
          {...this.props}
        />
        <TutorialBoard
          visibleAt={[ 1, 2, 3, 4, 5, 6, 7 ]}
          enabledAt={[ 2, 3, 4 ]}
          {...this.props}
        />
        <Next
          text='begin'
          visibleAt={[ 11 ]}
          {...this.props}
        />
      </TextContainer>
    )
  }
}