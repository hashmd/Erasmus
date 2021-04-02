const tableNames = require('../../src/constants/tableNames')
const Knex = require("knex");

//importar con deconstruccion
const {
    addDefaults
} = require('../../src/lib/utils');

/**
 * @param {Knex} knex 
 */
exports.up = async(knex) => {

    await knex.schema.createTable(tableNames.usuario, (table) => {
        table.string('dni', 15).notNullable().unique().primary();
        table.string('correo', 100).notNullable().unique();
        table.string('nombre', 255).notNullable();
        table.string('apellido1', 255).notNullable();
        table.string('apellido2', 255);
        table.string('contrasena', 40).notNullable().unique();
        table.enum('rol', ['admin','alumno','profesor']).defaultTo('alumno');
        addDefaults(table);
    });

    await knex.schema.createTable(tableNames.pais, (table) => {
        table.string('nombre', 100).notNullable().unique();
        table.string('codigo', 5).notNullable().primary();
        addDefaults(table);
    });

    await knex.schema.createTable(tableNames.ciudad, (table) => {
        table.increments('id').primary();
        table.string('codigo_pais').references('codigo').inTable(tableNames.pais).onDelete('cascade').onUpdate('cascade');
        table.string('nombre', 255).notNullable();
        addDefaults(table);
    });

    await knex.schema.createTable(tableNames.universidad, (table) => {
        table.string('id', 20).primary();
        table.string('nombre', 255).notNullable();
        table.integer('id_ciudad').references('id').inTable(tableNames.ciudad).onDelete('cascade').onUpdate('cascade');
        addDefaults(table);
    });

    await knex.schema.createTable(tableNames.facultad, (table) => {
        table.string('id', 20).primary();
        table.string('name', 255).notNullable();
        table.string('direccion', 255);
        table.integer('ciudad');
        table.foreign('ciudad').references('id').inTable(tableNames.ciudad).onDelete('cascade').onUpdate('cascade');
        table.string('id_uni');
        table.foreign('id_uni').references('id').inTable(tableNames.universidad).onDelete('cascade').onUpdate('cascade');
        addDefaults(table);
   });

    await knex.schema.createTable(tableNames.asignatura, (table) => {
        table.string('codigo', 30).primary();
        table.string('nombre', 255).notNullable();
        table.integer('creditos',3).notNullable();
        table.string('id_facul').references('id').inTable(tableNames.facultad).onDelete('cascade').onUpdate('cascade');
        addDefaults(table);
    });

    await knex.schema.createTable(tableNames.equivalenciaDeAsignatura, (table) => {
        table.increments('id_relacion',20).primary();
        table.string('codigo_asigna_esp').references('codigo').inTable(tableNames.asignatura).onDelete('cascade').onUpdate('cascade');;
        table.string('codigo_asigna_ext').references('codigo').inTable(tableNames.asignatura).onDelete('cascade').onUpdate('cascade');;
        addDefaults(table);
    });

    await knex.schema.createTable(tableNames.matricula, (table) => {
        table.increments('id', 15).primary();
        table.string('dni', 15).references('dni').inTable(tableNames.usuario).onDelete('cascade').onUpdate('cascade');
        table.string('codigo_asigna').references('codigo').inTable(tableNames.asignatura).onDelete('cascade').onUpdate('cascade');
        addDefaults(table);
    });

    await knex.schema.createTable(tableNames.nota, (table) => {
        table.increments('id').primary();
        table.integer('id_matricula').references('id').inTable(tableNames.matricula).notNullable().onDelete('cascade').onUpdate('cascade');
        table.integer('nota');
        addDefaults(table);
    });

    await knex.schema.createTable(tableNames.equivalenciaNotas, (table) =>{
        table.increments('id', 15).primary();
        table.string('codigo_pais');
        table.foreign('codigo_pais').references('codigo').inTable(tableNames.pais).onDelete('cascade').onUpdate('cascade');
        table.integer('nota_extranjero', 3).notNullable();
        table.integer('nota_espagna', 3).notNullable();
        addDefaults(table);
    });

};

/**
 * @param {Knex} knex // Esto es solo para que autocomplete con knex, 
 * @ suele usarse para decoradores(tipo de estructura que añade funcionalidad estra a un método o clase)
 */
exports.down = async(knex) => {
    await knex.schema.dropTableIfExists(tableNames.equivalenciaNotas);
    await knex.schema.dropTableIfExists(tableNames.nota);
    await knex.schema.dropTableIfExists(tableNames.matricula);
    await knex.schema.dropTableIfExists(tableNames.equivalenciaDeAsignatura);
    await knex.schema.dropTableIfExists(tableNames.asignatura);
    await knex.schema.dropTableIfExists(tableNames.facultad);
    await knex.schema.dropTableIfExists(tableNames.universidad);
    await knex.schema.dropTableIfExists(tableNames.ciudad);
    await knex.schema.dropTableIfExists(tableNames.pais);
    await knex.schema.dropTableIfExists(tableNames.usuario);
};