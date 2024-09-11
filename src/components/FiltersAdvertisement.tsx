import React, { useMemo } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";

interface IFiltersAdvertisement {
    limit: number;
    searchQuery: string;
    sortBy: string;
    onLimitChange: (e: SelectChangeEvent<number>) => void;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSortChange: (e: SelectChangeEvent<string>) => void;
}

const FiltersAdvertisement: React.FC<IFiltersAdvertisement> = ({
    limit,
    searchQuery,
    sortBy,
    onLimitChange,
    onSearchChange,
    onSortChange,
}) => {
    const limitOptions = useMemo(
        () => [
            { value: 5, label: "5" },
            { value: 10, label: "10" },
            { value: 15, label: "15" },
        ],
        []
    );

    const sortOptions = useMemo(
        () => [
            { value: "price", label: "По цене" },
            { value: "views", label: "По просмотрам" },
            { value: "likes", label: "По лайкам" },
        ],
        []
    );

    return (
        <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 2 }}>
            <FormControl sx={{ width: 200 }}>
                <InputLabel id="limit-select-label">Объявлений на странице</InputLabel>
                <Select
                    labelId="limit-select-label"
                    value={limit}
                    onChange={onLimitChange}
                    label="Объявлений на странице"
                >
                    {limitOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField label="Поиск по названию" sx={{ width: 300 }} value={searchQuery} onChange={onSearchChange} />

            <FormControl sx={{ width: 200 }}>
                <InputLabel id="sort-select-label">Сортировать по</InputLabel>
                <Select labelId="sort-select-label" value={sortBy} onChange={onSortChange} label="Сортировать по">
                    {sortOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default FiltersAdvertisement;
