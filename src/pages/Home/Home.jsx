import HitProducts from './HitProducts/HitProducts';
import NewProducts from './NewProducts/NewProducts';
import Categories from './Categories/Categories';
import PopularProducts from './PopularProducts/PopularProducts';

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