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
                'center-search-box': `97rem`,
                'left-box': `67rem`,
                'right-box': `40rem`,
                'chart-left-box': `90rem`,
                'chart-right-box': `17rem`,
            },
            minWidth: {
                'center-width': `107rem`,
                'center-left-width': `67rem`,
                'center-right-width': `40rem`,
            },
            gridRow: {
                'span-7': 'span 7 / span 7',
            },
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            // 'm-blue': `#214DD4`,
            // 'm-b-blue': `#354785`,
            // 'm-dip-blue': `#5d6787`,

            blueberry: `#214DD4`,
            eggplant: `#354785`,
            steel: `#5d6787`,

            mercury: `#F1F1F9`,
            pearl: `#F7F7FB`,
            daisy: `#FFFFFF`,
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('flowbite/plugin'),
        require('tailwind-scrollbar-hide'),
    ],
}
