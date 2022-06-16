import React from 'react'
import { NavLink } from 'react-router-dom';
import HatsListTable from './HatsListTable';


function HatColumn(props) {
  console.log(props)

  async function handleDelete(e) {
    console.log(e.target.value)
    const hatId = e.target.value
    const hatUrl = `http://localhost:8090/hats/${hatId}`
    const fetchConfig = {
      method: "DELETE",
    }
    const response = await fetch(hatUrl, fetchConfig)
    if (response.ok) {
      props.getHats()
      alert("Delete successful!")
    }
  }

  return (
    <div className="col">
      {props.list.map(hat => {
        return (
          <div key={hat.href} className="card mb-3 shadow">
            <img src={hat.pic_url} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{hat.style}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {hat.color} 
                <p>{hat.fabric}</p>
              </h6>
            </div>
            <div className="card-footer">
              {hat.location.closet_name} / Section {hat.location.section_number} / Shelf {hat.location.shelf_number}
              <div><button value={hat.id} type="button" onClick={handleDelete}>Delete Hat</button></div>
            </div>
          </div>
        );
      })
      }
    </div>
  );
}

class HatsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hatColumns: [[], [], []],
    }
    this.getHats = this.getHats.bind(this)
  }

  async getHats () {
    const url = 'http://localhost:8090/hats/'

    try {
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()

        console.log('data', data.hats)

        const requests = []
        for (let hat of data.hats) {
          const detailUrl = `http://localhost:8090${hat.href}`
          requests.push(fetch(detailUrl))
          // console.log(requests)
        }
        // console.log('hello')
        const responses = await Promise.all(requests)

        // console.log('response', responses)
  
        const hatColumns = [[], [], []];


        let i = 0
        for (const hatResponse of responses) {
          const details = await hatResponse.json()
          // console.log('details', details)
          hatColumns[i].push(details)
          i = i + 1
          if (i > 2) {
            i = 0
          } else {
            console.error(hatResponse)
          }
        }

        this.setState({hatColumns: hatColumns})
      } 
    } catch (e) {
      console.error(e)
    }
  }

  async componentDidMount() {
    this.getHats()
  }

  render() {
    return (
      <div className="container">
          <h2>Hats</h2>
          <div className="row">
            {this.state.hatColumns.map((hatList, index) => {
              return (
                <HatColumn key={index} list={hatList} getHats={this.getHats} />
              );
            })}
          </div>
          <div className='row'>
            <HatsListTable hats={this.state.hatColumns.flat()}/>
          </div>
        </div>
    )
  } 
}

export default HatsList