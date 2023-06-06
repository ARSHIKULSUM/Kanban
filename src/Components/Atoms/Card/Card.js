import Styles from './Card.module.css'
import { ImCross } from 'react-icons/im'
import { GrAddCircle } from 'react-icons/gr'
import { RxCross2 } from 'react-icons/rx'
import {MdEdit, MdDelete} from 'react-icons/md'
import {Dialog} from '@mui/material'

import { useState } from 'react'
import Editable from '../Editable/Editable';
import Overview from '../Overview/overview'

export default function Card(){
  const[list, setList]= useState("");
  const[task, setTask]= useState([])

// add todo list
  const[todoItem, setTodoItem]=useState("");
  const[todo, setTodo] =useState([])
  //for dialog box
  const[open, setOpen]=useState(false)

 const[showCard, setShowCard]= useState(false)
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
  // add Todo(target input)
  const listItem = (e)=>{
    setTodoItem(e.target.value)

  };

    function AddTodo(){
        setTodo((val)=>{
          return[...val, todoItem]
        })
    }

    function deleteTodo(){

    }
    return(
        <>


        { 
           task.map((val)=>{
              return (
                <div className={Styles.addedCard}>
                 <div className={Styles.cardHeader}>
                  
                 <div className={Styles.cardHeader}>
                  <h4>{val}</h4>
                 <RxCross2 />
                 </div>
                 </div> 
                 {/* adding todo here */}
                 <div className={Styles.todos}>  
                   {

                    todo.map((item)=>{
                      return(
                        <div className={Styles.todoItems}>
                        <h4 >{item} </h4>
                        <MdEdit onClick={()=>setOpen(true)}/>

                        <Dialog open={open} onClose={()=>setOpen(false)} >
                          <Overview />
                        </Dialog> 

                        <MdDelete onClick={deleteTodo}/> 
                         </div>
                      )
                      
                    })
                   
                  }
                 </div>
                 
                 
                 <Editable
                 onChangeEvent={listItem}
                 firstButtonText={'Add a Card'}
                 SeconButtonText={'Add Card'}
                 InitialInputText={'Enter a title for this card'}
                 InputStyles={Styles.input}
                 btnClass={Styles.btn}
                 addCardFunction={AddTodo}
                 SecondCardStyle={Styles.todoAdder}
                 
                  
                 />
                </div>
              ) 
                
           })
        } 

        
 



        <Editable
         onChangeEvent={itemEvent}
         SeconButtonText={'Add List'}
         firstButtonText={' + add Another List'}
         InitialInputText={'Enter List Title'}
         addCardFunction={AddCard}
         SecondCardStyle={Styles.outer}
         btnClass={Styles.btn}
         InputStyles={Styles.input}
         EditableFooterStyle={Styles.below}
         firstCardStyle={Styles.ToAdd}
         />

       
          
       

        
        </>
    )
}