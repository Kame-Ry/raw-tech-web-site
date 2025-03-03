document.addEventListener('DOMContentLoaded', function () {
    // Subscription form handling
    const subscribeForm = document.getElementById('subscribeForm');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const email = document.getElementById('subscribeEmail').value.trim();
            if (email) {
                const formData = new FormData();
                formData.append('email', email);

                fetch('send_subscription.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.text();
                })
                .then(responseText => {
                    alert(responseText);
                    subscribeForm.reset();
                })
                .catch(error => {
                    alert('Oops! Something went wrong: ' + error.message);
                    console.error('Error:', error);
                });
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
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

            const formData = new FormData(contactForm);
            formData.append('g-recaptcha-response', recaptcha);

            fetch('send_email.php', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.text();
            })
            .then(responseText => {
                alert(responseText);
                contactForm.reset();
                if (grecaptcha) grecaptcha.reset(); // Reset reCAPTCHA after successful submission
            })
            .catch(error => {
                alert('Oops! Something went wrong: ' + error.message);
                console.error('Error:', error);
            });
        });
    }
});