
Vue.config.devtools = true

myapp.app = new Vue({
    el: '#app',

    data: {

        message: 'Hello Vue!'

    }

})

myapp.app2 = new Vue({

    el: '#app-2',

    data: {

        message: 'You loaded this page on ' + new Date().toLocaleString()

    }

})



myapp.app3 = new Vue({

    el: '#app-3',

    data: {

        seen: true

    }

})



myapp.app4 = new Vue({

    el: '#app-4',

    data: {

        todos: [{

                text: 'Learn JavaScript'

            },

            {

                text: 'Learn Vue'

            },

            {

                text: 'Build something awesome'

            }

        ]

    }

})



myapp.app5 = new Vue({

    el: '#app-5',

    data: {

        message: 'Hello Vue.js!'

    },

    methods: {

        reverseMessage: function() {

            this.message = this.message.split('').reverse().join('')

        }

    },

    computed: {

        now: function() {

            return Date.now()

        },

        fullName: {

            // getter

            get: function() {

                return this.firstName + ' ' + this.lastName

            },

            // setter

            set: function(newValue) {

                var names = newValue.split(' ')

                this.firstName = names[0]

                this.lastName = names[names.length - 1]

            }

        }

    }

})

var app17 = new Vue({

    el: '#app-17',

    data: {

        selected: 'A',

        options: [{

                text: 'One',

                value: 'A'

            },

            {

                text: 'Two',

                value: 'B'

            },

            {

                text: 'Three',

                value: 'C'

            }

        ]

    }

})



var Child = {

    template: '<div>A custom component!</div>'

}

var app6 = new Vue({

    el: '#app-6',

    data: {

        message: 'Hello Vue!'

    },

    components: {

        // <my-component> will only be available in parent's template

        'my-component': Child

    }

})



// use <template></template> for empty block



Vue.component('example', {

    props: {

        // basic type check (`null` means accept any type)

        propA: Number,

        // multiple possible types

        propB: [String, Number],

        // a required string

        propC: {

            type: String,

            required: true

        },

        // a number with default value

        propD: {

            type: Number,

            default: 100

        },

        // object/array defaults should be returned from a

        // factory function

        propE: {

            type: Object,

            default: function() {

                return {

                    message: 'hello'

                }

            }

        },

        // custom validator function

        propF: {

            validator: function(value) {

                return value > 10

            }

        }

    }

})





Vue.component('todo-item', {

    template: '<li>{{ todo.text }}</li>',

    props: ['initialCounter', 'todo', 'size'],

    data: function() {

        return {

            counter: this.initialCounter

        }

    },

    computed: {

        normalizedSize: function() {

            return this.size.trim().toLowerCase()

        }

    }

})



var app7 = new Vue({

    el: '#app-7',

    data: {

        ok: true,

        type: 'B',

        parentMessage: 'Parent',

        items: [{

                message: 'Foo'

            },

            {

                message: 'Bar'

            }

        ],

        object: {

            firstName: 'John',

            lastName: 'Doe',

            age: 30

        },

        isActive: true,

        hasError: true,

        activeClass: 'active',

        errorClass: 'text-danger',

        groceryList: [{

                id: 0,

                text: 'Vegetables'

            },

            {

                id: 1,

                text: 'Cheese'

            },

            {

                id: 2,

                text: 'Whatever else humans are supposed to eat'

            }

        ]

    }

})



var watchExampleVM = new Vue({

    el: '#watch-example',

    data: {

        question: '',

        answer: 'I cannot give you an answer until you ask a question!'

    },

    watch: {

        // whenever question changes, this function will run

        question: function(newQuestion) {

            this.answer = 'Waiting for you to stop typing...'

            this.getAnswer()

        }

    },

    methods: {

        // _.debounce is a function provided by lodash to limit how

        // often a particularly expensive operation can be run.

        // In this case, we want to limit how often we access

        // yesno.wtf/api, waiting until the user has completely

        // finished typing before making the ajax request. To learn

        // more about the _.debounce function (and its cousin

        // _.throttle), visit: https://lodash.com/docs#debounce

        getAnswer: _.debounce(

            function() {

                if (this.question.indexOf('?') === -1) {

                    this.answer = 'Questions usually contain a question mark. ;-)'

                    return

                }

                this.answer = 'Thinking...'

                var vm = this

                axios.get('https://yesno.wtf/api')

                .then(function(response) {

                    vm.answer = _.capitalize(response.data.answer)

                })

                .catch(function(error) {

                    vm.answer = 'Error! Could not reach the API. ' + error

                })

            },

            // This is the number of milliseconds we wait for the

            // user to stop typing.

            500

        )

    }

})

axios.get('https://yesno.wtf/api')

.then(function(response) {

    console.log(response);

})

.catch(function(error) {

    console.log(error);

})





Vue.component('button-counter', {

    template: '<button v-on:click="incrementCounter">{{ counter }}</button>',

    data: function() {

        return {

            counter: 0

        }

    },

    methods: {

        incrementCounter: function() {

            this.counter += 1

            this.$emit('increment', 'gg')

        }

    },

})



new Vue({

    el: '#counter-event-example',

    data: {

        total: 0

    },

    methods: {

        incrementTotal: function(g) {

            console.log('ste', g);

            this.total += 1

        }

    }

})



var Home = {

    template: '<p>Welcome home!</p>'

}



var vm = new Vue({

    el: '#app-22',

    data: {

        currentView: 'home'

    },

    components: {

        home: Home,

        posts: { /* ... */ },

        archive: { /* ... */ }

    }

})





// 0. If using a module system (e.g. via vue-cli), import Vue and VueRouter

// and then call `Vue.use(VueRouter)`.



// 1. Define route components.

// These can be imported from other files

const Foo = {

    template: '<div>foo</div>'

}

const Bar = {

    template: '<div>bar</div>'

}



// 2. Define some routes

// Each route should map to a component. The "component" can

// either be an actual component constructor created via

// `Vue.extend()`, or just a component options object.

// We'll talk about nested routes later.

const routes = [{

        path: '/foo',

        component: Foo

    },

    {

        path: '/bar',

        component: Bar

    }

]



// 3. Create the router instance and pass the `routes` option

// You can pass in additional options here, but let's

// keep it simple for now.

const router = new VueRouter({

    routes // short for `routes: routes`

})



// 4. Create and mount the root instance.

// Make sure to inject the router with the router option to make the

// whole app router-aware.

const mainapp = new Vue({

    router

}).$mount('#mainapp')



// Now the app has started!







const store = new Vuex.Store({

    state: {

        count: 0,

        steve: {

            g: 1

        },

        leon: []

    },

    mutations: {

        increment(state, g) {

            state.count += g;

        },

        decrement(state, g) {

            state.steve.h = 34;

            state.leon.push('sd')

        },



    }

})





store.commit('increment', 3)



setTimeout(() => {

    store.commit('increment', 13)



}, 1000)



setTimeout(() => {

    store.commit('decrement', 13)



}, 2000)

console.log(store.state.count) // -> 1
