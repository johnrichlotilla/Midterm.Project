document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Prevent default hash jump behavior
        e.preventDefault();

        // Get the target element ID
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth' // This is the magic for smooth scroll
            });
        }
    });
});




// Get all the section IDs from the navigation links
const sectionIds = Array.from(document.querySelectorAll('.nav-links a'))
    .map(link => link.getAttribute('href'));

// Get all the actual section elements
const sections = sectionIds.map(id => document.querySelector(id)).filter(el => el != null);

// Options for the Intersection Observer
const observerOptions = {
    root: null, // viewport
    rootMargin: '0px',
    // Set threshold to 30% visible before it's considered active
    threshold: 0.3
};

// Callback function to run when a section enters or exits the viewport
const observerCallback = (entries) => {
    entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);

        if (navLink) {
            // Check if the link should be active
            if (entry.isIntersecting) {
                // Remove 'active' from all other links
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                // Add 'active' to the current link
                navLink.classList.add('active');
            }
        }
    });
};

// Create the Intersection Observer
const observer = new IntersectionObserver(observerCallback, observerOptions);

// Start observing all main content sections
sections.forEach(section => {
    observer.observe(section);
});

// Fallback: Ensure 'Home' is active if at the very top of the page
window.addEventListener('scroll', () => {
    if (window.scrollY < sections[0].clientHeight / 2) {
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector('.nav-links a[href="#home"]').classList.add('active');
    }
});