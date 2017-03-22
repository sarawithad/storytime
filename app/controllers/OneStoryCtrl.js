"use strict";

app.controller("OneStoryCtrl", function($scope, $routeParams, StoryFactory, OneStoryFactory, BookshelfFactory, $location, AuthFactory){

	let user = AuthFactory.getUser();

	$scope.title = {};
	$scope.storyBegin = "Once Upon a Time";
	$scope.storyBody = {};
	$scope.storyEnd = "The End.";
	$scope.wholeStory = {};

	//gets story object user clicks on
	OneStoryFactory.getSingleStory($routeParams.storyId)
		.then(function successCallback(response){
			console.log("getSingleStoryresponse: ", response);
			$scope.storyBody = response.finalStory;
			$scope.title = response.title;
			$scope.wholeStory = $scope.storyBegin + $scope.storyBody + $scope.storyEnd;
		});

	//reads user-built story aloud on click of "read my story" button
	$scope.readSelectedStory = function(){
	   console.log("you are now using responsive voice");
	   responsiveVoice.speak($scope.wholeStory, "UK English Female");
	};


	//function to delete selected saved story
	$scope.deleteOneStory = function(storyId){
		console.log("hello from inside deleteOneStory");
		OneStoryFactory.deleteStory($routeParams.storyId)
		.then(function(response){
			$location.url("storytime/mybookshelf");
		});
	};

});



	// //function to edit selected saved story
	// $scope.editOneStory = function(){
	// 	console.log("hello from inside editOneStory");
	// 	OneStoryFactory.editStory();
	// };