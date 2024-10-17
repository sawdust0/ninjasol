document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('registrationsChart').getContext('2d');
    let chart;
  
    const newsData = [
      {
        title: "Latest News & Updates",
        content: "Turpis interdum nunc varius ornare dignissim pretium. Pellentesque in ut tellus.",
        image: "/news_1.jpg"
      },
      {
        title: "Upcoming Events",
        content: "Turpis interdum nunc varius ornare dignissim pretium. Pellentesque in ut tellus.",
        image: "/news_1.jpg"
      },
      {
        title: "New Announcement",
        content: "Turpis interdum nunc varius ornare dignissim pretium. Pellentesque in ut tellus.",
        image: "/news_1.jpg"
      }
    ];
  
    const totalSlides = newsData.length;
    let currentSlide = 0;
  
    function updateChart() {
      const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
      const textColor = isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)';
      const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  
      if (chart) {
        chart.destroy();
      }
  
      chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: 'Registrations',
            data: [650, 700, 750, 600, 250, 750, 600, 150, 550, 375, 750, 600],
            backgroundColor: 'rgba(88, 101, 242, 0.8)',
            borderColor: 'rgba(88, 101, 242, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: gridColor },
              ticks: { color: textColor }
            },
            x: {
              grid: { color: gridColor },
              ticks: { color: textColor }
            }
          },
          plugins: {
            legend: { display: false }
          }
        }
      });
    }
  
    function updateSlider() {
      const slide = newsData[currentSlide];
      const newsContent = document.querySelector('.news-content');
      newsContent.innerHTML = `
        <img src="${slide.image}" alt="News Image" class="news-image">
        <div class="news-text-container">
          <h3>${slide.title}</h3>
          <p class="news-text">${slide.content}</p>
          <div class="slider-indicators">
            ${Array(totalSlides).fill().map((_, i) =>
              `<div class="indicator ${i === currentSlide ? 'active' : ''}"></div>`
            ).join('')}
          </div>
        </div>
      `;
      setupIndicators();
    }
  
    function setupIndicators() {
      const indicators = document.querySelectorAll('.indicator');
      indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
          currentSlide = index;
          updateSlider();
        });
      });
    }
  
    function openModal(eventName, eventDate, eventDescription, speakers, attendees) {
      const modal = document.getElementById('infoModal');
      modal.querySelector('#modalTitle').textContent = eventName;
      modal.querySelector('#modalDate').textContent = eventDate;
      modal.querySelector('#modalDescription').textContent = eventDescription;
      modal.querySelector('.speaker-avatars').innerHTML = speakers.map(() => '<div class="speaker-avatar"></div>').join('');
      modal.querySelector('#modalSpeakers').textContent = `${speakers.length} Guest Speakers: ${speakers.join(', ')}`;
      modal.querySelector('#modalAttendees').textContent = `${attendees} Attendees`;
      modal.style.display = 'block';
    }
  
    function setupEventListeners() {
      const darkModeToggle = document.getElementById('darkModeToggle');
      const html = document.documentElement;
      const newsSlider = document.querySelector('.news-slider');
      const prevBtn = newsSlider.querySelector('.prev-btn');
      const nextBtn = newsSlider.querySelector('.next-btn');
      const closeBtn = document.querySelector('.close');
      const searchInput = document.querySelector('.search-input');
      const exportBtn = document.querySelector('.export-btn');
      const pageButtons = document.querySelectorAll('.page-btn');
      const rowsPerPageSelect = document.getElementById('rowsPerPage');
      const actionButtons = document.querySelectorAll('.edit-btn, .delete-btn, .complete-btn');
      const hamburgerMenu = document.querySelector('.hamburger-menu');
      const mobileMenu = document.querySelector('.mobile-menu');
      const sidebar = document.querySelector('.sidebar');
      const sidebarToggle = document.querySelector('.sidebar-toggle');
  
      darkModeToggle.addEventListener('change', () => {
        const theme = darkModeToggle.checked ? 'dark' : 'light';
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateChart();
      });
  
      prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
      });
  
      nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
      });
  
      closeBtn.onclick = () => document.getElementById('infoModal').style.display = 'none';
  
      window.onclick = (event) => {
        if (event.target == document.getElementById('infoModal')) {
          document.getElementById('infoModal').style.display = 'none';
        }
      };
  
      document.querySelectorAll('.events-table .event-name, .events-table tbody tr').forEach(element => {
        element.addEventListener('click', function () {
          const row = this.closest('tr');
          const eventName = row.cells[0].textContent;
          const eventDate = row.cells[1].textContent;
          const eventSpeaker = row.cells[2].textContent;
          const eventDescription = "Event Description goes here.";
          const speakers = [eventSpeaker, "Speaker B", "Speaker C"];
          const attendees = 300;
          openModal(eventName, eventDate, eventDescription, speakers, attendees);
        });
      });
  
      document.querySelectorAll('.icon-info').forEach(icon => {
        icon.addEventListener('click', function (event) {
          event.stopPropagation();
          const statTitle = this.parentElement.textContent.trim();
          const statValue = this.parentElement.nextElementSibling.textContent;
          openModal(statTitle, `Current value: ${statValue}`);
        });
      });
  
      document.querySelectorAll('.filter-buttons button, .sort-export button').forEach(button => {
        button.addEventListener('click', function () {
          alert(`${this.textContent.trim()} functionality to be implemented`);
        });
      });
  
      searchInput.addEventListener('input', function () {
        console.log(`Searching for: ${this.value}`);
      });
  
      exportBtn.addEventListener('click', () => alert('Export functionality to be implemented'));
  
      pageButtons.forEach(button => {
        button.addEventListener('click', function () {
          if (!this.disabled && !this.classList.contains('active')) {
            document.querySelector('.page-btn.active').classList.remove('active');
            this.classList.add('active');
            console.log('Edit Page Successfully:', this.textContent);
          }
        });
      });
  
      rowsPerPageSelect.addEventListener('change', function () {
        console.log('Rows per page changed:', this.value);
      });
  
      actionButtons.forEach(button => {
        button.addEventListener('click', () => console.log(`${button.className} clicked`));
      });
  
      hamburgerMenu.addEventListener('click', function () {
        this.classList.toggle('open');
        mobileMenu.classList.toggle('open');
      });
  
      document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
          hamburgerMenu.classList.remove('open');
          mobileMenu.classList.remove('open');
        });
      });
  
      document.addEventListener('click', function (event) {
        if (!mobileMenu.contains(event.target) && !hamburgerMenu.contains(event.target)) {
          hamburgerMenu.classList.remove('open');
          mobileMenu.classList.remove('open');
        }
      });
  
      if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function (e) {
          e.preventDefault();
          sidebar.classList.toggle('collapsed');
          const icon = this.querySelector('i');
          const text = this.querySelector('span');
          if (sidebar.classList.contains('collapsed')) {
            icon.classList.replace('fa-chevron-left', 'fa-chevron-right');
            text.textContent = 'Expand';
          } else {
            icon.classList.replace('fa-chevron-right', 'fa-chevron-left');
            text.textContent = 'Collapse';
          }
          const dashboard = document.querySelector('.dashboard');
          dashboard.style.transition = 'margin-left 0.3s ease';
          dashboard.style.marginLeft = sidebar.classList.contains('collapsed') ? '60px' : '250px';
        });
      }
    }
  
    function init() {
      const savedTheme = localStorage.getItem('theme') || 'dark';
      document.documentElement.setAttribute('data-theme', savedTheme);
      document.getElementById('darkModeToggle').checked = savedTheme === 'dark';
      updateChart();
      updateSlider();
      setupEventListeners();
      setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
      }, 5000);
    }
  
    init();
  });