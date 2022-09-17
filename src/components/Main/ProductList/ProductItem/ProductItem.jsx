import React, { Component } from 'react'
import './ProductItem.css'
export class ProductItem extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      name: this.props.data.name || "Producto Medias Query"
    }
  }

  render() {
    const {info,price,image} = this.props.data; //Destructuring
    let url_img = image || "https://www.laylita.com/recetas/wp-content/uploads/2014/06/Caipirinha-o-caipiriC3B1a-de-piC3B1a-500x500.jpg";

    return (
      <article>
        <h2>{this.state.name}</h2>
        <img src={url_img} alt={this.state.name} className="image_item" />
        <h3>{info}</h3>
        <p>Price: {price}€</p>
        <button onClick={this.props.delete}>Borrar</button>
      </article>
    )
  }
}

export default ProductItem