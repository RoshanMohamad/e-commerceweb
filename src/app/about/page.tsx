'use client';
import Link from "next/link";

export default function AboutPage() {
    return (
        <div>
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="md:w-1/2">
                        <h2 className="text-3xl font-bold mb-4">About Us</h2>
                        <p className="text-gray-600 mb-4">
                            Sweet Delights Bakery was founded in 2024 with a simple mission: to create delicious, handcrafted cakes
                            that bring joy to every celebration. Our master bakers use only the finest ingredients to ensure every
                            bite is pure bliss.
                        </p>
                        <p className="text-gray-600 mb-6">
                            From birthdays to weddings, our custom cakes are designed to make your special moments even more
                            memorable. We take pride in our attention to detail and commitment to quality.
                        </p>
                        <p>Sponge Pastry Shop is the creation of Chef Akantha. Having been a top pastry chef for several years, his passion led him to start his own business in 1985. Today, Sponge is a well-known name among everyone.</p>
                        <p>Our dynamic catering team is equipped to serve any occasion. Visit us at No. 347, Galle Road, Colombo 3, Sri Lanka.</p>
                    </div>
                    <footer>
                        <div>
                            <div className="social-media">
                                <Link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

                                    <a href="https://facebook.com/yourpage"><i className="fab fa-facebook-f"></i></a>
                                    <a href="https://instagram.com/yourprofile"><i className="fab fa-instagram"></i></a>
                                    <a href="https://wa.me/1234567890"><i className="fab fa-whatsapp"></i></a>
                                </Link>
                            </div>
                            <p>&copy; 2024 Cake.lk. All rights reserved.</p>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    )
}