import React, { useEffect, useState } from "react";
import { MeasuringStrategy } from "@dnd-kit/core";
import {
  defaultAnimateLayoutChanges,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { Sortable } from "./Sortable";
import { GridContainer } from "./components/GridContainer/GridContainer";
import { useLocation, useNavigate } from "react-router-dom";

const RemovableItems = () => {
  const [questions, setQuestions] = useState([]);
  const { state } = useLocation();
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [flashMessage, setFlashMessage] = useState(null);

  const animateLayoutChanges = (args) =>
    defaultAnimateLayoutChanges({ ...args, wasDragging: true });

  useEffect(() => {
    const localQuestions = JSON.parse(
      localStorage.getItem("questions") || "[]"
    );

    setQuestions(localQuestions);
  }, []);

  const deleteHandler = (decision) => {
    setDeleteModal(false);

    if (selectedQuestionId !== null && decision === "yes") {
      let localQuestions = JSON.parse(
        localStorage.getItem("questions") || "[]"
      );

      localQuestions = localQuestions.filter((el) => {
        return el.id !== selectedQuestionId;
      });

      setQuestions(localQuestions);
      setDeleteSuccess(true);
      setSelectedQuestionId(null);

      localStorage.setItem("questions", JSON.stringify(localQuestions));
    }
  };

  const deleteConfirmationHandler = (id) => {
    setDeleteModal(true);

    setSelectedQuestionId(id);
  };

  const editHandler = (id) => {
    navigate("/add", { state: { id } });
  };

  useEffect(() => {
    setFlashMessage(state);
    window.history.replaceState({}, document.title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Sortable
      adjustScale={true}
      Container={(props) => <GridContainer {...props} />}
      strategy={rectSortingStrategy}
      animateLayoutChanges={animateLayoutChanges}
      measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
      removable
      handle
      initialItems={questions}
      deleteHandler={deleteHandler}
      deleteConfirmationHandler={deleteConfirmationHandler}
      editHandler={editHandler}
      deleteSuccess={deleteSuccess}
      setDeleteSuccess={setDeleteSuccess}
      flashMessage={flashMessage}
      setFlashMessage={setFlashMessage}
      deleteModal={deleteModal}
    />
  );
};

export default RemovableItems;
