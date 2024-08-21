import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaMoneyBillAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function BuyItem({ itemId, itemPrice, sellerId, onItemBought }) {
    const [balance, setBalance] = useState(0);
    const [canBuy, setCanBuy] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {

        const currentUserId = localStorage.getItem('userId');
        
        if (sellerId === currentUserId) {
            setCanBuy(false); 
        }
    }, [sellerId]);

    const handleBuy = async () => {
        try {
            const response = await axios.post('http://localhost:4000/api/items/buy', { itemId }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            setBalance(response.data.balance);
            toast.success("Purchase successful!");

          
            if (onItemBought) {
                onItemBought(response.data.item);
            }
            toast.success("Purchase successful!");
            setTimeout(() => {
                navigate('/profile');
              },2000)
            
        } catch (error) {
            toast.error(error.response?.data?.error || "Error purchasing item");
        }
    };

    return (
        <div className="flex justify-center">
            <button 
                onClick={handleBuy} 
                className="h-10 w-56 bg-black font-bold text-white rounded-md mb-3 flex items-center justify-center space-x-2 mx-auto"
                disabled={!canBuy}
            >
                <FaMoneyBillAlt size={25} color='green' />
                <span>{canBuy ? `Buy Item for ${itemPrice} units` : "Cannot buy your own item"}</span>
            </button>
            <ToastContainer />
        </div>
    );
}

export default BuyItem;
