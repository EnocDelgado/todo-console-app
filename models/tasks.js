const Task = require('./task');
require('colors');
/**
 * _lists:
 *      { 'uuid-123456-4567-4567: {id:12, desc: asd, completedIn:20220917}}
 */

class Tasks {

    _lists = {
        'abc': 123
    };

    // use getter to return a new array
    get arrList() {

        const list = [];
        // fill the array
        // Object allow us to return all keys that exist
        Object.keys(this._lists).forEach( key => {
            const task = this._lists[key];
            // add the key to the new array
            list.push( task );
        })

        return list;
    }

    constructor(){
        this._lists = {}
    }

    removeTaks( id = '' ) {
        // if exist a task with any id
        if ( this._lists[id] ) {
            // delete object property
            delete this._lists[id];
        }
    }

    loadTasksFromArray( tasks = [] ) {
        // look up every taks
        tasks.forEach( task => {
            this._lists[ task.id ] = task;
        })
    }

    createTask( desc = '' ) {

        // making a instnance
        const task = new Task( desc );
        // this reference to uuid and save our description
        this._lists[ task.id ] = task;
    }

    completedList() {
        
        console.log()
        this.arrList.forEach( (task, index) => {
            const id = `${index + 1}`.cyan;
            const { desc, completedIn } = task;
            const state = ( completedIn )
                            ? 'Completed'.green
                            : 'Pending'.red;
            
            console.log(`${ id } ${ desc } :: ${ state }`)
        })
    }

    listCompletedTasks( completed = true ) {

        console.log();
        let counter = 0;
        this.arrList.forEach( (task) => {
            const { desc, completedIn } = task;
            const state = ( completedIn )

            if ( completed ) {
                if( completedIn ) {
                    counter += 1;
                    console.log(`${ (counter + '.').cyan } ${ desc } :: ${ completedIn.green }`);
                }
            } else {
                if( !completedIn ) {
                    counter += 1;
                    console.log(`${ (counter + '.').cyan } ${ desc } :: ${ state }`);
                }
            }        
        })
    }


    toggleCompleted( ids = [] ) {

        // we have to sweep our array to get all ids
        ids.forEach( id => {
            // do a refencence to every tasks
            const task = this._lists[id];
            // if our task is completed created a date when we finished
            if( !task.completedIn ){
                task.completedIn = new Date().toISOString()
            } 
        });

        // we have to sweep our array to get all ids
        this.arrList.forEach( task => {
            // if id is not in the array do nothing
            if ( !ids.includes( task.id ) ) {
                this._lists[task.id].completedIn = null;
            }
        })
    }

}

module.exports = Tasks;