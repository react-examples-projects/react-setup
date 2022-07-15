import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Text } from "@geist-ui/core";

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #6c757d;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  margin-bottom: 8px;
  font-size: 15px;

  &:hover,
  &.active {
    background-color: #ebeffd;
    color: #2b5bfc;
  }

  &.active {
    position: relative;
    overflow: hidden;
    &::after {
      content: "";
      display: block;
      position: absolute;
      right: 0;
      top: 0;
      width: 2px;
      height: 100%;
      background: #2b5bfc;
    }
  }
`;

export default function SideMenuItem({ path, text, icon: Icon }) {
  return (
    <NavItem
      to={path}
      key={text}
      className={({ isActive }) => (isActive ? "active" : null)}
    >
      <Icon className="d-block me-2" />
      <Text className="m-0">{text}</Text>
    </NavItem>
  );
}
