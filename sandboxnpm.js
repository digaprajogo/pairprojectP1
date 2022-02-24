const geolocation = require('geolocation')


let dataLokasi = geolocation.getCurrentPosition((error, position) => {
  if (error) {
    return error
  } else {
    return position
  }
})

console.log(dataLokasi);