
const Abroad = {
  bind: function (el: any, binding: any) {
    let finder = document.querySelector(binding.arg)
    finder.addEventListener('mouseup', (e: any) => {
      if (el !== e.target && !el.contains(e.srcElement)) {
        binding.value(e)
      }
    })
  },
  unbind: function (el: any, binding: any) {
    let finder = document.querySelector(binding.arg)
    finder.removeEventListener('mouseup')
  }
}

export default Abroad
