var restApp = angular.module( 'restApp', [] )
.factory('phoneListFactory', ['$http', '$q', function($http, $q){
	var phones = null,
		currency = 0,
		phonesJsonUrl = 'json/phone.json',
		itemPrice = 0,
		itemCamera = 0,
		itemDisk = 0,
		itemInternet = 0,
		itemPhone = 0;
	return {
		getPhoneList: function(){
			var deferred = $q.defer();
			$http({method: 'GET', url: phonesJsonUrl}).success(function(data){
				phones = data.list;
				currency = data.currency;
				deferred.resolve(data);
			}).error(function(){
				deferred.reject('Error url json')
			})
			return deferred.promise;
		},
		getCurrency: function(){
			return currency
		},
		getFilterPrice: function(price){
			var newFiltPrice = price.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
			return newFiltPrice;
		},
		setItemPhone: function(newItem){
			itemPhone = newItem;
		},
		getItemPhone: function(){
			return itemPhone
		},
		setItemPrice: function(){

		}
	}
}])
.factory('cartFactory', [function(){
	var cart = [];
	return {
		getLengthCart: function(){
			return cart.length
		},
		addToCart: function(phone){
			var newPhone = {};
			newPhone.name = phone.name;
			newPhone.id = phone.id;
			newPhone.price = phone.price;
			cart.push(newPhone)
		},
		getCart: function(){
			return cart
		},
		getTotal: function(){
			var total = 0;
			if(cart.length > 0){
				for(var i = 0; i < cart.length; i++){
					total += cart[i].price;
				}
			}
			return total
		}
	}
}])
.controller( 'mainCtrl', [ '$scope', function( $scope ){
	
}])
.controller( 'phoneListCtrl', [ '$scope', 'phoneListFactory', '$rootScope', function($scope, phoneListFactory, $rootScope){
	phoneListFactory.getPhoneList().then(function(listObj){
		$scope.phones = listObj.list;
		$scope.currency = listObj.currency;
	})
	$scope.openDetail = function(item){
		phoneListFactory.setItemPhone(item);
		$rootScope.$broadcast('open-item');
		$.mobile.changePage('#phoneDetail', {transition: 'slideup'});

	}

}])
