import "./App.css";
import { Form } from "./components/Form";
import { useEffect,  useState } from "react";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { Comment } from "./components/Comment";

const initialForm = {
  email: "",
  description: "",
  id: "",
};

function App() {
  const [comments, setComments] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetch("http://localhost:3100/comments/");

        const json = await data.json();

        setComments(json);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const postComment = async formObj => {
    const data = await fetch("http://localhost:3100/comments/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObj),
    });

    const json = await data.json();

    if (data.status === 200) {
      setComments(prevState => {
        const newState = [...prevState];

        newState.push(json);

        return newState;
      });
    }
  };

  const updateComment = async formObj => {
    const data = await fetch(`http://localhost:3100/comments/${form.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObj),
    });

    const json = await data.json();

    if (data.status === 200) {
      setComments(prevState => {
        const newState = [...prevState];

        return newState.map(comment =>
          comment.id === json.id ? json : comment
        );
      });
    }
  };

  const deleteComment = async id => {
    try {
      const data = await fetch(`http://localhost:3100/comments/${id}`, {
        method: "DELETE",
      });

      const json = await data.json();

      if (data.status === 200) {
        setComments(prevState => {
          const newState = [...prevState];

          return newState.filter(comment => comment.id !== json.id);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="container">
          <Form
            form={form}
            setForm={setForm}
            postComment={postComment}
            updateComment={updateComment}
          />
          {comments.map(comment => (
            <Comment
              key={comment.id}
              comment={comment}
              deleteComment={deleteComment}
              form={form}
              setForm={setForm}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
