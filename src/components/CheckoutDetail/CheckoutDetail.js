import { useContext } from "react";
import CartItem from "../CartItem/CartItem";
import CartContext from "../../context/CartContext";
import './CheckoutDetail.css';

const CheckoutDetail = () => {
    const { cart, totalPrice, removeItem } = useContext(CartContext);

    return (
        <div className='CheckoutDetail'>
            <p>Detalle de pedido</p>
            {cart.map((product, index) => (
                <CartItem
                    key={index}
                    id={product.id}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    quantity={product.quantity}
                    removeItem={removeItem}
                />
            ))}
            <p id="total">Total:  ${parseFloat(totalPrice()).toFixed()}</p>
        </div>
    );
};
export default CheckoutDetail;