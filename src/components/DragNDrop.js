import React, {useState, useRef} from 'react';
import Board from './Board';
import List from './List';
import Task from './Task';

function DragNDrop({data}) {

    const [dataList, setDataList] = useState(data);
    
    const [dragging, setDragging] = useState(false);
    const dragItem = useRef();
    const dragNode = useRef();

    const [listDragging, setListDragging] = useState(false);
    const dragListItem = useRef();
    const dragListNode = useRef();


    const handleDragStart = (e, params) =>{
        console.log('drag starting', params);
        dragItem.current = params;
        dragNode.current = e.target;
        dragNode.current.addEventListener("dragend", handleDragEnd)
        setDragging(true);
        setListDragging(false);
    } 
    const handleDragEnd = () =>{
        console.log("ending drag");
        setDragging(false);
        setListDragging(false);
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

    const handleListDragStart = (e, params) =>{
        console.log('drag starting', params);
        dragListItem.current = params;
        dragListNode.current = e.target;
        dragListNode.current.addEventListener("dragend", handleListDragEnd)
        setDragging(false);
        setListDragging(true);
    } 
    const handleListDragEnd = () =>{
        console.log("ending drag");
        setListDragging(false);
        setDragging(false);
        dragListNode.current.removeEventListener("dragend", handleListDragEnd)
        dragListItem.current = null;
        dragListNode.current = null;
    }

    const handleListDragEnter = (e, params) =>{
        console.log("drag enter", params);
        const currentItem= dragListItem.current;
        if (e.target !== dragListNode.current) {
            console.log("target is not the same");
            setDataList( oldList => {
                let newList = JSON.parse(JSON.stringify(oldList));
                newList.boards[params.boardIndex].lists.splice(params.listIndex, 0, newList.boards[currentItem.boardIndex].lists.splice(currentItem.listIndex, 1)[0]);
                dragListItem.current = params;
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
                <div onDragEnter={!dragging && listDragging && !board.lists.length && !board.lists.tasks.length ? (e)=> handleListDragEnter(e, {boardIndex, listIndex: 0, taskIndex: 0}): null } >
                    <Board key={boardIndex} title={board.name} board={boardIndex}>
                    { board.lists.map( (list, listIndex) => {
                        return (
                            <div onDragEnter={dragging && !listDragging && !list.tasks.length ? (e)=> handleDragEnter(e, {boardIndex, listIndex, taskIndex:0}): null }   draggable onDragStart={(e) => handleListDragStart(e, {boardIndex, listIndex } )}  onDragEnter={ listDragging ? (e)=>handleListDragEnter(e, {boardIndex, listIndex} ) : null}>
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
                </div>
              )
            })
        }
        </>
    )
}

export default DragNDrop;