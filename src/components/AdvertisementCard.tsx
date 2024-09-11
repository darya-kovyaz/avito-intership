import React from "react";
import { useNavigate } from "react-router-dom";
import { Advertisement } from "../types";
import { Card, CardContent, CardMedia, Typography, Box, Button } from "@mui/material";
import { CurrencyRuble, Visibility, Favorite } from "@mui/icons-material";

interface IAdvertisementCard {
    advertisement: Advertisement;
}

const AdvertisementCard: React.FC<IAdvertisementCard> = ({ advertisement }) => {
    const navigate = useNavigate();

    const navigateToAdvertisement = () => {
        navigate(`/advertisements/${advertisement.id}`);
    };

    const navigateToOrders = () => {
        navigate(`/orders?advertisementId=${advertisement.id}`);
    };

    return (
        <Card sx={{ cursor: "pointer" }}>
            <CardMedia
                onClick={navigateToAdvertisement}
                component="img"
                sx={{ height: "300px", width: "300px" }}
                alt={advertisement.name}
                image={advertisement.imageUrl}
            />
            <CardContent>
                <Typography variant="h6">{advertisement.name}</Typography>
                <Typography variant="subtitle1" sx={{ display: "flex", alignItems: "center" }}>
                    {advertisement.price.toLocaleString("ru-RU")}
                    <CurrencyRuble fontSize="small" />
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="subtitle2" sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        {advertisement.views.toLocaleString("ru-RU")}
                        <Visibility fontSize="small" />
                    </Typography>
                    <Typography variant="subtitle2" sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        {advertisement.likes.toLocaleString("ru-RU")}
                        <Favorite fontSize="small" />
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={navigateToOrders}
                        sx={{ width: "150px", mt: "10px" }}
                    >
                        Заказы
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default AdvertisementCard;
