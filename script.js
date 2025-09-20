function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

const themeToggle = document.getElementById("theme-toggle");
const themeToggleMobile = document.getElementById("theme-toggle-mobile");
const body = document.body;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem("theme") || "dark";
if (currentTheme === "light") {
  body.classList.add("light-mode");
  if (themeToggle)
    themeToggle.innerHTML =
      '<img src="./assets/img/portfolio/dark-mode.png" alt="Dark Mode" class="theme-icon">';
  if (themeToggleMobile)
    themeToggleMobile.innerHTML =
      '<img src="./assets/img/portfolio/dark-mode.png" alt="Dark Mode" class="theme-icon">';
} else {
  if (themeToggle)
    themeToggle.innerHTML =
      '<img src="./assets/img/portfolio/light-mode.png" alt="Light Mode" class="theme-icon">';
  if (themeToggleMobile)
    themeToggleMobile.innerHTML =
      '<img src="./assets/img/portfolio/light-mode.png" alt="Light Mode" class="theme-icon">';
}

function toggleTheme() {
  body.classList.toggle("light-mode");

  if (body.classList.contains("light-mode")) {
    if (themeToggle)
      themeToggle.innerHTML =
        '<img src="./assets/img/portfolio/dark-mode.png" alt="Dark Mode" class="theme-icon">';
    if (themeToggleMobile)
      themeToggleMobile.innerHTML =
        '<img src="./assets/img/portfolio/dark-mode.png" alt="Dark Mode" class="theme-icon">';
    localStorage.setItem("theme", "light");
  } else {
    if (themeToggle)
      themeToggle.innerHTML =
        '<img src="./assets/img/portfolio/light-mode.png" alt="Light Mode" class="theme-icon">';
    if (themeToggleMobile)
      themeToggleMobile.innerHTML =
        '<img src="./assets/img/portfolio/light-mode.png" alt="Light Mode" class="theme-icon">';
    localStorage.setItem("theme", "dark");
  }
}

if (themeToggle) themeToggle.addEventListener("click", toggleTheme);
if (themeToggleMobile) themeToggleMobile.addEventListener("click", toggleTheme);

// Skill popup functionality
const skillData = {
  HTML: {
    title: "HTML5",
    level: "Proficiency: Intermediate",
    description:
      "Outside of making this portfolio, I mostly used HTML for school projects. I have been using it since High School over 5 years ago and each time I make a new website I learn new things about it!",
    tags: ["Site Making"],
  },
  CSS: {
    title: "CSS3",
    level: "Proficiency: Intermediate",
    description:
      "I learned CSS at the same time I learned HTML, and I have been using it for over 5 years. I have experience with Flexbox, Grid, animations, and responsive design techniques.",
    tags: ["Flexbox", "Grid", "Animations", "Responsive"],
  },
  Java: {
    title: "Java",
    level: "Proficiency: Advanced",
    description:
      "Java was the first language I ever learnt in primary school. I started by making a simple game where you dodge bouncing enemies using only a JFrame and canvas to paint objects. Java also taught me OOP which become a core fundemental skills later down the line. In University, I learned to use JavaFX to create nice GUI applications. In my free time, I have also used Java to make Minecraft mods using the NeoForge API.",
    tags: ["OOP", "JavaFX", "Minecraft Modding"],
  },
  Python: {
    title: "Python",
    level: "Proficiency: Advanced",
    description:
      "Python became my favourite program language after learning it. I have used Python to make games using Pygame. I have used Python to create machine learning models. Python is even useful outside of coding projects, sometimes I need a simple macro to automate tasks for me, and Python is the perfect language to do that.",
    tags: ["Pygame", "Machine Learning", "Automation"],
  },
  C: {
    title: "C",
    level: "Proficiency: Intermediate",
    description:
      "The first low-level language I learnt. I know the basics of C programming including pointers, memory management, and data structures. However, my experience with C is limited to academic projects where we simply had to make a Sokoban game in the terminal.",
    tags: ["Pointers", "Memory Management", "Data Structures"],
  },
  "C++": {
    title: "C++",
    level: "Proficiency: Beginner",
    description:
      "I have only touched on the very basics of C++. I originally wanted to learn C++ to use Unreal Engine, however, I did not end up making any significant projects in Unreal Engine.",
    tags: ["OOP", "Basics"],
  },
  "C#": {
    title: "C#",
    level: "Proficiency: Beginner",
    description:
      "I learnt C# to use Unity. I have made some small games in Unity, such as a simple 2D platformer, but my usage of C# is mostly limited to Unity.",
    tags: ["Unity", "Game Development"],
  },
  Tensorflow: {
    title: "TensorFlow",
    level: "Proficiency: Intermediate",
    description:
      "I have worked with machine learning in Python using the TensorFlow library. I have built a few neural networks. One is on the popular MNIST dataset for handwritten digit recognition. Another usage was a reinforcement learning Snake AI that learns to play Snake using Deep Q-Learning.",
    tags: ["Neural Networks", "Reinforcement Learning", "Deep Q-Learning"],
  },
  "OpenAI Tools": {
    title: "OpenAI Tools",
    level: "Proficiency: Intermediate",
    description:
      "I have experience integrating OpenAI's GPT models into applications. I have built a few projects that use the OpenAI API to create chatbots and other AI-powered tools. For example, I made a private Discord bot that used GPT models to mimic my personality through prompt engineering. I also created a tool to generate NCEA test questions to help students study for exams.",
    tags: [
      "GPT Integration",
      "Chatbots",
      "Prompt Engineering",
      "Educational Tools",
    ],
  },
};

let currentPopupTimeout;
let currentHoveredSkill = null;
let isPopupVisible = false;

function showSkillPopup(skillName, skillElement) {
  const popup = document.getElementById("skillPopup");
  const data = skillData[skillName];

  if (!data) return;

  // Clear any existing timeout
  clearTimeout(currentPopupTimeout);

  // Store the currently hovered skill
  currentHoveredSkill = skillElement;
  isPopupVisible = true;

  // Update popup content
  document.getElementById("popupTitle").textContent = data.title;
  document.getElementById("popupDescription").textContent = data.description;

  // Update tags
  const tagsContainer = document.getElementById("popupTags");
  tagsContainer.innerHTML = "";
  data.tags.forEach((tag) => {
    const tagElement = document.createElement("span");
    tagElement.className = "tag";
    tagElement.textContent = tag;
    tagsContainer.appendChild(tagElement);
  });

  // Position popup
  updatePopupPosition(skillElement, popup);

  // Show popup
  popup.classList.add("show");

  // Pause animation
  const skillsTrack = document.querySelector(".skills-track");
  if (skillsTrack) {
    skillsTrack.style.animationPlayState = "paused";
  }
}

function updatePopupPosition(skillElement, popup) {
  if (!skillElement || !popup) return;

  const rect = skillElement.getBoundingClientRect();
  const popupWidth = 320;
  const popupHeight = 200; // Approximate popup height

  let left = rect.left + rect.width / 2 - popupWidth / 2; // Center under skill
  let top = rect.bottom + 15; // 15px below skill

  // Ensure popup doesn't go off screen horizontally
  if (left < 10) left = 10;
  if (left + popupWidth > window.innerWidth - 10) {
    left = window.innerWidth - popupWidth - 10;
  }

  // Ensure popup doesn't go off screen vertically
  if (top + popupHeight > window.innerHeight - 10) {
    // Show above the skill if no space below
    top = rect.top - popupHeight - 15;

    // If still not enough space above, show it at the top of viewport
    if (top < 10) {
      top = 10;
    }
  }

  popup.style.left = left + "px";
  popup.style.top = top + "px";
}

function hideSkillPopup() {
  currentPopupTimeout = setTimeout(() => {
    const popup = document.getElementById("skillPopup");
    popup.classList.remove("show");

    // Clear the currently hovered skill
    currentHoveredSkill = null;
    isPopupVisible = false;

    // Resume animation
    const skillsTrack = document.querySelector(".skills-track");
    if (skillsTrack) {
      skillsTrack.style.animationPlayState = "running";
    }
  }, 100);
}

function hidePopupImmediately() {
  clearTimeout(currentPopupTimeout);
  const popup = document.getElementById("skillPopup");
  popup.classList.remove("show");
  currentHoveredSkill = null;
  isPopupVisible = false;

  // Resume animation
  const skillsTrack = document.querySelector(".skills-track");
  if (skillsTrack) {
    skillsTrack.style.animationPlayState = "running";
  }
}

// Throttle function to limit how often we update popup position
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Throttled version of updatePopupPosition for scroll events
const throttledUpdatePosition = throttle(() => {
  if (currentHoveredSkill && isPopupVisible) {
    const popup = document.getElementById("skillPopup");
    if (popup.classList.contains("show")) {
      updatePopupPosition(currentHoveredSkill, popup);
    }
  }
}, 16); // ~60fps

// Add event listeners to skills
document.addEventListener("DOMContentLoaded", function () {
  hidePopupImmediately();
  const skills = document.querySelectorAll(".skill");

  skills.forEach((skill) => {
    const skillName = skill.querySelector("p").textContent;

    skill.addEventListener("mouseenter", () => {
      showSkillPopup(skillName, skill);
    });

    skill.addEventListener("mouseleave", () => {
      hideSkillPopup();
    });
  });

  // Also hide popup when hovering over the popup itself and then leaving
  const popup = document.getElementById("skillPopup");
  if (popup) {
    popup.addEventListener("mouseenter", () => {
      clearTimeout(currentPopupTimeout);
    });

    popup.addEventListener("mouseleave", () => {
      hideSkillPopup();
    });
  }

  // Update popup position on scroll instead of hiding it
  window.addEventListener("scroll", throttledUpdatePosition);

  // Update popup position on window resize
  window.addEventListener("resize", throttledUpdatePosition);

  // Hide popup when clicking outside
  document.addEventListener("click", (e) => {
    if (
      isPopupVisible &&
      !e.target.closest(".skill") &&
      !e.target.closest(".skill-popup")
    ) {
      hidePopupImmediately();
    }
  });
});

// Demo data with instructions and controls
const demoData = {
  "Timeless Trivia": {
    url: "./timeless_trivia/timeless_trivia.html",
    controls: [
      "Use ARROW KEYS to move your character",
      "Press SPACEBAR to jump",
      "Use Q, W, E, and R to shoot answer bullets A, B, C, and D",
      "Hold LCtrl to stop time and view the enemies questions",
      "Shoot the right answer at the enemies to defeat them",
    ],
  },
  "DOTS AI": {
    url: "./dots_ai/index.html",
    controls: [
      "Keyboard Controls:",
      "1: Spawn an obstacle (red), will kill dots when they touch them.",
      "2: Spawn a checkpoint (blue), will act as guidance for which direction the dot should move in if they are struggling to make progress.",
      "WASD: Control the width and height of the obstacle or checkpoint being spawned.",
      "LCtrl: Halves the speed of width or height increase. (For fine adjustments.)",
      "7: Start learning.",
      "8: Stop learning. Will wipe all memory and current AI.",
      "9: Pause learning.",
      "0: Toggle view mode. Only the best dot of the previous generation will be displayed (blue).",
      "- & +: Change the speed of the program down and up respectively.",
      "[ & ]: Change the Mutation Rate of the new generations down and up respectively.",
      "; & ': Change the max step count (how many movement a dot can have before they die) down and up respectively.",
    ],
  },
};

let currentDemoUrl = "";

function openDemoModal(title, url) {
  const modal = document.getElementById("demoModal");
  const modalTitle = document.getElementById("modalTitle");
  const instructionsDiv = document.getElementById("demoInstructions");
  const demoFrame = document.getElementById("demoFrame");
  const controlsSection = document.getElementById("controlsSection");

  modalTitle.textContent = title;
  currentDemoUrl = url;

  // Show instructions, hide iframe
  instructionsDiv.style.display = "block";
  demoFrame.style.display = "none";
  demoFrame.src = "";

  // Populate controls
  const demo = demoData[title];
  if (demo) {
    controlsSection.innerHTML = demo.controls
      .map(
        (control) =>
          `<div class="control-item">
        <span class="control-bullet">•</span>
        <span class="control-text">${control}</span>
      </div>`
      )
      .join("");
  }

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function launchDemo() {
  const instructionsDiv = document.getElementById("demoInstructions");
  const demoFrame = document.getElementById("demoFrame");

  if (currentDemoUrl && currentDemoUrl !== "#") {
    // Hide instructions, show iframe
    instructionsDiv.style.display = "none";
    demoFrame.style.display = "block";
    demoFrame.src = currentDemoUrl;
  } else {
    // If no demo available, show alert
    alert(
      "No web demo available for this project. Please check the GitHub repository for the source code."
    );
  }
}

function closeDemoModal() {
  const modal = document.getElementById("demoModal");
  const demoFrame = document.getElementById("demoFrame");
  const instructionsDiv = document.getElementById("demoInstructions");

  modal.style.display = "none";
  demoFrame.src = "";
  demoFrame.style.display = "none";
  instructionsDiv.style.display = "block";
  document.body.style.overflow = "auto";
  currentDemoUrl = "";
}

// Close modal when clicking outside the modal content
document.getElementById("demoModal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeDemoModal();
  }
});

// Close modal with Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeDemoModal();
  }
});
