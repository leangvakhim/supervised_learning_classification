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

// Extended Content for each step
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
        title: "5. The Hyperplane Math",
        desc: `<p>How does the math work? The central line (Hyperplane) is defined by an equation where weights (<b>w</b>) and bias (<i>b</i>) equal zero:</p>
                <div class="bg-indigo-50 text-indigo-900 p-3 rounded-lg border border-indigo-100 mt-3 text-center font-serif text-lg shadow-inner">
                    <b>w</b> &middot; <b>x</b> + b = 0
                </div>
                <p class="mt-3 text-sm">The margins are defined by equations equaling +1 and -1:</p>
                <ul class="text-sm list-disc pl-5 mt-1 space-y-1">
                    <li>Class B Margin: <span class="font-serif text-red-600"><b>w</b> &middot; <b>x</b> + b = 1</span></li>
                    <li>Class A Margin: <span class="font-serif text-blue-600"><b>w</b> &middot; <b>x</b> + b = -1</span></li>
                </ul>`
    },
    {
        title: "6. Measuring the Margin",
        desc: `<p>To find the absolute best separating line, we need a mathematical way to calculate the <b>width of the margin</b>.</p>
                <p class="mt-2">Using geometry, the perpendicular distance between the two margin boundaries is calculated as:</p>
                <div class="bg-emerald-50 text-emerald-900 p-3 rounded-lg border border-emerald-100 mt-3 text-center font-serif text-xl shadow-inner">
                    Margin Width = <span class="text-2xl ml-2"><sup>2</sup>&frasl;<sub>||<b>w</b>||</sub></span>
                </div>
                <p class="mt-3 text-sm">Here, <b>||w||</b> represents the mathematical length (magnitude) of the weight vector. We want this gap to be as wide as possible!</p>`
    },
    {
        title: "7. The Optimization Goal",
        desc: `<p>Since we want to <b>maximize</b> <code>2 / ||w||</code>, mathematically, that is exactly the same as <b>minimizing</b> <code>||w||</code>.</p>
                <div class="bg-slate-50 p-3 rounded border border-slate-200 mt-3 text-sm">
                    <p class="font-bold text-slate-800">The SVM Rule (Hard Margin):</p>
                    <p class="mt-1 font-serif">Minimize: &frac12; ||<b>w</b>||&sup2;</p>
                    <p class="mt-1 font-serif text-xs text-slate-500">Subject to: y<sub>i</sub>(<b>w</b> &middot; <b>x</b><sub>i</sub> + b) &ge; 1 for all points.</p>
                </div>
                <p class="mt-3 text-sm">This constraint simply means: <i>"No data points are allowed inside the margin lane!"</i></p>`
    },
    {
        title: "8. Soft Margins & Messy Data",
        desc: `<p>In the real world, data is rarely perfectly separable. Look at the new messy Red point in the Blue territory!</p>
                <p class="mt-2 text-sm">To fix this, we introduce <b>Slack Variables (&xi;)</b>. This creates a <b>Soft Margin</b>, allowing some points to break the rules, but with a penalty (<b>C</b>).</p>
                <div class="bg-red-50 p-3 rounded border border-red-100 mt-2 text-sm">
                    <p class="font-serif text-red-800">Minimize: &frac12; ||<b>w</b>||&sup2; + C &sum; &xi;<sub>i</sub></p>
                </div>
                <p class="mt-2 text-xs text-slate-600">A low <b>C</b> makes a wider margin with more mistakes allowed. A high <b>C</b> makes a strict, narrow margin.</p>`
    },
    {
        title: "9. Code SVM in Python",
        desc: `<p>Now, let's apply this in Python! The <b>scikit-learn</b> library makes SVM implementation incredibly easy.</p>
                <div class="bg-slate-800 text-slate-50 p-3 rounded-lg mt-2 text-xs font-mono overflow-x-auto shadow-inner leading-relaxed">
                    <span class="text-pink-400">from</span> sklearn.svm <span class="text-pink-400">import</span> SVC<br><br>
                    <span class="text-slate-400"># 1. Initialize model (C=Penalty, kernel='linear')</span><br>
                    model = SVC(kernel=<span class="text-yellow-300">'linear'</span>, C=<span class="text-purple-400">1.0</span>)<br><br>
                    <span class="text-slate-400"># 2. Train the model with Data (X) and Labels (y)</span><br>
                    model.fit(X, y)<br><br>
                    <span class="text-slate-400"># 3. Predict a new data point</span><br>
                    prediction = model.predict([[<span class="text-purple-400">6</span>, <span class="text-purple-400">4</span>]])
                </div>
                <p class="mt-2 text-xs text-slate-600">Under the hood, <code>.fit()</code> runs the optimization math we learned to find the best <b>w</b> and <b>b</b> automatically!</p>`
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

function drawPoint(x, y, color, highlight = false, isDashed = false) {
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
    if (isDashed) {
        ctx.setLineDash([2, 2]);
        ctx.strokeStyle = '#7f1d1d'; // dark red
    }
    ctx.stroke();
    ctx.setLineDash([]); // reset
}

function drawLine(lx1, ly1, lx2, ly2, color, lineWidth, dash = []) {
    ctx.beginPath();
    ctx.setLineDash(dash);
    ctx.moveTo(mapX(lx1), mapY(ly1));
    ctx.lineTo(mapX(lx2), mapY(ly2));
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.setLineDash([]); // Reset dash
}

function drawArrow(fromX, fromY, toX, toY, color) {
    const headlen = 10; // length of head in pixels
    const dx = mapX(toX) - mapX(fromX);
    const dy = mapY(toY) - mapY(fromY);
    const angle = Math.atan2(dy, dx);

    ctx.beginPath();
    ctx.moveTo(mapX(fromX), mapY(fromY));
    ctx.lineTo(mapX(toX), mapY(toY));
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Arrowhead at destination
    ctx.beginPath();
    ctx.moveTo(mapX(toX), mapY(toY));
    ctx.lineTo(mapX(toX) - headlen * Math.cos(angle - Math.PI / 6), mapY(toY) - headlen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(mapX(toX) - headlen * Math.cos(angle + Math.PI / 6), mapY(toY) - headlen * Math.sin(angle + Math.PI / 6));
    ctx.lineTo(mapX(toX), mapY(toY));
    ctx.fillStyle = color;
    ctx.fill();
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

    // Legend toggle for step 8 and 9
    document.getElementById('legendOutlier').style.display = (currentStep >= 7) ? 'flex' : 'none';

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
        drawLine(0, 6, 10, 4, '#cbd5e1', 2); // Random line 1
        drawLine(2, 10, 8, 0, '#cbd5e1', 2); // Random line 2
        drawLine(0, 10, 10, 0, '#94a3b8', 2); // Closer random line

        bluePoints.forEach(p => drawPoint(p.x, p.y, '#3b82f6'));
        redPoints.forEach(p => drawPoint(p.x, p.y, '#ef4444'));
    }

    // STEP 3 - 8: Optimal Line + Mathematical progressions
    else if (currentStep >= 2) {
        // The optimal hyperplane (x + y = 10)
        drawLine(0, 10, 10, 0, '#1e293b', 3); // slate-800

        // The margins (x + y = 9 and x + y = 11)
        drawLine(0, 9, 9, 0, '#64748b', 2, [5, 5]); // slate-500 dashed
        drawLine(1, 10, 10, 1, '#64748b', 2, [5, 5]);

        // Determine if we should highlight Support Vectors
        const highlightSV = currentStep >= 3;

        bluePoints.forEach(p => {
            const isSV = (p.x + p.y === 9);
            drawPoint(p.x, p.y, '#3b82f6', highlightSV && isSV);
        });

        redPoints.forEach(p => {
            const isSV = (p.x + p.y === 11);
            drawPoint(p.x, p.y, '#ef4444', highlightSV && isSV);
        });

        // Function to draw text at a specific angle
        const angle = Math.atan2(mapY(0) - mapY(10), mapX(10) - mapX(0));
        function drawEquation(text, logX, logY, color, isBold, fontSize = "20px") {
            ctx.save();
            ctx.translate(mapX(logX), mapY(logY));
            ctx.rotate(angle);

            ctx.font = `${isBold ? 'bold ' : 'italic '}${fontSize} serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const textWidth = ctx.measureText(text).width;
            const padX = 12;
            const padY = 6;

            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.beginPath();
            ctx.roundRect(-textWidth / 2 - padX, -10 - padY, textWidth + padX * 2, 20 + padY * 2, 8);
            ctx.fill();

            ctx.fillStyle = color;
            ctx.fillText(text, 0, 0);
            ctx.restore();
        }

        // Draw the equations starting from Step 5 (index 4)
        if (currentStep === 4) {
            // Draw main hyperplane equation perfectly centered
            drawEquation('w · x + b = 0', 5, 5, '#1e293b', true);

            // Draw margin equations spaced out diagonally
            drawEquation('w · x + b = -1', 3.5, 5.5, '#2563eb', false); // Blue
            drawEquation('w · x + b = 1', 6.5, 4.5, '#dc2626', false);   // Red
        }

        // Steps 6 and 7: Show Margin Distance (2 / ||w||)
        if (currentStep === 5 || currentStep === 6) {
            // Draw a perpendicular line to show the margin width
            // Margin is between x+y=9 and x+y=11. Perpendicular goes from (3,6) to (4,7)
            drawLine(3, 6, 4, 7, '#059669', 2); // emerald-600
            drawArrow(3.5, 6.5, 3, 6, '#059669'); // arrow towards Blue margin
            drawArrow(3.5, 6.5, 4, 7, '#059669'); // arrow towards Red margin

            // Draw the margin width equation exactly in the center of the line
            drawEquation('2 / ||w||', 3.5, 6.5, '#059669', true, "18px");
        }

        // STEP 8 & 9: Soft Margins (Messy Data) & Python Code
        if (currentStep >= 7) {
            // Draw an outlier Red point completely in Blue territory
            const outlier = { x: 3.5, y: 3.5 };

            // The distance from the outlier to its correct margin (x+y=11)
            // Shortest line is y=x. Intersects x+y=11 at (5.5, 5.5)

            // Draw the Slack Variable line (Error distance)
            drawLine(outlier.x, outlier.y, 5.5, 5.5, '#ef4444', 2, [4, 4]); // Red dashed line

            // Draw the outlier point
            drawPoint(outlier.x, outlier.y, 'rgba(239, 68, 68, 0.7)', false, true);

            // Label the Slack Variable (Xi)
            ctx.save();
            ctx.translate(mapX(4.5), mapY(4.5));
            ctx.rotate(Math.PI / 4);
            ctx.fillStyle = 'white';
            ctx.fillRect(-25, -25, 50, 20);
            ctx.font = `italic bold 18px serif`;
            ctx.textAlign = 'center';
            ctx.fillStyle = '#dc2626';
            ctx.fillText('ξ (Error)', 0, -10);
            ctx.restore();
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