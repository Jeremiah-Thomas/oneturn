import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addAffliction, deleteMonster } from "../slices/monstersSlice";
import { ReactComponent as Add } from "../add.svg";
import { ReactComponent as Delete } from "../delete.svg";
import { styled } from "styled-components";
import AfflictionList from "./AfflictionList";

const Mon = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;s
width: 75%;
height: 25%;
border-radius: 0.5rem;
background-color: #844eff;
padding: 1rem;

button {
    all: unset;
    border-radius: 0.5rem;
    background-color: #5C37B3;
    padding: 0.25rem 0.35rem;
  }

`;

const Form = styled.form`
  display: flex;
  gap: 0.25rem;

  select {
    all: unset;
    border-radius: 0.5rem;
    background-color: #5c37b3;
    text-align: center;
    padding: 0.25rem 0.25rem;
  }
`;

const afflictionData = require("../afflictionData.json");

const Monster = (props) => {
  const dispatch = useDispatch();
  const [newAffliction, setNewAffliction] = useState("placeholder");
  const addNewAffliction = async (e) => {
    e.preventDefault();
    dispatch(
      addAffliction({
        mon_id: props.monster._id,
        new_affliction: [
          ...props.monster.afflictions,
          afflictionData.filter((affliction) => {
            return affliction.name === newAffliction;
          })[0],
        ],
      })
    );
    setNewAffliction("placeholder");
  };

  const onDelete = (e) => {
    e.preventDefault();
    dispatch(deleteMonster(props.monster._id));
  };

  const onChange = (e) => {
    setNewAffliction(e.target.value);
  };

  return (
    <Mon checkDoom={props.checkDoom}>
      <button onClick={onDelete}>
        <Delete width="15" height="15" />
      </button>
      <h2>{`Monster ${props.monName}`}</h2>
      <Form>
        <select value={newAffliction} onChange={onChange}>
          <option value="placeholder" disabled hidden>
            --Select--
          </option>
          {afflictionData.map((affliction) => {
            return (
              <option key={affliction.name} name={affliction.name}>
                {affliction.name}
              </option>
            );
          })}
        </select>
        <button
          onClick={addNewAffliction}
          disabled={newAffliction === "placeholder" ? true : false}
        >
          <Add width="15" height="15" />
        </button>
      </Form>
      <AfflictionList monster={props.monster} />
    </Mon>
  );
};

export default Monster;
