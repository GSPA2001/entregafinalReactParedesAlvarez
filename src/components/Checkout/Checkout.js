import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from "../../service/firebase/firebaseConfig";

import CheckoutForm from "../CheckoutForm/CheckoutForm";
import { Timestamp, addDoc, documentId, writeBatch } from "firebase/firestore"; // Removed 'collection' import

const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState('');

    const { cart, total, clearCart } = useContext(CartContext);

    const createOrder = async ({ name, phone, email }) => {
        setLoading(true);

        try {
            const objOrder = {
                buyer: {
                    name, phone, email
                },
                items: cart,
                total: total,
                date: Timestamp.fromDate(new Date())
            };

            const batch = writeBatch(db);

            const outOfStock = [];

            const ids = cart.map(prod => prod.id);

            const productsCollection = collection(db, 'products'); // Renamed 'productsRef' to 'productsCollection'

            const productsAddedFromFirestore = await getDocs(query(productsCollection, where(documentId(), 'in', ids))); // Fixed 'id' to 'ids'

            const { docs } = productsAddedFromFirestore;

            docs.forEach(doc => {
                const dataDoc = doc.data();
                const stockDb = dataDoc.stock;

                const productsAddedToCart = cart.find(prod => prod.id === doc.id);
                const prodQuantity = productsAddedToCart?.quantity;

                if (stockDb >= prodQuantity) {
                    batch.update(doc.ref, { stock: stockDb - prodQuantity });
                } else {
                    outOfStock.push({ id: doc.id, ...dataDoc }); // Fixed the array format
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

    if (loading) {
        return <h2>Generando pedido...</h2>;
    }

    if (orderId) {
        return <h2>El id de su pedido es: {orderId}</h2>;
    }

    return (
        <div>
            <h1>Checkout</h1>
            <CheckoutForm onConfirm={createOrder} />
        </div>
    );
}
export default Checkout;