/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */

const navbarList = document.getElementById('navbar__list');

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

//This function checks if element is in viewport.
//Element is considered to be in viewport until its bottom have less than 25 % present at the page.
function isInViewport(checkElem) {
  const position = checkElem.getBoundingClientRect();
  const viewportHeight = document.body.clientHeight;
  if (position.bottom <= 0) {
    return false;
  }
  const bottomLimit = viewportHeight * 0.25;
  const topLimit = viewportHeight * 0.75;
  return position.top <= topLimit && position.bottom >= bottomLimit;
}

// This function removes active class of an element
function removeActiveClass(checkElms) {
  for (const elem of checkElms) {
    elem.classList.remove('active');
  }
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

//This function add new section
function addNewSection() {
  const main = document.querySelector('main');
  const sectionHtml =
    '<section id="section4" data-nav="Section 4"><div class="landing__container"><h2>Section 4</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>        <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p></div></section>';
  main.insertAdjacentHTML('beforeend', sectionHtml);
}

// This function dynamically build the nav
function buildNav() {
  const sections = document.getElementsByTagName('section');
  for (const section of sections) {
    const newElementLi = document.createElement('li');
    const anchorAttr = section.id;
    const linkName = section.getAttribute('data-nav');
    const htmlText = `<a href="#${anchorAttr}" class="menu__link">${linkName}</a>`;
    newElementLi.insertAdjacentHTML('afterbegin', htmlText);
    navbarList.appendChild(newElementLi);
  }
}

// Add class 'active' to section when near top of a viewport
function addActiveClass(checkElem) {
  checkElem.classList.add("active");
}

// Scroll to anchor ID using scrollTO event
function scrollSection() {
  const navLinks = document.getElementsByClassName('menu__link');
  for (const navLink of navLinks) {
    navLink.addEventListener('click', (event) => {
      event.preventDefault();
      const sectionId = navLink.getAttribute('href');
      const placeToScroll = document.querySelector(sectionId);
      placeToScroll.scrollIntoView({ behavior: "smooth" });
    });
  }
}

/**
 * End Main Functions
 * Begin Events
 *
 */

// Set sections as active when scrolling
document.addEventListener('scroll', () => {
  const sections = document.getElementsByTagName('section');
  let currentActive = document.getElementsByClassName('active');
  removeActiveClass(currentActive);
  for (const section of sections) {
    if (isInViewport(section)) {
      addActiveClass(section);
      break;
    }
  }
});

//Call function to add new section
addNewSection();

// Call function to build menu
buildNav();

// Call function to scroll to section on link click
scrollSection();
