import React, { useState } from 'react';
import SelectedOption from './SelectedOption';
import NewSchema from './NewSchema';
import axios from 'axios';
const Modal = ({setresults, initialOptions, setOptions, setSelectedOptions, segmentName, selectedOptions, options, newOption, setSegmentName, handleAddNewSchema, deleteSelectedOption, newOptions, setNewOption }) => {
    const [segmentstatus, setsegmentstatus] = useState('');
    const [selectedstatus, setselectedstatus] = useState('');
    const handleSaveSegment = () => {
        if(segmentName!=="" && selectedOptions.length!==0){
            const data = {
                segmentName,
                selectedOptions: selectedOptions.map(option =>({[option.value]:option.label}))
            };
            const data_type = {
                segmentName,
                selectedOptions: selectedOptions.map(option =>({[option.value]:option.label,type:option.type}))
            };
            const fetchData = async () => {
                try {
                    const response = await axios.post('https://webhook.site/1caf0ede-ebbb-4333-a2d6-91377586c40c', data);
                    console.log('Response:', response.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };  
            fetchData();
            setresults(prev => [...prev,data_type]);
            document.getElementById("new_schema").classList = "hidden";
            setSegmentName('');
            setSelectedOptions([]);
            setOptions(initialOptions);
        }
        else{
          if(segmentName===""){
            setsegmentstatus("*Enter Segment Name")
            setTimeout(() => {
              setsegmentstatus("")
            }, 1800);
          }
          if(selectedOptions.length===0){
            setselectedstatus("*Select Atlease One Schema")
            setTimeout(() => {
              setselectedstatus("")
            }, 1800);
          }
        }
      };
  return (
    <div id="myModal" className="modal position-relative" style={{display:"none"}}>
    <div className='modal-content'>   
    <h2 style={{backgroundColor:"#23cce1",margin:"0px",height:"53px", color:"white"}}><span className='seg'>	<span className='segg' onClick={()=>{document.getElementById("myModal").style.display="none";document.getElementById("myModal").style.backdropFilter="blur(0px)";}}>	&nbsp;&nbsp;&lt;&nbsp;&nbsp;</span>Save Segment</span></h2>
    <br />
    <div id='content'>
    <label className='pb-6'>
      Enter the Name of the Segment <br /></label>
      <input className='form-control pb-6'
        type="text"
        value={segmentName}
        onChange={event => setSegmentName(event.target.value)}
      />
      <div className='status'>{segmentstatus}</div>
    
    <br />
    <span className='pb-6'>
      To save your segment, you need to add the schemas to build the query </span><br />
      <span id='legends' className='pb-6'>
     <span className="user-dot"></span> &nbsp;-&nbsp;User Traits &nbsp;<span className="group-dot"></span> &nbsp;-&nbsp;Group Traits </span><br />

          <SelectedOption
        selectedOptions={selectedOptions}
        options={options}
        deleteSelectedOption={deleteSelectedOption}
        setNewOption={setNewOption}
      />
            <NewSchema
        options={options}
        newOption={newOption}
        setNewOption={setNewOption}
        newOptions={newOptions}
      />
      <div className='status'>{selectedstatus}</div>
      <label className='newschemalabl' onClick={handleAddNewSchema}>+ Add new schema</label>
    <button className='bottom-btn btn' id='save' onClick={handleSaveSegment}>Save the Segment</button>        <button className='bottom-btn cancel btn' id='cancel' onClick={()=>{document.getElementById("myModal").style.display="none";document.getElementById("myModal").style.backdropFilter="blur(0px)";}} >Cancel</button>
    </div>
    </div>
  </div>
  );
};

export default Modal;
