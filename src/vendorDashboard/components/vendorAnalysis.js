import { AuthorAnalysis } from "./authorAnalysis";
import { PublisherAnalysis } from "./publisherAnalysis";

const VectorAnalysis = ({ role }) => {
  return role === "AUTHOR" ? (
    <AuthorAnalysis role={role} />
  ) : (
    <PublisherAnalysis role={role} />
  );
};

export default VectorAnalysis;
