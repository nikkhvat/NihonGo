import { registerRootComponent } from 'expo';
import App from './App';
import DemoApp from './Demo';

const isDemo = JSON.parse(process.env.DEMO);

if (isDemo) {
  console.log("Run application in demo mode");
  registerRootComponent(DemoApp);
} else {
  registerRootComponent(App);
}

