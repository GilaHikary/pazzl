function solvePuzzle(pieces) {
  const result = [];
  const rows = 10;
  const cols = 10;
  //найти 1 элемент в строке
  for (let j = 0; j < rows; j++) {
    if (!result.length) {
      result.push(addRotatedPiece(pieces[0]));
      pieces.shift();
    }
    else {
      //первый элемент в строке соединяется через верхнюю грань с элементом над ним
      let nextPiece = pieces.find((element) => !!element.edges && checkPiece(element, result[(j - 1) * cols].edges.bottom.edgeTypeId));
      result.push(addRotatedPiece(nextPiece, result[(j - 1) * cols].edges.bottom.edgeTypeId, "top"));
      pieces.splice(pieces.indexOf(nextPiece), 1);
    }
    //заполнить строку (первый элемент там уже есть)
    for (let i = 1; i < cols; i++) {
      //последующие элементы в строке соединяются через левую грань с предыдущим
      let nextPiece = pieces.find((element) => !!element.edges && checkPiece(element, result[j * cols + i - 1].edges.right.edgeTypeId));
      result.push(addRotatedPiece(nextPiece, result[j * cols + i - 1].edges.right.edgeTypeId, "left"));
      pieces.splice(pieces.indexOf(nextPiece), 1);
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
  let tmpB = piece.edges.bottom;
  let tmpL = piece.edges.left;
  let tmpT = piece.edges.top;

  piece.edges.bottom = piece.edges.right;
  piece.edges.left = tmpB;
  piece.edges.top = tmpL;
  piece.edges.right = tmpT;

  return piece;
}
function checkPiece(pieceChecked, edgeTypeId) {
  let flag = false;
  //проверяем все 4 стороны
  for (const edge in pieceChecked.edges) {
    if (!!pieceChecked.edges[edge] && pieceChecked.edges[edge].edgeTypeId === edgeTypeId) {
      flag = true;
      break;
    }
  }
  return flag;
}
// Не удаляйте эту строку
window.solvePuzzle = solvePuzzle;

