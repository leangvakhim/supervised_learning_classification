// --- DATA & CONFIGURATION ---
const steps = [
    {
        shortTitle: "The Problem",
        title: "Linear Regression Fails for Classification",
        desc: "Imagine we want to predict if an email is spam (1) or not (0) based on word count. A straight line (Linear Regression) shoots past 1 and drops below 0. But probabilities must stay between 0% and 100% (0 and 1)!",
        action: "drawLinear"
    },
    {
        shortTitle: "The Sigmoid",
        title: "The Magic 'S' Curve",
        desc: "To fix this, we pass the straight line through a 'Sigmoid Function'. This mathematical magic perfectly squishes our outputs so they never go above 1 or below 0.",
        action: "drawSigmoid"
    },
    {
        shortTitle: "The Equation",
        title: "The Math Behind the Curve",
        desc: "Here is the actual equation that makes the S-Curve possible. It takes the output of our linear equation (mx + b) and turns it into a probability.",
        action: "showEquation"
    },
    {
        shortTitle: "The Threshold",
        title: "Making a Decision",
        desc: "Logistic Regression outputs a probability (e.g., 0.85). To make a final Yes/No decision, we draw a 'Threshold' line, usually at 0.5 (50%). Anything above is Class 1, anything below is Class 0.",
        action: "drawThreshold"
    },
    {
        shortTitle: "Playground",
        title: "Try it Yourself",
        desc: "Move the slider to change the input value. Watch how the probability changes along the S-curve, and see how the final classification updates based on the 0.5 threshold.",
        action: "drawInteractive"
    }
];

let currentStep = 0;
let interactiveValue = 0;
let animationFrameId;

// --- DOM ELEMENTS ---
const titleEl = document.getElementById('content-title');
const descEl = document.getElementById('content-desc');
const counterEl = document.getElementById('step-counter');
const progressBar = document.getElementById('progress-bar');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const stepTitlesEl = document.getElementById('step-titles');
const dotIndicatorsEl = document.getElementById('dot-indicators');

const canvas = document.getElementById('viz-canvas');
const ctx = canvas.getContext('2d');
const eqContainer = document.getElementById('equation-container');
const uiContainer = document.getElementById('interactive-ui');
const badgeContainer = document.getElementById('prediction-badge');
const xSlider = document.getElementById('x-slider');
const xValueText = document.getElementById('x-value');
const predProbText = document.getElementById('pred-prob');
const predClassText = document.getElementById('pred-class');

// Setup Steps UI
steps.forEach((step, i) => {
    // Top titles
    const titleSpan = document.createElement('span');
    titleSpan.className = `flex-1 text-center ${i === 0 ? 'text-blue-600' : ''}`;
    titleSpan.id = `title-span-${i}`;
    titleSpan.textContent = step.shortTitle;
    stepTitlesEl.appendChild(titleSpan);

    // Bottom dots
    const dot = document.createElement('div');
    dot.className = `w-2 h-2 rounded-full transition-colors ${i === 0 ? 'bg-blue-600' : 'bg-slate-200'}`;
    dot.id = `dot-${i}`;
    dotIndicatorsEl.appendChild(dot);
});

// --- DRAWING HELPER FUNCTIONS ---

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawAxes() {
    const width = canvas.width;
    const height = canvas.height;
    const originX = width / 2;
    const originY = height - 40;

    ctx.beginPath();
    ctx.strokeStyle = '#e2e8f0'; // slate-200
    ctx.lineWidth = 2;

    // X Axis
    ctx.moveTo(40, originY);
    ctx.lineTo(width - 40, originY);

    // Y Axis
    ctx.moveTo(originX, 20);
    ctx.lineTo(originX, height - 20);
    ctx.stroke();

    // Y Axis Labels (0 and 1)
    ctx.fillStyle = '#64748b'; // slate-500
    ctx.font = '14px Arial';
    ctx.textAlign = 'right';
    ctx.fillText('0', originX - 10, originY + 5);
    ctx.fillText('1', originX - 10, 45);

    // Dashed lines for boundaries
    ctx.beginPath();
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = '#f1f5f9';
    ctx.moveTo(40, 40); // y=1 line
    ctx.lineTo(width - 40, 40);
    ctx.stroke();
    ctx.setLineDash([]);
}

function drawDataPoints() {
    const width = canvas.width;
    const originX = width / 2;

    ctx.fillStyle = '#f59e0b'; // amber-500 (Class 0)
    for (let i = -8; i < -1; i += 1.5) {
        ctx.beginPath();
        ctx.arc(originX + i * 30, canvas.height - 40, 6, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.fillStyle = '#10b981'; // emerald-500 (Class 1)
    for (let i = 1; i < 8; i += 1.5) {
        ctx.beginPath();
        ctx.arc(originX + i * 30, 40, 6, 0, Math.PI * 2);
        ctx.fill();
    }
}

// --- SPECIFIC STEP RENDERERS ---

function drawLinear() {
    clearCanvas();
    drawAxes();
    drawDataPoints();

    const width = canvas.width;
    const height = canvas.height;
    const originX = width / 2;
    const originY = height - 40;

    // Draw Linear Line
    ctx.beginPath();
    ctx.strokeStyle = '#ef4444'; // red-500
    ctx.lineWidth = 3;
    // Line equation roughly y = mx + c mapping to canvas
    ctx.moveTo(originX - 150, originY + 50); // Starts below 0
    ctx.lineTo(originX + 150, -10); // Shoots past 1
    ctx.stroke();

    // Highlight error zones
    ctx.fillStyle = 'rgba(239, 68, 68, 0.1)';
    ctx.fillRect(40, 0, width - 80, 40); // Above 1 zone
    ctx.fillRect(40, originY, width - 80, height - originY); // Below 0 zone

    // Annotations
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText("Line goes above 1! (Prob > 100%?)", originX + 200, 30);
    ctx.fillText("Line drops below 0! (Prob < 0%?)", originX - 200, originY + 30);
}

function drawSigmoid(interactiveX = null, showThreshold = false) {
    clearCanvas();
    drawAxes();

    if (!interactiveX) drawDataPoints();

    const width = canvas.width;
    const height = canvas.height;
    const originX = width / 2;
    const originY = height - 40;
    const scaleX = 30; // Pixel per unit X
    const scaleY = originY - 40; // Pixel distance between y=0 and y=1

    // Draw Threshold Line
    if (showThreshold || interactiveX !== null) {
        ctx.beginPath();
        ctx.setLineDash([8, 6]);
        ctx.strokeStyle = '#94a3b8'; // slate-400
        ctx.lineWidth = 2;
        ctx.moveTo(40, originY - (scaleY * 0.5));
        ctx.lineTo(width - 40, originY - (scaleY * 0.5));
        ctx.stroke();
        ctx.setLineDash([]);

        if (showThreshold && interactiveX === null) {
            ctx.fillStyle = '#64748b';
            ctx.font = 'bold 14px Arial';
            ctx.textAlign = 'left';
            ctx.fillText("Threshold (0.5)", width - 150, originY - (scaleY * 0.5) - 10);
        }
    }

    // Draw Sigmoid Curve
    ctx.beginPath();
    ctx.strokeStyle = '#2563eb'; // blue-600
    ctx.lineWidth = 4;

    for (let px = 40; px <= width - 40; px++) {
        // Convert pixel X to math X
        let mathX = (px - originX) / scaleX;
        // Sigmoid formula
        let mathY = 1 / (1 + Math.exp(-mathX));
        // Convert math Y to pixel Y
        let py = originY - (mathY * scaleY);

        if (px === 40) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Draw Interactive Dot
    if (interactiveX !== null) {
        let mathY = 1 / (1 + Math.exp(-interactiveX));
        let px = originX + (interactiveX * scaleX);
        let py = originY - (mathY * scaleY);

        // Draw projection lines
        ctx.beginPath();
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = '#cbd5e1';
        ctx.moveTo(px, originY);
        ctx.lineTo(px, py);
        ctx.lineTo(originX, py);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw Dot
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fillStyle = mathY >= 0.5 ? '#10b981' : '#f59e0b';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Update Badges
        predProbText.textContent = (mathY * 100).toFixed(1) + '%';
        if (mathY >= 0.5) {
            predClassText.textContent = 'Class: 1 (Yes)';
            predClassText.className = 'text-sm font-semibold mt-1 px-2 py-1 rounded text-center bg-emerald-100 text-emerald-700';
        } else {
            predClassText.textContent = 'Class: 0 (No)';
            predClassText.className = 'text-sm font-semibold mt-1 px-2 py-1 rounded text-center bg-amber-100 text-amber-700';
        }
    }
}

// --- CONTROLLER ---

function updateUI() {
    const step = steps[currentStep];

    // Text updates with fade animation
    titleEl.classList.remove('fade-in');
    descEl.classList.remove('fade-in');
    void titleEl.offsetWidth; // trigger reflow
    titleEl.textContent = step.title;
    descEl.textContent = step.desc;
    titleEl.classList.add('fade-in');
    descEl.classList.add('fade-in');

    // Progress tracking updates
    counterEl.textContent = `Step ${currentStep + 1} of ${steps.length}`;
    progressBar.style.width = `${((currentStep + 1) / steps.length) * 100}%`;

    // Update labels & dots
    for (let i = 0; i < steps.length; i++) {
        document.getElementById(`title-span-${i}`).className = `flex-1 text-center transition-colors text-sm ${i <= currentStep ? 'text-blue-600 font-semibold' : 'text-slate-400 font-medium'}`;
        document.getElementById(`dot-${i}`).className = `w-2 h-2 rounded-full transition-colors ${i <= currentStep ? 'bg-blue-600' : 'bg-slate-200'}`;
    }

    // Button states
    btnPrev.disabled = currentStep === 0;
    if (currentStep === steps.length - 1) {
        btnNext.innerHTML = `Finish <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;
        btnNext.classList.replace('bg-blue-600', 'bg-emerald-600');
        btnNext.classList.replace('hover:bg-blue-700', 'hover:bg-emerald-700');
    } else {
        btnNext.innerHTML = `Next Step <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>`;
        btnNext.classList.replace('bg-emerald-600', 'bg-blue-600');
        btnNext.classList.replace('hover:bg-emerald-700', 'hover:bg-blue-700');
    }

    // View management
    canvas.style.display = 'block';
    eqContainer.classList.add('hidden');
    uiContainer.classList.add('hidden');
    badgeContainer.classList.add('hidden');

    // Execute specific step action
    if (step.action === 'drawLinear') {
        drawLinear();
    } else if (step.action === 'drawSigmoid') {
        drawSigmoid();
    } else if (step.action === 'showEquation') {
        canvas.style.display = 'none';
        eqContainer.classList.remove('hidden');
    } else if (step.action === 'drawThreshold') {
        drawSigmoid(null, true);
    } else if (step.action === 'drawInteractive') {
        uiContainer.classList.remove('hidden');
        badgeContainer.classList.remove('hidden');
        drawSigmoid(interactiveValue, true);
    }
}

// --- EVENT LISTENERS ---

btnNext.addEventListener('click', () => {
    if (currentStep < steps.length - 1) {
        currentStep++;
        updateUI();
    } else {
        currentStep.disabled = true;
        // Restart on finish
        // currentStep = 0;
        // updateUI();
    }
});

btnPrev.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        updateUI();
    }
});

xSlider.addEventListener('input', (e) => {
    interactiveValue = parseFloat(e.target.value);
    xValueText.textContent = interactiveValue.toFixed(1);
    if (steps[currentStep].action === 'drawInteractive') {
        drawSigmoid(interactiveValue, true);
    }
});

// Initialize
updateUI();