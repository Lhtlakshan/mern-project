import React, { useMemo, useState } from 'react'

const UseMemo = () => {

    const [number, setNumber] = useState(0);
    const [value, setValue] = useState(false)

    const calculation = useMemo(()=>{
        return expensiveFunc(number)
    },[number])

    const result = {
        name: value ? "saman": "kamal",
    } 

  return (
    <div>
        <input type="number"
        onChange={(e)=>{
            setNumber(e.target.value)
        }} 
        value={number}/>
        calculation : {calculation}

<br />
        {result.name}
        <button className='bg-blue-800 text-white' type="button" onClick={()=>{setValue(!value)}}>change name</button>

    </div>
  )
}

function expensiveFunc(num){
    console.log("loop started");
    for (let index = 0; index < 100000; index++) {
        
    }

    return num
    
}
export default UseMemo