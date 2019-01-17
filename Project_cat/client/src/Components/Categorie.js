import React, { Component } from 'react'
import AddCategory from './AddCat';

class Category extends Component {
   constructor(props){
       super(props)
       this.state={
        category_query:[],
        feature_demo:[],
        textData:'',
        dataInput:''
       }
       this.handleSubmit = this.handleSubmit.bind(this);
       this.changeHandle = this.changeHandle.bind(this);

   }
   handleClick(){
    var id = this.refs.idd.value;
    //console.log( `categories name`,id);

    fetch(`/feat/${id}`)
    .then(res => res.json())
    .then(feature_demo =>
      this.setState({ feature_demo }, () => {
        // console.log('feature_demo fetched...', feature_demo);
      })
    );

   }  
  handleChange() {
    var name = this.refs.name.value;
    // console.log( ` feature categories`,name);

    // fetch(`/Done/:${name}`)
    //   .then(res => res.json())
    //   .then(done =>
    //     this.setState({ done }, () => {
    //       //console.log('categories fetched...', done);
    //     })
    //   );
    console.log('categories fetched...', name);
  } 
   componentDidMount() {
    fetch("/subcat")
      .then(res => res.json())
      .then(category_query =>
        this.setState({ category_query }, () => {
           //console.log('category_fetched...', category_query);
        })
      );

        //Feature Subcategories options fetch data
     fetch("/subfeature")
     .then(res => res.json())
     .then(feature_demo =>
       this.setState({ feature_demo }, () => {
        // console.log('feature fetched...', feature_demo);
       })
     );
    }

//Input field Attributes by User
handleSubmit = (e) => {
  e.preventDefault();
  alert("Tou submitted Data: " + this.state.textData + ","+ this.state.dataInput);
  console.log('welcome to Submit button');
}

changeHandle = (e)=>{
  this.setState({
    [e.target.name]: e.target.value
  });
}

    render() {  
  //  var user = {
  //    name:"Chinky Chaurasia",
  //    hobbies:["fighting"]
  //  }
    let CategoryOpt = this.state.category_query.map(category_query => {
        return (
          <option key={category_query.id} value={category_query.id}>
            {category_query.name}
          </option>
        );
      });

      let featuresOpt = this.state.feature_demo.map(feature_demo => {
        return (
          <option key={feature_demo.id} value={feature_demo.id}>
            {feature_demo.name}
          </option>
        );
      })


        return ( 
            <div  style={{ color: "red", marginTop: "5px" }}>
            <label>
            Category:
             <select ref="idd" onChange={this.handleClick.bind(this)}>
                {CategoryOpt}
              </select>

            {/* This is the select  features dropdown   */}
            features-Categories:
              <select ref="name" onChange={this.handleChange.bind(this)}>
                {featuresOpt}
              </select>

                   <br/><br/>

              <form onSubmit={this.handleSubmit}>
              Feature Name:
                        <input
                          type="text"
                          name="textData"
                          onChange={this.changeHandle}
                          className="form-control"
                          value={this.state.textData}
                       
                        />
                        </form>

                        <form onSubmit={this.handleSubmit}>
                        Feature Code:
                        <input
                          type="text"
                          name="dataInput"
                          onChange={this.changeHandle}
                          className="form-control"
                          value={this.state.dataInput} 
                        />
                        </form>


             </label>

             {/* <AddCategory name={"Arpit Chaurasia"} age={23} user={user}/> */}

             <AddCategory/>
     
            </div>
         );
    }
}
 
export default Category;