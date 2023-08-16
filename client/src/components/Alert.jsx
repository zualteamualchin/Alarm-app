import React, { useEffect, useState } from 'react'

export const Alert = ({start}) => {
    const [timeInterval, setTimeInterval] = useState(start);
    useEffect(()=>{
        if (timeInterval <= 60){
            const timer = setTimeout(() => {
                setTimeInterval(timeInterval + 1);
        }, 1000)
        return () => clearTimeout(timer);
    }
    }, [timeInterval])
  return timeInterval>=60 ?(<></>):
  (<div className='absolute h-[300px] bottom-1 w-[300px] bg-[rgba(243,141,141,0.9)] border-[0.1px] flex flex-col justify-evenly items-center border-white  ' >
  <h1 className='text-4xl text-center'>WAKE UP<p>{timeInterval}</p></h1>
  <button onClick={()=> setTimeInterval(60)} className='p-3 px-8 border-black border-[0.1px] hover:bg-[rgba(255,255,255,0.5)] mx-auto' >I'm Awake</button>
</div>)
}
