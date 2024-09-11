import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Advertisement } from "../types";
import { Box, Typography, Card, CardMedia, CardContent, CardHeader, Button } from "@mui/material";
import { CurrencyRuble, Favorite, Visibility } from "@mui/icons-material";
import EditModal from "../components/EditModal";

const AdvertisementItem: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [advertisement, setAdvertisement] = useState<Advertisement | null>(null);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        imageUrl: "",
    });

    const fetchAdvertisement = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:8000/advertisements/${id}`);
            const data = await response.json();
            setAdvertisement(data);
            setFormData({
                name: data.name,
                price: data.price.toString(),
                description: data.description,
                imageUrl: data.imageUrl,
            });
        } catch (error) {
            console.error("Ошибка при загрузке объявления:", error);
        }
    }, [id]);

    useEffect(() => {
        fetchAdvertisement();
    }, [fetchAdvertisement]);

    if (!advertisement) {
        return <Typography sx={{ display: "flex", justifyContent: "center" }}>Загрузка...</Typography>;
    }

    const toggleDescription = () => setIsDescriptionExpanded(!isDescriptionExpanded);

    const handleOpenEditModal = () => setIsEditModalOpen(true);

    const handleCloseEditModal = () => setIsEditModalOpen(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSaveChanges = async () => {
        setIsSaving(true);
        try {
            const response = await fetch(`http://localhost:8000/advertisements/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    price: Number(formData.price),
                    description: formData.description,
                    imageUrl: formData.imageUrl,
                }),
            });

            if (!response.ok) {
                throw new Error("Ошибка при сохранении");
            }

            const updatedAd = await response.json();
            setAdvertisement(updatedAd);
            handleCloseEditModal();
        } catch (error) {
            console.error("Ошибка при сохранении:", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
            <Card sx={{ width: 400 }}>
                <CardHeader title={advertisement.name} />
                <CardMedia
                    component="img"
                    sx={{ height: 400 }}
                    image={advertisement.imageUrl}
                    alt={advertisement.name}
                />
                <CardContent>
                    <Typography variant="h5" sx={{ display: "flex", alignItems: "center" }}>
                        {advertisement.price.toLocaleString("ru-RU")} <CurrencyRuble fontSize="small" />
                    </Typography>
                    <Box>
                        <Box
                            sx={{
                                maxHeight: isDescriptionExpanded ? "none" : 100,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            <Typography variant="body1" color="text.secondary">
                                {advertisement.description || "Описание отсутствует"}
                            </Typography>
                        </Box>

                        {advertisement.description && advertisement.description.length > 100 && (
                            <Button onClick={toggleDescription}>
                                {isDescriptionExpanded ? "Свернуть описание" : "Развернуть описание"}
                            </Button>
                        )}
                    </Box>
                    <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="body1" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            {advertisement.views.toLocaleString("ru-RU")}
                            <Visibility fontSize="small" />
                        </Typography>
                        <Typography variant="body1" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            {advertisement.likes.toLocaleString("ru-RU")}
                            <Favorite fontSize="small" />
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                        <Button variant="contained" color="primary" onClick={handleOpenEditModal} sx={{ width: 150 }}>
                            Редактировать
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            <EditModal
                formData={formData}
                isSaving={isSaving}
                isOpen={isEditModalOpen}
                onClose={handleCloseEditModal}
                onInputChange={handleInputChange}
                onSave={handleSaveChanges}
            />
        </Box>
    );
};

export default AdvertisementItem;
