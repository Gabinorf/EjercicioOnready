var commaNumber = require('comma-number');


/*************************************************************************
    AUTOS/MOTOS
*************************************************************************/

let vehiculos = {
    autos : [
        {
            marca : "Peugeot",
            modelo : "206",
            puertas : 4,
            precio : 200000.00
        },
        {
            marca : "Peugeot",
            modelo : "208",
            puertas : 5,
            precio : 250000.00
        }
    ],
    motos : [
        {
            marca : "Honda",
            modelo : "Titan",
            cilindrada : 125,
            precio : 60000.00
        },
        {
            marca : "Yamaha",
            modelo : "YBR",
            cilindrada : 160,
            precio : 80500.50
        }
    ]
} 


/*************************************************************************
    LISTAR TODOS
*************************************************************************/
//Función para crear la lista de vehículos, intercalando entre autos y motos.
let listarTodos = (vehiculos) => {
    let a = 1;  //Verificador, cuando "a" sea distinto de 1 deja de imprimir autos (lo mismo para "m" en el caso de motos). 
    let m = 1;

    let n = 0;  //"n" hace el barrido, incrementando su valor +1 en cada ciclo.

    //Mientras "a" o "m" sean igual a 1 quedan vehículos por listar.
    while (a==1 || m==1){
        //Si existe lo listo
        if (vehiculos.autos[n]){
            let auto = vehiculos.autos[n];
            console.log(
                "Marca: " + auto.marca +
                " // Modelo: " + auto.modelo +
                " // Puertas: " + auto.puertas +
                " // Precio: $" + commaNumber(auto.precio.toFixed(2).replace(".", ","),'.', ',')
            )
        }
        //Cuando no hay más autos cambio el valor de mi verificador "a"
        else{
            a = 0;
        }
        //IDEM para motos
        if (vehiculos.motos[n]){
            let motos = vehiculos.motos[n];
            console.log(
                "Marca: " + motos.marca +
                " // Modelo: " + motos.modelo +
                " // Cilindrada: " + motos.cilindrada + "c" +
                " // Precio: $" + commaNumber(motos.precio.toFixed(2).replace(".", ","),'.', ',')
            )
        }
        else {
            m = 0;
        }
        n++;
    }        
}


/*************************************************************************
    ORDENAR
*************************************************************************/

//Función para ordenar un "array" de vehículos teniendo en cuenta su precio de manera creciente o decreciente segun "orden"
let ordenar = (array,orden) => {
    let res = array.slice();
    //Si "orden" es igual a 1 ordena de manera decreciente 
    if (orden==1){
        //Comparo un valor con los siguientes
        for (let i=0; i<res.length; i++){
            for (let j=i+1; j<res.length; j++){
                //Al mayor valor lo pongo en la primera posición
                if(res[j].precio>=res[i].precio){
                    let mayor = res[j];
                    let menor = res[i];
                    res[i] = mayor;
                    res[j] = menor;
                }
            }
        }
        return res
    }
    //Ordena de manera creciente   
    else {
        for (let i=0; i<res.length; i++){
            for (let j=i+1; j<res.length; j++){
                //Al menor valor lo pongo en la primera posición
                if(res[j].precio<=res[i].precio){
                    let mayor = res[j];
                    let menor = res[i];
                    res[i] = mayor;
                    res[j] = menor;
                }
            }
        }
        return res
    }
}


/*************************************************************************
    BUSCAR
*************************************************************************/

//Función para buscar una letra ("texto") en un "array" 
let buscarLetra = (arrayBusqueda,texto) => {
    let res = [];
    for (let i=0; i<arrayBusqueda.length; i++){    
        let elemento = arrayBusqueda[i].modelo.toLowerCase();
        //Si encuentro la letra, guardo el objeto
        if (elemento.indexOf(texto) !== -1) {
            res.push(arrayBusqueda[i]);
        }
    }
    return res   
}  


/*************************************************************************
    EXTRA
*************************************************************************/

//Función para listar precios de mayor a menor (utilizo un array preordenado)
let listaPrecio = (array) => {
    console.log("Vehículos ordenados por precio de mayor a menor:");
    for (let i=0; i<array.length; i++){
        console.log(array[i].marca+" "+array[i].modelo);
    }
}


/*************************************************************************
    IMPRIMIR
*************************************************************************/

//Función para imprimir en consola el texto especificado
let imprimir = async () => {
    await listarTodos(vehiculos);

    console.log("\n=============================\n");

    let todos = await vehiculos.autos.concat(vehiculos.motos);  // array de todos los vehículos 
    let caro = await ordenar(todos,1);  // array de todos los vehículos ordenados de manera decreciente según su precio
    console.log("Vehículo más caro: "+caro[0].marca+" "+caro[0].modelo);
    
    let barato = await ordenar(todos,0);    // // array de todos los vehículos ordenados de manera creciente según su precio
    console.log("Vehículo más barato: "+barato[0].marca+" "+barato[0].modelo);
    
    let letra = await buscarLetra(todos,"y");   // busca la letra "y" en los modelos de vehículos y devuelve un array
    console.log("Vehículo que contiene en el modelo la letra 'Y': "+letra[0].marca+" "+letra[0].modelo+" $"+commaNumber(letra[0].precio.toFixed(2).replace(".", ","),'.', ','));

    console.log("\n=============================\n");
    
    await listaPrecio(caro);
}

//Llamo a la función
imprimir();