import React, { useEffect, useState } from "react";
import { MeasuringStrategy } from "@dnd-kit/core";
import {
  defaultAnimateLayoutChanges,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { Sortable } from "./Sortable";
import { GridContainer } from "./components/GridContainer/GridContainer";

const RemovableItems = () => {
  const [questions, setQuestions] = useState([]);
  const animateLayoutChanges = (args) =>
    defaultAnimateLayoutChanges({ ...args, wasDragging: true });

  useEffect(() => {
    const localQuestions = JSON.parse(
      localStorage.getItem("questions") || "[]"
    );

    setQuestions(localQuestions);
  }, []);

  return (
    <Sortable
      adjustScale={true}
      Container={(props) => <GridContainer {...props} />}
      wrapperStyle={() => ({
        width: "auto",
        height: "auto",
      })}
      strategy={rectSortingStrategy}
      animateLayoutChanges={animateLayoutChanges}
      measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
      removable
      handle
      initialItems={questions}
    />
  );
};

export default RemovableItems;
