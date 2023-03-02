let eventBus = new Vue()



Vue.component('column', {
    // колонки
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
    data(){
        return{
        column_1: [],
        column_2: [],
        column_3: [],
        errrors: [],
    }
},
mounted() {
    // создание заметки
    eventBus.$on('addColumn_1', ColumnCard => {

        if (this.column_1.length < 3) {
            this.errors.length = 0
            this.column_1.push(ColumnCard)
        } else {
            this.errors.length = 0
            this.errors.push('Максимальное количество в первом столбце')
        }
            })

    eventBus.$on('addColumn_2', ColumnCard => {
        if (this.column_2.length < 5) {
            this.errors.length = 0
            this.column_2.push(ColumnCard)
            this.column_1.splice(this.column_1.indexOf(ColumnCard), 1)
        } else {
            this.errors.length = 0
            this.errors.push('Error')
        }
    })
}
})



Vue.component ('newcard', {
    template:`
    <section id="main" class="main-alt">
    
        <form class="row" @submit.prevent="Submit">
        
            <p class="main__text">Заметки</p>
            <p class="error" v-for="error in errors">{{ error }}</p>
        <div class="form__control">
                
            <div class="form__name">
                <input required type="text" id="name" placeholder="Введите название заметки"/>
            </div>
            
            <input required type="text"  v-model="point_1" placeholder="Первый пункт"/>
            <input required type="text"  v-model="point_2" placeholder="Второй пункт"/>
            <input required type="text"  v-model="point_3" placeholder="Третий пункт"/> 
            <br>
            <input type="text"  v-model="point_4"  placeholder="Четвертый пункт" v-show ="note4">
            <br>
             <input type="text" v-model="point_5"  placeholder="Пятый пункт" v-show="note5">
        </div>
        <div class="plus_minus_p">
        <p>Добавить или убавить поле для заметки</p>
        </div>
            <div class="minus_plus">
                 
                   <p class="plus">
                        <button type='button' @click="addField"> + </button>
                   </p>
                   
                   <p class="minus">
                        <button type='button' @click="removeField"> - </button>
                   </p>
            </div>
            
            <div>                    
                <p class="sub">
                        <input type="submit" value="Отправить"> 
                </p>
            </div>
        </div>
            <div class="form__control">
                <button class="btn">Отправить</button>
            </div>
        </form>
    </section>
    `,
 
    data() {
        return {
            remark: false,
            remark2: false,
            name: null,
            point_1: null,
            point_2: null,
            point_3: null,
            point_4: null,
            point_5:null,
            date:null,
        }
    },
    methods: {
        addField() {
            if (this.remark === false) {
                console.log('1')
                return this.remark = true
            } else {
                console.log('2')
                return this.remark2 = true
            }

        },
        removeField() {

            if (this.remark === true) {
                return this.remark2 = false
            }

            if (this.remark === true) {
                return this.remark = false
            }


        }
    },
    Submit() {
        let card = {
            name: this.name,
            points: [
                {name: this.point_1},
                {name: this.point_2},
                {name: this.point_3},
                {name: this.point_4},
                {name: this.point_5},
            ],
            date: this.date,
            status: 0,
            errors:[],
        }
        eventBus.$emit('addColumn_1', card)
                    this.name = null;
                    this.point_1 = null
                    this.point_2 = null
                    this.point_3 = null
                    this.point_4 = null
                    this.point_5 = null
    }
})