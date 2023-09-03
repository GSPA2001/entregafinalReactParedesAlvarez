import './Item.css';
import { Link } from 'react-router-dom';

const Item = ({ id, name, price, image, description, stock }) => {
    return (
        <article className='CardItem'>
            <header className='Header'>
                <h2 className='ItemHeader'>
                    {name}
                </h2>
            </header>
            <picture>
                <img src={image} alt={name} className="ItemImg" />
            </picture>
            <section>
                <p className="Info">
                    Precio: ${price}
                </p>
                <p className="Info">
                    Platos disponibles: {stock}
                </p>
                <p className="Info">
                    Descripción: {description}
                </p>
            </section>
            <footer className='ItemFooter'>
                <Link to={`/item/${id}`} className='Option'>Ver detalles</Link>
            </footer>
        </article>
    )
}
export default Item;