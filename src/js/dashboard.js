/* global Chart */

$(() => {
  // verify if is on dashboard page request
  let $dashboard_wrapper = $('#dashboard');
  if (!$dashboard_wrapper.length)
    return false;

  let $user_name = $('#user-name');
  let $products_list = $('#products-list');
  let $form_register_product = $('#register-product');
  let $loading_div = $('#loading-div').hide();

  $form_register_product.submit(event => {
    event.preventDefault();
    $.post(CONFIG.server.register_product_url, $form_register_product.serialize(), data => update_dashboard(), 'json');
  });

  let update_dashboard = () => {
    // Request data from server
    $.ajax({
      type: 'GET',
      url: CONFIG.server.dash_url,
      beforeSend: () => $loading_div.show(),
      success: data => {
        if (data) {
          update_name(data.name);
          update_products(data.products);
        } else {
          do_logout();
        }
        $loading_div.fadeOut();
      },
      dataType: 'JSON'
    });
  };

  // Update Dashboard
  update_dashboard();

  // Create functions to update data
  let update_name = name => $user_name.text(name);

  let update_products = products => {
    $products_list.removeClass();
    if (!products || !products.length) {
      $products_list.addClass('alert alert-info');
      $products_list.text('No products found. Register a new product!');
    } else {
      let products_list_html = '<ul>';
      products.forEach(product => products_list_html += `<li>${product.name} - <a href="#" data-remove-product="${product.name}">Remove Product</a></li>`);
      products_list_html += '</ul>';
      $products_list.html(products_list_html);

      $('a[data-remove-product]').click(function (event) {
        event.preventDefault();
        let $this = $(this);
        $.post(CONFIG.server.remove_product_url, {name: $this.data('remove-product')}, data => update_dashboard(), 'json');
      });
    }
  };

  let update_charts = data => {
    let ctx = document.getElementById('canvas').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['14/06', '15/06', '16/06', '17/06', '18/06', '19/06', '20/06'],
        datasets: [{
          label: '# of Visitors',
          data: [12, 19, 23, 15, 17, 20, 18],
          backgroundColor: ['rgba(255, 99, 132, 0.2)'],
          borderColor: ['rgba(255,99,132,1)'],
          borderWidth: 1
        },
        {
          label: '# of Buyers',
          data: [6, 17, 15, 7, 7, 15, 12],
          backgroundColor: ['rgba(54, 162, 235, 0.2)'],
          borderColor: ['rgba(54, 162, 235, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {beginAtZero: true}
          }]
        }
      }
    });
  };

  update_charts();
});
