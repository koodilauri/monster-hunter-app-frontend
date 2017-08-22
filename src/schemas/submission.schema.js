
export const initialValues = {
  name: "",
  quest: {
    id: -1,
    name: ""
  },
  minutes: 0,
  seconds: 0,
}

export const validations = {
  type: "object",
  properties: {
    name: {
      type: "string",
      pattern: /^[a-zA-Z]+$/,
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
    minutes: {
      type: "number",
      gte: 0,
      lte: 49,
      error: "Minutes can be from 0 to 49 only"
    },
    seconds: {
      type: "number",
      gte: 0,
      lte: 59,
      error: "Seconds can be from 0 to 59 only"
    },
  }
}