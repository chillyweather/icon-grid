// @ts-nocheck

//& find right set and right component inside it
function findTitleComponent() {
  const iconLabel = figma.root.findOne((node) => {
    const result = node.name === ".DS-title" && node.type === "COMPONENT_SET";
    return result;
  });
  return iconLabel.children.filter(
    (node) => node.name === "size=xs,font=regular,color=dark"
  )[0];
}

function attachLabelToIcon(icon: any, spacing) {
  const labelXS = findTitleComponent();
  const label = labelXS.createInstance();
  label.y = icon.y;
  label.x = icon.x + 26;
  label.children[0].characters = icon.name;
  const iconPlusLabel = figma.createFrame();
  iconPlusLabel.layoutPositioning = "AUTO";
  iconPlusLabel.layoutMode = "HORIZONTAL";
  iconPlusLabel.counterAxisSizingMode = "AUTO";
  iconPlusLabel.itemSpacing = spacing;
  iconPlusLabel.appendChild(icon);
  iconPlusLabel.appendChild(label);
  iconPlusLabel.fills = [];
  return iconPlusLabel;
}

export default attachLabelToIcon;
