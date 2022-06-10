import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Text } from "@geist-ui/core";
import {
  FiUsers,
  FiList,
  FiSettings,
  FiFile,
  FiTrello,
  FiPackage,
} from "react-icons/fi";

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  padding-right: 1rem;
  border-right: 1px solid #eee;
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #6c757d;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  margin-bottom: 8px;
  font-size: 15px;

  &:hover {
    background-color: #ebeffd;
    color: #2b5bfc;
  }
`;

const NavSection = styled.div`
  font-size: 0.7rem;
  margin-top: 0.8rem;
  color: #2b5bfc !important;
  margin-bottom: 0.5rem;
  position: relative;
`;

const ops = {
  Inicio: [
    {
      text: "General",
      path: "/",
      icon: FiTrello,
    },
  ],
  Usuarios: [
    {
      text: "Usuarios",
      path: "users",
      icon: FiUsers,
    },
    {
      text: "Roles",
      path: "roles",
      icon: FiList,
    },
  ],

  Administración: [
    {
      text: "Gestión",
      path: "management",
      icon: FiSettings,
    },
    {
      text: "Respaldo",
      path: "backup",
      icon: FiFile,
    },
  ],
};

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
        {Object.keys(ops).map((section) => {
          return (
            <div key={section}>
              <NavSection>
                <Text className="d-inline-block m-0 text-uppercase">
                  {section}
                </Text>
              </NavSection>
              {ops[section].map(({ text, icon: Icon, path }) => (
                <NavItem to={path} key={text}>
                  <Icon className="d-block me-2" />
                  <Text className="m-0">{text}</Text>
                </NavItem>
              ))}
            </div>
          );
        })}
      </Nav>
    </div>
  );
}
