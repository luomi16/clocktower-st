export interface Role {
  id: string;
  name: string;
}

export const troubleBrewingRoles: Role[] = [
  // Townsfolk
  { id: "washerwoman", name: "Washerwoman" },
  { id: "librarian", name: "Librarian" },
  { id: "investigator", name: "Investigator" },
  { id: "chef", name: "Chef" },
  { id: "empath", name: "Empath" },
  { id: "fortune_teller", name: "Fortune Teller" },
  { id: "undertaker", name: "Undertaker" },
  { id: "monk", name: "Monk" },
  { id: "ravenkeeper", name: "Ravenkeeper" },
  { id: "virgin", name: "Virgin" },
  { id: "slayer", name: "Slayer" },
  { id: "soldier", name: "Soldier" },
  { id: "mayor", name: "Mayor" },

  // Outsiders
  { id: "butler", name: "Butler" },
  { id: "drunk", name: "Drunk" },
  { id: "recluse", name: "Recluse" },
  { id: "saint", name: "Saint" },

  // Minions
  { id: "poisoner", name: "Poisoner" },
  { id: "spy", name: "Spy" },
  { id: "scarlet_woman", name: "Scarlet Woman" },
  { id: "baron", name: "Baron" },

  // Demon
  { id: "imp", name: "Imp" },
];
