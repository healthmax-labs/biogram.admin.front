module.exports = {
    twin: {
        preset: 'emotion',
    },
    plugins: [
        ["babel-plugin-twin", { debug: true }],
        "babel-plugin-macros",
    ],
}
