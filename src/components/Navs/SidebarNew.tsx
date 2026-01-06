import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import React, { useEffect } from 'react';
import { ChevronUp, Lock, User2 } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import avatar from '../../assets/defaultImages/avatar.png';
import { AuthUser } from '@/utils/interface/sliceInterface';
import { handleSignoutHelper } from '@/utils/helper/signout';
import { AppDispatch, RootState } from '@/utils/redux/appStore';
import { SideBarProps } from '@/utils/interface/commonInterface';
import companyLogo from '../../assets/logos/logo-transparent.png';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

const SidebarNew: React.FC<SideBarProps> = ({
  routes,
  filteredRoutes
}) => {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const user: AuthUser | null = useSelector((store: RootState) => store.auth?.authUser);
  const themeMode: boolean = useSelector((store: RootState) => store.app.lightTheme);
  const basePath = user?.role === "ADMIN" ? "/admin" : user?.role === "PROVIDER" ? "/provider" : "/user";

  useEffect(() => {
    if (themeMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, [themeMode]);

  if (!user || !user.role) return;

  return (
    <Sidebar collapsible="icon" className="">
      <SidebarHeader>
        <SidebarMenuButton
          size='lg'
          className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
        >
          <div className='flex aspect-square size-8 items-center justify-center rounded-lg'>
            <img
              src={companyLogo}
              className='size-8'
            />
          </div>
          <div className='grid flex-1 text-start text-lg leading-tight'>
            <span className='truncate font-semibold'>
              Slotflow
            </span>
            <span className='truncate text-sm'>
              Dashboard
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((route) => {
                const isProvider = user?.role === "PROVIDER";
                const isLocked = isProvider && filteredRoutes
                  ? !filteredRoutes.some(froute => froute.name === route.name)
                  : false;
                const fullPath = `${basePath}/${route.path}`;

                return !isLocked ? (
                  <SidebarMenuItem key={fullPath}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        key={fullPath}
                        to={fullPath}
                        className="block"
                      >
                        <route.icon />
                        <span>{route.name}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ) : (
                  <SidebarMenuItem key={fullPath}>
                    <SidebarMenuButton asChild>
                      <route.icon />
                      <span>{route.name}</span>
                    </SidebarMenuButton>
                    <SidebarMenuBadge><Lock className="size-3" /></SidebarMenuBadge>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  {user.profileImage ? (
                    <img
                      src={user.profileImage || avatar}
                      className='size-6 rounded-full'
                    />
                  ) : (
                    <User2 />
                  )}
                  {user.username}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleSignoutHelper({ role: user?.role, dispatch, navigate })}
                >
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default SidebarNew;