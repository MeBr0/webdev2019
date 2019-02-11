console.log("Success!");

function createTask() {
    // save text of task
    const input = document.getElementById('new_task');

    // console.log(task_text);

    if (input.value.replace( /\s/g, '') == '') {
        alert("Cannot create empty task!");
        
        input.value = "";

        return;
    }

    // create outer div
    const task = document.createElement("div");
    task.className = 'task';

    // create div for checkbox
    const check = document.createElement("div");
    check.className = 'checks';

    const checkBox = document.createElement("input");
    checkBox.type = 'checkbox';
    checkBox.onclick = function toggle() {
        const par = this.parentElement.parentElement.getElementsByClassName('texts')[0].firstChild;
        
        // console.log(this);

        // console.log(this.checked);

        if (this.checked) {
            par.className = "done";
        }
        else {
            par.className = "undone";
        }
    }

    document.getElementsByClassName

    check.appendChild(checkBox);
    task.appendChild(check);

    // create div for text
    const text = document.createElement("div");
    text.className = 'texts';

    const innerText = document.createElement("p");
    innerText.innerHTML = input.value;
    innerText.className = 'undone';

    text.appendChild(innerText);
    task.appendChild(text);

    // create div for delete btn
    const del = document.createElement("div");
    del.className = 'deletes';

    const btn = document.createElement('button');
    btn.onclick = function() {
        this.parentElement.parentElement.style.display = "none";
    }

    const btn_image = document.createElement('img');
    btn_image.src = './bin.png';
    btn_image.className = 'bins';

    btn.appendChild(btn_image);
    del.appendChild(btn);
    task.appendChild(del);

    const tasks = document.getElementById('tasks');

    tasks.appendChild(task);    

    // console.log(task.outerHTML);

    input.value = "";
}

