const formulario = document.getElementById("formularioRegistro");

const nombre = document.getElementById("nombre");
const ci = document.getElementById("ci");
const password = document.getElementById("password");
const confirmacion = document.getElementById("confirmacion");

const errorNombre = document.getElementById("errorNombre");
const errorCi = document.getElementById("errorCi");
const errorPassword = document.getElementById("errorPassword");
const errorConfirmacion = document.getElementById("errorConfirmacion");

const mensajeGeneral = document.getElementById("mensajeGeneral");


function limpiarErrores() {
    errorNombre.textContent = "";
    errorCi.textContent = "";
    errorPassword.textContent = "";
    errorConfirmacion.textContent = "";
    mensajeGeneral.textContent = "";
    mensajeGeneral.className = "";

    nombre.classList.remove("input-error", "input-ok");
    ci.classList.remove("input-error", "input-ok");
    password.classList.remove("input-error", "input-ok");
    confirmacion.classList.remove("input-error", "input-ok");
}


function validarNombre() {
    if (nombre.value.trim() === "") {
        errorNombre.textContent = "El nombre no puede estar vacío.";
        nombre.classList.add("input-error");
        return false;
    }

    nombre.classList.add("input-ok");
    return true;
}


function validarCI() {
    const valor = ci.value.trim();

    if (valor === "") {
        errorCi.textContent = "El CI es obligatorio.";
        ci.classList.add("input-error");
        return false;
    }

    if (!/^[0-9]+$/.test(valor)) {
        errorCi.textContent = "El CI solo debe contener números.";
        ci.classList.add("input-error");
        return false;
    }

    if (valor.length < 11) {
        errorCi.textContent = "El CI debe tener como mínimo 11 caracteres.";
        ci.classList.add("input-error");
        return false;
    }

    ci.classList.add("input-ok");
    return true;
}


function validarPassword() {
    if (password.value === "") {
        errorPassword.textContent = "La contraseña no puede estar vacía.";
        password.classList.add("input-error");
        return false;
    }

    password.classList.add("input-ok");
    return true;
}


function validarConfirmacion() {
    if (confirmacion.value === "") {
        errorConfirmacion.textContent =
            "Debe confirmar la contraseña.";
        confirmacion.classList.add("input-error");
        return false;
    }

    if (confirmacion.value !== password.value) {
        errorConfirmacion.textContent =
            "Las contraseñas deben ser iguales.";
        confirmacion.classList.add("input-error");
        return false;
    }

    confirmacion.classList.add("input-ok");
    return true;
}


formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    limpiarErrores();

    const nombreValido = validarNombre();
    const ciValido = validarCI();
    const passwordValida = validarPassword();
    const confirmacionValida = validarConfirmacion();

    if (
        nombreValido &&
        ciValido &&
        passwordValida &&
        confirmacionValida
    ) {
        mensajeGeneral.textContent =
            "Datos válidos. Registro realizado correctamente.";
        mensajeGeneral.className = "exito";
    } else {
        mensajeGeneral.textContent =
            "Revise los campos indicados.";
        mensajeGeneral.className = "fallo";
    }
});


formulario.addEventListener("reset", function() {
    limpiarErrores();
});


