import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid';

import ProductItem from './ProductItem'
import data from './products.json'

export class ProductList extends Component {

  constructor(props) {
    super(props)

    this.image = React.createRef();
    this.suggestion = React.createRef();
  
    this.state = {
      products:data, //precarga de array de productos
      suggestion:""
    }
  }

  paintProducts = () => this.state.products.map((product, i) => <ProductItem data={product} key={uuidv4()} delete={()=>this.deleteProduct(i)}/>);

  deleteProducts = () => this.setState({products:[]});

  resetProducts = () => this.setState({products:data});

  deleteProduct = (i) => {
    const remainingProducts = this.state.products.filter((product,j) => i!==j);
    this.setState({products:remainingProducts});
  }

  addProduct = (event) => {

    //const name = prompt("Introduce nombre");
    //const info = prompt("Introduce info del producto");
    //const price = prompt("Introduce precio");

    event.preventDefault();
    const name = event.target.name.value;
    const info = event.target.info.value;
    const price = event.target.price.value;

    const image = this.image.current.value; //Leer campo por referencia
    alert(image); // Para ver lo que trae

    const newProduct = {name,info,price,image};
    this.setState({products:[newProduct,...this.state.products]}) // [{},{},{}] --> [{},{},{},{newProduct}]
  }

  sendMessage = () => {
    alert("Sugerencia enviada: "+this.state.suggestion);
    //Vaciar input y State
    this.suggestion.current.value = "";
    this.setState({suggestion:""});
  }
  handleChange = () => {
    const suggestion = this.suggestion.current.value;
    this.setState({suggestion});
  }

  render() {

  /*  const products = [
        {name:"Tigre de Bengala",info:"Botella Moet con Bengala",price:20},
        {name:"Corona party",info:"Cubo de 5 coronitas",price:10},
        {info:"Botella de absenta con agua",price:40}
      ]
  */

    return (
      <section>
        <h1>Añadir producto</h1>
        <form onSubmit={this.addProduct}>
          <label htmlFor="name">Nombre:</label><br />
          <input type="text" id="name" name="name" /><br />
          <label htmlFor="info">Info:</label><br />
          <input type="text" id="info" name="info" /><br />
          <label htmlFor="price">Precio:</label><br />
          <input type="number" id="price" name="price" /><br />
          <label htmlFor="image">URL imágen:</label><br />
          <input type="url" id="image" name="image" ref={this.image} /><br />
          <input type="submit" value="Añadir" />
        </form>

        <h1>Productos para la fiesta</h1>
        {this.paintProducts()}

        {this.state.products.length?
          <button onClick={this.deleteProducts}>Borrar productos</button>
          :""}

        <button onClick={this.addProduct}>Añadir producto</button>
        <button onClick={this.resetProducts}>Recargar productos</button>

        {/*products.map(product => <ProductItem data={product}/>)*/}

        {/*<ProductItem data = {products[0]}/>
          <ProductItem data = {products[1]}/>
          <ProductItem data = {products[2]}/>*/}

        {/*<ProductItem name={"Tigre de Bengala"} info={"Botella Moet con Bengala"} price={20}/>
          <ProductItem name={"Corona party"} info={"Cubo de 5 Coronitas"} price={10}/>
          <ProductItem info={"Botella de absenta con agua"} price={40}/>*/}
        <div>
          <h1>Tus sugerencias</h1>
          <input type="text" ref={this.suggestion} onChange={this.handleChange}/><br />
          {this.state.suggestion?<button onClick={this.sendMessage}>Enviar</button>:""}
        </div>
      </section>
    )
  }
}

export default ProductList