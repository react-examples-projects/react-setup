import React from "react";
import styled from "styled-components";
import { Text } from "@geist-ui/core";
import SideMenu from "./SideMenu";

const Grid = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const Item = styled.div`
  flex: 0 1 ${(props) => (props.width ? props.width : "100%")};
  padding: 10px;
`;

export default function App() {
  return (
    <div className="container mt-5">
      <Grid>
        <Item width="200px">
          <SideMenu />
        </Item>

        <Item width="calc(100% - 200px)">
          <Text h4>Home Component</Text>
          <Text p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
            itaque aliquid inventore hic quasi, minima, nam est quibusdam animi
            similique dignissimos voluptatum nostrum nisi, sunt doloribus
            aliquam. Quos, rerum debitis.
          </Text>
        </Item>
      </Grid>
    </div>
  );
}
