import { useState } from "react";
import { useGlobalContext } from "../context";
import { useNavigate } from "react-router-dom";
import TodoCreateModal from "../components/TodoCreateModal";
import { Toast } from "../utils/message";
import Action from "../services";

export default function Todo() {
    const navigate = useNavigate();
    const [state, { loadData }]: any = useGlobalContext();
    const [openModal, setOpenModal] = useState(false);

    const HandleEvent = async (e: any, name: string) => {
        let delButton = document.getElementById(name);

        if (delButton) {
            var isClickButton: any = delButton.contains(e.target);
        }

        if (!isClickButton) navigate(`/tasklist/${name}`);
        else {
            const reuslt: any = await Action.Remove__Todo(name);
            if (reuslt.success) Toast("Successfully delete", "success");
            else Toast(reuslt.message, "error");
            loadData();
        }
    };

    return (
        <div className="container">
            <div className="todo">
                <h2 className="text-primary text-center">Todo Page</h2>

                <button onClick={() => setOpenModal(true)}>
                    + Create Todo
                </button>

                <div className="spacer-single"></div>
                <div className="todo__table">
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Completion</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.todoData.map((item: any, index: any) => (
                                <tr
                                    onClick={(e) => HandleEvent(e, item.name)}
                                    key={index}
                                    className={
                                        item.items.length ===
                                        item.items.filter(
                                            (item: any) => item.status === true
                                        ).length
                                            ? "todo__strike"
                                            : ""
                                    }
                                >
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        {
                                            item.items.filter(
                                                (item: any) =>
                                                    item.status === true
                                            ).length
                                        }{" "}
                                        / {item.items.length}
                                    </td>
                                    <td>
                                        <button id={item.name}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <TodoCreateModal show={openModal} setShow={setOpenModal} flag={1} />
        </div>
    );
}
