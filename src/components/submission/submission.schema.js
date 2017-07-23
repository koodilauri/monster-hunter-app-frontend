
export const initialValues = {
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
  sec: 0,
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