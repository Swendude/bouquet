const HexEditor = ({selected} : {selected? : number}) => {
    return <div className="hex-editor">
        {selected ? <p>Editing Hex {selected}</p> : <p>Select a hex to edit!</p>}
    </div>
}

export default HexEditor