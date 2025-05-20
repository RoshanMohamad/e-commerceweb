'use client';
import Link from "next/link";
import Head from "next/head";

export default function ContactPage() {
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
                <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pink-50 to-white">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
                            <div className="space-y-4 text-gray-600 max-w-2xl mx-auto">
                                <p>
                                    Sponge Pastry Shop is the creation of Chef Akantha. Having been a top pastry chef for several years, 
                                    his passion led him to start his own business in 1985. Today, Sponge is a well-known name among everyone.
                                </p>
                                <p>
                                    Our dynamic catering team is equipped to serve any occasion. Visit us at No. 347, Galle Road, Colombo 3, Sri Lanka.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="mt-auto bg-gray-900 text-white py-8">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col items-center justify-center">
                            <div className="flex space-x-6 mb-4">
                                <Link 
                                    href="https://facebook.com/yourpage" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-gray-300 hover:text-white transition-colors duration-200"
                                >
                                    <i className="fab fa-facebook-f text-xl"></i>
                                </Link>
                                <Link 
                                    href="https://instagram.com/yourprofile" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-gray-300 hover:text-white transition-colors duration-200"
                                >
                                    <i className="fab fa-instagram text-xl"></i>
                                </Link>
                                <Link 
                                    href="https://wa.me/1234567890" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-gray-300 hover:text-white transition-colors duration-200"
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