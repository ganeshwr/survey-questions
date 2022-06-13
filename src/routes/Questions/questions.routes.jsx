import React, { useEffect, useState } from "react";
import { MeasuringStrategy } from "@dnd-kit/core";
import {
  defaultAnimateLayoutChanges,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useLocation, useNavigate } from "react-router-dom";

import { Sortable } from "../../components/Sortable/Sortable";
import { GridContainer } from "../../components/GridContainer/GridContainer";

import {
  getLocalQuestions,
  setLocalQuestions,
} from "../../utils/questions.utils";
import ItemDetail from "../../components/ItemDetail/item-detail.component";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const { state } = useLocation();
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [flashMessage, setFlashMessage] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);

  const animateLayoutChanges = (args) =>
    defaultAnimateLayoutChanges({ ...args, wasDragging: true });

  useEffect(() => {
    const localQuestions = getLocalQuestions();

    setQuestions(localQuestions);
  }, []);

  const deleteHandler = (decision) => {
    setDeleteModal(false);

    if (selectedQuestionId !== null && decision === "yes") {
      let localQuestions = getLocalQuestions();

      localQuestions = localQuestions.filter((el) => {
        return el.id !== selectedQuestionId;
      });

      setQuestions(localQuestions);
      setDeleteSuccess(true);
      setSelectedQuestionId(null);

      setLocalQuestions(localQuestions);
    }
  };

  const deleteConfirmationHandler = (id) => {
    setDeleteModal(true);

    setSelectedQuestionId(id);
  };

  const detailHandler = (id) => {
    setOpenDetail(true);

    setSelectedQuestionId(id);
  };

  const closeDetailHandler = (id) => {
    setOpenDetail(false);

    setSelectedQuestionId(null);
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
    <>
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
        detailHandler={detailHandler}
      />
      <ItemDetail
        openDetail={openDetail}
        setOpenDetail={setOpenDetail}
        data={selectedQuestionId}
        closeDetailHandler={closeDetailHandler}
      />
    </>
  );
};

export default Questions;
