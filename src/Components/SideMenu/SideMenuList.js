import sections from "components/SideMenu/sections";
import SideMenuSection from "./SideMenuSection";
import SideMenuItem from "./SideMenuItem";
import useCurrentUser from "hooks/users/useCurrentUser";

export default function SideMenuList() {
  const { user } = useCurrentUser();

  const SECTIONS_KEYS = Object.keys(sections).filter((section) => {
    if (!sections[section].hasOwnProperty("rank")) return true;
    return user?.rank === sections[section].rank;
  });

  return SECTIONS_KEYS.map((section) => {
    const sectionOptions = sections[section];

    return (
      <SideMenuSection name={section} key={section}>
        {sectionOptions.options
          ? sectionOptions.options.map((props) => (
              <SideMenuItem {...props} key={props.path} />
            ))
          : sectionOptions.map((props) => (
              <SideMenuItem {...props} key={props.path} />
            ))}
      </SideMenuSection>
    );
  });
}
