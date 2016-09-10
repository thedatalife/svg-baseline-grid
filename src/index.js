(function() {
  var config = {
    baselineHeight: 12,
    gutters: 24,
    cellWidth: 10,
    topOffset: 48,
    strokeDash: [5, 5],
    strokeDashOffset: 0,
    strokeColor: 'white',
    strokeThickness: 1,
    isBaselineVisible: false
  };

  var styleElement = document.createElement('style');
  var isBaselineVisible = false;
  var styleSheet;

  document.head.appendChild(styleElement);
  styleSheet = styleElement.sheet; // sheet reference is only available after mounting to the dom

  function enableBaselineGrid() {
    // if the baseline is already visible then do nothing
    if (config.isBaselineVisible) {
      return;
    }
    var encodedSvg = createSVG(config.baselineHeight, config.strokeDash, config.strokeColor, config.strokeThickness);
    styleSheet.insertRule(createBodyRule(), 0);
    styleSheet.insertRule(createActiveRule(), 1);
    styleSheet.insertRule(createAfterRule(config.topOffset, config.gutters, encodedSvg), 2);
    config.isBaselineVisible = true;
  }

  function disableBaselineGrid() {
    // the rules only exist if the baseline is visible
    if (config.isBaselineVisible) {
      styleSheet.removeRule(2);
      styleSheet.removeRule(1);
      styleSheet.removeRule(0);
      config.isBaselineVisible = false;
    }
  }

  function createActiveRule() {
    return 'body:active:after { display: none; }';
  }

  function createBodyRule() {
    return 'body { position: relative; }';
  }

  function createAfterRule(baselineTopOffset, baselineGutters, encodedSvg) {
    return 'body:after {' +
              'position: absolute;' +
              'width: auto;' +
              'height: auto;' +
              'z-index: 9999;' +
              'content: \'\';' +
              'display: block;' +
              'pointer-events: none;' +
              'top: 0;' +
              'right: 0;' +
              'bottom: 0;' +
              'left: 0;' +
              'margin: ' + baselineTopOffset + 'px ' + baselineGutters + 'px 0 ' + baselineGutters + 'px;' +
              'background: url(data:image/svg+xml;base64,' + encodedSvg + ')' +
            '}'
  }

  function createSVG(baselineHeight, strokeDash, strokeColor, strokeWidth) {
    var svg = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  width="10px" height="'+baselineHeight+'px" viewBox="0 0 10 '+baselineHeight+'" enable-background="new 0 0 10 '+baselineHeight+'" xml:space="preserve">' +
                  '<line ' +
                    'x1="0" ' +
                    'y1="' + baselineHeight + '" ' +
                    'x2="10" ' +
                    'y2="' + baselineHeight + '" ' +
                    'stroke-dasharray="[' + strokeDash.join(',') + ']" ' +
                    'style="' +
                      'stroke:' + strokeColor +
                      ';stroke-width: ' + strokeWidth + ';' +
                  ' "/>' +
                '</svg>';
    console.log(arguments, svg);
    var encoded = window.btoa(svg);
    return encoded;
  }

  window.baselineGrid = {
    config: config,
    enable: enableBaselineGrid,
    disable: disableBaselineGrid
  };
})();
