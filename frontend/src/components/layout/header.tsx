import { isMatch, Link, useMatches } from "@tanstack/react-router"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
  Separator,
  SidebarTrigger,
} from "../ui"
import { Fragment } from "react/jsx-runtime"

interface Props {
  showAvatar?: boolean
  children?: React.ReactNode
}

export const Header = ({ children }: Props) => {
  const matches = useMatches()
  const crumbs = matches
    .filter((match) => isMatch(match, "loaderData.crumb"))
    .map(({ pathname, loaderData }) => ({
      href: pathname,
      label: loaderData?.crumb,
    }))

  return (
    <div className="flex h-12 items-center justify-between gap-2 border-b p-2">
      {/* Left-aligned actions */}
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Separator orientation="vertical" />
        <Breadcrumb>
          <BreadcrumbList>
            {crumbs.map((item, index) => {
              const isLast = index === crumbs.length - 1
              return (
                <Fragment key={index}>
                  <BreadcrumbItem
                    className={isLast ? undefined : "hidden lg:flex"}
                  >
                    <Link to={item.href} className="font-mono">
                      {item.label}
                    </Link>
                  </BreadcrumbItem>
                  {!isLast && (
                    <BreadcrumbSeparator className="hidden lg:flex" />
                  )}
                </Fragment>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Right-aligned actions */}
      <div className="flex items-center gap-2">{children}</div>
    </div>
  )
}
