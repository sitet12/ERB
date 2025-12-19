<style>
    /* Initial page load loader (F5/Refresh) */
    #initial-loader {
        position: fixed;
        inset: 0;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: oklch(1 0 0);
        opacity: 1;
        transition: opacity 0.3s ease-in-out;
    }

    html.dark #initial-loader {
        background-color: oklch(0.145 0 0);
    }

    #initial-loader.hidden {
        opacity: 0;
        pointer-events: none;
    }

    /* Logo container with pulse */
    .initial-logo {
        position: relative;
        width: 80px;
        height: 80px;
        border-radius: 1rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 2.5rem;
        font-weight: bold;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    html.dark .initial-logo {
        box-shadow: 0 20px 25px -5px rgba(102, 126, 234, 0.2), 0 10px 10px -5px rgba(102, 126, 234, 0.1);
    }

    /* Spinning ring around logo */
    .initial-spinner {
        position: absolute;
        inset: -10px;
        width: calc(100% + 20px);
        height: calc(100% + 20px);
        border: 2px solid transparent;
        border-top-color: #667eea;
        border-radius: 1rem;
        animation: spin 3s linear infinite;
    }

    /* Text */
    .initial-text {
        margin-top: 1.5rem;
        text-align: center;
    }

    .initial-title {
        font-size: 1.875rem;
        font-weight: bold;
        letter-spacing: -0.025em;
        color: oklch(0.145 0 0);
    }

    html.dark .initial-title {
        color: oklch(1 0 0);
    }

    .initial-loading {
        margin-top: 0.5rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: oklch(0.5 0 0);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }

    html.dark .initial-loading {
        color: oklch(0.7 0 0);
    }

    .loading-spinner {
        width: 16px;
        height: 16px;
        border: 2px solid oklch(0.7 0 0);
        border-top-color: oklch(0.5 0 0);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    html.dark .loading-spinner {
        border-color: oklch(0.5 0 0);
        border-top-color: oklch(0.7 0 0);
    }

    /* Animations */
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    @keyframes pulse {
        0%, 100% {
            opacity: 1;
            transform: scale(1);
        }
        50% {
            opacity: 0.8;
            transform: scale(0.98);
        }
    }
</style>