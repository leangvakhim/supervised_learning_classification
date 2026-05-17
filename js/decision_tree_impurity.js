let currentPage = 0;
const totalPages = 5;

function updateUI() {
    // Hide all pages, show active page
    document.querySelectorAll('.page').forEach((el, index) => {
        if (index === currentPage) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });

    // Update progress dots
    const dots = document.getElementById('progress-dots').children;
    for (let i = 0; i < dots.length; i++) {
        if (i <= currentPage) {
            dots[i].classList.remove('bg-slate-300');
            dots[i].classList.add('bg-blue-500');
        } else {
            dots[i].classList.remove('bg-blue-500');
            dots[i].classList.add('bg-slate-300');
        }
    }

    // Update buttons
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');

    if (currentPage === 0) {
        btnPrev.classList.add('opacity-50', 'cursor-not-allowed');
        btnPrev.disabled = true;
    } else {
        btnPrev.classList.remove('opacity-50', 'cursor-not-allowed');
        btnPrev.disabled = false;
    }

    if (currentPage === totalPages - 1) {
        btnNext.disabled = true;
        // btnNext.innerHTML = '<i class="fa-solid fa-rotate-left mr-2"></i> Start Over';
        // btnNext.classList.remove('bg-blue-600', 'hover:bg-blue-700');
        // btnNext.classList.add('bg-emerald-600', 'hover:bg-emerald-700');
    } else {
        btnNext.innerHTML = 'Next <i class="fa-solid fa-arrow-right ml-2"></i>';
        btnNext.classList.add('bg-blue-600', 'hover:bg-blue-700');
        btnNext.classList.remove('bg-emerald-600', 'hover:bg-emerald-700');
    }
}

function changePage(direction) {
    if (direction === 1 && currentPage === totalPages - 1) {
        // Reset on last page
        currentPage = 0;
    } else {
        currentPage += direction;
    }

    // Bounds checking
    if (currentPage < 0) currentPage = 0;
    if (currentPage >= totalPages) currentPage = totalPages - 1;

    updateUI();
}

// Initialize UI
updateUI();