// Advanced Particles Animation System for OZONE I.T SYSTEM
// Creates dynamic, interactive background animations

class ParticleSystem {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.options = {
            particleCount: options.particleCount || 80,
            particleSize: options.particleSize || 2,
            particleSpeed: options.particleSpeed || 0.5,
            particleColor: options.particleColor || 'rgba(37, 99, 235, 0.6)',
            connectionDistance: options.connectionDistance || 120,
            connectionColor: options.connectionColor || 'rgba(37, 99, 235, 0.2)',
            mouseInteraction: options.mouseInteraction !== false,
            mouseRadius: options.mouseRadius || 150,
            responsive: options.responsive !== false,
            ...options
        };

        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.animationId = null;
        this.isVisible = true;

        this.init();
    }

    init() {
        this.setupCanvas();
        this.createParticles();
        this.setupEventListeners();
        this.animate();
        this.setupIntersectionObserver();
    }

    setupCanvas() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        
        this.container.appendChild(this.canvas);
        this.resizeCanvas();
    }

    resizeCanvas() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        
        // Adjust particle count based on screen size if responsive
        if (this.options.responsive) {
            const area = rect.width * rect.height;
            const baseArea = 1920 * 1080; // Base resolution
            const ratio = Math.min(area / baseArea, 1);
            this.currentParticleCount = Math.floor(this.options.particleCount * ratio);
        } else {
            this.currentParticleCount = this.options.particleCount;
        }
    }

    createParticles() {
        this.particles = [];
        
        for (let i = 0; i < this.currentParticleCount; i++) {
            this.particles.push(new Particle(
                Math.random() * this.canvas.width,
                Math.random() * this.canvas.height,
                this.options
            ));
        }
    }

    setupEventListeners() {
        // Mouse movement
        if (this.options.mouseInteraction) {
            this.container.addEventListener('mousemove', (e) => {
                const rect = this.container.getBoundingClientRect();
                this.mouse.x = e.clientX - rect.left;
                this.mouse.y = e.clientY - rect.top;
            });

            this.container.addEventListener('mouseleave', () => {
                this.mouse.x = -1000;
                this.mouse.y = -1000;
            });
        }

        // Window resize
        window.addEventListener('resize', this.debounce(() => {
            this.resizeCanvas();
            this.createParticles();
        }, 250));

        // Visibility change (pause when tab is not active)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pause();
            } else {
                this.resume();
            }
        });
    }

    setupIntersectionObserver() {
        // Pause animation when container is not visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                this.isVisible = entry.isIntersecting;
                if (!this.isVisible) {
                    this.pause();
                } else {
                    this.resume();
                }
            });
        }, { threshold: 0.1 });

        observer.observe(this.container);
    }

    animate() {
        if (!this.isVisible) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        this.particles.forEach(particle => {
            particle.update(this.canvas.width, this.canvas.height, this.mouse, this.options);
            particle.draw(this.ctx);
        });

        // Draw connections
        this.drawConnections();

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.options.connectionDistance) {
                    const opacity = 1 - (distance / this.options.connectionDistance);
                    this.ctx.strokeStyle = this.options.connectionColor.replace(/[\d\.]+\)$/g, `${opacity * 0.3})`);
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    pause() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    resume() {
        if (!this.animationId && this.isVisible) {
            this.animate();
        }
    }

    destroy() {
        this.pause();
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

class Particle {
    constructor(x, y, options) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * options.particleSpeed;
        this.vy = (Math.random() - 0.5) * options.particleSpeed;
        this.size = Math.random() * options.particleSize + 1;
        this.originalSize = this.size;
        this.color = options.particleColor;
        this.opacity = Math.random() * 0.5 + 0.5;
        this.originalOpacity = this.opacity;
        
        // Pulsing animation
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulsePhase = Math.random() * Math.PI * 2;
    }

    update(canvasWidth, canvasHeight, mouse, options) {
        // Move particle
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > canvasWidth) {
            this.vx *= -1;
            this.x = Math.max(0, Math.min(canvasWidth, this.x));
        }
        if (this.y < 0 || this.y > canvasHeight) {
            this.vy *= -1;
            this.y = Math.max(0, Math.min(canvasHeight, this.y));
        }

        // Mouse interaction
        if (options.mouseInteraction && mouse.x > -1000) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < options.mouseRadius) {
                const force = (options.mouseRadius - distance) / options.mouseRadius;
                const angle = Math.atan2(dy, dx);
                
                // Repel from mouse
                this.vx -= Math.cos(angle) * force * 0.5;
                this.vy -= Math.sin(angle) * force * 0.5;
                
                // Increase size and opacity near mouse
                this.size = this.originalSize * (1 + force * 0.5);
                this.opacity = this.originalOpacity * (1 + force * 0.3);
            } else {
                // Return to original size and opacity
                this.size += (this.originalSize - this.size) * 0.1;
                this.opacity += (this.originalOpacity - this.opacity) * 0.1;
            }
        }

        // Apply friction to velocity
        this.vx *= 0.99;
        this.vy *= 0.99;

        // Ensure minimum velocity
        if (Math.abs(this.vx) < 0.1) this.vx += (Math.random() - 0.5) * 0.1;
        if (Math.abs(this.vy) < 0.1) this.vy += (Math.random() - 0.5) * 0.1;

        // Pulsing animation
        this.pulsePhase += this.pulseSpeed;
        const pulse = Math.sin(this.pulsePhase) * 0.2 + 1;
        this.size = this.originalSize * pulse;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        
        ctx.restore();
    }
}

// Floating Shapes Animation
class FloatingShapes {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.options = {
            shapeCount: options.shapeCount || 6,
            shapes: options.shapes || ['circle', 'triangle', 'square'],
            colors: options.colors || ['rgba(37, 99, 235, 0.1)', 'rgba(6, 182, 212, 0.1)', 'rgba(139, 92, 246, 0.1)'],
            minSize: options.minSize || 20,
            maxSize: options.maxSize || 80,
            speed: options.speed || 0.3,
            ...options
        };

        this.shapes = [];
        this.init();
    }

    init() {
        this.createShapes();
        this.animate();
    }

    createShapes() {
        for (let i = 0; i < this.options.shapeCount; i++) {
            const shape = document.createElement('div');
            const shapeType = this.options.shapes[Math.floor(Math.random() * this.options.shapes.length)];
            const color = this.options.colors[Math.floor(Math.random() * this.options.colors.length)];
            const size = Math.random() * (this.options.maxSize - this.options.minSize) + this.options.minSize;
            
            shape.className = `floating-shape floating-${shapeType}`;
            shape.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: ${shapeType === 'circle' ? '50%' : shapeType === 'triangle' ? '0' : '10px'};
                pointer-events: none;
                z-index: 0;
                opacity: 0.6;
                animation: float-${i} ${15 + Math.random() * 10}s infinite linear;
            `;

            if (shapeType === 'triangle') {
                shape.style.background = 'transparent';
                shape.style.borderLeft = `${size/2}px solid transparent`;
                shape.style.borderRight = `${size/2}px solid transparent`;
                shape.style.borderBottom = `${size}px solid ${color}`;
                shape.style.width = '0';
                shape.style.height = '0';
            }

            this.container.appendChild(shape);
            this.shapes.push(shape);

            // Create unique animation for each shape
            this.createShapeAnimation(i, shape);
        }
    }

    createShapeAnimation(index, shape) {
        const keyframes = `
            @keyframes float-${index} {
                0% {
                    transform: translateY(100vh) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 0.6;
                }
                90% {
                    opacity: 0.6;
                }
                100% {
                    transform: translateY(-100px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;

        const style = document.createElement('style');
        style.textContent = keyframes;
        document.head.appendChild(style);

        // Random horizontal position
        shape.style.left = Math.random() * 100 + '%';
        
        // Random delay
        shape.style.animationDelay = Math.random() * 20 + 's';
    }

    destroy() {
        this.shapes.forEach(shape => {
            if (shape.parentNode) {
                shape.parentNode.removeChild(shape);
            }
        });
    }
}

// Gradient Animation
class GradientAnimation {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.options = {
            colors: options.colors || [
                'rgba(37, 99, 235, 0.1)',
                'rgba(6, 182, 212, 0.1)',
                'rgba(139, 92, 246, 0.1)',
                'rgba(16, 185, 129, 0.1)'
            ],
            duration: options.duration || 10,
            ...options
        };

        this.init();
    }

    init() {
        const gradientOverlay = document.createElement('div');
        gradientOverlay.className = 'gradient-animation';
        gradientOverlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, ${this.options.colors.join(', ')});
            background-size: 400% 400%;
            animation: gradientShift ${this.options.duration}s ease infinite;
            pointer-events: none;
            z-index: 0;
        `;

        this.container.appendChild(gradientOverlay);

        // Add animation keyframes
        const keyframes = `
            @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `;

        const style = document.createElement('style');
        style.textContent = keyframes;
        document.head.appendChild(style);
    }
}

// Initialize particle systems when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particles for hero section
    if (document.getElementById('particles')) {
        const heroParticles = new ParticleSystem('particles', {
            particleCount: 60,
            particleSize: 3,
            particleSpeed: 0.3,
            particleColor: 'rgba(37, 99, 235, 0.6)',
            connectionDistance: 100,
            connectionColor: 'rgba(37, 99, 235, 0.2)',
            mouseInteraction: true,
            mouseRadius: 120
        });

        // Add floating shapes
        const floatingShapes = new FloatingShapes('particles', {
            shapeCount: 4,
            shapes: ['circle', 'triangle'],
            colors: ['rgba(37, 99, 235, 0.05)', 'rgba(6, 182, 212, 0.05)'],
            minSize: 30,
            maxSize: 60,
            speed: 0.2
        });
    }

    // Initialize gradient animation for hero background
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        const gradientAnim = new GradientAnimation('hero', {
            colors: [
                'rgba(37, 99, 235, 0.05)',
                'rgba(6, 182, 212, 0.05)',
                'rgba(139, 92, 246, 0.05)',
                'rgba(16, 185, 129, 0.05)'
            ],
            duration: 15
        });
    }
});

// Export classes for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ParticleSystem, FloatingShapes, GradientAnimation };
}