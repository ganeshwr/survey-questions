import React from "react";
import { MeasuringStrategy } from "@dnd-kit/core";
import {
  defaultAnimateLayoutChanges,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { Sortable } from "./Sortable";
import { GridContainer } from "./components/GridContainer/GridContainer";

const props = {
  adjustScale: true,
  Container: (props) => <GridContainer {...props} columns={5} />,
  strategy: rectSortingStrategy,
  wrapperStyle: () => ({
    width: 140,
    height: 140,
  }),
};

const RemovableItems = () => {
  const animateLayoutChanges = (args) =>
    defaultAnimateLayoutChanges({ ...args, wasDragging: true });

  return (
    <Sortable
      {...props}
      animateLayoutChanges={animateLayoutChanges}
      measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
      removable
      handle
    />
  );
};

export default RemovableItems;
