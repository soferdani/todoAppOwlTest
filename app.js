const { Component, mount } = owl;
const { xml } = owl.tags;
const { whenReady } = owl.utils;
const { useRef } = owl.hooks;


const TASK_TEMPLATE = xml/* xml */ `
<div class="task" t-att-class="props.task.isCompleted ? 'done' : ''">
<input type="checkbox" t-att-checked="props.task.isCompleted"/>
<span><t t-esc="props.task.title"/></span>
</div>`;

class Task extends Component {
	static template = TASK_TEMPLATE;
	static props = ["task"];
}

const APP_TEMPLATE = xml/* xml */ `
<div class="todo-app">
<input placeholder="Enter a new task" t-on-keyup="addTask"/>
<div class="task-list">
    <t t-foreach="tasks" t-as="task" t-key="task.id">
        <Task task="task"/>
    </t>
</div>
</div>`;

class App extends Component {
	static template = APP_TEMPLATE;
	static components = { Task };



    addTask(ev) {
        // 13 is keycode for ENTER
        if (ev.keyCode === 13) {
            const title = ev.target.value.trim();
            ev.target.value = "";
            console.log('adding task', title);
            // todo
        }
    }




	tasks = [
		{
			id: 1,
			title: "buy milk",
			isCompleted: true,
		},
		{
			id: 2,
			title: "clean house",
			isCompleted: false,
		},
	];
}

function setup() {
	owl.config.mode = "dev";
	mount(App, { target: document.body });
}

whenReady(setup);
