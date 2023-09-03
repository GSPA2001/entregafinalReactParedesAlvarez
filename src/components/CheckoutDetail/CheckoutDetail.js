import { useContext } from "react";
import CartItem from "../CartItem/CartItem";
import CartContext from "../../context/CartContext";
import './CheckoutDetail.css';

const CheckoutDetail = () => {
    const { cart, totalPrice } = useContext(CartContext);

    return (
        <div className='CheckoutDetail'>
            <p>Detalle de pedido</p>
            {cart.map((product, index) => (
                <CartItem
                    key={index}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    quantity={product.quantity}
                />
            ))}
            <p id="total">Total:  ${parseFloat(totalPrice()).toFixed()}</p>
        </div>
    );
};
export default CheckoutDetail;