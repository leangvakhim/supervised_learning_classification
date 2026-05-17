document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const totalSteps = slides.length;
    let currentStep = 1;

    const btnNext = document.getElementById('btn-next');
    const btnPrev = document.getElementById('btn-prev');
    const stepDisplay = document.getElementById('current-step');
    const totalDisplay = document.getElementById('total-steps');

    totalDisplay.textContent = totalSteps;

    function updateUI() {
        // Update slides visibility
        slides.forEach((slide, index) => {
            if (index + 1 === currentStep) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Update counter
        stepDisplay.textContent = currentStep;

        // Update button states
        btnPrev.disabled = currentStep === 1;

        if (currentStep === totalSteps) {
            btnNext.innerHTML = `Finish <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;
            btnNext.classList.remove('bg-indigo-600', 'hover:bg-indigo-700');
            btnNext.classList.add('bg-emerald-600', 'hover:bg-emerald-700');
        } else {
            btnNext.innerHTML = `Next <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>`;
            btnNext.classList.add('bg-indigo-600', 'hover:bg-indigo-700');
            btnNext.classList.remove('bg-emerald-600', 'hover:bg-emerald-700');
        }

        // Trigger MathJax re-render for the active slide if needed
        if (window.MathJax) {
            MathJax.typesetPromise([slides[currentStep - 1]]).catch((err) => console.log('MathJax error:', err));
        }
    }

    btnNext.addEventListener('click', () => {
        if (currentStep < totalSteps) {
            currentStep++;
            updateUI();
        } else {
            // Reset to beginning when finished
            currentStep = 1;
            updateUI();
        }
    });

    btnPrev.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateUI();
        }
    });

    // Initialize UI
    updateUI();
});