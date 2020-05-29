import React from 'react';
import styled from 'styled-components';

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
    <TaskContent>
        <Header>
            {props.children}
        </Header>
    </TaskContent>
);

export default task;