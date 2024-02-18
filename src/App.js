import "./App.css";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  addMonster,
  updateMonster,
  getMonsterData,
  deleteMonster,
} from "./slices/monstersSlice";
import { addMana } from "./slices/manaSlice";
import { addHealth } from "./slices/healthSlice";
import { ReactComponent as Add } from "./add.svg";
import { ReactComponent as Trash } from "./trash.svg";
import { ReactComponent as Advance } from "./arrow-advance.svg";
import MonsterList from "./comps/MonsterList";
import ManaMenu from "./comps/ManaMenu";
import HealthMenu from "./comps/HealthMenu";

const AppDiv = styled.div`
.mana {
  position: relative;
}

.health {
  position: relative;
}
`

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
    #4e99ff ${(props) => props.percent * 100}%,
    #4e99ff ${(props) => props.percent * 100}%,
    #c9c8cd ${(props) => props.percent * 100}%,
    #c9c8cd 100%
  );
  background-clip: text;
  width: fit-content;
  margin-inline: auto;

  h1 {
    margin-block: 0.5rem;
    padding: 0;
    font-size: 5rem;
    width: fit-content;
    color: transparent;
  }
`;

const Label = styled.label`
input[type='checkbox'] {
  display: none;
}

`

const Health = styled.div`
  background: linear-gradient(
    90deg,
    #c60c30 ${(props) => props.percent * 100}%,
    #c60c30 ${(props) => props.percent * 100}%,
    #c9c8cd ${(props) => props.percent * 100}%,
    #c9c8cd 100%
  );
  background-clip: text;
  width: fit-content;
  margin-inline: auto;

  h1 {
    margin-block: 0.5rem;
    padding: 0;
    font-size: 5rem;
    width: fit-content;
    color: transparent;
  }
`;


const App = () => {
  const [manaChecked, setManaChecked] = useState(false)
  const [healthChecked, setHealthChecked] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMonsterData());
  }, [dispatch]);

  const monsters = useSelector((state) => state.monsters).monsters;
  const mana = useSelector((state) => state.mana);
  const health = useSelector(state => state.health)

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
    if(mana.current + mana.regen > mana.max){
      dispatch(addMana(mana.max - mana.current))
    }else{
      dispatch(addMana(mana.regen));
    }
    if(health.current > 0){
    if(health.current + health.regen > health.max) {
      dispatch(addHealth(health.max - health.current))
    }else{
      dispatch(addHealth(health.regen))
    }}

  };

  const clearAll = (e) => {
    e.preventDefault();
    monsters.forEach((monster) => {
      dispatch(deleteMonster(monster._id));
    });
  };

  const onCheckHealth = (e) => {
    setHealthChecked(!healthChecked)
  }

  const onCheckMana = (e) => {
    setManaChecked(!manaChecked)
  }

  return (
    <AppDiv className="App">
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
      <div className="health">
      <Label>
      <Health percent={health.current / health.max}>
        <h1>{health.current.toString().padStart(3, '0')}</h1>
      </Health>
      <input type="checkbox" onChange={onCheckHealth}  />
      </Label>
      <HealthMenu visibility={healthChecked} />
      </div>
      <div className="mana">
      <Label>
      <Mana percent={mana.current / mana.max}>
        <h1>{mana.current.toString().padStart(3, '0')}</h1>
      </Mana>
      <input type="checkbox" onChange={onCheckMana}  />
      </Label>
      <ManaMenu visibility={manaChecked}/>
      </div>
      
      <MonsterList monsters={monsters} />
    </AppDiv>
  );
};

export default App;
