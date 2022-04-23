import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchCartData = (user) => {
    return async dispatch => {
        const fetchData = async() => {
            console.log('fetchData user ', user)
            const response = await fetch('http://localhost:5000/api/carts/user/' + user);

            if(!response.ok) {
                throw new Error('Fetching cart data failed');
            }
            
            const data = await response.json();

            return data;
        };

        try { 
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart({
                _id: cartData._id,
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity
            }));

        } catch (error) {
            dispatch(
                uiActions.showNotifications({
                    status: 'error',
                    title: 'Error!',
                    message: 'Fetching cart data failed!'
                })
            );
        }
    }
}

export const sendCartData = (cart) => {
    return async(dispatch) => {
        dispatch(uiActions.showNotifications({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!'
          }));

        const sendRequest = async () => {
            const response = await fetch('http://localhost:5000/api/carts/' + cart._id, {
                method: 'PATCH',
                body: JSON.stringify({
                    items: cart.items,
                    totalQuantity: cart.totalQuantity
                }),
                headers: {    
                    "Content-type": "application/json" 
                }
            });
    
            if(!response.ok) {
                throw new Error('Sending cart data failed');
            }
        }
        try {
            await sendRequest();

            dispatch(
                uiActions.showNotifications({
                    status: 'success',
                    title: 'Success!',
                    message: 'Sent cart data succesfully!'
                })
            );
        } catch (error) {
            dispatch(
                uiActions.showNotifications({
                    status: 'error',
                    title: 'Error!',
                    message: 'Sending cart data failed!'
                })
            );
        }
    }
};