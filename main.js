const triggers = document.querySelectorAll('.cool > li');
const background = document.querySelector('.dropdownBackground');
const nav = document.querySelector('.top');

function handleEnter() {
  // 'this' is the list item
  this.classList.add('trigger-enter');
  // Add class of trigger-enter-active after 150ms
  // Only add if trigger-enter is there, it wont be if user moused away before 150ms 
  setTimeout(() => {
    if (this.classList.contains('trigger-enter')) {
      this.classList.add('trigger-enter-active')
    }
  }, 150);
  // Make background visible
  background.classList.add('open');

  const dropdown = this.querySelector('.dropdown');
  // Get coordinates of the dropdown/s and nav
  const dropdownCoords = dropdown.getBoundingClientRect();
  const navCoords = nav.getBoundingClientRect();

  // Set coordinates
  // Factor in nav position moving with addition of other elements above it
  const coords = {
    height: dropdownCoords.height,
    width: dropdownCoords.width,
    left: dropdownCoords.left - navCoords.left,
    top: dropdownCoords.top - navCoords.top
  };
  // Set properties for the background
  background.style.setProperty('width', `${coords.width}px`);
  background.style.setProperty('height', `${coords.height}px`);
  background.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`);
}

function handleLeave() {
  this.classList.remove('trigger-enter', 'trigger-enter-active');
  background.classList.remove('open');
}

triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter));
triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave));
