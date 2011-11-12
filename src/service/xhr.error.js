'use strict';

/**
 * @ngdoc object
 * @name angular.module.ng.$xhr.error
 * @function
 * @requires $log
 *
 * @description
 * Error handler for {@link angular.module.ng.$xhr $xhr service}. An application can replaces this
 * service with one specific for the application. The default implementation logs the error to
 * {@link angular.module.ng.$log $log.error}.
 *
 * @param {Object} request Request object.
 *
 *   The object has the following properties
 *
 *   - `method` – `{string}` – The http request method.
 *   - `url` – `{string}` – The request destination.
 *   - `data` – `{(string|Object)=} – An optional request body.
 *   - `success` – `{function()}` – The success callback function
 *
 * @param {Object} response Response object.
 *
 *   The response object has the following properties:
 *
 *   - status – {number} – Http status code.
 *   - body – {string|Object} – Body of the response.
 *
 * @example
    <doc:example>
      <doc:source>
        fetch a non-existent file and log an error in the console:
        <button ng:click="$service('$xhr')('GET', '/DOESNT_EXIST')">fetch</button>
      </doc:source>
    </doc:example>
 */
function $XhrErrorProvider() {
  this.$get = ['$log', function($log) {
    return function(request, response){
      $log.error('ERROR: XHR: ' + request.url, request, response);
    };
  }];
}
