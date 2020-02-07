const appid = `SOIeFAfIl20HWOvfJncs1rqYb9qjikYXQ0Q7A4l2`
const google = `AIzaSyDs0_X62ilJe6Rh5JPZ93NhFh2kSjRY5JE`
const lon = document.querySelector('#lon');
const lat = document.querySelector('#lat');
const date = document.querySelector('#date');
const search = document.querySelector('#search');

let get_pod = async function () {
    const data = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${appid} `,
    ).then(data => {
        console.log(data)
        pod(data)
    }).catch(err => {
        console.log(err);
    })
}
get_pod()


const pod = function (data) {
    let image = data.data.hdurl
    let date = data.data.date
    let explanation = data.data.explanation
    let title = data.data.title
    let newDiv = document.createElement('div')

    newDiv.innerHTML +=
        `<p class="page">${title}</p>
    <div class="content">
    <img class="image" src="${image}">
    <div class="content-details fadeIn-bottom fadeIn-left">
    <p class="date">${date}</p>
    <h1 id="explanation">${explanation}</h1></div></div>`
    document.querySelector('.pod').append(newDiv)
}


let get_mars = async function () {
    const data = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=${appid} `,
    ).then(data => {
        console.log(data)
        mars(data)
    }).catch(err => {
        console.log(err);
    })
}
get_mars()

const mars = function (data) {
    let rover = data.data.latest_photos
    //select the specific data we want from the dataset we get from the api
    //use .foreach with a function variable to go through array in data
    rover.forEach(pic => {
        let newDiv = document.createElement('div')
        newDiv.className = "img_wrap";
        //create newDiv with class "img_wrap"
        newDiv.innerHTML +=
            `<img class="img" src=${pic.img_src}>
        <p class="img_date">Date: ${pic.earth_date}</p>
        <p class="img_description">Rover Name: ${pic.rover.name}</p>`
        //line 49 selects lines 50-52 and stores them in newDiv, owith the mutable api data
        document.querySelector('#rover').append(newDiv)
        //select id from div in mars.html
    })

}

const earth = function (data) {
    let image = data.data.url
    //select the specific data we want from the dataset we get from the api
    let newDiv = document.createElement('div')
    newDiv.innerHTML += `<img class="img" src="${image}">`
    document.querySelector('.earth').append(newDiv)
    //create newDiv 
    //store image recieved from api data 
    //insert in earth class in earth.html
}

search.addEventListener("click", async () => {

    let response = await axios.get(`https://api.nasa.gov/planetary/earth/imagery?lon=
    ${lon.value}&lat=${lat.value}&date=${date.value}&cloud_score=False&api_key=${appid}`);
    //call data from api using axios and 
    console.log(response)
    earth(response)
})








