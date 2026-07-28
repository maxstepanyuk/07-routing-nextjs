import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";
import * as Yup from "yup";

import css from "./NoteForm.module.css";
import type { CreateNote, NoteTag } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../services/noteService";
import { useState } from "react";
import toast from "react-hot-toast";

const initialValues: CreateNote = {
  title: "",
  content: "",
  tag: "Todo",
};

const validTags: NoteTag[] = [
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
];

const validationSchema = Yup.object().shape({
  title: Yup.string().min(3).max(50).required(),
  content: Yup.string().max(500),
  tag: Yup.string().oneOf(validTags).required(),
});

interface NoteFormProps {
  onCancel: () => void;
}

export default function NoteForm({ onCancel }: NoteFormProps) {
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createNote,
    onMutate: () => {
      setIsSubmitEnabled(false);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });

      setIsSubmitEnabled(true);
      onCancel();
    },
    onError: (e) => {
      const msg = "Error creating note";
      console.log(msg, e);
      toast.error(msg);
      setIsSubmitEnabled(true);
    },
  });

  const handleSubmit = (
    formValues: CreateNote,
    actions: FormikHelpers<CreateNote>,
  ) => {
    mutate(formValues);
    actions.resetForm();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ isValid, dirty }) => {
          setIsSubmitEnabled(isValid && dirty);

          return (
            <Form className={css.form}>
              <div className={css.formGroup}>
                <label htmlFor="title">Title</label>
                <Field
                  id="title"
                  type="text"
                  name="title"
                  className={css.input}
                />
                <ErrorMessage
                  component="span"
                  name="title"
                  className={css.error}
                />
              </div>

              <div className={css.formGroup}>
                <label htmlFor="content">Content</label>
                <Field
                  as="textarea"
                  id="content"
                  name="content"
                  rows={8}
                  className={css.textarea}
                />
                <ErrorMessage
                  component="span"
                  name="content"
                  className={css.error}
                />
              </div>

              <div className={css.formGroup}>
                <label htmlFor="tag">Tag</label>
                <Field as="select" id="tag" name="tag" className={css.select}>
                  <option value="Todo">Todo</option>
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Meeting">Meeting</option>
                  <option value="Shopping">Shopping</option>
                </Field>
                <ErrorMessage
                  component="span"
                  name="tag"
                  className={css.error}
                />
              </div>

              <div className={css.actions}>
                <button
                  type="button"
                  className={css.cancelButton}
                  onClick={onCancel}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={css.submitButton}
                  disabled={!isSubmitEnabled}
                >
                  Create note
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
