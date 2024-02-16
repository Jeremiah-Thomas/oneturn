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
import { ReactComponent as Trash } from "./trash.svg";
import { ReactComponent as Advance } from "./arrow-advance.svg";
import MonsterList from "./comps/MonsterList";

const Form = styled.form`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  padding-top: 3rem;

  button {
    all: unset;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 2rem;
    border: none;
    border-radius: 1rem;
    padding: 0;
    margin: 0;
    padding: 0.5rem 1rem 0.5rem 1rem;
    background-color: #22202f;
  }
`;

const Mana = styled.div`
  background: linear-gradient(
    90deg,
    #4e99ff 50%,
    #4e99ff 50%,
    #c9c8cd 50%,
    #c9c8cd 100%
  );
  background-clip: text;
  width: fit-content;
  margin-inline: auto;

  h1 {
    margin-block: 0.5rem;
    font-size: 5rem;
    width: fit-content;
    color: transparent;
  }
`;

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMonsterData());
  }, [dispatch]);

  const monsters = useSelector((state) => state.monsters).monsters;

  const createMonster = (e) => {
    e.preventDefault();
    dispatch(
      addMonster({
        monster_name: `Monster ${monsters ? monsters.length + 1 : 1}`,
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
        <button onClick={clearAll}>
          <Trash width="50" height="50" />
        </button>
        <button onClick={advanceRound}>
          <Advance width="70" height="50" />
        </button>
        <button onClick={createMonster}>
          <Add width="50" height="50" />
        </button>
      </Form>
      <Mana>
        <h1>400</h1>
      </Mana>
      <MonsterList monsters={monsters} />
    </div>
  );
};

export default App;
