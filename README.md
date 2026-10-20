# Cotizador de Producción Audiovisual

Aplicación web estática que calcula un presupuesto estimado para servicios de **foto, video y administración de redes sociales**. Proyecto del Reto R2 del módulo *Despliegue de aplicaciones web y móviles v2* (UVEG).

## Qué hace

- Elige el tipo de video (reel, corporativo, spot, testimonial).
- Ajusta la duración (1 a 10 minutos) y las rondas de revisión (2 incluidas).
- Agrega extras: locución, subtítulos y motion graphics.
- Muestra el total y el desglose en tiempo real, en pesos mexicanos (MXN).

## Estructura

```
tuapp/
├── index.html
├── css/
│   ├── styles.css        # fuente
│   └── styles.min.css    # minificado (producción)
├── js/
│   ├── app.js            # fuente
│   └── app.min.js        # minificado (producción)
└── img/
    ├── icono-foto.png
    ├── icono-video.png
    └── icono-redes.png
```

## Cómo ejecutarlo localmente

1. Clona el repositorio.
2. Abre `index.html` en el navegador, o sírvelo con Nginx (ver abajo).

## Optimización aplicada

| Recurso | Antes | Después | Herramienta |
|---|---|---|---|
| Imágenes (3 PNG) | 269 KB | 11 KB | Pillow (redimensionado a 256 px y paleta de 128 colores) |
| CSS | 3.3 KB | 2.5 KB | clean-css-cli |
| JS | 2.5 KB | 1.6 KB | terser |

## Despliegue con Nginx (macOS)

```bash
brew install nginx
```

Ejemplo de bloque de servidor para servir la app en `http://localhost:8080/tuapp`:

```nginx
server {
    listen 8080;
    server_name localhost;

    location /tuapp/ {
        alias /ruta/a/tuapp/;
        index index.html;
    }
}
```

## Autor

Rogelio Moreno Galván · UVEG · Matrícula 24004617
