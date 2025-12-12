export function ToggleButton({
  label,
  onClickFunction,
}: {
  label: string;
  onClickFunction: () => void;
}) {
  return <button onClick={onClickFunction}>{label}</button>;
}
