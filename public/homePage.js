const logoutButton = new LogoutButton();
apiww = () => 
function callback() {
    return location.reload();
}

logoutButton.action = () => ApiConnector.logout(callback = response => { if(response.succes === true) return location.reload()});


