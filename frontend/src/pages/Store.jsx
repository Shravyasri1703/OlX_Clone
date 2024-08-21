import axios from 'axios';
import { useEffect, useState } from 'react';
import BuyItem from '../Components/BuyItem';
import FavoriteButton from '../Components/FavoriteButton';
import { FaHeart } from "react-icons/fa";
import Navbar from '../Components/Navbar';

const Store = () => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [favoriteIds, setFavoriteIds] = useState([]);
    const [filter, setFilter] = useState('all'); 

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/items/store', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setItems(response.data); 
            } catch (err) {
                setError('Error fetching items');
                console.error(err);
            }
        };

        const fetchFavorites = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/items/fav', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const favoriteItems = response.data.map(item => item._id);
                setFavoriteIds(favoriteItems);
            } catch (err) {
                console.error('Error fetching favorites', err);
            }
        };

        fetchItems();
        fetchFavorites();
    }, []);

    
    const handleItemBought = (updatedItem) => {
        setItems(prevItems => prevItems.map(item =>
            item._id === updatedItem._id ? { ...item, status: updatedItem.status, buyer: updatedItem.buyer } : item
        ));
    };

    
    const filteredItems = items.filter(item => {
        if (filter === 'all') return true;
        if (filter === 'sold') return item.status === 'sold';
        if (filter === 'unsold') return item.status === 'unsold';
        return true;
    });

    return (
        <>
            <Navbar />
            <div className='flex flex-col min-h-screen w-screen mt-20'>
                <h1 className='text-center font-bold text-5xl text-black mt-2'>Store</h1>
                {error && <p>{error}</p>}
                {/* Filter Buttons */}
                <div className='mt-8 mb-8 flex justify-center gap-8'>
                    <button
                        onClick={() => setFilter('all')}
                        className={`h-10 w-20 rounded-lg ${filter === 'all' ? 'bg-black text-white' : 'bg-white text-black'}`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter('unsold')}
                        className={`h-10 w-20 rounded-lg ${filter === 'unsold' ? 'bg-black text-white' : 'bg-white text-black'}`}
                    >
                        Unsold
                    </button>
                    <button
                        onClick={() => setFilter('sold')}
                        className={`h-10 w-20 rounded-lg ${filter === 'sold' ? 'bg-black text-white' : 'bg-white text-black'}`}
                    >
                        Sold
                    </button>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6'>
                    {filteredItems.map(item => (
                        <div key={item._id} className='border border-gray-300 rounded-lg shadow-md overflow-hidden bg-white p-2'>
                            <img src={item.image} alt={item.name} className='w-full h-48 object-cover p-1 border-2 border-slate-300' />
                            <div className='p-4 text-center '>
                                <h2 className='text-lg font-semibold mb-2'>{item.name}</h2>
                                {item.status !== 'sold' && (
                                    <p className='text-gray-700 mb-2 text-xl font-bold'>Price: {item.price} units</p>
                                )}
                                <p className='text-gray-700 mb-2 text-xl font-bold'>Seller: {item.seller.username}</p>
                                <p className='text-gray-700 mb-4 text-xl font-bold'>Status: {item.status}</p>
                                {item.status !== 'sold' ? (
                                    <BuyItem
                                        itemId={item._id}
                                        itemPrice={item.price}
                                        onItemBought={handleItemBought}
                                    />
                                ) : (
                                    <div className="text-red-500 text-lg font-bold mb-4">Sold Out</div>
                                )}
                                <FavoriteButton
                                    itemId={item._id}
                                    isFavorite={favoriteIds.includes(item._id)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Store;
