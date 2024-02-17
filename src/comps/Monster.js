import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAffliction,
  deleteMonster,
  addStack,
} from "../slices/monstersSlice";
import { reduceMana } from "../slices/manaSlice";
import { ReactComponent as Add } from "../add.svg";
import { ReactComponent as Trash } from "../trash.svg";
import { styled } from "styled-components";
import AfflictionList from "./AfflictionList";

const Mon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 32rem;
  border-radius: 1rem;
  background-color: #844eff;
  padding: 1rem;

  section {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    button {
      all: unset;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 1rem;
      background-color: #5c37b3;
      padding: 0.25rem;
      margin: 0;
    }
  }

  button {
    all: unset;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 1rem;
    background-color: #5c37b3;
    padding: 0.25rem;
    margin: 0;
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

  const mana = useSelector((state) => state.mana);

  const addNewAffliction = async (e) => {
    e.preventDefault();

    const afflictionToAdd = afflictionData.filter((affliction) => {
      return affliction.name === newAffliction;
    })[0];

    if (mana.current - afflictionToAdd.mana_cost >= 0) {
      dispatch(reduceMana(afflictionToAdd.mana_cost));
      if (
        props.monster.afflictions.filter((affliction) => {
          return affliction.name === newAffliction;
        }).length < 1
      ) {
        dispatch(
          addAffliction({
            mon_id: props.monster._id,
            new_affliction: [...props.monster.afflictions, afflictionToAdd],
          })
        );
      } else {
        dispatch(
          addStack({ monster: props.monster, affliction: newAffliction })
        );
      }
    } else {
      alert("Not enough mana");
    }
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
      <section>
        <h2>{`Monster ${props.monName}`}</h2>
        <button onClick={onDelete}>
          <Trash width="28" height="28" />
        </button>
      </section>
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
