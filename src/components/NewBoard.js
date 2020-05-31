import React, { useState } from 'react';
import styled from 'styled-components';


const Form = styled.form`
  display: flex;
  margin: 0 0 0 20px;
`

const SubmitButton = styled.button`
    border: 1px solid var(--quaternary-colour);
    background: var(--quaternary-colour);
    color: var(--primary-colour);
    text-transforn: uppercase;
    font-size: 14px;
`

const NewBoard = ({addBoard}) => {

  const [value, setValue] = useState("");

   const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addBoard(value);
    setValue("");
  }; 

  return (
    <Form onSubmit={handleSubmit}>
      <input type="text" style={{fontSize: "14px", width: "auto", padding: "0px 10px", border: "1px solid var(--primary-colour)" }}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <SubmitButton type="submit">Create Board</SubmitButton>
    </Form>
  );

}

export default NewBoard;
