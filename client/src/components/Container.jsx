import React, { useEffect, useRef, useState } from 'react'
import { Sets } from './Sets'
import axios from 'axios';

export const Container = () => {
    const formRef = useRef();
    const [localInterval, setLocalInterval] = useState(new Date());
    const [alarmValue, setAlarmValue] = useState('');
    const [alarmsList, setAlarmsList] = useState([]); 
    const alarmInput = (event) => {
        setAlarmValue(event.target.value);
    }

    useEffect(()=>{
        const intervalID = setInterval( () => {
            setLocalInterval(new Date());
        }, 1000 );

        return ()=>{clearInterval(intervalID)};
    }, [alarmValue])

    useEffect( () => {
        const fetchAlarms = async () => {
            try {
                const response = await axios.get('http://localhost:3001/get')
                setAlarmsList(response.data);
                
            }catch (err) {
                console.error(err)
            }
        }
        fetchAlarms();
    },[])
    const handleSubmission = (e) => {
      // e.preventDefault();
      try{
        const response = axios.post('http://localhost:3001/add', {time:alarmValue, onOff:true})
        // console.log(alarmValue);
        // if(response.ok){
        //   console.log(response, " hello ")
        // }
      }catch(err){
        console.log("ERROR FOUNDD!" ,err);
      }
    }


    const formattedTime = localInterval.toLocaleTimeString();
    const modifiedTime = formattedTime.replace(/:/, ' : ');
    return (
    <div className="flex flex-col items-center bg-[#F9F0F6] mx-auto h-[550px] max-h-[600px] w-[400px] border-black rounded-[0.2rem] border-[0.1px] " >
      <form ref={formRef} value={alarmValue} onChange={alarmInput} name="time" className='text-center mt-10 h-[180px] text` items-center flex flex-col justify-between border-black' >
        <h1 className='text-2xl'>{modifiedTime }</h1>
        <div name="to-set" className='flex gap-6 w-min mx-auto text-[1.2rem] ' >    
        <input type='time' className='w-[150px] px-2 h-[40px] border-black border-[1px] ' />
      </div>
      <button onClick={handleSubmission} className=' select-none hover:bg-[rgba(0,0,0,0.8)] hover:text-[white] duration-100 p-2 border-[0.1px] border-black bg-white w-[124px] ' >
        Add alarm
      </button>
      </form>
      
      <Sets/>
    </div>
  )
}
