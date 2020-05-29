import React, { useState } from 'react';
import styled from 'styled-components';


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
    <form onSubmit={handleSubmit}>
      <input type="text" style={{fontSize: "18px", width: "auto", border: "0", padding: "10px 5px" , marginRight: "20px"}}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <SubmitButton type="submit">Create</SubmitButton>
    </form>
  );

}

export default NewBoard;
