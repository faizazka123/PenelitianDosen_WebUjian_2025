import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
        "./node_modules/flowbite/**/*.js",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                "text-active": "#1848A0",
                primary: "#0461CF",
                secondary: "#0073E6",
                kuning: "#E3B011",
                disable: "#747677",
                orange: "#C44601",
                hijau: "#04CF26",
                abu: "#EDEDED",
                abu_tua: "#BCBCBC",
                biru_muda: "#3FA2F6",
                biru_tua: "#0F67B1",
            },
        },
    },

    plugins: [forms, require("flowbite/plugin")],
};
