import * as React from "react"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Link, useNavigate } from "react-router-dom"
import { ModeToggle } from "@/components/NavBar/mode-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import AdminAvatar from "@/assets/images/admin-avatar.png"
import NavMenuConstants from "./nav-menu-constant"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { useAuth } from "@/hooks/useAuth"
import { MobileNavBar } from "./MobileNavBar"
import ConfirmationPopUp from "../ConfirmationPopUp"
import logoBig from "@/assets/logo-big.svg";

export default function NavBar() {
  const { logout } = useAuth();
  const navigate = useNavigate()
  return (
    <>
      <div className="lg:mx-auto min-w-[80vw]">

        <div className="nav-parent lg:flex space-x-8 p-3 items-center justify-between hidden">
          <div className="nav-left flex space-x-8">
            <img className="object-contain h-12 max-w-min"
              src={logoBig} alt="Logo" />

            <div className="nav-options flex">

              <NavigationMenu>
                <NavigationMenuList>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Service</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                        {NavMenuConstants.service.items && NavMenuConstants.service.items.map((item, index) => (
                          <NavigationMenuLink asChild key={index}>
                            <ListItem
                              title={item.title}
                              to={item.to}
                            >
                              {item.description}
                            </ListItem>
                          </NavigationMenuLink>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger>E-commerce</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                        {NavMenuConstants.ecomm.items && NavMenuConstants.ecomm.items.map((item, index) => (
                          <NavigationMenuLink asChild key={index}>
                            <ListItem
                              title={item.title}
                              to={item.to}
                            >
                              {item.description}
                            </ListItem>
                          </NavigationMenuLink>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Assessment</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                        {NavMenuConstants.assessment.items && NavMenuConstants.assessment.items.map((item, index) => (
                          <NavigationMenuLink asChild key={index}>
                            <ListItem
                              title={item.title}
                              to={item.to}
                            >
                              {item.description}
                            </ListItem>
                          </NavigationMenuLink>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                </NavigationMenuList>
              </NavigationMenu>

              <NavigationMenu>
                <NavigationMenuList>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Users</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                        {NavMenuConstants.users.items && NavMenuConstants.users.items.map((item, index) => (
                          <NavigationMenuLink asChild key={index}>
                            <ListItem
                              title={item.title}
                              to={item.to}
                            >
                              {item.description}
                            </ListItem>
                          </NavigationMenuLink>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Media</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                        {NavMenuConstants.media.items && NavMenuConstants.media.items.map((item, index) => (
                          <NavigationMenuLink asChild key={index}>
                            <ListItem
                              title={item.title}
                              to={item.to}
                            >
                              {item.description}
                            </ListItem>
                          </NavigationMenuLink>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                      <Link to={NavMenuConstants.questions.to}>
                        {NavMenuConstants.questions.title}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                      <Link to={NavMenuConstants.events.to}>
                        {NavMenuConstants.events.title}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                      <Link to={NavMenuConstants.language.to}>
                        {NavMenuConstants.language.title}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="nav-right flex items-center space-x-5 pr-3">

            <div className="max-w-min">
              <ModeToggle />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>

                <Avatar className="cursor-pointer">
                  <AvatarImage src={AdminAvatar} />
                  <AvatarFallback>VP</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => { navigate('/profile') }}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { navigate('/settings') }}>
                  Settings
                </DropdownMenuItem >
                <DropdownMenuItem asChild>
                  <ConfirmationPopUp action='Logout' actionHandler={() => logout()} variant="destructive" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div >

        {/* Mobile */}
        <div className="nav-parent lg:hidden ">
          <MobileNavBar />
        </div>
      </div>

    </>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & { title: string }
>(({ className, title, children, to, ...props }, ref) => {
  return (
    <li>
      <Link
        ref={ref}
        to={to}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </Link>
    </li>
  )
})
ListItem.displayName = "ListItem"
