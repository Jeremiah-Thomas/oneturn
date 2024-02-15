import React from "react";
import { styled } from "styled-components";
import Affliction from "./Affliction";

const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-height: 10;
  overflow-y: scroll;
`;

const AfflictionList = (props) => {
  return (
    <>
      {props.monster.afflictions ? (
        <List>
          {[...props.monster.afflictions]
            .sort((a, b) => {
              return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
            })
            .map((affliction) => {
              if (affliction) {
                return (
                  <Affliction
                    key={affliction._id}
                    monster={props.monster}
                    affliction={[affliction]}
                  />
                );
              } else {
                return "";
              }
            })}
        </List>
      ) : (
        ""
      )}
    </>
  );
};

export default AfflictionList;
