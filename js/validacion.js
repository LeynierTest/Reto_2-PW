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

function marcarCampo(campo, elementoError, mensaje) {
    campo.classList.remove("input-error", "input-ok");
    elementoError.textContent = "";

    if (mensaje !== "") {
        elementoError.textContent = mensaje;
        campo.classList.add("input-error");
        return false;
    }

    campo.classList.add("input-ok");
    return true;
}

function validarNombre() {
    const valor = nombre.value.trim();

    if (valor === "") {
        return marcarCampo(
            nombre,
            errorNombre,
            "El nombre no puede estar vacío."
        );
    }

    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/.test(valor)) {
        return marcarCampo(
            nombre,
            errorNombre,
            "El nombre solo debe contener letras."
        );
    }

    return marcarCampo(nombre, errorNombre, "");
}

function validarCI() {
    const valor = ci.value.trim();

    if (valor === "") {
        return marcarCampo(
            ci,
            errorCi,
            "El CI es obligatorio."
        );
    }

    if (!/^[0-9]+$/.test(valor)) {
        return marcarCampo(
            ci,
            errorCi,
            "El CI solo debe contener números."
        );
    }

    if (valor.length < 11) {
        return marcarCampo(
            ci,
            errorCi,
            "El CI debe tener como mínimo 11 caracteres."
        );
    }

    return marcarCampo(ci, errorCi, "");
}

function validarPassword() {
    if (password.value === "") {
        return marcarCampo(
            password,
            errorPassword,
            "La contraseña no puede estar vacía."
        );
    }

    return marcarCampo(password, errorPassword, "");
}

function validarConfirmacion() {
    if (confirmacion.value === "") {
        return marcarCampo(
            confirmacion,
            errorConfirmacion,
            "Debe confirmar la contraseña."
        );
    }

    if (confirmacion.value !== password.value) {
        return marcarCampo(
            confirmacion,
            errorConfirmacion,
            "Las contraseñas deben ser iguales."
        );
    }

    return marcarCampo(confirmacion, errorConfirmacion, "");
}

nombre.addEventListener("input", function() {
    validarNombre();
    mensajeGeneral.textContent = "";
    mensajeGeneral.className = "";
});

nombre.addEventListener("blur", validarNombre);

ci.addEventListener("input", function() {
    validarCI();
    mensajeGeneral.textContent = "";
    mensajeGeneral.className = "";
});

ci.addEventListener("blur", validarCI);

password.addEventListener("input", function() {
    validarPassword();

    if (confirmacion.value !== "") {
        validarConfirmacion();
    }

    mensajeGeneral.textContent = "";
    mensajeGeneral.className = "";
});

password.addEventListener("blur", validarPassword);

confirmacion.addEventListener("input", function() {
    validarConfirmacion();
    mensajeGeneral.textContent = "";
    mensajeGeneral.className = "";
});

confirmacion.addEventListener("blur", validarConfirmacion);

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
