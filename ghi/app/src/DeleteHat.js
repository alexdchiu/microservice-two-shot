import React from 'react'

class DeleteHat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      hats: [],
    }
    this.handleIdChange = this.handleIdChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleIdChange(event) {
    const value = event.target.value
    this.setState({id: value})
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};
    // console.log(data)
    delete data.shoes;
  
    const hatUrl = `http://localhost:8090/hats/${data.id}/`;
    console.log('hatURL', hatUrl)
    console.log('data.id', data.id)
    const fetchConfig = {
      method: "DELETE",
      //body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(hatUrl, fetchConfig);
    if (response.ok) {
        const hatDelete = await response.json();
        console.log('hatDelete: ', hatDelete);
    
        const cleared = {
          id: '',
        };
        this.setState(cleared);
      }
  }

  async componentDidMount() {
    const url = 'http://localhost:8090/hats';

    const response = await fetch(url);
    // console.log('response: ', response)
    if (response.ok) {
      const data = await response.json();
      this.setState({hats: data.hats});
      // console.log('data', data)
    }
  }

  render() {
    return (
      <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Delete a hat</h1>
          <form onSubmit={this.handleSubmit} id="delete-shoe">
              <div className="mb-3">
            <select onChange={this.handleIdChange} required name="hat" id="hat" className="form-select" value={this.state.id} >
            <option value="">Choose a hat</option>
            {this.state.hats.map(hat => {
            return (
                <option key={hat.id} value={hat.id}>
                {hat.style}
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

export default DeleteHat