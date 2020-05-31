import React from "react";

import { DataContextProvider } from "../context/data-context";
import DragNDrop from "../components/DragNDrop";
 

export default function CounterView() {
  return (
    <DataContextProvider>
      <DragNDrop />
    </DataContextProvider>
  );
}