import { type LucideIcon } from 'lucide-react';
import { SunMedium, Droplets, Leaf, Flame, Cloud, Sparkles } from 'lucide-react';

const iconPalette: LucideIcon[] = [
    SunMedium,
    Droplets,
    Leaf,
    Flame,
    Cloud,
    Sparkles,
];

/**
 * Hook to get an icon based on an ID (for consistent icon assignment)
 */
export function useIconMapping(id: number | string): LucideIcon {
    const numericId = typeof id === 'string' ? parseInt(id, 10) || 0 : id;
    return iconPalette[Math.abs(numericId) % iconPalette.length];
}

/**
 * Get icon directly without hook (for use outside components)
 */
export function getIconById(id: number | string): LucideIcon {
    const numericId = typeof id === 'string' ? parseInt(id, 10) || 0 : id;
    return iconPalette[Math.abs(numericId) % iconPalette.length];
}

