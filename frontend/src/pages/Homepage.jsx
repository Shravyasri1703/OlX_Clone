import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { useNavigate } from 'react-router-dom';

function Homepage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data); 
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    if (category === 'all') {
      setFilteredProducts(products); 
    } else {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  return (
    <>
      <Navbar />
      <div className='flex flex-col min-h-screen w-screen'>
        <div className='mt-24'>
          <h1 className='text-2xl md:text-5xl font-extrabold text-center text-black'>
            Pre-owned Quality, New Possibilities
          </h1>
        </div>
        <div className='flex justify-center mt-16'>
          <button 
            className={`px-4 py-2 mx-2 rounded-md ${selectedCategory === 'all' ? 'bg-black text-white' : 'bg-gray-200'}`}
            onClick={() => handleCategoryChange('all')}
          >
            All
          </button>
          <button 
            className={`px-4 py-2 mx-2 rounded-md ${selectedCategory === "men's clothing" ? 'bg-black text-white' : 'bg-gray-200'}`}
            onClick={() => handleCategoryChange("men's clothing")}
          >
            Men's Clothing
          </button>
          <button 
            className={`px-4 py-2 mx-2 rounded-md ${selectedCategory === "women's clothing" ? 'bg-black text-white' : 'bg-gray-200'}`}
            onClick={() => handleCategoryChange("women's clothing")}
          >
            Women's Clothing
          </button>
          <button 
            className={`px-4 py-2 mx-2 rounded-md ${selectedCategory === 'jewelery' ? 'bg-black text-white' : 'bg-gray-200'}`}
            onClick={() => handleCategoryChange('jewelery')}
          >
            Jewelery
          </button>
          <button 
            className={`px-4 py-2 mx-2 rounded-md ${selectedCategory === 'electronics' ? 'bg-black text-white' : 'bg-gray-200'}`}
            onClick={() => handleCategoryChange('electronics')}
          >
            Electronics
          </button>
        </div>
        <div className='flex flex-wrap justify-center items-center mt-10'>
          {filteredProducts.map(product => (
            <div 
              key={product.id} 
              className='border p-4 m-4 w-64 bg-white shadow-md rounded-lg flex flex-col justify-between'
              style={{ height: '400px' }} 
            >
              <img 
                src={product.image} 
                alt={product.title} 
                className='h-40 w-full object-cover' 
              />
              <h2 className='text-xl font-semibold mt-2'>{product.title}</h2>
              <p className='mt-2 font-bold'>{product.price} Units</p>
              <button 
                className='h-8 w-52 bg-black text-white mt-auto rounded-lg' 
                onClick={() => {
                  navigate('/login')
                }}
              >
                Buy
              </button>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Homepage;
