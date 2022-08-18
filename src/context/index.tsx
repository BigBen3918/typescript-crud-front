import { createContext, useContext, useReducer, useMemo } from "react";

const INIT_STATE: any = {
    todoData: [
        {
            name: "Todo-1",
            items: [
                {
                    itemname: "item-1",
                    description: "this is first item",
                    endTime: "0",
                    priority: 1,
                },
                {
                    itemname: "item-2",
                    description: "this is second item",
                    endTime: "0",
                    priority: 3,
                },
            ],
        },
        {
            name: "Todo-2",
            items: [
                {
                    itemname: "item-1",
                    description: "this is first item",
                    endTime: "0",
                    priority: 1,
                },
            ],
        },
        {
            name: "Todo-3",
            items: [
                {
                    itemname: "item-1",
                    description: "this is first item",
                    endTime: "0",
                    priority: 2,
                },
                {
                    itemname: "item-2",
                    description: "this is second item",
                    endTime: "0",
                    priority: 2,
                },
                {
                    itemname: "item-3",
                    description: "this is third item",
                    endTime: "0",
                    priority: 3,
                },
            ],
        },
    ],
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

    /* ------------ Context Value ------------- */
    return (
        <App.Provider
            value={useMemo(
                () => [
                    state,
                    {
                        dispatch,
                    },
                ],
                [state, dispatch]
            )}
        >
            {children}
        </App.Provider>
    );
}
