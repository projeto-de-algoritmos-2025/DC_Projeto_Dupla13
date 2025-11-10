export const airQualitySamples = Array.from({ length: Math.floor(Math.random()*(20 - 5 + 1)) }, (_, index) => {
  let randomValue = Math.floor(Math.random() * 180) + 5; 

  return {
    timestamp: `${String(index).padStart(2, "0")}:00`,
    value: randomValue,
  };
});
