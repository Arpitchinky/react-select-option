import React from "react";
import $ from "jquery";

class AddCategory extends React.Component {
  
    constructor(props){
    super(props); 
  this.state = {
    rows: [{ }]
  };
this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}
handleSubmit = (e) => {
    e.preventDefault();
  // console.log(this.inputNode.value)
    const user = {
     mandatory: this.state.mandatory,
    attributes: this.state.attributes,
     datatype: this.state.datatype,
     fieldlength:this.state.fieldlength,
     description:this.state.description,
    };
    console.log( 'user fetched', user)
     alert("A name was submitted: " + this.state.mandatory+ "," + this.state.attributes + ","+this.state.datatype+ ","+this.state.fieldlength+ ","+this.state.description);
    // console.log('welcome to Submit button');
    //console.log(this.state)
   // window.location.reload();

 
fetch('/insertdata',{
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(response => {
        response.json().then(data =>{
     // console.log("Successful data Submitted",  data);
        })
    })
    // console.log(document.getElementsByClassName("table")[0].rows);
    // console.log(document.getElementsByClassName("table")[0].rows[1]);
    // console.log(document.getElementsByClassName("table")[0].rows[1].cells[2].innerHTML);
    // console.log(document.getElementsByClassName("table")[0].rows[1].cells[3].innerHTML);
    // console.log(document.getElementsByClassName("table")[0].rows[1].cells[4].innerHTML);
    // console.log(document.getElementsByClassName("table")[0].rows[1].cells[5].innerHTML);

    $('#tab_logic tr').each(function() {
          $(this).find('td').each(function() {
            $(this).find('input[type=checkbox]').each(function(){  
               console.log($(this).is(":checked"));
               })
            console.log($(this).children().val());      
          })
    })

}
handleChange = (e,key) => {
  let target = e.target;
  let value = target.type === 'checkbox' ? target.checked :target.value;
  let name = target.name;
  this.setState({
    [name]: value,
  });
}

handleAddRow = () => {
    const item = {
        Mandatory: "",
        Attributes: "",
        DataType: "",
        Fieldlength:"",
        Description:""

    };
    this.setState({
      rows: [...this.state.rows, item]
   
    });
  };
handleRemoveRow = () => {
    this.setState({
      rows: this.state.rows.slice(0, -1)
    });
  };
handleRemoveSpecificRow = (idx) => () => {
    const rows = [...this.state.rows]
    rows.splice(idx, 1)
    this.setState({ rows })
  }

  render() {
   // console.log(document.getElementsByTagName("table"));
   return (
      <div className="category_id">
      
        <div className="container">
          <div className="row clearfix">
            <div className="col-md-12 column">
              <table
                className="table table-bordered table-hover"
                id="tab_logic"
              >
         
                <thead>
                  <tr>
                    <th className="text-center"> # </th>
                    <th className="text-center"> Mandatory </th>
                    <th className="text-center"> Attributes </th>
                    <th className="text-center"> DataType </th>
                    <th className="text-center"> Fieldlength </th>
                    <th className="text-center"> Description </th>  
                    
                    <th/>
                  </tr>
                </thead>
                <tbody>
                  {this.state.rows.map((item, idx) => (
                    <tr id="addr0" key={idx}>
                      <td>{idx}</td>

                      <td>
                    <input type="checkbox"
                    name="mandatory"
                    checked={this.state.isChecked}
                    onChange={this.handleChange}
                    />
                      </td>


                      <td>
                   
                        <input
                          type="text"
                          name="attributes"
                          onChange={this.handleChange}
                          className="form-control"
                          required={true}
                        />
                        
                      </td>
                       
                      <td>
                    <select  name="datatype"
                    
                       
                          onChange={this.handleChange}
                          className="form-control" >
                      <option value="string">String</option>
                      <option selected value="number">Number</option>
                      <option value="boolean">Boolean</option>
                      <option value="double">Double</option>
                   </select>
                    </td>

                      <td>
               
                        <input
                          type="text"
                          name="fieldlength"
                          required={true}
                          onChange={this.handleChange}
                          className="form-control"
                        />
                      
                      </td>

                      <td>
                        <textarea
                          type="text"
                          name="description"
                          required={true}
                          text="Is there anything you'd like to say?"
                          onChange={this.handleChange}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={this.handleRemoveSpecificRow(idx)}
                        >
                          Remove
                        </button>
                      </td>
                      {/* <td>
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={this.handleSubmit}
                        >
                          Submit
                        </button>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
              <br/>
              <button onClick={this.handleAddRow} className="btn btn-primary">
                Add Row
              </button>
              <button
                onClick={this.handleRemoveRow}
                className="btn btn-danger float-right"
              >
                Delete Last Row
              </button>
              <button
                className="btn btn-primary  float-right"
                onClick={this.handleSubmit}
              >
                Submit All Row
              </button> 
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default AddCategory;