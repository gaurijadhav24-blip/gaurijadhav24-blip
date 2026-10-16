// Feedback Form Handler - saves to Supabase (with a localStorage fallback disabled by default).
function initializeFeedback() {
  const feedbackForm = document.getElementById('userFeedbackForm');
  if (feedbackForm) feedbackForm.addEventListener('submit', handleFeedbackSubmit);
}

async function handleFeedbackSubmit(event) {
  event.preventDefault();

  const form = document.getElementById('userFeedbackForm');
  const submitButton = form?.querySelector('button[type="submit"]');
  const name = document.getElementById('feedbackName')?.value.trim() || 'Anonymous';
  const userType = document.getElementById('feedbackUserType')?.value;
  const rating = document.querySelector('input[name="rating"]:checked')?.value;
  const feedback = document.getElementById('feedbackText')?.value.trim();
  const suggestions = document.getElementById('feedbackSuggestions')?.value.trim() || null;

  if (!userType || !rating || !feedback) {
    alert('Please fill in all required fields.');
    return;
  }

  if (!learnAbleSupabase) {
    alert('Feedback database is not configured yet. Please try again later or contact the website team.');
    console.error('Supabase is not configured. Check js/supabase.js and the Supabase CDN script.');
    return;
  }

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';
  }

  const { error } = await learnAbleSupabase.from('feedback').insert({
    name,
    user_type: userType,
    rating: Number.parseInt(rating, 10),
    feedback_text: feedback,
    suggestions
  });

  if (error) {
    console.error('Could not save feedback:', error);
    alert('Sorry, your feedback could not be saved. Please try again.');
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = 'Submit Feedback';
    }
    return;
  }

  const successMessage = document.getElementById('feedbackSuccess');
  if (form && successMessage) {
    form.classList.add('hidden');
    successMessage.classList.remove('hidden');
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeFeedback);
} else {
  initializeFeedback();
}
