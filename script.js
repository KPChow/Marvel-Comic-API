var marvelApiApp = angular.module("marvelApiApp", []);

// Construct the $getAPI
var $publicKey      = "c39c7775247a7d615b70c1e7b2dfa8c3";
var $privateKey     = "6d10c96fd458fda09f8ece2d51fad3386d53320d";
var $date           = new Date();
var $time           = $date.getTime();
var $hash           = $.md5($time + $privateKey + $publicKey);
var $url            = "https://gateway.marvel.com/v1/public/";

marvelApiApp.controller("MainCtrl", function($scope, $http) {

  this.view = "";

  this.$onInit = function() {
    // Single Comic API call
    $scope.getComicCover = function() {
      // Comic ID starts from 2 and goes up to 54959
      var $comicID = Math.floor(Math.random() * 54959) + 2; 
      //var $thisComic = $url + "comics/" + $comicID + "?apikey=" + $publicKey + "&hash=" + $hash + "&ts=" + $time;
      var $thisComic = $url + "comics/3?apikey=" + $publicKey + "&hash=" + $hash + "&ts=" + $time;

      $http({
        method: "GET",
        url: $thisComic
      }).then(function successCallback(response) {
        console.log(response.data.data.results[0].thumbnail);

        $scope.thisComic = response.data.data.results[0].thumbnail.path + "." + response.data.data.results[0].thumbnail.extension;
      }, function errorCallback(response) {
          console.log(response.data.status);

          $scope.thisComic = "";
        });
    }
  }

  // Search Superheroes API call
  $scope.typeAhead = function(data) {
    var $heroName = data;
    var $searchHeroes = $url + "characters?" + "nameStartsWith=" + $heroName + "&apikey=" + $publicKey + "&hash=" + $hash + "&ts=" + $time + "&limit=100";

    console.log(data);

    $scope.showHeroList = true;

    if(data) {
      $http({
        method: "GET",
        url: $searchHeroes
      }).then(function successCallback(response) {
        console.log(response.data.data.results);

        $scope.heroesListResult = response.data.data.results;
      }, function errorCallback(response) {
        console.log("Can't find anything");

        $scope.heroesListResult = "No results found";
      });
    }   
  }

  $scope.selectHero = function(data) {
    $('.ui.modal')
      .modal('setting', 'transition', 'fade up')
      .modal('show');

    console.log(data);

    $scope.information = data;
  }

  // This Weeks Comic API call
  this.getThisWeekApi = $url + "comics?format=comic&formatType=comic&noVariants=false&dateDescriptor=thisWeek&limit=8"  + "&apikey=" + $publicKey + "&hash=" + $hash + "&ts=" + $time;


  // Last Weeks Comic API call
  this.getLastWeekApi = $url + "comics?format=comic&formatType=comic&noVariants=false&dateDescriptor=lastWeek&limit=8"  + "&apikey=" + $publicKey + "&hash=" + $hash + "&ts=" + $time;


  // This Month Comic API call
  this.getThisMonthApi = $url + "comics?format=comic&formatType=comic&noVariants=false&dateDescriptor=thisMonth&limit=16"  + "&apikey=" + $publicKey + "&hash=" + $hash + "&ts=" + $time;
});