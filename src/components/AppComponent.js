import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Box, Grid } from '@mui/material'

import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
} from 'reactflow';

import ReactFlowComponent from './ReactFlowComponent'
import MenuComponent from './MenuComponent'

const AppComponent = () => {

  const nodesStore = useSelector((store) => store.nodes);
  const edgesStore = useSelector((store) => store.edges);

  return (
    <Box>
      <Grid container >
        <Grid item xs={4} sx={{
          height: '100vh',
          overflowY: 'scroll',
          overflowX: 'hidden',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}>
          <MenuComponent />
        </Grid>
        <Grid item xs={8}>
          <ReactFlowComponent />
        </Grid>
      </Grid>
    </Box>
  )
}

export default AppComponent