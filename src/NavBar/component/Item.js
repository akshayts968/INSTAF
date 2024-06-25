import './Item.css';
function Item(props) {
  return (
    <div className="Item">
        <img src={props.image}/>
        <div className='ItemName'>{props.name}</div>
    </div>
  );
}

export default Item;
