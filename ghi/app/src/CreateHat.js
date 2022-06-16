import React from 'react'
import { UNSAFE_LocationContext } from 'react-router-dom'

class CreateHatForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      style: '',
      fabric: '',
      color: '',
      picUrl: '',
      locations: []
    }
    this.handleStyleChange = this.handleStyleChange.bind(this)
    this.handleFabricChange = this.handleFabricChange.bind(this)
    this.handleColorChange = this.handleColorChange.bind(this)
    this.handlePicUrlChange = this.handlePicUrlChange.bind(this)
    this.handleLocationChange = this.handleLocationChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};
    // console.log(data)
    data.pic_url = data.picUrl;
    delete data.picUrl;
    delete data.locations;

    const hatUrl = 'http://localhost:8090/hats/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(hatUrl, fetchConfig);
    if (response.ok) {

      const cleared = {
        style: '',
        fabric: '',
        color: '',
        picUrl: '',
        location: '',
      }
      this.setState(cleared)
    }
  }


  handleStyleChange(event) {
    const value = event.target.value
    this.setState({style:value})
  }

  handleFabricChange(event) {
    const value = event.target.value
    this.setState({fabric:value})
  }

  handleColorChange(event) {
    const value = event.target.value
    this.setState({color:value})
  }

  handlePicUrlChange(event) {
    const value = event.target.value
    this.setState({picUrl:value})
  }

  handleLocationChange(event) {
    const value = event.target.value
    this.setState({location:value})
  }

  async componentDidMount () {
    const url = 'http://localhost:8100/api/locations/'
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      this.setState({locations:data.locations})
    }
  }

  render () {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new hat</h1>
            <form onSubmit={this.handleSubmit} id="create-hat-form">
              <div className="form-floating mb-3">
                <input onChange={this.handleStyleChange} placeholder="Style" required type="text" name="style" id="style" className="form-control" value={this.state.style} />
                <label htmlFor="style">Style</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleFabricChange} placeholder="Fabric" required type="text" name="fabric" id="fabric" className="form-control" value={this.state.fabric} />
                <label htmlFor="fabric">Fabric</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleColorChange} placeholder="Color" required type="text" name="color" id="color" className="form-control" value={this.state.color} />
                <label htmlFor="color">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handlePicUrlChange} placeholder="PicUrl" required type="url" name="picUrl" id="picUrl" className="form-control" value={this.state.picUrl} />
                <label htmlFor="picUrl">Picture URL</label>
              </div>
              <div className="mb-3">
                <select required onChange={this.handleLocationChange} name="location" id="location" className="form-select" value={this.state.location}>
                  <option value="">Choose a location</option>
                  {this.state.locations.map(location=> {
                    return (
                      <option key={location.id} value={location.href}>
                        {location.id} | {location.closet_name} - Section {location.section_number} / Shelf {location.shelf_number}
                      </option>
                    )
                  })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateHatForm