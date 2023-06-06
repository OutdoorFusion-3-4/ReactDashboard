import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
		  '/api': {
			target: 'http://localhost:8080', 
			changeOrigin: true, 
			ws: true, 
			rewrite: (path) => path.replace(/^\/api/, '')
		  },
		},
	  },
	resolve: {
		alias: [
			{
				find: '@contexts', replacement: path.resolve(__dirname, 'src/contexts')
			},
			{
				find: '@styles', replacement: path.resolve(__dirname, 'src/styles')
			},
			{
				find: '@config', replacement: path.resolve(__dirname, 'src/config')
			},
			{
				find: '@api', replacement: path.resolve(__dirname, 'src/api')
			},
			{
				find: '@components', replacement: path.resolve(__dirname, 'src/components')
			},
			{
				find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks')
			},
			{
				find: '@pages', replacement: path.resolve(__dirname, 'src/pages')
			},

		],
	},
});
