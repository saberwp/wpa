// @TODO provide click event for each install button with callback that does API fetch call to endpoint installer.

function attachInstallButtonClickEvent() {
  const installButtons = document.querySelectorAll('.wpa-app-install-button');

  installButtons.forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault();

      const data = {
        'app_key': button.getAttribute('app-key'),
      };

      fetch('/wp-json/wpa/app/install/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (response.ok) {
            console.log('App install successful!');
          } else {
            console.error('App install failed!');
          }
        })
        .catch(error => {
          console.error('App install failed!', error);
        });
    });
  });
}

attachInstallButtonClickEvent();
