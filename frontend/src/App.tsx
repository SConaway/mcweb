import "./App.css";

import { Toaster } from "react-hot-toast";

import Header from "./components/Header";
import ServersList from "./components/ServersList";

function App() {
    return (
        <div className="min-h-screen bg-slate-50">
            <Header />
            <ServersList />
            <Toaster
                toastOptions={
                    {
                        // Define default options
                        // duration: 50000,
                    }
                }
            />
        </div>
    );
}

export default App;
