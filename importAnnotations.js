// to open the terminal i can use "Ctrl+Shift+´"

// How to initialize a react applition
// npx create-vite@latest my-react-app --template
// cd my-react-app
// npm install

// To Initialize a redux i need to install the dependencies

// npm install @reduxjs/toolkit react-redux, install redux and the toolkit alltogether

// to make redux works with imported types from another file i need to install "npm install @types/react-redux -D"

// install icons
// npm install react-icons

// to upgrade my old projects to tailwindcss v4...
// npx @tailwindcss/upgrade@next

// install tailwind "npm install -D tailwindcss@3 postcss autoprefixer"

// init tailwind "npx tailwindcss init -p"

// Watch tailwind files "npx tailwindcss -i ./src/input.css -o ./build-lesson-1/css/style.css --watch"

/* "scripts": {
  "build": "tailwindcss -i ./src/input.css -o ./dist/output.css --watch"
}
i can use start instead of build
*/

// npm run build


// isntall router
// npm i react-router
// import { BrowserRouter } from "react-router";
/* <BrowserRouter>
    <App />
  </BrowserRouter>
*/

// create arrow functions : rafce

// npm i react-spinners

// install GSAP "npm install gsap @gsap/react"

// Using GSAP
/* import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(useGSAP,ScrollTrigger)

const boxSapRef = useRef(null)

  useGSAP(() => {
    gsap.to(boxSapRef.current, {
      rotation: 360,
      scale: 2,
      duration: 10,
      scrollTrigger: {
        trigger: boxSapRef.current,
        scrub: true
      }
    })
  })

  <div ref={boxSapRef} ></div>
*/


// USING GIT
// initialize git memory" git init "
// choose things i want to save " git add ." "git add index.html"
// saving those changes, "git commit -m 'first-save-of-project'" and describing those changes
// git branch -M main/master
// git remote add origin https://blabla
// git push -u origin main/master
// look at times that i saved "git log"
// reverses my changes "git checkout 38f2a23fc234a243g231f" or get back to a previous one
// when i go back in time i go to a different branch


// For industry best practices When doing a drawer for mobile i should ultilize @headlessui/react.
// because industry-best accessibility and keyboard navigability, without forcing a specific style.
// Allows ESC key to close it.
// Manages screen reader behavior properly.
// You control the styles 100% using Tailwind (or anything else).
/* i could create my own drawer using div and useState alone, but i'd have to:

Manually manage ARIA attributes.

Implement focus trap logic.

Handle ESC key closing.

Restore focus after close.

Prevent background scrolling.

That’s a lot of complexity for something @headlessui/react handles elegantly. */

// What is ARIA attibutes?
// Accessible Rich Internet Applications
// used to improve the accessibility of web apps, especially for users who rely on screen readers or assistive technologies.
// Tells assistive tech this element is a modal dialog


// What is a Modal Dialog
// A modal dialog is a type of popup window that appears on top of the main content and requires the user to interact with it before returning to the rest of the page.
// Blocks interaction with the background content (until it’s closed).
// Often used for alerts, forms, confirmations, or login screens.


