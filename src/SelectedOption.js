import React from 'react';

const SelectedOption = ({ selectedOptions, options, deleteSelectedOption, setNewOption }) => {
  return (
    <div className='selectedoptions'>
    {
      selectedOptions.map((soption,index)=>(
        <div key={index} className='optionss'>
          <span className={soption.type+"-dot mr-15"} ></span>
        <select className='form-select' aria-label="Default select example"
        value={soption.label}
        onChange={event => setNewOption(event.target.value)}
      >
        <option key={index} value={soption.label}>{soption.label}</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select><span id='delete_new_selected_option' onClick={()=>deleteSelectedOption(soption.value)}> —</span> <br /> 
      </div>
      ))
    }

  </div>
  );
};

export default SelectedOption;
