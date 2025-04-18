import { type LucideIcon } from "lucide-react";

import { Collapsible } from "@/components/ui/collapsible";
import { SidebarGroup, SidebarMenu } from "@/components/ui/sidebar";

export function NavAdmin({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            {/* <SidebarMenuItem>
              <Link href={item.url}>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem> */}
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
