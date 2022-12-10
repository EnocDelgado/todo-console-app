const { inquirerMenu, pause, readInput, removeTaskList, confirm, displayTasksList } = require('./helpers/inquirer');
const { saveDB, readDB } = require('./helpers/saveFile');
const Tasks = require('./models/tasks');

console.clear()


const main = async() => {

    let opt = '';
    const tasks = new Tasks();

    const tasksDB = readDB();

    if ( tasksDB ) {
        // use loadTaksFromArray method to read all tasks
        tasks.loadTasksFromArray( tasksDB );
    }
    
    do {
        // Print menu
        opt = await inquirerMenu();
        
        switch ( opt ) {
            
            case '1':
                const desc = await readInput("Description: ");
                // This create a taks and put in the lists
                tasks.createTask( desc );
            break;

            case '2':
                tasks.completedList();
            break;

            case '3': // completed list
                tasks.listCompletedTasks(true);
            break;

            case '4': // pending list
                tasks.listCompletedTasks(false);
            break;

            case '5': // completed | pending 
                const ids = await displayTasksList( tasks.arrList );
                tasks.toggleCompleted( ids )
            break;

            case '6': // pending list
                const id = await removeTaskList( tasks.arrList );
                if ( id !== '0') {
                    const ok = await confirm("Are you sure?");
                    if ( ok ) {
                        tasks.removeTaks( id );
                        console.log(" Task removed");
                    }
                }
            break;
        }

        saveDB( tasks.arrList );
        
        await pause();

    } while( opt !== '0' );

}

main();