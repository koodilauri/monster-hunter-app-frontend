
export const initialValues = {
  newSubmission: {
    name: "",
    quest: {
      id: -1,
      name: ""
    },
    weapon: {
      id: -1,
      name: ""
    },
    style: "Guild",
    min: 0,
    sec: 0
  },
  armorSet: {
    setName: "",
    head: {
      name: "",
      id: 1
    },
    torso: {
      name: "",
      id: 2
    },
    arms: {
      name: "",
      id: 3
    },
    waist: {
      name: "",
      id: 4
    },
    feet: {
      name: "",
      id: 5
    },
    charm: {
      slots: 0,
      skill1: {
        id: 1
      },
      amount1: 0,
      skill2: {
        id: 149
      },
      amount2: 0
    },
    decorations: [{ decorationAmount: "1", decorationName: "placeholder" }]
  },
}

export const validations = {
  type: "object",
  properties: {
    name: {
      type: "string",
      pattern: "alpha",
      minLength: 1,
      error: "Name must be all letters and at least 1 character long"
    },
    quest: {
      type: "object",
      properties: {
        id: {
          type: "number",
          gt: 0,
          error: "You must select a quest"
        },
      }
    },
    weapon: {
      type: "object",
      properties: {
        id: {
          type: "number",
          gt: 0,
          error: "You must select a weapon"
        },
      }
    },
    style: {
      type: "string",
      pattern: /^(Guild|Striker|Adept|Aerial)$/,
      error: "Style has to be one of the following: Guild, Striker, Adept or Aerial"
    },
    minutes: { type: "number" },
    seconds: { type: "number" },
  }
}