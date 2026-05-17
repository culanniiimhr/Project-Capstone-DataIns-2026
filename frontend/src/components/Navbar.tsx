import { FaRegBell } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";

type NavbarProps = {
  title: string;
  roleName?: string;
  rolePosition?: string;
  showFilters?: boolean;
};

const Navbar = ({
  title,
  roleName = "Pimpinan",
  rolePosition = "Rektor",
  showFilters = true,
}: NavbarProps) => {
  return (
    <header className="flex h-[96px] items-start justify-between px-[17px] pt-[22px]">
      <h1 className="text-[24px] font-semibold leading-none text-[#0B3478]">
        {title}
      </h1>

      <div className="flex items-start gap-[10px]">
        {showFilters && (
          <>
            <div className="w-[255px]">
              <div className="mb-[6px] text-[16px] font-medium leading-[18px] text-[#111827]">
                Tahun Akademik
              </div>
              <div className="flex h-[43px] items-center justify-between rounded-[8px] bg-white px-[14px] text-[14px] font-medium text-[#C5CBD5]">
                <span>Pilih tahun akademik</span>
                <span className="text-[20px]">⌄</span>
              </div>
            </div>

            <div className="w-[207px]">
              <div className="mb-[6px] text-[16px] font-medium leading-[18px] text-[#111827]">
                Semester
              </div>
              <div className="flex h-[43px] items-center justify-between rounded-[8px] bg-white px-[14px] text-[14px] font-medium text-[#C5CBD5]">
                <span>Pilih semester</span>
                <span className="text-[20px]">⌄</span>
              </div>
            </div>
          </>
        )}

        <div className="flex items-center gap-[15px] pt-[27px]">
          <FaRegBell className="h-5 w-5 text-[#111827]" />
          <FaRegCircleUser className="h-6 w-6 text-[#155EEF]" />

          <div className="w-[74px] text-[12px] font-medium leading-[14px] text-[#111827]">
            <div>{roleName}</div>
            <div className="font-semibold text-[#0B3478]">{rolePosition}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
