'use strict';
const userForm = new UserForm();

userForm.loginFormCallback = data => tryLogIn(data);


function tryLogIn(data) {
	return ApiConnector.login(data, function callback() {
      try {
  	     return location.reload();
     }
      catch { 
     }
  })
}


userForm.registerFormCallback = data => tryAuthorize(data);
function tryAuthorize(data) {
    return ApiConnector.register(data, function callback() {
        try {
            return location.reload();
        } 
        catch {}
    })
}
