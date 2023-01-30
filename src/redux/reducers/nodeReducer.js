import { SAVEONENODE, SAVENODES, SAVEONEEDGE, SAVEEDGES } from '../actions'

const defaultData = {
    nodes: [],
    edges: [],
}

const dataReducer = (store = defaultData, action) => {
    !store && (store = defaultData);

    switch (action.type) {
        case SAVEONENODE:
            return {
                ...store,
                nodes: [...store.nodes, action.payload]
            }
        case SAVENODES:
            return {
                ...store,
                nodes: action.payload
            }

        // -----------------------------------------------

        case SAVEONEEDGE:
            return {
                ...store,
                edges: [...store.edges, action.payload]
            }
        case SAVEEDGES:
            return {
                ...store,
                edges: action.payload
            }
        default:
            return store
    }
}

export default dataReducer