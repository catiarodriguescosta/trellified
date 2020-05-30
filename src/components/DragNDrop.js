import React, {useState, useRef} from 'react';
import Board from './Board';
import List from './List';
import Task from './Task';

function DragNDrop({data}) {

    const [dataList, setDataList] = useState(data);
    const [dragging, setDragging] = useState(false);
    const dragItem = useRef();
    const dragNode = useRef();

    const handleDragStart = (e, params) =>{
        console.log('drag starting', params);
        dragItem.current = params;
        dragNode.current = e.target;
        dragNode.current.addEventListener("dragend", handleDragEnd)
        setDragging(true);
    } 
    const handleDragEnd = () =>{
        console.log("ending drag");
        setDragging(false);
        dragNode.current.removeEventListener("dragend", handleDragEnd)
        dragItem.current = null;
        dragNode.current = null;
    }
    const handleDragEnter = (e, params) =>{
        console.log("drag enter", params);
        const currentItem= dragItem.current;
        if (e.target !== dragNode.current) {
            console.log("target is not the same");
            setDataList( oldList => {
                let newList = JSON.parse(JSON.stringify(oldList));
                newList.boards[params.boardIndex].lists[params.listIndex].tasks.splice(params.taskIndex, 0, newList.boards[currentItem.boardIndex].lists[currentItem.listIndex].tasks.splice(currentItem.taskIndex, 1)[0]);
                dragItem.current = params;
                window.localStorage.setItem("data", JSON.stringify(newList) );
                return newList;
            })
        }

    }

    return (
        <>
        {
            dataList.boards.map( (board, boardIndex) => {
              return (
                <Board key={boardIndex} title={board.name} board={boardIndex}>
                  { board.lists.map( (list, listIndex) => {
                      return (
                        <div onDragEnter={dragging && !list.tasks.length ? (e)=> handleDragEnter(e, ({boardIndex, listIndex, taskIndex: 0})): null }>
                            <List  key={boardIndex + "-" + listIndex} title= {list.name}  board={boardIndex} list={listIndex}>
                            { list.tasks.map( (task, taskIndex) =>{
                                return (
                                    <div key={boardIndex + "-" + listIndex+ "-" + taskIndex}  draggable onDragStart={(e) => handleDragStart(e, {boardIndex, listIndex, taskIndex} )}  onDragEnter={ dragging ? (e)=>handleDragEnter(e, {boardIndex, listIndex, taskIndex} ) : null}>
                                        <Task  key={boardIndex + "-" + listIndex+ "-" + taskIndex}  board={boardIndex} list={listIndex} task={taskIndex}>
                                        {task.name}
                                        </Task>
                                    </div>
                                )
                                })
                            }
                            </List>
                        </div>
                      )
                    }) 
                  }
                </Board>
              )
            })
        }
        </>
    )
}

export default DragNDrop;