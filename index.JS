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
            puertas : 160,
            precio : 80500.50
        }
    ]
} 


/*************************************************************************
    LISTAR TODOS
*************************************************************************/

let listarTodos = (vehiculos) => {
    let a = 1;
    let m = 1;
    let n = 0; 
    while (a==1 || m==1){
        if (vehiculos.autos[n]){
            let autos = vehiculos.autos[n];
            console.log(
                "Marca: " + autos.marca +
                " // Modelo: " + autos.modelo +
                " // Puertas: " + autos.puertas +
                " // Precio: $" + autos.precio.toFixed(2)
            )
        }
        else{
            a = 0;
        }
        if (vehiculos.motos[n]){
            let motos = vehiculos.motos[n];
            console.log(
                "Marca: " + motos.marca +
                " // Modelo: " + motos.modelo +
                " // Cilindrada: " + motos.cilindrada + "c" +
                " // Precio: $" + motos.precio.toFixed(2)
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

let ordenar = (array,orden) => {
    let res = array.slice();
    //res.concat(array);
    if (orden==1){
        for (let i=0; i<res.length; i++){
            for (let j=i+1; j<res.length; j++){
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
    else {
        for (let i=0; i<res.length; i++){
            for (let j=i+1; j<res.length; j++){
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

let buscarLetra = (arrayBusqueda,texto) => {
    let res = [];
    for (let i=0; i<arrayBusqueda.length; i++){    
        let elemento = arrayBusqueda[i].modelo.toLowerCase();
        if (elemento.indexOf(texto) !== -1) {
            res.push(arrayBusqueda[i]);
        }
    }
    return res   
}  


/*************************************************************************
    EXTRA
*************************************************************************/

let listaPrecio = (array) => {
    console.log("Vehículos ordenados por precio de mayor a menor:");
    for (let i=0; i<array.length; i++){
        console.log(array[i].marca+" "+array[i].modelo);
    }
}


/*************************************************************************
    IMPRIMIR
*************************************************************************/

let imprimir = async () => {
    await listarTodos(vehiculos);

    console.log("\n=============================\n");

    let todos = vehiculos.autos.concat(vehiculos.motos);
    let caro = await ordenar(todos,1);
    console.log("Vehículo más caro: "+caro[0].marca+" "+caro[0].modelo);
    
    let barato = await ordenar(todos,0);
    console.log("Vehículo más barato: "+barato[0].marca+" "+barato[0].modelo);
    
    let letra = await buscarLetra(todos,"y");
    console.log("Vehículo que contiene la letra 'Y': "+letra[0].marca+" "+letra[0].modelo+" $"+letra[0].precio.toFixed(2));

    console.log("\n=============================\n");
    
    await listaPrecio(caro);
}

imprimir();