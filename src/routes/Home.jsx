import React from 'react'

import { Coinsearch } from '../components/Coinsearch'
import { Trending } from '../components/Trending'

export const Home = ({coins}) => {
  


  return (
    <div>
      <Coinsearch coins={coins}/>
      <Trending coins={coins}/>
    </div>
  )
}
