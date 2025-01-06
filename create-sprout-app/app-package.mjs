export default function getAppPackageJson(projectName) {
    return {
        "name": projectName,
        "version": "1.0.0",
        "main": "index.js",
        "keywords": [],
        "author": "",
        "license": "ISC",
        "description": "",
        "devDependencies": {
            "@rollup/plugin-alias": "^5.1.1",
            "@rollup/plugin-commonjs": "^28.0.1",
            "@rollup/plugin-node-resolve": "^15.3.0",
            "@rollup/plugin-terser": "^0.4.4",
            "@rollup/plugin-virtual": "^3.0.2",
            "html-minifier-terser": "^7.2.0",
            "vite": "^5.4.10",
            "sproutjs-core": "^2.4.0",
            "sprout-build-app": "^1.6.1"
        },
        "scripts": {
            "build": `node ./node_modules/sprout-build-app/sprout-build-app.mjs ./src ./dist --app ${projectName} --allowAppScopeAccess`,
            "build-prod": `node ./node_modules/sprout-build-app/sprout-build-app.mjs ./src ./dist --app ${projectName} --minify`,
            "serve": "npm run build && vite dev",
            "serve-prod": "npm run build-prod && vite dev"
        },
        "type": "module"
    }
}
