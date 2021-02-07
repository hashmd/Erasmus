const tableNames =require('../../src/constants/tableNames');//importar tableNames
const countries= require('../../src/constants/paises');
exports.seed = async (knex) =>{
  await knex(tableNames.pais).del();
  try{
  const paisesInertados= await knex(tableNames.pais).insert(countries, '*');
  }catch(error){
    console.log('no se han insertado los paises: '+error);
  }
 
};
