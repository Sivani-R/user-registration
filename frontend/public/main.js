
function getToken() {
  return localStorage.getItem('token');
}


document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const response = await fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  });

  const result = await response.json();
  console.log(result);
});


document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  const result = await response.json();
  console.log(result);
  localStorage.setItem('token', result.token);
});


document.getElementById('setAvailabilityForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const availableFrom = document.getElementById('availableFrom').value;
  const availableTo = document.getElementById('availableTo').value;

  const response = await fetch('http://localhost:3000/set-availability', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify({ availableFrom, availableTo })
  });

  const result = await response.json();
  console.log(result);
  loadAppointments(); // Refresh the appointments list
});

// Load Appointments
async function loadAppointments() {
  const response = await fetch('http://localhost:3000/appointments', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    }
  });

  const appointments = await response.json();
  const appointmentList = document.getElementById('appointmentList');
  appointmentList.innerHTML = '';
  appointments.forEach(appointment => {
    const li = document.createElement('li');
    li.textContent = `Appointment at ${appointment.time}`;
    appointmentList.appendChild(li);
  });
}

// Load Available Slots (for schedule viewer)
async function loadAvailableSlots(userId) {
  const response = await fetch(`http://localhost:3000/availability/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const slots = await response.json();
  const slotList = document.getElementById('slotList');
  slotList.innerHTML = '';
  slots.forEach(slot => {
    const li = document.createElement('li');
    li.textContent = `From ${slot.availableFrom} to ${slot.availableTo}`;
    slotList.appendChild(li);
    li.addEventListener('click', () => {
      scheduleAppointment(userId, slot.availableFrom);
    });
  });
}

// Schedule an Appointment
async function scheduleAppointment(userId, time) {
  const response = await fetch('http://localhost:3000/schedule', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId, time })
  });

  const result = await response.json();
  console.log(result);
  alert('Appointment scheduled successfully');
}

// Load data when the page loads
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('appointmentList')) {
    loadAppointments();
  }
  if (document.getElementById('slotList')) {
    // Assuming we have a way to get the userId, e.g., from the URL or a global variable
    const userId = 1; // Replace with the actual userId
    loadAvailableSlots(userId);
  }
});

