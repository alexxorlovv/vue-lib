import Vue from 'vue'
import Component from 'vue-class-component'
import LeftMenuComponent from '@components/LeftMenuComponent.vue'
import VerticalMenuComponent from '@components/VerticalMenuComponent.vue'
import RightMenuComponent from '@components/RightMenuComponent.vue'
import UserMenuComponent from '@components/UserMenuComponent.vue'
import HeaderComponent from '@components/HeaderComponent.vue'
import FooterComponent from '@components/FooterComponent.vue'
@Component({
    components: {
        LeftMenuComponent,
        VerticalMenuComponent,
        RightMenuComponent,
        UserMenuComponent,
        HeaderComponent,
        FooterComponent
    },
    props: {

    }
})

class BaseLayout extends Vue {
  name: string = 'BaseLayout'
  isOpen: boolean = false

  toogle(){
    this.isOpen = !this.isOpen
  }
  changeMenuCallback(change: boolean) {
    this.isOpen = change
  }
}

export default BaseLayout
