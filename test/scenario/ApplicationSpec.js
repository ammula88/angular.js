describe('angular.scenario.Application', function() {
  var $window;
  var app, frames;

  function callLoadHandlers(app) {
    var handlers = app.getFrame_().data('events').load;
    expect(handlers).toBeDefined();
    expect(handlers.length).toEqual(1);
    handlers[0].handler();
  }

  beforeEach(function() {
    frames = _jQuery("<div></div>");
    app = new angular.scenario.Application(frames);
  });

  it('should return new $window and $document after navigate', function() {
    var called;
    var testWindow, testDocument, counter = 0;
    app.getWindow_ = function() {
      return {x:counter++, document:{x:counter++}};
    };
    app.navigateTo('http://www.google.com/');
    app.executeAction(function($document, $window) {
      testWindow = $window;
      testDocument = $document;
    });
    app.navigateTo('http://www.google.com/');
    app.executeAction(function($window, $document) {
      expect($window).not.toEqual(testWindow);
      expect($document).not.toEqual(testDocument);
      called = true;
    });
    expect(called).toBeTruthy();
  });

  it('should execute callback with correct arguments', function() {
    var called;
    var testWindow = {document: {}};
    app.getWindow_ = function() {
      return testWindow;
    };
    app.executeAction(function($window, $document) {
      expect(this).toEqual(app);
      expect($document).toEqual(_jQuery($window.document));
      expect($window).toEqual(testWindow);
      called = true;
    });
    expect(called).toBeTruthy();
  });

  it('should use a new iframe each time', function() {
    app.navigateTo('http://localhost/');
    var frame = app.getFrame_();
    frame.attr('test', true);
    app.navigateTo('http://localhost/');
    expect(app.getFrame_().attr('test')).toBeFalsy();
  });

  it('should call error handler if document not accessible', function() {
    var called;
    app.getWindow_ = function() {
      return {};
    };
    app.navigateTo('http://localhost/', angular.noop, function(error) {
      expect(error).toMatch(/Sandbox Error/);
      called = true;
    });
    callLoadHandlers(app);
    expect(called).toBeTruthy();
  });

  it('should call error handler if navigating to about:blank', function() {
    var called;
    app.navigateTo('about:blank', angular.noop, function(error) {
      expect(error).toMatch(/Sandbox Error/);
      called = true;
    });
    expect(called).toBeTruthy();
  });

  it('should hide old iframes and navigate to about:blank', function() {
    app.navigateTo('http://localhost/#foo');
    app.navigateTo('http://localhost/#bar');
    var iframes = frames.find('iframe');
    expect(iframes.length).toEqual(2);
    expect(iframes[0].src).toEqual('about:blank');
    expect(iframes[1].src).toEqual('http://localhost/#bar');
    expect(_jQuery(iframes[0]).css('display')).toEqual('none');
  });

  it('should URL update description bar', function() {
    app.navigateTo('http://localhost/');
    var anchor = frames.find('> h2 a');
    expect(anchor.attr('href')).toEqual('http://localhost/');
    expect(anchor.text()).toEqual('http://localhost/');
  });

  it('should call onload handler when frame loads', function() {
    var called;
    app.getWindow_ = function() {
      return {document: {}};
    };
    app.navigateTo('http://localhost/', function($window, $document) {
      called = true;
    });
    callLoadHandlers(app);
    expect(called).toBeTruthy();
  });

  it('should wait for pending requests in executeAction', function() {
    var called, polled;
    var handlers = [];
    var testWindow = {
      document: _jQuery('<div class="test-foo"></div>'),
      angular: {
        service: {}
      }
    };
    testWindow.angular.service.$browser = function() {
      return {
        poll: function() {
          polled = true;
        },
        notifyWhenNoOutstandingRequests: function(fn) {
          handlers.push(fn);
        }
      };
    };
    app.getWindow_ = function() {
      return testWindow;
    };
    app.executeAction(function($window, $document) {
      expect($window).toEqual(testWindow);
      expect($document).toBeDefined();
      expect($document[0].className).toEqual('test-foo');
    });
    expect(polled).toBeTruthy();
    expect(handlers.length).toEqual(1);
    handlers[0]();
  });
});
