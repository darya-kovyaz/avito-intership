import React from "react";
import { Box, Button, TextField, Typography, IconButton, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface IAdvertisementFormData {
    name: string;
    price: string;
    description: string;
    imageUrl: string;
}

interface IEditModalProps {
    formData: IAdvertisementFormData;
    isSaving: boolean;
    isOpen: boolean;
    onClose: () => void;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSave: () => void;
}

const EditModal: React.FC<IEditModalProps> = ({ formData, isSaving, isOpen, onClose, onInputChange, onSave }) => {
    return (
        <Modal open={isOpen} onClose={onClose} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Box sx={{ width: 400, bgcolor: "background.paper", p: 4, borderRadius: 2, position: "relative" }}>
                <IconButton aria-label="close" onClick={onClose} sx={{ position: "absolute", right: 8, top: 8 }}>
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" mb={2}>
                    Редактировать объявление
                </Typography>
                <TextField
                    label="Название"
                    name="name"
                    value={formData.name}
                    onChange={onInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Цена"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={onInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Описание"
                    name="description"
                    value={formData.description}
                    onChange={onInputChange}
                    fullWidth
                    multiline
                    rows={3}
                    margin="normal"
                />
                <TextField
                    label="URL картинки"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={onInputChange}
                    fullWidth
                    margin="normal"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onSave}
                    disabled={isSaving}
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    {isSaving ? "Сохранение..." : "Сохранить"}
                </Button>
            </Box>
        </Modal>
    );
};

export default EditModal;
