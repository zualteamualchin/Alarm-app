import React, { useEffect, useState } from 'react'
import {MdDeleteOutline} from 'react-icons/md'
import {ImSwitch} from 'react-icons/im';
import axios from 'axios'
import { Alert } from './Alert';

export const Sets = () => {
    
    const [alarmsList, setAlarmsList] = useState([]); 
    const [localInterval, setLocalInterval] = useState(new Date())
    const [alerter, setAlerter] = useState(false);
    const alarmTrigger = () => {
        const date = new Date();
        const localTimeStore = date.toLocaleTimeString().replace(/:/, ':');

        alarmsList.map((alarm) => {
            console.log(localTimeStore.slice(0,4), alarm.time.slice(1,5))
            if (alarm.time.slice(1,5) === localTimeStore.slice(0,4) && alarm.OnOff ){
                setAlerter(!alerter);
            }
        })
    }
    useEffect(() => {
        const intervalID = setInterval( () => {
            setLocalInterval(new Date());
            alarmTrigger();
        }, 1000)

        return () => {clearInterval(intervalID)}
    },[alarmsList])
    useEffect( () => {
        const fetchAlarms = async () => {
            try {
                const response = await axios.get('http://localhost:3001/get')
                setAlarmsList(response.data);
                // console.log(alarmsList);
            }catch (err) {
                console.error(err)
            }
        }
        fetchAlarms();
    },[])
    useEffect( () => {
        alarmsList.map( (alarm) => {

        } )
    } )
    const deleteAlarm = async (id) => {
        try{
            await axios.delete(`http://localhost:3001/delete/${id}`)
            setAlarmsList(alarmsList.filter((alarm)=>id !== alarm._id))
            console.log("Deleted")
        }catch (err){
            console.error("ERROR")
        }
    }
    const power = async (id, onOff) => {
        console.log(onOff)
        await axios.put(`http://localhost:3001/update/${id}`, {onOff:!onOff})
        setAlarmsList( (prevAlarmValues) => 
            prevAlarmValues.map((val) => 
                 id === val._id ? {...val, OnOff:!onOff} : val
            )
        )
    }
    return (
    <div className='relative mt-[2rem] flex items-center flex-col gap-6 ' >
        {alerter ? (<Alert start={0} />):''}
        <h2 className='inline border-b-[0.1px] border-black ' >MY ALARMS</h2>
        
            {alarmsList.map((val) => (
            <div className=' p-2 border-b-[0.1px] flex justify-between border-black w-[300px]' >
                <h3 key={val._id}>{val.time}</h3>
                <div className='items-center border-black flex gap-4' >
                    <ImSwitch onClick={()=> {power(val._id, val.OnOff)}} className={` text-[1.2rem] hover:text-red-600 ${val.OnOff?'text-red-600':'text-black'} `} />
                    <MdDeleteOutline onClick={() => {deleteAlarm(val._id)}} className='text-2xl'/>
                </div>
            </div>
            
        ))}
        
    </div>
  )
}
