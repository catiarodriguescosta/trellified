import React, { useState } from 'react';
import styled from 'styled-components';
import NewTaskForm from './NewTask';
import { Droppable } from 'react-beautiful-dnd';


const ListContent = styled.div`
    min-width: 300px;
    width: calc(25% - 4px);
    background: #eee;
    border-right: 4px solid white;
    padding: 10px 15px;
    width: inherit;
    min-height: 500px;
`

const Header = styled.h2`
    margin: 0;
    margin-bottom: 10px;
    font-family: var(--secondary-font);
    font-weight: 600;
    color: var(--secondary-colour);
    font-size: 24px;
`

const AddNewTaskButton = styled.button`
    border: 1px solid var(--quinary-colour);
    color: var(--quinary-colour);
    font-size: 14px;

    :hover {
        background: var(--quinary-colour);
        color: white;
    }
`

const List = (props) => {

    const addTask = text => {
        
        const board= props.board;
        const list = props.list;    

        let retrievedObject = JSON.parse(window.localStorage.getItem("data"));
        retrievedObject.boards[board].lists[list].tasks.push({ name: text });
        window.localStorage.setItem("data", JSON.stringify(retrievedObject) );
        setTaskFormVisible(false);
        window.location.reload(false);
        
    };

    const [taskFormVisible, setTaskFormVisible] = useState(false); 

    const onAddTask = event => {
        setTaskFormVisible(true);
    };

    return(
        <Droppable droppableId={ String(props.board+"-"+props.list) }>
            {provided => (
                <ListContent 
                    {...provided.droppableProps} 
                    ref={provided.innerRef}
                >

                    <Header>
                        {props.title}
                    </Header>

                    {props.children}

                    { taskFormVisible 
                        ? <NewTaskForm addTask={addTask}/>
                        : <AddNewTaskButton onClick={onAddTask}>Add new task</AddNewTaskButton>
                    }
                    {provided.placeholder}
                </ListContent>
            )}
            
        </Droppable>
    )
};

export default List;