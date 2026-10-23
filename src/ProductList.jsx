import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
    const [showCart, setShowCart] = useState(window.location.hash === '#cart');
    const [addedToCart, setAddedToCart] = useState({});
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();
    useEffect(() => {
        const navigate = () => { setShowCart(window.location.hash === '#cart'); if (!window.location.hash.startsWith('#category-')) window.scrollTo(0, 0); };
        window.addEventListener('hashchange', navigate);
        return () => window.removeEventListener('hashchange', navigate);
    }, []);
    useEffect(() => {
        setAddedToCart(Object.fromEntries(cartItems.map(item => [item.name, true])));
    }, [cartItems]);
    const handleAddToCart = product => {
        dispatch(addItem(product));
        setAddedToCart(previous => ({ ...previous, [product.name]: true }));
    };
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                {
                    name: "Snake Plant",
                    image: `${import.meta.env.BASE_URL}images/snake-plant-5939187_1280.jpg`,
                    description: "Produces oxygen at night, improving air quality.",
                    cost: "$15"
                },
                {
                    name: "Spider Plant",
                    image: `${import.meta.env.BASE_URL}images/chlorophytum-3530413_1280.jpg`,
                    description: "Filters formaldehyde and xylene from the air.",
                    cost: "$12"
                },
                {
                    name: "Peace Lily",
                    image: `${import.meta.env.BASE_URL}images/peace-lilies-4269365_1280.jpg`,
                    description: "Removes mold spores and purifies the air.",
                    cost: "$18"
                },
                {
                    name: "Boston Fern",
                    image: `${import.meta.env.BASE_URL}images/boston-fern-5114414_1280.jpg`,
                    description: "Adds humidity to the air and removes toxins.",
                    cost: "$20"
                },
                {
                    name: "Rubber Plant",
                    image: `${import.meta.env.BASE_URL}images/flower-4850729_1280.jpg`,
                    description: "Easy to care for and effective at removing toxins.",
                    cost: "$17"
                },
                {
                    name: "Aloe Vera",
                    image: `${import.meta.env.BASE_URL}images/leaf-3283175_1280.jpg`,
                    description: "Purifies the air and has healing properties for skin.",
                    cost: "$14"
                }
            ]
        },
        {
            category: "Aromatic Fragrant Plants",
            plants: [
                {
                    name: "Lavender",
                    image: `${import.meta.env.BASE_URL}images/photo-1611909023032-2d6b3134ecba.jpg`,
                    description: "Calming scent, used in aromatherapy.",
                    cost: "$20"
                },
                {
                    name: "Jasmine",
                    image: `${import.meta.env.BASE_URL}images/photo-1592729645009-b96d1e63d14b.jpg`,
                    description: "Sweet fragrance, promotes relaxation.",
                    cost: "$18"
                },
                {
                    name: "Rosemary",
                    image: `${import.meta.env.BASE_URL}images/rosemary-4541241_1280.jpg`,
                    description: "Invigorating scent, often used in cooking.",
                    cost: "$15"
                },
                {
                    name: "Mint",
                    image: `${import.meta.env.BASE_URL}images/mint-1126282_1280.jpg`,
                    description: "Refreshing aroma, used in teas and cooking.",
                    cost: "$12"
                },
                {
                    name: "Lemon Balm",
                    image: `${import.meta.env.BASE_URL}images/balm-4480134_1280.jpg`,
                    description: "Citrusy scent, relieves stress and promotes sleep.",
                    cost: "$14"
                },
                {
                    name: "Hyacinth",
                    image: `${import.meta.env.BASE_URL}images/hyacinth-4110726_1280.jpg`,
                    description: "Hyacinth is a beautiful flowering plant known for its fragrant.",
                    cost: "$22"
                }
            ]
        },
        {
            category: "Insect Repellent Plants",
            plants: [
                {
                    name: "oregano",
                    image: `${import.meta.env.BASE_URL}images/oregano-790702_1280.jpg`,
                    description: "The oregano plants contains compounds that can deter certain insects.",
                    cost: "$10"
                },
                {
                    name: "Marigold",
                    image: `${import.meta.env.BASE_URL}images/marigold-7028063_1280.jpg`,
                    description: "Natural insect repellent, also adds color to the garden.",
                    cost: "$8"
                },
                {
                    name: "Geraniums",
                    image: `${import.meta.env.BASE_URL}images/flowerpot-43270_1280.jpg`,
                    description: "Known for their insect-repelling properties while adding a pleasant scent.",
                    cost: "$20"
                },
                {
                    name: "Basil",
                    image: `${import.meta.env.BASE_URL}images/tulsi-1539181_1280.jpg`,
                    description: "Repels flies and mosquitoes, also used in cooking.",
                    cost: "$9"
                },
                {
                    name: "Lavender",
                    image: `${import.meta.env.BASE_URL}images/photo-1611909023032-2d6b3134ecba.jpg`,
                    description: "Calming scent, used in aromatherapy.",
                    cost: "$20"
                },
                {
                    name: "Catnip",
                    image: `${import.meta.env.BASE_URL}images/cat-829681_1280.jpg`,
                    description: "Repels mosquitoes and attracts cats.",
                    cost: "$13"
                }
            ]
        },
        {
            category: "Medicinal Plants",
            plants: [
                {
                    name: "Aloe Vera",
                    image: `${import.meta.env.BASE_URL}images/leaf-3283175_1280.jpg`,
                    description: "Soothing gel used for skin ailments.",
                    cost: "$14"
                },
                {
                    name: "Echinacea",
                    image: `${import.meta.env.BASE_URL}images/echinacea-557477_1280.jpg`,
                    description: "Boosts immune system, helps fight colds.",
                    cost: "$16"
                },
                {
                    name: "Peppermint",
                    image: `${import.meta.env.BASE_URL}images/peppermint-2496773_1280.jpg`,
                    description: "Relieves digestive issues and headaches.",
                    cost: "$13"
                },
                {
                    name: "Lemon Balm",
                    image: `${import.meta.env.BASE_URL}images/balm-4480134_1280.jpg`,
                    description: "Calms nerves and promotes relaxation.",
                    cost: "$14"
                },
                {
                    name: "Chamomile",
                    image: `${import.meta.env.BASE_URL}images/flowers-1606041_1280.jpg`,
                    description: "Soothes anxiety and promotes sleep.",
                    cost: "$15"
                },
                {
                    name: "Calendula",
                    image: `${import.meta.env.BASE_URL}images/flowers-4340127_1280.jpg`,
                    description: "Heals wounds and soothes skin irritations.",
                    cost: "$12"
                }
            ]
        },
        {
            category: "Low Maintenance Plants",
            plants: [
                {
                    name: "ZZ Plant",
                    image: `${import.meta.env.BASE_URL}images/photo-1632207691143-643e2a9a9361.jpg`,
                    description: "Thrives in low light and requires minimal watering.",
                    cost: "$25"
                },
                {
                    name: "Pothos",
                    image: `${import.meta.env.BASE_URL}images/plants-3816945_1280.jpg`,
                    description: "Tolerates neglect and can grow in various conditions.",
                    cost: "$10"
                },
                {
                    name: "Snake Plant",
                    image: `${import.meta.env.BASE_URL}images/snake-plant-5939187_1280.jpg`,
                    description: "Needs infrequent watering and is resilient to most pests.",
                    cost: "$15"
                },
                {
                    name: "Cast Iron Plant",
                    image: `${import.meta.env.BASE_URL}images/cast-iron-plant-2072008_1280.jpg`,
                    description: "Hardy plant that tolerates low light and neglect.",
                    cost: "$20"
                },
                {
                    name: "Succulents",
                    image: `${import.meta.env.BASE_URL}images/cacti-1846147_1280.jpg`,
                    description: "Drought-tolerant plants with unique shapes and colors.",
                    cost: "$18"
                },
                {
                    name: "Aglaonema",
                    image: `${import.meta.env.BASE_URL}images/aglaonema-482915_1280.jpg`,
                    description: "Requires minimal care and adds color to indoor spaces.",
                    cost: "$22"
                }
            ]
        }
    ];
    return <>
        <header className="navbar">
            <a className="brand" href="#home"><span className="brand-mark" aria-hidden="true">❧</span><span>Paradise Nursery<small>Where green meets serenity</small></span></a>
            <nav aria-label="Main navigation">
                <a href="#home">Home</a>
                <a href="#plants" aria-current={!showCart ? 'page' : undefined}>Plants</a>
                <a className="cart-link" href="#cart" aria-current={showCart ? 'page' : undefined} aria-label={`Cart, ${totalQuantity} items`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M2 3h3l3 12h11l3-9H6"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></svg>
                    Cart <span className="cart-count" aria-live="polite">{totalQuantity}</span>
                </a>
            </nav>
        </header>
        {showCart ? <CartItem /> : <main className="catalog">
            <div className="catalog-heading"><p className="eyebrow">A LITTLE GREEN GOES A LONG WAY</p><h1>Find your new green companion.</h1><p>Explore our collection, from fragrant favorites to easy-care greenery.</p></div>
            <div className="category-links">{plantsArray.map((group, i) => <a key={group.category} href={`#category-${i}`}>{group.category}</a>)}</div>
            {plantsArray.map((group, i) => <section className="plant-section" id={`category-${i}`} key={group.category}>
                <div className="section-heading"><h2>{group.category}</h2><span>{group.plants.length} plants</span></div>
                <div className="product-grid">{group.plants.map(plant => <article className="product-card" key={plant.name}>
                    <img src={plant.image} alt={plant.name} loading="lazy" />
                    <div className="product-details"><div className="product-title"><h3>{plant.name}</h3><span>{plant.cost}</span></div>
                    <p>{plant.description}</p>
                    <button disabled={Boolean(addedToCart[plant.name])} onClick={() => handleAddToCart(plant)}>{addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}</button></div>
                </article>)}</div>
            </section>)}
        </main>}
        <footer>Paradise Nursery · Bring a little nature home.</footer>
    </>;
}
export default ProductList;
