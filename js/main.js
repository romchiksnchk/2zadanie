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