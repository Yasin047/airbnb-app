"use client";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const initialState = {
  name: "",
  email: "",
  password: "",
};
const initialLoginState = {
  email: "",
  password: "",
};
export default function Home() {
  const router = useRouter();
  const [formState, setFormState] = useState({ ...initialState });
  const [loginState, setLoginState] = useState({ ...initialLoginState });
  const [loading, setLoading] = useState(false);
  const [todo, setTodo] = useState("");
  const [getTodo, setGetTodo] = useState("");
  const [isUpdate, setIsUpdate] = useState("");
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setFormState((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleLoginChange = (e) => {
    setLoginState((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const data = {
      name: formState.name,
      email: formState.email,
      password: formState.password,
    };
    console.log(data);
    const res = axios
      .post("/api/register", data)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };
  const handleLoginForm = (e) => {
    e.preventDefault();
    const data = {
      email: loginState.email,
      password: loginState.password,
    };
    console.log(data);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        alert("User is logged In successfully!");
        router.refresh();
      }
      if (callback?.error) {
        console.log(callback.error);
      }
    });
  };
  const getAllTodos = () => {
    const res = axios
      .get("/api/todo")
      .then((res) => setGetTodo(res?.data))
      .catch((error) => console.log(error));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isUpdate == "") {
      if (todo.length > 2) {
        const res = await axios
          .post("/api/todo", { todo })
          .then((res) => setMsg(res.data.msg))
          .catch((error) => console.log(error));
        getAllTodos();
        setLoading(false);
        setTodo("");
      } else {
        alert("please provide minimum 3 characters");
      }
    } else {
      const res = await axios
        .put("/api/todo", { id: isUpdate, todo })
        .then((res) => setMsg(res.data.msg))
        .catch((error) => console.log(error));
      getAllTodos();
      setLoading(false);
      setIsUpdate("");
      setTodo("");
    }
  };

  const handleDelete = async (id) => {
    const res = await axios
      .delete("/api/todo", { id })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    getAllTodos();
  };
  const handleUpdate = ({ id, todo }) => {
    setIsUpdate(id);
    setTodo(todo);
  };

  useEffect(() => {
    setLoading(true);
    getAllTodos();
    setLoading(false);
  }, []);

  return (
    <div className=" w-full h-full">
      <div>
        <form onSubmit={handleSubmitForm}>
          <input
            className="h-12 w-80 outline-none"
            type="text"
            name="name"
            value={formState.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            className="h-12 w-80 outline-none"
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            className="h-12 w-80 outline-none"
            type="password"
            name="password"
            value={formState.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <button className="h-12 w-24 bg-black text-white">submit</button>
        </form>
      </div>
      <div>
        <form onSubmit={handleLoginForm}>
          <input
            className="h-12 w-80 outline-none"
            type="email"
            name="email"
            value={loginState.email}
            onChange={handleLoginChange}
            placeholder="Email"
          />
          <input
            className="h-12 w-80 outline-none"
            type="password"
            name="password"
            value={loginState.password}
            onChange={handleLoginChange}
            placeholder="Password"
          />
          <button className="h-12 w-24 bg-black text-white">submit</button>
        </form>
      </div>
      <div>
        <h1 className="text-white w-80 h-[60px] flex justify-center items-center bg-blue-950 text-3xl font-bold mx-auto ">
          Todo App
        </h1>

        <form
          className="flex justify-center items-center mt-10"
          onSubmit={handleSubmit}
        >
          <input
            className="h-12 w-80 outline-none"
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button className="h-12 w-24 bg-black text-white">submit</button>
        </form>
        {
          <div>
            <h2 className=" text-center mt-10">
              {loading ? "Loading..." : <div>{msg}</div>}
            </h2>
          </div>
        }
        <div className="mt-10">
          {getTodo.length > 0 ? (
            <>
              {getTodo?.map(({ id, todo }) => (
                <div
                  key={id}
                  className=" w-96 mx-auto flex justify-between items-center gap-10 mt-5 border-2 px-8 py-6"
                >
                  <div>{todo}</div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate({ id, todo })}
                      className="h-12 w-24 bg-black text-white"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(id)}
                      className="h-12 w-24 bg-black text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="text-center">
              {loading ? "loading..." : "No todo found..."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
