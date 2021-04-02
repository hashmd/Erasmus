const tableNames =require('../../src/constants/tableNames'); //importar tableNames
const ciudades= require('../../src/constants/ciudades');
exports.seed = async (knex) =>{
  //borra todas las entradas
  await knex(tableNames.ciudad).del();
  try{
/*
    const objCiudad = [];
    for(index in ciudades){
      objCiudad.push({
        "codigo_pais": ciudades[index].country,
        "nombre": ciudades[index].name
      })
    }
    console.log(objCiudad);
    */
  const cityInsertadas = await knex(tableNames.ciudad).insert(ciudades,'codigo_pais', 'nombre');
  }catch(error){
    console.log('no se han insertado las ciudades: '+error);
  }
};