import PageNotFound from './pages/pageNotFound';
import Home from './pages/home';
import Login from './pages/login';
import Meetings from './pages/meetings';
import Optimize from './pages/optimize';
import Meeting from './pages/meeting';
import Training from './pages/training';
import Loading from './pages/loading';
import Team from './pages/team';
import Contacts from './pages/contacts';
import Settings from './pages/settings';
import ClientMeeting from './pages/client-meeting';
import Library from './pages/library/library';
import Recording from './pages/recording';

export const routes = [
  {
    path: '/home',
    component: Home,
  },
  { path: '/call/:id', component: ClientMeeting, role: 'public' },
  { path: '/login', component: Login, role: 'public' },
  { path: '/meetings', component: Meetings },
  { path: '/training', component: Training },
  { path: '/meeting/:id', component: Meeting },
  { path: '/optimize', component: Optimize },
  { path: '/loading', component: Loading },
  { path: '/library', component: Library },
  { path: '/team/:teamId', component: Team },
  { path: '/contacts', component: Contacts },
  { path: '/settings', component: Settings },
  { path: '/recording', component: Recording },
  {
    path: '/*',
    component: PageNotFound,
  },
];
