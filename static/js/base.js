document.addEventListener('DOMContentLoaded', function(){
  getTodos()
  document.getElementById('submit').addEventListener('click', do_create);
});

function getTodos() {
  axios
    .get('http://127.0.0.1:8000/api/')
    .then(res => renderList(res))
    .catch(err => console.error(err));
}

function addTodo(title, completed) {
  axios
    .post('http://127.0.0.1:8000/api/create/', {
      title: title,
      completed: completed
    })
    .then(() => getTodos())
    .catch(err => console.error(err));
}

function updateTodo(taskId, title, completed) {
  axios
    .patch(`http://127.0.0.1:8000/api/${taskId}/update/`, {
      title: title,
      completed: completed
    })
    .then(() => getTodos())
    .catch(err => console.error(err));
}

function removeTodo(taskId) {
  axios
    .delete(`http://127.0.0.1:8000/api/${taskId}/delete/`)
    .then(() => getTodos())
    .catch(err => console.error(err));
}

function renderList(res) {
  div = document.querySelector('#res')
  div.innerHTML = ''
  res.data.map((task) => {
    innerDiv = document.createElement('div');
    innerDiv.className += "alert alert-primary alert-dismissible text-center";
    button = document.createElement('button');  
    button.className += "close";
    button.setAttribute('type', 'button')
    span = document.createElement('span');
    span.setAttribute('id', task.id) 
    span.setAttribute('aria-hidden', true) 
    span.innerHTML = '&times';
    button.appendChild(span);
    innerDiv.appendChild(button);
    p = document.createElement('p');
    p.setAttribute('id', 'text_' + task.id);
    if (task.completed) {
      p.className += 'text-center h4 completed'
      p.setAttribute('style', 'cursor:pointer;display:block;text-decoration: line-through');
    }
    else {
      p.className += 'text-center h4'
      p.setAttribute('style', 'cursor:pointer;display:block;');
    }
    p.innerHTML = task.title;
    innerDiv.appendChild(p);
    div.appendChild(innerDiv)
  });  
  document.querySelectorAll('p').forEach(() => addEventListener('click', prepareUpdate));  
}

function do_create() {
  title = document.querySelector('input#title').value
  completed = document.querySelector('input#completed').checked
  addTodo(title, completed)  
  clean_button()
}
function do_update() {
  title = document.querySelector('input#title').value
  completed = document.querySelector('input#completed').checked
  taskId = document.querySelector('#taskId').value
  updateTodo(taskId, title, completed)  
  clean_button()
}

function clean_button(){
  button = document.querySelector('#submit')
  button.innerHTML = 'Create'
  button.removeEventListener('click', do_update);
  button.addEventListener('click', do_create);
  document.querySelector('input#title').value = ''
  document.querySelector('input#completed').checked = false
  document.querySelector('#taskId').value = ''
  document.querySelectorAll('button.close').forEach((button) => button.setAttribute('style', 'display:block'));
}

function prepareUpdate(e) {
  if (e.target.tagName == 'SPAN') {
    removeTodo(e.target.id)
  }
  else if (e.target.tagName == 'P') {
    document.querySelectorAll('button.close').forEach((button) => button.setAttribute('style', 'display:none'));
    document.querySelector('#title').value = e.target.innerHTML
    document.querySelector('#taskId').value = e.target.id.slice(5)
    if (e.target.className.includes('completed')) {
      document.querySelector('#completed').checked = true 
    }
    else {
      document.querySelector('#completed').checked = false 
    }
    button = document.querySelector('#submit')
    button.innerHTML = 'Update'
    button.removeEventListener('click', do_create);
    document.querySelector('#submit').addEventListener('click', do_update);
  }
}
