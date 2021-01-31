
//añadimos un minidelay para que de tiempo a renderizar el html
//despues del renderizado mostrale el menu de opciones
setTimeout(function () 
{
    main_menu();

}, 1000)


//funcion donde mostramos un pequeño menu
//opcion 1- consulta del dni
//opcion 2- salir del menu
function main_menu() 
{

    let opcioncorrecta = false;
    let seleccion_menu = "";

    while (opcioncorrecta === false) 
    {

        seleccion_menu = String(prompt(`HOLA! BIENVENIDO.\n\nOPCIONES DEL MENU:\n
        1) CONSULTAR LETRA DNI
        2) SALIR
    
SELECCIONE UNA OPCION DEL MENU [ 1 / 2 ]:
        `));

        switch (seleccion_menu) 
        {
            case "1":
            case "2":
                opcioncorrecta = true;
                break;
            default:
                //repetimos bucle
                break;
        }
    }

    if (seleccion_menu === "2")
    {
        console.log("Hasta Luego! Gracias por venir!")
        return;
    }

    if (seleccion_menu === "1")
    {
        consultarletradni();
    }



}


//funcion que es llamada desde main_menu
//dentro de esta funcion pedimos al usuario que introduzca los digitos de su dni
//comprobamos los datos sean correctos y mostramos la informacion
//ademas pedimos al usuario que si quiere repetir la consulta
function consultarletradni()
{

    //letras que segun el resto mostraremos el resultado
    const letrasdni = [
        "T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E"
    ];

    //funcion comprobar_dni realiza la funcion de pedir al usuario el dni
    //sanizar que el dni tenga una longitud de 8 y no contenga caracteres ilegales
    let dniintroducido = comprobar_dni();

    //nucleo de la funcionalidad
    const resto = dniintroducido % letrasdni.length;
    const dnicompleto = "EL DNI COMPLETO ES: " + dniintroducido + "-" + letrasdni[resto];

    //preguntamos si queremos repetir la consulta
    //nos devuelva un string s o n
    let repetir = repetir_consulta(dnicompleto);
    
    switch(repetir)
    {
        case "s": consultarletradni(); return;
        case "n": main_menu(); return;
        default:
        break;


    }


}

function comprobar_dni()
{

    let dnicorrecto = false;
    let dniintroducido = "";
    let mensajeerror = "";

    while (dnicorrecto === false) 
    {
        //pedimso los digitos del dni
        dniintroducido = String(prompt(mensajeerror + "INTRODUCE LOS DIGITOS DEL DNI:"));

        //comprobamos la longitud del string. Como maximo 8 caracteres
        //NO se si hay dnis menores de 8 digitos
        if (dniintroducido.length != 8) 
        {
            //mensaje de error para que el usuario puede interpretar porque esta fallando
            mensajeerror = "ALERTA!!!\nNO TIENE 8 DIGITOS\n";
            continue;
        }

        //comprobamos que no hay un . o una ,
        let existe_punto = false;
        for (let i = 0; i < dniintroducido.length; i++)
        {
            if (dniintroducido[i] === "." || dniintroducido[i] === ",")
            {
                existe_punto = true;
                break;
            }

        }

        //SI existe el punto y introducimos un mensjae de error
        //continuamos el bucle
        if (existe_punto === true)
        {
            mensajeerror = "ALERTA!!!\nNO DEBE EXISTIR UN PUNTO O UNA COMA\n";
            continue;
        }

        //Convertimos el dni a numero. Si no es un numero continua dentro del bucle
        dniintroducido = dniintroducido - 0;

        //Comprobamos que no sea un NO NUMERICO = NO NAN = Numerico
        if (isNaN(dniintroducido) == false)
        {
            dnicorrecto = true;
        }
        else
        {
            //mensaje de error para que el usuario puede interpretar porque esta fallando
            mensajeerror = "ALERTA!!!\nNO ES UN NUMERO VALIDO\n";
        }


    }

    //devolvemos el dniintroducido
    //en teoria esta sanizado
    return dniintroducido;

}

//funcion llamada desde consultarletradni
//realiza la funcion de si queremos volver a repetir la consulta de dni
//devolvemos un string s/n
function repetir_consulta(dnicompleto)
{

    let opcioncorrecta = false;
    let volver = "";
    while (opcioncorrecta === false) 
    {
        volver = String(prompt(dnicompleto +"\n\n¿DESEA VOLVER A REPETIR LA CONSULTA? (s / n)")).toLowerCase();
        if (volver === "s" || volver === "n") 
        {
            opcioncorrecta = true;
        }

    }

    return volver;

}

