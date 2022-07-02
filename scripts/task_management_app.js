//タスク内のメニュー
class Menu{
    constructor(id){
        this.id = id;
        this.weight = 0;
        this.reps = 0;
    }
}
//セクション内のタスク
class Task{
    constructor(id){
        this.id = id;
        this.title = "";
        this.show = false;
        this.interval = 0;
        this.menus = [new Menu(0)];
        this.comment = "";
        this.edit = false;
        this.check = false;
        this.favorite = false;
    }
}
//セクション
class Section{
    constructor(id){
        this.id = id;
        this.name = ""
        this.tasks = [new Task(0)];
    }
}
//Vueコンポーネントを囲うステートレスオブジェクト
class Components{
    //ドラッグ&ドロップを可能にするコンポーネント
    static Draggable = window['vuedraggable'];
    //タスクを新規作成するコンポーネント
    static TaskNew = {
        props: {
            sectionId: Number
        },
        template: `
        <v-btn class="ma-1" text icon color="indigo darken-1" v-on:click="$emit('add-task')">
            <v-icon>add</v-icon>
        </v-btn>
        `
    }
    //タスクコンポーネント
    static Task = {
        props: {
            task: Object,
            section: Object,
            sections: Array
        },
        methods: {
            //メニューを追加する
            addMenu: function(){
                // let id = this.task.menus.length;
                let id = 0;
                for(let i = 0; i < this.task.menus.length; i++){
                    let curr = this.task.menus[i];
                    if(id < curr.id){
                        id = curr.id;
                    }
                }
                if(this.task.menus.length > 0)id += 1;
                this.task.menus.push(new Menu(id));
            },
            //メニューを削除する
            deleMenu: function(){
                this.task.menus.pop();
            },
        },
        template: `
        <v-card elevation="2" outlined class="ma-1">
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-text-field label="title" class="text-h6" color="indigo darken-1" dense v-model="task.title"></v-text-field>
                    </v-col>
                </v-row>
                <div class="text-subtitle-2" style="color: #90A4AE">
                    section : {{ section.name }}
                </div>
            </v-container>
            
            
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click="task.show = !task.show">
                    <v-icon>{{ task.show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
            </v-card-actions>

            <v-expand-transition>
                <v-container v-show="task.show">
                    <v-divider class="mb-2"></v-divider>

                    <div class="text-subtitle-2">Interval</div>
                    <span class="text-h6" v-text="task.interval"></span> sec
                    <v-slider step="10" color="indigo darken-1" track-color="grey" thumb-label ticks v-model="task.interval"></v-slider>

                    <div class="text-subtitle-2">Menu</div>

                    <v-row justify="center">
                        <v-col cols="4" class="text-right">(kg)</v-col>
                        <v-col cols="2"></v-col>
                        <v-col cols="4" class="text-right">(reps)</v-col>
                    </v-row>
                    
                    <template v-for="menu in task.menus" v-bind:menu="menu">
                        
                        <v-alert elevation="2" dense>
                            <v-row justify="center">
                                <v-col cols="4">
                                    <v-text-field class="mt-0 pt-0" hide-details single-line type="number" style="" min="0" color="indigo darken-1" v-model="menu.weight"></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    ×
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field class="mt-0 pt-0" hide-details single-line type="number" style="" min="0" color="indigo darken-1" v-model="menu.reps"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-alert>

                    </template>
                    

                    <v-row>
                        <v-col cols="2">
                            <v-btn class="ma-1" text icon color="indigo darken-1">
                                <v-icon @click="addMenu">add</v-icon>
                            </v-btn>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col cols="2" class="me-5">
                            <v-btn class="ma-1" text icon color="indigo darken-1">
                                <v-icon @click="deleMenu">delete</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12">
                            <v-textarea name="input-7-1" label="Comment" v-model="task.comment" hint="" clearable clear-icon="mdi-close-circle" color="indigo darken-1" v-bind:disabled="!task.edit"></v-textarea>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-spacer></v-spacer>
                        <v-btn class="ma-1" text icon v-bind:class="[task.edit ? 'orange--text text--darken-1' : 'indigo--text text--darken-1']" @click="task.edit = !task.edit">
                            <v-icon>edit_note</v-icon>
                        </v-btn>
                        <v-btn class="ma-1" text icon v-bind:class="[task.check ? 'orange--text text--darken-1' : 'indigo--text text--darken-1']" @click="task.check = !task.check">
                            <v-icon>done</v-icon>
                        </v-btn>
                        <v-btn class="ma-1" text icon v-bind:class="[task.favorite ? 'orange--text text--darken-1' : 'indigo--text text--darken-1']" @click="task.favorite = !task.favorite">
                            <v-icon>star</v-icon>
                        </v-btn>
                        <v-btn class="ma-1" text icon color="indigo darken-1" @click="$emit('dele-task', task.id)">
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </v-row>
                </v-container>
            </v-expand-transition>
        </v-card>
        `
    }
    //タスクセクションコンポーネント
    static TaskSection = {
        props: {
            section: Object,
            sections: Array
        },
        components: {
            'draggable': Components.Draggable,
            'task': Components.Task,
            'task-new': Components.TaskNew,
        },
        methods: {
            //タスクを追加する
            addTask: function(){
                let id = 0;
                for(let i = 0; i < this.section.tasks.length; i++){
                    let curr = this.section.tasks[i];
                    if(id < curr.id){
                        id = curr.id
                    }
                }
                if(this.section.tasks.length > 0)id += 1;
                this.section.tasks.push(new Task(id));
            },
            //タスクを削除する
            deleTask: function(id){
                for(let i = 0; i < this.section.tasks.length; i++){
                    let curr = this.section.tasks[i];
                    if(curr.id == id){
                        this.section.tasks.splice(i, 1);
                        break;
                    }
                }
            }
        },
        template: `
        <v-card elevation="2" outlined width="300" class="pa-2 ma-2">
            <div class="pa-1">
                <v-text-field label="title" class="text-h6" color="indigo darken-1" dense v-model="section.name"></v-text-field>
            </div>
            <draggable class="pa-1" v-if="section.tasks.length > 0">
                <task v-for="task in section.tasks" :key="task.id" v-bind:task="task"  :section="section" :sections="sections" @dele-task="deleTask"></task>
                
            </draggable>
            <v-row>
                <v-col cols="2">
                    <task-new v-bind:sectionId="section.id" @add-task="addTask"></task-new>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="2" class="me-5">
                    <v-btn class="ma-1" text icon color="indigo darken-1" @click="$emit('dele-sec', section.id)">
                        <v-icon>delete</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-card>
        `
    }
}
var vm = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    components: {
        'draggable': Components.Draggable,
        'task-section': Components.TaskSection,
    },
    data: function(){
        return {
            sections: []
        }
    },
    methods: {
        //セクションを追加する
        addSec: function(){
            let id = 0;
            for(let i = 0; i < this.sections.length; i++){
                if(id < this.sections[i].id){
                    id = this.sections[i].id
                }
            }
            if(this.sections.length > 0)id += 1;
            console.log("new Section >> Id: " + id);
            this.sections.push(new Section(id));
        },
        //セクションを削除する
        deleSec: function(id){
            let i = 0;
            while(i < this.sections.length){
                let curr = this.sections[i];
                if(curr.id == id)break;
                else i++;
            }
            console.log("delete index: " + i + " id: " + id);
            this.sections.splice(i, 1);

            let string = "sections remaining: [";
            for(let i = 0; i < this.sections.length; i++){
                string += "id: " + this.sections[i].id + ",";
            }
            string += "]";
            console.log(string);
        },
    },
    template: `
    <v-app>
        <div class="d-flex overflow-x-auto">
            <draggable :options="{group:'ITEMS'}" class="d-flex pa-3">
                <task-section v-for="section in sections" :key="section.id" :section="section" :sections="sections" @dele-sec="deleSec"></task-section>
            </draggable>
            <v-btn class="ma-1" text icon color="indigo darken-1" @click="addSec">
                <v-icon>add</v-icon>
            </v-btn>
        </div>
    </v-app>
    `
})
