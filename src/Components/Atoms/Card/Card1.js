// import React, { useState,useRef, useEffect } from "react";
// import Style from './Card.module.css';
// import { FaEdit, FaTrashAlt } from "react-icons/fa";
// import { BsThreeDots } from "react-icons/bs";

// export default function App() {
//     const [chapture, setChapture] = useState("");
//   const [show, setShow] = useState(false);
//   const [list, setList] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [showOptions, setShowOptions] = useState(null);
//   const editInputRef = useRef(null);

//   function handleAdd() {
//     const inputData = { title: chapture, childChapture: "", childrenData: [] };
//     setList([...list, inputData]);
//     setChapture("");
//   }

//   function handleClick(i) {
//     const updatedList = [...list];
//     const childData = updatedList[i].childChapture;
//     updatedList[i].childrenData.push(childData);
//     setList(updatedList);
//     updatedList[i].childChapture = "";
//     setList(updatedList);
//   }

//   function handleChildChapture(i, e) {
//     const updatedList = [...list];
//     updatedList[i].childChapture = e.target.value;
//     setList(updatedList);
//   }

//   function handleDragStart(e, parentIndex, childIndex) {
//     e.dataTransfer.setData("parentIndex", parentIndex.toString());
//     e.dataTransfer.setData("childIndex", childIndex.toString());
//     e.target.classList.add("dragging");
//   }

//   function handleDragEnd(e) {
//     e.target.classList.remove("dragging");
//   }

//   function handleDragEnter(e) {
//     e.target.classList.add("over");
//   }

//   function handleDragLeave(e) {
//     e.target.classList.remove("over");
//   }

//   function handleDrop(e, parentIndex, childIndex) {
//     const draggedParentIndex = Number(e.dataTransfer.getData("parentIndex"));
//     const draggedChildIndex = Number(e.dataTransfer.getData("childIndex"));
//     const updatedList = [...list];
//     const draggedItem = updatedList[draggedParentIndex].childrenData[draggedChildIndex];

//     updatedList[draggedParentIndex].childrenData.splice(draggedChildIndex, 1);
//     updatedList[parentIndex].childrenData.splice(childIndex, 0, draggedItem);

//     setList(updatedList);
//   }

//   function handleDragOver(e) {
//     e.preventDefault();
//   }

//   function handleDeleteList(parentIndex) {
//     const updatedList = [...list];
//     updatedList.splice(parentIndex, 1);
//     setList(updatedList);
//   }

//   function handleDeleteChild(parentIndex, childIndex) {
//     const updatedList = [...list];
//     updatedList[parentIndex].childrenData.splice(childIndex, 1);
//     setList(updatedList);
//   }

//   function handleEditItem(i) {
//     setSelectedItem(i);
//   }

//   function handleCancelEdit() {
//     setSelectedItem(null);
//   }

//   function handleSaveEdit(i, value) {
//     const updatedList = [...list];
//     updatedList[i].title = value;
//     setList(updatedList);
//     setSelectedItem(null);
//   }

//   function handleOptions(index) {
//     setShowOptions((prevState) => (prevState === index ? null : index));
//   }

//   function handleHideOptions() {
//     setShowOptions(null);
//   }

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (editInputRef.current && !editInputRef.current.contains(e.target)) {
//         handleSaveEdit(selectedItem, editInputRef.current.value);
//       }
//     };

//     if (selectedItem !== null) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [selectedItem]);

//   return (
//     <div className={Style.container}>
//       {list.map((x, i) => (
//         <div
//           key={i}
//           className={Style.item}
//           onDragOver={handleDragOver}
//           onDrop={(e) => handleDrop(e, i, 0)}
//           onDragEnter={handleDragEnter}
//           onDragLeave={handleDragLeave}
//           draggable
//           onDragStart={(e) => handleDragStart(e, i, 0)}
//           onDragEnd={handleDragEnd}
//         >
            
//           <div className={Style.cardHeader}>
//           {selectedItem === i ? (
//               <input
//                 type="text"
//                 className="editInput"
//                 ref={editInputRef}
//                 defaultValue={x.title}
//                 autoFocus
//               />
//             ) : (
//             <h1>{x.title}</h1>
//             )}
//             <div className="iconContainer">
//               <BsThreeDots
//                 className="deleteIcon"
//                 onClick={() => handleOptions(i)}
//               />
//               {showOptions === i && (
//                 <div className="popover">
//                   <div className="popoverContent">
//                     <FaEdit className="popoverOption" onClick={() => handleEditItem(i)}/>
                  
//                     <FaTrashAlt className="popoverOption" onClick={() => handleDeleteList(i)}/>
                      
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//           <div className="todos">
//             {x.childrenData.map((child, j) => (
//               <div
//               className={Style.todoitemContainer}
//                 key={j}
//                 draggable
//                 onDragStart={(e) => handleDragStart(e, i, j)}
//                 onDragEnd={handleDragEnd}
//               >
//                 {child}
//                 <div className="iconContainer">
//                   <FaEdit className={Style.editIcon} />
//                   <FaTrashAlt
//                     className="deleteIcon"
//                     onClick={() => handleDeleteChild(i, j)}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
         


//           <input
//             className={Style.inputTodoAdder}
//             value={x.childChapture}
//             onChange={(e) => handleChildChapture(i, e)}
//           />
//           <button className={Style.btn }onClick={() => handleClick(i)}>
//             Add Item
//           </button>
//         </div>
        
//       ))}

//       <div className={Style.itemCard}>
//         {show ? (
//           <div className={Style.todoAdder}>
//             <input
//               className={Style.inputodo}
//               value={chapture}
//               onChange={(e) => setChapture(e.target.value)}
//             />
//             <button className={Style.btn} onClick={handleAdd}>
//               Add Card
//             </button>
//           </div>
//         ) : (
//           <button className={Style.ToAdd} onClick={() => setShow(true)}>
//             <span className={Style.addIcon}>+</span> Add List
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }


// import React, { useState, useRef, useEffect } from "react";
// import { nanoid } from "nanoid";
// import Style from "./Card.module.css";
// import { FaEdit, FaTrashAlt } from "react-icons/fa";
// import { BsThreeDots } from "react-icons/bs";

// export default function App() {
//   const [chapture, setChapture] = useState("");
//   const [show, setShow] = useState(false);
//   const [list, setList] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [showOptions, setShowOptions] = useState(null);
//   const editInputRef = useRef(null);

//   function handleAdd() {
//     const inputData = {
//       id: nanoid(),
//       title: chapture,
//       childChapture: "",
//       childrenData: [],
//     };
//     setList([...list, inputData]);
//     setChapture("");
//   }

//   function handleClick(id) {
//     const updatedList = list.map((item) => {
//       if (item.id === id) {
//         const newItem = { ...item };
//         newItem.childrenData.push(newItem.childChapture);
//         newItem.childChapture = "";
//         return newItem;
//       }
//       return item;
//     });
//     setList(updatedList);
//   }

//   function handleChildChapture(id, e) {
//     const updatedList = list.map((item) => {
//       if (item.id === id) {
//         const newItem = { ...item };
//         newItem.childChapture = e.target.value;
//         return newItem;
//       }
//       return item;
//     });
//     setList(updatedList);
//   }

//   function handleDragStart(e, id) {
//     e.dataTransfer.setData("itemId", id);
//     e.target.classList.add("dragging");
//   }

//   function handleDragEnd(e) {
//     e.target.classList.remove("dragging");
//   }

//   function handleDragEnter(e) {
//     e.target.classList.add("over");
//   }

//   function handleDragLeave(e) {
//     e.target.classList.remove("over");
//   }

//   function handleDrop(e, targetId) {
//     const draggedItemId = e.dataTransfer.getData("itemId");

//     const updatedList = [...list];
//     const draggedItemIndex = updatedList.findIndex((item) => item.id === draggedItemId);
//     const targetItemIndex = updatedList.findIndex((item) => item.id === targetId);

//     const draggedItem = updatedList[draggedItemIndex];
//     updatedList.splice(draggedItemIndex, 1);
//     updatedList.splice(targetItemIndex, 0, draggedItem);

//     setList(updatedList);
//   }

//   function handleDragOver(e) {
//     e.preventDefault();
//   }

//   function handleDeleteList(id) {
//     const updatedList = list.filter((item) => item.id !== id);
//     setList(updatedList);
//   }

//   function handleDeleteChild(parentId, childIndex) {
//     const updatedList = list.map((item) => {
//       if (item.id === parentId) {
//         const newItem = { ...item };
//         newItem.childrenData.splice(childIndex, 1);
//         return newItem;
//       }
//       return item;
//     });
//     setList(updatedList);
//   }

//   function handleEditItem(id) {
//     setSelectedItem(id);
//   }

//   function handleCancelEdit() {
//     setSelectedItem(null);
//   }

//   function handleSaveEdit(id, value) {
//     const updatedList = list.map((item) => {
//       if (item.id === id) {
//         const newItem = { ...item };
//         newItem.title = value;
//         return newItem;
//       }
//       return item;
//     });
//     setList(updatedList);
//     setSelectedItem(null);
//   }

//   function handleOptions(id) {
//     setShowOptions((prevState) => (prevState === id ? null : id));
//   }

//   function handleHideOptions() {
//     setShowOptions(null);
//   }

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (editInputRef.current && !editInputRef.current.contains(e.target)) {
//         handleSaveEdit(selectedItem, editInputRef.current.value);
//       }
//     };

//     if (selectedItem !== null) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [selectedItem]);

//   return (
//     <div className={Style.container}>
//       {list.map((item) => (
//         <div
//           key={item.id}
//           className={Style.item}
//           onDragOver={handleDragOver}
//           onDrop={(e) => handleDrop(e, item.id)}
//           onDragEnter={handleDragEnter}
//           onDragLeave={handleDragLeave}
//         >
//           <div className={Style.cardHeader}>
//             {selectedItem === item.id ? (
//               <input
//                 type="text"
//                 className="editInput"
//                 ref={editInputRef}
//                 defaultValue={item.title}
//                 autoFocus
//               />
//             ) : (
//               <h1>{item.title}</h1>
//             )}
//             <div className="iconContainer">
//               <BsThreeDots
//                 className="deleteIcon"
//                 onClick={() => handleOptions(item.id)}
//               />
//               {showOptions === item.id && (
//                 <div className="popover">
//                   <div className="popoverContent">
//                     <FaEdit className="popoverOption" onClick={() => handleEditItem(item.id)} />
//                     <FaTrashAlt className="popoverOption" onClick={() => handleDeleteList(item.id)} />
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//           <div className="todos">
//             {item.childrenData.map((child, index) => (
//               <div
//                 className={Style.todoitemContainer}
//                 key={index}
//                 draggable
//                 onDragStart={(e) => handleDragStart(e, item.id)}
//                 onDragEnd={handleDragEnd}
//               >
//                 {child}
//                 <div className="iconContainer">
//                   <FaEdit className={Style.editIcon} />
//                   <FaTrashAlt className="deleteIcon" onClick={() => handleDeleteChild(item.id, index)} />
//                 </div>
//               </div>
//             ))}
//           </div>
//           <input
//             className={Style.inputTodoAdder}
//             value={item.childChapture}
//             onChange={(e) => handleChildChapture(item.id, e)}
//           />
//           <button className={Style.btn} onClick={() => handleClick(item.id)}>
//             Add Item
//           </button>
//         </div>
//       ))}
//       <div className={Style.itemCard}>
//         {show ? (
//           <div className={Style.todoAdder}>
//             <input
//               className={Style.inputodo}
//               value={chapture}
//               onChange={(e) => setChapture(e.target.value)}
//             />
//             <button className={Style.btn} onClick={handleAdd}>
//               Add Card
//             </button>
//           </div>
//         ) : (
//           <button className={Style.ToAdd} onClick={() => setShow(true)}>
//             <span className={Style.addIcon}>+</span> Add List
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }


// import React, { useState, useRef, useEffect } from "react";
// import { nanoid } from "nanoid";
// import Style from "./Card.module.css";
// import { FaEdit, FaTrashAlt } from "react-icons/fa";
// import { BsThreeDots } from "react-icons/bs";

// export default function App() {
//   const [chapture, setChapture] = useState("");
//   const [show, setShow] = useState(false);
//   const [list, setList] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [showOptions, setShowOptions] = useState(null);
//   const editInputRef = useRef(null);

//   function handleAdd() {
//     const inputData = {
//       id: nanoid(),
//       title: chapture,
//       childChapture: "",
//       childrenData: [],
//     };
//     setList([...list, inputData]);
//     setChapture("");
//   }

//   function handleClick(id) {
//     const updatedList = list.map((item) => {
//       if (item.id === id) {
//         const newItem = { ...item };
//         newItem.childrenData.push(newItem.childChapture);
//         newItem.childChapture = "";
//         return newItem;
//       }
//       return item;
//     });
//     setList(updatedList);
//   }

//   function handleChildChapture(id, e) {
//     const updatedList = list.map((item) => {
//       if (item.id === id) {
//         const newItem = { ...item };
//         newItem.childChapture = e.target.value;
//         return newItem;
//       }
//       return item;
//     });
//     setList(updatedList);
//   }

//   function handleDragStart(e, parentId, childIndex) {
//     e.dataTransfer.setData("parentId", parentId);
//     e.dataTransfer.setData("childIndex", childIndex);
//     e.target.classList.add("dragging");
//   }

//   function handleDragEnd(e) {
//     e.target.classList.remove("dragging");
//   }

//   function handleDragEnter(e) {
//     e.target.classList.add("over");
//   }

//   function handleDragLeave(e) {
//     e.target.classList.remove("over");
//   }

//   function handleDrop(e, targetId) {
//     const draggedParentId = e.dataTransfer.getData("parentId");
//     const draggedChildIndex = e.dataTransfer.getData("childIndex");

//     const updatedList = [...list];
//     const draggedParentIndex = updatedList.findIndex((item) => item.id === draggedParentId);
//     const targetParentIndex = updatedList.findIndex((item) => item.id === targetId);

//     const draggedParent = updatedList[draggedParentIndex];
//     const draggedItem = draggedParent.childrenData[draggedChildIndex];

//     // Remove the dragged item from the previous list
//     draggedParent.childrenData.splice(draggedChildIndex, 1);

//     // Add the dragged item to the new list
//     const targetParent = updatedList[targetParentIndex];
//     targetParent.childrenData.push(draggedItem);

//     setList(updatedList);
//   }

//   function handleDragOver(e) {
//     e.preventDefault();
//   }

//   function handleDeleteList(id) {
//     const updatedList = list.filter((item) => item.id !== id);
//     setList(updatedList);
//   }

//   function handleDeleteChild(parentId, childIndex) {
//     const updatedList = list.map((item) => {
//       if (item.id === parentId) {
//         const newItem = { ...item };
//         newItem.childrenData.splice(childIndex, 1);
//         return newItem;
//       }
//       return item;
//     });
//     setList(updatedList);
//   }

//   function handleEditItem(id) {
//     setSelectedItem(id);
//   }

//   function handleCancelEdit() {
//     setSelectedItem(null);
//   }

//   function handleSaveEdit(id, value) {
//     const updatedList = list.map((item) => {
//       if (item.id === id) {
//         const newItem = { ...item };
//         newItem.title = value;
//         return newItem;
//       }
//       return item;
//     });
//     setList(updatedList);
//     setSelectedItem(null);
//   }

//   function handleOptions(id) {
//     setShowOptions((prevState) => (prevState === id ? null : id));
//   }

//   function handleHideOptions() {
//     setShowOptions(null);
//   }

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (editInputRef.current && !editInputRef.current.contains(e.target)) {
//         handleSaveEdit(selectedItem, editInputRef.current.value);
//       }
//     };

//     if (selectedItem !== null) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [selectedItem]);

//   return (
//     <div className={Style.container}>
//       {list.map((item) => (
//         <div
//           key={item.id}
//           className={Style.item}
//           onDragOver={handleDragOver}
//           onDrop={(e) => handleDrop(e, item.id)}
//           onDragEnter={handleDragEnter}
//           onDragLeave={handleDragLeave}
//         >
//           <div className={Style.cardHeader}>
//             {selectedItem === item.id ? (
//               <input
//                 type="text"
//                 className="editInput"
//                 ref={editInputRef}
//                 defaultValue={item.title}
//                 autoFocus
//               />
//             ) : (
//               <h1>{item.title}</h1>
//             )}
//             <div className="iconContainer">
//               <BsThreeDots
//                 className="deleteIcon"
//                 onClick={() => handleOptions(item.id)}
//               />
//               {showOptions === item.id && (
//                 <div className="popover">
//                   <div className="popoverContent">
//                     <FaEdit className="popoverOption" onClick={() => handleEditItem(item.id)} />
//                     <FaTrashAlt className="popoverOption" onClick={() => handleDeleteList(item.id)} />
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//           <div className="todos">
//             {item.childrenData.map((child, index) => (
//               <div
//                 className={Style.todoitemContainer}
//                 key={index}
//                 draggable
//                 onDragStart={(e) => handleDragStart(e, item.id, index)}
//                 onDragEnd={handleDragEnd}
//               >
//                 {child}
//                 <div className="iconContainer">
//                   <FaEdit className={Style.editIcon} />
//                   <FaTrashAlt className="deleteIcon" onClick={() => handleDeleteChild(item.id, index)} />
//                 </div>
//               </div>
//             ))}
//           </div>
//           <input
//             className={Style.inputTodoAdder}
//             value={item.childChapture}
//             onChange={(e) => handleChildChapture(item.id, e)}
//           />
//           <button className={Style.btn} onClick={() => handleClick(item.id)}>
//             Add Item
//           </button>
//         </div>
//       ))}
//       <div className={Style.itemCard}>
//         {show ? (
//           <div className={Style.todoAdder}>
//             <input
//               className={Style.inputodo}
//               value={chapture}
//               onChange={(e) => setChapture(e.target.value)}
//             />
//             <button className={Style.btn} onClick={handleAdd}>
//               Add Card
//             </button>
//           </div>
//         ) : (
//           <button className={Style.ToAdd} onClick={() => setShow(true)}>
//             <span className={Style.addIcon}>+</span> Add List
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }



// import React, { useState, useRef, useEffect } from "react";
// import { nanoid } from "nanoid";
// import Style from "./Card.module.css";
// import { FaEdit, FaTrashAlt } from "react-icons/fa";
// import { BsThreeDots } from "react-icons/bs";

// export default function App() {
//   const [chapture, setChapture] = useState("");
//   const [show, setShow] = useState(false);
//   const [list, setList] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [showOptions, setShowOptions] = useState(null);
//   const editInputRef = useRef(null);

//   // Load data from local storage on component mount
//   useEffect(() => {
//     const savedList = localStorage.getItem("list");
//     if (savedList) {
//       setList(JSON.parse(savedList));
//     }
//   }, []);

//   // Save data to local storage whenever the list changes
//   useEffect(() => {
//     localStorage.setItem("list", JSON.stringify(list));
//   }, [list]);

//   function handleAdd() {
//     const inputData = {
//       id: nanoid(),
//       title: chapture,
//       childChapture: "",
//       childrenData: [],
//     };
//     setList([...list, inputData]);
//     setChapture("");
//   }

//   function handleClick(id) {
//     const updatedList = list.map((item) => {
//       if (item.id === id) {
//         const newItem = { ...item };
//         newItem.childrenData.push(newItem.childChapture);
//         newItem.childChapture = "";
//         return newItem;
//       }
//       return item;
//     });
//     setList(updatedList);
//   }

//   function handleChildChapture(id, e) {
//     const updatedList = list.map((item) => {
//       if (item.id === id) {
//         const newItem = { ...item };
//         newItem.childChapture = e.target.value;
//         return newItem;
//       }
//       return item;
//     });
//     setList(updatedList);
//   }

//   function handleDragStart(e, parentId, childIndex) {
//     e.dataTransfer.setData("parentId", parentId);
//     e.dataTransfer.setData("childIndex", childIndex);
//     e.target.classList.add("dragging");
//   }

//   function handleDragEnd(e) {
//     e.target.classList.remove("dragging");
//   }

//   function handleDragEnter(e) {
//     e.target.classList.add("over");
//   }

//   function handleDragLeave(e) {
//     e.target.classList.remove("over");
//   }

//   function handleDrop(e, targetId) {
//     const draggedParentId = e.dataTransfer.getData("parentId");
//     const draggedChildIndex = e.dataTransfer.getData("childIndex");

//     const updatedList = [...list];
//     const draggedParentIndex = updatedList.findIndex((item) => item.id === draggedParentId);
//     const targetParentIndex = updatedList.findIndex((item) => item.id === targetId);

//     const draggedParent = updatedList[draggedParentIndex];
//     const draggedItem = draggedParent.childrenData[draggedChildIndex];

//     // Remove the dragged item from the previous list
//     draggedParent.childrenData.splice(draggedChildIndex, 1);

//     // Add the dragged item to the new list
//     const targetParent = updatedList[targetParentIndex];
//     targetParent.childrenData.push(draggedItem);

//     setList(updatedList);
//   }

//   function handleDragOver(e) {
//     e.preventDefault();
//   }

//   function handleDeleteList(id) {
//     const updatedList = list.filter((item) => item.id !== id);
//     setList(updatedList);
//   }

//   function handleDeleteChild(parentId, childIndex) {
//     const updatedList = list.map((item) => {
//       if (item.id === parentId) {
//         const newItem = { ...item };
//         newItem.childrenData.splice(childIndex, 1);
//         return newItem;
//       }
//       return item;
//     });
//     setList(updatedList);
//   }

//   function handleEditItem(id) {
//     setSelectedItem(id);
//   }

//   function handleCancelEdit() {
//     setSelectedItem(null);
//   }

//   function handleSaveEdit(id, value) {
//     const updatedList = list.map((item) => {
//       if (item.id === id) {
//         const newItem = { ...item };
//         newItem.title = value;
//         return newItem;
//       }
//       return item;
//     });
//     setList(updatedList);
//     setSelectedItem(null);
//   }

//   function handleOptions(id) {
//     setShowOptions((prevState) => (prevState === id ? null : id));
//   }

//   function handleHideOptions() {
//     setShowOptions(null);
//   }

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (editInputRef.current && !editInputRef.current.contains(e.target)) {
//         handleSaveEdit(selectedItem, editInputRef.current.value);
//       }
//     };

//     if (selectedItem !== null) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [selectedItem]);

//   return (
//     <div className={Style.container}>
//       {list.map((item) => (
//         <div
//           key={item.id}
//           className={Style.item}
//           onDragOver={handleDragOver}
//           onDrop={(e) => handleDrop(e, item.id)}
//           onDragEnter={handleDragEnter}
//           onDragLeave={handleDragLeave}
//         >
//           <div className={Style.cardHeader}>
//             {selectedItem === item.id ? (
//               <input
//                 type="text"
//                 className="editInput"
//                 ref={editInputRef}
//                 defaultValue={item.title}
//                 autoFocus
//               />
//             ) : (
//               <h1>{item.title}</h1>
//             )}
//             <div className="iconContainer">
//               <BsThreeDots
//                 className="deleteIcon"
//                 onClick={() => handleOptions(item.id)}
//               />
//               {showOptions === item.id && (
//                 <div className="popover">
//                   <div className="popoverContent">
//                     <FaEdit className="popoverOption" onClick={() => handleEditItem(item.id)} />
//                     <FaTrashAlt className="popoverOption" onClick={() => handleDeleteList(item.id)} />
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//           <div className="todos">
//             {item.childrenData.map((child, index) => (
//               <div
//                 className={Style.todoitemContainer}
//                 key={index}
//                 draggable
//                 onDragStart={(e) => handleDragStart(e, item.id, index)}
//                 onDragEnd={handleDragEnd}
//               >
//                 {child}
//                 <div className="iconContainer">
//                   <FaEdit className={Style.editIcon} />
//                   <FaTrashAlt className="deleteIcon" onClick={() => handleDeleteChild(item.id, index)} />
//                 </div>
//               </div>
//             ))}
//           </div>
//           <input
//             className={Style.inputTodoAdder}
//             value={item.childChapture}
//             onChange={(e) => handleChildChapture(item.id, e)}
//           />
//           <button className={Style.btn} onClick={() => handleClick(item.id)}>
//             Add Item
//           </button>
//         </div>
//       ))}
//       <div className={Style.itemCard}>
//         {show ? (
//           <div className={Style.todoAdder}>
//             <input
//               className={Style.inputodo}
//               value={chapture}
//               onChange={(e) => setChapture(e.target.value)}
//             />
//             <button className={Style.btn} onClick={handleAdd}>
//               Add Card
//             </button>
//           </div>
//         ) : (
//           <button className={Style.ToAdd} onClick={() => setShow(true)}>
//             <span className={Style.addIcon}>+</span> Add List
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import Style from "./Card.module.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

export default function App() {
  const [chapture, setChapture] = useState("");
  const [show, setShow] = useState(false);
  const [list, setList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showOptions, setShowOptions] = useState(null);
  const editInputRef = useRef(null);

  // Load data from local storage on component mount
  useEffect(() => {
    const savedList = localStorage.getItem("list");
    if (savedList) {
      const parsedList = JSON.parse(savedList);
      console.log(parsedList); // Check if the parsed list is correct
      setList(parsedList);
    }
  }, []);
  // Save data to local storage whenever the list changes
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  function handleAdd() {
    const inputData = {
      id: nanoid(),
      title: chapture,
      childChapture: "",
      childrenData: [],
    };
    setList([...list, inputData]);
    setChapture("");
  }
  function handleClick(id) {
    const updatedList = list.map((item) => {
      if (item.id === id) {
        const newItem = { ...item };
        newItem.childrenData.push(newItem.childChapture);
        newItem.childChapture = "";
        return newItem;
      }
      return item;
    });
    setList(updatedList);
  }

  function handleChildChapture(id, e) {
    const updatedList = list.map((item) => {
      if (item.id === id) {
        const newItem = { ...item };
        newItem.childChapture = e.target.value;
        return newItem;
      }
      return item;
    });
    setList(updatedList);
  }

  function handleDragStart(e, parentId, childIndex) {
    e.dataTransfer.setData("parentId", parentId);
    e.dataTransfer.setData("childIndex", childIndex);
    e.target.classList.add("dragging");
  }

  function handleDragEnd(e) {
    e.target.classList.remove("dragging");
  }

  function handleDragEnter(e) {
    e.target.classList.add("over");
  }

  function handleDragLeave(e) {
    e.target.classList.remove("over");
  }

  function handleDrop(e, targetId) {
    const draggedParentId = e.dataTransfer.getData("parentId");
    const draggedChildIndex = e.dataTransfer.getData("childIndex");

    const updatedList = [...list];
    const draggedParentIndex = updatedList.findIndex((item) => item.id === draggedParentId);
    const targetParentIndex = updatedList.findIndex((item) => item.id === targetId);

    const draggedParent = updatedList[draggedParentIndex];
    const draggedItem = draggedParent.childrenData[draggedChildIndex];

    // Remove the dragged item from the previous list
    draggedParent.childrenData.splice(draggedChildIndex, 1);

    // Add the dragged item to the new list
    const targetParent = updatedList[targetParentIndex];
    targetParent.childrenData.push(draggedItem);

    setList(updatedList);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDeleteList(id) {
    const updatedList = list.filter((item) => item.id !== id);
    setList(updatedList);
  }

  function handleDeleteChild(parentId, childIndex) {
    const updatedList = list.map((item) => {
      if (item.id === parentId) {
        const newItem = { ...item };
        newItem.childrenData.splice(childIndex, 1);
        return newItem;
      }
      return item;
    });
    setList(updatedList);
  }

  function handleEditItem(id) {
    setSelectedItem(id);
  }

  function handleCancelEdit() {
    setSelectedItem(null);
  }

  function handleSaveEdit(id, value) {
    const updatedList = list.map((item) => {
      if (item.id === id) {
        const newItem = { ...item };
        newItem.title = value;
        return newItem;
      }
      return item;
    });
    setList(updatedList);
    setSelectedItem(null);
  }

  function handleOptions(id) {
    setShowOptions((prevState) => (prevState === id ? null : id));
  }

  function handleHideOptions() {
    setShowOptions(null);
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (editInputRef.current && !editInputRef.current.contains(e.target)) {
        handleSaveEdit(selectedItem, editInputRef.current.value);
      }
    };

    if (selectedItem !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedItem]);

  return (
    <div className={Style.container}>
      {list.map((item) => (
        <div
          key={item.id}
          className={Style.item}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, item.id)}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        >
          <div className={Style.cardHeader}>
            {selectedItem === item.id ? (
              <input
                type="text"
                className="editInput"
                ref={editInputRef}
                defaultValue={item.title}
                autoFocus
              />
            ) : (
              <h1>{item.title}</h1>
            )}
            <div className="iconContainer">
              <BsThreeDots
                className="deleteIcon"
                onClick={() => handleOptions(item.id)}
              />
              {showOptions === item.id && (
                <div className="popover">
                  <div className="popoverContent">
                    <FaEdit className="popoverOption" onClick={() => handleEditItem(item.id)} />
                    <FaTrashAlt className="popoverOption" onClick={() => handleDeleteList(item.id)} />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="todos">
            {item.childrenData.map((child, index) => (
              <div
                className={Style.todoitemContainer}
                key={index}
                draggable
                onDragStart={(e) => handleDragStart(e, item.id, index)}
                onDragEnd={handleDragEnd}
              >
                {child}
                <div className="iconContainer">
                  <FaEdit className={Style.editIcon} />
                  <FaTrashAlt className="deleteIcon" onClick={() => handleDeleteChild(item.id, index)} />
                </div>
              </div>
            ))}
          </div>
          <input
            className={Style.inputTodoAdder}
            value={item.childChapture}
            onChange={(e) => handleChildChapture(item.id, e)}
          />
          <button className={Style.btn} onClick={() => handleClick(item.id)}>
            Add Item
          </button>
        </div>
      ))}
      <div className={Style.itemCard}>
        {show ? (
          <div className={Style.todoAdder}>
            <input
              className={Style.inputodo}
              value={chapture}
              onChange={(e) => setChapture(e.target.value)}
            />
            <button className={Style.btn} onClick={handleAdd}>
              Add Card
            </button>
          </div>
        ) : (
          <button className={Style.ToAdd} onClick={() => setShow(true)}>
            <span className={Style.addIcon}>+</span> Add List
          </button>
        )}
      </div>
    </div>
  );
}


