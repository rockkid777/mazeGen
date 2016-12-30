function mazeDemo() {
  var g = graph(15, 15);
  var stack = [];

  var lineLengthUnit = 20;
  var stepTime = 50;
  var offset = 5;
  var mazeCanvas = document.getElementById('maze');
  var ctx = mazeCanvas.getContext('2d');

  function drawerCallback(vedge) {
    ctx.lineTo(
      offset + vedge.x * lineLengthUnit,
      offset + vedge.y * lineLengthUnit
    );
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 5;
  ctx.moveTo(offset, offset);


  g.genMaze(
    g.vedges[0],
    stack,
    drawerCallback,
    stepTime
  )
}
