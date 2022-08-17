document.querySelector('button').addEventListener('click', getFetch)
const picBox = document.querySelector('#picBox')
const links = document.querySelectorAll('a')


function getFetch(){
  let page = Math.floor(Math.random() * 10)
  const url = `https://picsum.photos/v2/list?limit=100&page=${page}`
  const baseUrl = 'https://picsum.photos/id'

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        const greyscale = document.querySelector('#greyscale').checked
        const blur = Number(document.querySelector('#blur').value)
        const imgHeight = document.querySelector('#height').value || 250
        const imgWidth = document.querySelector('#width').value || imgHeight
        const piccies = document.querySelectorAll('img')
        picBox.style.width = `${2 * imgWidth + 10}px`
        let imgUrls = []
        let indexes = []
        let imgLinks = []
        console.log(data)
        while (indexes.length < 6) {
          let num = Math.floor(Math.random() * 100)
          if (indexes.includes(num)) {continue}
          indexes.push(num)
        }
        let extraBits = ''
        if (greyscale && blur) {
          extraBits = `?grayscale&blur=${blur}`
        }
        else if (greyscale) {
          extraBits = "?grayscale"
        }
        else if (blur) {
          extraBits = `?blur=${blur}`
        }
        for (let index of indexes) {
          imgUrls.push(`${baseUrl}/${data[index].id}/${imgWidth}/${imgHeight}${extraBits}`)
          imgLinks.push(data[index].url)
        }
        piccies.forEach((e, i) => e.src = imgUrls[i])
        links.forEach((e, i) => e.href = imgLinks[i])
      })
      /*.catch(err => {
          console.log(`error ${err}`)   This isn't actually all that useful as it makes every error point to this line
      }); */
}

