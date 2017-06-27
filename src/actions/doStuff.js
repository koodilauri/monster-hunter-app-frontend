export const DO_STUFF = 'DO_STUFF'

const doStuff = (stuff) => {
  return {
    payload: stuff,
    type: DO_STUFF
  }
}

export default doStuff