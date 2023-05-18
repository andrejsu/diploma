import React, { useState, useCallback } from 'react'
import ReactFlow, {
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow'
import NewNodeModal from "../NewNodeModal/NewNodeModal";

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const [selectedNode, setSelectedNode] = useState(null)

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onNodeClick = (_, node) => selectedNode?.id === node.id ? setSelectedNode(null) : setSelectedNode(node)

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <NewNodeModal isOpen={!!selectedNode} close={() => setSelectedNode(null)} />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

const FlowWithProvider = ({data}) =>
  <ReactFlowProvider>
    <Flow />
  </ReactFlowProvider>

export default FlowWithProvider