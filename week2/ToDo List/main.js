console.log("Success!");

var input = document.getElementById('new_task');        // input object

function createTask() {
    
    if (input.value.replace( /\s/g, '') == '') {
        alert("Cannot create empty task!");
    }
    else {
        const task = document.createElement("div");         // set outer div
        task.className = 'task';

        const check = document.createElement("div");        // set div for checkbox
        check.className = 'checks';

        const checkBox = document.createElement("input");
        checkBox.type = 'checkbox';
        checkBox.onclick = toggle;

        check.appendChild(checkBox);
        task.appendChild(check);

        const text = document.createElement("div");         // set div for text
        text.className = 'texts';

        const innerText = document.createElement("p");
        innerText.innerHTML = input.value;
        innerText.className = 'undone';

        text.appendChild(innerText);
        task.appendChild(text);

        const del = document.createElement("div");          // set div for delete btn
        del.className = 'deletes';

        const btn = document.createElement('button');
        btn.onclick = remove;

        const btn_image = document.createElement('img');
        btn_image.src = './bin.png';
        btn_image.className = 'bins';

        btn.appendChild(btn_image);
        del.appendChild(btn);
        task.appendChild(del);

        const tasks = document.getElementById('tasks');     // get tasks div

        tasks.appendChild(task);                            // add new div into tasks
    }

    clear();
}

function toggle(e) {
    const par = e.target.parentElement.parentElement.getElementsByClassName('texts')[0].firstChild;
    
    // console.log(this);

    // console.log(this.checked);

    if (this.checked) {
        par.className = "done";
    }
    else {
        par.className = "undone";
    }
}

function remove(e) {
    const task = e.target.parentElement.parentElement;

    const tasks = task.parentElement;

    tasks.removeChild(task);
}

function clear() {
    input.value = "";
}

