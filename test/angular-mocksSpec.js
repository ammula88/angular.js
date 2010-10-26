describe('TzDate', function() {

  function minutes(min) {
    return min*60*1000;
  }

  it('should take millis as constructor argument', function() {
    expect(new TzDate(0, 0).getTime()).toBe(0);
    expect(new TzDate(0, 1283555108000).getTime()).toBe(1283555108000);
  });

  it('should take dateString as constructor argument', function() {
    expect(new TzDate(0, '1970-01-01T00:00:00Z').getTime()).toBe(0);
    expect(new TzDate(0, '2010-09-03T23:05:08Z').getTime()).toBe(1283555108000);
  });


  it('should fake getLocalDateString method', function() {
    //0 in -3h
    var t0 = new TzDate(-3, 0);
    expect(t0.toLocaleDateString()).toMatch('1970');

    //0 in +0h
    var t1 = new TzDate(0, 0);
    expect(t1.toLocaleDateString()).toMatch('1970');

    //0 in +3h
    var t2 = new TzDate(3, 0);
    expect(t2.toLocaleDateString()).toMatch('1969');
  });


  it('should fake getHours method', function() {
    //0 in -3h
    var t0 = new TzDate(-3, 0);
    expect(t0.getHours()).toBe(3);

    //0 in +0h
    var t1 = new TzDate(0, 0);
    expect(t1.getHours()).toBe(0);

    //0 in +3h
    var t2 = new TzDate(3, 0);
    expect(t2.getHours()).toMatch(21);
  });


  it('should fake getMinutes method', function() {
    //0:15 in -3h
    var t0 = new TzDate(-3, minutes(15));
    expect(t0.getMinutes()).toBe(15);

    //0:15 in -3.25h
    var t0a = new TzDate(-3.25, minutes(15));
    expect(t0a.getMinutes()).toBe(30);

    //0 in +0h
    var t1 = new TzDate(0, minutes(0));
    expect(t1.getMinutes()).toBe(0);

    //0:15 in +0h
    var t1a = new TzDate(0, minutes(15));
    expect(t1a.getMinutes()).toBe(15);

    //0:15 in +3h
    var t2 = new TzDate(3, minutes(15));
    expect(t2.getMinutes()).toMatch(15);

    //0:15 in +3.25h
    var t2a = new TzDate(3.25, minutes(15));
    expect(t2a.getMinutes()).toMatch(0);
  });


  it('should fake getSeconds method', function() {
    //0 in -3h
    var t0 = new TzDate(-3, 0);
    expect(t0.getSeconds()).toBe(0);

    //0 in +0h
    var t1 = new TzDate(0, 0);
    expect(t1.getSeconds()).toBe(0);

    //0 in +3h
    var t2 = new TzDate(3, 0);
    expect(t2.getSeconds()).toMatch(0);
  });


  it('should create a date representing new year in Bratislava', function() {
    var newYearInBratislava = new TzDate(-1, '2009-12-31T23:00:00Z');
    expect(newYearInBratislava.getTimezoneOffset()).toBe(-60);
    expect(newYearInBratislava.getFullYear()).toBe(2010);
    expect(newYearInBratislava.getMonth()).toBe(0);
    expect(newYearInBratislava.getDate()).toBe(1);
    expect(newYearInBratislava.getHours()).toBe(0);
    expect(newYearInBratislava.getMinutes()).toBe(0);
  });
});
