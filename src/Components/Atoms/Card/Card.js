import Styles from './Card.module.css'
import { MdOutlineDelete } from 'react-icons/md'
import { GrAddCircle } from 'react-icons/gr'
import { useState } from 'react'

export default function Card(){
  const[list, setList]= useState("");
  const[task, setTask]= useState([])
  

  //to expand first card
  

 // to target input 
  const itemEvent = (e)=>{
    setList(e.target.value)

  };

//to add cards
  function AddCard(){
       setTask((prev)=>{
        return [...prev, list]
       })
  }
    return(
        <>
        

       
        <div className={Styles.ToAdd} >

             <GrAddCircle className={Styles.addIcon}/>
            <span >Add new Item </span>
            </div> 
     


        { 
           task.map((val)=>{
              return (
                <div className={Styles.addedCard}>
                 <div>{val}</div>
                 <div>+ Add a Card</div>
                </div>
              ) 
                
           })
        } 

        <div className={Styles.outer}>
         <input className={Styles.input} onChange={itemEvent}/>
         <div className={Styles.below}>
         <button className={Styles.btn} onClick={AddCard}>Add</button>
         <MdOutlineDelete className={Styles.delete}/>
         </div>
        </div>
        
       
          
       

        
        </>
    )
}