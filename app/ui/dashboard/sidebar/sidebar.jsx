"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BiHomeCircle } from "react-icons/bi";
import { LiaShippingFastSolid } from "react-icons/lia";
import { RiRouteFill } from "react-icons/ri";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdOutlineHelpOutline } from "react-icons/md";
import { LuUsers2 } from "react-icons/lu";
import { GrAnalytics } from "react-icons/gr";
import { GiMeal } from "react-icons/gi";
import { BsCart4 } from "react-icons/bs";
import { BiSolidOffer } from "react-icons/bi";
import { MdDeliveryDining } from "react-icons/md";
import { LuShip } from "react-icons/lu";
import yaadlogo from "./../../../../public/images/logoColor.png";

export default function Sidebar() {
  const pathname = usePathname();
  const routes = [
    {
      title: "Overview",
      list: [
        {
          label: "Dashboard",
          path: "/dashboard/",
          icon: BiHomeCircle,
        },
        {
          label: "Restaurant",
          path: "/dashboard/restaurants/",
          icon: GiMeal,
        },
      ],
    },
    {
      title: "Meals",
      list: [
        {
          label: "Menu",
          path: "/dashboard/meals/",
          icon: IoFastFoodOutline,
        },
        {
          label: "Orders",
          path: "/dashboard/orders/",
          icon: BsCart4,
        },
        {
          label: "Riders",
          path: "/dashboard/riders/",
          icon: MdDeliveryDining,
        },
        {
          label: "Tracking",
          path: "/dashboard/tracking/",
          icon: RiRouteFill,
        },
      ]
    },
    {
      title: "Freight",
      list: [
        {
          label: "Freight",
          path: "/dashboard/freight/",
          icon: LuShip,
        },
      ]
    },
    {
      title: "Courier",
      list: [
        {
          label: "Courier",
          path: "/dashboard/courier/",
          icon: LiaShippingFastSolid,
        },
      ]
    },
    {
      title: "Other",
      list: [
        {
          label: "Users",
          path: "/dashboard/users/",
          icon: LuUsers2,
        },
        {
          label: "Promotions",
          path: "/dashboard/promotions/",
          icon: BiSolidOffer,
        },
        // {
        //   label: "Support",
        //   path: "/support/",
        //   icon: MdOutlineHelpOutline,
        // },
      ]
    }
  ];

  return (
    <div className="bg-[#1B2537] h-full overflow-auto">
      <div>
        <Image
          src={yaadlogo}
          quality={10}
          priority={true}
          width={400}
          alt="Yaad-plug"
          className="pt-4"
        />
      </div>
      <div className="mt-8">
        <ul>
          {routes.map((route) => {
            return (
              <div key={route.title}>
                <li className="text-xs px-4 font-light">{route.title}</li>
                {
                  route.list.map((item) => {
                    return (
                      <Link key={item.label} href={item.path}>
                        <li
                          className={`text-slate-200 ${pathname == item.path? 'active bg-slate-700 mx-3 rounded' : ''} text-xs font-semibold flex gap-3 items-center py-2 my-4 px-6`}
                        >
                          <item.icon size={15} />
                          <span className="text-[12px]">{item.label}</span>
                        </li>
                      </Link>
                    );
                  })
                }
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
