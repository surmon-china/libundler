export enum Type {
  Option1 = 1,
  Option2 = 2,
  Option3 = 3,
  Option4 = 4,
}

export const createType = (type: Type) => {
  return {
    [type]: Type[type],
  }
}
