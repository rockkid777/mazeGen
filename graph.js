function graph(width, height) {
  var width  = width  || 10;
  var height = height || 10;

  function randInt(ceil) {
    ceil = ceil || 10;
    return Math.floor(Math.random() * ceil);
  }

  function genVedges() {
    var vedges = [];
    for (var i = 0; i < width; i++) {
      for (var j = 0; j < height; j++) {
        vedges.push({
          x: i,
          y: j,
          visited: false
        });
      }
    }

    return vedges;
  }

  var vedges = genVedges();

  function getFreeNeighbours(vedge, vedges) {
    return vedges.filter(function(elem) {
      return (((elem.y == vedge.y && (elem.x == vedge.x - 1 || elem.x == vedge.x + 1))
        || (elem.x == vedge.x && (elem.y == vedge.y - 1 || elem.y == vedge.y + 1)))
        && !elem.visited);
    });
  }

  function genMaze(currentVedge, vedgeStack, stepCallback, stepTime) {
    stepCallback = stepCallback || function() {};
    stepTime = stepTime || 0;

    window.setTimeout(
      stepCallback,
      0,
      currentVedge
    );

    currentVedge.visited = true;
    var neighbours = getFreeNeighbours(currentVedge, vedges);

    if (neighbours.length > 0) {
      vedgeStack.push(currentVedge);
      var neighbourIndex = randInt(neighbours.length);
      window.setTimeout(
        genMaze,
        stepTime,
        neighbours[neighbourIndex],
        vedgeStack,
        stepCallback,
        stepTime
      );
    }
    else if (vedgeStack.length > 0) {
      var parent = vedgeStack.pop();
      window.setTimeout(
        genMaze,
        stepTime,
        parent,
        vedgeStack,
        stepCallback,
        stepTime
      );
    }
    else {
      console.log('Done.');
    }
  }

  return {
    vedges: vedges,
    getFreeNeighbours: getFreeNeighbours,
    genMaze: genMaze
  }
}
