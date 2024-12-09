import React from "react";

function TaskCard({
  item,
  updateTask,
  deleteTask,
}: {
  item: {
    id: string;
    task: string;
    is_complete: boolean;
    user_id?: string;
  };
  updateTask: (id: string) => void;
  deleteTask: (id: string) => void;
}) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4 flex flex-row justify-between align-middle content-center">
        <input
          type="checkbox"
          className="checkbox"
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
}

export default TaskCard;
