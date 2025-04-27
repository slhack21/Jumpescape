document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const body = document.body;
    const downloadButtons = document.querySelectorAll('.download-button');
    const loginModal = document.getElementById('login-modal');
    const loginOverlay = document.getElementById('login-overlay');
    const closeModalButton = document.getElementById('close-modal');
    const loginForm = document.getElementById('login-form');
    // New elements for register view
    const registerForm = document.getElementById('register-form');
    const loginView = document.getElementById('login-view');
    const registerView = document.getElementById('register-view');
    const showRegisterLink = document.getElementById('show-register-link');
    const showLoginLink = document.getElementById('show-login-link');
    const modalTitle = document.getElementById('modal-title');


    // --- Sidebar Logic ---
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            body.classList.toggle('sidebar-active');
        });
    }

    document.addEventListener('click', (event) => {
        const mainContent = document.querySelector('main');
        const contactSection = document.querySelector('.contact-section');

        // Close sidebar on outside click
        if (sidebar.classList.contains('active') &&
            !menuToggle.contains(event.target) &&
            !sidebar.contains(event.target)) {
             if (mainContent.contains(event.target) || (contactSection && contactSection.contains(event.target)) || event.target === body) {
                 sidebar.classList.remove('active');
                 body.classList.remove('sidebar-active');
            }
        }

        // Close modal on overlay click
        if (loginModal && !loginModal.classList.contains('hidden') && event.target === loginOverlay) {
             hideLoginModal();
        }
    });

    // --- Modal Logic ---
    function showLoginModal() {
        if (loginModal && loginOverlay) {
            // Ensure login view is shown by default
            loginView.classList.remove('hidden');
            registerView.classList.add('hidden');
            modalTitle.textContent = 'Connexion requise';
            // Show the modal
            loginOverlay.classList.remove('hidden');
            loginModal.classList.remove('hidden');
        }
    }

    function hideLoginModal() {
        if (loginModal && loginOverlay) {
            loginOverlay.classList.add('hidden');
            loginModal.classList.add('hidden');
             // Optional: Reset forms when hiding
             loginForm.reset();
             if (registerForm) registerForm.reset();
        }
    }

    // Show modal when download button is clicked
    downloadButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            console.log(`Download attempt for: ${button.closest('.mod-card').querySelector('h3').textContent}`); // Log which mod was clicked
            showLoginModal();
        });
    });

    // Hide modal when close button is clicked
    if (closeModalButton) {
        closeModalButton.addEventListener('click', hideLoginModal);
    }

    // --- Login/Register Form Switching ---
    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', (event) => {
            event.preventDefault();
            loginView.classList.add('hidden');
            registerView.classList.remove('hidden');
            modalTitle.textContent = 'Inscription'; // Change title
        });
    }

    if (showLoginLink) {
        showLoginLink.addEventListener('click', (event) => {
            event.preventDefault();
            registerView.classList.add('hidden');
            loginView.classList.remove('hidden');
            modalTitle.textContent = 'Connexion requise'; // Change title back
        });
    }

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent actual form submission
            const email = document.getElementById('email').value;
            // Basic validation example (can be expanded)
            if (!email) {
                alert('Veuillez entrer votre email.');
                return;
            }
            // Simulate login attempt
            console.log(`Login attempt with email: ${email}`);
            alert('Connexion simulée réussie ! Le téléchargement commencerait maintenant.'); // Replace with actual login logic later
            hideLoginModal();
            // !! IMPORTANT: In a real application, you would verify credentials
            // and *then* initiate the download if successful.
            // For now, we just close the modal.
        });
    }

     // Handle registration form submission
    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent actual form submission
            const prenom = document.getElementById('register-prenom').value;
            const nom = document.getElementById('register-nom').value;
            const email = document.getElementById('register-email').value;
            // Basic validation example (can be expanded)
            if (!prenom || !nom || !email) {
                 alert('Veuillez remplir tous les champs requis (Prénom, Nom, Email).');
                return;
            }
             // Simulate registration attempt
            console.log(`Registration attempt: Prénom=${prenom}, Nom=${nom}, Email=${email}`);
            alert('Inscription simulée réussie ! Vous pouvez maintenant vous connecter.'); // Replace with actual registration logic later
            // Switch back to login view after successful registration simulation
            registerView.classList.add('hidden');
            loginView.classList.remove('hidden');
            modalTitle.textContent = 'Connexion requise';
             loginForm.reset(); // Clear login form in case user typed something before registering
             registerForm.reset(); // Clear registration form
            // Or alternatively, hide the modal completely:
            // hideLoginModal();
        });
    }
});