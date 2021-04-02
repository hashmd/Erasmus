const tableNames =require('../../src/constants/tableNames');//importar tableNames
const countries= require('../../src/constants/paises');
exports.seed = async (knex) =>{
  //borra todas las entradas
  await knex(tableNames.pais).del(); 
  try{
    const paisesInertados= await knex(tableNames.pais).insert(countries, '*');
    console.log("Se han insertado los paises: ", paisesInsertados);
  }catch(error){
    console.log('no se han insertado los paises: '+error);
  }
 
};
