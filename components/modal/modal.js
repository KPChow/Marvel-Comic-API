var app = angular.module('marvelApiApp');

app.component('modal', {
	bindings: {
		view: "<" // One-way binding
	},

	// Load the template
	templateUrl: "components/modal/modal.template.html",
	controller: function($scope, $http) {
		this.$onInit = function() {
			
		}

		console.log("show comic");
		console.log(this.view);
	}
});