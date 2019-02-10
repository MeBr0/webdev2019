console.log("Success!");

var cnt = 1;

function createTask() {
    // save text of task
    var task_text = document.getElementById('new_task').value;

    // console.log(task_text);

    if (task_text == '') {
        return;
    }

    // create outer div
    var task = document.createElement("div");
    task.className = 'task';
    task.id = cnt;

    // create div for checkbox
    var check = document.createElement("div");
    check.className = 'checks';

    var checkBox = document.createElement("input");
    checkBox.type = 'checkbox';
    checkBox.onclick = function toggle() {
        var par = this.parentElement.parentElement.getElementsByClassName('texts')[0].firstChild;
        
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
    var text = document.createElement("div");
    text.className = 'texts';

    var innerText = document.createElement("p");
    innerText.innerHTML = task_text;
    innerText.className = 'undone';

    text.appendChild(innerText);
    task.appendChild(text);

    // create div for delete btn
    var del = document.createElement("div");
    del.className = 'deletes';

    var btn = document.createElement('button');
    btn.onclick = function() {
        this.parentElement.parentElement.style.display = "none";
    }
    btn.className = cnt++;
    
    var btn_image = document.createElement('img');
    btn_image.src = './bin.png';
    btn_image.className = 'bins';

    btn.appendChild(btn_image);
    del.appendChild(btn);
    task.appendChild(del);

    var tasks = document.getElementById('tasks');

    tasks.appendChild(task);    

    // console.log(task.outerHTML);
}

