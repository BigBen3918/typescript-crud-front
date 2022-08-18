import { useEffect } from "react";
import { createContext, useContext, useReducer, useMemo } from "react";
import Action from "../services";

const INIT_STATE: any = {
    todoData: [],
};

const App = createContext({});

export function useGlobalContext() {
    return useContext(App);
}

function reducer(state: any, { type, payload }) {
    return {
        ...state,
        [type]: payload,
    };
}

export default function Provider({ children }) {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const result = await Action.Load__Data({
            message: "load all data",
        });

        dispatch({
            type: "todoData",
            payload: result,
        });
    };

    /* ------------ Context Value ------------- */
    return (
        <App.Provider
            value={useMemo(
                () => [
                    state,
                    {
                        dispatch,
                        loadData,
                    },
                ],
                [state, dispatch, loadData]
            )}
        >
            {children}
        </App.Provider>
    );
}
