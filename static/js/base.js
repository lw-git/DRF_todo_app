document.addEventListener('DOMContentLoaded', function(){
  getTodos()
});

function getTodos() {
  axios
    .get('http://127.0.0.1:8000/api/')
    .then(res => renderList(res))
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
}
