// --- DATA & CONTENT ---

// Mock dataset: Hours studied (x) vs Exam Result (y) [0 = Fail, 1 = Pass]
const studentData = [
    { hours: 1, passed: 0 },
    { hours: 1.5, passed: 0 },
    { hours: 2.5, passed: 0 },
    { hours: 3, passed: 0 },
    { hours: 4, passed: 0 },
    { hours: 5.5, passed: 1 },
    { hours: 6, passed: 1 },
    { hours: 7, passed: 1 },
    { hours: 8.5, passed: 1 },
    { hours: 9, passed: 1 },
];

const steps = [
    {
        title: "1. The Classification Problem",
        description: `
            <p>In Machine Learning, <b>Supervised Learning</b> means we train a model using examples that already have the answers (labels).</p>
            <p><b>Classification</b> is a type of supervised learning where we want to predict a category (a discrete value). The simplest form is <b>Binary Classification</b>, where there are only two outcomes.</p>
            <div class="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r-md mt-4">
                <strong class="text-blue-800">Real World Example:</strong>
                <p class="text-blue-900 mt-1">Imagine predicting if a student will <b>Pass (1)</b> or <b>Fail (0)</b> an exam based on how many hours they studied.</p>
            </div>
            <p class="mt-4">Look at the graph. The x-axis is Hours Studied, and the y-axis is the Result (0 or 1).</p>
        `,
        latex: `$$ y \\in \\{0, 1\\} $$`,
        vizMode: 'data_only'
    },
    {
        title: "2. Why Linear Regression Fails",
        description: `
            <p>Our goal is to draw a line that separates the passes from the fails. What if we use standard <b>Linear Regression</b>?</p>
            <p>Linear regression fits a straight line: $\\hat{y} = wx + b$.</p>
            <p><b>The Problem:</b> Probabilities must be between 0 and 1 (or 0% and 100%). A straight line extends infinitely. As you can see on the graph, for someone who studied 9 hours, the model predicts a value greater than 1. For 0 hours, it predicts less than 0. This doesn't make sense for classification!</p>
        `,
        latex: `$$ \\text{Linear Model: } \\hat{y} = wx + b $$<br>$$ \\text{Issue: } \\hat{y} \\notin [0, 1] $$`,
        vizMode: 'linear'
    },
    {
        title: "3. The Magic of the Sigmoid Function",
        description: `
            <p>To fix this, we need a mathematical function that takes any number (from $-\\infty$ to $+\\infty$) and "squashes" it to be strictly between <b>0 and 1</b>.</p>
            <p>Enter the <b>Sigmoid Function</b> (or Logistic Function), denoted by $\\sigma$ (sigma).</p>
            <p>No matter how large or small the input $z$ is, the output will curve gracefully and never cross 0 or 1, forming a beautiful 'S' shape.</p>
        `,
        latex: `$$ \\text{Sigmoid: } \\sigma(z) = \\frac{1}{1 + e^{-z}} $$`,
        vizMode: 'pure_sigmoid'
    },
    {
        title: "4. Logistic Regression Formula",
        description: `
            <p>Now we combine them! We take the linear equation ($wx + b$) and pass it <i>through</i> the Sigmoid function.</p>
            <p>Instead of predicting the exact class, Logistic Regression predicts the <b>probability</b> that the answer is 1 (Pass).</p>
            <p>If $x$ is 6 hours, the output $\\hat{y}$ might be $0.85$. This means the model thinks there is an 85% chance the student passes.</p>
        `,
        latex: `$$ \\text{Model: } \\hat{y} = \\sigma(wx + b) $$ <br> $$ \\hat{y} = \\frac{1}{1 + e^{-(wx + b)}} $$`,
        vizMode: 'logistic_curve'
    },
    {
        title: "5. The Decision Boundary",
        description: `
            <p>We have a probability between 0 and 1, but we need a final Pass/Fail answer. We do this by setting a <b>Threshold</b>, usually at $0.5$ (50%).</p>
            <ul class="list-disc pl-5 mt-2 space-y-1">
                <li>If $\\hat{y} \\ge 0.5$, predict <b>Pass (1)</b></li>
                <li>If $\\hat{y} &lt; 0.5$, predict <b>Fail (0)</b></li>
            </ul>
            <p class="mt-4">The vertical dashed line shows the <b>Decision Boundary</b> on the x-axis. Any student studying more than this threshold is predicted to pass.</p>
        `,
        latex: `$$ \\text{Predict } 1 \\text{ if } P(y=1|x) \\ge 0.5 $$ $$ \\text{Predict } 0 \\text{ if } P(y=1|x) &lt; 0.5 $$`,
        vizMode: 'decision_boundary'
    },
    {
        title: "6. Interactive Experiment",
        description: `
            <p>Now it's your turn! Adjust the weights and bias to see how they affect the Logistic Regression curve.</p>
            <ul class="list-disc pl-5 mt-2 space-y-2">
                <li><b>Weight ($w$):</b> Controls how steep the 'S' curve is. Higher weight means a sharper transition.</li>
                <li><b>Bias ($b$):</b> Shifts the curve left or right, changing where the 50% decision boundary lies.</li>
            </ul>
            <p class="mt-4 font-semibold text-blue-700">Try to fit the curve to the student data points as best as you can!</p>
        `,
        latex: `$$ \\hat{y} = \\frac{1}{1 + e^{-(\\mathbf{w}x + \\mathbf{b})}} $$`,
        vizMode: 'interactive'
    },
    {
        title: "7. Doing it in Python (scikit-learn)",
        description: `
        <p>In the real world, you don't adjust sliders manually! We use Python libraries like <b>scikit-learn</b> to find the perfect formula instantly.</p>

        <pre class="bg-slate-800 text-slate-50 p-4 rounded-xl mt-4 mb-4 overflow-x-auto text-sm font-mono leading-relaxed shadow-inner whitespace-pre"><code><span class="text-pink-400">from</span> sklearn.linear_model <span class="text-pink-400">import</span> LogisticRegression
<span class="text-pink-400">import</span> numpy <span class="text-pink-400">as</span> np

<span class="text-slate-400"># 1. Prepare Data</span>
X = np.array([[1], [3], [4], [6], [7], [9]]) <span class="text-slate-400"># Hours studied</span>
y = np.array([0, 0, 0, 1, 1, 1])             <span class="text-slate-400"># 0 = Fail, 1 = Pass</span>

<span class="text-slate-400"># 2. Create the model</span>
model = LogisticRegression()

<span class="text-slate-400"># 3. Train the model (Math happens here!)</span>
model.fit(X, y)

<span class="text-slate-400"># 4. Predict for a student who studied 6 hours</span>
prediction = model.predict([[6]])

<span class="text-blue-300">print</span>(<span class="text-yellow-300">f"Prediction: {prediction}"</span>) <span class="text-slate-400"># Result: [1] (Pass)</span></code></pre>

        <ul class="list-disc pl-5 mt-2 space-y-2">
            <li><b>model.fit(X, y):</b> This is the most important step! The algorithm automatically looks at the data and finds the absolute best <b>Weight ($w$)</b> and <b>Bias ($b$)</b> to fit the S-curve.</li>
            <li><b>model.predict():</b> Once trained, the model uses the threshold (usually 0.5) to instantly tell us if a new data point falls on the Pass or Fail side.</li>
        </ul>
    `,
        latex: `$$ \\text{scikit-learn } \\texttt{.fit()} \\rightarrow \\text{finds best } w, b $$`,
        vizMode: 'decision_boundary'
    }
];

// --- APP STATE ---
let currentStep = 0;
let canvas, ctx;
let interactiveW = 1.6;
let interactiveB = -7;

// --- DOM ELEMENTS ---
const elTitle = document.getElementById('step-title');
const elDesc = document.getElementById('step-description');
const elMath = document.getElementById('step-math');
const elCounter = document.getElementById('step-counter');
const elProgress = document.getElementById('progress-bar');
const btnNext = document.getElementById('btn-next');
const btnBack = document.getElementById('btn-back');
const controlsArea = document.getElementById('interactive-controls');
const sliderW = document.getElementById('slider-w');
const sliderB = document.getElementById('slider-b');
const valW = document.getElementById('val-w');
const valB = document.getElementById('val-b');

// --- INITIALIZATION ---
function initApp() {
    canvas = document.getElementById('vizCanvas');
    ctx = canvas.getContext('2d');

    // Resize canvas to physical pixels to avoid blurriness
    resizeCanvas();
    window.addEventListener('resize', () => {
        resizeCanvas();
        drawVisualization();
    });

    // Event Listeners
    btnNext.addEventListener('click', () => changeStep(1));
    btnBack.addEventListener('click', () => changeStep(-1));

    sliderW.addEventListener('input', (e) => {
        interactiveW = parseFloat(e.target.value);
        valW.textContent = interactiveW.toFixed(1);
        drawVisualization();
        updateMathJaxInteractive();
    });

    sliderB.addEventListener('input', (e) => {
        interactiveB = parseFloat(e.target.value);
        valB.textContent = interactiveB.toFixed(1);
        drawVisualization();
        updateMathJaxInteractive();
    });

    renderStep();
}

function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    // Set actual internal dimensions
    canvas.width = rect.width;
    canvas.height = rect.height;
}

// --- LOGIC ---
function changeStep(dir) {
    currentStep += dir;
    if (currentStep < 0) currentStep = 0;
    if (currentStep >= steps.length) currentStep = steps.length - 1;

    // Temporarily hide math elements for smooth transition
    document.body.classList.remove('math-ready');
    setTimeout(renderStep, 50); // slight delay to allow fade out
}

function renderStep() {
    const step = steps[currentStep];

    // Update UI text
    elTitle.textContent = step.title;
    elDesc.innerHTML = step.description;

    // Update Progress
    elCounter.textContent = `Step ${currentStep + 1} of ${steps.length}`;
    elProgress.style.width = `${((currentStep) / (steps.length - 1)) * 100}%`;

    // Button states
    btnBack.disabled = currentStep === 0;
    btnNext.disabled = currentStep === steps.length - 1;

    // Interactive controls visibility
    if (step.vizMode === 'interactive') {
        controlsArea.classList.remove('hidden');
        sliderW.value = interactiveW;
        sliderB.value = interactiveB;
        updateMathJaxInteractive();
    } else {
        controlsArea.classList.add('hidden');
        // Standard MathJax rendering
        elMath.innerHTML = step.latex;
        renderMathJax();
    }

    // Recalculate canvas size in case the layout changed (like controls appearing)
    resizeCanvas();
    drawVisualization();
}

// --- MATHJAX RENDERING ---
function renderMathJax() {
    if (window.mathJaxReady) {
        // Ensure MathJax scans both the description (for inline text) and the main math block
        MathJax.typesetClear([elDesc, elMath]);
        MathJax.typesetPromise([elDesc, elMath]).then(() => {
            // Fade it back in after rendering is complete
            document.body.classList.add('math-ready');
        });
    }
}

function updateMathJaxInteractive() {
    let sign = interactiveB >= 0 ? '+' : '-';
    let latexStr = `$$ \\hat{y} = \\frac{1}{1 + e^{-(${interactiveW.toFixed(1)}x ${sign} ${Math.abs(interactiveB).toFixed(1)})}} $$`;
    elMath.innerHTML = latexStr;
    renderMathJax();
}

// --- CANVAS DRAWING FUNCTIONS ---

// Helper: Map data coordinates (X:0-10, Y:-0.2 to 1.2) to Canvas pixels
function mapX(x) {
    const padding = 40;
    return padding + (x / 10) * (canvas.width - padding * 2);
}

function mapY(y) {
    const padding = 40;
    // Invert Y because canvas Y goes down
    // Range is -0.2 to 1.2 to give space above 1 and below 0
    const yRange = 1.4;
    const yOffset = 0.2;
    return canvas.height - padding - ((y + yOffset) / yRange) * (canvas.height - padding * 2);
}

function drawAxes() {
    ctx.beginPath();
    ctx.strokeStyle = '#cbd5e1'; // slate-300
    ctx.lineWidth = 2;

    // X Axis (at y=0)
    ctx.moveTo(mapX(0), mapY(0));
    ctx.lineTo(mapX(10.5), mapY(0));

    // Y Axis (at x=0)
    ctx.moveTo(mapX(0), mapY(-0.2));
    ctx.lineTo(mapX(0), mapY(1.2));
    ctx.stroke();

    // Labels
    ctx.fillStyle = '#64748b'; // slate-500
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    // X-axis ticks (Hours)
    for (let i = 0; i <= 10; i += 2) {
        ctx.fillText(i, mapX(i), mapY(0) + 8);
        // tick mark
        ctx.beginPath();
        ctx.moveTo(mapX(i), mapY(0));
        ctx.lineTo(mapX(i), mapY(0) + 4);
        ctx.stroke();
    }
    ctx.fillText("Hours Studied", mapX(5), mapY(0) + 25);

    // Y-axis ticks (Probability/Class)
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    [0, 0.5, 1].forEach(tick => {
        ctx.fillText(tick, mapX(0) - 8, mapY(tick));
        ctx.beginPath();
        ctx.moveTo(mapX(0) - 4, mapY(tick));
        ctx.lineTo(mapX(0), mapY(tick));
        ctx.stroke();
    });

    ctx.save();
    ctx.translate(mapX(0) - 25, mapY(0.5));
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.fillText("Result (Fail/Pass)", 0, 0);
    ctx.restore();

    // Horizontal reference lines for 1 and 0
    ctx.beginPath();
    ctx.strokeStyle = '#e2e8f0'; // slate-200
    ctx.setLineDash([5, 5]);
    ctx.moveTo(mapX(0), mapY(1));
    ctx.lineTo(mapX(10), mapY(1));
    ctx.stroke();
    ctx.setLineDash([]);
}

function drawDataPoints() {
    studentData.forEach(pt => {
        ctx.beginPath();
        ctx.arc(mapX(pt.hours), mapY(pt.passed), 6, 0, Math.PI * 2);

        if (pt.passed === 1) {
            ctx.fillStyle = '#22c55e'; // green-500
            ctx.strokeStyle = '#16a34a'; // green-600
        } else {
            ctx.fillStyle = '#ef4444'; // red-500
            ctx.strokeStyle = '#dc2626'; // red-600
        }

        ctx.fill();
        ctx.lineWidth = 1;
        ctx.stroke();
    });
}

function drawLineFunction(w, b, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;

    // Draw line across visible X range
    let xStart = 0;
    let yStart = w * xStart + b;

    let xEnd = 10;
    let yEnd = w * xEnd + b;

    ctx.moveTo(mapX(xStart), mapY(yStart));
    ctx.lineTo(mapX(xEnd), mapY(yEnd));
    ctx.stroke();
}

function drawSigmoidFunction(w, b, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;

    for (let x = 0; x <= 10; x += 0.1) {
        let z = (w * x) + b;
        let y = 1 / (1 + Math.exp(-z));

        if (x === 0) {
            ctx.moveTo(mapX(x), mapY(y));
        } else {
            ctx.lineTo(mapX(x), mapY(y));
        }
    }
    ctx.stroke();
}

function drawVisualization() {
    if (!canvas || !ctx) return;
    const mode = steps[currentStep].vizMode;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawAxes();

    const idealW = 1.6;
    const idealB = -7;

    switch (mode) {
        case 'data_only':
            drawDataPoints();
            break;
        case 'linear':
            // Linear Regression attempt: y = 0.12x - 0.1 (approx fit)
            drawLineFunction(0.13, -0.15, '#ef4444');
            drawDataPoints();
            break;
        case 'pure_sigmoid':
            // Draw a centered sigmoid (w=1, b=-5 so center is at x=5)
            drawSigmoidFunction(1.5, -7.5, '#3b82f6');
            break;
        case 'logistic_curve':
            drawSigmoidFunction(idealW, idealB, '#3b82f6');
            drawDataPoints();
            break;
        case 'decision_boundary':
            drawSigmoidFunction(idealW, idealB, '#93c5fd'); // Lighter blue
            drawDataPoints();

            // Threshold horizontal line
            ctx.beginPath();
            ctx.strokeStyle = '#f59e0b'; // amber-500
            ctx.setLineDash([4, 4]);
            ctx.lineWidth = 2;
            ctx.moveTo(mapX(0), mapY(0.5));
            ctx.lineTo(mapX(10), mapY(0.5));
            ctx.stroke();
            ctx.setLineDash([]);

            // Boundary vertical line (where w*x+b = 0 -> x = -b/w)
            let decisionX = -idealB / idealW;
            ctx.beginPath();
            ctx.strokeStyle = '#3b82f6'; // blue-500
            ctx.setLineDash([4, 4]);
            ctx.lineWidth = 2;
            ctx.moveTo(mapX(decisionX), mapY(-0.2));
            ctx.lineTo(mapX(decisionX), mapY(1.2));
            ctx.stroke();
            ctx.setLineDash([]);

            // Text for boundary
            ctx.fillStyle = '#1e3a8a';
            ctx.font = 'bold 12px sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText("Decision Boundary", mapX(decisionX) + 5, mapY(0.8));
            break;
        case 'interactive':
            drawDataPoints();
            drawSigmoidFunction(interactiveW, interactiveB, '#2563eb'); // blue-600

            // Real-time decision boundary
            if (interactiveW !== 0) {
                let dynamicDecisionX = -interactiveB / interactiveW;
                if (dynamicDecisionX >= 0 && dynamicDecisionX <= 10) {
                    ctx.beginPath();
                    ctx.strokeStyle = '#94a3b8'; // slate-400
                    ctx.setLineDash([4, 4]);
                    ctx.lineWidth = 1;
                    ctx.moveTo(mapX(dynamicDecisionX), mapY(0));
                    ctx.lineTo(mapX(dynamicDecisionX), mapY(1));
                    ctx.stroke();
                    ctx.setLineDash([]);
                }
            }
            break;
    }
}