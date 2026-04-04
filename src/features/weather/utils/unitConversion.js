export const formatTemp = (celsiusValue, isCelsius) => {
  if (celsiusValue === undefined || celsiusValue === null) return "--";
  
  if (isCelsius) {
    return Math.round(celsiusValue);
  }
  
  // Convert to Fahrenheit
  return Math.round((celsiusValue * 9/5) + 32);
};