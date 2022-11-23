import React, { useContext, useEffect, useState } from "react";
import { AddEditFaqModal, ConfirmationModal, FaqList } from "../components";
import { apiRoutes } from "../constants/apiRoutes";
import { UserContext } from "../contexts/userContext";
import { axiosDelete, axiosGet } from "../services/axiosService";

const DashboardPage = () => {
  const [isFaqFetching, setIsFaqFetching] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isAddFaqDialogOpen, setIsAddFaqDialogOpen] = useState(false);
  const [isEditFaqDialogOpen, setIsEditFaqDialogOpen] = useState(false);
  const [deleteFaq, setDeleteFaq] = useState("");
  const [editFaq, setEditFaq] = useState("");

  const { clearUser } = useContext(UserContext);

  useEffect(() => {
    const fetchFaqs = async () => {
      setIsFaqFetching(true);
      try {
        const res = await axiosGet(apiRoutes.GET_FAQS);
        setIsFaqFetching(false);
        if (res.status && res.data.length > 0) {
          setFaqs(res.data);
        }
      } catch (error) {
        setIsFaqFetching(false);
      }
    };
    fetchFaqs();
  }, []);

  const onDelete = async (faqId) => {
    if (!faqId) return;
    setDeleteFaq(faqId);
    setIsConfirmDialogOpen(true);
  };

  const onEdit = (faqId) => {
    if (!faqId) return;
    const selected = faqs.find(({ id }) => id === faqId);
    if (selected) {
      setEditFaq(selected);
      setIsEditFaqDialogOpen(true);
    }
  };

  const handleConfirmDelete = async (isConfirm) => {
    setIsConfirmDialogOpen(false);
    if (!isConfirm) return;
    try {
      const res = await axiosDelete(
        apiRoutes.DELETE_FAQ.replace("id", deleteFaq)
      );
      if (res.status && res.data) {
        alert("Faq deleted successfully");
        const updatedFaqs = faqs.filter(({ id }) => id !== deleteFaq);
        setFaqs(updatedFaqs);
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  const onUpdateFaqs = (faq) => {
    const isOld = faqs.some(({ id }) => id === faq.id);
    if (!isOld) {
      setFaqs((prev) => [...prev, faq]);
    } else {
      const updatedFaqs = faqs.map((item) =>
        item.id === faq.id ? { ...item, ...faq } : item
      );
      setFaqs(updatedFaqs);
    }
  };

  const onLogout = () => clearUser();

  return (
    <div className="container p-5">
      <button className="btn btn-primary m-1" onClick={onLogout}>
        Logout
      </button>
      <button
        className="btn btn-primary m-1"
        onClick={() => setIsAddFaqDialogOpen(true)}
      >
        Add Faq
      </button>
      <FaqList
        rows={faqs}
        isLoading={isFaqFetching}
        handleEdit={onEdit}
        handleDelete={onDelete}
      />
      <ConfirmationModal
        isOpen={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={handleConfirmDelete}
      />
      <AddEditFaqModal
        isOpen={isAddFaqDialogOpen}
        onClose={() => setIsAddFaqDialogOpen(false)}
        updateFaqs={onUpdateFaqs}
        faq={""}
        isEdit={false}
      />
      <AddEditFaqModal
        isOpen={isEditFaqDialogOpen}
        onClose={() => setIsEditFaqDialogOpen(false)}
        updateFaqs={onUpdateFaqs}
        faq={editFaq}
        isEdit={true}
      />
    </div>
  );
};

export default DashboardPage;
