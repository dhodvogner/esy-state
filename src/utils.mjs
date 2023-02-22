export const collectNodes = (operator) => {
  const nodes = [];
  const nodesSnapshot = document.evaluate(
    `//*/attribute::*[starts-with(name(), "${operator}")]`,
    document.body,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  );
  for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
    let attr = nodesSnapshot.snapshotItem(i);
    nodes.push({ attribute: attr, element: attr.ownerElement });
  };
  return nodes;
}
