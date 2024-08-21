// AddBalance.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddBalance() {
    const [amount, setAmount] = useState(0);

    const handleAddFunds = async () => {
        try {
            const response = await axios.post('http://localhost:4000/api/auth/add-balance', { amount });
            toast.success(`Balance updated successfully! New balance: $${response.data.balance}`);
        } catch (error) {
            toast.error(error.response?.data?.error || "Error adding balance");
        }
    };

    return (
        <div>
            <input 
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="Enter amount to add"
            />
            <button onClick={handleAddFunds} className="h-10 w-32 bg-black text-white font-semibold rounded-lg">
                Add Funds
            </button>
        </div>
    );
}

export default AddBalance;
