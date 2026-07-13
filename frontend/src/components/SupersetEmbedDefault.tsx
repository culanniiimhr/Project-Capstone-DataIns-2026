import { useEffect, useRef } from "react";
import { embedDashboard } from "@superset-ui/embedded-sdk";
import { useFilter } from "../context/FilterContext";

interface SupersetEmbedDefaultProps {
  dashboardId: string;
  contentClassName?: string;
}

const SupersetEmbedDefault = ({dashboardId, contentClassName = "w-full h-full",}: SupersetEmbedDefaultProps) => {
  const { tahunAkademik, semester } = useFilter();
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
              `${backendUrl}/superset/guest-token?dashboard_id=${dashboardId}&tahunAkademik=${encodeURIComponent(tahunAkademik)}&semester=${encodeURIComponent(semester)}`
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
              visible: false,
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
  }, [dashboardId, tahunAkademik, semester]);

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
