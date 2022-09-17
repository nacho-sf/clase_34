# Teoría clase_34

## Guardar propuedades de componentes en un objeto:

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
const data = [
    {name:"Tigre de Bengala", info:"Botella Moet con Bengala", price:20},
    {name:"Corona party", info:"Cubo de 5 coronitas", price:10},
    {info:"Botella de absenta con agua", price:40,}
]

return (
    <section>
        <ProductItem data={data[0]}/>
        <ProductItem data={data[1]}/>
        <ProductItem data={data[2]}/>
    </section>
)
```

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




## Métodos de comunicación entre componentes padre a hijo:

### PROPS:

- Se ENVÍA en ProductList.jsx mediante la declaración de propiedades dentro de cada uno de los componentes hijos ("<ProductItem prop1={dato1} prop2={dato2} />")

-Se RECIBE en ProductItem.jsx mediante una declaración de llamada a cada una de las propiedades que se reciban (<h3>{this.props.prop1}</h3>...//... <p>{this.props.prop2}</p>)


### STATE:

Es un atributo de la clase que se usa para guardar estados de variables.

- Se CREA en ProductItem.jsx un constructor ("rconst") y se declaran los estados de variables dentro de "this.state":
(this.state = { name1:"estado1", name2:"estado2" })

También se pueden guardar props dentro de state:
(this.state = { name1:this.props.name1, name2:this.props.name2 })


- Se RECIBE en ProductItem.jsx mediante una declaración de llamada a cada una de los estados que se hayan declarado dentro de "this.state" (<h3>{this.state.name1}</h3>...//... <p>{this.state.name2}</p>)




//////// MANEJO DE FORMULARIO:

Tendremos un formulario con:

-Un input para indroducir valor o referenciarlo

-Otro input como boton para envial (type submit)

-Una función en form -> onSubmit, se ejecute la función "handleSubmit" (control del evento submit)





/////// MANEJO DE ENVÍOS

/////// REFERENCIAS

Permite trabajar como cuando se usan selectores, pero sin usar selectores


/////// ENRUTADO ENTRE PÁGINAS CON REACT