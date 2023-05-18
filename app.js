
const captchaContainer = document.getElementById('captcha');
const contactForm = document.getElementById('contact-form');


function generateCaptcha() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let captcha = '';

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    captcha += characters.charAt(randomIndex);
  }

  return captcha;
}


function renderCaptcha() {
  const captcha = generateCaptcha();
  captchaContainer.textContent = captcha;
}


function submitForm(event) {
  event.preventDefault();

 
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

 
  const formData = new FormData(contactForm);
  for (const pair of formData.entries()) {
    console.log(pair[0] + ': ' + pair[1]);
    
  }
  alert('Form submitted successfully..!!!');
 
  contactForm.reset();
  captchaInput.value = '';
  renderCaptcha();
}


contactForm.addEventListener('submit', submitForm);


renderCaptcha();