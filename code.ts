// @ts-nocheck

figma.showUI(__html__);
figma.ui.resize(320, 380);
import buildIconColumn from "./src/buildIconGrid.ts";

figma.ui.onmessage = ({ rows, iconDist, rowDist, columnDist }) => {
  if (
    Number.isNaN(rows) ||
    Number.isNaN(iconDist) ||
    Number.isNaN(rowDist) ||
    Number.isNaN(columnDist)
  ) {
    figma.notify("Please, try once again, now using only numbers as input");
    figma.closePlugin();
  }
  const loadFonts = async () => {
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    // await figma.loadFontAsync({ family: "Inter", style: "Bold" });
  };

  loadFonts()
    .then(() => {
      buildIconColumn(rows, iconDist, rowDist, columnDist);
      const nodes = figma.currentPage.selection;
      figma.viewport.scrollAndZoomIntoView(nodes);
    })
    .finally(() => figma.closePlugin());
};
