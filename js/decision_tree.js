// Data containing all the steps, text, and SVG/Math visualizations
const steps = [
    {
        title: "1. What is a Decision Tree?",
        description: "Think of a Decision Tree like a game of <strong>20 Questions</strong>. It is a machine learning algorithm that solves problems by asking a series of yes/no questions about the data until it reaches a conclusion.",
        visual: `
            <div class="w-full flex justify-center">
                <svg viewBox="0 0 400 200" class="w-full max-w-lg h-48 sm:h-64 mt-6 drop-shadow-sm">
                    <path d="M 200 40 L 120 120" stroke="#cbd5e1" stroke-width="3" fill="none" />
                    <path d="M 200 40 L 280 120" stroke="#cbd5e1" stroke-width="3" fill="none" />
                    <rect x="140" y="20" width="120" height="40" rx="8" fill="#3b82f6" stroke="#2563eb" stroke-width="2"/>
                    <text x="200" y="45" font-size="14" fill="white" text-anchor="middle" font-weight="bold">Start Here</text>
                    <text x="145" y="85" font-size="12" fill="#64748b" font-weight="bold">Yes</text>
                    <text x="255" y="85" font-size="12" fill="#64748b" font-weight="bold">No</text>
                    <rect x="70" y="120" width="100" height="40" rx="8" fill="#10b981" stroke="#059669" stroke-width="2"/>
                    <text x="120" y="145" font-size="14" fill="white" text-anchor="middle" font-weight="bold">Outcome A</text>
                    <rect x="230" y="120" width="100" height="40" rx="8" fill="#ef4444" stroke="#dc2626" stroke-width="2"/>
                    <text x="280" y="145" font-size="14" fill="white" text-anchor="middle" font-weight="bold">Outcome B</text>
                </svg>
            </div>
        `
    },
    {
        title: "2. The Anatomy of a Tree",
        description: "A Decision Tree consists of three main types of nodes:<br><br> <span class='text-blue-600 font-bold'>Root Node:</span> The top node representing the entire dataset.<br><span class='text-amber-500 font-bold'>Internal Nodes:</span> Questions or tests on a specific feature.<br><span class='text-emerald-600 font-bold'>Leaf Nodes:</span> The final predicted outcome or class.",
        visual: `
            <div class="w-full flex justify-center">
                <svg viewBox="0 0 500 250" class="w-full max-w-xl h-56 sm:h-72 mt-2 drop-shadow-sm">
                    <path d="M 250 30 L 150 110" stroke="#cbd5e1" stroke-width="3" fill="none" />
                    <path d="M 250 30 L 350 110" stroke="#cbd5e1" stroke-width="3" fill="none" />
                    <path d="M 150 140 L 90 210" stroke="#cbd5e1" stroke-width="3" fill="none" />
                    <path d="M 150 140 L 210 210" stroke="#cbd5e1" stroke-width="3" fill="none" />
                    <path d="M 350 140 L 350 210" stroke="#cbd5e1" stroke-width="3" fill="none" />
                    <rect x="180" y="10" width="140" height="40" rx="20" fill="#eff6ff" stroke="#3b82f6" stroke-width="2" stroke-dasharray="4"/>
                    <rect x="190" y="15" width="120" height="30" rx="15" fill="#3b82f6" />
                    <text x="250" y="35" font-size="14" fill="white" text-anchor="middle" font-weight="bold">Root Node</text>
                    <rect x="90" y="110" width="120" height="30" rx="15" fill="#f59e0b" stroke="#d97706" stroke-width="2"/>
                    <text x="150" y="130" font-size="12" fill="white" text-anchor="middle" font-weight="bold">Internal Node</text>
                    <rect x="290" y="110" width="120" height="30" rx="15" fill="#f59e0b" stroke="#d97706" stroke-width="2"/>
                    <text x="350" y="130" font-size="12" fill="white" text-anchor="middle" font-weight="bold">Internal Node</text>
                    <rect x="40" y="210" width="100" height="30" rx="5" fill="#10b981" />
                    <text x="90" y="230" font-size="12" fill="white" text-anchor="middle" font-weight="bold">Leaf Node</text>
                    <rect x="160" y="210" width="100" height="30" rx="5" fill="#10b981" />
                    <text x="210" y="230" font-size="12" fill="white" text-anchor="middle" font-weight="bold">Leaf Node</text>
                    <rect x="300" y="210" width="100" height="30" rx="5" fill="#10b981" />
                    <text x="350" y="230" font-size="12" fill="white" text-anchor="middle" font-weight="bold">Leaf Node</text>
                </svg>
            </div>
        `
    },
    {
        title: "3. Impurity Metrics: How mixed is the data?",
        description: "Before a tree decides to split, it checks how 'mixed up' the data is. A group with only one class (e.g., all Cats) is <strong>pure</strong> (Impurity = 0). Here are three formulas used to measure impurity:",
        visual: `
            <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <!-- Gini Impurity Box -->
                <div class="bg-blue-50 border border-blue-100 rounded-xl p-4 shadow-sm flex flex-col justify-between">
                    <div>
                        <h3 class="font-bold text-blue-800 mb-2">1. Gini Impurity</h3>
                        <p class="text-xs text-gray-700 mb-3">Measures the probability of incorrectly classifying a random data point. Commonly used by the CART algorithm (like in scikit-learn).</p>
                    </div>
                    <div class="bg-white p-2 rounded-lg border border-blue-200 text-center math-scroll overflow-x-auto">
                        $$ Gini = 1 - \\sum_{i=1}^{c} (p_i)^2 $$
                    </div>
                </div>

                <!-- Entropy Box -->
                <div class="bg-emerald-50 border border-emerald-100 rounded-xl p-4 shadow-sm flex flex-col justify-between">
                    <div>
                        <h3 class="font-bold text-emerald-800 mb-2">2. Entropy</h3>
                        <p class="text-xs text-gray-700 mb-3">A concept from physics and information theory measuring chaos or unpredictability in the data.</p>
                    </div>
                    <div class="bg-white p-2 rounded-lg border border-emerald-200 text-center math-scroll overflow-x-auto">
                        $$ Entropy = - \\sum_{i=1}^{c} p_i \\log_2(p_i) $$
                    </div>
                </div>

                <!-- Misclassification Error Box -->
                <div class="bg-purple-50 border border-purple-100 rounded-xl p-4 shadow-sm flex flex-col justify-between">
                    <div>
                        <h3 class="font-bold text-purple-800 mb-2">3. Misclassification Error</h3>
                        <p class="text-xs text-gray-700 mb-3">The simplest metric. It measures the fraction of items that do not belong to the most common majority class.</p>
                    </div>
                    <div class="bg-white p-2 rounded-lg border border-purple-200 text-center math-scroll overflow-x-auto">
                        $$ Error = 1 - \\max_i(p_i) $$
                    </div>
                </div>
            </div>
            <p class="text-xs text-gray-500 mt-4 text-center italic">* Where <strong>$p_i$</strong> is the probability (or fraction) of an item belonging to class <strong>$i$</strong>, and <strong>$c$</strong> is the total number of classes.</p>

            <!-- New Button Added Here -->
            <div class="mt-5 w-full flex justify-center">
                <a href="../html/decision_tree_impurity.html" target="_blank" class="inline-flex items-center px-5 py-2.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 font-medium transition-colors shadow-sm text-sm">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    The three formulas explanation
                </a>
            </div>
        `
    },
    {
        title: "4. Splitting Quality: Evaluating a Split",
        description: "Once we know the impurity, how do we choose the best question? We compare the impurity <strong>before</strong> the split to the impurity <strong>after</strong> the split. The goal is to maximize the improvement!",
        visual: `
            <div class="mt-4 space-y-4">
                <!-- Information Gain Box -->
                <div class="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm">
                    <h3 class="font-bold text-slate-800 mb-1">A. Information Gain (IG)</h3>
                    <p class="text-sm text-gray-600 mb-2">How much uncertainty did we remove? It is the Impurity (usually Entropy) of the parent node, minus the weighted average Impurity of the child nodes.</p>
                    <div class="bg-white p-3 rounded-lg border border-slate-200 text-center math-scroll overflow-x-auto">
                        $$ IG(T, A) = Entropy(T) - \\sum_{v \\in Values(A)} \\frac{|T_v|}{|T|} Entropy(T_v) $$
                    </div>
                    <p class="text-xs text-gray-500 mt-2"><em>Problem: IG loves attributes with many distinct values (like "User ID"), which creates too many tiny, useless branches.</em></p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- Split Information Box -->
                    <div class="bg-indigo-50 border border-indigo-100 rounded-xl p-4 shadow-sm flex flex-col justify-between">
                        <div>
                            <h3 class="font-bold text-indigo-800 mb-1">B. Split Information</h3>
                            <p class="text-xs text-gray-700 mb-2">Also known as Intrinsic Value. It penalizes attributes that split data into too many small, uniform groups.</p>
                        </div>
                        <div class="bg-white p-2 rounded-lg border border-indigo-200 text-center math-scroll overflow-x-auto">
                            $$ SplitInfo_A(T) = - \\sum_{v \\in Values(A)} \\frac{|T_v|}{|T|} \\log_2 \\left( \\frac{|T_v|}{|T|} \\right) $$
                        </div>
                    </div>

                    <!-- Gain Ratio Box -->
                    <div class="bg-rose-50 border border-rose-100 rounded-xl p-4 shadow-sm flex flex-col justify-between">
                        <div>
                            <h3 class="font-bold text-rose-800 mb-1">C. Gain Ratio</h3>
                            <p class="text-xs text-gray-700 mb-2">The ultimate metric! It adjusts Information Gain by dividing it by the Split Information. This prevents the tree from cheating by making overly complex splits.</p>
                        </div>
                        <div class="bg-white p-2 rounded-lg border border-rose-200 text-center math-scroll overflow-x-auto">
                            $$ GainRatio(A) = \\frac{IG(T, A)}{SplitInfo_A(T)} $$
                        </div>
                    </div>
                </div>

                <!-- New Splitting Quality Explanation Button -->
                <div class="pt-1 w-full flex justify-center">
                    <a href="../html/decision_tree_splitting_quality.html" target="_blank" class="inline-flex items-center px-5 py-2.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 font-medium transition-colors shadow-sm text-sm">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Splitting Quality Explanation
                    </a>
                </div>
            </div>
        `
    },
    {
        title: "5. Let's Build One! (Play Tennis?)",
        description: "Here is a trained tree that used these mathematical concepts to decide if we should play tennis based on the weather. Trace a path: If it is <strong>Sunny</strong>, and the <strong>Humidity is High</strong>, what is the prediction?",
        visual: `
            <div class="w-full flex justify-center">
                <svg viewBox="0 0 600 300" class="w-full max-w-2xl h-64 sm:h-80 mt-4 drop-shadow-sm">
                    <path d="M 300 30 L 120 120" stroke="#cbd5e1" stroke-width="3" fill="none" />
                    <path d="M 300 30 L 300 120" stroke="#cbd5e1" stroke-width="3" fill="none" />
                    <path d="M 300 30 L 480 120" stroke="#cbd5e1" stroke-width="3" fill="none" />
                    <text x="180" y="70" font-size="12" fill="#64748b" font-weight="bold">Sunny</text>
                    <text x="310" y="80" font-size="12" fill="#64748b" font-weight="bold">Overcast</text>
                    <text x="420" y="70" font-size="12" fill="#64748b" font-weight="bold">Rain</text>
                    <path d="M 120 150 L 60 230" stroke="#cbd5e1" stroke-width="3" fill="none" />
                    <path d="M 120 150 L 180 230" stroke="#cbd5e1" stroke-width="3" fill="none" />
                    <text x="75" y="190" font-size="12" fill="#64748b" font-weight="bold">High</text>
                    <text x="160" y="190" font-size="12" fill="#64748b" font-weight="bold">Normal</text>
                    <path d="M 480 150 L 420 230" stroke="#cbd5e1" stroke-width="3" fill="none" />
                    <path d="M 480 150 L 540 230" stroke="#cbd5e1" stroke-width="3" fill="none" />
                    <text x="435" y="190" font-size="12" fill="#64748b" font-weight="bold">Strong</text>
                    <text x="520" y="190" font-size="12" fill="#64748b" font-weight="bold">Weak</text>
                    <rect x="230" y="10" width="140" height="30" rx="15" fill="#3b82f6" />
                    <text x="300" y="30" font-size="14" fill="white" text-anchor="middle" font-weight="bold">Outlook?</text>
                    <rect x="60" y="120" width="120" height="30" rx="15" fill="#f59e0b" />
                    <text x="120" y="140" font-size="13" fill="white" text-anchor="middle" font-weight="bold">Humidity?</text>
                    <rect x="250" y="120" width="100" height="30" rx="8" fill="#10b981" />
                    <text x="300" y="140" font-size="13" fill="white" text-anchor="middle" font-weight="bold">Yes</text>
                    <rect x="420" y="120" width="120" height="30" rx="15" fill="#f59e0b" />
                    <text x="480" y="140" font-size="13" fill="white" text-anchor="middle" font-weight="bold">Wind?</text>
                    <rect x="20" y="230" width="80" height="30" rx="8" fill="#ef4444" />
                    <text x="60" y="250" font-size="13" fill="white" text-anchor="middle" font-weight="bold">No</text>
                    <rect x="140" y="230" width="80" height="30" rx="8" fill="#10b981" />
                    <text x="180" y="250" font-size="13" fill="white" text-anchor="middle" font-weight="bold">Yes</text>
                    <rect x="380" y="230" width="80" height="30" rx="8" fill="#ef4444" />
                    <text x="420" y="250" font-size="13" fill="white" text-anchor="middle" font-weight="bold">No</text>
                    <rect x="500" y="230" width="80" height="30" rx="8" fill="#10b981" />
                    <text x="540" y="250" font-size="13" fill="white" text-anchor="middle" font-weight="bold">Yes</text>
                </svg>
            </div>
        `
    },
    {
        title: "6. Coding it in Python (scikit-learn)",
        description: "We do not have to do the math by hand! The popular Python library <strong>scikit-learn</strong> handles it in just a few lines of code. Notice how the mathematical concepts map directly to the code parameters.",
        visual: `
            <div class="w-full flex flex-col items-center mt-2">
                <!-- Code Block -->
                <div class="bg-slate-900 rounded-xl p-5 text-left shadow-lg border border-slate-700 font-mono text-sm sm:text-base overflow-x-auto w-full max-w-3xl leading-relaxed">
                    <div class="text-slate-400 mb-1"># 1. Import the Decision Tree tool</div>
                    <div class="mb-4"><span class="text-pink-400">from</span> <span class="text-slate-100">sklearn.tree</span> <span class="text-pink-400">import</span> <span class="text-emerald-400">DecisionTreeClassifier</span></div>

                    <div class="text-slate-400 mb-1"># 2. Create the model. Notice the 'criterion' parameter?</div>
                    <div class="text-slate-400 mb-1"># This is where we choose the math: 'entropy' or 'gini'</div>
                    <div class="mb-4"><span class="text-slate-100">model</span> <span class="text-pink-400">=</span> <span class="text-emerald-400">DecisionTreeClassifier</span><span class="text-slate-100">(criterion</span><span class="text-pink-400">=</span><span class="text-amber-300">'entropy'</span><span class="text-slate-100">)</span></div>

                    <div class="text-slate-400 mb-1"># 3. Train the tree with our data (This does the heavy math!)</div>
                    <div class="mb-4"><span class="text-slate-100">model</span><span class="text-blue-400">.fit</span><span class="text-slate-100">(X_train, Y_train)</span></div>

                    <div class="text-slate-400 mb-1"># 4. Predict the outcome for new, unseen data</div>
                    <div><span class="text-slate-100">prediction</span> <span class="text-pink-400">=</span> <span class="text-slate-100">model</span><span class="text-blue-400">.predict</span><span class="text-slate-100">([[</span><span class="text-purple-400">0</span><span class="text-slate-100">,</span> <span class="text-purple-400">1</span><span class="text-slate-100">]])</span></div>
                </div>

                <!-- Explanations -->
                <div class="mt-6 w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                    <div class="bg-indigo-50 p-4 rounded-xl border border-indigo-200 shadow-sm">
                        <h4 class="font-bold text-indigo-900 flex items-center gap-2">
                            <span class="text-xl">⚙️</span> The Math Parameter
                        </h4>
                        <p class="text-sm text-gray-700 mt-2">By setting <code>criterion='entropy'</code>, we tell the tree to evaluate splits using <strong>Information Gain</strong>. If we leave it blank, scikit-learn defaults to <strong>Gini Impurity</strong>.</p>
                    </div>
                    <div class="bg-emerald-50 p-4 rounded-xl border border-emerald-200 shadow-sm">
                        <h4 class="font-bold text-emerald-900 flex items-center gap-2">
                            <span class="text-xl">🧠</span> Fit & Predict
                        </h4>
                        <p class="text-sm text-gray-700 mt-2"><code>.fit()</code> runs the recursive algorithm, calculating impurities and creating nodes. <code>.predict()</code> simply drops your new data down the finished tree to see which Leaf Node it lands in.</p>
                    </div>
                </div>
            </div>
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
            <h2 class="text-2xl font-extrabold text-gray-800 mb-3">${step.title}</h2>
            <p class="text-gray-600 text-base leading-relaxed">${step.description}</p>
            <div class="w-full">
                ${step.visual}
            </div>
        `;

        // Tell MathJax to re-evaluate the DOM since we injected new LaTeX formulas
        if (window.MathJax && window.MathJax.typesetPromise) {
            MathJax.typesetPromise([contentContainer]).then(() => {
                // Trigger fade in after math renders
                requestAnimationFrame(() => {
                    contentContainer.classList.remove('fade-enter');
                    contentContainer.classList.add('fade-enter-active');
                });
            }).catch((err) => console.log('MathJax error:', err));
        } else {
            // Fallback fade in if MathJax isn't loaded yet
            requestAnimationFrame(() => {
                contentContainer.classList.remove('fade-enter');
                contentContainer.classList.add('fade-enter-active');
            });
        }
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
        // Restart logic if finished or just disable
        btnNext.disabled = true;
        btnNext.innerHTML = "Completed!";
    }
});

btnPrev.addEventListener('click', () => {
    if (currentStepIndex > 0) {
        btnNext.disabled = false; // Re-enable if it was disabled
        currentStepIndex--;
        renderStep(currentStepIndex);
    }
});

// Initialize first step on load
renderStep(currentStepIndex);