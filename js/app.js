// ---------------------------------------- JQUERY SCROLLIFY ----------------------------------------
// https://projects.lukehaas.me/scrollify/
$(() => {
  $.scrollify({
    section: "section",
    sectionName: "section-name",
    interstitialSection: "",
    easing: "easeOutExpo",
    scrollSpeed: 1100,
    offset: 0,
    scrollbars: true,
    standardScrollElements: "",
    setHeights: false,
    overflowScroll: true,
    updateHash: true,
    touchScroll: true,
    before: () => {
      document.getElementById('homeDownArrow').classList.remove('animated', 'infinite', 'bounceInUp');
    },
    after: () => {
      if (window.location.hash === "#pageOne") {
        // Fading top bar 
        $('#siteHeader').removeClass('fadeInDown');
        $('#siteHeader').addClass('fadeOutUp');
        // Page title
        $('#currentPageTitle').text('Home');

      } else if (window.location.hash === "#pageTwo") {
        // Fading top bar
        $('#siteHeader').removeClass('d-none');
        $('#siteHeader').removeClass('fadeOutUp');
        $('#siteHeader').addClass('fadeInDown');
        // Page title
        $('#currentPageTitle').text('Route');
        // Progress bar
        $('#progressBar').attr("class", "c100 p20 small");
        $('#progressText').text('20%');

      } else if (window.location.hash === "#pageThree") {
        $('#siteHeader').removeClass('d-none');
        $('#siteHeader').addClass('fadeInDown');
        // Page title
        $('#currentPageTitle').text('Vehicle');
        // Progress bar
        $('#progressBar').attr("class", "c100 p40 small");
        $('#progressText').text('40%');

      } else if (window.location.hash === "#pageFour") {
        $('#siteHeader').removeClass('d-none');
        $('#siteHeader').addClass('fadeInDown');
        // Page title
        $('#currentPageTitle').text('Overview');
        // Progress bar
        $('#progressBar').attr("class", "c100 p60 small");
        $('#progressText').text('60%');

      } else if (window.location.hash === "#pageFive") {
        $('#siteHeader').removeClass('d-none');
        $('#siteHeader').addClass('fadeInDown');
        // Page title
        $('#currentPageTitle').text('Confirm');
        // Progress bar
        $('#progressBar').attr("class", "c100 p80 small");
        $('#progressText').text('80%');

      } else if (window.location.hash === "#pageSix") {
        $('#siteHeader').removeClass('d-none');
        $('#siteHeader').addClass('fadeInDown');
        // Page title
        $('#currentPageTitle').text('Confirm');
        // Progress bar
        $('#progressBar').attr("class", "c100 p90 small");
        $('#progressText').text('90%');

      } else if (window.location.hash === "#pageSeven") {
        $('#siteHeader').removeClass('d-none');
        $('#siteHeader').addClass('fadeInDown');
        // Page title
        $('#currentPageTitle').text('Complete');
        // Progress bar
        $('#progressBar').attr("class", "c100 p100 small");
        $('#progressText').text('100%');
      }
    },
    afterResize: () => { },
    afterRender: () => { }
  });
});
// Ability to turn off auto-scroll
$('#btnDisableScrollify').click(() => {
  $.scrollify.disable();
});
// Back to top button
$('.prev').click(() => {
  $.scrollify.move('#pageOne');
});
// Next Button
$('.next').click(() => {
  $.scrollify.next();
});

// ---------------------------------------- DATE & TIME PICKER ----------------------------------------
// https://tempusdominus.github.io/bootstrap-4/
$(() => {
  $('#datetimepickerPickUp').datetimepicker({
    format: 'DD/MM/YYYY HH:mm',
  });
  $('#datetimepickerDropOff').datetimepicker({
    format: 'DD/MM/YYYY HH:mm',
    useCurrent: false
  });
  $('#datetimepickerDOB').datetimepicker({
    format: 'DD/MM/YYYY',
  });

  // Set drop-off date to be pick-up date plus amount of days of chosen route
  $("#datetimepickerPickUp").on("change.datetimepicker", (e) => {

    $('#datetimepickerDropOff').datetimepicker('minDate', moment(e.date).add(chosenDays.textContent, 'days')); //moment is a function of moment.js 
    $('#datetimepickerDropOff').datetimepicker('date', moment(e.date).add(chosenDays.textContent, 'days'));
  });
});



// ---------------------------------------- GLOBAL STUFF ----------------------------------------
document.addEventListener('DOMContentLoaded', () => {

  loadAllRoutes();
  backgroundImageCarousel();
});


function backgroundImageCarousel() {

  // Only run background slider on screen width 768px and up
  if (window.innerWidth > 768) {

    // Create Array for all the images of all the routes
    const allRouteImages = [];
    // Loop through entire array
    for (let i = 0; i < routesNZ.length; i++) {
      // Loop trough every sub-array
      for (let j = 0; j < routesNZ[i].itinerary.length; j++) {

        // Check if image exist (does not return undefined)
        if (typeof routesNZ[i].itinerary[j][4] === 'undefined' || typeof routesNZ[i].imgPath === 'undefined') {
          console.log('Houston we have a problem');
        } else {
          // Check if image is not an empty string
          if (routesNZ[i].itinerary[j][4] !== '') {
            
            const fullImgPath = routesNZ[i].imgPath + routesNZ[i].itinerary[j][4];
            // Push all image paths into new array
            allRouteImages.push(fullImgPath);
          }
        }
      }
    }


    const body = document.querySelector('.body-background-carousel');
    
    setInterval(() => {
      // Get random number between 0 and length of image array
      let count = getRandomNum(0, allRouteImages.length);

        // Preload image
        const bgImg = new Image();
        bgImg.src = allRouteImages[count];

        // Give the browser some time to fully load the image before changing it. The very first change will be 1 second later.
        setTimeout(() => {
          // Set background image url
          body.style.background = 'url("' + bgImg.src + '") no-repeat center center';
          // Background styles have to be re-set, or they will be default
          body.style.backgroundAttachment = 'fixed';
          body.style.backgroundSize = 'cover';
        }, 1000);

    }, 5000);
  }
}

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


// ---------------------------------------- ROUTE SECTION ----------------------------------------


// IDENTIFIERS
const UInumDays = document.getElementById('UInumDays'),
  UIsliderDays = document.getElementById('sliderDaysRange'),
  badgeNorth = document.getElementById('badgeNorth'),
  badgeSouth = document.getElementById('badgeSouth'),
  badgeBoth = document.getElementById('badgeBoth'),
  badgeTotal = document.getElementById('badgeTotal');
  //page1 = document.getElementById('page1');

let chosenDays = document.getElementById('chosenDays'),
  chosenRoute = document.getElementById('chosenRoute'),
  chosenPeople = document.getElementById('chosenPeople'),
  chosenVehicle = document.getElementById('chosenVehicle');

let chosenRouteObject; // Initiate global variable to use in final calculations

// Split entire array of routes into 3 sub-arrays
const routesNorth = routesNZ.filter(route => route.island === 'north'); // returns array
const routesSouth = routesNZ.filter(route => route.island === 'south');
const routesBoth = routesNZ.filter(route => route.island === 'both');



// Load all routes after page load without conditions
function loadAllRoutes() {
  for (let i = 0; i < routesNorth.length; i++) {
    createRouteThumbs(i, 'north-island-thumbs', routesNorth, northIslandThumbContainer);
  }
  for (let i = 0; i < routesSouth.length; i++) {
    createRouteThumbs(i, 'south-island-thumbs', routesSouth, southIslandThumbContainer);
  }
  for (let i = 0; i < routesBoth.length; i++) {
    createRouteThumbs(i, 'both-island-thumbs', routesBoth, bothIslandThumbContainer);
  }
  updateBadge();
}


function createRouteThumbs(i, islandClass, routeArr, thumbContainer) {
  //console.log(islandClass);
  const div = document.createElement('div');
  div.classList.add('col-6', 'col-md-3', 'px-2', 'mb-3');
  div.innerHTML = `
  <div class="${islandClass} card">
    <img class="card-img-top" src="${routeArr[i].imgPath + routeArr[i].images[0]}" alt="" name="${routeArr[i].route}">
    <div class="card-route-inner-shadow">
      <div class="card-route-title py-1 m-0">
        <h4>${routeArr[i].route}</h4>
      </div>
    </div>
  </div>
  `;
  thumbContainer.appendChild(div);
}

// Range input event
UIsliderDays.addEventListener('input', () => {

  // Display days that have been input
  UInumDays.textContent = UIsliderDays.value + ' Days';
  // Update overview page
  chosenDays.textContent = UIsliderDays.value;
  // Run function to filter the routes
  filterRoutes(routesNorth, document.querySelectorAll('.north-island-thumbs'));
  filterRoutes(routesSouth, document.querySelectorAll('.south-island-thumbs'));
  filterRoutes(routesBoth, document.querySelectorAll('.both-island-thumbs'));
  updateBadge();
});


// filter amount of thumbnails shown in the tabs by amount of days input
function filterRoutes(r, t) {

  for (let i = 0; i < r.length; i++) {
    // If days input is less than the days of the route stored in the object, hide
    if (UIsliderDays.value < r[i].days && !t[i].classList.contains('d-none')) {
      t[i].classList.add('d-none');
    }
    // If days input is more or equal to the days of the route in the object, show
    if (UIsliderDays.value >= r[i].days && t[i].classList.contains('d-none')) {
      t[i].classList.remove('d-none');
    }
  }
}


function updateBadge() {
  badgeNorth.textContent = northIslandThumbContainer.childElementCount - document.querySelectorAll('#northIslandThumbContainer .d-none').length;
  badgeSouth.textContent = southIslandThumbContainer.childElementCount - document.querySelectorAll('#southIslandThumbContainer .d-none').length;
  badgeBoth.textContent = bothIslandThumbContainer.childElementCount - document.querySelectorAll('#bothIslandThumbContainer .d-none').length;
  badgeTotal.innerHTML = ` <span class="text-muted"><small>(${parseInt(badgeNorth.textContent) + parseInt(badgeSouth.textContent) + parseInt(badgeBoth.textContent)} Routes)</small></span>`;
}



// ---------------------------------------- TRANSPORTATION SECTION ----------------------------------------


// IDENTIFIERS
const UIsliderPeople = document.getElementById('sliderPeopleRange');
const UInumPeople = document.getElementById('numPeople');
const transportThumbContainer = document.getElementById('transportThumbContainer');

// EVENT LISTENERS
transportThumbContainer.addEventListener('click', showTransportModal); // Listen for click on all thumbnails


// Range slider input event
UIsliderPeople.addEventListener('input', () => {
  // Display number of people that have been input
  if (UIsliderPeople.value === '0') {
    UInumPeople.textContent = 'Drag the slider';
  } else if (UIsliderPeople.value === '1') {
    UInumPeople.textContent = UIsliderPeople.value + ' Person';
  } else {
    UInumPeople.textContent = UIsliderPeople.value + ' People';
  }
  filterTransport(UIsliderPeople.value);
  // Update overview page
  chosenPeople.textContent = UIsliderPeople.value;
});


function filterTransport(num) {
  // Remove elements first
  while (transportThumbContainer.firstChild) {
    transportThumbContainer.removeChild(transportThumbContainer.firstChild);
  }
  // Filter amount of transport options by amount of people input AND the length of time they intend to be traveling
  for (let i = 0; i < transportOptions.length; i++) {
    // If days input is more than or equal to minimum days, AND less than or equal to maximum days
    if (num >= transportOptions[i].minPeople && num <= transportOptions[i].maxPeople) {
      // If days input falls in the range between min days and max days, run function
      if (UIsliderDays.value >= transportOptions[i].minDays && UIsliderDays.value <= transportOptions[i].maxDays) {
        createVehicle(transportOptions[i]);
      }
    }
  }
}


function createVehicle(v) {
  // Create vehicle thumbnail in DOM
  const div = document.createElement('div');
  div.classList.add('col-6', 'col-md-3', 'px-2', 'mb-3');
  div.innerHTML = `
    <div class="div1 transport-thumb card shadow">
      <img class="card-img-top" src="${v.thumb}" alt="${v.alt}" name="${v.name}">
    </div>
  `;
  transportThumbContainer.appendChild(div);
}


function showTransportModal(e) {
  // Iterate through array to find match
  try {
    transportOptions.forEach(vehicle => {
      if (vehicle.name === e.target.name) {

        calculateTotal(vehicle);
        // Set modal title to route name
        modalTitle.textContent = e.target.name;
        // Update overview page
        chosenVehicle.textContent = e.target.name;
        // Remove previously loaded content if any
        while (modalContent.firstChild) {
          modalContent.removeChild(modalContent.firstChild);
        }

        // Create image 
        const imgDiv = document.createElement('div');
        imgDiv.innerHTML = `
          <img class="img-fluid" src="${vehicle.images[0]}" alt="${vehicle.alt}">
          `;
        modalContent.appendChild(imgDiv);

        // Create vehicle info
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('mt-4');
        infoDiv.innerHTML = `
          <p>${vehicle.name}</p>
          <p>Price per day: <span class="">$${vehicle.price}</span> NZD</p>
          <p>Fuel consumption: <span class="">${vehicle.fuelConsumption}</span> Liter per 100Km</p>
          <p>If you drive the route "${chosenRoute.textContent}", which is ${chosenRouteObject.distance} Km, 
          and will spend ${UIsliderDays.value} days, the hire cost for this vehicle comes to $${calcBasePrice}.<br>
          Additionally, you will use ${((chosenRouteObject.distance / 100) * vehicle.fuelConsumption).toFixed(2)} Liters of ${vehicle.fuelType}.
          This will cost you an extra $${calcFuelPrice}.
          </p>
          `;
        modalContent.appendChild(infoDiv);

        modalConfirm.classList.add('modalVehicle');

        // Add event listener on confirm button in modal
        document.querySelector('.modalVehicle').addEventListener('click', () => {
          $.scrollify.enable();
          $.scrollify.move("#pageFour");
        });
      }
    });
    // Show Bootstrap Modal
    showModal();
  }
  catch (error) {
    alert('Go back to select days and route first');
  }
}



// ---------------------------------------- MODAL SECTION ----------------------------------------


// IDENTIFIERS
const modalTitle = document.getElementById('modalTitle'),
  modalContent = document.getElementById('modalContent'),
  modalConfirm = document.querySelector('.modalConfirm'),
  northIslandThumbContainer = document.getElementById('northIslandThumbContainer'),
  southIslandThumbContainer = document.getElementById('southIslandThumbContainer'),
  bothIslandThumbContainer = document.getElementById('bothIslandThumbContainer');


// EVENT LISTENERS
northIslandThumbContainer.addEventListener('click', showRouteModal);
southIslandThumbContainer.addEventListener('click', showRouteModal);
bothIslandThumbContainer.addEventListener('click', showRouteModal);


function showModal() {
  // Show Bootstrap Modal
  $('#modalRoute').modal('show');
  // Turn off scrollify so that modal can be scrolled
  $('#modalRoute').on('shown.bs.modal', (e) => {
    $.scrollify.disable();
  });
  // Re-enable scrollify when modal closes
  $('#modalRoute').on('hidden.bs.modal', (e) => {
    $.scrollify.enable();
  });
  // listen for click on confirm button to go to next page
  modalConfirm.addEventListener('click', () => {
    $.scrollify.enable();
    $.scrollify.next();
  });
}


function showRouteModal(e) {

  // Make sure we get the right element as e.target
  let eTarget;
  if (e.target.nodeName === 'H4') {
    eTarget = e.target.parentElement.parentElement.parentElement.firstElementChild.name;
  } else if (e.target.nodeName === 'DIV' && e.target.classList.contains('card-route-title')) {
    eTarget = e.target.parentElement.parentElement.firstElementChild.name;
  } else {
    eTarget = e.target.parentElement.firstElementChild.name;
  }

  // Iterate through routes array to find object/route info that matches e.target
  routesNZ.forEach(routeObject => {
    if (routeObject.route === eTarget) {

      // Set modal title to route name
      modalTitle.textContent = routeObject.route + ' - ' + routeObject.distance + ' Km' + ' - ' + routeObject.days + ' days';
      // Update overview page
      chosenRoute.textContent = routeObject.route;
      // Set Gobal variable to use in total calculation
      chosenRouteObject = routeObject;
      // Update Pick up and drop off at #page5
      formLocationPickup.value = chosenRouteObject.from;
      formLocationDropOff.value = chosenRouteObject.to;

      createRouteInfo(routeObject);
      createItinerary(routeObject);
    }
  });

  // Show Bootstrap Modal
  showModal();
}

function createRouteInfo(r) {
  // Remove previously loaded content if any
  while (modalContent.firstChild) {
    modalContent.removeChild(modalContent.firstChild);
  }

  // Insert Google Maps Image
  const routeMap = document.createElement('div');
  routeMap.innerHTML = `<img class="img-fluid" src="${r.imgPath + r.images[2]}" alt="map">`;
  // Insert route description
  const routeDescription = document.createElement('div');
  routeDescription.innerHTML = `<p class="">${r.description}</p>`;

  // Add extra set of buttons in the modal above the fold
  const modalBtn = document.createElement('div');
  modalBtn.classList.add('modal-footer');
  modalBtn.innerHTML = `
  <button type="button" class="btn btn-secondary" data-dismiss="modal" id="">Close</button>
  <button type="button" class="btn btn-primary shadow-lg modalConfirm" data-dismiss="modal" id="">Drive This</button>
  `;

  // piece it together
  modalContent.append(routeMap, routeDescription, modalBtn);

  // Add event listener to confirm button
  document.querySelector('.modal-footer').lastElementChild.addEventListener('click', () => {
    $.scrollify.enable();
    $.scrollify.next();
  });
}

function createItinerary(r) {
  // Create HTML elements for each day, create itinerary and insert into the DOM
  const containerDiv = document.createElement('div');
  containerDiv.classList.add('list-itinerary');

  r.itinerary.forEach(day => {
    // day number
    const dayNum = document.createElement('span');
    dayNum.innerHTML = 'Day ' + day[0];
    // day title
    const dayTitle = document.createElement('h3');
    dayTitle.innerHTML = day[1];
    // day distance
    const dayDistance = document.createElement('span');
    if (day[2] !== 0) {
      dayDistance.innerHTML = day[2] + 'Km - ';
    }
    // day driving time, if any
    const dayDrivingTime = document.createElement('span');
    if (!day[3]) {
      dayDrivingTime.innerHTML = 'This is a non-driving day';
    } else {
      dayDrivingTime.innerHTML = day[3];
    }
    // day image
    const dayImage = document.createElement('div');
    if (day[4]) {
      dayImage.innerHTML = `<img src="${r.imgPath + day[4]}" class="img-fluid mt-2 mb-5">`;
    }
    // put all the pieces together // !!! IE DOESNT SUPPORT APPEND !!!
    containerDiv.append(dayNum, dayTitle, dayDistance, dayDrivingTime, dayImage);
  });
  modalContent.appendChild(containerDiv);
}



// ---------------------------------------- OVERVIEW SECTION ----------------------------------------


// IDENTIFIERS
const totalBasePrice = document.getElementById('totalBasePrice'),
  totalFuel = document.getElementById('totalFuel'),
  totalInsurancePrice = document.getElementById('totalInsurancePrice'),
  imgOverviewRoute = document.getElementById('imgOverviewRoute'),
  imgOverviewVehicle = document.getElementById('imgOverviewVehicle'),
  totalPrice = document.getElementById('totalPrice');

let calcBasePrice = 0,
  calcFuelPrice = 0,
  calcInsurance = 0;

// EVENT LISTENERS
document.getElementById('changeDays').addEventListener('click', () => $.scrollify.move("#pageTwo"));
document.getElementById('changeRoute').addEventListener('click', () => $.scrollify.move("#pageTwo"));
document.getElementById('changePeople').addEventListener('click', () => $.scrollify.move("#pageThree"));
document.getElementById('changeVehicle').addEventListener('click', () => $.scrollify.move("#pageThree"));


function calculateTotal(vehicle) {
  calcBasePrice = vehicle.price * UIsliderDays.value;
  calcFuelPrice = (((chosenRouteObject.distance / 100) * vehicle.fuelConsumption) * vehicle.fuelPrice).toFixed(2);
  calcInsurance = UIsliderDays.value * vehicle.insurance;

  const calcTotal = parseFloat(calcBasePrice) + parseFloat(calcFuelPrice) + parseFloat(calcInsurance);

  totalBasePrice.textContent = `${vehicle.name} for ${UIsliderDays.value} days = $${calcBasePrice} NZD`;
  totalFuel.textContent = `$${calcFuelPrice} NZD`;
  totalInsurancePrice.textContent = `${UIsliderDays.value} days, at $${vehicle.insurance} per day = $${calcInsurance} NZD`;

  totalPrice.textContent = `$${calcTotal.toFixed(2)}`;

  // Image of route
  imgOverviewRoute.src = chosenRouteObject.imgPath + chosenRouteObject.images[1];
  // Image caption
  imgOverviewRoute.nextElementSibling.textContent = chosenRouteObject.route;
  // Image of vehicle
  imgOverviewVehicle.src = vehicle.images[0];
  // Image caption
  imgOverviewVehicle.nextElementSibling.textContent = vehicle.name;
}



// ---------------------------------------- BOOKING SECTION ----------------------------------------


// Disabling form submissions if there are invalid fields
const bookingForm = document.getElementById('bookingForm');
// Custom form validation
bookingForm.addEventListener('submit', function (e) {
  if (bookingForm.checkValidity() === false) {
    //e.preventDefault();
    e.stopPropagation();
  }
  // prevent form submit for demo purposes
  e.preventDefault();
  $.scrollify.next();
  bookingForm.classList.add('was-validated');
}, false);


const formLocationPickup = document.getElementById('formLocationPickup'),
  formLocationDropOff = document.getElementById('formLocationDropOff'),
  btnConfirmBooking = document.getElementById('btnConfirmBooking'),
  bookingForm2 = document.getElementById('bookingForm2');


// EVENT LISTENERS
// Part 1 of the booking form
bookingForm2.addEventListener('submit', (e) => {
  e.preventDefault();
  $.scrollify.next();
});
// Part 2
btnConfirmBooking.addEventListener('click', () => {
  $.scrollify.next();
});



// ---------------------------------------- CONFIRMATION SECTION ----------------------------------------


const btnWatchShow = document.getElementById('btnWatchShow');
const destroyable = document.querySelector('.destroyable');
const page7 = document.getElementById('page7');

// Remove content from page to watch the slideshow
btnWatchShow.addEventListener('click', () => {
  if (window.innerWidth < 768) {
    alert('The slide show is only available on desktop.');
    
  } else {
    page7.removeChild(destroyable);
  }
});