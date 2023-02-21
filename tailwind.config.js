/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './node_modules/tw-elements/dist/js/**/*.js',
    ],
    theme: {
        extend: {
            fontSize: {
                xs: ['12px', '16px'],
                little: ['6px', '8px'],
                tiny: ['3px', '4px'],
            },
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
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('flowbite/plugin'),
        require('tailwind-scrollbar-hide'),
        require('tailwindcss-themer')({
            defaultTheme: {
                extend: {
                    colors: {
                        transparent: 'transparent',
                        current: 'currentColor',
                        blueberry: `#214DD4`,
                        eggplant: `#354785`,
                        steel: `#5d6787`,
                        mercury: `#F1F1F9`,
                        pearl: `#F7F7FB`,
                        daisy: `#FFFFFF`,
                        brescian: `#2F2F2F`,
                        blush: `#97A0BE`,
                        etext: `#FFFFFF`,
                    },
                    fontFamily: {
                        sans: ['NanumSquare'],
                    },
                },
            },
            themes: [
                {
                    name: 'GeonDaon',
                    extend: {
                        colors: {
                            transparent: 'transparent',
                            current: 'currentColor',
                            blueberry: `#005FC6`,
                            eggplant: `#005FC6`,
                            steel: `#005FC6`,
                            mercury: `#F1F1F9`,
                            pearl: `#F7F7FB`,
                            daisy: `#FFFFFF`,
                            brescian: `#0381FE`,
                            blush: `#E9EEF4`,
                            etext: `#005FC6`,
                        },
                        fontFamily: {
                            sans: ['"Samsung Sharp Sans"'],
                        },
                    },
                },
            ],
        }),
    ],
}
