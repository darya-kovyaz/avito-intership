import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Box, Grid, Pagination } from "@mui/material";
import { Order, OrderStatus, OrderItem } from "../types";
import { useNavigate } from "react-router-dom";
import FiltersOrder from "../components/FiltersOrder";
import OrderCard from "../components/OrderCard";
import OrderModal from "../components/OrderModal";

const OrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
    const [statusFilter, setStatusFilter] = useState<number | "all">("all");
    const [sortOrder, setSortOrder] = useState<string>("desc");
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [ordersPerPage] = useState<number>(5);

    const navigate = useNavigate();

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const advertisementId = params.get("advertisementId");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch("http://localhost:8000/orders");
                const data = await response.json();
                setOrders(data);
                setFilteredOrders(data);
            } catch (error) {
                console.error("Ошибка загрузки заказов:", error);
            }
        };
        fetchOrders();
    }, []);

    useEffect(() => {
        let filtered = [...orders];

        if (advertisementId) {
            filtered = filtered.filter((order) => order.items.some((item: OrderItem) => item.id === advertisementId));
        }

        if (statusFilter !== "all") {
            filtered = filtered.filter((order) => order.status === statusFilter);
        }
        filtered = filtered.sort((a, b) => (sortOrder === "asc" ? a.total - b.total : b.total - a.total));
        setFilteredOrders(filtered);
    }, [statusFilter, sortOrder, orders, advertisementId]);

    const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    const handleShowItems = (order: Order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const handleCompleteOrder = (orderId: string) => {
        const updatedOrders = orders.map((order) =>
            order.id === orderId ? { ...order, status: OrderStatus.Archived } : order
        );
        setOrders(updatedOrders);
    };

    return (
        <Box sx={{ p: 3 }}>
            <FiltersOrder
                statusFilter={statusFilter}
                sortOrder={sortOrder}
                setStatusFilter={setStatusFilter}
                setSortOrder={setSortOrder}
            />
            <Grid container spacing={3}>
                {currentOrders.map((order) => (
                    <Grid item xs={12} md={6} key={order.id}>
                        <OrderCard order={order} onShowItems={handleShowItems} onCompleteOrder={handleCompleteOrder} />
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <Pagination
                    count={Math.ceil(filteredOrders.length / ordersPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
            <OrderModal
                isOpen={isModalOpen}
                selectedOrder={selectedOrder}
                onClose={() => setIsModalOpen(false)}
                navigate={navigate}
            />
        </Box>
    );
};

export default OrdersPage;
