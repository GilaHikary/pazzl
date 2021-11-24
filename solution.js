function solvePuzzle(pieces) {
  const result = [];
  const mapTmp = new Map();
  result.push(rotateFirstPiece(pieces[0]));
  pieces.shift()
  pieces.forEach(element => {
    for (const edge of Object.values(element.edges)) {
      if (!!edge)
        mapTmp.set(edge.edgeTypeId + edge.type, element);
    }
  });

  addFindAndRotatedPiece(result, pieces, mapTmp);
  return result.map((item) => item.id);
}
function rotateFirstPiece(piece) {
  if (!piece.edges.top && !piece.edges.left) {
    return piece;
  }
  else {
    return rotateFirstPiece(rotatePiece(piece));
  }
}
function addFindAndRotatedPiece(result, pieces, mapTmp) {
  const COLS = 10;
  let side = "";
  //ищем такой же элемент, какой нам надо, только с другим направлением ушка
  //ищем по правой грани
  if (!!result[result.length - 1].edges.right && result[result.length - 1].edges.right.type == "inside") {
    side = result[result.length - 1].edges.right.edgeTypeId + "outside";
  } else if (!!result[result.length - 1].edges.right && result[result.length - 1].edges.right.type == "outside") {
    side = result[result.length - 1].edges.right.edgeTypeId + "inside";
  }
  let t = mapTmp.get(side);
  if (!t) {
    //если нет правой грани (значит это крайний элемент в ряду), то ищем по нижней (в начале ряда)
    if (!!result[result.length - COLS].edges.bottom && result[result.length - COLS].edges.bottom.type == "inside") {
      side = result[result.length - COLS].edges.bottom.edgeTypeId + "outside";
    } else if (!!result[result.length - COLS].edges.bottom && result[result.length - COLS].edges.bottom.type == "outside") {
      side = result[result.length - COLS].edges.bottom.edgeTypeId + "inside";
    }
    t = mapTmp.get(side);
  }
  if (!!t) {
    let tmpBottom = null;
    let tmpRight = null;
    if (!!result[result.length - COLS] && !!result[result.length - COLS].edges.bottom) {
      tmpBottom = result[result.length - COLS].edges.bottom.edgeTypeId;
    }
    if (!!result[result.length - 1] && !!result[result.length - 1].edges.right) {
      tmpRight = result[result.length - 1].edges.right.edgeTypeId;
    }
    //сравниваем найденный кусочек по левой и верхней граням с правой и нижней другого кусочка
    if ((t.edges.top == tmpBottom || (!!t.edges.top && t.edges.top.edgeTypeId == tmpBottom)) &&
      (t.edges.left == tmpRight || (!!t.edges.left && t.edges.left.edgeTypeId == tmpRight))) {
      result.push(t);
    }
    else {
      t = rotatePiece(t);//значит надо повернуть
    }
    return addFindAndRotatedPiece(result, pieces, mapTmp);
  }
}

//поворот против часовой стрелки
//при таком повороте верное положение находится быстрее
//видимо специально так сделано
function rotatePiece(piece) {
  const tmp = [...Object.values(piece.edges)];
  piece.edges.top = tmp[1];
  piece.edges.right = tmp[2];
  piece.edges.bottom = tmp[3];
  piece.edges.left = tmp[0];
  return piece;
}
// Не удаляйте эту строку
window.solvePuzzle = solvePuzzle;

