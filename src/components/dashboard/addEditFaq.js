import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { axiosPost, axiosPut } from "../../services/axiosService";
import { apiRoutes } from "../../constants/apiRoutes";

const faqSchema = yup
  .object({
    question: yup
      .string("Enter valid question")
      .required("Question is required"),
    answer: yup.string("Enter valid answer").required("Answer is required"),
  })
  .required();

const AddEditFaq = ({ isOpen, onClose, isEdit, faq = "", updateFaqs }) => {
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(faqSchema),
    defaultValues: {
      question: isEdit ? faq.question : "",
      answer: isEdit ? faq.answer : "",
    },
  });

  useEffect(() => {
    if (isEdit) {
      setValue("question", faq.question);
      setValue("answer", faq.answer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, faq]);

  const onSave = async (formData) => {
    const { question, answer } = formData;
    setIsSaving(true);
    try {
      const res = isEdit
        ? await axiosPut(apiRoutes.UPDATE_FAQ.replace("id", faq.id), {
            question,
            answer,
          })
        : await axiosPost(apiRoutes.ADD_FAQ, {
            question,
            answer,
          });
      setIsSaving(false);
      if (res.status && res.data) {
        alert(`Faq ${isEdit ? "updated" : "added"} successfully`);
        updateFaqs(res.data);
        onDialogClose();
      }
    } catch (error) {
      setIsSaving(false);
      alert("Something went wrong!");
    }
  };

  const onDialogClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal show={isOpen} onHide={onDialogClose}>
      <Modal.Header closeButton>
        <Modal.Title>{!isEdit ? "Add" : "Update"} Faq</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSave)}>
        <Modal.Body>
          <div class="form-group">
            <label for="recipient-name" class="col-form-label">
              Question:
            </label>
            <input
              type="text"
              {...register("question")}
              class="form-control"
              id="recipient-name"
              aria-describedby="emailHelp"
            />
            {errors?.question && (
              <small id="emailHelp" className="form-text text-danger">
                {errors?.question?.message}
              </small>
            )}
          </div>
          <div class="form-group">
            <label for="message-text" class="col-form-label">
              Answer:
            </label>
            <textarea
              class="form-control"
              {...register("answer")}
              id="message-text"
              aria-describedby="email1Help"
              rows={6}
            />
            {errors?.answer && (
              <small id="email1Help" className="form-text text-danger">
                {errors?.answer?.message}
              </small>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={onDialogClose}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={isSaving}>
            Save
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default AddEditFaq;
