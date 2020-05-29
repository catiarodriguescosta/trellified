import React, { useState } from 'react';
import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';


const SubmitButton = styled.button`
    border: 1px solid var(--quaternary-colour);
    background: var(--quaternary-colour);
    color: white;
    text-transforn: uppercase;
    font-size: 14px;
`

const NewTask = ({addTask}) => {

  const [value, setValue] = useState("");

   const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTask(value);
    setValue("");
  }; 

  return (
    <form onSubmit={handleSubmit}>
      <TextareaAutosize style={{fontSize: "18px", width: "-webkit-fill-available", border: "0", padding: "5px 10px", border: "1px solid var(--quaternary-colour)" }}
        value={value}
        onChange={e => setValue(e.target.value)}
      /><br />
      <SubmitButton type="submit">Create Task</SubmitButton>
    </form>
  );

}

export default NewTask;
