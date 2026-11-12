const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');

// Record the time when the form loads
const formLoadTime = Date.now();

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    statusEl.textContent = '';
    statusEl.className = 'form-status';

    // Check honeypot
    const honeypotField = form.honeypot.value; // Get the honeypot value
    if (honeypotField) {
        return showSuccessMessage(); // If filled, drop submission and show success message
    }

    // Timing check
    const timeTaken = Date.now() - formLoadTime; // Calculate time taken
    if (timeTaken < 3000) {
        return showSuccessMessage(); // If less than 3 seconds, drop submission
    }

    const data = Object.fromEntries(new FormData(form));

    try {
        const response = await fetch('/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        const result = await response.json();

        if (!result.ok) {
            throw new Error(result.error || 'Something went wrong.');
        }

        form.reset();
        showSuccessMessage(); // Show success message if no errors
    } catch (error) {
        statusEl.textContent = error.message || 'Something went wrong. Please email hello@calicomedial.co instead.';
        statusEl.classList.add('form-status-error');
    } finally {
        button.disabled = false; // Re-enable the button
    }
});

// Function to show success message
function showSuccessMessage() {
    form.reset();
    statusEl.textContent = "Thanks, we'll be in touch within one business day.";
    statusEl.classList.add('form-status-success');
}

// const form = document.getElementById('contact-form');
// const statusEl = document.getElementById('form-status');

// form.addEventListener('submit', async (event) => {
//   event.preventDefault();

//   const button = form.querySelector('button[type="submit"]');
//   button.disabled = true;
//   statusEl.textContent = '';
//   statusEl.className = 'form-status';

//   const data = Object.fromEntries(new FormData(form));

//   try {
//     const response = await fetch('/contact', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data),
//     });
//     const result = await response.json();

//     if (!result.ok) {
//       throw new Error(result.error || 'Something went wrong.');
//     }

//     form.reset();
//     statusEl.textContent = "Thanks, we'll be in touch within one business day.";
//     statusEl.classList.add('form-status--success');
//   } catch (error) {
//     statusEl.textContent = error.message || 'Something went wrong. Please email hello@calicomedia.co instead.';
//     statusEl.classList.add('form-status--error');
//   } finally {
//     button.disabled = false;
//   }
// });
