# MathJax #

MathJax permite escribir en forma matemática como lo haría en LaTex.

Para que pueda hacerse uso de manera **OffLine** se debe descargar el paquete
desde aquí:

```
$ wget http://cdn.mathjax.org/mathjax/latest/MathJax.js
```

En restructuretex debe ser cargado manualmente en _static

```
$ cp MathJax/MathJax.js build/html/_static/
```

En el archivo confg.py agregar la siguiente línea:

```
## Dirección MathJax ##
mathjax_path = 'MathJax/MathJax.js'
```
END
