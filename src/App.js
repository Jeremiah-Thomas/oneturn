import "./App.css";
import { useEffect } from "react";
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  addMonster,
  updateMonster,
  getMonsterData,
  deleteMonster,
} from "./slices/monstersSlice";
import { ReactComponent as Add } from "./add.svg";
import MonsterList from "./comps/MonsterList";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  padding-top: 3rem;

  button {
    all: unset;
    text-align: center;
    font-size: 2rem;
    border: none;
    border-radius: 0.5rem;
    padding: 0;
    margin: 0;
    padding: 0.5rem 1rem 0.5rem 1rem;
    background-color: #22202f;
  }
`;

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMonsterData());
  }, [dispatch]);

  const monsters = useSelector((state) => state.monsters).monsters;

  const createMonster = async (e) => {
    e.preventDefault();
    dispatch(
      addMonster({
        monster_name: `Monster ${monsters ? monsters.length + 1 : 1}`,
        afflictions: [],
      })
    );
  };

  const advanceRound = (e) => {
    e.preventDefault();
    monsters.forEach((monster) => {
      dispatch(updateMonster(monster));
    });
  };

  const clearAll = (e) => {
    e.preventDefault();
    monsters.forEach((monster) => {
      dispatch(deleteMonster(monster._id));
    });
  };

  return (
    <div className="App">
      <Form>
        <button onClick={clearAll}>Clear All</button>
        <button onClick={advanceRound}>Advance Round</button>
        <button onClick={createMonster}>
          <Add width="25" height="25" />
        </button>
      </Form>
      <MonsterList monsters={monsters} />
    </div>
  );
};

export default App;
