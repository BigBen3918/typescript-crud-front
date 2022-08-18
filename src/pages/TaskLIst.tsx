import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../context";
import { Toast } from "../utils/message";
import Action from "../services";
import TodoCreateModal from "../components/TodoCreateModal";

export default function TaskList() {
    const { name } = useParams();
    const navigate = useNavigate();
    const [state, { loadData }]: any = useGlobalContext();
    const [openModal, setOpenModal] = useState(false);
    const [currentItems, setCurrentItems]: any = useState(null);
    const [editIndex, setEditIndex] = useState("");
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

    const HandleEvent = async (param: string, flag: Number) => {
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
                        if (value.description === param) index = idx;
                    });

                    setEditDesc(item.items[index].description);
                    setEditEndTime(item.items[index].endTime);
                    setEditPriority(item.items[index].priority);
                }
            });
        } else {
            const result = await Action.Remove__Task({
                name: name,
                description: param,
            });

            if (result.success) Toast("Successfully Delete", "success");
            else Toast(result.message, "error");

            loadData();
            navigate("/todo");
        }
    };

    const HandleUpdate = async (index: any) => {
        if (editDesc.trim() === "") {
            Toast("Please enter description", "warning");
            return;
        }
        if (editEndTime.trim() === "") {
            Toast("Please enter endtime", "warning");
            return;
        }

        const result = await Action.Update__Task({
            index: index,
            name: name,
            editDesc: editDesc,
            editEndTime: editEndTime,
            editPriority: editPriority,
        });

        if (result.success) Toast("Successfully Update", "success");
        else Toast(result.message, "error");

        setEditIndex("");
        loadData();
        navigate("/todo");
    };

    const HandleComplete = async (index: any) => {
        const result: any = await Action.Complete_Task({
            name: name,
            index: index,
        });

        if (result.success) Toast("Successfully Complete", "success");
        else Toast(result.message, "error");

        loadData();
        navigate("/todo");
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
                                <th>Description</th>
                                <th>End Time</th>
                                <th>Priority</th>
                                <th>Completed</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems
                                ? currentItems.map((item: any, index: any) => (
                                      <tr
                                          key={index}
                                          className={
                                              item.status ? "task__strike" : ""
                                          }
                                      >
                                          <td>{index + 1}</td>
                                          <td>
                                              {editIndex !==
                                              item.description ? (
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
                                              {editIndex !==
                                              item.description ? (
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
                                              {editIndex !==
                                              item.description ? (
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
                                              <input
                                                  type="checkbox"
                                                  defaultChecked={item.status}
                                                  disabled={item.status && true}
                                                  onClick={() =>
                                                      HandleComplete(index)
                                                  }
                                              />
                                          </td>
                                          <td>
                                              {editIndex !==
                                              item.description ? (
                                                  <>
                                                      {!item.status && (
                                                          <button
                                                              onClick={() =>
                                                                  HandleEvent(
                                                                      item.description,
                                                                      1
                                                                  )
                                                              }
                                                          >
                                                              Edit
                                                          </button>
                                                      )}
                                                      <button
                                                          onClick={() =>
                                                              HandleEvent(
                                                                  item.description,
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
