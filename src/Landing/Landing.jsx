import React, {useRef, useEffect, useState} from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./Landing.css";

gsap.registerPlugin(ScrollTrigger);
const TOTAL_FRAMES = 195;

const Landing = () => {

    const canvasRef = useRef(null);
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

        images[0].onload = render;
        if (images[0].complete) {
            render();
        }
    }, [images]);
    
    return (
        <div className="landing">
            <canvas className="video-canvas" ref = {canvasRef}></canvas>
         </div>
    )
}

export default Landing;