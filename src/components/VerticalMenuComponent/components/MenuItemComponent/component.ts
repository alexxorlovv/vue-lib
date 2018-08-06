import Vue from "vue"
import Component from "vue-class-component"
import IconElement from "@elements/IconElement.vue"
import BadgeElement from "@elements/BadgeElement.vue"
import { Watch } from 'vue-property-decorator'
import MenuItemListComponent from './../MenuItemListComponent.vue'
import ListItemElement from '@elements/ListItemElement.vue'
import CollapseTransitionElement from '@elements/CollapseTransitionElement.vue'
@Component({
  components: {
    IconElement,
    BadgeElement,
    ListItemElement,
    CollapseTransitionElement
  },
  props: {
    theme: {
      type: String,
      required: true
    },
    element: Object,
    isFirst: Boolean,
    placement: String,
    isHover: {
      type: Boolean,
      required: false,
      default: false
    },
    isOpen: Boolean,
    isClose: {
      type: Boolean,
      required: false,
      default: false
    },
    isCloseChildrenProp: Boolean,
    isDiactiveMenu: Boolean
  }
})
export default class MenuItemComponent extends Vue {
  public name: string = "MenuItemComponent"
  public isShow: boolean = false
  public element: any
  public isInit: boolean = false
  public isCloseChildrenProp: boolean
  public isCloseChildren: boolean = false
  public isActiveMenu = false
  public activeMenuInit = false

  constructor() {
    super();
  }


  diactiveMenuHandler() {
    this.$emit("diactiveMenuEvent")
  }

  mouseStart(e: MouseEvent) {
    if (!this.isShow) {
      this.isShow = true
    }
  }
  mouseEnd(e: MouseEvent) {
    if (this.isShow) {
      this.isShow = false
    }
  }

  closeChildrenHandler() {
    this.isCloseChildren = true
    this.$nextTick(() => {
      this.isCloseChildren = false
    })
  }

  /* Отправляем Item List Что нужно закрыть всех Item текущего уровня кроме этого */
  show(){
    this.isShow = true
    this.isInit = true
    this.$emit("closeChildrenEvent")
  }
  hide(){
    this.isShow = false
    this.closeChildrenHandler() //Говорим дочерним компонентам что им нужно закрытся
  }
  toogle(){
    this.isShow ? this.hide() : this.show()
  }

  activeMenuHandler() {
    this.isActiveMenu = true
    this.$emit("activeMenuEvent")
  }

  /* ItemList верхнего уровня  нам сказал что нужно закрыть и все дочерние элементы */
  @Watch('isCloseChildrenProp')
  CloseChildrenWatch(isCloseChildrenPropValue: boolean, oldVal: boolean) {
    /* Если я инициатор то мне не нужно закрыватся */
    if (isCloseChildrenPropValue && !this.isInit) {
      this.hide()
      //this.$emit("closeChildrenEvent")
    }
    if (this.isInit) {
      this.isInit = false
    }
  }
  @Watch('isClose')
  closeWatch(isCloseValue: boolean, oldVal: boolean) {
    if (isCloseValue) {
      this.hide()
    }
  }
  @Watch('$route')
  routeChange(to: any, from:any) {
    if(this.element.sub.length === 0) {
      if(this.element.link === to.path && this.isActiveMenu === false) {
        this.isActiveMenu = true
        this.activeMenuInit = true
        this.$emit("diactiveMenuEvent")
        this.$nextTick(()=> {
          this.$emit("activeMenuEvent")
        })
      }
    }
    //Отслеживаем только если нет sub elements

    //Если измененный роут равен линку итема
    //То:
    // 1 делаем итем активным
    // Отправляем событие о том что нужно сделать все элементы не активными кроме этого
    // Посылаем событие ListItem - о том что данный item является активным
  }

  @Watch("isDiactiveMenu")
  diactiveMenuChange(to: boolean, from: boolean) {
    if(!this.activeMenuInit && to) {
      this.isActiveMenu = false
    }
    if (this.activeMenuInit) {
      this.activeMenuInit = false
    }
  }

  beforeCreate() {
    this.$options.components.MenuItemListComponent = MenuItemListComponent
  }
  mounted() {
   }

  created(){
    if (this.$route.path === this.element.link && this.isActiveMenu === false) {
      this.isActiveMenu = true
      this.activeMenuInit = true
      this.$emit("diactiveMenuEvent")
      this.$nextTick(() => {
        this.$emit("activeMenuEvent")
      })
    }
  }
}
