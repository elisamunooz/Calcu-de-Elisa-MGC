let operador = '';
let valorPrevio = null;
let logsErrores = [];

// Agregar número o punto decimal al campo de entrada.
function insertar(num) {
    let input = document.getElementById('input');
    if (input.value === '0' || input.value === 'Error') {
        input.value = '';
    }
    
    // Para manejar adecuadamente el punto decimal, verifica que no haya más de uno
    if (num === '.' && input.value.includes('.')) {
        return;
    }

    input.value += num;
}
// Esta función se encarga de almacenar el operador seleccionado y el valor previo ingresado:
function almacenarOperacion(op) {
    let inputValue = document.getElementById('input').value;
    if (inputValue !== '' && !isNaN(parseFloat(inputValue.replace(',', '.')))) {
        valorPrevio = parseFloat(inputValue.replace(',', '.'));
        operador = op;
        document.getElementById('input').value = ''; // Limpia el campo de entrada para el siguiente número
    } else {
        mostrarError("Por favor, ingrese un número válido antes de la operación.");
    }
}
// Esta función se encarga de realizar la operación seleccionada:
function calcularResultado() {
    let valorActual = parseFloat(document.getElementById('input').value.replace(',', '.'));
    if (valorPrevio === null || operador === '') {
        mostrarError("Por favor, seleccione una operación.");
        return;
    }

    if (isNaN(valorActual)) {
        mostrarError("Por favor, ingrese números válidos.");
        return;
    }

    let resultado;
    switch (operador) {
        case '+':
            resultado = valorPrevio + valorActual;
            rellenarInfo(resultado, 'suma');
            break;
        case '-':
            resultado = valorPrevio - valorActual;
            rellenarInfo(resultado, 'resta');
            break;
        case '*':
            resultado = valorPrevio * valorActual;
            rellenarInfo(resultado, 'multiplicacion');
            break;
        case '/':
            if (valorActual === 0) {
                mostrarError("No se puede dividir por cero.");
                rellenarInfo('error_division', 'division');
                return;
            }
            resultado = valorPrevio / valorActual;
            rellenarInfo(resultado, 'division');
            break;
        default:
            mostrarError("Operación no válida.");
            return;
    }

    document.getElementById('input').value = resultado.toString().replace('.', ',');
    operador = ''; // Resetea el operador después de la operación
    valorPrevio = null;
}

// Funci´ón para insertar una coma en el campo de entrada para el CSV:
function insertarComaCSV() {
    let input = document.getElementById('input');
    if (input.value !== '' && input.value.slice(-1) !== ',') {
        input.value += ',';
    }
}

const cuadrado = () => {
    let num = obtenerEntrada();
    if (num === null) return;
    let resultado = num * num;
    document.getElementById('input').value = resultado.toString().replace('.', ',');
    rellenarInfo(resultado, 'cuadrado');
};

const mod = () => {
    let num = obtenerEntrada();
    if (num === null) return;
    let resultado = Math.abs(num);
    document.getElementById('input').value = resultado.toString().replace('.', ',');
    rellenarInfo(resultado, 'modulo');
};

const fact = () => {
    let num = obtenerEntrada();
    if (num === null || num < 0) {
        mostrarError("Por favor, ingrese un número entero no negativo.");
        return;
    }
    let resultado = 1;
    for (let i = 2; i <= num; i++) resultado *= i;
    document.getElementById('input').value = resultado.toString().replace('.', ',');
    rellenarInfo(resultado, 'factorial');
};

// Función para calcular la raíz cuadrada de un número:
function raizCuadrada() {
    let num = obtenerEntrada();
    if (num === null) return;

    let resultado = Math.sqrt(num);
    if (num < 0) {
        mostrarError("No se puede calcular la raíz cuadrada de un número negativo.");
        rellenarInfo('error_raiz_negativa', 'raizCuadrada');
    } else {
        document.getElementById('input').value = resultado.toString().replace('.', ',');
        rellenarInfo(resultado, 'raizCuadrada', num);
    }
}

// FUnción que calcula el cubo de un número:
function elevarCubo() {
    let num = obtenerEntrada();
    if (num === null) return;

    let resultado = Math.pow(num, 3);
    document.getElementById('input').value = resultado.toString().replace('.', ',');
    rellenarInfo(resultado, 'elevarCubo');
}
// Función que calcula la potencia de un número:
function elevarPotencia() {
    let num = obtenerEntrada();
    if (num === null) return;

    let potencia = parseFloat(document.getElementById('input-potencia').value);
    if (isNaN(potencia)) {
        mostrarError("Por favor, ingrese una potencia válida.");
        return;
    }

    let resultado = Math.pow(num, potencia);
    document.getElementById('input').value = resultado.toString().replace('.', ',');
    rellenarInfo(resultado, 'elevarPotencia');
}

// Funciones de operaciones extras:
// Función para calcular el logaritmo decimal de un número
const logaritmo = () => {
    let num = obtenerEntrada();
    if (num === null) return;

    if (num <= 0) {
        mostrarError("No se puede calcular el logaritmo de un número menor o igual a cero.");
        return;
    }

    let resultado = Math.log10(num);
    document.getElementById('input').value = resultado.toFixed(2).replace('.', ',');
    rellenarInfo(resultado, 'logaritmo');
};

// Función para calcular el logaritmo natural de un número
const logaritmoNeperiano = () => {
    let num = obtenerEntrada();
    if (num === null) return;

    if (num <= 0) {
        mostrarError("No se puede calcular el logaritmo natural de un número menor o igual a cero.");
        return;
    }

    let resultado = Math.log(num);
    document.getElementById('input').value = resultado.toFixed(2).replace('.', ',');
    rellenarInfo(resultado, 'logaritmoNeperiano');
};


// FUNCIONES CSV:
// Función para validar listas CSV y números:
const validarCSV = (lista) => {
    let valores = lista.split(',').map(v => v.trim()).filter(v => v !== '');
    if (valores.length === 0 || valores.some(isNaN)) {
        mostrarError("Lista CSV inválida. Por favor, ingrese números válidos separados por comas.");
        return false;
    }
    return valores.map(v => parseFloat(v.replace(',', '.')));
};

// Función para calcular la media de una lista de números en formato CSV
function calcularMediaCSV() {
    let input = document.getElementById('input').value;
    let valores = validarCSV(input);
    if (!valores) return;

    let suma = valores.reduce((acc, val) => acc + val, 0);
    let media = suma / valores.length;
    document.getElementById('input').value = media.toFixed(2).replace('.', ',');
    rellenarInfo(media, 'mediaCSV');
}

// Función que calcula la suma de una lista de números en formato CSV
function sumatorio() {
    let input = document.getElementById('input').value;
    let valores = validarCSV(input);
    if (!valores) return;

    let suma = valores.reduce((acc, val) => acc + val, 0);
    document.getElementById('input').value = suma.toString().replace('.', ',');
    rellenarInfo(suma, 'sumatorio');
}

// Función para ordenar una lista de números en formato CSV
function ordenarCSV() {
    let input = document.getElementById('input').value;
    let valores = validarCSV(input);
    if (!valores) return;

    valores.sort((a, b) => a - b);
    document.getElementById('input').value = valores.map(v => v.toString().replace('.', ',')).join(', ');
    rellenarInfo(valores, 'ordenarCSV');
}

// Función para revertir una lista de números en formato CSV
function revertirCSV() {
    let input = document.getElementById('input').value;
    let valores = validarCSV(input);
    if (!valores) return;

    valores.reverse();
    document.getElementById('input').value = valores.join(', ');
    rellenarInfo(valores, 'revertirCSV');
}

// Función para quitar un elemento específico de una lista de números en formato CSV
function quitarElementoCSV() {
    let input = document.getElementById('input').value;
    let valores = validarCSV(input);
    if (!valores) return;

    let elementoAEliminar = prompt("Ingrese el valor que desea eliminar de la lista:");
    if (elementoAEliminar === null || elementoAEliminar.trim() === '') {
        mostrarError("Valor no ingresado o inválido.");
        return;
    }

    let indice = valores.indexOf(parseFloat(elementoAEliminar));
    if (indice === -1) {
        mostrarError("El valor ingresado no se encuentra en la lista.");
        return;
    }

    valores.splice(indice, 1);
    document.getElementById('input').value = valores.join(', ');
    rellenarInfo(valores, 'quitarElementoCSV');
}

// Función para validar y obtener el número ingresado en el campo de entrada:
function obtenerEntrada() {
    let input = document.getElementById('input').value;
    let num = parseFloat(input.replace(',', '.'));
    if (isNaN(num)) {
        mostrarError("Por favor, ingrese un número válido.");
        return null;
    }
    return num;
}

// Más funciones: 
// Esta función es el campo informativo que se muestra en la parte superior de la calculadora:
function rellenarInfo(resultado, operacion, valorOriginal) {
    let info = document.getElementById('info');
    let mensaje = "Info: ";

    if (operacion === 'suma') {
        if (resultado < 100) {
            mensaje += "Operación: Suma. Resultado menor que 100";
        } else if (resultado <= 200) {
            mensaje += "Operación: Suma. Resultado entre 100 y 200";
        } else {
            mensaje += "Operación: Suma. Resultado superior a 200";
        }
    } else if (operacion === 'cuadrado' || operacion === 'elevarCubo' || operacion === 'elevarPotencia') {
        if (resultado < 100) {
            mensaje += "El resultado es menor que 100";
        } else if (resultado <= 200) {
            mensaje += "El resultado está entre 100 y 200";
        } else {
            mensaje += "El resultado es superior a 200";
        }
    } else if (operacion === 'raizCuadrada') {
        if (valorOriginal < 0) {
            mensaje += "Error: El número es negativo. No se puede calcular la raíz cuadrada de un número negativo.";
        } else {
            mensaje += "El resultado de la raíz cuadrada es " + (resultado < 0 ? "negativo" : "positivo");
        }
    } else if (operacion === 'logaritmo') {
        mensaje += `El resultado del logaritmo decimal es ${resultado >= 0 ? "positivo" : "negativo"}.`;
    } else if (operacion === 'logaritmoNeperiano') {
        mensaje += `El resultado del logaritmo natural es ${resultado >= 0 ? "positivo" : "negativo"}.`;
    } else if (operacion === 'modulo') {
        mensaje += `El valor original era ${valorOriginal >= 0 ? "positivo" : "negativo"}, el módulo es ${resultado}.`;
    } else if (operacion === 'sumatorio' || operacion === 'mediaCSV' || operacion === 'ordenarCSV' || operacion === 'revertirCSV' || operacion === 'quitarElementoCSV') {
        mensaje += "Lista de valores procesada";
    } else if (operacion === 'division' && resultado === 'error_division') {
        mensaje += "Error: No se puede dividir por cero";
    } else if (operacion === 'csvInvalido') {
        mensaje += "Error: Lista CSV inválida. Por favor, ingrese valores numéricos válidos.";
    } else {
        mensaje += `Operación: ${operacion}`;
    }

    info.textContent = mensaje;
}

// Función para mostrar un mensaje de error en la parte superior de la calculadora:
const mostrarError = (mensaje) => {
    let errorDiv = document.getElementById('error');
    errorDiv.textContent = mensaje;
    logsErrores.push({ mensaje: mensaje, fecha: new Date().toLocaleString() });
    setTimeout(() => errorDiv.textContent = '', 3000);
};

// Función para descargar los logs de errores
const descargarLogsErrores = () => {
    let contenido = "Errores cometidos:\n\n";
    logsErrores.forEach(log => {
        contenido += `[${log.fecha}] ${log.mensaje}\n`;
    });

    let blob = new Blob([contenido], { type: 'text/plain' });
    let enlace = document.createElement('a');
    enlace.href = URL.createObjectURL(blob);
    enlace.download = 'logs_errores.txt';
    enlace.click();
};

// Función para limpiar el campo de entrada y la información mostrada:
function limpiar() {
    document.getElementById('input').value = '0';
    document.getElementById('info').textContent = 'Info sobre el número';
    document.getElementById('error').textContent = '';
}
// Función para manejar los eventos de teclado:
document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (!isNaN(key)) {
        insertar(key);
    } else if (key === '.') {
        insertar('.');
    } else if (key === '+') {
        almacenarOperacion('+');
    } else if (key === '-') {
        almacenarOperacion('-');
    } else if (key === '*') {
        almacenarOperacion('*');
    } else if (key === '/') {
        almacenarOperacion('/');
    } else if (key === 'Enter' || key === '=') {
        calcularResultado();
    } else if (key === 'Backspace') {
        borrarUltimoCaracter();
    } else if (key === 'Escape') {
        limpiar();
    }
});

// Función para borrar el último carácter ingresado
function borrarUltimoCaracter() {
    let input = document.getElementById('input');
    input.value = input.value.slice(0, -1);
}

