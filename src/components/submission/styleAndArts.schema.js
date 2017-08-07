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
      required: true,
      pattern: /^(Guild|Striker|Adept|Aerial)$/,
      error: "Style has to be one of the following: Guild, Striker, Adept or Aerial"
    },
    selectedHunterArts: {
      type: Array,
      required: true,
      length: {
        min: 1,
        max: 6
      },
      error: "Hunter arts must be 1 - 3"
    },
  }
}