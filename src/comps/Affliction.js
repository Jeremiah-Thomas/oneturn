import React from "react";
import { ReactComponent as Check } from "../check.svg";
import { ReactComponent as X } from "../delete.svg";
import { useDispatch } from "react-redux";
import {
  passDoom,
  passAbyssal,
  failDoom,
  failAbyssal,
} from "../slices/monstersSlice";
import { styled } from "styled-components";

const Afflic = styled.div`
  display: flex;
  justify-content: stretch;
  align-items: center;
  // gap: 1rem;
  border-radius: 2rem;
  // background-color: #5c37b3;
  // border-top: solid #4a2c8f 1px;

  padding: 0;
  margin: 0;
  width: 100%;
  height: max-content;

  & > :last-child {
    border-radius: 0 1rem 1rem 0;
  }

  .name {
    background-color: ${(props) => props.color};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 1rem 0 0 1rem;
    padding-inline: 0.5rem;
    padding-block: 0rem;
    height: 100%;

    h4 {
      margin: 0;
      padding: 0;
      text-align: center;
    }
  }

  .duration {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    background-color: #5c37b3;
    border-right: solid #4a2c8f 1px;
    padding-inline: 0.5rem;
    height: 100%;
    flex: 1;
    p {
      padding: 0;
      margin: 0;
      border-bottom: solid #4a2c8f 1px;
    }
  }

  .stacks {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-inline: 0.5rem;
    font-size: 1.35rem;
    background-color: #5c37b3;
    height: 100%;
    border-right: solid #4a2c8f 1px;
    flex: 1;
    p {
      padding: 0;
      margin: 0;
    }
  }
`;
const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100%;
  background-color: #5c37b3;

  .check {
    background-color: #1cac78;
  }

  .fail {
    background-color: #c60c30;
    border-radius: inherit;
  }

  span {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    align-items: center;
    padding: 0;
    margin: 0;
  }
`;

const Affliction = (props) => {
  const dispatch = useDispatch();
  const [affliction] = props.affliction;

  const onPassDoom = (e) => {
    e.preventDefault();
    dispatch(passDoom(props.monster));
  };

  const onPassAbyssal = (e) => {
    e.preventDefault();
    dispatch(passAbyssal(props.monster));
  };

  const onFailDoom = (e) => {
    e.preventDefault();
    dispatch(failDoom(props.monster));
  };

  const onFailAbyssal = (e) => {
    e.preventDefault();
    dispatch(failAbyssal(props.monster));
  };

  return (
    <Afflic color={affliction.color}>
      {affliction.name ? (
        <>
          <p className="name">
            <h4>{affliction.name}</h4>
          </p>
          {!affliction.max_duration ? (
            ""
          ) : (
            <section className="duration">
              <p>Dur</p> {affliction.cur_duration}
            </section>
          )}
          {affliction.name === "Doom" ? (
            ""
          ) : (
            <section className="stacks">
              <p>x{affliction.stacks}</p>
            </section>
          )}
          {affliction.name === "Doom" && !props.monster.doom ? (
            <Form>
              <span className="check">
                <Check width="30" height="30" onClick={onPassDoom} />
              </span>
              <span className="fail">
                <X width="30" height="30" onClick={onFailDoom} />
              </span>
            </Form>
          ) : (
            ""
          )}
          {affliction.name === "Abyssal Mal" && !props.monster.abyssal_mal ? (
            <Form>
              <span className="check">
                <Check width="30" height="30" onClick={onPassAbyssal} />
              </span>
              <span className="fail">
                <X width="30" height="30" onClick={onFailAbyssal} />
              </span>
            </Form>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
    </Afflic>
  );
};

export default Affliction;
