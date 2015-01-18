restApp
.directive('detailPages', ['phoneListFactory', 'cartFactory', '$rootScope', function(phoneListFactory, cartFactory, $rootScope){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'tmp-pages/datailPages.html',
		scope: {},
		controller: function($scope){
			$('#detailPhone').page();
			$scope.$on('open-item', function(){
				$scope.itemPhone = phoneListFactory.getItemPhone();
				$scope.currency = phoneListFactory.getCurrency();
			});
			$scope.addCart = function(){
				cartFactory.addToCart($scope.itemPhone);
				$rootScope.$broadcast('open-cart');
				$.mobile.changePage('#cartPage', {transition: 'slideup'});
			}

		}
	}
}])
.directive('cartPages', ['phoneListFactory', 'cartFactory', function(phoneListFactory, cartFactory){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'tmp-pages/cartPages.html',
		scope: {},
		controller: function($scope){
			$('#cartPage').page();
			$scope.$on('open-cart', function(){
				$scope.cartPhones = cartFactory.getCart();
				$scope.countPrice = cartFactory.getTotal();
			})
		}
	}
}])