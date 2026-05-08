// Data for each step of the interactive guide
const steps = [
    {
        title: "1. The Foundation: Right & Wrong",
        content: `
            <p class="mb-4 text-lg">Before we calculate anything, we need to understand the 4 possible outcomes when a model makes a prediction.</p>
            <p class="mb-6">Imagine a doctor predicting if a patient is <strong>Sick (Positive)</strong> or <strong>Healthy (Negative)</strong>.</p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="p-4 bg-green-50 border border-green-200 rounded-xl">
                    <h3 class="font-bold text-green-800 text-lg">True Positive (TP) ✔️</h3>
                    <p class="text-green-700 text-sm">Doctor says Sick. Patient is actually Sick. (Correct)</p>
                </div>
                <div class="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <h3 class="font-bold text-blue-800 text-lg">True Negative (TN) ✔️</h3>
                    <p class="text-blue-700 text-sm">Doctor says Healthy. Patient is actually Healthy. (Correct)</p>
                </div>
                <div class="p-4 bg-orange-50 border border-orange-200 rounded-xl">
                    <h3 class="font-bold text-orange-800 text-lg">False Positive (FP) ❌</h3>
                    <p class="text-orange-700 text-sm">Doctor says Sick, but Patient is Healthy. (False Alarm)</p>
                </div>
                <div class="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <h3 class="font-bold text-red-800 text-lg">False Negative (FN) ❌</h3>
                    <p class="text-red-700 text-sm">Doctor says Healthy, but Patient is Sick. (Missed it! Dangerous)</p>
                </div>
            </div>
        `
    },
    {
        title: "2. The Confusion Matrix",
        content: `
            <p class="mb-6 text-lg">We organize those 4 outcomes into a table called the <strong>Confusion Matrix</strong>. It helps us see exactly <i>how</i> our model is confused.</p>

            <div class="flex justify-center my-8">
                <div class="flex flex-col items-center">
                    <div class="text-sm font-semibold text-slate-500 mb-2 tracking-widest uppercase">Predicted Class</div>
                    <div class="flex">
                        <div class="flex flex-col justify-center mr-2 text-sm font-semibold text-slate-500 transform -rotate-180" style="writing-mode: vertical-rl;">
                            <span class="tracking-widest uppercase">Actual Class</span>
                        </div>
                        <div class="grid grid-cols-2 gap-2 text-center">
                            <div class="bg-green-100 text-green-800 p-6 rounded-lg border-2 border-green-300 flex flex-col justify-center">
                                <span class="text-2xl font-bold">TP</span>
                                <span class="text-xs">True Positive</span>
                            </div>
                            <div class="bg-red-100 text-red-800 p-6 rounded-lg border-2 border-red-300 flex flex-col justify-center">
                                <span class="text-2xl font-bold">FN</span>
                                <span class="text-xs">False Negative</span>
                            </div>
                            <div class="bg-orange-100 text-orange-800 p-6 rounded-lg border-2 border-orange-300 flex flex-col justify-center">
                                <span class="text-2xl font-bold">FP</span>
                                <span class="text-xs">False Positive</span>
                            </div>
                            <div class="bg-blue-100 text-blue-800 p-6 rounded-lg border-2 border-blue-300 flex flex-col justify-center">
                                <span class="text-2xl font-bold">TN</span>
                                <span class="text-xs">True Negative</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "3. Accuracy",
        content: `
            <p class="mb-4 text-lg"><strong>Accuracy</strong> answers: <span class="text-blue-600 italic">"Out of all the predictions we made, how many were totally right?"</span></p>

            <div class="bg-slate-50 border border-slate-200 p-6 rounded-xl my-6 text-center">
                <p class="text-slate-700">It is simply the correct predictions (TP + TN) divided by the total number of predictions.</p>
            </div>

            <h4 class="font-bold text-slate-800 mb-2">When is it bad?</h4>
            <p class="text-slate-600 bg-red-50 p-4 border-l-4 border-red-400 rounded-r-lg">
                Accuracy is terrible for <strong>imbalanced data</strong>. Imagine a rare disease that only 1 in 100 people get. If the doctor just lazily says "Everyone is healthy" without checking, they are 99% accurate! But they completely missed the 1 sick person.
            </p>
        `
    },
    {
        title: "4. Precision",
        content: `
            <p class="mb-4 text-lg"><strong>Precision</strong> answers: <span class="text-blue-600 italic">"When the model predicts 'Positive' (Sick), how often is it actually correct?"</span></p>

            <div class="flex items-center space-x-4 my-6">
                <div class="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-3xl shrink-0">🎯</div>
                <p class="text-slate-700">Precision focuses on reducing <strong>False Positives</strong>. You want high precision when a false alarm is costly.</p>
            </div>

            <div class="bg-blue-50 p-4 border-l-4 border-blue-400 rounded-r-lg mt-4">
                <strong class="text-blue-900 block mb-1">Example: Spam Email Filter</strong>
                <span class="text-blue-800">You want high precision here. It's annoying if a real email (Negative) goes to the Spam folder (Predicted Positive). You only want it to say "Spam" if it is VERY sure.</span>
            </div>
        `
    },
    {
        title: "5. Recall (Sensitivity)",
        content: `
            <p class="mb-4 text-lg"><strong>Recall</strong> answers: <span class="text-blue-600 italic">"Out of all the truly 'Positive' (Sick) cases, how many did the model successfully find?"</span></p>

            <div class="flex items-center space-x-4 my-6">
                <div class="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-3xl shrink-0">🔍</div>
                <p class="text-slate-700">Recall focuses on reducing <strong>False Negatives</strong>. You want high recall when missing a positive case is dangerous.</p>
            </div>

            <div class="bg-red-50 p-4 border-l-4 border-red-400 rounded-r-lg mt-4">
                <strong class="text-red-900 block mb-1">Example: Cancer Detection</strong>
                <span class="text-red-800">You want high recall here. It is much worse to tell a sick patient they are healthy (False Negative) than to accidentally run a few extra tests on a healthy person (False Positive).</span>
            </div>
        `
    },
    {
        title: "6. F1-Score",
        content: `
            <p class="mb-4 text-lg">There is usually a trade-off: if you increase Precision, Recall goes down, and vice versa. The <strong>F1-Score</strong> combines them both!</p>

            <div class="bg-purple-50 border border-purple-200 p-6 rounded-xl my-6 flex flex-col md:flex-row items-center gap-6">
                <div class="flex-1 text-purple-900">
                    <p>It is the "Harmonic Mean" of Precision and Recall. It gives us a single, balanced number to judge our model by.</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm border border-purple-100 text-center shrink-0">
                    <span class="block text-xs text-slate-400 uppercase tracking-wide mb-1">Perfect Score</span>
                    <span class="text-3xl font-bold text-purple-600">1.0</span>
                </div>
            </div>

            <p class="text-slate-600">Use the F1-Score instead of Accuracy when you have imbalanced classes (e.g., lots of healthy people, very few sick people).</p>
        `
    },
    {
        title: "7. The Equations Summary",
        content: `
            <p class="mb-4 text-slate-600 text-lg">Here are the mathematical formulas for the metrics we just discussed. They all derive straight from the Confusion Matrix.</p>

            <div class="space-y-4 font-mono text-sm sm:text-base">
                <!-- Accuracy Equation -->
                <div class="bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between">
                    <span class="font-bold text-slate-800 mb-2 sm:mb-0">Accuracy =</span>
                    <div class="bg-white px-4 py-2 border border-slate-200 rounded text-center">
                        <span class="text-green-600">TP</span> + <span class="text-blue-600">TN</span>
                        <hr class="border-slate-300 my-1">
                        <span class="text-green-600">TP</span> + <span class="text-blue-600">TN</span> + <span class="text-orange-600">FP</span> + <span class="text-red-600">FN</span>
                    </div>
                </div>

                <!-- Precision Equation -->
                <div class="bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between">
                    <span class="font-bold text-slate-800 mb-2 sm:mb-0">Precision =</span>
                    <div class="bg-white px-4 py-2 border border-slate-200 rounded text-center">
                        <span class="text-green-600">TP</span>
                        <hr class="border-slate-300 my-1">
                        <span class="text-green-600">TP</span> + <span class="text-orange-600">FP</span>
                    </div>
                </div>

                <!-- Recall Equation -->
                <div class="bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between">
                    <span class="font-bold text-slate-800 mb-2 sm:mb-0">Recall =</span>
                    <div class="bg-white px-4 py-2 border border-slate-200 rounded text-center">
                        <span class="text-green-600">TP</span>
                        <hr class="border-slate-300 my-1">
                        <span class="text-green-600">TP</span> + <span class="text-red-600">FN</span>
                    </div>
                </div>

                <!-- F1 Score Equation -->
                <div class="bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between">
                    <span class="font-bold text-slate-800 mb-2 sm:mb-0">F1-Score =</span>
                    <div class="bg-white px-4 py-2 border border-slate-200 rounded text-center flex items-center">
                        <span>2 &times;&nbsp;</span>
                        <div class="inline-block align-middle text-center">
                            Precision &times; Recall
                            <hr class="border-slate-300 my-1">
                            Precision + Recall
                        </div>
                    </div>
                </div>
            </div>
        `
    }
];

let currentStepIndex = 0;

// DOM Elements
const contentArea = document.getElementById('content-area');
const btnNext = document.getElementById('btn-next');
const btnPrev = document.getElementById('btn-prev');
const progressBar = document.getElementById('progress-bar');
const stepIndicator = document.getElementById('step-indicator');

// Function to render the current step
function renderStep() {
    const step = steps[currentStepIndex];

    // Remove animation class to restart it
    contentArea.classList.remove('fade-in');

    // Trigger reflow to restart animation
    void contentArea.offsetWidth;

    // Add content and animation class
    contentArea.innerHTML = `
        <h2 class="text-2xl font-bold text-slate-800 mb-6">${step.title}</h2>
        ${step.content}
    `;
    contentArea.classList.add('fade-in');

    // Update Progress Bar & Indicator
    const progressPercentage = ((currentStepIndex + 1) / steps.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    stepIndicator.textContent = `Step ${currentStepIndex + 1} of ${steps.length}`;

    // Update Buttons State
    btnPrev.disabled = currentStepIndex === 0;
    btnNext.disabled = currentStepIndex === steps.length - 1;

    if (currentStepIndex === steps.length - 1) {
        btnNext.innerHTML = "Finish &#10003;";
    } else {
        btnNext.innerHTML = "Next Step &rarr;";
    }
}

// Event Listeners for Navigation
btnNext.addEventListener('click', () => {
    if (currentStepIndex < steps.length - 1) {
        currentStepIndex++;
        renderStep();
    }
});

btnPrev.addEventListener('click', () => {
    if (currentStepIndex > 0) {
        currentStepIndex--;
        renderStep();
    }
});

// Initialize first step on load
renderStep();