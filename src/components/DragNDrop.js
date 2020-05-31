import React, {useState, useRef, useContext} from 'react';
import Board from './Board';
import List from './List';
import Task from './Task';

import styled from 'styled-components';
import NewBoardForm from './NewBoard';
import { DataContext } from "../context/data-context";


const ButtonsGroup = styled.div`
    display: flex;
`

const GeneralButton = styled.button`
    border: 1px solid var(--tertiary-colour);
    color: var(--tertiary-colour);
    font-size: 14px;
    margin-right: 20px;
    :hover{
      color: white;
      background: var(--tertiary-colour);
    }
`

function DragNDrop() {

    const [dataList, setDataList] = useContext(DataContext);
    const [dragging, setDragging] = useState(false);
    const dragItem = useRef();
    const dragNode = useRef();

    const handleDragStart = (e, params) =>{
        dragItem.current = params;
        dragNode.current = e.target;
        dragNode.current.addEventListener("dragend", handleDragEnd)
        setDragging(true);
    } 
    const handleDragEnd = () =>{
        setDragging(false);
        dragNode.current.removeEventListener("dragend", handleDragEnd)
        dragItem.current = null;
        dragNode.current = null;
    }
    const handleDragEnter = (e, params) =>{
        const currentItem= dragItem.current;
        if (e.target !== dragNode.current) {
            setDataList( oldList => {
                let newList = JSON.parse(JSON.stringify(oldList));
                newList.boards[params.boardIndex].lists[params.listIndex].tasks.splice(params.taskIndex, 0, newList.boards[currentItem.boardIndex].lists[currentItem.listIndex].tasks.splice(currentItem.taskIndex, 1)[0]);
                dragItem.current = params;
                window.localStorage.setItem("data", JSON.stringify(newList) );
                return newList;
            })
        }

    }

    const [BoardFormVisible, setBoardFormVisible] = useState(false);

    const addBoard = text => { 

        setDataList( oldList => {
            let newList = JSON.parse(JSON.stringify(oldList));
            newList.boards.unshift(
                { name: text, lists: [ {name:"List 1", tasks: []}, ] }
            );
            window.localStorage.setItem("data", JSON.stringify(newList) );
            return newList;
        })

        setBoardFormVisible(false);
    };

    const onAddBoard = event => {
        setBoardFormVisible(true);
    };

    return (
        <>

        { BoardFormVisible 
          ? <NewBoardForm addBoard={addBoard}/>
          : <ButtonsGroup>
              <GeneralButton onClick={onAddBoard}>Add new board</GeneralButton>
            </ButtonsGroup>
        }

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