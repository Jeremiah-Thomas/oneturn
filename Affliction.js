export default class Affliction {
  constructor(name, dur, dmg) {
    this.name = name;
    this.dur = dur;
    this.dmg = dmg;
  }

  build(parent) {
    const container = document.createElement("div");
    container.classList.add("counter");
    const abilityName = document.createElement("h2");
    abilityName.textContent = this.name;
    container.appendChild(abilityName);
    const inputs = document.createElement("div");
    inputs.classList.add("inputs");
    const durLabel = document.createElement("label");
    durLabel.textContent = "Duration";
    const duration = document.createElement("input");
    duration.type = "number";
    duration.value = this.dur;
    duration.classList.add("duration");
    durLabel.appendChild(duration);
    inputs.appendChild(durLabel);
    const dmgLabel = document.createElement("label");
    dmgLabel.textContent = "Damage";
    const damage = document.createElement("input");
    damage.type = "number";
    damage.value = this.dmg;
    damage.classList.add("damage");
    dmgLabel.appendChild(damage);
    inputs.appendChild(dmgLabel);
    container.appendChild(inputs);
    parent.appendChild(container);
  }
}
