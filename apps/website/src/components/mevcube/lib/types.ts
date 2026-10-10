export type Axis = "x" | "y" | "z";
/** Layer coordinate along an axis: -1, 0 or 1. */
export type AxisValue = number;
export type Toward = 1 | -1;

/** Face letters in URFDLB order; also used as the colour of a facelet. */
export type Face = "U" | "R" | "F" | "D" | "L" | "B";

export type NotationBase = "L" | "M" | "R" | "D" | "E" | "U" | "B" | "S" | "F";
export type NotationExtra = "" | "'" | "2";
