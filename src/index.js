import './index.scss'
import logo from './images/logo.png'
import { debounce } from './utils/index'

function component () {
  const element = document.createElement('div')
  element.innerHTML = 'Hello World!'
  element.classList.add('hello')

  const myImages = new Image()
  myImages.src = logo
  element.appendChild(myImages)
  console.error(new Error('错误测试'))
  debounce(()=>{
    console.log('debounce')
  })()
  return element
}

document.body.appendChild(component())
