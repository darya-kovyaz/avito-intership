import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Box, Button, Grid, Pagination, SelectChangeEvent } from "@mui/material";
import AdvertisementCard from "../components/AdvertisementCard";
import FiltersAdvertisement from "../components/FiltersAdvertisement";
import CreateAdvertisement from "../components/CreateAdvertisement";
import { Advertisement } from "../types";

const AdvertisementsPage: React.FC = () => {
    const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
    const [filteredAdvertisements, setFilteredAdvertisements] = useState<Advertisement[]>([]);
    const [pagination, setPagination] = useState({ page: 1, limit: 10 });
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sortBy, setSortBy] = useState("");

    const fetchAdvertisements = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:8000/advertisements");
            const data = await response.json();
            setAdvertisements(data);
            setFilteredAdvertisements(data);
        } catch (error) {
            console.error("Ошибка загрузки объявлений:", error);
        }
    }, []);

    useEffect(() => {
        fetchAdvertisements();
    }, [fetchAdvertisements]);

    const debounceSearch = useCallback(
        (query: string) => {
            const delayDebounceFn = setTimeout(() => {
                const filtered =
                    query.length >= 3
                        ? advertisements.filter((adv) => adv.name.toLowerCase().includes(query.toLowerCase()))
                        : advertisements;
                setFilteredAdvertisements(filtered);
                setPagination((prev) => ({ ...prev, page: 1 }));
            }, 300);

            return () => clearTimeout(delayDebounceFn);
        },
        [advertisements]
    );

    useEffect(() => {
        debounceSearch(searchQuery);
    }, [searchQuery, debounceSearch]);

    useEffect(() => {
        const sortedAdvertisements = [...filteredAdvertisements].sort((a, b) => {
            switch (sortBy) {
                case "price":
                    return b.price - a.price;
                case "views":
                    return b.views - a.views;
                case "likes":
                    return b.likes - a.likes;
                default:
                    return 0;
            }
        });
        setFilteredAdvertisements(sortedAdvertisements);
    }, [sortBy, filteredAdvertisements]);

    const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => {
        setPagination((prev) => ({ ...prev, page: value }));
    };

    const handleLimitChange = (e: SelectChangeEvent<number>) => {
        setPagination({ page: 1, limit: Number(e.target.value) });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSortChange = (e: SelectChangeEvent<string>) => {
        setSortBy(e.target.value as string);
    };

    const toggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    const handleSaveNewAdvertisement = async (newAdvertisement: {
        imageUrl: string;
        name: string;
        description: string;
        price: number;
    }) => {
        try {
            const response = await fetch("http://localhost:8000/advertisements", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...newAdvertisement, views: 0, likes: 0 }),
            });

            if (!response.ok) throw new Error("Ошибка при создании объявления");

            const createdAdvertisement = await response.json();
            setAdvertisements((prev) => [...prev, createdAdvertisement]);
            setFilteredAdvertisements((prev) => [...prev, createdAdvertisement]);
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error("Произошла неизвестная ошибка");
            }
        }
    };

    const totalPages = useMemo(
        () => Math.ceil(filteredAdvertisements.length / pagination.limit),
        [filteredAdvertisements, pagination.limit]
    );

    const paginatedAdvertisements = useMemo(
        () =>
            filteredAdvertisements.slice((pagination.page - 1) * pagination.limit, pagination.page * pagination.limit),
        [filteredAdvertisements, pagination.page, pagination.limit]
    );

    return (
        <Box>
            <FiltersAdvertisement
                limit={pagination.limit}
                searchQuery={searchQuery}
                onLimitChange={handleLimitChange}
                onSearchChange={handleSearchChange}
                sortBy={sortBy}
                onSortChange={handleSortChange}
            />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Button variant="contained" color="primary" onClick={toggleModal}>
                    Создать новое объявление
                </Button>
            </Box>
            <Grid container spacing={2} sx={{ mt: "10px", display: "flex", justifyContent: "center" }}>
                {paginatedAdvertisements.map((adv) => (
                    <Grid item key={adv.id} sx={{ width: "300px", height: "500px" }}>
                        <AdvertisementCard advertisement={adv} />
                    </Grid>
                ))}
            </Grid>
            <CreateAdvertisement isOpen={isModalOpen} toggleModal={toggleModal} onSave={handleSaveNewAdvertisement} />
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                <Pagination count={totalPages} page={pagination.page} onChange={handlePageChange} color="primary" />
            </Box>
        </Box>
    );
};

export default AdvertisementsPage;
