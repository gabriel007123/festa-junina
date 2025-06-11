
        const bandeirinhas = document.getElementById('bandeirinhas');
        for (let i = 0; i < 25; i++) {
            const flag = document.createElement('div');
            flag.className = 'flag';
            flag.style.background = i % 2 === 0 ? '#f7d51d' : '#3cbb54';
            bandeirinhas.appendChild(flag);
        }

        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const scoreEl = document.getElementById('score');
        const startBtn = document.getElementById('startBtn');

        let fishes = [];
        let score = 0;
        let gameRunning = false;
        let castY = 0;
        let casting = false;

        class Fish {
            constructor() {
                this.reset();
            }
            reset() {
                this.y = 300 + Math.random() * 80;
                this.x = Math.random() < 0.5 ? -50 : 650;
                this.speed = 2 + Math.random() * 2;
                if (this.x > 0) this.speed *= -1;
                this.size = 30;
            }
            draw() {
                ctx.fillStyle = '#ffb347';
                ctx.beginPath();
                ctx.ellipse(this.x, this.y, this.size, this.size * 0.6, 0, 0, Math.PI * 2);
                ctx.fill();
                // eye
                ctx.fillStyle = '#000';
                ctx.beginPath();
                ctx.arc(this.x + (this.speed > 0 ? -8 : 8), this.y - 3, 3, 0, Math.PI * 2);
                ctx.fill();
            }
            update() {
                this.x += this.speed;
                if (this.x < -60 || this.x > 660) this.reset();
            }
        }

        function init() {
            fishes = [];
            for (let i = 0; i < 6; i++) {
                fishes.push(new Fish());
            }
            score = 0;
            scoreEl.textContent = score;
            castY = 0;
            gameRunning = true;
            casting = false;
            requestAnimationFrame(gameLoop);
        }

        canvas.addEventListener('click', () => {
            if (!gameRunning) return;
            if (casting) return;
            casting = true;
            castY = 0;
        });

        function gameLoop() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // draw water surface
            ctx.fillStyle = '#ffffff55';
            ctx.fillRect(0, 0, canvas.width, 50);

            // draw fishes
            fishes.forEach(f => {
                f.update();
                f.draw();
            });

            // draw and update line
            if (casting) {
                castY += 8;
                ctx.strokeStyle = '#000';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(canvas.width / 2, 0);
                ctx.lineTo(canvas.width / 2, castY);
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(canvas.width / 2, castY, 6, 0, Math.PI * 2);
                ctx.fillStyle = '#d63d3d';
                ctx.fill();

                // check collision
                fishes.forEach(f => {
                    if (Math.abs(f.x - canvas.width / 2) < f.size && Math.abs(f.y - castY) < f.size) {
                        score++;
                        scoreEl.textContent = score;
                        f.reset();
                        casting = false;
                    }
                });

                // reset if line reaches bottom
                if (castY > canvas.height) {
                    casting = false;
                }
            }

            if (gameRunning) {
                requestAnimationFrame(gameLoop);
            }
        }

        startBtn.addEventListener('click', () => {
            init();
        });
