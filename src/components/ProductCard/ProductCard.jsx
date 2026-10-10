// ProductCard.jsx
import './ProductCard.scss';
import {Link} from 'react-router-dom';

function ProductCard ({product})  {
    return (
        <Link to={`/product/${product.id}`} className="pr-card">
            <img
                className="pr-card__image"
                src={product.thumbnail}
                alt={product.title}
            />
            <h3 className="pr-card__title">{product.title}</h3>
            <span className="pr-card__price">${product.price}</span>
            <button className="pr-card__btn pr-card__btn--active">В корзину</button>
        </Link>
    )
}

export default ProductCard;