const tableNames = require('../../src/constants/tableNames')
const Knex = require("knex");

//importar con deconstruccion
const {
    addDefaults
} =require('../../src/lib/utils');
const { user } = require('../../src/constants/tableNames');

/**
  * @param {Knex} knex 
*/
    exports.up = async(knex) => {
        await knex.schema.createTable( tableNames.user, (table) => {
            table.string('dni',15).notNullable().unique();          
            table.string('email',100).notNullable().unique();
            table.string('name', 255).notNullable();
            table.float('apellido1', 255).notNullable();
            table.float('apellido2', 255);
            addDefaults(table);
           }
        )
        
        await knex.schema.createTable(tableNames.tutor, (table) => {
            table.string('id_empleado').notNullable().unique();
            table.string('dni_user',15).references('dni').inTable(tableNames.user).onDelete('cascade').notNullable().unique();
            addDefaults(table);
           }  
        )

        await knex.schema.createTable(tableNames.alumno, (table) => {
            table.string('expediente').notNullable().unique();         
            table.string('dni', 15).notNullable().unique();
            table.string('tutor').notNullable();
           }
        )

        await knex.schema.createTable(tableNames.pais, (table) => {
            table.increments('id').notNullable().unique();
            table.string('name', 100).notNullable().unique();
            table.string('code', 5).notNullable();
           }
        )

        await knex.schema.createTable(tableNames.ciudad, (table) => {
            table.increments('id').notNullable().unique();
            table.string('nombre', 30).notNullable();
            table.double('id_pais');
           }
        )

        await knex.schema.createTable(tableNames.universidad, (table) =>{
            table.string('id_univ', 20).notNullable().unique();
            table.string('nombre', 255).notNullable().unique();
            table.string('direccion', 255);
            table.double('pais', 11);
            table.string('ciudad', 60);
           }
        )

        await knex.schema.createTable(tableNames.asignatura_esp, (table) => {
            table.double('codigo', 30).notNullable().unique();
            table.string('nombre').notNullable().unique();
            table.date('fecha_conv').notNullable();
            table.double('creditos', 2).notNullable();
            table.string('id_univ', 20).notNullable();
           }
        )

        await knex.schema.createTable(tableNames.asignat_extranj, (table) => {
            table.integer('cod').notNullable().unique();
            table.string('nombre').notNullable().unique();
            table.string('id_univ', 20).notNullable();
            table.string('id_asig_esp', 20).notNullable();
            table.integer('id_nota').notNullable();
            }
        )

        await knex.schema.createTable(tableNames.notas, (table) => {
            table.double('id_univ', 20).notNullable().unique();
            table.increments('id_nota').notNullable().unique();
            table.integer('id_asig_ext');
            table.string('id_alumno');

            
        })
  
};


/**
  * @param {Knex} knex 
*/
exports.down = async (knex) => {
    await knex.schema.dropTableIfExists(tableNames.notas);
    await knex.schema.dropTableIfExists(tableNames.asignat_extranj);
    await knex.schema.dropTableIfExists(tableNames.asignatura_esp);
    await knex.schema.dropTableIfExists(tableNames.universidad);
    await knex.schema.dropTableIfExists(tableNames.ciudad);
    await knex.schema.dropTableIfExists(tableNames.pais);
    await knex.schema.dropTableIfExists(tableNames.alumno);
    await knex.schema.dropTableIfExists(tableNames.tutor);
    await knex.schema.dropTableIfExists(user);

};
