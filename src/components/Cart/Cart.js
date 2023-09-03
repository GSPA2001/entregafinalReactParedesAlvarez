import './Cart.css';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import CartItem from '../CartItem/CartItem';
import { Link } from 'react-router-dom';

const Cart = () => {
    const {cart, clearCart, totalQuantity, totalPrice} = useContext(CartContext)

    if(totalQuantity === 0){
        return(
            <div>
                <h1>No hay platos pedidos</h1>
                <Link to='/' className='Option'>Pedidos</Link>
            </div>
        )
    }
    return(
        <div>
            { cart.map(p => <CartItem key={p.id} {...p}/>) }
            <h3>Total: ${parseFloat(totalPrice()).toFixed()}</h3>
            <button onClick={() => clearCart()} className='Button'>Limpiar pedido</button>
            <Link to='/checkout' className='Option'>Checkout</Link>
            <Link to="/" className='Option'>Continuar pedido</Link>
        </div>
    )
}
export default Cart;