import "./style.css";
type OptionState = "available" | "taken" | "owned";

const DirectionEditor = () => {
  const dispatch = useAppDispatch();
  const navOptions = useAppSelector((state) => state.flower.navigationOptions);
  const selectedDirection = useAppSelector(
    (state) => state.flower.selectedDirection,
  );
  const navHex = useAppSelector((state) => state.flower.navigationHex);
  const currentValids = (
    options: number[],
    selection: number,
    navigation: Record<string, number[]>,
  ): { number: number; state: OptionState }[] => {
    const currentOption = Object.keys(navigation)[selection];
    return options.map((option) => {
      console.log(
        Object.entries(navigation)
          .filter(([key, rolls]) => key !== currentOption)
          .map(([key, rolls]) => rolls)
          .flat()
          .includes(selection),
        selection,
      );
      if (navigation[currentOption].includes(option)) {
        return { number: option, state: "owned" };
      }
      if (
        Object.entries(navigation)
          .filter(([key, rolls]) => key !== currentOption)
          .map(([key, rolls]) => rolls)
          .flat()
          .includes(option)
      ) {
        return { number: option, state: "taken" };
      } else {
        return { number: option, state: "available" };
      }
    });
  };
  return (
    <div className="options">
      {currentValids(navOptions, selectedDirection, navHex).map((option) => (
        <button
          onClick={() =>
            option.state !== "taken" && dispatch(switchOption(option.number))
          }
          className={"option-button " + option.state.toString()}
        >
          {option.number}
        </button>
      ))}
    </div>
  );
};

export default DirectionEditor;
