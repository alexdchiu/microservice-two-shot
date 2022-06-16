import React from "react";

function HatsListTable ({hats}) {
  return (
    <table className="table table-striped table-bordered">
      <caption>List of hats</caption>
      <thead className="table-dark">
        <tr>
          <th>Style</th>
          <th>Color</th>
          <th>Fabric</th>
          <th>Picture</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {hats.map(hat => {
          return (
            <tr key={hat.href}>
              <td>{hat.style}</td>
              <td>{hat.color}</td>
              <td>{hat.fabric}</td>
              <td>{hat.pic_url}</td>
              <td>{hat.location.closet_name} / Section {hat.location.section_number} / Shelf {hat.location.shelf_number}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default HatsListTable