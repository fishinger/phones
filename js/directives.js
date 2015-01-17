restApp
.directive('detailPages', ['phoneListFactory', function(phoneListFactory){
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
			})

			
		}
	}
}])