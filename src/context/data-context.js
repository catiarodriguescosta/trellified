import React, { useState, createContext } from "react";

// Create Context Object
export const DataContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const DataContextProvider = props => {
  
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


  const [dataList, setDataList] = useState(data);

  return (
    <DataContext.Provider value={[dataList, setDataList]}>
      {props.children}
    </DataContext.Provider>
  );
};