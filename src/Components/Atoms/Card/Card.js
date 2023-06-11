import Styles from './Card.module.css';
import { ImCross } from 'react-icons/im';
import { GrAddCircle } from 'react-icons/gr';
import { RxCross2 } from 'react-icons/rx';
import { MdEdit, MdDelete } from 'react-icons/md';
import { Alert, Dialog } from '@mui/material';

import { useState } from 'react';
import Editable from '../Editable/Editable';
import Overview from '../Overview/overview';
import { nanoid } from 'nanoid';
import {useNavigate} from 'react-router-dom'

import {useRecoilState, useRecoilValue} from 'recoil';

export default function Card() {
  
  //dynamic routing
  const navigate= useNavigate()

  function handleRoute(card){
    
      
  }

  const [list, setList] = useState('');
  const [task, setTask] = useState([]);
  const [error, setError] = useState(''); // New state to track the error message

  // add todo list
  const [todoItem, setTodoItem] = useState('');
  const [selectedList, setSelectedList] = useState(null); // New state to track the selected list

  const [showCard, setShowCard] = useState(false);
  //to expand first card
  const [cardId, setCardId] = useState('');

  //for dialog box
  const [open, setOpen] = useState(false);
  //selecting todo to open overview

  const [selectedTodo, setSelectedTodo] = useState(null);

  // to target input
  const itemEvent = (e) => {
    setList(e.target.value);
    setError(''); // Clear the error message when input changes
  };

  // Add cards
  function AddCard() {
    if (list.trim() === '') {
      setError('Please enter a title for this card.'); // Set error message if input is empty
      return;
    }

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
    setList('');
    setCardId(newId); // Set the cardId state with the new list ID
    setSelectedList(newId); // Set the selectedList state with the new list ID
  }

  // Add Todo (target input)
  const listItem = (e) => {
    setTodoItem(e.target.value);
    setError(''); // Clear the error message when input changes
  };

  function AddTodo() {
    if (todoItem.trim() === '') {
      setError('Please enter a title for this todo.'); // Set error message if input is empty
      return;
    }

    // if (!selectedList) {
    //   setError('Please select a list to add the todo.'); // Set error message if no list is selected
    //   return;
    // }

   

     const newId = nanoid();
     setTask((prev) =>
       prev.map((task) => {
         if (task.id === selectedList) { // Use selectedList instead of cardId
         return {
             ...task,
             cards: [
               ...task.cards,
               {
                 id: newId,
                 text: todoItem,
                 completed: false
               }
             ]
           };
         }
       return task;
       })
     );
     setTodoItem('');
   }

  // Function to open the overview dialog for a specific todo item
  const handleOpenDialog = (todoId, taskName, cardTitle,card) => {
    navigate(`${card.text}`)
    setSelectedTodo({
      id: todoId,
      taskName: taskName,
      cardTitle: cardTitle
    });
    setOpen(true);
  };

  function handleDialogClose(){
    navigate('/managetasks')
    setOpen(false)
  }

  // Function to delete a specific todo item
  const handleDeleteTodo = (cardId, todoId) => {
    setTask((prev) =>
      prev.map((task) => {
        if (task.id === cardId) {
          const updatedCards = task.cards.filter((card) => card.id !== todoId);
          return {
            ...task,
            cards: updatedCards
          };
        }
        return task;
      })
    );
  };

  // Function to delete the entire card
  const handleDeleteCard = (cardId) => {
    setTask((prev) => prev.filter((task) => task.id !== cardId));
  };

  

  return (
    <>
      {task.map((list) => {
        return (
          <div key={list.id} className={Styles.addedCard}>
            <div className={Styles.cardHeader}>
              <div className={Styles.cardHeader}>
                <h4>{list.text}</h4>
                <RxCross2 onClick={() => handleDeleteCard(list.id)} />
              </div>
            </div>
            {/* Adding todo here */}
            <ul className={Styles.todos}>
              {list.cards.map((card) => {
                return (

                  <div onClick={()=> handleRoute(card)} className={Styles.todoItems} key={card.id}>
                    <li >{card.text}</li>
                    <MdEdit  onClick={() => handleOpenDialog(card.id, card.text, list.text,card)} /> 
                    <MdDelete onClick={() => handleDeleteTodo(list.id, card.id)} />
                    <Dialog open={open && selectedTodo !== null}  onClose={() => handleDialogClose()}>
                      {selectedTodo && (
                        <Overview />
                      )}
                    </Dialog>
                  </div>
                );
              })}
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
              error={error} // Pass the error message to the Editable component
            />
          </div>
        );
      })}

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
        error={error} // Pass the error message to the Editable component
      />
    </>
  );
}




















// import Styles from './Card.module.css'
// import { ImCross } from 'react-icons/im'
// import { GrAddCircle } from 'react-icons/gr'
// import { RxCross2 } from 'react-icons/rx'
// import {MdEdit, MdDelete} from 'react-icons/md'
// import {Dialog} from '@mui/material'

// import { useState } from 'react'
// import Editable from '../Editable/Editable';
// import Overview from '../Overview/overview';
// import { nanoid } from 'nanoid'

// export default function Card(){
//   const[list, setList]= useState("");
//   const[task, setTask]= useState([])

// // add todo list
//   const[todoItem, setTodoItem]=useState("");
//    const[todo, setTodo] =useState([])

//  const[showCard, setShowCard]= useState(false)
//   //to expand first card
//   const [cardId, setCardId] = useState("")
  
//   //for dialog box
//   const[open, setOpen]=useState(false)
//   //selecting todo t open overview

//   const[selectedTodo, setSelectedTodo] = useState(null)

//  // to target input 
//   const itemEvent = (e)=>{
//     setList(e.target.value)

//   };
 
//   // const newCard={
//   //   id: nanoid(),
//   //   text: list,
//   //   completed: false
  
//   // }
    

// //to add cards


// function AddCard() {
//   const newId = nanoid();
//   setTask((prev) => {
//     return [
//       ...prev,
//       {
//         id: newId,
//         text: list,
//         cards: []
//       }
//     ];
//   });
//   setTodoItem("");
//   setCardId(newId); // Set the cardId state with the new list ID
// }


// /*
//   function AddCard(){
//        setTask((prev)=>{
//         return [...prev, list]
//        })
//       setTodoItem("")
//   }*/
  
//   // add Todo(target input)
//   const listItem = (e)=>{
//     setTodoItem(e.target.value)

//   };




// //   const newTodo = {
// //      id: newCard.id,
// //      text: todoItem,
// //     completed: false,
// //  };

// function deleteTodo(card, id) {
//   setTask((prev) =>
//     prev.map((task) => {
//       if (task.id === card.id) {
//         return {
//           ...task,
//           cards: task.cards.filter((item) => item.id !== id)
//         };
//       }
//       return task;
//     })
//   );
// }

//  function AddTodo() {
//   setTask((prev) =>
//     prev.map((task) => {
//       if (task.id === cardId) { // Use the cardId state variable
//         return {
//           ...task,
//           cards: [
//             ...task.cards,
//             {
//               id: cardId, // Use the cardId as the ID for the new card
//               text: todoItem,
//               completed: false
//             }
//           ]
//         };
//       }
//       return task;
//     })
//   );
//   setTodo("");
// }

// const handleEdit = (id) => {
//   setSelectedTodo(id);
//   setOpen(true);
// }; 

    
//     return(
//         <>


//         { 
//            task.map((list)=>{

//               return (
//                 <div key={list.id}  className={Styles.addedCard} >
//                  <div className={Styles.cardHeader}>
                  
//                  <div className={Styles.cardHeader}>
//                   <h4 >{list.text}</h4>
//                  <RxCross2 />
//                  </div>
//                  </div> 
//                  {/* adding todo here */}
//                  <ul className={Styles.todos}>  
//                    {

//                     list.cards.map((card)=>{
//                       return(
//                         <div className={Styles.todoItems} >
//                         <li key={card.id}>{card.text} </li>
//                         <MdEdit  onClick={() => handleEdit(card.id)} />

//                         <Dialog open={open} onClose={()=>setOpen(false)} >
//                           <Overview />
//                         </Dialog> 

//                         <MdDelete onClick={()=> deleteTodo(list, card.id)}/> 
//                          </div>
//                       )
                      
//                     })
                   
//                   }
//                  </ul>
                 
                 
//                  <Editable
//                  onChangeEvent={listItem}
//                  firstButtonText={'Add a Card'}
//                  SeconButtonText={'Add Card'}
//                  InitialInputText={'Enter a title for this card'}
//                  InputStyles={Styles.input}
//                  btnClass={Styles.btn}
//                  addCardFunction={AddTodo}
//                  SecondCardStyle={Styles.todoAdder}
                
                  
//                  />
//                 </div>
//               ) 
                
//            })
//         } 

        
 



//         <Editable
//          onChangeEvent={itemEvent}
//          SeconButtonText={'Add List'}
//          firstButtonText={' + add Another List'}
//          InitialInputText={'Enter List Title'}
//          addCardFunction={AddCard}
//          SecondCardStyle={Styles.outer}
//          btnClass={Styles.btn}
//          InputStyles={Styles.input}
//          EditableFooterStyle={Styles.below}
//          firstCardStyle={Styles.ToAdd}
//          />

       
          
       

        
//         </>
//     )
// }