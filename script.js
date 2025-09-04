function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.add('light-mode');
    themeToggle.innerHTML = '<img src="./assets/img/portfolio/dark-mode.png" alt="Dark Mode" class="theme-icon">';
} else {
    themeToggle.innerHTML = '<img src="./assets/img/portfolio/light-mode.png" alt="Light Mode" class="theme-icon">';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('light-mode')) {
        themeToggle.innerHTML = '<img src="./assets/img/portfolio/dark-mode.png" alt="Dark Mode" class="theme-icon">';
        localStorage.setItem('theme', 'light');
    } else {
        themeToggle.innerHTML = '<img src="./assets/img/portfolio/light-mode.png" alt="Light Mode" class="theme-icon">';
        localStorage.setItem('theme', 'dark');
    }
});