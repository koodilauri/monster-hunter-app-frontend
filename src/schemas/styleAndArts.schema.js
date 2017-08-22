export const initialValues = {
  selectedStyle: "Guild",
  selectedHunterArts: [{
    id: -1,
    name: "art1",
    gaugesize: 0,
    description: "",
    weapon: "General"
  },
  {
    id: -1,
    name: "art2",
    gaugesize: 0,
    description: "",
    weapon: "General"
  }]
}
export const validations = {
  type: "object",
  properties: {
    selectedStyle: {
      type: "string",
      pattern: /^(Guild|Striker|Adept|Aerial)$/,
      error: "Style has to be one of the following: Guild, Striker, Adept or Aerial"
    },
    selectedHunterArts: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "number"
          }
        }
      },
      minLength: 1,
      maxLength: 3,
      error: "Hunter arts must be 1 - 3. You cannot choose an art more than once"
    },
  }
}