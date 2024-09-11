import React from "react";

import { Card, CardContent, Typography, Button } from "@mui/material";
import { Order, OrderStatus } from "../types";

interface IOrderCard {
    order: Order;
    onShowItems: (order: Order) => void;
    onCompleteOrder: (orderId: string) => void;
}

const OrderCard: React.FC<IOrderCard> = ({ order, onShowItems, onCompleteOrder }) => {
    const getStatusLabel = (status: number) => {
        switch (status) {
            case OrderStatus.Created:
                return "Создан";
            case OrderStatus.Paid:
                return "Оплачен";
            case OrderStatus.Transport:
                return "В пути";
            case OrderStatus.DeliveredToThePoint:
                return "Доставлен в пункт";
            case OrderStatus.Received:
                return "Получен";
            case OrderStatus.Archived:
                return "Архивирован";
            case OrderStatus.Refund:
                return "Возврат";
            default:
                return "Неизвестен";
        }
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h6">Заказ №{order.id}</Typography>
                <Typography variant="body1">Количество товаров: {order.items.length}</Typography>
                <Typography variant="body1">Стоимость: {order.total.toLocaleString("ru-RU")} ₽</Typography>
                <Typography variant="body1">
                    Дата создания: {new Date(order.createdAt).toLocaleDateString("ru-RU")}
                </Typography>
                <Typography variant="body1">Статус: {getStatusLabel(order.status)}</Typography>
                <Button variant="outlined" onClick={() => onShowItems(order)} sx={{ mt: 1 }}>
                    Показать все товары
                </Button>
                {order.status !== OrderStatus.Archived && (
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => onCompleteOrder(order.id)}
                        sx={{ mt: 1, ml: 2 }}
                    >
                        Завершить заказ
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};

export default OrderCard;
