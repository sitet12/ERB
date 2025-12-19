import { dashboard, login } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Leaf, Sparkles, Zap, LogIn, Wallet, Users, TrendingUp, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome" />
            <div className="h-screen bg-background relative overflow-hidden font-sans">
                {/* Background Decorative Elements */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                
                {/* Navigation */}
                <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-background/80 backdrop-blur-md border-b border-border/50">
                    <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground">
                            <Leaf size={24} />
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-foreground">EcoLaundry</span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        {auth.user ? (
                            <Link href={dashboard()}>
                                <Button variant="outline">
                                    Dashboard
                                </Button>
                            </Link>
                        ) : (
                            <Link href={login()}>
                                <Button className="rounded-full px-6 shadow-lg shadow-primary/20 flex items-center gap-2">
                                    <LogIn size={18} />
                                    <span>Login</span>
                                </Button>
                            </Link>
                        )}
                    </div>
                </nav>

                {/* Hero Section */}
                <main className="container mx-auto px-6 h-full flex items-center pt-20 pb-8 md:pt-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
                        
                        {/* Column 1: Image & Visuals */}
                        <div className="relative order-2 lg:order-1 group">
                            <div className="absolute inset-0 bg-primary/20 rounded-[2rem] rotate-3 transition-transform group-hover:rotate-1 scale-105 blur-sm" />
                            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden border-8 border-background shadow-2xl">
                                <img 
                                    src="/welcom2.avif" 
                                    alt="EcoLaundry - Service de blanchisserie" 
                                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                
                                {/* Floating Stat Card */}
                                <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs uppercase tracking-widest opacity-80">EcoLaundry</p>
                                            <p className="text-lg font-bold">Gestion Pro</p>
                                        </div>
                                        <div className="p-2 bg-primary rounded-lg text-white">
                                            <Zap size={18} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Column 2: Content */}
                        <div className="flex flex-col gap-6 order-1 lg:order-2">
                            <div className="space-y-3">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                                    <Sparkles size={14} />
                                    <span>Gestion de Nouvelle Génération</span>
                                </div>
                                <h1 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight leading-[1.1]">
                                    Révolutionner la <span className="text-primary italic">Propreté.</span>
                                </h1>
                                <p className="text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed">
                                    Plateforme de gestion pour entreprises de blanchisserie performantes. Suivez les revenus, optimisez les charges et gérez les clients avec un écosystème numérique éco-responsable.
                                </p>
                            </div>

                            {/* Feature Pills */}
                            <div className="grid grid-cols-2 gap-3 mt-2">
                                <div className="p-3 rounded-2xl bg-secondary/50 border border-border flex flex-col gap-2 hover:bg-secondary transition-colors cursor-default">
                                    <div className="h-8 w-8 rounded-lg bg-background flex items-center justify-center text-primary shadow-sm">
                                        <Wallet size={18} />
                                    </div>
                                    <p className="font-bold text-sm">Suivi des Revenus</p>
                                    <p className="text-xs text-muted-foreground">Visibilité financière en temps réel.</p>
                                </div>
                                <div className="p-3 rounded-2xl bg-secondary/50 border border-border flex flex-col gap-2 hover:bg-secondary transition-colors cursor-default">
                                    <div className="h-8 w-8 rounded-lg bg-background flex items-center justify-center text-primary shadow-sm">
                                        <Users size={18} />
                                    </div>
                                    <p className="font-bold text-sm">Gestion Clients</p>
                                    <p className="text-xs text-muted-foreground">Gestion clientèle fluide.</p>
                                </div>
                                <div className="p-3 rounded-2xl bg-secondary/50 border border-border flex flex-col gap-2 hover:bg-secondary transition-colors cursor-default">
                                    <div className="h-8 w-8 rounded-lg bg-background flex items-center justify-center text-primary shadow-sm">
                                        <TrendingUp size={18} />
                                    </div>
                                    <p className="font-bold text-sm">Bénéfices</p>
                                    <p className="text-xs text-muted-foreground">Suivi des profits automatique.</p>
                                </div>
                                <div className="p-3 rounded-2xl bg-secondary/50 border border-border flex flex-col gap-2 hover:bg-secondary transition-colors cursor-default">
                                    <div className="h-8 w-8 rounded-lg bg-background flex items-center justify-center text-primary shadow-sm">
                                        <Receipt size={18} />
                                    </div>
                                    <p className="font-bold text-sm">Gestion Charges</p>
                                    <p className="text-xs text-muted-foreground">Contrôle des dépenses optimisé.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}