const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    return new Promise( (resolve, reject) => {
        let data = JSON.stringify(listadoPorHacer);
        fs.writeFile('./db/data.json',data,(err) => {
            if(err) {
                reject(err);    
            } else {
                resolve('archivo guardado con exito');
            }
        })
    })
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json'); 
    } catch (error) {
        listadoPorHacer = [];    
    }
    
}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex( tarea => {
        return tarea.descripcion === descripcion;
    });

    if( index >= 0 ) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();

    let resultado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion;
    });

    if( resultado.length < listadoPorHacer.length ) {
        listadoPorHacer = resultado;
        guardarDB();
        return true;
    }

    return false;
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}