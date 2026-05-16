// NAVIGATION LOGIC
const storyScreen = document.getElementById('story-screen');
const gameScreen = document.getElementById('game-screen');
const startGameBtn = document.getElementById('start-game-btn');

startGameBtn.addEventListener('click', () => {
    storyScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    updatePlayground(); // Initial render
});

const slider = document.getElementById('squeeze-slider');
const safeZone = document.getElementById('safe-zone');
const widthValue = document.getElementById('width-value');
const teacherBox = document.getElementById('teacher-box');
const teacherTitle = document.getElementById('teacher-title');
const teacherMessage = document.getElementById('teacher-message');
const teacherIcon = document.getElementById('teacher-icon');
const kids = document.querySelectorAll('.kid');

// Math decoder elements
const mathW = document.getElementById('math-w');
const mathWText = document.getElementById('math-w-text');
const mathRule = document.getElementById('math-rule');
const mathRuleText = document.getElementById('math-rule-text');

// New kids elements
const dropKidsBtn = document.getElementById('drop-kids-btn');
const newKidsContainer = document.getElementById('new-kids-container');

const closestKidDistance = 25;

function updatePlayground() {
    const squeezeForce = parseInt(slider.value);

    const maxRadius = 45;
    const minRadius = 5;
    const currentRadius = maxRadius - ((squeezeForce - 1) * (maxRadius - minRadius) / 9);

    // Update Visuals
    safeZone.style.left = `${50 - currentRadius}%`;
    safeZone.style.right = `${50 - currentRadius}%`;

    const totalWidth = currentRadius * 2;
    widthValue.innerText = `${Math.round(totalWidth)}%`;

    checkRules(currentRadius, squeezeForce);
}

function checkRules(radius, force) {
    kids.forEach(kid => kid.classList.remove('pulse', 'scale-125'));

    mathW.innerText = force;

    if (radius > closestKidDistance) {
        // Rule Broken
        teacherBox.className = "p-4 rounded-xl border-4 mt-6 transition-colors duration-300 bg-red-100 border-red-500 text-red-900";
        teacherIcon.innerText = "🛑";
        teacherTitle.innerText = "RULE BROKEN!";
        teacherMessage.innerHTML = "The Giant is <em>too</em> lazy! The Safe Zone is so wide that kids are trapped inside it. This breaks the math rule: <strong>y(wx + b) ≥ 1</strong>.";

        document.getElementById('apple-1').classList.add('pulse', 'scale-125');
        document.getElementById('orange-1').classList.add('pulse', 'scale-125');

        mathWText.innerHTML = "<span class='text-green-400'>w is small... BUT</span>";
        mathRule.innerHTML = "<span class='text-red-400 font-bold'>&lt; 1 (BROKEN!)</span>";
        mathRuleText.innerHTML = "<span class='text-red-400 font-bold'>Kids are trapped IN the safe zone!</span>";

    } else if (radius < closestKidDistance) {
        // Safe but not optimal
        teacherBox.className = "p-4 rounded-xl border-4 mt-6 transition-colors duration-300 bg-sky-100 border-sky-400 text-sky-900";
        teacherIcon.innerText = "🤔";
        teacherTitle.innerText = "Safe, but small...";
        teacherMessage.innerHTML = "Nobody is in the Safe Zone, which is good. BUT the Giant is pushing too hard (<strong>w is too big</strong>). The computer wants the Giant to relax to make the zone wider!";

        mathWText.innerHTML = "<span class='text-orange-400 font-bold'>w is too BIG! Need to minimize!</span>";
        mathRule.innerHTML = "<span class='text-green-400 font-bold'>&gt; 1 (Followed)</span>";
        mathRuleText.innerHTML = "Kids are safe, but safe zone is too small.";

    } else {
        // Perfect Optimization
        teacherBox.className = "p-4 rounded-xl border-4 mt-6 transition-colors duration-300 bg-green-100 border-green-500 text-green-900 pulse";
        teacherIcon.innerText = "⭐";
        teacherTitle.innerText = "PERFECT BALANCE!";
        teacherMessage.innerHTML = "<strong>THIS IS THE SVM GOAL!</strong> The Giant is as lazy as possible (smallest <strong>w</strong>) without trapping any kids. The edges of the blue zone perfectly touch the closest kids (Support Vectors).";

        document.getElementById('apple-1').classList.add('scale-125');
        document.getElementById('orange-1').classList.add('scale-125');

        mathWText.innerHTML = "<span class='text-green-400 font-bold'>w is perfectly minimized!</span>";
        mathRule.innerHTML = "<span class='text-green-400 font-bold'>= 1 (Perfect!)</span>";
        mathRuleText.innerHTML = "<span class='text-green-400 font-bold'>Kids touch the line, but don't cross!</span>";
    }
}

function dropNewKids() {
    newKidsContainer.innerHTML = '';

    const squeezeForce = parseInt(slider.value);
    const maxRadius = 45;
    const minRadius = 5;
    const currentRadius = maxRadius - ((squeezeForce - 1) * (maxRadius - minRadius) / 9);

    const clumsyApple = document.createElement('div');
    clumsyApple.className = 'kid absolute w-10 h-10 bg-red-300 border-2 border-dashed border-red-600 rounded-full flex items-center justify-center text-xl z-30 opacity-0 transition-opacity duration-500';
    clumsyApple.innerHTML = '🍎';
    clumsyApple.style.top = '50%';

    const appleTripDistance = 35 + Math.random() * 10;
    clumsyApple.style.left = `${appleTripDistance}%`;

    const clumsyOrange = document.createElement('div');
    clumsyOrange.className = 'kid absolute w-10 h-10 bg-orange-300 border-2 border-dashed border-orange-600 rounded-full flex items-center justify-center text-xl z-30 opacity-0 transition-opacity duration-500';
    clumsyOrange.innerHTML = '🍊';
    clumsyOrange.style.top = '20%';

    const orangeTripDistance = 55 + Math.random() * 10;
    clumsyOrange.style.left = `${orangeTripDistance}%`;

    newKidsContainer.appendChild(clumsyApple);
    newKidsContainer.appendChild(clumsyOrange);

    setTimeout(() => {
        clumsyApple.classList.remove('opacity-0');
        clumsyOrange.classList.remove('opacity-0');
    }, 50);

    setTimeout(() => {
        if (currentRadius < 15) {
            teacherBox.className = "p-4 rounded-xl border-4 mt-6 transition-colors duration-300 bg-red-100 border-red-500 text-red-900 pulse";
            teacherIcon.innerText = "💥";
            teacherTitle.innerText = "CRASH! Margin too small!";
            teacherMessage.innerHTML = "Oh no! A clumsy new kid tripped and almost crossed the center line! Because the Giant squeezed too hard (small margin), the kids aren't protected. <strong>This is why we want a BIG margin!</strong>";
        } else {
            teacherBox.className = "p-4 rounded-xl border-4 mt-6 transition-colors duration-300 bg-green-100 border-green-500 text-green-900";
            teacherIcon.innerText = "🛡️";
            teacherTitle.innerText = "Safe! The Margin protected them!";
            teacherMessage.innerHTML = "The new kids tripped, but because the Giant relaxed and made the Safe Zone <strong>huge</strong>, they didn't crash into the other team. The big margin saved the day!";
        }
    }, 600);
}

slider.addEventListener('input', () => {
    newKidsContainer.innerHTML = '';
    updatePlayground();
});

dropKidsBtn.addEventListener('click', dropNewKids);

// Don't run updatePlayground here because the game screen is initially hidden.
// It runs when the "Let's Play" button is clicked.