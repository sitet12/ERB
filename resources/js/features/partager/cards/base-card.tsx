import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Calendar, Clock, Pencil, RotateCcw } from 'lucide-react';
import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { type LucideIcon } from 'lucide-react';
import { DeleteButton } from '@/features/partager/buttons/delete-button';
import { formatDateWithTime } from '@/features/partager/utils/date-formatters';

type BaseCardProps = {
    title: string;
    badge?: {
        label: string;
        className?: string;
    };
    icon?: LucideIcon;
    iconClassName?: string;
    createdAt?: string | null;
    updatedAt?: string | null;
    isDeleted?: boolean;
    onEdit?: () => void;
    onDelete?: (() => void) | string; // Peut être une fonction ou une URL
    deleteItemName?: string; // Nom de l'élément pour la confirmation
    onRestore?: () => void;
    onClick?: () => void;
    className?: string;
    children?: ReactNode;
};

export function BaseCard({
    title,
    badge,
    icon: Icon,
    iconClassName,
    createdAt,
    updatedAt,
    isDeleted = false,
    onEdit,
    onDelete,
    deleteItemName,
    onRestore,
    onClick,
    className,
    children,
}: BaseCardProps) {
    const themeColor = isDeleted
        ? 'bg-muted'
        : 'bg-primary';

    return (
        <Card
            className={cn(
                'group relative hover:shadow-md transition-all duration-300 flex flex-col h-full',
                isDeleted && 'opacity-80',
                onClick && 'cursor-pointer',
                className
            )}
            onClick={onClick}
        >
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
                <div className="flex-1 space-y-2">
                    <h3
                        className="text-lg font-semibold leading-none line-clamp-1 pr-2"
                        title={title}
                    >
                        {title}
                    </h3>
                    {/* Badge: Count */}
                    {badge && (
                        <div>
                            <span
                                className={cn(
                                    'inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-primary-foreground shadow-sm',
                                    themeColor,
                                    badge.className
                                )}
                            >
                                {badge.label}
                            </span>
                        </div>
                    )}
                </div>
                {Icon && (
                    <div
                        className={cn(
                            'p-2 rounded-lg bg-muted text-muted-foreground transition-colors duration-300',
                            themeColor,
                            iconClassName
                        )}
                    >
                        <Icon size={20} />
                    </div>
                )}
            </CardHeader>

            {/* Custom children content */}
            {children && (
                <CardContent className="flex-1 pb-3">
                    {children}
                </CardContent>
            )}

            {/* Footer: Dates & Actions */}
            <CardFooter className="flex items-end justify-between pt-4 border-t">
                {/* Dates Section */}
                {(createdAt || updatedAt) && (
                    <div className="flex flex-col gap-1 text-[10px] font-medium text-muted-foreground">
                        {createdAt && (
                            <div className="flex items-center gap-1.5">
                                <Calendar size={10} />
                                <span>Créé: {formatDateWithTime(createdAt)}</span>
                            </div>
                        )}
                        {updatedAt && (
                            <div className="flex items-center gap-1.5">
                                <Clock size={10} />
                                <span>Modifié: {formatDateWithTime(updatedAt)}</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                    {onEdit && (
                        <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            onClick={(e) => {
                                e.stopPropagation(); // Empêcher le onClick de la card
                                onEdit();
                            }}
                            aria-label="Éditer"
                        >
                            <Pencil size={16} />
                        </Button>
                    )}
                    {!isDeleted && onDelete && (
                        <div onClick={(e) => e.stopPropagation()}>
                            <DeleteButton
                                onDelete={onDelete}
                                itemName={deleteItemName || title}
                                variant="icon"
                                size="sm"
                                className="!h-8 !w-8"
                            />
                        </div>
                    )}
                    {isDeleted && onRestore && (
                        <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            onClick={(e) => {
                                e.stopPropagation(); // Empêcher le onClick de la card
                                onRestore();
                            }}
                            aria-label="Restaurer"
                        >
                            <RotateCcw size={16} />
                        </Button>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
}

