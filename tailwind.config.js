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
                kuning: "#976E05",
                disable: "#747677",
                orange: "#C44601",
                hijau: "#05891B",
                abu: "#EDEDED",
                abu_tua: "#BCBCBC",
                biru_muda: "#0D4E85",
                biru_tua: "#0F67B1",
                notif1: "#DCE5F6",
                notif2: "#f0f0f0",
                btn_hijau: '#05891B',
                btn_biru: '#0750A6',
                btn_kuning: '#976E05',
                abu_input_waktu: '#D9D9D9',
            },
        },
    },

    plugins: [forms, require("flowbite/plugin")],
};
