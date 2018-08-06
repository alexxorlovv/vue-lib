import Icon from './Icon.ts'
import TypeApplication from './TypeApplication.ts'
import Vue from 'vue'

class Application extends Vue {
    public name: string
    public description: string
    public icon: Icon
    public type: TypeApplication
    public isDefault: boolean
}

export default Application
