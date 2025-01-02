import { useState } from "react";
import useTimerStore from "../store/timerStore";

const useTimerForm = () => {
  const [timerForm, setTimerForm] = useState({
    hrs: "00",
    mins: "00",
    secs: "00",
  });

  const handleSetForm = (e) => {
    const value = e.target.value;
    const type = e.target.name;
    setTimerForm((current) => ({ ...current, [type]: value }));
  };

  const addTimer = useTimerStore((store) => store.addTimer);

  const formatAndAddTimer = () => {
    const { hrs, mins, secs } = timerForm;
    const totalSeconds =
      parseInt(hrs) * 3600 + parseInt(mins) * 60 + parseInt(secs);
    const newTimer = {
      id: Date.now().toString(),
      duration: totalSeconds * 1000,
      timeLeft: totalSeconds,
      endAt: Date.now() + totalSeconds * 1000,
      isRunning: true,
    };
    addTimer(newTimer);
  };

  return { timerForm, handleSetForm, formatAndAddTimer };
};

export default useTimerForm;
