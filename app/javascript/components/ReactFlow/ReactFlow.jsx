import React, { useState, useEffect, useCallback, useMemo } from "react"
import ReactFlow, {
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow"
import { ToastContainer } from "react-toastify"
import { save } from "./actions"
import { id } from "../actions"
import * as R from "ramda"

import NodeModal from "../NodeModal/NodeModal"
import BaseNode from "../BaseNode/BaseNode"

const initialNodes = (employees = []) => [
  {
    id: '1',
    position: { x: 200, y: 300 },
    type: 'base',
    data: {
      label: '',
      name: '',
      description: '',
      options: {
        managers: employees,
        subordinates: employees,
      },
      selected: {
        manager: null,
        subordinates: [],
      },
    },
  },
]

const Flow = ({data}) => {
  const [nodes, setNodes, onNodesChange] =
    useNodesState(data.organization.structure?.nodes || initialNodes(data.users))
  const [edges, setEdges, onEdgesChange] =
    useEdgesState(data.organization.structure?.edges || [])

  const [isSending, setIsSending] = useState(false)
  const [selectedNode, setSelectedNode] = useState(null)
  const [structure, setStructure] = useState({nodes, edges})

  useEffect(() => setSelectedNode(nodes.find((node) => node.id == id)), [id])

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  const onNodeClick = (_, node) => selectedNode?.id === node.id ? setSelectedNode(null) : setSelectedNode(node)

  const nodeTypes = useMemo(() => ({
    base: BaseNode,
  }), []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {selectedNode &&
        <NodeModal
          node={selectedNode}
          setNode={setSelectedNode}
          isOpen={!!selectedNode}
          close={() => setSelectedNode(null)}
        />
      }
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
        <ToastContainer />
        <button
          className={'absolute left-0 right-0 mx-auto bottom-6 btn btn-wide z-50'}
          disabled={R.equals(structure.nodes.map(node => node.data), nodes.map(node => node.data))}
          onClick={() => {
            save(isSending, setIsSending, nodes, edges, data, setStructure)
          }}
        >
          Сохранить
        </button>
      </ReactFlow>
    </div>
  )
}

const FlowWithProvider = ({data}) =>
  <ReactFlowProvider>
    <Flow data={data} />
  </ReactFlowProvider>

export default FlowWithProvider