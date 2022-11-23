import React from "react";
import { Link } from "react-router-dom";

const FaqList = ({ isLoading, rows, handleEdit, handleDelete }) => {
  if (isLoading) return <h2>Fetching....</h2>;
  return (
    <div className="list-group">
      {rows && rows.length > 0 ? (
        rows.map((row) => (
          <Link
            to="#"
            className="list-group-item list-group-item-action"
            key={row.id}
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{row.question}</h5>
              <small>
                Posted on : {new Date(row.createdAt).toLocaleDateString()}
              </small>
            </div>
            <p className="mb-1 text-left">{row.answer}</p>
            <div className="d-flex w-100 justify-content-end">
              <button
                className="btn btn-primary m-1"
                onClick={() => handleEdit(row.id)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger m-1"
                onClick={() => handleDelete(row.id)}
              >
                Delete
              </button>
            </div>
          </Link>
        ))
      ) : (
        <p>No Faq Found</p>
      )}
    </div>
  );
};

export default FaqList;
