import React, { useState } from "react";
import { Modal, Box, Button, TextField, Typography } from "@mui/material";

interface IAdvertisement {
    imageUrl: string;
    name: string;
    description: string;
    price: number;
}

interface ICreateAdvertisement {
    isOpen: boolean;
    toggleModal: () => void;
    onSave: (newAdvertisement: IAdvertisement) => void;
}

const initialFormState: IAdvertisement = {
    imageUrl: "",
    name: "",
    description: "",
    price: 0,
};

const CreateAdvertisement: React.FC<ICreateAdvertisement> = ({ isOpen, toggleModal, onSave }) => {
    const [form, setForm] = useState<IAdvertisement>(initialFormState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: name === "price" ? Number(value) : value,
        }));
    };

    const handleSave = () => {
        if (!form.imageUrl || !form.name || !form.description || form.price <= 0) {
            // Можно добавить обработку ошибок или валидацию.
            alert("Все поля должны быть заполнены корректно");
            return;
        }
        onSave(form);
        toggleModal();
        setForm(initialFormState); // Очищаем форму после сохранения.
    };

    return (
        <Modal open={isOpen} onClose={toggleModal}>
            <Box sx={{ width: "400px", p: 4, bgcolor: "background.paper", margin: "auto", mt: 10, borderRadius: 2 }}>
                <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                    Создать новое объявление
                </Typography>
                <TextField
                    fullWidth
                    label="URL изображения"
                    name="imageUrl"
                    value={form.imageUrl}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Название"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Описание"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Стоимость"
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" color="primary" onClick={handleSave}>
                    Сохранить
                </Button>
            </Box>
        </Modal>
    );
};

export default CreateAdvertisement;
