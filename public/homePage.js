const logoutButton = new LogoutButton();

logoutButton.action = () => ApiConnector.logout( function callback(){
 return location.reload();	
})


