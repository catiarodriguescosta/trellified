import React from 'react';
import styled from 'styled-components';
import { Draggable } from "react-beautiful-dnd";

const TaskContent = styled.div`
    background: white;
    padding: 5px 10px;
    width: inherit;
    margin-bottom: 15px;
`

const Header = styled.p`
    margin: 0;
    font-weight: 400;
`


const task = (props) => (
    <Draggable draggableId={String(props.id)} index={props.task} >
        {provided => (
            <TaskContent ref={provided.innerRef}  {...provided.draggableProps} {...provided.dragHandleProps}>
                <Header>
                    {props.children}
                </Header>
            </TaskContent>
            )
        }

    </Draggable>
);

export default task;