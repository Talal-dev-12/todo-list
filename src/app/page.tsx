"use client";
import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function Page() {
  type task = {
    Title: string;
    desc: string;
    ID: string;
    Completed: string;
  };
  //hooks
  const [Title, Settitle] = useState<string>("");
  const [desc, Setdesc] = useState<string>("");
  const [Maintask, setMaintask] = useState<task[]>([]);
  const [error, setError] = useState("");

  function deleteHandler(ID: string) {
    setMaintask(Maintask.filter((Task) => Task.ID !== ID));
  }

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!Title.trim() && !desc.trim()) {
      setError("Both fields are Required!");
      return;
    } else if (!Title.trim()) {
      setError("Title Required!");
      return;
    } else if (!desc.trim()) {
      setError("Description Required!");
      return;
    }
    setMaintask([
      ...Maintask,
      {
        Title: Title,
        desc: desc,
        ID: uuidv4(),
        Completed: "",
      },
    ]);
    setError("");
    Settitle("");
    Setdesc("");
  }
  function Completed(ID: string) {
    setMaintask(
      Maintask.map((task) =>
        task.ID === ID
          ? { ...task, Completed: task.Completed ? "" : "✔️" } // toggle
          : task
      )
    );
  }

  function Tasks() {
    if (Maintask.length === 0) {
      return (
        <li className="text-2xl font-bold text-white">No task Available</li>
      );
    } else {
      return (
        <>
          {Maintask.map((task, index) => (
            <li
              className={
                task.Completed
                  ? "hover:bg-blue-600 rounded text-blue-50 font-mono flex justify-between items-center  py-2 px-2  bg-blue-500"
                  : "hover:bg-blue-600 rounded text-blue-50 font-mono flex justify-between items-center  py-2 px-2  bg-blue-400"
              }
              key={task.ID}
            >
              <div>
                {index + 1} ) <strong>{task.Title} </strong>
                <span className="text-xl text-blue-50 font-light">
                  - {task.desc}
                </span>
                <span className="text-xl text-blue-900">{task.Completed}</span>
              </div>
              <div>
                <button
                  className="bg-blue-900 text-blue-50 px-4 py-2 rounded-lg shadow-sm shadow-black text-sm w-25 mr-2 ml-2"
                  onClick={() => {
                    Completed(task.ID);
                  }}
                >
                  Completed
                </button>
                <button
                  className="bg-red-900 text-blue-50 px-4 py-2 rounded-lg shadow-sm shadow-black text-sm w-25"
                  onClick={() => {
                    deleteHandler(task.ID);
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </>
      );
    }
  }
  return (
    <>
      <h1 className="bg-blue-900 text-blue-100 text-5xl p-8 font-bold text-center">
        Talal Todo-list
      </h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="border-zinc-800 px-4 py-2 m-5 border-2 rounded-md"
          placeholder="Enter Task Here!"
          value={Title}
          onChange={(e) => {
            Settitle(e.target.value);
          }}
        />
        <input
          type="text"
          className="border-zinc-800 px-4 py-2 m-5 border-2 rounded-md"
          placeholder="Enter Desciption Here!"
          value={desc}
          onChange={(e) => {
            Setdesc(e.target.value);
          }}
        />
        <button className="bg-blue-900 text-blue-50 px-4 py-2 rounded-lg shadow-sm shadow-black text-md m-5">
          Add Task
        </button>
        <span
          className={error ? "text-red-100 bg-red-900 px-4 py-2 rounded" : ""}
        >
          {error}
        </span>
      </form>
      <hr />
      <div className="p-8 bg-blue-400">
        <ul>{Tasks()}</ul>
      </div>
    </>
  );
}

export default Page;
