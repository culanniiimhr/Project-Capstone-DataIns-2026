import { useEffect, useRef } from "react";
import { embedDashboard } from "@superset-ui/embedded-sdk";

interface SupersetEmbedProps {
  dashboardId: string;
}

const SupersetEmbed = ({ dashboardId }: SupersetEmbedProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = "";

    embedDashboard({
      id: dashboardId,
      supersetDomain: "http://localhost:8088",

      mountPoint: containerRef.current,

      fetchGuestToken: async () => {
        const response = await fetch(
          "http://localhost:8000/api/v1/superset/guest-token"
        );

        const data = await response.json();

        return data.token;
      },

      dashboardUiConfig: {
        hideTitle: true,
        hideTab: true,
        hideChartControls: true,

        filters: {
          expanded: false,
        },
      },
    });
  }, [dashboardId]);

  return (
    <div
      ref={containerRef}
      className="h-full w-full"
    />
  );
};

export default SupersetEmbed;