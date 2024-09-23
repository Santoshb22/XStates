import "./DropDown.css"

const DropDown = ({data, onChange, dropdownType, isDisabled }) => {

  return (
    <div className="dropdownContainer">
        <select 
        name={dropdownType}
        onChange={onChange}
        disabled = {isDisabled}
        >
            <option value="" >Select {dropdownType}</option>
            {
                data.length > 0? (
                    data.map((data, idx)=> 
                    <option 
                    key={idx} 
                    value={data}
                    >
                        {data}
                    </option>
                   )
                ) : (
                    <option>No {dropdownType} Found</option>
                )
            }
        </select>
    </div>
  )
}

export default DropDown