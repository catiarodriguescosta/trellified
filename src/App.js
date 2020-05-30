import React, {useState} from 'react';
import Navbar from './components/Navbar';
import './App.css';
import styled from 'styled-components';

import NewBoardForm from './components/NewBoard';
import DragNDrop from './components/DragNDrop';

const ButtonsGroup= styled.div`
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


function App() {

  const initial = { 
    boards: [
      {name: "My first board", lists: 
        [
          {name:"List 1", tasks: 
              []
          },
        ]
      },
    ]
  };

  let data = {};
  if ( !localStorage.getItem('data') ) {
    data = {...initial};
    window.localStorage.setItem("data", JSON.stringify(initial) );
  }
  else {
    data = JSON.parse(window.localStorage.getItem("data"));
  }
  
  const [BoardFormVisible, setBoardFormVisible] = useState(false);

  const addBoard = text => { 
      let retrievedObject = JSON.parse(window.localStorage.getItem("data"));
      retrievedObject.boards.unshift(
          { name: text, lists: [
                  {name:"List 1", tasks: 
                      []
                  },  
              ] 
          }
      );

      window.localStorage.setItem("data", JSON.stringify(retrievedObject) );
      setBoardFormVisible(false);
      window.location.reload(false);
      
  };

  const onAddBoard = event => {
      setBoardFormVisible(true);
  };



  return (
    <div className="App">
      <Navbar/>
      <div className="o-container">
        

        { BoardFormVisible 
          ? <NewBoardForm addBoard={addBoard}/>
          : <ButtonsGroup>
              <GeneralButton onClick={onAddBoard}>Add new board</GeneralButton>   
              <GeneralButton >Export Data</GeneralButton>
              <GeneralButton >Import Data</GeneralButton>
            </ButtonsGroup>
        }


        <DragNDrop data={data} />

      </div>
    </div>
  );
}

export default App;
