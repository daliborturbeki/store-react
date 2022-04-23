import { productsActions } from "./products-slice";
import { uiActions } from "./ui-slice";

export const fetchProductsData = () => {
    return async dispatch => {
        const fetchData = async() => {
            const response = await fetch('http://localhost:5000/api/products');
       
            if(!response.ok) {
                throw new Error('Fetching products failed');
            }

            const data = await response.json();

            return data;
        };

        try { 
            const productsData = await fetchData();
            dispatch(productsActions.getProducts({
                products: productsData || []
            }));

        } catch (error) {
            dispatch(
                uiActions.showNotifications({
                    status: 'error',
                    title: 'Error!',
                    message: 'Fetching products failed!'
                })
            );
        }
    }
}
