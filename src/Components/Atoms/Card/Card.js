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

 const[showCard, setShowCard]= useState(false)
  //to expand first card
  const [cardId, setCardId] = useState("")
  
  //for dialog box
  const[open, setOpen]=useState(false)
  //selecting todo t open overview

  const[selectedTodo, setSelectedTodo] = useState(null)

 // to target input 
  const itemEvent = (e)=>{
    setList(e.target.value)

  };
 
  // const newCard={
  //   id: nanoid(),
  //   text: list,
  //   completed: false
  
  // }
    

//to add cards


function AddCard() {
  const newId = nanoid();
  setTask((prev) => {
    return [
      ...prev,
      {
        id: newId,
        text: list,
        cards: []
      }
    ];
  });
  setTodoItem("");
  setCardId(newId); // Set the cardId state with the new list ID
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




//   const newTodo = {
//      id: newCard.id,
//      text: todoItem,
//     completed: false,
//  };



 function AddTodo() {
  setTask((prev) =>
    prev.map((task) => {
      if (task.id === cardId) { // Use the cardId state variable
        return {
          ...task,
          cards: [
            ...task.cards,
            {
              id: cardId, // Use the cardId as the ID for the new card
              text: todoItem,
              completed: false
            }
          ]
        };
      }
      return task;
    })
  );
  setTodo("");
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
                 <ul className={Styles.todos}>  
                   {

                    list.cards.map((card)=>{
                      return(
                        <div className={Styles.todoItems} >
                        <li key={card.id}>{card.text} </li>
                        <MdEdit  />

                        <Dialog open={open} onClose={()=>setOpen(false)} >
                          <Overview />
                        </Dialog> 

                        <MdDelete /> 
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