import {
  createContext,
  Dispatch,
  ReactNode,
  Reducer,
  ReducerAction,
  ReducerState,
  useContext,
  useReducer,
} from "react";

export const createUseEnsureContext = <S,>(
  ctx: React.Context<S | null>,
): (() => S) => {
  return () => {
    const contextMaybe = useContext(ctx);
    if (!contextMaybe) {
      throw new Error("useContext without Provider");
    }
    return contextMaybe;
  };
};

export const createReducerContext = <TReducer extends Reducer<any, any>>(
  reducer: TReducer,
) => {
  const context = createContext<{
    state: ReducerState<TReducer>;
    dispatch: Dispatch<ReducerAction<TReducer>>;
  } | null>(null);

  const useReducerContext = createUseEnsureContext(context);

  const reducerContextProvider = ({
    children,
    initial,
  }: {
    children: ReactNode;
    initial: ReducerState<TReducer>;
  }) => {
    const [state, dispatch] = useReducer<TReducer>(reducer, initial);
    return (
      <context.Provider value={{ state, dispatch }}>
        {children}
      </context.Provider>
    );
  };

  return { useContext: useReducerContext, provider: reducerContextProvider };
};
