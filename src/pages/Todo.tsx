import { useState } from "react";
import { useGlobalContext } from "../context";
import { useNavigate } from "react-router-dom";
import TodoCreateModal from "../components/TodoCreateModal";
import { Toast } from "../utils/message";

export default function Todo() {
    const navigate = useNavigate();
    const [state, { dispatch }]: any = useGlobalContext();
    const [openModal, setOpenModal] = useState(false);

    const HandleEvent = (e: any, name: string) => {
        let delButton = document.getElementById(name);

        if (delButton) {
            var isClickButton: any = delButton.contains(e.target);
        }

        if (!isClickButton) navigate(`/tasklist/${name}`);
        else {
            let filterData = state.todoData.filter(
                (item: any) => item.name !== name
            );

            dispatch({
                type: "todoData",
                payload: filterData,
            });
            Toast("Successfully delete", "success");
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
                                <th>All Items</th>
                                <th>UnComplete</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.todoData.map((item: any, index: any) => (
                                <tr
                                    onClick={(e) => HandleEvent(e, item.name)}
                                    key={index}
                                >
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.items.length}</td>
                                    <td>{item.items.length}</td>
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
