import React, { useEffect } from "react";
import classNames from "classnames";

import { Handle } from "./components/Handle/Handle.component";

import styles from "./Item.module.scss";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

export const Item = React.memo(
  React.forwardRef(
    (
      {
        color,
        dragOverlay,
        dragging,
        disabled,
        fadeIn,
        handle,
        handleProps,
        height,
        index,
        listeners,
        onRemove,
        renderItem,
        sorting,
        style,
        transition,
        transform,
        value: el,
        wrapperStyle,
        deleteConfirmationHandler,
        editHandler,
        detailHandler,
        ...props
      },
      ref
    ) => {
      useEffect(() => {
        if (!dragOverlay) {
          return;
        }

        document.body.style.cursor = "grabbing";

        return () => {
          document.body.style.cursor = "";
        };
      }, [dragOverlay]);

      return renderItem ? (
        renderItem({
          dragOverlay: Boolean(dragOverlay),
          dragging: Boolean(dragging),
          sorting: Boolean(sorting),
          index,
          fadeIn: Boolean(fadeIn),
          listeners,
          ref,
          style,
          transform,
          transition,
          el,
        })
      ) : (
        <Grid
          item
          xs={12}
          md={4}
          component="li"
          className={classNames(
            styles.Wrapper,
            fadeIn && styles.fadeIn,
            sorting && styles.sorting,
            dragOverlay && styles.dragOverlay
          )}
          style={{
            ...wrapperStyle,

            transition: [transition, wrapperStyle?.transition]
              .filter(Boolean)
              .join(", "),

            "--translate-x": transform
              ? `${Math.round(transform.x)}px`
              : undefined,

            "--translate-y": transform
              ? `${Math.round(transform.y)}px`
              : undefined,

            "--scale-x": transform?.scaleX ? `${transform.scaleX}` : undefined,

            "--scale-y": transform?.scaleY ? `${transform.scaleY}` : undefined,

            "--index": index,
            "--color": color,
          }}
          ref={ref}
        >
          <Card
            variant="outlined"
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
            }}
            className={classNames(
              styles.Item,
              dragging && styles.dragging,
              handle && styles.withHandle,
              dragOverlay && styles.dragOverlay,
              disabled && styles.disabled,
              color && styles.color
            )}
            style={style}
            data-cypress="draggable-item"
            {...(!handle ? listeners : undefined)}
            {...props}
            tabIndex={!handle ? 0 : undefined}
          >
            <Typography
              variant="span"
              sx={{
                display: "flex",
                position: "absolute",
                top: 0,
                right: 0,
                zIndex: 1,
                marginTop: 1,
                marginRight: 1,
              }}
            >
              {handle ? <Handle {...handleProps} {...listeners} /> : null}
            </Typography>
            <CardActionArea
              onClick={() => detailHandler(el)}
              sx={{
                height: "calc(100% - 50px)",
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              <CardContent
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                  boxSizing: "border-box",
                  paddingTop: 5,
                }}
              >
                <Typography gutterBottom variant="subtitle1" fontWeight={400}>
                  {el.question.length > 150
                    ? el.question.substring(0, el.question.length - 3) + "..."
                    : el.question}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  marginTop={3}
                >
                  Respondent Option: <strong>{el.resOptions.length}</strong>
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Stack
                direction="row"
                spacing={1}
                width="100%"
                justifyContent="flex-end"
                divider={<Divider orientation="vertical" flexItem />}
              >
                <IconButton
                  onClick={() => editHandler(el.id)}
                  color="warning"
                  aria-label="edit question"
                  size="small"
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => deleteConfirmationHandler(el.id)}
                  color="error"
                  aria-label="remove question"
                  size="small"
                >
                  <Delete />
                </IconButton>
              </Stack>
            </CardActions>
          </Card>
        </Grid>
      );
    }
  )
);
