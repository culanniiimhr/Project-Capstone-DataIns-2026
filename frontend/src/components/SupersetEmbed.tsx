import { useEffect, useRef } from "react";
import { embedDashboard } from "@superset-ui/embedded-sdk";

interface SupersetEmbedProps {
  dashboardId: string;
}

const SupersetEmbed = ({ dashboardId }: SupersetEmbedProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const embed = async () => {
      if (!containerRef.current) return;

      containerRef.current.innerHTML = "";

      try {
        const backendUrl = process.env.REACT_APP_API_URL || "https://api-eduinsight.windsight.id/api/v1";
        const supersetDomain = process.env.REACT_APP_SUPERSET_URL || "https://dash.varguard.id";

        await embedDashboard({
          id: dashboardId,
          supersetDomain: supersetDomain,
          mountPoint: containerRef.current,

          fetchGuestToken: async () => {
            const response = await fetch(
              `${backendUrl}/superset/guest-token?dashboard_id=${dashboardId}`
            );

            if (!response.ok) {
              const errorText = await response.text();
              throw new Error(`Gagal ambil guest token: ${errorText}`);
            }

            const data = await response.json();

            if (!data.token) {
              throw new Error("Guest token kosong dari backend");
            }

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

        const iframe = containerRef.current.querySelector("iframe");
        if (iframe) {
          iframe.style.width = "100%";
          iframe.style.height = "100%";
          iframe.style.border = "none";
        }
      } catch (error) {
        console.error("Superset embed error:", error);
      }
    };

    setTimeout(() => {
      const iframe = containerRef.current?.querySelector("iframe");
      if (iframe) {
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = "none";
      }
    }, 1000);
    embed();
  }, [dashboardId]);

  return (
    <div className="w-full h-full overflow-hidden rounded-[16px] bg-white">
      <div
        ref={containerRef}
        className="w-[130%] h-[150%] -translate-x-[90px] -translate-y-[170px] scale-[1.08] origin-top-left"
      />
    </div>
  );
};

export default SupersetEmbed;
