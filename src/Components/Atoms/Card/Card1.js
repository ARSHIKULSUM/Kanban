import React, { useState,useRef, useEffect } from "react";
import Style from './Card.module.css';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

export default function App() {
    const [chapture, setChapture] = useState("");
  const [show, setShow] = useState(false);
  const [list, setList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showOptions, setShowOptions] = useState(null);
  const editInputRef = useRef(null);

  function handleAdd() {
    const inputData = { title: chapture, childChapture: "", childrenData: [] };
    setList([...list, inputData]);
    setChapture("");
  }

  function handleClick(i) {
    const updatedList = [...list];
    const childData = updatedList[i].childChapture;
    updatedList[i].childrenData.push(childData);
    setList(updatedList);
    updatedList[i].childChapture = "";
    setList(updatedList);
  }

  function handleChildChapture(i, e) {
    const updatedList = [...list];
    updatedList[i].childChapture = e.target.value;
    setList(updatedList);
  }

  function handleDragStart(e, parentIndex, childIndex) {
    e.dataTransfer.setData("parentIndex", parentIndex.toString());
    e.dataTransfer.setData("childIndex", childIndex.toString());
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

  function handleDrop(e, parentIndex, childIndex) {
    const draggedParentIndex = Number(e.dataTransfer.getData("parentIndex"));
    const draggedChildIndex = Number(e.dataTransfer.getData("childIndex"));
    const updatedList = [...list];
    const draggedItem = updatedList[draggedParentIndex].childrenData[draggedChildIndex];

    updatedList[draggedParentIndex].childrenData.splice(draggedChildIndex, 1);
    updatedList[parentIndex].childrenData.splice(childIndex, 0, draggedItem);

    setList(updatedList);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDeleteList(parentIndex) {
    const updatedList = [...list];
    updatedList.splice(parentIndex, 1);
    setList(updatedList);
  }

  function handleDeleteChild(parentIndex, childIndex) {
    const updatedList = [...list];
    updatedList[parentIndex].childrenData.splice(childIndex, 1);
    setList(updatedList);
  }

  function handleEditItem(i) {
    setSelectedItem(i);
  }

  function handleCancelEdit() {
    setSelectedItem(null);
  }

  function handleSaveEdit(i, value) {
    const updatedList = [...list];
    updatedList[i].title = value;
    setList(updatedList);
    setSelectedItem(null);
  }

  function handleOptions(index) {
    setShowOptions((prevState) => (prevState === index ? null : index));
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
      {list.map((x, i) => (
        <div
          key={i}
          className={Style.item}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, i, 0)}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          draggable
          onDragStart={(e) => handleDragStart(e, i, 0)}
          onDragEnd={handleDragEnd}
        >
            
          <div className={Style.cardHeader}>
          {selectedItem === i ? (
              <input
                type="text"
                className="editInput"
                ref={editInputRef}
                defaultValue={x.title}
                autoFocus
              />
            ) : (
            <h1>{x.title}</h1>
            )}
            <div className="iconContainer">
              <BsThreeDots
                className="deleteIcon"
                onClick={() => handleOptions(i)}
              />
              {showOptions === i && (
                <div className="popover">
                  <div className="popoverContent">
                    <FaEdit className="popoverOption" onClick={() => handleEditItem(i)}/>
                  
                    <FaTrashAlt className="popoverOption" onClick={() => handleDeleteList(i)}/>
                      
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="todos">
            {x.childrenData.map((child, j) => (
              <div
              className={Style.todoitemContainer}
                key={j}
                draggable
                onDragStart={(e) => handleDragStart(e, i, j)}
                onDragEnd={handleDragEnd}
              >
                {child}
                <div className="iconContainer">
                  <FaEdit className={Style.editIcon} />
                  <FaTrashAlt
                    className="deleteIcon"
                    onClick={() => handleDeleteChild(i, j)}
                  />
                </div>
              </div>
            ))}
          </div>
         


          <input
            className={Style.inputTodoAdder}
            value={x.childChapture}
            onChange={(e) => handleChildChapture(i, e)}
          />
          <button className={Style.btn }onClick={() => handleClick(i)}>
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