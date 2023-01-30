export const SAVENODES = 'SAVENODES';
export const SAVEEDGES = 'SAVEEDGES';

export const SAVEONEEDGE = 'SAVEONEEDGE';
export const SAVEONENODE = 'SAVEONENODE';

// --------------------------------------------

export const saveOneNodeAction = (node) => {
    return {
        type: SAVEONENODE,
        payload: node
    }
}

export const saveNodesAction = (nodes) => {
    return {
        type: SAVENODES,
        payload: nodes
    }
}

// --------------------------------------------

export const saveOneEdgeAction = (edges) => {
    return {
        type: SAVEEDGES,
        payload: edges
    }
}

export const saveEdgesAction = (edges) => {
    return {
        type: SAVEEDGES,
        payload: edges
    }
}