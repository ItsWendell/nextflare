const esbuild = require('esbuild');

// This tool has one argument, development, which is a boolean
// If true, it will build the CLI tool in development mode
// If false, it will build the CLI tool in production mode
const args = process.argv.slice(2);
const development = args[0] === 'dev';

const build = async () => {
    console.log('Building Nextflare CLI tool...');
    // Build the CLI tool based on the following command: esbuild ./src/index.ts --bundle --platform=node --outfile=./dist/cli.js --external:./node_modules/* --loader:.template.ts=text
    await esbuild.build({
        entryPoints: ['./src/index.ts'],
        bundle: true,
        watch: development ? {
            onRebuild(error) {
                if (error) console.error('Watch build failed:', error);
                else console.log('CLI: Watch build succeeded');
            }
        } : undefined,
        platform: 'node',
        outfile: './dist/cli.js',
        external: ['./node_modules/*'],
        loader: {
            '.template.ts': 'text',
        },
    });

    console.log('Building Nextflare Webpack plugin...');
    // Build the webpack plugin based on the following command: esbuild ./src/nextflare.ts --bundle --platform=node --outfile=./dist/nextflare.js --external:./node_modules/* --loader:.template.ts=text
    await esbuild.build({
        entryPoints: [
            './src/webpack/webpack.ts', 
            './src/webpack/loaders/ssr-loader.ts',
            './src/webpack/loaders/function-loader.ts',
            './src/webpack/loaders/middleware-loader.ts',
        ],
        bundle: true,
        watch: development ? {
            onRebuild(error) {
                if (error) console.error('Watch build failed:', error);
                else console.log('Webpack: Watch build succeeded');
            }
        } : undefined,
        platform: 'node',
        outdir: './dist',
        external: ["webpack"],
        loader: {
            '.template.ts': 'text',
        },
    });
}

build();
