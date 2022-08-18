import { createContext, useContext, useReducer, useMemo } from "react";

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
