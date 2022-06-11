import SideMenu from "components/SideMenu";
import styled from "styled-components";

const Grid = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const Item = styled.div`
  flex: 0 1 ${(props) => (props.width ? props.width : "100%")};
  padding: 10px;
`;

export default function Layout({ children }) {
  const width = "200px";
  return (
    <div className="container mt-5">
      <Grid>
        <Item width={width}>
          <SideMenu />
        </Item>

        <Item width={`calc(100% - ${width})`}>{children}</Item>
      </Grid>
    </div>
  );
}
