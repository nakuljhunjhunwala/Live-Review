import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import EditReview from "./page/EditReview";
import Home from "./page/Home";
import NewReview from "./page/NewReview";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<NewReview />} />
        <Route path="/:id" element={<EditReview />} />
      </Routes>
    </Router>
  );
}

export default App;
