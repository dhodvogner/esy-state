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

//TODO: This is a very naive implementation of mustache templating
export const renderMustache = (template, data) => {
  const matches = template.match(/{{\s*[\w\.]+\s*}}/g).map((x) => x.match(/[\w\.]+/)[0]);
  let result = template;
  matches.forEach((match) => {
    const value = data[match];
    if (value === undefined) value = "";
    result = result.replace(`{{${match}}}`, value);
  });
  return result;
}