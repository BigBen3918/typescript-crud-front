import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Provider from "./context";

/** ---------- Begin Pages ---------- */
import TaskList from "./pages/TaskLIst";
import Todo from "./pages/Todo";
/** ---------- End Pages ---------- */

/** Begin CSS Style */
import "react-toastify/dist/ReactToastify.css";
import "./assets/styles/index.scss";
/** End CSS Style */

export default function App() {
    return (
        <Provider>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/todo" />} />

                    {/* Main Routes */}
                    <Route path="/todo" element={<Todo />} />
                    <Route path="/tasklist/:name" element={<TaskList />} />
                </Routes>

                <ToastContainer />
            </Router>
        </Provider>
    );
}
