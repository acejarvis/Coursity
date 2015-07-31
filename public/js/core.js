var main = angular.module('main', ['ngRoute', 'ngFileUpload']);

main.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/',	
		{
			controller: 'MainController',
			templateUrl: 'views/partials/homepageLayout.html'
		})
		.otherwise({redirectTo: '/'});
}]);


main.controller('MainController', ['$scope', '$http', 'Upload', function($scope, $http, Upload) {
	$scope.universities = [
		{name: 'Example', value: 'example'},
		{name: 'McMaster', value: 'mcmaster'}, 
		{name:'UOttawa', value: 'uottawa'}
	];
	$scope.semesterList = [
		{ name: 'Fall 2015', value: 'fall' }, 
		{ name: 'Winter 2016', value: 'winter' },
		{ name: 'Summer 2016', value: 'summer' }, 
		{ name: 'Spring 2016', value: 'spring' }, 
		{ name: 'Summer/Spring 2016', value: 'springsummer' }
	];

	$scope.upload = function(files) {
		if (files && files.length > 0) {
			Upload.upload({
					url: '/upload',
					file: files[0],
					fields: {
						'university': $scope.university, 
						'semester': $scope.semester
					}
				}) 
				.progress(function(evt) {					
		            $scope.message = 'Uploading and converting';
				})
				.success(function(data) {
					var anchor = angular.element('<a/>');
     				anchor.attr({
         				href: 'data:attachment/html;charset=utf-8,' + encodeURI(data),
         				target: '_blank',
         				download: 'timetable.ics'
     				})[0].click();
     				$scope.message = 'Finished.';
				})
				.error(function(data) {
					$scope.message = data;
				});
		}
	};

	$scope.$on('$viewContentLoaded', function ()
	{
		 // Angular JS Page Edits
		$.getScript( "slick/slick.min.js" )
			.done(function( script, textStatus ) {
				console.log( textStatus );
			})
			.fail(function( jqxhr, settings, exception ) {
				$( "div.log" ).text( "Triggered JS handler." );
			});
		$(document).ready(function(){
			$('.single-item').slick({
				dots: true,
				infinite: true,
				speed: 300,
				slidesToShow: 1,
				slidesToScroll: 1,
			});
		});

		$(document).ready(function(){
			$("#mcmaster").hide();
			$("#example").show();
			$("#uottawa").hide();
			$('#mainBody').on('change', '#uniChoose', function() {
				if ($(this).val() == 'mcmaster') {
					$('#homeDiv').css({"background-image": "url('../img/McMaster_University.jpg')"}).fadeIn("slow");
					$("#example").hide();
					$("#mcmaster").show();
				}
				if ($(this).val() == 'uottawa') {
					$('#homeDiv').css({"background-image": "url('../img/McMaster_University.jpg')"}).fadeIn("slow");
					$("#example").hide();
					$("#uottawa").show();
				}
				if ($(this).val() == 'example') {
					$("#example").show();
				}
			});
		});
	});
}]);

