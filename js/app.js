document.addEventListener('DOMContentLoaded', function(){
    //seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');

    //asignmos eventos
    inputEmail.addEventListener('blur', validar);//el pñarentesis es para mandar llamar la funcion
    inputAsunto.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);

    function validar(e){
        if(e.target.value.trim() === ''){ //trim nos ayuda a quitar los espacios vacios
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`);
        }else{
            console.log('no lo esta');
        }
    }

    function mostrarAlerta(mensaje){
        //generar alerta en html
        const error = document.createElement('P') //creamos un elemento
        error.textContent = mensaje; //agregamos el contenido
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');//agregamos las clases de estilos
        
        //inyectar el error al formulario html
        formulario.appendChild(error)
    }

});