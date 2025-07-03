import React, { useState } from "react";
import plus from "./assets/PlusCircle.svg";
import trash from "./assets/trash.svg";
import { useSnackbar } from "notistack";

const Period = ({ period, onUpdate, onRemove }) => {
  const [editingPeriod, setEditingPeriod] = useState(false);

  const updatePeriod = (updatedPeriod) => {
    onUpdate(updatedPeriod);
    setEditingPeriod(false);
  };

  return (
    <div className="bg-gray-100 py-3 px-4 rounded-md ">
      {editingPeriod ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 items-center">
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="time"
              className="text-xs font-medium text-gray-600 font-Outfit"
            >
              Time
            </label>
            <input
              type="time"
              id="time"
              value={period.start}
              onChange={(e) =>
                updatePeriod({ ...period, start: e.target.value })
              }
              className="border border-[#DAE0E6] p-1.5 font-Outfit font-normal text-[#272D37] text-sm rounded-[5px]"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="subject"
              className="text-xs font-medium text-gray-600 font-Outfit"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              value={period.subject}
              onChange={(e) =>
                updatePeriod({ ...period, subject: e.target.value })
              }
              className="border border-[#DAE0E6] p-1.5 font-Outfit font-normal text-[#272D37] text-sm rounded-[5px]"
              placeholder="Enter Subject"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="duration"
              className="text-xs font-medium text-gray-600 font-Outfit"
            >
              Duration (min)
            </label>
            <input
              type="number"
              id="duration"
              value={period.ends}
              onChange={(e) =>
                updatePeriod({ ...period, ends: e.target.value })
              }
              className="border border-[#DAE0E6] p-1.5 font-Outfit font-normal text-[#272D37] text-sm rounded-[5px]"
              placeholder="Enter Duration"
            />
          </div>
          <div className=" flex items-center space-x-2">
            <button
              onClick={() => setEditingPeriod(false)}
              className=" py-1 px-2 text-sm font-medium font-Outfit rounded-md bg-gray-300 hover:bg-gray-400"
            >
              Save
            </button>
            <button
              onClick={onRemove}
              className="p-1  rounded-md bg-red-500 hover:bg-red-600 text-white"
            >
              <img src={trash} className="w-4" alt="" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <div className="font-Outfit text-sm">
            <span className="font-bold ">{period.start}</span> -{" "}
            {period.subject} ({period.ends} min)
          </div>
          <div className=" flex items-center space-x-2">
            {/* <button
              onClick={() => setEditingPeriod(true)}
              className="py-1 px-2 text-sm font-medium font-Outfit rounded-md bg-gray-300 hover:bg-gray-400"
            >
              Edit
            </button> */}
            <button
              onClick={onRemove}
              className="p-1 rounded-md bg-red-500 hover:bg-red-600 text-white"
            >
              <img src={trash} className=" w-4" alt="" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Day = ({ day, onUpdate, onRemove }) => {
  const [newPeriod, setNewPeriod] = useState({
    start: "07:30",
    subject: "",
    ends: 30,
  });
  const { enqueueSnackbar } = useSnackbar();

  const addPeriod = () => {
    // Validate input before adding new period
    if (!newPeriod.subject.trim()) {
      //   alert("Please enter a subject.");
      enqueueSnackbar("Please enter a subject.", { variant: "warning" });

      return;
    }

    const updatedDay = {
      ...day,
      periods: [...day.periods, newPeriod],
    };
    onUpdate(updatedDay);

    // Update the start time for the next period
    const [hours, minutes] = newPeriod.start.split(":");
    const durationInMinutes = parseInt(newPeriod.ends);
    const nextStartHour =
      parseInt(hours) +
      Math.floor((parseInt(minutes) + durationInMinutes) / 60);
    const nextStartMinute = (parseInt(minutes) + durationInMinutes) % 60;
    setNewPeriod({
      start: `${nextStartHour.toString().padStart(2, "0")}:${nextStartMinute
        .toString()
        .padStart(2, "0")}`,
      subject: "",
      ends: 30,
    });
  };

  const updatePeriod = (index, updatedPeriod) => {
    const updatedDay = {
      ...day,
      periods: [
        ...day.periods.slice(0, index),
        updatedPeriod,
        ...day.periods.slice(index + 1),
      ],
    };
    onUpdate(updatedDay);
  };

  const removePeriod = (index) => {
    const updatedDay = {
      ...day,
      periods: [
        ...day.periods.slice(0, index),
        ...day.periods.slice(index + 1),
      ],
    };
    onUpdate(updatedDay);
  };

  return (
    <div className="bg-white  mt-4 border border-[#DAE0E6] p-2.5 rounded-[5px] mb-4">
      <h2 className="text-base font-Outfit text-[#272D37] font-bold mb-4">
        {day.name}
      </h2>
      {day.periods.map((period, index) => (
        <Period
          key={index}
          period={period}
          onUpdate={(updatedPeriod) => updatePeriod(index, updatedPeriod)}
          onRemove={() => removePeriod(index)}
        />
      ))}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 items-center">
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="time"
            className="text-xs font-medium text-gray-600 font-Outfit"
          >
            Time
          </label>
          <input
            type="time"
            id="time"
            value={newPeriod.start}
            onChange={(e) =>
              setNewPeriod({ ...newPeriod, start: e.target.value })
            }
            className="border border-[#DAE0E6] p-1.5 font-Outfit font-normal text-[#272D37] text-sm rounded-[5px]"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="subject"
            className="text-xs font-medium text-gray-600 font-Outfit"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            value={newPeriod.subject}
            onChange={(e) =>
              setNewPeriod({ ...newPeriod, subject: e.target.value })
            }
            className="border border-[#DAE0E6] p-1.5 font-Outfit font-normal text-[#272D37] text-sm rounded-[5px]"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="duration"
            className="text-xs font-medium text-gray-600 font-Outfit"
          >
            Duration (min)
          </label>
          <input
            type="number"
            id="duration"
            value={newPeriod.ends}
            onChange={(e) =>
              setNewPeriod({ ...newPeriod, ends: e.target.value })
            }
            className="border border-[#DAE0E6] p-1.5 font-Outfit font-normal text-[#272D37] text-sm rounded-[5px]"
          />
        </div>
        <button
          onClick={addPeriod}
          className="p-2 rounded-md bg-[#0530A1] hover:bg-blue-600 text-white flex items-center justify-center space-x-2 mt-5 font-Outfit font-medium text-sm"
          //   className=" mt-3"
        >
          <img src={plus} alt="" />
          <p className=" text-white">Add</p>
        </button>
      </div>
    </div>
  );
};

export default Day;
