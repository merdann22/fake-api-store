// ProductCard.jsx
import './ProductCard.scss';

const ProductCard = ({ product }) => (
    <article className="product-card">
        <img className="product-card__image" src={product.thumbnail} alt={product.title} />
        <h3 className="product-card__title">{product.title}</h3>
        <span className="product-card__price">${product.price}</span>
        <button className="product-card__btn product-card__btn--active">В корзину</button>
    </article>
);