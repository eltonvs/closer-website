$(function() {
  let $login_signup_modal = $('#login-signup-modal');
  if (!$login_signup_modal.length)
    return false;

  let $modal_title = $('#modal-login-signup-title');
  let $form_login = $('#login-form');
  let $form_signup = $('#signup-form');
  let $forms_container = $('#forms-container');

  const switch_modal = ($oldForm, $newForm, title) => {
    $modal_title.text(title);
    $forms_container.css('height', $oldForm.height());
    $oldForm.fadeOut('fast', () => $forms_container.animate({height: $newForm.height()}, 'fast', () => $newForm.fadeIn('fast')));
  };

  $form_login.submit(() => {
    // Ajax...
  });

  $form_signup.submit(() => {
    // Validate and ajax...
  });

  $('#signup_btn').click(() => switch_modal($form_login, $form_signup, 'Sign up'));
  $('#login_btn').click(() => switch_modal($form_signup, $form_login, 'Login'));
});
