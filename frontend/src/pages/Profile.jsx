import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import AddBalance from '../Components/AddBalance';

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/auth/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUser(response.data);
      } catch (err) {
        console.error('Error fetching user details:', err);
        setError('Error fetching user details');
      }
    };

    fetchUserProfile();
  }, []);

  if (error) return <div>Error: {error}</div>;

 
  const normalizeUrl = (url) => url ? url.replace(/\\/g, '/') : '';

  return (
    <>
      <Navbar />
      <div className="p-6 mt-20">
        {/* Identity Section */}
        <section className="mb-6 bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">Your Information</h1>
          {user ? (
            <div>
              <p className="text-lg"><strong>Username:</strong> {user.username}</p>
              <p className="text-lg"><strong>Email:</strong> {user.email}</p>
              <p className="text-lg"><strong>Balance:</strong> Rs{user.balance}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </section>

        {/* Purchased Items Section */}
        <section className="mb-6 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Purchased Items</h2>
          {user && user.purchasedItem && user.purchasedItem.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {user.purchasedItem.map(item => (
                <div key={item._id} className="bg-gray-100 border border-gray-300 rounded-lg shadow-md p-4">
                  <img
                    src={normalizeUrl(`http://localhost:4000/uploads/${item.image}`)}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded-md mb-4 border-2 border-slate-300"
                  />
                  <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                  <p className="text-gray-700">Price: {item.price} units</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No items purchased yet.</p>
          )}
        </section>

        {/* Sold Items Section */}
        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Sold Items</h2>
          {user && user.itemforSale && user.itemforSale.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {user.itemforSale.map(itemId => (
                <div key={itemId._id} className="bg-gray-100 border border-gray-300 rounded-lg shadow-md p-4">
                  {/* Check if itemId contains necessary fields */}
                  <p className="text-lg font-semibold mb-2">{itemId.name}</p>
                  <p className="text-gray-700">Price: {itemId.price} units</p>
                  <p className="text-gray-700">Status: {itemId.status}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No items sold yet.</p>
          )}
        </section>

        <div className="mt-6">
          <AddBalance />
        </div>
      </div>
    </>
  );
}

export default Profile;
