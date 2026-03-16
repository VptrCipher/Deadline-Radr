document.addEventListener('DOMContentLoaded', () => {

    // --- Particle Background Implementation ---
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.getElementById('particles').appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let particlesArray = [];
    const numberOfParticles = 70;
    
    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() * 0.4) - 0.2;
            this.speedY = (Math.random() * 0.4) - 0.2;
            this.color = Math.random() > 0.5 ? 'rgba(0, 240, 255, 0.4)' : 'rgba(138, 43, 226, 0.4)';
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
            // Connect close particles
            for(let j=i; j<particlesArray.length; j++) {
                const dx = particlesArray[i].x - particlesArray[j].x;
                const dy = particlesArray[i].y - particlesArray[j].y;
                const distance = Math.sqrt(dx*dx + dy*dy);
                if(distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - distance/1000})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    // --- State Management for Assignments ---
    let assignments = [
        { id: 1, title: 'Advanced Data Structures Project', category: 'programming', start: new Date(), due: new Date(new Date().getTime() + 1000 * 60 * 60 * 48), completed: false }, 
        { id: 2, title: 'Quantum Mechanics Problem Set', category: 'science', start: new Date(), due: new Date(new Date().getTime() + 1000 * 60 * 60 * 12), completed: false }, 
        { id: 3, title: 'Modern History Essay', category: 'humanities', start: new Date(), due: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 5), completed: false } 
    ];

    const categoryIcons = {
        math: 'ph-calculator',
        science: 'ph-atom',
        programming: 'ph-code',
        humanities: 'ph-book-open',
        other: 'ph-folder-notch'
    };

    function determineUrgency(dueDate) {
        const now = new Date();
        const diff = dueDate - now;
        const hoursLeft = diff / (1000 * 60 * 60);

        if (hoursLeft <= 24) return { class: 'urgent-glow', color: '#ff2a2a' };
        if (hoursLeft <= 72) return { class: 'warning-glow', color: '#ffc800' };
        return { class: 'safe-glow', color: '#00ff66' };
    }

    function formatTimeLeft(dueDate) {
        const now = new Date();
        const diff = DUE - now;
        if(diff < 0) return { main: '00:00:00', label: 'Overdue' };

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        if(d > 0) return { main: `${d}d ${h}h`, label: 'Time Left' };
        return { main: `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`, label: 'Time Left' };
    }
    
    function calculateProgress(startDate, dueDate) {
        const now = new Date();
        const start = startDate.getTime();
        const due = dueDate.getTime();
        const total = due - start;
        
        if (total <= 0) return 0; // Invalid range safeguard

        let elapsed = now.getTime() - start;
        if(elapsed < 0) elapsed = 0;
        if(elapsed > total) elapsed = total;
        
        // Progress percentage counting DOWN from 100 to 0 as time runs out
        return ((total - elapsed) / total) * 100;
    }

    window.toggleComplete = function(id) {
        const assig = assignments.find(a => a.id === id);
        if(assig) {
            assig.completed = !assig.completed;
            renderAssignments();
        }
    };

    window.deleteTask = function(id) {
        assignments = assignments.filter(a => a.id !== id);
        renderAssignments();
    };

    function renderAssignments() {
        const grid = document.getElementById('assignments-grid');
        grid.innerHTML = '';

        assignments.sort((a, b) => a.due - b.due).forEach(assignment => {
            const urgency = determineUrgency(assignment.due);
            const progress = calculateProgress(assignment.start, assignment.due);
            
            const card = document.createElement('div');
            // If completed, dim the card
            if (assignment.completed) {
                card.className = `glass-panel assignment-card safe-glow`;
                card.style.opacity = '0.4';
                card.style.setProperty('--status-color', '#fff'); // Uncolorize
            } else {
                card.className = `glass-panel assignment-card ${urgency.class}`;
                card.style.setProperty('--status-color', urgency.color);
            }
            
            card.dataset.id = assignment.id;
            card.dataset.start = assignment.start.getTime();
            card.dataset.due = assignment.due.getTime();
            card.style.setProperty('--progress', `${progress}%`);

            const icon = categoryIcons[assignment.category] || categoryIcons.other;
            const dueDateString = assignment.due.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

            card.innerHTML = `
                <div class="card-header">
                    <div class="card-category"><i class="ph ${icon}"></i> ${assignment.category.charAt(0).toUpperCase() + assignment.category.slice(1)}</div>
                    <button class="close-btn" style="font-size:1.2rem; cursor:pointer;" onclick="deleteTask(${assignment.id})"><i class="ph ph-trash"></i></button>
                </div>
                <h3 class="card-title" style="${assignment.completed ? 'text-decoration: line-through;' : ''}">${assignment.title}</h3>
                <div class="card-timer-wrapper">
                    <div class="circular-timer">
                        <div class="time-value countdown-display">${assignment.completed ? 'DONE' : '--:--'}</div>
                        <div class="time-label">${assignment.completed ? 'Completed' : 'Time Left'}</div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="due-date"><i class="ph ph-calendar-blank"></i> ${dueDateString}</div>
                    <button class="primary-btn glow-btn" style="padding: 6px 12px; font-size:0.8rem; background: ${assignment.completed ? 'var(--accent-green)' : ''}" onclick="toggleComplete(${assignment.id})">
                        <i class="ph ${assignment.completed ? 'ph-arrow-counter-clockwise' : 'ph-check'}"></i>
                    </button>
                </div>
            `;
            grid.appendChild(card);
        });

        setupHoverEffects();
        renderTimeline();
    }

    function renderTimeline() {
        const container = document.querySelector('.timeline-container');
        // Clear old items keeping the timeline line
        container.querySelectorAll('.timeline-item').forEach(e => e.remove());

        assignments.sort((a, b) => a.due - b.due).forEach(assignment => {
            const item = document.createElement('div');
            item.className = 'timeline-item';
            
            const urgency = determineUrgency(assignment.due);
            const formattedDate = assignment.due.toLocaleDateString();

            item.innerHTML = `
                <div class="timeline-dot" style="color: ${urgency.color}"></div>
                <div class="glass-panel timeline-content ${urgency.class}">
                    <h4 style="margin-bottom: 5px; color: ${urgency.color}">${assignment.title}</h4>
                    <p style="font-size: 0.9rem; color: rgba(255,255,255,0.7)">Due: ${formattedDate}</p>
                </div>
            `;
            container.appendChild(item);
        });
        
        // Re-init GSAP ScrollTriggers for new timeline items
        gsap.utils.toArray('.timeline-item').forEach(item => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                x: item.style.justifyContent === 'flex-start' ? -50 : 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });
        });
    }

    // --- Dynamic Timer Loop ---
    setInterval(() => {
        const now = new Date();
        document.querySelectorAll('.assignment-card').forEach(card => {
            const isCompleted = card.querySelector('.countdown-display').innerText === 'DONE';
            if (isCompleted) return;

            const dueTime = new Date(parseInt(card.dataset.due));
            const diff = dueTime - now;
            
            const display = card.querySelector('.countdown-display');
            if(diff <= 0) {
                display.innerText = "00:00:00";
                return;
            }

            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);

            if(d > 0) {
                display.innerText = `${d}d ${h}h`;
            } else {
                display.innerText = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
            }
            
            // Re-eval urgency class
            const startTime = new Date(parseInt(card.dataset.start));
            const total = dueTime - startTime; 
            let elapsed = now - startTime;
            if(elapsed < 0) elapsed = 0;
            if(elapsed > total) elapsed = total;
            let percent = ((total - elapsed) / total) * 100;
            card.style.setProperty('--progress', `${percent}%`);
        });
    }, 1000);

    // --- 3D Hover/Tilt Effects ---
    function setupHoverEffects() {
        const cards = document.querySelectorAll('.assignment-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -10; // Max tilt 10deg
                const rotateY = ((x - centerX) / centerX) * 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                
                // Add a dynamic glare reflection
                card.style.boxShadow = `${-rotateY}px ${rotateX}px 30px rgba(0,0,0,0.5), inset ${rotateY * 0.5}px ${-rotateX * 0.5}px 30px rgba(255,255,255,0.1)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                card.style.boxShadow = `var(--glass-shadow)`;
            });
        });
    }

    // --- Modal Logic ---
    const modal = document.getElementById('add-modal');
    const openBtns = document.querySelectorAll('.glow-btn, a[href="#add-assignment"]'); // New Task buttons AND nav link
    const closeBtn = document.getElementById('close-modal');
    const form = document.getElementById('task-form');

    openBtns.forEach(btn => {
        // Remove the text check since the anchor link doesn't have "New Task" text
        btn.addEventListener('click', (e) => {
            if(btn.tagName.toLowerCase() === 'a') e.preventDefault();
            modal.classList.add('active');
        });
    });

    // Fix the dashboard link scroll override
    document.querySelector('a[href="#dashboard"]').addEventListener('click', (e) => {
        e.preventDefault();
        const dest = document.getElementById('dashboard');
        window.scrollTo({
            top: dest.offsetTop - 80, // offset nav height
            behavior: 'smooth'
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('task-title').value;
        const category = document.getElementById('task-category').value;
        const start = new Date(document.getElementById('task-start').value);
        let due = new Date(document.getElementById('task-due').value);
        
        // If due date was passed without a time from input=date, it resets cleanly.
        // Let's set time to 23:59:59 default for end of day deadline
        due.setHours(23, 59, 59);

        assignments.push({
            id: Date.now(),
            title,
            category,
            start,
            due,
            completed: false
        });
        
        renderAssignments();
        modal.classList.remove('active');
        form.reset();
    });

    // --- GSAP Animations ---
    gsap.registerPlugin(ScrollTrigger);
    
    // Initial Render
    renderAssignments();

    // Animate Hero Section
    gsap.from(".hero-title", {opacity: 0, y: 50, duration: 1, delay: 0.2});
    gsap.from(".hero-subtitle", {opacity: 0, y: 30, duration: 1, delay: 0.4});
    gsap.from(".hero-cta", {opacity: 0, y: 30, duration: 1, delay: 0.6});
    
    // Dashboard Scroll Anims
    gsap.from(".dashboard-header", {
        scrollTrigger: {
            trigger: "#dashboard",
            start: "top 80%",
        },
        opacity: 0,
        y: 50,
        duration: 0.8
    });

    gsap.from(".assignment-card", {
        scrollTrigger: {
            trigger: ".assignments-grid",
            start: "top 80%",
        },
        opacity: 0,
        y: 100,
        rotationX: -20,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.7)"
    });

});
