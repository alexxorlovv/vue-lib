import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
    components: {
        //hello: HelloComponent
    },
    props: {

    }
})
export default class Main extends Vue {
  name: string = "Main"

  mounted(){
  }
}
