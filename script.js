import Affliction from "./Affliction.js";

const addCounterForm = document.querySelector(".add-counter-form");
const advanceBtn = document.querySelector(".advance-btn");
const durationInput = document.querySelector("#duration_input");
const damageInput = document.querySelector("#damage_input");
const nameInput = document.querySelector("#name_input");
const countersList = document.querySelector(".counters");

const afflictions = [];

// const createCounterElement = (name, dur, dmg) => {
//   const container = document.createElement("div");
//   container.classList.add("counter");
//   const abilityName = document.createElement("h2");
//   abilityName.textContent = name;
//   container.appendChild(abilityName);
//   const inputs = document.createElement("div");
//   inputs.classList.add("inputs");
//   const durLabel = document.createElement("label");
//   durLabel.textContent = "Duration";
//   const duration = document.createElement("input");
//   duration.type = "number";
//   duration.value = dur;
//   duration.classList.add("duration");
//   durLabel.appendChild(duration);
//   inputs.appendChild(durLabel);
//   const dmgLabel = document.createElement("label");
//   dmgLabel.textContent = "Damage";
//   const damage = document.createElement("input");
//   damage.type = "number";
//   damage.value = dmg;
//   damage.classList.add("damage");
//   dmgLabel.appendChild(damage);
//   inputs.appendChild(dmgLabel);
//   container.appendChild(inputs);
//   countersList.appendChild(container);
// };

const onSubmit = (e) => {
  e.preventDefault();
  const affliction = new Affliction(
    nameInput.value,
    durationInput.value,
    damageInput.value
  );
  afflictions.push(affliction);
  affliction.build(countersList);
  // createCounterElement(nameInput.value, durationInput.value, damageInput.value);
  nameInput.value = "";
  durationInput.value = "";
  damageInput.value = "";
};

const advanceRound = (e) => {
  e.preventDefault();
  document.querySelectorAll(".duration").forEach((counter) => {
    counter.value = counter.value - 1;
    if (counter.value <= 0) {
      counter.parentElement.parentElement.parentElement.remove();
    }
  });
};

advanceBtn.addEventListener("click", advanceRound);
addCounterForm.addEventListener("submit", onSubmit);
