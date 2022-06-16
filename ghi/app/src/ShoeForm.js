import React from 'react';

class ShoeForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            manufacturer: '',
            name: '',
            color: '',
            picurl: '', 
            bins: []
          };
        this.handleManuFacturerChange = this.handleManuFacturerChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handlePicUrlChange = this.handlePicUrlChange.bind(this);
        this.handleBinChange = this.handleBinChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    handleManuFacturerChange(event) {
        const value = event.target.value;
        this.setState({manufacturer: value})
      }
    
    handleNameChange(event) {
        const value = event.target.value;
        this.setState({name: value})
      }
    handleColorChange(event) {
        const value = event.target.value;
        this.setState({color: value})
      }
     handlePicUrlChange(event) {
        const value = event.target.value;
        this.setState({picurl: value})
      }
      handleBinChange(event) {
        const value = event.target.value;
        this.setState({bin: value})
      }
    
    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        delete data.bins;
        // console.log(data);
      
        const shoeUrl = 'http://localhost:8080/shoes/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const response = await fetch(shoeUrl, fetchConfig);
        if (response.ok) {
            const newLocation = await response.json();
            console.log(newLocation);
        
            const cleared = {
              manufacturer: '',
              name: '',
              color: '',
              picurl: '', 
              bin: '',
            };
            this.setState(cleared);
          }
      }
    

    async componentDidMount() {
        const url = 'http://localhost:8100/api/bins/';
    
        const response = await fetch(url);
    
        if (response.ok) {
          const data = await response.json();
          this.setState({bins: data.bins});
    
          
        }
      }
    
    render() {
      return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new shoe</h1>
            <form onSubmit={this.handleSubmit} id="create-location-form">
            <div className="form-floating mb-3">
              <input onChange={this.handleManuFacturerChange} placeholder="Name" required
       type="text" name="manufacturer" id="manufacturer" value={this.state.manufacturer}
       className="form-control" />
                <label htmlFor="name">Manufacturer</label>
              </div>
              <div className="form-floating mb-3">
              <input onChange={this.handleNameChange} placeholder="Name" required
       type="text" name="name" id="name" value={this.state.name}
       className="form-control" />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
              <input onChange={this.handleColorChange} placeholder="color" required
       type="text" name="color" id="color" value={this.state.color}
       className="form-control" />
                <label htmlFor="name">Color</label>
              </div>
              <div className="form-floating mb-3">
              <input onChange={this.handlePicUrlChange} placeholder="picurl" required
       type="text" name="picurl" id="picurl" value={this.state.picurl}
       className="form-control" />
                <label htmlFor="name">Picture URL</label>
              </div>
              <div className="mb-3">
            <select onChange={this.handleBinChange} required name="bin" id="bin" value={this.state.bin} className="form-select">
            <option value="">Choose a bin</option>
            {this.state.bins.map(bin => {
            return (
                <option key={bin.href} value={bin.href}>
                {bin.closet_name}
                </option>
            );
            })}
            </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
         
      );
    }
  }
export default ShoeForm;



    
    
