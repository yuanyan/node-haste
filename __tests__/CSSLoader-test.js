/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 * @emails javascript@lists.facebook.com voloko@fb.com
 */

describe('CSSLoader', function() {
  var CSSLoader = require('../lib/loader/CSSLoader');
  var path = require('path');
  var loadResouce = require('../lib/test_helpers/loadResource');

  it('should match package.json paths', function() {
    var loader = new CSSLoader();
    expect(loader.matchPath('x.css')).toBe(true);
    expect(loader.matchPath('a/x.css')).toBe(true);
    expect(loader.matchPath('a/1.js')).toBe(false);
  });

  var testData = path.join(__dirname, '..', '__test_data__', 'CSS');

  it('should exptract component name', function() {
    loadResouce(
      new CSSLoader(),
      path.join(testData, 'plain.css'),
      null,
      function(err, css) {
        expect(css.id).toBe('plain-css');
        expect(css.options).toEqual({ 'no-browser-specific-css' : true });
        expect(css.requiredCSS).toEqual(['bar']);
      });
  });

  it('should parse special attributes', function() {
    loadResouce(
      new CSSLoader(),
      path.join(testData, 'special.css'),
      null,
      function(err, css) {
        expect(css.id).toBe('special-css');
        expect(css.isNonblocking).toBe(true);
        expect(css.isNopackage).toBe(true);
      });
  });

  it('should exptract css sprites', function() {
    loadResouce(
      new CSSLoader({ extractFBSprites: true }),
      path.join(testData, 'fb-sprite.css'),
      null,
      function(err, css) {
        expect(css.fbSprites).toEqual([
          'images/dialog/large_halo_top_left.png',
          'images/dialog/large_halo_top_right.png'
        ]);
      });
  });

  it('should exptract network size', function() {
    loadResouce(
      new CSSLoader({ networkSize: true }),
      path.join(testData, 'fb-sprite.css'),
      null,
      function(err, css) {
        expect(css.networkSize > 0).toBe(true);
      });
  });
});
