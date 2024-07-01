// Lista de usuarios
const usuariosValidos = [
    { usuario: 'dpalga', contrasenia: 'dpalga' },
    { usuario: 'genesyscloud', contrasenia: 'genesyscloud' },
    { usuario: 'econtactpe', contrasenia: 'econtactpe' }
];

// Función para mostrar alertas
const desplegarAlerta = (mensaje, tipoAlerta) => {
    const mensajeAlerta = document.getElementById('alertMessage');
    const textoAlerta = document.getElementById('alertText');

    textoAlerta.textContent = mensaje;
    mensajeAlerta.classList.add('show', tipoAlerta);

};

// Función para resetear estilos y mensajes de error
const resetForm = () => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.style.border = '';
    });
    document.querySelectorAll('.error-message').forEach(span => span.textContent = '');
    const mensajeAlerta = document.getElementById('alertMessage');
    mensajeAlerta.classList.remove('show', 'alert-warning', 'alert-danger', 'alert-success');
};

// Función para limpiar el formulario y los mensajes
const clearForm = () => {
    resetForm();
    document.getElementById('loginForm').reset();
};

// Función para validar el formulario
const validaForm = (event) => {
    event.preventDefault();

    // Resetear estilos y mensajes de error
    resetForm();

    // Obtener valores de usuario y contraseña

    const usuarioInput = document.getElementById('usuario');
    const contraseniaInput = document.getElementById('contrasenia');
    const usuario = usuarioInput.value.trim();
    const contrasenia = contraseniaInput.value.trim();

    let formIsValid = true;

    // Validar el usuario
    if (usuario === '') {
        usuarioInput.style.border = '2px solid red';
        document.getElementById('usuarioError').textContent = 'Por favor, ingrese un usuario.';
        formIsValid = false;
    }

    // Validar la contraseña
    if (contrasenia === '') {
        contraseniaInput.style.border = '2px solid red';
        document.getElementById('contraseniaError').textContent = 'Por favor, ingrese su contraseña.';
        formIsValid = false;
    }

    // Validar si ambos campos están vacíos
    if (!formIsValid) {
        desplegarAlerta('Por favor, complete los campos requeridos.', 'alert-danger');
        return;
    }

    // Validar credenciales
    const usuarioAutenticado = usuariosValidos.find(user => user.usuario === usuario && user.contrasenia === contrasenia);

    if (usuarioAutenticado) {
        desplegarAlerta(`Sesión iniciada para ${usuarioAutenticado.usuario}.`, 'alert-success');
    } else {
        desplegarAlerta('Credenciales incorrectas.', 'alert-danger');
    }
};

document.getElementById('loginForm').addEventListener('submit', validaForm);
document.getElementById('clearBtn').addEventListener('click', clearForm);