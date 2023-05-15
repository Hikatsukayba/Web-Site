// project import
import Routes from './routes';
import ThemeCustomization from './themes';
import ScrollTop from './components/ScrollTop';
//import Context Provider
import { UserProvider } from './Context/userContext';
import { CoopProvider } from './Context/CooperativeContext';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
    <UserProvider>
        <CoopProvider>
            <ThemeCustomization>
                <ScrollTop>
                    <Routes />
                </ScrollTop>
            </ThemeCustomization>
        </CoopProvider>
    </UserProvider>
);

export default App;
