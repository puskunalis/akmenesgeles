import { Grid } from "@chakra-ui/react";
import { selectItemsStatus } from "../../../state/items/ItemsSlice";
import { useSelector } from "react-redux";
import { ItemGrid } from "./ItemGrid";
import { CategoryGrid } from "./CategoryGrid";
import * as React from 'react';

export interface adminItemsList{

}

export function AdminItems(props: adminItemsList) {
    const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
    
    return (
        <>
            <Grid templateColumns="1fr 1fr" gap={4} justifyItems="center" paddingX="56px">
                <CategoryGrid setSelectedCategories={setSelectedCategories} selectedCategories={selectedCategories}/>
                <ItemGrid selectedCategories={selectedCategories}/>
            </Grid>
        </>
    );
}