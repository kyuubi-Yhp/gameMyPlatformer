let hero = document.getElementById('hero')

const clickHandler = () => {
  if (hero.style.backgroundColor === 'grey') {
    hero.style.backgroundColor = 'blue'
  } else {
    hero.style.backgroundColor = 'grey'
  }
}
hero.onclick = clickHandler



// hero.addEventListener ('click', function() {
//   colorChange()
// })

// function colorChange() {
//   if (hero.style.backgroundColor === 'grey') {
//     hero.style.backgroundColor = 'blue'
//   } else {
//     hero.style.backgroundColor = 'grey'
//   }
// }
