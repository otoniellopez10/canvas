import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Box, DialogActions, Button, Grid, TextField } from '@mui/material'

export const ModalEditMenuOption = ({
    open,
    setOpen,
    option,
    menuOptions,
    setMenuOptions,
    onCloseModal,
}) => {
    const [newTitle, setNewTitle] = useState(option?.title || '')
    const [newSubtitle, setNewSubtitle] = useState(option?.subtitle || '')

    const handleSaveOptionMenu = () => {
        if (!newTitle || !newSubtitle) return;

        const newOption = {
            ...option,
            title: newTitle,
            subtitle: newSubtitle,
        }

        const index = menuOptions.findIndex((item) => item.id === newOption.id)
        const newMenuOptions = menuOptions;
        newMenuOptions[index] = newOption;

        setMenuOptions(newMenuOptions)
        setOpen(false)
    }

    useEffect(() => {
        if (!option) return;
        setNewTitle(option.title)
        setNewSubtitle(option.subtitle)
    }, [option])


    return (
        <Dialog open={open} onClose={onCloseModal} fullWidth maxWidth="sm" style={{ borderRadius: 5 }}>
            <DialogTitle>Edit Menu Option</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} my={1}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Title"
                            variant="outlined"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Description"
                            variant="outlined"
                            value={newSubtitle}
                            onChange={(e) => setNewSubtitle(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ px: 3 }}>
                <Button variant="outlined" color="inherit" onClick={() => setOpen(false)}>
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSaveOptionMenu}
                    disabled={!newTitle || !newSubtitle}
                    mr={10}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ModalEditMenuOption

