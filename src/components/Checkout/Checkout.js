import { useContext, useState, useEffect } from "react";
import CartContext from "../../context/CartContext";
import { collection, writeBatch } from 'firebase/firestore';
import { db } from "../../service/firebase/firebaseConfig";

import CheckoutForm from "../CheckoutForm/CheckoutForm";
import { Timestamp, addDoc, documentId, getDocs, query, where} from "firebase/firestore"; // Removed 'collection' import

const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState('');

    const { cart, totalPrice, clearCart } = useContext(CartContext);

    const createOrder = async ({ name, phone, email }) => {
        setLoading(true);

        try {
            const objOrder = {
                buyer: {
                    name, phone, email
                },
                items: cart,
                total: totalPrice,
                date: Timestamp.fromDate(new Date())
            };

            const batch = writeBatch(db);

            const outOfStock = [];

            const ids = cart.map(prod => prod.id);

            const productsCollection = collection(db, 'products');

            const productsAddedFromFirestore = await getDocs(query(productsCollection, where(documentId(), 'in', ids))); 
            const { docs } = productsAddedFromFirestore;

            docs.forEach(doc => {
                const dataDoc = doc.data();
                const stockDb = dataDoc.stock;

                const productsAddedToCart = cart.find(prod => prod.id === doc.id);
                const prodQuantity = productsAddedToCart?.quantity;

                if (stockDb >= prodQuantity) {
                    batch.update(doc.ref, { stock: stockDb - prodQuantity });
                } else {
                    outOfStock.push({ id: doc.id, ...dataDoc });
                }
            });

            if (outOfStock.length === 0) {
                await batch.commit();

                const orderRef = collection(db, 'orders');

                const orderAdded = await addDoc(orderRef, objOrder);

                setOrderId(orderAdded.id);
                clearCart();
            } else {
                console.error('platos sin stock');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (loading) {
            return <h2>Generando pedido...</h2>;
        } 
        if (orderId) {
            return <h2>El id de su pedido es: {orderId}</h2>;
        }
        
        return null;
    }, [loading, orderId]);

    return (
        <div>
            <h1>Checkout</h1>
            {loading ? <h2>Generando pedido...</h2> : orderId ? <h2>El id de su pedido es: {orderId}</h2> : <CheckoutForm onConfirm={createOrder} />}
        </div>
    );
}
export default Checkout;