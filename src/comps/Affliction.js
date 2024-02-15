import React from "react";
import { ReactComponent as Check } from "../circle-check.svg";
import { ReactComponent as X } from "../circle-xmark.svg";
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
  justify-content: center;
  align-items: center;
  gap: 0.25rem;

  .name {
    background-color: ${(props) => props.color};
    border-radius: 0.5rem;
    margin: 0;
    padding: 0.25rem;
  }
`;
const Form = styled.form`
  display: ${(props) =>
    props.doom_form ? props.doom_visibility : props.abyssal_visibility};
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
          <h4 className="name">{affliction.name}</h4>
          {affliction.duration === -1 ? (
            ""
          ) : (
            <p>dur. {affliction.cur_duration}</p>
          )}
          {affliction.name === "Doom" ? "" : <p>x{affliction.stacks}</p>}
          {affliction.name === "Doom" ? (
            <Form
              doom_visibility={props.monster.doom ? "none" : "flex"}
              doom_form="true"
            >
              <Check onClick={onPassDoom} fill="#1CAC78" />
              <X onClick={onFailDoom} fill="#C60C30" />
            </Form>
          ) : (
            ""
          )}
          {affliction.name === "Abyssal Mal" ? (
            <Form
              abyssal_visibility={props.monster.abyssal_mal ? "none" : "flex"}
            >
              <Check onClick={onPassAbyssal} fill="#1CAC78" />
              <X onClick={onFailAbyssal} fill="#C60C30" />
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
