import { Separator } from "@radix-ui/react-separator";
import { Bot, ChartNoAxesCombined, HeartPulse, Home, PawPrint, Rocket, UserSearch, UtensilsCrossed } from "lucide-react";
import { NavLink } from "./nav-link";
import { ThemeToggle } from "./theme/theme-toggle";

export function Header () {
    return (
        <div className="border-b">
            <div className="flex h-16 items-center gap-6 px-6">
                <PawPrint className="h-6 w-6 cursor-pointer"/>

                <Separator orientation="vertical" className="h-6"/>
                <nav className="flex items-center space-x-4 lg:space-x-6">
                    <NavLink to='/'>
                        <Home className="h-4 w-4"/>
                        Início
                    </NavLink>
                    <NavLink to='/current-month'>
                        <ChartNoAxesCombined className="h-4 w-4"/>
                        Mês corrente
                    </NavLink>
                    <NavLink to='/hills'>
                        <UtensilsCrossed className="h-4 w-4"/>
                        Hills
                    </NavLink>
                    <NavLink to='/avert'>
                        <HeartPulse className="h-4 w-4"/>
                        Avert
                    </NavLink>
                    <NavLink to='/seamaty'>
                        <Bot className="h-4 w-4" />
                        Seamaty
                    </NavLink>
                    <NavLink to='/search'>
                        <UserSearch className="h-4 w-4"/>
                        Análise
                    </NavLink>
                    <NavLink to='/goals'>
                        <Rocket className="h-4 w-4" />
                        Metas
                    </NavLink>
                </nav>
                <div className="ml-auto flex items-center gap-2">
                    <ThemeToggle />
                </div>
            </div>
        </div>
    )
}