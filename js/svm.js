// --- DATA & STATE ---
const canvas = document.getElementById('svmCanvas');
const ctx = canvas.getContext('2d');

// Logical coordinates (0 to 10)
// Optimal line will be y = -x + 10 (or x + y = 10)
const bluePoints = [
    { x: 2, y: 3 }, { x: 3, y: 2 }, { x: 2, y: 5 }, { x: 4, y: 2 },
    { x: 5, y: 4 }, { x: 4, y: 5 } // Support vectors for Blue (x+y = 9)
];

const redPoints = [
    { x: 8, y: 7 }, { x: 7, y: 8 }, { x: 9, y: 5 }, { x: 6, y: 9 },
    { x: 6, y: 5 }, { x: 5, y: 6 } // Support vectors for Red (x+y = 11)
];

let currentStep = 0;

// Content for each step
const steps = [
    {
        title: "1. Meet the Data",
        desc: "<p>Imagine we have two types of data points plotted on a graph: <b>Class A (Blue)</b> and <b>Class B (Red)</b>.</p><p class='mt-2'>In Machine Learning, our goal is to create a model that can perfectly separate these two classes so that when new data arrives, we know exactly which group it belongs to.</p>"
    },
    {
        title: "2. The Separation Problem",
        desc: "<p>We need to draw a straight line (a <i>hyperplane</i>) to separate the blues from the reds.</p><p class='mt-2'>As you can see, there are <b>many</b> different lines we could draw that successfully separate the data. But which line is the absolute <i>best</i> one to choose?</p>"
    },
    {
        title: "3. The Optimal Hyperplane",
        desc: "<p>SVM solves this by finding the <b>Optimal Hyperplane</b>.</p><p class='mt-2'>It doesn't just draw any line; it draws the line that stays as far away from the closest points of both classes as possible. The distance between the line and the dashed lines is called the <b>Margin</b>.</p><p class='mt-2'>SVM maximizes this margin.</p>"
    },
    {
        title: "4. Support Vectors",
        desc: "<p>Notice the points highlighted with a yellow ring? These are the points that lie exactly on the edge of the margin.</p><p class='mt-2'>They are called <b>Support Vectors</b>. They are incredibly important because they literally 'support' the margin. If you deleted all the other points, the separating line wouldn't change at all!</p>"
    },
    {
        title: "5. The Mathematics",
        desc: `<p>How does the math work? The central line (Hyperplane) is defined by an equation where weights (<b>w</b>) and bias (<i>b</i>) equal zero:</p>
                <div class="bg-indigo-50 text-indigo-900 p-3 rounded-lg border border-indigo-100 mt-3 text-center font-serif text-lg shadow-inner">
                    <b>w</b> &middot; <b>x</b> + b = 0
                </div>
                <p class="mt-3 text-sm">The margins are defined by equations equaling +1 and -1:</p>
                <ul class="text-sm list-disc pl-5 mt-1 space-y-1">
                    <li>Class B Margin: <span class="font-serif text-red-600"><b>w</b> &middot; <b>x</b> + b = 1</span></li>
                    <li>Class A Margin: <span class="font-serif text-blue-600"><b>w</b> &middot; <b>x</b> + b = -1</span></li>
                </ul>
                <p class="mt-3 text-sm font-medium">To maximize the margin, the SVM algorithm's goal is to minimize the size of the weight vector <b>w</b>.</p>`
    }
];

// --- DRAWING HELPERS ---
// Map logical coordinates (0-10) to canvas coordinates (600x400)
// Leave a little padding
const padX = 50;
const padY = 50;
const width = 600 - padX * 2;
const height = 400 - padY * 2;

function mapX(logicalX) {
    return padX + (logicalX / 10) * width;
}

function mapY(logicalY) {
    // Invert Y so 0 is at bottom
    return padY + height - (logicalY / 10) * height;
}

function drawGrid() {
    ctx.strokeStyle = '#f1f5f9'; // slate-100
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
        // Vertical lines
        ctx.beginPath();
        ctx.moveTo(mapX(i), mapY(0));
        ctx.lineTo(mapX(i), mapY(10));
        ctx.stroke();
        // Horizontal lines
        ctx.beginPath();
        ctx.moveTo(mapX(0), mapY(i));
        ctx.lineTo(mapX(10), mapY(i));
        ctx.stroke();
    }
}

function drawPoint(x, y, color, highlight = false) {
    const cx = mapX(x);
    const cy = mapY(y);

    if (highlight) {
        // Draw yellow halo for support vectors
        ctx.beginPath();
        ctx.arc(cx, cy, 12, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(250, 204, 21, 0.4)'; // yellow-400 with opacity
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#eab308'; // yellow-500
        ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

    // Add slight 3D effect / stroke
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
}

function drawLine(lx1, ly1, lx2, ly2, color, width, dash = []) {
    ctx.beginPath();
    ctx.setLineDash(dash);
    ctx.moveTo(mapX(lx1), mapY(ly1));
    ctx.lineTo(mapX(lx2), mapY(ly2));
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.setLineDash([]); // Reset dash
}

// --- RENDER LOGIC ---
function updateUI() {
    // Update Text
    document.getElementById('stepIndicator').innerText = `Step ${currentStep + 1} of ${steps.length}`;
    document.getElementById('stepTitle').innerText = steps[currentStep].title;

    const descEl = document.getElementById('stepDescription');
    descEl.style.opacity = 0;
    setTimeout(() => {
        descEl.innerHTML = steps[currentStep].desc;
        descEl.style.opacity = 1;
    }, 150);

    // Update Buttons
    document.getElementById('btnPrev').disabled = currentStep === 0;
    document.getElementById('btnNext').disabled = currentStep === steps.length - 1;

    // Update Dots
    const dotsContainer = document.getElementById('dotIndicators');
    dotsContainer.innerHTML = '';
    for (let i = 0; i < steps.length; i++) {
        const dot = document.createElement('div');
        dot.className = `w-2 h-2 rounded-full transition-colors ${i === currentStep ? 'bg-indigo-600' : 'bg-slate-200'}`;
        dotsContainer.appendChild(dot);
    }

    drawVisualization();
}

function drawVisualization() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawGrid();

    // STEP 1: Just Points
    if (currentStep === 0) {
        bluePoints.forEach(p => drawPoint(p.x, p.y, '#3b82f6')); // blue-500
        redPoints.forEach(p => drawPoint(p.x, p.y, '#ef4444'));  // red-500
    }

    // STEP 2: Points + Random Lines
    else if (currentStep === 1) {
        // Random line 1
        drawLine(0, 6, 10, 4, '#cbd5e1', 2); // slate-300
        // Random line 2
        drawLine(2, 10, 8, 0, '#cbd5e1', 2);
        // Random line 3
        drawLine(0, 10, 10, 0, '#94a3b8', 2);

        bluePoints.forEach(p => drawPoint(p.x, p.y, '#3b82f6'));
        redPoints.forEach(p => drawPoint(p.x, p.y, '#ef4444'));
    }

    // STEP 3: Optimal Line + Margins
    else if (currentStep >= 2) {
        // The optimal hyperplane (x + y = 10)
        drawLine(0, 10, 10, 0, '#1e293b', 3); // slate-800

        // The margins (x + y = 9 and x + y = 11)
        drawLine(0, 9, 9, 0, '#64748b', 2, [5, 5]); // slate-500 dashed
        drawLine(1, 10, 10, 1, '#64748b', 2, [5, 5]);

        // Draw points (Highlight support vectors if step 3 or 4)
        const highlightSV = currentStep >= 3;

        bluePoints.forEach(p => {
            // Check if it's a support vector (x+y=9)
            const isSV = (p.x + p.y === 9);
            drawPoint(p.x, p.y, '#3b82f6', highlightSV && isSV);
        });

        redPoints.forEach(p => {
            // Check if it's a support vector (x+y=11)
            const isSV = (p.x + p.y === 11);
            drawPoint(p.x, p.y, '#ef4444', highlightSV && isSV);
        });

        // Add enhanced equation text on canvas for final step
        if (currentStep === 4) {
            // Calculate the exact visual angle of the lines on the canvas
            const angle = Math.atan2(mapY(0) - mapY(10), mapX(10) - mapX(0));

            function drawEquation(text, logX, logY, color, isBold) {
                ctx.save();
                ctx.translate(mapX(logX), mapY(logY));
                ctx.rotate(angle);

                ctx.font = `${isBold ? 'bold ' : 'italic '}20px serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                // Draw a semi-transparent white background "pill" to make text pop against lines
                const textWidth = ctx.measureText(text).width;
                const padX = 12;
                const padY = 6;

                ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                ctx.beginPath();
                ctx.roundRect(-textWidth / 2 - padX, -10 - padY, textWidth + padX * 2, 20 + padY * 2, 8);
                ctx.fill();

                // Draw the text
                ctx.fillStyle = color;
                ctx.fillText(text, 0, 0);

                ctx.restore();
            }

            // Draw main hyperplane equation perfectly centered
            drawEquation('w · x + b = 0', 5, 5, '#1e293b', true);

            // Draw margin equations spaced out diagonally along the lines so they don't overlap vertically
            // Blue class (-1 margin) at logical coordinate (3.5, 5.5)
            drawEquation('w · x + b = -1', 3.5, 5.5, '#2563eb', false);

            // Red class (+1 margin) at logical coordinate (6.5, 4.5)
            drawEquation('w · x + b = 1', 6.5, 4.5, '#dc2626', false);
        }
    }
}

// --- EVENT LISTENERS ---
document.getElementById('btnNext').addEventListener('click', () => {
    if (currentStep < steps.length - 1) {
        currentStep++;
        updateUI();
    }
});

document.getElementById('btnPrev').addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        updateUI();
    }
});

// Add CSS transition utility class via JS for smooth fading
document.getElementById('stepDescription').classList.add('step-transition');

// Initial Render
updateUI();