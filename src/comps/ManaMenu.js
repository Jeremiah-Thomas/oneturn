import React, { useRef, useEffect } from "react";
import { styled } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  changeMax,
  changeCurrent,
  changeRegen,
  reduceMana,
} from "../slices/manaSlice";

const abilityData = require("../abilityData.json");

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: fit-content;
  border-radius: 1rem;
  background-color: #22202f;
  padding: 0.5rem;
  height: fit-content;
  left: 50%;
  transform: translateX(-50%);
  padding-inline: 0.5rem;
  z-index: 100;
`;

const Form = styled.form`
  display: flex;
  max-width: 100%;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;

  label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  input {
    all: unset;
    background-color: #272537;
    border-radius: 1rem;
    padding: 0.25rem;
    width: 3rem;
    text-align: center;
  }
`;

const Abilities = styled.div`
  display: flex;
  margin-top: 1rem;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  height: 13rem;
  overflow-y: scroll;
`;

const Ability = styled.div`
  width: fit-content;
  height: fit-content;
  border-radius: 1rem;
  background-color: ${(props) => props.bg_color};

  h4 {
    padding: 0.5rem;
    margin: 0;
  }
`;

const ManaMenu = (props) => {
  const manaMenuRef = useRef();
  const mana = useSelector((state) => state.mana);
  const dispatch = useDispatch();

  const checkClickOutside = (e) => {
    if (
      props.manaChecked &&
      manaMenuRef.current &&
      !manaMenuRef.current.contains(e.target)
    ) {
      props.setManaChecked(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", checkClickOutside);

    return () => document.removeEventListener("mousedown", checkClickOutside);
  }, [props.manaChecked]);

  const onChange = (e) => {
    if (e.target.name === "max") {
      dispatch(changeMax(e.target.value));
      dispatch(changeCurrent(e.target.value));
    } else if (e.target.name === "cur") {
      dispatch(changeCurrent(e.target.value));
    } else if (e.target.name === "rnd") {
      dispatch(changeRegen(e.target.value));
    }
  };
  return (
    <Menu ref={manaMenuRef}>
      <Form>
        <label>
          Max
          <input
            name="max"
            type="number"
            value={mana.max}
            onChange={onChange}
          />
        </label>
        <label>
          Cur
          <input
            name="cur"
            type="number"
            value={mana.current}
            onChange={onChange}
          />
        </label>
        <label>
          /Rnd
          <input
            name="rnd"
            type="number"
            value={mana.regen}
            onChange={onChange}
          />
        </label>
      </Form>
      <Abilities>
        {abilityData.map((ability) => {
          return (
            <Ability
              bg_color={ability.color}
              onClick={() => {
                dispatch(reduceMana(ability.mana_cost));
              }}
            >
              <h4>{ability.name}</h4>
            </Ability>
          );
        })}
      </Abilities>
    </Menu>
  );
};

export default ManaMenu;
