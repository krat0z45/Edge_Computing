
'use client';

import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';

// Helper function to get CSS variable values
const getCssVar = (name: string) => {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
};

const PlexusAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles: Particle[] = [];
    const particleCount = width > 768 ? 150 : 75;
    const maxDistance = 120;
    
    // Get HSL values from CSS variables
    const startColorStr = getCssVar('--plexus-start-color');
    const endColorStr = getCssVar('--plexus-end-color');
    
    const [startH, startS, startL] = startColorStr.split(' ').map(parseFloat);
    const [endH, endS, endL] = endColorStr.split(' ').map(parseFloat);

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 150,
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseColor: string = '';
      
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = Math.random() * 1 - 0.5;
        this.vy = Math.random() * 1 - 0.5;
        this.size = Math.random() * 1.5 + 1;
        this.updateColor();
      }

      updateColor() {
          const ratio = this.x / width;
          const h = startH + (endH - startH) * ratio;
          const s = startS + (endS - startS) * ratio;
          const l = startL + (endL - startL) * ratio;
          this.baseColor = `hsl(${h}, ${s}%, ${l}%)`;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
        
        this.updateColor();
      }

      draw() {
        ctx!.fillStyle = this.baseColor;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    const init = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const connect = () => {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    const opacity = 1 - distance / maxDistance;
                    const avgX = (particles[i].x + particles[j].x) / 2;
                    const ratio = avgX / width;
                    const h = startH + (endH - startH) * ratio;
                    const s = startS + (endS - startS) * ratio;
                    const l = startL + (endL - startL) * ratio;
                    
                    ctx!.strokeStyle = `hsla(${h}, ${s}%, ${l}%, ${opacity})`;
                    ctx!.lineWidth = 0.5;
                    ctx!.beginPath();
                    ctx!.moveTo(particles[i].x, particles[i].y);
                    ctx!.lineTo(particles[j].x, particles[j].y);
                    ctx!.stroke();
                }
            }
             const dxMouse = particles[i].x - mouse.x;
             const dyMouse = particles[i].y - mouse.y;
             const distMouse = Math.sqrt(dxMouse*dxMouse + dyMouse*dyMouse);
             if (distMouse < mouse.radius) {
                 const opacity = 1 - distMouse / mouse.radius;
                 ctx!.strokeStyle = `hsla(${startH}, ${startS}%, ${startL}%, ${opacity})`;
                 ctx!.lineWidth = 0.2;
                 ctx!.beginPath();
                 ctx!.moveTo(particles[i].x, particles[i].y);
                 ctx!.lineTo(mouse.x, mouse.y);
                 ctx!.stroke();
             }
        }
    };

    let animationFrameId: number;
    const animate = () => {
      ctx!.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      connect();
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" />;
};


export function HeroSection() {
  return (
    <section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center text-center bg-transparent overflow-hidden">
      <PlexusAnimation />
      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className="flex flex-col items-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-white">
              Edge Computing Architecture
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
              Explorando los patrones, factores y herramientas que definen los
              sistemas de computación modernos y descentralizados.
            </p>
          </div>
          <div className="space-x-4">
            <Link href="#factors">
              <Button size="lg" variant="secondary">
                Explorar Factores <ArrowDown className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
