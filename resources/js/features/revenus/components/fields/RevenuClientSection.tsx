import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import type { Client } from '@/features/revenus/types/';
import { SimpleCombobox } from '@/features/partager/combox';
import { useClientFormState } from '@/features/revenus/hooks/use-client-form-state';
import type { Revenu } from '@/features/revenus/types/';

interface RevenuClientSectionProps {
    clients: Client[];
    revenu?: Revenu;
    errors: Record<string, string | undefined>;
    isEditing?: boolean;
}

export function RevenuClientSection({
    clients,
    revenu,
    errors,
    isEditing = false,
}: RevenuClientSectionProps) {
    const {
        clientMode,
        selectedClientId,
        newClientNom,
        newClientPrenom,
        newClientTelephone,
        setClientMode,
        setSelectedClientId,
        setNewClientNom,
        setNewClientPrenom,
        setNewClientTelephone,
    } = useClientFormState({ revenu, isEditing });

    return (
        <>
            {/* Mode de sélection du client: existant ou nouveau */}
            <input type="hidden" name="client_mode" value={clientMode} />

            {clientMode === 'exist' && (
                <>
                    <input
                        type="hidden"
                        name="client_id"
                        value={selectedClientId}
                    />
                    <div className="grid gap-2">
                        <div className="flex items-center justify-between gap-2">
                            <Label htmlFor="client_id" className="text-foreground flex-1">
                                Client <span className="text-destructive">*</span>
                            </Label>
                            {!isEditing && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setClientMode('new')}
                                    className="text-xs px-2 py-1 h-7 shrink-0"
                                >
                                    + Nouveau client
                                </Button>
                            )}
                        </div>
                        <SimpleCombobox
                            value={selectedClientId}
                            onChange={setSelectedClientId}
                            options={clients.map((client) => ({
                                value: client.id.toString(),
                                label:
                                    client.nom_complet ||
                                    `${client.prenom ?? ''} ${client.nom ?? ''}`.trim(),
                            }))}
                            placeholder="Sélectionner un client"
                            searchPlaceholder="Rechercher un client..."
                            emptyText="Aucun client trouvé."
                            disabled={isEditing}
                        />
                        <InputError message={errors.client_id} />
                    </div>
                </>
            )}

            {clientMode === 'new' && (
                <>
                    <div className="flex items-center justify-between">
                        <Label className="text-foreground">
                            Nouveau client <span className="text-destructive">*</span>
                        </Label>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setClientMode('exist')}
                            className="text-xs px-2 py-1 h-7"
                        >
                            Sélectionner un client existant
                        </Button>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="new_client_prenom" className="text-foreground">
                                Prénom <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="new_client_prenom"
                                name="new_client_prenom"
                                type="text"
                                value={newClientPrenom}
                                onChange={(e) => setNewClientPrenom(e.target.value)}
                                placeholder="Ex: Oussama"
                                className="bg-background text-foreground border-input"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="new_client_nom" className="text-foreground">
                                Nom <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="new_client_nom"
                                name="new_client_nom"
                                type="text"
                                value={newClientNom}
                                onChange={(e) => setNewClientNom(e.target.value)}
                                placeholder="Ex: Aakki"
                                className="bg-background text-foreground border-input"
                            />
                        </div>
                    </div>

                    <div className="grid gap-2 mt-3">
                        <Label htmlFor="new_client_telephone" className="text-foreground">
                            Téléphone
                        </Label>
                        <Input
                            id="new_client_telephone"
                            name="new_client_telephone"
                            type="tel"
                            value={newClientTelephone}
                            onChange={(e) => setNewClientTelephone(e.target.value)}
                            placeholder="Ex: 0770451659"
                            className="bg-background text-foreground border-input"
                        />
                    </div>
                </>
            )}
        </>
    );
}


