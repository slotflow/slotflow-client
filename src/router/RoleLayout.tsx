// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";
// import { Role } from "@/utils/interface/enums";
// import { RootState } from "@/utils/redux/appStore";
// import UserMainPage from "@/pages/user/UserMainPage";
// import AdminMainPage from "@/pages/admin/AdminMainPage";
// import ProviderMainPage from "@/pages/provider/ProviderMainPage";

// export const RoleLayout = () => {

//   const { authUser } = useSelector((state: RootState) => state.auth);

//   switch (authUser?.role) {
//     case Role.USER:
//       return <UserMainPage />;
//     case Role.PROVIDER:
//       return <ProviderMainPage />;
//     case Role.ADMIN:
//       return <AdminMainPage />;
//     default:
//       return <Navigate to="/login" replace />;
//   }

// };
