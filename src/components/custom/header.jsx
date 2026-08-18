import { ChevronDownIcon, LogOutIcon } from 'lucide-react';

import logo from '@/assets/images/logo.svg';
import { useAuthContext } from '@/contexts/auth';

import { Card, CardContent } from '..';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const Header = () => {
  const { user, logout } = useAuthContext();

  return (
    <Card>
      <CardContent className="flex items-center justify-between px-8 py-2">
        <div>
          <img src={logo} alt="FinTrack" />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition-colors hover:bg-muted/70 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none">
              <Avatar className="size-9">
                <AvatarImage
                  src="https://github.com/123"
                  alt={`${user.firstName} ${user.lastName}`}
                  className="grayscale"
                />

                <AvatarFallback className="bg-primary/10 text-sm font-medium text-primary">
                  {user.firstName[0]}
                  {user.lastName[0]}
                </AvatarFallback>
              </Avatar>

              <div className="hidden text-left sm:block">
                <p className="text-sm leading-none font-medium">
                  {user.firstName} {user.lastName}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">Meu perfil</p>
              </div>

              <ChevronDownIcon className="size-4 text-muted-foreground transition-transform" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56 rounded-xl p-1.5">
            <DropdownMenuLabel className="px-2 py-2">
              <div className="flex items-center gap-3">
                <Avatar className="size-9">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground">Meu perfil</p>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={logout}
              className="cursor-pointer rounded-lg text-destructive focus:text-destructive"
            >
              <LogOutIcon className="size-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
};

export default Header;
