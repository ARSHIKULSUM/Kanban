import Styles from './Card.module.css'
import { ImCross } from 'react-icons/im'
import { GrAddCircle } from 'react-icons/gr'
import { RxCross2 } from 'react-icons/rx'
import {MdEdit, MdDelete} from 'react-icons/md'
import {Dialog} from '@mui/material'

import { useState } from 'react'
import Editable from '../Editable/Editable';
import Overview from '../Overview/overview';
import { nanoid } from 'nanoid'

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

  const newCard={
    id: nanoid(),
    text: list,
    completed: false
  
  }
    

//to add cards
function AddCard(){
  setTask((prev)=>{
   return [...prev, newCard]
  })
 setTodoItem("")
}


/*
  function AddCard(){
       setTask((prev)=>{
        return [...prev, list]
       })
      setTodoItem("")
  }*/
  
  // add Todo(target input)
  const listItem = (e)=>{
    setTodoItem(e.target.value)

  };




  const newTodo = {
    id: nanoid(), 
    text: todoItem,
    completed: false,
};



    function AddTodo(){
      
        setTodo((val)=>{
         return[...val, newTodo]
        
        })

        console.log(newTodo)
    }

    function deleteTodo(id) {
      setTodo((prevTodos) => prevTodos.filter((todoItem) => todoItem.id !== id));
    }
    return(
        <>


        { 
           task.map((list)=>{

              return (
                <div key={list.id}  className={Styles.addedCard} >
                 <div className={Styles.cardHeader}>
                  
                 <div className={Styles.cardHeader}>
                  <h4 >{list.text}</h4>
                 <RxCross2 />
                 </div>
                 </div> 
                 {/* adding todo here */}
                 <ul key={list.id}  className={Styles.todos}>  
                   {

                    todo.map((todoItem)=>{
                      return(
                        <div className={Styles.todoItems} >
                        <li key={todoItem.id}>{todoItem.text} </li>
                        <MdEdit onClick={()=>setOpen(true)}/>

                        <Dialog open={open} onClose={()=>setOpen(false)} >
                          <Overview />
                        </Dialog> 

                        <MdDelete onClick={()=>deleteTodo(todoItem.id)}/> 
                         </div>
                      )
                      
                    })
                   
                  }
                 </ul>
                 
                 
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