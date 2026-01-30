// src/data/troubleBrewing.ts

export type Alignment = "townsfolk" | "outsider" | "minion" | "demon";

export interface Role {
  id: string;
  en: string;
  zh: string;
  alignment: Alignment;
}

export const troubleBrewingRoles: Role[] = [
  // 🟦 Townsfolk（镇民 13）
  { id: "washerwoman", en: "Washerwoman", zh: "洗衣妇", alignment: "townsfolk" },
  { id: "librarian", en: "Librarian", zh: "图书管理员", alignment: "townsfolk" },
  { id: "investigator", en: "Investigator", zh: "调查员", alignment: "townsfolk" },
  { id: "chef", en: "Chef", zh: "厨师", alignment: "townsfolk" },
  { id: "empath", en: "Empath", zh: "共情者", alignment: "townsfolk" },
  { id: "fortune_teller", en: "Fortune Teller", zh: "占卜师", alignment: "townsfolk" },
  { id: "undertaker", en: "Undertaker", zh: "送葬者", alignment: "townsfolk" },
  { id: "monk", en: "Monk", zh: "僧侣", alignment: "townsfolk" },
  { id: "ravenkeeper", en: "Ravenkeeper", zh: "守鸦人", alignment: "townsfolk" },
  { id: "virgin", en: "Virgin", zh: "贞洁者", alignment: "townsfolk" },
  { id: "slayer", en: "Slayer", zh: "猎手", alignment: "townsfolk" },
  { id: "soldier", en: "Soldier", zh: "士兵", alignment: "townsfolk" },
  { id: "mayor", en: "Mayor", zh: "镇长", alignment: "townsfolk" },

  // 🔵 Outsiders（外来者 4，其中前 2 个显示为蓝色）
  { id: "butler", en: "Butler", zh: "管家", alignment: "outsider" },
  { id: "drunk", en: "Drunk", zh: "酒鬼", alignment: "outsider" },
  { id: "recluse", en: "Recluse", zh: "陌客", alignment: "outsider" },
  { id: "saint", en: "Saint", zh: "圣徒", alignment: "outsider" },

  // 🔴 Minions（爪牙 4）
  { id: "poisoner", en: "Poisoner", zh: "投毒者", alignment: "minion" },
  { id: "spy", en: "Spy", zh: "间谍", alignment: "minion" },
  { id: "scarlet_woman", en: "Scarlet Woman", zh: "红唇女郎", alignment: "minion" },
  { id: "baron", en: "Baron", zh: "男爵", alignment: "minion" },

  // 🔴 Demon（恶魔 1）
  { id: "imp", en: "Imp", zh: "小恶魔", alignment: "demon" },
];

