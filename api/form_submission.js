document.addEventListener('DOMContentLoaded', function () {
    // Subscription form handling
    const subscribeForm = document.getElementById('subscribeForm');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            const email = document.getElementById('subscribeEmail').value.trim();

            if (email) {
                try {
                    const response = await fetch('https://raw-tech-email.vercel.app/api/subscribe', {
                        method: 'POST',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email })
                    });

                    const result = await response.json();
                    alert(result.success || result.error);
                    subscribeForm.reset();
                } catch (error) {
                    alert('Oops! Something went wrong: ' + error.message);
                    console.error('Error:', error);
                }
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            // Client-side validation
            const firstName = document.getElementById('first-name').value.trim();
            const lastName = document.getElementById('last-name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const recaptcha = document.querySelector('.g-recaptcha-response').value;

            if (!firstName || !lastName || !email || !message || !recaptcha) {
                alert('Please fill in all required fields and complete the CAPTCHA.');
                return;
            }

            try {
                const response = await fetch('https://raw-tech-email.vercel.app/api/contact', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ firstName, lastName, email, message, recaptcha })
                });

                const result = await response.json();
                alert(result.success || result.error);
                contactForm.reset();
                if (grecaptcha) grecaptcha.reset(); // Reset reCAPTCHA after successful submission
            } catch (error) {
                alert('Oops! Something went wrong: ' + error.message);
                console.error('Error:', error);
            }
        });
    }
});
