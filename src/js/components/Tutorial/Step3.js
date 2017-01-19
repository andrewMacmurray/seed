import React from 'react'
import Next from './components/Next.js'
import TextContainer from './components/TextContainer.js'
import TutorialBoard from './components/TutorialBoard.js'
import Lines from './components/Lines.js'
import { all } from '../../constants/probabilities.js'
import { auto, delay } from '../../constants/tutorialDefaults.js'

const textContent = [
  { text: 'These are seed pods',
    visibleAt: [ 3, 4 ]
  },
  { text: 'With a little rain,\n they are almost ready to bear seeds',
    visibleAt: [ 6, 7 ],
    className: 'minus-1-half'
  },
  { text: 'Connect them to release the seeds',
    visibleAt: [ 9, 10 ]
  },
  { text: 'Brilliant!',
    visibleAt: [ 11, 12 ]
  }
]

export const sequence3 = {
  substeps: [
    { delay, auto },
    { delay: 400, auto },
    { delay, auto },
    { delay },
    { delay, auto },
    { delay, auto },
    { delay, auto },
    { delay, auto },
    { delay },
    { delay: 2000, auto },
    { delay }
  ],
  board: { size: 2, probabilities: all.seedPods, substep: 1 },
  weather: { action: 'start', type: 'rain', substep: 6 }
}

export default class Step3 extends React.PureComponent {

  componentDidMount () {
    const { renderStep, checkBoardComplete } = this.props
    checkBoardComplete({
      boardType: 'seedPodBoardComplete',
      renderStep,
      completeStep: 9
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
          visibleAt={[ 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ]}
          enabledAt={[ 9, 10 ]}
          {...this.props}
        />
        <Next
          visibleAt={[ 4, 5, 6, 7, 8, 9 ]}
          {...this.props}
        />
      </TextContainer>
    )
  }
}
