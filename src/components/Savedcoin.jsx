import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { doc , onSnapshot , updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { UserAuth } from '../context/AuthContext'






export const Savedcoin = () => {

    const { user } = UserAuth();
    const [coins, setCoins] = useState([]);
    const coinpath = doc(db, "users", `${user?.email}`);


    useEffect(() => {
        const unsubscribe = onSnapshot(coinpath, (docSnapshot) => {
          const userData = docSnapshot.data();
          if (userData) {
            setCoins(userData.watchlist || []); 
          } else {
            setCoins([]); 
          }
        });

        return () => {
            unsubscribe();
          };
        }, [user?.email, coinpath]);
      
        const deleteCoin = async (passedId) => {
          try {
            const updatedWatchlist = coins.filter((item) => item.id !== passedId);
            await updateDoc(coinpath, {
              watchlist: updatedWatchlist,
            });
          } catch (e) {
            console.log(e.message);
          }
        };



  return (
    <div>
        
        {coins?.length === 0 ? (<p>you dont have any coin saved.please save a coin to add it to watch list. <Link to="/"> click here to search coin.</Link></p>) 
        
        :
        (

            <table className='w-full border border-collapse text-center '>
                <thead>
                    <tr className='border-b'>
                        <th className='px-4'>Rank #</th>
                        <th className='text-left'>Coin </th>
                        <th className='text-left'>Remove</th>
                    </tr>
                </thead>

                <tbody>
                    {coins?.map((coin)=>(

                        <tr key={coin.id} className='h-[60px] overflow-hidden'>
                            <td>{coin?.rank}</td>
                            <td>
                                <div className='flex items-center '>
                                    <img src={coin?.img} alt="/"  className='w-8 mr-4'/>
                                    <div>
                                        <p className='hidden sm:table-cell'>{coin?.name}</p>
                                        <p className='text-gray-500 text-left  text-sm'>{coin?.symbol.toUpperCase()}</p>
                                    </div>
                                </div>
                            </td>

                            <td className='pl-8 '    >  
                                <AiOutlineClose  onClick={() => deleteCoin(coin.id)}   className='cursor-pointer '    />
                            </td>
                        </tr>
                    ))}


                </tbody>
            </table>
        )}

    </div>
  )
}
