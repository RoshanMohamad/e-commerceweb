'use client';
import Link from "next/link";
import Head from "next/head";

export default function AboutPage() {
    return (
        <>
            <Head>
                <link 
                    rel="stylesheet" 
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" 
                    integrity="sha512-Avb2QiuDEEvB4bZJYdft2mNjVShBftLdPG8FJ0V7irTLQ8Uo0qcPxh4Plq7G5tGm0rU+1SPhVotteLpBERwTkw==" 
                    crossOrigin="anonymous" 
                    referrerPolicy="no-referrer" 
                />
            </Head>

            <div className="min-h-screen flex flex-col">
                <div className="container mx-auto px-4 py-12 flex-1">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-bold mb-6 text-gray-800">About Us</h2>
                            <div className="space-y-4 text-gray-600">
                                <p>
                                    Sweet Delights Bakery was founded in 2024 with a simple mission: to create delicious, handcrafted cakes
                                    that bring joy to every celebration. Our master bakers use only the finest ingredients to ensure every
                                    bite is pure bliss.
                                </p>
                                <p>
                                    From birthdays to weddings, our custom cakes are designed to make your special moments even more
                                    memorable. We take pride in our attention to detail and commitment to quality.
                                </p>
                                <p>
                                    Sponge Pastry Shop is the creation of Chef Akantha. Having been a top pastry chef for several years, 
                                    his passion led him to start his own business in 1985. Today, Sponge is a well-known name among everyone.
                                </p>
                                <p>
                                    Our dynamic catering team is equipped to serve any occasion. Visit us at No. 347, Galle Road, Colombo 3, Sri Lanka.
                                </p>
                            </div>
                        </div>
                        
                        <div className="md:w-1/2">
                            {/* Placeholder for an image - replace with your actual image */}
                            <div className="bg-gray-200 rounded-lg aspect-square w-full flex items-center justify-center">
                                <span className="text-gray-500">About Us Image</span>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="bg-gray-900 text-white py-8">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col items-center">
                            <div className="flex space-x-6 mb-4">
                                <Link 
                                    href="https://facebook.com/yourpage" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-gray-300 hover:text-white transition-colors duration-200"
                                    aria-label="Facebook"
                                >
                                    <i className="fab fa-facebook-f text-xl"></i>
                                </Link>
                                <Link 
                                    href="https://instagram.com/yourprofile" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-gray-300 hover:text-white transition-colors duration-200"
                                    aria-label="Instagram"
                                >
                                    <i className="fab fa-instagram text-xl"></i>
                                </Link>
                                <Link 
                                    href="https://wa.me/1234567890" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-gray-300 hover:text-white transition-colors duration-200"
                                    aria-label="WhatsApp"
                                >
                                    <i className="fab fa-whatsapp text-xl"></i>
                                </Link>
                            </div>
                            <p className="text-gray-400 text-sm">
                                &copy; {new Date().getFullYear()} Cake.lk. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}