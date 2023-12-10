// scroll up to top page
const scrollUpBtn = document.getElementById('scroll-up-btn');

        scrollUpBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

// Toggle class active
const navbarNav = document.querySelector('.navbar-nav');

// Return to home page
function returnToHomePage() {
      window.location.href = "../index.html";
      return false;
  }
