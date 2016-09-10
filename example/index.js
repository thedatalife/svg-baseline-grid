var toggleButton = document.getElementById('toggle');
var baselineHeightInput = document.getElementById('baselineHeight');
var baselineTopOffsetInput = document.getElementById('baselineTopOffset');
var baselineGuttersInput = document.getElementById('baselineGutters');

baselineGrid.config.baselineHeight = baselineHeightInput.value;

toggleButton.addEventListener('click', function() {
  console.log('grid state', baselineGrid.config);
  if (baselineGrid.config.isBaselineVisible) {
    disableGrid();
    return;
  }
  enableGrid();
});

addInputListener(baselineHeightInput, 'baselineHeight');
addInputListener(baselineTopOffsetInput, 'topOffset');
addInputListener(baselineGuttersInput, 'gutters');

function addInputListener(input, valueKey) {
  input.addEventListener('keyup', function(e) {
    baselineGrid.config[valueKey] = input.value;
    if (baselineGrid.config.isBaselineVisible) {
      baselineGrid.disable();
      baselineGrid.enable();
    }
  });
}

function enableGrid() {
  console.log('enabling grid');
  toggleButton.innerText = 'Turn off';
  baselineGrid.enable();
}

function disableGrid() {
  console.log('disabling grid');
  toggleButton.innerText = 'Turn on';
  baselineGrid.disable();
}
