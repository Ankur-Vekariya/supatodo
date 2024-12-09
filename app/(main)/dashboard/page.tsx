"use client";
import TaskCard from "@/components/TaskCard";
import { taskContext } from "@/context/taskContext";
import withLogging from "@/HOC/withProtectedRoute";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

// TypeScript interface for Task data
interface Task {
  id: string;
  task: string;
  is_complete: boolean;
  user_id?: string;
}

function Dashboard() {
  const router = useRouter();
  const { task, setTask } = useContext(taskContext);

  const [taskList, setTaskList] = useState<Task[]>([]);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    router.push("/sign-in");
    if (error) {
      alert("sign out error");
    }
  };

  const addTask = async () => {
    if (!task.trim()) {
      alert("Please enter a task!");
      return;
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) {
      console.error("Error getting user:", error);
      return;
    }

    const { error: insertError } = await supabase
      .from("todos")
      .insert({ task, is_complete: false, user_id: user?.id });

    if (insertError) {
      console.error("Error creating task:", insertError);
      return;
    }

    setTask("");
    getTask();
  };

  const getTask = async () => {
    const { data, error } = await supabase.from("todos").select();
    if (error) {
      console.error("Error getting tasks:", error);
      return;
    }

    setTaskList(data || []);
  };

  const updateTask = async (id: string) => {
    const { error } = await supabase
      .from("todos")
      .update({ is_complete: true })
      .eq("id", id);

    if (error) {
      alert("Error to update task");
    }
  };

  const deleteTask = async (id: string) => {
    const response = await supabase.from("todos").delete().eq("id", id);
    console.log(response);
    getTask(); // Refresh task list after deletion
    if (response.error) {
      alert("Error to delete task");
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
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {taskList.length > 0 &&
          taskList.map((item, index) => {
            return (
              <TaskCard
                item={item}
                key={index}
                updateTask={updateTask}
                deleteTask={deleteTask}
              />
            );
          })}
      </div>
    </div>
  );
}

export default withLogging(Dashboard);
