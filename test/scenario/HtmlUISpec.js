describe('angular.scenario.HtmlUI', function() {
  var ui;
  var context;
  var spec;
  
  function line() { return 'unknown:-1'; }

  beforeEach(function() {
    spec = {
      name: 'test spec',
      definition: {
        id: 10,
        name: 'child',
        children: [],
        parent: {
          id: 20,
          name: 'parent',
          children: []
        }
      }
    };
    context = _jQuery("<div></div>");
    ui = new angular.scenario.ui.Html(context);
  });

  it('should create nested describe context', function() {
    ui.addSpec(spec);
    expect(context.find('#describe-20 #describe-10 > h2').text()).
      toEqual('describe: child');
    expect(context.find('#describe-20 > h2').text()).toEqual('describe: parent');
    expect(context.find('#describe-10 .tests > li .test-info .test-name').text()).
      toEqual('it test spec');
    expect(context.find('#describe-10 .tests > li').hasClass('status-pending')).
      toBeTruthy();
  });

  it('should update totals when steps complete', function() {
    // Error
    ui.addSpec(spec).error('error');
    // Failure
    specUI = ui.addSpec(spec);
    specUI.addStep('some step', line).finish('failure');
    specUI.finish();
    // Failure
    specUI = ui.addSpec(spec);
    specUI.addStep('some step', line).finish('failure');
    specUI.finish();
    // Failure
    specUI = ui.addSpec(spec);
    specUI.addStep('some step', line).finish('failure');
    specUI.finish();
    // Success
    specUI = ui.addSpec(spec);
    specUI.addStep('some step', line).finish();
    specUI.finish();
    // Success
    specUI = ui.addSpec(spec);
    specUI.addStep('another step', line).finish();
    specUI.finish();

    expect(parseInt(context.find('#status-legend .status-failure').text(), 10)).
      toEqual(3);
    expect(parseInt(context.find('#status-legend .status-success').text(), 10)).
      toEqual(2);
    expect(parseInt(context.find('#status-legend .status-error').text(), 10)).
      toEqual(1);
  });

  it('should update timer when test completes', function() {
    // Success
    specUI = ui.addSpec(spec);
    specUI.addStep('some step', line).finish();
    specUI.finish();

    // Failure
    specUI = ui.addSpec(spec);
    specUI.addStep('some step', line).finish('failure');
    specUI.finish('failure');

    // Error
    specUI = ui.addSpec(spec).error('error');

    context.find('#describe-10 .tests > li .test-info .timer-result').
      each(function(index, timer) {
        expect(timer.innerHTML).toMatch(/ms$/);
    });
  });
  
  it('should include line if provided', function() {
    specUI = ui.addSpec(spec);
    specUI.addStep('some step', line).finish('error!');
    specUI.finish();

    var errorHtml = context.find('#describe-10 .tests li pre').html();
    expect(errorHtml.indexOf('unknown:-1')).toEqual(0);
  });

});
