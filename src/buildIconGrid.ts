// @ts-nocheck
import {attachLabelToIcon, findTitleComponent} from "./attachLabelToIcon.ts";
import splitArray from "./splitArray.ts";

const toolsExistance = findTitleComponent()
console.log(toolsExistance);

function buildIconColumn(rows, iconDist, rowDist, columnDist) {
  const select = figma.currentPage.selection;
  const selectionParent = select[0].parent;
  const limit = rows;
  
  const xP = select[0].x;
  const yP = select[0].y;
  
  if (select.length === 1) {
    // console.log(iconDist);
    const iconPlusLabel = attachLabelToIcon(select[0], iconDist);
    iconPlusLabel.x = xP;
    iconPlusLabel.y = yP;
    selectionParent.appendChild(iconPlusLabel);
  }

  if (select.length > 1) {
    const rows = [];
    select.forEach((item) => {
      rows.push(item);
    });

    const result = rows.sort((a, b) => {
      let fa = a.name.toLowerCase(),
        fb = b.name.toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });

    if (limit > 0) {
      const iconFrame = figma.createFrame();
      iconFrame.layoutPositioning = "AUTO";
      iconFrame.layoutMode = "HORIZONTAL";
      iconFrame.counterAxisAlignItems = "MIN";
      iconFrame.counterAxisSizingMode = "AUTO";
      iconFrame.primaryAxisAlignItems = "SPACE_BETWEEN";
      iconFrame.name = "icon frame";
      iconFrame.itemSpacing = columnDist;

      function createColumn() {
        const iconColumn = figma.createFrame();
        iconColumn.layoutPositioning = "AUTO";
        iconColumn.layoutMode = "VERTICAL";
        iconColumn.counterAxisAlignItems = "MIN";
        iconColumn.counterAxisSizingMode = "AUTO";
        iconColumn.primaryAxisAlignItems = "SPACE_BETWEEN";
        iconColumn.itemSpacing = rowDist;
        iconColumn.name = "icon column";
        return iconColumn;
      }

      const iconGrid = splitArray(result, limit);

      iconGrid.forEach((group) => {
        const newColumn = createColumn();
        group.forEach((item) => {
          const row = attachLabelToIcon(item, iconDist);
          row.name = "icon+label";
          newColumn.appendChild(row);
        });
        iconFrame.appendChild(newColumn);
      });
      selectionParent.appendChild(iconFrame);
      iconFrame.x = xP;
      iconFrame.y = yP;
    }

  }
}

export default buildIconColumn;
