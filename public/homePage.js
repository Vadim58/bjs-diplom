const logoutButton = new LogoutButton();
logoutButton.action = () => ApiConnector.logout(function callback() {
    return location.reload();
})

ApiConnector.current(function callback(response) {
    if (response.success === true) {
        return ProfileWidget.showProfile(response.data)
    }
})

const ratesBoard = new RatesBoard();

function getCurrencyRates() {
    return ApiConnector.getStocks(function callback(response) {
        if (response.success === true) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    })
}
getCurrencyRates(ratesBoard);
setInterval(getCurrencyRates, 60000);

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => getAddMoney(data);

function getAddMoney(data) {
    return ApiConnector.addMoney(data, function callback(response) {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            return moneyManager.setMessage(true, 'Успешно!');
        } else {
            return moneyManager.setMessage(false, response.error);
        }
    })
}

moneyManager.conversionMoneyCallback = (data) => getConvert(data);

function getConvert(data) {
    return ApiConnector.convertMoney(data, function callback(response) {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            return moneyManager.setMessage(true, 'Успешно!')
        } else {
            return moneyManager.setMessage(false, response.error)
        }
    })
}

moneyManager.sendMoneyCallback = (data) => getMoneySend(data);

function getMoneySend(data) {
    return ApiConnector.transferMoney(data, function callback(response) {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            return moneyManager.setMessage(true, 'Успешно!')
        } else {
            return moneyManager.setMessage(false, response.error)
        }
    })
}

const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(function callback(response) {
    if (response.success === true) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
})

favoritesWidget.addUserCallback = (data) => getAddUser(data);

function getAddUser(data) {
    ApiConnector.addUserToFavorites(data, function callback(response) {
        if (response.success === true) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            return favoritesWidget.setMessage(true, 'Пользователь добавлен!');
        } else {
            return favoritesWidget.setMessage(false, response.error);
        }
    })
}

favoritesWidget.removeUserCallback = (userID) => getDeleteFromFavorites(userID);

function getDeleteFromFavorites(userID) {
    ApiConnector.removeUserFromFavorites(userID, function callback(response) {
        if (response.success === true) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            return favoritesWidget.setMessage(true, 'Пользователь удален!');
        } else {
            return favoritesWidget.setMessage(false, response.error);
        }
    })
}