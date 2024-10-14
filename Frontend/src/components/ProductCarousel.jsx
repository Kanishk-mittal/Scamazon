import React, { useState } from 'react';
import UserProductCard from './UserProductCard';

const ProductCarousel = ({ products }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 4;
    const totalPages = Math.ceil(products.length / itemsPerPage);

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

    return (
        <div className="relative overflow-hidden">
            <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {products.map((product, index) => (
                    <div key={index} className="w-1/4 p-2 flex-shrink-0">
                        <UserProductCard
                            name={product.name}
                            description={product.description}
                            price={product.price}
                            image={product.image}
                        />
                    </div>
                ))}
            </div>
            <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white px-3 py-2 hover:bg-gray-800"
            >
                &#8592;
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white px-3 py-2 hover:bg-gray-800"
            >
                &#8594;
            </button>
        </div>
    );
};

export default ProductCarousel;
