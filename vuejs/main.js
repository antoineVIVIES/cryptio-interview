var title = new Vue({
    el: '#title',
    data: {
        message: "This is my useless box !"
    }
})

var button = new Vue({
    el:"#button",
    data: {
        show: false,
        btnPrimary: true,
        btnDanger: false,
        activate: "Activate"
    },
    props: {

    },
    methods: {
        shows: function (){
            this.show = true
            this.btnDanger= true
            this.btnPrimary = false
            this.activate = "Deactivate"
        },
        leave: function (el, done) {
            this.show = false
            this.btnDanger= false
            this.btnPrimary = true
            this.activate = "Activate"
        },
    }
})