import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Button } from "../ui/button"
import NavMenuConstants from "./nav-menu-constant"
import { Link } from "react-router-dom"
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { ModeToggleMobile } from "./mode-toogle-mobile"
import AdminAvatar from "@/assets/images/admin-avatar.png"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { useAuth } from "@/hooks/useAuth"
import ConfirmationPopUp from "../ConfirmationPopUp"
import logoBig from "@/assets/logo-big.svg";


const SheetClose = SheetPrimitive.Close;

export function MobileNavBar() {

  const { user, logout } = useAuth();

  return (
    <>
      <div className="nav-parent flex justify-between items-center p-3">
        <div className="left">
          <img className="object-contain h-8 max-w-min"
            src={logoBig} alt="Logo" />
        </div>
        <div className="right">

          <Sheet>
            <SheetTrigger asChild >
              <Button className="h-8 w-8 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0 ring-offset-background rounded-sm" variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="fullright">
              <SheetHeader>
                <SheetTitle></SheetTitle>
                <SheetDescription asChild>

                  <div className="font-medium mt-10">
                    <Accordion type="single" collapsible className="w-full mt-6">

                    <AccordionItem value="item-11" className="text-regular">
                        <AccordionTrigger>
                          <div className="flex items-center">
                            <Avatar className="cursor-pointer">
                              <AvatarImage src={AdminAvatar} />
                              <AvatarFallback>VP</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col ml-3">

                              <p className="text-left text-base">
                                {`${user?.user_first_name} ${user?.user_last_name}`}
                              </p>
                              <p className="text-left text-regular text-muted-foreground font-regular">
                                {user?.user_email}
                              </p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <SheetClose asChild>
                            <Link
                              to={'/profile'}
                              className="flex py-2 px-4 hover:bg-accent hover:text-accent-foreground rounded-sm"
                            >Profile
                            </Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Link
                              to={'/settings'}
                              className="flex py-2 px-4 hover:bg-accent hover:text-accent-foreground rounded-sm"
                            >Settings
                            </Link>
                          </SheetClose>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="item-2" className="font-regular text-lg">
                        <AccordionTrigger>{NavMenuConstants.service.title}</AccordionTrigger>
                        <AccordionContent asChild>
                          {NavMenuConstants.service.items && NavMenuConstants.service.items.map((item, index) => (
                            <SheetClose asChild key={index}>
                              <Link
                                to={item.to}
                                className="flex py-2 px-4 hover:bg-accent hover:text-accent-foreground rounded-sm"
                              >
                                {item.title}
                              </Link>
                            </SheetClose>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-3" className="font-regular text-lg">
                        <AccordionTrigger>{NavMenuConstants.ecomm.title}</AccordionTrigger>
                        <AccordionContent>
                          {NavMenuConstants.ecomm.items && NavMenuConstants.ecomm.items.map((item, index) => (
                            <SheetClose asChild key={index}>
                              <Link
                                to={item.to}
                                className="flex py-2 px-4 hover:bg-accent hover:text-accent-foreground rounded-sm"
                              >
                                {item.title}
                              </Link>
                            </SheetClose>
                          ))}
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="item-4" className="font-regular text-lg">
                        <AccordionTrigger>{NavMenuConstants.assessment.title}</AccordionTrigger>
                        <AccordionContent asChild>
                          {NavMenuConstants.assessment.items && NavMenuConstants.assessment.items.map((item, index) => (
                            <SheetClose asChild key={index}>
                              <Link
                                to={item.to}
                                className="flex py-2 px-4 hover:bg-accent hover:text-accent-foreground rounded-sm"
                              >
                                {item.title}
                              </Link>
                            </SheetClose>
                          ))}
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="item-5" className="font-regular text-lg">
                        <AccordionTrigger>{NavMenuConstants.users.title}</AccordionTrigger>
                        <AccordionContent asChild>
                          {NavMenuConstants.users.items && NavMenuConstants.users.items.map((item, index) => (
                            <SheetClose asChild key={index}>
                              <Link
                                to={item.to}
                                className="flex py-2 px-4 hover:bg-accent hover:text-accent-foreground rounded-sm"
                              >
                                {item.title}
                              </Link>
                            </SheetClose>
                          ))}
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="item-6" className="font-regular text-lg">
                        <AccordionTrigger>{NavMenuConstants.media.title}</AccordionTrigger>
                        <AccordionContent asChild>
                          {NavMenuConstants.media.items && NavMenuConstants.media.items.map((item, index) => (
                            <SheetClose asChild key={index}>
                              <Link
                                to={item.to}
                                className="flex py-2 px-4 hover:bg-accent hover:text-accent-foreground rounded-sm"
                              >
                                {item.title}
                              </Link>
                            </SheetClose>
                          ))}
                        </AccordionContent>
                      </AccordionItem>


                      <AccordionItem value="item-7" className="font-regular text-lg">
                        <Link to={NavMenuConstants.questions.to} className="text-left" >
                          <p className="text-left pt-4 pb-4 hover:bg-accent hover:text-accent-foreground rounded-md">
                            {NavMenuConstants.questions.title}
                          </p>
                        </Link>
                      </AccordionItem>

                      <AccordionItem value="item-8" className="font-regular text-lg">
                        <Link to={NavMenuConstants.events.to} className="text-left" >
                          <p className="text-left pt-4 pb-4 hover:bg-accent hover:text-accent-foreground rounded-md">
                            {NavMenuConstants.events.title}
                          </p>
                        </Link>
                      </AccordionItem>

                      <AccordionItem value="item-9" className="font-regular text-lg">
                        <Link to={NavMenuConstants.language.to} className="text-left" >
                          <p className="text-left pt-4 pb-4 hover:bg-accent hover:text-accent-foreground rounded-md">
                            {NavMenuConstants.language.title}
                          </p>
                        </Link>
                      </AccordionItem>

                      <AccordionItem value="item-10" className="font-regular text-lg">
                        <div className="flex justify-between">
                          <p className="text-left pt-4 pb-4 hover:bg-accent hover:text-accent-foreground rounded-md">
                            Theme
                          </p>
                          <ModeToggleMobile />
                        </div>
                      </AccordionItem>

                      <AccordionItem value="item-1" asChild>
                        <div className="mt-12">
                      <ConfirmationPopUp 
                      action='Logout' actionHandler={()=>logout()} variant="destructive"/>
                      </div>
                      </AccordionItem>
                      
                    </Accordion>
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>

        </div>
      </div>
    </>
  )
}
