import React from "react";
import { Box, Typography, Button, Modal, Link } from "@mui/material";
import { Order } from "../types";
import { CurrencyRuble } from "@mui/icons-material";

interface IOrderModal {
    isOpen: boolean;
    selectedOrder: Order | null;
    onClose: () => void;
    navigate: (path: string) => void;
}

const OrderModal: React.FC<IOrderModal> = ({ isOpen, selectedOrder, onClose, navigate }) => {
    return (
        <Modal open={isOpen} onClose={onClose} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Box sx={{ width: "500px", bgcolor: "white", p: 4, borderRadius: 1 }}>
                <Typography variant="h6" mb={2}>
                    Товары в заказе
                </Typography>
                {selectedOrder?.items.map((item, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                        <Link component="button" onClick={() => navigate(`/advertisements/${item.id}`)}>
                            {item.name}
                        </Link>
                        <Typography variant="body1" sx={{ display: "flex", alignItems: "center" }}>
                            Количество: {item.count} | Цена: {item.price.toLocaleString("ru-RU")}{" "}
                            <CurrencyRuble fontSize="small" />
                        </Typography>
                    </Box>
                ))}
                <Button onClick={onClose} variant="contained">
                    Закрыть
                </Button>
            </Box>
        </Modal>
    );
};

export default OrderModal;
