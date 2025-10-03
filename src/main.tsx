import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import { faRobot, faBolt, faPalette, faGlobe, faComments } from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false;

library.add(faRobot, faBolt, faPalette, faGlobe, faComments)

createRoot(document.getElementById("root")!).render(<App />);