const fs = require('fs')

const file = './db/data.json';

const saveDB = ( data ) => {

    fs.writeFileSync( file, JSON.stringify( data ) );
}

const readDB = () => {

    // This is a validation to know if exist our file
    if( !fs.existsSync ( file ) ) {
        return null;
    }

    // read elements into our file
    const info = fs.readFileSync( file, { encoding: 'utf-8' });
    //conver our string to object
    const data = JSON.parse( info );

    return data;
    
}

module.exports = {
    saveDB,
    readDB
}