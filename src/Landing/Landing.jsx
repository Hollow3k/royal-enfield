import React, {useRef, useEffect, useState} from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./Landing.css";

gsap.registerPlugin(ScrollTrigger);
const TOTAL_FRAMES = 195;

const Landing = () => {

    const canvasRef = useRef(null);
    const heroRef = useRef(null);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const frameImages = [];
        for (let i = 30; i <= TOTAL_FRAMES; i++) {
            const img = new Image();
            img.src = `/frames/ezgif-frame-${i.toString().padStart(3, '0')}.jpg`;
            frameImages.push(img);
        }
        setImages(frameImages);
    }, []); 

    useEffect(() => {
        if (images.length === 0) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const scale = window.devicePixelRatio || 1;
        canvas.width = 1920*scale;
        canvas.height = 1080*scale;
        context.scale(scale,scale);

        const frameState = { frame: 0 };

        const render = () => {
            const img = images[frameState.frame];
            if (img?.complete){
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(img, 0, 0,canvas.width/scale, canvas.height/scale);
            }
        }

        gsap.to(frameState, {
            frame: TOTAL_FRAMES - 1,
            snap: "frame",
            ease: "none",
            scrollTrigger: {
                trigger: ".landing",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            },
            onUpdate: render,
        });

        // Fade out hero content at the end of landing section
        gsap.to(heroRef.current, {
            opacity: 0,
            scrollTrigger: {
                trigger: ".landing",
                start: "80% bottom",
                end: "95% bottom",
                scrub: 1,
            },
        });

        images[0].onload = render;
        if (images[0].complete) {
            render();
        }
    }, [images]);
    
    return (
        <div className="landing">
            <canvas className="video-canvas" ref = {canvasRef}></canvas>
            
            {/* Navigation Bar */}
            <nav className="navbar">
                <div className="logo"><img src = "/Royal-Enfield-Logo-gr.png" alt="Royal Enfield Logo"/></div>
                <ul className="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#models">Models</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>

            {/* Hero Text Section */}
            <div className="hero-content" ref={heroRef}>
                <h1 className="hero-title">
                    CRAFTED FOR THE ROAD.<br/>
                    BUILT TO LAST.
                </h1>
                <p className="hero-subtitle">
                    Experience the Continental GT. Book a Test Ride.
                </p>
            </div>

         </div>
    )
}

export default Landing;