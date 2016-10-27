Se ha modificado los archivos correspondientes para darle soporte a lua 
en el editor de código.

## Acerca del manifest.json ##

```
{
		"name": "LuaBot",
		"version": "0.1",
		"manifest_version": 2,
		"description": "IDE para esp8266 y nodeMCU",
		"app": {
			"background": {
				"scripts": ["app/background.js"]
			}
		},
		"permissions":	[
				"serial"
		]
}
```

El archivo manifest.json ( Manifiestro de notación de objetos en javaScript)
debe estar incluido para que app de google-chrome
pueda ejecutar el programa.

name: Nombre de la aplicación.
version: Versión de la aplicación.
manifest_version: Necesariamente debe ser 2.
description: Descripción de lo que hace la aplicación.
app: Permite que la extensión de chrome sea ejecutada como un app
background: debe mencionar el script donde se encuentra la información
	pertinente donde será montada la página principal.


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
