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

Entontes, en state de ProductList.jsx, lo que se está haciendo es una precarga de productos. Ahora, queremos pintar esos productos...

.

.

## MANEJO DE EVENTOS

.

### Vaciado (borrar) del state de productos:

Ahoramismo, tenemos el estado con un array de tres elementos. Para vaciarlo, hay que conseguir que en el state, "products:data" sea "products:[]", osea, un array vacío. Esto se hará con el click de un botón, así que nos creamos la función "deleteProducts" con la lógica para hacer esto, que en realidad, será declarar un cambio de estado a un array vacío:
```
deleteProducts = () => this.setState({products:[]})
```
Ahora, hay que asociar la ejecución de esta función a un click de botón con el evento "onClick" en el HTML del botón declarado. Así que se crea un botón en ProductList.jsx/section y se asocia la función:
```
return (
    <section>
        <button OnClick={this.deleteProducts}> Borrar productos </button>
    </section>
```

.

A continuación, cuando se prueba esto vemos que se borran todos los productos. Sin embargo, vemos que no tiene sentido que el botón "Borrar productos" permanezca visible, una vez se hayan borrado estos. Entonces, refactorizamos el botón con un condicional ternario, de tal forma que si el array products es distinto de 0, entonces escríbeme el botón, pero si no, escríbeme "nada". Se pasa de esto:
```
<button OnClick={this.deleteProducts}> Borrar productos </button>
```
A esto otro:
```
{this.state.products.length!==0?
<button onClick={this.deleteProducts}> Borrar productos </button>
:""}
```
- Para JS "this.state.products.length!==0?" es igual que poner "this.state.products.length?"
- En el else, en lugar de poner :"" prodría ser :null

.

.

### Añadir producto al state de productos:

Nos creamos la función "addProduct", con las variables (propiedades) del producto que lo define y la variable objeto newProduct, estableciendo como claves las propiedades del producto y como valores las variables declaradas en las líneas anteriores:
```
addProduct = () => {
  const name = "Coffee bomb";
  const info = "Café con whisky y una pizca de chocolate";
  const price = "10";
  const newProduct = {name,info,price};
}
```
El siguiente paso es meter al array products (products:data) un nuevo objeto, modificando el estado de producto, y pasándole newProduct llamando a la clave adecuada y poniéndole en nuevo valor. Esto se hará con un `spread operator`, y queda así:
```
addProduct = () => {
  const name = "Coffee bomb";
  const info = "Café con whisky y una pizca de chocolate";
  const price = "10";
  const newProduct = {name,info,price};
  this.setState({products:[newProduct,...this.state.products]})
}
```
Ahora, se asocia la ejecución de esta función a un click de botón con el evento "onClick" en el HTML del botón declarado. Así que se crea un botón en ProductList.jsx/section y se asocia la función:
```
return (
    <section>
        <button OnClick={this.addProduct}> Añadir producto </button>
    </section>
```
Cada vez que se pulse "Crear producto", se creará siempre el mismo producto. Entonces, se debería crear un formulario con sus validaciones correspondientes. Pero si se quiere probar introducir nuevos valores sin tener que crear un formilario se puede usar el método "prompt" para introducir valores por pantalla:
```
addProduct = () => {
  const name = prompt("Introduce nombre");
  const info = prompt("Introduce info del producto");
  const price = prompt("Introduce precio");
  const newProduct = {name,info,price};
  this.setState({products:[newProduct,...this.state.products]})
}
```

.

.

### Recargar productos del state de productos:

Este evento no se refiere a recargar la página desde el inicio (window.location... forzar un F5), sino volver a leer desde el array de productos en el archivo products.json y volver a recargar el state al estado inicial, que era el de los productos que encontramos en products.json

Para hacer esto, habré que crear una función resetProducts que cambie el estado del array products, al estado de los productos guardados en products.json, en este caso, importado con el nombre de "data":
```
resetProducts = () => this.setState({products:data})
```
Ahora, se asocia la ejecución de esta función a un click de botón con el evento "onClick" en el HTML del botón declarado. Así que se crea un botón en ProductList.jsx/section y se asocia la función:
```
return (
    <section>
        <button OnClick={this.resetProducts}> Recargar productos </button>
    </section>
```

.

.

### Borrar producto individualmente:

Para que aparezca un botón asociado a cada uno de los productos, hay que crearlo en el componente ProductItem.jsx y asociarle la función que se va a crear para establecer la lógica de borrado:
```
render() {
    return (
      <article>
        <button> Borrar </button>
      </article>
    )
  }
}
```

Sin embargo, la lógica de borrado habrá que crearla donde se encuentre el array de productos, que es en ProductList.jsx. Entonces, la función de borrado "deleteProduct" habrá que transmitirla al componente ProductItem.jsx para que en este se pueda usar. Se le pasa por "props", desde ProductList.jsx en la función "paintProducts", pero antes, hay que crear la función "deleteProduct".

.

Respecto a la lógica, necesito que me devuelva el array restante, tras el borrado del producto, para poder meterlo a setState. Por ello, se va a usar el método "filter". A este método se le pasaba la condición de filtrado y te devolvía el array filtrado.

```
deleteProduct = (i) => {
  this.state.products.filter((product,j)=>...)
}
```
Primero, va a filtrar por la posición "i". La "i" es la posición que va a borrar y la "j" es la posición por la que está iterando.
```
deleteProduct = (i) => {
  const remainingProducts = this.state.products.filter((product,j)=> i!==j)
}
```
Se escribe en la declaración que cuando "i" no sea igual a "j", te devuelva el array restante (filtrado por la condición declarada), y se guarda en la variable "remainingProducts" para segudamente pasarlo a sesState:
```
deleteProduct = (i) => {
  const remainingProducts = this.state.products.filter((product,j)=> i!==j)
  this.setState({products:remainingProducts})
}
```
.

Ahora, hay que transmitir la función "deleteProduct" por "props" (se pueden pasar variables, objetos, funciones...) desde ProductList.jsx (componente padre) hasta ProductItem.jsx (componente hijo)

En la función "paintProducts" se declara una nueva propiedad a `<ProductItem />` con su índice correspondiente derivado del "map".

Pasa de esto:
```
paintProducts = ()=> this.state.products.map((product, i)=> 
<ProductItem data={product} key={uuidv4()} />)
```
A añadir la nueva propiedad:
```
paintProducts = ()=> this.state.products.map((product, i)=> 
<ProductItem data={product} key={uuidv4()} delete={()=>this.deleteProduct(i)}/>)
```

.

Entonces, en ProductItem.jsx hay que recibir a la función que se ha pasado por "props" en el botón "Borrar":
```
render() {
    return (
      <article>
        <button onClick={this.props.delete}> Borrar </button>
      </article>
    )
  }
}
```

.

.

## CREACIÓN DE FORMULARIO

A continuación, en ProductList.jsx vamos a crear un formulario con los campos de name, info y price:
```
return (
  <section>
    <form>

      <label htmlFor="name"> Nombre: </label><br />
      <input type="text" id="name" name="name" /><br />

      <label htmlFor="info"> Info :</label><br />
      <input type="text" id="info" name="info" /><br />

      <label htmlFor="price"> Precio: </label><br />
      <input type="number" id="price" name="price" /><br />

      <input type="submit" value="Añadir" />

    </form>
  </section>
)
```

Le añadimod el evento "onSubmit", para que cuando se envíe el formulario se ejecute "addProduct":
```
return (
  <section>
    <form onSubmit={this.addProduct}>

      <label htmlFor="name"> Nombre: </label><br />
      <input type="text" id="name" name="name" /><br />

      <label htmlFor="info"> Info :</label><br />
      <input type="text" id="info" name="info" /><br />

      <label htmlFor="price"> Precio: </label><br />
      <input type="number" id="price" name="price" /><br />

      <input type="submit" value="Añadir" />

    </form>
  </section>
)
```

Tal y como está el código ahora, saltarán los "prompt" para recoger los datos y hará un "reload" de la página (cada vez que se hace un "submit" se recarga toda la página). Por eso, hay que pararlo añadiendo a la función "addProduct" el evento "preventDefault". Entonces, pasa de esto:
```
addProduct = () => {
  const name = "Coffee bomb";
  const info = "Café con whisky y una pizca de chocolate";
  const price = "10";
  const newProduct = {name,info,price};
  this.setState({products:[newProduct,...this.state.products]})
}
```
A esto otro:
```
addProduct = (event) => {
  event.preventDefault();
  const name = "Coffee bomb";
  const info = "Café con whisky y una pizca de chocolate";
  const price = "10";
  const newProduct = {name,info,price};
  this.setState({products:[newProduct,...this.state.products]})
}
```

.

A continuación, hay que refactorizar para leer las variables introducidas por el formulario, en logar de por el "prompt". Pasamos de esto:
```
addProduct = (event) => {
  event.preventDefault();
  const name = "Coffee bomb";
  const info = "Café con whisky y una pizca de chocolate";
  const price = "10";
  const newProduct = {name,info,price};
  this.setState({products:[newProduct,...this.state.products]})
}
```
A esto otro:
```
addProduct = (event) => {
  event.preventDefault();
  const name = event.target.name.value;
  const info = event.target.info.value;
  const price = event.target.price.value;
  const newProduct = {name,info,price};
  this.setState({products:[newProduct,...this.state.products]})
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