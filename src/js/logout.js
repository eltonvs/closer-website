const do_logout = () => {
  $.get(CONFIG.server.logout_url, data => {
    if (data.status) {
      window.location.replace('index.html');
    }
  }, 'json');
};

$(() => {
  let logout_link = $('#logout-link');
  if (!logout_link.length)
    return false;

  logout_link.click(event => {
    event.preventDefault();
    do_logout();
  });
});
