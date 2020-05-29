import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  margin: 0 20px;
`

const SubmitButton = styled.button`
    border: 1px solid var(--quaternary-colour);
    background: var(--quaternary-colour);
    color: white;
    text-transforn: uppercase;
    font-size: 14px;
    margin: 0 10px;

    :hover {
      color: var(--quaternary-colour);
      background: white;
    }
`

const NewList = ({addList}) => {

  const [value, setValue] = useState("");

   const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addList(value);
    setValue("");
  }; 

  return (
    <Form onSubmit={handleSubmit}>
      <input type="text" style={{fontSize: "14px", width: "auto", border: "0", padding: "0px 10px", border: "1px solid var(--primary-colour)" }}
        value={value}
        onChange={e => setValue(e.target.value)}
      /><br />
      <SubmitButton type="submit">Create List</SubmitButton>
    </Form>
  );

}

export default NewList;
