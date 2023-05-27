import { Grid } from "@chakra-ui/react";
import { selectAllItems } from "../../../state/items/ItemsSlice";
import { useSelector } from "react-redux";
import { ItemGrid } from "./ItemGrid";
import { CategoryGrid } from "./CategoryGrid";
import * as React from 'react';
import SpinnerWrapper from "../../../components/SpinnerWrapper";

export function AdminItems() {
    const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const items = useSelector(selectAllItems);

    React.useEffect(() =>{
        setIsLoading(items === undefined);
    }, [items]);
    
    return (
        isLoading ? <SpinnerWrapper /> :
            <Grid templateColumns="1fr 1fr" gap={4} justifyItems="center" paddingX="56px">
                <CategoryGrid setSelectedCategories={setSelectedCategories} selectedCategories={selectedCategories} items={items}/>
                <ItemGrid selectedCategories={selectedCategories} items={items} />
            </Grid>
    );
}