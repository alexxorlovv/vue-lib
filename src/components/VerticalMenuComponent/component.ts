import Vue from 'vue'
import Component from 'vue-class-component'
import SideBarElement from '@elements/SideBarElement.vue'
import IconElement from '@elements/IconElement.vue'
import ListElement from '@elements/ListElement.vue'
import ListItemElement from '@elements/ListItemElement.vue'
import BadgeElement from '@elements/BadgeElement.vue'
import MenuItemListComponent from './components/MenuItemListComponent.vue'
import menuData from './menu'
import { Watch } from 'vue-property-decorator'

//Vue.component("MenuItemComponent", MenuItemComponent)

@Component({
    components: {
      ListElement,
      SideBarElement,
      IconElement,
      ListItemElement,
      BadgeElement,
      MenuItemListComponent
    },
    props: {
      isOpenProp: {
        type: Boolean,
        required: true,
        default: false
      },
      theme: {
        type: String,
        required: false,
        default: 'default',
        validator: function(value: string): boolean {
            return [
              'default'
            ].indexOf(value) !== -1
        }
      },
      placement: {
        type: String,
        required: false,
        default: 'left',
        validator: function (value: string): boolean {
          return [
            'left',
            'right',
          ].indexOf(value) !== -1
        }
      },
      position: {
        type: String,
        required: false,
        default: 'static',
        validator: function (value: string): boolean {
          return [
            'static',
            'fixed',
          ].indexOf(value) !== -1
        }
      }
    }
})

export default class VerticalMenuComponent extends Vue {
  name: string = 'VerticalMenuComponent'
  isOpen: boolean = true
  isClose: boolean = false
  theme: string
  placement: string
  position: string
  elements: any = menuData.elements
  sections: any = menuData.sections
  isOpenProp: boolean
  classObject: object = {
    'menu_left': false,
    'menu_right': false,
    'side-bar_fixed-right': false,
    'side-bar_fixed-left': false,
    'menu_closed': false
    //'menu_theme_dark': false
  }
  isCloseChildren: boolean = false
  isDiactiveMenu: boolean = false
  diactiveMenuHandler() {
    this.isDiactiveMenu = true
    this.$nextTick(() => {
      this.isDiactiveMenu = false
    })
  }
  closeChildrenHandler() {
    this.isCloseChildren = true
    this.$nextTick(() => {
      this.isCloseChildren = false
    })
  }

  close() {
    this.isClose = true
    this.$nextTick(() => {
      this.isClose = false
    })
  }
  created() {
    this.isOpen = this.isOpenProp
    if (this.placement === 'left') this.$set(this.classObject, 'menu_left', true)
    if (this.placement === 'right') this.$set(this.classObject, 'menu_right', true)
    if (this.placement === 'right' && this.position == 'fixed') this.$set(this.classObject, 'side-bar_fixed-right', true)
    if (this.placement === 'left' && this.position == 'fixed') this.$set(this.classObject, 'side-bar_fixed-left', true)
    this.$set(this.classObject, 'menu_theme_' + this.theme, true)
    if (this.isOpen) {
      this.openMenu()
    } else {
      this.closeMenu()
    }
  }

  closeMenu() {
    this.isOpen = false
    this.$set(this.classObject, 'menu_closed', true)
    this.$emit("changeMenu",this.isOpen)
  }

  openMenu() {
    this.isOpen = true
    this.$set(this.classObject, 'menu_closed', false)
    this.$emit("changeMenu", this.isOpen)
  }

  toogle(): void {
    this.close()
    if (this.isOpen) {
      this.closeMenu()
    } else {
      this.openMenu()
    }
  }

  @Watch('isOpenProp')
  openPropWatch(value: boolean, oldVal: boolean) {
      if(value) {
        this.openMenu()
      } else {
        this.closeMenu()
      }
  }
}
