# Instalación personal en GitHub Pages

Sube solo el contenido de esta carpeta a tu repositorio. No subas los mockups o ZIP anteriores: contienen datos personales. Esta versión comienza sin nombre, documento, código ni placa.

1. En GitHub crea un repositorio y sube estos archivos en su raíz: index.html, app.js, editor.css, sw.js, manifest.webmanifest, icon.png, icon-192.png, UD.jpg y .nojekyll.
2. En Settings → Pages, elige Deploy from a branch, rama main y carpeta / (root). Guarda y espera a que GitHub muestre la URL HTTPS.
3. Abre esa URL en el celular, espera a que cargue completamente y usa el menú del navegador para instalar/agregar a inicio. En iPhone utiliza Safari → Compartir → Agregar a pantalla de inicio.
4. Abre desde el icono. Mantén presionado el logo superior durante tres segundos para editar. Por teclado: enfoca el logo con Tab y pulsa Enter.

Los datos se guardan exclusivamente en el navegador de ese dispositivo. No se sincronizan. Borrar los datos del sitio puede eliminarlos. El gesto discreto no es una contraseña ni control de acceso.

La primera carga necesita internet. El modo sin conexión funciona después de que el service worker haya terminado de guardar los recursos. Las imágenes y el código permanecen públicos en GitHub Pages; el perfil introducido no se incluye en el repositorio.

Para actualizar recursos cambia también v2 por v3 (y así sucesivamente) en sw.js. Cierra todas las ventanas de esta app y vuelve a abrirla para activar la actualización.

Esta es una maqueta personal, no está conectada a los registros de la universidad. Los controles Mi QR, Descargar carnet, Historial y Subir foto conservan su apariencia y no implementan esas funciones.
