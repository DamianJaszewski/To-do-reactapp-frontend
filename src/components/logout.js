import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId =
  '336662310506-4igcid1j5ooangt7goli9fj5l5dpggc9.apps.googleusercontent.com';

function Logout() {
  const onSuccess = () => {
    console.log('Logout made successfully');
    alert('Logout made successfully ✌');
  };

  return (
    <div class="col">
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;