import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveOneNodeAction } from '../redux/actions';

import { Box, Stack, Typography, Avatar, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import dataPanel from '../mock/dataPanel';
import ModalEditMenuOption from './ModalEditMenuOption';

export const MenuComponent = () => {
    const dispatch = useDispatch();
    const nodesStore = useSelector((store) => store.nodes);
    const [menuOptions, setMenuOptions] = useState(dataPanel);

    const [openEditModal, setOpenEditModal] = useState(false)
    const [optionToEdit, setOptionToEdit] = useState(null)

    const handleAddNode = (option) => {

        //--- Verificar si el noto ya existe ---//
        const isAlreadyAdded = nodesStore.find((node) => node.id === `node-${option.id}`);
        if (isAlreadyAdded) return;

        //--- Obtener una posicion "disponible" ---//
        const getAvailablePosition = () => {
            const lastNode = nodesStore[nodesStore.length - 1]
            const lastNodePosition = lastNode ? lastNode.position : { x: 0, y: 0 }
            return {
                x: lastNodePosition.x + 50,
                y: lastNodePosition.y + 70,
            }
        }

        const node = {
            id: `node-${option.id}`,
            data: { label: option.title },
            position: getAvailablePosition(),
        }
        dispatch(saveOneNodeAction(node))
    }

    const handleEditOptionMenu = (option) => {
        setOptionToEdit(option)
        setOpenEditModal(true)
    }

    const onCloseModal = () => {
        setOpenEditModal(false)
        setOptionToEdit(null)
    }

    useEffect(() => {
        const ordenedDataPanel = dataPanel.sort((a, b) => a.title - b.title)
        setMenuOptions(ordenedDataPanel)
    }, [])

    return (
        <Box sx={{
            p: 2,
            pb: 5,
            width: '100%',
            color: 'white',
            height: '100%',
            borderRight: 1,
            borderColor: 'divider',
            background: 'linear-gradient(-60deg, #0061bf, #38b6f4)',
        }}>
            <Typography
                variant="h5"
                sx={{
                    pb: 1,
                    mb: 3,
                    fontWeight: 'bold',
                    borderBottom: '3px solid #fff'
                }}>
                Options
            </Typography>

            <Stack direction="column" spacing={2}>
                {menuOptions.map((option, index) => (
                    <Stack key={index}
                        pb={2}
                        spacing={2}
                        direction="row"
                        alignItems="center"
                        justifyContent='space-between'
                        style={{ borderBottom: '1px solid rgb(255 255 255 / 0.30)' }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Avatar
                                sx={{
                                    width: 45,
                                    height: 45,
                                    bgcolor: '#fff',
                                    color: '#38a0f4',
                                    fontWeight: 'bold',
                                    fontSize: '1.7rem',
                                }}
                            >
                                {option.type ? option.type[0].toUpperCase() : 'N'}
                            </Avatar>
                            <Box >

                                <Typography
                                    variant="h5"
                                    sx={{ cursor: 'pointer', fontWeight: 'bold' }}
                                    onClick={() => handleEditOptionMenu(option)}
                                >
                                    {option.title}
                                    {option.type && (
                                        <Typography
                                            variant="body1"
                                            component="span"
                                            sx={{
                                                fontSize: '0.9rem',
                                                opacity: 0.5,
                                            }}
                                        >
                                            {' | ' + option.type[0].toUpperCase() + option.type.slice(1)}
                                        </Typography>
                                    )}
                                </Typography>

                                <Typography variant="body1">
                                    {option.subtitle}
                                </Typography>

                            </Box>
                        </Stack>
                        <IconButton
                            size="small"
                            onClick={() => handleAddNode(option)}
                            sx={{
                                color: '#fff',
                                bgcolor: 'rgb(255 255 255 / 0.37)',
                                '&:hover': {
                                    bgcolor: '#004896',
                                }
                            }}
                        >
                            <Add />
                        </IconButton>
                    </Stack>
                ))}
            </Stack>

            <ModalEditMenuOption
                open={openEditModal}
                setOpen={setOpenEditModal}
                option={optionToEdit}
                menuOptions={menuOptions}
                setMenuOptions={setMenuOptions}
                onCloseModal={onCloseModal}
            />
        </Box >
    )
}

export default MenuComponent
