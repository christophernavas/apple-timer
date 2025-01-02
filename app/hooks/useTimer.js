import { useEffect } from "react";
import useTimerStore from "../store/timerStore"; // Assurez-vous d'importer le store

const useTimer = (timer) => {
  const removeTimer = useTimerStore((store) => store.removeTimer);
  const updateTimerField = useTimerStore((store) => store.updateTimerField); // Récupération de la fonction updateTimerField

  useEffect(() => {
    if (!timer.isRunning || timer.timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      updateTimerField(timer.id, { timeLeft: timer.timeLeft - 1 }); // Mise à jour de timeLeft
    }, 1000); // Utilisez 1000 ms pour une mise à jour toutes les secondes

    return () => clearInterval(intervalId); // Nettoyage de l'intervalle
  }, [timer.isRunning, timer.id, timer.timeLeft, updateTimerField]);

  const endTime = new Date(timer.endAt);
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Paris",
  };
  const formattedTime = endTime.toLocaleTimeString("fr-FR", options);

  const formattedLeftTime = new Date(timer.timeLeft * 1000)
    .toISOString()
    .substr(11, 8); // Mise à jour pour obtenir le format HH:MM:SS

  // Calcul de la durée totale en heures, minutes et secondes
  const totalSeconds = Math.floor(timer.duration / 1000);
  const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const secs = String(totalSeconds % 60).padStart(2, "0");

  return { removeTimer, formattedTime, formattedLeftTime, hrs, mins, secs };
};

export default useTimer;
