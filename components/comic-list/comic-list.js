var app = angular.module('marvelApiApp');

app.component('comicList', {
	bindings: {
		dateApi: "<", // One-way binding
		view: "<",
		onViewChange: "&" // Allow callbacks
	},

	// Load the template
	templateUrl: "components/comic-list/comic-list.template.html",
	controller: function($scope, $http) {
		this.$onInit = function() {
			//alert(this.date);

			$http({
	      		method: "GET",
	      		url: this.dateApi
		    }).then(function successCallback(response) {
		      	$scope.thisWeekComics = response.data.data.results;
		      	$scope.thisWeekLoading = false;
		    });
		},

		this.showComicDetails = function(view) {
			this.view = view;
			this.onViewChange({$event: {view: view}});

			// Semantic UI - Opens modal box
			$('.ui.modal')
				.modal('setting', 'transition', 'fade up')
				.modal('show');
		}
	}
});