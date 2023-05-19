import React, { useState, useEffect, useCallback, useMemo } from 'react'
import ReactFlow, {
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow'

import NodeModal from "../NodeModal/NodeModal"
import BaseNode from "../BaseNode/BaseNode"

const initialNodes = (employees = []) => [
  {
    id: '1',
    position: { x: 0, y: 0 },
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
  const [nodes, setNodes, onNodesChange] = useNodesState(data.organization.strucure?.nodes || initialNodes(data.users))
  const [edges, setEdges, onEdgesChange] =
    useEdgesState(data.organization.strucure?.edges || [])

  const [name, setName] = useState(data.organization.name)
  const [description, setDescription] = useState(data.organization.description)
  const [users, setUsers] = useState(data.users)
  const [selectedNode, setSelectedNode] = useState(nodes[0])

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onNodeClick = (_, node) => selectedNode?.id === node.id ? setSelectedNode(null) : setSelectedNode(node)

  const nodeTypes = useMemo(() => ({
    base: BaseNode,
  }), []);

  useEffect(() => {
    if (selectedNode) {
      setNodes((nds) =>
        nds.map((node) => {
          if (selectedNode?.id === node.id) {
            node.data = { ...selectedNode.data }
          }
          return node
        })
      )
    }
  }, [selectedNode])

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
      </ReactFlow>
    </div>
  )
}

const FlowWithProvider = ({data}) =>
  <ReactFlowProvider>
    <Flow data={data} />
  </ReactFlowProvider>

export default FlowWithProvider