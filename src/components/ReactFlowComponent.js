import React, { useEffect, useCallback, useRef, useState } from 'react';
import ReactFlow, {
    addEdge,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    ReactFlowProvider,
} from 'reactflow';
import { useDispatch, useSelector } from 'react-redux';
import { saveNodesAction, saveEdgesAction } from '../redux/actions';

import { Box } from '@mui/material';

import 'reactflow/dist/style.css';
import './../assets/css/overview.css';

import { nodes as initialNodes, edges as initialEdges } from '../mock/initialElements';
import CustomNode from './CustomNode';
import MenuComponent from './MenuComponent'

// ------------------------------------------------------------------------------------

const nodeTypes = {
    custom: CustomNode,
};

const minimapStyle = {
    height: 120,
};

const OverviewFlow = () => {
    const dispatch = useDispatch();
    const nodesStore = useSelector((store) => store.nodes);
    const edgesStore = useSelector((store) => store.edges);

    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(nodesStore || []);
    const [edges, setEdges, onEdgesChange] = useEdgesState(edgesStore || []);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

    const edgesWithUpdatedTypes = edges.map((edge) => {
        if (edge.sourceHandle) {
            const edgeType = nodes.find((node) => node.type === 'custom').data.selects[edge.sourceHandle];
            edge.type = edgeType;
        }

        return edge;
    });

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            let nodeData = event.dataTransfer.getData('application/reactflow');

            if (!nodeData) return;

            const { id, title } = JSON.parse(nodeData);

            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });
            const newNode = {
                id,
                type: 'default',
                position,
                data: { label: title },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance]);

    useEffect(() => {
        setNodes(nodesStore)
    }, [nodesStore])

    useEffect(() => {
        setEdges(edgesStore)
    }, [edgesStore])


    return (
        <Box sx={{
            width: '100%',
            height: '100vh',
            pl: '375px'
        }}>
            <ReactFlowProvider>
                <Box sx={{ width: '100%', height: '100%' }} ref={reactFlowWrapper}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edgesWithUpdatedTypes}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onInit={setReactFlowInstance}
                        fitView
                        attributionPosition="top-right"
                        nodeTypes={nodeTypes}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                    >
                        <MiniMap style={minimapStyle} zoomable pannable />
                        <Controls />
                        <Background color="#aaa" gap={16} />
                    </ReactFlow>
                </Box>
                <MenuComponent />
            </ReactFlowProvider>
        </Box>
    );
};

export default OverviewFlow;
