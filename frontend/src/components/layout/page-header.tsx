import { useIsMobile } from "@/hooks"
import { isMatch, Link, useMatches } from "@tanstack/react-router"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Separator,
  SidebarTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../ui"
import { Fragment } from "react/jsx-runtime"

interface Props {
  tooltip?: string
  additionalInfo?: React.ReactNode
  children?: React.ReactNode
}

export const PageHeader = ({ tooltip, additionalInfo, children }: Props) => {
  const isMobile = useIsMobile()
  const matches = useMatches()
  const crumbs = matches
    .filter((match) => isMatch(match, "loaderData.crumb"))
    .map(({ pathname, loaderData }) => ({
      href: pathname,
      label: loaderData?.crumb,
    }))

  return (
    <div className="sticky top-0 z-10 flex h-12 items-stretch justify-between gap-2 border-b bg-background px-2 md:items-center md:px-4">
      {/* Left-aligned content */}
      <div className="flex items-center gap-2">
        {isMobile && (
          <>
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-1" />
          </>
        )}
        <div className="flex items-baseline gap-2">
          <Breadcrumb>
            <BreadcrumbList>
              {crumbs.map((item, index) => {
                const isLast = index === crumbs.length - 1
                return (
                  <Fragment key={index}>
                    <BreadcrumbItem
                      className={isLast ? undefined : "hidden lg:flex"}
                    >
                      {isLast ? (
                        <Tooltip disabled={!tooltip}>
                          <TooltipTrigger
                            render={
                              <BreadcrumbPage>{item.label}</BreadcrumbPage>
                            }
                          />
                          <TooltipContent>{tooltip}</TooltipContent>
                        </Tooltip>
                      ) : (
                        <Link to={item.href} className="font-mono text-sm">
                          {item.label}
                        </Link>
                      )}
                    </BreadcrumbItem>
                    {!isLast && (
                      <BreadcrumbSeparator className="hidden lg:flex" />
                    )}
                  </Fragment>
                )
              })}
            </BreadcrumbList>
          </Breadcrumb>
          {!isMobile && additionalInfo}
        </div>
      </div>
      {/* Right-aligned content */}
      <div className="flex items-center gap-2">{children}</div>
    </div>
  )
}
