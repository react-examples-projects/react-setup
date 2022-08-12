export default function InputLoader({loading=true}) {
  if(!loading) return null

  return (
    <svg className="inputLoader" viewBox="25 25 50 50">
      <circle r="20" cy="50" cx="50"></circle>
    </svg>
  );
}
