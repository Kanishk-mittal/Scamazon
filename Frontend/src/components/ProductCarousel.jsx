import React, { useState } from 'react';
import UserProductCard from './UserProductCard';

const ProductCarousel = ({ products,userId }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 4; // Number of products to show per page
    const totalPages = Math.ceil(products.length / itemsPerPage); // Calculate total number of pages

    const nextSlide = () => {
        if (currentIndex < totalPages - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    // Get the slice of products to display on the current page
    const visibleProducts = products.slice(
        currentIndex * itemsPerPage,
        (currentIndex + 1) * itemsPerPage
    );

    return (
        <div className="relative overflow-hidden">
            {/* The carousel wrapper with smooth transition */}
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {products.map((product, index) => (
                    <div key={index} className="w-1/4 p-2 flex-shrink-0">
                        <UserProductCard
                            name={product.name}
                            description={product.description}
                            price={product.price}
                            image={product.image}
                            userId={userId}
                            productId={product.p_id}
                            rating={product.rating}
                        />
                    </div>
                ))}
            </div>

            {/* Previous button */}
            <button
                onClick={prevSlide}
                className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white px-3 py-2 hover:bg-gray-800 ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={currentIndex === 0}
            >
                &#8592;
            </button>

            {/* Next button */}
            <button
                onClick={nextSlide}
                className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white px-3 py-2 hover:bg-gray-800 ${currentIndex === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={currentIndex === totalPages - 1}
            >
                &#8594;
            </button>
        </div>
    );
};

export default ProductCarousel;
