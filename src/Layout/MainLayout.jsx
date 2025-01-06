import { Outlet } from "react-router";
import VerticalLayout from "../components/VerticalLayout";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentRole } from "../redux/features/auth/authSlice";
const MainLayout = () => {
  const current = useAppSelector(selectCurrentRole);
  console.log(current);
  return (
    <div className="max-h-screen">
        <div className="w-full h-full">
      </div>
    </div>
  );
};

export default MainLayout;
