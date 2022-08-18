import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../context";
import { Toast } from "../utils/message";
import TodoCreateModal from "../components/TodoCreateModal";

export default function TaskList() {
    const { name } = useParams();
    const navigate = useNavigate();
    const [state, {}]: any = useGlobalContext();
    const [openModal, setOpenModal] = useState(false);
    const [currentItems, setCurrentItems]: any = useState(null);
    const [editIndex, setEditIndex] = useState("");
    const [editName, setEditName] = useState("");
    const [editDesc, setEditDesc] = useState("");
    const [editEndTime, setEditEndTime] = useState("");
    const [editPriority, setEditPriority] = useState(0);

    useEffect(() => {
        var itemdata: any = state.todoData.filter((item: any) => {
            return item.name === name;
        });

        setCurrentItems(itemdata[0].items);
    }, [currentItems]);

    const HandleBack = () => {
        navigate("/todo");
    };

    const HandleEvent = (param: string, flag: Number) => {
        if (flag === 1) {
            setEditIndex(param);
            state.todoData.filter((item: any) => {
                if (item.name === name) {
                    let index: any = -1;
                    item.items.filter(function (
                        value: any,
                        idx: any,
                        arr: any
                    ) {
                        if (value.itemname === param) index = idx;
                    });

                    setEditName(item.items[index].itemname);
                    setEditDesc(item.items[index].description);
                    setEditEndTime(item.items[index].endTime);
                    setEditPriority(item.items[index].priority);
                }
            });
        } else {
            state.todoData.filter((item: any) => {
                if (item.name === name) {
                    let index: any = -1;
                    item.items.filter(function (
                        value: any,
                        idx: any,
                        arr: any
                    ) {
                        if (value.itemname === param) index = idx;
                    });

                    item.items.splice(index, 1);
                }
            });

            Toast("Successfully delete", "success");
            navigate("/todo");
        }
    };

    const HandleUpdate = (index: any) => {
        if (editName.trim() === "") {
            Toast("Please enter Task name", "warning");
            return;
        }
        if (editDesc.trim() === "") {
            Toast("Please enter description", "warning");
            return;
        }
        if (editEndTime.trim() === "") {
            Toast("Please enter endtime", "warning");
            return;
        }

        state.todoData.filter((item: any) => {
            if (item.name === name) {
                item.items[index].itemname = editName;
                item.items[index].description = editDesc;
                item.items[index].endTime = editEndTime;
                item.items[index].priority = editPriority;
            }
        });

        Toast("Successfully update", "success");
        setEditIndex("");
    };

    return (
        <div className="container">
            <div className="todo">
                <div className="spacer-single"></div>
                <button onClick={HandleBack}>Back</button>
                <h2 className="text-primary text-center">TaskList</h2>

                <div className="flex right p1">
                    <button onClick={() => setOpenModal(true)}>
                        + Create TaskList
                    </button>
                </div>
                <div className="todo__table">
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>End Time</th>
                                <th>Priority</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems
                                ? currentItems.map((item: any, index: any) => (
                                      <tr key={index}>
                                          <td>{index + 1}</td>
                                          <td>
                                              {editIndex !== item.itemname ? (
                                                  item.itemname
                                              ) : (
                                                  <input
                                                      type="text"
                                                      className="form-control"
                                                      onChange={(e: any) =>
                                                          setEditName(
                                                              e.target.value
                                                          )
                                                      }
                                                      value={editName}
                                                  />
                                              )}
                                          </td>
                                          <td>
                                              {editIndex !== item.itemname ? (
                                                  item.description
                                              ) : (
                                                  <input
                                                      type="text"
                                                      className="form-control"
                                                      onChange={(e: any) =>
                                                          setEditDesc(
                                                              e.target.value
                                                          )
                                                      }
                                                      value={editDesc}
                                                  />
                                              )}
                                          </td>
                                          <td>
                                              {editIndex !== item.itemname ? (
                                                  item.endTime
                                              ) : (
                                                  <input
                                                      type="date"
                                                      className="form-control"
                                                      onChange={(e: any) =>
                                                          setEditEndTime(
                                                              e.target.value
                                                          )
                                                      }
                                                      value={editEndTime}
                                                  />
                                              )}
                                          </td>
                                          <td>
                                              {editIndex !== item.itemname ? (
                                                  item.priority == 1 ? (
                                                      "Low"
                                                  ) : item.priority == 2 ? (
                                                      "Medium"
                                                  ) : (
                                                      "High"
                                                  )
                                              ) : (
                                                  <select
                                                      className="form-control"
                                                      defaultValue={
                                                          editPriority
                                                      }
                                                      onChange={(e: any) =>
                                                          setEditPriority(
                                                              e.target.value
                                                          )
                                                      }
                                                  >
                                                      <option value={1}>
                                                          Low
                                                      </option>
                                                      <option value={2}>
                                                          Medium
                                                      </option>
                                                      <option value={3}>
                                                          High
                                                      </option>
                                                  </select>
                                              )}
                                          </td>
                                          <td>
                                              {editIndex !== item.itemname ? (
                                                  <>
                                                      <button
                                                          onClick={() =>
                                                              HandleEvent(
                                                                  item.itemname,
                                                                  1
                                                              )
                                                          }
                                                      >
                                                          Edit
                                                      </button>
                                                      <button
                                                          onClick={() =>
                                                              HandleEvent(
                                                                  item.itemname,
                                                                  2
                                                              )
                                                          }
                                                      >
                                                          Delete
                                                      </button>
                                                  </>
                                              ) : (
                                                  <>
                                                      <button
                                                          onClick={() =>
                                                              HandleUpdate(
                                                                  index
                                                              )
                                                          }
                                                      >
                                                          Submit
                                                      </button>
                                                      <button
                                                          onClick={() =>
                                                              setEditIndex("")
                                                          }
                                                      >
                                                          Cancel
                                                      </button>
                                                  </>
                                              )}
                                          </td>
                                      </tr>
                                  ))
                                : "loading..."}
                        </tbody>
                    </table>
                </div>
            </div>

            <TodoCreateModal
                show={openModal}
                setShow={setOpenModal}
                flag={2}
                param={name}
            />
        </div>
    );
}
