"use client";

import { useState } from "react";
import useTimerStore from "./store/timerStore";
import { X, Play, Pause, Bell } from "lucide-react";
import useTimerForm from "./hooks/useTimerForm";
import useTimer from "./hooks/useTimer";

const TimerForm = () => {
  const { timerForm, handleSetForm, formatAndAddTimer } = useTimerForm();

  return (
    <div className="mx-auto flex w-fit flex-col gap-4">
      <div className="flex items-center justify-between ">
        <p className="flex-1 text-center text-neutral-content">hr</p>
        <p className="flex-1 text-center text-neutral-content">min</p>
        <p className="flex-1 text-center text-neutral-content">sec</p>
      </div>
      <div className="flex items-center rounded-md border border-neutral bg-base-200 p-2">
        <input
          className="h-24 w-20 rounded-md bg-base-200 text-center text-5xl focus:bg-accent focus:text-accent-content focus:outline-none md:h-20 md:w-32 md:text-6xl lg:h-32 lg:w-40 lg:text-8xl"
          name="hrs"
          onChange={handleSetForm}
          maxLength={2} // Limite à 2 caractères
          value={timerForm.hrs}
          pattern="\d*" // N'autorise que les chiffres
        />
        <p className="text-lg">:</p>
        <input
          className="h-24 w-20 rounded-md bg-base-200 text-center text-5xl focus:bg-accent focus:text-accent-content focus:outline-none md:h-20 md:w-32 md:text-6xl lg:h-32 lg:w-40 lg:text-8xl"
          name="mins"
          onChange={handleSetForm}
          maxLength={2} // Limite à 2 caractères
          value={timerForm.mins}
          pattern="\d*" // N'autorise que les chiffres
        />
        <p className="text-lg">:</p>
        <input
          className="h-24 w-20 rounded-md bg-base-200 text-center text-5xl focus:bg-accent focus:text-accent-content focus:outline-none md:h-20 md:w-32 md:text-6xl lg:h-32 lg:w-40 lg:text-8xl"
          name="secs"
          onChange={handleSetForm}
          maxLength={2} // Limite à 2 caractères
          value={timerForm.secs}
          pattern="\d*" // N'autorise que les chiffres
        />
      </div>
      <div className="flex justify-end gap-4">
        <button className="btn btn-success" onClick={formatAndAddTimer}>
          Add Timer
        </button>
      </div>
    </div>
  );
};

const Timer = ({ timer }) => {
  const { removeTimer, formattedTime, hrs, mins, secs, formattedLeftTime } =
    useTimer(timer);
  const updateTimerField = useTimerStore((store) => store.updateTimerField);
  console.log(timer);

  return (
    <div className="card flex rounded-3xl bg-base-200 p-5 w-full h-full aspect-square">
      <div className="flex m-auto items-center flex-col">
        <div className="flex items-center gap-2">
          <Bell size={13} /> {formattedTime}
        </div>
        <div className="text-3xl">{formattedLeftTime}</div>
        <p>
          {`${hrs !== "00" ? `${hrs} h ` : ""}
          ${mins !== "00" ? `${mins} min ` : ""}
          ${secs !== "00" ? `${secs} s` : ""}`.trim()}
        </p>
      </div>
      <div className="mt-auto flex justify-between">
        <button
          className="btn btn-sm btn-base-300 btn-circle"
          onClick={() => removeTimer(timer.id)}
        >
          <X size={20} />
        </button>
        {timer.isRunning ? (
          <button
            onClick={() => updateTimerField(timer.id, { isRunning: false })}
            className="btn btn-sm btn-primary btn-circle"
          >
            <Pause size={20} />
          </button>
        ) : (
          <button
            onClick={() => updateTimerField(timer.id, { isRunning: true })}
            className="btn btn-sm btn-success btn-circle"
          >
            <Play size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default function Home() {
  const timers = useTimerStore((store) => store.timers);

  return (
    <div className="mx-auto flex min-h-full max-w-3xl flex-col gap-8 p-4">
      <h1 className="mx-auto w-fit rounded-md bg-base-200 px-4 py-2 text-lg font-bold text-base-content">
        Timer
      </h1>
      <TimerForm />
      {timers ? (
        <div className="grid grid-cols-3 gap-6">
          {timers.map((timer) => (
            <Timer key={timer.id} timer={timer} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
