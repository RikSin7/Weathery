export const formatTime = (isoString) => {
  if (!isoString) return "--:--";
  return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// get today's date in "YYYY-MM-DD" format
export const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

// get date 14 days from now in "YYYY-MM-DD" format
export const getFutureDate = (days = 14) => {
  return new Date(Date.now() + days * 86400000).toISOString().split("T")[0];
};

// get date 3 months from now in "YYYY-MM-DD" format
export const getThreeMonthsFromNow = () => {
  return new Date(Date.now() + 3 * 30 * 86400000).toISOString().split("T")[0];
};

