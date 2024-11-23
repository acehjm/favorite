import { AppSidebar } from "~/components/app-sidebar"
import { ModeToggle } from "~/components/mode-toggle"
import { SearchButton } from "~/components/search-button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb"
import { Separator } from "~/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar"
import { motion, AnimatePresence } from "framer-motion"

const fadeIn = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <motion.div 
          className="flex flex-col"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          <motion.header 
            className="sticky top-0 z-50 flex h-12 shrink-0 items-center gap-2 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
            variants={fadeIn}
            layout
          >
            <motion.div 
              className="flex items-center gap-2 px-4 flex-1"
              layout
            >
              <SidebarTrigger />
              <Separator orientation="vertical" className="h-6" />
              <div className="flex-1" />
              <SearchButton />
              <ModeToggle />
            </motion.div>
          </motion.header>
          <motion.header 
            className="sticky top-12 z-40 flex h-14 shrink-0 items-center border-b border-border/40 bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"
            variants={fadeIn}
            layout
          >
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Projects</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </motion.header>
          <motion.main 
            className="flex-1 p-4"
            variants={fadeIn}
          >
            <h1 className="text-3xl font-bold">Welcome to Favorite</h1>
            <p className="mt-4 text-muted-foreground">
              A collection of your favorite things.
            </p>
          </motion.main>
        </motion.div>
      </SidebarInset>
    </SidebarProvider>
  )
}
