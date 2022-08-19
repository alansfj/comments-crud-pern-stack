import { useMemo } from "react";

export const Comment = ({ comment, deleteComment, form, setForm }) => {
  const isThisCommentBeingEdited = useMemo(
    () => (form.id === comment.id ? true : false),
    [form.id, comment.id]
  );

  return (
    <div className={`${isThisCommentBeingEdited && "text-primary"} card my-3`}>
      <div className="card-body">
        <div>
          <strong>{comment.email}</strong>
        </div>
        <div>{comment.description}</div>
        <div className="d-flex justify-content-end">
          {isThisCommentBeingEdited ? (
            <div>Editing...</div>
          ) : (
            <>
              <button
                className="btn btn-info btn-sm"
                onClick={() => {
                  setForm({
                    email: comment.email,
                    description: comment.description,
                    id: comment.id,
                  });
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm ms-3"
                onClick={() => {
                  deleteComment(comment.id);
                }}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
