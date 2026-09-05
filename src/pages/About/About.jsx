import './About.scss';

export default function About() {
    return (
        <main className="about">

            <section className="about__hero">
                <div className="container">
                    <span className="about__label">О ПРОЕКТЕ</span>

                    <h1 className="about__title">
                        Интернет-магазин
                        <span> товаров</span>
                    </h1>

                    <p className="about__description">
                        Современный интернет-магазин, созданный на React
                        с использованием Fake Store API. Здесь можно
                        просматривать товары, искать нужные позиции,
                        фильтровать каталог и добавлять товары в корзину.
                    </p>
                </div>
            </section>

            <section className="about__content">
                <div className="container">

                    <div className="about__section">
                        <div className="about__section-number">01</div>

                        <div>
                            <h2>О проекте</h2>

                            <p>
                                Этот проект представляет собой адаптивный
                                интернет-магазин, разработанный с использованием
                                React.
                            </p>

                            <p>
                                Данные о товарах загружаются через Fake Store API,
                                после чего отображаются в удобном каталоге.
                                Проект создан для практики работы с API,
                                компонентами React, маршрутизацией и состоянием
                                приложения.
                            </p>
                        </div>
                    </div>

                    <div className="about__section">
                        <div className="about__section-number">02</div>

                        <div>
                            <h2>Возможности</h2>

                            <div className="about__features">

                                <div className="feature">
                                    <span>01</span>

                                    <h3>Каталог товаров</h3>

                                    <p>
                                        Просматривайте товары из различных
                                        категорий в удобном каталоге.
                                    </p>
                                </div>

                                <div className="feature">
                                    <span>02</span>

                                    <h3>Поиск и фильтрация</h3>

                                    <p>
                                        Находите нужные товары с помощью поиска,
                                        категорий и сортировки.
                                    </p>
                                </div>

                                <div className="feature">
                                    <span>03</span>

                                    <h3>Страница товара</h3>

                                    <p>
                                        Просматривайте подробную информацию
                                        о товаре: изображение, описание,
                                        цену и рейтинг.
                                    </p>
                                </div>

                                <div className="feature">
                                    <span>04</span>

                                    <h3>Корзина</h3>

                                    <p>
                                        Добавляйте товары в корзину, изменяйте
                                        их количество и рассчитывайте общую
                                        стоимость заказа.
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="about__section">
                        <div className="about__section-number">03</div>

                        <div>
                            <h2>Технологии</h2>

                            <p>
                                В проекте используются следующие технологии
                                и библиотеки:
                            </p>

                            <div className="about__technologies">
                                <span>React</span>
                                <span>React Router</span>
                                <span>JavaScript</span>
                                <span>SCSS</span>
                                <span>Fake Store API</span>
                                <span>Swiper</span>
                                <span>Toastify</span>
                                <span>Skeleton</span>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

        </main>
    );
}