/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1440px',
			},
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace'],
			},
			colors: {
				primary: {
					DEFAULT: '#00A79D',
					400: '#00E0CF',
					500: '#00A79D',
					900: '#003D39',
				},
				surface: {
					DEFAULT: '#141414',
					2: '#1E1E1E',
				},
				border: {
					DEFAULT: '#2D2D2D',
				},
				text: {
					primary: '#E4E4E7',
					secondary: '#A1A1AA',
					disabled: '#52525B',
				},
				success: {
					DEFAULT: '#10B981',
					500: '#10B981',
				},
				warning: {
					DEFAULT: '#F59E0B',
					500: '#F59E0B',
				},
				error: {
					DEFAULT: '#EF4444',
					500: '#EF4444',
				},
			},
			borderRadius: {
				lg: '12px',
				md: '8px',
				sm: '4px',
			},
			spacing: {
				'18': '4.5rem',
				'22': '5.5rem',
			},
			keyframes: {
				'pulse-glow': {
					'0%, 100%': { boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.4)' },
					'50%': { boxShadow: '0 0 12px 4px rgba(16, 185, 129, 0.4)' },
				},
				'fade-in': {
					from: { opacity: '0', transform: 'translateY(10px)' },
					to: { opacity: '1', transform: 'translateY(0)' },
				},
			},
			animation: {
				'pulse-glow': 'pulse-glow 2s infinite',
				'fade-in': 'fade-in 0.4s ease-out',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}
