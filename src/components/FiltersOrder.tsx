import React from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { OrderStatus } from "../types";
import { SelectChangeEvent } from "@mui/material/Select";

interface IFiltersOrder {
    statusFilter: number | "all";
    sortOrder: string;
    setStatusFilter: (filter: number | "all") => void;
    setSortOrder: (order: string) => void;
}

const statusOptions = [
    { value: "all", label: "Все" },
    { value: OrderStatus.Created, label: "Создан" },
    { value: OrderStatus.Paid, label: "Оплачен" },
    { value: OrderStatus.Transport, label: "В пути" },
    { value: OrderStatus.DeliveredToThePoint, label: "Доставлен в пункт" },
    { value: OrderStatus.Received, label: "Получен" },
    { value: OrderStatus.Archived, label: "Архивирован" },
    { value: OrderStatus.Refund, label: "Возврат" },
];

const FiltersOrder: React.FC<IFiltersOrder> = ({ statusFilter, sortOrder, setStatusFilter, setSortOrder }) => {
    const handleStatusFilterChange = (e: SelectChangeEvent<string>) => {
        setStatusFilter(e.target.value === "all" ? "all" : Number(e.target.value));
    };

    const handleSortOrderChange = (e: SelectChangeEvent<string>) => {
        setSortOrder(e.target.value);
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <FormControl sx={{ width: "200px" }}>
                <InputLabel id="status-filter-label">Фильтр по статусу</InputLabel>
                <Select
                    labelId="status-filter-label"
                    value={String(statusFilter)}
                    onChange={handleStatusFilterChange}
                    label="Фильтр по статусу"
                >
                    {statusOptions.map((option) => (
                        <MenuItem key={option.value} value={String(option.value)}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl sx={{ width: "200px" }}>
                <InputLabel id="sort-order-label">Сортировка по цене</InputLabel>
                <Select
                    labelId="sort-order-label"
                    value={sortOrder}
                    onChange={handleSortOrderChange}
                    label="Сортировка по цене"
                >
                    <MenuItem value="asc">По возрастанию</MenuItem>
                    <MenuItem value="desc">По убыванию</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default FiltersOrder;
