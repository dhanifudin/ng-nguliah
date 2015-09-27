(function() {
  'use strict'

  angular
    .module('nguliah.controllers', [
      'ngRoute'
    ])

    .controller('homeCtrl', [
      'File', 
      'Log', 
      homeCtrl
    ])

    .controller('courseCtrl', [
      '$routeParams',
      'File',
      'Log',
      courseCtrl
    ])

    .controller('slideCtrl', [
      '$routeParams',
      'File',
      'Log',
      slideCtrl
    ])

  function homeCtrl(File, Log) {
    var that = this
    that.courses = []

    File.read('courses/index.json')
    .then(function(data) {
      that.courses = data
      Log.debug('home', data)
    }, function(error) {
      Log.debug('home:error', error)
    })
  }

  function courseCtrl($params, File, Log) {
    var that = this
    that.name = $params.course
    that.weeks = []

    File.read([ 'courses/', that.name, '/index.json'].join(''))
    .then(function(data) {
      that.weeks = data
      Log.debug('course', data)
    }, function(error) {
      Log.debug('course:error', error)
    })
  }

  function slideCtrl($params, File, Log) {
    var that = this
    that.name = $params.course
    that.week = $params.week
    that.index = 0

    that.prev = function() {
      that.index = (that.index + that.slides.length - 1) % that.slides.length;
    }

    that.next = function() {
      that.index = (that.index + 1) % that.slides.length
    }

    File.read([ 'courses/', that.name, '/', that.week, '.md' ].join(''))
    .then(function(data) {
      that.slides = File.split(data)
    }, function(error) {
      Log.debug('course:error', error)
    })
  }

})()
