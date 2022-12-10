require('colors')

const displayMenu = () => {

    return new Promise ( resolve => {

        console.clear();
        console.log('==================='.cyan);
        console.log(' Select an option  '.cyan);
        console.log('==================='.cyan);
    
        console.log(` ${ '1.'.cyan } Create tasks`);
        console.log(` ${ '2.'.cyan } List tasks`);
        console.log(` ${ '3.'.cyan } List completed tasks`);
        console.log(` ${ '4.'.cyan } List pending tasks`);
        console.log(` ${ '5.'.cyan } Complete task`);
        console.log(` ${ '6.'.cyan } Delete task`);
        console.log(` ${ '0.'.cyan } Out \n`);
    
        // this function allow to user can write in the console
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        readline.question('Select an option: ', ( res ) => {
            // This avoid to wait user information
            readline.close();
            resolve( res );
        })
    })


}

const pause = () => {

    return new Promise( resolve => {

        // this function allow to user can write in the console
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        readline.question(`\nPress ${ 'ENTER'.cyan } to continue\n`, ( res ) => {
            // This avoid to wait user information
            readline.close();
            resolve();
        })
    })
}

module.exports ={
    displayMenu,
    pause
}