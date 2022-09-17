# Teoría clase_34

## Métodos de comunicación entre componentes padre a hijo:

### PROPS:

- Se ENVÍA en ProductList.jsx mediante la declaración de propiedades dentro de cada uno de los componentes hijos ("ProductItem prop1={dato1} prop2={dato2} />")

- Se RECIBE en ProductItem.jsx mediante una declaración de llamada a cada una de las propiedades que se reciban (h3{this.props.prop1}/h3...//... p{this.props.prop2}/p)

.

### STATE:

Es un atributo de la clase que se usa para guardar estados de variables.

- Se CREA en ProductItem.jsx un constructor ("rconst") y se declaran los estados de variables dentro de "this.state":
(this.state = { name1:"estado1", name2:"estado2" })

También se pueden guardar props dentro de state:
(this.state = { name1:this.props.name1, name2:this.props.name2 })


- Se RECIBE en ProductItem.jsx mediante una declaración de llamada a cada una de los estados que se hayan declarado dentro de "this.state" (h3{this.state.name1}/h3...//... p{this.state.name2}/p)

.

.

## REFACTORIZACIÓN 1

.

### Guardardado de propiedades de componentes en un objeto:

Cuando se tienen muchas propiedades en los componentes, se puede crear un objeto para guardarlas aparte.

Se pasa de esto:
```
return (
    <section>
        <ProductItem name={"Tigre de Bengala"} info={"Botella Moet con Bengala"} price={20}/>
        <ProductItem name={"Corona party"} info={"Cubo de 5 Coronitas"} price={10}/>
        <ProductItem info={"Botella de absenta con agua"} price={40}/>
    </section>
)
```

A esto otro:
```
const products = [
    {name:"Tigre de Bengala", info:"Botella Moet con Bengala", price:20},
    {name:"Corona party", info:"Cubo de 5 coronitas", price:10},
    {info:"Botella de absenta con agua", price:40,}
]

return (
    <section>
        <ProductItem data={products[0]}/>
        <ProductItem data={products[1]}/>
        <ProductItem data={products[2]}/>
    </section>
)
```
.

A continuación, para acceder a las propiedades se hace en ProductItem.jsx, añadiendo a las declaraciones "this.props" la raíz "data" para indicar el objeto al que se accede:

Se pasa de esto:
```
this.state = {
      name: this.props.name || "Producto Medias Query"
    }
  }

  render() {
    return (
      <article>
        <h2>{this.state.name}</h2>
        <h3>{this.props.info}</h3>
        <p>Price: {this.props.price}€</p>
      </article>
    )
  }
}
```

A esto otro:
```
this.state = {
      name: this.props.data.name || "Producto Medias Query"
    }
  }

  render() {
    return (
      <article>
        <h2>{this.state.name}</h2>
        <h3>{this.props.data.info}</h3>
        <p>Price: {this.props.data.price}€</p>
      </article>
    )
  }
}
```

.

.

## REFACTORIZACIÓN 2

.

### Creación de un bucle que renderize cada uno de los elementos:

Se le aplica al array "products" el método map para pintar cada uno de sus elementos.

Se pasa de esto:
```
return (
    <section>
        <ProductItem data={products[0]}/>
        <ProductItem data={products[1]}/>
        <ProductItem data={products[2]}/>
    </section>
)
```
A esto otro:
```
return (
    <section>
        {products.map(product => <ProductItem data={product} />)}
    </section>
)
```

.

.

### Migración del array products a un state:

Esto se hace para que los datos de "products", que originalmente se ubican dentro del método "render", puedan estar accesibles desde cualquier parte de la aplicación. 

Se genera un constructor en ProductList.jsx ("rconst") para migrar el array de objetos de propiedades de productos a state:

Pasa de esto:
```
render() {

const products = [
    {name:"Tigre de Bengala",info:"Botella Moet con Bengala",price:20},
    {name:"Corona party",info:"Cubo de 5 coronitas",price:10},
    {info:"Botella de absenta con agua",price:40}
]

```

A esto otro:
```
this.state = {
      products:[
        {name:"Tigre de Bengala",info:"Botella Moet con Bengala",price:20},
        {name:"Corona party",info:"Cubo de 5 coronitas",price:10},
        {info:"Botella de absenta con agua",price:40}
      ]
    }
  }
```

.

.

### Migración de la lógica `pintar los elementos` a la función `paintProducts`:

Se pasa de esto, en render:
```
return (
    <section>
        {products.map(product => <ProductItem data={product} />)}
    </section>
```
A esto otro, encima de render:
```
paintProducts = () => this.state.products.map(product => <ProductItem data={product} />)
```
Y donde estaba la lógica de la función,en render:
```
return (
    <section>
        {this.paintProducts()}
    </section>
```

.

.

### Generación de ID único por elemento:

Se insala la librería "npm i uuid". Se importa en ProductList.jsx "import { v4 as uuidv4 } from 'uuid';". Entondes, en la función paintProduct se pasa de esto:
```
paintProducts = ()=> this.state.products.map(product => <ProductItem data={product} />)
```
A esto otro:
```
paintProducts = ()=> this.state.products.map((product, i)=> <ProductItem data={product} key={uuidv4()} />)
```

.

.

### Refactorización de llamada a variables dentro de objetos: DESTRUCTURACIÓN

La declaración de llamadas a datos en ProductItem.jsx puede quedar con un texto más o menos largo, en función de la complejidad de la ruta por donde es llamada la variable.

La sección de código donde haya HTML hayq ue intentar dejarlo lo más limpio posible.

Entonces, se destructuran las variables y se pasaría de esto:
```
  render() {
    return (
      <article>
        <h2>{this.state.name}</h2>
        <h3>{this.props.data.info}</h3>
        <p>Price: {this.props.data.price}€</p>
      </article>
    )
  }
}
```
A esto otro:
```
render() {
    const {info,price} = this.props.data;
    return (
      <article>
        <h2>{this.state.name}</h2>
        <h3>{info}</h3>
        <p>Price: {price}€</p>
      </article>
    )
  }
}
```

.

.

### Externalización del objeto product

Se crea dentro de la misma carpeta del componente ProductList un archivo llamado "products.json", y externalizamos el objeto products, situado en el state de ProductList.jsx.

En products.json se importa solo el array, sin variable, y se colocan comillas en las claves:
```
[
  {
    "name":"Tigre de Bengala",
    "info":"Botella Moet con Bengala",
    "price":20
  },
  {
    "name":"Corona party",
    "info":"Cubo de 5 coronitas",
    "price":10
  },
  {
    "info":"Botella de absenta con agua",
    "price":40
  }
]
```
En el archivo ProductList.jsx se importa el objeto prodicts.json:
```
import data from './products.json'
```
Y el state de ProductList.jsx se dejaría así:
```
constructor(props) {
    super(props)
  
    this.state = {
      products:data
    }
  }
  ```

.

.

.







//////// MANEJO DE FORMULARIO:

Tendremos un formulario con:

-Un input para indroducir valor o referenciarlo

-Otro input como boton para envial (type submit)

-Una función en form -> onSubmit, se ejecute la función "handleSubmit" (control del evento submit)





/////// MANEJO DE ENVÍOS

/////// REFERENCIAS

Permite trabajar como cuando se usan selectores, pero sin usar selectores


/////// ENRUTADO ENTRE PÁGINAS CON REACT