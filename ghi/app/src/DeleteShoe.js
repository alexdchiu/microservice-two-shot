import React from 'react';

class DeleteShoe extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            names: [],
            shoes: [],
          };

          this.handleNameChange = this.handleNameChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
      }
    
    handleNameChange(event) {
        const value = event.target.value;
        this.setState({name: value})
      }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        delete data.shoes;
      
        const shoeUrl = `http://localhost:8080/shoes/${data.name}/`;
        console.log('shoeURL', shoeUrl)
        console.log('data.name', data.name)
        const fetchConfig = {
          method: "DELETE",
          //body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const response = await fetch(shoeUrl, fetchConfig);
        if (response.ok) {
            const shoeDelete = await response.json();
            console.log('shoeDelete: ', shoeDelete);
        
            const cleared = {
              name: '',
            };
            this.setState(cleared);
          }
      }
    

    async componentDidMount() {
        const url = 'http://localhost:8080/shoes';

        const response = await fetch(url);
        console.log('response from deleteshoe.js: ', response)
        if (response.ok) {
          const data = await response.json();
          this.setState({shoes: data.shoes}
            
            
            );
        }
      }
    
    render() {
      return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Delete a shoe</h1>
            <form onSubmit={this.handleSubmit} id="delete-shoe">
              <div className="mb-3">
            <select onChange={this.handleNameChange} required name="name" id="name" value={this.state.name} className="form-select">
            <option value="">Choose a shoe</option>
            {this.state.shoes.map(shoe => {
            return (
                <option key={shoe.id} value={shoe.id}>
                {shoe.name}
                </option>
            );
            })}
            </select>
              </div>
              <button className="btn btn-primary">Delete</button>
            </form>
          </div>
        </div>
      </div>
         
      );
    }
  }
export default DeleteShoe;



    
    
