import "./App.css";

import Header from "./components/Header";
import ServersList from "./components/ServersList";

function App() {
    return (
        <div className="bg-slate-50 min-h-screen">
            <Header />
            <ServersList />
        </div>
    );
}

export default App;
