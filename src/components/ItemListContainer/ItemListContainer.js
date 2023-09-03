import { useState, useEffect } from 'react';
import ItemList from '../ItemList/ItemList';
import { useParams } from 'react-router-dom';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../../service/firebase/firebaseConfig';

const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const { categoryId } = useParams();

    useEffect(() => {
        setLoading(true);

        let collectionRef;

        if (categoryId) {
            collectionRef = query(
                collection(db, 'products'),
                where('category', '==', categoryId)
            );
        } else {
            collectionRef = collection(db, 'products');
        }

        getDocs(collectionRef)
            .then((response) => {
                const productsAdapted = response.docs.map((doc) => {
                    const data = doc.data();
                    return { id: doc.id, ...data };
                });
                setProducts(productsAdapted);
            })
            .catch((error) => {
                console.error('Error al obtener los productos:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [categoryId]);

    return (
        <div>
            <h2>{greeting}</h2>
            {loading ? <p>Cargando...</p> : <ItemList products={products} />}
        </div>
    );
};
export default ItemListContainer;