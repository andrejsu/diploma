import React from 'react'
import ReactFlow from "./ReactFlow/ReactFlow"
import {EditContext} from "./context"

const App = ({data}) => {
  return (
    <EditContext.Provider value={data.can_edit || false}>
      <ReactFlow data={data} />
    </EditContext.Provider>
  )
}

export default App