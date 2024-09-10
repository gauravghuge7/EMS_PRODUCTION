import React from 'react';
import NotFoundImg from "../../public/404.png"
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-16">
                <div className="w-64 h-64 relative">
                    <div className="absolute inset-0 bg-white rounded-lg  flex items-center justify-center">
                        <img src={NotFoundImg}/>
                       
                    </div>
                </div>
                <div className="text-center md:text-left">
                    <h1 className="text-4xl font-bold mb-4">Oops!</h1>
                    <p className="text-xl text-gray-600 mb-6">We couldn't find the page<br />you were looking for</p>
                    <Link to={"/"} className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition duration-300">
                        ← Go home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;