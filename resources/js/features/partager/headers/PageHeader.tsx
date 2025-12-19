import { CreateButton } from '@/features/partager/buttons/CreateButton';

interface PageHeaderProps {
  title: string;
  description: string;
  createUrl?: string;
  onCreateClick?: () => void;
  canCreate?: boolean;
  createLabel?: string;
}

export function PageHeader({
  title,
  description,
  createUrl,
  onCreateClick,
  canCreate = false,
  createLabel = 'Créer',
}: PageHeaderProps) {
  const canShowCreate = canCreate && (createUrl || onCreateClick);

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground">
          {title}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          {description}
        </p>
      </div>

      {canShowCreate && (
        <CreateButton
          {...(createUrl ? { href: createUrl } : { onClick: onCreateClick! })}
          variant="icon"
          aria-label={createLabel}
        />
      )}
    </div>
  );
}