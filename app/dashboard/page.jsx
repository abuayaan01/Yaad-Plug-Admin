"use client"
import Card from "../ui/dashboard/card/card"
import ActivePromotions from "../ui/dashboard/active-promotions/active-promotions";
import RecentOrders from "../ui/dashboard/recent-orders/recent-orders";
import CriticalAlerts from "../ui/dashboard/critical-alerts/critical-alerts";
import { GiHotMeal } from "react-icons/gi";
import { LuUserPlus2 } from "react-icons/lu";
import { MdOutlinePayment } from "react-icons/md";
import { BsStack } from "react-icons/bs";
import { FcAreaChart } from "react-icons/fc";
import { FcBarChart } from "react-icons/fc";
import { FcLineChart } from "react-icons/fc";
import { FcDoughnutChart } from "react-icons/fc";

const Dashboard = () => {
  return (
    <div>
      <div className="card-container flex gap-4">
        <Card icon={<GiHotMeal size={22} color={"#ff6287"} />} data={46} title={"Orders"} chart={<FcAreaChart size={50} />} />
        <Card icon={<LuUserPlus2 size={22} color={"#ff6287"} />} data={"+146"} title={"New Clients"} chart={<FcBarChart size={50} />} />
        <Card icon={<MdOutlinePayment size={22} color={"#ff6287"} />} data={"316,233"} title={"Sales Obtained"} chart={<FcLineChart size={50} />} />
        <Card icon={<BsStack size={20} color={"#ff6287"} />} data={"613,022"} title={"Traffic"} chart={<FcDoughnutChart size={50} />} />
      </div>
      <div className="my-4 flex gap-4 text-xs">
        <ActivePromotions />
        <CriticalAlerts />
      </div>
      <div className="my-4 flex gap-4 text-xs">
        <RecentOrders />
      </div>
    </div>
  )
}

export default Dashboard