emailjs.init('HSwpVqrwZkX8zURpF');

document.addEventListener('DOMContentLoaded', () => {
  loadContactFormComponent().then(() => {
    initContactForm();
  });
});

function loadContactFormComponent() {
  return fetch('/components/contact_form.html')
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      return res.text();
    })
    .then(html => {
      document.getElementById('contact').innerHTML = html;
    })
    .catch(err => {
      console.error('Fetch error:', err);
      document.getElementById('contact').innerHTML = "<p>Error loading form. Please try again later.</p>";
    });
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusDiv = document.getElementById('form-status');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    if (typeof grecaptcha === 'undefined') {
      statusDiv.textContent = 'reCAPTCHA is not loaded yet. Please wait.';
      statusDiv.style.color = 'red';
      return;
    }

    const recaptchaResponse = grecaptcha.getResponse();

    if (!recaptchaResponse) {
      statusDiv.textContent = 'Please complete the reCAPTCHA!';
      statusDiv.style.color = 'red';
      return;
    }

    const formData = {
      user_name: document.getElementById('user_name').value,
      user_email: document.getElementById('user_email').value,
      message: document.getElementById('message').value,
      'g-recaptcha-response': recaptchaResponse,
    };

    statusDiv.textContent = 'Sending...';
    statusDiv.style.color = '#000';

    emailjs.send('gmail_service', 'contact_form', formData)
      .then(() => {
        statusDiv.textContent = 'Message sent successfully!';
        statusDiv.style.color = 'green';
        form.reset();
        grecaptcha.reset();
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        statusDiv.textContent = 'Error sending message. Please try again.';
        statusDiv.style.color = 'red';
        grecaptcha.reset();
      });
  });
}
