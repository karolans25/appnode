Hay que recordar que cierta información será vista en el navegador de 
internet de google y en el lanzador de aplicaciones para facilitar su 
identificación. (puede ver la información en chrome://extensions/ del 
navegador siempre y cuando se encuentre en el modo developer)

## Acerca de index.html ##

Para la creación de botones compatibles con los eventos de app chrome
se crearán los botones de una forma similar a la siguiente:

```
<button id="saveFile">
		<img src='./imag/diskette.gif'></button>
```

Con la información del **id** es más que suficiente para incluirla en el 
javaScript encargado de ejecutar los eventos. Como se ejemplifica a 
continuación:

```
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('saveFile').addEventListener('click', miFuncion);
});
```

Donde **saveFile** es el id del botón explicado anteriormente.
