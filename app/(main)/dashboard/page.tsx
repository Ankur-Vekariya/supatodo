"use client";
import withLogging from "@/HOC/withProtectedRoute";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Dashboard() {
  const router = useRouter();

  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    router.push("/sign-in");
    if (error) {
      alert("sign out error");
    }
  };

  const addTask = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log("user---", user);
    const { error } = await supabase
      .from("todos")
      .insert({ task: task, is_complete: false, user_id: user?.id });

    if (error) {
      console.log("error creating task---------", error);
    } else {
      setTask("");
      getTask();
    }
  };

  const getTask = async () => {
    const { data, error } = await supabase.from("todos").select();
    if (error) {
      console.log("get data error---------", error);
    }
    console.log("data", data);
    setTaskList(data);
  };

  const updateTask = async (id: string) => {
    const { error } = await supabase
      .from("todos")
      .update({ is_complete: true })
      .eq("id", id);

    if (error) {
      alert("error to update task");
    }
  };

  const deleteTask = async (id: string) => {
    const response = await supabase.from("todos").delete().eq("id", id);
    console.log(response);
    getTask();
    if (response.error) {
      alert("error to delete task");
    }
  };

  useEffect(() => {
    getTask();
  }, []);

  return (
    <div className="text-black bg-white h-full flex flex-col">
      Dashboard
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={() => signOut()}
      >
        Sign out
      </button>
      <div className="m-4 flex flex-row gap-5 align-middle justify-center content-center">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Task
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Username"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={() => addTask()}
        >
          Add
        </button>
      </div>
      {taskList.length > 0 &&
        taskList.map((item, index) => {
          return (
            <div
              className="max-w-sm rounded overflow-hidden shadow-lg"
              key={index}
            >
              <div className="px-6 py-4 flex flex-row justify-between align-middle content-center">
                <input
                  type="checkbox"
                  className="checkbox"
                  // checked={item.is_complete}
                  defaultChecked={item.is_complete}
                  onChange={(e) => {
                    console.log(e.target.checked);
                    if (e.target.checked) {
                      updateTask(item.id);
                    }
                  }}
                />
                <p className="text-gray-700 text-base align-middle items-center self-center">
                  {item?.task}
                </p>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => deleteTask(item.id)}
                >
                  remove
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default withLogging(Dashboard);
