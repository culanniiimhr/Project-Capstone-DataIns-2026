import { useEffect, useRef } from "react";
import { embedDashboard } from "@superset-ui/embedded-sdk";

interface SupersetEmbedDefaultProps {
  dashboardId: string;
  contentClassName?: string;
}

const SupersetEmbedDefault = ({dashboardId, contentClassName = "w-full h-full",}: SupersetEmbedDefaultProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const embed = async () => {
      if (!containerRef.current) return;

      containerRef.current.innerHTML = "";

      try {
        await embedDashboard({
          id: dashboardId,
          supersetDomain: "http://localhost:8088",
          mountPoint: containerRef.current,

          fetchGuestToken: async () => {
            const response = await fetch(
              `http://localhost:8000/api/v1/superset/guest-token?dashboard_id=${dashboardId}`
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

    embed();
  }, [dashboardId]);

  return (
    <div className="w-full h-full overflow-hidden rounded-[16px] bg-white">
      <div
        ref={containerRef}
        className={contentClassName}
      />
    </div>
  );
};

export default SupersetEmbedDefault;