// JavaScript code for CAPTCHA generation and form submission
const captchaContainer = document.getElementById('captcha');
const contactForm = document.getElementById('contact-form');

// Generate CAPTCHA
function generateCaptcha() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let captcha = '';

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    captcha += characters.charAt(randomIndex);
  }

  return captcha;
}

// Render CAPTCHA
function renderCaptcha() {
  const captcha = generateCaptcha();
  captchaContainer.textContent = captcha;
}

// Form submission
function submitForm(event) {
  event.preventDefault();

  // Validate CAPTCHA
  const captchaInput = document.getElementsByName('captcha')[0];
  const captchaValue = captchaInput.value.trim().toLowerCase();
  const captchaText = captchaContainer.textContent.toLowerCase();

  if (captchaValue !== captchaText) {
    alert('Incorrect CAPTCHA. Please try again.');
    captchaInput.value = '';
    captchaInput.focus();
    renderCaptcha();
    return;
  }

  // Submit form data to server (dummy code)
  const formData = new FormData(contactForm);
  for (const pair of formData.entries()) {
    console.log(pair[0] + ': ' + pair[1]);
    
  }
  alert('Form submitted successfully..!!!');
  // Clear form fields
  contactForm.reset();
  captchaInput.value = '';
  renderCaptcha();
}

// Attach event listener
contactForm.addEventListener('submit', submitForm);

// Initial CAPTCHA generation
renderCaptcha();