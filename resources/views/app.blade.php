<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        {{-- Initial loader styles --}}
        @include('partials.loader-styles')

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <link rel="icon" href="/laundry.svg" sizes="any">
        <link rel="icon" href="/laundry.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/laundry.svg">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        {{-- Initial page load loader --}}
        @include('partials.loader-html')

        @inertia

        {{-- Hide loader when page is fully loaded --}}
        <script>
            window.addEventListener('load', function() {
                const loader = document.getElementById('initial-loader');
                if (loader) {
                    loader.classList.add('hidden');
                    setTimeout(function() {
                        loader.remove();
                    }, 300);
                }
            });
        </script>
    </body>
</html>
