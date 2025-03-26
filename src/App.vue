<script setup>
import { ref } from 'vue';
import VueScrollTo from 'vue-scrollto';
import emailjs from 'emailjs-com';

const services = [
  {
    title: 'Alquiler del Salón',
    description:
      'Amplio espacio con capacidad para 200 personas, totalmente climatizado y con iluminación moderna.',
    icon: 'fas fa-building',
  },
  {
    title: 'Área de Alberca',
    description:
      'Piscina con área de descanso, sombrillas y tumbonas para disfrutar al aire libre.',
    icon: 'fas fa-swimming-pool',
  },
  {
    title: 'Cocina Equipada',
    description:
      'Cocina industrial completamente equipada con electrodomésticos modernos.',
    icon: 'fas fa-utensils',
  },
  {
    title: 'Estacionamiento',
    description:
      'Amplio estacionamiento privado con capacidad para 50 vehículos.',
    icon: 'fas fa-car',
  },
  {
    title: 'Área Techada',
    description: 'Espacio versátil techado ideal para eventos al aire libre.',
    icon: 'fas fa-umbrella',
  },
  {
    title: 'Opcionales',
    description: 'Servicios adicionales como DJ, decoración, catering y más.',
    icon: 'fas fa-plus-circle',
  },
];

const events = [
  {
    name: 'Cumpleaños',
    icon: 'fas fa-birthday-cake',
    modelUrl: {
      light:
        'https://sketchfab.com/models/5a320a8839b948dfb4595fa91a5f6b70/embed',
      dark: 'https://sketchfab.com/models/4175776146ba4550a8dd643363b7b0aa/embed',
    },
  },
  {
    name: 'Boda',
    icon: 'fas fa-ring',
    modelUrl: {
      light:
        'https://sketchfab.com/models/90508ca0305743179e5744dc1d86854e/embed',
      dark: 'https://sketchfab.com/models/d2bc55028c4e47c5b103a2837bfb9c84/embed',
    },
  },
  {
    name: 'Baby Shower',
    icon: 'fas fa-baby-carriage',
    modelUrl: {
      light:
        'https://sketchfab.com/models/544d1cd8a61749f3baec90e5caccb5dc/embed',
      dark: 'https://sketchfab.com/models/2f28e38cc34540d0aac80958364220cc/embed',
    },
  },
  {
    name: 'XV',
    icon: 'fas fa-birthday-cake',
    modelUrl: {
      light:
        'https://sketchfab.com/models/68f373e944de41b3ba0a53287dab65f6/embed',
      dark: 'https://sketchfab.com/models/2a3439be456148b7b03c5ec3310cf8fd/embed',
    },
  },
];

const isDarkMode = ref(true);
const selectedEvent = ref(null);
const showSuccessMessage = ref(false);

const formData = ref({
  nombre: '',
  contacto: '',
  tipoEvento: '',
  numAsistentes: '',
  serviciosAdicionales: '',
});

const formErrors = ref({
  nombre: '',
  contacto: '',
  tipoEvento: '',
  numAsistentes: '',
  serviciosAdicionales: '',
});

const resetForm = () => {
  formData.value = {
    nombre: '',
    contacto: '',
    tipoEvento: '',
    numAsistentes: '',
    serviciosAdicionales: '',
  };
  formErrors.value = {
    nombre: '',
    contacto: '',
    tipoEvento: '',
    numAsistentes: '',
    serviciosAdicionales: '',
  };
};

const validateForm = () => {
  let isValid = true;
  formErrors.value = {
    nombre: '',
    contacto: '',
    tipoEvento: '',
    numAsistentes: '',
    serviciosAdicionales: '',
  };

  if (!formData.value.nombre.trim()) {
    formErrors.value.nombre = 'El nombre es requerido';
    isValid = false;
  } else if (formData.value.nombre.length < 3) {
    formErrors.value.nombre = 'El nombre debe tener al menos 3 caracteres';
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[\d\s()-]{10,}$/;
  if (!formData.value.contacto) {
    formErrors.value.contacto = 'El contacto es requerido';
    isValid = false;
  } else if (
    !emailRegex.test(formData.value.contacto) &&
    !phoneRegex.test(formData.value.contacto)
  ) {
    formErrors.value.contacto = 'Ingrese un email o teléfono válido';
    isValid = false;
  }

  if (!formData.value.tipoEvento) {
    formErrors.value.tipoEvento = 'Seleccione un tipo de evento';
    isValid = false;
  }

  const numAsistentes = parseInt(formData.value.numAsistentes);
  if (!formData.value.numAsistentes) {
    formErrors.value.numAsistentes = 'El número de asistentes es requerido';
    isValid = false;
  } else if (isNaN(numAsistentes) || numAsistentes < 1) {
    formErrors.value.numAsistentes = 'Ingrese un número válido de asistentes';
    isValid = false;
  } else if (numAsistentes > 200) {
    formErrors.value.numAsistentes = 'El máximo de asistentes es 200';
    isValid = false;
  }

  if (formData.value.serviciosAdicionales.length > 500) {
    formErrors.value.serviciosAdicionales =
      'La descripción es demasiado larga (máximo 500 caracteres)';
    isValid = false;
  }

  return isValid;
};

const sendEmail = () => {
  if (!validateForm()) return;

  const templateParams = {
    nombre: formData.value.nombre,
    contacto: formData.value.contacto,
    tipoEvento: formData.value.tipoEvento,
    numAsistentes: formData.value.numAsistentes,
    serviciosAdicionales: formData.value.serviciosAdicionales,
  };

  emailjs
    .send(
      'service_flmi3n9',
      'template_bbxert5',
      templateParams,
      'hNH2dpJnU3y3k0XpN'
    )
    .then((response) => {
      showSuccessMessage.value = true;
      resetForm();
      setTimeout(() => {
        showSuccessMessage.value = false;
      }, 5000);
    })
    .catch((error) => {
      console.error('Error al enviar el formulario:', error);
      alert('Hubo un error al enviar el formulario');
    });
};

const scrollToSection = (elementId) => {
  VueScrollTo.scrollTo(elementId, 1000, {
    easing: 'ease-in-out',
  });
};

const handleSubmit = () => {
  if (validateForm()) {
    sendEmail();
  }
};

const selectEvent = (event) => {
  selectedEvent.value = event;
};

const resetView = () => {
  selectedEvent.value = null;
};

const getCurrentModelUrl = () => {
  if (!selectedEvent.value) {
    return isDarkMode.value
      ? 'https://sketchfab.com/models/51ab7e74bac347a89725f1d22b928edf/embed'
      : 'https://sketchfab.com/models/8c8547b4c42841029f1ebc1795c49692/embed';
  }
  return isDarkMode.value
    ? selectedEvent.value.modelUrl.dark
    : selectedEvent.value.modelUrl.light;
};
</script>

<template>
  <nav class="navbar animate__animated animate__fadeInDown">
    <div class="nav-content">
      <div class="logo-container">
        <img
          src="https://i.pinimg.com/736x/e0/89/56/e089564c2e8cf2813b466bcd93757708.jpg"
          alt="Quinta Los Nogales Logo"
          class="logo-image"
        />
      </div>
      <div class="nav-links">
        <a
          class="nav-link animate__animated animate__fadeIn"
          @click="scrollToSection('#inicio')"
          >Inicio</a
        >
        <a
          class="nav-link animate__animated animate__fadeIn"
          @click="scrollToSection('#servicios')"
          >Servicios</a
        >
        <a
          class="nav-link animate__animated animate__fadeIn"
          @click="scrollToSection('#eventos')"
          >Eventos</a
        >
        <a
          class="nav-link animate__animated animate__fadeIn"
          @click="scrollToSection('#reservacion')"
          >Reservación</a
        >
      </div>
      <button
        class="reserve-button animate__animated animate__pulse animate__infinite"
        @click="scrollToSection('#reservacion')"
      >
        Reservar Ahora
      </button>
    </div>
  </nav>

  <section id="inicio" class="hero">
    <div class="hero-content animate__animated animate__fadeIn">
      <h1 class="animate__animated animate__slideInDown">Quinta Los Nogales</h1>
      <p class="animate__animated animate__slideInUp">
        El lugar ideal para tus eventos y reuniones
      </p>
      <button
        class="reserve-button animate__animated animate__pulse animate__infinite"
        @click="scrollToSection('#reservacion')"
      >
        Reservar Ahora
      </button>
    </div>
  </section>

  <section id="servicios" class="services">
    <h2 class="animate__animated animate__fadeIn">Servicios</h2>
    <div class="services-grid">
      <div
        v-for="(service, index) in services"
        :key="index"
        class="service-card animate__animated animate__fadeInUp"
        :style="{ 'animation-delay': `${index * 0.2}s` }"
      >
        <i :class="service.icon" class="service-icon"></i>
        <h3>{{ service.title }}</h3>
        <p>{{ service.description }}</p>
      </div>
    </div>
  </section>

  <section id="eventos" class="events">
    <h2 class="animate__animated animate__fadeIn">Eventos</h2>
    <div class="events-container">
      <div class="model-container">
        <label class="switch">
          <span class="sun"
            ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g fill="#ffd43b">
                <circle r="5" cy="12" cx="12"></circle>
                <path
                  d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"
                ></path>
              </g>
            </svg>
          </span>
          <span class="moon"
            ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path
                d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"
              ></path>
            </svg>
          </span>
          <input v-model="isDarkMode" type="checkbox" class="input" />
          <span class="slider"></span>
        </label>
        <div class="sketchfab-embed-wrapper">
          <iframe
            :title="selectedEvent?.name || 'Default Model'"
            frameborder="0"
            allowfullscreen
            mozallowfullscreen="true"
            webkitallowfullscreen="true"
            allow="autoplay; fullscreen; xr-spatial-tracking"
            xr-spatial-tracking
            execution-while-out-of-viewport
            execution-while-not-rendered
            web-share
            :src="getCurrentModelUrl()"
          ></iframe>
        </div>
      </div>
      <div class="events-buttons">
        <button
          v-for="(event, index) in events"
          :key="index"
          class="event-button animate__animated animate__fadeInRight"
          :class="{ active: selectedEvent?.name === event.name }"
          :style="{ 'animation-delay': `${index * 0.2}s` }"
          @click="selectEvent(event)"
        >
          <i :class="event.icon"></i>
          {{ event.name }}
        </button>
        <button
          class="event-button return-button animate__animated animate__fadeInRight"
          :class="{ active: !selectedEvent }"
          :style="{ 'animation-delay': '1s' }"
          @click="resetView"
        >
          <i class="fas fa-swimming-pool"></i>
          Regresar a vista de la alberca
        </button>
      </div>
    </div>
  </section>

  <section id="reservacion" class="reservation">
    <h2 class="animate__animated animate__fadeIn">Reservación</h2>
    <div class="reservation-form animate__animated animate__zoomIn">
      <div
        v-if="showSuccessMessage"
        class="success-message animate__animated animate__fadeIn"
      >
        <i class="fas fa-check-circle"></i>
        ¡Reservación enviada exitosamente!
      </div>
      <form @submit.prevent="handleSubmit" class="form-container">
        <div class="form-group">
          <input
            v-model="formData.nombre"
            type="text"
            placeholder="Nombre"
            class="form-input"
            :class="{ error: formErrors.nombre }"
          />
          <span v-if="formErrors.nombre" class="error-message">{{
            formErrors.nombre
          }}</span>
        </div>

        <div class="form-group">
          <input
            v-model="formData.contacto"
            type="text"
            placeholder="Email o Teléfono"
            class="form-input"
            :class="{ error: formErrors.contacto }"
          />
          <span v-if="formErrors.contacto" class="error-message">{{
            formErrors.contacto
          }}</span>
        </div>

        <div class="form-group">
          <select
            v-model="formData.tipoEvento"
            class="form-input"
            :class="{ error: formErrors.tipoEvento }"
          >
            <option value="" disabled selected>Tipo de evento</option>
            <option
              v-for="event in events"
              :key="event.name"
              :value="event.name"
            >
              {{ event.name }}
            </option>
          </select>
          <span v-if="formErrors.tipoEvento" class="error-message">{{
            formErrors.tipoEvento
          }}</span>
        </div>

        <div class="form-group">
          <input
            v-model="formData.numAsistentes"
            type="number"
            placeholder="Número de asistentes"
            class="form-input"
            :class="{ error: formErrors.numAsistentes }"
            min="1"
            max="200"
          />
          <span v-if="formErrors.numAsistentes" class="error-message">{{
            formErrors.numAsistentes
          }}</span>
        </div>

        <div class="form-group">
          <textarea
            v-model="formData.serviciosAdicionales"
            placeholder="Servicios adicionales (música, decoración, etc.)"
            class="form-input form-textarea"
            :class="{ error: formErrors.serviciosAdicionales }"
          ></textarea>
          <span v-if="formErrors.serviciosAdicionales" class="error-message">{{
            formErrors.serviciosAdicionales
          }}</span>
        </div>

        <button type="submit" class="submit-button">Enviar Reservación</button>
      </form>
    </div>
  </section>

  <footer id="ubicacion">
    <div class="footer-content">
      <div class="location animate__animated animate__fadeInUp">
        <h3>Ubicación</h3>
        <p>
          <i class="fas fa-map-marker-alt"></i> 27268 Rancho de los Nogales,
          27268 Torreón, Coah.
        </p>
      </div>
      <div
        class="social animate__animated animate__fadeInUp"
        style="animation-delay: 0.2s"
      >
        <h3>Síguenos</h3>
        <div class="social-links">
          <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
          <a
            href="https://www.facebook.com/profile.php?id=100076003877418"
            class="social-link"
            ><i class="fab fa-facebook"></i
          ></a>
          <a
            href="https://api.whatsapp.com/send?phone=5218716187857&text&context=ARDWxz5LqXA7wCYnQ6ix3jKWHBaDMAfGWg1PdIC_mdLs1rAhp0dnk5UHI_y5ICMuC_KQNFAQdIgugy3uRh59CMcFUI_HundW5LQXLfcqJ3MyoZYuJ-J5U5BCi_wUXx-U8-0iLyC2zlosIG8OcCw0sHJS6Q&source&app=facebook"
            class="social-link"
            ><i class="fab fa-whatsapp"></i
          ></a>
        </div>
      </div>
    </div>
  </footer>
</template>