'use strict';

describe('$routeParams', function(){
  it('should publish the params into a service', function(){
    var scope = angular.scope(),
        $location = scope.$service('$location'),
        $route = scope.$service('$route'),
        $routeParams = scope.$service('$routeParams');

    $route.when('/foo');
    $route.when('/bar/:barId');

    $location.hash = '/foo?a=b';
    scope.$digest();
    expect($routeParams).toEqual({a:'b'});

    $location.hash = '/bar/123?x=abc';
    scope.$digest();
    expect($routeParams).toEqual({barId:'123', x:'abc'});
  });


  it('should preserve object identity during route reloads', function(){
    var scope = angular.scope(),
        $location = scope.$service('$location'),
        $route = scope.$service('$route'),
        $routeParams = scope.$service('$routeParams'),
        firstRouteParams = $routeParams;

    $route.when('/foo');
    $route.when('/bar/:barId');

    $location.hash = '/foo?a=b';
    scope.$digest();
    expect(scope.$service('$routeParams')).toBe(firstRouteParams);

    $location.hash = '/bar/123?x=abc';
    scope.$digest();
    expect(scope.$service('$routeParams')).toBe(firstRouteParams);
  });
});
