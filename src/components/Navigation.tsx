import React from "react";
import { Box, ButtonGroup, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navigation: React.FC = () => {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", my: "10px" }}>
            <ButtonGroup>
                <Button component={Link} to="/advertisements">
                    Объявления
                </Button>
                <Button component={Link} to="/orders">
                    Заказы
                </Button>
            </ButtonGroup>
        </Box>
    );
};
export default Navigation;
