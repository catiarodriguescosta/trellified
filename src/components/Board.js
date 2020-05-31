import React, {useState, useContext} from 'react';
import styled from 'styled-components';
import NewListForm from './NewList';
import { DataContext } from "../context/data-context";

const BoardSection= styled.section`
    margin-bottom: 100px;
`
const BoardHeader= styled.div`
    display: flex;
    align-items: center;
`

const BoardTitle = styled.h1`
    font-family: var(--secondary-font);
    font-weight: 700;
    font-size: 30px;
    
`
const AddNewListButton = styled.button`
    border: 1px solid var(--secondary-colour);
    color: var(--secondary-colour);
    font-size: 14px;
    margin: 10px 20px;
    :hover {
        background: var(--secondary-colour);
        color: white;
    }
`

const BoardArea =styled.div`
    display: flex;
    flex-direction: row;
    overflow-y: scroll; 
`


const Board = (props) => {

    const [dataList, setDataList] = useContext(DataContext);

    const addList = text => {
        
        const board= props.board;           
        setDataList( oldList => {
            let newList = JSON.parse(JSON.stringify(oldList));
            newList.boards[board].lists.push({ name: text, tasks: [] });
            window.localStorage.setItem("data", JSON.stringify(newList) );
            return newList;
        })
        setListFormVisible(false);

    };

    const [listFormVisible, setListFormVisible] = useState(false); 

    const onAddList = event => {
        setListFormVisible(true);
    };
    

    return(
        <BoardSection>
            <BoardHeader>
                <BoardTitle>
                    {props.title}
                </BoardTitle>
                { listFormVisible 
                    ? <NewListForm addList={addList}/>
                    : <AddNewListButton onClick={onAddList}>Add new list</AddNewListButton>
                }
            </BoardHeader>
            <BoardArea>
                {props.children}
            </BoardArea>
        </BoardSection>
    )
};

export default Board;