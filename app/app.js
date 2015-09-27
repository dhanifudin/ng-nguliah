(function() {
  'use strict'

  angular
    .module('nguliah', [
      'nguliah.controllers',
      'nguliah.services'
    ])

    .config(function($routeProvider) {
      $routeProvider

      .when('/course', {
        templateUrl: 'app/partials/home.html',
        controller: 'homeCtrl as home'
      })

      .when('/course/:course', {
        templateUrl: 'app/partials/course.html',
        controller: 'courseCtrl as course'
      })

      .when('/course/:course/:week', {
        templateUrl: 'app/partials/slide.html',
        controller: 'slideCtrl as slide'
      })

      .otherwise({
        redirectTo: '/course'
      })
    })
})()
