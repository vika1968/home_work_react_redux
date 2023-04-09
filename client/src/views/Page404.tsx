import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div>
      <h1>Page404</h1>
      <p>Go back to <Link to="/">Login</Link></p>
    </div>
  );
};

export default Page404;
