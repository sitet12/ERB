import { CreateButton } from '@/features/partager/buttons/CreateButton';

interface EmptyStateProps {
  message: string;
  createUrl?: string;
  onCreateClick?: () => void;
  canCreate?: boolean;
  createLabel?: string;
}

export function EmptyState({
  message,
  createUrl,
  onCreateClick,
  canCreate = false,
  createLabel = 'Créer',
}: EmptyStateProps) {
  const canShowCreate = canCreate && (createUrl || onCreateClick);

  return (
    <div className="text-center py-12">
      <div className="text-muted-foreground mb-4">
        {message}
      </div>
      {canShowCreate && (
        <CreateButton
          {...(createUrl ? { href: createUrl } : { onClick: onCreateClick! })}
          variant="text"
          label={createLabel}
        />
      )}
    </div>
  );
}

