import React from "react";
import Monster from "./Monster";
import { styled } from "styled-components";

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  max-width: 90%;
  margin-inline: auto;
  padding-block: 3rem;
  overflow-y: scroll;
`;

const MonsterList = (props) => {
  const { monsters } = props;

  return monsters ? (
    <List>
      {[...monsters]
        .sort((a, b) => {
          return a._id < b._id ? -1 : a._id > b._id ? 1 : 0;
        })
        .map((monster, idx) => {
          return (
            <Monster key={monster._id} monster={monster} monName={idx + 1} />
          );
        })}
    </List>
  ) : (
    ""
  );
};

export default MonsterList;
