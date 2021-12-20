export const integerCut = (value) => (
  Math.round(value)
);

export const featureCut = ({value}) => (
  value.toFixed(3)
);