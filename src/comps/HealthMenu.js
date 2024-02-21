import React, { useState, useRef, useEffect } from "react";
import { styled } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  changeMax,
  changeCurrent,
  changeRegen,
  reduceHealth,
  addHealth,
} from "../slices/healthSlice";
import { ReactComponent as Add } from "../add.svg";
import { ReactComponent as Minus } from "../minus.svg";

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: fit-content;
  border-radius: 1rem;
  background-color: #22202f;
  padding: 0.5rem;
  height: fit-content;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding-inline: 0.5rem;
  z-index: 100;

  .backdrop {
    position: absolute;
    width: 100%;
    height: 100%;
  }
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

const ChangeForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-block: 1rem;
  margin-inline: auto;
  input {
    all: unset;
    font-size: 1.5rem;
    background-color: #272537;
    border-radius: 1rem 0 0 1rem;
    padding: 0.3rem;
    width: 3rem;
    height: 3rem;
    text-align: center;
  }

  .buttons {
    text-align: center;
    display: flex;
    background-color: #272537;
    border-radius: 0 1rem 1rem 0;
    padding: 0.3rem;
    border-left: solid #22202f 1px;
    flex-direction: column;
    height: 3rem;
    // justify-content: center;
    // align-items: center;
    .add {
      border-bottom: solid #22202f 1px;
    }
  }
`;

const HealthMenu = (props) => {
  const healthMenuRef = useRef();
  const [healthToChange, setHealthToChange] = useState();
  const health = useSelector((state) => state.health);
  const dispatch = useDispatch();

  const checkClickOutside = (e) => {
    if (
      props.showHealthMenu &&
      healthMenuRef.current &&
      !healthMenuRef.current.contains(e.target)
    ) {
      props.setShowHealthMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", checkClickOutside);

    return () => document.removeEventListener("mousedown", checkClickOutside);
    // eslint-disable-next-line
  }, [props.showHealthMenu]);

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

  const updateHealthToChange = (e) => {
    setHealthToChange(parseInt(e.target.value));
  };

  const healthUp = (e) => {
    if (health.current + healthToChange <= health.max) {
      dispatch(addHealth(healthToChange));
    } else {
      dispatch(addHealth(health.max - health.current));
    }
  };

  const healthDown = (e) => {
    if (health.current - healthToChange >= 0) {
      dispatch(reduceHealth(healthToChange));
    } else {
      dispatch(changeCurrent(0));
    }
  };

  return (
    <Menu ref={healthMenuRef}>
      <Form>
        <label>
          Max
          <input
            name="max"
            type="number"
            value={health.max}
            onChange={onChange}
          />
        </label>
        <label>
          Cur
          <input
            name="cur"
            type="number"
            value={health.current}
            onChange={onChange}
          />
        </label>
        <label>
          /Rnd
          <input
            name="rnd"
            type="number"
            value={health.regen}
            onChange={onChange}
          />
        </label>
      </Form>
      <ChangeForm>
        <input
          type="number"
          onChange={updateHealthToChange}
          value={healthToChange}
          placeholder="0"
        />
        <div className="buttons">
          <div className="add">
            <Add width="25" height="25" onClick={healthUp} />
          </div>
          <div className="minus">
            <Minus width="25" height="25" onClick={healthDown} />
          </div>
        </div>
      </ChangeForm>
    </Menu>
  );
};

export default HealthMenu;
