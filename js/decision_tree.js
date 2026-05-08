// Data containing all the steps, text, and SVG visualizations
const steps = [
    {
        title: "1. What is a Decision Tree?",
        description: "Think of a Decision Tree like a game of <strong>20 Questions</strong>. It is a machine learning algorithm that solves problems by asking a series of yes/no questions about the data until it reaches a conclusion.",
        visual: `
            <svg viewBox="0 0 400 200" class="w-full h-48 sm:h-64 mt-6 drop-shadow-sm">
                <!-- Connecting Lines -->
                <path d="M 200 40 L 120 120" stroke="#cbd5e1" stroke-width="3" fill="none" />
                <path d="M 200 40 L 280 120" stroke="#cbd5e1" stroke-width="3" fill="none" />

                <!-- Root Node -->
                <rect x="140" y="20" width="120" height="40" rx="8" fill="#3b82f6" stroke="#2563eb" stroke-width="2"/>
                <text x="200" y="45" font-size="14" fill="white" text-anchor="middle" font-weight="bold">Start Here</text>

                <!-- Yes / No Labels -->
                <text x="145" y="85" font-size="12" fill="#64748b" font-weight="bold">Yes</text>
                <text x="255" y="85" font-size="12" fill="#64748b" font-weight="bold">No</text>

                <!-- Leaf Nodes -->
                <rect x="70" y="120" width="100" height="40" rx="8" fill="#10b981" stroke="#059669" stroke-width="2"/>
                <text x="120" y="145" font-size="14" fill="white" text-anchor="middle" font-weight="bold">Outcome A</text>

                <rect x="230" y="120" width="100" height="40" rx="8" fill="#ef4444" stroke="#dc2626" stroke-width="2"/>
                <text x="280" y="145" font-size="14" fill="white" text-anchor="middle" font-weight="bold">Outcome B</text>
            </svg>
        `
    },
    {
        title: "2. The Anatomy of a Tree",
        description: "A Decision Tree consists of three main types of nodes:<br><br> <span class='text-blue-600 font-bold'>Root Node:</span> The top node representing the entire dataset.<br><span class='text-amber-500 font-bold'>Internal Nodes:</span> Questions or tests on a specific feature.<br><span class='text-emerald-600 font-bold'>Leaf Nodes:</span> The final predicted outcome or class.",
        visual: `
            <svg viewBox="0 0 500 250" class="w-full h-56 sm:h-72 mt-2 drop-shadow-sm">
                <!-- Lines -->
                <path d="M 250 30 L 150 110" stroke="#cbd5e1" stroke-width="3" fill="none" />
                <path d="M 250 30 L 350 110" stroke="#cbd5e1" stroke-width="3" fill="none" />
                <path d="M 150 140 L 90 210" stroke="#cbd5e1" stroke-width="3" fill="none" />
                <path d="M 150 140 L 210 210" stroke="#cbd5e1" stroke-width="3" fill="none" />
                <path d="M 350 140 L 350 210" stroke="#cbd5e1" stroke-width="3" fill="none" />

                <!-- Root Node -->
                <rect x="180" y="10" width="140" height="40" rx="20" fill="#eff6ff" stroke="#3b82f6" stroke-width="2" stroke-dasharray="4"/>
                <rect x="190" y="15" width="120" height="30" rx="15" fill="#3b82f6" />
                <text x="250" y="35" font-size="14" fill="white" text-anchor="middle" font-weight="bold">Root Node</text>

                <!-- Internal Nodes -->
                <rect x="90" y="110" width="120" height="30" rx="15" fill="#f59e0b" stroke="#d97706" stroke-width="2"/>
                <text x="150" y="130" font-size="12" fill="white" text-anchor="middle" font-weight="bold">Internal Node</text>

                <rect x="290" y="110" width="120" height="30" rx="15" fill="#f59e0b" stroke="#d97706" stroke-width="2"/>
                <text x="350" y="130" font-size="12" fill="white" text-anchor="middle" font-weight="bold">Internal Node</text>

                <!-- Leaf Nodes -->
                <rect x="40" y="210" width="100" height="30" rx="5" fill="#10b981" />
                <text x="90" y="230" font-size="12" fill="white" text-anchor="middle" font-weight="bold">Leaf Node</text>

                <rect x="160" y="210" width="100" height="30" rx="5" fill="#10b981" />
                <text x="210" y="230" font-size="12" fill="white" text-anchor="middle" font-weight="bold">Leaf Node</text>

                <rect x="300" y="210" width="100" height="30" rx="5" fill="#10b981" />
                <text x="350" y="230" font-size="12" fill="white" text-anchor="middle" font-weight="bold">Leaf Node</text>
            </svg>
        `
    },
    {
        title: "3. The Math: How does it split?",
        description: "To decide which question to ask, the tree uses math to find the split that creates the most 'pure' groups (groups where items are mostly the same). Two common formulas are used to measure impurity:",
        visual: `
            <div class="mt-6 space-y-6">
                <!-- Gini Impurity Box -->
                <div class="bg-blue-50 border border-blue-100 rounded-xl p-5 shadow-sm">
                    <h3 class="font-bold text-blue-800 mb-2">1. Gini Impurity</h3>
                    <p class="text-sm text-gray-600 mb-3">Measures the probability of misclassifying a random data point. A Gini of 0 means perfect purity.</p>
                    <div class="bg-white p-3 rounded-lg border border-gray-200 text-center overflow-x-auto">
                        <span class="math-text text-xl text-gray-800">
                            Gini = 1 - &sum; (p<sub>i</sub>)<sup>2</sup>
                        </span>
                    </div>
                </div>

                <!-- Entropy Box -->
                <div class="bg-emerald-50 border border-emerald-100 rounded-xl p-5 shadow-sm">
                    <h3 class="font-bold text-emerald-800 mb-2">2. Entropy & Information Gain</h3>
                    <p class="text-sm text-gray-600 mb-3">Entropy measures the chaos or randomness in the data. The tree tries to maximize <strong>Information Gain</strong> (decrease in Entropy).</p>
                    <div class="bg-white p-3 rounded-lg border border-gray-200 text-center overflow-x-auto">
                        <span class="math-text text-xl text-gray-800">
                            Entropy = - &sum; p<sub>i</sub> log<sub>2</sub>(p<sub>i</sub>)
                        </span>
                    </div>
                </div>
                <p class="text-xs text-gray-500 text-center italic">* Where <span class="math-text font-bold">p<sub>i</sub></span> is the probability of an item belonging to class <span class="math-text font-bold">i</span>.</p>
            </div>
        `
    },
    {
        title: "4. Let's Build One! (Play Tennis?)",
        description: "Here is a trained tree deciding if we should play tennis based on the weather. Trace a path: If it is <strong>Sunny</strong>, and the <strong>Humidity is High</strong>, what is the prediction?",
        visual: `
            <svg viewBox="0 0 600 300" class="w-full h-64 sm:h-80 mt-4 drop-shadow-sm">
                <!-- Connecting Lines Level 1 -->
                <path d="M 300 30 L 120 120" stroke="#cbd5e1" stroke-width="3" fill="none" />
                <path d="M 300 30 L 300 120" stroke="#cbd5e1" stroke-width="3" fill="none" />
                <path d="M 300 30 L 480 120" stroke="#cbd5e1" stroke-width="3" fill="none" />

                <!-- Level 1 Branch Labels -->
                <text x="180" y="70" font-size="12" fill="#64748b" font-weight="bold">Sunny</text>
                <text x="310" y="80" font-size="12" fill="#64748b" font-weight="bold">Overcast</text>
                <text x="420" y="70" font-size="12" fill="#64748b" font-weight="bold">Rain</text>

                <!-- Connecting Lines Level 2 (Left) -->
                <path d="M 120 150 L 60 230" stroke="#cbd5e1" stroke-width="3" fill="none" />
                <path d="M 120 150 L 180 230" stroke="#cbd5e1" stroke-width="3" fill="none" />
                <text x="75" y="190" font-size="12" fill="#64748b" font-weight="bold">High</text>
                <text x="160" y="190" font-size="12" fill="#64748b" font-weight="bold">Normal</text>

                <!-- Connecting Lines Level 2 (Right) -->
                <path d="M 480 150 L 420 230" stroke="#cbd5e1" stroke-width="3" fill="none" />
                <path d="M 480 150 L 540 230" stroke="#cbd5e1" stroke-width="3" fill="none" />
                <text x="435" y="190" font-size="12" fill="#64748b" font-weight="bold">Strong</text>
                <text x="520" y="190" font-size="12" fill="#64748b" font-weight="bold">Weak</text>

                <!-- Level 0: Root -->
                <rect x="230" y="10" width="140" height="30" rx="15" fill="#3b82f6" />
                <text x="300" y="30" font-size="14" fill="white" text-anchor="middle" font-weight="bold">Outlook?</text>

                <!-- Level 1: Internals & Leaf -->
                <rect x="60" y="120" width="120" height="30" rx="15" fill="#f59e0b" />
                <text x="120" y="140" font-size="13" fill="white" text-anchor="middle" font-weight="bold">Humidity?</text>

                <!-- Overcast directly to Leaf -->
                <rect x="250" y="120" width="100" height="30" rx="8" fill="#10b981" />
                <text x="300" y="140" font-size="13" fill="white" text-anchor="middle" font-weight="bold">Yes</text>

                <rect x="420" y="120" width="120" height="30" rx="15" fill="#f59e0b" />
                <text x="480" y="140" font-size="13" fill="white" text-anchor="middle" font-weight="bold">Wind?</text>

                <!-- Level 2: Leaves -->
                <rect x="20" y="230" width="80" height="30" rx="8" fill="#ef4444" />
                <text x="60" y="250" font-size="13" fill="white" text-anchor="middle" font-weight="bold">No</text>

                <rect x="140" y="230" width="80" height="30" rx="8" fill="#10b981" />
                <text x="180" y="250" font-size="13" fill="white" text-anchor="middle" font-weight="bold">Yes</text>

                <rect x="380" y="230" width="80" height="30" rx="8" fill="#ef4444" />
                <text x="420" y="250" font-size="13" fill="white" text-anchor="middle" font-weight="bold">No</text>

                <rect x="500" y="230" width="80" height="30" rx="8" fill="#10b981" />
                <text x="540" y="250" font-size="13" fill="white" text-anchor="middle" font-weight="bold">Yes</text>
            </svg>
        `
    }
];

// State Management
let currentStepIndex = 0;

// DOM Elements
const contentContainer = document.getElementById('step-content');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const stepIndicator = document.getElementById('step-indicator');
const progressBar = document.getElementById('progress-bar');

// Function to render the current step
function renderStep(index) {
    const step = steps[index];

    // Apply fade out effect
    contentContainer.classList.remove('fade-enter-active');
    contentContainer.classList.add('fade-enter');

    // Wait a tiny bit for transition, then update content
    setTimeout(() => {
        contentContainer.innerHTML = `
            <h2 class="text-xl font-extrabold text-gray-800 mb-4">${step.title}</h2>
            <p class="text-gray-600 text-sm leading-relaxed mb-6">${step.description}</p>
            <div class="w-full flex justify-center">
                ${step.visual}
            </div>
        `;

        // Trigger fade in
        requestAnimationFrame(() => {
            contentContainer.classList.remove('fade-enter');
            contentContainer.classList.add('fade-enter-active');
        });
    }, 150);

    // Update UI Controls
    btnPrev.disabled = index === 0;

    if (index === steps.length - 1) {
        btnNext.innerHTML = "Finish &#10003;";
        btnNext.classList.remove('bg-blue-600', 'hover:bg-blue-700');
        btnNext.classList.add('bg-emerald-600', 'hover:bg-emerald-700');
    } else {
        btnNext.innerHTML = "Next Step &rarr;";
        btnNext.classList.remove('bg-emerald-600', 'hover:bg-emerald-700');
        btnNext.classList.add('bg-blue-600', 'hover:bg-blue-700');
    }

    stepIndicator.textContent = `Step ${index + 1} of ${steps.length}`;

    // Update Progress Bar
    const progressPercentage = ((index + 1) / steps.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

// Event Listeners
btnNext.addEventListener('click', () => {
    if (currentStepIndex < steps.length - 1) {
        currentStepIndex++;
        renderStep(currentStepIndex);
    } else {
        // Restart logic if finished
        currentStepIndex.disabled = true;
        // currentStepIndex = 0;
        // renderStep(currentStepIndex);
    }
});

btnPrev.addEventListener('click', () => {
    if (currentStepIndex > 0) {
        currentStepIndex--;
        renderStep(currentStepIndex);
    }
});

// Initialize first step
renderStep(currentStepIndex);