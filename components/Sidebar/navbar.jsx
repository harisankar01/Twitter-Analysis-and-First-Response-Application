import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useMemo } from "react";
import {
  ArticleIcon,
  CollapsIcon,
  HomeIcon,
  LogoIcon,
  LogoutIcon,
  UsersIcon,
  VideosIcon,
} from "./icons";
import {GiHospitalCross} from "react-icons/gi"
import {FaTrafficLight} from "react-icons/fa"
import {GiIndianPalace} from "react-icons/gi"
import {GiPlagueDoctorProfile} from "react-icons/gi"
import {MdOutlinePersonSearch} from "react-icons/md"
import {GoIssueOpened} from "react-icons/go"

const Sidebar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const router =useRouter()
  const user_name=router.query.user
  const [isCollapsible, setIsCollapsible] = useState(false);
const menuItems = [
  { id: 1, label: "Home", icon: HomeIcon, link: `/${user_name}` },
  { id: 2, label: "Search", icon: MdOutlinePersonSearch, link: `https://twitter--sentiment--analysiss.herokuapp.com/` },
  { id: 3, label: "Alerts", icon: FaTrafficLight, link: `/${user_name}/Alerts` },
  { id: 4, label: "Complaints", icon: GoIssueOpened, link: `/${user_name}/Complaints` },
  {id:5,label:"Digital Profiles",icon:GiPlagueDoctorProfile,link:`${user_name}/digital_profile`},
  {id:6,label:"Geotagging Hotspots",icon:GiIndianPalace,link:`/${user_name}/geo`}
];

  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === `/${user_name}`),
    [`/${user_name}`]
  );

  const wrapperClasses = classNames(
    "h-screen px-4 pt-8 pb-4 bg-light flex justify-between flex-col",
    {
      ["w-80"]: !toggleCollapse,
      ["w-20"]: toggleCollapse,
    }
  );

  const collapseIconClasses = classNames(
    "p-4 rounded bg-light-lighter absolute right-0",
    {
      "rotate-180": toggleCollapse,
    }
  );

  const getNavItemClasses = (menu) => {
    return classNames(
      "flex items-center cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap",
      {
        ["bg-light-lighter"]: activeMenu.id === menu.id,
      }
    );
  };

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between relative">
          <div className="flex items-center pl-1 gap-4">
            <LogoIcon />
            <span
              className={classNames("mt-2 text-lg font-medium text-text", {
                hidden: toggleCollapse,
              })}
            >
              News alert/flash
            </span>
          </div>
          {isCollapsible && (
            <button
              className={collapseIconClasses}
              onClick={handleSidebarToggle}
            >
              <CollapsIcon />
            </button>
          )}
        </div>

        <div className="flex flex-col items-start mt-24">
          {menuItems.map(({ icon: Icon, ...menu }) => {
            const classes = getNavItemClasses(menu);
            return (
              <div className={classes} key={menu.id}>
                <Link href={menu.link}>
                  <a className="flex py-4 px-3 items-center w-full h-full">
                    <div style={{ width: "2.5rem" }}>
                      <Icon />
                    </div>
                    {!toggleCollapse && (
                      <span
                        className={classNames(
                          "text-md font-medium text-text-light"
                        )}
                      >
                        {menu.label}
                      </span>
                    )}
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div className={`${getNavItemClasses({})} px-3 py-4`} onClick={()=>{router.push("/")}}>
        <div style={{ width: "2.5rem" }}>
          <LogoutIcon />
        </div>
        {!toggleCollapse && (
          <span className={classNames("text-md font-medium text-text-light")}>
            Logout
          </span>
        )}
      </div>
    </div>
  );
};

export default Sidebar;