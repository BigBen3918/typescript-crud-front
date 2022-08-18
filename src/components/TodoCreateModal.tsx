import { useState } from "react";
import { useGlobalContext } from "../context";
import { Toast } from "../utils/message";

export default function TodoCreateModal(props: any) {
    const { show, setShow, flag, param } = props;
    const [state, { dispatch }]: any = useGlobalContext();
    // Todo Variables
    const [todoName, setTodoName] = useState("");
    // Tasklist Variables
    const [taskName, setTaskName] = useState("");
    const [description, setDescription] = useState("");
    const [endTime, setEndTime] = useState(Date);
    const [priority, setPrioirity] = useState(1);

    const HandleTodoCreate = () => {
        if (todoName.trim() === "") {
            Toast("Please enter Todo name", "warning");
            return;
        }
        let isValidation = state.todoData.filter((item: any) => {
            return item.name == todoName.trim();
        });
        if (isValidation.length > 0) {
            Toast("Todo name already exist", "error");
            return;
        }

        dispatch({
            type: "todoData",
            payload: [...state.todoData, { name: todoName, items: [] }],
        });

        setShow(false);
        init();
    };

    const HandleTaskListCreate = () => {
        if (taskName.trim() === "") {
            Toast("Please enter Task name", "warning");
            return;
        }
        if (description.trim() === "") {
            Toast("Please enter description", "warning");
            return;
        }
        if (endTime.trim() === "") {
            Toast("Please enter endtime", "warning");
            return;
        }
        state.todoData.filter((item: any) => {
            if (item.name === param) {
                return item.items.push({
                    itemname: taskName,
                    description: description,
                    endTime: endTime.toString(),
                    priority: priority,
                });
            }
        });

        setShow(false);
        init();
    };

    const init = () => {
        setTodoName("");
        setTaskName("");
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
                                <button
                                    className="btn-primary"
                                    onClick={HandleTodoCreate}
                                >
                                    Submit
                                </button>
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
                                    <label htmlFor="name">Name: </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="form-control"
                                        onChange={(e: any) =>
                                            setTaskName(e.target.value)
                                        }
                                        value={taskName}
                                    />
                                </span>
                                <div className="spacer-half"></div>
                                <span>
                                    <label htmlFor="desc">Description: </label>
                                    <textarea
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
