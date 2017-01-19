import React from 'react'
import Line from '../Components/Line.js'
import Next from '../Components/Next.js'
import TextContainer from '../Components/TextContainer.js'
import { auto, delay } from '../../../constants/tutorialDefaults.js'

const text1 = 'Welcome traveller'

export const sequence1 = {
  substeps: [
    { delay, auto },
    { delay, auto },
    { delay }
  ]
}

export default (props) => {
  return (
    <TextContainer {...props} className='justify-center'>
      <Line
        visibleAt={[ 2, 3 ]}
        text={text1}
        className='minus-1-5-margin'
        {...props}
      />
      <Next
        visibleAt={[ 3 ]}
        {...props}
      />
    </TextContainer>
  )
}
