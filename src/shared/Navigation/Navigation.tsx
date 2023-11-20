import React from "react";
import NavigationItem from "./NavigationItem";
import { NAVIGATION_DEMO_2 } from "@/data/navigation";

/**
 * 네비게이션 중앙에 있는 메뉴들을 렌더링합니다.
 */
function Navigation() {
  return (
    <ul className="break-keep nc-Navigation flex items-center">
      {NAVIGATION_DEMO_2.map((item) => (
        <NavigationItem key={item.id} menuItem={item} />
      ))}
    </ul>
  );
}

export default Navigation;
