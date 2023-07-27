import  React, { useState, useEffect } from 'react'
import "./style.css";

const getLocalData =()=>{
    const list = localStorage.getItem("mytodolist");
    if(list){
        return  JSON.parse(list);
    }
    else{
        return[];
    }
}
export default function Todo(props) {
    console.log("Yes i am calees")
    const [inputData,setInputData]= React.useState("");
    const [items,setItems] = React.useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);
     const addItem = () =>{
        if (!inputData) {
            alert("plz fill the data");
          } 
          else if(toggleButton){
            setItems(items.map((curElem)=>{
                if(curElem.id ==isEditItem){
                    return {...curElem,name:inputData};
                }
                else{
                    return curElem
                }
            }))
            setInputData("");
            setIsEditItem(null);
            setToggleButton(false);
          }
          else{
            const newItem = {
                id:new Date().getTime().toString(),
                name: inputData,
            };
            setItems([...items,newItem]);
           setInputData("");
          }
     }
     const removeItem = (index) => {
        const updatedItems = items.filter((curElem) => {
          return curElem.id !== index;
        });
        setItems(updatedItems);
      };
     const removeAll=()=>{
        setItems([]);
     }

     useEffect(()=>{
        localStorage.setItem("mytodolist",JSON.stringify(items));
     },[items]);
     const editItem=(index)=>{
        const updatedItems = items.find((curElem) => {
            return curElem.id === index;
          });
          setInputData(updatedItems.name);
          setIsEditItem(index);
          setToggleButton(true);
     }
  return (
    <>
    <div className="main-div">
        <div className="child-div">
            <figure>
                <img src="https://i.pinimg.com/originals/1f/3f/4c/1f3f4ce973d946578567f190e2773709.png" alt="" />
                <figcaption>
                <figcaption>Add Your List Here ✌</figcaption>
                </figcaption>
            </figure>
            <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Item"
              className="form-control"
              value={inputData}
              onChange={(event)=>setInputData(event.target.value)}
              />
            {  toggleButton?
              (<i className="far fa-edit add-btn" onClick={addItem}></i>):
                     ( <i className="fa fa-plus add-btn" onClick={addItem}></i>)}
            </div>
            <div className="showItems">
                {items.map((curElem)=>{
                    return(
                        <div className="eachItem" key={curElem.id}>
                        <h3>{curElem.name}</h3>
                        <div className="todo-btn">
                          <i
                            className="far fa-edit add-btn" onClick={()=> editItem(curElem.id)}></i>
                          <i className="far fa-trash-alt add-btn"
                            onClick={()=>{
                                removeItem(curElem.id)
                            }}></i>
                        </div>
                      </div>
                    )
                })}
            </div>

            <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
              >
              <span> CHECK LIST</span>
            </button>
          </div>
        </div>
    </div>
    </>
  );
}
