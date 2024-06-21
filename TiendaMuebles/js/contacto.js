document.addEventListener('DOMContentLoaded', ()=>{

    //Atributos para la validacion
    const nombre = document.querySelector('#nombre')
    const asunto = document.querySelector('#asunto')
    const email = document.querySelector('#email')
    const telefono = document.querySelector('#telefono')
    const mensaje = document.querySelector('#mensaje');
    const btnEnviar = document.querySelector('.btnEnviar');
    const formulario = document.querySelector('#formulario');

    //Objeto
    const contacto = {
        nombre: '',
        asunto: '',
        email: '',
        telefono: '',
        mensaje: ''
    }

    //Eventos
    nombre.addEventListener('blur', validarCampo);
    asunto.addEventListener('blur', validarCampo);
    email.addEventListener('blur', validarCampo);
    telefono.addEventListener('blur', validarCampo);
    mensaje.addEventListener('blur', validarCampo);
    btnEnviar.addEventListener('click', (e)=>{
        e.preventDefault();

        const spinner = document.querySelector('.spinner');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.add('hidden');
            formulario.reset();

            //Mostrar mensaje de envio exitoso
            exito = document.createElement('P');
            exito.textContent = 'formulario enviado exitosamente';
            exito.classList.add('bg-green-500', 'text-white', 'p-3', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            formulario.appendChild(exito);

            //Eliminar el mensaje despues de 2 segundos
            setTimeout(() => {
                formulario.removeChild(exito)
            }, 2000);

        }, 3000);


    });

    //Validar si los campos no estan vacios y si cumplen las condiciones
    function validarCampo(e){
        const mensaje = `El campo ${e.target.id} es obligatorio`;
        const referencia = e.target.parentElement.parentElement;
        //Valida que el campo no este vacio
        if(e.target.value.trim() === ''){
            mostrarAlerta(mensaje, referencia);
            contacto[e.target.name] = '';
            comprobarFormulario(contacto);
            return;
        }
        //valida que el campo contenga un valor correspondiente con un email
        if(!validarEmail(e.target.value) && e.target.id === 'email'){
            mostrarAlerta('Ingrese un Email valido', referencia);
            contacto[e.target.name] = '';
            comprobarFormulario(contacto);
            return;
        }
        //valida que el campo contenga un valor correspondiente con un telefono
        if(!validarCelular(e.target.value) && e.target.id === 'telefono'){
            mostrarAlerta('Ingrese un numero de Teléfono válido', referencia)
            return;
        }
        //Limpie la alerta
        limpiarAlerta(referencia);
        
        //Llenando el objeto
        contacto[e.target.name] = e.target.value.trim().toLowerCase();
        comprobarFormulario(contacto);

        console.log(contacto)
        
    }
    function mostrarAlerta(mensaje, referencia){

        limpiarAlerta(referencia);
        //Creando un elemento que nos muestre el mensaje de error
        error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'rounded-lg', 'p-2', 'text-white', 'alerta', 'text-center');
        referencia.appendChild(error);
    }
    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector('.alerta')
        if(alerta !== null){
            alerta.remove()
        }
        
    }
    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const resultado = regex.test(email);
        return resultado;
    }
    function validarCelular(celular){
        const regex = /(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})/g
        const resultado = regex.test(celular);
        return resultado;
    }
    function comprobarFormulario(contacto){
        if(Object.values(contacto).includes('')){
            btnEnviar.classList.add('opacity-50');
            btnEnviar.classList.remove('cursor');
            btnEnviar.disabled = true;
            return;
        }
        btnEnviar.classList.remove('opacity-50');
        btnEnviar.classList.add('cursor');
        btnEnviar.disabled = false;
    }











})



















































































