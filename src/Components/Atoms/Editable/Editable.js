import { useState } from 'react'
import Styles from './Editable.module.css'
import { MdOutlineFormatLineSpacing } from 'react-icons/md'
import { ImCross } from 'react-icons/im'


export default function Editable({onChangeEvent,SeconButtonText,firstButtonText,InitialInputText,addCardFunction,SecondCardStyle
                                  ,btnClass,InputStyles,EditableFooterStyle, firstCardStyle}){

    const[list, setList]= useState("");
    const[showCard, setShowCard]= useState(false)
    const[task, setTask]= useState([])


    const itemEvent = (e)=>{
        setList(e.target.value)
    
      };

      function AddCard(){
        setTask((prev)=>{
         return [...prev, list]
        })
   }

    return(
        <div className={Styles.editable}>
           {
            showCard ?
            (<div className={SecondCardStyle}>
              <input className={InputStyles} onChange={onChangeEvent} placeholder={InitialInputText}/>
              <div className={EditableFooterStyle}>
              <button className={btnClass} onClick={addCardFunction}>{SeconButtonText}</button>
              <ImCross className={Styles.delete} onClick={()=>{setShowCard(false)}}/>
              </div>
             </div>

             ) :(

              <div className={firstCardStyle} onClick={()=>{setShowCard(true)}}>
              <span >{firstButtonText}</span>
              </div> 

            )
             
          }
        </div>

    )
}