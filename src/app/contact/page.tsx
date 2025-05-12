'use client';
import  Link  from "next/link";

export default function ContactPage() {
    return (
        <div>
            <section className="class02">
                <div className="class03"></div>
                <section className="content">
                    <h2>Contact Us</h2>
                    <p>Sponge Pastry Shop is the creation of Chef Akantha. Having been a top pastry chef for several years, his passion led him to start his own business in 1985. Today, Sponge is a well-known name among everyone.</p>
                    <p>Our dynamic catering team is equipped to serve any occasion. Visit us at No. 347, Galle Road, Colombo 3, Sri Lanka.</p>
                </section>
            </section>
            <footer>
                <div>
                    <div className="social-media">
                        <Link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

                            <a href="https://facebook.com/yourpage"><i className="fab fa-facebook-f"></i></a>
                            <a href="https://instagram.com/yourprofile" ><i className="fab fa-instagram"></i></a>
                            <a href="https://wa.me/1234567890" ><i className="fab fa-whatsapp"></i></a>
                        </Link>
                    </div>
                    <p>&copy; 2024 Cake.lk. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}