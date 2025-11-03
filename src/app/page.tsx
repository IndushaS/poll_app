"use client"
import React, {useState,useEffect} from 'react'

export default function HomePage(){

  const [pollName,setPollName] = useState('');
  const [option,setOption] = useState('');
  const [options,setOptions]= useState([]);
  const [description, setDescription] = useState("default description for now");

  const [pollsList,setPollsList] = useState([]);

  
  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
      const res = await fetch('/api/polls/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({pollName,description,options})
      });

      const data = await res.json();
      console.log(data);

    }
    catch(err){
      console.log("error adding poll", err)

    }

  };

  useEffect(()=>{
    const getPolls = async () =>{
      try{
        const res = await fetch('/api/polls');
        const data = await res.json();
        //setPollsList(data.map((poll)=>(poll.name)));
        setPollsList(data);
        console.log(data);
      }
      catch(error){
        console.log("error getting polls",error)
      }
    }

    getPolls();

  },[]);

  const handleAddOption = () => {
    setOptions(prev => [...prev, option]);
    setOption('')
  }


  return(
    <div style={{display:'flex', flexDirection:'column',alignItems:'center'}}>
      <div> 
        <h1 style = {{fontSize:'32px'}}>Poll App</h1></div>
      
      <form onSubmit={handleSubmit}>
        
        <label style={{marginRight:'10px'}}>Poll Name</label>
        <input 
          type="text"
          value={pollName}
          style= {{border:'1px solid #ccc'}}
          onChange={(e) => {setPollName(e.target.value)}}
        />
        <br/>
        <label> Poll Option </label>
       
        <input 
          type="text"
          value={option}
          style= {{border:'1px solid #ccc'}}
          onChange={(e) => {setOption(e.target.value)}}
        />
      
        <br/>
        
        <button type="submit">
          Submit
        </button>


        <ul>
          {pollsList.map((poll,index) => <li key={index}>{poll.name}
            {poll.op}
            
          </li>)}

        </ul>

      </form>
    </div>
  );

}