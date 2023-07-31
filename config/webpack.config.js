import path, { resolve } from 'path'
import { fileURLToPath } from 'url'
import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import ChunksWebpackPlugin from 'chunks-webpack-plugin'
import { WebpackManifestPlugin } from 'webpack-manifest-plugin'
import SvgChunkWebpackPlugin from 'svg-chunk-webpack-plugin'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default function webpackConfig(env, argv) {
	const isProduction = argv.mode === 'production'
	const suffixHash = isProduction ? '.[contenthash]' : ''
	const splitChunks = {
		chunks: 'all',
		minSize: 0
	}

	return {
		entry: {
			home: resolve(__dirname, '../src/home/config.js')
		},
		watch: !isProduction,
		watchOptions: {
			ignored: /node_modules/
		},
		devtool: isProduction ? false : 'source-map',
		output: {
			path: resolve(__dirname, '../web/dist'),
			publicPath: 'dist/',
			filename: `scripts/[name]${suffixHash}.js`,
			chunkFilename: `scripts/[name]${suffixHash}.js`
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					include: resolve(__dirname, '../src'),
					use: [
						{
							loader: 'babel-loader',
							options: {
								configFile: resolve(__dirname, './babel.config.cjs')
							}
						}
					]
				},
				{
					test: /\.css$/,
					include: [resolve(__dirname, '../src')],
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader'
						},
						{
							loader: 'postcss-loader',
							options: {
								postcssOptions: {
									config: resolve(__dirname, './postcss.config.cjs')
								}
							}
						}
					]
				},
				{
					test: /\.(jpe?g|png|gif)$/i,
					include: resolve(__dirname, '../src/'),
					type: 'asset/resource',
					generator: {
						filename: `images/[name]${suffixHash}[ext]`
					}
				},
				{
					test: /\.svg$/,
					use: [
						{
							loader: SvgChunkWebpackPlugin.loader,
							options: {
								configFile: resolve(__dirname, './svgo.config.js')
							}
						}
					]
				}
			]
		},
		resolve: {
			extensions: ['.js', '.css'],
			modules: [resolve(__dirname, '../node_modules')],
			alias: {
				shared: resolve(__dirname, '../src/shared'),
				'jsx-dom/jsx-runtime': 'jsx-dom/jsx-runtime.js'
			}
		},
		plugins: [
			new webpack.ProgressPlugin(),
			new WebpackManifestPlugin(),
			new MiniCssExtractPlugin({
				filename: `styles/[name]${suffixHash}.css`,
				chunkFilename: `styles/[name]${suffixHash}.css`
			}),
			new webpack.optimize.ModuleConcatenationPlugin(),
			new ChunksWebpackPlugin({
				filename: 'templates/[name]-[type].html',
				templateScript: (chunk) => `<script defer src="${chunk}"></script>`
			}),
			new SvgChunkWebpackPlugin({
				filename: `sprites/[name]${suffixHash}.svg`,
				svgstoreConfig: {
					svgAttrs: {
						'aria-hidden': true,
						style: 'position: absolute; width: 0; height: 0; overflow: hidden;'
					}
				}
			})
		],
		stats: {
			colors: true,
			hash: false,
			timings: true,
			modules: false,
			entrypoints: false,
			excludeAssets: /.map$/,
			assetsSort: '!size'
		},
		optimization: {
			minimizer: [
				new TerserPlugin({
					extractComments: false
				}),
				new CssMinimizerPlugin()
			],
			chunkIds: 'deterministic', // or 'named'
			removeAvailableModules: true,
			removeEmptyChunks: true,
			mergeDuplicateChunks: true,
			providedExports: false,
			splitChunks: isProduction ? splitChunks : false
		}
	}
}
