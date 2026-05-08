// --- Configuration & Data Setup ---
const canvas = document.getElementById('knnCanvas');
const ctx = canvas.getContext('2d');
const K_VALUE = 3;

// Training Data points
const points = [
    // Class A (Red)
    { x: 120, y: 150, class: 'A' }, { x: 160, y: 100, class: 'A' }, { x: 180, y: 190, class: 'A' },
    { x: 220, y: 130, class: 'A' }, { x: 110, y: 220, class: 'A' }, { x: 260, y: 110, class: 'A' },
    { x: 150, y: 260, class: 'A' }, { x: 200, y: 80, class: 'A' }, { x: 90, y: 110, class: 'A' },
    // Class B (Blue)
    { x: 420, y: 280, class: 'B' }, { x: 480, y: 220, class: 'B' }, { x: 380, y: 350, class: 'B' },
    { x: 500, y: 300, class: 'B' }, { x: 450, y: 170, class: 'B' }, { x: 340, y: 290, class: 'B' },
    { x: 410, y: 360, class: 'B' }, { x: 520, y: 250, class: 'B' }, { x: 370, y: 210, class: 'B' }
];

// The new unknown point we want to classify
const newPoint = { x: 300, y: 200 };

// Colors
const COLOR_A = '#ef4444'; // Red-500
const COLOR_B = '#3b82f6'; // Blue-500
const COLOR_UNKNOWN = '#64748b'; // Slate-500
const COLOR_LINE = '#cbd5e1'; // Slate-300
const COLOR_HIGHLIGHT = '#10b981'; // Emerald-500

// Pre-calculate distances and sort neighbors
points.forEach(p => {
    p.distance = Math.hypot(p.x - newPoint.x, p.y - newPoint.y);
});
const sortedNeighbors = [...points].sort((a, b) => a.distance - b.distance);
const kNearest = sortedNeighbors.slice(0, K_VALUE);

// Determine majority class
let countA = 0, countB = 0;
kNearest.forEach(n => n.class === 'A' ? countA++ : countB++);
const finalClass = countA > countB ? 'A' : 'B';
const finalColor = finalClass === 'A' ? COLOR_A : COLOR_B;


// --- Drawing Functions ---

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawDatasetPoints() {
    points.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = p.class === 'A' ? COLOR_A : COLOR_B;
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
    });
}

function drawUnknownPoint(color = COLOR_UNKNOWN, pulse = false) {
    ctx.beginPath();
    ctx.arc(newPoint.x, newPoint.y, 10, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Add a subtle ring for emphasis
    ctx.beginPath();
    ctx.arc(newPoint.x, newPoint.y, 16, 0, Math.PI * 2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.setLineDash(pulse ? [4, 4] : []);
    ctx.stroke();
    ctx.setLineDash([]); // Reset
}

function drawLinesToAll() {
    ctx.lineWidth = 1;
    points.forEach(p => {
        ctx.beginPath();
        ctx.moveTo(newPoint.x, newPoint.y);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = COLOR_LINE;
        ctx.stroke();
    });
}

function drawLinesToKNearest() {
    kNearest.forEach(p => {
        ctx.beginPath();
        ctx.moveTo(newPoint.x, newPoint.y);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = COLOR_HIGHLIGHT;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Highlight the neighbor points
        ctx.beginPath();
        ctx.arc(p.x, p.y, 12, 0, Math.PI * 2);
        ctx.strokeStyle = COLOR_HIGHLIGHT;
        ctx.lineWidth = 3;
        ctx.stroke();
    });
}

function drawRadiusCircle() {
    if (kNearest.length === 0) return;
    const radius = kNearest[kNearest.length - 1].distance;
    ctx.beginPath();
    ctx.arc(newPoint.x, newPoint.y, radius + 5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(16, 185, 129, 0.1)'; // Transparent emerald
    ctx.fill();
    ctx.strokeStyle = COLOR_HIGHLIGHT;
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.stroke();
    ctx.setLineDash([]); // Reset
}


// --- Steps Definition ---

const steps = [
    {
        title: "1. The Training Data",
        description: "KNN is a supervised learning algorithm. It starts with a dataset of already categorized data. Here we have two distinct groups: <span class='text-red-500 font-bold'>Red (Class A)</span> and <span class='text-blue-500 font-bold'>Blue (Class B)</span>.",
        showEquation: false,
        render: () => {
            clearCanvas();
            drawDatasetPoints();
        }
    },
    {
        title: "2. The New Data Point",
        description: "Imagine a brand new data point arrives (the <span class='text-slate-500 font-bold uppercase tracking-wider'>Grey</span> circle). Our goal is to predict which class this new point belongs to based on its surroundings.",
        showEquation: false,
        render: () => {
            clearCanvas();
            drawDatasetPoints();
            drawUnknownPoint(COLOR_UNKNOWN, true);
        }
    },
    {
        title: "3. The Math: How do we compare?",
        description: "To find out who the point's 'neighbors' are, we need to calculate the exact distance between our new point and <strong>every other point</strong> in the dataset.",
        showEquation: true,
        render: () => {
            clearCanvas();
            drawDatasetPoints();
            drawUnknownPoint(COLOR_UNKNOWN, true);
        }
    },
    {
        title: "4. Measuring Distances",
        description: "Using the Euclidean formula, the algorithm calculates straight-line distances to all existing training points to see who is closest.",
        showEquation: false,
        render: () => {
            clearCanvas();
            drawLinesToAll();
            drawDatasetPoints();
            drawUnknownPoint(COLOR_UNKNOWN);
        }
    },
    {
        title: "5. Finding the 'K' Nearest",
        description: `We choose a value for <strong>K</strong>. Let's set <strong>K = ${K_VALUE}</strong>. The algorithm identifies the ${K_VALUE} closest points (highlighted in green). Notice how the green circle only expands far enough to capture exactly ${K_VALUE} neighbors.`,
        showEquation: false,
        render: () => {
            clearCanvas();
            drawRadiusCircle();
            drawLinesToKNearest();
            drawDatasetPoints();
            drawUnknownPoint(COLOR_UNKNOWN);
        }
    },
    {
        title: "6. Majority Voting",
        description: `We count the classes of those ${K_VALUE} nearest neighbors. Here we have <strong>${countA} Red</strong> and <strong>${countB} Blue</strong>. Since ${countA > countB ? 'Red' : 'Blue'} is the majority, our new point is classified as <span style="color:${finalColor}" class="font-bold uppercase tracking-wider">${finalClass === 'A' ? 'Red' : 'Blue'}</span>!`,
        showEquation: false,
        render: () => {
            clearCanvas();
            drawRadiusCircle();
            drawLinesToKNearest();
            drawDatasetPoints();
            drawUnknownPoint(finalColor, true); // Update color to final result
        }
    }
];


// --- State Management & UI Updates ---

let currentStep = 0;
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');
const stepTitle = document.getElementById('stepTitle');
const stepDescription = document.getElementById('stepDescription');
const stepCounter = document.getElementById('stepCounter');
const equationBlock = document.getElementById('equationBlock');
const contentArea = document.getElementById('contentArea');

function updateUI() {
    // Fade out
    contentArea.style.opacity = 0;

    setTimeout(() => {
        const step = steps[currentStep];

        // Update text content
        stepTitle.innerHTML = step.title;
        stepDescription.innerHTML = step.description;
        stepCounter.innerText = `Step ${currentStep + 1} of ${steps.length}`;

        // Toggle Equation block
        if (step.showEquation) {
            equationBlock.classList.remove('hidden');
        } else {
            equationBlock.classList.add('hidden');
        }

        // Update Buttons
        btnPrev.disabled = currentStep === 0;

        if (currentStep === steps.length - 1) {
            btnNext.disabled = true;
            btnNext.innerHTML = 'Finished';
        } else {
            btnNext.disabled = false;
            btnNext.innerHTML = `Next Step
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>`;
        }

        // Render Canvas frame
        step.render();

        // Fade in
        contentArea.style.opacity = 1;
    }, 150); // Matches CSS transition duration
}

// Event Listeners
btnPrev.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        updateUI();
    }
});

btnNext.addEventListener('click', () => {
    if (currentStep < steps.length - 1) {
        currentStep++;
        updateUI();
    }
});

// Initialize first step
updateUI();