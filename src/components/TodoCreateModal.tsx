import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGlobalContext } from "../context";
import { Toast } from "../utils/message";
import Action from "../services";

export default function TodoCreateModal(props: any) {
    const navigate = useNavigate();
    const { show, setShow, flag, param } = props;
    const [state, { loadData }]: any = useGlobalContext();
    // Todo Variables
    const [todoName, setTodoName] = useState("");
    // Tasklist Variables
    const [description, setDescription] = useState("");
    const [endTime, setEndTime] = useState(Date);
    const [priority, setPrioirity] = useState(1);
    const [loading, setLoading] = useState(false);

    const HandleTodoCreate = async () => {
        if (todoName.trim() === "") {
            Toast("Please enter Todo name", "warning");
            return;
        }
        setLoading(true);
        const result = await Action.Create__Todo(todoName);

        if (result.success) {
            Toast("Successfully Create", "success");
            setLoading(false);
            setShow(false);
            loadData();
            init();
        } else {
            Toast(result.message, "error");
        }
    };

    const HandleTaskListCreate = async () => {
        if (description.trim() === "") {
            Toast("Please enter description", "warning");
            return;
        }
        if (endTime.trim() === "") {
            Toast("Please enter endtime", "warning");
            return;
        }
        const result = await Action.Create__Task({
            name: param,
            description: description,
            endTime: endTime.toString(),
            priority: priority,
        });

        if (result.success) {
            Toast("Successfully Create", "success");
            setShow(false);
            loadData();
            init();
            navigate("/todo");
        } else {
            Toast(result.message, "error");
        }
    };

    const init = () => {
        setTodoName("");
        setDescription("");
        setEndTime(Date);
        setPrioirity(1);
    };

    return (
        <div>
            {show &&
                (flag === 1 ? (
                    <>
                        <div className="overlay"></div>
                        <div className="modal">
                            <header className="modal__header">
                                <h4>Create Todo</h4>
                                <button
                                    onClick={() => setShow(false)}
                                    className="close-button"
                                >
                                    &times;
                                </button>
                            </header>

                            <main className="modal__main">
                                <span>
                                    <label htmlFor="name">Name: </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="form-control"
                                        onChange={(e: any) =>
                                            setTodoName(e.target.value)
                                        }
                                        value={todoName}
                                    />
                                </span>
                                <div className="spacer-half"></div>
                                {loading ? (
                                    <button className="btn-primary">
                                        Subitting...
                                    </button>
                                ) : (
                                    <button
                                        className="btn-primary"
                                        onClick={HandleTodoCreate}
                                    >
                                        Submit
                                    </button>
                                )}
                            </main>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="overlay"></div>
                        <div className="modal">
                            <header className="modal__header">
                                <h4>Create TaskList</h4>
                                <button
                                    onClick={() => setShow(false)}
                                    className="close-button"
                                >
                                    &times;
                                </button>
                            </header>

                            <main className="modal__main">
                                <span>
                                    <label htmlFor="desc">Description: </label>
                                    <input
                                        type="text"
                                        id="desc"
                                        className="form-control"
                                        onChange={(e: any) =>
                                            setDescription(e.target.value)
                                        }
                                        value={description}
                                    />
                                </span>
                                <div className="spacer-half"></div>
                                <span>
                                    <label htmlFor="time">Time: </label>
                                    <input
                                        type="date"
                                        id="time"
                                        className="form-control"
                                        onChange={(e: any) =>
                                            setEndTime(e.target.value)
                                        }
                                        value={endTime}
                                    />
                                </span>
                                <div className="spacer-half"></div>
                                <span>
                                    <label htmlFor="priority">Priority: </label>
                                    <select
                                        id="priority"
                                        className="form-control"
                                        onChange={(e: any) =>
                                            setPrioirity(e.target.value)
                                        }
                                    >
                                        <option value={1}>Low</option>
                                        <option value={2}>Medium</option>
                                        <option value={3}>High</option>
                                    </select>
                                </span>
                                <div className="spacer-half"></div>
                                <button
                                    className="btn-primary"
                                    onClick={HandleTaskListCreate}
                                >
                                    Submit
                                </button>
                            </main>
                        </div>
                    </>
                ))}
        </div>
    );
}
