import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

type LayoutProps = {
  children: React.ReactNode;
  title: string;
  active: "Dashboard Utama" | "Pimpinan" | "Akademik" | "Monitoring IKU" | "Manajemen Sistem";
  roleName?: string;
  rolePosition?: string;
  showFilters?: boolean;
};

const Layout = ({
  children,
  title,
  active,
  roleName = "Pimpinan",
  rolePosition = "Rektor",
  showFilters = true,
}: LayoutProps) => {
  return (
    <div className="min-h-screen bg-[#E7EFFE] font-['SF_Pro',Inter,Arial,sans-serif]">
      <Sidebar active={active} />

      <main className="min-h-screen ml-[240px]">
        <Navbar
          title={title}
          roleName={roleName}
          rolePosition={rolePosition}
          showFilters={showFilters}
        />

        <div className="px-[16px] pb-[28px]">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
