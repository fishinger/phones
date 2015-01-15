var restApp = angular.module( 'restApp', [] )
.factory('phoneListFactory', ['$http', '$q', function($http, $q){
	var phones = null,
		phonesJsonUrl = 'json/phone.json';
	return {
		getPhoneList: function(){
			var deferred = $q.defer();
			$http({method: 'GET', url: phonesJsonUrl}).success(function(data){
				phones = data.list;
				deferred.resolve(data);
			}).error(function(){
				deferred.reject('Error url json')
			})
			return deferred.promise;
		}
	}
}])

.controller( 'mainCtrl', [ '$scope', function( $scope ){
	
}])
.controller( 'phoneListCtrl', [ '$scope', 'phoneListFactory', function($scope, phoneListFactory){
	phoneListFactory.getPhoneList().then(function(listObj){
		$scope.phones = listObj.list;
	})
}])
