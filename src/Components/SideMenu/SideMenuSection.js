import styled from "styled-components";
import { createSlug } from "helpers/utils";
import { Text } from "@geist-ui/core";

const NavSection = styled.div`
  font-size: 0.7rem;
  margin-top: 0.8rem;
  color: #2b5bfc !important;
  margin-bottom: 0.5rem;
  position: relative;
`;

export default function SideMenuSection({ name, children }) {
  return (
    <div data-section={createSlug(name)}>
      <NavSection>
        <Text className="d-inline-block m-0 text-uppercase">{name}</Text>
      </NavSection>
      {children}
    </div>
  );
}
