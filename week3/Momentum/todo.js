console.log("Success!");

var input = document.getElementById('new_task');        // input object

document.getElementById('submit_task').onclick = createTask;

$('#new_task').keypress(function(e) {

    if(e.which == 13) {
        createTask();
    }
});

function createTask() {
    
    if (input.value.replace( /\s/g, '') == '') {
        alert("cannot create empty task!");
    }
    else {
        const task = document.createElement("div");         // set outer div
        task.className = 'task';

        const text = document.createElement("div");         // set div for text
        text.className = 'texts';

        const innerText = document.createElement("p");
        innerText.innerHTML = input.value;
        innerText.className = 'undone';
        innerText.onclick = toggle;

        text.appendChild(innerText);
        task.appendChild(text);

        const del = document.createElement("div");          // set div for delete btn
        del.className = 'deletes';
        del.innerHTML = 'del';
        del.onclick = remove;

        task.appendChild(del);

        const tasks = document.getElementById('tasks');     // get tasks div

        tasks.appendChild(task);                            // add new div into tasks
    }

    clear();
}

function toggle(e) {
    
    // console.log(this);

    // console.log(this.checked);

    if (e.target.className == 'undone') {
        e.target.className = "done";
    }
    else {
        e.target.className = "undone";
    }
}

function remove(e) {
    const tasks = e.target.parentElement.parentElement;

    tasks.removeChild(e.target.parentElement);
}

function clear() {
    input.value = "";
}

