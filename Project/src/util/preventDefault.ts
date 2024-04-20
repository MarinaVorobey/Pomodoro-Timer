export function preventDefault<T extends (e: unknown) => void>(fn: T) {
  return <E extends React.SyntheticEvent<unknown>>(e: E) => {
    e.preventDefault();
    fn(e);
  };
}
