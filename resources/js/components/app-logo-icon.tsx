import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 485 485" xmlSpace="preserve">
            <path d="M242.5 190C180.467 190 130 240.467 130 302.5S180.467 415 242.5 415 355 364.533 355 302.5 304.533 190 242.5 190m0 195c-45.491 0-82.5-37.009-82.5-82.5s37.009-82.5 82.5-82.5 82.5 37.009 82.5 82.5-37.009 82.5-82.5 82.5" />
            <path d="M20 0v485h445V0zm415 30v90H50V30zM50 455V150h385v305z" />
            <path d="M75 60h90.333v30H75zm295 0h40v30h-40zm-60 0h40v30h-40z" />
        </svg>
    );
}
