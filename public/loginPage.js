'use strict';
const userForm = new UserForm();

userForm.loginFormCallback = data => tryLogIn(data);
function tryLogIn(data) {
	return ApiConnector.login(data, function callback(result) {
      if(result.success === true) {
  	     return location.reload();
     }
      else { 
      	return userForm.setLoginErrorMessage(result.error);
     }
  })
}
userForm.registerFormCallback = data => tryAuthorize(data);
function tryAuthorize(data) {
    return ApiConnector.register(data, function callback(result) {
        if (result.success === true) {
            return location.reload();
        } 
        else {
        	return userForm.setRegisterErrorMessage(result.error);
        }
    })
}
