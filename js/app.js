document.addEventListener('DOMContentLoaded', function(){
    //seleccionar los elementos de la interfaz
    
    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const sppiner = document.querySelector('#sppiner');

    
    //asignmos eventos
    inputEmail.addEventListener('input', validar);//el pñarentesis es para mandar llamar la funcion
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function(e){
        e.preventDefault();

        resetFormulario();
    })


    function enviarEmail(e){
        e.preventDefault();

        sppiner.classList.add('flex');
        sppiner.classList.remove('hidden');

        setTimeout(()=>{
        sppiner.classList.remove('flex');
        sppiner.classList.add('hidden');
        resetFormulario();

       //crear alerta
       const alertaExito = document.createElement('P');
       alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
       alertaExito.textContent = 'mensaje enviado correctamente';
       formulario.appendChild(alertaExito);
       setTimeout(()=>{
            alertaExito.remove();
       }, 3000)
        }, 3000)
    }

    function validar(e){
        if(e.target.value.trim() === ''){ //trim nos ayuda a quitar los espacios vacios
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement); //e.target.parentElement sera la refrencia
            email[e.target.name] ='';
            comprobarEmail();
            return; //detiene la ejecucion del codigo
        }

        if(e.target.id === 'email' && !validarEmail(e.target.value)){ // tomamos el input con el id de email, lo negamos con !
            mostrarAlerta(`El email no es valido`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }
        
        limpiarAlerta(e.target.parentElement);

        //aasignar los valores
        email[e.target.name] = e.target.value.trim().toLowerCase();

        //comprobar el objeto de email
        comprobarEmail();

    }

    function mostrarAlerta(mensaje, referencia){
        //comprueba si ya existe una alerta
        limpiarAlerta(referencia);

        //generar alerta en html
        const error = document.createElement('P'); //creamos un elemento
        error.textContent = mensaje; //agregamos el contenido
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');//agregamos las clases de estilos
        
        //inyectar el error al formulario html
        referencia.appendChild(error)
    }

    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector('.bg-red-600'); //va a limpiar la que dispara el evento
            if(alerta){
                alerta.remove();
            }
    }

    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)@\w+([.-]?\w+)(\.\w{2,10})+$/ //expresion regular para email en js
        const resultado = regex.test(email)
        return resultado;
    }

    function comprobarEmail(){
        if (Object.values(email).includes('')){
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
        }else{
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled = false;
        }
    }

    function resetFormulario(){
        //reseteamos elobjeto
        email.email = '';
        email.asunto = '';
        email.mensaje = '';

        formulario.reset();
        comprobarEmail(); //mas que nada para ejecutar las instrucciones de los botones
    }

});