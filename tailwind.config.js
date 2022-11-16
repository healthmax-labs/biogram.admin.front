/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './node_modules/tw-elements/dist/js/**/*.js',
    ],
    theme: {
        extend: {
            spacing: {
                'menu-width': `12rem`,
                'center-width': `108rem`,
            },
            screens: {
                hdesktop: `1920px`,
            },
            width: {
                'center-width': `107rem`,
                'left-box': `67rem`,
                'right-box': `40rem`,
            },
            minWidth: {
                'center-width': `107rem`,
                'center-left-width': `67rem`,
                'center-right-width': `40rem`,
            },
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            'm-blue': `#214DD4`,
            'm-b-blue': `#354785`,
            'm-dip-blue': `#5d6787`,
        },
    },
    plugins: [require('@tailwindcss/forms'), require('flowbite/plugin'), require('tailwind-scrollbar-hide')],
}
