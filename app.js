let tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
];

(function(arrOfTasks) {
    const ul = document.querySelector('ul.list-group')
    ul.appendChild(renderAllTasks(tasks))

    const form = document.forms['addTask']
    const inputTitle = form.elements['title']
    const inputBody = form.elements['body']
    //Events
    form.addEventListener('submit', onFormSubmitEvent)
    ul.addEventListener('click', onDeleteHandler)

    

    function onDeleteHandler(e){
        const isConfirm = confirm('Точно удалить задачу?')

        if(e.target.localName === 'button' && isConfirm){
             const parentElement = e.target.closest('[data-task-id]')
             const id = parentElement.dataset.taskId
             console.log(id)
            const newArr = [...tasks.filter(a => a._id !== id)]
            tasks = newArr
            ul.replaceChildren(renderAllTasks(tasks))
        }
    }

    function listItemTemplate({_id, title, body} = {}){
        const li = document.createElement('li')
        const btn = document.createElement('button')
        const span = document.createElement('span')
        const p = document.createElement('p')

        li.className = 'list-group-item d-flex align-items-center flex-wrap mt-2'
        btn.className = 'btn btn-danger ml-auto delete-btn'

        span.textContent = title
        btn.textContent = 'Delete task'
        p.textContent = body

        li.append(span)
        li.append(p)
        li.append(btn)
        li.setAttribute('data-task-id', _id)
        return li
    }

    function renderAllTasks(tasks) {
       const fragment = document.createDocumentFragment();
       tasks.map(task => fragment.appendChild(listItemTemplate(task)))
       return fragment
    }

    function clearArray(array) {
      while (array.length > 0) {
        array.pop();
      }
    }

    function onFormSubmitEvent(e){
        e.preventDefault()
        const titleValue = inputTitle.value
        const bodyValue = inputBody.value

        if(!titleValue || !bodyValue){
            alert('please enter the values')
            return
        }
        const newTask = createNewTask(titleValue, bodyValue)
        tasks.unshift(newTask)
        ul.replaceChildren(renderAllTasks(tasks))
        form.reset()
    }

    function createNewTask(title, body){
      const _id = `task-${Math.random() * 10}`;
      return {_id, title, completed: true, body}
    }

   function addNewTask(title, body){
        const newTask = createNewTask(title, body)
        tasks.unshift(createNewTask(title, body))
        ul.replaceChildren(renderAllTasks(tasks))
   }

})(tasks);


