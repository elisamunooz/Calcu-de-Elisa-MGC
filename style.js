/* Estilo general */
.custom-title {
    font-family: 'Merriweather', serif;
}
h1 {
    font-family: 'Merriweather', serif;
}
body {
    background-color: #f4ccaa;
    font-family: Arial, sans-serif;
}

/* Añadir una foto de fondo para la calculadora */
body {
    background-image: url('fondo.png');
    background-size: cover; /* Hace que la imagen cubra toda la pantalla */
    background-position: center; /* Centra la imagen */
    background-repeat: no-repeat; /* Evita que la imagen se repita */
}

/* Estilo para el contenedor principal */
.card {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    overflow: hidden;
}
/* Estilo para el cuerpo del contenedor */
.card-body {
    padding: 2rem;
}
/* Estilo para el título */
h1 {
    color: #fcc578;
    font-weight: bold;
}
/* Estilo para los subtítulos */
input[type="text"] {
    font-size: 1.5rem;
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #ced4da;
}

/* Estilo para los botones */
button {
    font-size: 1.25rem;
    padding: 1rem;
    transition: background-color 0.3s, box-shadow 0.3s;
}

/* Efecto de sombra al pasar el ratón por encima */
button:hover {
    box-shadow: 0 0 15px rgba(0, 123, 255, 0.5);
}

button:focus, button:active {
    box-shadow: 0 0 10px #007bff;
    outline: none;
}

/* Estilo específico para los botones de diferentes tipos */
.btn-secondary {
    background-color: #6c757d;
    color: #ffffff;
}

.btn-primary {
    background-color: #007bff;
    color: #ffffff;
}

.btn-info {
    background-color: #17a2b8;
    color: #ffffff;
}

.btn-warning {
    background-color: #f1c447;
    color: #ffffff;
}

.btn-danger {
    background-color: #dc3545;
    color: #ffffff;
}

/* Animación de carga para operaciones complejas: círculo azul que gira*/
.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30px;
    height: 30px;
    border: 4px solid #007bff;
    border-radius: 50%;
    border-top-color: transparent;
    animation: spin 1s linear infinite;
    transform: translate(-50%, -50%);
}
/* Animación de rotación */
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Estilo para mejorar la accesibilidad */
button:focus-visible {
    outline: 2px solid #007bff;
}

/* Ajuste de tamaño de los botones en pantallas pequeñas */
@media (max-width: 576px) {
    button {
        font-size: 1rem;
        padding: 0.75rem;
    }

    input[type="text"] {
        font-size: 1.25rem;
    }
}

/* Ajuste para el campo informativo */
#info {
    font-size: 1.25rem;
    margin-top: 1rem;
    color: #495057;
}

/* Estilo para el mensaje de error */
#error {
    font-weight: bold;
    color: #dc3545;
    margin-top: 1rem;
}

/* Estilo adicional para el campo informativo grande */
.grande {
    font-size: 1.5em;
}

/* Resaltar botón al recibir foco */
button:focus {
    outline: none;
    background-color: #ddd;
}

/* Estilo específico para el botón de coma CSV */
.btn-csv {
    background-color:  #f1c447;
    color: #ffffff;
}
