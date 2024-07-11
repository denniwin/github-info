import "../styles/Badge.scss";
export const Badge = ({ item }: { item: string }) => {
  return <span className="badge">{item}</span>;
};
