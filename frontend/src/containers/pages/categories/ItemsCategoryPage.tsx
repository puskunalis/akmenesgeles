import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchItemsByCategoryId, selectCategoryItems } from "../../../state/items/ItemsSlice";
import { store } from "../../../state/store";
import { Flex, Text } from "@chakra-ui/react";
import { fetchCategories, selectCategories, selectCategoriesStatus } from "../../../state/categories/CategoriesSlice";
import { AsyncStatus } from "../../../state/AsyncStatus";
import { ItemsPage } from "../items/ItemsPage";

export const ItemsCategoryPage = () => {
    const items = useSelector(selectCategoryItems);
    const params = useParams();
    const categories = useSelector(selectCategories);
    const categoryStatus = useSelector(selectCategoriesStatus);

    useEffect(() => {
        if(categoryStatus === AsyncStatus.IDLE) {
            store.dispatch(fetchCategories());
        }
    }, [categoryStatus]);

    useEffect(() => {
        if (params.categoryId){
            store.dispatch(fetchItemsByCategoryId(params.categoryId));
        }
    },  [params.categoryId]);

    const category = useMemo(() =>{
        if(params.categoryId){
            return categories.filter((category) => category.id === params.categoryId)[0];
        }
    }, [categories, params]);

    return(
        <Flex direction="column" mb={4} p={1}>
            {category && <Text fontSize="xl" alignSelf="center" justifyContent="center">{category.name}</Text>}
            {items && <ItemsPage items={items}/>}
        </Flex>
    );
}