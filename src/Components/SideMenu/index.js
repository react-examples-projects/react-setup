import styled from "styled-components";
import useCurrentUser from "hooks/users/useCurrentUser";
import SideMenuList from "components/SideMenu/SideMenuList";
import { Text } from "@geist-ui/core";
import { FiPackage } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  padding-right: 1rem;
  border-right: 1px solid #eee;
`;

const Option = styled.li`
  cursor: pointer;
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

export default function SideMenu() {
  const { logout } = useCurrentUser();

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
        <SideMenuList />
        
        <Option className="mt-5" onClick={logout}>
          <BiLogOut className="d-block me-2" />
          <Text className="m-0">Cerrar sesión</Text>
        </Option>
      </Nav>
    </div>
  );
}
