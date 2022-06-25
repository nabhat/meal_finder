const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

populateUI()

//Save selected movie index and price
function setMovieData(movieIndex,moviePrice) {
    localStorage.setItem('selectedMovieIndex',movieIndex);
    localStorage.setItem('selectedMoviePrice',moviePrice);
}

//Update total and count
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    //copy selected seats into arr
    //map through array
    //return a new array indexes
    const seatsindex = [...selectedSeats].map((seat) =>
         [...seats].indexOf(seat)
        )

    //Implementing local storage
    // localStorage.setItem('name',"alok")
    localStorage.setItem('selectedSeats',JSON.stringify(seatsindex))


    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

//Get data from local storage and populate ui
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))

    if (selectedSeats !== null && selectedSeats.length>0) {
        seats.forEach((seat,index) =>{
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        })
    }
}

//movie select event
movieSelect.addEventListener('change',e =>{
    ticketPrice = +e.target.value
    setMovieData(e.target.selectedIndex,e.target.value)
    updateSelectedCount();
})

//seat click event
container.addEventListener('click',(e)=>{
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected')

        updateSelectedCount();
    }
})
