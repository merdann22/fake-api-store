import HitProducts from './components/HitProducts/HitProducts';
import NewProducts from './components/NewProducts/NewProducts';
import Categories from './components/Categories/Categories';
import PopularProducts from './components/PopularProducts/PopularProducts';

export default function Home () {
    return (
        <main className="home">
            <HitProducts/>
            <NewProducts/>
            <Categories/>
            <PopularProducts/>
        </main>
    )
}