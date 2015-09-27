(function() {
  'use strict'

  angular
    .module('nguliah.services', [])

    .factory('File', [
      '$http',
      '$q',
      'Log',
      'Marked',
      fileFactory
    ])

    .factory('Log', [
      '$window', 
      logFactory
    ])

    .factory('Marked', [
      '$window',
      '$sce',
      markedFactory
    ])

    function fileFactory($http, $q, Log, Marked) {
      function read(path) {
        return $http.get(path)
          .then(function(response) {
            Log.debug('File', response.data)
            return response.data
          }, function(error) {
            return $q.reject(error)
          })
      }

      function splitMarkdown(source) {
        var slides = []
        var regex = /\n\.{3}|-{3}/g;
        var splited = source.split(regex);
        for (var i = 0; i < splited.length; i += 1) {
          slides.push(splitSlide(splited[i]));
        }
        return slides
      }

      function splitSlide(source) {
        var regex = /(^\{[^}]+\})/
        var slides = source.split(regex).filter(Boolean)
        return regex.test(source) ? {
            meta: slides[0],
            content: Marked.parse(slides[1])
          } : {
            meta: null,
            content: Marked.parse(source)
          }
      }

      return {
        read: read,
        split: splitMarkdown
      }
    }

  function logFactory($window) {
    return {
      debug: function(name, message) {
        $window.debug(name)(message)
      }
    }
  }

  function markedFactory($window, $sce) {
    function parse(source) {
      var converter = $window.marked
      var renderer = new $window.marked.Renderer()

      renderer.code = function(code, language) {
        code = $window.hljs.highlightAuto(code).value
        return '<code class="hljs ' + language + '">' + code + '</code>'
      }

      converter.setOptions({
        renderer: renderer,
        gfm: true,
        tables: true,
        breaks: true
      })

      return $sce.trustAsHtml(converter(source))
    }

    return {
      parse: parse
    }
  }

})()
