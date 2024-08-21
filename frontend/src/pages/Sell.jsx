import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';


const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const textTransition = {
  duration: 1,
  delay: 0.5,
};

function Sell() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('http://localhost:4000/api/items/addItem', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success("Product successfully added!");
      toast.success("50 units added to your Account");

      console.log('Product successfully added:', response.data);
      
      setName('');
      setPrice('');
      setImage(null);

      
      setTimeout(() => {
        navigate('/store');
      }, 2000);
    
    } catch (error) {
      toast.error("Error adding product: " + (error.response?.data?.error || "An unexpected error occurred"));
      console.error('Error adding product:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className='flex flex-col min-h-screen w-screen mt-20 items-center'>
        <motion.h2
          className='text-black font-extrabold text-6xl text-center mt-10 mb-10'
          initial="hidden"
          animate="visible"
          variants={textVariants}
          transition={textTransition}
        >
          Sell a Product And Earn 50 units !!!
        </motion.h2>
        <div className='h-auto w-1/2 md:w-1/3 flex flex-col border-2 border-slate-300 items-center justify-center p-10 gap-8 bg-black bg-opacity-85'>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
            <div className="flex flex-col">
              <label className='text-white font-bold mb-2'>Product Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
                required
                className='h-10 w-full border-2 border-slate-300 p-2 rounded'
              />
            </div>
            <div className="flex flex-col">
              <label className='text-white font-bold mb-2'>Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                required
                className='h-10 w-full border-2 border-slate-300 p-2 rounded'
              />
            </div>
            <div className="flex flex-col">
              <label className='text-white font-bold mb-2'>Image</label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className='w-full border-2 border-slate-300 p-2 rounded'
              />
            </div>
            <button type="submit" className="h-10 w-full bg-black text-white font-bold rounded">Sell</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Sell;
