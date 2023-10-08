import React, { useState } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { Sparklines ,SparklinesLine } from 'react-sparklines';
import { UserAuth } from '../context/AuthContext'
import { db } from '../firebase';
import { arrayUnion ,doc ,updateDoc } from 'firebase/firestore';

export const Coinitem = ({coin}) => {

const [savedcoin ,setsavedcoin] = useState(false)
const{user}=UserAuth()

  const coinpath = doc(db, "users",`${user?.email}`)
  const savecoin = async()=>{
    if(user?.email){
      setsavedcoin(true)
      await updateDoc(coinpath , {
        watchlist:arrayUnion({
          id:coin.id,
          name:coin.name,
          img:coin.image,
          rank:coin.market_cap_rank,
          symbol:coin.symbol
        })
      })
    }else{
      alert("please sign in to save coin to your watch list!")
    }
  }

  return (
    
          <tr className='h-[80px] border-b overflow-hidden'>
              <td onClick={savecoin}>{savedcoin? <AiFillStar/> :<AiOutlineStar/> }</td>
              <td>{coin.market_cap_rank}</td>
              <td>

                <Link to={`/coin/${coin.id}`}>
                <div className='flex items-center '>
                  <img src={coin.image} alt={coin.id} className='w-6 mr-2 rounded-full'/>
                  <p className='hidden sm:table-cell'>{coin.name}</p>
                </div>
                </Link>

              </td>
              <td className='font-bold'>{coin.symbol.toUpperCase()}</td>
              <td>${coin.current_price.toLocaleString()}</td>
              <td>
                {coin.price_change_percentage_24h > 0 ? (
                <p className='text-green-600 className=' >  {coin.price_change_percentage_24h.toFixed(2)} % </p>) 
                : (<p className='text-green-600'>{coin.price_change_percentage_24h.toFixed(2)}%</p>)}
                </td>
                <td className='w-[180px] hidden md:table-cell'>${coin.total_volume.toLocaleString()}</td>
                <td  className='w-[180px] hidden sm:table-cell' >${coin.market_cap.toLocaleString()}</td>
              
              <td className='w-[180px] hidden sm:table-cell '>
                <Sparklines data={coin.sparkline_in_7d.price}>
                   <SparklinesLine color='teal'/>
                </Sparklines>
              </td>
            </tr>
    
  )
}
