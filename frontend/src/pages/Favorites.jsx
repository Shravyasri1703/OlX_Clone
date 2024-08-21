import React, { useEffect, useState } from 'react';
import FavoriteButton from '../Components/FavoriteButton';
import axios from 'axios';
import Navbar from '../Components/Navbar';

function Favorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/items/fav', { withCredentials: true });
                setFavorites(response.data);
            } catch (error) {
                console.error("Error fetching favorites", error);
            }
        };

        fetchFavorites();
    }, []);

    const handleFavoriteChange = (itemId, newStatus) => {
        setFavorites(prevFavorites =>
            newStatus
                ? [...prevFavorites, { _id: itemId }]
                : prevFavorites.filter(item => item._id !== itemId)
        );
    };

    return (
        <>
            <Navbar />
            <div className="p-6 mt-20">
                <h1 className="text-4xl font-bold mb-4 text-center">Your Favorite Items</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                    {favorites.map(item => (
                        <div key={item._id} className="border border-gray-300 rounded-lg shadow-md overflow-hidden p-2 flex flex-col">
                            <img src={`http://localhost:4000/uploads/${item.image}`} alt={item.name} className="w-full h-48 object-cover p-1 border-2 border-slate-300" />
                            <div className="p-4 flex-1">
                                <h2 className="text-2xl font-semibold mb-2">{item.name}</h2>
                                <p className="text-gray-700 font-semibold mb-4">Price: {item.price} Units</p>
                            </div>
                            <div className="flex justify-center items-center p-4">
                                <FavoriteButton
                                    itemId={item._id}
                                    isFavorite={true}
                                    onFavoriteChange={handleFavoriteChange}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Favorites;
