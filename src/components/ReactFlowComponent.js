import React, { useEffect, useCallback } from 'react';
import ReactFlow, {
    addEdge,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
} from 'reactflow';
import { useDispatch, useSelector } from 'react-redux';
import { saveNodesAction } from '../redux/actions';

import { Box } from '@mui/material';

import 'reactflow/dist/style.css';
import './../assets/css/overview.css';

import { nodes as initialNodes, edges as initialEdges } from '../mock/initialElements';
import CustomNode from './CustomNode';

// ------------------------------------------------------------------------------------

const nodeTypes = {
    custom: CustomNode,
};

const minimapStyle = {
    height: 120,
};

const onInit = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);

const OverviewFlow = () => {
    const dispatch = useDispatch();
    const nodesStore = useSelector((store) => store.nodes);
    const edgesStore = useSelector((store) => store.edges);

    const [nodes, setNodes, onNodesChange] = useNodesState(nodesStore || []);
    const [edges, setEdges, onEdgesChange] = useEdgesState(edgesStore || []);
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

    // we are using a bit of a shortcut here to adjust the edge type
    // this could also be done with a custom edge for example
    const edgesWithUpdatedTypes = edges.map((edge) => {
        if (edge.sourceHandle) {
            const edgeType = nodes.find((node) => node.type === 'custom').data.selects[edge.sourceHandle];
            edge.type = edgeType;
        }

        return edge;
    });

    const onNodeChange = (node) => {
        onNodesChange(node);
        dispatch(saveNodesAction(nodes));
    };


    useEffect(() => {
        setNodes(nodesStore)
    }, [nodesStore])


    return (
        <Box sx={{
            width: '100%',
            height: '100%',
        }}>
            <ReactFlow
                nodes={nodes}
                edges={edgesWithUpdatedTypes}
                onNodesChange={onNodeChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={onInit}
                fitView
                attributionPosition="top-right"
                nodeTypes={nodeTypes}
            >
                <MiniMap style={minimapStyle} zoomable pannable />
                <Controls />
                <Background color="#aaa" gap={16} />
            </ReactFlow>
        </Box>
    );
};

export default OverviewFlow;
