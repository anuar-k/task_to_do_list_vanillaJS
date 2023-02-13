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
  const themes = {
    default: {
      '--base-text-color': '#212529',
      '--header-bg': '#007bff',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#007bff',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#0069d9',
      '--default-btn-border-color': '#0069d9',
      '--danger-btn-bg': '#dc3545',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#bd2130',
      '--danger-btn-border-color': '#dc3545',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#80bdff',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
    },
    dark: {
      '--base-text-color': '#212529',
      '--header-bg': '#343a40',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#58616b',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#292d31',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#b52d3a',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#88222c',
      '--danger-btn-border-color': '#88222c',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    },
    light: {
      '--base-text-color': '#212529',
      '--header-bg': '#fff',
      '--header-text-color': '#212529',
      '--default-btn-bg': '#fff',
      '--default-btn-text-color': '#212529',
      '--default-btn-hover-bg': '#e8e7e7',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#f1b5bb',
      '--danger-btn-text-color': '#212529',
      '--danger-btn-hover-bg': '#ef808a',
      '--danger-btn-border-color': '#e2818a',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    },
  };

    const ul = document.querySelector('ul.list-group')
    ul.appendChild(renderAllTasks(tasks))

    const form = document.forms['addTask']
    const inputTitle = form.elements['title']
    const inputBody = form.elements['body']
    const selectedTheme = document.querySelector('.form-control')

    //Events
    form.addEventListener('submit', onFormSubmitEvent)
    ul.addEventListener('click', onDeleteHandler)
    selectedTheme.addEventListener('change', onChangeThemeHandler)

    const themeType = localStorage.getItem('themeType') || 'default'
    changeTheme(themeType)

    function changeTheme(themeType){
        selectedTheme.value = themeType
        Object.entries(themes[themeType]).forEach(([key, val]) => document.body.style.setProperty(key, val))
    }

    function onChangeThemeHandler({target}){
        Object.entries(themes[target.value]).forEach(([key, val]) => document.body.style.setProperty(key, val))
        localStorage.setItem('themeType', `${target.value}`)
        changeTheme(target.value)
    }

    function onDeleteHandler(e){
        const isConfirm = confirm('Точно удалить задачу?')

        if(e.target.localName === 'button' && isConfirm){
            const parentElement = e.target.closest('[data-task-id]')
            const id = parentElement.dataset.taskId
            const newArr = [...tasks.filter(a => a._id !== id)]
            ul.replaceChildren(renderAllTasks(newArr))
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
       tasks.forEach(task => fragment.appendChild(listItemTemplate(task)))
       return fragment
    }

    function onFormSubmitEvent(e){
        e.preventDefault()
        const titleValue = inputTitle.value
        const bodyValue = inputBody.value

        if(!titleValue || !bodyValue){
            alert('please enter the values')
            return;
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


