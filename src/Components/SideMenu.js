import React from "react";
import styled from "styled-components";
import { Text } from "@geist-ui/core";
import { FiUsers, FiList, FiSettings, FiFile, FiPackage } from "react-icons/fi";

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  padding-right: 1rem;
  border-right: 1px solid #eee;
`;

const NavItem = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #6c757d;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  margin-bottom: 8px;

  &:hover {
    background-color: #ebeffd;
    color: #2b5bfc;
  }
`;

const options = [
  {
    text: "Usuarios",
    icon: FiUsers,
  },
  {
    text: "Roles",
    icon: FiList,
  },
  {
    text: "Gestión",
    icon: FiSettings,
  },
  {
    text: "Respaldo",
    icon: FiFile,
  },
];

export default function SideMenu() {
  return (
    <div>
      <Text
        className="d-flex align-items-center m-0 mb-3 fw-bold ms-2"
        style={{ color: "#2b5bfc", fontSize: "2rem" }}
        h4
      >
        <FiPackage className="me-1" />
      </Text>
      <Nav>
        {options.map(({ text, icon: Icon }) => (
          <NavItem>
            <Icon className="d-block me-2" />
            <Text className="m-0">{text}</Text>
          </NavItem>
        ))}
      </Nav>
    </div>
  );
}
