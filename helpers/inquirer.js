const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'options',
        message: 'What do you want to do?',
        choices: [
            {
                value: '1',
                name: `${'1.'.cyan} Create tasks`
            },
            {
                value: '2',
                name: `${'2.'.cyan} List tasks`
            },
            {
                value: '3',
                name: `${'3.'.cyan} List completed tasks`
            },
            {
                value: '4',
                name: `${'4.'.cyan} List pending tasks`
            },
            {
                value: '5',
                name: `${'5.'.cyan} Complete task`
            },
            {
                value: '6',
                name: `${'6.'.cyan} Delete task`
            },
            {
                value: '0',
                name: `${'0.'.cyan} Out`
            },
        ]
    }
]

const inquirerMenu = async() => {

    console.clear();
    console.log('==================='.cyan);
    console.log(' Select an option  '.rainbow);
    console.log('==================='.cyan);

    const { options } = await inquirer.prompt( questions );

    return options;
}

const pause = async() => {

    const question = [
        {
            type: "input",
            name: "enter",
            message: `Press ${ 'ENTER'.cyan } to continue`
        }
    ]
    console.log('\n');
    await inquirer.prompt( question );
}

const readInput = async( message ) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            // force to user enter a value
            validate( value ) {
                if ( value.length === 0) {
                    return "Please enter a value";
                } else {
                    return true;
                }
            }

        }
    ]

    // display to the console
    const { desc } = await inquirer.prompt( question );

    return desc;
}


const removeTaskList = async( tasks = [] ) => {

    // map return a new array transforming the childrens
    const choices = tasks.map( (task, i) => {

        const id = `${i + 1}`.cyan;

        return {
            value: task.id,
            name: `${ id } ${ task.desc }`

        }
    })

    // unshift allow us to assign a value at startup
    choices.unshift({
        value: '0',
        name: '0.'.cyan + ' Cancel'
    })

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Remove',
            choices
        }
    ]

    // display menu
    const { id } = await inquirer.prompt( questions );

    return id;
}

const confirm = async( message ) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt( question );
    return ok;
}

const displayTasksList = async( tasks = [] ) => {

    // map return a new array transforming the childrens
    const choices = tasks.map( (task, i) => {

        const id = `${i + 1}`.cyan;

        return {
            value: task.id,
            name: `${ id } ${ task.desc }`,
            check: ( task.completedIn ) ? true : false

        }
    })

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selections',
            choices
        }
    ]

    // display menu
    const { ids } = await inquirer.prompt( question );

    return ids;
}
module.exports = {
    inquirerMenu,
    pause,
    readInput,
    removeTaskList,
    confirm,
    displayTasksList
}