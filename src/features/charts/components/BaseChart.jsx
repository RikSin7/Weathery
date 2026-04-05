import ReactECharts from "echarts-for-react";

export function BaseChart({ option, height = "350px" }) {
  // inject the Zoom & Pan settings into every chart automatically
  const defaultOption = {
    textStyle: {
      color: "var(--chart-text)", // Global basic text color
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "var(--chart-tooltip-bg)",
      borderColor: "var(--chart-tooltip-border)",
      textStyle: { color: "var(--chart-tooltip-text)" },
    },
    grid: {
      top: 40,
      right: 20,
      bottom: 80, // Increased space to avoid overlap
      left: 40,
      containLabel: true,
    },
    //allow zoom
    dataZoom: [
      {
        type: "inside", // Allows pinching on mobile / scrolling on desktop
        start: 0,
        end: 50, // Show first 50% of data by default
      },
      {
        type: "slider", // Shows the horizontal scrollbar at the bottom
        bottom: 0, // Sit nicely beneath legend
        height: 25,
        textStyle: {
          color: "var(--chart-text)", // Match elegant styling
        },
      },
    ],
    ...option, // Merge in the specific chart data (Temp, Wind, etc.)
  };

  return (
    <div className="w-full bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-700">
      <ReactECharts
        option={defaultOption}
        style={{ height, width: "100%" }}
        notMerge={true}
        lazyUpdate={true}
      />
    </div>
  );
}