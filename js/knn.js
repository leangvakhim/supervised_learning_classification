// --- Configuration & Data Setup ---
const canvas = document.getElementById('knnCanvas');
const ctx = canvas.getContext('2d');
const K_VALUE = 3;

// Training Data points (Representing Student Scores)
const points = [
    // Class A (Red - Arts Majors)
    { x: 120, y: 150, class: 'A' }, { x: 160, y: 100, class: 'A' }, { x: 180, y: 190, class: 'A' },
    { x: 220, y: 130, class: 'A' }, { x: 110, y: 220, class: 'A' }, { x: 260, y: 110, class: 'A' },
    { x: 150, y: 260, class: 'A' }, { x: 200, y: 80, class: 'A' }, { x: 90, y: 110, class: 'A' },
    // Class B (Blue - STEM Majors)
    { x: 420, y: 280, class: 'B' }, { x: 480, y: 220, class: 'B' }, { x: 380, y: 350, class: 'B' },
    { x: 500, y: 300, class: 'B' }, { x: 450, y: 170, class: 'B' }, { x: 340, y: 290, class: 'B' },
    { x: 410, y: 360, class: 'B' }, { x: 520, y: 250, class: 'B' }, { x: 370, y: 210, class: 'B' }
];

// The new unknown point we want to classify
const newPoint = { x: 280, y: 200 };
// A specific target point to demonstrate distance calculations visually
const demoPoint = points[14]; // { x: 340, y: 290 }

// Colors
const COLOR_A = '#ef4444'; // Red-500
const COLOR_B = '#3b82f6'; // Blue-500
const COLOR_UNKNOWN = '#64748b'; // Slate-500
const COLOR_LINE = '#cbd5e1'; // Slate-300
const COLOR_HIGHLIGHT = '#10b981'; // Emerald-500
const COLOR_MATH = '#8b5cf6'; // Violet-500

// Pre-calculate Euclidean distances and sort neighbors
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

function drawEuclideanDemo() {
    ctx.beginPath();
    ctx.moveTo(newPoint.x, newPoint.y);
    ctx.lineTo(demoPoint.x, demoPoint.y);
    ctx.strokeStyle = COLOR_MATH;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Highlight target
    ctx.beginPath();
    ctx.arc(demoPoint.x, demoPoint.y, 14, 0, Math.PI * 2);
    ctx.strokeStyle = COLOR_MATH;
    ctx.lineWidth = 2;
    ctx.setLineDash([3, 3]);
    ctx.stroke();
    ctx.setLineDash([]);
}

function drawManhattanDemo() {
    ctx.beginPath();
    ctx.moveTo(newPoint.x, newPoint.y);
    ctx.lineTo(demoPoint.x, newPoint.y); // Horizontal move
    ctx.lineTo(demoPoint.x, demoPoint.y); // Vertical move
    ctx.strokeStyle = COLOR_MATH;
    ctx.lineWidth = 3;
    ctx.setLineDash([6, 4]); // Dashed line for grid feel
    ctx.stroke();
    ctx.setLineDash([]);

    // Highlight target
    ctx.beginPath();
    ctx.arc(demoPoint.x, demoPoint.y, 14, 0, Math.PI * 2);
    ctx.strokeStyle = COLOR_MATH;
    ctx.lineWidth = 2;
    ctx.setLineDash([3, 3]);
    ctx.stroke();
    ctx.setLineDash([]);
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


// --- Defining the Steps ---

const steps = [
    {
        title: "1. The Training Data",
        description: "<p>KNN is a supervised learning algorithm. It starts with a dataset of already categorized data.</p><p>Imagine a university scenario: <span class='text-red-500 font-bold'>Red points (Class A)</span> are Arts majors and <span class='text-blue-500 font-bold'>Blue points (Class B)</span> are STEM majors, plotted based on their Math Score (X-axis) and Science Score (Y-axis).</p>",
        showEquation: false,
        isCodeStep: false,
        render: () => {
            clearCanvas();
            drawDatasetPoints();
        }
    },
    {
        title: "2. The New Student Data",
        description: "<p>A new student arrives (the <span class='text-slate-500 font-bold uppercase tracking-wider'>Grey</span> circle). We know their Math and Science scores, but not their major.</p><p>Our goal is to predict which major they belong to by seeing who they are most similar to (their 'neighbors').</p>",
        showEquation: false,
        isCodeStep: false,
        render: () => {
            clearCanvas();
            drawDatasetPoints();
            drawUnknownPoint(COLOR_UNKNOWN, true);
        }
    },
    {
        title: "3. Distance 1: Euclidean Distance",
        description: "<p>To find the closest neighbors, we calculate distances. The most common is <strong>Euclidean Distance</strong>.</p><p>Think of this as a bird flying directly between two points. It measures the shortest straight-line distance.</p>",
        showEquation: true,
        isCodeStep: false,
        mathHTML: `
            <p class="text-sm font-semibold text-blue-800 uppercase tracking-wider mb-2">Euclidean Distance Formula</p>
            <div class="overflow-x-auto pb-2">
                \\[ d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2} \\]
            </div>
            <div class="mt-3 text-sm bg-white p-3 rounded-lg border border-blue-100 shadow-sm text-slate-700">
                <p class="font-bold mb-1">Example Calculation:</p>
                <p>New Student \\(P_1\\) has scores (1, 2). Existing Student \\(P_2\\) has scores (4, 6).</p>
                <div class="overflow-x-auto">
                    \\[ d = \\sqrt{(4 - 1)^2 + (6 - 2)^2} \\]
                    \\[ d = \\sqrt{(3)^2 + (4)^2} = \\sqrt{9 + 16} \\]
                    \\[ d = \\sqrt{25} = 5 \\]
                </div>
            </div>
        `,
        render: () => {
            clearCanvas();
            drawDatasetPoints();
            drawEuclideanDemo();
            drawUnknownPoint(COLOR_UNKNOWN, true);
        }
    },
    {
        title: "4. Distance 2: Manhattan Distance",
        description: "<p>Another way to measure is <strong>Manhattan Distance</strong>. Think of navigating a city grid or walking around campus buildings. You cannot cut diagonally through buildings; you must walk along the paths (L-shape).</p>",
        showEquation: true,
        isCodeStep: false,
        mathHTML: `
            <p class="text-sm font-semibold text-blue-800 uppercase tracking-wider mb-2">Manhattan Distance Formula</p>
            <div class="overflow-x-auto pb-2">
                \\[ d = |x_2 - x_1| + |y_2 - y_1| \\]
            </div>
            <div class="mt-3 text-sm bg-white p-3 rounded-lg border border-blue-100 shadow-sm text-slate-700">
                <p class="font-bold mb-1">Example Calculation:</p>
                <p>Using the same students, \\(P_1(1, 2)\\) and \\(P_2(4, 6)\\):</p>
                <div class="overflow-x-auto">
                    \\[ d = |4 - 1| + |6 - 2| \\]
                    \\[ d = |3| + |4| \\]
                    \\[ d = 3 + 4 = 7 \\]
                </div>
            </div>
        `,
        render: () => {
            clearCanvas();
            drawDatasetPoints();
            drawManhattanDemo();
            drawUnknownPoint(COLOR_UNKNOWN, true);
        }
    },
    {
        title: "5. Distance 3: Minkowski Distance",
        description: "<p><strong>Minkowski Distance</strong> is the \"mother\" formula that generalizes both Euclidean and Manhattan distances! It uses a parameter \\(p\\) acting like a flexible ruler.</p><ul class='list-disc pl-5 text-sm mt-2'><li>If \\(p = 1\\), it becomes Manhattan Distance.</li><li>If \\(p = 2\\), it becomes Euclidean Distance.</li></ul>",
        showEquation: true,
        isCodeStep: false,
        mathHTML: `
            <p class="text-sm font-semibold text-blue-800 uppercase tracking-wider mb-2">Minkowski Distance Formula</p>
            <div class="overflow-x-auto pb-2">
                \\[ d = \\left( \\sum_{i=1}^{n} |x_i - y_i|^p \\right)^{\\frac{1}{p}} \\]
            </div>
            <div class="mt-3 text-sm bg-white p-3 rounded-lg border border-blue-100 shadow-sm text-slate-700">
                <p class="font-bold mb-1">Example Calculation (Let \\(p=3\\)):</p>
                <p>For 2D points \\(P_1(1, 2)\\) and \\(P_2(4, 6)\\):</p>
                <div class="overflow-x-auto">
                    \\[ d = \\left( |4 - 1|^3 + |6 - 2|^3 \\right)^{\\frac{1}{3}} \\]
                    \\[ d = \\left( 3^3 + 4^3 \\right)^{\\frac{1}{3}} = (27 + 64)^{\\frac{1}{3}} \\]
                    \\[ d = \\sqrt[3]{91} \\approx 4.5 \\]
                </div>
            </div>
        `,
        render: () => {
            clearCanvas();
            drawDatasetPoints();
            // Draw both to show it generalizes concepts
            ctx.globalAlpha = 0.3;
            drawManhattanDemo();
            ctx.globalAlpha = 1.0;
            drawEuclideanDemo();
            drawUnknownPoint(COLOR_UNKNOWN, true);
        }
    },
    {
        title: "6. Measuring Distances",
        description: "Returning to our prediction task: The algorithm calculates distances (we'll use Euclidean) to <strong>every existing student</strong> in the dataset to see who is closest mathematically.",
        showEquation: false,
        isCodeStep: false,
        render: () => {
            clearCanvas();
            drawLinesToAll();
            drawDatasetPoints();
            drawUnknownPoint(COLOR_UNKNOWN);
        }
    },
    {
        title: "7. Finding the 'K' Nearest",
        description: `<p>We choose a value for <strong>K</strong> (the number of neighbors to look at). Let's set <strong>K = ${K_VALUE}</strong>.</p><p>The algorithm identifies the ${K_VALUE} closest students (highlighted in green). Notice the green radius captures exactly ${K_VALUE} neighbors.</p>`,
        showEquation: false,
        isCodeStep: false,
        render: () => {
            clearCanvas();
            drawRadiusCircle();
            drawLinesToKNearest();
            drawDatasetPoints();
            drawUnknownPoint(COLOR_UNKNOWN);
        }
    },
    {
        title: "8. Majority Voting",
        description: `<p>We count the majors of those ${K_VALUE} nearest neighbors. Here we have <strong>${countA} Arts (Red)</strong> and <strong>${countB} STEM (Blue)</strong>.</p><p>Since ${countA > countB ? 'Arts' : 'STEM'} is the majority, our new student is predicted to be an <span style="color:${finalColor}" class="font-bold uppercase tracking-wider">${finalClass === 'A' ? 'Arts Major' : 'STEM Major'}</span>!</p>`,
        showEquation: false,
        isCodeStep: false,
        render: () => {
            clearCanvas();
            drawRadiusCircle();
            drawLinesToKNearest();
            drawDatasetPoints();
            drawUnknownPoint(finalColor, true); // Update color to final result
        }
    },
    {
        title: "9. Code Tutorial: Scikit-Learn",
        description: "<p>We don't need to write all that math manually! In Python, data scientists use the <strong>Scikit-Learn</strong> library to do this in just a few lines of code.</p><p>Notice how we set <code>n_neighbors=3</code> (which is our <strong>K</strong>), and simply pass our dataset and our new student's scores to let the algorithm do the heavy lifting.</p>",
        showEquation: false,
        isCodeStep: true, // Special flag to change layout
        codeHTML: `
<pre><code class="language-python">from sklearn.neighbors import KNeighborsClassifier

# 1. Our Training Data (Math, Science)
X_train = [
[120, 150], [160, 100], # Arts Majors
[420, 280], [480, 220]  # STEM Majors
]

# The Labels for those students
y_train = ['Arts', 'Arts', 'STEM', 'STEM']

# 2. Setup the KNN Model (Setting K=3)
# By default, p=2 which means it uses Euclidean Distance!
# (Set p=1 if you wanted Manhattan distance)
knn_model = KNeighborsClassifier(n_neighbors=3, p=2)

# 3. Train (fit) the model with our data
knn_model.fit(X_train, y_train)

# 4. Our New Student arrives (Math: 280, Science: 200)
new_student = [[280, 200]]

# 5. Predict their major!
prediction = knn_model.predict(new_student)

print(f"The predicted major is: {prediction[0]}")
# Output: The predicted major is: Arts
</code></pre>`,
        render: () => {
            // For the code step, we might just show the final state on canvas
            clearCanvas();
            drawRadiusCircle();
            drawLinesToKNearest();
            drawDatasetPoints();
            drawUnknownPoint(finalColor, true);
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

const contentArea = document.getElementById('contentArea');
const equationBlock = document.getElementById('equationBlock');
const codeBlock = document.getElementById('codeBlock');

const visualContainer = document.getElementById('visualContainer');
const textContainer = document.getElementById('textContainer');

function updateUI() {
    // Fade out
    contentArea.style.opacity = 0;

    setTimeout(() => {
        const step = steps[currentStep];

        // Update text content
        stepTitle.innerHTML = step.title;
        stepDescription.innerHTML = step.description;
        stepCounter.innerText = `Step ${currentStep + 1} of ${steps.length}`;

        // --- Layout Management based on Step Type ---
        if (step.isCodeStep) {
            // Expand text area, shrink canvas area
            visualContainer.classList.remove('lg:w-1/2', 'block');
            visualContainer.classList.add('hidden'); // Hide canvas on mobile/desktop

            textContainer.classList.remove('lg:w-1/2');
            textContainer.classList.add('w-full', 'lg:w-full');

            // Show code block, hide math block
            equationBlock.classList.add('hidden');
            equationBlock.innerHTML = '';

            codeBlock.innerHTML = step.codeHTML;
            codeBlock.classList.remove('hidden');

            // Trigger Prism JS to highlight the injected code
            if (window.Prism) {
                Prism.highlightAllUnder(codeBlock);
            }

        } else {
            // Normal visual layout (50/50 split on desktop)
            visualContainer.classList.remove('hidden');
            visualContainer.classList.add('lg:w-1/2', 'block');

            textContainer.classList.remove('w-full', 'lg:w-full');
            textContainer.classList.add('lg:w-1/2');

            // Hide code block
            codeBlock.classList.add('hidden');
            codeBlock.innerHTML = '';

            // Toggle Equation block & render MathJax
            if (step.showEquation && step.mathHTML) {
                equationBlock.innerHTML = step.mathHTML;
                equationBlock.classList.remove('hidden');
            } else {
                equationBlock.classList.add('hidden');
                equationBlock.innerHTML = '';
            }
        }

        // Tell MathJax to re-render the newly injected LaTeX for the entire content area
        // This ensures \(p=1\) inside the descriptions renders properly too
        if (window.MathJax) {
            MathJax.typesetPromise([contentArea]).catch((err) => console.error('MathJax error:', err));
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

        // Render Canvas frame (if not hidden)
        if (!step.isCodeStep) {
            step.render();
        }

        // Fade in
        contentArea.style.opacity = 1;
    }, 250); // Matches CSS transition duration
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

// Initialize first step once MathJax has loaded initially
window.addEventListener('load', () => {
    updateUI();
});