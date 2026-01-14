// Navbar tablet view: toggle on/off
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger-nav');
const iconMenu = document.getElementById('nav-menu');
const iconClose = document.getElementById('nav-close');
hamburger.addEventListener('click', () => {
	const isNavHidden = navbar.classList.contains('md:hidden');;
	navbar.classList.toggle('md:hidden');
	navbar.classList.toggle('md:flex');
	iconMenu.classList.toggle('hidden', isNavHidden);
	iconClose.classList.toggle('hidden', !isNavHidden);
});

// Patient panel