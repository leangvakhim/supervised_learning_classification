// State management
let currentPage = 1;
const totalPages = 6;

// DOM Elements
const btnBack = document.getElementById('btn-back');
const btnNext = document.getElementById('btn-next');
const progressText = document.getElementById('progress-text');
const progressBar = document.getElementById('progress-bar');

// Setup Event Listeners
btnNext.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        updateView();
    }
});

btnBack.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        updateView();
    }
});

// Core logic to handle UI updates
function updateView() {
    // 1. Hide all sections
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.add('hidden');
        section.classList.remove('fade-in'); // Reset animation
    });

    // 2. Show current section
    const currentSection = document.getElementById(`page-${currentPage}`);
    currentSection.classList.remove('hidden');
    // Small delay to re-trigger CSS animation
    setTimeout(() => currentSection.classList.add('fade-in'), 10);

    // 3. Update Progress Bar
    progressText.innerText = `Page ${currentPage} of ${totalPages}`;
    progressBar.style.width = `${(currentPage / totalPages) * 100}%`;

    // 4. Update Button States
    btnBack.disabled = (currentPage === 1);

    if (currentPage === totalPages) {
        btnNext.innerText = "Finish 🏁";
        btnNext.classList.replace('bg-indigo-600', 'bg-teal-500');
        btnNext.classList.replace('hover:bg-indigo-700', 'hover:bg-teal-600');
        btnNext.disabled = true; // Optional: disable on last page
    } else {
        btnNext.innerText = "Next Step →";
        btnNext.classList.replace('bg-teal-500', 'bg-indigo-600');
        btnNext.classList.replace('hover:bg-teal-600', 'hover:bg-indigo-700');
        btnNext.disabled = false;
    }
}

// Initialize view on load
updateView();