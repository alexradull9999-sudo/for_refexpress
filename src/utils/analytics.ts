/**
 * Utility for tracking Yandex Metrika goals
 */
export const METRIKA_COUNTER_ID = 112146503;

export const trackGoal = (goalName: string, data?: any) => {
  // 1. Console Log with styled styling
  console.log(
    `%c🎯 [Yandex.Metrika Goal] %c${goalName}`,
    "color: #f25a24; font-weight: bold; font-family: monospace; font-size: 12px;",
    "color: #ffffff; background-color: #1a2a4a; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
    data || ""
  );

  // 2. Standard Yandex Metrika call
  if (typeof window !== "undefined") {
    const ymFunc = (window as any).ym;
    const metrikaId = (window as any)._ym_counter_id || METRIKA_COUNTER_ID;

    if (typeof ymFunc === "function") {
      try {
        ymFunc(metrikaId, "reachGoal", goalName, data);
      } catch (err) {
        console.error(`Failed to trigger ym reachGoal "${goalName}":`, err);
      }
    }
  }

  // 3. Dispatch brief custom event for our visual Toast notifications
  if (typeof window !== "undefined") {
    const event = new CustomEvent("metrika_goal_triggered", {
      detail: { goalName, timestamp: new Date().toLocaleTimeString(), data }
    });
    window.dispatchEvent(event);
  }
};

/**
 * Hook or helper to grab UTM tags from the current URL and store them
 */
export const getUtmParams = (): Record<string, string> => {
  if (typeof window === "undefined") return { utm_source: "", utm_medium: "", utm_campaign: "" };
  
  const searchParams = new URLSearchParams(window.location.search);
  const utm_source = searchParams.get("utm_source") || "";
  const utm_medium = searchParams.get("utm_medium") || "";
  const utm_campaign = searchParams.get("utm_campaign") || "";

  // Also read from localstorage in case of page refresh
  if (utm_source || utm_medium || utm_campaign) {
    const params = { utm_source, utm_medium, utm_campaign };
    localStorage.setItem("ref_express_utm", JSON.stringify(params));
    return params;
  }

  try {
    const saved = localStorage.getItem("ref_express_utm");
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    // Ignore error
  }

  return { utm_source: "", utm_medium: "", utm_campaign: "" };
};
