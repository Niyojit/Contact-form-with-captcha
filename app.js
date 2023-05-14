const form = document.getElementById("contact-form");
const status = document.getElementById("status");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = form.elements.name.value;
  const email = form.elements.email.value;
  const message = form.elements.message.value;
  const captcha = form.elements["g-recaptcha-response"].value;

  // Verify reCAPTCHA response
  const response = await fetch("verify-captcha.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `captcha=${captcha}`
  });
  const result = await response.json();

  if (result.success) {
    // reCAPTCHA verification successful, submit the form
    status.innerHTML = "Sending...";
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);
    const submitResponse = await fetch(form.action, {
      method: form.method,
      body: formData
    });
    if (submitResponse.ok) {
      form.reset();
      status.innerHTML = "Thank you for your message!";
    } else {
      status.innerHTML = "Oops! There was a problem submitting the form.";
    }
  } else {
    // reCAPTCHA verification failed
    status.innerHTML = "Please complete the reCAPTCHA verification.";
  }
});
