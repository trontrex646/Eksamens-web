import emailjs from '@emailjs/browser';

const EMAILJS_PUBLIC_KEY = 'bbY8Z1C5gWMRod8MM';
const EMAILJS_SERVICE_ID = 'service_fhy0v2p';
const EMAILJS_TEMPLATE_ID = 'template_g9tg0fc';

export function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  
  // Initialize EmailJS
  emailjs.init(EMAILJS_PUBLIC_KEY);
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    
    try {
      // Disable submit button and show loading state
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      
      // Get form data
      const formData = new FormData(form);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
      };
      
      // Send email
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        data
      );
      
      // Show success message
      showNotification('Message sent successfully!', 'success');
      
      // Reset form
      form.reset();
      
    } catch (error) {
      console.error('Error sending email:', error);
      showNotification('Failed to send message. Please try again.', 'error');
      
    } finally {
      // Re-enable submit button
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.remove();
  }, 3000);
} 