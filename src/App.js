import React, { useEffect, useState } from 'react';
import './App.css';
import Modal from './Modal';
import ViewSegments from './ViewSegments'

const initialOptions = [
  { label: 'First Name', value: 'first_name', type: 'user' },
  { label: 'Last Name', value: 'last_name', type: 'user' },
  { label: 'Gender', value: 'gender', type: 'user' },
  { label: 'Age', value: 'age', type: 'user' },
  { label: 'Account Name', value: 'account_name', type: 'group' },
  { label: 'City', value: 'city', type: 'user' },
  { label: 'State', value: 'state', type: 'user' },
  { label: 'Demographics', value: 'demographics', type: 'group' },
  { label: 'Engagement Level', value: 'engagement_level', type: 'group' }
];

const App = () => {  
  const [results, setresults] = useState('');
  const [segmentName, setSegmentName] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [newOption, setNewOption] = useState('');
  const [options, setOptions] = useState(initialOptions);
  const deleteSelectedOption = (val) =>{
    setSelectedOptions(prevOptions => prevOptions.filter(option => option.value !== val));
    setOptions((option)=>[...option,...(initialOptions.filter(op => op.value === val))]);
   }
 
   useEffect(()=>{
     selectedOptions.length !== 0 ? document.querySelector(".selectedoptions").style.border = "2px solid rgb(35, 204, 225)"  :  document.querySelector(".selectedoptions").style.border = "0px"
   },[selectedOptions])
   const handleAddNewSchema = () => {
     if(document.querySelector("#new_schema").classList.contains("hidden")===true){
       document.querySelector("#new_schema").classList.remove("hidden");
       setNewOption('');
     }
     else{
       const selectedOption = options.find(option => option.value === newOption);
       if (selectedOption) {
         setSelectedOptions(prevOptions => [...prevOptions, selectedOption]);
         setOptions(prevOptions => prevOptions.filter(option => option.value !== newOption));
         setNewOption('');
       }
     }
   };
   const newOptions = () =>{
     if(document.querySelector("#new_schema").classList.contains("hidden")===false){
       document.querySelector("#new_schema").classList = "hidden";
     }
   }

  return (
    <div className='container'>
      <nav className="navbar navbar-inverse navbar-fixed-top" style={{backgroundColor:"#23cce1"}}>
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="#" style={{color:"white"}}>View Segments</a>
        </div>
        <ul className="nav navbar-nav">
        </ul>
        
      </div>
      </nav><br /><br /><br />
      <button className='btn' style={{ border: "1px solid #1da58d", float: "right", left: "3%", position: "relative" }} onClick={() => { document.getElementById("myModal").style.display = "block"; document.getElementById("myModal").style.backdropFilter = "blur(5px)"; }}>Add Segment</button>

      <Modal
        setresults={setresults}
        setOptions={setOptions}
        initialOptions={initialOptions}
        setSelectedOptions={setSelectedOptions}
        selectedOptions={selectedOptions}
        segmentName={segmentName}
        options={options}
        newOption={newOption}
        setSegmentName={setSegmentName}
        handleAddNewSchema={handleAddNewSchema}
        deleteSelectedOption={deleteSelectedOption}
        newOptions={newOptions}
        setNewOption={setNewOption}
      />
    <ViewSegments results={results} setresults={setresults} />

    </div>
  );
};

export default App;
