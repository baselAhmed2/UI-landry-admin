import { createBrowserRouter } from "react-router";
import { LaundryAdminLayout } from "./components/layout/LaundryAdminLayout";
import { LaundryDashboard } from "./pages/laundry-admin/LaundryDashboard";
import { Orders } from "./pages/Orders";
import { OrderDetailsNew } from "./pages/OrderDetailsNew";
import { Services } from "./pages/Services";
import { Availability } from "./pages/Availability";
import { Payments } from "./pages/Payments";
import { Notifications } from "./pages/Notifications";
import { Settings } from "./pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LaundryAdminLayout,
    children: [
      { index: true, Component: LaundryDashboard },
      { path: "orders", Component: Orders },
      { path: "orders/:id", Component: OrderDetailsNew },
      { path: "services", Component: Services },
      { path: "availability", Component: Availability },
      { path: "payments", Component: Payments },
      { path: "notifications", Component: Notifications },
      { path: "settings", Component: Settings },
    ],
  },
]);
