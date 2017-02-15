export function liga(card) {
    const searchTerm = card.name
    //const url = `https://liga-price-crawler-vdmjaysrhv.now.sh/price?card=${searchTerm}`
    const url = `http://localhost:3000/price?card=${searchTerm}`

    fetch(url)
    .then(response => response.json())
    .then(data => { console.log(data) })
    .catch(err => console.error(url, err.toString()))
        
    return "0"
} 