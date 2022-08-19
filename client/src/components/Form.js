const initialForm = {
  email: "",
  description: "",
  id: "",
};

export const Form = ({ form, setForm, postComment, updateComment }) => {
  const handleChange = e => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async e => {
    try {
      e.preventDefault();

      const formObj = {
        email: form.email.trim(),
        description: form.description.trim(),
      };

      if (!form.id) {
        await postComment(formObj);
      } else {
        await updateComment(formObj);
      }

      setForm(initialForm);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="card-body">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          className="form-control"
          placeholder="Add an email..."
          onChange={handleChange}
          value={form.email}
          name="email"
          required
        />
        <label htmlFor="comment">Comment:</label>
        <textarea
          id="comment"
          className="form-control"
          placeholder="Add a comment..."
          rows="4"
          cols="50"
          onChange={handleChange}
          name="description"
          value={form.description}
          required
          style={{ resize: "none" }}
        />
        <input
          type="text"
          className="form-control invisible"
          name="id"
          value={form.id}
          disabled
          readOnly
        />
        <div className="d-flex justify-content-end">
          {form.id && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setForm(initialForm);
              }}
            >
              Cancel
            </button>
          )}
          <input
            type="submit"
            className={`${form.id ? "btn-success" : "btn-primary"}  btn ms-3`}
            value={form.id ? "Save" : "Comment"}
          />
        </div>
      </div>
    </form>
  );
};
