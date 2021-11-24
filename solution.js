function solvePuzzle(pieces) {
  const result = [];
  const ROWS = 10;
  const COLS = 10;

  //найти 1 элемент в строке
  for (let j = 0; j < ROWS; j++) {
    if (!result.length) {
      result.push(addRotatedPiece(pieces[0]));
      pieces.shift();
    }
    else {
      //первый элемент в строке соединяется через верхнюю грань с элементом над ним
      const nextPiece = pieces.findIndex((element) => !!element.edges && checkPiece(element, result[(j - 1) * COLS].edges.bottom.edgeTypeId));
      result.push(addRotatedPiece(pieces[nextPiece], result[(j - 1) * COLS].edges.bottom.edgeTypeId, "top"));
      pieces.splice(nextPiece, 1);
    }
    //заполнить строку (первый элемент там уже есть)
    for (let i = 1; i < COLS; i++) {
      //последующие элементы в строке соединяются через левую грань с предыдущим
      const nextPiece = pieces.findIndex((element) => !!element.edges && checkPiece(element, result[j * COLS + i - 1].edges.right.edgeTypeId));
      result.push(addRotatedPiece(pieces[nextPiece], result[j * COLS + i - 1].edges.right.edgeTypeId, "left"));
      pieces.splice(nextPiece, 1);
    }
  }
  return result.map((item) => item.id);
}
/*
piece - поворачиваемый элемент
edge - грань, которая должна оказаться со стороны nameEdge
nameEdge - сторона элемента, которой соединяем с предыдущим элементом
*/
function addRotatedPiece(piece, edge = null, nameEdge = "") {
  if (!nameEdge) {
    if (!piece.edges.top && !piece.edges.left) {
      return piece;
    }
    else {
      piece = addRotatedPiece(rotatePiece(piece));
    }
  }
  else {
    if (!piece.edges[nameEdge] || piece.edges[nameEdge].edgeTypeId !== edge) {
      piece = addRotatedPiece(rotatePiece(piece), edge, nameEdge);
    }
    else {
      return piece;
    }
  }
  return piece;
}
//поворот по часовой стрелке
function rotatePiece(piece) {
  const tmp = [...Object.values(piece.edges)];
  piece.edges.top = tmp[3];
  piece.edges.right = tmp[0];
  piece.edges.bottom = tmp[1];
  piece.edges.left = tmp[2];
  return piece;
}
function checkPiece(pieceChecked, edgeTypeId) {
  //проверяем все 4 стороны
  for (const edge of Object.values(pieceChecked.edges)) {
    if (!!edge && edge.edgeTypeId === edgeTypeId) {
      return true;
    }
  }
  return false;
}
// Не удаляйте эту строку
window.solvePuzzle = solvePuzzle;

