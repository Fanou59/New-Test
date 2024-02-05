const form = document.querySelector('form')
const aliment = document.querySelector('input')
const nom = document.querySelector('#nom')
const nutriscore = document.querySelector('#nutriscore')
const allergene = document.querySelector('#allergene')
const image = document.querySelector('img')

const apiUrl = 'https://world.openfoodfacts.net/api/v0/product/'

// Remplace 'CODE_BARRE' par le code-barres du produit que tu souhaites interroger
let codeBarre = ''

// Construis l'URL complète en concaténant l'API URL et le code-barres

form.addEventListener('submit', (e) => {
  e.preventDefault()
  codeBarre = `${aliment.value}`
  // Utilise la fonction fetch pour interroger l'API
  const fullUrl = `${apiUrl}${codeBarre}.json`
  fetch(fullUrl)
    .then((response) => response.json())
    .then((data) => {
      // Traite les données de la réponse ici
      if (data.status === 1) {
        const productName = data.product.product_name
        const nutriscoreData = data.product.nutriscore_grade
        const allergens = tagsString(data.product.allergens)
        const imgSrc = data.product.image_front_url

        nom.innerHTML = `Nom du produit : ${productName}`
        nutriscore.innerHTML = `Nutriscore : ${nutriscoreData}`

        allergene.innerHTML = `Allergènes : ${allergens}`
        image.src = `${imgSrc}`

        console.log(data)
      } else {
        console.log('Produit non trouvé')
      }
    })
    .catch((error) => {
      // Gère les erreurs ici
      console.error('Erreur lors de la requête API:', error)
    })
})

function tagsString(tag) {
  const tagsArray = tag.split(',')
  const formattedTags = tagsArray.map((tague) => {
    const parts = tague.split(':')
    return parts[1].toLowerCase()
  })
  return formattedTags.join(', ')
}
