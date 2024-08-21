import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaHeart } from "react-icons/fa";

function FavoriteButton({ itemId, isFavorite, onFavoriteChange }) {
    const handleFavorite = async () => {
        try {
            const url = isFavorite
                ? 'http://localhost:4000/api/items/fav/remove'
                : 'http://localhost:4000/api/items/fav/add';

            await axios.post(url, { itemId }, { withCredentials: true });
            toast.success(isFavorite ? "Item removed from favorites" : "Item added to favorites");

           
            onFavoriteChange(itemId, !isFavorite);
        } catch (error) {
            toast.error(error.response?.data?.error || "Error updating favorites");
        }
    };

    return (
        <button 
            onClick={handleFavorite} 
            className="h-10 w-56 bg-black font-bold text-white rounded-md flex items-center justify-center space-x-2 mx-auto"
        >
            <FaHeart className={`text-red-500 ${isFavorite ? 'fill-current' : 'text-gray-500'}`} />
            <span>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</span>
        </button>
    );
}

export default FavoriteButton;
