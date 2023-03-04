let eventBus = new Vue()
// Колонки 
Vue.component('column', {

    template: `
 <section id="main" class="main-alt">
        <div class="columns">
            <newCard></newCard>
        <p class="error" v-for="error in errors">{{ error }}</p>
                <column_1 :column_1="column_1"></column_1>
                
                <column_2 :column_2="column_2"></column_2>

                <column_3 :column_3="column_3"></column_3>
            </div>
 </section>
    `,
    data() {
        return {
            column_1: [],
            column_2: [],
            column_3: [],
            errors: [],
        }
    },
    mounted() {
        eventBus.$on('addColumn_1', ColumnCard => {

            if (this.column_1.length < 3) {
                this.errors.length = 0
                this.column_1.push(ColumnCard)
            } else {
                this.errors.length = 0
                this.errors.push('макс коллво заметок в 1 столбце')
            }
        })
        eventBus.$on('addColumn_2', ColumnCard => {
            if (this.column_2.length < 5) {
                this.errors.length = 0
                this.column_2.push(ColumnCard)
                this.column_1.splice(this.column_1.indexOf(ColumnCard), 1)
            } else {
                this.errors.length = 0
                this.errors.push('Вы не можете редактировать первую колонку, пока во второй есть 5 карточек.')
            }
        })
        eventBus.$on('addColumn_3', ColumnCard => {
            this.column_3.push(ColumnCard)
            this.column_2.splice(this.column_2.indexOf(ColumnCard), 1)

        })
    }
})



let elems = [...document.querySelectorAll("div a")];
for (let i = 0; i < elems.length; i++) {
  elems[i].onclick = function(e) {
    e.preventDefault();
    this.classList.add("active");
  }
}


Vue.component('newCard', {
    template: `
    <section id="main" class="main-alt">
        <form class="row" @submit.prevent="Submit">
            <p class="main__text">Заметки</p>
            <p class="error" v-for="error in errors">{{ error }}</p>
       
        <div class="form__control">
           
        <div class="form__main">
            <input required type="text" v-model="point_0" placeholder="Введите название заметки"/>    
        </div>
            <input required type="text"  v-model="point_1" placeholder="Первый пункт"/>
            <input required type="text"  v-model="point_2" placeholder="Второй пункт"/>
            <input required type="text"  v-model="point_3" placeholder="Третий пункт"/> 
            
            <input class="Punkt" type="text"  v-model="point_4"  placeholder="Четвертый пункт" v-show ="note4">
            
             <input class="Punkt" type="text"  v-model="point_5"  placeholder="Пятый пункт" v-show="note5">
        </div>
        
       <div class="plus_minus_p">
            <p>Добавить/удалить поле для заметки</p>
            </div>
           
            <div class="minus_plus">
                   <div class="plus">
                        <button class="plus" type='button' @click="addField"> + </button>
            </div>
                   <p class="minus">
                        <button class="minus" type='button' @click="removeField"> - </button>
                   </p>
            </div>
            
            <div>                    
                <p class="sub">
                        <input type="submit" value="Отправить"> 
                </p>
            </div>
            
        </form>
    </section>
    `,
    data() {
        return {
            note4: false,
            note5: false,
            name: null,
            point_0: null,
            point_1: null,
            point_2: null,
            point_3: null,
            point_4: null,
            point_5: null,
            date: null,
        }
    },
    methods: {
        addField() {
            if (this.note4 === false) {
                console.log('1')
                return this.note4 = true
            } else {
                console.log('2')
                return this.note5 = true
            }

        },
        removeField() {

            if (this.note5 === true) {
                return this.note5 = false
            }

            if (this.note4 === true) {
                return this.note4 = false
            }


        },

        Submit() {
            let card = {
                name:this.name,
                points: [
                    {name: this.point_0,},
                    {name: this.point_1,},
                    {name: this.point_2,},
                    {name: this.point_3,},
                    {name: this.point_4,},
                    {name: this.point_5,}
                ],
                date: this.date,
                // date: null,
                status: 0,
                errors: [],
            }
            eventBus.$emit('addColumn_1', card)
            this.name = null;
            this.point_0 = null
            this.point_1 = null
            this.point_2 = null
            this.point_3 = null
            this.point_4 = null
            this.point_5 = null
        }
    }

})

Vue.component('column_1', {
    template: `
        <section id="main" class="main-alt">
            <div class="column column__one">
                <div class="card" v-for="card in column_1"><p>{{ card.name }}</p>
                    <div class="tasks" v-for="task in card.points"
                        v-if="task.name != null"
                        @click="changeCompleted(card, task)"
                        :class="{completed: task.completed}">
                        <a class="tasks"> {{ task.name }} </a>
                    </div>
                </div>
            </div>
        </section>
    `,
    props: {
        column_1: {
            type: Array,
        },
        column_2: {
            type: Array,
        },
        card: {
            type: Object,
        },
        errors: {
            type: Array,
        }
    },
    methods: {
        changeCompleted(card) {
            eventBus.$emit('addColumn_2', card)

        }
    }


})

Vue.component('column_2', {
    template: `
        <section id="main" class="main-alt">
            <div class="column column__two">
                <div class="card" v-for="card in column_2"><p>{{ card.name }}</p>
                    <div class="tasks" v-for="task in card.points" v-if="task.name != null" @click="changeCompleted(card, task)"
                     :class="{completed: task.completed}">
                     <a class="tasks"> {{ task.name }} </a>
                    </div>
                </div>
            </div>
        </section>
    `,
    props: {
        column_2: {
            type: Array,
        },
        column_3: {
            type: Array,
        },
        card: {
            type: Object,
        },
    },
    methods: {
        changeCompleted(card, task) {
                eventBus.$emit('addColumn_3', card)
                card.edit = new Date().toLocaleString()
            }
        }

})

Vue.component('column_3', {
    template: `
        <section id="main" class="main-alt">
            <div class="column column__three">
                <div class="card" v-for="card in column_3"><p>{{ card.name }}</p>
                    <div class="tasks" v-for="task in card.points"
                        v-if="task.name != null"
                        @click="changeCompleted(card, task)"
                        :class="{completed: task.completed}">
                        <a class="tasks"> {{ task.name }} </a>
                    </div>

                    <ul>
                    <li class="tasks" v-if="card.edit != null">Последнее изменение: {{ card.edit}}</li>
                     </ul>
                     </div>
            </div>
        </section>
    `,
    props: {
        column_3: {
            type: Array,
        },
        card: {
            type: Object,
        },
    },
})



let app = new Vue({
    el: '#app',
})