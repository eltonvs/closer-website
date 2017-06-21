$(() => {
  let $login_signup_modal = $('#login-signup-modal');
  if (!$login_signup_modal.length)
    return false;

  let $modal_title = $('#modal-login-signup-title');
  let $form_login = $('#login-form');
  let $form_signup = $('#signup-form');
  let $forms_container = $('#forms-container');
  let $login_alert = $('#login-alert');
  let $signup_alert = $('#signup-alert');
  let $btn_login_signup = $('#login-signup-link');

  $.get(CONFIG.server.check_url, data => {
    if (data.status) {
      $btn_login_signup.text('Dashboard');
      $btn_login_signup.attr('href', 'dashboard.html');
      $btn_login_signup.attr('data-target', false);
      $btn_login_signup.attr('data-toggle', false);
    }
  }, 'json');

  const switch_modal = ($old, $new, title) => {
    $modal_title.text(title);
    $btn_login_signup.text(title);
    $forms_container.css('height', $old.height());
    $old.fadeOut('fast', () => $forms_container.animate({height: $new.height()}, 'fast', () => $new.fadeIn('fast')));
  };

  const update_alert_login = data => {
    $login_alert.removeClass();
    if (data.status) {
      $login_alert
        .addClass('alert alert-success')
        .text('User Logged with success! Redirecting...');
      window.location.replace('dashboard.html');
    } else {
      $login_alert
        .addClass('alert alert-danger')
        .html(`<strong>Login Failed</strong>: ${data.error}`);
      $forms_container.css('height', $form_login.height());
    }
  };

  const update_alert_signup = data => {
    $signup_alert.removeClass();
    if (data.status) {
      $signup_alert
        .addClass('alert alert-success')
        .text('User Registered with success!');
    } else {
      $signup_alert
        .addClass('alert alert-danger')
        .html(`<strong>Register Failed</strong>: ${data.error}`);
    }
    $forms_container.css('height', $form_signup.height());
  };

  $form_login.submit(event => {
    event.preventDefault();
    $.post(CONFIG.server.auth_url, $form_login.serialize(), data => update_alert_login(data), 'json');
  });

  $form_signup.submit(event => {
    event.preventDefault();
    $.post(CONFIG.server.register_url, $form_signup.serialize(), data => update_alert_signup(data), 'json');
  });

  $('#signup_btn').click(() => switch_modal($form_login, $form_signup, 'Sign up'));
  $('#login_btn').click(() => switch_modal($form_signup, $form_login, 'Login'));
});
