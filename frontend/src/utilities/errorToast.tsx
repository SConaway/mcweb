import toast from "react-hot-toast";

export const errorToast = (message: string) =>
    //toast("Here is your toast.");
    toast.custom((t) => (
        <div
            className={`bg-red-500 px-6 py-4 shadow-md rounded-full ${
                t.visible ? "animate-enter" : "animate-leave"
            }`}
        >
            {message}
        </div>
    ));
