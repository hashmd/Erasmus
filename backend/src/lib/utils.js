function addDefaults(table){
    table.timestamps(false,true); //created and update
    table.datetime('delete_at'); // delete_soft. Marca, pero no borra
};

module.exports = {addDefaults};