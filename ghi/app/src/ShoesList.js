function ShoesList(props) {
    return (<table className="table .table-striped">
    <thead>
      <tr>
        <th>Name</th>
        <th>Manufacturer</th>
        <th>ID</th>
        <th>Bin</th>
        <th>Color</th>
        <th>Pic Url</th>
      </tr>
    </thead>
    <tbody>
{props.shoes.map(shoe => {
return (
<tr key={shoe.href}>
  <td>{ shoe.name }</td>
  <td>{ shoe.manufacturer }</td>
  <td>{ shoe.id }</td>
  <td>{ shoe.bin }</td>
  <th>{ shoe.color }</th>
  <th>{ shoe.picurl }</th>
</tr>
);
})}
    </tbody>
  </table>)


}

export default ShoesList;