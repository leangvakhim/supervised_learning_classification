// Data for each step of the visualization
const steps = [
    {
        title: "What is Naive Bayes?",
        content: `
            <div class="text-center space-y-6">
                <i class="fa-solid fa-scale-balanced text-6xl text-blue-400 mb-4"></i>
                <p class="text-xl leading-relaxed text-slate-600">
                    <strong>Naive Bayes</strong> is a simple but surprisingly powerful Machine Learning algorithm used for classification. It relies on probability to predict the category of new data.
                </p>
                <p class="text-lg text-slate-500">
                    To understand it, let's look at a simple scenario: <br>
                    <span class="text-blue-600 font-semibold text-xl">Will our friend play tennis today based on the weather?</span>
                </p>
                <div class="flex justify-center gap-8 mt-8">
                    <div class="p-4 border rounded-xl bg-blue-50 border-blue-100 flex flex-col items-center w-32">
                        <i class="fa-solid fa-sun text-yellow-500 text-3xl mb-2"></i>
                        <span class="font-medium text-sm">Sunny</span>
                    </div>
                    <div class="p-4 border rounded-xl bg-gray-50 border-gray-200 flex flex-col items-center w-32">
                        <i class="fa-solid fa-cloud-rain text-gray-500 text-3xl mb-2"></i>
                        <span class="font-medium text-sm">Rainy</span>
                    </div>
                    <div class="flex items-center text-gray-400"><i class="fa-solid fa-arrow-right text-2xl"></i></div>
                    <div class="p-4 border rounded-xl bg-green-50 border-green-200 flex flex-col items-center w-32">
                        <i class="fa-solid fa-table-tennis text-green-600 text-3xl mb-2"></i>
                        <span class="font-medium text-sm">Play? (Yes/No)</span>
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "1. The Historical Data",
        content: `
            <div class="space-y-6">
                <p class="text-lg text-slate-600">
                    Machine learning models need data to learn. Here is our historical record of the last 5 days. It shows the weather and whether our friend played tennis.
                </p>
                <div class="flex justify-center">
                    <table class="w-full max-w-md text-left border-collapse bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
                        <thead>
                            <tr class="bg-gray-100 text-gray-700">
                                <th class="py-3 px-4 border-b">Day</th>
                                <th class="py-3 px-4 border-b">Weather (Feature)</th>
                                <th class="py-3 px-4 border-b">Play Tennis? (Label)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b hover:bg-gray-50"><td class="py-2 px-4">1</td><td class="py-2 px-4"><i class="fa-solid fa-sun text-yellow-500 mr-2"></i> Sunny</td><td class="py-2 px-4 font-bold text-red-500">No</td></tr>
                            <tr class="border-b hover:bg-gray-50"><td class="py-2 px-4">2</td><td class="py-2 px-4"><i class="fa-solid fa-sun text-yellow-500 mr-2"></i> Sunny</td><td class="py-2 px-4 font-bold text-green-600">Yes</td></tr>
                            <tr class="border-b hover:bg-gray-50"><td class="py-2 px-4">3</td><td class="py-2 px-4"><i class="fa-solid fa-cloud-rain text-gray-500 mr-2"></i> Rain</td><td class="py-2 px-4 font-bold text-green-600">Yes</td></tr>
                            <tr class="border-b hover:bg-gray-50"><td class="py-2 px-4">4</td><td class="py-2 px-4"><i class="fa-solid fa-cloud-rain text-gray-500 mr-2"></i> Rain</td><td class="py-2 px-4 font-bold text-red-500">No</td></tr>
                            <tr class="hover:bg-gray-50"><td class="py-2 px-4">5</td><td class="py-2 px-4"><i class="fa-solid fa-sun text-yellow-500 mr-2"></i> Sunny</td><td class="py-2 px-4 font-bold text-green-600">Yes</td></tr>
                        </tbody>
                    </table>
                </div>
                <p class="text-center text-slate-500 mt-4 text-sm bg-blue-50 p-3 rounded-lg border border-blue-100 inline-block w-full">
                    <strong>Summary:</strong> Total 5 days. Played: 3 days. Didn't play: 2 days.
                </p>
            </div>
        `
    },
    {
        title: "2. The Equation (Bayes' Theorem)",
        content: `
            <div class="space-y-6">
                <p class="text-lg text-slate-600">
                    The algorithm uses <strong>Bayes' Theorem</strong> to calculate probabilities. Here is the mathematical foundation:
                </p>

                <div class="bg-white border-2 border-blue-100 rounded-xl p-8 shadow-sm flex flex-col items-center">
                    <!-- Math Equation -->
                    <div class="flex items-center text-2xl font-serif text-slate-800 mb-8">
                        <span>P(Class | Data) = </span>
                        <div class="flex flex-col items-center mx-4">
                            <span class="border-b-2 border-slate-800 pb-2 px-2">P(Data | Class) &times; P(Class)</span>
                            <span class="pt-2 px-2">P(Data)</span>
                        </div>
                    </div>

                    <!-- Explanation Grid -->
                    <div class="grid grid-cols-2 gap-4 w-full max-w-2xl text-sm">
                        <div class="bg-blue-50 p-4 rounded-lg">
                            <strong class="text-blue-700 block mb-1">P(Class | Data) - Posterior</strong>
                            Probability of playing tennis (Class) given it's Sunny (Data). <span class="italic text-gray-500">This is what we want to predict!</span>
                        </div>
                        <div class="bg-green-50 p-4 rounded-lg">
                            <strong class="text-green-700 block mb-1">P(Data | Class) - Likelihood</strong>
                            How often is it Sunny when we actually play tennis?
                        </div>
                        <div class="bg-purple-50 p-4 rounded-lg">
                            <strong class="text-purple-700 block mb-1">P(Class) - Prior</strong>
                            Overall probability of playing tennis on any random day.
                        </div>
                        <div class="bg-orange-50 p-4 rounded-lg">
                            <strong class="text-orange-700 block mb-1">P(Data) - Evidence</strong>
                            Overall probability of a Sunny day.
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "3. Learning (Calculating Frequencies)",
        content: `
            <div class="space-y-4">
                <p class="text-lg text-slate-600">
                    During the "training" phase, Naive Bayes creates frequency tables from our historical data to find the probabilities needed for our equation.
                </p>

                <div class="flex gap-6 justify-center mt-6">
                    <!-- Overall Probability -->
                    <div class="bg-white border border-gray-200 p-5 rounded-xl shadow-sm w-1/3">
                        <h3 class="font-bold text-slate-700 border-b pb-2 mb-3">Overall P(Class)</h3>
                        <p class="mb-2">Total Days: 5</p>
                        <p class="text-green-600 font-semibold mb-1">Play = Yes: 3/5</p>
                        <p class="text-red-500 font-semibold">Play = No: 2/5</p>
                    </div>

                    <!-- Weather Probability given Class -->
                    <div class="bg-white border border-blue-200 p-5 rounded-xl shadow-sm w-1/2">
                        <h3 class="font-bold text-blue-800 border-b border-blue-100 pb-2 mb-3">Likelihood P(Data | Class)</h3>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <strong class="text-sm text-gray-500 block">When Play = YES (3 days)</strong>
                                <ul class="text-sm space-y-1 mt-1">
                                    <li>Sunny: <span class="font-bold text-blue-600">2/3</span></li>
                                    <li>Rain: 1/3</li>
                                </ul>
                            </div>
                            <div>
                                <strong class="text-sm text-gray-500 block">When Play = NO (2 days)</strong>
                                <ul class="text-sm space-y-1 mt-1">
                                    <li>Sunny: <span class="font-bold text-blue-600">1/2</span></li>
                                    <li>Rain: 1/2</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "4. Why is it called \"Naive\"?",
        content: `
            <div class="flex flex-col items-center text-center space-y-6">
                <div class="bg-yellow-50 text-yellow-600 p-4 rounded-full mt-4">
                    <i class="fa-solid fa-lightbulb text-4xl"></i>
                </div>
                <p class="text-xl leading-relaxed text-slate-600 max-w-2xl">
                    It is called <strong>Naive</strong> because it assumes that every feature is completely independent of the others.
                </p>
                <div class="bg-gray-50 border border-gray-200 p-6 rounded-xl max-w-2xl text-left text-slate-600">
                    <p class="mb-3">
                        In our simple example, we only have one feature (Weather). But what if we added <strong>Temperature</strong>?
                    </p>
                    <p class="italic">
                        Naive Bayes assumes that Weather and Temperature have no effect on each other. It calculates them separately and multiplies them together. Even though we know in real life that Sunny days are often Hot, Naive Bayes ignores this connection to keep the math simple and fast!
                    </p>
                </div>
            </div>
        `
    },
    {
        title: "5. Making a Prediction",
        content: `
            <div class="space-y-6">
                <div class="bg-blue-600 text-white p-4 rounded-xl text-center shadow-md">
                    <h3 class="text-xl font-bold">New Data Arrives!</h3>
                    <p class="text-blue-100 mt-1">Today is <span class="font-bold text-yellow-300">Sunny</span>. Will our friend play tennis?</p>
                </div>

                <p class="text-slate-600">We calculate the score for "Yes" and "No" using our formula: <strong>P(Sunny|Class) &times; P(Class)</strong> <br><span class="text-sm text-gray-400">*We ignore dividing by P(Data) because it's the same for both sides.</span></p>

                <div class="grid grid-cols-2 gap-6">
                    <!-- YES calculation -->
                    <div class="border-2 border-green-200 bg-green-50 p-5 rounded-xl">
                        <h4 class="font-bold text-green-800 mb-3 text-lg border-b border-green-200 pb-2">Score for YES</h4>
                        <div class="space-y-2 font-mono text-sm text-green-900">
                            <p>P(Sunny | Yes) = 2/3</p>
                            <p>P(Yes) = 3/5</p>
                            <div class="border-t border-green-300 pt-2 mt-2 font-bold text-base">
                                Score = (2/3) &times; (3/5) = 6/15
                                <br><span class="text-xl text-green-700">= 0.40</span>
                            </div>
                        </div>
                    </div>

                    <!-- NO calculation -->
                    <div class="border-2 border-red-200 bg-red-50 p-5 rounded-xl">
                        <h4 class="font-bold text-red-800 mb-3 text-lg border-b border-red-200 pb-2">Score for NO</h4>
                        <div class="space-y-2 font-mono text-sm text-red-900">
                            <p>P(Sunny | No) = 1/2</p>
                            <p>P(No) = 2/5</p>
                            <div class="border-t border-red-300 pt-2 mt-2 font-bold text-base">
                                Score = (1/2) &times; (2/5) = 2/10
                                <br><span class="text-xl text-red-700">= 0.20</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "6. The Final Conclusion",
        content: `
            <div class="flex flex-col items-center justify-center text-center space-y-8 mt-4">
                <div class="flex items-end justify-center gap-8 w-full max-w-md h-32">
                    <!-- Bar Chart Visual -->
                    <div class="flex flex-col items-center w-24">
                        <span class="mb-2 font-bold text-green-600">0.40</span>
                        <div class="w-full bg-green-500 rounded-t-lg h-24 animate-[bounce_1s_ease-in-out]"></div>
                        <span class="mt-2 font-semibold">YES</span>
                    </div>
                    <div class="flex flex-col items-center w-24">
                        <span class="mb-2 font-bold text-red-500">0.20</span>
                        <div class="w-full bg-red-400 rounded-t-lg h-12"></div>
                        <span class="mt-2 font-semibold">NO</span>
                    </div>
                </div>

                <div class="bg-blue-50 border border-blue-200 p-6 rounded-xl max-w-lg">
                    <h2 class="text-2xl font-bold text-blue-800 mb-2">Prediction: YES</h2>
                    <p class="text-slate-600 text-lg">
                        Because <strong>0.40</strong> is greater than <strong>0.20</strong>, the Naive Bayes algorithm predicts that our friend <strong>will</strong> play tennis today!
                    </p>
                </div>

                <div class="text-sm text-gray-500 mt-4">
                    <i class="fa-solid fa-check-circle text-green-500 mr-1"></i> Fast, simple, and effective for large datasets.
                </div>
            </div>
        `
    }
];

let currentStep = 0;

// DOM Elements
const contentContainer = document.getElementById('content-container');
const stepCounter = document.getElementById('step-counter');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const progressDots = document.getElementById('progress-dots');

// Initialize App
function init() {
    // Generate dots
    steps.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `w-2.5 h-2.5 rounded-full transition-colors duration-300 ${index === 0 ? 'bg-blue-600' : 'bg-gray-300'}`;
        dot.id = `dot-${index}`;
        progressDots.appendChild(dot);
    });

    updateUI();
}

// Update Content and Controls
function updateUI() {
    // Update Text
    stepCounter.innerText = `Step ${currentStep + 1} of ${steps.length}`;

    // Fade Out transition
    contentContainer.classList.remove('fade-in');
    contentContainer.classList.add('fade-out');

    setTimeout(() => {
        // Update HTML content
        contentContainer.innerHTML = `
            <h2 class="text-3xl font-bold text-slate-800 mb-6">${steps[currentStep].title}</h2>
            ${steps[currentStep].content}
        `;

        // Fade In transition
        contentContainer.classList.remove('fade-out');
        contentContainer.classList.add('fade-in');
    }, 200); // match part of the CSS transition time

    // Update Buttons
    btnPrev.disabled = currentStep === 0;
    if (currentStep === steps.length - 1) {
        btnNext.innerHTML = 'Finish <i class="fa-solid fa-check"></i>';
        btnNext.classList.replace('bg-blue-600', 'bg-green-600');
        btnNext.classList.replace('hover:bg-blue-700', 'hover:bg-green-700');
        btnNext.classList.replace('shadow-blue-200', 'shadow-green-200');
    } else {
        btnNext.innerHTML = 'Next <i class="fa-solid fa-arrow-right"></i>';
        btnNext.classList.replace('bg-green-600', 'bg-blue-600');
        btnNext.classList.replace('hover:bg-green-700', 'hover:bg-blue-700');
        btnNext.classList.replace('shadow-green-200', 'shadow-blue-200');
    }

    // Update Dots
    steps.forEach((_, index) => {
        const dot = document.getElementById(`dot-${index}`);
        if (index === currentStep) {
            dot.classList.replace('bg-gray-300', 'bg-blue-600');
        } else {
            dot.classList.replace('bg-blue-600', 'bg-gray-300');
        }
    });
}

// Event Listeners
btnNext.addEventListener('click', () => {
    if (currentStep < steps.length - 1) {
        currentStep++;
        updateUI();
    } else {
        // Restart when finished
        currentStep.disabled = true;
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

// Run
init();