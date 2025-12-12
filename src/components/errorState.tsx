export function ErrorState({ error }: { error: string | null }) {
  return (
    <>
      <p>Error: {error}</p>
    </>
  );
}
