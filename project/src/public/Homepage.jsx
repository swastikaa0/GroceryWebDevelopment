import React from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";


function Homepage() {

   const navigate = useNavigate();

  return (
    <>
      {/* Header - Full Width */}
      <header>
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="logo-container">
            <img
              src="/src/pics/logo.svg"
              alt="GreenCart Logo"
              className="h-8 w-auto"
            />
          </div>

          {/* Centered Navigation Links */}
          <nav className="flex space-x-4">
            <a href="#" className="nav-link text-gray-700 font-semibold hover:text-green-600">
              Seller Dashboard
            </a>
            <a href="#" className="nav-link text-gray-700 font-semibold hover:text-green-600">
              Home
            </a>
            <a href="#" className="nav-link text-gray-700 font-semibold hover:text-green-600">
              All Product
            </a>
          </nav>

          {/* Right-aligned Elements */}
          <div className="right-container flex items-center space-x-4">
            <div className="search-bar relative">
              <input
                type="text"
                placeholder="Search products"
                className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-green-500"
              />
              <button className="absolute right-2 top-2">
                <i className="fas fa-search text-gray-500"></i>
              </button>
            </div>
            <div className="cart flex items-center">
              <img
                src="/src/pics/cart_icon.svg"
                alt="Cart Icon"
                className="h-6 w-6 mr-1"
              />
              <span className="text-green-600 font-bold">0</span>
            </div>
            <button 
            onClick={()=>navigate('/LoginPage')} 
            className="login-btn bg-green-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-700">
              Login
            </button>

            
          </div>
        </div>
      </header>

      {/* Main Banner - Full Width */}
      <section className="banner bg-green-50 py-12 w-full">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-green-800">
            Freshness You Can Trust, Savings You Will Love!
          </h1>
          <div className="buttons flex flex-col md:flex-row gap-4 justify-center">
            <button className="btn shop-now bg-green-600 text-white px-6 py-2 rounded font-semibold hover:bg-green-700">
              Shop now
            </button>
            <a
              href="#"
              className="btn explore-deals bg-white border border-green-600 text-green-600 px-6 py-2 rounded font-semibold hover:bg-green-50"
            >
              Explore deals →
            </a>
          </div>
        </div>
      </section>

      {/* Categories - Centered Content */}
      <section className="categories py-10">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-green-800 text-center">
            Categories
          </h2>
          <div className="category-grid grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            <div className="category-item flex flex-col items-center">
              <img
                src="/src/pics/organic_vegitable_image.png"
                alt="Organic Veggies"
                className="h-20 w-20 object-contain mb-2"
              />
              <p>Organic veggies</p>
            </div>
            <div className="category-item flex flex-col items-center">
              <img
                src="/src/pics/fresh_fruits_image.png"
                alt="Fresh Fruits"
                className="h-20 w-20 object-contain mb-2"
              />
              <p>Fresh Fruits</p>
            </div>
            <div className="category-item flex flex-col items-center">
              <img
                src="/src/pics/coca_cola_image.png"
                alt="Cold Drinks"
                className="h-20 w-20 object-contain mb-2"
              />
              <p>Cold Drinks</p>
            </div>
            <div className="category-item flex flex-col items-center">
              <img
                src="/src/pics/maggi_image.png"
                alt="Instant Food"
                className="h-20 w-20 object-contain mb-2"
              />
              <p>Instant Food</p>
            </div>
            <div className="category-item flex flex-col items-center">
              <img
                src="/src/pics/dairy_product_image.png"
                alt="Dairy Products"
                className="h-20 w-20 object-contain mb-2"
              />
              <p>Dairy Products</p>
            </div>
            <div className="category-item flex flex-col items-center">
              <img
                src="/src/pics/bakery_image.png"
                alt="Bakery & Breads"
                className="h-20 w-20 object-contain mb-2"
              />
              <p>Bakery & Breads</p>
            </div>
            <div className="category-item flex flex-col items-center">
              <img
                src="/src/pics/grain_image.png"
                alt="Grains & Cereals"
                className="h-20 w-20 object-contain mb-2"
              />
              <p>Grains & Cereals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="best-sellers py-10">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-green-800 text-center">
            Best Sellers
          </h2>
          <div className="product-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Product 1 */}
            <div className="product-card">
              <img src="src\pics\brown_bread_image.png" alt="Brown Bread" className="w-full h-40 object-cover mb-2" />
              <p className="category text-gray-700">Bakery</p>
              <h3 className="text-lg font-bold mb-2">Brown Bread 400g</h3>
              <div className="rating flex items-center mb-2">
                <span className="text-yellow-400">⭐⭐⭐⭐</span> (4)
              </div>
              <div className="price flex items-center mb-2">
                <span className="text-lg font-bold">$35</span>
                <del className="text-sm text-gray-500 ml-2">$40</del> 
              </div>
              <button className="add-button bg-green-600 text-white px-4 py-2 rounded font-semibold hover:bg-green-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart-plus-fill" viewBox="0 0 16 16">
                  <path d="M.5 1a.5.5 0 0 1 .5.5v1.875l2.625-1.36.5.266a.5.5 0 0 1 .5.482V6H10a.5.5 0 0 1 0 1H2.75v3.25a.5.5 0 0 1-.5.482l-.5.23A.5.5 0 0 1 2 10H.5v-9a.5.5 0 0 1 .5-.5Zm2.5 9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5ZM8 8a.5.5 0 0 1 .5-.5h5A.5.5 0 0 1 14 8v.5a.5.5 0 0 1-1 0V8.5H8.5A.5.5 0 0 1 8 8Z" />
                </svg>
                Add
              </button>
            </div>

            {/* Product 2 */}
            <div className="product-card">
              <img src="src\pics\quinoa_image.png" alt="Organic Quinoa" className="w-full h-40 object-cover mb-2" />
              <p className="category text-gray-700">Grains</p>
              <h3 className="text-lg font-bold mb-2">Organic Quinoa 500g</h3>
              <div className="rating flex items-center mb-2">
                <span className="text-yellow-400">⭐⭐⭐⭐</span> (4)
              </div>
              <div className="price flex items-center mb-2">
                <span className="text-lg font-bold">$420</span>
                <del className="text-sm text-gray-500 ml-2">$450</del>
              </div>
              <button className="add-button bg-green-600 text-white px-4 py-2 rounded font-semibold hover:bg-green-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart-plus-fill" viewBox="0 0 16 16">
                  <path d="M.5 1a.5.5 0 0 1 .5.5v1.875l2.625-1.36.5.266a.5.5 0 0 1 .5.482V6H10a.5.5 0 0 1 0 1H2.75v3.25a.5.5 0 0 1-.5.482l-.5.23A.5.5 0 0 1 2 10H.5v-9a.5.5 0 0 1 .5-.5Zm2.5 9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5ZM8 8a.5.5 0 0 1 .5-.5h5A.5.5 0 0 1 14 8v.5a.5.5 0 0 1-1 0V8.5H8.5A.5.5 0 0 1 8 8Z" />
                </svg>
                Add
              </button>
            </div>

            {/* Product 3 */}
            <div className="product-card">
              <img src="src\pics\carrot_image.png" alt="Carrot" className="w-full h-40 object-cover mb-2" />
              <p className="category text-gray-700">Vegetables</p>
              <h3 className="text-lg font-bold mb-2">Carrot 500g</h3>
              <div className="rating flex items-center mb-2">
                <span className="text-yellow-400">⭐⭐⭐⭐</span> (4)
              </div>
              <div className="price flex items-center mb-2">
                <span className="text-lg font-bold">$44</span>
                <del className="text-sm text-gray-500 ml-2">$50</del>
              </div>
              <button className="add-button bg-green-600 text-white px-4 py-2 rounded font-semibold hover:bg-green-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart-plus-fill" viewBox="0 0 16 16">
                  <path d="M.5 1a.5.5 0 0 1 .5.5v1.875l2.625-1.36.5.266a.5.5 0 0 1 .5.482V6H10a.5.5 0 0 1 0 1H2.75v3.25a.5.5 0 0 1-.5.482l-.5.23A.5.5 0 0 1 2 10H.5v-9a.5.5 0 0 1 .5-.5Zm2.5 9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5ZM8 8a.5.5 0 0 1 .5-.5h5A.5.5 0 0 1 14 8v.5a.5.5 0 0 1-1 0V8.5H8.5A.5.5 0 0 1 8 8Z" />
                </svg>
                Add
              </button>
            </div>

            {/* Product 4 */}
            <div className="product-card">
              <img src="src\pics\apple_image.png" alt="Apple" className="w-full h-40 object-cover mb-2" />
              <p className="category text-gray-700">Fruits</p>
              <h3 className="text-lg font-bold mb-2">Apple 1kg</h3>
              <div className="rating flex items-center mb-2">
                <span className="text-yellow-400">⭐⭐⭐⭐</span> (4)
              </div>
              <div className="price flex items-center mb-2">
                <span className="text-lg font-bold">$90</span>
                <del className="text-sm text-gray-500 ml-2">$100</del>
              </div>
              <button className="add-button bg-green-600 text-white px-4 py-2 rounded font-semibold hover:bg-green-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart-plus-fill" viewBox="0 0 16 16">
                  <path d="M.5 1a.5.5 0 0 1 .5.5v1.875l2.625-1.36.5.266a.5.5 0 0 1 .5.482V6H10a.5.5 0 0 1 0 1H2.75v3.25a.5.5 0 0 1-.5.482l-.5.23A.5.5 0 0 1 2 10H.5v-9a.5.5 0 0 1 .5-.5Zm2.5 9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5ZM8 8a.5.5 0 0 1 .5-.5h5A.5.5 0 0 1 14 8v.5a.5.5 0 0 1-1 0V8.5H8.5A.5.5 0 0 1 8 8Z" />
                </svg>
                Add
              </button>
            </div>

            {/* Product 5 */}
            <div className="product-card">
              <img src="src\pics\cheese_image.png" alt="Cheese" className="w-full h-40 object-cover mb-2" />
              <p className="category text-gray-700">Dairy</p>
              <h3 className="text-lg font-bold mb-2">Cheese 200g</h3>
              <div className="rating flex items-center mb-2">
                <span className="text-yellow-400">⭐⭐⭐⭐</span> (4)
              </div>
              <div className="price flex items-center mb-2">
                <span className="text-lg font-bold">$130</span>
                <del className="text-sm text-gray-500 ml-2">$140</del>
              </div>
              <button className="add-button bg-green-600 text-white px-4 py-2 rounded font-semibold hover:bg-green-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart-plus-fill" viewBox="0 0 16 16">
                  <path d="M.5 1a.5.5 0 0 1 .5.5v1.875l2.625-1.36.5.266a.5.5 0 0 1 .5.482V6H10a.5.5 0 0 1 0 1H2.75v3.25a.5.5 0 0 1-.5.482l-.5.23A.5.5 0 0 1 2 10H.5v-9a.5.5 0 0 1 .5-.5Zm2.5 9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5ZM8 8a.5.5 0 0 1 .5-.5h5A.5.5 0 0 1 14 8v.5a.5.5 0 0 1-1 0V8.5H8.5A.5.5 0 0 1 8 8Z" />
                </svg>
                Add
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Are the Best? Section */}
      <section className="why-best py-10">
  <div className="container mx-auto flex flex-col md:flex-row gap-8">
    {/* Image Section */}
    <div className="image-section flex-1">
      <img
        src="/src/pics/bottom_banner_image.png"
        alt="Why We Are the Best"
        className="w-full h-96 object-cover"
      />
      <div className="fast-delivery-badge absolute bottom-4 left-4 bg-white p-2 rounded shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-truck" viewBox="0 0 16 16">
          <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5v2A1.5 1.5 0 0 1 10.5 7H6v-1A1.5 1.5 0 0 1 7.5 5H15a.5.5 0 0 1 .5.5v19a.5.5 0 0 1-.5.5h-9A.5.5 0 0 1 1 20v-19a.5.5 0 0 1 .5-.5H3v1a1.5 1.5 0 0 1-1.5 1.5h-2zM3 18v-6h8v6H3zm8-10v6h-8V8h8zm-9 8h9V8H3v8z" />
        </svg>
        <div>
          <p className="text-lg font-bold">Fast Delivery</p>
          <p className="text-sm">In 30 Min</p>
        </div>
      </div>
    </div>

    {/* Benefits Section */}
    <div className="benefits-section flex-1">
      <h2 className="text-2xl font-bold mb-6 text-green-800">Why We Are the Best?</h2>
      <div className="benefit-item flex items-center mb-4">
        <img
          src="/src/pics/delivery_truck_icon.svg"
          alt="Delivery Icon"
          className="h-8 w-8 mr-2"
        />
        <div>
          <h3 className="text-lg font-bold text-green-600">Fastest Delivery</h3>
          <p>Groceries delivered in under 30 minutes.</p>
        </div>
      </div>
      <div className="benefit-item flex items-center mb-4">
        <img
          src="/src/pics/leaf_icon.svg"
          alt="Fresh Icon"
          className="h-8 w-8 mr-2"
        />
        <div>
          <h3 className="text-lg font-bold text-green-600">Freshness Guaranteed</h3>
          <p>Fresh produce straight from the source.</p>
        </div>
      </div>
      <div className="benefit-item flex items-center mb-4">
        <img
          src="/src/pics/coin_icon.svg"
          alt="Price Icon"
          className="h-8 w-8 mr-2"
        />
        <div>
          <h3 className="text-lg font-bold text-green-600">Affordable Prices</h3>
          <p>Quality groceries at unbeatable prices.</p>
        </div>
      </div>
      <div className="benefit-item flex items-center">
        <img
          src="/src/pics/trust_icon.svg"
          alt="Trust Icon"
          className="h-8 w-8 mr-2"
        />
        <div>
          <h3 className="text-lg font-bold text-green-600">Trusted by Thousands</h3>
          <p>Loved by 10,000+ happy customers.</p>
        </div>
      </div>
    </div>
  </div>
</section>
     
    </>
  );
}

export default Homepage;