const logoutButton = new LogoutButton();
logoutButton.action = () => ApiConnector.logout( function callback(){
 return location.reload();	
})

ApiConnector.current(function callback(response) {
	if(response.success === true) {
      return ProfileWidget.showProfile(response.data)
	}
})

const ratesBoard = new RatesBoard();
function getCurrencyRates () {
	return ApiConnector.getStocks(function callback(response) {
		if(response.success === true) {
			 ratesBoard.clearTable();
             ratesBoard.fillTable(response.data);
		}
	})
}
getCurrencyRates(ratesBoard);
setInterval(getCurrencyRates, 6000);

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => getAddMoney(data);
function getAddMoney(data) {
         return ApiConnector.addMoney(data, function callback(response) {
            if(response.success === true) {            
            	ProfileWidget.showProfile(response.data);
            	return moneyManager.setMessage(response.data);
            } 
            else {
                  return moneyManager.setMessage(response.errorMessageBlock);
          }
      })  
}
